import '@testing-library/jest-dom';
import { config } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import { vi, afterEach } from 'vitest';

const pinia = createPinia();
setActivePinia(pinia);

config.global.plugins = [pinia];

// Mock ResizeObserver globally
const mockResizeObserver = vi.fn(() => {
  return {
    constructor: vi.fn(),
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  };
});

// Mock IntersectionObserver globally
const mockIntersectionObserver = vi.fn((callback) => {
  return {
    constructor: vi.fn(),
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
    trigger: (isIntersecting: boolean) => {
      callback([{ isIntersecting }] as IntersectionObserverEntry[]);
    },
  };
});

global.IntersectionObserver = mockIntersectionObserver as unknown as typeof IntersectionObserver;
global.ResizeObserver = mockResizeObserver as unknown as typeof ResizeObserver;

// Clear mocks after each test
afterEach(() => {
  vi.clearAllMocks();
  vi.resetModules();
  vi.useRealTimers();
  pinia.state.value = {};
});
