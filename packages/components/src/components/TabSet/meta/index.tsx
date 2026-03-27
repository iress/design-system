import { lazy } from 'react';
import type { TestId } from '@helpers/testing';

export const testIds: TestId[] = [
  { suffix: 'panel', description: 'The active tab panel' },
];

export default {
  heading: 'TabSet',
  href: '/?path=/docs/components-tabset--docs',
  tags: ['navigation', 'layout', 'interactive'],
  Thumbnail: lazy(() => import('./Thumbnail')),
};
