import { type ColumnFiltersState } from '@tanstack/react-table';
import { type TableColumn } from './composeTableColumnDefs';

export const composeTableInitialColumnFilters = <
  TRow extends object,
  TVal = unknown,
>(
  columns?: TableColumn<TRow, TVal>[],
): ColumnFiltersState => {
  if (!columns) return [];

  return columns
    .filter((column) => column.defaultFilter && column.defaultFilter.length > 0)
    .map((column) => ({
      id: column.key,
      value: column.defaultFilter!,
    }));
};
