import {
  baseIgnores,
  baseJavaScriptConfig,
  createTypeScriptConfig,
  baseStoriesConfig,
  baseTestConfig,
  createSonarConfig,
  createMdxConfig,
} from '../../shared/eslint-base.config.js';

export default [
  {
    ignores: [
      ...baseIgnores,
      '**/src/generated/**', // Tokens-specific ignore
    ],
  },
  baseJavaScriptConfig,
  createTypeScriptConfig(import.meta.dirname, [
    './tsconfig.json',
    './tsconfig.lib.json',
    './tsconfig.base.json',
    './tsconfig.node.json',
  ]),
  await createSonarConfig(),
  baseStoriesConfig,
  baseTestConfig,
  await createMdxConfig(),
];
