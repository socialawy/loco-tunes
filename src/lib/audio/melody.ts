// Melody generation with scale-based patterns

import { SCALES } from '@/types/music';
import type { Genre, Note, Mood, SectionType } from '@/types/music';
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
  chordRoots: number[] = [],
  sectionType: SectionType = 'verse',
  motif?: Note[]
): Note[] {
  const notes: Note[] = [];
  const scale = getScale(rootMidi, scaleName);
  const beatDuration = 60 / bpm;
  
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
  let noteIndex = 0;
  
  // If a motif is provided, extract its relative pattern
  interface MotifStep {
    relativePitch: number; // Interval from the motif's first note
    relativeStart: number; // Time relative to motif start (normalized to beats)
    relativeDuration: number; // Duration normalized to beats
    velocity: number;
  }

  let motifSteps: MotifStep[] | null = null;
  let motifLengthBeats = 16; // Default pattern length in beats (4 bars)

  if (motif && motif.length > 0) {
    motifSteps = [];

    // Sort motif notes by time just in case
    const sortedMotif = [...motif].sort((a, b) => a.startTime - b.startTime);

    // Find the first note to use as a baseline
    const firstNote = sortedMotif[0];
    const basePitch = firstNote.pitch;
    const baseTime = firstNote.startTime;

    // Original tempo might be different, but we'll assume the original beatDuration
    // was what made the motif. To make it tempo-independent, we don't know the exact
    // original tempo here, but we can assume relative gaps represent rhythm.
    // Instead of complex tempo mapping, we just map the rhythm into our new beatDuration grid.
    // We assume the motif spans some number of bars in the original tempo.
    // Let's normalize it so we just keep intervals and scale them to our tempo.

    const lastNote = sortedMotif[sortedMotif.length - 1];
    const motifDurationSecs = (lastNote.startTime + lastNote.duration) - baseTime;

    // We'll map the motif's shape onto our scale by finding the nearest scale note
    // for each relative interval.

    sortedMotif.forEach(n => {
      motifSteps!.push({
        relativePitch: n.pitch - basePitch,
        // Keep raw time differences, we'll scale them in the loop assuming
        // they were generated with some BPM. Without original BPM, we just
        // treat relativeStart as literal seconds and rely on it sounding
        // similar if tempi are close, OR we can try to guess beat intervals.
        // For simplicity, we just use the raw intervals and adjust by the new beatDuration
        // relative to a standard 120BPM (0.5s) to avoid stretching too much if BPM changed.
        // Actually, let's just use the rhythm as-is, but scaled if we want.
        // To be safer, we'll use raw relative seconds and let them play out.
        relativeStart: n.startTime - baseTime,
        relativeDuration: n.duration,
        velocity: n.velocity
      });
    });

    motifLengthBeats = Math.max(16, Math.ceil((motifDurationSecs / beatDuration)));
  }

  if (motifSteps) {
    // Generate melody by looping/adapting the motif
    // Start base note near the middle of the new scale
    currentScaleIndex = Math.floor(extendedScale.length / 2);
    const baseNewPitch = extendedScale[currentScaleIndex];

    while (currentTime < numBars * 4 * beatDuration) {
      // Find where we are in the motif loop
      const loopTime = currentTime % (motifLengthBeats * beatDuration);

      // If we are at the start of a loop iteration, we can shift the base pitch slightly
      // to create a progression effect (sequence)
      if (loopTime === 0 && currentTime > 0) {
        if (Math.random() > 0.5) {
            currentScaleIndex = Math.max(0, Math.min(extendedScale.length - 1, currentScaleIndex + (Math.random() > 0.5 ? 1 : -1)));
        }
      }

      const newBasePitch = extendedScale[currentScaleIndex];

      for (const step of motifSteps) {
        const stepTime = currentTime + step.relativeStart;
        if (stepTime >= numBars * 4 * beatDuration) continue;

        // Map the relative pitch to the new scale
        const targetPitch = newBasePitch + step.relativePitch;

        // Find the closest note in the current extended scale
        let closestScalePitch = extendedScale[0];
        let minDiff = Math.abs(targetPitch - closestScalePitch);

        for (let i = 1; i < extendedScale.length; i++) {
          const diff = Math.abs(targetPitch - extendedScale[i]);
          if (diff < minDiff) {
            minDiff = diff;
            closestScalePitch = extendedScale[i];
          }
        }

        // Occasional variations for complexity
        const shouldVary = Math.random() < (complexity * 0.2);
        let finalPitch = closestScalePitch;

        if (shouldVary) {
             const currentIndex = extendedScale.indexOf(closestScalePitch);
             if (currentIndex !== -1) {
                 const offset = Math.random() > 0.5 ? 1 : -1;
                 const newIndex = Math.max(0, Math.min(extendedScale.length - 1, currentIndex + offset));
                 finalPitch = extendedScale[newIndex];
             }
        }

        notes.push({
          pitch: finalPitch,
          velocity: Math.max(0, Math.min(127, step.velocity + (Math.random() * 20 - 10))),
          startTime: stepTime,
          duration: step.relativeDuration * (0.9 + Math.random() * 0.2), // slight timing variation
        });
      }

      currentTime += motifLengthBeats * beatDuration;
    }

    return notes;
  }

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
