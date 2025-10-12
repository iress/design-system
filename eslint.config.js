import typescriptEslintParser from '@typescript-eslint/parser';
import typescriptEslintPlugin from '@typescript-eslint/eslint-plugin';
import prettierPlugin from 'eslint-plugin-prettier';

export default [
  {
    ignores: [
      '**/dist/**',
      '**/coverage/**',
      '**/node_modules/**',
      '**/storybook-static/**',
      'apps/**', // Let project configs handle their own linting
      'packages/**', // Let project configs handle their own linting
      'output/**',
      'ci/**',
      'src/generated/**', // Ignore generated files
    ],
  },
  {
    // Root-level configuration files
    files: [
      '*.js',
      '*.mjs',
      '*.cjs',
      '*.ts',
      'shared/**/*.js',
      'scripts/**/*.js',
    ],
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      ...prettierPlugin.configs.recommended.rules,
    },
  },
  {
    // TypeScript config files at root
    files: ['*.ts'],
    languageOptions: {
      parser: typescriptEslintParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': typescriptEslintPlugin,
    },
    rules: {
      ...typescriptEslintPlugin.configs.recommended.rules,
    },
  },
];
