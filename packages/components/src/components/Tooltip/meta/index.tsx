import { lazy } from 'react';
import type { ComponentMeta } from '@helpers/meta/types';
import type { TestComponentMeta } from '@iress-oss/ids-storybook-config';

export const testMeta: TestComponentMeta[] = [
  {
    part: 'main',
    description: 'The root element of the tooltip',
    query: <code>getByRole('tooltip')</code>,
    testId: 'tooltip',
  },
  {
    part: 'activator',
    description: 'The tooltip trigger element',
    query: <code>getByRole('button')</code>,
    testId: 'tooltip__activator',
  },
  {
    part: 'tooltip text',
    description: 'The tooltip content',
    query: <code>getByRole('tooltip')</code>,
    testId: 'tooltip__tooltip-text',
  },
];

export default {
  heading: 'Tooltip',
  description: 'Shows additional contextual information on hover or focus of a trigger element.',
  tags: ['overlay', 'feedback', 'help'],
  testMeta,
  Thumbnail: lazy(() => import('./Thumbnail')),
} satisfies ComponentMeta;
