'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { useMusicStore } from '@/stores/musicStore';
import { Download, FileAudio, FileMusic } from 'lucide-react';

export function ExportPanel() {
  const { currentTrack, exportWav, exportMidi } = useMusicStore();
  
  if (!currentTrack) {
    return null;
  }
  
  return (
    <div className="p-4 bg-[#16162a] rounded-xl border border-[#2a2a4e]">
      <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">
        Export
      </h3>
      
      <div className="grid grid-cols-2 gap-3">
        <Button
          variant="outline"
          onClick={exportWav}
          className="h-12 border-[#2a2a4e] hover:bg-[#2a2a4e] hover:border-violet-500"
        >
          <FileAudio className="mr-2 h-4 w-4 text-blue-400" />
          WAV
        </Button>
        
        <Button
          variant="outline"
          onClick={exportMidi}
          className="h-12 border-[#2a2a4e] hover:bg-[#2a2a4e] hover:border-violet-500"
        >
          <FileMusic className="mr-2 h-4 w-4 text-green-400" />
          MIDI
        </Button>
      </div>
      
      <p className="mt-3 text-xs text-gray-500 text-center">
        WAV: 44.1kHz, 16-bit stereo • MIDI: Type 1, 480 PPQ
      </p>
    </div>
  );
}
