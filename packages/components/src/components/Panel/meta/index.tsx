import { lazy } from 'react';
import type { ComponentMeta } from '@helpers/meta/types';
import type { TestComponentMeta } from '@iress-oss/ids-storybook-config';

export const testMeta: TestComponentMeta[] = [
  {
    part: 'main',
    description: 'The root element of the panel',
    testId: 'panel',
  },
];

export default {
  heading: 'Panel',
  description: 'Provides a sectioned container for grouping related content with an optional heading.',
  tags: ['layout', 'container', 'content'],
  testMeta,
  Thumbnail: lazy(() => import('./Thumbnail')),
} satisfies ComponentMeta;
