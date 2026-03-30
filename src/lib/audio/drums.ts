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
    // Ghost kick for groove
    { step: 3.5, drum: 'kick', velocity: 50 },
    // Snare on 2 and 4
    { step: 2, drum: 'snare', velocity: 100 },
    { step: 6, drum: 'snare', velocity: 100 },
    // Ghost snare
    { step: 7.5, drum: 'snare', velocity: 40 },
    // Hi-hats with more velocity dynamics (accent on downbeats)
    { step: 0, drum: 'hihatClosed', velocity: 90 },
    { step: 0.5, drum: 'hihatClosed', velocity: 40 },
    { step: 1, drum: 'hihatClosed', velocity: 70 },
    { step: 1.5, drum: 'hihatClosed', velocity: 40 },
    { step: 2, drum: 'hihatClosed', velocity: 90 },
    { step: 2.5, drum: 'hihatClosed', velocity: 40 },
    { step: 3, drum: 'hihatClosed', velocity: 70 },
    { step: 3.5, drum: 'hihatOpen', velocity: 80 },
    { step: 4, drum: 'hihatClosed', velocity: 90 },
    { step: 4.5, drum: 'hihatClosed', velocity: 40 },
    { step: 5, drum: 'hihatClosed', velocity: 70 },
    { step: 5.5, drum: 'hihatClosed', velocity: 40 },
    { step: 6, drum: 'hihatClosed', velocity: 90 },
    { step: 6.5, drum: 'hihatClosed', velocity: 40 },
    { step: 7, drum: 'hihatClosed', velocity: 70 },
    { step: 7.5, drum: 'hihatOpen', velocity: 80 },
  ],
  
  hiphop: [
    // Kick pattern - more syncopated
    { step: 0, drum: 'kick', velocity: 120 },
    { step: 1.5, drum: 'kick', velocity: 80 }, // Syncopated
    { step: 3, drum: 'kick', velocity: 100 },
    { step: 5, drum: 'kick', velocity: 90 },
    // Snare on 2 and 4
    { step: 2, drum: 'snare', velocity: 110 },
    { step: 6, drum: 'snare', velocity: 110 },
    // Ghost snare
    { step: 4.5, drum: 'snare', velocity: 50 },
    // Clap layered with snare
    { step: 2, drum: 'clap', velocity: 80 },
    { step: 6, drum: 'clap', velocity: 80 },
    // Hi-hat pattern
    { step: 0, drum: 'hihatClosed', velocity: 70 },
    { step: 0.5, drum: 'hihatClosed', velocity: 40 },
    { step: 1, drum: 'hihatClosed', velocity: 60 },
    { step: 1.5, drum: 'hihatClosed', velocity: 40 },
    { step: 2, drum: 'hihatClosed', velocity: 70 },
    { step: 2.5, drum: 'hihatClosed', velocity: 40 },
    { step: 3, drum: 'hihatClosed', velocity: 60 },
    { step: 3.5, drum: 'hihatOpen', velocity: 60 },
    { step: 4, drum: 'hihatClosed', velocity: 70 },
    { step: 4.5, drum: 'hihatClosed', velocity: 40 },
    { step: 5, drum: 'hihatClosed', velocity: 60 },
    { step: 5.5, drum: 'hihatClosed', velocity: 40 },
    { step: 6, drum: 'hihatClosed', velocity: 70 },
    { step: 6.5, drum: 'hihatClosed', velocity: 40 },
    { step: 7, drum: 'hihatClosed', velocity: 60 },
    { step: 7.5, drum: 'hihatOpen', velocity: 60 },
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
    // Jazz ride pattern (swing timing will be applied in generateDrumNotes)
    { step: 0, drum: 'ride', velocity: 80 },
    { step: 2, drum: 'ride', velocity: 70 },
    { step: 3.33, drum: 'ride', velocity: 60 }, // Swung 8th note
    { step: 4, drum: 'ride', velocity: 80 },
    { step: 6, drum: 'ride', velocity: 70 },
    { step: 7.33, drum: 'ride', velocity: 60 }, // Swung 8th note
    // Hi-hat on 2 and 4
    { step: 2, drum: 'hihatClosed', velocity: 60 },
    { step: 6, drum: 'hihatClosed', velocity: 60 },
    // Sparse kick
    { step: 0, drum: 'kick', velocity: 60 },
    // Brush snare comps
    { step: 1.33, drum: 'snare', velocity: 40 },
    { step: 3, drum: 'snare', velocity: 30 },
    { step: 5.33, drum: 'snare', velocity: 40 },
    { step: 7, drum: 'snare', velocity: 30 },
  ],
};

// Generate drum notes for a track
export function generateDrumNotes(
  genre: Genre,
  bpm: number,
  numBars: number,
  beatsPerBar: number = 4,
  stepsPerBeat: number = 2,
  structureIntensity?: number[]
): Note[] {
  const notes: Note[] = [];
  const pattern = DRUM_PATTERNS[genre] || DRUM_PATTERNS.electronic;
  const stepsPerBar = beatsPerBar * stepsPerBeat;
  const beatDuration = 60 / bpm;
  const stepDuration = beatDuration / stepsPerBeat;

  // Jazz swing percentage
  const swingRatio = genre === 'jazz' ? 0.66 : (genre === 'hiphop' ? 0.55 : 0.5);
  
  for (let bar = 0; bar < numBars; bar++) {
    const intensity = structureIntensity && structureIntensity[bar] !== undefined ? structureIntensity[bar] : 0.5;

    for (const hit of pattern) {
      // Scale velocity by section intensity (0.5 is baseline)
      let velocity = hit.velocity * (0.5 + intensity);
      const randomVariation = 0.9 + Math.random() * 0.2;
      velocity = Math.round(velocity * randomVariation);
      
      // Mute some elements during low intensity
      if (intensity < 0.3 && (hit.drum === 'hihatOpen' || hit.drum === 'crash' || hit.drum === 'tomHigh')) {
        continue;
      }

      // Add fills every 4 bars, proportional to intensity
      if ((bar + 1) % 4 === 0 && bar === numBars - 1 && intensity > 0.4) {
        // Add extra hits for fills
        if (hit.drum === 'snare' || hit.drum === 'tomHigh' || hit.drum === 'tomMid' || hit.drum === 'tomLow') {
          velocity = Math.min(127, velocity + 30 * intensity);
        }
      }
      
      // Apply swing timing to off-beats
      let adjustedStep = hit.step;
      const isOffBeat = Math.abs(hit.step % 1 - 0.5) < 0.01;

      if (isOffBeat && genre !== 'electronic' && genre !== 'ambient' && genre !== 'rock') {
         const beatStart = Math.floor(hit.step);
         adjustedStep = beatStart + swingRatio * 2 * 0.5; // swingRatio of the beat length (which is 2 steps)
      }

      const startTime = bar * beatDuration * beatsPerBar + adjustedStep * stepDuration;
      
      notes.push({
        pitch: DRUM_MIDI[hit.drum],
        velocity: Math.min(127, Math.max(0, velocity)),
        startTime,
        duration: stepDuration * 0.9,
      });
    }

    // Sometimes add a crash at the start of a high intensity section
    if (bar > 0 && intensity > 0.7 && (!structureIntensity || structureIntensity[bar - 1] < 0.7)) {
       notes.push({
         pitch: DRUM_MIDI.crash,
         velocity: 100,
         startTime: bar * beatDuration * beatsPerBar,
         duration: beatDuration * 2,
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
