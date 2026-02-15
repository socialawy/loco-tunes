// Export functionality for WAV and MIDI files

import type { Note, Stem, Track, StemType } from '@/types/music';
import { NOTE_NAMES } from '@/types/music';

// WAV file export
export function audioBufferToWav(buffer: AudioBuffer): Blob {
  const numChannels = buffer.numberOfChannels;
  const sampleRate = buffer.sampleRate;
  const format = 1; // PCM
  const bitDepth = 16;
  
  const bytesPerSample = bitDepth / 8;
  const blockAlign = numChannels * bytesPerSample;
  
  const samples = buffer.length;
  const dataSize = samples * blockAlign;
  const fileSize = 44 + dataSize;
  
  const arrayBuffer = new ArrayBuffer(fileSize);
  const view = new DataView(arrayBuffer);
  
  // WAV header
  writeString(view, 0, 'RIFF');
  view.setUint32(4, fileSize - 8, true);
  writeString(view, 8, 'WAVE');
  writeString(view, 12, 'fmt ');
  view.setUint32(16, 16, true); // fmt chunk size
  view.setUint16(20, format, true);
  view.setUint16(22, numChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * blockAlign, true);
  view.setUint16(32, blockAlign, true);
  view.setUint16(34, bitDepth, true);
  writeString(view, 36, 'data');
  view.setUint32(40, dataSize, true);
  
  // Interleave channels and write samples
  const channels: Float32Array[] = [];
  for (let i = 0; i < numChannels; i++) {
    channels.push(buffer.getChannelData(i));
  }
  
  let offset = 44;
  for (let i = 0; i < samples; i++) {
    for (let ch = 0; ch < numChannels; ch++) {
      const sample = Math.max(-1, Math.min(1, channels[ch][i]));
      const intSample = sample < 0 ? sample * 0x8000 : sample * 0x7FFF;
      view.setInt16(offset, intSample, true);
      offset += 2;
    }
  }
  
  return new Blob([arrayBuffer], { type: 'audio/wav' });
}

function writeString(view: DataView, offset: number, str: string): void {
  for (let i = 0; i < str.length; i++) {
    view.setUint8(offset + i, str.charCodeAt(i));
  }
}

// Export stem to WAV
export function exportStemToWav(stem: Stem): Blob | null {
  if (!stem.audioBuffer) return null;
  return audioBufferToWav(stem.audioBuffer);
}

// Export all stems as mixed WAV
export function exportTrackToWav(track: Track, stemVolumes: Record<StemType, number>): Blob | null {
  // Create offline context for mixing
  const sampleRate = 44100;
  const numSamples = Math.ceil(track.duration * sampleRate);
  const offlineContext = new OfflineAudioContext(2, numSamples, sampleRate);
  
  // Mix stems
  for (const stem of track.stems) {
    if (!stem.audioBuffer || stem.muted) continue;
    
    const source = offlineContext.createBufferSource();
    source.buffer = stem.audioBuffer;
    
    const gain = offlineContext.createGain();
    gain.gain.value = stemVolumes[stem.type] ?? stem.volume;
    
    source.connect(gain);
    gain.connect(offlineContext.destination);
    source.start(0);
  }
  
  // For now, return the first stem's buffer mixed
  // In real implementation, we'd use async rendering
  const firstStemWithBuffer = track.stems.find(s => s.audioBuffer);
  if (!firstStemWithBuffer?.audioBuffer) return null;
  
  return audioBufferToWav(firstStemWithBuffer.audioBuffer);
}

// MIDI file export
const MIDI_PPQ = 480; // Pulses per quarter note

interface MidiEvent {
  deltaTime: number;
  status: number;
  data: number[];
}

interface MidiTrack {
  events: MidiEvent[];
}

function createMidiHeader(numTracks: number): Uint8Array {
  const header = new Uint8Array(14);
  const view = new DataView(header.buffer);
  
  // "MThd" chunk
  writeMidiString(header, 0, 'MThd');
  view.setUint32(4, 6, false); // Header length
  view.setUint16(8, 1, false); // Format type 1 (multi-track)
  view.setUint16(10, numTracks, false); // Number of tracks
  view.setUint16(12, MIDI_PPQ, false); // PPQ
  
  return header;
}

function createMidiTrack(events: MidiEvent[]): Uint8Array {
  const eventData: number[] = [];
  
  for (const event of events) {
    // Write variable-length delta time
    writeVariableLength(eventData, event.deltaTime);
    
    // Write status byte and data
    eventData.push(event.status);
    eventData.push(...event.data);
  }
  
  // End of track event
  eventData.push(0x00, 0xFF, 0x2F, 0x00);
  
  const track = new Uint8Array(8 + eventData.length);
  const view = new DataView(track.buffer);
  
  writeMidiString(track, 0, 'MTrk');
  view.setUint32(4, eventData.length, false);
  track.set(eventData, 8);
  
  return track;
}

function writeMidiString(arr: Uint8Array, offset: number, str: string): void {
  for (let i = 0; i < str.length; i++) {
    arr[offset + i] = str.charCodeAt(i);
  }
}

function writeVariableLength(data: number[], value: number): void {
  if (value === 0) {
    data.push(0);
    return;
  }
  
  const bytes: number[] = [];
  bytes.push(value & 0x7F);
  value >>= 7;
  
  while (value > 0) {
    bytes.push((value & 0x7F) | 0x80);
    value >>= 7;
  }
  
  // Write in reverse order
  for (let i = bytes.length - 1; i >= 0; i--) {
    data.push(bytes[i]);
  }
}

function secondsToTicks(seconds: number, bpm: number): number {
  const secondsPerBeat = 60 / bpm;
  const secondsPerTick = secondsPerBeat / MIDI_PPQ;
  return Math.round(seconds / secondsPerTick);
}

function notesToMidiEvents(notes: Note[], bpm: number, channel: number = 0): MidiEvent[] {
  const events: MidiEvent[] = [];
  const ticksPerSecond = (bpm / 60) * MIDI_PPQ;
  
  // Convert notes to note-on and note-off events
  const timedEvents: { tick: number; status: number; velocity: number; pitch: number }[] = [];
  
  for (const note of notes) {
    const startTick = Math.round(note.startTime * ticksPerSecond);
    const endTick = Math.round((note.startTime + note.duration) * ticksPerSecond);
    
    // Note on
    timedEvents.push({
      tick: startTick,
      status: 0x90 | channel,
      velocity: Math.round(note.velocity),
      pitch: note.pitch,
    });
    
    // Note off
    timedEvents.push({
      tick: endTick,
      status: 0x80 | channel,
      velocity: 0,
      pitch: note.pitch,
    });
  }
  
  // Sort by tick
  timedEvents.sort((a, b) => a.tick - b.tick);
  
  // Convert to delta times
  let lastTick = 0;
  for (const event of timedEvents) {
    const deltaTime = event.tick - lastTick;
    events.push({
      deltaTime,
      status: event.status,
      data: [event.pitch, event.velocity],
    });
    lastTick = event.tick;
  }
  
  return events;
}

// Export stem to MIDI
export function exportStemToMidi(stem: Stem, bpm: number): Blob {
  const events = notesToMidiEvents(stem.notes, bpm);
  
  // Add program change based on stem type
  const programChanges: Record<StemType, number> = {
    drums: 0, // Standard drum kit (channel 10 in GM)
    bass: 33, // Electric Bass (finger)
    melody: 80, // Synth Lead
    harmony: 88, // Synth Pad
  };
  
  const channel = stem.type === 'drums' ? 9 : 0; // Channel 10 for drums
  
  // Create track with program change
  const trackEvents: MidiEvent[] = [
    { deltaTime: 0, status: 0xC0 | channel, data: [programChanges[stem.type]] },
    ...events,
  ];
  
  const header = createMidiHeader(1);
  const track = createMidiTrack(trackEvents);
  
  const midiFile = new Uint8Array(header.length + track.length);
  midiFile.set(header, 0);
  midiFile.set(track, header.length);
  
  return new Blob([midiFile], { type: 'audio/midi' });
}

// Export full track to MIDI (multi-track)
export function exportTrackToMidi(track: Track): Blob {
  const { bpm } = track.params;
  
  // Create one track per stem
  const tracks: Uint8Array[] = [];
  const stemChannels: Record<StemType, number> = {
    drums: 9,
    bass: 0,
    melody: 1,
    harmony: 2,
  };
  
  const programChanges: Record<StemType, number> = {
    drums: 0,
    bass: 33,
    melody: 80,
    harmony: 88,
  };
  
  for (const stem of track.stems) {
    const channel = stemChannels[stem.type];
    const events: MidiEvent[] = [
      // Tempo meta event (only on first track)
      ...(stem.type === 'drums' ? [{
        deltaTime: 0,
        status: 0xFF,
        data: [0x51, 0x03, ...microsecondsPerBeat(bpm)],
      }] : []),
      // Program change
      { deltaTime: 0, status: 0xC0 | channel, data: [programChanges[stem.type]] },
    ];
    
    // Convert notes
    const noteEvents = notesToMidiEvents(stem.notes, bpm, channel);
    events.push(...noteEvents);
    
    tracks.push(createMidiTrack(events));
  }
  
  const header = createMidiHeader(tracks.length);
  const totalLength = header.length + tracks.reduce((sum, t) => sum + t.length, 0);
  
  const midiFile = new Uint8Array(totalLength);
  midiFile.set(header, 0);
  
  let offset = header.length;
  for (const track of tracks) {
    midiFile.set(track, offset);
    offset += track.length;
  }
  
  return new Blob([midiFile], { type: 'audio/midi' });
}

function microsecondsPerBeat(bpm: number): number[] {
  const microseconds = Math.round(60000000 / bpm);
  return [
    (microseconds >> 16) & 0xFF,
    (microseconds >> 8) & 0xFF,
    microseconds & 0xFF,
  ];
}

// Download helper
export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Generate filename
export function generateFilename(track: Track, extension: string): string {
  const date = new Date().toISOString().split('T')[0];
  const genre = track.params.genre;
  const bpm = track.params.bpm;
  return `loco-tunes-${genre}-${bpm}bpm-${date}.${extension}`;
}
