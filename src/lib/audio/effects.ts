// DSP Effects for Loco-Tunes

import { getAudioContext } from './engine';

// Reverb impulse response generator
export function createReverbImpulse(
  duration: number = 2.0,
  decay: number = 2.0,
  sampleRate: number = 44100
): AudioBuffer {
  const context = getAudioContext();
  const length = Math.floor(sampleRate * duration);
  const buffer = context.createBuffer(2, length, sampleRate);
  
  for (let channel = 0; channel < 2; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < length; i++) {
      // Create a more natural reverb with exponential decay
      const t = i / sampleRate;
      const amplitude = Math.exp(-decay * t);
      
      // Add some early reflections
      const earlyReflection = i < sampleRate * 0.1 
        ? Math.random() * 0.5 
        : 0;
      
      channelData[i] = (Math.random() * 2 - 1) * (amplitude + earlyReflection * Math.exp(-20 * t));
    }
  }
  
  return buffer;
}

// Delay effect
export interface DelaySettings {
  time: number; // in seconds
  feedback: number; // 0-1
  mix: number; // 0-1
}

export function createDelayNode(
  context: AudioContext,
  settings: DelaySettings
): { input: AudioNode; output: AudioNode } {
  const delay = context.createDelay(5.0);
  delay.delayTime.value = settings.time;
  
  const feedback = context.createGain();
  feedback.gain.value = settings.feedback;
  
  const wetGain = context.createGain();
  wetGain.gain.value = settings.mix;
  
  const dryGain = context.createGain();
  dryGain.gain.value = 1 - settings.mix;
  
  // Routing: input -> dryGain -> output
  //          input -> delay -> wetGain -> output
  //          delay -> feedback -> delay (feedback loop)
  
  delay.connect(feedback);
  feedback.connect(delay);
  delay.connect(wetGain);
  
  return {
    input: dryGain,
    output: dryGain,
  };
}

// Chorus effect
export interface ChorusSettings {
  rate: number; // LFO speed in Hz
  depth: number; // 0-1
  mix: number; // 0-1
}

export function createChorusNode(
  context: AudioContext,
  settings: ChorusSettings
): { input: AudioNode; output: AudioNode; nodes: AudioNode[] } {
  const delayTime = 0.03; // 30ms base delay
  const delay = context.createDelay(0.1);
  delay.delayTime.value = delayTime;
  
  const lfo = context.createOscillator();
  lfo.type = 'sine';
  lfo.frequency.value = settings.rate;
  
  const lfoGain = context.createGain();
  lfoGain.gain.value = delayTime * settings.depth;
  
  lfo.connect(lfoGain);
  lfoGain.connect(delay.delayTime);
  lfo.start();
  
  const wetGain = context.createGain();
  wetGain.gain.value = settings.mix;
  
  const dryGain = context.createGain();
  dryGain.gain.value = 1 - settings.mix;
  
  const merger = context.createGain();
  
  return {
    input: dryGain,
    output: merger,
    nodes: [delay, lfo, lfoGain, wetGain, dryGain, merger],
  };
}

// Distortion effect
export interface DistortionSettings {
  amount: number; // 0-100
  mix: number; // 0-1
}

export function createDistortionCurve(amount: number): Float32Array {
  const samples = 44100;
  const curve = new Float32Array(samples);
  const deg = Math.PI / 180;
  
  for (let i = 0; i < samples; i++) {
    const x = (i * 2) / samples - 1;
    curve[i] = ((3 + amount) * x * 20 * deg) / (Math.PI + amount * Math.abs(x));
  }
  
  return curve as Float32Array<ArrayBuffer>;
}

export function createDistortionNode(
  context: AudioContext,
  settings: DistortionSettings
): { input: AudioNode; output: AudioNode } {
  const distortion = context.createWaveShaper();
  (distortion as unknown as { curve: Float32Array }).curve = createDistortionCurve(settings.amount);
  distortion.oversample = '4x';
  
  const wetGain = context.createGain();
  wetGain.gain.value = settings.mix;
  
  const dryGain = context.createGain();
  dryGain.gain.value = 1 - settings.mix;
  
  const merger = context.createGain();
  
  return {
    input: dryGain,
    output: merger,
  };
}

// Low-pass filter with resonance
export interface FilterSettings {
  frequency: number; // cutoff in Hz
  resonance: number; // Q value
  type: BiquadFilterType;
}

export function createFilterNode(
  context: AudioContext,
  settings: FilterSettings
): BiquadFilterNode {
  const filter = context.createBiquadFilter();
  filter.type = settings.type;
  filter.frequency.value = settings.frequency;
  filter.Q.value = settings.resonance;
  return filter;
}

// Stereo panner
export function createPannerNode(
  context: AudioContext,
  pan: number // -1 (left) to 1 (right)
): StereoPannerNode {
  const panner = context.createStereoPanner();
  panner.pan.value = pan;
  return panner;
}

// Gain automation for tremolo
export interface TremoloSettings {
  rate: number; // Hz
  depth: number; // 0-1
}

export function createTremoloNode(
  context: AudioContext,
  settings: TremoloSettings
): { input: AudioNode; output: AudioNode; nodes: AudioNode[] } {
  const lfo = context.createOscillator();
  lfo.type = 'sine';
  lfo.frequency.value = settings.rate;
  
  const lfoGain = context.createGain();
  lfoGain.gain.value = settings.depth;
  
  const outputGain = context.createGain();
  outputGain.gain.value = 1 - settings.depth / 2;
  
  lfo.connect(lfoGain);
  lfo.connect(outputGain.gain);
  lfo.start();
  
  return {
    input: outputGain,
    output: outputGain,
    nodes: [lfo, lfoGain, outputGain],
  };
}

// Compressor presets
export const COMPRESSOR_PRESETS = {
  subtle: {
    threshold: -20,
    knee: 20,
    ratio: 3,
    attack: 0.01,
    release: 0.2,
  },
  punchy: {
    threshold: -15,
    knee: 10,
    ratio: 6,
    attack: 0.005,
    release: 0.1,
  },
  smashed: {
    threshold: -30,
    knee: 0,
    ratio: 12,
    attack: 0.001,
    release: 0.05,
  },
  transparent: {
    threshold: -12,
    knee: 30,
    ratio: 2,
    attack: 0.02,
    release: 0.3,
  },
};

// EQ presets
export const EQ_PRESETS = {
  flat: { low: 0, mid: 0, high: 0 },
  bassBoost: { low: 6, mid: 0, high: 0 },
  trebleBoost: { low: 0, mid: 2, high: 6 },
  vocal: { low: -2, mid: 4, high: 2 },
  warm: { low: 4, mid: -1, high: -2 },
  bright: { low: -2, mid: 2, high: 5 },
  radio: { low: -4, mid: 4, high: -4 },
  bassCut: { low: -6, mid: 0, high: 0 },
};

// Reverb presets
export const REVERB_PRESETS = {
  small: { duration: 0.5, decay: 3.0 },
  medium: { duration: 1.5, decay: 2.5 },
  large: { duration: 3.0, decay: 2.0 },
  hall: { duration: 4.0, decay: 1.5 },
  plate: { duration: 2.0, decay: 3.5 },
};
