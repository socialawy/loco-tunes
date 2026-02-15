'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { setHardwareOverride, clearHardwareOverride } from '@/lib/audio/generator';

export function HardwareSettings() {
  const [memory, setMemory] = useState('16');
  const [cores, setCores] = useState('8');

  const handleSetOverride = () => {
    const memoryNum = Number.parseInt(memory);
    const coresNum = Number.parseInt(cores);
    
    if (memoryNum >= 4 && memoryNum <= 128 && coresNum >= 1 && coresNum <= 32) {
      setHardwareOverride(memoryNum, coresNum);
      window.location.reload(); // Refresh to apply changes
    } else {
      alert('Invalid values. Memory: 4-128GB, Cores: 1-32');
    }
  };

  const handleClearOverride = () => {
    clearHardwareOverride();
    window.location.reload(); // Refresh to apply changes
  };

  // Show current detection info
  const detectionInfo = typeof window !== 'undefined' ? {
    userAgent: navigator.userAgent,
    isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
    cores: navigator.hardwareConcurrency,
    deviceMemory: (navigator as Navigator & { deviceMemory?: number }).deviceMemory,
  } : null;

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Hardware Settings</CardTitle>
        <CardDescription>
          Override automatic hardware detection if it's not accurate
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {detectionInfo && (
          <div className="text-sm text-muted-foreground mb-4 p-3 bg-muted rounded">
            <div><strong>Device:</strong> {detectionInfo.isMobile ? 'Mobile' : 'Desktop'}</div>
            <div><strong>CPU Cores:</strong> {detectionInfo.cores}</div>
            <div><strong>Device Memory:</strong> {detectionInfo.deviceMemory || 'Unknown'}GB</div>
            <div><strong>User Agent:</strong> {detectionInfo.userAgent.substring(0, 50)}...</div>
          </div>
        )}
        
        <div className="space-y-2">
          <Label htmlFor="memory">Memory (GB)</Label>
          <Input
            id="memory"
            type="number"
            value={memory}
            onChange={(e) => setMemory(e.target.value)}
            min="4"
            max="128"
            placeholder="16"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="cores">CPU Cores</Label>
          <Input
            id="cores"
            type="number"
            value={cores}
            onChange={(e) => setCores(e.target.value)}
            min="1"
            max="32"
            placeholder="8"
          />
        </div>
        <div className="flex gap-2">
          <Button onClick={handleSetOverride} className="flex-1">
            Set Override
          </Button>
          <Button onClick={handleClearOverride} variant="outline">
            Clear
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">
          After setting override, page will refresh to apply changes.
          <br />
          <strong>Mobile Safety:</strong> Mobile devices are capped at 8GB max for performance.
        </p>
      </CardContent>
    </Card>
  );
}
