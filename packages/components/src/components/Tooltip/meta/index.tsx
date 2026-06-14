import { lazy } from 'react';
import type { ComponentMeta } from '@helpers/meta/types';
import type { TestComponentMeta } from '@iress-oss/ids-storybook-config';

export const testMeta: TestComponentMeta[] = [
  {
    part: 'main',
    description: 'The root wrapper element (contains activator and tooltip)',
    testId: 'tooltip',
  },
  {
    part: 'activator',
    description: 'The tooltip trigger element',
    testId: 'tooltip__activator',
  },
  {
    part: 'tooltip text',
    description: 'The floating tooltip content (visible on hover/focus)',
    query: <code>getByRole('tooltip')</code>,
    testId: 'tooltip__tooltip-text',
  },
];

export default {
  heading: 'Tooltip',
  description:
    'Shows additional contextual information on hover or focus of a trigger element.',
  tags: ['overlay', 'feedback', 'help'],
  testMeta,
  Thumbnail: lazy(() => import('./Thumbnail')),
} satisfies ComponentMeta;
