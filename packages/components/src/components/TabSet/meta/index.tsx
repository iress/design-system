import { lazy } from 'react';
import type { TestId } from '@helpers/testing';
import type { ComponentMeta } from '@helpers/meta/types';

export const testIds: TestId[] = [
  { suffix: 'panel', description: 'The active tab panel' },
];

export default {
  heading: 'TabSet',
  description: 'Organises content into tabbed panels, showing one panel at a time.',
  tags: ['navigation', 'layout', 'interactive'],
  Thumbnail: lazy(() => import('./Thumbnail')),
} satisfies ComponentMeta;
