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
    const { isPlaying } = get();
    if (!isPlaying) return;
    
    get().pauseTrack();
    setTimeout(() => {
      get().playTrack();
    }, 10);
  },
  
  // Play the track
  playTrack: () => {
    const { currentTrack, isPlaying, effects } = get();
    if (!currentTrack || isPlaying) return;
    
    const engine = getAudioEngine();
    
    try {
      engine.playTrack(currentTrack, get().currentTime, effects);
      set({ isPlaying: true });
      
      // Update time loop
      const updateTime = () => {
        const { isPlaying, currentTrack } = get();
        if (!isPlaying || !currentTrack) return;

        const currentTime = engine.getCurrentTime();

        if (currentTime >= currentTrack.duration) {
          get().stopTrack();
          return;
        }

        set({ currentTime });
        requestAnimationFrame(updateTime);
      };
      
      requestAnimationFrame(updateTime);
    } catch (err) {
      console.error('Playback failed:', err);
      toast.error('Failed to play track');
    }
  },
  
  // Pause the track
  pauseTrack: () => {
    const { isPlaying } = get();
    if (!isPlaying) return;
    
    const engine = getAudioEngine();
    engine.pause();
    
    set({ isPlaying: false });
  },
  
  // Stop the track
  stopTrack: () => {
    const engine = getAudioEngine();
    engine.stop();
    set({ isPlaying: false, currentTime: 0 });
  },
  
  // Set stem volume
  setStemVolume: (stemType: StemType, volume: number) => {
    // Update state
    set((state) => ({
      currentTrack: state.currentTrack ? {
        ...state.currentTrack,
        stems: state.currentTrack.stems.map(s => 
          s.type === stemType ? { ...s, volume } : s
        ),
      } : null,
    }));
    
    // Update engine
    const engine = getAudioEngine();
    engine.setStemVolume(stemType, volume);
  },
  
  // Toggle stem mute
  toggleStemMute: (stemType: StemType) => {
    const { currentTrack } = get();
    if (!currentTrack) return;

    const stem = currentTrack.stems.find(s => s.type === stemType);
    if (!stem) return;

    const newMuted = !stem.muted;

    set((state) => ({
      currentTrack: state.currentTrack ? {
        ...state.currentTrack,
        stems: state.currentTrack.stems.map(s => 
          s.type === stemType ? { ...s, muted: newMuted } : s
        ),
      } : null,
    }));
    
    const engine = getAudioEngine();
    engine.setStemMute(stemType, newMuted, stem.volume);
  },
  
  // Toggle stem solo
  toggleStemSolo: (stemType: StemType) => {
     const { currentTrack } = get();
    if (!currentTrack) return;

    const stem = currentTrack.stems.find(s => s.type === stemType);
    if (!stem) return;

    const newSolo = !stem.solo;

    // Update state first to get the full picture of stems
    set((state) => ({
      currentTrack: state.currentTrack ? {
        ...state.currentTrack,
        stems: state.currentTrack.stems.map(s => 
          s.type === stemType ? { ...s, solo: newSolo } : s
        ),
      } : null,
    }));
    
    const engine = getAudioEngine();
    // We pass the updated stems list
    const updatedStems = get().currentTrack?.stems;
    if (updatedStems) {
        engine.setStemSolo(stemType, newSolo, updatedStems);
    }
  },
  
  // Set effects
  setEffects: (newEffects: Partial<EffectSettings>) => {
    set((state) => ({
      effects: { ...state.effects, ...newEffects },
    }));
    
    const engine = getAudioEngine();
    engine.setEffects(get().effects);
  },
  
  // Export to WAV
  exportWav: async () => {
    const { currentTrack, effects } = get();
    if (!currentTrack) return;
    
    set({ isExporting: true });
    toast.info('Exporting WAV file...');
    
    try {
      const engine = getAudioEngine();
      
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
