import { lazy } from 'react';
import type { ComponentMeta } from '@helpers/meta/types';
import type { TestComponentMeta } from '@iress-oss/ids-storybook-config';

export const testMeta: TestComponentMeta[] = [
  {
    part: 'main',
    description: 'The root element of the progress',
    query: (
      <>
        <code>getByRole('meter')</code> when min, max, and value are all
        provided, otherwise <code>getByRole('progressbar')</code>
      </>
    ),
    testId: 'progress',
  },
];

export default {
  heading: 'Progress',
  description: 'Visualises the completion status of a task or process as a progress bar.',
  tags: ['data-display', 'feedback', 'loading'],
  testMeta,
  Thumbnail: lazy(() => import('./Thumbnail')),
  import: "import { IressProgress } from '@iress-oss/ids-components';",
  github: {
    source:
      'https://github.com/iress/design-system/tree/main/packages/components/src/components/Progress',
    guidelines:
      'https://github.com/iress/design-system/edit/main/apps/guidelines/content/components/progress.mdx',
    storybook:
      'https://github.com/iress/design-system/edit/main/packages/components/src/components/Progress/Progress.stories.tsx',
    reportIssue:
      'https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=progress&title=[Progress]+Bug:+',
    requestFeature:
      'https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=progress,enhancement&title=[Progress]+Feature:+',
  },
  storybook:
    'https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-progress--docs',
} satisfies ComponentMeta;
