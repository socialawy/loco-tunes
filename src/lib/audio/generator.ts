// Main music generator combining all components

import type { GenerationParams, Stem, StemType, Track, Note } from '@/types/music';
import { DEFAULT_EFFECTS, STEM_COLORS } from '@/types/music';
import { noteToMidi, generateChordProgression, generateHarmonyNotes, generateBassNotes } from './chords';
import { generateDrumNotes } from './drums';
import { generateMelodyNotes } from './melody';
import { getAudioEngine } from './engine';
import { v4 as uuidv4 } from 'uuid';

// Generate a unique ID without external dependency
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// Main generation function
export async function generateTrack(params: GenerationParams): Promise<Track> {
  const { bpm, genre, mood, duration, key, scale, complexity } = params;
  
  // Convert key to MIDI note number
  const rootMidi = noteToMidi(key, 4);
  
  // Calculate number of bars based on BPM and duration
  const beatsPerBar = 4;
  const beatDuration = 60 / bpm;
  const numBars = Math.ceil(duration / (beatsPerBar * beatDuration));
  
  // Generate chord progression
  const chords = generateChordProgression(rootMidi, genre, scale, numBars);
  
  // Extract chord roots for melody generation
  const chordRoots = chords.map(c => c.chord[0]);
  
  // Generate all stems
  const drumsNotes = generateDrumNotes(genre, bpm, numBars, beatsPerBar);
  const bassNotes = generateBassNotes(chords, beatsPerBar, bpm, genre);
  const melodyNotes = generateMelodyNotes(rootMidi, scale, genre, mood, bpm, numBars, complexity, chordRoots);
  const harmonyNotes = generateHarmonyNotes(chords, beatsPerBar, bpm);
  
  // Create stem objects
  const stems: Stem[] = [
    { type: 'drums', notes: drumsNotes, volume: 0.8, muted: false, solo: false, color: STEM_COLORS.drums },
    { type: 'bass', notes: bassNotes, volume: 0.75, muted: false, solo: false, color: STEM_COLORS.bass },
    { type: 'melody', notes: melodyNotes, volume: 0.7, muted: false, solo: false, color: STEM_COLORS.melody },
    { type: 'harmony', notes: harmonyNotes, volume: 0.6, muted: false, solo: false, color: STEM_COLORS.harmony },
  ];
  
  // Render audio buffers for each stem
  const engine = getAudioEngine();
  const actualDuration = numBars * beatsPerBar * beatDuration;
  
  for (const stem of stems) {
    try {
      stem.audioBuffer = await engine.renderNotesToBufferAsync(
        stem.notes,
        actualDuration,
        stem.type
      );
    } catch (error) {
      console.error(`Failed to render ${stem.type} stem:`, error);
    }
  }
  
  return {
    id: generateId(),
    name: `Track - ${genre} ${bpm} BPM`,
    params,
    stems,
    duration: actualDuration,
    createdAt: new Date(),
  };
}

// Regenerate a single stem
export async function regenerateStem(
  track: Track,
  stemType: StemType
): Promise<Stem> {
  const { bpm, genre, mood, key, scale, complexity } = track.params;
  const rootMidi = noteToMidi(key, 4);
  const beatsPerBar = 4;
  const beatDuration = 60 / bpm;
  const numBars = Math.ceil(track.duration / (beatsPerBar * beatDuration));
  
  let notes: Note[] = [];
  const chords = generateChordProgression(rootMidi, genre, scale, numBars);
  
  switch (stemType) {
    case 'drums':
      notes = generateDrumNotes(genre, bpm, numBars, beatsPerBar);
      break;
    case 'bass':
      notes = generateBassNotes(chords, beatsPerBar, bpm, genre);
      break;
    case 'melody':
      notes = generateMelodyNotes(rootMidi, scale, genre, mood, bpm, numBars, complexity);
      break;
    case 'harmony':
      notes = generateHarmonyNotes(chords, beatsPerBar, bpm);
      break;
  }
  
  const engine = getAudioEngine();
  const audioBuffer = await engine.renderNotesToBufferAsync(notes, track.duration, stemType);
  
  const existingStem = track.stems.find(s => s.type === stemType);
  
  return {
    type: stemType,
    notes,
    audioBuffer,
    volume: existingStem?.volume ?? 0.7,
    muted: existingStem?.muted ?? false,
    solo: existingStem?.solo ?? false,
    color: STEM_COLORS[stemType],
  };
}

// Variation generator - creates a variation of existing stem
export async function generateStemVariation(
  stem: Stem,
  params: GenerationParams
): Promise<Stem> {
  const { bpm, genre, mood, key, scale, complexity } = params;
  const rootMidi = noteToMidi(key, 4);
  const beatsPerBar = 4;
  const beatDuration = 60 / bpm;
  const numBars = Math.ceil(stem.notes.length > 0 
    ? stem.notes[stem.notes.length - 1].startTime / (beatsPerBar * beatDuration) + 1
    : 4);
  
  // Add some variation by adjusting complexity
  const variedComplexity = Math.max(0, Math.min(1, complexity + (Math.random() - 0.5) * 0.3));
  
  const chords = generateChordProgression(rootMidi, genre, scale, numBars);
  let notes: Note[] = [];
  
  switch (stem.type) {
    case 'drums':
      notes = generateDrumNotes(genre, bpm, numBars, beatsPerBar);
      break;
    case 'bass':
      notes = generateBassNotes(chords, beatsPerBar, bpm, genre);
      break;
    case 'melody':
      notes = generateMelodyNotes(rootMidi, scale, genre, mood, bpm, numBars, variedComplexity);
      break;
    case 'harmony':
      notes = generateHarmonyNotes(chords, beatsPerBar, bpm);
      break;
  }
  
  const engine = getAudioEngine();
  const duration = numBars * beatsPerBar * beatDuration;
  const audioBuffer = await engine.renderNotesToBufferAsync(notes, duration, stem.type);
  
  return {
    ...stem,
    notes,
    audioBuffer,
  };
}

// Detect hardware capabilities
export function detectHardwareCapabilities(): {
  level: 'basic' | 'standard' | 'pro';
  cores: number;
  memory: number;
  maxDuration: number;
  recommendedComplexity: number;
  hasWebAudio: boolean;
} {
  const cores = navigator.hardwareConcurrency || 4;
  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory || 8;
  const hasWebAudio = typeof AudioContext !== 'undefined' || typeof (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext !== 'undefined';
  
  let level: 'basic' | 'standard' | 'pro' = 'standard';
  let maxDuration = 30;
  let recommendedComplexity = 0.5;
  
  if (cores >= 8 && memory >= 16) {
    level = 'pro';
    maxDuration = 60;
    recommendedComplexity = 0.8;
  } else if (cores >= 4 && memory >= 8) {
    level = 'standard';
    maxDuration = 30;
    recommendedComplexity = 0.5;
  } else {
    level = 'basic';
    maxDuration = 15;
    recommendedComplexity = 0.3;
  }
  
  return {
    level,
    cores,
    memory,
    maxDuration,
    recommendedComplexity,
    hasWebAudio,
  };
}

// Validate generation parameters
export function validateParams(params: Partial<GenerationParams>): string[] {
  const errors: string[] = [];
  
  if (params.bpm && (params.bpm < 60 || params.bpm > 180)) {
    errors.push('BPM must be between 60 and 180');
  }
  
  if (params.duration && (params.duration < 5 || params.duration > 60)) {
    errors.push('Duration must be between 5 and 60 seconds');
  }
  
  if (params.complexity && (params.complexity < 0 || params.complexity > 1)) {
    errors.push('Complexity must be between 0 and 1');
  }
  
  return errors;
}
