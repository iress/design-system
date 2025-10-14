import { formatPercentage } from '@helpers/formatting/formatPercentage';
import { formatDate, formatShortDate } from '@helpers/formatting/formatDate';
import { formatCurrency } from '@helpers/formatting/formatCurrency';
import { type IressTableFormattedValueProps } from './TableFormattedValue.types';
import {
  formatISODateTime,
  formatRelativeTime,
} from '@/helpers/formatting/formatDateTime';

export const IressTableFormattedValue = <TRow extends object, TVal = unknown>({
  currencyCode = '$',
  currencyFormatOptions,
  format,
  row,
  value,
}: IressTableFormattedValueProps<TRow, TVal>) => {
  if (!format) return value;
  if (typeof format === 'function') return format(value, row);
  if (format === 'currency')
    return `${currencyCode}${formatCurrency({
      value: value as never,
      ...currencyFormatOptions,
    })}`;
  if (format === 'number')
    return typeof value === 'number' ? value : Number(value);
  if (format === 'date') return formatDate(value as never);
  if (format === 'shortDate') return formatShortDate(value as never);
  if (format === 'isoDateTime') return formatISODateTime(value as never);
  if (format === 'relativeTime') return formatRelativeTime(value as never);
  if (format === 'percent') return formatPercentage(value as never);
  return value;
};
