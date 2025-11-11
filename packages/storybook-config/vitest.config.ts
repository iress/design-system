/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    testTimeout: 50000,
    setupFiles: ['./vitest.setup.ts'],
    include: ['./src/**/*.test.(tsx|ts)'],
    reporters: ['verbose'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov', 'html'],
      include: ['plugins/**/*', 'src/**/*'],
      exclude: [
        'src/*.ts',
        'src/*.tsx',
        'src/schema/**/*',
        'src/generated/**/*',
        'src/**/index.ts',
        'src/**/constants.ts',
        'src/**/*.stories.*',
        'src/**/*.test.*',
      ],
    },
  },
});
