import { lazy } from 'react';
import type { ComponentMeta } from '@helpers/meta/types';
import type { TestComponentMeta } from '@iress-oss/ids-storybook-config';

export const testMeta: TestComponentMeta[] = [
  {
    part: 'main',
    description: 'The root element of the hide',
    testId: 'hide',
  },
];

export default {
  heading: 'Hide',
  description: 'Conditionally hides content based on responsive breakpoints.',
  tags: ['layout', 'responsive', 'utility'],
  testMeta,
  Thumbnail: lazy(() => import('./Thumbnail')),
  import: "import { IressHide } from '@iress-oss/ids-components';",
  github: {
    source:
      'https://github.com/iress/design-system/tree/main/packages/components/src/components/Hide',
    guidelines:
      'https://github.com/iress/design-system/edit/main/apps/guidelines/content/components/hide.mdx',
    storybook:
      'https://github.com/iress/design-system/edit/main/packages/components/src/components/Hide/Hide.stories.tsx',
    reportIssue:
      'https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=hide&title=[Hide]+Bug:+',
    requestFeature:
      'https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=hide,enhancement&title=[Hide]+Feature:+',
  },
  storybook:
    'https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-hide--docs',
  guidelines:
    'https://iress.github.io/design-system/#/components/hide',
} satisfies ComponentMeta;
