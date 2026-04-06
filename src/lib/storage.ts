import { get, set, keys, del } from 'idb-keyval';
import type { Project, Track, Stem, Motif } from '@/types/music';

const STORE_PREFIX = 'loco-tunes-project-';
const MOTIF_PREFIX = 'loco-tunes-motif-';

// Helper to sanitize AudioBuffer from track before saving or exporting
function sanitizeTrackForStorage(track: Track): Track {
  return {
    ...track,
    stems: track.stems.map((stem: Stem) => {
      // Create a shallow copy and delete audioBuffer
      const sanitizedStem = { ...stem };
      delete sanitizedStem.audioBuffer;
      return sanitizedStem;
    })
  };
}

export async function saveProject(project: Project): Promise<void> {
  const sanitizedProject = {
    ...project,
    track: sanitizeTrackForStorage(project.track),
    updatedAt: project.updatedAt || new Date().toISOString(),
  };

  await set(`${STORE_PREFIX}${project.id}`, sanitizedProject);
}

export async function loadProject(id: string): Promise<Project | undefined> {
  const project = await get<Project>(`${STORE_PREFIX}${id}`);
  // Note: audioBuffer properties will be undefined, which is expected.
  // The application must recreate them using audio engine if needed.
  return project;
}

export async function getProjects(): Promise<Project[]> {
  const allKeys = await keys();
  const projectKeys = allKeys.filter(k => typeof k === 'string' && k.startsWith(STORE_PREFIX));

  const projects: Project[] = [];
  for (const key of projectKeys) {
    const project = await get<Project>(key);
    if (project) {
      projects.push(project);
    }
  }

  // Sort by updatedAt descending (newest first)
  return projects.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
}

export async function deleteProject(id: string): Promise<void> {
  await del(`${STORE_PREFIX}${id}`);
}

export function exportProject(project: Project): Blob {
  const sanitizedProject = {
    ...project,
    track: sanitizeTrackForStorage(project.track),
  };

  const json = JSON.stringify(sanitizedProject, null, 2);
  return new Blob([json], { type: 'application/json' });
}

export async function importProject(file: File): Promise<Project> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = async (e) => {
      try {
        const json = e.target?.result as string;
        const project = JSON.parse(json) as Project;

        // Basic validation
        if (!project.id || !project.track || !project.effects) {
          throw new Error('Invalid project file format');
        }

        // Save to IndexedDB immediately
        await saveProject(project);
        resolve(project);
      } catch (err) {
        reject(err);
      }
    };

    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
}

// Motif storage functions

export async function saveMotifData(motif: Motif): Promise<void> {
  await set(`${MOTIF_PREFIX}${motif.id}`, motif);
}

export async function loadMotifData(id: string): Promise<Motif | undefined> {
  return await get<Motif>(`${MOTIF_PREFIX}${id}`);
}

export async function getMotifsData(): Promise<Motif[]> {
  const allKeys = await keys();
  const motifKeys = allKeys.filter(k => typeof k === 'string' && k.startsWith(MOTIF_PREFIX));

  const motifs: Motif[] = [];
  for (const key of motifKeys) {
    const motif = await get<Motif>(key);
    if (motif) {
      motifs.push(motif);
    }
  }

  // Sort by createdAt descending (newest first)
  return motifs.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function deleteMotifData(id: string): Promise<void> {
  await del(`${MOTIF_PREFIX}${id}`);
}
