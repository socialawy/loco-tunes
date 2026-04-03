import { describe, it, expect } from 'vitest';
import {
  midiToFrequency,
  noteToMidi,
  getScale,
  generateChord,
  generateChordProgression,
  generateHarmonyNotes,
  generateBassNotes,
  getChordName
} from '@/lib/audio/chords';

describe('Audio Chords Generator', () => {
  describe('midiToFrequency', () => {
    it('should convert MIDI 69 (A4) to 440Hz', () => {
      expect(midiToFrequency(69)).toBe(440);
    });

    it('should convert MIDI 60 (C4) to ~261.63Hz', () => {
      expect(midiToFrequency(60)).toBeCloseTo(261.625, 2);
    });
  });

  describe('noteToMidi', () => {
    it('should convert C4 to 60', () => {
      expect(noteToMidi('C', 4)).toBe(60);
    });

    it('should convert A4 to 69', () => {
      expect(noteToMidi('A', 4)).toBe(69);
    });

    it('should handle invalid note names by defaulting to 60', () => {
      expect(noteToMidi('H', 4)).toBe(60);
    });
  });

  describe('getScale', () => {
    it('should return major scale intervals from root', () => {
      // C major: C, D, E, F, G, A, B
      const scale = getScale(60, 'major');
      expect(scale).toEqual([60, 62, 64, 65, 67, 69, 71]);
    });

    it('should return minor scale intervals from root', () => {
      // C minor: C, D, Eb, F, G, Ab, Bb
      const scale = getScale(60, 'minor');
      expect(scale).toEqual([60, 62, 63, 65, 67, 68, 70]);
    });

    it('should fallback to major for unknown scale', () => {
      const scale = getScale(60, 'unknown');
      expect(scale).toEqual([60, 62, 64, 65, 67, 69, 71]);
    });
  });

  describe('generateChord', () => {
    it('should generate major chord', () => {
      // C major: C4, E4, G4 -> 60, 64, 67
      expect(generateChord(60, 'major', 4)).toEqual([60, 64, 67]);
    });

    it('should generate minor chord', () => {
      // C minor: C4, Eb4, G4 -> 60, 63, 67
      expect(generateChord(60, 'minor', 4)).toEqual([60, 63, 67]);
    });

    it('should generate dim chord', () => {
      expect(generateChord(60, 'dim', 4)).toEqual([60, 63, 66]);
    });

    it('should generate aug chord', () => {
      expect(generateChord(60, 'aug', 4)).toEqual([60, 64, 68]);
    });

    it('should generate 7th chord', () => {
      expect(generateChord(60, '7th', 4)).toEqual([60, 64, 67, 70]);
    });

    it('should generate minor7 chord', () => {
      expect(generateChord(60, 'minor7', 4)).toEqual([60, 63, 67, 70]);
    });

    it('should use default octave 3 if not provided', () => {
      // C3 -> 48
      expect(generateChord(60, 'major')).toEqual([48, 52, 55]);
    });

    it('should fallback to major for unknown chord type', () => {
      // @ts-expect-error testing invalid input
      expect(generateChord(60, 'unknown', 4)).toEqual([60, 64, 67]);
    });
  });

  describe('generateChordProgression', () => {
    it('should generate a progression of chords', () => {
      const progression = generateChordProgression(60, 'electronic', 'major', 4);
      expect(progression).toHaveLength(4);
      expect(progression[0]).toHaveProperty('chord');
      expect(progression[0]).toHaveProperty('bar', 0);
      expect(progression[0]).toHaveProperty('type');
    });

    it('should handle minor scale logic', () => {
      const progression = generateChordProgression(60, 'electronic', 'minor', 1);
      expect(progression[0].type).toBe('minor');
    });

    it('should handle jazz genre specific logic', () => {
      const progression = generateChordProgression(60, 'jazz', 'major', 1);
      // Depending on the progression and randomness, it could be minor7 or 7th or major
      expect(progression[0].type).toMatch(/7th|minor7|major/);
    });

    it('should fallback to electronic progression for unknown genre', () => {
      // @ts-expect-error testing invalid input
      const progression = generateChordProgression(60, 'unknown', 'major', 1);
      expect(progression[0]).toHaveProperty('chord');
    });
  });

  describe('generateHarmonyNotes', () => {
    it('should generate harmony notes from chords', () => {
      const chords = [{ chord: [60, 64, 67], bar: 0, type: 'major' }];
      const notes = generateHarmonyNotes(chords, 4, 120);

      // 3 notes * 2 (octave doubling) = 6 notes
      expect(notes).toHaveLength(6);

      // Check first note (root)
      expect(notes[0].pitch).toBe(60);
      expect(notes[0].startTime).toBe(0);
      expect(notes[0].duration).toBeCloseTo(4 * (60/120) * 0.95);

      // Check doubled note (root + octave)
      expect(notes[1].pitch).toBe(72);
      expect(notes[1].startTime).toBe(0);
    });
  });

  describe('generateBassNotes', () => {
    const chords = [{ chord: [60, 64, 67], bar: 0, type: 'major' }];

    it('should generate electronic bass pattern', () => {
      const notes = generateBassNotes(chords, 4, 120, 'electronic');
      expect(notes).toHaveLength(4); // 4 beats per bar
      expect(notes[0].pitch).toBe(48); // Drop down an octave
    });

    it('should generate hiphop bass pattern', () => {
      const notes = generateBassNotes(chords, 4, 120, 'hiphop');
      expect(notes).toHaveLength(4);
      expect(notes[0].pitch).toBe(48);
    });

    it('should generate rock bass pattern', () => {
      const notes = generateBassNotes(chords, 4, 120, 'rock');
      expect(notes).toHaveLength(4); // 1, 3 (root), 2, 4 (fifth)
      expect(notes[0].pitch).toBe(48); // Root
      expect(notes[2].pitch).toBe(55); // Fifth
    });

    it('should generate jazz walking bass pattern', () => {
      const notes = generateBassNotes(chords, 4, 120, 'jazz');
      expect(notes).toHaveLength(4);
      expect(notes[0].pitch).toBe(48); // Root
      expect(notes[1].pitch).toBe(48 + 4); // Third
    });

    it('should generate ambient sustained bass pattern', () => {
      const notes = generateBassNotes(chords, 4, 120, 'ambient');
      expect(notes).toHaveLength(1);
      expect(notes[0].duration).toBeCloseTo(4 * (60/120) * 0.95);
    });
  });

  describe('getChordName', () => {
    it('should return correct name for major chord', () => {
      expect(getChordName(60, 'major')).toBe('C');
    });

    it('should return correct name for minor chord', () => {
      expect(getChordName(60, 'minor')).toBe('Cm');
    });

    it('should return correct name for dim chord', () => {
      expect(getChordName(60, 'dim')).toBe('C°');
    });

    it('should return correct name for aug chord', () => {
      expect(getChordName(60, 'aug')).toBe('C+');
    });

    it('should return correct name for 7th chord', () => {
      expect(getChordName(60, '7th')).toBe('C7');
    });

    it('should return correct name for minor7 chord', () => {
      expect(getChordName(60, 'minor7')).toBe('Cm7');
    });

    it('should handle unknown type', () => {
      expect(getChordName(60, 'unknown')).toBe('C');
    });
  });
});
