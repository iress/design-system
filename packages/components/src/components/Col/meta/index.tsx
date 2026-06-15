import { lazy } from 'react';
import type { ComponentMeta } from '@helpers/meta/types';
import type { TestComponentMeta } from '@iress-oss/ids-storybook-config';

export const testMeta: TestComponentMeta[] = [
  {
    part: 'main',
    description: 'The root element of the col',
    testId: 'col',
  },
];

export default {
  heading: 'Col',
  description: 'Defines a column within a grid row layout.',
  tags: ['layout', 'grid', 'container'],
  testMeta,
  Thumbnail: lazy(() => import('./Thumbnail')),
  import: "import { IressCol } from '@iress-oss/ids-components';",
  github: {
    source:
      'https://github.com/iress/design-system/tree/main/packages/components/src/components/Col',
    guidelines:
      'https://github.com/iress/design-system/edit/main/apps/guidelines/content/components/col.mdx',
    storybook:
      'https://github.com/iress/design-system/edit/main/packages/components/src/components/Col/Col.stories.tsx',
    reportIssue:
      'https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=col&title=[Col]+Bug:+',
    requestFeature:
      'https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=col,enhancement&title=[Col]+Feature:+',
  },
  storybook:
    'https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-col--docs',
} satisfies ComponentMeta;
