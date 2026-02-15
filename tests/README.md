# Tests

This directory contains the test suite for the Loco Tunes application.

## Setup

The project uses **Vitest** as the testing framework with the following setup:

- **Vitest**: Fast unit test framework
- **jsdom**: DOM environment for testing browser-related code
- **@testing-library/react**: For React component testing
- **@testing-library/jest-dom**: Custom matchers for DOM assertions

## Running Tests

```bash
# Run tests once
npm run test:run

# Run tests in watch mode
npm run test

# Run tests with UI interface
npm run test:ui
```

## Test Structure

- `setup.ts`: Global test setup with mocks for browser APIs
- `*.test.ts`: Test files following the Vitest naming convention

## Current Tests

### Hardware Detection Tests (`hardware-detection.test.ts`)

Comprehensive tests for the `detectHardwareCapabilities()` function:

- SSR environment handling
- Hardware level detection (basic/standard/pro)
- Manual override functionality
- WebAudio API detection
- Network type detection
- Memory detection heuristics
- Mobile vs desktop behavior
- Memory value clamping

## Mocking

The test setup includes mocks for:

- `localStorage` with full implementation
- `navigator` properties (hardwareConcurrency, deviceMemory, etc.)
- Browser APIs (AudioContext, performance.memory, etc.)

## Adding New Tests

1. Create test files with `.test.ts` suffix
2. Use Vitest functions: `describe`, `it`, `expect`, `vi`
3. Import functions to test using `@/` path alias
4. Follow the existing test patterns and structure

Example:
```typescript
import { describe, it, expect } from 'vitest'
import { myFunction } from '@/lib/my-module'

describe('My Function', () => {
  it('should work correctly', () => {
    const result = myFunction()
    expect(result).toBe(expectedValue)
  })
})
```
