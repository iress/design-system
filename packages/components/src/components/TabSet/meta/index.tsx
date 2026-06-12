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
} satisfies ComponentMeta;
