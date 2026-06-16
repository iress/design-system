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
} satisfies ComponentMeta;
