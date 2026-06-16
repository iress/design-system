import { lazy } from 'react';
import type { ComponentMeta } from '@helpers/meta/types';
import type { TestComponentMeta } from '@iress-oss/ids-storybook-config';

export const testMeta: TestComponentMeta[] = [
  {
    part: 'main',
    description: 'The root element of the row',
    testId: 'row',
  },
];

export default {
  heading: 'Row',
  description: 'Arranges children in a horizontal row within a grid or flex layout.',
  tags: ['layout', 'grid', 'container'],
  testMeta,
  Thumbnail: lazy(() => import('./Thumbnail')),
  import: "import { IressRow } from '@iress-oss/ids-components';",
  github: {
    source:
      'https://github.com/iress/design-system/tree/main/packages/components/src/components/Row',
    guidelines:
      'https://github.com/iress/design-system/edit/main/apps/guidelines/content/components/row.mdx',
    storybook:
      'https://github.com/iress/design-system/edit/main/packages/components/src/components/Row/Row.stories.tsx',
    reportIssue:
      'https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=row&title=[Row]+Bug:+',
    requestFeature:
      'https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=row,enhancement&title=[Row]+Feature:+',
  },
  storybook:
    'https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-row--docs',
  guidelines:
    'https://iress.github.io/design-system/#/components/row',
} satisfies ComponentMeta;
