import { lazy } from 'react';
import type { ComponentMeta } from '@helpers/meta/types';
import type { TestComponentMeta } from '@iress-oss/ids-storybook-config';

export const testMeta: TestComponentMeta[] = [
  {
    part: 'main',
    description: 'The root element of the stack',
    testId: 'stack',
  },
];

export default {
  heading: 'Stack',
  description: 'Lays out children vertically with consistent spacing between items.',
  tags: ['layout', 'spacing', 'container'],
  testMeta,
  Thumbnail: lazy(() => import('./Thumbnail')),
} satisfies ComponentMeta;
