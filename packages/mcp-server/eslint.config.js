import {
  baseIgnores,
  baseJavaScriptConfig,
  createTypeScriptConfig,
  baseTestConfig,
} from '../../shared/eslint-base.config.js';

export default [
  {
    ignores: [
      ...baseIgnores,
      '**/generated-docs/**', // MCP server specific ignore
      '**/build/**', // Exclude temporary build artifacts
    ],
  },
  {
    ...baseJavaScriptConfig,
  },
  {
    ...createTypeScriptConfig(import.meta.dirname, [
      './tsconfig.json',
      './tsconfig.node.json',
    ]),
  },
  {
    ...baseTestConfig,
  },
];
