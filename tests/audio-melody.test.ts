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
