'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { useMusicStore } from '@/stores/musicStore';
import { Trash2, Music, CheckCircle2 } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

export function MotifLibrary() {
  const {
    savedMotifs,
    useSavedMotif,
    setUseSavedMotif,
    selectedMotifId,
    setSelectedMotifId,
    deleteMotif
  } = useMusicStore();

  if (savedMotifs.length === 0) {
    return (
      <div className="p-6 bg-[#16162a] rounded-xl border border-[#2a2a4e]">
        <h3 className="text-lg font-semibold text-white mb-4">Motif Library</h3>
        <p className="text-sm text-gray-500">
          No motifs saved yet. Generate a track and save a melody to use it as a motif.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-[#16162a] rounded-xl border border-[#2a2a4e]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Motif Library</h3>
        <div className="flex items-center space-x-2">
          <Switch
            id="use-motif"
            checked={useSavedMotif}
            onCheckedChange={setUseSavedMotif}
          />
          <Label htmlFor="use-motif" className="text-sm text-white">
            Use Saved Motif
          </Label>
        </div>
      </div>

      <div className="space-y-3 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
        {savedMotifs.map((motif) => (
          <div
            key={motif.id}
            className={`
              flex items-center justify-between p-3 rounded-lg border transition-all cursor-pointer
              ${selectedMotifId === motif.id
                ? 'bg-[#2a2a4e] border-[#3b82f6]'
                : 'bg-[#1a1a2e] border-[#2a2a4e] hover:border-[#3b82f6]/50'
              }
            `}
            onClick={() => setSelectedMotifId(motif.id)}
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-full ${selectedMotifId === motif.id ? 'bg-[#3b82f6]/20' : 'bg-gray-800'}`}>
                {selectedMotifId === motif.id ? (
                  <CheckCircle2 className="h-4 w-4 text-[#3b82f6]" />
                ) : (
                  <Music className="h-4 w-4 text-gray-400" />
                )}
              </div>
              <div>
                <h4 className="text-sm font-medium text-white">{motif.name}</h4>
                <p className="text-xs text-gray-400">
                  {new Date(motif.createdAt).toLocaleDateString()} • {Math.round(motif.originalBpm)} BPM
                </p>
              </div>
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-gray-500 hover:text-red-400 hover:bg-red-400/10"
              onClick={(e) => {
                e.stopPropagation();
                deleteMotif(motif.id);
              }}
              title="Delete Motif"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
