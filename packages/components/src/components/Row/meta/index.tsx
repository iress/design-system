import { lazy } from 'react';
import type { ComponentMeta } from '@helpers/meta/types';
import type { TestComponentMeta } from '@iress-oss/ids-storybook-config';

export const testMeta: TestComponentMeta[] = [
  {
    part: 'main',
    description: 'The root element of the row',
    testId: 'row',
  },
];

export default {
  heading: 'Row',
  description: 'Arranges children in a horizontal row within a grid or flex layout.',
  tags: ['layout', 'grid', 'container'],
  testMeta,
  Thumbnail: lazy(() => import('./Thumbnail')),
} satisfies ComponentMeta;
