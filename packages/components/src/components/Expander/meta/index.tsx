import { lazy } from 'react';
import type { TestId } from '@helpers/testing';

export const testIds: TestId[] = [
  { suffix: 'activator', description: 'The expand/collapse trigger button' },
  { suffix: 'container', description: 'The collapsible content container' },
];

export default {
  heading: 'Expander',
  href: '/?path=/docs/components-expander--docs',
  tags: ['layout', 'collapsible', 'interactive'],
  Thumbnail: lazy(() => import('./Thumbnail')),
};
