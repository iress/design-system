import { lazy } from 'react';
import type { ComponentMeta } from '@helpers/meta/types';
import type { TestComponentMeta } from '@iress-oss/ids-storybook-config';

export const testMeta: TestComponentMeta[] = [
  {
    part: 'main',
    description: 'The root element of the divider',
    query: <code>getByRole('separator')</code>,
    testId: 'divider',
  },
];

export default {
  heading: 'Divider',
  description: 'Renders a horizontal or vertical line to visually separate content.',
  tags: ['layout', 'separator', 'visual'],
  testMeta,
  Thumbnail: lazy(() => import('./Thumbnail')),
} satisfies ComponentMeta;
