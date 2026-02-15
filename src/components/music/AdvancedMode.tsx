'use client';

import React, { useRef, useEffect, useState } from 'react';
import { useMusicStore } from '@/stores/musicStore';
import type { StemType } from '@/types/music';
import { STEM_COLORS } from '@/types/music';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';

const STEM_LABELS: Record<StemType, string> = {
  drums: 'Drums',
  bass: 'Bass',
  melody: 'Melody',
  harmony: 'Harmony',
};

export function AdvancedMode() {
  const { currentTrack, currentTime, isPlaying } = useMusicStore();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(1);
  const [scrollOffset, setScrollOffset] = useState(0);
  
  // Redraw on state changes
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container || !currentTrack) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const dpr = window.devicePixelRatio || 1;
    const width = container.clientWidth;
    const height = container.clientHeight;
    
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(dpr, dpr);
    
    // Clear
    ctx.fillStyle = '#0d0d1a';
    ctx.fillRect(0, 0, width, height);
    
    const trackHeight = height / 4;
    const pixelsPerSecond = 50 * zoom;
    const totalWidth = currentTrack.duration * pixelsPerSecond;
    
    // Draw grid
    ctx.strokeStyle = '#1a1a2e';
    ctx.lineWidth = 1;
    
    // Time grid (every beat)
    const beatDuration = 60 / currentTrack.params.bpm;
    const numBeats = Math.ceil(currentTrack.duration / beatDuration);
    
    for (let beat = 0; beat <= numBeats; beat++) {
      const x = beat * beatDuration * pixelsPerSecond - scrollOffset;
      if (x < 0 || x > width) continue;
      
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
      
      // Beat numbers
      if (beat % 4 === 0) {
        ctx.fillStyle = '#4a4a6e';
        ctx.font = '10px monospace';
        ctx.fillText(`${Math.floor(beat / 4) + 1}`, x + 4, 12);
      }
    }
    
    // Draw each stem lane
    currentTrack.stems.forEach((stem, index) => {
      const y = index * trackHeight;
      
      // Lane background
      ctx.fillStyle = index % 2 === 0 ? '#12122a' : '#161630';
      ctx.fillRect(0, y, width, trackHeight);
      
      // Lane label
      ctx.fillStyle = STEM_COLORS[stem.type];
      ctx.font = 'bold 12px sans-serif';
      ctx.fillText(STEM_LABELS[stem.type], 8, y + 20);
      
      // Draw notes
      ctx.fillStyle = STEM_COLORS[stem.type] + '80';
      
      for (const note of stem.notes) {
        const noteX = note.startTime * pixelsPerSecond - scrollOffset;
        const noteWidth = note.duration * pixelsPerSecond;
        
        if (noteX + noteWidth < 0 || noteX > width) continue;
        
        const noteY = y + 10 + ((127 - note.pitch) % 40) * 1.5;
        const noteHeight = 8;
        
        ctx.fillRect(noteX, noteY, noteWidth - 1, noteHeight);
        
        // Note border for visibility
        ctx.strokeStyle = STEM_COLORS[stem.type];
        ctx.lineWidth = 1;
        ctx.strokeRect(noteX, noteY, noteWidth - 1, noteHeight);
      }
    });
    
    // Draw playhead
    const playheadX = currentTime * pixelsPerSecond - scrollOffset;
    if (playheadX >= 0 && playheadX <= width) {
      ctx.strokeStyle = '#22c55e';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(playheadX, 0);
      ctx.lineTo(playheadX, height);
      ctx.stroke();
    }
    
  }, [currentTrack, currentTime, zoom, scrollOffset, isPlaying]);
  
  if (!currentTrack) {
    return (
      <div className="h-full flex items-center justify-center bg-[#0d0d1a] rounded-xl border border-[#2a2a4e]">
        <p className="text-gray-500">Generate a track to see timeline</p>
      </div>
    );
  }
  
  const pixelsPerSecond = 50 * zoom;
  const totalWidth = currentTrack.duration * pixelsPerSecond;
  
  return (
    <div className="space-y-2">
      {/* Timeline Controls */}
      <div className="flex items-center justify-between p-2 bg-[#16162a] rounded-lg border border-[#2a2a4e]">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setScrollOffset(Math.max(0, scrollOffset - 100))}
            className="h-8 w-8"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setScrollOffset(Math.min(totalWidth, scrollOffset + 100))}
            className="h-8 w-8"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <span>Zoom:</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setZoom(Math.max(0.5, zoom - 0.25))}
            className="h-8 w-8"
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          <span className="w-12 text-center">{zoom.toFixed(1)}x</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setZoom(Math.min(4, zoom + 0.25))}
            className="h-8 w-8"
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Timeline Canvas */}
      <div 
        ref={containerRef}
        className="h-64 overflow-hidden rounded-xl border border-[#2a2a4e]"
      >
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>
      
      {/* Time ruler */}
      <div className="flex justify-between text-xs text-gray-500 px-2">
        <span>0:00</span>
        <span>{formatTime(currentTrack.duration / 4)}</span>
        <span>{formatTime(currentTrack.duration / 2)}</span>
        <span>{formatTime((currentTrack.duration * 3) / 4)}</span>
        <span>{formatTime(currentTrack.duration)}</span>
      </div>
    </div>
  );
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}
