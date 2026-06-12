import { lazy } from 'react';
import type { ComponentMeta } from '@helpers/meta/types';
import type { TestComponentMeta } from '@iress-oss/ids-storybook-config';

export const testMeta: TestComponentMeta[] = [
  {
    part: 'main',
    description: 'The root element of the skeleton',
    testId: 'skeleton',
  },
];

export default {
  heading: 'Skeleton',
  description: 'Renders placeholder shapes to indicate content is loading.',
  tags: ['loading', 'placeholder', 'feedback'],
  testMeta,
  Thumbnail: lazy(() => import('./Thumbnail')),
} satisfies ComponentMeta;
