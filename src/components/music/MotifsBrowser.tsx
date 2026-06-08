'use client';

import React, { useEffect } from 'react';
import { useMusicStore } from '@/stores/musicStore';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Trash2, Save } from 'lucide-react';
import { toast } from 'sonner';

export function MotifsBrowser() {
  const {
    motifs,
    fetchMotifs,
    deleteMotif,
    selectedMotifId,
    setSelectedMotif
  } = useMusicStore();

  useEffect(() => {
    fetchMotifs();
  }, [fetchMotifs]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <h2 className="text-2xl font-bold">Saved Motifs</h2>
      </div>

      {motifs.length === 0 ? (
        <Card className="p-8 text-center bg-[#16162a] border-[#2a2a4e]">
          <p className="text-gray-400">No saved motifs found. Generate a track and save a melody stem as a motif!</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {motifs.map((motif) => (
            <Card
              key={motif.id}
              className={`p-4 bg-[#16162a] border-[#2a2a4e] transition-colors ${
                selectedMotifId === motif.id ? 'ring-2 ring-violet-500' : 'hover:border-violet-500/50'
              }`}
            >
              <div className="flex flex-col h-full justify-between gap-4">
                <div>
                  <h3 className="font-semibold text-lg truncate" title={motif.name}>
                    {motif.name}
                  </h3>
                  <p className="text-sm text-gray-400 mt-1">
                    Original: {motif.originalKey} {motif.originalScale} • {motif.originalBpm} BPM
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    {motif.notes.length} notes
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant={selectedMotifId === motif.id ? "default" : "secondary"}
                    size="sm"
                    className="flex-1"
                    onClick={() => setSelectedMotif(selectedMotifId === motif.id ? null : motif.id)}
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {selectedMotifId === motif.id ? 'Selected' : 'Select Motif'}
                  </Button>

                  <Button
                    variant="outline"
                    size="icon"
                    className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                    title="Delete Motif"
                    onClick={() => {
                      if (confirm('Are you sure you want to delete this motif?')) {
                        deleteMotif(motif.id);
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
