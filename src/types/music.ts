// Music generation types for Loco-Tunes

export type Genre = 'electronic' | 'hiphop' | 'ambient' | 'rock' | 'jazz';

export type Mood = 'happy' | 'sad' | 'energetic' | 'calm' | 'dark' | 'uplifting';

export type StemType = 'drums' | 'bass' | 'melody' | 'harmony';

export interface GenerationParams {
  prompt: string;
  bpm: number;
  genre: Genre;
  mood: Mood;
  duration: number; // in seconds
  key: string;
  scale: 'major' | 'minor' | 'pentatonic' | 'blues' | 'dorian';
  complexity: number; // 0-1
}

export interface Note {
  pitch: number; // MIDI note number
  velocity: number; // 0-127
  startTime: number; // in seconds
  duration: number; // in seconds
}

export interface Stem {
  type: StemType;
  notes: Note[];
  audioBuffer?: AudioBuffer;
  volume: number; // 0-1
  muted: boolean;
  solo: boolean;
  color: string;
}

export interface Track {
  id: string;
  name: string;
  params: GenerationParams;
  stems: Stem[];
  duration: number;
  createdAt: Date;
}

export interface EffectSettings {
  reverb: {
    enabled: boolean;
    mix: number; // 0-1
    decay: number; // in seconds
  };
  eq: {
    enabled: boolean;
    low: number; // -12 to +12 dB
    mid: number;
    high: number;
  };
  compressor: {
    enabled: boolean;
    threshold: number; // -60 to 0 dB
    ratio: number; // 1-20
    attack: number; // in seconds
    release: number; // in seconds
  };
}

export interface HardwareTier {
  level: 'basic' | 'standard' | 'pro';
  cores: number;
  memory: number;
  hasWebAudio: boolean;
  maxDuration: number;
  recommendedComplexity: number;
}

export interface MusicState {
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
  
  // Actions
  setParams: (params: Partial<GenerationParams>) => void;
  generateTrack: () => Promise<void>;
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
}

// Scale definitions (semitone intervals from root)
export const SCALES: Record<string, number[]> = {
  major: [0, 2, 4, 5, 7, 9, 11],
  minor: [0, 2, 3, 5, 7, 8, 10],
  pentatonic: [0, 2, 4, 7, 9],
  blues: [0, 3, 5, 6, 7, 10],
  dorian: [0, 2, 3, 5, 7, 9, 10],
};

// Chord progressions by genre
export const CHORD_PROGRESSIONS: Record<Genre, number[][]> = {
  electronic: [[0, 0], [3, 0], [4, 0], [4, 5]], // I - IV - V - V/V
  hiphop: [[0, 0], [2, -1], [3, 0], [5, 0]], // i - III - IV - VI
  ambient: [[0, 0], [0, 0], [2, 0], [3, 0]], // Sustained patterns
  rock: [[0, 0], [4, 0], [5, 0], [4, 0]], // I - V - VI - V
  jazz: [[0, 0], [3, 1], [4, 0], [2, 0]], // ii-V-I variations
};

// Note names for MIDI conversion
export const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

// Default values
export const DEFAULT_PARAMS: GenerationParams = {
  prompt: '',
  bpm: 120,
  genre: 'electronic',
  mood: 'energetic',
  duration: 30,
  key: 'C',
  scale: 'minor',
  complexity: 0.5,
};

export const DEFAULT_EFFECTS: EffectSettings = {
  reverb: {
    enabled: true,
    mix: 0.3,
    decay: 2.0,
  },
  eq: {
    enabled: true,
    low: 0,
    mid: 0,
    high: 0,
  },
  compressor: {
    enabled: true,
    threshold: -24,
    ratio: 4,
    attack: 0.003,
    release: 0.25,
  },
};

// Stem colors for UI
export const STEM_COLORS: Record<StemType, string> = {
  drums: '#ef4444',   // red
  bass: '#3b82f6',    // blue
  melody: '#22c55e',  // green
  harmony: '#a855f7', // purple
};
