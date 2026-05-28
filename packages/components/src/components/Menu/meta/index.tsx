import { lazy } from 'react';
import type { TestId } from '@helpers/testing';
import type { ComponentMeta } from '@helpers/meta/types';

export const testIds: TestId[] = [
  { suffix: 'activator', description: 'The menu group activator item' },
  { suffix: 'subdraw', description: 'The subdraw menu container' },
  { suffix: 'subdraw__trigger', description: 'The subdraw trigger item' },
  {
    suffix: 'checkbox-mark',
    description: 'The checkbox indicator on selectable menu items',
  },
  {
    suffix: 'checkbox',
    description: 'The checkbox on multi-select menu items',
  },
];

export default {
  heading: 'Menu',
  description: 'Displays a list of navigational or actionable items.',
  tags: ['navigation', 'dropdown', 'interactive'],
  Thumbnail: lazy(() => import('./Thumbnail')),
} satisfies ComponentMeta;
