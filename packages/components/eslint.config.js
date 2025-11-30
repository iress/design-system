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
];
