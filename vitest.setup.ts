import 'vitest-dom/extend-expect';
import { vi } from 'vitest';

// Mock IndexedDB
const dummyStorage = new Map();
globalThis.indexedDB = {
  open: vi.fn(),
  deleteDatabase: vi.fn(),
  cmp: vi.fn(),
  databases: vi.fn(),
} as any;
