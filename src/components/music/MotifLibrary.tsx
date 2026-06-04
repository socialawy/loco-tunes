import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useMusicStore } from '@/stores/musicStore';
import { Trash2, Music } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export function MotifLibrary() {
  const { savedMotifs, deleteMotif } = useMusicStore();

  if (savedMotifs.length === 0) {
    return (
      <div className="p-6 bg-[#16162a] rounded-xl border border-[#2a2a4e] text-center">
        <Music className="h-8 w-8 text-gray-500 mx-auto mb-3" />
        <p className="text-gray-400">No saved motifs yet.</p>
        <p className="text-sm text-gray-500 mt-1">
          Save a motif from the Stem Mixer to reuse its melody pattern.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-[#16162a] rounded-xl border border-[#2a2a4e]">
      <h3 className="text-lg font-semibold text-white mb-4">Motif Library</h3>

      <div className="space-y-3">
        {savedMotifs.map((motif) => (
          <div
            key={motif.id}
            className="flex items-center justify-between p-3 bg-[#1a1a2e] rounded-lg border border-[#2a2a4e]"
          >
            <div>
              <h4 className="font-medium text-white">{motif.name}</h4>
              <div className="text-xs text-gray-400 mt-1 flex items-center gap-2">
                <span>{motif.genre}</span>
                <span>•</span>
                <span>{motif.originalBpm} BPM</span>
                <span>•</span>
                <span>{motif.notes.length} notes</span>
                <span>•</span>
                <span>{formatDistanceToNow(new Date(motif.createdAt), { addSuffix: true })}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => deleteMotif(motif.id)}
                className="text-red-400 hover:text-red-300 hover:bg-red-950/30"
                title="Delete motif"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
