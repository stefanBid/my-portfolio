import type { Preview } from '@storybook/vue3';
import { themes } from '@storybook/theming';
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
    darkMode: {
      current: 'dark',
    },
    docs: {
      themes: themes.dark,
    },
  },
};

export default preview;
