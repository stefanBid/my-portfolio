import type { Preview } from '@storybook/vue3';
import { setup } from '@storybook/vue3';
import '../src/style/index.css';

import { createPinia } from 'pinia';

setup((app) => {
  const pinia = createPinia();
  app.use(pinia);
});

const preview: Preview = {
  parameters: {
    backgrounds: {
      values: [
        { name: 'light', value: '#fff' },
        { name: 'dark', value: '#0F0F20' },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
