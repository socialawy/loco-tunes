import { describe, it, expect, vi } from 'vitest';
import { generateTrack, validateParams } from '@/lib/audio/generator';
import type { GenerationParams, Track } from '@/types/music';

// Mock audio engine completely for integration test so we don't need real AudioContext
vi.mock('@/lib/audio/engine', async (importOriginal) => {
  const actual = await importOriginal() as any;
  return {
    ...actual,
    getAudioContext: vi.fn().mockReturnValue({
      createBuffer: vi.fn().mockReturnValue({
        numberOfChannels: 2,
        length: 44100,
        sampleRate: 44100,
        getChannelData: vi.fn().mockReturnValue(new Float32Array(44100)),
      }),
    }),
    getAudioEngine: vi.fn().mockReturnValue({
      renderStem: vi.fn().mockResolvedValue({
        numberOfChannels: 2,
        length: 44100,
        sampleRate: 44100,
        getChannelData: vi.fn().mockReturnValue(new Float32Array(44100)),
      }),
      cancelRendering: vi.fn(),
      renderNotesToBufferAsync: vi.fn().mockResolvedValue({
        numberOfChannels: 2,
        length: 44100,
        sampleRate: 44100,
        getChannelData: vi.fn().mockReturnValue(new Float32Array(44100)),
      }),
    }),
  };
});

describe('Audio Integration: Full Generation Pipeline', () => {
  const baseParams: GenerationParams = {
    genre: 'electronic',
    mood: 'happy',
    bpm: 120,
    scale: 'major',
    complexity: 0.5,
    duration: 15,
  };

  describe('Validation', () => {
    it('should pass valid params', () => {
      expect(validateParams(baseParams)).toEqual([]);
    });

    it('should detect invalid BPM', () => {
      const errors = validateParams({ ...baseParams, bpm: 300 });
      expect(errors).toContain('BPM must be between 60 and 180');
    });

    it('should detect invalid complexity', () => {
      const errors = validateParams({ ...baseParams, complexity: 1.5 });
      expect(errors).toContain('Complexity must be between 0 and 1');
    });

    it('should pass with missing optional fields', () => {
      const errors = validateParams({});
      expect(errors).toEqual([]);
    });
  });

  describe('Track Generation (All Genres)', () => {
    it('should generate an electronic track', async () => {
      const track = await generateTrack({ ...baseParams, genre: 'electronic' });
      expect(track.stems.length).toBe(4);
      expect(track.params.genre).toBe('electronic');
      // Verify stems have notes
      track.stems.forEach(stem => {
        expect(Array.isArray(stem.notes)).toBe(true);
      });
    });

    it('should generate a hiphop track', async () => {
      const track = await generateTrack({ ...baseParams, genre: 'hiphop' });
      expect(track.stems.length).toBe(4);
      expect(track.params.genre).toBe('hiphop');
    });

    it('should generate an ambient track', async () => {
      const track = await generateTrack({ ...baseParams, genre: 'ambient' });
      expect(track.stems.length).toBe(4);
      expect(track.params.genre).toBe('ambient');
    });

    it('should generate a rock track', async () => {
      const track = await generateTrack({ ...baseParams, genre: 'rock' });
      expect(track.stems.length).toBe(4);
      expect(track.params.genre).toBe('rock');
    });

    it('should generate a jazz track', async () => {
      const track = await generateTrack({ ...baseParams, genre: 'jazz' });
      expect(track.stems.length).toBe(4);
      expect(track.params.genre).toBe('jazz');
    });
  });

  describe('Track Generation Edge Cases', () => {
    it('should generate track with minimum BPM', async () => {
      const track = await generateTrack({ ...baseParams, bpm: 60 });
      expect(track.params.bpm).toBe(60);
    });

    it('should generate track with maximum BPM', async () => {
      const track = await generateTrack({ ...baseParams, bpm: 200 });
      expect(track.params.bpm).toBe(200);
    });

    it('should generate track with complexity 0', async () => {
      const track = await generateTrack({ ...baseParams, complexity: 0 });
      expect(track.params.complexity).toBe(0);
    });

    it('should generate track with complexity 1', async () => {
      const track = await generateTrack({ ...baseParams, complexity: 1 });
      expect(track.params.complexity).toBe(1);
    });
  });
});
