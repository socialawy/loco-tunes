import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { detectHardwareCapabilities, setHardwareOverride, clearHardwareOverride } from '@/lib/audio/generator'

describe('Hardware Detection', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    vi.clearAllMocks()
    localStorage.clear()
  })

  afterEach(() => {
    // Clean up after each test
    clearHardwareOverride()
  })

  it('should return standard defaults for SSR environment', () => {
    // Mock SSR environment
    const originalWindow = globalThis.window
    delete (globalThis as any).window
    
    const result = detectHardwareCapabilities()
    
    expect(result).toEqual({
      level: 'standard',
      cores: 4,
      memory: 8,
      maxDuration: 30,
      recommendedComplexity: 0.5,
      hasWebAudio: false,
      networkType: 'unknown'
    })
    
    // Restore window
    globalThis.window = originalWindow
  })

  it('should detect pro level hardware', () => {
    // Mock high-end hardware
    Object.defineProperty(globalThis, 'navigator', {
      value: {
        hardwareConcurrency: 16,
        deviceMemory: 32,
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        maxTouchPoints: 0
      },
      writable: true
    })

    const result = detectHardwareCapabilities()
    
    expect(result.level).toBe('pro')
    expect(result.cores).toBe(16)
    expect(result.memory).toBe(32)
    expect(result.maxDuration).toBe(60)
    expect(result.recommendedComplexity).toBe(0.8)
  })

  it('should detect basic level hardware', () => {
    // Mock low-end hardware
    Object.defineProperty(globalThis, 'navigator', {
      value: {
        hardwareConcurrency: 2,
        deviceMemory: 4,
        userAgent: 'Mozilla/5.0 (Mobile; Android; rv:68.0) Gecko/68.0 Firefox/88.0',
        maxTouchPoints: 5
      },
      writable: true
    })

    const result = detectHardwareCapabilities()
    
    expect(result.level).toBe('basic')
    expect(result.cores).toBe(2)
    expect(result.memory).toBe(4)
    expect(result.maxDuration).toBe(15)
    expect(result.recommendedComplexity).toBe(0.3)
  })

  it('should use manual override when set', () => {
    // Set manual override
    setHardwareOverride(16, 8)
    
    const result = detectHardwareCapabilities()
    
    expect(result.memory).toBe(16)
    expect(result.cores).toBe(8)
    expect(result.level).toBe('pro')
  })

  it('should clear manual override', () => {
    // Set and then clear override
    setHardwareOverride(16, 8)
    clearHardwareOverride()
    
    // Reset navigator to default mock values
    Object.defineProperty(globalThis, 'navigator', {
      value: {
        hardwareConcurrency: 4,
        deviceMemory: 8,
      },
      writable: true
    })
    
    const result = detectHardwareCapabilities()
    
    // Should revert to defaults (mocked navigator values)
    expect(result.memory).toBe(8) // From setup mock
    expect(result.cores).toBe(4)  // From setup mock
  })

  it('should detect WebAudio support', () => {
    // Mock WebAudio support
    Object.defineProperty(globalThis, 'AudioContext', {
      value: function() {},
      writable: true
    })

    const result = detectHardwareCapabilities()
    expect(result.hasWebAudio).toBe(true)
  })

  it('should detect webkitAudioContext fallback', () => {
    // Mock webkitAudioContext support (Safari)
    Object.defineProperty(globalThis, 'webkitAudioContext', {
      value: function() {},
      writable: true
    })

    const result = detectHardwareCapabilities()
    expect(result.hasWebAudio).toBe(true)
  })

  it('should detect network type when available', () => {
    // Mock network connection API
    Object.defineProperty(globalThis, 'navigator', {
      value: {
        hardwareConcurrency: 4,
        deviceMemory: 8,
        connection: {
          effectiveType: '4g'
        }
      },
      writable: true
    })

    const result = detectHardwareCapabilities()
    expect(result.networkType).toBe('4g')
  })

  it('should handle performance.memory for better memory detection', () => {
    // Mock performance.memory with high heap size
    Object.defineProperty(globalThis, 'performance', {
      value: {
        memory: {
          jsHeapSizeLimit: 16 * 1024 * 1024 * 1024 // 16GB
        }
      },
      writable: true
    })

    const result = detectHardwareCapabilities()
    expect(result.memory).toBeGreaterThanOrEqual(16)
  })

  it('should apply mobile memory limits', () => {
    // Mock mobile device with high reported memory
    Object.defineProperty(globalThis, 'navigator', {
      value: {
        hardwareConcurrency: 8,
        deviceMemory: 16,
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)',
        maxTouchPoints: 5
      },
      writable: true
    })

    const result = detectHardwareCapabilities()
    // Mobile should be capped at 8GB
    expect(result.memory).toBeLessThanOrEqual(8)
  })

  it('should use heuristic for desktop with 8+ cores', () => {
    // Mock desktop with 8+ cores but low reported memory
    Object.defineProperty(globalThis, 'navigator', {
      value: {
        hardwareConcurrency: 8,
        deviceMemory: 4, // Low reported memory
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        maxTouchPoints: 0
      },
      writable: true
    })

    // Mock performance.memory to trigger heuristic
    Object.defineProperty(globalThis, 'performance', {
      value: {
        memory: {
          jsHeapSizeLimit: 4 * 1024 * 1024 * 1024 // 4GB
        }
      },
      writable: true
    })

    const result = detectHardwareCapabilities()
    // Should use heuristic to assume 16GB for desktop with 8+ cores
    expect(result.memory).toBe(16)
  })

  it('should clamp memory to reasonable range', () => {
    // Test with extremely high memory value - but manual override bypasses clamping
    setHardwareOverride(256)
    
    const result = detectHardwareCapabilities()
    // Manual overrides bypass clamping, so this will be 256
    expect(result.memory).toBe(256)
    
    // Test with extremely low memory value
    setHardwareOverride(1)
    
    const result2 = detectHardwareCapabilities()
    // Manual overrides bypass clamping, so this will be 1
    expect(result2.memory).toBe(1)
    
    // Test that automatic detection does clamp
    clearHardwareOverride()
    
    // Mock performance.memory with extremely high value
    Object.defineProperty(globalThis, 'performance', {
      value: {
        memory: {
          jsHeapSizeLimit: 256 * 1024 * 1024 * 1024 // 256GB
        }
      },
      writable: true
    })
    
    const result3 = detectHardwareCapabilities()
    // Automatic detection should clamp to 128
    expect(result3.memory).toBeLessThanOrEqual(128)
  })
})
