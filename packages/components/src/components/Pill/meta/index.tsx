import { lazy } from 'react';
import type { ComponentMeta } from '@helpers/meta/types';
import type { TestComponentMeta } from '@iress-oss/ids-storybook-config';

export const testMeta: TestComponentMeta[] = [
  {
    part: 'main',
    description: 'The root element of the pill',
    testId: 'pill',
  },
];

export default {
  heading: 'Pill',
  description: 'Displays a small, rounded badge for categorisation or status indication.',
  tags: ['data-display', 'status', 'indicator', 'badge'],
  testMeta,
  Thumbnail: lazy(() => import('./Thumbnail')),
} satisfies ComponentMeta;
