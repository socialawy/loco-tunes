'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useMusicStore } from '@/stores/musicStore';
import { Music, Trash2, CheckCircle2, Play } from 'lucide-react';
import { STEM_COLORS } from '@/types/music';

export function MotifLibrary() {
  const {
    savedMotifs,
    selectedMotifId,
    selectMotif,
    deleteMotif,
  } = useMusicStore();

  if (savedMotifs.length === 0) {
    return (
      <div className="p-6 bg-[#16162a] rounded-xl border border-[#2a2a4e] h-full flex flex-col items-center justify-center text-center">
        <div className="w-12 h-12 rounded-full bg-[#1a1a2e] flex items-center justify-center mb-3">
          <Music className="h-6 w-6 text-gray-500" />
        </div>
        <h3 className="text-white font-medium mb-1">No Saved Motifs</h3>
        <p className="text-sm text-gray-400 max-w-[200px]">
          Save a melody or bassline to reuse its pattern in future generations.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-[#16162a] rounded-xl border border-[#2a2a4e] h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Motif Library</h3>
        <span className="text-xs text-violet-400 bg-violet-500/10 px-2 py-1 rounded-full">
          {savedMotifs.length} saved
        </span>
      </div>

      <ScrollArea className="flex-1 -mx-2 px-2">
        <div className="space-y-3">
          {savedMotifs.map((motif) => {
            const isSelected = selectedMotifId === motif.id;

            return (
              <div
                key={motif.id}
                className={`
                  p-3 rounded-lg border transition-all cursor-pointer group
                  ${isSelected
                    ? 'bg-violet-500/10 border-violet-500/50'
                    : 'bg-[#1a1a2e] border-[#2a2a4e] hover:border-gray-500/50'
                  }
                `}
                onClick={() => selectMotif(isSelected ? null : motif.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`
                      w-8 h-8 rounded-full flex items-center justify-center
                      ${isSelected ? 'bg-violet-500 text-white' : 'bg-[#2a2a4e] text-gray-400'}
                    `}>
                      {isSelected ? <CheckCircle2 className="h-4 w-4" /> : <Music className="h-4 w-4" />}
                    </div>

                    <div>
                      <h4 className={`text-sm font-medium ${isSelected ? 'text-violet-300' : 'text-gray-200'}`}>
                        {motif.name}
                      </h4>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Key: {motif.originalKey} • {motif.originalBpm} BPM • {motif.notes.length} notes
                      </p>
                    </div>
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteMotif(motif.id);
                    }}
                    className="h-8 w-8 text-gray-500 hover:text-red-400 hover:bg-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}
