/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    include: ['./src/**/*.test.{ts,tsx}'],
    reporters: ['verbose'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov', 'html', 'json', 'json-summary'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'src/vite-env.d.ts',
        'src/mdx.d.ts',
        'src/routeTree.gen.ts',
        'src/**/*.test.*',
      ],
    },
  },
});
