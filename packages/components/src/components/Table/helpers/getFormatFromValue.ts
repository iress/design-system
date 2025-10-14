import { type TableCellFormats } from '../Table.types';

export const getFormatFromValue = (
  value: unknown,
): TableCellFormats | undefined => {
  if (typeof value === 'number') {
    return 'number';
  }

  if (typeof value === 'string') {
    return 'string';
  }

  if (value instanceof Date) {
    return 'date';
  }

  return undefined;
};
