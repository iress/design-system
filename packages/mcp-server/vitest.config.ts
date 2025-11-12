import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    passWithNoTests: true,
    environment: 'node',
    reporters: ['verbose'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov', 'html', 'json', 'json-summary'],
      exclude: [
        'node_modules/',
        'dist/',
        'coverage/',
        'generated/',
        '**/*.config.*',
        '**/*.test.*',
        '**/*.d.ts',
        'scripts/config.ts',
        'src/tools.ts',
        'src/types.ts',
        'src/config.ts',
        'src/index.ts',
      ],
    },
  },
});
