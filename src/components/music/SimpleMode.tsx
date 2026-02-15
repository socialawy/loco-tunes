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
