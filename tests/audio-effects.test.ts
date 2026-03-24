import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  createReverbImpulse,
  createDelayNode,
  createChorusNode,
  createDistortionCurve,
  createDistortionNode,
  createFilterNode,
  createPannerNode,
  createTremoloNode
} from '@/lib/audio/effects';
import * as engine from '@/lib/audio/engine';

describe('Audio Effects Generator', () => {
  let mockContext: any;

  beforeEach(() => {
    // Basic mock of AudioContext
    mockContext = {
      createBuffer: vi.fn().mockImplementation((channels, length, sampleRate) => ({
        numberOfChannels: channels,
        length,
        sampleRate,
        getChannelData: vi.fn().mockReturnValue(new Float32Array(length)),
      })),
      createDelay: vi.fn().mockImplementation((maxTime) => ({
        delayTime: { value: 0 },
        connect: vi.fn(),
      })),
      createGain: vi.fn().mockImplementation(() => ({
        gain: { value: 1 },
        connect: vi.fn(),
      })),
      createOscillator: vi.fn().mockImplementation(() => ({
        type: 'sine',
        frequency: { value: 440 },
        connect: vi.fn(),
        start: vi.fn(),
        stop: vi.fn(),
      })),
      createWaveShaper: vi.fn().mockImplementation(() => ({
        curve: null,
        oversample: 'none',
        connect: vi.fn(),
      })),
      createBiquadFilter: vi.fn().mockImplementation(() => ({
        type: 'lowpass',
        frequency: { value: 350 },
        Q: { value: 1 },
        connect: vi.fn(),
      })),
      createStereoPanner: vi.fn().mockImplementation(() => ({
        pan: { value: 0 },
        connect: vi.fn(),
      })),
    };

    // Mock getAudioContext
    vi.spyOn(engine, 'getAudioContext').mockReturnValue(mockContext);
  });

  describe('createReverbImpulse', () => {
    it('should create an audio buffer for reverb impulse', () => {
      const buffer = createReverbImpulse(1.0, 2.0, 44100);
      expect(mockContext.createBuffer).toHaveBeenCalledWith(2, 44100, 44100);
      expect(buffer.getChannelData).toHaveBeenCalledTimes(2);
    });
  });

  describe('createDelayNode', () => {
    it('should create a delay node graph', () => {
      const settings = { time: 0.5, feedback: 0.3, mix: 0.5 };
      const { input, output } = createDelayNode(mockContext, settings);

      expect(mockContext.createDelay).toHaveBeenCalled();
      expect(mockContext.createGain).toHaveBeenCalledTimes(3); // feedback, wet, dry

      // Checking connection methods
      expect((input as any).gain.value).toBeDefined();
      expect((output as any).gain.value).toBeDefined();
    });
  });

  describe('createChorusNode', () => {
    it('should create a chorus node graph', () => {
      const settings = { rate: 2, depth: 0.5, mix: 0.5 };
      const { input, output, nodes } = createChorusNode(mockContext, settings);

      expect(mockContext.createDelay).toHaveBeenCalled();
      expect(mockContext.createOscillator).toHaveBeenCalled();
      expect(mockContext.createGain).toHaveBeenCalledTimes(4); // lfoGain, wet, dry, merger

      expect(nodes.length).toBe(6);
    });
  });

  describe('createDistortionCurve', () => {
    it('should create a float32 array for distortion curve', () => {
      const curve = createDistortionCurve(50);
      expect(curve).toBeInstanceOf(Float32Array);
      expect(curve.length).toBe(44100);
    });
  });

  describe('createDistortionNode', () => {
    it('should create a distortion node graph', () => {
      const settings = { amount: 50, mix: 0.5 };
      const { input, output } = createDistortionNode(mockContext, settings);

      expect(mockContext.createWaveShaper).toHaveBeenCalled();
      expect(mockContext.createGain).toHaveBeenCalledTimes(3); // wet, dry, merger
    });
  });

  describe('createFilterNode', () => {
    it('should create a biquad filter node', () => {
      const settings = { frequency: 1000, resonance: 2, type: 'lowpass' as BiquadFilterType };
      const filter = createFilterNode(mockContext, settings);

      expect(mockContext.createBiquadFilter).toHaveBeenCalled();
      expect(filter.type).toBe('lowpass');
      expect(filter.frequency.value).toBe(1000);
      expect(filter.Q.value).toBe(2);
    });
  });

  describe('createPannerNode', () => {
    it('should create a stereo panner node', () => {
      const panner = createPannerNode(mockContext, 0.5);

      expect(mockContext.createStereoPanner).toHaveBeenCalled();
      expect(panner.pan.value).toBe(0.5);
    });
  });

  describe('createTremoloNode', () => {
    it('should create a tremolo node graph', () => {
      const settings = { rate: 5, depth: 0.8 };
      const { input, output, nodes } = createTremoloNode(mockContext, settings);

      expect(mockContext.createOscillator).toHaveBeenCalled();
      expect(mockContext.createGain).toHaveBeenCalledTimes(2); // lfoGain, outputGain

      expect(nodes.length).toBe(3);
    });
  });
});
