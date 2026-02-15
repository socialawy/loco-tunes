# Pull Request Template

## 📋 Description

Please include a summary of the changes and why they're necessary.

## 🎯 Type of Change

Please check all that apply:

- [ ] **Bug fix** - Non-breaking changes that fix an issue
- [ ] **New feature** - Non-breaking changes that add functionality
- [ ] **Breaking change** - Changes that break existing functionality
- [ ] **Documentation** - Documentation only changes
- [ ] **Performance** - Performance improvements
- [ ] **Code quality** - Code refactoring, style improvements
- [ ] **Tests** - Adding or updating tests
- [ ] **Accessibility** - A11y improvements

## 🎵 Audio-Specific Changes (if applicable)

- [ ] **Audio Engine** - Core audio processing changes
- [ ] **Genre Support** - New or improved genre algorithms
- [ ] **Effects** - New or improved audio effects
- [ ] **Export** - Changes to export functionality
- [ ] **Real-time** - Real-time playback improvements

## 🧪 Testing

Please describe how you tested your changes:

- [ ] **Manual testing** - Tested manually in browser
- [ ] **Unit tests** - Added or updated unit tests
- [ ] **Integration tests** - Added integration tests
- [ ] **Audio testing** - Tested audio generation and playback
- [ ] **Cross-browser** - Tested in multiple browsers
- [ ] **Performance** - Tested performance impact

### Test Environment

- **OS**: [e.g. Windows 11, macOS 13.0]
- **Browser**: [e.g. Chrome 108, Firefox 107]
- **Node Version**: [e.g. 18.12.1]
- **Audio Hardware**: [e.g. Built-in speakers, USB headphones]

## 📸 Screenshots (if applicable)

Please add screenshots to help explain your changes.

## 📝 Checklist

Please go through the following checklist:

### Code Quality
- [ ] My code follows the project's style guidelines
- [ ] I have performed self-review of my code
- [ ] I have commented my code where necessary
- [ ] I have updated the documentation if needed

### Testing
- [ ] I have added tests that cover my changes
- [ ] All new and existing tests pass
- [ ] I have tested audio functionality specifically
- [ ] I have tested cross-browser compatibility

### Security
- [ ] I have considered security implications
- [ ] I have run security scans (Snyk)
- [ ] I have validated user inputs
- [ ] I have checked for XSS vulnerabilities

### Performance
- [ ] I have considered performance impact
- [ ] I have tested with large audio files
- [ ] I have checked memory usage
- [ ] I have optimized real-time processing

### Documentation
- [ ] I have updated README.md if needed
- [ ] I have updated API documentation
- [ ] I have added examples if applicable
- [ ] I have documented breaking changes

## 🔗 Related Issues

Closes #<issue_number>
Related to #<issue_number>

## 📊 Changes Overview

### Files Changed
- `src/components/music/ComponentName.tsx` - Description of changes
- `src/lib/audio/engine.ts` - Description of changes
- `README.md` - Updated documentation

### API Changes
- [ ] **Breaking** - List breaking changes
- [ ] **Non-breaking** - List non-breaking changes
- [ ] **Deprecated** - List deprecated features

### Database Changes
- [ ] **Schema changes** - Describe database schema changes
- [ ] **Migrations** - Describe migration requirements

## 🎵 Audio Testing Results

### Generation Testing
- [ ] Tested all supported genres
- [ ] Tested different parameter combinations
- [ ] Verified audio quality
- [ ] Checked for audio artifacts

### Export Testing
- [ ] WAV export works correctly
- [ ] MIDI export works correctly
- [ ] File formats are valid
- [ ] Export quality is acceptable

### Real-time Testing
- [ ] Playback works smoothly
- [ ] No audio glitches or dropouts
- [ ] Latency is acceptable
- [ ] Memory usage is reasonable

## 🚀 Deployment

### Deployment Requirements
- [ ] **Environment variables** - List required env vars
- [ ] **Database migrations** - Required migrations
- [ ] **Build process** - Special build requirements
- [ ] **Dependencies** - New dependencies

### Rollback Plan
- [ ] **Rollback steps** - How to rollback if needed
- [ ] **Data migration** - Data rollback considerations
- [ ] **User impact** - Expected user impact

## 📈 Performance Impact

### Before Changes
- **Load time**: [e.g. 2.3s]
- **Memory usage**: [e.g. 45MB]
- **CPU usage**: [e.g. 15%]
- **Audio latency**: [e.g. 23ms]

### After Changes
- **Load time**: [e.g. 1.8s]
- **Memory usage**: [e.g. 42MB]
- **CPU usage**: [e.g. 12%]
- **Audio latency**: [e.g. 18ms]

## 🤝 Reviewers

Please tag relevant reviewers:

- @socialawy - Project lead
- [Other maintainers]

## 📚 Additional Context

Add any other context about the pull request here.

## 🔍 Merge Readiness

- [ ] **Ready to merge** - All checks pass and ready for review
- [ ] **Work in progress** - Still being developed
- [ ] **Needs feedback** - Requires input before proceeding

---

Thank you for contributing to Loco Tunes! 🎵
