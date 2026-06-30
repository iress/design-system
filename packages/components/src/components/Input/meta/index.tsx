import { lazy } from 'react';
import type { ComponentMeta } from '@helpers/meta/types';
import type { TestComponentMeta } from '@iress-oss/ids-storybook-config';

export const testMeta: TestComponentMeta[] = [
  {
    part: 'main',
    description: 'The root element of the input',
    query: (
      <>
        <code>getByRole('textbox')</code>, or{' '}
        <code>getByLabelText('...')</code> when inside a Field
      </>
    ),
    testId: 'input',
  },
];

export default {
  heading: 'Input',
  description: 'Renders a single-line text input for capturing user data.',
  tags: ['form', 'data-entry', 'text'],
  testMeta,
  Thumbnail: lazy(() => import('./Thumbnail')),
  import: "import { IressInput } from '@iress-oss/ids-components';",
  github: {
    source:
      'https://github.com/iress/design-system/tree/main/packages/components/src/components/Input',
    guidelines:
      'https://github.com/iress/design-system/edit/main/apps/guidelines/content/components/input.mdx',
    storybook:
      'https://github.com/iress/design-system/edit/main/packages/components/src/components/Input/Input.stories.tsx',
    reportIssue:
      'https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=input&title=[Input]+Bug:+',
    requestFeature:
      'https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=input,enhancement&title=[Input]+Feature:+',
  },
  storybook:
    'https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-input--docs',
  guidelines:
    'https://iress.github.io/design-system/#/components/input',
  additionalProps: [
    {
      name: 'clearable',
      type: 'boolean',
      description: 'If true, the user can clear the value of the input.',
      condition: 'Only when rows is not set',
    },
    {
      name: 'variant',
      type: "'search'",
      description: 'The variant of the input. The search variant applies different styles for the clear button and loading spinner.',
      condition: 'Only when rows is not set',
    },
    {
      name: 'autoGrow',
      type: 'boolean | number',
      default: 'false',
      description: 'Enables auto-grow for textarea. Set to true for default max 5 rows, or a number for custom max rows.',
      condition: 'Only when rows is set',
    },
  ],
} satisfies ComponentMeta;
