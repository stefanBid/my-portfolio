import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import Icons from 'unplugin-icons/vite';

import path from 'path';

export default defineConfig({
  plugins: [
    vue(),
    ViteImageOptimizer({
      jpeg: { quality: 75 },
      png: { quality: 80 },
      webp: { quality: 75 },
      svg: { multipass: true },
    }),
    Icons({
      compiler: 'vue3',
      autoInstall: false,
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  assetsInclude: ['**/*.svg'],
});
