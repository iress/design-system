import { lazy } from 'react';
import type { TestId } from '@helpers/testing';
import type { ComponentMeta } from '@helpers/meta/types';

export const testIds: TestId[] = [
  { suffix: 'activator', description: 'The popover trigger element' },
  { suffix: 'content', description: 'The popover content panel' },
];

export default {
  heading: 'Popover',
  description: 'Displays floating content anchored to a trigger element.',
  tags: ['overlay', 'interactive', 'content'],
  Thumbnail: lazy(() => import('./Thumbnail')),
} satisfies ComponentMeta;
