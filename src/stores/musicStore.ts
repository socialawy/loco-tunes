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
import { saveProject, loadProject, deleteProject, getProjects } from '@/lib/storage';
import type { Project } from '@/types/music';

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
  
  // Projects
  projects: Project[];
  currentProjectId: string | null;

  // UI state
  mode: 'simple' | 'advanced';
  isGenerating: boolean;
  generationProgress: number;
  isExporting: boolean;
  
  // Actions
  setParams: (params: Partial<GenerationParams>) => void;
  generateTrack: () => Promise<void>;
  regenerateStem: (stemType: StemType) => Promise<void>;
  generateStemVariation: (stemType: StemType) => Promise<void>;
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

  // Project Actions
  fetchProjects: () => Promise<void>;
  saveCurrentProject: () => Promise<void>;
  loadProjectData: (id: string) => Promise<void>;
  deleteProjectData: (id: string) => Promise<void>;
  createNewProject: (name: string) => Promise<void>;
}

// Variables for auto-save debounce
let autoSaveTimeout: NodeJS.Timeout | null = null;
const AUTO_SAVE_INTERVAL = 10000; // 10 seconds

export const useMusicStore = create<MusicStore>((set, get) => ({
  // Initial state
  params: DEFAULT_PARAMS,
  currentTrack: null,
  projects: [],
  currentProjectId: null,
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
      
      // Auto-save the project if there is one, or create one if none exists
      if (!get().currentProjectId) {
         get().createNewProject(`Generated Track - ${new Date().toLocaleTimeString()}`);
      } else {
         get().saveCurrentProject();
      }

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
  
  // Generate a variation of a single stem
  generateStemVariation: async (stemType: StemType) => {
    const { currentTrack, params } = get();
    if (!currentTrack) return;

    const existingStem = currentTrack.stems.find(s => s.type === stemType);
    if (!existingStem) return;

    set({ isGenerating: true });

    try {
      const newStem = await generateStemVariation(existingStem, params);

      set((state) => ({
        currentTrack: state.currentTrack ? {
          ...state.currentTrack,
          stems: state.currentTrack.stems.map(s =>
            s.type === stemType ? newStem : s
          ),
        } : null,
        isGenerating: false,
      }));

      toast.success(`${stemType} stem variation generated`);

      // Restart playback if playing to hear changes
      if (get().isPlaying) {
        get().restartPlayback();
      }
    } catch (error) {
      console.error('Stem variation failed:', error);
      toast.error(`Failed to generate ${stemType} stem variation`);
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

    // Trigger auto-save
    if (autoSaveTimeout) clearTimeout(autoSaveTimeout);
    autoSaveTimeout = setTimeout(() => {
      get().saveCurrentProject();
    }, AUTO_SAVE_INTERVAL);
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

    // Trigger auto-save
    if (autoSaveTimeout) clearTimeout(autoSaveTimeout);
    autoSaveTimeout = setTimeout(() => {
      get().saveCurrentProject();
    }, AUTO_SAVE_INTERVAL);
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

    // Trigger auto-save
    if (autoSaveTimeout) clearTimeout(autoSaveTimeout);
    autoSaveTimeout = setTimeout(() => {
      get().saveCurrentProject();
    }, AUTO_SAVE_INTERVAL);
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

  // --- Project Actions ---

  fetchProjects: async () => {
    try {
      const projects = await getProjects();
      set({ projects });
    } catch (err) {
      console.error('Failed to fetch projects:', err);
    }
  },

  saveCurrentProject: async () => {
    const { currentTrack, currentProjectId, effects, projects } = get();
    if (!currentTrack || !currentProjectId) return;

    try {
      // Find the current project to keep its original name and creation date
      const existingProject = projects.find(p => p.id === currentProjectId);

      const projectData: Project = {
        id: currentProjectId,
        name: existingProject?.name || `Project ${currentProjectId}`,
        track: currentTrack,
        effects: effects,
        createdAt: existingProject?.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await saveProject(projectData);

      // Update projects list
      await get().fetchProjects();
    } catch (err) {
      console.error('Auto-save failed:', err);
    }
  },

  createNewProject: async (name: string) => {
    const { currentTrack, effects } = get();
    if (!currentTrack) return;

    const projectId = crypto.randomUUID();

    const newProject: Project = {
      id: projectId,
      name,
      track: currentTrack,
      effects,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    try {
      await saveProject(newProject);
      set({ currentProjectId: projectId });
      await get().fetchProjects();
      toast.success('Project saved!');
    } catch (err) {
      console.error('Failed to create project:', err);
      toast.error('Failed to save project');
    }
  },

  loadProjectData: async (id: string) => {
    try {
      const project = await loadProject(id);
      if (!project) throw new Error('Project not found');

      set({ isGenerating: true, generationProgress: 0 });

      // When loading a track from IndexedDB/JSON, its audioBuffers are gone.
      // We must regenerate the audio buffers from the stored notes
      const engine = getAudioEngine();

      // Show loading progress
      set({ generationProgress: 20 });

      const restoredStems = await Promise.all(
        project.track.stems.map(async (stem) => {
          // Re-render notes into a new audio buffer
          const audioBuffer = await engine.renderNotesToBufferAsync(
            stem.notes,
            project.track.duration,
            stem.type,
            stem.synthParams
          );

          return {
            ...stem,
            audioBuffer
          };
        })
      );

      const restoredTrack: Track = {
        ...project.track,
        stems: restoredStems
      };

      set({
        currentTrack: restoredTrack,
        params: project.track.params,
        effects: project.effects,
        currentProjectId: project.id,
        isGenerating: false,
        generationProgress: 100
      });

      // Also apply loaded effects to engine
      engine.setEffects(project.effects);

      toast.success(`Loaded project: ${project.name}`);

    } catch (err) {
      console.error('Failed to load project:', err);
      toast.error('Failed to load project');
      set({ isGenerating: false });
    }
  },

  deleteProjectData: async (id: string) => {
    try {
      await deleteProject(id);

      const { currentProjectId } = get();
      if (currentProjectId === id) {
        set({ currentProjectId: null });
      }

      await get().fetchProjects();
      toast.success('Project deleted');
    } catch (err) {
      console.error('Failed to delete project:', err);
      toast.error('Failed to delete project');
    }
  },
}));
