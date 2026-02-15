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
  const progression = CHORD_PROGRESSIONS[genre] || CHORD_PROGRESSIONS.electronic;
  const scale = getScale(rootMidi, scaleName);
  
  const chords: { chord: number[]; bar: number; type: string }[] = [];
  
  for (let bar = 0; bar < numBars; bar++) {
    const progIndex = bar % progression.length;
    const [scaleDegree, modifier] = progression[progIndex];
    
    // Get the root of the chord from scale degree
    const chordRoot = scale[scaleDegree % scale.length];
    
    // Determine chord type based on scale degree and modifier
    let chordType: 'major' | 'minor' | 'dim' | '7th' = 'major';
    if (scaleName === 'minor') {
      if ([0, 3, 4].includes(scaleDegree % scale.length)) {
        chordType = 'minor';
      }
    } else {
      if ([1, 2, 5].includes(scaleDegree % scale.length)) {
        chordType = 'minor';
      }
    }
    
    if (modifier === -1) chordType = 'minor';
    if (modifier === 1) chordType = 'major';
    if (genre === 'jazz') chordType = '7th';
    
    const chordNotes = generateChord(chordRoot, chordType, 3);
    chords.push({ chord: chordNotes, bar, type: chordType });
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
