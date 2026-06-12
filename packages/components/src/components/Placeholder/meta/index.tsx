import { lazy } from 'react';
import type { ComponentMeta } from '@helpers/meta/types';
import type { TestComponentMeta } from '@iress-oss/ids-storybook-config';

export const testMeta: TestComponentMeta[] = [
  {
    part: 'main',
    description: 'The root element of the placeholder',
    query: <code>getByText('...')</code>,
    testId: 'placeholder',
  },
];

export default {
  heading: 'Placeholder',
  description: 'Renders a visual placeholder to represent future or missing content.',
  tags: ['layout', 'empty-state', 'content'],
  testMeta,
  Thumbnail: lazy(() => import('./Thumbnail')),
} satisfies ComponentMeta;
