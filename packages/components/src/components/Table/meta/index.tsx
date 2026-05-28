import { lazy } from 'react';
import type { TestId } from '@helpers/testing';
import type { ComponentMeta } from '@helpers/meta/types';

export const testIds: TestId[] = [
  { suffix: 'table', description: 'The table element' },
  { suffix: 'caption', description: 'The table caption' },
  { suffix: 'thead', description: 'The table header section' },
  { suffix: 'tbody', description: 'The table body section' },
];

export default {
  heading: 'Table',
  description: 'Displays structured data in rows and columns.',
  tags: ['data-display', 'layout', 'structured-data'],
  Thumbnail: lazy(() => import('./Thumbnail')),
} satisfies ComponentMeta;
