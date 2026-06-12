import { lazy } from 'react';
import type { ComponentMeta } from '@helpers/meta/types';
import type { TestComponentMeta } from '@iress-oss/ids-storybook-config';

export const testMeta: TestComponentMeta[] = [
  {
    part: 'main',
    description: 'The root element of the hide',
    testId: 'hide',
  },
];

export default {
  heading: 'Hide',
  description: 'Conditionally hides content based on responsive breakpoints.',
  tags: ['layout', 'responsive', 'utility'],
  testMeta,
  Thumbnail: lazy(() => import('./Thumbnail')),
} satisfies ComponentMeta;
