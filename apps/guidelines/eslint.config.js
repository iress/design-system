import {
  baseIgnores,
  baseJavaScriptConfig,
  createTypeScriptConfig,
  baseTestConfig,
  createSonarConfig,
  createMdxConfig,
} from '../../shared/eslint-base.config.js';

export default [
  {
    ignores: [
      ...baseIgnores,
      'src/routeTree.gen.ts',
      'public/pagefind/**',
      'scripts/**',
      'vite.config.ts',
      'vitest.config.ts',
      'vitest.setup.ts',
    ],
  },
  baseJavaScriptConfig,
  createTypeScriptConfig(import.meta.dirname),
  await createSonarConfig(),
  baseTestConfig,
  await createMdxConfig(),
  {
    files: ['**/*.mdx'],
    rules: {
      // MDX expressions are not unused expressions
      'no-unused-expressions': 'off',
    },
  },
  {
    files: ['src/**/*.{ts,tsx}'],
    rules: {
      // Guidelines app uses untyped third-party APIs (pagefind, MDX dynamic imports)
      '@typescript-eslint/no-unsafe-assignment': 'warn',
      '@typescript-eslint/no-unsafe-call': 'warn',
      '@typescript-eslint/no-unsafe-member-access': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'warn',
      // Empty handlers are common in app-level component examples
      '@typescript-eslint/no-empty-function': 'off',
      // App components don't need read-only props enforcement
      'sonarjs/prefer-read-only-props': 'off',
      // Allow || for defaults in app code (less strict than library code)
      '@typescript-eslint/prefer-nullish-coalescing': 'warn',
      // PostMessage in same-origin iframe communication
      'sonarjs/post-message': 'warn',
    },
  },
];
