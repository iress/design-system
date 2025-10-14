import typescriptEslintParser from '@typescript-eslint/parser';
import typescriptEslintPlugin from '@typescript-eslint/eslint-plugin';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import sonarjsPlugin from 'eslint-plugin-sonarjs';
import prettierPlugin from 'eslint-plugin-prettier';
import fileProgressPlugin from 'eslint-plugin-file-progress';
import * as mdxPlugin from 'eslint-plugin-mdx';

export default [
  {
    ignores: [
      '**/dist/**',
      '**/coverage/**',
      '**/storybook-static/**',
      '**/*.d.ts',
      '**/theme-preset.ts',
      '**/themes/*.ts',
      '**/styled-system/**',
      '!.storybook',
    ],
  },
  {
    files: ['**/*.{js,jsx,ts,tsx,mjs,cjs}'],
    plugins: {
      'react-hooks': reactHooksPlugin,
      sonarjs: sonarjsPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      ...reactHooksPlugin.configs.recommended.rules,
      ...sonarjsPlugin.configs['recommended-legacy'].rules,
      ...prettierPlugin.configs.recommended.rules,
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: typescriptEslintParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        tsconfigRootDir: import.meta.dirname,
        project: ['./tsconfig.json'],
      },
    },
    plugins: {
      '@typescript-eslint': typescriptEslintPlugin,
      'file-progress': fileProgressPlugin,
    },
    rules: {
      ...typescriptEslintPlugin.configs['recommended-type-checked'].rules,
      ...typescriptEslintPlugin.configs['stylistic-type-checked'].rules,
      'file-progress/activate': 'warn',
      'sonarjs/deprecation': 'off',
      'sonarjs/function-return-type': 'off',
      'sonarjs/todo-tag': 'off',
    },
  },
  {
    files: ['**/*.stories.tsx'],
    rules: {
      'react/no-array-index-key': 'off',
      'react-hooks/rules-of-hooks': 'off',
      'sonarjs/rules-of-hooks': 'off',
    },
  },
  {
    files: ['**/*.test.ts', '**/*.test.tsx'],
    rules: {
      'sonarjs/no-duplicate-string': 'off',
      'sonarjs/no-nested-functions': 'off',
      'sonarjs/cognitive-complexity': 'off',
      // Does not seem to count .not assertions
      'sonarjs/assertions-in-tests': 'off',
      '@typescript-eslint/no-empty-function': 'off',
    },
  },
  {
    ...mdxPlugin.flat,
    files: ['**/*.mdx'],
    rules: {
      ...mdxPlugin.flat.rules,
      'sonarjs/todo-tag': 'off',
    },
  },
];
