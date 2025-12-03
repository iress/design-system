import {
  baseIgnores,
  baseJavaScriptConfig,
  createTypeScriptConfig,
  createSonarConfig,
} from './shared/eslint-base.config.js';

export default [
  {
    ignores: [
      ...baseIgnores,
      '**/storybook-static/**',
      'apps/**', // Let project configs handle their own linting
      'packages/**', // Let project configs handle their own linting
      'output/**',
      'scripts/**',
      'ci/**',
      'src/generated/**', // Ignore generated files
    ],
  },
  {
    // Root-level configuration files - override base config for specific files
    ...baseJavaScriptConfig,
    files: [
      '*.js',
      '*.mjs',
      '*.cjs',
      '*.ts',
      'shared/**/*.js',
      'scripts/**/*.js',
    ],
  },
  {
    // TypeScript config files at root - use factory but without project references
    ...createTypeScriptConfig(import.meta.dirname, []),
    files: ['*.ts', 'shared/**/*.ts', 'scripts/**/*.ts'],
    languageOptions: {
      ...createTypeScriptConfig(import.meta.dirname, []).languageOptions,
      parserOptions: {
        ...createTypeScriptConfig(import.meta.dirname, []).languageOptions
          .parserOptions,
        project: false, // Root level TS files don't need project references
      },
    },
  },
  await createSonarConfig(),
];
