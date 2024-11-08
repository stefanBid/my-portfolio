import { config } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import '@testing-library/jest-dom';
import { vi } from 'vitest';

const pinia = createPinia();
setActivePinia(pinia);

config.global.plugins = [pinia];

// Mock ResizeObserver globally
const mockResizeObserver = vi.fn(() => {
  return {
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  };
});

// Mock IntersectionObserver globally
const mockIntersectionObserver = vi.fn((callback) => {
  return {
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
