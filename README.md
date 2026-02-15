# 🎵 Loco Tunes

A modern web-based music generation application built with Next.js, TypeScript, and the Web Audio API. Create, customize, and export original music in your browser with support for multiple genres and professional audio features.

## ✨ Features

### 🎼 Music Generation
- **5 Supported Genres**: Electronic, Hip-Hop, Ambient, Rock, Jazz
- **4-Stem Output**: Drums, Bass, Melody, Harmony
- **Procedural Generation**: Algorithmic composition with mood-based patterns
- **Real-time Preview**: Instant audio playback with Web Audio API
- **Customizable Parameters**: Tempo, key, mood, complexity controls

### 🎛️ Audio Processing
- **Professional Effects**: Reverb, 3-band EQ, Compressor
- **Hardware Optimization**: Automatic performance tier detection
- **High-Quality Export**: WAV (44.1kHz, 16-bit) and MIDI (Type 1, 480 PPQ)
- **Real-time Synthesis**: Web Audio API-based sound generation

### 🎨 User Interface
- **Modern Dark Theme**: Beautiful gradient accents and smooth animations
- **Simple Mode**: Quick generation for beginners
- **Advanced Mode**: Timeline view with detailed controls
- **Stem Mixer**: Individual track control and mixing
- **Waveform Visualization**: Real-time audio waveform display

## 🛠️ Technology Stack

### 🎯 Core Framework
- **⚡ Next.js 16** - The React framework for production with App Router
- **📘 TypeScript 5** - Type-safe JavaScript for better developer experience
- **🎨 Tailwind CSS 4** - Utility-first CSS framework for rapid UI development

### 🎵 Audio & Music
- **🎧 Web Audio API** - Real-time audio synthesis and processing
- **🎼 Music Theory** - Algorithmic chord progressions and melody generation
- **🎛️ DSP Effects** - Professional audio processing and effects

### 🧩 UI Components & Styling
- **🧩 shadcn/ui** - High-quality, accessible components built on Radix UI
- **🎯 Lucide React** - Beautiful & consistent icon library
- **🌈 Framer Motion** - Production-ready motion library for React
- **🎨 Next Themes** - Perfect dark mode in 2 lines of code

### 📋 Forms & Validation
- **🎣 React Hook Form** - Performant forms with easy validation
- **✅ Zod** - TypeScript-first schema validation

### 🔄 State Management & Data Fetching
- **🐻 Zustand** - Simple, scalable state management
- **🔄 TanStack Query** - Powerful data synchronization for React
- **🌐 Fetch** - Promise-based HTTP request

### 🗄️ Database & Backend
- **🗄️ Prisma** - Next-generation TypeScript ORM
- **🔐 NextAuth.js** - Complete open-source authentication solution

### 🎨 Advanced UI Features
- **📊 TanStack Table** - Headless UI for building tables and datagrids
- **🖱️ DND Kit** - Modern drag and drop toolkit for React
- **📊 Recharts** - Redefined chart library built with React and D3
- **🖼️ Sharp** - High performance image processing

### 🌍 Internationalization & Utilities
- **🌍 Next Intl** - Internationalization library for Next.js
- **📅 Date-fns** - Modern JavaScript date utility library
- **🪝 ReactUse** - Collection of essential React hooks for modern development

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or bun package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/socialawy/loco-tunes.git
cd loco-tunes

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Set up the database
npm run db:push

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your application running.

### Build & Deploy

```bash
# Build for production
npm run build

# Start production server
npm start
```

## 📁 Project Structure

```
src/
├── app/                 # Next.js App Router pages
│   ├── page.tsx        # Main application page
│   ├── layout.tsx      # Root layout
│   └── globals.css     # Global styles
├── components/          # Reusable React components
│   ├── music/          # Music-specific components
│   │   ├── SimpleMode.tsx
│   │   ├── AdvancedMode.tsx
│   │   ├── StemMixer.tsx
│   │   ├── EffectsRack.tsx
│   │   ├── Waveform.tsx
│   │   ├── TransportControls.tsx
│   │   └── ExportPanel.tsx
│   └── ui/             # shadcn/ui components
├── lib/                # Utility functions and configurations
│   └── audio/          # Audio processing modules
│       ├── engine.ts   # Web Audio API engine
│       ├── generator.ts # Main music generator
│       ├── chords.ts   # Chord progression
│       ├── drums.ts    # Drum patterns
│       ├── melody.ts   # Melody generation
│       ├── effects.ts  # DSP effects
│       └── export.ts   # Audio export
├── types/              # TypeScript type definitions
│   └── music.ts        # Music-related types
├── stores/             # Zustand state stores
│   └── musicStore.ts   # Music application state
├── hooks/              # Custom React hooks
└── prisma/             # Database schema and migrations
```

## 🎵 Supported Genres

### 🎹 Electronic
- Synth-heavy compositions
- Electronic drum patterns
- Filter sweeps and automation

### 🎤 Hip-Hop
- Boom-bap and trap patterns
- Bass-heavy grooves
- Sample-friendly structures

### 🌊 Ambient
- Atmospheric pads
- Slow tempos
- Evolving textures

### 🎸 Rock
- Guitar-driven progressions
- Classic rock drum patterns
- Power chord structures

### 🎷 Jazz
- Complex chord progressions
- Swing rhythms
- Improvisational patterns

## 🎛️ Audio Features

### Real-time Processing
- **Low Latency**: Optimized for real-time performance
- **Hardware Detection**: Automatic performance tier adjustment
- **Browser Compatibility**: Works across modern browsers

### Effects Chain
- **Reverb**: Spatial depth and atmosphere
- **3-Band EQ**: Low, mid, high frequency control
- **Compressor**: Dynamic range control

### Export Options
- **WAV Format**: 44.1kHz, 16-bit quality
- **MIDI Format**: Type 1, 480 PPQ for DAW compatibility
- **Stem Export**: Individual track files

## 🎨 UI Components

### Generation Modes
- **Simple Mode**: Quick generation with basic controls
- **Advanced Mode**: Timeline view with detailed editing
- **Stem Mixer**: Individual track volume and effects

### Visualization
- **Waveform Display**: Real-time audio visualization
- **Transport Controls**: Play, pause, stop, seek
- **Progress Indicators**: Generation and export progress

## � Development

### Audio Development
- Use Web Audio API for all audio processing
- Follow the established audio engine architecture
- Test across different browsers and hardware
- Consider performance implications

### Component Development
- Use existing shadcn/ui components when possible
- Follow the established component structure
- Include proper TypeScript types
- Add accessibility attributes

### State Management
- Use Zustand for application state
- Keep audio state separate from UI state
- Optimize for real-time performance

## 🧪 Testing

```bash
# Run tests
npm run test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

### Audio Testing
- Test audio generation with different parameters
- Verify export functionality (WAV, MIDI)
- Test real-time playback performance
- Check compatibility across browsers

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

### Areas for Contribution
- **Audio Algorithms**: Improve generation quality
- **New Genres**: Add support for additional music styles
- **UI/UX**: Enhance user interface and experience
- **Performance**: Optimize real-time processing
- **Accessibility**: Improve accessibility features

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔒 Security

For security concerns, please see our [Security Policy](SECURITY.md).

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/socialawy/loco-tunes/issues)
- **Discussions**: [GitHub Discussions](https://github.com/socialawy/loco-tunes/discussions)

## 🙏 Acknowledgments

- Web Audio API community for audio processing insights
- shadcn/ui for beautiful, accessible components
- Next.js team for the excellent framework
- All contributors and beta testers

---

**Made with ❤️ for 🎵 and content creators, by [Socialawy](https://github.com/socialawy)**

