'use client';

import React, { useRef, useEffect } from 'react';
import { useMusicStore } from '@/stores/musicStore';

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
    
    // Draw waveforms for each stem
    const stemWithBuffer = currentTrack.stems.find(s => s.audioBuffer);
    if (!stemWithBuffer?.audioBuffer) return;
    
    const buffer = stemWithBuffer.audioBuffer;
    const data = buffer.getChannelData(0);
    const step = Math.ceil(data.length / rect.width);
    
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
    
    // Draw waveform
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
      
      ctx.strokeStyle = '#22c55e';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(progressX, 0);
      ctx.lineTo(progressX, rect.height);
      ctx.stroke();
    }
    
  }, [currentTrack, currentTime, isPlaying]);
  
  return (
    <div className="w-full h-32 bg-[#1a1a2e] rounded-lg overflow-hidden border border-[#2a2a4e]">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ display: 'block' }}
      />
    </div>
  );
}
