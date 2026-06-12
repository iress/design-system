import { lazy } from 'react';
import type { ComponentMeta } from '@helpers/meta/types';
import type { TestComponentMeta } from '@iress-oss/ids-storybook-config';

export const testMeta: TestComponentMeta[] = [
  {
    part: 'main',
    description: 'The root element of the table',
    testId: 'table',
  },
  {
    part: 'table',
    description: 'The table element',
    query: <code>getByRole('table', {'{'} name: '...' {'}'})</code>,
    testId: 'table__table',
  },
  {
    part: 'caption',
    description: 'The table caption',
    query: <code>getByText('...')</code>,
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
  {
    part: 'row',
    description: 'A table row (header or body)',
    query: <code>getByRole('row')</code>,
    testId: 'table__row',
  },
  {
    part: 'cell',
    description: 'A table body cell',
    query: <code>getByRole('cell')</code>,
    testId: 'table__cell__row_*__col_*',
  },
  {
    part: 'header',
    description: 'A column header cell',
    query: <code>getByRole('columnheader')</code>,
    testId: 'table__header__*',
  },
];

export default {
  heading: 'Table',
  description: 'Displays structured data in rows and columns.',
  tags: ['data-display', 'layout', 'structured-data'],
  testMeta,
  Thumbnail: lazy(() => import('./Thumbnail')),
} satisfies ComponentMeta;
