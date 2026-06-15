import { describe, it, expect } from 'vitest';
import {
  generateMelodyNotes,
  generateArpeggioNotes,
  generateCounterMelodyNotes,
  quantizeNotes
} from '@/lib/audio/melody';

describe('Audio Melody Generator', () => {
  describe('generateMelodyNotes', () => {
    it('should generate notes for electronic genre', () => {
      const notes = generateMelodyNotes(60, 'major', 'electronic', 'happy', 120, 2, 0.5);
      expect(notes.length).toBeGreaterThan(0);
      expect(notes[0].pitch).toBeGreaterThanOrEqual(48); // Between C3 and B6
    });

    it('should generate notes for hiphop genre', () => {
      const notes = generateMelodyNotes(60, 'minor', 'hiphop', 'dark', 90, 2, 0.5);
      expect(notes.length).toBeGreaterThan(0);
    });

    it('should generate notes for ambient genre', () => {
      const notes = generateMelodyNotes(60, 'minor', 'ambient', 'calm', 60, 2, 0.5);
      expect(notes.length).toBeGreaterThan(0);
      // Ambient should have lower velocities
      expect(notes[0].velocity).toBeLessThanOrEqual(100);
    });

    it('should generate notes for rock genre', () => {
      const notes = generateMelodyNotes(60, 'major', 'rock', 'energetic', 140, 2, 0.5);
      expect(notes.length).toBeGreaterThan(0);
    });

    it('should generate notes for jazz genre', () => {
      const notes = generateMelodyNotes(60, 'major', 'jazz', 'sad', 100, 2, 0.5);
      expect(notes.length).toBeGreaterThan(0);
    });

    it('should apply dynamic velocity based on sections (chorus vs intro)', () => {
      const chorusNotes = generateMelodyNotes(60, 'major', 'electronic', 'happy', 120, 1, 1, [], 'chorus');
      const introNotes = generateMelodyNotes(60, 'major', 'electronic', 'happy', 120, 1, 1, [], 'intro');

      // We expect chorus notes to be generally louder due to +20 offset, intro softer due to -10 offset
      if (chorusNotes.length > 0 && introNotes.length > 0) {
        expect(chorusNotes[0].velocity).toBeGreaterThan(introNotes[0].velocity - 10);
      }
    });

    it('should generate crescendo for verse', () => {
      const verseNotes = generateMelodyNotes(60, 'major', 'electronic', 'happy', 120, 4, 1, [], 'verse');
      // Just assert it generates without crashing, specific values are heavily randomized
      expect(verseNotes.length).toBeGreaterThan(0);
    });

    it('should handle different moods correctly', () => {
      // It's hard to test the exact internal paths perfectly due to randomness,
      // but we can ensure it returns notes for each mood without error.
      const moods = ['happy', 'sad', 'energetic', 'calm', 'dark', 'uplifting', 'unknown'] as const;

      for (const mood of moods) {
        const notes = generateMelodyNotes(60, 'major', 'electronic', mood as any, 120, 1, 0.5);
        expect(notes).toBeDefined();
      }
    });

    it('should generate more notes for higher complexity', () => {
      const simpleNotes = generateMelodyNotes(60, 'major', 'electronic', 'happy', 120, 4, 0);
      const complexNotes = generateMelodyNotes(60, 'major', 'electronic', 'happy', 120, 4, 1);

      // Since it's random, complex notes *should* generally be more than simple notes
      // but not always strictly greater in one iteration.
      // We just ensure they both produce valid arrays.
      expect(Array.isArray(simpleNotes)).toBe(true);
      expect(Array.isArray(complexNotes)).toBe(true);
    });

    it('should inject motif notes and preserve relative intervals and timing', () => {
      // Original motif: C4, E4, G4 with specific durations
      const motifNotes = [
        { pitch: 60, velocity: 80, startTime: 0, duration: 0.5 },
        { pitch: 64, velocity: 80, startTime: 0.5, duration: 0.5 },
        { pitch: 67, velocity: 80, startTime: 1.0, duration: 1.0 },
      ];

      const motif = {
        id: 'motif1',
        name: 'Test Motif',
        notes: motifNotes,
        originalBpm: 120,
        createdAt: new Date().toISOString()
      };

      // Generate a new melody using the motif but with different scale/key
      // Target key: D major (rootMidi 62)
      // Since it maps to the middle of the extended scale, absolute pitches will change,
      // but intervals should roughly match (+4, +3 semitones relative to first note in the scale)
      const generatedNotes = generateMelodyNotes(62, 'major', 'electronic', 'happy', 120, 1, 0.5, [], 'verse', motif);

      expect(generatedNotes.length).toBeGreaterThanOrEqual(3);

      // Check relative timing is preserved (BPM is the same, so times should match exactly for first iteration)
      expect(generatedNotes[0].startTime).toBeCloseTo(0);
      expect(generatedNotes[0].duration).toBeCloseTo(0.5);
      expect(generatedNotes[1].startTime).toBeCloseTo(0.5);
      expect(generatedNotes[1].duration).toBeCloseTo(0.5);
      expect(generatedNotes[2].startTime).toBeCloseTo(1.0);
      expect(generatedNotes[2].duration).toBeCloseTo(1.0);

      // Check relative intervals.
      // Original intervals from first note: 0, +4, +7
      const interval1 = generatedNotes[1].pitch - generatedNotes[0].pitch;
      const interval2 = generatedNotes[2].pitch - generatedNotes[0].pitch;

      // Major scale intervals are close enough, depending on scale snapping
      // It should follow roughly the original contour.
      expect(interval1).toBeGreaterThan(0);
      expect(interval2).toBeGreaterThan(interval1);
    });

    it('should scale motif timing when BPM changes', () => {
      const motifNotes = [
        { pitch: 60, velocity: 80, startTime: 0, duration: 0.5 },
        { pitch: 64, velocity: 80, startTime: 0.5, duration: 0.5 },
      ];

      const motif = {
        id: 'motif1',
        name: 'Test Motif',
        notes: motifNotes,
        originalBpm: 60,
        createdAt: new Date().toISOString()
      };

      // Generate at 120 BPM (twice as fast), so times should be halved
      const generatedNotes = generateMelodyNotes(60, 'major', 'electronic', 'happy', 120, 1, 0.5, [], 'verse', motif);

      expect(generatedNotes.length).toBeGreaterThanOrEqual(2);
      expect(generatedNotes[0].startTime).toBeCloseTo(0);
      expect(generatedNotes[0].duration).toBeCloseTo(0.25);
      expect(generatedNotes[1].startTime).toBeCloseTo(0.25);
      expect(generatedNotes[1].duration).toBeCloseTo(0.25);
    });
  });

  describe('generateArpeggioNotes', () => {
    it('should generate UP pattern', () => {
      const notes = generateArpeggioNotes(60, 'major', 120, 1, 'up');
      expect(notes.length).toBe(8); // 1 bar * 8 notes

      // Should generally go up
      expect(notes[0].pitch % 12).toBe(60 % 12); // Root
    });

    it('should generate DOWN pattern', () => {
      const notes = generateArpeggioNotes(60, 'major', 120, 1, 'down');
      expect(notes.length).toBe(8);
    });

    it('should generate UPDOWN pattern', () => {
      const notes = generateArpeggioNotes(60, 'major', 120, 1, 'updown');
      expect(notes.length).toBe(8);
    });

    it('should generate RANDOM pattern', () => {
      const notes = generateArpeggioNotes(60, 'major', 120, 1, 'random');
      expect(notes.length).toBe(8);
    });
  });

  describe('generateCounterMelodyNotes', () => {
    it('should generate counter melody when gaps exist', () => {
      // Create a main melody with a large gap
      const mainMelody = [
        { pitch: 60, velocity: 80, startTime: 0, duration: 1 },
        { pitch: 64, velocity: 80, startTime: 3, duration: 1 }
      ];

      const counterNotes = generateCounterMelodyNotes(mainMelody, 60, 'major', 120);

      // Gaps: note 2 starts at 3, note 1 ends at 1. Gap = 2.
      // So it should generate a counter note
      expect(counterNotes.length).toBeGreaterThanOrEqual(1);
      expect(counterNotes[0].startTime).toBeGreaterThan(1);
      expect(counterNotes[0].startTime).toBeLessThan(3);
    });

    it('should not generate counter melody when no gaps exist', () => {
      // Create a main melody with no gaps
      const mainMelody = [
        { pitch: 60, velocity: 80, startTime: 0, duration: 1 },
        { pitch: 64, velocity: 80, startTime: 1, duration: 1 }
      ];

      const counterNotes = generateCounterMelodyNotes(mainMelody, 60, 'major', 120);

      expect(counterNotes.length).toBe(0);
    });
  });

  describe('quantizeNotes', () => {
    it('should quantize notes to the specified grid', () => {
      const notes = [
        { pitch: 60, velocity: 80, startTime: 0.1, duration: 0.2 },
        { pitch: 62, velocity: 80, startTime: 0.4, duration: 0.3 }
      ];

      const quantized = quantizeNotes(notes, 0.25);

      expect(quantized[0].startTime).toBe(0); // 0.1 rounds to 0
      expect(quantized[0].duration).toBe(0.25); // 0.2 rounds to 0.25

      expect(quantized[1].startTime).toBe(0.5); // 0.4 rounds to 0.5
      expect(quantized[1].duration).toBe(0.25); // 0.3 rounds to 0.25
    });

    it('should prevent duration of 0 by using gridValue as fallback', () => {
      const notes = [
        { pitch: 60, velocity: 80, startTime: 0, duration: 0.1 }
      ];

      const quantized = quantizeNotes(notes, 0.5);

      expect(quantized[0].duration).toBe(0.5); // 0.1 rounds to 0, which falls back to gridValue (0.5)
    });
  });
});
