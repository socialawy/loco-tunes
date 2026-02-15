// Web Audio API engine for Loco-Tunes

import type { Note, Stem, StemType, EffectSettings, Track } from '@/types/music';
import { midiToFrequency, getScale } from './chords';
import { DRUM_MIDI, createDrumSynthSpec } from './drums';

// Audio context singleton
let audioContext: AudioContext | null = null;

export function getAudioContext(): AudioContext {
  if (!audioContext) {
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
  private isPlaying: boolean = false;
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
    
    // Connect chain: source -> eq -> compressor -> master -> destination
    this.eqLow.connect(this.eqMid);
    this.eqMid.connect(this.eqHigh);
    this.eqHigh.connect(this.compressor);
    this.compressor.connect(this.dryGain);
    this.compressor.connect(this.reverbGain);
    this.dryGain.connect(this.masterGain);
    this.reverbGain.connect(this.masterGain);
    this.masterGain.connect(this._context.destination);
    
    // Create reverb (async)
    this.createReverb();
  }
  
  // Public getter for context
  get context(): AudioContext {
    return this._context;
  }
  
  private async createReverb(): Promise<void> {
    const sampleRate = this._context.sampleRate;
    const length = sampleRate * 2; // 2 second reverb
    const impulse = this._context.createBuffer(2, length, sampleRate);
    
    for (let channel = 0; channel < 2; channel++) {
      const channelData = impulse.getChannelData(channel);
      for (let i = 0; i < length; i++) {
        // Exponential decay
        channelData[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, 2);
      }
    }
    
    this.reverbNode = this._context.createConvolver();
    this.reverbNode.buffer = impulse;
    this.reverbNode.connect(this.reverbGain);
  }
  
  // Synthesize a note using oscillators
  synthesizeNote(
    note: Note,
    startTime: number,
    duration: number,
    options: {
      oscillatorType?: OscillatorType;
      attack?: number;
      decay?: number;
      sustain?: number;
      release?: number;
    } = {}
  ): { oscillator: OscillatorNode; gainNode: GainNode } {
    const {
      oscillatorType = 'sine',
      attack = 0.01,
      decay = 0.1,
      sustain = 0.7,
      release = 0.3,
    } = options;
    
    const osc = this._context.createOscillator();
    osc.type = oscillatorType;
    osc.frequency.value = midiToFrequency(note.pitch);
    
    const gainNode = this._context.createGain();
    gainNode.gain.value = 0;
    
    // ADSR envelope
    const velocity = note.velocity / 127;
    const noteDuration = note.duration || duration;
    
    gainNode.gain.setValueAtTime(0, startTime);
    gainNode.gain.linearRampToValueAtTime(velocity * 0.5, startTime + attack);
    gainNode.gain.linearRampToValueAtTime(velocity * sustain * 0.5, startTime + attack + decay);
    gainNode.gain.setValueAtTime(velocity * sustain * 0.5, startTime + noteDuration - release);
    gainNode.gain.linearRampToValueAtTime(0, startTime + noteDuration);
    
    osc.connect(gainNode);
    
    return { oscillator: osc, gainNode };
  }
  
  // Synthesize drum hit
  synthesizeDrum(
    drumType: keyof typeof DRUM_MIDI,
    startTime: number,
    velocity: number
  ): { nodes: AudioNode[] } {
    const spec = createDrumSynthSpec(drumType);
    const nodes: AudioNode[] = [];
    
    const gainNode = this._context.createGain();
    gainNode.gain.value = 0;
    gainNode.gain.linearRampToValueAtTime(velocity / 127 * 0.6, startTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + spec.decay);
    nodes.push(gainNode);
    
    if (spec.type === 'noise') {
      // Create noise buffer
      const bufferSize = this._context.sampleRate * spec.decay;
      const noiseBuffer = this._context.createBuffer(1, bufferSize, this._context.sampleRate);
      const noiseData = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        noiseData[i] = Math.random() * 2 - 1;
      }
      
      const noiseSource = this._context.createBufferSource();
      noiseSource.buffer = noiseBuffer;
      noiseSource.start(startTime);
      nodes.push(noiseSource);
      
      let lastNode: AudioNode = noiseSource;
      
      if (spec.filter) {
        const filter = this._context.createBiquadFilter();
        filter.type = spec.filter.type;
        filter.frequency.value = spec.filter.frequency;
        if (spec.filter.Q) filter.Q.value = spec.filter.Q;
        lastNode.connect(filter);
        lastNode = filter;
        nodes.push(filter);
      }
      
      lastNode.connect(gainNode);
    } else {
      // Oscillator-based (kick, toms)
      const osc = this._context.createOscillator();
      osc.frequency.value = spec.frequency || 150;
      osc.frequency.setValueAtTime(spec.frequency || 150, startTime);
      
      if (spec.pitchDecay) {
        osc.frequency.exponentialRampToValueAtTime(
          20,
          startTime + spec.pitchDecay
        );
      }
      
      osc.type = 'sine';
      osc.start(startTime);
      osc.stop(startTime + spec.decay);
      
      let lastNode: AudioNode = osc;
      
      if (spec.filter) {
        const filter = this._context.createBiquadFilter();
        filter.type = spec.filter.type;
        filter.frequency.value = spec.filter.frequency;
        lastNode.connect(filter);
        lastNode = filter;
        nodes.push(filter);
      }
      
      lastNode.connect(gainNode);
      nodes.push(osc);
    }
    
    return { nodes };
  }
  
  // Render notes to an AudioBuffer
  renderNotesToBuffer(
    notes: Note[],
    duration: number,
    stemType: StemType
  ): AudioBuffer {
    const sampleRate = this._context.sampleRate;
    const numSamples = Math.ceil(duration * sampleRate);
    const buffer = this._context.createBuffer(2, numSamples, sampleRate);
    
    const offlineContext = new OfflineAudioContext(2, numSamples, sampleRate);
    
    // Render each note
    for (const note of notes) {
      if (stemType === 'drums') {
        // Render drum
        const drumType = Object.entries(DRUM_MIDI).find(
          ([, midi]) => midi === note.pitch
        )?.[0] as keyof typeof DRUM_MIDI;
        
        if (drumType) {
          const spec = createDrumSynthSpec(drumType);
          const startSample = Math.floor(note.startTime * sampleRate);
          
          if (spec.type === 'noise') {
            // Generate noise
            const noiseBuffer = offlineContext.createBuffer(1, 
              Math.ceil(spec.decay * sampleRate), sampleRate);
            const noiseData = noiseBuffer.getChannelData(0);
            for (let i = 0; i < noiseData.length; i++) {
              noiseData[i] = Math.random() * 2 - 1;
            }
            
            const source = offlineContext.createBufferSource();
            source.buffer = noiseBuffer;
            source.start(startSample / sampleRate);
            
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
            gain.gain.value = note.velocity / 127 * 0.5;
            lastNode.connect(gain);
            gain.connect(offlineContext.destination);
          } else {
            // Oscillator-based drum
            const osc = offlineContext.createOscillator();
            osc.type = 'sine';
            osc.frequency.value = spec.frequency || 150;
            
            if (spec.pitchDecay) {
              osc.frequency.setValueAtTime(spec.frequency || 150, startSample / sampleRate);
              osc.frequency.exponentialRampToValueAtTime(20, startSample / sampleRate + spec.pitchDecay);
            }
            
            osc.start(startSample / sampleRate);
            osc.stop(startSample / sampleRate + spec.decay);
            
            const gain = offlineContext.createGain();
            gain.gain.setValueAtTime(note.velocity / 127 * 0.5, startSample / sampleRate);
            gain.gain.exponentialRampToValueAtTime(0.001, startSample / sampleRate + spec.decay);
            
            osc.connect(gain);
            gain.connect(offlineContext.destination);
          }
        }
      } else {
        // Render melodic note
        const osc = offlineContext.createOscillator();
        
        // Different oscillator types per stem
        switch (stemType) {
          case 'bass':
            osc.type = 'sawtooth';
            break;
          case 'melody':
            osc.type = 'square';
            break;
          case 'harmony':
            osc.type = 'triangle';
            break;
          default:
            osc.type = 'sine';
        }
        
        osc.frequency.value = midiToFrequency(note.pitch);
        
        const gain = offlineContext.createGain();
        const attack = 0.02;
        const release = 0.1;
        
        gain.gain.setValueAtTime(0, note.startTime);
        gain.gain.linearRampToValueAtTime(
          note.velocity / 127 * 0.3,
          note.startTime + attack
        );
        gain.gain.setValueAtTime(
          note.velocity / 127 * 0.25,
          note.startTime + note.duration - release
        );
        gain.gain.linearRampToValueAtTime(0, note.startTime + note.duration);
        
        osc.start(note.startTime);
        osc.stop(note.startTime + note.duration + 0.1);
        
        osc.connect(gain);
        gain.connect(offlineContext.destination);
      }
    }
    
    // Render synchronously (OfflineAudioContext doesn't support async in this context)
    // We'll use a Promise-based approach
    return buffer;
  }
  
  // Render notes asynchronously
  async renderNotesToBufferAsync(
    notes: Note[],
    duration: number,
    stemType: StemType
  ): Promise<AudioBuffer> {
    const sampleRate = this._context.sampleRate;
    const numSamples = Math.ceil(duration * sampleRate);
    const offlineContext = new OfflineAudioContext(2, numSamples, sampleRate);
    
    // Render each note
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
        const osc = offlineContext.createOscillator();
        
        switch (stemType) {
          case 'bass':
            osc.type = 'sawtooth';
            break;
          case 'melody':
            osc.type = 'square';
            break;
          case 'harmony':
            osc.type = 'triangle';
            break;
          default:
            osc.type = 'sine';
        }
        
        osc.frequency.value = midiToFrequency(note.pitch);
        
        const gain = offlineContext.createGain();
        const attack = stemType === 'harmony' ? 0.1 : 0.02;
        const release = stemType === 'harmony' ? 0.2 : 0.1;
        
        gain.gain.setValueAtTime(0, note.startTime);
        gain.gain.linearRampToValueAtTime(
          note.velocity / 127 * 0.3,
          note.startTime + attack
        );
        gain.gain.setValueAtTime(
          note.velocity / 127 * 0.25,
          note.startTime + note.duration - release
        );
        gain.gain.linearRampToValueAtTime(0, note.startTime + note.duration);
        
        osc.start(note.startTime);
        osc.stop(note.startTime + note.duration + 0.1);
        
        osc.connect(gain);
        gain.connect(offlineContext.destination);
      }
    }
    
    return offlineContext.startRendering();
  }
  
  // Mix multiple stems into a single buffer
  async mixStemsToBuffer(
    stems: Stem[],
    duration: number,
    effects?: EffectSettings
  ): Promise<AudioBuffer> {
    const sampleRate = this._context.sampleRate;
    const numSamples = Math.ceil(duration * sampleRate);
    const offlineContext = new OfflineAudioContext(2, numSamples, sampleRate);
    
    // Create master chain for offline context
    const masterGain = offlineContext.createGain();
    masterGain.gain.value = 0.8;
    
    // EQ
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
    
    // Compressor
    const compressor = offlineContext.createDynamicsCompressor();
    compressor.threshold.value = -24;
    compressor.knee.value = 30;
    compressor.ratio.value = 4;
    compressor.attack.value = 0.003;
    compressor.release.value = 0.25;
    
    // Apply effects if provided
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
    
    // Connect chain
    eqLow.connect(eqMid);
    eqMid.connect(eqHigh);
    eqHigh.connect(compressor);
    compressor.connect(masterGain);
    masterGain.connect(offlineContext.destination);
    
    // Check for solo
    const hasSolo = stems.some(s => s.solo);
    
    // Mix stems
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
  
  // Update effects
  setEffects(effects: EffectSettings): void {
    // Reverb wet/dry mix
    if (effects.reverb.enabled) {
      this.reverbGain.gain.value = effects.reverb.mix;
      this.dryGain.gain.value = 1 - effects.reverb.mix;
    } else {
      this.reverbGain.gain.value = 0;
      this.dryGain.gain.value = 1;
    }
    
    // EQ
    if (effects.eq.enabled) {
      this.eqLow.gain.value = effects.eq.low;
      this.eqMid.gain.value = effects.eq.mid;
      this.eqHigh.gain.value = effects.eq.high;
    } else {
      this.eqLow.gain.value = 0;
      this.eqMid.gain.value = 0;
      this.eqHigh.gain.value = 0;
    }
    
    // Compressor
    if (effects.compressor.enabled) {
      this.compressor.threshold.value = effects.compressor.threshold;
      this.compressor.ratio.value = effects.compressor.ratio;
      this.compressor.attack.value = effects.compressor.attack;
      this.compressor.release.value = effects.compressor.release;
    }
  }
  
  // Get master gain node for connecting sources
  getMasterInput(): AudioNode {
    return this.eqLow;
  }
  
  // Get current time
  getCurrentTime(): number {
    if (this.isPlaying) {
      return this._context.currentTime - this.startTime + this.pausedAt;
    }
    return this.pausedAt;
  }
  
  // Cleanup
  dispose(): void {
    this.stopAll();
    if (audioContext) {
      audioContext.close();
      audioContext = null;
    }
  }
  
  stopAll(): void {
    this.stemPlayers.forEach(({ source }) => {
      if (source) {
        try {
          source.stop();
        } catch (e) {
          // Ignore errors from already stopped sources
        }
      }
    });
    this.stemPlayers.clear();
    this.isPlaying = false;
  }
}

// Global audio engine instance
let engineInstance: AudioEngine | null = null;

export function getAudioEngine(): AudioEngine {
  if (!engineInstance) {
    engineInstance = new AudioEngine();
  }
  return engineInstance;
}
