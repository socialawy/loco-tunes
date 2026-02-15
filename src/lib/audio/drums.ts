// Drum pattern generation for different genres

import type { Genre, Note } from '@/types/music';

// Drum MIDI note mapping (General MIDI standard)
export const DRUM_MIDI = {
  kick: 36,
  snare: 38,
  hihatClosed: 42,
  hihatOpen: 46,
  tomHigh: 50,
  tomMid: 48,
  tomLow: 45,
  crash: 49,
  ride: 51,
  clap: 39,
  rimshot: 37,
};

// Drum pattern definitions
interface DrumPattern {
  step: number;
  drum: keyof typeof DRUM_MIDI;
  velocity: number;
}

// Basic drum patterns by genre
const DRUM_PATTERNS: Record<Genre, DrumPattern[]> = {
  electronic: [
    // Kick on 1 and 3
    { step: 0, drum: 'kick', velocity: 127 },
    { step: 2, drum: 'kick', velocity: 127 },
    { step: 4, drum: 'kick', velocity: 127 },
    { step: 6, drum: 'kick', velocity: 127 },
    // Snare on 2 and 4
    { step: 2, drum: 'snare', velocity: 100 },
    { step: 6, drum: 'snare', velocity: 100 },
    // Hi-hats on every beat
    { step: 0, drum: 'hihatClosed', velocity: 70 },
    { step: 1, drum: 'hihatClosed', velocity: 50 },
    { step: 2, drum: 'hihatClosed', velocity: 70 },
    { step: 3, drum: 'hihatClosed', velocity: 50 },
    { step: 4, drum: 'hihatClosed', velocity: 70 },
    { step: 5, drum: 'hihatClosed', velocity: 50 },
    { step: 6, drum: 'hihatClosed', velocity: 70 },
    { step: 7, drum: 'hihatClosed', velocity: 50 },
  ],
  
  hiphop: [
    // Kick pattern - more syncopated
    { step: 0, drum: 'kick', velocity: 120 },
    { step: 3, drum: 'kick', velocity: 100 },
    { step: 5, drum: 'kick', velocity: 90 },
    // Snare on 2 and 4
    { step: 2, drum: 'snare', velocity: 110 },
    { step: 6, drum: 'snare', velocity: 110 },
    // Clap layered with snare
    { step: 2, drum: 'clap', velocity: 80 },
    { step: 6, drum: 'clap', velocity: 80 },
    // Hi-hat pattern
    { step: 0, drum: 'hihatClosed', velocity: 60 },
    { step: 1, drum: 'hihatClosed', velocity: 40 },
    { step: 2, drum: 'hihatClosed', velocity: 60 },
    { step: 3, drum: 'hihatOpen', velocity: 50 },
    { step: 4, drum: 'hihatClosed', velocity: 60 },
    { step: 5, drum: 'hihatClosed', velocity: 40 },
    { step: 6, drum: 'hihatClosed', velocity: 60 },
    { step: 7, drum: 'hihatClosed', velocity: 40 },
  ],
  
  ambient: [
    // Sparse drums
    { step: 0, drum: 'kick', velocity: 60 },
    { step: 4, drum: 'hihatOpen', velocity: 40 },
    { step: 6, drum: 'ride', velocity: 30 },
  ],
  
  rock: [
    // Kick on 1 and 3, with variation
    { step: 0, drum: 'kick', velocity: 127 },
    { step: 2, drum: 'kick', velocity: 100 },
    { step: 4, drum: 'kick', velocity: 120 },
    { step: 5, drum: 'kick', velocity: 80 },
    // Snare on 2 and 4
    { step: 2, drum: 'snare', velocity: 120 },
    { step: 6, drum: 'snare', velocity: 120 },
    // Ride cymbal pattern
    { step: 0, drum: 'ride', velocity: 70 },
    { step: 2, drum: 'ride', velocity: 80 },
    { step: 4, drum: 'ride', velocity: 70 },
    { step: 6, drum: 'ride', velocity: 80 },
    // Hi-hat accents
    { step: 1, drum: 'hihatClosed', velocity: 50 },
    { step: 3, drum: 'hihatClosed', velocity: 50 },
    { step: 5, drum: 'hihatClosed', velocity: 50 },
    { step: 7, drum: 'hihatClosed', velocity: 50 },
  ],
  
  jazz: [
    // Jazz ride pattern
    { step: 0, drum: 'ride', velocity: 80 },
    { step: 2, drum: 'ride', velocity: 70 },
    { step: 3, drum: 'ride', velocity: 60 },
    { step: 4, drum: 'ride', velocity: 80 },
    { step: 6, drum: 'ride', velocity: 70 },
    // Hi-hat on 2 and 4
    { step: 2, drum: 'hihatClosed', velocity: 60 },
    { step: 6, drum: 'hihatClosed', velocity: 60 },
    // Sparse kick
    { step: 0, drum: 'kick', velocity: 60 },
    // Brush snare
    { step: 1, drum: 'snare', velocity: 40 },
    { step: 3, drum: 'snare', velocity: 40 },
    { step: 5, drum: 'snare', velocity: 40 },
    { step: 7, drum: 'snare', velocity: 40 },
  ],
};

// Generate drum notes for a track
export function generateDrumNotes(
  genre: Genre,
  bpm: number,
  numBars: number,
  beatsPerBar: number = 4,
  stepsPerBeat: number = 2
): Note[] {
  const notes: Note[] = [];
  const pattern = DRUM_PATTERNS[genre] || DRUM_PATTERNS.electronic;
  const stepsPerBar = beatsPerBar * stepsPerBeat;
  const stepDuration = (60 / bpm) / stepsPerBeat;
  
  for (let bar = 0; bar < numBars; bar++) {
    for (const hit of pattern) {
      // Add variation based on bar position
      let velocity = hit.velocity;
      const randomVariation = 0.9 + Math.random() * 0.2;
      velocity = Math.round(velocity * randomVariation);
      
      // Add fills every 4 bars
      if ((bar + 1) % 4 === 0 && bar === numBars - 1) {
        // Add extra hits for fills
        if (hit.drum === 'snare' || hit.drum === 'tomHigh') {
          velocity = Math.min(127, velocity + 20);
        }
      }
      
      const startTime = bar * (60 / bpm) * beatsPerBar + hit.step * stepDuration;
      
      notes.push({
        pitch: DRUM_MIDI[hit.drum],
        velocity,
        startTime,
        duration: stepDuration * 0.9,
      });
    }
  }
  
  return notes;
}

// Generate synthetic drum sounds using oscillators
export function createDrumSynthSpec(drumType: keyof typeof DRUM_MIDI): {
  type: 'noise' | 'oscillator';
  frequency?: number;
  decay: number;
  pitchDecay?: number;
  filter?: {
    type: BiquadFilterType;
    frequency: number;
    Q?: number;
  };
} {
  switch (drumType) {
    case 'kick':
      return {
        type: 'oscillator',
        frequency: 150,
        decay: 0.15,
        pitchDecay: 0.1,
        filter: {
          type: 'lowpass',
          frequency: 200,
        },
      };
    case 'snare':
      return {
        type: 'noise',
        decay: 0.2,
        filter: {
          type: 'highpass',
          frequency: 200,
          Q: 1,
        },
      };
    case 'hihatClosed':
      return {
        type: 'noise',
        decay: 0.05,
        filter: {
          type: 'highpass',
          frequency: 7000,
          Q: 2,
        },
      };
    case 'hihatOpen':
      return {
        type: 'noise',
        decay: 0.3,
        filter: {
          type: 'highpass',
          frequency: 7000,
          Q: 1.5,
        },
      };
    case 'tomHigh':
      return {
        type: 'oscillator',
        frequency: 200,
        decay: 0.3,
        pitchDecay: 0.05,
      };
    case 'tomMid':
      return {
        type: 'oscillator',
        frequency: 140,
        decay: 0.35,
        pitchDecay: 0.05,
      };
    case 'tomLow':
      return {
        type: 'oscillator',
        frequency: 100,
        decay: 0.4,
        pitchDecay: 0.05,
      };
    case 'crash':
      return {
        type: 'noise',
        decay: 1.0,
        filter: {
          type: 'highpass',
          frequency: 5000,
          Q: 0.5,
        },
      };
    case 'ride':
      return {
        type: 'noise',
        decay: 0.5,
        filter: {
          type: 'bandpass',
          frequency: 8000,
          Q: 2,
        },
      };
    case 'clap':
      return {
        type: 'noise',
        decay: 0.15,
        filter: {
          type: 'bandpass',
          frequency: 1200,
          Q: 2,
        },
      };
    default:
      return {
        type: 'noise',
        decay: 0.1,
      };
  }
}
