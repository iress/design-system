import { lazy } from 'react';
import type { TestId } from '@helpers/testing';
import type { ComponentMeta } from '@helpers/meta/types';

export const testIds: TestId[] = [
  { suffix: 'activator', description: 'The tooltip trigger element' },
  { suffix: 'tooltip-text', description: 'The tooltip content' },
];

export default {
  heading: 'Tooltip',
  description: 'Shows additional contextual information on hover or focus of a trigger element.',
  tags: ['overlay', 'feedback', 'help'],
  Thumbnail: lazy(() => import('./Thumbnail')),
} satisfies ComponentMeta;
