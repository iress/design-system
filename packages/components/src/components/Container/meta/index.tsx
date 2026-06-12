import { lazy } from 'react';
import type { ComponentMeta } from '@helpers/meta/types';
import type { TestComponentMeta } from '@iress-oss/ids-storybook-config';

export const testMeta: TestComponentMeta[] = [
  {
    part: 'main',
    description: 'The root element of the container',
    testId: 'container',
  },
];

export default {
  heading: 'Container',
  description: 'Provides a max-width wrapper to constrain content within a page layout.',
  tags: ['layout', 'wrapper', 'responsive'],
  testMeta,
  Thumbnail: lazy(() => import('./Thumbnail')),
} satisfies ComponentMeta;
