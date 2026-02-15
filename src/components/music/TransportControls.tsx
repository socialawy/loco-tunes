'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { useMusicStore } from '@/stores/musicStore';
import { Play, Pause, Square, SkipBack, SkipForward } from 'lucide-react';

export function TransportControls() {
  const { 
    isPlaying, 
    currentTrack, 
    playTrack, 
    pauseTrack, 
    stopTrack,
    currentTime,
    updateCurrentTime,
  } = useMusicStore();
  
  const handlePlayPause = () => {
    if (isPlaying) {
      pauseTrack();
    } else {
      playTrack();
    }
  };
  
  const handleStop = () => {
    stopTrack();
  };
  
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  
  const duration = currentTrack?.duration || 0;
  
  return (
    <div className="flex items-center gap-4 p-4 bg-[#1a1a2e] rounded-lg border border-[#2a2a4e]">
      {/* Stop Button */}
      <Button
        variant="outline"
        size="icon"
        onClick={handleStop}
        disabled={!currentTrack}
        className="h-12 w-12 rounded-full border-[#3a3a5e] hover:bg-[#2a2a4e] hover:border-[#4a4a7e]"
      >
        <Square className="h-5 w-5" />
      </Button>
      
      {/* Play/Pause Button */}
      <Button
        variant="default"
        size="icon"
        onClick={handlePlayPause}
        disabled={!currentTrack}
        className="h-14 w-14 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 shadow-lg shadow-purple-500/25"
      >
        {isPlaying ? (
          <Pause className="h-6 w-6" />
        ) : (
          <Play className="h-6 w-6 ml-1" />
        )}
      </Button>
      
      {/* Time Display */}
      <div className="flex items-center gap-2 ml-4">
        <span className="text-lg font-mono text-gray-300">
          {formatTime(currentTime)}
        </span>
        <span className="text-gray-500">/</span>
        <span className="text-lg font-mono text-gray-500">
          {formatTime(duration)}
        </span>
      </div>
      
      {/* Progress Bar */}
      <div className="flex-1 mx-4">
        <div className="h-2 bg-[#2a2a4e] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-violet-500 to-purple-500 transition-all duration-100"
            style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
          />
        </div>
      </div>
      
      {/* BPM Display */}
      {currentTrack && (
        <div className="flex items-center gap-2 px-4 py-2 bg-[#2a2a4e] rounded-lg">
          <span className="text-xs text-gray-400 uppercase tracking-wide">BPM</span>
          <span className="text-lg font-bold text-violet-400">
            {currentTrack.params.bpm}
          </span>
        </div>
      )}
    </div>
  );
}
