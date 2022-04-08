import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { visualizer } from 'rollup-plugin-visualizer';


// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [svelte()],
  server: {
    // https: true,
  },
  build: {
    rollupOptions: {
      plugins: [visualizer()],
    },
  },
})
