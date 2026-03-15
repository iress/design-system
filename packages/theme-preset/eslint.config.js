import {
  baseIgnores,
  baseJavaScriptConfig,
  createTypeScriptConfig,
  baseTestConfig,
  createSonarConfig,
} from '../../shared/eslint-base.config.js';

export default [
  {
    ignores: [...baseIgnores],
  },
  baseJavaScriptConfig,
  createTypeScriptConfig(import.meta.dirname, [
    './tsconfig.json',
    './tsconfig.lib.json',
    './tsconfig.base.json',
  ]),
  await createSonarConfig(),
  baseTestConfig,
];
