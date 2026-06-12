import { lazy } from 'react';
import type { ComponentMeta } from '@helpers/meta/types';
import type { TestComponentMeta } from '@iress-oss/ids-storybook-config';

export const testMeta: TestComponentMeta[] = [
  {
    part: 'main',
    description: 'The root element of the menu',
    query: <code>getByRole('list')</code>,
    testId: 'menu',
  },
  {
    part: 'activator',
    description: 'The menu group activator item',
    testId: 'menu__activator',
  },
  {
    part: 'subdraw',
    description: 'The subdraw menu container',
    testId: 'menu__subdraw',
  },
  {
    part: 'subdraw trigger',
    description: 'The subdraw trigger item',
    testId: 'menu__subdraw__trigger',
  },
  {
    part: 'checkbox mark',
    description: 'The checkbox indicator on selectable menu items',
    testId: 'menu__checkbox-mark',
  },
  {
    part: 'checkbox',
    description: 'The checkbox on multi-select menu items',
    testId: 'menu__checkbox',
  },
];

export default {
  heading: 'Menu',
  description: 'Displays a list of navigational or actionable items.',
  tags: ['navigation', 'dropdown', 'interactive'],
  testMeta,
  Thumbnail: lazy(() => import('./Thumbnail')),
} satisfies ComponentMeta;
