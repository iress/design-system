import { formatPercentage } from '@helpers/formatting/formatPercentage';
import { formatDate, formatShortDate } from '@helpers/formatting/formatDate';
import {
  type CurrencyFormatterProps,
  formatCurrency,
} from '@helpers/formatting/formatCurrency';
import {
  formatISODateTime,
  formatRelativeTime,
} from '@/helpers/formatting/formatDateTime';
import { type ReactNode } from 'react';

export interface IressTableFormattedValueProps<
  TRow extends object,
  TVal = unknown,
> {
  /**
   * The currency code to prefix to the value if `format` is set to currency.
   * @default { locale: 'en-AU', currencyCode: 'AUD' }
   */
  currencyFormatOptions?: Omit<CurrencyFormatterProps, 'value'>;

  /**
   * Formats the cell content.
   * To use the in-built formatters, set this to: string, number, date, currency, percent.
   * Use a custom formatter by passing a function that returns a ReactNode.
   */
  format?: TableCellFormats | ((value: TVal, row?: TRow) => ReactNode);

  /**
   * The row data.
   */
  row?: TRow;

  /**
   * The value to format.
   */
  value: TVal;
}

export type TableCellFormats =
  | 'string'
  | 'number'
  | 'date'
  | 'shortDate'
  | 'isoDateTime'
  | 'relativeTime'
  | 'currency'
  | 'percent';

export const IressTableFormattedValue = <TRow extends object, TVal = unknown>({
  currencyFormatOptions,
  format,
  row,
  value,
}: IressTableFormattedValueProps<TRow, TVal>) => {
  if (!format) return value;
  if (typeof format === 'function') return format(value, row);
  if (format === 'currency')
    return `${formatCurrency({
      value: value as never,
      withSymbol: true,
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
