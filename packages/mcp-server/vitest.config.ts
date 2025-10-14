/// <reference types="vitest" />

import { defineConfig } from 'vitest/config';
export default defineConfig({
  test: {
    globals: true,
    passWithNoTests: true,
    environment: 'node',
    reporters: ['verbose'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov', 'html'],
      exclude: [
        'node_modules/',
        'dist/',
        'coverage/',
        'generated/',
        '**/*.config.*',
        '**/*.test.*',
        '**/*.d.ts',
        'src/tools.ts',
        'src/types.ts',
        'src/config.ts',
        'src/index.ts',
      ],
    },
  },
});
