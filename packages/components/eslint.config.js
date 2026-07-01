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
import requireStoryMeta from '../../shared/eslint-rules/require-story-meta.js';

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
  // Step 6: Primary component/pattern stories must include testMeta, description, and stylingProps.
  // Uses componentStoryMeta() or manual setup. Sub-components, styling-props, and intro stories are exempt.
  {
    files: [
      'src/components/*/[A-Z]*.stories.tsx',
      'src/patterns/*/[A-Z]*.stories.tsx',
    ],
    ignores: ['src/components/*/*/**/*.stories.tsx'],
    plugins: {
      'ids-local': {
        rules: { 'require-story-meta': requireStoryMeta },
      },
    },
    rules: {
      'ids-local/require-story-meta': 'warn',
    },
  },
  // Step 7: Ban ...OtherStory.args spreads in P1 stories (args must be self-contained literals).
  // P2/P3 stories (with render or withSource) are exempt — their mock file is the source of truth.
  // Stories that spread another story at the top level (e.g. ...InlineAndReadonly) are also exempt.
  {
    files: ['**/*.stories.tsx'],
    rules: {
      'no-restricted-syntax': [
        'error',
        {
          selector:
            'ExportNamedDeclaration > VariableDeclaration > VariableDeclarator > ObjectExpression:not(:has(Property[key.name="render"])):not(:has(> SpreadElement[argument.type="Identifier"])):not(:has(> SpreadElement[argument.type="MemberExpression"])) > Property[key.name="args"] > ObjectExpression > SpreadElement[argument.type="MemberExpression"][argument.property.name="args"]',
          message:
            'Do not spread ...OtherStory.args in P1 story args. Each P1 story must have self-contained literal args for the AI translate pipeline to extract complete code examples. If this story inherits from another story (via spread or render), it is exempt.',
        },
      ],
    },
  },
  // Step 8: Exported component-specific types must use Iress prefix.
  // Only applies to the main component file (top-level in component dir, same name as dir).
  // Internal types (sub-components, hooks, providers, base) are exempt.
  {
    files: [
      'src/components/*/[A-Z]*.tsx',
      'src/patterns/*/[A-Z]*.tsx',
    ],
    ignores: [
      '**/*.test.tsx',
      '**/*.stories.tsx',
      '**/mocks/**',
      '**/meta/**',
      '**/index.tsx',
      'src/components/*/*/**',
      'src/patterns/*/*/**',
    ],
    rules: {
      'no-restricted-syntax': [
        'warn',
        {
          selector:
            'ExportNamedDeclaration > :matches(TSTypeAliasDeclaration, TSInterfaceDeclaration)[id.name=/^(?!Iress|Internal)[A-Z].*(?<!Render|Provider|Item|Search|Hook|Readonly|Custom)Props$/]',
          message:
            'Exported component Props types must use the Iress prefix (e.g. IressAlertProps). This allows the AI translate pipeline to distinguish component types from shared utility types.',
        },
        {
          selector:
            'ExportNamedDeclaration > :matches(TSTypeAliasDeclaration, TSInterfaceDeclaration)[id.name=/^(?!Iress|Internal)[A-Z].*Variants$/]',
          message:
            'Exported component Variants types must use the Iress prefix (e.g. IressButtonVariants). This allows the AI translate pipeline to distinguish component types from shared utility types.',
        },
      ],
    },
  },
];
