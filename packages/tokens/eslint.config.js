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
    './tsconfig.node.json',
  ]),
  await createSonarConfig(),
  baseStoriesConfig,
  baseTestConfig,
  await createMdxConfig(),
  // Story pattern enforcement — ban ...OtherStory.args spreads in P1 stories
  {
    files: ['**/*.stories.tsx'],
    rules: {
      'no-restricted-syntax': [
        'error',
        {
          selector:
            'ExportNamedDeclaration > VariableDeclaration > VariableDeclarator > ObjectExpression:not(:has(Property[key.name="render"])):not(:has(> SpreadElement[argument.type="Identifier"])):not(:has(> SpreadElement[argument.type="MemberExpression"])) > Property[key.name="args"] > ObjectExpression > SpreadElement[argument.type="MemberExpression"][argument.property.name="args"]',
          message:
            'Do not spread ...OtherStory.args in P1 story args. Each P1 story must have self-contained literal args for the AI translate pipeline to extract complete code examples.',
        },
      ],
    },
  },
];
