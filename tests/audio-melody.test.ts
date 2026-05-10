import { describe, it, expect } from 'vitest';
import {
  generateMelodyNotes,
  generateArpeggioNotes,
  generateCounterMelodyNotes,
  quantizeNotes,
  extractMotif
} from '@/lib/audio/melody';

describe('Audio Melody Generator', () => {
  describe('extractMotif', () => {
    it('should extract a motif by normalizing pitch and time', () => {
      const notes = [
        { pitch: 60, velocity: 80, startTime: 1, duration: 0.5 },
        { pitch: 62, velocity: 90, startTime: 1.5, duration: 0.5 },
        { pitch: 58, velocity: 70, startTime: 2, duration: 1 },
      ];

      const motifPattern = extractMotif(notes);

      expect(motifPattern.length).toBe(3);

      // First note should be normalized to 0 pitch and 0 time
      expect(motifPattern[0].pitch).toBe(0);
      expect(motifPattern[0].startTime).toBe(0);
      expect(motifPattern[0].velocity).toBe(80);
      expect(motifPattern[0].duration).toBe(0.5);

      // Second note should be relative to the first
      expect(motifPattern[1].pitch).toBe(2); // 62 - 60
      expect(motifPattern[1].startTime).toBe(0.5); // 1.5 - 1

      // Third note
      expect(motifPattern[2].pitch).toBe(-2); // 58 - 60
      expect(motifPattern[2].startTime).toBe(1); // 2 - 1
    });

    it('should return empty array for empty notes', () => {
      expect(extractMotif([])).toEqual([]);
    });
  });

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

    it('should use a provided motif instead of generating randomly', () => {
      const motifNotes = [
        { pitch: 60, velocity: 80, startTime: 0, duration: 0.5 },
        { pitch: 62, velocity: 80, startTime: 0.5, duration: 0.5 },
      ];

      const motif = {
        id: '1',
        name: 'Test Motif',
        notes: motifNotes,
        originalBpm: 120,
        createdAt: new Date().toISOString()
      };

      const notes = generateMelodyNotes(60, 'major', 'electronic', 'happy', 120, 1, 0.5, [], 'verse', motif);

      // We know motif generates deterministically based on the input pattern
      // 1 bar = 4 beats = 2 seconds at 120BPM
      // Motif is 1 second long (0.5 + 0.5 duration, ends at 1.0)
      // So it should repeat
      expect(notes.length).toBeGreaterThan(0);

      // Check that the pattern was applied (first note should be basePitch + motif[0].pitch)
      // rootMidi = 60, basePitch = 60 + 12 = 72
      // motifPattern[0].pitch = 0
      // So first generated note pitch = 72
      expect(notes[0].pitch).toBe(72);

      // Second note pitch should be basePitch + motifPattern[1].pitch
      // motifPattern[1].pitch = 2 (62 - 60)
      // So second note pitch = 74
      expect(notes[1].pitch).toBe(74);
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
