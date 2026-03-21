# Future Work

## Phase 3: Persistence
- [ ] Update `prisma/schema.prisma` to include `Track`, `Stem`, `Note` models.
- [ ] Create API routes (`src/app/api/tracks`) to save and load tracks.
- [ ] Update frontend to save/load tracks from the database.
- [ ] Implement user authentication (if not fully functional) to associate tracks with users.

## Phase 4: Advanced Features
- [ ] Add more instruments and genres to `src/lib/audio/generator.ts`.
- [ ] Create a UI for editing `SynthParams` (Attack, Decay, Sustain, Release, Oscillator Type).
- [ ] Implement "Advanced Mode" fully with the new synth parameters.
- [ ] Add MIDI export with full instrument mapping.

## Phase 5: Testing & Optimization
- [ ] Add unit tests for `AudioEngine` logic (mocking `AudioContext`).
- [ ] Optimize audio rendering for mobile devices (using `AudioWorklet` instead of `ScriptProcessor` if applicable, though we use `OfflineAudioContext` currently which is good).
- [ ] Implement track sharing features.
