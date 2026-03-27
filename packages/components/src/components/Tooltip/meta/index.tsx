import { lazy } from 'react';
import type { TestId } from '@helpers/testing';

export const testIds: TestId[] = [
  { suffix: 'activator', description: 'The tooltip trigger element' },
  { suffix: 'tooltip-text', description: 'The tooltip content' },
];

export default {
  heading: 'Tooltip',
  href: '/?path=/docs/components-tooltip--docs',
  tags: ['overlay', 'feedback', 'help'],
  Thumbnail: lazy(() => import('./Thumbnail')),
};
