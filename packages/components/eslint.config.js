import {
  baseIgnores,
  baseJavaScriptConfig,
  createTypeScriptConfig,
  baseStoriesConfig,
  baseTestConfig,
  createReactConfig,
  createSonarConfig,
  createMdxConfig,
} from '../../shared/eslint-base.config.js';
import jsdocPlugin from 'eslint-plugin-jsdoc';

export default [
  {
    ignores: [
      ...baseIgnores,
      '**/storybook-static/**',
      '**/*.d.ts',
      '**/theme-preset.ts',
      '**/styled-system/**',
      '!.storybook',
    ],
  },
  baseJavaScriptConfig,
  createTypeScriptConfig(import.meta.dirname, [
    './tsconfig.json',
    './tsconfig.base.json',
    './tsconfig.lib.json',
    './tsconfig.node.json',
  ]),
  await createReactConfig(),
  await createSonarConfig(),
  baseStoriesConfig,
  baseTestConfig,
  {
    ...(await createMdxConfig()),
    rules: {
      ...(await createMdxConfig()).rules,
      'sonarjs/todo-tag': 'off', // MDX-specific SonarJS override
    },
  },
  {
    files: ['src/components/**/*.tsx', 'src/patterns/**/*.tsx'],
    ignores: ['**/*.test.tsx', '**/*.stories.tsx', '**/mocks/**'],
    plugins: { jsdoc: jsdocPlugin },
    rules: {
      'jsdoc/require-jsdoc': [
        'warn',
        {
          require: { FunctionDeclaration: false, MethodDefinition: false },
          contexts: [
            'ExportNamedDeclaration:has(VariableDeclarator[id.name=/^Iress/])',
          ],
          checkConstructors: false,
        },
      ],
    },
  },
];
