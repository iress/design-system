import {
  baseIgnores,
  baseJavaScriptConfig,
  baseTypeScriptConfig,
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
    ...baseTypeScriptConfig,
    languageOptions: {
      ...baseTypeScriptConfig.languageOptions,
      parserOptions: {
        ...baseTypeScriptConfig.languageOptions.parserOptions,
        tsconfigRootDir: import.meta.dirname,
        project: ['./tsconfig.json', './tsconfig.node.json'],
      },
    },
  },
  {
    ...baseTestConfig,
  },
];
