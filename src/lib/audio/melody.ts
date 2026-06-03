// Melody generation with scale-based patterns

import { SCALES } from '@/types/music';
import type { Genre, Note, Mood, SectionType, Motif } from '@/types/music';
import { getScale, noteToMidi } from './chords';

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
  seedMotif?: Motif
): Note[] {
  const notes: Note[] = [];
  const scale = getScale(rootMidi, scaleName);
  const beatDuration = 60 / bpm;

  // Use seed motif if provided
  if (seedMotif && seedMotif.notes.length > 0) {
    const originalRootMidi = noteToMidi(seedMotif.originalKey, 4);
    const pitchShift = rootMidi - originalRootMidi;
    const timeScale = 60 / seedMotif.originalBpm / beatDuration; // Scale relative to BPM change

    // Find the total duration of the original motif
    const motifDuration = Math.max(...seedMotif.notes.map(n => n.startTime + n.duration));
    const targetDuration = numBars * 4 * beatDuration;

    let currentTimeOffset = 0;

    // Loop the motif to fill the new duration
    while (currentTimeOffset < targetDuration) {
      for (const note of seedMotif.notes) {
        const newStartTime = currentTimeOffset + note.startTime * timeScale;

        if (newStartTime >= targetDuration) break;

        // Apply variation based on complexity
        let notePitch = note.pitch + pitchShift;
        let noteVelocity = note.velocity;

        if (complexity > 0.5 && Math.random() < complexity * 0.3) {
          // Sometimes shift by an octave or to nearest scale note
          const octaveShift = Math.random() > 0.5 ? 12 : -12;
          notePitch += octaveShift;
        }

        // Snap to scale to stay in key
        const pitchClass = notePitch % 12;
        const rootClass = rootMidi % 12;
        const relativePitch = (pitchClass - rootClass + 12) % 12;

        // Very basic scale snapping
        const isNoteInScale = SCALES[scaleName]?.includes(relativePitch);

        if (!isNoteInScale && SCALES[scaleName]) {
          // Find nearest note in scale
          let nearestDist = 12;
          let nearestNote = relativePitch;
          for (const scaleNote of SCALES[scaleName]) {
            const dist = Math.min(
              Math.abs(scaleNote - relativePitch),
              12 - Math.abs(scaleNote - relativePitch)
            );
            if (dist < nearestDist) {
              nearestDist = dist;
              nearestNote = scaleNote;
            }
          }

          const shift = nearestNote - relativePitch;
          notePitch += shift;
        }

        notes.push({
          pitch: notePitch,
          velocity: Math.max(0, Math.min(127, noteVelocity + (Math.random() * 20 - 10))),
          startTime: newStartTime,
          duration: note.duration * timeScale * (0.9 + Math.random() * 0.2), // slight variation
        });
      }

      currentTimeOffset += motifDuration * timeScale;

      // Add small gap between loops
      currentTimeOffset += beatDuration * (complexity > 0.5 ? 1 : 2);
    }

    return notes;
  }
  
  // Extend scale across octaves for melody range
  const extendedScale: number[] = [];
  for (let octave = -1; octave <= 2; octave++) {
    scale.forEach(note => extendedScale.push(note + octave * 12));
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
