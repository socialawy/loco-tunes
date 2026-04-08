import {
  Track,
  Stem,
  StemType,
  GenerationParams,
  Note,
  Chord,
  STEM_COLORS,
  SectionType,
} from '@/types/music';
import { getAudioEngine } from './engine';
import {
  noteToMidi,
  generateChordProgression,
  generateBassNotes,
  generateHarmonyNotes,
} from './chords';
import { generateDrumNotes } from './drums';
import { generateMelodyNotes } from './melody';
import { v4 as generateId } from 'uuid';

// Helper types for hardware detection
interface ExtendedNavigator extends Navigator {
  deviceMemory?: number;
  connection?: {
    effectiveType?: string;
  };
}

interface ExtendedPerformance extends Performance {
  memory?: {
    jsHeapSizeLimit: number;
  };
}

export async function generateTrack(params: GenerationParams): Promise<Track> {
  const { bpm, genre, mood, duration, key, scale, complexity } = params;
  
  // Convert key to MIDI note number
  const rootMidi = noteToMidi(key, 4);
  
  // Calculate number of bars based on BPM and duration
  const beatsPerBar = 4;
  const beatDuration = 60 / bpm;
  const numBars = Math.ceil(duration / (beatsPerBar * beatDuration));
  
  // Generate sections
  // Assuming a typical structure: intro (4) -> verse (8) -> chorus (8) -> verse (8) -> chorus (8) -> outro (4)
  // We'll calculate how many blocks of bars we have and assign them.
  const sections: { type: SectionType; startBar: number; numBars: number }[] = [];
  let currentBar = 0;
  
  const addSection = (type: SectionType, bars: number) => {
    const barsToAdd = Math.min(bars, numBars - currentBar);
    if (barsToAdd > 0) {
      sections.push({ type, startBar: currentBar, numBars: barsToAdd });
      currentBar += barsToAdd;
    }
  };

  // Simple logic to distribute total bars into sections
  if (numBars <= 8) {
    addSection('verse', numBars);
  } else if (numBars <= 16) {
    addSection('intro', 4);
    addSection('chorus', numBars - 4);
  } else {
    addSection('intro', 4);
    let isVerse = true;
    while (currentBar < numBars - 4) {
      addSection(isVerse ? 'verse' : 'chorus', 8);
      isVerse = !isVerse;
    }
    addSection('outro', numBars - currentBar);
  }

  // Generate sections
  let chords: ReturnType<typeof generateChordProgression> = [];
  let drumsNotes: Note[] = [];
  let bassNotes: Note[] = [];
  let melodyNotes: Note[] = [];
  let harmonyNotes: Note[] = [];

  for (const section of sections) {
    // Generate section chords
    const sectionChords = generateChordProgression(rootMidi, genre, scale, section.numBars, section.type);

    // Shift the bars in chords array to absolute bar positions
    const shiftedChords = sectionChords.map(c => ({
      ...c,
      bar: c.bar + section.startBar
    }));
    chords.push(...shiftedChords);

    // Section roots
    const sectionRoots = sectionChords.map(c => c.chord[0]);

    // Drums
    const sectionDrums = generateDrumNotes(genre, bpm, section.numBars, beatsPerBar, 2, section.type);
    const sectionStartTime = section.startBar * beatsPerBar * beatDuration;

    // Shift drum notes
    const shiftedDrums = sectionDrums.map(n => ({
      ...n,
      startTime: n.startTime + sectionStartTime
    }));
    drumsNotes.push(...shiftedDrums);

    // Bass
    const sectionBass = generateBassNotes(shiftedChords, beatsPerBar, bpm, genre);
    bassNotes.push(...sectionBass);

    // Melody
    const sectionMelody = generateMelodyNotes(rootMidi, scale, genre, mood, bpm, section.numBars, complexity, sectionRoots, section.type, params.motif);
    const shiftedMelody = sectionMelody.map(n => ({
      ...n,
      startTime: n.startTime + sectionStartTime
    }));
    melodyNotes.push(...shiftedMelody);

    // Harmony
    const sectionHarmony = generateHarmonyNotes(shiftedChords, beatsPerBar, bpm);
    harmonyNotes.push(...sectionHarmony);
  }
  
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
        stem.type,
        stem.synthParams
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
    sections,
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
  
  const sections = track.sections || [{ type: 'verse' as SectionType, startBar: 0, numBars }];

  let notes: Note[] = [];
  let allChords: ReturnType<typeof generateChordProgression> = [];

  for (const section of sections) {
    const sectionChords = generateChordProgression(rootMidi, genre, scale, section.numBars, section.type);
    const shiftedChords = sectionChords.map(c => ({
      ...c,
      bar: c.bar + section.startBar
    }));
    allChords.push(...shiftedChords);

    const sectionRoots = sectionChords.map(c => c.chord[0]);
    const sectionStartTime = section.startBar * beatsPerBar * beatDuration;

    let sectionNotes: Note[] = [];

    switch (stemType) {
      case 'drums':
        sectionNotes = generateDrumNotes(genre, bpm, section.numBars, beatsPerBar, 2, section.type)
          .map(n => ({ ...n, startTime: n.startTime + sectionStartTime }));
        break;
      case 'bass':
        sectionNotes = generateBassNotes(shiftedChords, beatsPerBar, bpm, genre);
        break;
      case 'melody':
        sectionNotes = generateMelodyNotes(rootMidi, scale, genre, mood, bpm, section.numBars, complexity, sectionRoots, section.type, track.params.motif)
          .map(n => ({ ...n, startTime: n.startTime + sectionStartTime }));
        break;
      case 'harmony':
        sectionNotes = generateHarmonyNotes(shiftedChords, beatsPerBar, bpm);
        break;
    }

    notes.push(...sectionNotes);
  }
  
  const engine = getAudioEngine();
  const existingStem = track.stems.find(s => s.type === stemType);

  const audioBuffer = await engine.renderNotesToBufferAsync(
    notes,
    track.duration,
    stemType,
    existingStem?.synthParams
  );
  
  return {
    type: stemType,
    notes,
    audioBuffer,
    volume: existingStem?.volume ?? 0.7,
    muted: existingStem?.muted ?? false,
    solo: existingStem?.solo ?? false,
    color: STEM_COLORS[stemType],
    synthParams: existingStem?.synthParams,
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

  const lastNote = stem.notes.length > 0 ? stem.notes[stem.notes.length - 1] : null;
  const lastNoteEnd = lastNote ? lastNote.startTime + lastNote.duration : 0;
  const numBars = Math.ceil(lastNoteEnd > 0
    ? lastNoteEnd / (beatsPerBar * beatDuration)
    : 4);
  
  // Add some variation by adjusting complexity
  const variedComplexity = Math.max(0, Math.min(1, complexity + (Math.random() - 0.5) * 0.3));
  
  // For variation, we assume it's one big verse for simplicity,
  // or we can recreate a single block.
  const sectionType = 'verse';
  const chords = generateChordProgression(rootMidi, genre, scale, numBars, sectionType);
  const chordRoots = chords.map(c => c.chord[0]);
  let notes: Note[] = [];
  
  switch (stem.type) {
    case 'drums':
      notes = generateDrumNotes(genre, bpm, numBars, beatsPerBar, 2, sectionType);
      break;
    case 'bass':
      notes = generateBassNotes(chords, beatsPerBar, bpm, genre);
      break;
    case 'melody':
      notes = generateMelodyNotes(rootMidi, scale, genre, mood, bpm, numBars, variedComplexity, chordRoots, sectionType, params.motif);
      break;
    case 'harmony':
      notes = generateHarmonyNotes(chords, beatsPerBar, bpm);
      break;
  }
  
  const engine = getAudioEngine();
  const duration = numBars * beatsPerBar * beatDuration;
  const audioBuffer = await engine.renderNotesToBufferAsync(
    notes,
    duration,
    stem.type,
    stem.synthParams
  );
  
  return {
    ...stem,
    notes,
    audioBuffer,
  };
}

// Helper function to manually override hardware detection
export function setHardwareOverride(memory: number, cores?: number) {
  if (typeof window === 'undefined') return;

  localStorage.setItem('loco-tunes-memory-override', memory.toString());
  if (cores) {
    localStorage.setItem('loco-tunes-cores-override', cores.toString());
  }
  console.log('Hardware override set:', { memory, cores });
}

// Helper function to clear manual override
export function clearHardwareOverride() {
  if (typeof window === 'undefined') return;

  localStorage.removeItem('loco-tunes-memory-override');
  localStorage.removeItem('loco-tunes-cores-override');
  console.log('Hardware override cleared');
}

// Detect hardware capabilities
export function detectHardwareCapabilities(): {
  level: 'basic' | 'standard' | 'pro';
  cores: number;
  memory: number;
  maxDuration: number;
  recommendedComplexity: number;
  hasWebAudio: boolean;
  networkType: string;
} {
  // SSR safety check
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return {
      level: 'standard',
      cores: 4,
      memory: 8,
      maxDuration: 30,
      recommendedComplexity: 0.5,
      hasWebAudio: false,
      networkType: 'unknown'
    };
  }

  // Check for manual override in localStorage
  const manualMemory = localStorage.getItem('loco-tunes-memory-override');
  const manualCores = localStorage.getItem('loco-tunes-cores-override');

  const cores = manualCores ? parseInt(manualCores) : navigator.hardwareConcurrency || 4;
  
  // Better memory detection with multiple fallbacks
  let memory = 8; // default fallback
  try {
    if (manualMemory) {
      memory = parseInt(manualMemory);
    } else {
      const nav = navigator as ExtendedNavigator;
      // Try deviceMemory API first
      const deviceMemory = nav.deviceMemory;
      memory = deviceMemory || 8;
      
      // Try performance.memory as additional check (Chrome)
      if (typeof performance !== 'undefined') {
        const perf = performance as ExtendedPerformance;
        if (perf.memory) {
          const jsHeapSizeLimit = perf.memory.jsHeapSizeLimit;
          const estimatedMemory = jsHeapSizeLimit / (1024 ** 3); // Convert to GB

          // Use the higher of deviceMemory or estimatedMemory
          if (estimatedMemory > memory) {
            memory = Math.round(estimatedMemory);
          }

          // Additional heuristic: if we have 8+ cores but memory seems low, assume at least 16GB
          // BUT only on desktop, not mobile (to avoid over-allocating memory on mobile)
          const isMobile = (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
                        (nav.maxTouchPoints && nav.maxTouchPoints > 0));

          if (!isMobile && cores >= 8 && memory < 16) {
            console.log('Heuristic: 8+ cores detected on desktop, assuming 16GB RAM');
            memory = 16;
          } else if (isMobile) {
            console.log('Mobile device detected, using conservative memory detection');
            // On mobile, be more conservative - don't assume high memory
            memory = Math.min(memory, 8); // Cap mobile at 8GB max
          }
        }
      }
      
      // Clamp to reasonable range
      memory = Math.max(4, Math.min(memory, 128));
    }
    
    console.log('Hardware detection:', { cores, memory, deviceMemory: (navigator as ExtendedNavigator).deviceMemory, manualOverride: !!manualMemory });
  } catch (e) {
    console.warn('Could not detect memory, using default:', e);
  }
  const hasWebAudio = typeof AudioContext !== 'undefined' || typeof (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext !== 'undefined';
  
  // Network detection
  let networkType = 'unknown';
  try {
    const nav = navigator as ExtendedNavigator;
    if (nav.connection) {
      networkType = nav.connection.effectiveType || 'unknown';
    }
  } catch (e) {
    console.warn('Network detection failed:', e);
  }
  
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
    networkType,
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
