'use client';

import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useMusicStore } from '@/stores/musicStore';
import { Play, Trash2, Music } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

export function MotifsLibrary() {
  const { savedMotifs, fetchMotifs, playMotif, deleteMotif } = useMusicStore();

  useEffect(() => {
    fetchMotifs();
  }, [fetchMotifs]);

  if (savedMotifs.length === 0) {
    return (
      <div className="p-6 bg-[#16162a] rounded-xl border border-[#2a2a4e] text-center">
        <Music className="h-12 w-12 text-gray-500 mx-auto mb-4 opacity-50" />
        <h3 className="text-lg font-semibold text-white mb-2">No Saved Motifs</h3>
        <p className="text-gray-400 text-sm">
          Generate a track and use the "Save Motif" button on the Melody stem to build your library.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-[#16162a] rounded-xl border border-[#2a2a4e]">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-white">Saved Motifs</h3>
          <p className="text-sm text-gray-400">
            {savedMotifs.length} {savedMotifs.length === 1 ? 'motif' : 'motifs'} available for reuse
          </p>
        </div>
      </div>

      <ScrollArea className="h-[400px] pr-4">
        <div className="space-y-4">
          {savedMotifs.map((motif) => (
            <div
              key={motif.id}
              className="p-4 bg-[#1a1a2e] rounded-lg border border-[#2a2a4e] hover:border-violet-500/50 transition-colors group"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="text-white font-medium mb-1">{motif.name}</h4>
                  <div className="flex items-center gap-3 text-xs text-gray-400">
                    <span>Key: {motif.originalKey} {motif.originalScale}</span>
                    <span>BPM: {motif.originalBpm}</span>
                    <span>Notes: {motif.notes.length}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => playMotif(motif.id)}
                    className="h-8 w-8 text-gray-400 hover:text-green-400 hover:bg-[#2a2a4e]"
                    title="Preview Motif"
                  >
                    <Play className="h-4 w-4" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteMotif(motif.id)}
                    className="h-8 w-8 text-gray-400 hover:text-red-400 hover:bg-[#2a2a4e]"
                    title="Delete Motif"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
