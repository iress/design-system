import { lazy } from 'react';
import type { ComponentMeta } from '@helpers/meta/types';
import type { TestComponentMeta } from '@iress-oss/ids-storybook-config';

export const testMeta: TestComponentMeta[] = [
  {
    part: 'main',
    description:
      'The root element of the spinner. Default variant is decorative (aria-hidden); chatty variant has role="status"',
    query: (
      <>
        <code>getByRole('status')</code> for the chatty variant, or{' '}
        <code>getByTestId('...')</code> for the decorative default
      </>
    ),
    testId: 'spinner',
  },
];

export default {
  heading: 'Spinner',
  description:
    'Displays an animated loading indicator to signal an ongoing process.',
  tags: ['feedback', 'loading', 'indicator'],
  testMeta,
  Thumbnail: lazy(() => import('./Thumbnail')),
  import: "import { IressSpinner } from '@iress-oss/ids-components';",
  github: {
    source:
      'https://github.com/iress/design-system/tree/main/packages/components/src/components/Spinner',
    guidelines:
      'https://github.com/iress/design-system/edit/main/apps/guidelines/content/components/spinner.mdx',
    storybook:
      'https://github.com/iress/design-system/edit/main/packages/components/src/components/Spinner/Spinner.stories.tsx',
    reportIssue:
      'https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=spinner&title=[Spinner]+Bug:+',
    requestFeature:
      'https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=spinner,enhancement&title=[Spinner]+Feature:+',
  },
  storybook:
    'https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-spinner--docs',
  guidelines:
    'https://iress.github.io/design-system/#/components/spinner',
} satisfies ComponentMeta;
