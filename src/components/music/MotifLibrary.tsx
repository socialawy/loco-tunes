'use client';

import React, { useEffect } from 'react';
import { useMusicStore } from '@/stores/musicStore';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Trash2, Bookmark, Check } from 'lucide-react';
import { toast } from 'sonner';

export function MotifLibrary() {
  const {
    savedMotifs,
    loadMotifs,
    deleteMotif,
    useMotifId,
    setUseMotifId,
  } = useMusicStore();

  useEffect(() => {
    loadMotifs();
  }, [loadMotifs]);

  const handleToggleMotif = (id: string) => {
    if (useMotifId === id) {
      setUseMotifId(undefined);
      toast.info('Motif deselected for next generation');
    } else {
      setUseMotifId(id);
      toast.success('Motif selected for next generation');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-white mb-2">Saved Motifs</h3>
          <p className="text-gray-400 text-sm">
            Remembered melodies that can be used as seeds for new track generations.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {savedMotifs.length === 0 ? (
          <div className="col-span-full p-8 text-center bg-[#16162a] rounded-xl border border-[#2a2a4e]">
            <Bookmark className="h-12 w-12 text-gray-600 mx-auto mb-3" />
            <p className="text-gray-400">No motifs saved yet.</p>
            <p className="text-sm text-gray-500 mt-1">
              Generate a track and click the Bookmark icon on the Melody stem in the Mixer.
            </p>
          </div>
        ) : (
          savedMotifs.map((motif) => {
            const isSelected = useMotifId === motif.id;

            return (
              <Card
                key={motif.id}
                className={`p-4 bg-[#16162a] border transition-all ${
                  isSelected ? 'border-violet-500 shadow-lg shadow-violet-500/20' : 'border-[#2a2a4e] hover:border-[#3a3a6e]'
                }`}
              >
                <div className="flex flex-col h-full justify-between gap-4">
                  <div>
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-white truncate pr-4" title={motif.name}>
                        {motif.name}
                      </h4>
                      {isSelected && (
                        <span className="flex-shrink-0 bg-violet-500/20 text-violet-400 text-xs px-2 py-1 rounded-full flex items-center">
                          <Check className="h-3 w-3 mr-1" /> Active
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-gray-500 mb-2">
                      {new Date(motif.timestamp).toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-400">
                      {motif.notes.length} notes
                    </div>
                  </div>

                  <div className="flex gap-2 justify-end">
                    <Button
                      variant={isSelected ? 'default' : 'secondary'}
                      size="sm"
                      className={isSelected ? 'bg-violet-600 hover:bg-violet-700' : 'bg-[#2a2a4e] text-white hover:bg-[#3a3a6e]'}
                      onClick={() => handleToggleMotif(motif.id)}
                    >
                      {isSelected ? 'Deselect' : 'Use for Next Gen'}
                    </Button>

                    <Button
                      variant="destructive"
                      size="icon"
                      className="h-9 w-9 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white"
                      onClick={() => deleteMotif(motif.id)}
                      title="Delete motif"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}
