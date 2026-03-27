import { lazy } from 'react';
import type { TestId } from '@helpers/testing';

export const testIds: TestId[] = [
  { suffix: 'table', description: 'The table element' },
  { suffix: 'caption', description: 'The table caption' },
  { suffix: 'thead', description: 'The table header section' },
  { suffix: 'tbody', description: 'The table body section' },
];

export default {
  heading: 'Table',
  href: '/?path=/docs/components-table--docs',
  tags: ['data-display', 'layout', 'structured-data'],
  Thumbnail: lazy(() => import('./Thumbnail')),
};
