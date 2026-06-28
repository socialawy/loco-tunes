import { describe, it, expect } from 'vitest';
import { extractMotif } from '@/lib/audio/melody';

describe('Motif Extraction', () => {
  it('should extract notes within the target duration', () => {
    const notes = [
      { pitch: 60, velocity: 100, startTime: 0, duration: 1 },
      { pitch: 62, velocity: 100, startTime: 1, duration: 1 },
      { pitch: 64, velocity: 100, startTime: 4, duration: 1 }, // exactly at 4s boundary for 120BPM 2 bars
      { pitch: 65, velocity: 100, startTime: 5, duration: 1 },
    ];
    // 120 bpm, 2 bars = 8 beats = 4 seconds duration
    const motif = extractMotif(notes, 120, 2);
    expect(motif.length).toBe(2);
    expect(motif[0].pitch).toBe(60);
    expect(motif[1].pitch).toBe(62);
  });
});
