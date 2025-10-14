import { type IressTableProps } from '../Table.types';

export const findColumnByKey = <TRow extends object, TVal = unknown>(
  key: string,
  columns: IressTableProps<TRow, TVal>['columns'] = [],
) => {
  if (Array.isArray(columns)) {
    return columns.find((column) => column.key === key);
  }

  return columns[key];
};
