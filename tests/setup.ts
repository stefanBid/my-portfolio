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
