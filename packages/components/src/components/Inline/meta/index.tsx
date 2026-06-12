import { lazy } from 'react';
import type { ComponentMeta } from '@helpers/meta/types';
import type { TestComponentMeta } from '@iress-oss/ids-storybook-config';

export const testMeta: TestComponentMeta[] = [
  {
    part: 'main',
    description: 'The root element of the inline',
    testId: 'inline',
  },
];

export default {
  heading: 'Inline',
  description: 'Lays out children horizontally with consistent spacing between items.',
  tags: ['layout', 'spacing', 'alignment'],
  testMeta,
  Thumbnail: lazy(() => import('./Thumbnail')),
} satisfies ComponentMeta;
