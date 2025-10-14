import { type IressTableProps } from '../Table.types';

export const hasColumns = <TRow extends object, TVal = unknown>(
  columns: IressTableProps<TRow, TVal>['columns'],
): boolean => {
  if (!columns) return false;
  if (Array.isArray(columns)) return columns.length > 0;
  return Object.keys(columns).length > 0;
};
