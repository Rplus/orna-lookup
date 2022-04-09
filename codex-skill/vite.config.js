import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { visualizer } from 'rollup-plugin-visualizer';
import precompileIntl from 'svelte-intl-precompile/sveltekit-plugin';


// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    svelte(),
    precompileIntl('locales'),
  ],
  server: {
    // https: true,
  },
  build: {
    rollupOptions: {
      plugins: [visualizer()],
    },
  },
})
