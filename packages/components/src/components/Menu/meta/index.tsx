import { lazy } from 'react';
import type { ComponentMeta } from '@helpers/meta/types';
import type { TestComponentMeta } from '@iress-oss/ids-storybook-config';

export const testMeta: TestComponentMeta[] = [
  {
    part: 'main',
    description: 'The root element of the menu',
    query: (
      <>
        <code>getByRole('list')</code> by default, or{' '}
        <code>getByRole('menu')</code> /{' '}
        <code>getByRole('listbox')</code> depending on role prop
      </>
    ),
    testId: 'menu',
  },
  {
    part: 'activator',
    description:
      'A menu group activator (propagated from IressMenuGroup data-testid)',
    query: <code>getByRole('button', {'{'} name: '...' {'}'})</code>,
    testId: '<menugroup-testid>__activator',
  },
  {
    part: 'subdraw',
    description:
      'A subdraw container (propagated from IressMenuGroup data-testid)',
    testId: '<menugroup-testid>__subdraw',
  },
  {
    part: 'subdraw trigger',
    description:
      'A subdraw trigger item (propagated from IressMenuGroup data-testid)',
    testId: '<menugroup-testid>__subdraw__trigger',
  },
  {
    part: 'checkbox mark',
    description:
      'Checkbox indicator on a selectable item (propagated from IressMenuItem data-testid)',
    testId: '<menuitem-testid>__checkbox-mark',
  },
  {
    part: 'checkbox',
    description:
      'Checkbox on a multi-select item (propagated from IressMenuItem data-testid)',
    testId: '<menuitem-testid>__checkbox',
  },
];

export default {
  heading: 'Menu',
  description: 'Displays a list of navigational or actionable items.',
  tags: ['navigation', 'dropdown', 'interactive'],
  testMeta,
  Thumbnail: lazy(() => import('./Thumbnail')),
} satisfies ComponentMeta;
