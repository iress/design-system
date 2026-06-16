import { lazy } from 'react';
import type { ComponentMeta } from '@helpers/meta/types';
import type { TestComponentMeta } from '@iress-oss/ids-storybook-config';

export const testMeta: TestComponentMeta[] = [
  {
    part: 'main',
    description: 'The root element of the divider',
    query: <code>getByRole('separator')</code>,
    testId: 'divider',
  },
];

export default {
  heading: 'Divider',
  description: 'Renders a horizontal or vertical line to visually separate content.',
  tags: ['layout', 'separator', 'visual'],
  testMeta,
  Thumbnail: lazy(() => import('./Thumbnail')),
  import: "import { IressDivider } from '@iress-oss/ids-components';",
  github: {
    source:
      'https://github.com/iress/design-system/tree/main/packages/components/src/components/Divider',
    guidelines:
      'https://github.com/iress/design-system/edit/main/apps/guidelines/content/components/divider.mdx',
    storybook:
      'https://github.com/iress/design-system/edit/main/packages/components/src/components/Divider/Divider.stories.tsx',
    reportIssue:
      'https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=divider&title=[Divider]+Bug:+',
    requestFeature:
      'https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=divider,enhancement&title=[Divider]+Feature:+',
  },
  storybook:
    'https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-divider--docs',
  guidelines:
    'https://iress.github.io/design-system/#/components/divider',
} satisfies ComponentMeta;
