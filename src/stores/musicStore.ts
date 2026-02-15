// Zustand store for Loco-Tunes state management

import { create } from 'zustand';
import { toast } from 'sonner';
import type { 
  GenerationParams, 
  Track, 
  StemType, 
  EffectSettings, 
  HardwareTier,
  Stem,
} from '@/types/music';
import { DEFAULT_PARAMS, DEFAULT_EFFECTS } from '@/types/music';
import { generateTrack, regenerateStem, generateStemVariation, detectHardwareCapabilities } from '@/lib/audio/generator';
import { getAudioEngine } from '@/lib/audio/engine';
import { exportTrackToMidi, downloadBlob, generateFilename, audioBufferToWav } from '@/lib/audio/export';

interface MusicStore {
  // Generation params
  params: GenerationParams;
  
  // Current track
  currentTrack: Track | null;
  
  // Playback state
  isPlaying: boolean;
  currentTime: number;
  
  // Effects
  effects: EffectSettings;
  
  // Hardware
  hardwareTier: HardwareTier;
  
  // UI state
  mode: 'simple' | 'advanced';
  isGenerating: boolean;
  generationProgress: number;
  isExporting: boolean;
  
  // Audio sources and gain nodes for live control
  activeSources: Map<StemType, AudioBufferSourceNode>;
  activeGains: Map<StemType, GainNode>;
  
  // Actions
  setParams: (params: Partial<GenerationParams>) => void;
  generateTrack: () => Promise<void>;
  regenerateStem: (stemType: StemType) => Promise<void>;
  playTrack: () => void;
  pauseTrack: () => void;
  stopTrack: () => void;
  setStemVolume: (stemType: StemType, volume: number) => void;
  toggleStemMute: (stemType: StemType) => void;
  toggleStemSolo: (stemType: StemType) => void;
  setEffects: (effects: Partial<EffectSettings>) => void;
  exportWav: () => Promise<void>;
  exportMidi: () => void;
  setMode: (mode: 'simple' | 'advanced') => void;
  updateCurrentTime: (time: number) => void;
  restartPlayback: () => void;
}

export const useMusicStore = create<MusicStore>((set, get) => ({
  // Initial state
  params: DEFAULT_PARAMS,
  currentTrack: null,
  isPlaying: false,
  currentTime: 0,
  effects: DEFAULT_EFFECTS,
  hardwareTier: detectHardwareCapabilities(),
  mode: 'simple',
  isGenerating: false,
  generationProgress: 0,
  isExporting: false,
  activeSources: new Map(),
  activeGains: new Map(),
  
  // Set generation params
  setParams: (newParams) => set((state) => ({
    params: { ...state.params, ...newParams },
  })),
  
  // Generate a new track
  generateTrack: async () => {
    const { params, hardwareTier } = get();
    
    // Limit duration based on hardware tier
    const limitedParams = {
      ...params,
      duration: Math.min(params.duration, hardwareTier.maxDuration),
      complexity: Math.min(params.complexity, hardwareTier.recommendedComplexity),
    };
    
    set({ isGenerating: true, generationProgress: 0 });
    
    try {
      set({ generationProgress: 20 });
      
      const track = await generateTrack(limitedParams);
      
      set({ 
        currentTrack: track, 
        isGenerating: false, 
        generationProgress: 100,
        currentTime: 0,
      });
      
      toast.success('Track generated successfully!');
      
      // Auto-play after generation
      setTimeout(() => get().playTrack(), 100);
      
    } catch (error) {
      console.error('Generation failed:', error);
      toast.error('Failed to generate track');
      set({ isGenerating: false, generationProgress: 0 });
    }
  },
  
  // Regenerate a single stem
  regenerateStem: async (stemType: StemType) => {
    const { currentTrack } = get();
    if (!currentTrack) return;
    
    set({ isGenerating: true });
    
    try {
      const newStem = await regenerateStem(currentTrack, stemType);
      
      set((state) => ({
        currentTrack: state.currentTrack ? {
          ...state.currentTrack,
          stems: state.currentTrack.stems.map(s => 
            s.type === stemType ? newStem : s
          ),
        } : null,
        isGenerating: false,
      }));
      
      toast.success(`${stemType} stem regenerated`);
      
      // Restart playback if playing to hear changes
      if (get().isPlaying) {
        get().restartPlayback();
      }
    } catch (error) {
      console.error('Stem regeneration failed:', error);
      toast.error(`Failed to regenerate ${stemType} stem`);
      set({ isGenerating: false });
    }
  },
  
  // Restart playback at current time (used when mixer controls change)
  restartPlayback: () => {
    const { isPlaying, currentTime } = get();
    if (!isPlaying) return;
    
    // Pause, then resume at same position
    get().pauseTrack();
    setTimeout(() => {
      get().playTrack();
    }, 10);
  },
  
  // Play the track
  playTrack: () => {
    const { currentTrack, isPlaying, activeSources, effects } = get();
    if (!currentTrack || isPlaying) return;
    
    const engine = getAudioEngine();
    const context = engine.context;
    
    // Check if context is suspended (browser autoplay policy)
    if (context.state === 'suspended') {
      context.resume().catch(err => {
        console.error('Failed to resume AudioContext:', err);
        toast.error('Click anywhere to enable audio');
      });
    }
    
    // Stop any existing sources
    activeSources.forEach((source) => {
      try {
        source.stop();
      } catch (e) {
        // Ignore
      }
    });
    
    // Apply effects before playback
    engine.setEffects(effects);
    
    const newSources = new Map<StemType, AudioBufferSourceNode>();
    const newGains = new Map<StemType, GainNode>();
    
    // Check if any stem is soloed
    const hasSolo = currentTrack.stems.some(s => s.solo);
    
    // Play each stem
    for (const stem of currentTrack.stems) {
      if (!stem.audioBuffer) continue;
      if (stem.muted) continue;
      if (hasSolo && !stem.solo) continue;
      
      const source = context.createBufferSource();
      source.buffer = stem.audioBuffer;
      
      const gainNode = context.createGain();
      gainNode.gain.value = stem.volume;
      
      source.connect(gainNode);
      gainNode.connect(engine.getMasterInput());
      
      source.start(0, get().currentTime);
      newSources.set(stem.type, source);
      newGains.set(stem.type, gainNode);
    }
    
    set({ isPlaying: true, activeSources: newSources, activeGains: newGains });
    
    // Update time during playback
    const startTime = context.currentTime - get().currentTime;
    const updateTime = () => {
      const { isPlaying, currentTrack } = get();
      if (!isPlaying || !currentTrack) return;
      
      const elapsed = context.currentTime - startTime;
      
      if (elapsed >= currentTrack.duration) {
        get().stopTrack();
        return;
      }
      
      set({ currentTime: elapsed });
      requestAnimationFrame(updateTime);
    };
    
    requestAnimationFrame(updateTime);
  },
  
  // Pause the track
  pauseTrack: () => {
    const { activeSources, isPlaying } = get();
    if (!isPlaying) return;
    
    // Stop all sources
    activeSources.forEach((source) => {
      try {
        source.stop();
      } catch (e) {
        // Ignore
      }
    });
    
    set({ isPlaying: false, activeSources: new Map(), activeGains: new Map() });
  },
  
  // Stop the track
  stopTrack: () => {
    const { activeSources } = get();
    
    // Stop all sources
    activeSources.forEach((source) => {
      try {
        source.stop();
      } catch (e) {
        // Ignore
      }
    });
    
    set({ isPlaying: false, currentTime: 0, activeSources: new Map(), activeGains: new Map() });
  },
  
  // Set stem volume with smooth ramping during playback
  setStemVolume: (stemType: StemType, volume: number) => {
    const { isPlaying, activeGains } = get();
    
    // Update state
    set((state) => ({
      currentTrack: state.currentTrack ? {
        ...state.currentTrack,
        stems: state.currentTrack.stems.map(s => 
          s.type === stemType ? { ...s, volume } : s
        ),
      } : null,
    }));
    
    // Apply smooth ramp to active gain node during playback
    if (isPlaying) {
      const gainNode = activeGains.get(stemType);
      if (gainNode) {
        const engine = getAudioEngine();
        const context = engine.context;
        // Smooth ramp over 15ms to prevent clicks
        gainNode.gain.setTargetAtTime(volume, context.currentTime, 0.015);
      }
    }
  },
  
  // Toggle stem mute with playback restart
  toggleStemMute: (stemType: StemType) => {
    set((state) => ({
      currentTrack: state.currentTrack ? {
        ...state.currentTrack,
        stems: state.currentTrack.stems.map(s => 
          s.type === stemType ? { ...s, muted: !s.muted } : s
        ),
      } : null,
    }));
    
    // Restart playback to apply mute change
    if (get().isPlaying) {
      get().restartPlayback();
    }
  },
  
  // Toggle stem solo with playback restart
  toggleStemSolo: (stemType: StemType) => {
    set((state) => ({
      currentTrack: state.currentTrack ? {
        ...state.currentTrack,
        stems: state.currentTrack.stems.map(s => 
          s.type === stemType ? { ...s, solo: !s.solo } : s
        ),
      } : null,
    }));
    
    // Restart playback to apply solo change
    if (get().isPlaying) {
      get().restartPlayback();
    }
  },
  
  // Set effects and apply to engine
  setEffects: (newEffects: Partial<EffectSettings>) => {
    set((state) => ({
      effects: { ...state.effects, ...newEffects },
    }));
    
    // Apply to audio engine immediately
    const engine = getAudioEngine();
    engine.setEffects(get().effects);
  },
  
  // Export to WAV with all stems mixed
  exportWav: async () => {
    const { currentTrack, effects } = get();
    if (!currentTrack) return;
    
    set({ isExporting: true });
    toast.info('Exporting WAV file...');
    
    try {
      const engine = getAudioEngine();
      
      // Mix all stems together with effects
      const mixedBuffer = await engine.mixStemsToBuffer(
        currentTrack.stems,
        currentTrack.duration,
        effects
      );
      
      const blob = audioBufferToWav(mixedBuffer);
      const filename = generateFilename(currentTrack, 'wav');
      downloadBlob(blob, filename);
      
      toast.success('WAV export complete!');
    } catch (error) {
      console.error('WAV export failed:', error);
      toast.error('Failed to export WAV file');
    } finally {
      set({ isExporting: false });
    }
  },
  
  // Export to MIDI
  exportMidi: () => {
    const { currentTrack } = get();
    if (!currentTrack) return;
    
    try {
      const blob = exportTrackToMidi(currentTrack);
      const filename = generateFilename(currentTrack, 'mid');
      downloadBlob(blob, filename);
      toast.success('MIDI export complete!');
    } catch (error) {
      console.error('MIDI export failed:', error);
      toast.error('Failed to export MIDI file');
    }
  },
  
  // Set UI mode
  setMode: (mode: 'simple' | 'advanced') => set({ mode }),
  
  // Update current time (for seeking)
  updateCurrentTime: (time: number) => set({ currentTime: time }),
}));
