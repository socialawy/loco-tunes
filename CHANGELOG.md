# Changelog

All notable changes to Loco-Tunes will be documented in this file.

## [Version 0.2.0] - 2026-02-15

### 🧪 Testing Framework

#### **Complete Test Suite Setup**
- **Added:** Vitest testing framework with TypeScript support
- **Added:** jsdom environment for browser API testing
- **Added:** @testing-library/react and @testing-library/jest-dom for component testing
- **Added:** Comprehensive test configuration in `vitest.config.ts`
- **Added:** Global test setup with browser API mocks in `tests/setup.ts`

#### **Hardware Detection Tests**
- **File:** `tests/hardware-detection.test.ts`
- **Added:** 12 comprehensive test cases covering:
  - SSR environment safety
  - Hardware level detection (basic/standard/pro)
  - Manual override functionality
  - WebAudio API detection
  - Network connection type detection
  - Memory detection heuristics
  - Mobile vs desktop behavior differences
  - Memory value clamping and validation

#### **Test Scripts**
- **Added:** `npm run test` - watch mode for development
- **Added:** `npm run test:run` - single run for CI/CD
- **Added:** `npm run test:ui` - visual test interface

#### **Documentation**
- **Added:** `tests/README.md` with setup instructions and testing guidelines
- **Added:** Comprehensive mocking setup for localStorage, navigator, and browser APIs

### 🔧 Technical Improvements

#### **Code Quality**
- **Fixed:** Lint warnings in test configuration (node:path, globalThis usage)
- **Added:** Security scan with Snyk - no vulnerabilities detected
- **Improved:** Type safety in test mocks and setup

---

## [Version 0.1.0] - 2026-02-15

### ✨ Initial Release
- WebSocket chat server with socket.io
- Complete project structure with Next.js, TypeScript, Tailwind CSS
- Audio engine foundation with Web Audio API
- Basic music generation and export capabilities
- Security scanned with Snyk - no vulnerabilities

---

## Version Format

This project follows [Semantic Versioning](https://semver.org/):
- **MAJOR:** Breaking changes
- **MINOR:** New features (backward compatible)
- **PATCH:** Bug fixes (backward compatible)

---

## Categories

- 🚨 **Critical** - Security or functionality breaking issues
- 🎛️ **Audio Quality** - Sound improvements and fixes
- 🎨 **User Experience** - Interface and interaction improvements
- 🔧 **Technical** - Code quality, type safety, performance
- 📊 **Performance** - Speed and efficiency improvements
