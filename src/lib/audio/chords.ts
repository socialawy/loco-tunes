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
  chordType: 'major' | 'minor' | 'dim' | 'aug' | '7th' | 'minor7' | 'maj7' | 'm7b5' | 'sus4' | 'add9',
  octave: number = 3,
  inversion: 0 | 1 | 2 = 0
): number[] {
  const root = rootMidi + (octave - 4) * 12;
  
  const chordIntervals: Record<string, number[]> = {
    major: [0, 4, 7],
    minor: [0, 3, 7],
    dim: [0, 3, 6],
    aug: [0, 4, 8],
    '7th': [0, 4, 7, 10],
    minor7: [0, 3, 7, 10],
    maj7: [0, 4, 7, 11],
    m7b5: [0, 3, 6, 10],
    sus4: [0, 5, 7],
    add9: [0, 4, 7, 14],
  };
  
  const intervals = chordIntervals[chordType] || chordIntervals.major;
  const notes = intervals.map(i => root + i);

  if (inversion === 1 && notes.length > 1) {
    notes[0] += 12;
  } else if (inversion === 2 && notes.length > 2) {
    notes[0] += 12;
    notes[1] += 12;
  }

  return notes.sort((a, b) => a - b);
}

// Generate a chord progression for a genre
export function generateChordProgression(
  rootMidi: number,
  genre: Genre,
  scaleName: string,
  numBars: number
): { chord: number[]; bar: number; type: string }[] {
  const progression = CHORD_PROGRESSIONS[genre] || CHORD_PROGRESSIONS.electronic;
  const scale = getScale(rootMidi, scaleName);
  
  const chords: { chord: number[]; bar: number; type: string }[] = [];
  
  for (let bar = 0; bar < numBars; bar++) {
    const progIndex = bar % progression.length;
    const [scaleDegree, modifier] = progression[progIndex];
    
    // Get the root of the chord from scale degree
    const chordRoot = scale[scaleDegree % scale.length];
    
    // Determine chord type based on scale degree and modifier
    let chordType: 'major' | 'minor' | 'dim' | '7th' | 'maj7' | 'm7b5' | 'sus4' | 'add9' | 'minor7' = 'major';
    if (scaleName === 'minor') {
      if ([0, 3, 4].includes(scaleDegree % scale.length)) {
        chordType = 'minor';
      } else if (scaleDegree % scale.length === 1) {
        chordType = 'dim';
      }
    } else {
      if ([1, 2, 5].includes(scaleDegree % scale.length)) {
        chordType = 'minor';
      } else if (scaleDegree % scale.length === 6) {
        chordType = 'dim';
      }
    }
    
    if (modifier === -1) chordType = 'minor';
    if (modifier === 1) chordType = 'major';
    
    // Advanced voicings based on genre
    if (genre === 'jazz') {
      if (chordType === 'major') chordType = 'maj7';
      else if (chordType === 'minor') chordType = 'minor7';
      else if (chordType === 'dim') chordType = 'm7b5';
      if (modifier === 5) chordType = '7th'; // explicit dominant 7
    } else if (genre === 'electronic' && bar % 4 === 3) {
       // Occasional suspended or add9 chords for tension/color
       chordType = Math.random() > 0.5 ? 'sus4' : 'add9';
    } else if (genre === 'ambient') {
       chordType = chordType === 'major' ? 'maj7' : (chordType === 'minor' ? 'minor7' : chordType);
    }

    // Voice leading / inversions
    let inversion: 0 | 1 | 2 = 0;
    if (bar > 0) {
       const prevChord = chords[bar - 1].chord;
       const prevAvg = prevChord.reduce((a, b) => a + b, 0) / prevChord.length;
       const rootAvg = generateChord(chordRoot, chordType as any, 3, 0).reduce((a, b) => a + b, 0) / (chordType === 'add9' || chordType.includes('7') ? 4 : 3);

       if (rootAvg < prevAvg - 4) inversion = 1;
       else if (rootAvg > prevAvg + 4) inversion = 2; // In this simple model, 2 acts as drop
    }

    const chordNotes = generateChord(chordRoot, chordType as any, 3, inversion);
    chords.push({ chord: chordNotes, bar, type: chordType });
  }
  
  return chords;
}

// Generate harmony notes (pad/synth chords)
export function generateHarmonyNotes(
  chords: { chord: number[]; bar: number; type: string }[],
  beatsPerBar: number,
  bpm: number,
  intensity: number = 1.0
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
        velocity: Math.min(127, Math.round(60 * intensity)),
        startTime,
        duration,
      });
      // Add octave doubling
      notes.push({
        pitch: noteMidi + 12,
        velocity: Math.min(127, Math.round(50 * intensity)),
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
  genre: Genre,
  intensity: number = 1.0
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
          velocity: Math.min(127, Math.round((100) * intensity)),
          startTime: startTime + beat * beatDuration,
          duration: beatDuration * 0.8,
        });
      }
    } else if (genre === 'rock') {
      // Root on 1 and 3
      notes.push({
        pitch: rootNote,
        velocity: Math.min(127, Math.round((110) * intensity)),
        startTime,
        duration: beatDuration * 0.9,
      });
      notes.push({
        pitch: rootNote,
        velocity: Math.min(127, Math.round((100) * intensity)),
        startTime: startTime + 2 * beatDuration,
        duration: beatDuration * 0.9,
      });
      // Fifth on 2 and 4
      notes.push({
        pitch: rootNote + 7,
        velocity: Math.min(127, Math.round((80) * intensity)),
        startTime: startTime + 1 * beatDuration,
        duration: beatDuration * 0.8,
      });
      notes.push({
        pitch: rootNote + 7,
        velocity: Math.min(127, Math.round((80) * intensity)),
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
          velocity: Math.min(127, Math.round((80 + Math.random() * 20) * intensity)),
          startTime: startTime + beat * beatDuration,
          duration: beatDuration * 0.9,
        });
      }
    } else {
      // Ambient - sustained notes
      notes.push({
        pitch: rootNote,
        velocity: Math.min(127, Math.round((70) * intensity)),
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
    maj7: 'maj7',
    m7b5: 'm7b5',
    sus4: 'sus4',
    add9: 'add9',
  };
  return noteName + (suffix[type] || '');
}
