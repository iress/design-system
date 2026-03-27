import { lazy } from 'react';
import type { TestId } from '@helpers/testing';

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
  href: '/?path=/docs/components-menu--docs',
  tags: ['navigation', 'dropdown', 'interactive'],
  Thumbnail: lazy(() => import('./Thumbnail')),
};
