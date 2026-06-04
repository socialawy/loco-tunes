import { describe, it, expect, vi, beforeEach } from 'vitest';
import { generateMelodyNotes } from '../src/lib/audio/melody';
import { generateTrack } from '../src/lib/audio/generator';
import { DEFAULT_PARAMS } from '../src/types/music';
import * as storage from '../src/lib/storage';
import { getAudioEngine } from '../src/lib/audio/engine';

vi.mock('../src/lib/audio/engine', () => {
  return {
    getAudioEngine: vi.fn(() => ({
      renderNotesToBufferAsync: vi.fn().mockResolvedValue({} as any),
      setEffects: vi.fn(),
      setStemVolume: vi.fn(),
      setStemMute: vi.fn(),
      setStemSolo: vi.fn(),
    })),
  };
});

describe('Motif Memory Tests', () => {
  beforeEach(() => {
    vi.spyOn(Math, 'random').mockReturnValue(0.5);
  });

  it('generateMelodyNotes should use motifNotes when provided', () => {
    const motifNotes = [
      { pitch: 60, velocity: 100, startTime: 0, duration: 0.5 },
      { pitch: 62, velocity: 100, startTime: 0.5, duration: 0.5 },
      { pitch: 64, velocity: 100, startTime: 1.0, duration: 1.0 },
    ];

    // Scale is C minor (0, 2, 3, 5, 7, 8, 10). Root is 60 (C4).
    const result = generateMelodyNotes(60, 'minor', 'electronic', 'happy', 120, 1, 0.5, [], 'verse', motifNotes);

    // Should preserve the rhythmic structure (relative start times and durations)
    // Pitch will be snapped to the target scale. 60, 62, 64 -> C, D, E. C and D are in C minor. E is not, it should snap to Eb (63).
    expect(result.length).toBeGreaterThan(0);
    expect(result[0].pitch).toBe(60);
    expect(result[0].startTime).toBe(0);
    expect(result[0].duration).toBe(0.5);

    expect(result[1].pitch).toBe(62);
    expect(result[1].startTime).toBe(0.5);

    expect(result[2].pitch).toBe(63); // snapped to Eb
    expect(result[2].startTime).toBe(1.0);
  });

  it('generateTrack should integrate motif when useSavedMotifId is present', async () => {
    const motif = {
      id: 'motif-123',
      name: 'Test Motif',
      notes: [
        { pitch: 60, velocity: 100, startTime: 0, duration: 0.5 },
      ],
      originalBpm: 120,
      genre: 'electronic' as const,
      createdAt: new Date().toISOString(),
    };

    vi.spyOn(storage, 'loadMotif').mockResolvedValue(motif);

    const params = {
      ...DEFAULT_PARAMS,
      useSavedMotifId: 'motif-123'
    };

    const track = await generateTrack(params);
    const melodyStem = track.stems.find(s => s.type === 'melody');

    expect(melodyStem).toBeDefined();
    // Verify that the melody stem starts with the motif pattern
    expect(melodyStem!.notes[0].pitch).toBe(60);
  });
});
