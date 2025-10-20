/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

export default defineConfig({
  test: {
    include: ['src/**/*.test.ts', 'src/**/*.test.tsx'],
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts',
    testTimeout: 10000,
    reporters: ['verbose'],
    coverage: {
      provider: 'v8',
      reporter: ['lcov', 'html'],
      exclude: [
        'src/**/*.stories.*',
        'src/**/*.test.*',
        'src/**/mocks/**/*',
        'src/**/examples/**/*',
        'src/main.ts',
        'src/vite-env.d.ts',
      ],
    },
    // Performance optimizations
    pool: 'threads',
    poolOptions: {
      threads: {
        singleThread: false,
        useAtomics: true,
      },
    },
    // Better error reporting
    outputFile: {
      html: './coverage/index.html',
    },
    // Retry flaky tests
    retry: 2,
  },
  resolve: {
    alias: [
      { find: '@', replacement: resolve(__dirname, 'src') },
      {
        find: '@components',
        replacement: resolve(__dirname, 'src/components'),
      },
      { find: '@helpers', replacement: resolve(__dirname, 'src/helpers') },
      {
        find: '@theme-preset',
        replacement: resolve(__dirname, 'theme-preset'),
      },
    ],
  },
  css: {
    postcss: {
      plugins: [],
    },
  },
});
