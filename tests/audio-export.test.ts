import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  audioBufferToWav,
  exportStemToWav,
  exportTrackToWav,
  exportStemToMidi,
  exportTrackToMidi,
  downloadBlob,
  generateFilename
} from '@/lib/audio/export';
import type { Track, Stem, Note, GenerationParams } from '@/types/music';

// Mock Blob and URL for DOM tests
global.Blob = class Blob {
  constructor(public parts: any[], public options: any) {}
} as any;

global.URL = {
  createObjectURL: vi.fn(),
  revokeObjectURL: vi.fn(),
} as any;

describe('Audio Export Utilities', () => {
  let mockAudioBuffer: any;

  beforeEach(() => {
    // Create a mock AudioBuffer
    mockAudioBuffer = {
      numberOfChannels: 2,
      sampleRate: 44100,
      length: 100,
      getChannelData: vi.fn().mockImplementation((channel: number) => {
        const data = new Float32Array(100);
        for (let i = 0; i < 100; i++) {
          data[i] = (i % 2 === 0 ? 0.5 : -0.5);
        }
        return data;
      })
    };

    // Setup global OfflineAudioContext mock
    global.OfflineAudioContext = class OfflineAudioContext {
      destination = {};
      createBufferSource = vi.fn().mockReturnValue({
        buffer: null,
        connect: vi.fn(),
        start: vi.fn()
      });
      createGain = vi.fn().mockReturnValue({
        gain: { value: 1 },
        connect: vi.fn()
      });
    } as any;
  });

  describe('audioBufferToWav', () => {
    it('should create a Blob with WAV data from AudioBuffer', () => {
      const blob = audioBufferToWav(mockAudioBuffer);

      expect(blob).toBeInstanceOf(Blob);
      // @ts-ignore
      expect(blob.options.type).toBe('audio/wav');
      // @ts-ignore
      const arrayBuffer = blob.parts[0];
      expect(arrayBuffer).toBeInstanceOf(ArrayBuffer);

      // Minimum WAV header is 44 bytes
      // We have 100 samples * 2 channels * 2 bytes/sample = 400 bytes
      // Total = 444 bytes
      expect(arrayBuffer.byteLength).toBe(444);
    });
  });

  describe('exportStemToWav', () => {
    it('should export a stem with audio buffer to WAV', () => {
      const stem: Stem = {

        type: 'melody',
        notes: [],
        volume: 1,
        muted: false,
        solo: false, color: '#000',
        audioBuffer: mockAudioBuffer as AudioBuffer
      };

      const blob = exportStemToWav(stem);
      expect(blob).not.toBeNull();
      // @ts-ignore
      expect(blob?.options.type).toBe('audio/wav');
    });

    it('should return null if stem has no audio buffer', () => {
      const stem: Stem = {

        type: 'melody',
        notes: [],
        volume: 1,
        muted: false,
        solo: false, color: '#000'
      };

      const blob = exportStemToWav(stem);
      expect(blob).toBeNull();
    });
  });

  describe('exportTrackToWav', () => {
    it('should export a track to mixed WAV', () => {
      const track: Track = {
        id: 'track1',
        name: 'Test',
        params: { genre: 'electronic', mood: 'happy', bpm: 120, scale: 'major', complexity: 0.5, duration: 30 } as GenerationParams,
        duration: 2.0, // short duration for test
        stems: [
          {

            type: 'melody',
            notes: [],
            volume: 1,
            muted: false,
            solo: false, color: '#000',
            audioBuffer: mockAudioBuffer as AudioBuffer
          }
        ],
        createdAt: new Date()
      };

      const volumes = { melody: 1, drums: 1, bass: 1, harmony: 1 };

      const blob = exportTrackToWav(track, volumes);
      expect(blob).not.toBeNull();
      // @ts-ignore
      expect(blob?.options.type).toBe('audio/wav');
    });

    it('should handle missing audio buffers gracefully', () => {
      const track: Track = {
        id: 'track1',
        name: 'Test',
        params: {} as GenerationParams,
        duration: 2.0,
        stems: [
          {

            type: 'melody',
            notes: [],
            volume: 1,
            muted: false,
            solo: false, color: '#000'
          }
        ],
        createdAt: new Date()
      };

      const volumes = { melody: 1, drums: 1, bass: 1, harmony: 1 };

      const blob = exportTrackToWav(track, volumes);
      expect(blob).toBeNull();
    });
  });

  describe('exportStemToMidi', () => {
    it('should export stem notes to MIDI format with tempo and track name', () => {
      const notes: Note[] = [
        { pitch: 60, velocity: 100, startTime: 0, duration: 1 },
        { pitch: 64, velocity: 80, startTime: 1, duration: 1 }
      ];

      const stem: Stem = {

        type: 'melody',
        notes,
        volume: 1,
        muted: false,
        solo: false, color: '#000'
      };

      const blob = exportStemToMidi(stem, 120);
      expect(blob).toBeInstanceOf(Blob);
      // @ts-ignore
      expect(blob.options.type).toBe('audio/midi');

      // @ts-ignore
      const data = blob.parts[0] as Uint8Array;

      // Check MThd (MIDI header) magic number
      expect(data[0]).toBe('M'.charCodeAt(0));
      expect(data[1]).toBe('T'.charCodeAt(0));
      expect(data[2]).toBe('h'.charCodeAt(0));
      expect(data[3]).toBe('d'.charCodeAt(0));

      // Check track count (should be 1)
      const view = new DataView(data.buffer);
      const trackCount = view.getUint16(10, false);
      expect(trackCount).toBe(1);
    });
  });

  describe('exportTrackToMidi', () => {
    it('should export track with multiple stems to MIDI with proper track count', () => {
      const track: Track = {
        id: 'track1',
        name: 'Test',
        params: { bpm: 120 } as GenerationParams,
        duration: 30,
        stems: [
          {

            type: 'melody',
            notes: [{ pitch: 60, velocity: 100, startTime: 0, duration: 1 }],
            volume: 1,
            muted: false,
            solo: false, color: '#000'
          },
          {

            type: 'drums',
            notes: [{ pitch: 36, velocity: 127, startTime: 0, duration: 0.5 }],
            volume: 1,
            muted: false,
            solo: false, color: '#000'
          }
        ],
        createdAt: new Date()
      };

      const blob = exportTrackToMidi(track);
      expect(blob).toBeInstanceOf(Blob);
      // @ts-ignore
      expect(blob.options.type).toBe('audio/midi');

      // @ts-ignore
      const data = blob.parts[0] as Uint8Array;
      const view = new DataView(data.buffer);

      // Verify track count = 1 (Tempo Track) + 2 (Stems) = 3
      const trackCount = view.getUint16(10, false);
      expect(trackCount).toBe(3);
    });
  });

  describe('downloadBlob', () => {
    it('should create an anchor element, click it, and revoke URL', () => {
      // Since it's hard to cleanly mock the returned anchor as a full Node for jsdom,
      // we can spy on the actual real element that gets created.
      const originalCreateElement = document.createElement.bind(document);
      const mockClick = vi.fn();

      const createElementSpy = vi.spyOn(document, 'createElement').mockImplementation((tagName) => {
        const el = originalCreateElement(tagName);
        if (tagName === 'a') {
          el.click = mockClick;
        }
        return el;
      });

      const blob = new Blob(['test'], { type: 'text/plain' });
      downloadBlob(blob, 'test.txt');

      expect(URL.createObjectURL).toHaveBeenCalledWith(blob);
      expect(createElementSpy).toHaveBeenCalledWith('a');
      expect(mockClick).toHaveBeenCalled();
      expect(URL.revokeObjectURL).toHaveBeenCalled();

      createElementSpy.mockRestore();
    });
  });

  describe('generateFilename', () => {
    it('should generate a formatted filename', () => {
      const track = {
        params: { genre: 'electronic', bpm: 125 }
      } as Track;

      const filename = generateFilename(track, 'wav');

      expect(filename).toMatch(/^loco-tunes-electronic-125bpm-\d{4}-\d{2}-\d{2}\.wav$/);
    });
  });
});
