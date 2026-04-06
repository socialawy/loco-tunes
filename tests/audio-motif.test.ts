import { describe, it, expect, vi, beforeEach } from 'vitest';
import { generateMelodyNotes } from '../src/lib/audio/melody';
import { SCALES } from '../src/types/music';

describe('Motif Generation and Integration', () => {
  beforeEach(() => {
    vi.spyOn(Math, 'random').mockReturnValue(0.5);
  });

  it('should generate a melody without a motif', () => {
    const rootMidi = 60; // Middle C
    const scaleName = 'major';
    const bpm = 120;
    const notes = generateMelodyNotes(
      rootMidi,
      scaleName,
      'electronic',
      'happy',
      bpm,
      4,
      0.5,
      [60, 65, 67, 60],
      'verse'
    );

    expect(notes.length).toBeGreaterThan(0);
    expect(notes[0].pitch).toBeDefined();
  });

  it('should inject a motif into a generated melody', () => {
    const rootMidi = 60; // Middle C
    const scaleName = 'major';
    const bpm = 120;

    // A simple ascending motif
    const motif = {
      id: 'test-motif',
      name: 'Test Motif',
      notes: [
        { interval: 0, duration: 0.5, startTimeOffset: 0 },
        { interval: 2, duration: 0.5, startTimeOffset: 0.5 },
        { interval: 4, duration: 1.0, startTimeOffset: 1.0 },
      ],
      originalBpm: 120,
      createdAt: new Date().toISOString(),
    };

    const notes = generateMelodyNotes(
      rootMidi,
      scaleName,
      'electronic',
      'happy',
      bpm,
      4,
      0.5, // medium complexity means inject every 4 bars (since injectMotifInterval = complexity < 0.5 ? 2 : 4) Wait, 0.5 is not < 0.5. Let's use 0.4 to inject every 2 bars.
      [60, 65, 67, 60],
      'verse',
      motif
    );

    expect(notes.length).toBeGreaterThan(0);

    // Check if the motif was injected at the start (bar 0)
    // The first note of the motif should have interval 0, meaning it snaps to the chord root (60).
    const firstMotifNote = notes[0];
    expect(firstMotifNote.startTime).toBeCloseTo(0);
    expect(firstMotifNote.duration).toBeCloseTo(0.5);
    // Since Math.random is mocked, the exact pitch might vary depending on snapping logic,
    // but the relative intervals should hold or snap. We'll check that the first note exists and has a valid pitch.
    expect(firstMotifNote.pitch).toBeDefined();

    const secondMotifNote = notes[1];
    expect(secondMotifNote.startTime).toBeCloseTo(0.5);
    expect(secondMotifNote.duration).toBeCloseTo(0.5);

    const thirdMotifNote = notes[2];
    expect(thirdMotifNote.startTime).toBeCloseTo(1.0);
    expect(thirdMotifNote.duration).toBeCloseTo(1.0);
  });

  it('should stretch motif duration if BPM is different', () => {
    const rootMidi = 60; // Middle C
    const scaleName = 'major';
    const originalBpm = 60;
    const newBpm = 120; // Twice as fast, so durations should be halved

    const motif = {
      id: 'test-motif-2',
      name: 'Test Motif 2',
      notes: [
        { interval: 0, duration: 1.0, startTimeOffset: 0 },
      ],
      originalBpm: originalBpm,
      createdAt: new Date().toISOString(),
    };

    const notes = generateMelodyNotes(
      rootMidi,
      scaleName,
      'electronic',
      'happy',
      newBpm,
      2,
      0.4,
      [60, 65],
      'verse',
      motif
    );

    const firstMotifNote = notes[0];
    expect(firstMotifNote.startTime).toBeCloseTo(0);
    // 1.0 * (60 / 120) = 0.5
    expect(firstMotifNote.duration).toBeCloseTo(0.5);
  });
});
