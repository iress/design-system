import { lazy } from 'react';
import type { TestId } from '@helpers/testing';

export const testIds: TestId[] = [
  { suffix: 'activator', description: 'The popover trigger element' },
  { suffix: 'content', description: 'The popover content panel' },
];

export default {
  heading: 'Popover',
  href: '/?path=/docs/components-popover--docs',
  tags: ['overlay', 'interactive', 'content'],
  Thumbnail: lazy(() => import('./Thumbnail')),
};
