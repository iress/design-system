import {
  baseIgnores,
  baseJavaScriptConfig,
  baseTypeScriptConfig,
  baseStoriesConfig,
  baseTestConfig,
  createMdxConfig,
} from '../../shared/eslint-base.config.js';

export default [
  {
    ignores: [
      ...baseIgnores,
      '**/src/generated/**', // Tokens-specific ignore
    ],
  },
  {
    ...baseJavaScriptConfig,
  },
  {
    ...baseTypeScriptConfig,
    languageOptions: {
      ...baseTypeScriptConfig.languageOptions,
      parserOptions: {
        ...baseTypeScriptConfig.languageOptions.parserOptions,
        tsconfigRootDir: import.meta.dirname,
        project: [
          './tsconfig.json',
          './tsconfig.app.json',
          './tsconfig.base.json',
          './tsconfig.node.json',
        ],
      },
    },
  },
  {
    ...baseStoriesConfig,
  },
  {
    ...baseTestConfig,
    languageOptions: {
      ...baseTestConfig.languageOptions,
      parser: (await import('@typescript-eslint/parser')).default,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        tsconfigRootDir: import.meta.dirname,
        project: './tsconfig.node.json',
      },
    },
  },
  await createMdxConfig(),
];
