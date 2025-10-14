import { type ColumnSort } from '@tanstack/react-table';
import { type IressTableProps, type TableColumn } from '../Table.types';

export const composeIDSTableInitialSorting = <
  TRow extends object,
  TVal = unknown,
>(
  columns?: IressTableProps<TRow, TVal>['columns'],
): ColumnSort[] => {
  if (!columns) return [];

  const columnEntries = Array.isArray(columns)
    ? columns.map<[string, TableColumn<TRow, TVal>]>((column) => [
        column.key,
        column,
      ])
    : Object.entries(columns);

  return columnEntries
    .filter(([, column]) => typeof column?.sort === 'string')
    .map(([key, column]) => ({
      id: key,
      desc: column?.sort === 'desc',
    }));
};
