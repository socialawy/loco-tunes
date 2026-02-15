# Loco-Tunes Code Review

## Project Structure

This document contains all source code files from the `./src` directory for code review purposes.

**Generated on:** 2026-02-15T16:52:31.365Z
**Total files:** 71

---

## Table of Contents

- [app\api\route.ts](#app-api-route-ts)
- [app\globals.css](#app-globals-css)
- [app\layout.tsx](#app-layout-tsx)
- [app\page.tsx](#app-page-tsx)
- [components\music\AdvancedMode.tsx](#components-music-advancedmode-tsx)
- [components\music\EffectsRack.tsx](#components-music-effectsrack-tsx)
- [components\music\ExportPanel.tsx](#components-music-exportpanel-tsx)
- [components\music\index.ts](#components-music-index-ts)
- [components\music\SimpleMode.tsx](#components-music-simplemode-tsx)
- [components\music\StemMixer.tsx](#components-music-stemmixer-tsx)
- [components\music\TransportControls.tsx](#components-music-transportcontrols-tsx)
- [components\music\Waveform.tsx](#components-music-waveform-tsx)
- [components\ui\accordion.tsx](#components-ui-accordion-tsx)
- [components\ui\alert.tsx](#components-ui-alert-tsx)
- [components\ui\aspect-ratio.tsx](#components-ui-aspect-ratio-tsx)
- [components\ui\avatar.tsx](#components-ui-avatar-tsx)
- [components\ui\badge.tsx](#components-ui-badge-tsx)
- [components\ui\breadcrumb.tsx](#components-ui-breadcrumb-tsx)
- [components\ui\button.tsx](#components-ui-button-tsx)
- [components\ui\calendar.tsx](#components-ui-calendar-tsx)
- [components\ui\card.tsx](#components-ui-card-tsx)
- [components\ui\carousel.tsx](#components-ui-carousel-tsx)
- [components\ui\chart.tsx](#components-ui-chart-tsx)
- [components\ui\checkbox.tsx](#components-ui-checkbox-tsx)
- [components\ui\collapsible.tsx](#components-ui-collapsible-tsx)
- [components\ui\command.tsx](#components-ui-command-tsx)
- [components\ui\context-menu.tsx](#components-ui-context-menu-tsx)
- [components\ui\drawer.tsx](#components-ui-drawer-tsx)
- [components\ui\dropdown-menu.tsx](#components-ui-dropdown-menu-tsx)
- [components\ui\form.tsx](#components-ui-form-tsx)
- [components\ui\hover-card.tsx](#components-ui-hover-card-tsx)
- [components\ui\input-otp.tsx](#components-ui-input-otp-tsx)
- [components\ui\input.tsx](#components-ui-input-tsx)
- [components\ui\label.tsx](#components-ui-label-tsx)
- [components\ui\menubar.tsx](#components-ui-menubar-tsx)
- [components\ui\navigation-menu.tsx](#components-ui-navigation-menu-tsx)
- [components\ui\pagination.tsx](#components-ui-pagination-tsx)
- [components\ui\popover.tsx](#components-ui-popover-tsx)
- [components\ui\progress.tsx](#components-ui-progress-tsx)
- [components\ui\radio-group.tsx](#components-ui-radio-group-tsx)
- [components\ui\resizable.tsx](#components-ui-resizable-tsx)
- [components\ui\scroll-area.tsx](#components-ui-scroll-area-tsx)
- [components\ui\select.tsx](#components-ui-select-tsx)
- [components\ui\separator.tsx](#components-ui-separator-tsx)
- [components\ui\sheet.tsx](#components-ui-sheet-tsx)
- [components\ui\sidebar.tsx](#components-ui-sidebar-tsx)
- [components\ui\skeleton.tsx](#components-ui-skeleton-tsx)
- [components\ui\slider.tsx](#components-ui-slider-tsx)
- [components\ui\sonner.tsx](#components-ui-sonner-tsx)
- [components\ui\switch.tsx](#components-ui-switch-tsx)
- [components\ui\table.tsx](#components-ui-table-tsx)
- [components\ui\tabs.tsx](#components-ui-tabs-tsx)
- [components\ui\textarea.tsx](#components-ui-textarea-tsx)
- [components\ui\toast.tsx](#components-ui-toast-tsx)
- [components\ui\toaster.tsx](#components-ui-toaster-tsx)
- [components\ui\toggle-group.tsx](#components-ui-toggle-group-tsx)
- [components\ui\toggle.tsx](#components-ui-toggle-tsx)
- [components\ui\tooltip.tsx](#components-ui-tooltip-tsx)
- [hooks\use-mobile.ts](#hooks-use-mobile-ts)
- [hooks\use-toast.ts](#hooks-use-toast-ts)
- [lib\audio\chords.ts](#lib-audio-chords-ts)
- [lib\audio\drums.ts](#lib-audio-drums-ts)
- [lib\audio\effects.ts](#lib-audio-effects-ts)
- [lib\audio\engine.ts](#lib-audio-engine-ts)
- [lib\audio\export.ts](#lib-audio-export-ts)
- [lib\audio\generator.ts](#lib-audio-generator-ts)
- [lib\audio\melody.ts](#lib-audio-melody-ts)
- [lib\db.ts](#lib-db-ts)
- [lib\utils.ts](#lib-utils-ts)
- [stores\musicStore.ts](#stores-musicstore-ts)
- [types\music.ts](#types-music-ts)

---

## app\api\route.ts

```typescript
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "Hello, world!" });
}
```

---

## app\globals.css

```css
@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
  --color-sidebar-ring: var(--sidebar-ring);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar: var(--sidebar);
  --color-chart-5: var(--chart-5);
  --color-chart-4: var(--chart-4);
  --color-chart-3: var(--chart-3);
  --color-chart-2: var(--chart-2);
  --color-chart-1: var(--chart-1);
  --color-ring: var(--ring);
  --color-input: var(--input);
  --color-border: var(--border);
  --color-destructive: var(--destructive);
  --color-accent-foreground: var(--accent-foreground);
  --color-accent: var(--accent);
  --color-muted-foreground: var(--muted-foreground);
  --color-muted: var(--muted);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-secondary: var(--secondary);
  --color-primary-foreground: var(--primary-foreground);
  --color-primary: var(--primary);
  --color-popover-foreground: var(--popover-foreground);
  --color-popover: var(--popover);
  --color-card-foreground: var(--card-foreground);
  --color-card: var(--card);
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
}

:root {
  --radius: 0.625rem;
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.145 0 0);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
  --secondary: oklch(0.97 0 0);
  --secondary-foreground: oklch(0.205 0 0);
  --muted: oklch(0.97 0 0);
  --muted-foreground: oklch(0.556 0 0);
  --accent: oklch(0.97 0 0);
  --accent-foreground: oklch(0.205 0 0);
  --destructive: oklch(0.577 0.245 27.325);
  --border: oklch(0.922 0 0);
  --input: oklch(0.922 0 0);
  --ring: oklch(0.708 0 0);
  --chart-1: oklch(0.646 0.222 41.116);
  --chart-2: oklch(0.6 0.118 184.704);
  --chart-3: oklch(0.398 0.07 227.392);
  --chart-4: oklch(0.828 0.189 84.429);
  --chart-5: oklch(0.769 0.188 70.08);
  --sidebar: oklch(0.985 0 0);
  --sidebar-foreground: oklch(0.145 0 0);
  --sidebar-primary: oklch(0.205 0 0);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.97 0 0);
  --sidebar-accent-foreground: oklch(0.205 0 0);
  --sidebar-border: oklch(0.922 0 0);
  --sidebar-ring: oklch(0.708 0 0);
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --card: oklch(0.205 0 0);
  --card-foreground: oklch(0.985 0 0);
  --popover: oklch(0.205 0 0);
  --popover-foreground: oklch(0.985 0 0);
  --primary: oklch(0.922 0 0);
  --primary-foreground: oklch(0.205 0 0);
  --secondary: oklch(0.269 0 0);
  --secondary-foreground: oklch(0.985 0 0);
  --muted: oklch(0.269 0 0);
  --muted-foreground: oklch(0.708 0 0);
  --accent: oklch(0.269 0 0);
  --accent-foreground: oklch(0.985 0 0);
  --destructive: oklch(0.704 0.191 22.216);
  --border: oklch(1 0 0 / 10%);
  --input: oklch(1 0 0 / 15%);
  --ring: oklch(0.556 0 0);
  --chart-1: oklch(0.488 0.243 264.376);
  --chart-2: oklch(0.696 0.17 162.48);
  --chart-3: oklch(0.769 0.188 70.08);
  --chart-4: oklch(0.627 0.265 303.9);
  --chart-5: oklch(0.645 0.246 16.439);
  --sidebar: oklch(0.205 0 0);
  --sidebar-foreground: oklch(0.985 0 0);
  --sidebar-primary: oklch(0.488 0.243 264.376);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.269 0 0);
  --sidebar-accent-foreground: oklch(0.985 0 0);
  --sidebar-border: oklch(1 0 0 / 10%);
  --sidebar-ring: oklch(0.556 0 0);
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
}

```

---

## app\layout.tsx

```typescript
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Loco Tunes",
  description: "Modern Next.js scaffold optimized for AI-powered development with Z.ai. Built with TypeScript, Tailwind CSS, and shadcn/ui.",
  keywords: ["Music", "Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui", "React"],
  authors: [{ name: "Socialalwy" }],
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
  openGraph: {
    title: "Loco Tunes",
    description: "AI-powered development with modern React stack",
    url: "https://chat.z.ai",
    siteName: "Z.ai",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Loco Tunes",
    description: "Development with modern React stack",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}

```

---

## app\page.tsx

```typescript
'use client';

import React, { useState, useSyncExternalStore } from 'react';
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
} from '@/components/music';
import { Music, Settings2, Layers, Sparkles, Github } from 'lucide-react';

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
              title="AI-Powered Generation"
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

```

---

## components\music\AdvancedMode.tsx

```typescript
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

```

---

## components\music\EffectsRack.tsx

```typescript
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

```

---

## components\music\ExportPanel.tsx

```typescript
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

```

---

## components\music\index.ts

```typescript
// Music components barrel export

export { Waveform } from './Waveform';
export { TransportControls } from './TransportControls';
export { SimpleMode } from './SimpleMode';
export { AdvancedMode } from './AdvancedMode';
export { StemMixer } from './StemMixer';
export { EffectsRack } from './EffectsRack';
export { ExportPanel } from './ExportPanel';

```

---

## components\music\SimpleMode.tsx

```typescript
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useMusicStore } from '@/stores/musicStore';

import type { Genre, Mood } from '@/types/music';
import { Sparkles, Loader2 } from 'lucide-react';

const GENRES: Genre[] = ['electronic', 'hiphop', 'ambient', 'rock', 'jazz'];
const MOODS: Mood[] = ['happy', 'sad', 'energetic', 'calm', 'dark', 'uplifting'];
const KEYS = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const SCALES = ['major', 'minor', 'pentatonic', 'blues', 'dorian'] as const;

const GENRE_LABELS: Record<Genre, string> = {
  electronic: 'Electronic',
  hiphop: 'Hip-Hop',
  ambient: 'Ambient',
  rock: 'Rock',
  jazz: 'Jazz',
};

const MOOD_LABELS: Record<Mood, string> = {
  happy: 'Happy',
  sad: 'Sad',
  energetic: 'Energetic',
  calm: 'Calm',
  dark: 'Dark',
  uplifting: 'Uplifting',
};

const SCALE_LABELS: Record<string, string> = {
  major: 'Major',
  minor: 'Minor',
  pentatonic: 'Pentatonic',
  blues: 'Blues',
  dorian: 'Dorian',
};

const DURATION_OPTIONS = [
  { value: 15, label: '15 sec' },
  { value: 30, label: '30 sec' },
  { value: 45, label: '45 sec' },
  { value: 60, label: '60 sec' },
];

export function SimpleMode() {
  const { 
    params, 
    setParams, 
    generateTrack, 
    isGenerating, 
    generationProgress,
    hardwareTier,
    currentTrack,
  } = useMusicStore();
  
  const handleGenerate = () => {
    generateTrack();
  };
  
  return (
    <div className="space-y-6 p-6 bg-[#16162a] rounded-xl border border-[#2a2a4e]">
      {/* Prompt Input */}
      <div className="space-y-2">
        <Label htmlFor="prompt" className="text-gray-300">
          Describe your track (optional)
        </Label>
        <Input
          id="prompt"
          placeholder="e.g., 'Upbeat electronic dance track with punchy drums'"
          value={params.prompt}
          onChange={(e) => setParams({ prompt: e.target.value })}
          className="bg-[#1a1a2e] border-[#2a2a4e] text-white placeholder-gray-500 focus:border-violet-500"
        />
      </div>
      
      {/* Genre & Mood Row */}
      <div className="grid grid-cols-2 gap-4">
        {/* Genre */}
        <div className="space-y-2">
          <Label className="text-gray-300">Genre</Label>
          <Select
            value={params.genre}
            onValueChange={(value: Genre) => setParams({ genre: value })}
          >
            <SelectTrigger className="bg-[#1a1a2e] border-[#2a2a4e] text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[#1a1a2e] border-[#2a2a4e]">
              {GENRES.map((genre) => (
                <SelectItem
                  key={genre}
                  value={genre}
                  className="text-white hover:bg-[#2a2a4e] focus:bg-[#2a2a4e]"
                >
                  {GENRE_LABELS[genre]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {/* Mood */}
        <div className="space-y-2">
          <Label className="text-gray-300">Mood</Label>
          <Select
            value={params.mood}
            onValueChange={(value: Mood) => setParams({ mood: value })}
          >
            <SelectTrigger className="bg-[#1a1a2e] border-[#2a2a4e] text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[#1a1a2e] border-[#2a2a4e]">
              {MOODS.map((mood) => (
                <SelectItem
                  key={mood}
                  value={mood}
                  className="text-white hover:bg-[#2a2a4e] focus:bg-[#2a2a4e]"
                >
                  {MOOD_LABELS[mood]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* Key & Scale Row */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-gray-300">Key</Label>
          <Select
            value={params.key}
            onValueChange={(value) => setParams({ key: value })}
          >
            <SelectTrigger className="bg-[#1a1a2e] border-[#2a2a4e] text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[#1a1a2e] border-[#2a2a4e]">
              {KEYS.map((key) => (
                <SelectItem
                  key={key}
                  value={key}
                  className="text-white hover:bg-[#2a2a4e] focus:bg-[#2a2a4e]"
                >
                  {key}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label className="text-gray-300">Scale</Label>
          <Select
            value={params.scale}
            onValueChange={(value: typeof params.scale) => setParams({ scale: value })}
          >
            <SelectTrigger className="bg-[#1a1a2e] border-[#2a2a4e] text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[#1a1a2e] border-[#2a2a4e]">
              {SCALES.map((scale) => (
                <SelectItem
                  key={scale}
                  value={scale}
                  className="text-white hover:bg-[#2a2a4e] focus:bg-[#2a2a4e]"
                >
                  {SCALE_LABELS[scale]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* BPM Slider */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-gray-300">BPM</Label>
          <span className="text-2xl font-bold text-violet-400">{params.bpm}</span>
        </div>
        <Slider
          value={[params.bpm]}
          onValueChange={([value]) => setParams({ bpm: value })}
          min={60}
          max={180}
          step={1}
          className="[&_[role=slider]]:bg-violet-500 [&_[role=slider]]:border-violet-400"
        />
        <div className="flex justify-between text-xs text-gray-500">
          <span>60</span>
          <span>120</span>
          <span>180</span>
        </div>
      </div>
      
      {/* Duration */}
      <div className="space-y-2">
        <Label className="text-gray-300">Duration</Label>
        <div className="grid grid-cols-4 gap-2">
          {DURATION_OPTIONS.map((option) => {
            const isDisabled = option.value > hardwareTier.maxDuration;
            return (
              <Button
                key={option.value}
                variant={params.duration === option.value ? 'default' : 'outline'}
                size="sm"
                onClick={() => setParams({ duration: option.value })}
                disabled={isDisabled}
                className={`
                  ${params.duration === option.value 
                    ? 'bg-violet-500 hover:bg-violet-600' 
                    : 'border-[#2a2a4e] hover:bg-[#2a2a4e]'
                  }
                  ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}
                `}
              >
                {option.label}
              </Button>
            );
          })}
        </div>
        {hardwareTier.maxDuration < 60 && (
          <p className="text-xs text-gray-500 mt-1">
            Max duration limited to {hardwareTier.maxDuration}s on {hardwareTier.level} tier
          </p>
        )}
      </div>
      
      {/* Complexity Slider */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-gray-300">Complexity</Label>
          <span className="text-sm text-violet-400">
            {params.complexity < 0.33 ? 'Simple' : params.complexity < 0.66 ? 'Medium' : 'Complex'}
          </span>
        </div>
        <Slider
          value={[params.complexity * 100]}
          onValueChange={([value]) => setParams({ complexity: value / 100 })}
          min={0}
          max={100}
          step={1}
          className="[&_[role=slider]]:bg-violet-500 [&_[role=slider]]:border-violet-400"
        />
      </div>
      
      {/* Generate Button */}
      <Button
        onClick={handleGenerate}
        disabled={isGenerating}
        className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 hover:from-violet-600 hover:via-purple-600 hover:to-pink-600 shadow-lg shadow-purple-500/25"
      >
        {isGenerating ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Generating... {generationProgress}%
          </>
        ) : (
          <>
            <Sparkles className="mr-2 h-5 w-5" />
            Generate Track
          </>
        )}
      </Button>
      
      {/* Hardware Tier Info */}
      <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
        <span className={`w-2 h-2 rounded-full ${
          hardwareTier.level === 'pro' ? 'bg-green-500' :
          hardwareTier.level === 'standard' ? 'bg-yellow-500' : 'bg-orange-500'
        }`} />
        <span className="capitalize">{hardwareTier.level}</span>
        <span>•</span>
        <span>{hardwareTier.cores} cores</span>
        <span>•</span>
        <span>{hardwareTier.memory}GB RAM</span>
      </div>
    </div>
  );
}

```

---

## components\music\StemMixer.tsx

```typescript
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

```

---

## components\music\TransportControls.tsx

```typescript
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

```

---

## components\music\Waveform.tsx

```typescript
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

```

---

## components\ui\accordion.tsx

```typescript
"use client"

import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDownIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function Accordion({
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("border-b last:border-b-0", className)}
      {...props}
    />
  )
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180",
          className
        )}
        {...props}
      >
        {children}
        <ChevronDownIcon className="text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm"
      {...props}
    >
      <div className={cn("pt-0 pb-4", className)}>{children}</div>
    </AccordionPrimitive.Content>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }

```

---

## components\ui\alert.tsx

```typescript
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const alertVariants = cva(
  "relative w-full rounded-lg border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current",
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground",
        destructive:
          "text-destructive bg-card [&>svg]:text-current *:data-[slot=alert-description]:text-destructive/90",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Alert({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  )
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        "col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight",
        className
      )}
      {...props}
    />
  )
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        "text-muted-foreground col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed",
        className
      )}
      {...props}
    />
  )
}

export { Alert, AlertTitle, AlertDescription }

```

---

## components\ui\aspect-ratio.tsx

```typescript
"use client"

import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio"

function AspectRatio({
  ...props
}: React.ComponentProps<typeof AspectRatioPrimitive.Root>) {
  return <AspectRatioPrimitive.Root data-slot="aspect-ratio" {...props} />
}

export { AspectRatio }

```

---

## components\ui\avatar.tsx

```typescript
"use client"

import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"

import { cn } from "@/lib/utils"

function Avatar({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root>) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn(
        "relative flex size-8 shrink-0 overflow-hidden rounded-full",
        className
      )}
      {...props}
    />
  )
}

function AvatarImage({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn("aspect-square size-full", className)}
      {...props}
    />
  )
}

function AvatarFallback({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "bg-muted flex size-full items-center justify-center rounded-full",
        className
      )}
      {...props}
    />
  )
}

export { Avatar, AvatarImage, AvatarFallback }

```

---

## components\ui\badge.tsx

```typescript
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive:
          "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }

```

---

## components\ui\breadcrumb.tsx

```typescript
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { ChevronRight, MoreHorizontal } from "lucide-react"

import { cn } from "@/lib/utils"

function Breadcrumb({ ...props }: React.ComponentProps<"nav">) {
  return <nav aria-label="breadcrumb" data-slot="breadcrumb" {...props} />
}

function BreadcrumbList({ className, ...props }: React.ComponentProps<"ol">) {
  return (
    <ol
      data-slot="breadcrumb-list"
      className={cn(
        "text-muted-foreground flex flex-wrap items-center gap-1.5 text-sm break-words sm:gap-2.5",
        className
      )}
      {...props}
    />
  )
}

function BreadcrumbItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-item"
      className={cn("inline-flex items-center gap-1.5", className)}
      {...props}
    />
  )
}

function BreadcrumbLink({
  asChild,
  className,
  ...props
}: React.ComponentProps<"a"> & {
  asChild?: boolean
}) {
  const Comp = asChild ? Slot : "a"

  return (
    <Comp
      data-slot="breadcrumb-link"
      className={cn("hover:text-foreground transition-colors", className)}
      {...props}
    />
  )
}

function BreadcrumbPage({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-page"
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn("text-foreground font-normal", className)}
      {...props}
    />
  )
}

function BreadcrumbSeparator({
  children,
  className,
  ...props
}: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-separator"
      role="presentation"
      aria-hidden="true"
      className={cn("[&>svg]:size-3.5", className)}
      {...props}
    >
      {children ?? <ChevronRight />}
    </li>
  )
}

function BreadcrumbEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-ellipsis"
      role="presentation"
      aria-hidden="true"
      className={cn("flex size-9 items-center justify-center", className)}
      {...props}
    >
      <MoreHorizontal className="size-4" />
      <span className="sr-only">More</span>
    </span>
  )
}

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
}

```

---

## components\ui\button.tsx

```typescript
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }

```

---

## components\ui\calendar.tsx

```typescript
"use client"

import * as React from "react"
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react"
import { DayButton, DayPicker, getDefaultClassNames } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  buttonVariant = "ghost",
  formatters,
  components,
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>["variant"]
}) {
  const defaultClassNames = getDefaultClassNames()

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        "bg-background group/calendar p-3 [--cell-size:--spacing(8)] [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent",
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        className
      )}
      captionLayout={captionLayout}
      formatters={{
        formatMonthDropdown: (date) =>
          date.toLocaleString("default", { month: "short" }),
        ...formatters,
      }}
      classNames={{
        root: cn("w-fit", defaultClassNames.root),
        months: cn(
          "flex gap-4 flex-col md:flex-row relative",
          defaultClassNames.months
        ),
        month: cn("flex flex-col w-full gap-4", defaultClassNames.month),
        nav: cn(
          "flex items-center gap-1 w-full absolute top-0 inset-x-0 justify-between",
          defaultClassNames.nav
        ),
        button_previous: cn(
          buttonVariants({ variant: buttonVariant }),
          "size-(--cell-size) aria-disabled:opacity-50 p-0 select-none",
          defaultClassNames.button_previous
        ),
        button_next: cn(
          buttonVariants({ variant: buttonVariant }),
          "size-(--cell-size) aria-disabled:opacity-50 p-0 select-none",
          defaultClassNames.button_next
        ),
        month_caption: cn(
          "flex items-center justify-center h-(--cell-size) w-full px-(--cell-size)",
          defaultClassNames.month_caption
        ),
        dropdowns: cn(
          "w-full flex items-center text-sm font-medium justify-center h-(--cell-size) gap-1.5",
          defaultClassNames.dropdowns
        ),
        dropdown_root: cn(
          "relative has-focus:border-ring border border-input shadow-xs has-focus:ring-ring/50 has-focus:ring-[3px] rounded-md",
          defaultClassNames.dropdown_root
        ),
        dropdown: cn(
          "absolute bg-popover inset-0 opacity-0",
          defaultClassNames.dropdown
        ),
        caption_label: cn(
          "select-none font-medium",
          captionLayout === "label"
            ? "text-sm"
            : "rounded-md pl-2 pr-1 flex items-center gap-1 text-sm h-8 [&>svg]:text-muted-foreground [&>svg]:size-3.5",
          defaultClassNames.caption_label
        ),
        table: "w-full border-collapse",
        weekdays: cn("flex", defaultClassNames.weekdays),
        weekday: cn(
          "text-muted-foreground rounded-md flex-1 font-normal text-[0.8rem] select-none",
          defaultClassNames.weekday
        ),
        week: cn("flex w-full mt-2", defaultClassNames.week),
        week_number_header: cn(
          "select-none w-(--cell-size)",
          defaultClassNames.week_number_header
        ),
        week_number: cn(
          "text-[0.8rem] select-none text-muted-foreground",
          defaultClassNames.week_number
        ),
        day: cn(
          "relative w-full h-full p-0 text-center [&:first-child[data-selected=true]_button]:rounded-l-md [&:last-child[data-selected=true]_button]:rounded-r-md group/day aspect-square select-none",
          defaultClassNames.day
        ),
        range_start: cn(
          "rounded-l-md bg-accent",
          defaultClassNames.range_start
        ),
        range_middle: cn("rounded-none", defaultClassNames.range_middle),
        range_end: cn("rounded-r-md bg-accent", defaultClassNames.range_end),
        today: cn(
          "bg-accent text-accent-foreground rounded-md data-[selected=true]:rounded-none",
          defaultClassNames.today
        ),
        outside: cn(
          "text-muted-foreground aria-selected:text-muted-foreground",
          defaultClassNames.outside
        ),
        disabled: cn(
          "text-muted-foreground opacity-50",
          defaultClassNames.disabled
        ),
        hidden: cn("invisible", defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Root: ({ className, rootRef, ...props }) => {
          return (
            <div
              data-slot="calendar"
              ref={rootRef}
              className={cn(className)}
              {...props}
            />
          )
        },
        Chevron: ({ className, orientation, ...props }) => {
          if (orientation === "left") {
            return (
              <ChevronLeftIcon className={cn("size-4", className)} {...props} />
            )
          }

          if (orientation === "right") {
            return (
              <ChevronRightIcon
                className={cn("size-4", className)}
                {...props}
              />
            )
          }

          return (
            <ChevronDownIcon className={cn("size-4", className)} {...props} />
          )
        },
        DayButton: CalendarDayButton,
        WeekNumber: ({ children, ...props }) => {
          return (
            <td {...props}>
              <div className="flex size-(--cell-size) items-center justify-center text-center">
                {children}
              </div>
            </td>
          )
        },
        ...components,
      }}
      {...props}
    />
  )
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  ...props
}: React.ComponentProps<typeof DayButton>) {
  const defaultClassNames = getDefaultClassNames()

  const ref = React.useRef<HTMLButtonElement>(null)
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus()
  }, [modifiers.focused])

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      data-day={day.date.toLocaleDateString()}
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(
        "data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground data-[range-middle=true]:bg-accent data-[range-middle=true]:text-accent-foreground data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-ring/50 dark:hover:text-accent-foreground flex aspect-square size-auto w-full min-w-(--cell-size) flex-col gap-1 leading-none font-normal group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:ring-[3px] data-[range-end=true]:rounded-md data-[range-end=true]:rounded-r-md data-[range-middle=true]:rounded-none data-[range-start=true]:rounded-md data-[range-start=true]:rounded-l-md [&>span]:text-xs [&>span]:opacity-70",
        defaultClassNames.day,
        className
      )}
      {...props}
    />
  )
}

export { Calendar, CalendarDayButton }

```

---

## components\ui\card.tsx

```typescript
import * as React from "react"

import { cn } from "@/lib/utils"

function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
        className
      )}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("leading-none font-semibold", className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}

```

---

## components\ui\carousel.tsx

```typescript
"use client"

import * as React from "react"
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react"
import { ArrowLeft, ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

type CarouselApi = UseEmblaCarouselType[1]
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>
type CarouselOptions = UseCarouselParameters[0]
type CarouselPlugin = UseCarouselParameters[1]

type CarouselProps = {
  opts?: CarouselOptions
  plugins?: CarouselPlugin
  orientation?: "horizontal" | "vertical"
  setApi?: (api: CarouselApi) => void
}

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0]
  api: ReturnType<typeof useEmblaCarousel>[1]
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
} & CarouselProps

const CarouselContext = React.createContext<CarouselContextProps | null>(null)

function useCarousel() {
  const context = React.useContext(CarouselContext)

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />")
  }

  return context
}

function Carousel({
  orientation = "horizontal",
  opts,
  setApi,
  plugins,
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & CarouselProps) {
  const [carouselRef, api] = useEmblaCarousel(
    {
      ...opts,
      axis: orientation === "horizontal" ? "x" : "y",
    },
    plugins
  )
  const [canScrollPrev, setCanScrollPrev] = React.useState(false)
  const [canScrollNext, setCanScrollNext] = React.useState(false)

  const onSelect = React.useCallback((api: CarouselApi) => {
    if (!api) return
    setCanScrollPrev(api.canScrollPrev())
    setCanScrollNext(api.canScrollNext())
  }, [])

  const scrollPrev = React.useCallback(() => {
    api?.scrollPrev()
  }, [api])

  const scrollNext = React.useCallback(() => {
    api?.scrollNext()
  }, [api])

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault()
        scrollPrev()
      } else if (event.key === "ArrowRight") {
        event.preventDefault()
        scrollNext()
      }
    },
    [scrollPrev, scrollNext]
  )

  React.useEffect(() => {
    if (!api || !setApi) return
    setApi(api)
  }, [api, setApi])

  React.useEffect(() => {
    if (!api) return
    onSelect(api)
    api.on("reInit", onSelect)
    api.on("select", onSelect)

    return () => {
      api?.off("select", onSelect)
    }
  }, [api, onSelect])

  return (
    <CarouselContext.Provider
      value={{
        carouselRef,
        api: api,
        opts,
        orientation:
          orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
      }}
    >
      <div
        onKeyDownCapture={handleKeyDown}
        className={cn("relative", className)}
        role="region"
        aria-roledescription="carousel"
        data-slot="carousel"
        {...props}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  )
}

function CarouselContent({ className, ...props }: React.ComponentProps<"div">) {
  const { carouselRef, orientation } = useCarousel()

  return (
    <div
      ref={carouselRef}
      className="overflow-hidden"
      data-slot="carousel-content"
    >
      <div
        className={cn(
          "flex",
          orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
          className
        )}
        {...props}
      />
    </div>
  )
}

function CarouselItem({ className, ...props }: React.ComponentProps<"div">) {
  const { orientation } = useCarousel()

  return (
    <div
      role="group"
      aria-roledescription="slide"
      data-slot="carousel-item"
      className={cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? "pl-4" : "pt-4",
        className
      )}
      {...props}
    />
  )
}

function CarouselPrevious({
  className,
  variant = "outline",
  size = "icon",
  ...props
}: React.ComponentProps<typeof Button>) {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel()

  return (
    <Button
      data-slot="carousel-previous"
      variant={variant}
      size={size}
      className={cn(
        "absolute size-8 rounded-full",
        orientation === "horizontal"
          ? "top-1/2 -left-12 -translate-y-1/2"
          : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <ArrowLeft />
      <span className="sr-only">Previous slide</span>
    </Button>
  )
}

function CarouselNext({
  className,
  variant = "outline",
  size = "icon",
  ...props
}: React.ComponentProps<typeof Button>) {
  const { orientation, scrollNext, canScrollNext } = useCarousel()

  return (
    <Button
      data-slot="carousel-next"
      variant={variant}
      size={size}
      className={cn(
        "absolute size-8 rounded-full",
        orientation === "horizontal"
          ? "top-1/2 -right-12 -translate-y-1/2"
          : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <ArrowRight />
      <span className="sr-only">Next slide</span>
    </Button>
  )
}

export {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
}

```

---

## components\ui\chart.tsx

```typescript
"use client"

import * as React from "react"
import * as RechartsPrimitive from "recharts"

import { cn } from "@/lib/utils"

// Format: { THEME_NAME: CSS_SELECTOR }
const THEMES = { light: "", dark: ".dark" } as const

export type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode
    icon?: React.ComponentType
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<keyof typeof THEMES, string> }
  )
}

type ChartContextProps = {
  config: ChartConfig
}

const ChartContext = React.createContext<ChartContextProps | null>(null)

function useChart() {
  const context = React.useContext(ChartContext)

  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />")
  }

  return context
}

function ChartContainer({
  id,
  className,
  children,
  config,
  ...props
}: React.ComponentProps<"div"> & {
  config: ChartConfig
  children: React.ComponentProps<
    typeof RechartsPrimitive.ResponsiveContainer
  >["children"]
}) {
  const uniqueId = React.useId()
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-slot="chart"
        data-chart={chartId}
        className={cn(
          "[&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border flex aspect-video justify-center text-xs [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-hidden [&_.recharts-sector]:outline-hidden [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-surface]:outline-hidden",
          className
        )}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer>
          {children}
        </RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  )
}

const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const colorConfig = Object.entries(config).filter(
    ([, config]) => config.theme || config.color
  )

  if (!colorConfig.length) {
    return null
  }

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(
            ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
  .map(([key, itemConfig]) => {
    const color =
      itemConfig.theme?.[theme as keyof typeof itemConfig.theme] ||
      itemConfig.color
    return color ? `  --color-${key}: ${color};` : null
  })
  .join("\n")}
}
`
          )
          .join("\n"),
      }}
    />
  )
}

const ChartTooltip = RechartsPrimitive.Tooltip

function ChartTooltipContent({
  active,
  payload,
  className,
  indicator = "dot",
  hideLabel = false,
  hideIndicator = false,
  label,
  labelFormatter,
  labelClassName,
  formatter,
  color,
  nameKey,
  labelKey,
}: React.ComponentProps<typeof RechartsPrimitive.Tooltip> &
  React.ComponentProps<"div"> & {
    hideLabel?: boolean
    hideIndicator?: boolean
    indicator?: "line" | "dot" | "dashed"
    nameKey?: string
    labelKey?: string
  }) {
  const { config } = useChart()

  const tooltipLabel = React.useMemo(() => {
    if (hideLabel || !payload?.length) {
      return null
    }

    const [item] = payload
    const key = `${labelKey || item?.dataKey || item?.name || "value"}`
    const itemConfig = getPayloadConfigFromPayload(config, item, key)
    const value =
      !labelKey && typeof label === "string"
        ? config[label as keyof typeof config]?.label || label
        : itemConfig?.label

    if (labelFormatter) {
      return (
        <div className={cn("font-medium", labelClassName)}>
          {labelFormatter(value, payload)}
        </div>
      )
    }

    if (!value) {
      return null
    }

    return <div className={cn("font-medium", labelClassName)}>{value}</div>
  }, [
    label,
    labelFormatter,
    payload,
    hideLabel,
    labelClassName,
    config,
    labelKey,
  ])

  if (!active || !payload?.length) {
    return null
  }

  const nestLabel = payload.length === 1 && indicator !== "dot"

  return (
    <div
      className={cn(
        "border-border/50 bg-background grid min-w-[8rem] items-start gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs shadow-xl",
        className
      )}
    >
      {!nestLabel ? tooltipLabel : null}
      <div className="grid gap-1.5">
        {payload.map((item, index) => {
          const key = `${nameKey || item.name || item.dataKey || "value"}`
          const itemConfig = getPayloadConfigFromPayload(config, item, key)
          const indicatorColor = color || item.payload.fill || item.color

          return (
            <div
              key={item.dataKey}
              className={cn(
                "[&>svg]:text-muted-foreground flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5",
                indicator === "dot" && "items-center"
              )}
            >
              {formatter && item?.value !== undefined && item.name ? (
                formatter(item.value, item.name, item, index, item.payload)
              ) : (
                <>
                  {itemConfig?.icon ? (
                    <itemConfig.icon />
                  ) : (
                    !hideIndicator && (
                      <div
                        className={cn(
                          "shrink-0 rounded-[2px] border-(--color-border) bg-(--color-bg)",
                          {
                            "h-2.5 w-2.5": indicator === "dot",
                            "w-1": indicator === "line",
                            "w-0 border-[1.5px] border-dashed bg-transparent":
                              indicator === "dashed",
                            "my-0.5": nestLabel && indicator === "dashed",
                          }
                        )}
                        style={
                          {
                            "--color-bg": indicatorColor,
                            "--color-border": indicatorColor,
                          } as React.CSSProperties
                        }
                      />
                    )
                  )}
                  <div
                    className={cn(
                      "flex flex-1 justify-between leading-none",
                      nestLabel ? "items-end" : "items-center"
                    )}
                  >
                    <div className="grid gap-1.5">
                      {nestLabel ? tooltipLabel : null}
                      <span className="text-muted-foreground">
                        {itemConfig?.label || item.name}
                      </span>
                    </div>
                    {item.value && (
                      <span className="text-foreground font-mono font-medium tabular-nums">
                        {item.value.toLocaleString()}
                      </span>
                    )}
                  </div>
                </>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

const ChartLegend = RechartsPrimitive.Legend

function ChartLegendContent({
  className,
  hideIcon = false,
  payload,
  verticalAlign = "bottom",
  nameKey,
}: React.ComponentProps<"div"> &
  Pick<RechartsPrimitive.LegendProps, "payload" | "verticalAlign"> & {
    hideIcon?: boolean
    nameKey?: string
  }) {
  const { config } = useChart()

  if (!payload?.length) {
    return null
  }

  return (
    <div
      className={cn(
        "flex items-center justify-center gap-4",
        verticalAlign === "top" ? "pb-3" : "pt-3",
        className
      )}
    >
      {payload.map((item) => {
        const key = `${nameKey || item.dataKey || "value"}`
        const itemConfig = getPayloadConfigFromPayload(config, item, key)

        return (
          <div
            key={item.value}
            className={cn(
              "[&>svg]:text-muted-foreground flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3"
            )}
          >
            {itemConfig?.icon && !hideIcon ? (
              <itemConfig.icon />
            ) : (
              <div
                className="h-2 w-2 shrink-0 rounded-[2px]"
                style={{
                  backgroundColor: item.color,
                }}
              />
            )}
            {itemConfig?.label}
          </div>
        )
      })}
    </div>
  )
}

// Helper to extract item config from a payload.
function getPayloadConfigFromPayload(
  config: ChartConfig,
  payload: unknown,
  key: string
) {
  if (typeof payload !== "object" || payload === null) {
    return undefined
  }

  const payloadPayload =
    "payload" in payload &&
    typeof payload.payload === "object" &&
    payload.payload !== null
      ? payload.payload
      : undefined

  let configLabelKey: string = key

  if (
    key in payload &&
    typeof payload[key as keyof typeof payload] === "string"
  ) {
    configLabelKey = payload[key as keyof typeof payload] as string
  } else if (
    payloadPayload &&
    key in payloadPayload &&
    typeof payloadPayload[key as keyof typeof payloadPayload] === "string"
  ) {
    configLabelKey = payloadPayload[
      key as keyof typeof payloadPayload
    ] as string
  }

  return configLabelKey in config
    ? config[configLabelKey]
    : config[key as keyof typeof config]
}

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
}

```

---

## components\ui\checkbox.tsx

```typescript
"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { CheckIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer border-input dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="flex items-center justify-center text-current transition-none"
      >
        <CheckIcon className="size-3.5" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }

```

---

## components\ui\collapsible.tsx

```typescript
"use client"

import * as CollapsiblePrimitive from "@radix-ui/react-collapsible"

function Collapsible({
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.Root>) {
  return <CollapsiblePrimitive.Root data-slot="collapsible" {...props} />
}

function CollapsibleTrigger({
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleTrigger>) {
  return (
    <CollapsiblePrimitive.CollapsibleTrigger
      data-slot="collapsible-trigger"
      {...props}
    />
  )
}

function CollapsibleContent({
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleContent>) {
  return (
    <CollapsiblePrimitive.CollapsibleContent
      data-slot="collapsible-content"
      {...props}
    />
  )
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent }

```

---

## components\ui\command.tsx

```typescript
"use client"

import * as React from "react"
import { Command as CommandPrimitive } from "cmdk"
import { SearchIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

function Command({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive>) {
  return (
    <CommandPrimitive
      data-slot="command"
      className={cn(
        "bg-popover text-popover-foreground flex h-full w-full flex-col overflow-hidden rounded-md",
        className
      )}
      {...props}
    />
  )
}

function CommandDialog({
  title = "Command Palette",
  description = "Search for a command to run...",
  children,
  className,
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof Dialog> & {
  title?: string
  description?: string
  className?: string
  showCloseButton?: boolean
}) {
  return (
    <Dialog {...props}>
      <DialogHeader className="sr-only">
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      <DialogContent
        className={cn("overflow-hidden p-0", className)}
        showCloseButton={showCloseButton}
      >
        <Command className="[&_[cmdk-group-heading]]:text-muted-foreground **:data-[slot=command-input-wrapper]:h-12 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group]]:px-2 [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  )
}

function CommandInput({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Input>) {
  return (
    <div
      data-slot="command-input-wrapper"
      className="flex h-9 items-center gap-2 border-b px-3"
    >
      <SearchIcon className="size-4 shrink-0 opacity-50" />
      <CommandPrimitive.Input
        data-slot="command-input"
        className={cn(
          "placeholder:text-muted-foreground flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-hidden disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      />
    </div>
  )
}

function CommandList({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.List>) {
  return (
    <CommandPrimitive.List
      data-slot="command-list"
      className={cn(
        "max-h-[300px] scroll-py-1 overflow-x-hidden overflow-y-auto",
        className
      )}
      {...props}
    />
  )
}

function CommandEmpty({
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Empty>) {
  return (
    <CommandPrimitive.Empty
      data-slot="command-empty"
      className="py-6 text-center text-sm"
      {...props}
    />
  )
}

function CommandGroup({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Group>) {
  return (
    <CommandPrimitive.Group
      data-slot="command-group"
      className={cn(
        "text-foreground [&_[cmdk-group-heading]]:text-muted-foreground overflow-hidden p-1 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium",
        className
      )}
      {...props}
    />
  )
}

function CommandSeparator({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Separator>) {
  return (
    <CommandPrimitive.Separator
      data-slot="command-separator"
      className={cn("bg-border -mx-1 h-px", className)}
      {...props}
    />
  )
}

function CommandItem({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Item>) {
  return (
    <CommandPrimitive.Item
      data-slot="command-item"
      className={cn(
        "data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  )
}

function CommandShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="command-shortcut"
      className={cn(
        "text-muted-foreground ml-auto text-xs tracking-widest",
        className
      )}
      {...props}
    />
  )
}

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
}

```

---

## components\ui\context-menu.tsx

```typescript
"use client"

import * as React from "react"
import * as ContextMenuPrimitive from "@radix-ui/react-context-menu"
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function ContextMenu({
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Root>) {
  return <ContextMenuPrimitive.Root data-slot="context-menu" {...props} />
}

function ContextMenuTrigger({
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Trigger>) {
  return (
    <ContextMenuPrimitive.Trigger data-slot="context-menu-trigger" {...props} />
  )
}

function ContextMenuGroup({
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Group>) {
  return (
    <ContextMenuPrimitive.Group data-slot="context-menu-group" {...props} />
  )
}

function ContextMenuPortal({
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Portal>) {
  return (
    <ContextMenuPrimitive.Portal data-slot="context-menu-portal" {...props} />
  )
}

function ContextMenuSub({
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Sub>) {
  return <ContextMenuPrimitive.Sub data-slot="context-menu-sub" {...props} />
}

function ContextMenuRadioGroup({
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.RadioGroup>) {
  return (
    <ContextMenuPrimitive.RadioGroup
      data-slot="context-menu-radio-group"
      {...props}
    />
  )
}

function ContextMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.SubTrigger> & {
  inset?: boolean
}) {
  return (
    <ContextMenuPrimitive.SubTrigger
      data-slot="context-menu-sub-trigger"
      data-inset={inset}
      className={cn(
        "focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ml-auto" />
    </ContextMenuPrimitive.SubTrigger>
  )
}

function ContextMenuSubContent({
  className,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.SubContent>) {
  return (
    <ContextMenuPrimitive.SubContent
      data-slot="context-menu-sub-content"
      className={cn(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] origin-(--radix-context-menu-content-transform-origin) overflow-hidden rounded-md border p-1 shadow-lg",
        className
      )}
      {...props}
    />
  )
}

function ContextMenuContent({
  className,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Content>) {
  return (
    <ContextMenuPrimitive.Portal>
      <ContextMenuPrimitive.Content
        data-slot="context-menu-content"
        className={cn(
          "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-h-(--radix-context-menu-content-available-height) min-w-[8rem] origin-(--radix-context-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border p-1 shadow-md",
          className
        )}
        {...props}
      />
    </ContextMenuPrimitive.Portal>
  )
}

function ContextMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Item> & {
  inset?: boolean
  variant?: "default" | "destructive"
}) {
  return (
    <ContextMenuPrimitive.Item
      data-slot="context-menu-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
        "focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  )
}

function ContextMenuCheckboxItem({
  className,
  children,
  checked,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.CheckboxItem>) {
  return (
    <ContextMenuPrimitive.CheckboxItem
      data-slot="context-menu-checkbox-item"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      checked={checked}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <ContextMenuPrimitive.ItemIndicator>
          <CheckIcon className="size-4" />
        </ContextMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </ContextMenuPrimitive.CheckboxItem>
  )
}

function ContextMenuRadioItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.RadioItem>) {
  return (
    <ContextMenuPrimitive.RadioItem
      data-slot="context-menu-radio-item"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <ContextMenuPrimitive.ItemIndicator>
          <CircleIcon className="size-2 fill-current" />
        </ContextMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </ContextMenuPrimitive.RadioItem>
  )
}

function ContextMenuLabel({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Label> & {
  inset?: boolean
}) {
  return (
    <ContextMenuPrimitive.Label
      data-slot="context-menu-label"
      data-inset={inset}
      className={cn(
        "text-foreground px-2 py-1.5 text-sm font-medium data-[inset]:pl-8",
        className
      )}
      {...props}
    />
  )
}

function ContextMenuSeparator({
  className,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Separator>) {
  return (
    <ContextMenuPrimitive.Separator
      data-slot="context-menu-separator"
      className={cn("bg-border -mx-1 my-1 h-px", className)}
      {...props}
    />
  )
}

function ContextMenuShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="context-menu-shortcut"
      className={cn(
        "text-muted-foreground ml-auto text-xs tracking-widest",
        className
      )}
      {...props}
    />
  )
}

export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuGroup,
  ContextMenuPortal,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuRadioGroup,
}

```

---

## components\ui\drawer.tsx

```typescript
"use client"

import * as React from "react"
import { Drawer as DrawerPrimitive } from "vaul"

import { cn } from "@/lib/utils"

function Drawer({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root>) {
  return <DrawerPrimitive.Root data-slot="drawer" {...props} />
}

function DrawerTrigger({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Trigger>) {
  return <DrawerPrimitive.Trigger data-slot="drawer-trigger" {...props} />
}

function DrawerPortal({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Portal>) {
  return <DrawerPrimitive.Portal data-slot="drawer-portal" {...props} />
}

function DrawerClose({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Close>) {
  return <DrawerPrimitive.Close data-slot="drawer-close" {...props} />
}

function DrawerOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Overlay>) {
  return (
    <DrawerPrimitive.Overlay
      data-slot="drawer-overlay"
      className={cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      )}
      {...props}
    />
  )
}

function DrawerContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Content>) {
  return (
    <DrawerPortal data-slot="drawer-portal">
      <DrawerOverlay />
      <DrawerPrimitive.Content
        data-slot="drawer-content"
        className={cn(
          "group/drawer-content bg-background fixed z-50 flex h-auto flex-col",
          "data-[vaul-drawer-direction=top]:inset-x-0 data-[vaul-drawer-direction=top]:top-0 data-[vaul-drawer-direction=top]:mb-24 data-[vaul-drawer-direction=top]:max-h-[80vh] data-[vaul-drawer-direction=top]:rounded-b-lg data-[vaul-drawer-direction=top]:border-b",
          "data-[vaul-drawer-direction=bottom]:inset-x-0 data-[vaul-drawer-direction=bottom]:bottom-0 data-[vaul-drawer-direction=bottom]:mt-24 data-[vaul-drawer-direction=bottom]:max-h-[80vh] data-[vaul-drawer-direction=bottom]:rounded-t-lg data-[vaul-drawer-direction=bottom]:border-t",
          "data-[vaul-drawer-direction=right]:inset-y-0 data-[vaul-drawer-direction=right]:right-0 data-[vaul-drawer-direction=right]:w-3/4 data-[vaul-drawer-direction=right]:border-l data-[vaul-drawer-direction=right]:sm:max-w-sm",
          "data-[vaul-drawer-direction=left]:inset-y-0 data-[vaul-drawer-direction=left]:left-0 data-[vaul-drawer-direction=left]:w-3/4 data-[vaul-drawer-direction=left]:border-r data-[vaul-drawer-direction=left]:sm:max-w-sm",
          className
        )}
        {...props}
      >
        <div className="bg-muted mx-auto mt-4 hidden h-2 w-[100px] shrink-0 rounded-full group-data-[vaul-drawer-direction=bottom]/drawer-content:block" />
        {children}
      </DrawerPrimitive.Content>
    </DrawerPortal>
  )
}

function DrawerHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-header"
      className={cn(
        "flex flex-col gap-0.5 p-4 group-data-[vaul-drawer-direction=bottom]/drawer-content:text-center group-data-[vaul-drawer-direction=top]/drawer-content:text-center md:gap-1.5 md:text-left",
        className
      )}
      {...props}
    />
  )
}

function DrawerFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-footer"
      className={cn("mt-auto flex flex-col gap-2 p-4", className)}
      {...props}
    />
  )
}

function DrawerTitle({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Title>) {
  return (
    <DrawerPrimitive.Title
      data-slot="drawer-title"
      className={cn("text-foreground font-semibold", className)}
      {...props}
    />
  )
}

function DrawerDescription({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Description>) {
  return (
    <DrawerPrimitive.Description
      data-slot="drawer-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
}

```

---

## components\ui\dropdown-menu.tsx

```typescript
"use client"

import * as React from "react"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function DropdownMenu({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Root>) {
  return <DropdownMenuPrimitive.Root data-slot="dropdown-menu" {...props} />
}

function DropdownMenuPortal({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Portal>) {
  return (
    <DropdownMenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} />
  )
}

function DropdownMenuTrigger({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Trigger>) {
  return (
    <DropdownMenuPrimitive.Trigger
      data-slot="dropdown-menu-trigger"
      {...props}
    />
  )
}

function DropdownMenuContent({
  className,
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Content>) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        data-slot="dropdown-menu-content"
        sideOffset={sideOffset}
        className={cn(
          "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-h-(--radix-dropdown-menu-content-available-height) min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border p-1 shadow-md",
          className
        )}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  )
}

function DropdownMenuGroup({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Group>) {
  return (
    <DropdownMenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />
  )
}

function DropdownMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Item> & {
  inset?: boolean
  variant?: "default" | "destructive"
}) {
  return (
    <DropdownMenuPrimitive.Item
      data-slot="dropdown-menu-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
        "focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  )
}

function DropdownMenuCheckboxItem({
  className,
  children,
  checked,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem>) {
  return (
    <DropdownMenuPrimitive.CheckboxItem
      data-slot="dropdown-menu-checkbox-item"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      checked={checked}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <CheckIcon className="size-4" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  )
}

function DropdownMenuRadioGroup({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.RadioGroup>) {
  return (
    <DropdownMenuPrimitive.RadioGroup
      data-slot="dropdown-menu-radio-group"
      {...props}
    />
  )
}

function DropdownMenuRadioItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.RadioItem>) {
  return (
    <DropdownMenuPrimitive.RadioItem
      data-slot="dropdown-menu-radio-item"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <CircleIcon className="size-2 fill-current" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.RadioItem>
  )
}

function DropdownMenuLabel({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Label> & {
  inset?: boolean
}) {
  return (
    <DropdownMenuPrimitive.Label
      data-slot="dropdown-menu-label"
      data-inset={inset}
      className={cn(
        "px-2 py-1.5 text-sm font-medium data-[inset]:pl-8",
        className
      )}
      {...props}
    />
  )
}

function DropdownMenuSeparator({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Separator>) {
  return (
    <DropdownMenuPrimitive.Separator
      data-slot="dropdown-menu-separator"
      className={cn("bg-border -mx-1 my-1 h-px", className)}
      {...props}
    />
  )
}

function DropdownMenuShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="dropdown-menu-shortcut"
      className={cn(
        "text-muted-foreground ml-auto text-xs tracking-widest",
        className
      )}
      {...props}
    />
  )
}

function DropdownMenuSub({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Sub>) {
  return <DropdownMenuPrimitive.Sub data-slot="dropdown-menu-sub" {...props} />
}

function DropdownMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubTrigger> & {
  inset?: boolean
}) {
  return (
    <DropdownMenuPrimitive.SubTrigger
      data-slot="dropdown-menu-sub-trigger"
      data-inset={inset}
      className={cn(
        "focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[inset]:pl-8",
        className
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ml-auto size-4" />
    </DropdownMenuPrimitive.SubTrigger>
  )
}

function DropdownMenuSubContent({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubContent>) {
  return (
    <DropdownMenuPrimitive.SubContent
      data-slot="dropdown-menu-sub-content"
      className={cn(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-hidden rounded-md border p-1 shadow-lg",
        className
      )}
      {...props}
    />
  )
}

export {
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
}

```

---

## components\ui\form.tsx

```typescript
"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { Slot } from "@radix-ui/react-slot"
import {
  Controller,
  FormProvider,
  useFormContext,
  useFormState,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form"

import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"

const Form = FormProvider

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName
}

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
)

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  )
}

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext)
  const itemContext = React.useContext(FormItemContext)
  const { getFieldState } = useFormContext()
  const formState = useFormState({ name: fieldContext.name })
  const fieldState = getFieldState(fieldContext.name, formState)

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>")
  }

  const { id } = itemContext

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  }
}

type FormItemContextValue = {
  id: string
}

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue
)

function FormItem({ className, ...props }: React.ComponentProps<"div">) {
  const id = React.useId()

  return (
    <FormItemContext.Provider value={{ id }}>
      <div
        data-slot="form-item"
        className={cn("grid gap-2", className)}
        {...props}
      />
    </FormItemContext.Provider>
  )
}

function FormLabel({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  const { error, formItemId } = useFormField()

  return (
    <Label
      data-slot="form-label"
      data-error={!!error}
      className={cn("data-[error=true]:text-destructive", className)}
      htmlFor={formItemId}
      {...props}
    />
  )
}

function FormControl({ ...props }: React.ComponentProps<typeof Slot>) {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField()

  return (
    <Slot
      data-slot="form-control"
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  )
}

function FormDescription({ className, ...props }: React.ComponentProps<"p">) {
  const { formDescriptionId } = useFormField()

  return (
    <p
      data-slot="form-description"
      id={formDescriptionId}
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

function FormMessage({ className, ...props }: React.ComponentProps<"p">) {
  const { error, formMessageId } = useFormField()
  const body = error ? String(error?.message ?? "") : props.children

  if (!body) {
    return null
  }

  return (
    <p
      data-slot="form-message"
      id={formMessageId}
      className={cn("text-destructive text-sm", className)}
      {...props}
    >
      {body}
    </p>
  )
}

export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
}

```

---

## components\ui\hover-card.tsx

```typescript
"use client"

import * as React from "react"
import * as HoverCardPrimitive from "@radix-ui/react-hover-card"

import { cn } from "@/lib/utils"

function HoverCard({
  ...props
}: React.ComponentProps<typeof HoverCardPrimitive.Root>) {
  return <HoverCardPrimitive.Root data-slot="hover-card" {...props} />
}

function HoverCardTrigger({
  ...props
}: React.ComponentProps<typeof HoverCardPrimitive.Trigger>) {
  return (
    <HoverCardPrimitive.Trigger data-slot="hover-card-trigger" {...props} />
  )
}

function HoverCardContent({
  className,
  align = "center",
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof HoverCardPrimitive.Content>) {
  return (
    <HoverCardPrimitive.Portal data-slot="hover-card-portal">
      <HoverCardPrimitive.Content
        data-slot="hover-card-content"
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-64 origin-(--radix-hover-card-content-transform-origin) rounded-md border p-4 shadow-md outline-hidden",
          className
        )}
        {...props}
      />
    </HoverCardPrimitive.Portal>
  )
}

export { HoverCard, HoverCardTrigger, HoverCardContent }

```

---

## components\ui\input-otp.tsx

```typescript
"use client"

import * as React from "react"
import { OTPInput, OTPInputContext } from "input-otp"
import { MinusIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function InputOTP({
  className,
  containerClassName,
  ...props
}: React.ComponentProps<typeof OTPInput> & {
  containerClassName?: string
}) {
  return (
    <OTPInput
      data-slot="input-otp"
      containerClassName={cn(
        "flex items-center gap-2 has-disabled:opacity-50",
        containerClassName
      )}
      className={cn("disabled:cursor-not-allowed", className)}
      {...props}
    />
  )
}

function InputOTPGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-otp-group"
      className={cn("flex items-center", className)}
      {...props}
    />
  )
}

function InputOTPSlot({
  index,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  index: number
}) {
  const inputOTPContext = React.useContext(OTPInputContext)
  const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {}

  return (
    <div
      data-slot="input-otp-slot"
      data-active={isActive}
      className={cn(
        "data-[active=true]:border-ring data-[active=true]:ring-ring/50 data-[active=true]:aria-invalid:ring-destructive/20 dark:data-[active=true]:aria-invalid:ring-destructive/40 aria-invalid:border-destructive data-[active=true]:aria-invalid:border-destructive dark:bg-input/30 border-input relative flex h-9 w-9 items-center justify-center border-y border-r text-sm shadow-xs transition-all outline-none first:rounded-l-md first:border-l last:rounded-r-md data-[active=true]:z-10 data-[active=true]:ring-[3px]",
        className
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="animate-caret-blink bg-foreground h-4 w-px duration-1000" />
        </div>
      )}
    </div>
  )
}

function InputOTPSeparator({ ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="input-otp-separator" role="separator" {...props}>
      <MinusIcon />
    </div>
  )
}

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator }

```

---

## components\ui\input.tsx

```typescript
import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  )
}

export { Input }

```

---

## components\ui\label.tsx

```typescript
"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"

import { cn } from "@/lib/utils"

function Label({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Label }

```

---

## components\ui\menubar.tsx

```typescript
"use client"

import * as React from "react"
import * as MenubarPrimitive from "@radix-ui/react-menubar"
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function Menubar({
  className,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Root>) {
  return (
    <MenubarPrimitive.Root
      data-slot="menubar"
      className={cn(
        "bg-background flex h-9 items-center gap-1 rounded-md border p-1 shadow-xs",
        className
      )}
      {...props}
    />
  )
}

function MenubarMenu({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Menu>) {
  return <MenubarPrimitive.Menu data-slot="menubar-menu" {...props} />
}

function MenubarGroup({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Group>) {
  return <MenubarPrimitive.Group data-slot="menubar-group" {...props} />
}

function MenubarPortal({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Portal>) {
  return <MenubarPrimitive.Portal data-slot="menubar-portal" {...props} />
}

function MenubarRadioGroup({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.RadioGroup>) {
  return (
    <MenubarPrimitive.RadioGroup data-slot="menubar-radio-group" {...props} />
  )
}

function MenubarTrigger({
  className,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Trigger>) {
  return (
    <MenubarPrimitive.Trigger
      data-slot="menubar-trigger"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground flex items-center rounded-sm px-2 py-1 text-sm font-medium outline-hidden select-none",
        className
      )}
      {...props}
    />
  )
}

function MenubarContent({
  className,
  align = "start",
  alignOffset = -4,
  sideOffset = 8,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Content>) {
  return (
    <MenubarPortal>
      <MenubarPrimitive.Content
        data-slot="menubar-content"
        align={align}
        alignOffset={alignOffset}
        sideOffset={sideOffset}
        className={cn(
          "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[12rem] origin-(--radix-menubar-content-transform-origin) overflow-hidden rounded-md border p-1 shadow-md",
          className
        )}
        {...props}
      />
    </MenubarPortal>
  )
}

function MenubarItem({
  className,
  inset,
  variant = "default",
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Item> & {
  inset?: boolean
  variant?: "default" | "destructive"
}) {
  return (
    <MenubarPrimitive.Item
      data-slot="menubar-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
        "focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  )
}

function MenubarCheckboxItem({
  className,
  children,
  checked,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.CheckboxItem>) {
  return (
    <MenubarPrimitive.CheckboxItem
      data-slot="menubar-checkbox-item"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-xs py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      checked={checked}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <MenubarPrimitive.ItemIndicator>
          <CheckIcon className="size-4" />
        </MenubarPrimitive.ItemIndicator>
      </span>
      {children}
    </MenubarPrimitive.CheckboxItem>
  )
}

function MenubarRadioItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.RadioItem>) {
  return (
    <MenubarPrimitive.RadioItem
      data-slot="menubar-radio-item"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-xs py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <MenubarPrimitive.ItemIndicator>
          <CircleIcon className="size-2 fill-current" />
        </MenubarPrimitive.ItemIndicator>
      </span>
      {children}
    </MenubarPrimitive.RadioItem>
  )
}

function MenubarLabel({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Label> & {
  inset?: boolean
}) {
  return (
    <MenubarPrimitive.Label
      data-slot="menubar-label"
      data-inset={inset}
      className={cn(
        "px-2 py-1.5 text-sm font-medium data-[inset]:pl-8",
        className
      )}
      {...props}
    />
  )
}

function MenubarSeparator({
  className,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Separator>) {
  return (
    <MenubarPrimitive.Separator
      data-slot="menubar-separator"
      className={cn("bg-border -mx-1 my-1 h-px", className)}
      {...props}
    />
  )
}

function MenubarShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="menubar-shortcut"
      className={cn(
        "text-muted-foreground ml-auto text-xs tracking-widest",
        className
      )}
      {...props}
    />
  )
}

function MenubarSub({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Sub>) {
  return <MenubarPrimitive.Sub data-slot="menubar-sub" {...props} />
}

function MenubarSubTrigger({
  className,
  inset,
  children,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.SubTrigger> & {
  inset?: boolean
}) {
  return (
    <MenubarPrimitive.SubTrigger
      data-slot="menubar-sub-trigger"
      data-inset={inset}
      className={cn(
        "focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-none select-none data-[inset]:pl-8",
        className
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ml-auto h-4 w-4" />
    </MenubarPrimitive.SubTrigger>
  )
}

function MenubarSubContent({
  className,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.SubContent>) {
  return (
    <MenubarPrimitive.SubContent
      data-slot="menubar-sub-content"
      className={cn(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] origin-(--radix-menubar-content-transform-origin) overflow-hidden rounded-md border p-1 shadow-lg",
        className
      )}
      {...props}
    />
  )
}

export {
  Menubar,
  MenubarPortal,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarGroup,
  MenubarSeparator,
  MenubarLabel,
  MenubarItem,
  MenubarShortcut,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSub,
  MenubarSubTrigger,
  MenubarSubContent,
}

```

---

## components\ui\navigation-menu.tsx

```typescript
import * as React from "react"
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu"
import { cva } from "class-variance-authority"
import { ChevronDownIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function NavigationMenu({
  className,
  children,
  viewport = true,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Root> & {
  viewport?: boolean
}) {
  return (
    <NavigationMenuPrimitive.Root
      data-slot="navigation-menu"
      data-viewport={viewport}
      className={cn(
        "group/navigation-menu relative flex max-w-max flex-1 items-center justify-center",
        className
      )}
      {...props}
    >
      {children}
      {viewport && <NavigationMenuViewport />}
    </NavigationMenuPrimitive.Root>
  )
}

function NavigationMenuList({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.List>) {
  return (
    <NavigationMenuPrimitive.List
      data-slot="navigation-menu-list"
      className={cn(
        "group flex flex-1 list-none items-center justify-center gap-1",
        className
      )}
      {...props}
    />
  )
}

function NavigationMenuItem({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Item>) {
  return (
    <NavigationMenuPrimitive.Item
      data-slot="navigation-menu-item"
      className={cn("relative", className)}
      {...props}
    />
  )
}

const navigationMenuTriggerStyle = cva(
  "group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground disabled:pointer-events-none disabled:opacity-50 data-[state=open]:hover:bg-accent data-[state=open]:text-accent-foreground data-[state=open]:focus:bg-accent data-[state=open]:bg-accent/50 focus-visible:ring-ring/50 outline-none transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1"
)

function NavigationMenuTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Trigger>) {
  return (
    <NavigationMenuPrimitive.Trigger
      data-slot="navigation-menu-trigger"
      className={cn(navigationMenuTriggerStyle(), "group", className)}
      {...props}
    >
      {children}{" "}
      <ChevronDownIcon
        className="relative top-[1px] ml-1 size-3 transition duration-300 group-data-[state=open]:rotate-180"
        aria-hidden="true"
      />
    </NavigationMenuPrimitive.Trigger>
  )
}

function NavigationMenuContent({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Content>) {
  return (
    <NavigationMenuPrimitive.Content
      data-slot="navigation-menu-content"
      className={cn(
        "data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 top-0 left-0 w-full p-2 pr-2.5 md:absolute md:w-auto",
        "group-data-[viewport=false]/navigation-menu:bg-popover group-data-[viewport=false]/navigation-menu:text-popover-foreground group-data-[viewport=false]/navigation-menu:data-[state=open]:animate-in group-data-[viewport=false]/navigation-menu:data-[state=closed]:animate-out group-data-[viewport=false]/navigation-menu:data-[state=closed]:zoom-out-95 group-data-[viewport=false]/navigation-menu:data-[state=open]:zoom-in-95 group-data-[viewport=false]/navigation-menu:data-[state=open]:fade-in-0 group-data-[viewport=false]/navigation-menu:data-[state=closed]:fade-out-0 group-data-[viewport=false]/navigation-menu:top-full group-data-[viewport=false]/navigation-menu:mt-1.5 group-data-[viewport=false]/navigation-menu:overflow-hidden group-data-[viewport=false]/navigation-menu:rounded-md group-data-[viewport=false]/navigation-menu:border group-data-[viewport=false]/navigation-menu:shadow group-data-[viewport=false]/navigation-menu:duration-200 **:data-[slot=navigation-menu-link]:focus:ring-0 **:data-[slot=navigation-menu-link]:focus:outline-none",
        className
      )}
      {...props}
    />
  )
}

function NavigationMenuViewport({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Viewport>) {
  return (
    <div
      className={cn(
        "absolute top-full left-0 isolate z-50 flex justify-center"
      )}
    >
      <NavigationMenuPrimitive.Viewport
        data-slot="navigation-menu-viewport"
        className={cn(
          "origin-top-center bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border shadow md:w-[var(--radix-navigation-menu-viewport-width)]",
          className
        )}
        {...props}
      />
    </div>
  )
}

function NavigationMenuLink({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Link>) {
  return (
    <NavigationMenuPrimitive.Link
      data-slot="navigation-menu-link"
      className={cn(
        "data-[active=true]:focus:bg-accent data-[active=true]:hover:bg-accent data-[active=true]:bg-accent/50 data-[active=true]:text-accent-foreground hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus-visible:ring-ring/50 [&_svg:not([class*='text-'])]:text-muted-foreground flex flex-col gap-1 rounded-sm p-2 text-sm transition-all outline-none focus-visible:ring-[3px] focus-visible:outline-1 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  )
}

function NavigationMenuIndicator({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Indicator>) {
  return (
    <NavigationMenuPrimitive.Indicator
      data-slot="navigation-menu-indicator"
      className={cn(
        "data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden",
        className
      )}
      {...props}
    >
      <div className="bg-border relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm shadow-md" />
    </NavigationMenuPrimitive.Indicator>
  )
}

export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
}

```

---

## components\ui\pagination.tsx

```typescript
import * as React from "react"
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MoreHorizontalIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"

function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  )
}

function PaginationContent({
  className,
  ...props
}: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn("flex flex-row items-center gap-1", className)}
      {...props}
    />
  )
}

function PaginationItem({ ...props }: React.ComponentProps<"li">) {
  return <li data-slot="pagination-item" {...props} />
}

type PaginationLinkProps = {
  isActive?: boolean
} & Pick<React.ComponentProps<typeof Button>, "size"> &
  React.ComponentProps<"a">

function PaginationLink({
  className,
  isActive,
  size = "icon",
  ...props
}: PaginationLinkProps) {
  return (
    <a
      aria-current={isActive ? "page" : undefined}
      data-slot="pagination-link"
      data-active={isActive}
      className={cn(
        buttonVariants({
          variant: isActive ? "outline" : "ghost",
          size,
        }),
        className
      )}
      {...props}
    />
  )
}

function PaginationPrevious({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      size="default"
      className={cn("gap-1 px-2.5 sm:pl-2.5", className)}
      {...props}
    >
      <ChevronLeftIcon />
      <span className="hidden sm:block">Previous</span>
    </PaginationLink>
  )
}

function PaginationNext({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      size="default"
      className={cn("gap-1 px-2.5 sm:pr-2.5", className)}
      {...props}
    >
      <span className="hidden sm:block">Next</span>
      <ChevronRightIcon />
    </PaginationLink>
  )
}

function PaginationEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn("flex size-9 items-center justify-center", className)}
      {...props}
    >
      <MoreHorizontalIcon className="size-4" />
      <span className="sr-only">More pages</span>
    </span>
  )
}

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
}

```

---

## components\ui\popover.tsx

```typescript
"use client"

import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"

import { cn } from "@/lib/utils"

function Popover({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Root>) {
  return <PopoverPrimitive.Root data-slot="popover" {...props} />
}

function PopoverTrigger({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Trigger>) {
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />
}

function PopoverContent({
  className,
  align = "center",
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Content>) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        data-slot="popover-content"
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 origin-(--radix-popover-content-transform-origin) rounded-md border p-4 shadow-md outline-hidden",
          className
        )}
        {...props}
      />
    </PopoverPrimitive.Portal>
  )
}

function PopoverAnchor({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Anchor>) {
  return <PopoverPrimitive.Anchor data-slot="popover-anchor" {...props} />
}

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor }

```

---

## components\ui\progress.tsx

```typescript
"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

function Progress({
  className,
  value,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root>) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        "bg-primary/20 relative h-2 w-full overflow-hidden rounded-full",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className="bg-primary h-full w-full flex-1 transition-all"
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  )
}

export { Progress }

```

---

## components\ui\radio-group.tsx

```typescript
"use client"

import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { CircleIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function RadioGroup({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      className={cn("grid gap-3", className)}
      {...props}
    />
  )
}

function RadioGroupItem({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      className={cn(
        "border-input text-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 aspect-square size-4 shrink-0 rounded-full border shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="relative flex items-center justify-center"
      >
        <CircleIcon className="fill-primary absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
}

export { RadioGroup, RadioGroupItem }

```

---

## components\ui\resizable.tsx

```typescript
"use client"

import * as React from "react"
import { GripVerticalIcon } from "lucide-react"
import * as ResizablePrimitive from "react-resizable-panels"

import { cn } from "@/lib/utils"

function ResizablePanelGroup({
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelGroup>) {
  return (
    <ResizablePrimitive.PanelGroup
      data-slot="resizable-panel-group"
      className={cn(
        "flex h-full w-full data-[panel-group-direction=vertical]:flex-col",
        className
      )}
      {...props}
    />
  )
}

function ResizablePanel({
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.Panel>) {
  return <ResizablePrimitive.Panel data-slot="resizable-panel" {...props} />
}

function ResizableHandle({
  withHandle,
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelResizeHandle> & {
  withHandle?: boolean
}) {
  return (
    <ResizablePrimitive.PanelResizeHandle
      data-slot="resizable-handle"
      className={cn(
        "bg-border focus-visible:ring-ring relative flex w-px items-center justify-center after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:ring-1 focus-visible:ring-offset-1 focus-visible:outline-hidden data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:translate-x-0 data-[panel-group-direction=vertical]:after:-translate-y-1/2 [&[data-panel-group-direction=vertical]>div]:rotate-90",
        className
      )}
      {...props}
    >
      {withHandle && (
        <div className="bg-border z-10 flex h-4 w-3 items-center justify-center rounded-xs border">
          <GripVerticalIcon className="size-2.5" />
        </div>
      )}
    </ResizablePrimitive.PanelResizeHandle>
  )
}

export { ResizablePanelGroup, ResizablePanel, ResizableHandle }

```

---

## components\ui\scroll-area.tsx

```typescript
"use client"

import * as React from "react"
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area"

import { cn } from "@/lib/utils"

function ScrollArea({
  className,
  children,
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.Root>) {
  return (
    <ScrollAreaPrimitive.Root
      data-slot="scroll-area"
      className={cn("relative", className)}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport
        data-slot="scroll-area-viewport"
        className="focus-visible:ring-ring/50 size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:outline-1"
      >
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  )
}

function ScrollBar({
  className,
  orientation = "vertical",
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>) {
  return (
    <ScrollAreaPrimitive.ScrollAreaScrollbar
      data-slot="scroll-area-scrollbar"
      orientation={orientation}
      className={cn(
        "flex touch-none p-px transition-colors select-none",
        orientation === "vertical" &&
          "h-full w-2.5 border-l border-l-transparent",
        orientation === "horizontal" &&
          "h-2.5 flex-col border-t border-t-transparent",
        className
      )}
      {...props}
    >
      <ScrollAreaPrimitive.ScrollAreaThumb
        data-slot="scroll-area-thumb"
        className="bg-border relative flex-1 rounded-full"
      />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
  )
}

export { ScrollArea, ScrollBar }

```

---

## components\ui\select.tsx

```typescript
"use client"

import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function Select({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Root>) {
  return <SelectPrimitive.Root data-slot="select" {...props} />
}

function SelectGroup({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Group>) {
  return <SelectPrimitive.Group data-slot="select-group" {...props} />
}

function SelectValue({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Value>) {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />
}

function SelectTrigger({
  className,
  size = "default",
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger> & {
  size?: "sm" | "default"
}) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      className={cn(
        "border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex w-fit items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDownIcon className="size-4 opacity-50" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
}

function SelectContent({
  className,
  children,
  position = "popper",
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        className={cn(
          "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border shadow-md",
          position === "popper" &&
            "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
          className
        )}
        position={position}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          className={cn(
            "p-1",
            position === "popper" &&
              "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1"
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
}

function SelectLabel({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Label>) {
  return (
    <SelectPrimitive.Label
      data-slot="select-label"
      className={cn("text-muted-foreground px-2 py-1.5 text-xs", className)}
      {...props}
    />
  )
}

function SelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
        className
      )}
      {...props}
    >
      <span className="absolute right-2 flex size-3.5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <CheckIcon className="size-4" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
}

function SelectSeparator({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Separator>) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn("bg-border pointer-events-none -mx-1 my-1 h-px", className)}
      {...props}
    />
  )
}

function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
  return (
    <SelectPrimitive.ScrollUpButton
      data-slot="select-scroll-up-button"
      className={cn(
        "flex cursor-default items-center justify-center py-1",
        className
      )}
      {...props}
    >
      <ChevronUpIcon className="size-4" />
    </SelectPrimitive.ScrollUpButton>
  )
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
  return (
    <SelectPrimitive.ScrollDownButton
      data-slot="select-scroll-down-button"
      className={cn(
        "flex cursor-default items-center justify-center py-1",
        className
      )}
      {...props}
    >
      <ChevronDownIcon className="size-4" />
    </SelectPrimitive.ScrollDownButton>
  )
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
}

```

---

## components\ui\separator.tsx

```typescript
"use client"

import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"

import { cn } from "@/lib/utils"

function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root>) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        className
      )}
      {...props}
    />
  )
}

export { Separator }

```

---

## components\ui\sheet.tsx

```typescript
"use client"

import * as React from "react"
import * as SheetPrimitive from "@radix-ui/react-dialog"
import { XIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function Sheet({ ...props }: React.ComponentProps<typeof SheetPrimitive.Root>) {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />
}

function SheetTrigger({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Trigger>) {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />
}

function SheetClose({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Close>) {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />
}

function SheetPortal({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Portal>) {
  return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />
}

function SheetOverlay({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Overlay>) {
  return (
    <SheetPrimitive.Overlay
      data-slot="sheet-overlay"
      className={cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      )}
      {...props}
    />
  )
}

function SheetContent({
  className,
  children,
  side = "right",
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Content> & {
  side?: "top" | "right" | "bottom" | "left"
}) {
  return (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Content
        data-slot="sheet-content"
        className={cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out fixed z-50 flex flex-col gap-4 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
          side === "right" &&
            "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm",
          side === "left" &&
            "data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",
          side === "top" &&
            "data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 h-auto border-b",
          side === "bottom" &&
            "data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 h-auto border-t",
          className
        )}
        {...props}
      >
        {children}
        <SheetPrimitive.Close className="ring-offset-background focus:ring-ring data-[state=open]:bg-secondary absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none">
          <XIcon className="size-4" />
          <span className="sr-only">Close</span>
        </SheetPrimitive.Close>
      </SheetPrimitive.Content>
    </SheetPortal>
  )
}

function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-header"
      className={cn("flex flex-col gap-1.5 p-4", className)}
      {...props}
    />
  )
}

function SheetFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-footer"
      className={cn("mt-auto flex flex-col gap-2 p-4", className)}
      {...props}
    />
  )
}

function SheetTitle({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Title>) {
  return (
    <SheetPrimitive.Title
      data-slot="sheet-title"
      className={cn("text-foreground font-semibold", className)}
      {...props}
    />
  )
}

function SheetDescription({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Description>) {
  return (
    <SheetPrimitive.Description
      data-slot="sheet-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
}

```

---

## components\ui\sidebar.tsx

```typescript
"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, VariantProps } from "class-variance-authority"
import { PanelLeftIcon } from "lucide-react"

import { useIsMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const SIDEBAR_COOKIE_NAME = "sidebar_state"
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7
const SIDEBAR_WIDTH = "16rem"
const SIDEBAR_WIDTH_MOBILE = "18rem"
const SIDEBAR_WIDTH_ICON = "3rem"
const SIDEBAR_KEYBOARD_SHORTCUT = "b"

type SidebarContextProps = {
  state: "expanded" | "collapsed"
  open: boolean
  setOpen: (open: boolean) => void
  openMobile: boolean
  setOpenMobile: (open: boolean) => void
  isMobile: boolean
  toggleSidebar: () => void
}

const SidebarContext = React.createContext<SidebarContextProps | null>(null)

function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.")
  }

  return context
}

function SidebarProvider({
  defaultOpen = true,
  open: openProp,
  onOpenChange: setOpenProp,
  className,
  style,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
}) {
  const isMobile = useIsMobile()
  const [openMobile, setOpenMobile] = React.useState(false)

  // This is the internal state of the sidebar.
  // We use openProp and setOpenProp for control from outside the component.
  const [_open, _setOpen] = React.useState(defaultOpen)
  const open = openProp ?? _open
  const setOpen = React.useCallback(
    (value: boolean | ((value: boolean) => boolean)) => {
      const openState = typeof value === "function" ? value(open) : value
      if (setOpenProp) {
        setOpenProp(openState)
      } else {
        _setOpen(openState)
      }

      // This sets the cookie to keep the sidebar state.
      document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}; Secure`
    },
    [setOpenProp, open]
  )

  // Helper to toggle the sidebar.
  const toggleSidebar = React.useCallback(() => {
    return isMobile ? setOpenMobile((open) => !open) : setOpen((open) => !open)
  }, [isMobile, setOpen, setOpenMobile])

  // Adds a keyboard shortcut to toggle the sidebar.
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
        (event.metaKey || event.ctrlKey)
      ) {
        event.preventDefault()
        toggleSidebar()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [toggleSidebar])

  // We add a state so that we can do data-state="expanded" or "collapsed".
  // This makes it easier to style the sidebar with Tailwind classes.
  const state = open ? "expanded" : "collapsed"

  const contextValue = React.useMemo<SidebarContextProps>(
    () => ({
      state,
      open,
      setOpen,
      isMobile,
      openMobile,
      setOpenMobile,
      toggleSidebar,
    }),
    [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar]
  )

  return (
    <SidebarContext.Provider value={contextValue}>
      <TooltipProvider delayDuration={0}>
        <div
          data-slot="sidebar-wrapper"
          style={
            {
              "--sidebar-width": SIDEBAR_WIDTH,
              "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
              ...style,
            } as React.CSSProperties
          }
          className={cn(
            "group/sidebar-wrapper has-data-[variant=inset]:bg-sidebar flex min-h-svh w-full",
            className
          )}
          {...props}
        >
          {children}
        </div>
      </TooltipProvider>
    </SidebarContext.Provider>
  )
}

function Sidebar({
  side = "left",
  variant = "sidebar",
  collapsible = "offcanvas",
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  side?: "left" | "right"
  variant?: "sidebar" | "floating" | "inset"
  collapsible?: "offcanvas" | "icon" | "none"
}) {
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar()

  if (collapsible === "none") {
    return (
      <div
        data-slot="sidebar"
        className={cn(
          "bg-sidebar text-sidebar-foreground flex h-full w-(--sidebar-width) flex-col",
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }

  if (isMobile) {
    return (
      <Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
        <SheetContent
          data-sidebar="sidebar"
          data-slot="sidebar"
          data-mobile="true"
          className="bg-sidebar text-sidebar-foreground w-(--sidebar-width) p-0 [&>button]:hidden"
          style={
            {
              "--sidebar-width": SIDEBAR_WIDTH_MOBILE,
            } as React.CSSProperties
          }
          side={side}
        >
          <SheetHeader className="sr-only">
            <SheetTitle>Sidebar</SheetTitle>
            <SheetDescription>Displays the mobile sidebar.</SheetDescription>
          </SheetHeader>
          <div className="flex h-full w-full flex-col">{children}</div>
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <div
      className="group peer text-sidebar-foreground hidden md:block"
      data-state={state}
      data-collapsible={state === "collapsed" ? collapsible : ""}
      data-variant={variant}
      data-side={side}
      data-slot="sidebar"
    >
      {/* This is what handles the sidebar gap on desktop */}
      <div
        data-slot="sidebar-gap"
        className={cn(
          "relative w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear",
          "group-data-[collapsible=offcanvas]:w-0",
          "group-data-[side=right]:rotate-180",
          variant === "floating" || variant === "inset"
            ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]"
            : "group-data-[collapsible=icon]:w-(--sidebar-width-icon)"
        )}
      />
      <div
        data-slot="sidebar-container"
        className={cn(
          "fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear md:flex",
          side === "left"
            ? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]"
            : "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
          // Adjust the padding for floating and inset variants.
          variant === "floating" || variant === "inset"
            ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]"
            : "group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l",
          className
        )}
        {...props}
      >
        <div
          data-sidebar="sidebar"
          data-slot="sidebar-inner"
          className="bg-sidebar group-data-[variant=floating]:border-sidebar-border flex h-full w-full flex-col group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:shadow-sm"
        >
          {children}
        </div>
      </div>
    </div>
  )
}

function SidebarTrigger({
  className,
  onClick,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { toggleSidebar } = useSidebar()

  return (
    <Button
      data-sidebar="trigger"
      data-slot="sidebar-trigger"
      variant="ghost"
      size="icon"
      className={cn("size-7", className)}
      onClick={(event) => {
        onClick?.(event)
        toggleSidebar()
      }}
      {...props}
    >
      <PanelLeftIcon />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  )
}

function SidebarRail({ className, ...props }: React.ComponentProps<"button">) {
  const { toggleSidebar } = useSidebar()

  return (
    <button
      data-sidebar="rail"
      data-slot="sidebar-rail"
      aria-label="Toggle Sidebar"
      tabIndex={-1}
      onClick={toggleSidebar}
      title="Toggle Sidebar"
      className={cn(
        "hover:after:bg-sidebar-border absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear group-data-[side=left]:-right-4 group-data-[side=right]:left-0 after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] sm:flex",
        "in-data-[side=left]:cursor-w-resize in-data-[side=right]:cursor-e-resize",
        "[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize",
        "hover:group-data-[collapsible=offcanvas]:bg-sidebar group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full",
        "[[data-side=left][data-collapsible=offcanvas]_&]:-right-2",
        "[[data-side=right][data-collapsible=offcanvas]_&]:-left-2",
        className
      )}
      {...props}
    />
  )
}

function SidebarInset({ className, ...props }: React.ComponentProps<"main">) {
  return (
    <main
      data-slot="sidebar-inset"
      className={cn(
        "bg-background relative flex w-full flex-1 flex-col",
        "md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2",
        className
      )}
      {...props}
    />
  )
}

function SidebarInput({
  className,
  ...props
}: React.ComponentProps<typeof Input>) {
  return (
    <Input
      data-slot="sidebar-input"
      data-sidebar="input"
      className={cn("bg-background h-8 w-full shadow-none", className)}
      {...props}
    />
  )
}

function SidebarHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-header"
      data-sidebar="header"
      className={cn("flex flex-col gap-2 p-2", className)}
      {...props}
    />
  )
}

function SidebarFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-footer"
      data-sidebar="footer"
      className={cn("flex flex-col gap-2 p-2", className)}
      {...props}
    />
  )
}

function SidebarSeparator({
  className,
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="sidebar-separator"
      data-sidebar="separator"
      className={cn("bg-sidebar-border mx-2 w-auto", className)}
      {...props}
    />
  )
}

function SidebarContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-content"
      data-sidebar="content"
      className={cn(
        "flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden",
        className
      )}
      {...props}
    />
  )
}

function SidebarGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-group"
      data-sidebar="group"
      className={cn("relative flex w-full min-w-0 flex-col p-2", className)}
      {...props}
    />
  )
}

function SidebarGroupLabel({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<"div"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "div"

  return (
    <Comp
      data-slot="sidebar-group-label"
      data-sidebar="group-label"
      className={cn(
        "text-sidebar-foreground/70 ring-sidebar-ring flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium outline-hidden transition-[margin,opacity] duration-200 ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        "group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0",
        className
      )}
      {...props}
    />
  )
}

function SidebarGroupAction({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="sidebar-group-action"
      data-sidebar="group-action"
      className={cn(
        "text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground absolute top-3.5 right-3 flex aspect-square w-5 items-center justify-center rounded-md p-0 outline-hidden transition-transform focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        // Increases the hit area of the button on mobile.
        "after:absolute after:-inset-2 md:after:hidden",
        "group-data-[collapsible=icon]:hidden",
        className
      )}
      {...props}
    />
  )
}

function SidebarGroupContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-group-content"
      data-sidebar="group-content"
      className={cn("w-full text-sm", className)}
      {...props}
    />
  )
}

function SidebarMenu({ className, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="sidebar-menu"
      data-sidebar="menu"
      className={cn("flex w-full min-w-0 flex-col gap-1", className)}
      {...props}
    />
  )
}

function SidebarMenuItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="sidebar-menu-item"
      data-sidebar="menu-item"
      className={cn("group/menu-item relative", className)}
      {...props}
    />
  )
}

const sidebarMenuButtonVariants = cva(
  "peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-hidden ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-data-[sidebar=menu-action]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        outline:
          "bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]",
      },
      size: {
        default: "h-8 text-sm",
        sm: "h-7 text-xs",
        lg: "h-12 text-sm group-data-[collapsible=icon]:p-0!",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function SidebarMenuButton({
  asChild = false,
  isActive = false,
  variant = "default",
  size = "default",
  tooltip,
  className,
  ...props
}: React.ComponentProps<"button"> & {
  asChild?: boolean
  isActive?: boolean
  tooltip?: string | React.ComponentProps<typeof TooltipContent>
} & VariantProps<typeof sidebarMenuButtonVariants>) {
  const Comp = asChild ? Slot : "button"
  const { isMobile, state } = useSidebar()

  const button = (
    <Comp
      data-slot="sidebar-menu-button"
      data-sidebar="menu-button"
      data-size={size}
      data-active={isActive}
      className={cn(sidebarMenuButtonVariants({ variant, size }), className)}
      {...props}
    />
  )

  if (!tooltip) {
    return button
  }

  if (typeof tooltip === "string") {
    tooltip = {
      children: tooltip,
    }
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>{button}</TooltipTrigger>
      <TooltipContent
        side="right"
        align="center"
        hidden={state !== "collapsed" || isMobile}
        {...tooltip}
      />
    </Tooltip>
  )
}

function SidebarMenuAction({
  className,
  asChild = false,
  showOnHover = false,
  ...props
}: React.ComponentProps<"button"> & {
  asChild?: boolean
  showOnHover?: boolean
}) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="sidebar-menu-action"
      data-sidebar="menu-action"
      className={cn(
        "text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground peer-hover/menu-button:text-sidebar-accent-foreground absolute top-1.5 right-1 flex aspect-square w-5 items-center justify-center rounded-md p-0 outline-hidden transition-transform focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        // Increases the hit area of the button on mobile.
        "after:absolute after:-inset-2 md:after:hidden",
        "peer-data-[size=sm]/menu-button:top-1",
        "peer-data-[size=default]/menu-button:top-1.5",
        "peer-data-[size=lg]/menu-button:top-2.5",
        "group-data-[collapsible=icon]:hidden",
        showOnHover &&
          "peer-data-[active=true]/menu-button:text-sidebar-accent-foreground group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 md:opacity-0",
        className
      )}
      {...props}
    />
  )
}

function SidebarMenuBadge({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-menu-badge"
      data-sidebar="menu-badge"
      className={cn(
        "text-sidebar-foreground pointer-events-none absolute right-1 flex h-5 min-w-5 items-center justify-center rounded-md px-1 text-xs font-medium tabular-nums select-none",
        "peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[active=true]/menu-button:text-sidebar-accent-foreground",
        "peer-data-[size=sm]/menu-button:top-1",
        "peer-data-[size=default]/menu-button:top-1.5",
        "peer-data-[size=lg]/menu-button:top-2.5",
        "group-data-[collapsible=icon]:hidden",
        className
      )}
      {...props}
    />
  )
}

function SidebarMenuSkeleton({
  className,
  showIcon = false,
  ...props
}: React.ComponentProps<"div"> & {
  showIcon?: boolean
}) {
  // Random width between 50 to 90%.
  const width = React.useMemo(() => {
    return `${Math.floor(Math.random() * 40) + 50}%`
  }, [])

  return (
    <div
      data-slot="sidebar-menu-skeleton"
      data-sidebar="menu-skeleton"
      className={cn("flex h-8 items-center gap-2 rounded-md px-2", className)}
      {...props}
    >
      {showIcon && (
        <Skeleton
          className="size-4 rounded-md"
          data-sidebar="menu-skeleton-icon"
        />
      )}
      <Skeleton
        className="h-4 max-w-(--skeleton-width) flex-1"
        data-sidebar="menu-skeleton-text"
        style={
          {
            "--skeleton-width": width,
          } as React.CSSProperties
        }
      />
    </div>
  )
}

function SidebarMenuSub({ className, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="sidebar-menu-sub"
      data-sidebar="menu-sub"
      className={cn(
        "border-sidebar-border mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l px-2.5 py-0.5",
        "group-data-[collapsible=icon]:hidden",
        className
      )}
      {...props}
    />
  )
}

function SidebarMenuSubItem({
  className,
  ...props
}: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="sidebar-menu-sub-item"
      data-sidebar="menu-sub-item"
      className={cn("group/menu-sub-item relative", className)}
      {...props}
    />
  )
}

function SidebarMenuSubButton({
  asChild = false,
  size = "md",
  isActive = false,
  className,
  ...props
}: React.ComponentProps<"a"> & {
  asChild?: boolean
  size?: "sm" | "md"
  isActive?: boolean
}) {
  const Comp = asChild ? Slot : "a"

  return (
    <Comp
      data-slot="sidebar-menu-sub-button"
      data-sidebar="menu-sub-button"
      data-size={size}
      data-active={isActive}
      className={cn(
        "text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground active:bg-sidebar-accent active:text-sidebar-accent-foreground [&>svg]:text-sidebar-accent-foreground flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 outline-hidden focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
        "data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground",
        size === "sm" && "text-xs",
        size === "md" && "text-sm",
        "group-data-[collapsible=icon]:hidden",
        className
      )}
      {...props}
    />
  )
}

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
}

```

---

## components\ui\skeleton.tsx

```typescript
import { cn } from "@/lib/utils"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-accent animate-pulse rounded-md", className)}
      {...props}
    />
  )
}

export { Skeleton }

```

---

## components\ui\slider.tsx

```typescript
"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  ...props
}: React.ComponentProps<typeof SliderPrimitive.Root>) {
  const _values = React.useMemo(
    () =>
      Array.isArray(value)
        ? value
        : Array.isArray(defaultValue)
          ? defaultValue
          : [min, max],
    [value, defaultValue, min, max]
  )

  return (
    <SliderPrimitive.Root
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      className={cn(
        "relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
        className
      )}
      {...props}
    >
      <SliderPrimitive.Track
        data-slot="slider-track"
        className={cn(
          "bg-muted relative grow overflow-hidden rounded-full data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5"
        )}
      >
        <SliderPrimitive.Range
          data-slot="slider-range"
          className={cn(
            "bg-primary absolute data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full"
          )}
        />
      </SliderPrimitive.Track>
      {Array.from({ length: _values.length }, (_, index) => (
        <SliderPrimitive.Thumb
          data-slot="slider-thumb"
          key={index}
          className="border-primary bg-background ring-ring/50 block size-4 shrink-0 rounded-full border shadow-sm transition-[color,box-shadow] hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50"
        />
      ))}
    </SliderPrimitive.Root>
  )
}

export { Slider }

```

---

## components\ui\sonner.tsx

```typescript
"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }

```

---

## components\ui\switch.tsx

```typescript
"use client"

import * as React from "react"
import * as SwitchPrimitive from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "peer data-[state=checked]:bg-primary data-[state=unchecked]:bg-input focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-input/80 inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "bg-background dark:data-[state=unchecked]:bg-foreground dark:data-[state=checked]:bg-primary-foreground pointer-events-none block size-4 rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0"
        )}
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }

```

---

## components\ui\table.tsx

```typescript
"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

function Table({ className, ...props }: React.ComponentProps<"table">) {
  return (
    <div
      data-slot="table-container"
      className="relative w-full overflow-x-auto"
    >
      <table
        data-slot="table"
        className={cn("w-full caption-bottom text-sm", className)}
        {...props}
      />
    </div>
  )
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return (
    <thead
      data-slot="table-header"
      className={cn("[&_tr]:border-b", className)}
      {...props}
    />
  )
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return (
    <tbody
      data-slot="table-body"
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  )
}

function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(
        "bg-muted/50 border-t font-medium [&>tr]:last:border-b-0",
        className
      )}
      {...props}
    />
  )
}

function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        "hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors",
        className
      )}
      {...props}
    />
  )
}

function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        "text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      )}
      {...props}
    />
  )
}

function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        "p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      )}
      {...props}
    />
  )
}

function TableCaption({
  className,
  ...props
}: React.ComponentProps<"caption">) {
  return (
    <caption
      data-slot="table-caption"
      className={cn("text-muted-foreground mt-4 text-sm", className)}
      {...props}
    />
  )
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}

```

---

## components\ui\tabs.tsx

```typescript
"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"

function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  )
}

function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        "bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]",
        className
      )}
      {...props}
    />
  )
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  )
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 outline-none", className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }

```

---

## components\ui\textarea.tsx

```typescript
import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }

```

---

## components\ui\toast.tsx

```typescript
"use client"

import * as React from "react"
import * as ToastPrimitives from "@radix-ui/react-toast"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

const ToastProvider = ToastPrimitives.Provider

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={cn(
      "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
      className
    )}
    {...props}
  />
))
ToastViewport.displayName = ToastPrimitives.Viewport.displayName

const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-2 overflow-hidden rounded-md border p-4 pr-6 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default: "border bg-background text-foreground",
        destructive:
          "destructive group border-destructive bg-destructive text-destructive-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> &
  VariantProps<typeof toastVariants>
>(({ className, variant, ...props }, ref) => {
  return (
    <ToastPrimitives.Root
      ref={ref}
      className={cn(toastVariants({ variant }), className)}
      {...props}
    />
  )
})
Toast.displayName = ToastPrimitives.Root.displayName

const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Action
    ref={ref}
    className={cn(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium transition-colors hover:bg-secondary focus:outline-none focus:ring-1 focus:ring-ring disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive",
      className
    )}
    {...props}
  />
))
ToastAction.displayName = ToastPrimitives.Action.displayName

const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    className={cn(
      "absolute right-1 top-1 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-1 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",
      className
    )}
    toast-close=""
    {...props}
  >
    <X className="h-4 w-4" />
  </ToastPrimitives.Close>
))
ToastClose.displayName = ToastPrimitives.Close.displayName

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Title
    ref={ref}
    className={cn("text-sm font-semibold [&+div]:text-xs", className)}
    {...props}
  />
))
ToastTitle.displayName = ToastPrimitives.Title.displayName

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Description
    ref={ref}
    className={cn("text-sm opacity-90", className)}
    {...props}
  />
))
ToastDescription.displayName = ToastPrimitives.Description.displayName

type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>

type ToastActionElement = React.ReactElement<typeof ToastAction>

export {
  type ToastProps,
  type ToastActionElement,
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
}
```

---

## components\ui\toaster.tsx

```typescript
"use client"

import { useToast } from "@/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
```

---

## components\ui\toggle-group.tsx

```typescript
"use client"

import * as React from "react"
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group"
import { type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { toggleVariants } from "@/components/ui/toggle"

const ToggleGroupContext = React.createContext<
  VariantProps<typeof toggleVariants>
>({
  size: "default",
  variant: "default",
})

function ToggleGroup({
  className,
  variant,
  size,
  children,
  ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Root> &
  VariantProps<typeof toggleVariants>) {
  return (
    <ToggleGroupPrimitive.Root
      data-slot="toggle-group"
      data-variant={variant}
      data-size={size}
      className={cn(
        "group/toggle-group flex w-fit items-center rounded-md data-[variant=outline]:shadow-xs",
        className
      )}
      {...props}
    >
      <ToggleGroupContext.Provider value={{ variant, size }}>
        {children}
      </ToggleGroupContext.Provider>
    </ToggleGroupPrimitive.Root>
  )
}

function ToggleGroupItem({
  className,
  children,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Item> &
  VariantProps<typeof toggleVariants>) {
  const context = React.useContext(ToggleGroupContext)

  return (
    <ToggleGroupPrimitive.Item
      data-slot="toggle-group-item"
      data-variant={context.variant || variant}
      data-size={context.size || size}
      className={cn(
        toggleVariants({
          variant: context.variant || variant,
          size: context.size || size,
        }),
        "min-w-0 flex-1 shrink-0 rounded-none shadow-none first:rounded-l-md last:rounded-r-md focus:z-10 focus-visible:z-10 data-[variant=outline]:border-l-0 data-[variant=outline]:first:border-l",
        className
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  )
}

export { ToggleGroup, ToggleGroupItem }

```

---

## components\ui\toggle.tsx

```typescript
"use client"

import * as React from "react"
import * as TogglePrimitive from "@radix-ui/react-toggle"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const toggleVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium hover:bg-muted hover:text-muted-foreground disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none transition-[color,box-shadow] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive whitespace-nowrap",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline:
          "border border-input bg-transparent shadow-xs hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-9 px-2 min-w-9",
        sm: "h-8 px-1.5 min-w-8",
        lg: "h-10 px-2.5 min-w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Toggle({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof TogglePrimitive.Root> &
  VariantProps<typeof toggleVariants>) {
  return (
    <TogglePrimitive.Root
      data-slot="toggle"
      className={cn(toggleVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Toggle, toggleVariants }

```

---

## components\ui\tooltip.tsx

```typescript
"use client"

import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"

import { cn } from "@/lib/utils"

function TooltipProvider({
  delayDuration = 0,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delayDuration={delayDuration}
      {...props}
    />
  )
}

function Tooltip({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  return (
    <TooltipProvider>
      <TooltipPrimitive.Root data-slot="tooltip" {...props} />
    </TooltipProvider>
  )
}

function TooltipTrigger({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />
}

function TooltipContent({
  className,
  sideOffset = 0,
  children,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Content>) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        className={cn(
          "bg-primary text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-md px-3 py-1.5 text-xs text-balance",
          className
        )}
        {...props}
      >
        {children}
        <TooltipPrimitive.Arrow className="bg-primary fill-primary z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]" />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  )
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }

```

---

## hooks\use-mobile.ts

```typescript
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}

```

---

## hooks\use-toast.ts

```typescript
"use client"

// Inspired by react-hot-toast library
import * as React from "react"

import type {
  ToastActionElement,
  ToastProps,
} from "@/components/ui/toast"

const TOAST_LIMIT = 1
const TOAST_REMOVE_DELAY = 1000000

type ToasterToast = ToastProps & {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
}

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const

let count = 0

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

type ActionType = typeof actionTypes

type Action =
  | {
    type: ActionType["ADD_TOAST"]
    toast: ToasterToast
  }
  | {
    type: ActionType["UPDATE_TOAST"]
    toast: Partial<ToasterToast>
  }
  | {
    type: ActionType["DISMISS_TOAST"]
    toastId?: ToasterToast["id"]
  }
  | {
    type: ActionType["REMOVE_TOAST"]
    toastId?: ToasterToast["id"]
  }

interface State {
  toasts: ToasterToast[]
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

const addToRemoveQueue = (toastId: string) => {
  if (toastTimeouts.has(toastId)) {
    return
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId)
    dispatch({
      type: "REMOVE_TOAST",
      toastId: toastId,
    })
  }, TOAST_REMOVE_DELAY)

  toastTimeouts.set(toastId, timeout)
}

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      }

    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      }

    case "DISMISS_TOAST": {
      const { toastId } = action

      // ! Side effects ! - This could be extracted into a dismissToast() action,
      // but I'll keep it here for simplicity
      if (toastId) {
        addToRemoveQueue(toastId)
      } else {
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id)
        })
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
              ...t,
              open: false,
            }
            : t
        ),
      }
    }
    case "REMOVE_TOAST":
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        }
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      }
  }
}

const listeners: Array<(state: State) => void> = []

let memoryState: State = { toasts: [] }

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action)
  listeners.forEach((listener) => {
    listener(memoryState)
  })
}

type Toast = Omit<ToasterToast, "id">

function toast({ ...props }: Toast) {
  const id = genId()

  const update = (props: ToasterToast) =>
    dispatch({
      type: "UPDATE_TOAST",
      toast: { ...props, id },
    })
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id })

  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss()
      },
    },
  })

  return {
    id: id,
    dismiss,
    update,
  }
}

function useToast() {
  const [state, setState] = React.useState<State>(memoryState)

  React.useEffect(() => {
    listeners.push(setState)
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [state])

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId }),
  }
}

export { useToast, toast }
```

---

## lib\audio\chords.ts

```typescript
// Chord progression and harmony generation

import { SCALES, CHORD_PROGRESSIONS, NOTE_NAMES } from '@/types/music';
import type { Genre, Note } from '@/types/music';

// Get the frequency of a MIDI note
export function midiToFrequency(midi: number): number {
  return 440 * Math.pow(2, (midi - 69) / 12);
}

// Get MIDI note from note name and octave
export function noteToMidi(noteName: string, octave: number): number {
  const noteIndex = NOTE_NAMES.indexOf(noteName);
  if (noteIndex === -1) return 60; // Default to middle C
  return (octave + 1) * 12 + noteIndex;
}

// Get scale degrees in a key
export function getScale(rootMidi: number, scaleName: string): number[] {
  const intervals = SCALES[scaleName] || SCALES.major;
  return intervals.map(interval => rootMidi + interval);
}

// Generate chord tones from a root note
export function generateChord(
  rootMidi: number,
  chordType: 'major' | 'minor' | 'dim' | 'aug' | '7th' | 'minor7',
  octave: number = 3
): number[] {
  const root = rootMidi + (octave - 4) * 12;
  
  const chordIntervals: Record<string, number[]> = {
    major: [0, 4, 7],
    minor: [0, 3, 7],
    dim: [0, 3, 6],
    aug: [0, 4, 8],
    '7th': [0, 4, 7, 10],
    minor7: [0, 3, 7, 10],
  };
  
  const intervals = chordIntervals[chordType] || chordIntervals.major;
  return intervals.map(i => root + i);
}

// Generate a chord progression for a genre
export function generateChordProgression(
  rootMidi: number,
  genre: Genre,
  scaleName: string,
  numBars: number
): { chord: number[]; bar: number; type: string }[] {
  const progression = CHORD_PROGRESSIONS[genre] || CHORD_PROGRESSIONS.electronic;
  const scale = getScale(rootMidi, scaleName);
  
  const chords: { chord: number[]; bar: number; type: string }[] = [];
  
  for (let bar = 0; bar < numBars; bar++) {
    const progIndex = bar % progression.length;
    const [scaleDegree, modifier] = progression[progIndex];
    
    // Get the root of the chord from scale degree
    const chordRoot = scale[scaleDegree % scale.length];
    
    // Determine chord type based on scale degree and modifier
    let chordType: 'major' | 'minor' | 'dim' | '7th' = 'major';
    if (scaleName === 'minor') {
      if ([0, 3, 4].includes(scaleDegree % scale.length)) {
        chordType = 'minor';
      }
    } else {
      if ([1, 2, 5].includes(scaleDegree % scale.length)) {
        chordType = 'minor';
      }
    }
    
    if (modifier === -1) chordType = 'minor';
    if (modifier === 1) chordType = 'major';
    if (genre === 'jazz') chordType = '7th';
    
    const chordNotes = generateChord(chordRoot, chordType, 3);
    chords.push({ chord: chordNotes, bar, type: chordType });
  }
  
  return chords;
}

// Generate harmony notes (pad/synth chords)
export function generateHarmonyNotes(
  chords: { chord: number[]; bar: number; type: string }[],
  beatsPerBar: number,
  bpm: number
): Note[] {
  const notes: Note[] = [];
  const beatDuration = 60 / bpm;
  
  for (const { chord, bar } of chords) {
    const startTime = bar * beatsPerBar * beatDuration;
    const duration = beatsPerBar * beatDuration * 0.95; // Slight gap between chords
    
    // Voice the chord across multiple octaves for richness
    for (const noteMidi of chord) {
      notes.push({
        pitch: noteMidi,
        velocity: 60,
        startTime,
        duration,
      });
      // Add octave doubling
      notes.push({
        pitch: noteMidi + 12,
        velocity: 50,
        startTime,
        duration,
      });
    }
  }
  
  return notes;
}

// Generate bass line following chord progression
export function generateBassNotes(
  chords: { chord: number[]; bar: number; type: string }[],
  beatsPerBar: number,
  bpm: number,
  genre: Genre
): Note[] {
  const notes: Note[] = [];
  const beatDuration = 60 / bpm;
  
  for (const { chord, bar } of chords) {
    const rootNote = chord[0] - 12; // Drop down an octave
    const startTime = bar * beatsPerBar * beatDuration;
    
    // Different bass patterns by genre
    if (genre === 'electronic' || genre === 'hiphop') {
      // Four-on-the-floor or eighth notes
      for (let beat = 0; beat < beatsPerBar; beat++) {
        notes.push({
          pitch: rootNote,
          velocity: 100,
          startTime: startTime + beat * beatDuration,
          duration: beatDuration * 0.8,
        });
      }
    } else if (genre === 'rock') {
      // Root on 1 and 3
      notes.push({
        pitch: rootNote,
        velocity: 110,
        startTime,
        duration: beatDuration * 0.9,
      });
      notes.push({
        pitch: rootNote,
        velocity: 100,
        startTime: startTime + 2 * beatDuration,
        duration: beatDuration * 0.9,
      });
      // Fifth on 2 and 4
      notes.push({
        pitch: rootNote + 7,
        velocity: 80,
        startTime: startTime + 1 * beatDuration,
        duration: beatDuration * 0.8,
      });
      notes.push({
        pitch: rootNote + 7,
        velocity: 80,
        startTime: startTime + 3 * beatDuration,
        duration: beatDuration * 0.8,
      });
    } else if (genre === 'jazz') {
      // Walking bass
      const walkPattern = [0, 4, 7, 11]; // Root, third, fifth, seventh
      for (let beat = 0; beat < beatsPerBar; beat++) {
        const noteOffset = walkPattern[beat % walkPattern.length];
        notes.push({
          pitch: rootNote + noteOffset,
          velocity: 80 + Math.random() * 20,
          startTime: startTime + beat * beatDuration,
          duration: beatDuration * 0.9,
        });
      }
    } else {
      // Ambient - sustained notes
      notes.push({
        pitch: rootNote,
        velocity: 70,
        startTime,
        duration: beatsPerBar * beatDuration * 0.95,
      });
    }
  }
  
  return notes;
}

// Get chord name for display
export function getChordName(rootMidi: number, type: string): string {
  const noteName = NOTE_NAMES[rootMidi % 12];
  const suffix: Record<string, string> = {
    major: '',
    minor: 'm',
    dim: '°',
    aug: '+',
    '7th': '7',
    minor7: 'm7',
  };
  return noteName + (suffix[type] || '');
}

```

---

## lib\audio\drums.ts

```typescript
// Drum pattern generation for different genres

import type { Genre, Note } from '@/types/music';

// Drum MIDI note mapping (General MIDI standard)
export const DRUM_MIDI = {
  kick: 36,
  snare: 38,
  hihatClosed: 42,
  hihatOpen: 46,
  tomHigh: 50,
  tomMid: 48,
  tomLow: 45,
  crash: 49,
  ride: 51,
  clap: 39,
  rimshot: 37,
};

// Drum pattern definitions
interface DrumPattern {
  step: number;
  drum: keyof typeof DRUM_MIDI;
  velocity: number;
}

// Basic drum patterns by genre
const DRUM_PATTERNS: Record<Genre, DrumPattern[]> = {
  electronic: [
    // Kick on 1 and 3
    { step: 0, drum: 'kick', velocity: 127 },
    { step: 2, drum: 'kick', velocity: 127 },
    { step: 4, drum: 'kick', velocity: 127 },
    { step: 6, drum: 'kick', velocity: 127 },
    // Snare on 2 and 4
    { step: 2, drum: 'snare', velocity: 100 },
    { step: 6, drum: 'snare', velocity: 100 },
    // Hi-hats on every beat
    { step: 0, drum: 'hihatClosed', velocity: 70 },
    { step: 1, drum: 'hihatClosed', velocity: 50 },
    { step: 2, drum: 'hihatClosed', velocity: 70 },
    { step: 3, drum: 'hihatClosed', velocity: 50 },
    { step: 4, drum: 'hihatClosed', velocity: 70 },
    { step: 5, drum: 'hihatClosed', velocity: 50 },
    { step: 6, drum: 'hihatClosed', velocity: 70 },
    { step: 7, drum: 'hihatClosed', velocity: 50 },
  ],
  
  hiphop: [
    // Kick pattern - more syncopated
    { step: 0, drum: 'kick', velocity: 120 },
    { step: 3, drum: 'kick', velocity: 100 },
    { step: 5, drum: 'kick', velocity: 90 },
    // Snare on 2 and 4
    { step: 2, drum: 'snare', velocity: 110 },
    { step: 6, drum: 'snare', velocity: 110 },
    // Clap layered with snare
    { step: 2, drum: 'clap', velocity: 80 },
    { step: 6, drum: 'clap', velocity: 80 },
    // Hi-hat pattern
    { step: 0, drum: 'hihatClosed', velocity: 60 },
    { step: 1, drum: 'hihatClosed', velocity: 40 },
    { step: 2, drum: 'hihatClosed', velocity: 60 },
    { step: 3, drum: 'hihatOpen', velocity: 50 },
    { step: 4, drum: 'hihatClosed', velocity: 60 },
    { step: 5, drum: 'hihatClosed', velocity: 40 },
    { step: 6, drum: 'hihatClosed', velocity: 60 },
    { step: 7, drum: 'hihatClosed', velocity: 40 },
  ],
  
  ambient: [
    // Sparse drums
    { step: 0, drum: 'kick', velocity: 60 },
    { step: 4, drum: 'hihatOpen', velocity: 40 },
    { step: 6, drum: 'ride', velocity: 30 },
  ],
  
  rock: [
    // Kick on 1 and 3, with variation
    { step: 0, drum: 'kick', velocity: 127 },
    { step: 2, drum: 'kick', velocity: 100 },
    { step: 4, drum: 'kick', velocity: 120 },
    { step: 5, drum: 'kick', velocity: 80 },
    // Snare on 2 and 4
    { step: 2, drum: 'snare', velocity: 120 },
    { step: 6, drum: 'snare', velocity: 120 },
    // Ride cymbal pattern
    { step: 0, drum: 'ride', velocity: 70 },
    { step: 2, drum: 'ride', velocity: 80 },
    { step: 4, drum: 'ride', velocity: 70 },
    { step: 6, drum: 'ride', velocity: 80 },
    // Hi-hat accents
    { step: 1, drum: 'hihatClosed', velocity: 50 },
    { step: 3, drum: 'hihatClosed', velocity: 50 },
    { step: 5, drum: 'hihatClosed', velocity: 50 },
    { step: 7, drum: 'hihatClosed', velocity: 50 },
  ],
  
  jazz: [
    // Jazz ride pattern
    { step: 0, drum: 'ride', velocity: 80 },
    { step: 2, drum: 'ride', velocity: 70 },
    { step: 3, drum: 'ride', velocity: 60 },
    { step: 4, drum: 'ride', velocity: 80 },
    { step: 6, drum: 'ride', velocity: 70 },
    // Hi-hat on 2 and 4
    { step: 2, drum: 'hihatClosed', velocity: 60 },
    { step: 6, drum: 'hihatClosed', velocity: 60 },
    // Sparse kick
    { step: 0, drum: 'kick', velocity: 60 },
    // Brush snare
    { step: 1, drum: 'snare', velocity: 40 },
    { step: 3, drum: 'snare', velocity: 40 },
    { step: 5, drum: 'snare', velocity: 40 },
    { step: 7, drum: 'snare', velocity: 40 },
  ],
};

// Generate drum notes for a track
export function generateDrumNotes(
  genre: Genre,
  bpm: number,
  numBars: number,
  beatsPerBar: number = 4,
  stepsPerBeat: number = 2
): Note[] {
  const notes: Note[] = [];
  const pattern = DRUM_PATTERNS[genre] || DRUM_PATTERNS.electronic;
  const stepsPerBar = beatsPerBar * stepsPerBeat;
  const stepDuration = (60 / bpm) / stepsPerBeat;
  
  for (let bar = 0; bar < numBars; bar++) {
    for (const hit of pattern) {
      // Add variation based on bar position
      let velocity = hit.velocity;
      const randomVariation = 0.9 + Math.random() * 0.2;
      velocity = Math.round(velocity * randomVariation);
      
      // Add fills every 4 bars
      if ((bar + 1) % 4 === 0 && bar === numBars - 1) {
        // Add extra hits for fills
        if (hit.drum === 'snare' || hit.drum === 'tomHigh') {
          velocity = Math.min(127, velocity + 20);
        }
      }
      
      const startTime = bar * (60 / bpm) * beatsPerBar + hit.step * stepDuration;
      
      notes.push({
        pitch: DRUM_MIDI[hit.drum],
        velocity,
        startTime,
        duration: stepDuration * 0.9,
      });
    }
  }
  
  return notes;
}

// Generate synthetic drum sounds using oscillators
export function createDrumSynthSpec(drumType: keyof typeof DRUM_MIDI): {
  type: 'noise' | 'oscillator';
  frequency?: number;
  decay: number;
  pitchDecay?: number;
  filter?: {
    type: BiquadFilterType;
    frequency: number;
    Q?: number;
  };
} {
  switch (drumType) {
    case 'kick':
      return {
        type: 'oscillator',
        frequency: 150,
        decay: 0.15,
        pitchDecay: 0.1,
        filter: {
          type: 'lowpass',
          frequency: 200,
        },
      };
    case 'snare':
      return {
        type: 'noise',
        decay: 0.2,
        filter: {
          type: 'highpass',
          frequency: 200,
          Q: 1,
        },
      };
    case 'hihatClosed':
      return {
        type: 'noise',
        decay: 0.05,
        filter: {
          type: 'highpass',
          frequency: 7000,
          Q: 2,
        },
      };
    case 'hihatOpen':
      return {
        type: 'noise',
        decay: 0.3,
        filter: {
          type: 'highpass',
          frequency: 7000,
          Q: 1.5,
        },
      };
    case 'tomHigh':
      return {
        type: 'oscillator',
        frequency: 200,
        decay: 0.3,
        pitchDecay: 0.05,
      };
    case 'tomMid':
      return {
        type: 'oscillator',
        frequency: 140,
        decay: 0.35,
        pitchDecay: 0.05,
      };
    case 'tomLow':
      return {
        type: 'oscillator',
        frequency: 100,
        decay: 0.4,
        pitchDecay: 0.05,
      };
    case 'crash':
      return {
        type: 'noise',
        decay: 1.0,
        filter: {
          type: 'highpass',
          frequency: 5000,
          Q: 0.5,
        },
      };
    case 'ride':
      return {
        type: 'noise',
        decay: 0.5,
        filter: {
          type: 'bandpass',
          frequency: 8000,
          Q: 2,
        },
      };
    case 'clap':
      return {
        type: 'noise',
        decay: 0.15,
        filter: {
          type: 'bandpass',
          frequency: 1200,
          Q: 2,
        },
      };
    default:
      return {
        type: 'noise',
        decay: 0.1,
      };
  }
}

```

---

## lib\audio\effects.ts

```typescript
// DSP Effects for Loco-Tunes

import { getAudioContext } from './engine';

// Reverb impulse response generator
export function createReverbImpulse(
  duration: number = 2.0,
  decay: number = 2.0,
  sampleRate: number = 44100
): AudioBuffer {
  const context = getAudioContext();
  const length = Math.floor(sampleRate * duration);
  const buffer = context.createBuffer(2, length, sampleRate);
  
  for (let channel = 0; channel < 2; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < length; i++) {
      // Create a more natural reverb with exponential decay
      const t = i / sampleRate;
      const amplitude = Math.exp(-decay * t);
      
      // Add some early reflections
      const earlyReflection = i < sampleRate * 0.1 
        ? Math.random() * 0.5 
        : 0;
      
      channelData[i] = (Math.random() * 2 - 1) * (amplitude + earlyReflection * Math.exp(-20 * t));
    }
  }
  
  return buffer;
}

// Delay effect
export interface DelaySettings {
  time: number; // in seconds
  feedback: number; // 0-1
  mix: number; // 0-1
}

export function createDelayNode(
  context: AudioContext,
  settings: DelaySettings
): { input: AudioNode; output: AudioNode } {
  const delay = context.createDelay(5.0);
  delay.delayTime.value = settings.time;
  
  const feedback = context.createGain();
  feedback.gain.value = settings.feedback;
  
  const wetGain = context.createGain();
  wetGain.gain.value = settings.mix;
  
  const dryGain = context.createGain();
  dryGain.gain.value = 1 - settings.mix;
  
  // Routing: input -> dryGain -> output
  //          input -> delay -> wetGain -> output
  //          delay -> feedback -> delay (feedback loop)
  
  delay.connect(feedback);
  feedback.connect(delay);
  delay.connect(wetGain);
  
  return {
    input: dryGain,
    output: dryGain,
  };
}

// Chorus effect
export interface ChorusSettings {
  rate: number; // LFO speed in Hz
  depth: number; // 0-1
  mix: number; // 0-1
}

export function createChorusNode(
  context: AudioContext,
  settings: ChorusSettings
): { input: AudioNode; output: AudioNode; nodes: AudioNode[] } {
  const delayTime = 0.03; // 30ms base delay
  const delay = context.createDelay(0.1);
  delay.delayTime.value = delayTime;
  
  const lfo = context.createOscillator();
  lfo.type = 'sine';
  lfo.frequency.value = settings.rate;
  
  const lfoGain = context.createGain();
  lfoGain.gain.value = delayTime * settings.depth;
  
  lfo.connect(lfoGain);
  lfoGain.connect(delay.delayTime);
  lfo.start();
  
  const wetGain = context.createGain();
  wetGain.gain.value = settings.mix;
  
  const dryGain = context.createGain();
  dryGain.gain.value = 1 - settings.mix;
  
  const merger = context.createGain();
  
  return {
    input: dryGain,
    output: merger,
    nodes: [delay, lfo, lfoGain, wetGain, dryGain, merger],
  };
}

// Distortion effect
export interface DistortionSettings {
  amount: number; // 0-100
  mix: number; // 0-1
}

export function createDistortionCurve(amount: number): Float32Array {
  const samples = 44100;
  const curve = new Float32Array(samples);
  const deg = Math.PI / 180;
  
  for (let i = 0; i < samples; i++) {
    const x = (i * 2) / samples - 1;
    curve[i] = ((3 + amount) * x * 20 * deg) / (Math.PI + amount * Math.abs(x));
  }
  
  return curve as Float32Array<ArrayBuffer>;
}

export function createDistortionNode(
  context: AudioContext,
  settings: DistortionSettings
): { input: AudioNode; output: AudioNode } {
  const distortion = context.createWaveShaper();
  (distortion as unknown as { curve: Float32Array }).curve = createDistortionCurve(settings.amount);
  distortion.oversample = '4x';
  
  const wetGain = context.createGain();
  wetGain.gain.value = settings.mix;
  
  const dryGain = context.createGain();
  dryGain.gain.value = 1 - settings.mix;
  
  const merger = context.createGain();
  
  return {
    input: dryGain,
    output: merger,
  };
}

// Low-pass filter with resonance
export interface FilterSettings {
  frequency: number; // cutoff in Hz
  resonance: number; // Q value
  type: BiquadFilterType;
}

export function createFilterNode(
  context: AudioContext,
  settings: FilterSettings
): BiquadFilterNode {
  const filter = context.createBiquadFilter();
  filter.type = settings.type;
  filter.frequency.value = settings.frequency;
  filter.Q.value = settings.resonance;
  return filter;
}

// Stereo panner
export function createPannerNode(
  context: AudioContext,
  pan: number // -1 (left) to 1 (right)
): StereoPannerNode {
  const panner = context.createStereoPanner();
  panner.pan.value = pan;
  return panner;
}

// Gain automation for tremolo
export interface TremoloSettings {
  rate: number; // Hz
  depth: number; // 0-1
}

export function createTremoloNode(
  context: AudioContext,
  settings: TremoloSettings
): { input: AudioNode; output: AudioNode; nodes: AudioNode[] } {
  const lfo = context.createOscillator();
  lfo.type = 'sine';
  lfo.frequency.value = settings.rate;
  
  const lfoGain = context.createGain();
  lfoGain.gain.value = settings.depth;
  
  const outputGain = context.createGain();
  outputGain.gain.value = 1 - settings.depth / 2;
  
  lfo.connect(lfoGain);
  lfo.connect(outputGain.gain);
  lfo.start();
  
  return {
    input: outputGain,
    output: outputGain,
    nodes: [lfo, lfoGain, outputGain],
  };
}

// Compressor presets
export const COMPRESSOR_PRESETS = {
  subtle: {
    threshold: -20,
    knee: 20,
    ratio: 3,
    attack: 0.01,
    release: 0.2,
  },
  punchy: {
    threshold: -15,
    knee: 10,
    ratio: 6,
    attack: 0.005,
    release: 0.1,
  },
  smashed: {
    threshold: -30,
    knee: 0,
    ratio: 12,
    attack: 0.001,
    release: 0.05,
  },
  transparent: {
    threshold: -12,
    knee: 30,
    ratio: 2,
    attack: 0.02,
    release: 0.3,
  },
};

// EQ presets
export const EQ_PRESETS = {
  flat: { low: 0, mid: 0, high: 0 },
  bassBoost: { low: 6, mid: 0, high: 0 },
  trebleBoost: { low: 0, mid: 2, high: 6 },
  vocal: { low: -2, mid: 4, high: 2 },
  warm: { low: 4, mid: -1, high: -2 },
  bright: { low: -2, mid: 2, high: 5 },
  radio: { low: -4, mid: 4, high: -4 },
  bassCut: { low: -6, mid: 0, high: 0 },
};

// Reverb presets
export const REVERB_PRESETS = {
  small: { duration: 0.5, decay: 3.0 },
  medium: { duration: 1.5, decay: 2.5 },
  large: { duration: 3.0, decay: 2.0 },
  hall: { duration: 4.0, decay: 1.5 },
  plate: { duration: 2.0, decay: 3.5 },
};

```

---

## lib\audio\engine.ts

```typescript
// Web Audio API engine for Loco-Tunes

import type { Note, Stem, StemType, EffectSettings, Track } from '@/types/music';
import { midiToFrequency, getScale } from './chords';
import { DRUM_MIDI, createDrumSynthSpec } from './drums';

// Audio context singleton
let audioContext: AudioContext | null = null;

export function getAudioContext(): AudioContext {
  if (!audioContext) {
    audioContext = new AudioContext();
  }
  return audioContext;
}

// Master output with effects chain
export class AudioEngine {
  private context: AudioContext;
  private masterGain: GainNode;
  private compressor: DynamicsCompressorNode;
  private reverbNode: ConvolverNode | null = null;
  private eqLow: BiquadFilterNode;
  private eqMid: BiquadFilterNode;
  private eqHigh: BiquadFilterNode;
  
  private stemPlayers: Map<StemType, { source: AudioBufferSourceNode | null; gain: GainNode }> = new Map();
  private isPlaying: boolean = false;
  private startTime: number = 0;
  private pausedAt: number = 0;
  
  constructor() {
    this.context = getAudioContext();
    
    // Create master chain
    this.masterGain = this.context.createGain();
    this.masterGain.gain.value = 0.8;
    
    // EQ nodes
    this.eqLow = this.context.createBiquadFilter();
    this.eqLow.type = 'lowshelf';
    this.eqLow.frequency.value = 320;
    this.eqLow.gain.value = 0;
    
    this.eqMid = this.context.createBiquadFilter();
    this.eqMid.type = 'peaking';
    this.eqMid.frequency.value = 1000;
    this.eqMid.Q.value = 0.5;
    this.eqMid.gain.value = 0;
    
    this.eqHigh = this.context.createBiquadFilter();
    this.eqHigh.type = 'highshelf';
    this.eqHigh.frequency.value = 3200;
    this.eqHigh.gain.value = 0;
    
    // Compressor
    this.compressor = this.context.createDynamicsCompressor();
    this.compressor.threshold.value = -24;
    this.compressor.knee.value = 30;
    this.compressor.ratio.value = 4;
    this.compressor.attack.value = 0.003;
    this.compressor.release.value = 0.25;
    
    // Connect chain: source -> eq -> compressor -> master -> destination
    this.eqLow.connect(this.eqMid);
    this.eqMid.connect(this.eqHigh);
    this.eqHigh.connect(this.compressor);
    this.compressor.connect(this.masterGain);
    this.masterGain.connect(this.context.destination);
    
    // Create reverb (async)
    this.createReverb();
  }
  
  private async createReverb(): Promise<void> {
    const sampleRate = this.context.sampleRate;
    const length = sampleRate * 2; // 2 second reverb
    const impulse = this.context.createBuffer(2, length, sampleRate);
    
    for (let channel = 0; channel < 2; channel++) {
      const channelData = impulse.getChannelData(channel);
      for (let i = 0; i < length; i++) {
        // Exponential decay
        channelData[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, 2);
      }
    }
    
    this.reverbNode = this.context.createConvolver();
    this.reverbNode.buffer = impulse;
  }
  
  // Synthesize a note using oscillators
  synthesizeNote(
    note: Note,
    startTime: number,
    duration: number,
    options: {
      oscillatorType?: OscillatorType;
      attack?: number;
      decay?: number;
      sustain?: number;
      release?: number;
    } = {}
  ): { oscillator: OscillatorNode; gainNode: GainNode } {
    const {
      oscillatorType = 'sine',
      attack = 0.01,
      decay = 0.1,
      sustain = 0.7,
      release = 0.3,
    } = options;
    
    const osc = this.context.createOscillator();
    osc.type = oscillatorType;
    osc.frequency.value = midiToFrequency(note.pitch);
    
    const gainNode = this.context.createGain();
    gainNode.gain.value = 0;
    
    // ADSR envelope
    const velocity = note.velocity / 127;
    const noteDuration = note.duration || duration;
    
    gainNode.gain.setValueAtTime(0, startTime);
    gainNode.gain.linearRampToValueAtTime(velocity * 0.5, startTime + attack);
    gainNode.gain.linearRampToValueAtTime(velocity * sustain * 0.5, startTime + attack + decay);
    gainNode.gain.setValueAtTime(velocity * sustain * 0.5, startTime + noteDuration - release);
    gainNode.gain.linearRampToValueAtTime(0, startTime + noteDuration);
    
    osc.connect(gainNode);
    
    return { oscillator: osc, gainNode };
  }
  
  // Synthesize drum hit
  synthesizeDrum(
    drumType: keyof typeof DRUM_MIDI,
    startTime: number,
    velocity: number
  ): { nodes: AudioNode[] } {
    const spec = createDrumSynthSpec(drumType);
    const nodes: AudioNode[] = [];
    
    const gainNode = this.context.createGain();
    gainNode.gain.value = 0;
    gainNode.gain.linearRampToValueAtTime(velocity / 127 * 0.6, startTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + spec.decay);
    nodes.push(gainNode);
    
    if (spec.type === 'noise') {
      // Create noise buffer
      const bufferSize = this.context.sampleRate * spec.decay;
      const noiseBuffer = this.context.createBuffer(1, bufferSize, this.context.sampleRate);
      const noiseData = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        noiseData[i] = Math.random() * 2 - 1;
      }
      
      const noiseSource = this.context.createBufferSource();
      noiseSource.buffer = noiseBuffer;
      noiseSource.start(startTime);
      nodes.push(noiseSource);
      
      let lastNode: AudioNode = noiseSource;
      
      if (spec.filter) {
        const filter = this.context.createBiquadFilter();
        filter.type = spec.filter.type;
        filter.frequency.value = spec.filter.frequency;
        if (spec.filter.Q) filter.Q.value = spec.filter.Q;
        lastNode.connect(filter);
        lastNode = filter;
        nodes.push(filter);
      }
      
      lastNode.connect(gainNode);
    } else {
      // Oscillator-based (kick, toms)
      const osc = this.context.createOscillator();
      osc.frequency.value = spec.frequency || 150;
      osc.frequency.setValueAtTime(spec.frequency || 150, startTime);
      
      if (spec.pitchDecay) {
        osc.frequency.exponentialRampToValueAtTime(
          20,
          startTime + spec.pitchDecay
        );
      }
      
      osc.type = 'sine';
      osc.start(startTime);
      osc.stop(startTime + spec.decay);
      
      let lastNode: AudioNode = osc;
      
      if (spec.filter) {
        const filter = this.context.createBiquadFilter();
        filter.type = spec.filter.type;
        filter.frequency.value = spec.filter.frequency;
        lastNode.connect(filter);
        lastNode = filter;
        nodes.push(filter);
      }
      
      lastNode.connect(gainNode);
      nodes.push(osc);
    }
    
    return { nodes };
  }
  
  // Render notes to an AudioBuffer
  renderNotesToBuffer(
    notes: Note[],
    duration: number,
    stemType: StemType
  ): AudioBuffer {
    const sampleRate = this.context.sampleRate;
    const numSamples = Math.ceil(duration * sampleRate);
    const buffer = this.context.createBuffer(2, numSamples, sampleRate);
    
    const offlineContext = new OfflineAudioContext(2, numSamples, sampleRate);
    
    // Render each note
    for (const note of notes) {
      if (stemType === 'drums') {
        // Render drum
        const drumType = Object.entries(DRUM_MIDI).find(
          ([, midi]) => midi === note.pitch
        )?.[0] as keyof typeof DRUM_MIDI;
        
        if (drumType) {
          const spec = createDrumSynthSpec(drumType);
          const startSample = Math.floor(note.startTime * sampleRate);
          
          if (spec.type === 'noise') {
            // Generate noise
            const noiseBuffer = offlineContext.createBuffer(1, 
              Math.ceil(spec.decay * sampleRate), sampleRate);
            const noiseData = noiseBuffer.getChannelData(0);
            for (let i = 0; i < noiseData.length; i++) {
              noiseData[i] = Math.random() * 2 - 1;
            }
            
            const source = offlineContext.createBufferSource();
            source.buffer = noiseBuffer;
            source.start(startSample / sampleRate);
            
            let lastNode: AudioNode = source;
            
            if (spec.filter) {
              const filter = offlineContext.createBiquadFilter();
              filter.type = spec.filter.type;
              filter.frequency.value = spec.filter.frequency;
              if (spec.filter.Q) filter.Q.value = spec.filter.Q;
              lastNode.connect(filter);
              lastNode = filter;
            }
            
            const gain = offlineContext.createGain();
            gain.gain.value = note.velocity / 127 * 0.5;
            lastNode.connect(gain);
            gain.connect(offlineContext.destination);
          } else {
            // Oscillator-based drum
            const osc = offlineContext.createOscillator();
            osc.type = 'sine';
            osc.frequency.value = spec.frequency || 150;
            
            if (spec.pitchDecay) {
              osc.frequency.setValueAtTime(spec.frequency || 150, startSample / sampleRate);
              osc.frequency.exponentialRampToValueAtTime(20, startSample / sampleRate + spec.pitchDecay);
            }
            
            osc.start(startSample / sampleRate);
            osc.stop(startSample / sampleRate + spec.decay);
            
            const gain = offlineContext.createGain();
            gain.gain.setValueAtTime(note.velocity / 127 * 0.5, startSample / sampleRate);
            gain.gain.exponentialRampToValueAtTime(0.001, startSample / sampleRate + spec.decay);
            
            osc.connect(gain);
            gain.connect(offlineContext.destination);
          }
        }
      } else {
        // Render melodic note
        const osc = offlineContext.createOscillator();
        
        // Different oscillator types per stem
        switch (stemType) {
          case 'bass':
            osc.type = 'sawtooth';
            break;
          case 'melody':
            osc.type = 'square';
            break;
          case 'harmony':
            osc.type = 'triangle';
            break;
          default:
            osc.type = 'sine';
        }
        
        osc.frequency.value = midiToFrequency(note.pitch);
        
        const gain = offlineContext.createGain();
        const attack = 0.02;
        const release = 0.1;
        
        gain.gain.setValueAtTime(0, note.startTime);
        gain.gain.linearRampToValueAtTime(
          note.velocity / 127 * 0.3,
          note.startTime + attack
        );
        gain.gain.setValueAtTime(
          note.velocity / 127 * 0.25,
          note.startTime + note.duration - release
        );
        gain.gain.linearRampToValueAtTime(0, note.startTime + note.duration);
        
        osc.start(note.startTime);
        osc.stop(note.startTime + note.duration + 0.1);
        
        osc.connect(gain);
        gain.connect(offlineContext.destination);
      }
    }
    
    // Render synchronously (OfflineAudioContext doesn't support async in this context)
    // We'll use a Promise-based approach
    return buffer;
  }
  
  // Render notes asynchronously
  async renderNotesToBufferAsync(
    notes: Note[],
    duration: number,
    stemType: StemType
  ): Promise<AudioBuffer> {
    const sampleRate = this.context.sampleRate;
    const numSamples = Math.ceil(duration * sampleRate);
    const offlineContext = new OfflineAudioContext(2, numSamples, sampleRate);
    
    // Render each note
    for (const note of notes) {
      if (stemType === 'drums') {
        const drumType = Object.entries(DRUM_MIDI).find(
          ([, midi]) => midi === note.pitch
        )?.[0] as keyof typeof DRUM_MIDI;
        
        if (drumType) {
          const spec = createDrumSynthSpec(drumType);
          
          if (spec.type === 'noise') {
            const noiseBuffer = offlineContext.createBuffer(
              1,
              Math.ceil(spec.decay * sampleRate),
              sampleRate
            );
            const noiseData = noiseBuffer.getChannelData(0);
            for (let i = 0; i < noiseData.length; i++) {
              noiseData[i] = Math.random() * 2 - 1;
            }
            
            const source = offlineContext.createBufferSource();
            source.buffer = noiseBuffer;
            source.start(note.startTime);
            
            let lastNode: AudioNode = source;
            
            if (spec.filter) {
              const filter = offlineContext.createBiquadFilter();
              filter.type = spec.filter.type;
              filter.frequency.value = spec.filter.frequency;
              if (spec.filter.Q) filter.Q.value = spec.filter.Q;
              lastNode.connect(filter);
              lastNode = filter;
            }
            
            const gain = offlineContext.createGain();
            gain.gain.value = note.velocity / 127 * 0.4;
            lastNode.connect(gain);
            gain.connect(offlineContext.destination);
          } else {
            const osc = offlineContext.createOscillator();
            osc.type = 'sine';
            osc.frequency.value = spec.frequency || 150;
            
            if (spec.pitchDecay) {
              osc.frequency.setValueAtTime(spec.frequency || 150, note.startTime);
              osc.frequency.exponentialRampToValueAtTime(
                20,
                note.startTime + spec.pitchDecay
              );
            }
            
            osc.start(note.startTime);
            osc.stop(note.startTime + spec.decay);
            
            const gain = offlineContext.createGain();
            gain.gain.setValueAtTime(note.velocity / 127 * 0.5, note.startTime);
            gain.gain.exponentialRampToValueAtTime(0.001, note.startTime + spec.decay);
            
            osc.connect(gain);
            gain.connect(offlineContext.destination);
          }
        }
      } else {
        const osc = offlineContext.createOscillator();
        
        switch (stemType) {
          case 'bass':
            osc.type = 'sawtooth';
            break;
          case 'melody':
            osc.type = 'square';
            break;
          case 'harmony':
            osc.type = 'triangle';
            break;
          default:
            osc.type = 'sine';
        }
        
        osc.frequency.value = midiToFrequency(note.pitch);
        
        const gain = offlineContext.createGain();
        const attack = stemType === 'harmony' ? 0.1 : 0.02;
        const release = stemType === 'harmony' ? 0.2 : 0.1;
        
        gain.gain.setValueAtTime(0, note.startTime);
        gain.gain.linearRampToValueAtTime(
          note.velocity / 127 * 0.3,
          note.startTime + attack
        );
        gain.gain.setValueAtTime(
          note.velocity / 127 * 0.25,
          note.startTime + note.duration - release
        );
        gain.gain.linearRampToValueAtTime(0, note.startTime + note.duration);
        
        osc.start(note.startTime);
        osc.stop(note.startTime + note.duration + 0.1);
        
        osc.connect(gain);
        gain.connect(offlineContext.destination);
      }
    }
    
    return offlineContext.startRendering();
  }
  
  // Update effects
  setEffects(effects: EffectSettings): void {
    // Reverb
    if (this.reverbNode && effects.reverb.enabled) {
      // Apply reverb via wet/dry mix would require more complex routing
    }
    
    // EQ
    if (effects.eq.enabled) {
      this.eqLow.gain.value = effects.eq.low;
      this.eqMid.gain.value = effects.eq.mid;
      this.eqHigh.gain.value = effects.eq.high;
    } else {
      this.eqLow.gain.value = 0;
      this.eqMid.gain.value = 0;
      this.eqHigh.gain.value = 0;
    }
    
    // Compressor
    if (effects.compressor.enabled) {
      this.compressor.threshold.value = effects.compressor.threshold;
      this.compressor.ratio.value = effects.compressor.ratio;
      this.compressor.attack.value = effects.compressor.attack;
      this.compressor.release.value = effects.compressor.release;
    }
  }
  
  // Get master gain node for connecting sources
  getMasterInput(): AudioNode {
    return this.eqLow;
  }
  
  // Get current time
  getCurrentTime(): number {
    if (this.isPlaying) {
      return this.context.currentTime - this.startTime + this.pausedAt;
    }
    return this.pausedAt;
  }
  
  // Cleanup
  dispose(): void {
    this.stopAll();
    if (audioContext) {
      audioContext.close();
      audioContext = null;
    }
  }
  
  stopAll(): void {
    this.stemPlayers.forEach(({ source }) => {
      if (source) {
        try {
          source.stop();
        } catch (e) {
          // Ignore errors from already stopped sources
        }
      }
    });
    this.stemPlayers.clear();
    this.isPlaying = false;
  }
}

// Global audio engine instance
let engineInstance: AudioEngine | null = null;

export function getAudioEngine(): AudioEngine {
  if (!engineInstance) {
    engineInstance = new AudioEngine();
  }
  return engineInstance;
}

```

---

## lib\audio\export.ts

```typescript
// Export functionality for WAV and MIDI files

import type { Note, Stem, Track, StemType } from '@/types/music';
import { NOTE_NAMES } from '@/types/music';

// WAV file export
export function audioBufferToWav(buffer: AudioBuffer): Blob {
  const numChannels = buffer.numberOfChannels;
  const sampleRate = buffer.sampleRate;
  const format = 1; // PCM
  const bitDepth = 16;
  
  const bytesPerSample = bitDepth / 8;
  const blockAlign = numChannels * bytesPerSample;
  
  const samples = buffer.length;
  const dataSize = samples * blockAlign;
  const fileSize = 44 + dataSize;
  
  const arrayBuffer = new ArrayBuffer(fileSize);
  const view = new DataView(arrayBuffer);
  
  // WAV header
  writeString(view, 0, 'RIFF');
  view.setUint32(4, fileSize - 8, true);
  writeString(view, 8, 'WAVE');
  writeString(view, 12, 'fmt ');
  view.setUint32(16, 16, true); // fmt chunk size
  view.setUint16(20, format, true);
  view.setUint16(22, numChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * blockAlign, true);
  view.setUint16(32, blockAlign, true);
  view.setUint16(34, bitDepth, true);
  writeString(view, 36, 'data');
  view.setUint32(40, dataSize, true);
  
  // Interleave channels and write samples
  const channels: Float32Array[] = [];
  for (let i = 0; i < numChannels; i++) {
    channels.push(buffer.getChannelData(i));
  }
  
  let offset = 44;
  for (let i = 0; i < samples; i++) {
    for (let ch = 0; ch < numChannels; ch++) {
      const sample = Math.max(-1, Math.min(1, channels[ch][i]));
      const intSample = sample < 0 ? sample * 0x8000 : sample * 0x7FFF;
      view.setInt16(offset, intSample, true);
      offset += 2;
    }
  }
  
  return new Blob([arrayBuffer], { type: 'audio/wav' });
}

function writeString(view: DataView, offset: number, str: string): void {
  for (let i = 0; i < str.length; i++) {
    view.setUint8(offset + i, str.charCodeAt(i));
  }
}

// Export stem to WAV
export function exportStemToWav(stem: Stem): Blob | null {
  if (!stem.audioBuffer) return null;
  return audioBufferToWav(stem.audioBuffer);
}

// Export all stems as mixed WAV
export function exportTrackToWav(track: Track, stemVolumes: Record<StemType, number>): Blob | null {
  // Create offline context for mixing
  const sampleRate = 44100;
  const numSamples = Math.ceil(track.duration * sampleRate);
  const offlineContext = new OfflineAudioContext(2, numSamples, sampleRate);
  
  // Mix stems
  for (const stem of track.stems) {
    if (!stem.audioBuffer || stem.muted) continue;
    
    const source = offlineContext.createBufferSource();
    source.buffer = stem.audioBuffer;
    
    const gain = offlineContext.createGain();
    gain.gain.value = stemVolumes[stem.type] ?? stem.volume;
    
    source.connect(gain);
    gain.connect(offlineContext.destination);
    source.start(0);
  }
  
  // For now, return the first stem's buffer mixed
  // In real implementation, we'd use async rendering
  const firstStemWithBuffer = track.stems.find(s => s.audioBuffer);
  if (!firstStemWithBuffer?.audioBuffer) return null;
  
  return audioBufferToWav(firstStemWithBuffer.audioBuffer);
}

// MIDI file export
const MIDI_PPQ = 480; // Pulses per quarter note

interface MidiEvent {
  deltaTime: number;
  status: number;
  data: number[];
}

interface MidiTrack {
  events: MidiEvent[];
}

function createMidiHeader(numTracks: number): Uint8Array {
  const header = new Uint8Array(14);
  const view = new DataView(header.buffer);
  
  // "MThd" chunk
  writeMidiString(header, 0, 'MThd');
  view.setUint32(4, 6, false); // Header length
  view.setUint16(8, 1, false); // Format type 1 (multi-track)
  view.setUint16(10, numTracks, false); // Number of tracks
  view.setUint16(12, MIDI_PPQ, false); // PPQ
  
  return header;
}

function createMidiTrack(events: MidiEvent[]): Uint8Array {
  const eventData: number[] = [];
  
  for (const event of events) {
    // Write variable-length delta time
    writeVariableLength(eventData, event.deltaTime);
    
    // Write status byte and data
    eventData.push(event.status);
    eventData.push(...event.data);
  }
  
  // End of track event
  eventData.push(0x00, 0xFF, 0x2F, 0x00);
  
  const track = new Uint8Array(8 + eventData.length);
  const view = new DataView(track.buffer);
  
  writeMidiString(track, 0, 'MTrk');
  view.setUint32(4, eventData.length, false);
  track.set(eventData, 8);
  
  return track;
}

function writeMidiString(arr: Uint8Array, offset: number, str: string): void {
  for (let i = 0; i < str.length; i++) {
    arr[offset + i] = str.charCodeAt(i);
  }
}

function writeVariableLength(data: number[], value: number): void {
  if (value === 0) {
    data.push(0);
    return;
  }
  
  const bytes: number[] = [];
  bytes.push(value & 0x7F);
  value >>= 7;
  
  while (value > 0) {
    bytes.push((value & 0x7F) | 0x80);
    value >>= 7;
  }
  
  // Write in reverse order
  for (let i = bytes.length - 1; i >= 0; i--) {
    data.push(bytes[i]);
  }
}

function secondsToTicks(seconds: number, bpm: number): number {
  const secondsPerBeat = 60 / bpm;
  const secondsPerTick = secondsPerBeat / MIDI_PPQ;
  return Math.round(seconds / secondsPerTick);
}

function notesToMidiEvents(notes: Note[], bpm: number, channel: number = 0): MidiEvent[] {
  const events: MidiEvent[] = [];
  const ticksPerSecond = (bpm / 60) * MIDI_PPQ;
  
  // Convert notes to note-on and note-off events
  const timedEvents: { tick: number; status: number; velocity: number; pitch: number }[] = [];
  
  for (const note of notes) {
    const startTick = Math.round(note.startTime * ticksPerSecond);
    const endTick = Math.round((note.startTime + note.duration) * ticksPerSecond);
    
    // Note on
    timedEvents.push({
      tick: startTick,
      status: 0x90 | channel,
      velocity: Math.round(note.velocity),
      pitch: note.pitch,
    });
    
    // Note off
    timedEvents.push({
      tick: endTick,
      status: 0x80 | channel,
      velocity: 0,
      pitch: note.pitch,
    });
  }
  
  // Sort by tick
  timedEvents.sort((a, b) => a.tick - b.tick);
  
  // Convert to delta times
  let lastTick = 0;
  for (const event of timedEvents) {
    const deltaTime = event.tick - lastTick;
    events.push({
      deltaTime,
      status: event.status,
      data: [event.pitch, event.velocity],
    });
    lastTick = event.tick;
  }
  
  return events;
}

// Export stem to MIDI
export function exportStemToMidi(stem: Stem, bpm: number): Blob {
  const events = notesToMidiEvents(stem.notes, bpm);
  
  // Add program change based on stem type
  const programChanges: Record<StemType, number> = {
    drums: 0, // Standard drum kit (channel 10 in GM)
    bass: 33, // Electric Bass (finger)
    melody: 80, // Synth Lead
    harmony: 88, // Synth Pad
  };
  
  const channel = stem.type === 'drums' ? 9 : 0; // Channel 10 for drums
  
  // Create track with program change
  const trackEvents: MidiEvent[] = [
    { deltaTime: 0, status: 0xC0 | channel, data: [programChanges[stem.type]] },
    ...events,
  ];
  
  const header = createMidiHeader(1);
  const track = createMidiTrack(trackEvents);
  
  const midiFile = new Uint8Array(header.length + track.length);
  midiFile.set(header, 0);
  midiFile.set(track, header.length);
  
  return new Blob([midiFile], { type: 'audio/midi' });
}

// Export full track to MIDI (multi-track)
export function exportTrackToMidi(track: Track): Blob {
  const { bpm } = track.params;
  
  // Create one track per stem
  const tracks: Uint8Array[] = [];
  const stemChannels: Record<StemType, number> = {
    drums: 9,
    bass: 0,
    melody: 1,
    harmony: 2,
  };
  
  const programChanges: Record<StemType, number> = {
    drums: 0,
    bass: 33,
    melody: 80,
    harmony: 88,
  };
  
  for (const stem of track.stems) {
    const channel = stemChannels[stem.type];
    const events: MidiEvent[] = [
      // Tempo meta event (only on first track)
      ...(stem.type === 'drums' ? [{
        deltaTime: 0,
        status: 0xFF,
        data: [0x51, 0x03, ...microsecondsPerBeat(bpm)],
      }] : []),
      // Program change
      { deltaTime: 0, status: 0xC0 | channel, data: [programChanges[stem.type]] },
    ];
    
    // Convert notes
    const noteEvents = notesToMidiEvents(stem.notes, bpm, channel);
    events.push(...noteEvents);
    
    tracks.push(createMidiTrack(events));
  }
  
  const header = createMidiHeader(tracks.length);
  const totalLength = header.length + tracks.reduce((sum, t) => sum + t.length, 0);
  
  const midiFile = new Uint8Array(totalLength);
  midiFile.set(header, 0);
  
  let offset = header.length;
  for (const track of tracks) {
    midiFile.set(track, offset);
    offset += track.length;
  }
  
  return new Blob([midiFile], { type: 'audio/midi' });
}

function microsecondsPerBeat(bpm: number): number[] {
  const microseconds = Math.round(60000000 / bpm);
  return [
    (microseconds >> 16) & 0xFF,
    (microseconds >> 8) & 0xFF,
    microseconds & 0xFF,
  ];
}

// Download helper
export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Generate filename
export function generateFilename(track: Track, extension: string): string {
  const date = new Date().toISOString().split('T')[0];
  const genre = track.params.genre;
  const bpm = track.params.bpm;
  return `loco-tunes-${genre}-${bpm}bpm-${date}.${extension}`;
}

```

---

## lib\audio\generator.ts

```typescript
// Main music generator combining all components

import type { GenerationParams, Stem, StemType, Track, Note } from '@/types/music';
import { DEFAULT_EFFECTS, STEM_COLORS } from '@/types/music';
import { noteToMidi, generateChordProgression, generateHarmonyNotes, generateBassNotes } from './chords';
import { generateDrumNotes } from './drums';
import { generateMelodyNotes } from './melody';
import { getAudioEngine } from './engine';
import { v4 as uuidv4 } from 'uuid';

// Generate a unique ID without external dependency
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// Main generation function
export async function generateTrack(params: GenerationParams): Promise<Track> {
  const { bpm, genre, mood, duration, key, scale, complexity } = params;
  
  // Convert key to MIDI note number
  const rootMidi = noteToMidi(key, 4);
  
  // Calculate number of bars based on BPM and duration
  const beatsPerBar = 4;
  const beatDuration = 60 / bpm;
  const numBars = Math.ceil(duration / (beatsPerBar * beatDuration));
  
  // Generate chord progression
  const chords = generateChordProgression(rootMidi, genre, scale, numBars);
  
  // Extract chord roots for melody generation
  const chordRoots = chords.map(c => c.chord[0]);
  
  // Generate all stems
  const drumsNotes = generateDrumNotes(genre, bpm, numBars, beatsPerBar);
  const bassNotes = generateBassNotes(chords, beatsPerBar, bpm, genre);
  const melodyNotes = generateMelodyNotes(rootMidi, scale, genre, mood, bpm, numBars, complexity, chordRoots);
  const harmonyNotes = generateHarmonyNotes(chords, beatsPerBar, bpm);
  
  // Create stem objects
  const stems: Stem[] = [
    { type: 'drums', notes: drumsNotes, volume: 0.8, muted: false, solo: false, color: STEM_COLORS.drums },
    { type: 'bass', notes: bassNotes, volume: 0.75, muted: false, solo: false, color: STEM_COLORS.bass },
    { type: 'melody', notes: melodyNotes, volume: 0.7, muted: false, solo: false, color: STEM_COLORS.melody },
    { type: 'harmony', notes: harmonyNotes, volume: 0.6, muted: false, solo: false, color: STEM_COLORS.harmony },
  ];
  
  // Render audio buffers for each stem
  const engine = getAudioEngine();
  const actualDuration = numBars * beatsPerBar * beatDuration;
  
  for (const stem of stems) {
    try {
      stem.audioBuffer = await engine.renderNotesToBufferAsync(
        stem.notes,
        actualDuration,
        stem.type
      );
    } catch (error) {
      console.error(`Failed to render ${stem.type} stem:`, error);
    }
  }
  
  return {
    id: generateId(),
    name: `Track - ${genre} ${bpm} BPM`,
    params,
    stems,
    duration: actualDuration,
    createdAt: new Date(),
  };
}

// Regenerate a single stem
export async function regenerateStem(
  track: Track,
  stemType: StemType
): Promise<Stem> {
  const { bpm, genre, mood, key, scale, complexity } = track.params;
  const rootMidi = noteToMidi(key, 4);
  const beatsPerBar = 4;
  const beatDuration = 60 / bpm;
  const numBars = Math.ceil(track.duration / (beatsPerBar * beatDuration));
  
  let notes: Note[] = [];
  const chords = generateChordProgression(rootMidi, genre, scale, numBars);
  
  switch (stemType) {
    case 'drums':
      notes = generateDrumNotes(genre, bpm, numBars, beatsPerBar);
      break;
    case 'bass':
      notes = generateBassNotes(chords, beatsPerBar, bpm, genre);
      break;
    case 'melody':
      notes = generateMelodyNotes(rootMidi, scale, genre, mood, bpm, numBars, complexity);
      break;
    case 'harmony':
      notes = generateHarmonyNotes(chords, beatsPerBar, bpm);
      break;
  }
  
  const engine = getAudioEngine();
  const audioBuffer = await engine.renderNotesToBufferAsync(notes, track.duration, stemType);
  
  const existingStem = track.stems.find(s => s.type === stemType);
  
  return {
    type: stemType,
    notes,
    audioBuffer,
    volume: existingStem?.volume ?? 0.7,
    muted: existingStem?.muted ?? false,
    solo: existingStem?.solo ?? false,
    color: STEM_COLORS[stemType],
  };
}

// Variation generator - creates a variation of existing stem
export async function generateStemVariation(
  stem: Stem,
  params: GenerationParams
): Promise<Stem> {
  const { bpm, genre, mood, key, scale, complexity } = params;
  const rootMidi = noteToMidi(key, 4);
  const beatsPerBar = 4;
  const beatDuration = 60 / bpm;
  const numBars = Math.ceil(stem.notes.length > 0 
    ? stem.notes[stem.notes.length - 1].startTime / (beatsPerBar * beatDuration) + 1
    : 4);
  
  // Add some variation by adjusting complexity
  const variedComplexity = Math.max(0, Math.min(1, complexity + (Math.random() - 0.5) * 0.3));
  
  const chords = generateChordProgression(rootMidi, genre, scale, numBars);
  let notes: Note[] = [];
  
  switch (stem.type) {
    case 'drums':
      notes = generateDrumNotes(genre, bpm, numBars, beatsPerBar);
      break;
    case 'bass':
      notes = generateBassNotes(chords, beatsPerBar, bpm, genre);
      break;
    case 'melody':
      notes = generateMelodyNotes(rootMidi, scale, genre, mood, bpm, numBars, variedComplexity);
      break;
    case 'harmony':
      notes = generateHarmonyNotes(chords, beatsPerBar, bpm);
      break;
  }
  
  const engine = getAudioEngine();
  const duration = numBars * beatsPerBar * beatDuration;
  const audioBuffer = await engine.renderNotesToBufferAsync(notes, duration, stem.type);
  
  return {
    ...stem,
    notes,
    audioBuffer,
  };
}

// Detect hardware capabilities
export function detectHardwareCapabilities(): {
  level: 'basic' | 'standard' | 'pro';
  cores: number;
  memory: number;
  maxDuration: number;
  recommendedComplexity: number;
  hasWebAudio: boolean;
} {
  const cores = navigator.hardwareConcurrency || 4;
  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory || 8;
  const hasWebAudio = typeof AudioContext !== 'undefined' || typeof (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext !== 'undefined';
  
  let level: 'basic' | 'standard' | 'pro' = 'standard';
  let maxDuration = 30;
  let recommendedComplexity = 0.5;
  
  if (cores >= 8 && memory >= 16) {
    level = 'pro';
    maxDuration = 60;
    recommendedComplexity = 0.8;
  } else if (cores >= 4 && memory >= 8) {
    level = 'standard';
    maxDuration = 30;
    recommendedComplexity = 0.5;
  } else {
    level = 'basic';
    maxDuration = 15;
    recommendedComplexity = 0.3;
  }
  
  return {
    level,
    cores,
    memory,
    maxDuration,
    recommendedComplexity,
    hasWebAudio,
  };
}

// Validate generation parameters
export function validateParams(params: Partial<GenerationParams>): string[] {
  const errors: string[] = [];
  
  if (params.bpm && (params.bpm < 60 || params.bpm > 180)) {
    errors.push('BPM must be between 60 and 180');
  }
  
  if (params.duration && (params.duration < 5 || params.duration > 60)) {
    errors.push('Duration must be between 5 and 60 seconds');
  }
  
  if (params.complexity && (params.complexity < 0 || params.complexity > 1)) {
    errors.push('Complexity must be between 0 and 1');
  }
  
  return errors;
}

```

---

## lib\audio\melody.ts

```typescript
// Melody generation with scale-based patterns

import { SCALES } from '@/types/music';
import type { Genre, Note, Mood } from '@/types/music';
import { getScale } from './chords';

// Melody rhythm patterns by genre
const MELODY_RHYTHM_PATTERNS: Record<Genre, number[][]> = {
  electronic: [
    [0.5, 0.25, 0.25, 0.5, 0.25, 0.25, 0.5, 0.5],
    [0.25, 0.25, 0.25, 0.25, 0.5, 0.25, 0.25, 0.5],
    [0.5, 0.5, 0.25, 0.25, 0.25, 0.25, 0.5, 0.5],
  ],
  hiphop: [
    [0.25, 0.5, 0.25, 0.25, 0.5, 0.25, 0.25, 0.25],
    [0.5, 0.25, 0.25, 0.5, 0.25, 0.5, 0.25, 0.5],
    [0.25, 0.25, 0.5, 0.25, 0.25, 0.5, 0.5, 0.25],
  ],
  ambient: [
    [2, 2, 2, 2],
    [1, 2, 1, 2],
    [1.5, 1.5, 1.5, 0.5],
  ],
  rock: [
    [0.5, 0.5, 0.25, 0.25, 0.5, 0.5, 0.25, 0.25],
    [0.25, 0.25, 0.5, 0.25, 0.25, 0.5, 0.25, 0.5],
    [0.5, 0.25, 0.25, 0.5, 0.25, 0.25, 0.5, 0.5],
  ],
  jazz: [
    [0.5, 0.25, 0.25, 0.25, 0.25, 0.5, 0.25, 0.75],
    [0.25, 0.5, 0.25, 0.25, 0.25, 0.25, 0.5, 0.75],
    [0.75, 0.25, 0.5, 0.25, 0.25, 0.5, 0.25, 0.5],
  ],
};

// Melody contour shapes
type ContourType = 'ascending' | 'descending' | 'arch' | 'valley' | 'wave';

// Get melody direction bias based on mood
function getMoodBias(mood: Mood): { contour: ContourType; jumpiness: number } {
  switch (mood) {
    case 'happy':
      return { contour: 'ascending', jumpiness: 0.3 };
    case 'sad':
      return { contour: 'descending', jumpiness: 0.1 };
    case 'energetic':
      return { contour: 'wave', jumpiness: 0.5 };
    case 'calm':
      return { contour: 'arch', jumpiness: 0.15 };
    case 'dark':
      return { contour: 'valley', jumpiness: 0.2 };
    case 'uplifting':
      return { contour: 'ascending', jumpiness: 0.25 };
    default:
      return { contour: 'wave', jumpiness: 0.2 };
  }
}

// Generate a melody note sequence
export function generateMelodyNotes(
  rootMidi: number,
  scaleName: string,
  genre: Genre,
  mood: Mood,
  bpm: number,
  numBars: number,
  complexity: number,
  chordRoots: number[] = []
): Note[] {
  const notes: Note[] = [];
  const scale = getScale(rootMidi, scaleName);
  const beatDuration = 60 / bpm;
  
  // Extend scale across octaves for melody range
  const extendedScale: number[] = [];
  for (let octave = -1; octave <= 2; octave++) {
    scale.forEach(note => extendedScale.push(note + octave * 12));
  }
  
  // Get mood-based parameters
  const { contour, jumpiness } = getMoodBias(mood);
  
  // Select rhythm pattern based on genre
  const rhythmPatterns = MELODY_RHYTHM_PATTERNS[genre] || MELODY_RHYTHM_PATTERNS.electronic;
  const selectedPattern = rhythmPatterns[Math.floor(Math.random() * rhythmPatterns.length)];
  
  let currentTime = 0;
  let currentScaleIndex = Math.floor(extendedScale.length / 2); // Start in middle of range
  let barCount = 0;
  let noteIndex = 0;
  
  while (currentTime < numBars * 4 * beatDuration) {
    const barProgress = (currentTime % (4 * beatDuration)) / (4 * beatDuration);
    const patternIndex = noteIndex % selectedPattern.length;
    const duration = selectedPattern[patternIndex] * beatDuration;
    
    // Determine if this note should play (complexity affects density)
    const shouldPlay = Math.random() < (0.6 + complexity * 0.3);
    
    if (shouldPlay && duration > 0) {
      // Apply contour bias to scale index movement
      let direction = 0;
      const contourProgress = currentTime / (numBars * 4 * beatDuration);
      
      switch (contour) {
        case 'ascending':
          direction = Math.random() < 0.6 ? 1 : -1;
          break;
        case 'descending':
          direction = Math.random() < 0.6 ? -1 : 1;
          break;
        case 'arch':
          direction = contourProgress < 0.5 ? 1 : -1;
          break;
        case 'valley':
          direction = contourProgress < 0.5 ? -1 : 1;
          break;
        case 'wave':
          direction = Math.sin(contourProgress * Math.PI * 4) > 0 ? 1 : -1;
          break;
      }
      
      // Add randomness based on jumpiness
      if (Math.random() < jumpiness) {
        direction *= Math.floor(Math.random() * 3) + 1; // Bigger jumps
      }
      
      currentScaleIndex = Math.max(0, Math.min(extendedScale.length - 1, currentScaleIndex + direction));
      
      const pitch = extendedScale[currentScaleIndex];
      
      // Velocity varies based on position and randomness
      const baseVelocity = genre === 'ambient' ? 60 : 80;
      const velocity = Math.round(baseVelocity + Math.random() * 30);
      
      notes.push({
        pitch,
        velocity,
        startTime: currentTime,
        duration: duration * (0.8 + Math.random() * 0.15), // Slight variation
      });
    }
    
    currentTime += duration;
    noteIndex++;
  }
  
  return notes;
}

// Generate arpeggiated melody pattern
export function generateArpeggioNotes(
  rootMidi: number,
  scaleName: string,
  bpm: number,
  numBars: number,
  pattern: 'up' | 'down' | 'updown' | 'random' = 'up'
): Note[] {
  const notes: Note[] = [];
  const scale = getScale(rootMidi, scaleName);
  const beatDuration = 60 / bpm;
  const noteLength = beatDuration / 2; // Eighth notes
  
  const totalNotes = numBars * 8; // 8 eighth notes per bar
  
  for (let i = 0; i < totalNotes; i++) {
    let scaleIndex: number;
    
    switch (pattern) {
      case 'up':
        scaleIndex = i % scale.length;
        break;
      case 'down':
        scaleIndex = (scale.length - 1) - (i % scale.length);
        break;
      case 'updown':
        const upDownIndex = i % (scale.length * 2 - 2);
        scaleIndex = upDownIndex < scale.length ? upDownIndex : (scale.length * 2 - 2) - upDownIndex;
        break;
      case 'random':
        scaleIndex = Math.floor(Math.random() * scale.length);
        break;
    }
    
    const octaveOffset = Math.floor(i / scale.length) * 12;
    
    notes.push({
      pitch: scale[scaleIndex] + octaveOffset,
      velocity: 70 + Math.random() * 20,
      startTime: i * noteLength,
      duration: noteLength * 0.9,
    });
  }
  
  return notes;
}

// Generate a countermelody (secondary melody that complements main melody)
export function generateCounterMelodyNotes(
  mainMelody: Note[],
  rootMidi: number,
  scaleName: string,
  bpm: number
): Note[] {
  const notes: Note[] = [];
  const scale = getScale(rootMidi, scaleName);
  
  // Add notes between main melody notes (call and response style)
  for (let i = 0; i < mainMelody.length - 1; i++) {
    const currentNote = mainMelody[i];
    const nextNote = mainMelody[i + 1];
    const gap = nextNote.startTime - currentNote.startTime - currentNote.duration;
    
    if (gap > 0.1) {
      // Find a harmonizing note
      const mainPitch = currentNote.pitch % 12;
      const harmonyOptions = scale.filter(s => {
        const diff = Math.abs((s % 12) - mainPitch);
        return diff === 3 || diff === 4 || diff === 7; // Thirds and fifths
      });
      
      if (harmonyOptions.length > 0) {
        const harmonyPitch = harmonyOptions[Math.floor(Math.random() * harmonyOptions.length)];
        
        notes.push({
          pitch: harmonyPitch + 12, // Octave above for brightness
          velocity: 50 + Math.random() * 20,
          startTime: currentNote.startTime + currentNote.duration + gap * 0.3,
          duration: gap * 0.4,
        });
      }
    }
  }
  
  return notes;
}

// Quantize notes to a grid
export function quantizeNotes(notes: Note[], gridValue: number = 0.25): Note[] {
  return notes.map(note => ({
    ...note,
    startTime: Math.round(note.startTime / gridValue) * gridValue,
    duration: Math.round(note.duration / gridValue) * gridValue || gridValue,
  }));
}

```

---

## lib\db.ts

```typescript
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['query'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db
```

---

## lib\utils.ts

```typescript
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

```

---

## stores\musicStore.ts

```typescript
// Zustand store for Loco-Tunes state management

import { create } from 'zustand';
import type { 
  GenerationParams, 
  Track, 
  StemType, 
  EffectSettings, 
  HardwareTier,
  Stem,
} from '@/types/music';
import { DEFAULT_PARAMS, DEFAULT_EFFECTS } from '@/types/music';
import { generateTrack, regenerateStem, generateStemVariation, detectHardwareCapabilities } from '@/lib/audio/generator';
import { getAudioEngine } from '@/lib/audio/engine';
import { exportTrackToMidi, downloadBlob, generateFilename, exportStemToWav, audioBufferToWav } from '@/lib/audio/export';

interface MusicStore {
  // Generation params
  params: GenerationParams;
  
  // Current track
  currentTrack: Track | null;
  
  // Playback state
  isPlaying: boolean;
  currentTime: number;
  
  // Effects
  effects: EffectSettings;
  
  // Hardware
  hardwareTier: HardwareTier;
  
  // UI state
  mode: 'simple' | 'advanced';
  isGenerating: boolean;
  generationProgress: number;
  
  // Audio sources
  activeSources: Map<StemType, AudioBufferSourceNode>;
  
  // Actions
  setParams: (params: Partial<GenerationParams>) => void;
  generateTrack: () => Promise<void>;
  regenerateStem: (stemType: StemType) => Promise<void>;
  playTrack: () => void;
  pauseTrack: () => void;
  stopTrack: () => void;
  setStemVolume: (stemType: StemType, volume: number) => void;
  toggleStemMute: (stemType: StemType) => void;
  toggleStemSolo: (stemType: StemType) => void;
  setEffects: (effects: Partial<EffectSettings>) => void;
  exportWav: () => void;
  exportMidi: () => void;
  setMode: (mode: 'simple' | 'advanced') => void;
  updateCurrentTime: (time: number) => void;
}

export const useMusicStore = create<MusicStore>((set, get) => ({
  // Initial state
  params: DEFAULT_PARAMS,
  currentTrack: null,
  isPlaying: false,
  currentTime: 0,
  effects: DEFAULT_EFFECTS,
  hardwareTier: detectHardwareCapabilities(),
  mode: 'simple',
  isGenerating: false,
  generationProgress: 0,
  activeSources: new Map(),
  
  // Set generation params
  setParams: (newParams) => set((state) => ({
    params: { ...state.params, ...newParams },
  })),
  
  // Generate a new track
  generateTrack: async () => {
    const { params, hardwareTier } = get();
    
    // Limit duration based on hardware tier
    const limitedParams = {
      ...params,
      duration: Math.min(params.duration, hardwareTier.maxDuration),
      complexity: Math.min(params.complexity, hardwareTier.recommendedComplexity),
    };
    
    set({ isGenerating: true, generationProgress: 0 });
    
    try {
      set({ generationProgress: 20 });
      
      const track = await generateTrack(limitedParams);
      
      set({ 
        currentTrack: track, 
        isGenerating: false, 
        generationProgress: 100,
        currentTime: 0,
      });
      
      // Auto-play after generation
      setTimeout(() => get().playTrack(), 100);
      
    } catch (error) {
      console.error('Generation failed:', error);
      set({ isGenerating: false, generationProgress: 0 });
    }
  },
  
  // Regenerate a single stem
  regenerateStem: async (stemType: StemType) => {
    const { currentTrack } = get();
    if (!currentTrack) return;
    
    set({ isGenerating: true });
    
    try {
      const newStem = await regenerateStem(currentTrack, stemType);
      
      set((state) => ({
        currentTrack: state.currentTrack ? {
          ...state.currentTrack,
          stems: state.currentTrack.stems.map(s => 
            s.type === stemType ? newStem : s
          ),
        } : null,
        isGenerating: false,
      }));
    } catch (error) {
      console.error('Stem regeneration failed:', error);
      set({ isGenerating: false });
    }
  },
  
  // Play the track
  playTrack: () => {
    const { currentTrack, isPlaying, activeSources } = get();
    if (!currentTrack || isPlaying) return;
    
    const engine = getAudioEngine();
    const context = engine['context'];
    
    // Check if context is suspended (browser autoplay policy)
    if (context.state === 'suspended') {
      context.resume();
    }
    
    // Stop any existing sources
    activeSources.forEach((source) => {
      try {
        source.stop();
      } catch (e) {
        // Ignore
      }
    });
    
    const newSources = new Map<StemType, AudioBufferSourceNode>();
    
    // Check if any stem is soloed
    const hasSolo = currentTrack.stems.some(s => s.solo);
    
    // Play each stem
    for (const stem of currentTrack.stems) {
      if (!stem.audioBuffer) continue;
      if (stem.muted) continue;
      if (hasSolo && !stem.solo) continue;
      
      const source = context.createBufferSource();
      source.buffer = stem.audioBuffer;
      
      const gainNode = context.createGain();
      gainNode.gain.value = stem.volume;
      
      source.connect(gainNode);
      gainNode.connect(engine.getMasterInput());
      
      source.start(0, get().currentTime);
      newSources.set(stem.type, source);
    }
    
    set({ isPlaying: true, activeSources: newSources });
    
    // Update time during playback
    const startTime = context.currentTime - get().currentTime;
    const updateTime = () => {
      const { isPlaying, currentTrack } = get();
      if (!isPlaying || !currentTrack) return;
      
      const elapsed = context.currentTime - startTime;
      
      if (elapsed >= currentTrack.duration) {
        get().stopTrack();
        return;
      }
      
      set({ currentTime: elapsed });
      requestAnimationFrame(updateTime);
    };
    
    requestAnimationFrame(updateTime);
  },
  
  // Pause the track
  pauseTrack: () => {
    const { activeSources, isPlaying } = get();
    if (!isPlaying) return;
    
    // Stop all sources
    activeSources.forEach((source) => {
      try {
        source.stop();
      } catch (e) {
        // Ignore
      }
    });
    
    set({ isPlaying: false, activeSources: new Map() });
  },
  
  // Stop the track
  stopTrack: () => {
    const { activeSources } = get();
    
    // Stop all sources
    activeSources.forEach((source) => {
      try {
        source.stop();
      } catch (e) {
        // Ignore
      }
    });
    
    set({ isPlaying: false, currentTime: 0, activeSources: new Map() });
  },
  
  // Set stem volume
  setStemVolume: (stemType: StemType, volume: number) => {
    set((state) => ({
      currentTrack: state.currentTrack ? {
        ...state.currentTrack,
        stems: state.currentTrack.stems.map(s => 
          s.type === stemType ? { ...s, volume } : s
        ),
      } : null,
    }));
  },
  
  // Toggle stem mute
  toggleStemMute: (stemType: StemType) => {
    set((state) => ({
      currentTrack: state.currentTrack ? {
        ...state.currentTrack,
        stems: state.currentTrack.stems.map(s => 
          s.type === stemType ? { ...s, muted: !s.muted } : s
        ),
      } : null,
    }));
  },
  
  // Toggle stem solo
  toggleStemSolo: (stemType: StemType) => {
    set((state) => ({
      currentTrack: state.currentTrack ? {
        ...state.currentTrack,
        stems: state.currentTrack.stems.map(s => 
          s.type === stemType ? { ...s, solo: !s.solo } : s
        ),
      } : null,
    }));
  },
  
  // Set effects
  setEffects: (newEffects: Partial<EffectSettings>) => {
    set((state) => ({
      effects: { ...state.effects, ...newEffects },
    }));
    
    // Apply to audio engine
    const engine = getAudioEngine();
    engine.setEffects(get().effects);
  },
  
  // Export to WAV
  exportWav: () => {
    const { currentTrack } = get();
    if (!currentTrack) return;
    
    // For now, export mixed stems
    // In full implementation, we'd render all stems to a single buffer
    const stemWithBuffer = currentTrack.stems.find(s => s.audioBuffer);
    if (!stemWithBuffer?.audioBuffer) return;
    
    const blob = audioBufferToWav(stemWithBuffer.audioBuffer);
    const filename = generateFilename(currentTrack, 'wav');
    downloadBlob(blob, filename);
  },
  
  // Export to MIDI
  exportMidi: () => {
    const { currentTrack } = get();
    if (!currentTrack) return;
    
    const blob = exportTrackToMidi(currentTrack);
    const filename = generateFilename(currentTrack, 'mid');
    downloadBlob(blob, filename);
  },
  
  // Set UI mode
  setMode: (mode: 'simple' | 'advanced') => set({ mode }),
  
  // Update current time
  updateCurrentTime: (time: number) => set({ currentTime: time }),
}));

```

---

## types\music.ts

```typescript
// Music generation types for Loco-Tunes

export type Genre = 'electronic' | 'hiphop' | 'ambient' | 'rock' | 'jazz';

export type Mood = 'happy' | 'sad' | 'energetic' | 'calm' | 'dark' | 'uplifting';

export type StemType = 'drums' | 'bass' | 'melody' | 'harmony';

export interface GenerationParams {
  prompt: string;
  bpm: number;
  genre: Genre;
  mood: Mood;
  duration: number; // in seconds
  key: string;
  scale: 'major' | 'minor' | 'pentatonic' | 'blues' | 'dorian';
  complexity: number; // 0-1
}

export interface Note {
  pitch: number; // MIDI note number
  velocity: number; // 0-127
  startTime: number; // in seconds
  duration: number; // in seconds
}

export interface Stem {
  type: StemType;
  notes: Note[];
  audioBuffer?: AudioBuffer;
  volume: number; // 0-1
  muted: boolean;
  solo: boolean;
  color: string;
}

export interface Track {
  id: string;
  name: string;
  params: GenerationParams;
  stems: Stem[];
  duration: number;
  createdAt: Date;
}

export interface EffectSettings {
  reverb: {
    enabled: boolean;
    mix: number; // 0-1
    decay: number; // in seconds
  };
  eq: {
    enabled: boolean;
    low: number; // -12 to +12 dB
    mid: number;
    high: number;
  };
  compressor: {
    enabled: boolean;
    threshold: number; // -60 to 0 dB
    ratio: number; // 1-20
    attack: number; // in seconds
    release: number; // in seconds
  };
}

export interface HardwareTier {
  level: 'basic' | 'standard' | 'pro';
  cores: number;
  memory: number;
  hasWebAudio: boolean;
  maxDuration: number;
  recommendedComplexity: number;
}

export interface MusicState {
  // Generation params
  params: GenerationParams;
  
  // Current track
  currentTrack: Track | null;
  
  // Playback state
  isPlaying: boolean;
  currentTime: number;
  
  // Effects
  effects: EffectSettings;
  
  // Hardware
  hardwareTier: HardwareTier;
  
  // UI state
  mode: 'simple' | 'advanced';
  isGenerating: boolean;
  
  // Actions
  setParams: (params: Partial<GenerationParams>) => void;
  generateTrack: () => Promise<void>;
  playTrack: () => void;
  pauseTrack: () => void;
  stopTrack: () => void;
  setStemVolume: (stemType: StemType, volume: number) => void;
  toggleStemMute: (stemType: StemType) => void;
  toggleStemSolo: (stemType: StemType) => void;
  setEffects: (effects: Partial<EffectSettings>) => void;
  exportWav: () => void;
  exportMidi: () => void;
  setMode: (mode: 'simple' | 'advanced') => void;
}

// Scale definitions (semitone intervals from root)
export const SCALES: Record<string, number[]> = {
  major: [0, 2, 4, 5, 7, 9, 11],
  minor: [0, 2, 3, 5, 7, 8, 10],
  pentatonic: [0, 2, 4, 7, 9],
  blues: [0, 3, 5, 6, 7, 10],
  dorian: [0, 2, 3, 5, 7, 9, 10],
};

// Chord progressions by genre
export const CHORD_PROGRESSIONS: Record<Genre, number[][]> = {
  electronic: [[0, 0], [3, 0], [4, 0], [4, 5]], // I - IV - V - V/V
  hiphop: [[0, 0], [2, -1], [3, 0], [5, 0]], // i - III - IV - VI
  ambient: [[0, 0], [0, 0], [2, 0], [3, 0]], // Sustained patterns
  rock: [[0, 0], [4, 0], [5, 0], [4, 0]], // I - V - VI - V
  jazz: [[0, 0], [3, 1], [4, 0], [2, 0]], // ii-V-I variations
};

// Note names for MIDI conversion
export const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

// Default values
export const DEFAULT_PARAMS: GenerationParams = {
  prompt: '',
  bpm: 120,
  genre: 'electronic',
  mood: 'energetic',
  duration: 30,
  key: 'C',
  scale: 'minor',
  complexity: 0.5,
};

export const DEFAULT_EFFECTS: EffectSettings = {
  reverb: {
    enabled: true,
    mix: 0.3,
    decay: 2.0,
  },
  eq: {
    enabled: true,
    low: 0,
    mid: 0,
    high: 0,
  },
  compressor: {
    enabled: true,
    threshold: -24,
    ratio: 4,
    attack: 0.003,
    release: 0.25,
  },
};

// Stem colors for UI
export const STEM_COLORS: Record<StemType, string> = {
  drums: '#ef4444',   // red
  bass: '#3b82f6',    // blue
  melody: '#22c55e',  // green
  harmony: '#a855f7', // purple
};

```
