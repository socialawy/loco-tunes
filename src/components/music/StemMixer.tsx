'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { useMusicStore } from '@/stores/musicStore';
import type { StemType } from '@/types/music';
import { STEM_COLORS } from '@/types/music';
import { Volume2, VolumeX, RefreshCw, Headphones } from 'lucide-react';

const STEM_LABELS: Record<StemType, string> = {
  drums: 'Drums',
  bass: 'Bass',
  melody: 'Melody',
  harmony: 'Harmony',
};

const STEM_ICONS: Record<StemType, string> = {
  drums: '🥁',
  bass: '🎸',
  melody: '🎹',
  harmony: '🎵',
};

export function StemMixer() {
  const { 
    currentTrack, 
    setStemVolume, 
    toggleStemMute, 
    toggleStemSolo,
    regenerateStem,
    isGenerating,
  } = useMusicStore();
  
  if (!currentTrack) {
    return (
      <div className="p-6 bg-[#16162a] rounded-xl border border-[#2a2a4e]">
        <p className="text-gray-500 text-center">
          Generate a track to see stem controls
        </p>
      </div>
    );
  }
  
  const hasSolo = currentTrack.stems.some(s => s.solo);
  
  return (
    <div className="p-6 bg-[#16162a] rounded-xl border border-[#2a2a4e]">
      <h3 className="text-lg font-semibold text-white mb-4">Stem Mixer</h3>
      
      <div className="space-y-4">
        {currentTrack.stems.map((stem) => {
          const isAudible = !stem.muted && (!hasSolo || stem.solo);
          
          return (
            <div
              key={stem.type}
              className={`
                p-4 rounded-lg border transition-all
                ${stem.muted 
                  ? 'bg-[#1a1a2e]/50 border-[#2a2a4e]/50 opacity-60' 
                  : 'bg-[#1a1a2e] border-[#2a2a4e]'
                }
              `}
              style={{
                borderLeftColor: STEM_COLORS[stem.type],
                borderLeftWidth: '4px',
              }}
            >
              {/* Stem Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{STEM_ICONS[stem.type]}</span>
                  <span className="font-medium text-white">
                    {STEM_LABELS[stem.type]}
                  </span>
                </div>
                
                {/* Control Buttons */}
                <div className="flex items-center gap-1">
                  {/* Regenerate Button */}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => regenerateStem(stem.type)}
                    disabled={isGenerating}
                    className="h-8 w-8 text-gray-400 hover:text-white hover:bg-[#2a2a4e]"
                    title="Regenerate stem"
                  >
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                  
                  {/* Solo Button */}
                  <Button
                    variant={stem.solo ? 'default' : 'ghost'}
                    size="icon"
                    onClick={() => toggleStemSolo(stem.type)}
                    className={`
                      h-8 w-8 
                      ${stem.solo 
                        ? 'bg-yellow-500 hover:bg-yellow-600 text-black' 
                        : 'text-gray-400 hover:text-white hover:bg-[#2a2a4e]'
                      }
                    `}
                    title="Solo"
                  >
                    <Headphones className="h-4 w-4" />
                  </Button>
                  
                  {/* Mute Button */}
                  <Button
                    variant={stem.muted ? 'destructive' : 'ghost'}
                    size="icon"
                    onClick={() => toggleStemMute(stem.type)}
                    className={`
                      h-8 w-8 
                      ${stem.muted 
                        ? 'bg-red-500 hover:bg-red-600' 
                        : 'text-gray-400 hover:text-white hover:bg-[#2a2a4e]'
                      }
                    `}
                    title="Mute"
                  >
                    {stem.muted ? (
                      <VolumeX className="h-4 w-4" />
                    ) : (
                      <Volume2 className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
              
              {/* Volume Slider */}
              <div className="flex items-center gap-3">
                <div className="w-4 text-right text-xs text-gray-500">
                  {Math.round(stem.volume * 100)}
                </div>
                <Slider
                  value={[stem.volume * 100]}
                  onValueChange={([value]) => setStemVolume(stem.type, value / 100)}
                  max={100}
                  step={1}
                  disabled={stem.muted}
                  className="flex-1"
                  style={{
                    // @ts-ignore
                    '--slider-color': STEM_COLORS[stem.type],
                  }}
                />
              </div>
              
              {/* Mini waveform visualization */}
              {stem.audioBuffer && (
                <div className="mt-2 h-6 bg-[#16162a] rounded overflow-hidden">
                  <MiniWaveform buffer={stem.audioBuffer} color={STEM_COLORS[stem.type]} />
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      {/* Master Controls */}
      <div className="mt-6 pt-4 border-t border-[#2a2a4e]">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-400">Total Stems</span>
          <span className="text-sm text-white">
            {currentTrack.stems.filter(s => s.audioBuffer).length} / 4 active
          </span>
        </div>
      </div>
    </div>
  );
}

// Mini waveform component
function MiniWaveform({ buffer, color }: { buffer: AudioBuffer; color: string }) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  
  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * 2;
    canvas.height = rect.height * 2;
    ctx.scale(2, 2);
    
    ctx.fillStyle = 'transparent';
    ctx.fillRect(0, 0, rect.width, rect.height);
    
    const data = buffer.getChannelData(0);
    const step = Math.ceil(data.length / rect.width);
    
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 1;
    
    for (let i = 0; i < rect.width; i++) {
      const dataIndex = i * step;
      const value = data[dataIndex] || 0;
      const y = rect.height / 2 + value * (rect.height / 2) * 0.9;
      
      if (i === 0) {
        ctx.moveTo(i, y);
      } else {
        ctx.lineTo(i, y);
      }
    }
    
    ctx.stroke();
  }, [buffer, color]);
  
  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ display: 'block' }}
    />
  );
}
