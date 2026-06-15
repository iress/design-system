import { lazy } from 'react';
import type { ComponentMeta } from '@helpers/meta/types';
import type { TestComponentMeta } from '@iress-oss/ids-storybook-config';

export const testMeta: TestComponentMeta[] = [
  {
    part: 'main',
    description:
      'The visible toast list container (rendered inside the aria-live region)',
    testId: 'toaster',
  },
  {
    part: 'toast',
    description: 'An individual toast notification within the Toaster',
    query: <code>getByRole('alert')</code>,
    testId: 'toast',
  },
];

export default {
  heading: 'Toaster',
  description:
    'Manages and displays temporary toast notifications to the user.',
  tags: ['feedback', 'notification', 'toast'],
  testMeta,
  Thumbnail: lazy(() => import('./Thumbnail')),
  import: "import { IressToaster } from '@iress-oss/ids-components';",
  github: {
    source:
      'https://github.com/iress/design-system/tree/main/packages/components/src/components/Toaster',
    guidelines:
      'https://github.com/iress/design-system/edit/main/apps/guidelines/content/components/toaster.mdx',
    storybook:
      'https://github.com/iress/design-system/edit/main/packages/components/src/components/Toaster/Toaster.stories.tsx',
    reportIssue:
      'https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=toaster&title=[Toaster]+Bug:+',
    requestFeature:
      'https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=toaster,enhancement&title=[Toaster]+Feature:+',
  },
  storybook:
    'https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-toaster--docs',
} satisfies ComponentMeta;
