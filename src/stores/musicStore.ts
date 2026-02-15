// Zustand store for Loco-Tunes state management

import { create } from 'zustand';
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
import { exportTrackToMidi, downloadBlob, generateFilename, exportStemToWav, audioBufferToWav } from '@/lib/audio/export';

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
  
  // Audio sources
  activeSources: Map<StemType, AudioBufferSourceNode>;
  
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
  exportWav: () => void;
  exportMidi: () => void;
  setMode: (mode: 'simple' | 'advanced') => void;
  updateCurrentTime: (time: number) => void;
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
  activeSources: new Map(),
  
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
      
      // Auto-play after generation
      setTimeout(() => get().playTrack(), 100);
      
    } catch (error) {
      console.error('Generation failed:', error);
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
    } catch (error) {
      console.error('Stem regeneration failed:', error);
      set({ isGenerating: false });
    }
  },
  
  // Play the track
  playTrack: () => {
    const { currentTrack, isPlaying, activeSources } = get();
    if (!currentTrack || isPlaying) return;
    
    const engine = getAudioEngine();
    const context = engine['context'];
    
    // Check if context is suspended (browser autoplay policy)
    if (context.state === 'suspended') {
      context.resume();
    }
    
    // Stop any existing sources
    activeSources.forEach((source) => {
      try {
        source.stop();
      } catch (e) {
        // Ignore
      }
    });
    
    const newSources = new Map<StemType, AudioBufferSourceNode>();
    
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
    }
    
    set({ isPlaying: true, activeSources: newSources });
    
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
    
    set({ isPlaying: false, activeSources: new Map() });
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
    
    set({ isPlaying: false, currentTime: 0, activeSources: new Map() });
  },
  
  // Set stem volume
  setStemVolume: (stemType: StemType, volume: number) => {
    set((state) => ({
      currentTrack: state.currentTrack ? {
        ...state.currentTrack,
        stems: state.currentTrack.stems.map(s => 
          s.type === stemType ? { ...s, volume } : s
        ),
      } : null,
    }));
  },
  
  // Toggle stem mute
  toggleStemMute: (stemType: StemType) => {
    set((state) => ({
      currentTrack: state.currentTrack ? {
        ...state.currentTrack,
        stems: state.currentTrack.stems.map(s => 
          s.type === stemType ? { ...s, muted: !s.muted } : s
        ),
      } : null,
    }));
  },
  
  // Toggle stem solo
  toggleStemSolo: (stemType: StemType) => {
    set((state) => ({
      currentTrack: state.currentTrack ? {
        ...state.currentTrack,
        stems: state.currentTrack.stems.map(s => 
          s.type === stemType ? { ...s, solo: !s.solo } : s
        ),
      } : null,
    }));
  },
  
  // Set effects
  setEffects: (newEffects: Partial<EffectSettings>) => {
    set((state) => ({
      effects: { ...state.effects, ...newEffects },
    }));
    
    // Apply to audio engine
    const engine = getAudioEngine();
    engine.setEffects(get().effects);
  },
  
  // Export to WAV
  exportWav: () => {
    const { currentTrack } = get();
    if (!currentTrack) return;
    
    // For now, export mixed stems
    // In full implementation, we'd render all stems to a single buffer
    const stemWithBuffer = currentTrack.stems.find(s => s.audioBuffer);
    if (!stemWithBuffer?.audioBuffer) return;
    
    const blob = audioBufferToWav(stemWithBuffer.audioBuffer);
    const filename = generateFilename(currentTrack, 'wav');
    downloadBlob(blob, filename);
  },
  
  // Export to MIDI
  exportMidi: () => {
    const { currentTrack } = get();
    if (!currentTrack) return;
    
    const blob = exportTrackToMidi(currentTrack);
    const filename = generateFilename(currentTrack, 'mid');
    downloadBlob(blob, filename);
  },
  
  // Set UI mode
  setMode: (mode: 'simple' | 'advanced') => set({ mode }),
  
  // Update current time
  updateCurrentTime: (time: number) => set({ currentTime: time }),
}));
