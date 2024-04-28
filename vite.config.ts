import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), svgLoader({defaultImport: 'component'})],
  resolve: {
		alias: {
			'@': resolve(__dirname, './src'),
		},
	},
})
