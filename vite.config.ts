import { defineConfig, type PluginOption } from 'vite';
import vue from '@vitejs/plugin-vue';
import svgLoader from 'vite-svg-loader';
import { resolve } from 'path';
import viteCompression from 'vite-plugin-compression';

// https://vitejs.dev/config/
export default defineConfig(() => {
  const plugins: PluginOption[] = [
    vue(),
    svgLoader({ defaultImport: 'component' }),
    viteCompression()
  ];

  return {
    plugins,
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return id.toString().split('node_modules/')[1].split('/')[0].toString();
            }
          },
        },
      },
    },
  };
});
