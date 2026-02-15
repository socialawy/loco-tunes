'use client';

import React, { useSyncExternalStore } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useMusicStore } from '@/stores/musicStore';
import {
  SimpleMode,
  AdvancedMode,
  TransportControls,
  Waveform,
  StemMixer,
  EffectsRack,
  ExportPanel,
  HardwareSettings,
} from '@/components/music';
import { Music, Settings2, Layers, Sparkles } from 'lucide-react';

// Simple mounted check without useEffect
const emptySubscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

export default function LocoTunesPage() {
  const { mode, setMode, currentTrack } = useMusicStore();
  const mounted = useSyncExternalStore(emptySubscribe, getSnapshot, getServerSnapshot);
  
  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#0a0a14] flex items-center justify-center">
        <div className="animate-pulse text-violet-400">Loading...</div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-[#0a0a14] text-white">
      {/* Header */}
      <header className="border-b border-[#1a1a2e] bg-[#0d0d1a]/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/25">
                <Music className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
                  Loco-Tunes
                </h1>
                <p className="text-xs text-gray-500">Music Generator</p>
              </div>
            </div>
            
            {/* Mode Switcher */}
            <div className="flex items-center gap-2">
              <Button
                variant={mode === 'simple' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setMode('simple')}
                className={mode === 'simple' 
                  ? 'bg-violet-500 hover:bg-violet-600' 
                  : 'text-gray-400 hover:text-white'
                }
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Simple
              </Button>
              <Button
                variant={mode === 'advanced' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setMode('advanced')}
                className={mode === 'advanced' 
                  ? 'bg-violet-500 hover:bg-violet-600' 
                  : 'text-gray-400 hover:text-white'
                }
              >
                <Layers className="h-4 w-4 mr-2" />
                Advanced
              </Button>
            </div>
            
            {/* Status */}
            <div className="flex items-center gap-3">
              {currentTrack && (
                <Badge variant="outline" className="border-violet-500 text-violet-400">
                  {currentTrack.params.genre} • {currentTrack.params.bpm} BPM
                </Badge>
              )}
            </div>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Panel - Controls */}
          <div className="lg:col-span-4 space-y-6">
            {/* Generation Controls */}
            <SimpleMode />
            
            {/* Export Panel */}
            <ExportPanel />
          </div>
          
          {/* Center/Right Panel - Visualization & Mixer */}
          <div className="lg:col-span-8 space-y-6">
            {/* Waveform & Transport */}
            <div className="space-y-4">
              <Waveform />
              <TransportControls />
            </div>
            
            {/* Advanced Mode (Timeline) or Stem Mixer */}
            {mode === 'advanced' ? (
              <Tabs defaultValue="timeline" className="w-full">
                <TabsList className="bg-[#1a1a2e] border border-[#2a2a4e]">
                  <TabsTrigger 
                    value="timeline"
                    className="data-[state=active]:bg-violet-500 data-[state=active]:text-white"
                  >
                    Timeline
                  </TabsTrigger>
                  <TabsTrigger 
                    value="mixer"
                    className="data-[state=active]:bg-violet-500 data-[state=active]:text-white"
                  >
                    Mixer
                  </TabsTrigger>
                  <TabsTrigger 
                    value="effects"
                    className="data-[state=active]:bg-violet-500 data-[state=active]:text-white"
                  >
                    Effects
                  </TabsTrigger>
                  <TabsTrigger 
                    value="hardware"
                    className="data-[state=active]:bg-violet-500 data-[state=active]:text-white"
                  >
                    <Settings2 className="h-4 w-4 mr-2" />
                    Hardware
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="timeline" className="mt-4">
                  <AdvancedMode />
                </TabsContent>
                
                <TabsContent value="mixer" className="mt-4">
                  <StemMixer />
                </TabsContent>
                
                <TabsContent value="effects" className="mt-4">
                  <EffectsRack />
                </TabsContent>
                
                <TabsContent value="hardware" className="mt-4">
                  <HardwareSettings />
                </TabsContent>
              </Tabs>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <StemMixer />
                <EffectsRack />
              </div>
            )}
          </div>
        </div>
        
        {/* Features Section (shown when no track) */}
        {!currentTrack && (
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard
              icon={<Sparkles className="h-6 w-6" />}
              title="Algorithms-Powered Generation"
              description="Generate unique music with procedural algorithms. Multiple genres and moods available."
            />
            <FeatureCard
              icon={<Layers className="h-6 w-6" />}
              title="4-Stem Output"
              description="Drums, Bass, Melody, and Harmony stems that can be mixed and customized independently."
            />
            <FeatureCard
              icon={<Music className="h-6 w-6" />}
              title="Export Ready"
              description="Export your tracks as high-quality WAV files or MIDI for further production."
            />
          </div>
        )}
      </main>
      
      {/* Footer */}
      <footer className="border-t border-[#1a1a2e] mt-12 py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Music className="h-4 w-4" />
              <span>Loco-Tunes • Offline-First Music Generator</span>
            </div>
            <div className="flex items-center gap-4">
              <span>Web Audio API • Procedural Synthesis</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Feature Card Component
function FeatureCard({ 
  icon, 
  title, 
  description 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
}) {
  return (
    <div className="p-6 bg-[#16162a] rounded-xl border border-[#2a2a4e] hover:border-violet-500/50 transition-colors">
      <div className="w-12 h-12 rounded-lg bg-violet-500/10 flex items-center justify-center text-violet-400 mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-400 text-sm">{description}</p>
    </div>
  );
}
