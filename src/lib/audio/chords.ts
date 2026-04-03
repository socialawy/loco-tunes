// Chord progression and harmony generation

import { SCALES, CHORD_PROGRESSIONS, NOTE_NAMES } from '@/types/music';
import type { Genre, Note } from '@/types/music';

// Get the frequency of a MIDI note
export function midiToFrequency(midi: number): number {
  return 440 * Math.pow(2, (midi - 69) / 12);
}

// Get MIDI note from note name and octave
export function noteToMidi(noteName: string, octave: number): number {
  const noteIndex = NOTE_NAMES.indexOf(noteName);
  if (noteIndex === -1) return 60; // Default to middle C
  return (octave + 1) * 12 + noteIndex;
}

// Get scale degrees in a key
export function getScale(rootMidi: number, scaleName: string): number[] {
  const intervals = SCALES[scaleName] || SCALES.major;
  return intervals.map(interval => rootMidi + interval);
}

// Generate chord tones from a root note
export function generateChord(
  rootMidi: number,
  chordType: 'major' | 'minor' | 'dim' | 'aug' | '7th' | 'minor7',
  octave: number = 3
): number[] {
  const root = rootMidi + (octave - 4) * 12;
  
  const chordIntervals: Record<string, number[]> = {
    major: [0, 4, 7],
    minor: [0, 3, 7],
    dim: [0, 3, 6],
    aug: [0, 4, 8],
    '7th': [0, 4, 7, 10],
    minor7: [0, 3, 7, 10],
  };
  
  const intervals = chordIntervals[chordType] || chordIntervals.major;
  return intervals.map(i => root + i);
}

// Generate a chord progression for a genre
export function generateChordProgression(
  rootMidi: number,
  genre: Genre,
  scaleName: string,
  numBars: number
): { chord: number[]; bar: number; type: string }[] {
  let progression = CHORD_PROGRESSIONS[genre] || CHORD_PROGRESSIONS.electronic;
  const scale = getScale(rootMidi, scaleName);
  
  // Extend basic progression to include variations (secondary dominants, borrowed chords)
  const createVariation = (baseProg: number[][]): number[][] => {
    return baseProg.map(([deg, mod], i) => {
      // 15% chance to substitute a chord with its secondary dominant or related chord
      if (Math.random() < 0.15 && i > 0 && i < baseProg.length - 1) {
        if (genre === 'jazz' || genre === 'rock') {
           // Secondary dominant (V/V) substituting a ii or IV
           return [(deg + 4) % 7, 1]; // Make it major
        }
        if (genre === 'electronic' || genre === 'hiphop') {
           // Borrowed chord from parallel minor (e.g. flat VI in major)
           if (scaleName === 'major' && deg === 5) {
             return [5, 1]; // Make vi major -> VI
           }
        }
      }
      return [deg, mod];
    });
  };

  const chords: { chord: number[]; bar: number; type: string }[] = [];
  
  // Song structure logic: Intro (4 bars), Verse (8 bars), Chorus (8 bars)...
  let currentSection = 'verse';
  let sectionProgression = [...progression];

  for (let bar = 0; bar < numBars; bar++) {
    // Change section every 8 bars to introduce A/B part variation
    if (bar % 8 === 0) {
      if (currentSection === 'verse') {
        currentSection = 'chorus';
        // Chorus often starts on the IV or vi chord, we rotate the progression or create variation
        sectionProgression = createVariation(progression);
      } else {
        currentSection = 'verse';
        sectionProgression = [...progression];
      }
    }

    const progIndex = bar % sectionProgression.length;
    const [scaleDegree, modifier] = sectionProgression[progIndex];
    
    // Get the root of the chord from scale degree
    const chordRoot = scale[scaleDegree % scale.length];
    
    // Determine chord type based on scale degree and modifier
    let chordType: 'major' | 'minor' | 'dim' | '7th' | 'minor7' = 'major';

    if (scaleName === 'minor') {
      if ([0, 3, 4].includes(scaleDegree % 7)) {
        chordType = 'minor';
      } else if (scaleDegree % 7 === 1) {
        chordType = 'dim'; // diminished ii chord in minor
      } else if (scaleDegree % 7 === 6) { // Leading tone (VII)
         chordType = 'major'; // usually subtonic is major in natural minor
      }
    } else {
      if ([1, 2, 5].includes(scaleDegree % 7)) {
        chordType = 'minor';
      } else if (scaleDegree % 7 === 6) {
        chordType = 'dim'; // diminished vii chord in major
      }
    }
    
    if (modifier === -1) chordType = 'minor';
    if (modifier === 1) chordType = 'major';
    if (modifier === 2) chordType = 'dim';
    
    // Genre specific voicings
    if (genre === 'jazz') {
      chordType = chordType === 'minor' ? 'minor7' : (chordType === 'major' ? '7th' : chordType);
    } else if (genre === 'ambient') {
       // Open up the chords for ambient
       chordType = chordType === 'minor' ? 'minor7' : chordType;
    }

    // Improve voice leading: Alternate inversions by adjusting octaves
    // Simple heuristic: if the root jumps too much, drop it an octave
    let octave = 3;
    if (chords.length > 0) {
       const prevRoot = chords[chords.length - 1].chord[0];
       const currentBaseRoot = chordRoot + (octave - 4) * 12;
       if (currentBaseRoot - prevRoot > 7) {
           octave = 2; // Invert down
       } else if (currentBaseRoot - prevRoot < -7) {
           octave = 4; // Invert up
       }
    }

    const chordNotes = generateChord(chordRoot, chordType, octave);

    // Voice leading - avoid parallel fifths by adjusting the 5th occasionally
    if (chords.length > 0 && Math.random() > 0.5) {
        const prevChord = chords[chords.length - 1].chord;
        // If it's just moving up/down a step, change inversion of the current chord
        if (chordNotes.length > 2 && prevChord.length > 2) {
            // Drop top note an octave
            chordNotes[2] -= 12;
        }
    }

    chords.push({ chord: chordNotes.sort((a,b)=>a-b), bar, type: chordType });
  }
  
  return chords;
}

// Generate harmony notes (pad/synth chords)
export function generateHarmonyNotes(
  chords: { chord: number[]; bar: number; type: string }[],
  beatsPerBar: number,
  bpm: number
): Note[] {
  const notes: Note[] = [];
  const beatDuration = 60 / bpm;
  
  for (const { chord, bar } of chords) {
    const startTime = bar * beatsPerBar * beatDuration;
    const duration = beatsPerBar * beatDuration * 0.95; // Slight gap between chords
    
    // Voice the chord across multiple octaves for richness
    for (const noteMidi of chord) {
      notes.push({
        pitch: noteMidi,
        velocity: 60,
        startTime,
        duration,
      });
      // Add octave doubling
      notes.push({
        pitch: noteMidi + 12,
        velocity: 50,
        startTime,
        duration,
      });
    }
  }
  
  return notes;
}

// Generate bass line following chord progression
export function generateBassNotes(
  chords: { chord: number[]; bar: number; type: string }[],
  beatsPerBar: number,
  bpm: number,
  genre: Genre
): Note[] {
  const notes: Note[] = [];
  const beatDuration = 60 / bpm;
  
  for (const { chord, bar } of chords) {
    const rootNote = chord[0] - 12; // Drop down an octave
    const startTime = bar * beatsPerBar * beatDuration;
    
    // Different bass patterns by genre
    if (genre === 'electronic' || genre === 'hiphop') {
      // Four-on-the-floor or eighth notes
      for (let beat = 0; beat < beatsPerBar; beat++) {
        notes.push({
          pitch: rootNote,
          velocity: 100,
          startTime: startTime + beat * beatDuration,
          duration: beatDuration * 0.8,
        });
      }
    } else if (genre === 'rock') {
      // Root on 1 and 3
      notes.push({
        pitch: rootNote,
        velocity: 110,
        startTime,
        duration: beatDuration * 0.9,
      });
      notes.push({
        pitch: rootNote,
        velocity: 100,
        startTime: startTime + 2 * beatDuration,
        duration: beatDuration * 0.9,
      });
      // Fifth on 2 and 4
      notes.push({
        pitch: rootNote + 7,
        velocity: 80,
        startTime: startTime + 1 * beatDuration,
        duration: beatDuration * 0.8,
      });
      notes.push({
        pitch: rootNote + 7,
        velocity: 80,
        startTime: startTime + 3 * beatDuration,
        duration: beatDuration * 0.8,
      });
    } else if (genre === 'jazz') {
      // Walking bass
      const walkPattern = [0, 4, 7, 11]; // Root, third, fifth, seventh
      for (let beat = 0; beat < beatsPerBar; beat++) {
        const noteOffset = walkPattern[beat % walkPattern.length];
        notes.push({
          pitch: rootNote + noteOffset,
          velocity: 80 + Math.random() * 20,
          startTime: startTime + beat * beatDuration,
          duration: beatDuration * 0.9,
        });
      }
    } else {
      // Ambient - sustained notes
      notes.push({
        pitch: rootNote,
        velocity: 70,
        startTime,
        duration: beatsPerBar * beatDuration * 0.95,
      });
    }
  }
  
  return notes;
}

// Get chord name for display
export function getChordName(rootMidi: number, type: string): string {
  const noteName = NOTE_NAMES[rootMidi % 12];
  const suffix: Record<string, string> = {
    major: '',
    minor: 'm',
    dim: '°',
    aug: '+',
    '7th': '7',
    minor7: 'm7',
  };
  return noteName + (suffix[type] || '');
}
