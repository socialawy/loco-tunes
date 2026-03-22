import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  saveProject,
  loadProject,
  getProjects,
  deleteProject,
  exportProject,
  importProject
} from '@/lib/storage';
import * as idbKeyval from 'idb-keyval';
import type { Project, Track, EffectSettings } from '@/types/music';

// Mock idb-keyval completely
vi.mock('idb-keyval', () => {
  const store = new Map<string, any>();
  return {
    get: vi.fn((key: string) => Promise.resolve(store.get(key))),
    set: vi.fn((key: string, val: any) => {
      store.set(key, val);
      return Promise.resolve();
    }),
    del: vi.fn((key: string) => {
      store.delete(key);
      return Promise.resolve();
    }),
    keys: vi.fn(() => Promise.resolve(Array.from(store.keys()))),
    clear: vi.fn(() => {
      store.clear();
      return Promise.resolve();
    }),
    __store: store // expose for test assertions if needed
  };
});

// Mock File and Blob and FileReader for import/export tests
global.Blob = class Blob {
  constructor(public parts: any[], public options: any) {}
} as any;

global.File = class File extends Blob {
  constructor(parts: any[], public name: string, options: any) {
    super(parts, options);
  }
} as any;

describe('Storage Utilities', () => {
  const mockTrack: Track = {
    id: 'track1',
    name: 'My Track',
    params: {
      genre: 'electronic',
      bpm: 120,
      mood: 'happy',
      duration: 30,
      scale: 'major',
      complexity: 0.5,
      key: 'C'
    },
    duration: 30,
    createdAt: new Date(),
    stems: [
      {
        type: 'melody',
        notes: [{ pitch: 60, velocity: 100, startTime: 0, duration: 1 }],
        volume: 1,
        muted: false,
        solo: false,
        color: '#22c55e',
        audioBuffer: {} as any // Mock audio buffer that should be stripped
      }
    ]
  };

  const mockEffects: EffectSettings = {
    reverb: { enabled: true, mix: 0.5, decay: 2.0 },
    eq: { enabled: false, low: 0, mid: 0, high: 0 },
    compressor: { enabled: true, threshold: -20, ratio: 4, attack: 0.01, release: 0.1 }
  };

  const mockProject: Project = {
    id: 'proj1',
    name: 'Test Project',
    track: mockTrack,
    effects: mockEffects,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  beforeEach(async () => {
    // Clear mock store before each test
    // @ts-ignore
    await idbKeyval.clear();
    vi.clearAllMocks();
  });

  describe('saveProject & loadProject', () => {
    it('should save a project and strip audioBuffers', async () => {
      await saveProject(mockProject);

      expect(idbKeyval.set).toHaveBeenCalled();

      // Load it back to verify
      const loaded = await loadProject('proj1');
      expect(loaded).toBeDefined();
      expect(loaded?.id).toBe('proj1');

      // Verify audioBuffer was stripped
      expect(loaded?.track.stems[0].audioBuffer).toBeUndefined();
    });
  });

  describe('getProjects', () => {
    it('should retrieve all projects sorted by updatedAt descending', async () => {
      const proj2 = {
        ...mockProject,
        id: 'proj2',
        updatedAt: new Date(Date.now() + 1000).toISOString() // Newer
      };

      await saveProject(mockProject);
      await saveProject(proj2);

      const projects = await getProjects();
      expect(projects.length).toBe(2);

      // proj2 is newer, so it should be first
      expect(projects[0].id).toBe('proj2');
      expect(projects[1].id).toBe('proj1');
    });
  });

  describe('deleteProject', () => {
    it('should delete a project by id', async () => {
      await saveProject(mockProject);
      let projects = await getProjects();
      expect(projects.length).toBe(1);

      await deleteProject('proj1');

      projects = await getProjects();
      expect(projects.length).toBe(0);
    });
  });

  describe('exportProject', () => {
    it('should export a project to a JSON Blob without audio buffers', () => {
      const blob = exportProject(mockProject);

      expect(blob).toBeInstanceOf(Blob);
      // @ts-ignore
      expect(blob.options.type).toBe('application/json');

      // @ts-ignore
      const jsonStr = blob.parts[0];
      const parsed = JSON.parse(jsonStr);

      expect(parsed.id).toBe('proj1');
      expect(parsed.track.stems[0].audioBuffer).toBeUndefined();
    });
  });

  describe('importProject', () => {
    it('should import a valid project file and save it to IDB', async () => {
      // Mock FileReader
      class MockFileReader {
        onload: any;
        onerror: any;
        readAsText(file: File) {
          setTimeout(() => {
            // @ts-ignore
            this.onload({ target: { result: file.parts[0] } });
          }, 0);
        }
      }
      global.FileReader = MockFileReader as any;

      const projectJson = JSON.stringify(mockProject);
      const file = new File([projectJson], 'project.json', { type: 'application/json' });

      const imported = await importProject(file);

      expect(imported.id).toBe('proj1');
      expect(imported.name).toBe('Test Project');

      // Verify it was saved to IDB
      const loaded = await loadProject('proj1');
      expect(loaded).toBeDefined();
    });

    it('should reject invalid project file format', async () => {
      class MockFileReader {
        onload: any;
        readAsText() {
          setTimeout(() => {
            // Missing essential properties
            this.onload({ target: { result: JSON.stringify({ invalid: true }) } });
          }, 0);
        }
      }
      global.FileReader = MockFileReader as any;

      const file = new File(['{}'], 'invalid.json', { type: 'application/json' });

      await expect(importProject(file)).rejects.toThrow('Invalid project file format');
    });
  });
});
