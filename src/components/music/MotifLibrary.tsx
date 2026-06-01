'use client';

import React, { useEffect } from 'react';
import { useMusicStore } from '@/stores/musicStore';
import { Button } from '@/components/ui/button';
import { Trash2, Music } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export function MotifLibrary() {
  const { savedMotifs, loadMotifs, deleteMotif } = useMusicStore();

  useEffect(() => {
    loadMotifs();
  }, [loadMotifs]);

  if (savedMotifs.length === 0) {
    return (
      <div className="p-6 bg-[#16162a] rounded-xl border border-[#2a2a4e]">
        <h3 className="text-lg font-semibold text-white mb-4">Saved Motifs</h3>
        <p className="text-gray-500 text-center">
          No motifs saved yet. Generate a track and save the melody as a motif.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-[#16162a] rounded-xl border border-[#2a2a4e]">
      <h3 className="text-lg font-semibold text-white mb-4">Saved Motifs</h3>
      <div className="space-y-3">
        {savedMotifs.map((motif) => (
          <div
            key={motif.id}
            className="flex items-center justify-between p-3 bg-[#1a1a2e] rounded-lg border border-[#2a2a4e]"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded bg-[#2a2a4e] flex items-center justify-center text-violet-400">
                <Music className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-white font-medium">{motif.name}</h4>
                <p className="text-xs text-gray-500">
                  {motif.originalKey} {motif.originalScale} • {motif.originalBpm} BPM
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-400 hover:text-red-400 hover:bg-[#2a2a4e]"
                onClick={() => {
                  if (window.confirm('Delete this motif?')) {
                    deleteMotif(motif.id);
                  }
                }}
                title="Delete motif"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
