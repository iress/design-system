import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import mdx from '@mdx-js/rollup';
import remarkGfm from 'remark-gfm';
import { tanstackRouter } from '@tanstack/router-plugin/vite';
import { resolve } from 'path';

export default defineConfig({
  plugins: [tanstackRouter(), mdx({ remarkPlugins: [remarkGfm] }), react()],
  base: '/design-system/',
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@ai-docs': resolve(__dirname, '../../packages/components/.ai'),
    },
  },
  build: {
    outDir: 'dist',
  },
  server: {
    port: 5555,
    strictPort: true,
  },
});
