'use client';

import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useMusicStore } from '@/stores/musicStore';
import { Trash2, Music, CheckCircle2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export function MotifBrowser() {
  const {
    savedMotifs,
    fetchMotifs,
    deleteMotif,
    selectedMotifId,
    selectMotif,
    isGenerating
  } = useMusicStore();

  useEffect(() => {
    fetchMotifs();
  }, [fetchMotifs]);

  if (savedMotifs.length === 0) {
    return (
      <div className="p-6 bg-[#16162a] rounded-xl border border-[#2a2a4e] text-center">
        <div className="w-16 h-16 mx-auto mb-4 bg-[#1a1a2e] rounded-full flex items-center justify-center border border-[#2a2a4e]">
          <Music className="h-8 w-8 text-gray-500" />
        </div>
        <h3 className="text-lg font-semibold text-white mb-2">No Saved Motifs</h3>
        <p className="text-gray-400 text-sm max-w-md mx-auto">
          You haven't saved any melody motifs yet. Generate a track and click the "Save Motif"
          button on the Melody stem to build your library.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-white">Saved Motifs</h3>
          <p className="text-sm text-gray-400">
            Select a motif to influence your next track generation.
          </p>
        </div>

        {selectedMotifId && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => selectMotif(null)}
            className="text-gray-400 border-[#2a2a4e] hover:bg-[#2a2a4e] hover:text-white"
          >
            Clear Selection
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {savedMotifs.map((motif) => {
          const isSelected = selectedMotifId === motif.id;

          return (
            <div
              key={motif.id}
              className={`
                p-4 rounded-xl border transition-all cursor-pointer relative
                ${isSelected
                  ? 'bg-violet-500/10 border-violet-500/50 shadow-[0_0_15px_rgba(139,92,246,0.15)]'
                  : 'bg-[#16162a] border-[#2a2a4e] hover:border-violet-500/30'
                }
              `}
              onClick={() => selectMotif(motif.id)}
            >
              {isSelected && (
                <div className="absolute top-4 right-4 text-violet-400">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
              )}

              <div className="flex items-start gap-3 mb-3">
                <div className={`
                  w-10 h-10 rounded-lg flex items-center justify-center shrink-0
                  ${isSelected ? 'bg-violet-500 text-white' : 'bg-[#1a1a2e] text-violet-400'}
                `}>
                  <Music className="h-5 w-5" />
                </div>

                <div className="flex-1 min-w-0 pr-6">
                  <h4 className="text-sm font-semibold text-white truncate" title={motif.name}>
                    {motif.name}
                  </h4>
                  <p className="text-xs text-gray-400 mt-1">
                    {formatDistanceToNow(new Date(motif.createdAt), { addSuffix: true })}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-gray-400 mb-4 bg-[#1a1a2e] px-2 py-1.5 rounded-md w-fit border border-[#2a2a4e]/50">
                <span>{motif.notes.length} notes</span>
                <span>•</span>
                <span>{motif.originalBpm} BPM</span>
              </div>

              <div className="flex items-center justify-end border-t border-[#2a2a4e] pt-3 mt-auto">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteMotif(motif.id);
                  }}
                  disabled={isGenerating}
                  className="text-gray-500 hover:text-red-400 hover:bg-red-500/10 h-8"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
