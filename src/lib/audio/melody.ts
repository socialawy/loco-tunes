// Melody generation with scale-based patterns

import { SCALES } from '@/types/music';
import type { Genre, Note, Mood } from '@/types/music';
import { getScale } from './chords';

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
  chordRoots: number[] = []
): Note[] {
  const notes: Note[] = [];
  const scale = getScale(rootMidi, scaleName);
  const beatDuration = 60 / bpm;
  const barDuration = beatDuration * 4;
  
  // Extend scale across octaves for melody range
  const extendedScale: number[] = [];
  for (let octave = -1; octave <= 2; octave++) {
    scale.forEach(note => extendedScale.push(note + octave * 12));
  }
  
  // Get mood-based parameters
  const { contour, jumpiness } = getMoodBias(mood);
  
  // Select rhythm pattern based on genre
  const rhythmPatterns = MELODY_RHYTHM_PATTERNS[genre] || MELODY_RHYTHM_PATTERNS.electronic;
  const mainPattern = rhythmPatterns[0];
  const variationPattern = rhythmPatterns.length > 1 ? rhythmPatterns[1] : mainPattern;
  
  let currentTime = 0;
  let currentScaleIndex = Math.floor(extendedScale.length / 2); // Start in middle of range
  let noteIndex = 0;
  
  while (currentTime < numBars * barDuration) {
    const currentBar = Math.floor(currentTime / barDuration);
    const contourProgress = currentTime / (numBars * barDuration);

    // Switch to variation pattern for B parts/chorus sections (e.g. bars 8-15)
    const isVariationSection = Math.floor(currentBar / 8) % 2 === 1;
    const selectedPattern = isVariationSection ? variationPattern : mainPattern;

    const patternIndex = noteIndex % selectedPattern.length;
    const duration = selectedPattern[patternIndex] * beatDuration;
    
    // Add syncopation (slight shift in start time) for certain genres/sections
    let syncopationShift = 0;
    if ((genre === 'jazz' || genre === 'electronic') && Math.random() < complexity * 0.3) {
      syncopationShift = (Math.random() > 0.5 ? 1 : -1) * (beatDuration / 4); // 16th note shift
    }

    // Determine if this note should play (complexity affects density)
    // Less dense in verses, slightly more in choruses
    const sectionDensityBonus = isVariationSection ? 0.1 : 0;
    const shouldPlay = Math.random() < (0.6 + complexity * 0.3 + sectionDensityBonus);
    
    if (shouldPlay && duration > 0 && currentTime + syncopationShift >= 0) {
      // Apply contour bias to scale index movement strictly
      let targetDirection = 0;
      
      switch (contour) {
        case 'ascending':
          targetDirection = 1;
          break;
        case 'descending':
          targetDirection = -1;
          break;
        case 'arch':
          targetDirection = contourProgress < 0.5 ? 1 : -1;
          break;
        case 'valley':
          targetDirection = contourProgress < 0.5 ? -1 : 1;
          break;
        case 'wave':
          targetDirection = Math.sin(contourProgress * Math.PI * 4) > 0 ? 1 : -1;
          break;
      }
      
      // We don't want to strictly move up every note, just bias it heavily
      let direction = Math.random() < 0.75 ? targetDirection : (Math.random() < 0.5 ? -targetDirection : 0);

      // Add randomness based on jumpiness
      if (Math.random() < jumpiness) {
        direction *= Math.floor(Math.random() * 3) + 1; // Bigger jumps
      }
      
      // Occasional large interval leap for dramatic effect if complexity is high
      if (Math.random() < complexity * 0.1) {
          direction += (Math.random() > 0.5 ? 4 : -4);
      }

      currentScaleIndex = Math.max(0, Math.min(extendedScale.length - 1, currentScaleIndex + direction));
      
      // If we have chord roots, bias towards chord tones on downbeats
      let pitch = extendedScale[currentScaleIndex];
      const isDownbeat = (currentTime % beatDuration) < 0.05;
      if (isDownbeat && chordRoots.length > 0) {
          const currentChordRoot = chordRoots[Math.min(currentBar, chordRoots.length - 1)];
          // Only shift occasionally if we are not matching the chord root or its 5th
          const noteClass = pitch % 12;
          const rootClass = currentChordRoot % 12;
          const fifthClass = (currentChordRoot + 7) % 12;
          if (noteClass !== rootClass && noteClass !== fifthClass && Math.random() < 0.5) {
             // Shift pitch to nearest root or 5th
             const shiftToRoot = ((rootClass - noteClass + 12) % 12 <= 6) ? (rootClass - noteClass) : (rootClass - noteClass - 12);
             const shiftToFifth = ((fifthClass - noteClass + 12) % 12 <= 6) ? (fifthClass - noteClass) : (fifthClass - noteClass - 12);
             pitch += (Math.abs(shiftToRoot) < Math.abs(shiftToFifth)) ? shiftToRoot : shiftToFifth;
             // Ensure we stay in bounds roughly
             if (pitch < extendedScale[0] || pitch > extendedScale[extendedScale.length - 1]) {
                 pitch = extendedScale[currentScaleIndex]; // Revert
             }
          }
      }

      // Dynamic velocity shaping: crescendo towards the middle of a phrase, decrescendo at the end
      const phraseProgress = (currentBar % 4) / 4; // 4-bar phrases
      let phraseMultiplier = Math.sin(phraseProgress * Math.PI); // 0 -> 1 -> 0 shape
      // Emphasize downbeats
      if (isDownbeat) phraseMultiplier += 0.2;
      
      const baseVelocity = genre === 'ambient' ? 50 : 70;
      // Map phraseMultiplier (approx 0 to 1.2) to velocity range
      const dynamicVelocity = baseVelocity + (phraseMultiplier * 30);
      const velocity = Math.max(10, Math.min(127, Math.round(dynamicVelocity + (Math.random() * 10 - 5))));
      
      notes.push({
        pitch,
        velocity,
        startTime: currentTime + syncopationShift,
        duration: duration * (0.8 + Math.random() * 0.15), // Slight articulation variation
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
