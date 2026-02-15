'use client';

import React, { useRef, useEffect } from 'react';
import { useMusicStore } from '@/stores/musicStore';
import { STEM_COLORS } from '@/types/music';

export function Waveform() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { currentTrack, currentTime, isPlaying } = useMusicStore();
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !currentTrack) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    
    // Clear canvas
    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(0, 0, rect.width, rect.height);
    
    // Draw grid lines
    ctx.strokeStyle = '#2a2a4e';
    ctx.lineWidth = 1;
    for (let i = 0; i < 4; i++) {
      const y = (rect.height / 4) * i;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(rect.width, y);
      ctx.stroke();
    }
    
    // Mix all stems for waveform display
    const stemsWithBuffers = currentTrack.stems.filter(s => s.audioBuffer);
    if (stemsWithBuffers.length === 0) return;
    
    // Get the longest buffer for display
    const longestBuffer = stemsWithBuffers.reduce((longest, stem) => {
      if (!stem.audioBuffer) return longest;
      if (!longest || stem.audioBuffer.length > longest.length) return stem.audioBuffer;
      return longest;
    }, null as AudioBuffer | null);
    
    if (!longestBuffer) return;
    
    const data = longestBuffer.getChannelData(0);
    const step = Math.ceil(data.length / rect.width);
    
    // Draw each stem's waveform with different colors
    const hasSolo = currentTrack.stems.some(s => s.solo);
    
    currentTrack.stems.forEach((stem, index) => {
      if (!stem.audioBuffer) return;
      if (stem.muted) return;
      if (hasSolo && !stem.solo) return;
      
      const stemData = stem.audioBuffer.getChannelData(0);
      const stemStep = Math.ceil(stemData.length / rect.width);
      
      ctx.beginPath();
      ctx.strokeStyle = STEM_COLORS[stem.type] + '80';
      ctx.lineWidth = 1;
      
      for (let i = 0; i < rect.width; i++) {
        const dataIndex = i * stemStep;
        const value = stemData[dataIndex] || 0;
        const y = rect.height / 2 + value * (rect.height / 2) * 0.8;
        
        if (i === 0) {
          ctx.moveTo(i, y);
        } else {
          ctx.lineTo(i, y);
        }
      }
      ctx.stroke();
    });
    
    // Draw combined waveform fill
    ctx.beginPath();
    ctx.strokeStyle = '#8b5cf6';
    ctx.lineWidth = 2;
    
    for (let i = 0; i < rect.width; i++) {
      const dataIndex = i * step;
      const value = data[dataIndex] || 0;
      const y = rect.height / 2 + value * (rect.height / 2) * 0.8;
      
      if (i === 0) {
        ctx.moveTo(i, y);
      } else {
        ctx.lineTo(i, y);
      }
    }
    ctx.stroke();
    
    // Draw fill under waveform
    ctx.lineTo(rect.width, rect.height / 2);
    ctx.lineTo(0, rect.height / 2);
    ctx.closePath();
    ctx.fillStyle = 'rgba(139, 92, 246, 0.1)';
    ctx.fill();
    
    // Draw progress line
    if (currentTrack.duration > 0) {
      const progress = currentTime / currentTrack.duration;
      const progressX = progress * rect.width;
      
      // Progress fill (left side)
      ctx.fillStyle = 'rgba(34, 197, 94, 0.1)';
      ctx.fillRect(0, 0, progressX, rect.height);
      
      // Progress line
      ctx.strokeStyle = '#22c55e';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(progressX, 0);
      ctx.lineTo(progressX, rect.height);
      ctx.stroke();
      
      // Playhead triangle at top
      ctx.fillStyle = '#22c55e';
      ctx.beginPath();
      ctx.moveTo(progressX - 6, 0);
      ctx.lineTo(progressX + 6, 0);
      ctx.lineTo(progressX, 8);
      ctx.closePath();
      ctx.fill();
    }
    
  }, [currentTrack, currentTrack?.stems, currentTime, isPlaying]);
  
  return (
    <div className="w-full h-32 bg-[#1a1a2e] rounded-lg overflow-hidden border border-[#2a2a4e] relative">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ display: 'block' }}
      />
      
      {/* Time markers */}
      {currentTrack && (
        <div className="absolute bottom-1 left-2 right-2 flex justify-between text-xs text-gray-600">
          <span>0:00</span>
          <span>{formatTime(currentTrack.duration)}</span>
        </div>
      )}
    </div>
  );
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}
