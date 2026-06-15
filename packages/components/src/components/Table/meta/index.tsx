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
    part: 'header row',
    description: 'A header row (uses dash separator)',
    query: <code>getByRole('row')</code>,
    testId: 'table__thead-row',
  },
  {
    part: 'body row',
    description: 'A body row',
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
  import: "import { IressTable } from '@iress-oss/ids-components';",
  github: {
    source:
      'https://github.com/iress/design-system/tree/main/packages/components/src/components/Table',
    guidelines:
      'https://github.com/iress/design-system/edit/main/apps/guidelines/content/components/table.mdx',
    storybook:
      'https://github.com/iress/design-system/edit/main/packages/components/src/components/Table/Table.stories.tsx',
    reportIssue:
      'https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=table&title=[Table]+Bug:+',
    requestFeature:
      'https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=table,enhancement&title=[Table]+Feature:+',
  },
  storybook:
    'https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-table--docs',
} satisfies ComponentMeta;
