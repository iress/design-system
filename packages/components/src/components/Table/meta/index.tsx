import { lazy } from 'react';
import type { ComponentMeta } from '@helpers/meta/types';
import type { TestComponentMeta } from '@iress-oss/ids-storybook-config';

export const testMeta: TestComponentMeta[] = [
  {
    part: 'main',
    description: 'The root element of the table',
    query: <code>getByRole('table', {'{'} name: '...' {'}'})</code>,
    testId: 'table',
  },
  {
    part: 'table',
    description: 'The table element',
    testId: 'table__table',
  },
  {
    part: 'caption',
    description: 'The table caption',
    testId: 'table__caption',
  },
  {
    part: 'thead',
    description: 'The table header section',
    testId: 'table__thead',
  },
  {
    part: 'tbody',
    description: 'The table body section',
    testId: 'table__tbody',
  },
];

export default {
  heading: 'Table',
  description: 'Displays structured data in rows and columns.',
  tags: ['data-display', 'layout', 'structured-data'],
  testMeta,
  Thumbnail: lazy(() => import('./Thumbnail')),
} satisfies ComponentMeta;
