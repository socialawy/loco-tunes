// Web Audio API engine for Loco-Tunes

import type { Note, Stem, StemType, EffectSettings, Track, SynthParams } from '@/types/music';
import { midiToFrequency } from './chords';
import { DRUM_MIDI, createDrumSynthSpec } from './drums';

// Audio context singleton
let audioContext: AudioContext | null = null;

export function getAudioContext(): AudioContext {
  if (!audioContext || audioContext.state === 'closed') {
    audioContext = new AudioContext();
  }
  return audioContext;
}

// Master output with effects chain
export class AudioEngine {
  private _context: AudioContext;
  private masterGain: GainNode;
  private compressor: DynamicsCompressorNode;
  private reverbNode: ConvolverNode | null = null;
  private reverbGain: GainNode;
  private dryGain: GainNode;
  private eqLow: BiquadFilterNode;
  private eqMid: BiquadFilterNode;
  private eqHigh: BiquadFilterNode;
  
  private stemPlayers: Map<StemType, { source: AudioBufferSourceNode | null; gain: GainNode }> = new Map();
  public isPlaying: boolean = false;
  private startTime: number = 0;
  private pausedAt: number = 0;
  
  constructor() {
    this._context = getAudioContext();
    
    // Create master chain
    this.masterGain = this._context.createGain();
    this.masterGain.gain.value = 0.8;
    
    // EQ nodes
    this.eqLow = this._context.createBiquadFilter();
    this.eqLow.type = 'lowshelf';
    this.eqLow.frequency.value = 320;
    this.eqLow.gain.value = 0;
    
    this.eqMid = this._context.createBiquadFilter();
    this.eqMid.type = 'peaking';
    this.eqMid.frequency.value = 1000;
    this.eqMid.Q.value = 0.5;
    this.eqMid.gain.value = 0;
    
    this.eqHigh = this._context.createBiquadFilter();
    this.eqHigh.type = 'highshelf';
    this.eqHigh.frequency.value = 3200;
    this.eqHigh.gain.value = 0;
    
    // Compressor
    this.compressor = this._context.createDynamicsCompressor();
    this.compressor.threshold.value = -24;
    this.compressor.knee.value = 30;
    this.compressor.ratio.value = 4;
    this.compressor.attack.value = 0.003;
    this.compressor.release.value = 0.25;
    
    // Reverb wet/dry mix
    this.reverbGain = this._context.createGain();
    this.reverbGain.gain.value = 0.3;
    this.dryGain = this._context.createGain();
    this.dryGain.gain.value = 0.7;
    
    // Connect chain
    this.eqLow.connect(this.eqMid);
    this.eqMid.connect(this.eqHigh);
    this.eqHigh.connect(this.compressor);

    this.compressor.connect(this.dryGain);
    this.compressor.connect(this.reverbGain);

    this.dryGain.connect(this.masterGain);

    this.masterGain.connect(this._context.destination);
    
    this.createReverb();
  }
  
  get context(): AudioContext {
    return this._context;
  }
  
  private async createReverb(): Promise<void> {
    const sampleRate = this._context.sampleRate;
    const length = sampleRate * 2;
    const impulse = this._context.createBuffer(2, length, sampleRate);
    
    for (let channel = 0; channel < 2; channel++) {
      const channelData = impulse.getChannelData(channel);
      for (let i = 0; i < length; i++) {
        channelData[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, 2);
      }
    }
    
    this.reverbNode = this._context.createConvolver();
    this.reverbNode.buffer = impulse;
    
    this.reverbGain.connect(this.reverbNode);
    this.reverbNode.connect(this.masterGain);
  }

  playTrack(track: Track, offset: number = 0, effects?: EffectSettings): void {
    if (this._context.state === 'suspended') {
      this._context.resume();
    }

    this.stopAll();
    
    if (effects) {
      this.setEffects(effects);
    }

    this.pausedAt = offset;
    this.startTime = this._context.currentTime - offset;
    this.isPlaying = true;

    const hasSolo = track.stems.some(s => s.solo);

    for (const stem of track.stems) {
      if (!stem.audioBuffer) continue;
      
      let effectiveVolume = stem.volume;
      if (stem.muted) effectiveVolume = 0;
      if (hasSolo && !stem.solo) effectiveVolume = 0;

      const source = this._context.createBufferSource();
      source.buffer = stem.audioBuffer;

      const gainNode = this._context.createGain();
      gainNode.gain.value = effectiveVolume;

      source.connect(gainNode);
      gainNode.connect(this.getMasterInput());

      source.start(0, offset);
      
      this.stemPlayers.set(stem.type, { source, gain: gainNode });
      
      source.onended = () => {
        // Handle end if needed
      };
    }
  }

  pause(): void {
    if (!this.isPlaying) return;
    this.pausedAt = this.getCurrentTime();
    this.stopAll(false);
  }

  stop(): void {
    this.stopAll(true);
  }

  setStemVolume(stemType: StemType, volume: number): void {
    const player = this.stemPlayers.get(stemType);
    if (player) {
      player.gain.gain.setTargetAtTime(volume, this._context.currentTime, 0.015);
    }
  }

  setStemMute(stemType: StemType, isMuted: boolean, originalVolume: number): void {
    const player = this.stemPlayers.get(stemType);
    if (player) {
      const targetVolume = isMuted ? 0 : originalVolume;
      player.gain.gain.setTargetAtTime(targetVolume, this._context.currentTime, 0.015);
    }
  }

  setStemSolo(stemType: StemType, isSolo: boolean, allStems: Stem[]): void {
    const hasSolo = allStems.some(s => s.solo);
    
    allStems.forEach(stem => {
       const player = this.stemPlayers.get(stem.type);
       if (player) {
         let targetVolume = stem.volume;
         if (stem.muted) targetVolume = 0;
         if (hasSolo && !stem.solo) targetVolume = 0;

         player.gain.gain.setTargetAtTime(targetVolume, this._context.currentTime, 0.015);
       }
    });
  }

  renderNoteToBufferSync(
    note: Note,
    offlineContext: OfflineAudioContext,
    stemType: StemType,
    synthParams?: SynthParams
  ): void {
      if (stemType === 'drums') {
         // Logic inside async method
      } else {
        const osc = offlineContext.createOscillator();
        
        if (synthParams) {
          osc.type = synthParams.oscillatorType;
        } else {
          switch (stemType) {
            case 'bass': osc.type = 'sawtooth'; break;
            case 'melody': osc.type = 'square'; break;
            case 'harmony': osc.type = 'triangle'; break;
            default: osc.type = 'sine';
          }
        }
        
        osc.frequency.value = midiToFrequency(note.pitch);
        const gain = offlineContext.createGain();
        
        const attack = synthParams?.attack ?? 0.02;
        const decay = synthParams?.decay ?? 0;
        const sustain = synthParams?.sustain ?? 1;
        const release = synthParams?.release ?? 0.1;

        const duration = note.duration;
        const now = note.startTime;

        // ADSR
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(
            (note.velocity / 127) * 0.3,
            now + attack
        );

        if (decay > 0) {
             gain.gain.linearRampToValueAtTime(
                (note.velocity / 127) * 0.3 * sustain,
                now + attack + decay
            );
        }

        const releaseStart = now + duration - release;
        const releaseStartTime = Math.max(releaseStart, now + attack + decay);

        gain.gain.setValueAtTime(
             (note.velocity / 127) * 0.3 * sustain,
             releaseStartTime
        );
        
        gain.gain.linearRampToValueAtTime(0, now + duration);

        osc.start(now);
        osc.stop(now + duration + 0.1);

        if (synthParams?.filterFrequency) {
            const filter = offlineContext.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.value = synthParams.filterFrequency;
            if (synthParams.filterQ) filter.Q.value = synthParams.filterQ;

            osc.connect(filter);
            filter.connect(gain);
        } else {
            osc.connect(gain);
        }
        
        gain.connect(offlineContext.destination);
      }
  }
  
  async renderNotesToBufferAsync(
    notes: Note[],
    duration: number,
    stemType: StemType,
    synthParams?: SynthParams
  ): Promise<AudioBuffer> {
    const sampleRate = this._context.sampleRate;
    const numSamples = Math.ceil(duration * sampleRate);
    const offlineContext = new OfflineAudioContext(2, numSamples, sampleRate);
    
    for (const note of notes) {
      if (stemType === 'drums') {
        const drumType = Object.entries(DRUM_MIDI).find(
          ([, midi]) => midi === note.pitch
        )?.[0] as keyof typeof DRUM_MIDI;
        
        if (drumType) {
          const spec = createDrumSynthSpec(drumType);
          
          if (spec.type === 'noise') {
            const noiseBuffer = offlineContext.createBuffer(
              1,
              Math.ceil(spec.decay * sampleRate),
              sampleRate
            );
            const noiseData = noiseBuffer.getChannelData(0);
            for (let i = 0; i < noiseData.length; i++) {
              noiseData[i] = Math.random() * 2 - 1;
            }
            
            const source = offlineContext.createBufferSource();
            source.buffer = noiseBuffer;
            source.start(note.startTime);
            
            let lastNode: AudioNode = source;
            
            if (spec.filter) {
              const filter = offlineContext.createBiquadFilter();
              filter.type = spec.filter.type;
              filter.frequency.value = spec.filter.frequency;
              if (spec.filter.Q) filter.Q.value = spec.filter.Q;
              lastNode.connect(filter);
              lastNode = filter;
            }
            
            const gain = offlineContext.createGain();
            gain.gain.value = note.velocity / 127 * 0.4;
            lastNode.connect(gain);
            gain.connect(offlineContext.destination);
          } else {
            const osc = offlineContext.createOscillator();
            osc.type = 'sine';
            osc.frequency.value = spec.frequency || 150;
            
            if (spec.pitchDecay) {
              osc.frequency.setValueAtTime(spec.frequency || 150, note.startTime);
              osc.frequency.exponentialRampToValueAtTime(
                20,
                note.startTime + spec.pitchDecay
              );
            }
            
            osc.start(note.startTime);
            osc.stop(note.startTime + spec.decay);
            
            const gain = offlineContext.createGain();
            gain.gain.setValueAtTime(note.velocity / 127 * 0.5, note.startTime);
            gain.gain.exponentialRampToValueAtTime(0.001, note.startTime + spec.decay);
            
            osc.connect(gain);
            gain.connect(offlineContext.destination);
          }
        }
      } else {
        this.renderNoteToBufferSync(note, offlineContext, stemType, synthParams);
      }
    }
    
    return offlineContext.startRendering();
  }
  
  async mixStemsToBuffer(
    stems: Stem[],
    duration: number,
    effects?: EffectSettings
  ): Promise<AudioBuffer> {
    const sampleRate = this._context.sampleRate;
    const numSamples = Math.ceil(duration * sampleRate);
    const offlineContext = new OfflineAudioContext(2, numSamples, sampleRate);
    
    const masterGain = offlineContext.createGain();
    masterGain.gain.value = 0.8;
    
    const eqLow = offlineContext.createBiquadFilter();
    eqLow.type = 'lowshelf';
    eqLow.frequency.value = 320;
    
    const eqMid = offlineContext.createBiquadFilter();
    eqMid.type = 'peaking';
    eqMid.frequency.value = 1000;
    eqMid.Q.value = 0.5;
    
    const eqHigh = offlineContext.createBiquadFilter();
    eqHigh.type = 'highshelf';
    eqHigh.frequency.value = 3200;
    
    const compressor = offlineContext.createDynamicsCompressor();
    compressor.threshold.value = -24;
    compressor.knee.value = 30;
    compressor.ratio.value = 4;
    compressor.attack.value = 0.003;
    compressor.release.value = 0.25;
    
    if (effects) {
      if (effects.eq.enabled) {
        eqLow.gain.value = effects.eq.low;
        eqMid.gain.value = effects.eq.mid;
        eqHigh.gain.value = effects.eq.high;
      }
      if (effects.compressor.enabled) {
        compressor.threshold.value = effects.compressor.threshold;
        compressor.ratio.value = effects.compressor.ratio;
        compressor.attack.value = effects.compressor.attack;
        compressor.release.value = effects.compressor.release;
      }
    }
    
    eqLow.connect(eqMid);
    eqMid.connect(eqHigh);
    eqHigh.connect(compressor);
    compressor.connect(masterGain);
    masterGain.connect(offlineContext.destination);
    
    const hasSolo = stems.some(s => s.solo);
    
    for (const stem of stems) {
      if (!stem.audioBuffer) continue;
      if (stem.muted) continue;
      if (hasSolo && !stem.solo) continue;
      
      const source = offlineContext.createBufferSource();
      source.buffer = stem.audioBuffer;
      
      const gainNode = offlineContext.createGain();
      gainNode.gain.value = stem.volume;
      
      source.connect(gainNode);
      gainNode.connect(eqLow);
      source.start(0);
    }
    
    return offlineContext.startRendering();
  }
  
  setEffects(effects: EffectSettings): void {
    if (effects.reverb.enabled) {
      this.reverbGain.gain.value = effects.reverb.mix;
      this.dryGain.gain.value = 1 - effects.reverb.mix;
    } else {
      this.reverbGain.gain.value = 0;
      this.dryGain.gain.value = 1;
    }
    
    if (effects.eq.enabled) {
      this.eqLow.gain.value = effects.eq.low;
      this.eqMid.gain.value = effects.eq.mid;
      this.eqHigh.gain.value = effects.eq.high;
    } else {
      this.eqLow.gain.value = 0;
      this.eqMid.gain.value = 0;
      this.eqHigh.gain.value = 0;
    }
    
    if (effects.compressor.enabled) {
      this.compressor.threshold.value = effects.compressor.threshold;
      this.compressor.ratio.value = effects.compressor.ratio;
      this.compressor.attack.value = effects.compressor.attack;
      this.compressor.release.value = effects.compressor.release;
    }
  }
  
  getMasterInput(): AudioNode {
    return this.eqLow;
  }
  
  getCurrentTime(): number {
    if (this.isPlaying) {
      return this._context.currentTime - this.startTime;
    }
    return this.pausedAt;
  }
  
  dispose(): void {
    this.stopAll(true);
    if (audioContext) {
      audioContext.close();
      audioContext = null;
    }
  }
  
  stopAll(resetTime: boolean = true): void {
    this.stemPlayers.forEach(({ source }) => {
      if (source) {
        try {
          source.stop();
          source.disconnect();
        } catch (e) {
          // Ignore
        }
      }
    });
    this.stemPlayers.clear();
    this.isPlaying = false;

    if (resetTime) {
      this.pausedAt = 0;
      this.startTime = 0;
    }
  }
}

let engineInstance: AudioEngine | null = null;

export function getAudioEngine(): AudioEngine {
  if (!engineInstance) {
    engineInstance = new AudioEngine();
  }
  return engineInstance;
}
