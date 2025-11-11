import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src'),
      react: path.resolve(__dirname, '../../node_modules/react'),
      'react-dom': path.resolve(__dirname, '../../node_modules/react-dom'),
      'react/jsx-runtime': path.resolve(
        __dirname,
        '../../node_modules/react/jsx-runtime',
      ),
      'react/jsx-dev-runtime': path.resolve(
        __dirname,
        '../../node_modules/react/jsx-dev-runtime',
      ),
    },
  },
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov', 'html', 'json', 'json-summary'],
      exclude: ['**/*.test.ts', '**/*.stories.tsx', 'src/*.{ts,tsx}'],
      include: ['src'],
      reportsDirectory: path.resolve(__dirname, 'coverage'),
    },
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    testTimeout: 50000,
    reporters: ['verbose'],
    // Optimize for Yarn workspace
    pool: 'threads',
    poolOptions: {
      threads: {
        singleThread: false,
        useAtomics: true,
      },
    },
    // Optimize test discovery and execution
    watch: false, // Disable watch mode for CI
    silent: process.env.CI === 'true',
    retry: 2, // Retry tests that fail
  },
});
