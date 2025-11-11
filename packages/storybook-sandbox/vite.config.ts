import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import reloadStorybookPreviewPlugin from '../../shared/reload-storybook-preview-plugin';
import { peerDependencies } from './package.json';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), reloadStorybookPreviewPlugin],
  build: {
    rollupOptions: {
      external: Object.keys(peerDependencies),
    },
  },
  css: {
    postcss: {
      plugins: [],
    },
  },
});
