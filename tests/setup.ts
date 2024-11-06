import { config } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import '@testing-library/jest-dom';

const pinia = createPinia();
setActivePinia(pinia);

config.global.plugins = [pinia];

global.ResizeObserver = class {
  constructor(_) {}

  observe(): void {}

  unobserve(): void {}

  disconnect(): void {}
};

global.IntersectionObserver = class IntersectionObserver {
  root: Element | null = null;
  rootMargin: string = '';
  thresholds: ReadonlyArray<number> = [];

  constructor(
    public callback: IntersectionObserverCallback,
    public options?: IntersectionObserverInit,
  ) {}

  observe(target: Element): void {
    // Simulate the callback invocation when an element is observed.
    this.callback([{ isIntersecting: true, target }] as IntersectionObserverEntry[], this);
  }

  unobserve(_: Element): void {}

  disconnect(): void {}

  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
};
