import {
  baseIgnores,
  baseJavaScriptConfig,
  createTypeScriptConfig,
  baseStoriesConfig,
  baseTestConfig,
  createSonarConfig,
} from '../../shared/eslint-base.config.js';

export default [
  {
    ignores: [...baseIgnores, '.storybook/main.ts'],
  },
  baseJavaScriptConfig,
  createTypeScriptConfig(import.meta.dirname, [
    './tsconfig.json',
    './tsconfig.node.json',
  ]),
  await createSonarConfig(),
  baseStoriesConfig,
  baseTestConfig,
];
