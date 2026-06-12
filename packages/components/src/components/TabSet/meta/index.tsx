import { lazy } from 'react';
import type { ComponentMeta } from '@helpers/meta/types';
import type { TestComponentMeta } from '@iress-oss/ids-storybook-config';

export const testMeta: TestComponentMeta[] = [
  {
    part: 'main',
    description: 'The root element of the tab set',
    query: <code>getByRole('tablist')</code>,
    testId: 'tabset',
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
