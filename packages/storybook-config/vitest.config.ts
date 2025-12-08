/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    globals: true,
    environment: 'jsdom',
    environmentOptions: {
      jsdom: {
        resources: undefined, // Disable resource loading (including CSS)
        runScripts: 'dangerously',
        pretendToBeVisual: false, // Disable CSS calculations
      },
    },
    testTimeout: 50000,
    setupFiles: ['./vitest.setup.ts'],
    include: ['./src/**/*.test.(tsx|ts)'],
    reporters: ['verbose'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov', 'html', 'json', 'json-summary'],
      include: ['plugins/**/*.{ts,tsx}', 'src/**/*.{ts,tsx}'],
      exclude: [
        'src/*.ts',
        'src/*.tsx',
        'src/schema/**/*',
        'src/generated/**/*',
        'src/**/index.ts',
        'src/**/constants.ts',
        'src/**/*.stories.*',
        'src/**/*.test.*',
        'src/**/*.docs.mdx',
        'src/**/*.html',
      ],
    },
  },
});
