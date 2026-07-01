import { lazy } from 'react';
import type { ComponentMeta } from '@helpers/meta/types';
import type { TestComponentMeta } from '@iress-oss/ids-storybook-config';

export const testMeta: TestComponentMeta[] = [
  {
    part: 'main',
    description: 'The root wrapper element (tablist is a nested child)',
    testId: 'tabset',
  },
  {
    part: 'tablist',
    description: 'The tab list container (nested inside root)',
    query: <code>getByRole('tablist')</code>,
    testId: '—',
  },
  {
    part: 'tab',
    description:
      'An individual tab item (rendered by IressTab, receives its own data-testid)',
    query: <code>getByRole('tab', {'{'} name: '...' {'}'})</code>,
    testId: '<tab-testid>',
  },
  {
    part: 'panel',
    description: 'The active tab panel',
    query: <code>getByRole('tabpanel')</code>,
    testId: 'tabset__panel',
  },
];

export default {
  heading: 'TabSet',
  description: 'Organises content into tabbed panels, showing one panel at a time.',
  tags: ['navigation', 'layout', 'interactive'],
  testMeta,
  Thumbnail: lazy(() => import('./Thumbnail')),
  import: "import { IressTabSet } from '@iress-oss/ids-components';",
  github: {
    source:
      'https://github.com/iress/design-system/tree/main/packages/components/src/components/TabSet',
    guidelines:
      'https://github.com/iress/design-system/edit/main/apps/guidelines/content/components/tab-set.mdx',
    storybook:
      'https://github.com/iress/design-system/edit/main/packages/components/src/components/TabSet/TabSet.stories.tsx',
    reportIssue:
      'https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=tab-set&title=[TabSet]+Bug:+',
    requestFeature:
      'https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=tab-set,enhancement&title=[TabSet]+Feature:+',
  },
  storybook:
    'https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-tab-set--docs',
  guidelines:
    'https://iress.github.io/design-system/#/components/tab-set',
  subComponents: ['IressTab'],
  figma: 'https://www.figma.com/design/youFqYT4CgpKxfLJQv80hf/WIP-Iress-Design-System-V6?node-id=7305-28714',
} satisfies ComponentMeta;
