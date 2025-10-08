import typescriptEslintParser from '@typescript-eslint/parser';
import typescriptEslintPlugin from '@typescript-eslint/eslint-plugin';
import prettierPlugin from 'eslint-plugin-prettier';
import fileProgressPlugin from 'eslint-plugin-file-progress';

// Dynamic imports for optional plugins
export async function createReactConfig() {
  const [reactHooksPlugin, reactRefreshPlugin] = await Promise.all([
    import('eslint-plugin-react-hooks'),
    import('eslint-plugin-react-refresh'),
  ]);

  return {
    files: ['**/*.{jsx,tsx}'],
    plugins: {
      'react-hooks': reactHooksPlugin.default,
      'react-refresh': reactRefreshPlugin.default,
    },
    rules: {
      ...reactHooksPlugin.default.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  };
}

export async function createMdxConfig() {
  const mdxPlugin = await import('eslint-plugin-mdx');

  return {
    ...mdxPlugin.flat,
    files: ['**/*.mdx'],
    rules: {
      ...mdxPlugin.flat.rules,
    },
  };
}

// Base configuration that all projects can extend
export const baseIgnores = [
  '**/dist/**',
  '**/coverage/**',
  '**/node_modules/**',
  '**/mockServiceWorker.js',
  '**/prettier.config.mjs',
];

export const baseJavaScriptConfig = {
  files: ['**/*.{js,jsx,ts,tsx,mjs,cjs}'],
  languageOptions: {
    globals: {
      browser: true,
      es2020: true,
    },
  },
  plugins: {
    prettier: prettierPlugin,
  },
  rules: {
    ...prettierPlugin.configs.recommended.rules,
    'no-fallthrough': ['error', { commentPattern: 'falls?\\s?through' }],
  },
};

export const baseTypeScriptConfig = {
  files: ['**/*.ts', '**/*.tsx'],
  languageOptions: {
    parser: typescriptEslintParser,
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
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
    '@typescript-eslint/no-explicit-any': 'error',
    // Allow underscored `_value`
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    // Prefer `import {type Foo} from 'Foo';`
    '@typescript-eslint/consistent-type-imports': [
      'warn',
      { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
    ],
  },
};

export const baseStoriesConfig = {
  files: ['**/*.stories.tsx'],
  rules: {
    'react/no-array-index-key': 'off', // Stories have mock data that do not have unique IDs
    'react-hooks/rules-of-hooks': 'off', // Stories use hooks in a way that is not a component
  },
};

export const baseTestConfig = {
  files: ['**/*.test.ts', '**/*.test.tsx'],
  rules: {
    '@typescript-eslint/no-empty-function': 'off', // Tests can have empty functions
    '@typescript-eslint/require-await': 'off',
    '@typescript-eslint/unbound-method': 'off',
    '@typescript-eslint/consistent-type-imports': 'off',
  },
};
