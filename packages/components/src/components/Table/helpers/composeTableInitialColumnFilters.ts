import { type ColumnFiltersState } from '@tanstack/react-table';
import {
  normalizeColumnFilter,
  type IressTableColumn,
} from './composeTableColumnDefs';

export const composeTableInitialColumnFilters = <
  TRow extends object,
  TVal = unknown,
>(
  columns?: IressTableColumn<TRow, TVal>[],
): ColumnFiltersState => {
  if (!columns) return [];

  return columns
    .filter((column) => {
      const filterConfig = normalizeColumnFilter(column.filter);
      return filterConfig?.defaultValue && filterConfig.defaultValue.length > 0;
    })
    .map((column) => {
      const filterConfig = normalizeColumnFilter(column.filter)!;
      return {
        id: column.key,
        value: filterConfig.defaultValue!,
      };
    });
};
