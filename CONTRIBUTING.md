# Contributing to Loco Tunes

Thank you for your interest in contributing to Loco Tunes! This document provides guidelines and information for contributors.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or bun package manager
- Git

### Setup

1. **Fork the repository**
   ```bash
   git clone https://github.com/your-username/loco-tunes.git
   cd loco-tunes
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up the database**
   ```bash
   cp .env.example .env
   npm run db:push
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

## 📝 Development Guidelines

### Code Style

- Use TypeScript for all new code
- Follow ESLint configuration
- Use Prettier for formatting
- Write meaningful commit messages

### Component Guidelines

- Use existing shadcn/ui components when possible
- Follow the established component structure
- Include proper TypeScript types
- Add accessibility attributes

### Audio Development

- Use the Web Audio API for audio processing
- Follow the existing audio engine architecture
- Test audio features across different browsers
- Consider performance implications

## 🧪 Testing

### Running Tests

```bash
npm run test
npm run test:watch
npm run test:coverage
```

### Audio Testing

- Test audio generation with different parameters
- Verify export functionality (WAV, MIDI)
- Test real-time playback
- Check performance with complex compositions

## 📋 Submitting Changes

### Pull Request Process

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Follow coding standards
   - Add tests for new functionality
   - Update documentation

3. **Commit your changes**
   ```bash
   git commit -m "feat: add your feature description"
   ```

4. **Push and create PR**
   ```bash
   git push origin feature/your-feature-name
   ```

### PR Requirements

- Clear description of changes
- Tests passing
- Code follows style guidelines
- Documentation updated if needed
- No breaking changes without discussion

## 🐛 Bug Reports

When reporting bugs, please include:

- Environment information (OS, browser, Node version)
- Steps to reproduce
- Expected vs actual behavior
- Any error messages
- Screenshots if applicable

## 💡 Feature Requests

- Use clear, descriptive titles
- Provide detailed description of the feature
- Explain the use case and benefit
- Consider implementation complexity
- Tag relevant maintainers

## 🎵 Music Generation Contributions

### Audio Engine

- Follow the existing audio architecture
- Use established DSP patterns
- Consider browser compatibility
- Test with various audio hardware

### Genre Support

- Follow existing genre patterns
- Include appropriate chord progressions
- Consider cultural sensitivity
- Test genre-specific features

### Export Formats

- Follow format specifications
- Test exported files
- Consider file size optimization
- Validate format compatibility

## 🏷️ Labels

- `bug` - Bug reports and fixes
- `enhancement` - New features and improvements
- `audio` - Audio engine and generation features
- `ui` - User interface components
- `docs` - Documentation improvements
- `performance` - Performance optimizations
- `accessibility` - A11y improvements

## 🤝 Code of Conduct

Please be respectful and inclusive. See [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) for details.

## 📞 Getting Help

- Create an issue for bugs or questions
- Join discussions in existing issues
- Check existing documentation
- Review similar projects for inspiration

## 🎯 Priority Areas

We're currently focusing on:

1. **Audio Quality** - Improving generation algorithms
2. **Performance** - Optimizing real-time playback
3. **Accessibility** - Making features available to all users
4. **Documentation** - Improving guides and examples
5. **Testing** - Increasing test coverage

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Web Audio API MDN](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)

---

Thank you for contributing to Loco Tunes! 🎵
