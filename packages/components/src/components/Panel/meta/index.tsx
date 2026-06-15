import { lazy } from 'react';
import type { ComponentMeta } from '@helpers/meta/types';
import type { TestComponentMeta } from '@iress-oss/ids-storybook-config';

export const testMeta: TestComponentMeta[] = [
  {
    part: 'main',
    description: 'The root element of the panel',
    testId: 'panel',
  },
];

export default {
  heading: 'Panel',
  description: 'Provides a sectioned container for grouping related content with an optional heading.',
  tags: ['layout', 'container', 'content'],
  testMeta,
  Thumbnail: lazy(() => import('./Thumbnail')),
  import: "import { IressPanel } from '@iress-oss/ids-components';",
  github: {
    source:
      'https://github.com/iress/design-system/tree/main/packages/components/src/components/Panel',
    guidelines:
      'https://github.com/iress/design-system/edit/main/apps/guidelines/content/components/panel.mdx',
    storybook:
      'https://github.com/iress/design-system/edit/main/packages/components/src/components/Panel/Panel.stories.tsx',
    reportIssue:
      'https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=panel&title=[Panel]+Bug:+',
    requestFeature:
      'https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=panel,enhancement&title=[Panel]+Feature:+',
  },
  storybook:
    'https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-panel--docs',
} satisfies ComponentMeta;
