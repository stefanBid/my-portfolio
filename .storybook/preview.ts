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
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
