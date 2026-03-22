'use client';

import React, { useEffect, useRef } from 'react';
import { useMusicStore } from '@/stores/musicStore';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Download, Upload, Trash2, FolderOpen, Save, Plus } from 'lucide-react';
import { exportProject, importProject } from '@/lib/storage';
import { toast } from 'sonner';

export function ProjectBrowser() {
  const {
    projects,
    fetchProjects,
    loadProjectData,
    deleteProjectData,
    currentProjectId,
    currentTrack,
    createNewProject,
    saveCurrentProject
  } = useMusicStore();

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const project = await importProject(file);
      await fetchProjects();
      toast.success(`Imported project: ${project.name}`);
    } catch (err) {
      console.error('Import error:', err);
      toast.error('Failed to import project file');
    }

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleExport = (project: import("@/types/music").Project) => {
    const blob = exportProject(project);
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `loco-tunes-project-${project.name.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleSaveAsNew = () => {
    if (!currentTrack) {
      toast.error('No track generated to save');
      return;
    }
    const name = prompt('Enter a name for the new project:', `Project ${new Date().toLocaleString()}`);
    if (name) {
      createNewProject(name);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <h2 className="text-2xl font-bold">Saved Projects</h2>

        <div className="flex flex-wrap gap-2">
          {currentTrack && (
            <>
              {currentProjectId && (
                <Button variant="outline" size="sm" onClick={() => saveCurrentProject()}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Current
                </Button>
              )}
              <Button variant="outline" size="sm" onClick={handleSaveAsNew}>
                <Plus className="h-4 w-4 mr-2" />
                Save As New
              </Button>
            </>
          )}

          <div className="relative">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImport}
              accept=".json"
              className="hidden"
            />
            <Button variant="secondary" size="sm" onClick={() => fileInputRef.current?.click()}>
              <Upload className="h-4 w-4 mr-2" />
              Import Project
            </Button>
          </div>
        </div>
      </div>

      {projects.length === 0 ? (
        <Card className="p-8 text-center bg-[#16162a] border-[#2a2a4e]">
          <p className="text-gray-400">No saved projects found. Generate a track and it will automatically save!</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project) => (
            <Card
              key={project.id}
              className={`p-4 bg-[#16162a] border-[#2a2a4e] transition-colors ${
                currentProjectId === project.id ? 'ring-2 ring-violet-500' : 'hover:border-violet-500/50'
              }`}
            >
              <div className="flex flex-col h-full justify-between gap-4">
                <div>
                  <h3 className="font-semibold text-lg truncate" title={project.name}>
                    {project.name}
                  </h3>
                  <p className="text-sm text-gray-400 mt-1">
                    {project.track.params.genre} • {project.track.params.bpm} BPM
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    Updated: {new Date(project.updatedAt).toLocaleString()}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant={currentProjectId === project.id ? "default" : "secondary"}
                    size="sm"
                    className="flex-1"
                    onClick={() => loadProjectData(project.id)}
                    disabled={currentProjectId === project.id}
                  >
                    <FolderOpen className="h-4 w-4 mr-2" />
                    {currentProjectId === project.id ? 'Loaded' : 'Load'}
                  </Button>

                  <Button
                    variant="outline"
                    size="icon"
                    title="Export as JSON"
                    onClick={() => handleExport(project)}
                  >
                    <Download className="h-4 w-4" />
                  </Button>

                  <Button
                    variant="outline"
                    size="icon"
                    className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                    title="Delete Project"
                    onClick={() => {
                      if (confirm('Are you sure you want to delete this project?')) {
                        deleteProjectData(project.id);
                      }
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
