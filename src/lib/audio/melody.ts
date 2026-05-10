// Melody generation with scale-based patterns

import { SCALES } from '@/types/music';
import type { Genre, Note, Mood, SectionType, MelodyMotif } from '@/types/music';
import { getScale } from './chords';

// Motif extraction: Normalizes notes so that the first note is at pitch offset 0 and start time 0.
// Also calculates relative durations and timing.
export function extractMotif(notes: Note[]): Note[] {
  if (!notes || notes.length === 0) return [];

  const firstNote = notes[0];
  const basePitch = firstNote.pitch;
  const baseTime = firstNote.startTime;

  return notes.map(note => ({
    pitch: note.pitch - basePitch,
    velocity: note.velocity,
    startTime: note.startTime - baseTime,
    duration: note.duration,
  }));
}

// Melody rhythm patterns by genre
const MELODY_RHYTHM_PATTERNS: Record<Genre, number[][]> = {
  electronic: [
    [0.5, 0.25, 0.25, 0.5, 0.25, 0.25, 0.5, 0.5],
    [0.25, 0.25, 0.25, 0.25, 0.5, 0.25, 0.25, 0.5],
    [0.5, 0.5, 0.25, 0.25, 0.25, 0.25, 0.5, 0.5],
  ],
  hiphop: [
    [0.25, 0.5, 0.25, 0.25, 0.5, 0.25, 0.25, 0.25],
    [0.5, 0.25, 0.25, 0.5, 0.25, 0.5, 0.25, 0.5],
    [0.25, 0.25, 0.5, 0.25, 0.25, 0.5, 0.5, 0.25],
  ],
  ambient: [
    [2, 2, 2, 2],
    [1, 2, 1, 2],
    [1.5, 1.5, 1.5, 0.5],
  ],
  rock: [
    [0.5, 0.5, 0.25, 0.25, 0.5, 0.5, 0.25, 0.25],
    [0.25, 0.25, 0.5, 0.25, 0.25, 0.5, 0.25, 0.5],
    [0.5, 0.25, 0.25, 0.5, 0.25, 0.25, 0.5, 0.5],
  ],
  jazz: [
    [0.5, 0.25, 0.25, 0.25, 0.25, 0.5, 0.25, 0.75],
    [0.25, 0.5, 0.25, 0.25, 0.25, 0.25, 0.5, 0.75],
    [0.75, 0.25, 0.5, 0.25, 0.25, 0.5, 0.25, 0.5],
  ],
};

// Melody contour shapes
type ContourType = 'ascending' | 'descending' | 'arch' | 'valley' | 'wave';

// Get melody direction bias based on mood
function getMoodBias(mood: Mood): { contour: ContourType; jumpiness: number } {
  switch (mood) {
    case 'happy':
      return { contour: 'ascending', jumpiness: 0.3 };
    case 'sad':
      return { contour: 'descending', jumpiness: 0.1 };
    case 'energetic':
      return { contour: 'wave', jumpiness: 0.5 };
    case 'calm':
      return { contour: 'arch', jumpiness: 0.15 };
    case 'dark':
      return { contour: 'valley', jumpiness: 0.2 };
    case 'uplifting':
      return { contour: 'ascending', jumpiness: 0.25 };
    default:
      return { contour: 'wave', jumpiness: 0.2 };
  }
}

// Generate a melody note sequence
export function generateMelodyNotes(
  rootMidi: number,
  scaleName: string,
  genre: Genre,
  mood: Mood,
  bpm: number,
  numBars: number,
  complexity: number,
  chordRoots: number[] = [],
  sectionType: SectionType = 'verse',
  motif?: MelodyMotif
): Note[] {
  const notes: Note[] = [];
  const scale = getScale(rootMidi, scaleName);
  const beatDuration = 60 / bpm;

  // Extend scale across octaves for melody range
  const extendedScale: number[] = [];
  for (let octave = -1; octave <= 2; octave++) {
    scale.forEach(note => extendedScale.push(note + octave * 12));
  }

  // Helper to snap a pitch to the closest note in the extended scale
  const snapToScale = (targetPitch: number) => {
    return extendedScale.reduce((prev, curr) =>
      Math.abs(curr - targetPitch) < Math.abs(prev - targetPitch) ? curr : prev
    );
  };

  // Use saved motif if provided
  if (motif && motif.notes.length > 0) {
    const motifPattern = extractMotif(motif.notes);
    const timeScale = (60 / bpm) / (60 / motif.originalBpm); // adjust timing based on BPM diff

    // Find closest note in the current scale to the rootMidi to act as the base pitch
    // Usually rootMidi is already in the scale, but we ensure it matches the range.
    // For simplicity, we just use the rootMidi + 12 (an octave up for melody).
    const basePitch = rootMidi + 12;

    let currentTime = 0;
    const totalDuration = numBars * 4 * beatDuration;

    // Repeat motif to fill the section
    while (currentTime < totalDuration) {
      for (const mNote of motifPattern) {
        const scaledStartTime = mNote.startTime * timeScale;
        const scaledDuration = mNote.duration * timeScale;

        if (currentTime + scaledStartTime >= totalDuration) {
          break; // Stop if we exceed the section duration
        }

        // Find closest pitch in scale
        const targetPitch = snapToScale(basePitch + mNote.pitch);

        // Dynamic velocity changes based on section type
        let baseVelocity = mNote.velocity;
        const contourProgress = (currentTime + scaledStartTime) / totalDuration;

        if (sectionType === 'verse') {
          baseVelocity += Math.floor(contourProgress * 20);
        } else if (sectionType === 'chorus') {
          baseVelocity += 20;
        } else if (sectionType === 'outro') {
          baseVelocity -= Math.floor(contourProgress * 20);
        } else if (sectionType === 'intro') {
          baseVelocity -= 10;
        }

        notes.push({
          pitch: targetPitch,
          velocity: Math.max(0, Math.min(127, Math.round(baseVelocity))),
          startTime: currentTime + scaledStartTime,
          duration: scaledDuration,
        });
      }

      // Move currentTime forward by the duration of one motif repetition
      // Calculate length of the motif pattern in time
      const motifLength = motifPattern[motifPattern.length - 1].startTime * timeScale + motifPattern[motifPattern.length - 1].duration * timeScale;
      // Snap to nearest beat or half beat to avoid drifting too much
      const snapTo = beatDuration * 2;
      currentTime += Math.ceil(motifLength / snapTo) * snapTo;

      if (motifLength === 0) break; // Infinite loop protection
    }

    return notes;
  }
  
  // Get mood-based parameters
  const { contour, jumpiness } = getMoodBias(mood);
  
  // Select rhythm pattern based on genre
  const rhythmPatterns = MELODY_RHYTHM_PATTERNS[genre] || MELODY_RHYTHM_PATTERNS.electronic;
  const selectedPattern = rhythmPatterns[Math.floor(Math.random() * rhythmPatterns.length)];
  
  let currentTime = 0;
  let currentScaleIndex = Math.floor(extendedScale.length / 2); // Start in middle of range
  let barCount = 0;
  let noteIndex = 0;
  
  while (currentTime < numBars * 4 * beatDuration) {
    const barProgress = (currentTime % (4 * beatDuration)) / (4 * beatDuration);
    const patternIndex = noteIndex % selectedPattern.length;
    const duration = selectedPattern[patternIndex] * beatDuration;
    
    // Determine if this note should play (complexity affects density)
    const shouldPlay = Math.random() < (0.6 + complexity * 0.3);
    
    if (shouldPlay && duration > 0) {
      // Apply contour bias to scale index movement
      let direction = 0;
      const contourProgress = currentTime / (numBars * 4 * beatDuration);
      
      switch (contour) {
        case 'ascending':
          direction = Math.random() < 0.6 ? 1 : -1;
          break;
        case 'descending':
          direction = Math.random() < 0.6 ? -1 : 1;
          break;
        case 'arch':
          direction = contourProgress < 0.5 ? 1 : -1;
          break;
        case 'valley':
          direction = contourProgress < 0.5 ? -1 : 1;
          break;
        case 'wave':
          direction = Math.sin(contourProgress * Math.PI * 4) > 0 ? 1 : -1;
          break;
      }
      
      // Add randomness based on jumpiness
      if (Math.random() < jumpiness) {
        direction *= Math.floor(Math.random() * 3) + 1; // Bigger jumps
      }
      
      currentScaleIndex = Math.max(0, Math.min(extendedScale.length - 1, currentScaleIndex + direction));
      
      const pitch = extendedScale[currentScaleIndex];
      
      // Velocity varies based on position and randomness
      // Dynamic velocity changes (crescendo/decrescendo) based on section and contour progress
      let baseVelocity = genre === 'ambient' ? 60 : 80;

      // Crescendo for verse (building up), high for chorus, decrescendo for outro
      if (sectionType === 'verse') {
        baseVelocity += Math.floor(contourProgress * 20); // Crescendo
      } else if (sectionType === 'chorus') {
        baseVelocity += 20; // Consistently loud
      } else if (sectionType === 'outro') {
        baseVelocity -= Math.floor(contourProgress * 20); // Decrescendo
      } else if (sectionType === 'intro') {
        baseVelocity -= 10; // Softer intro
      }

      const velocity = Math.max(0, Math.min(127, Math.round(baseVelocity + Math.random() * 20)));
      
      notes.push({
        pitch,
        velocity,
        startTime: currentTime,
        duration: duration * (0.8 + Math.random() * 0.15), // Slight variation
      });
    }
    
    currentTime += duration;
    noteIndex++;
  }
  
  return notes;
}

// Generate arpeggiated melody pattern
export function generateArpeggioNotes(
  rootMidi: number,
  scaleName: string,
  bpm: number,
  numBars: number,
  pattern: 'up' | 'down' | 'updown' | 'random' = 'up'
): Note[] {
  const notes: Note[] = [];
  const scale = getScale(rootMidi, scaleName);
  const beatDuration = 60 / bpm;
  const noteLength = beatDuration / 2; // Eighth notes
  
  const totalNotes = numBars * 8; // 8 eighth notes per bar
  
  for (let i = 0; i < totalNotes; i++) {
    let scaleIndex: number;
    
    switch (pattern) {
      case 'up':
        scaleIndex = i % scale.length;
        break;
      case 'down':
        scaleIndex = (scale.length - 1) - (i % scale.length);
        break;
      case 'updown':
        const upDownIndex = i % (scale.length * 2 - 2);
        scaleIndex = upDownIndex < scale.length ? upDownIndex : (scale.length * 2 - 2) - upDownIndex;
        break;
      case 'random':
        scaleIndex = Math.floor(Math.random() * scale.length);
        break;
    }
    
    const octaveOffset = Math.floor(i / scale.length) * 12;
    
    notes.push({
      pitch: scale[scaleIndex] + octaveOffset,
      velocity: 70 + Math.random() * 20,
      startTime: i * noteLength,
      duration: noteLength * 0.9,
    });
  }
  
  return notes;
}

// Generate a countermelody (secondary melody that complements main melody)
export function generateCounterMelodyNotes(
  mainMelody: Note[],
  rootMidi: number,
  scaleName: string,
  bpm: number
): Note[] {
  const notes: Note[] = [];
  const scale = getScale(rootMidi, scaleName);
  
  // Add notes between main melody notes (call and response style)
  for (let i = 0; i < mainMelody.length - 1; i++) {
    const currentNote = mainMelody[i];
    const nextNote = mainMelody[i + 1];
    const gap = nextNote.startTime - currentNote.startTime - currentNote.duration;
    
    if (gap > 0.1) {
      // Find a harmonizing note
      const mainPitch = currentNote.pitch % 12;
      const harmonyOptions = scale.filter(s => {
        const diff = Math.abs((s % 12) - mainPitch);
        return diff === 3 || diff === 4 || diff === 7; // Thirds and fifths
      });
      
      if (harmonyOptions.length > 0) {
        const harmonyPitch = harmonyOptions[Math.floor(Math.random() * harmonyOptions.length)];
        
        notes.push({
          pitch: harmonyPitch + 12, // Octave above for brightness
          velocity: 50 + Math.random() * 20,
          startTime: currentNote.startTime + currentNote.duration + gap * 0.3,
          duration: gap * 0.4,
        });
      }
    }
  }
  
  return notes;
}

// Quantize notes to a grid
export function quantizeNotes(notes: Note[], gridValue: number = 0.25): Note[] {
  return notes.map(note => ({
    ...note,
    startTime: Math.round(note.startTime / gridValue) * gridValue,
    duration: Math.round(note.duration / gridValue) * gridValue || gridValue,
  }));
}
