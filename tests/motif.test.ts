import { describe, it, expect, vi, beforeEach } from 'vitest';
import { generateMelodyNotes } from '../src/lib/audio/melody';
import type { Motif, Note } from '../src/types/music';

describe('Motif integration in generateMelodyNotes', () => {
  beforeEach(() => {
    vi.spyOn(Math, 'random').mockReturnValue(0.5);
  });

  it('should generate completely random melody when motif is absent', () => {
    const notes = generateMelodyNotes(60, 'minor', 'electronic', 'energetic', 120, 2, 0.5);
    expect(notes.length).toBeGreaterThan(0);
  });

  it('should transpose and scale timing correctly when a motif is provided', () => {
    const mockMotif: Motif = {
      id: 'test-1',
      name: 'Test Motif',
      notes: [
        { pitch: 60, velocity: 80, startTime: 0, duration: 0.5 },
        { pitch: 62, velocity: 80, startTime: 0.5, duration: 0.5 },
        { pitch: 64, velocity: 80, startTime: 1, duration: 1 },
      ],
      originalBpm: 120,
      originalKey: 'C',
      originalScale: 'major',
      createdAt: new Date().toISOString(),
    };

    // Generating in D major (rootMidi = 62) with a faster BPM (240 instead of 120)
    // Pitch shift should be +2. Time scale should be 0.5 (half duration).
    const notes = generateMelodyNotes(62, 'major', 'electronic', 'energetic', 240, 2, 0.5, [], 'verse', mockMotif);

    // We expect the first iteration to fit in the given numBars (2 bars = 8 beats at 240 BPM = 2 seconds)
    // The original motif is 2 beats long (at 120 BPM = 1 second). At 240 BPM, it's 0.5 seconds long (actually wait, 1 beat is 60/240 = 0.25s, so 4 beats = 1s. 2 bars = 8 beats = 2s.)
    // Original notes max is 2 seconds at 120 BPM. Let's calculate:
    // beatDuration(120) = 0.5s. notes end at 2s, which is 4 beats. So it's 1 bar.
    // At 240 BPM, timeScale = 120/240 = 0.5. Motif duration is 2 * 0.5 = 1s.
    // 2 bars at 240 BPM = 2 * 4 * 0.25s = 2s.
    // So the motif should play twice (0s..1s, 1s..2s).

    // Check first note
    expect(notes[0].pitch).toBe(62); // 60 + 2
    expect(notes[0].startTime).toBe(0);
    expect(notes[0].duration).toBe(0.25); // 0.5 * 0.5

    // Check second note
    expect(notes[1].pitch).toBe(64); // 62 + 2
    expect(notes[1].startTime).toBe(0.25);
    expect(notes[1].duration).toBe(0.25);

    // Check third note
    expect(notes[2].pitch).toBe(66); // 64 + 2
    expect(notes[2].startTime).toBe(0.5);
    expect(notes[2].duration).toBe(0.5);

    // Should repeat
    expect(notes[3]).toBeDefined();
    expect(notes[3].pitch).toBe(62);
    expect(notes[3].startTime).toBe(1.0);
  });
});
