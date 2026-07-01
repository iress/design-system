import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import mdx from '@mdx-js/rollup';
import remarkGfm from 'remark-gfm';
import rehypePrism from 'rehype-prism-plus';
import { tanstackRouter } from '@tanstack/router-plugin/vite';
import { resolve } from 'path';
import { execSync } from 'child_process';

function getCurrentBranch() {
  try {
    return execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf-8' })
      .trim()
      .replace(/[^a-zA-Z0-9-]/g, '-');
  } catch {
    return 'main';
  }
}

export default defineConfig({
  plugins: [
    tanstackRouter(),
    mdx({
      remarkPlugins: [remarkGfm],
      rehypePlugins: [[rehypePrism, { ignoreMissing: true }]],
      providerImportSource: '@mdx-js/react',
    }),
    react(),
  ],
  base: '/design-system/',
  define: {
    __STORYBOOK_BRANCH__: JSON.stringify(
      process.env.VITE_STORYBOOK_BRANCH || getCurrentBranch(),
    ),
  },
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
