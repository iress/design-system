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
  // Story pattern enforcement (see .github/instructions/story-patterns.instructions.md)
  {
    files: ['**/*.stories.tsx'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: '@iress-oss/ids-storybook-config',
              importNames: [
                'withCustomSource',
                'withTransformedRawSource',
                'CurrentBreakpoint',
                'internalArgs',
                'stripInternalPropsFromSource',
              ],
              message:
                'Deprecated story helper. Use withSource/withBreakpointLabel instead. See .github/instructions/story-patterns.instructions.md',
            },
          ],
        },
      ],
      'no-restricted-syntax': [
        'error',
        {
          selector:
            'Property[key.name="render"] > ArrowFunctionExpression[params.length=0]',
          message:
            'Story render must accept args: use `render: (args) =>` not `render: () =>`. The code panel requires args to display correctly.',
        },
        {
          selector:
            'ExportDefaultDeclaration Property[key.name="controls"] Property[key.name="disable"][value.value=true]',
          message:
            'Do not disable controls at meta level. Set `controls: { disable: true }` on individual mock-based stories only.',
        },
      ],
    },
  },
];
