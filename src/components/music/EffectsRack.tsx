'use client';

import React from 'react';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { useMusicStore } from '@/stores/musicStore';
import { Wand2, Volume2, Sliders } from 'lucide-react';

export function EffectsRack() {
  const { effects, setEffects, currentTrack } = useMusicStore();
  
  if (!currentTrack) {
    return null;
  }
  
  return (
    <div className="p-4 bg-[#16162a] rounded-xl border border-[#2a2a4e]">
      <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-4 flex items-center gap-2">
        <Wand2 className="h-4 w-4" />
        Effects Rack
      </h3>
      
      <div className="space-y-6">
        {/* Reverb */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-white flex items-center gap-2">
              <span className="text-xs text-gray-500">1</span>
              Reverb
            </Label>
            <Switch
              checked={effects.reverb.enabled}
              onCheckedChange={(checked) => 
                setEffects({ reverb: { ...effects.reverb, enabled: checked } })
              }
            />
          </div>
          
          {effects.reverb.enabled && (
            <div className="pl-4 space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-500 w-12">Mix</span>
                <Slider
                  value={[effects.reverb.mix * 100]}
                  onValueChange={([value]) => 
                    setEffects({ reverb: { ...effects.reverb, mix: value / 100 } })
                  }
                  max={100}
                  className="flex-1"
                />
                <span className="text-xs text-gray-400 w-8">
                  {Math.round(effects.reverb.mix * 100)}%
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-500 w-12">Decay</span>
                <Slider
                  value={[effects.reverb.decay * 10]}
                  onValueChange={([value]) => 
                    setEffects({ reverb: { ...effects.reverb, decay: value / 10 } })
                  }
                  min={1}
                  max={50}
                  className="flex-1"
                />
                <span className="text-xs text-gray-400 w-8">
                  {effects.reverb.decay.toFixed(1)}s
                </span>
              </div>
            </div>
          )}
        </div>
        
        {/* EQ */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-white flex items-center gap-2">
              <span className="text-xs text-gray-500">2</span>
              EQ (3-Band)
            </Label>
            <Switch
              checked={effects.eq.enabled}
              onCheckedChange={(checked) => 
                setEffects({ eq: { ...effects.eq, enabled: checked } })
              }
            />
          </div>
          
          {effects.eq.enabled && (
            <div className="pl-4 space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-500 w-12">Low</span>
                <Slider
                  value={[effects.eq.low + 12]}
                  onValueChange={([value]) => 
                    setEffects({ eq: { ...effects.eq, low: value - 12 } })
                  }
                  min={0}
                  max={24}
                  className="flex-1"
                />
                <span className="text-xs text-gray-400 w-8">
                  {effects.eq.low > 0 ? '+' : ''}{effects.eq.low}dB
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-500 w-12">Mid</span>
                <Slider
                  value={[effects.eq.mid + 12]}
                  onValueChange={([value]) => 
                    setEffects({ eq: { ...effects.eq, mid: value - 12 } })
                  }
                  min={0}
                  max={24}
                  className="flex-1"
                />
                <span className="text-xs text-gray-400 w-8">
                  {effects.eq.mid > 0 ? '+' : ''}{effects.eq.mid}dB
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-500 w-12">High</span>
                <Slider
                  value={[effects.eq.high + 12]}
                  onValueChange={([value]) => 
                    setEffects({ eq: { ...effects.eq, high: value - 12 } })
                  }
                  min={0}
                  max={24}
                  className="flex-1"
                />
                <span className="text-xs text-gray-400 w-8">
                  {effects.eq.high > 0 ? '+' : ''}{effects.eq.high}dB
                </span>
              </div>
            </div>
          )}
        </div>
        
        {/* Compressor */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-white flex items-center gap-2">
              <span className="text-xs text-gray-500">3</span>
              Compressor
            </Label>
            <Switch
              checked={effects.compressor.enabled}
              onCheckedChange={(checked) => 
                setEffects({ compressor: { ...effects.compressor, enabled: checked } })
              }
            />
          </div>
          
          {effects.compressor.enabled && (
            <div className="pl-4 space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-500 w-16">Threshold</span>
                <Slider
                  value={[effects.compressor.threshold * -1]}
                  onValueChange={([value]) => 
                    setEffects({ compressor: { ...effects.compressor, threshold: -value } })
                  }
                  min={0}
                  max={60}
                  className="flex-1"
                />
                <span className="text-xs text-gray-400 w-8">
                  {effects.compressor.threshold}dB
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-500 w-16">Ratio</span>
                <Slider
                  value={[effects.compressor.ratio]}
                  onValueChange={([value]) => 
                    setEffects({ compressor: { ...effects.compressor, ratio: value } })
                  }
                  min={1}
                  max={20}
                  className="flex-1"
                />
                <span className="text-xs text-gray-400 w-8">
                  {effects.compressor.ratio}:1
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
