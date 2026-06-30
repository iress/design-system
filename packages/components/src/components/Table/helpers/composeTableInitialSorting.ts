import { type ColumnSort } from '@tanstack/react-table';
import { type IressTableColumn } from './composeTableColumnDefs';

export const composeTableInitialSorting = <TRow extends object, TVal = unknown>(
  columns?: IressTableColumn<TRow, TVal>[],
): ColumnSort[] => {
  if (!columns) return [];

  const columnEntries = columns.map<[string, IressTableColumn<TRow, TVal>]>(
    (column) => [column.key, column],
  );

  return columnEntries
    .filter(([, column]) => typeof column?.sort === 'string')
    .map(([key, column]) => ({
      id: key,
      desc: column?.sort === 'desc',
    }));
};
