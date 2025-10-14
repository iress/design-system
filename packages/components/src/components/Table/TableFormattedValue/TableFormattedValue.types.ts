import { type ReactNode } from 'react';
import { type TableCellFormats } from '../Table.types';
import { type CurrencyFormatterProps } from '@/helpers/formatting/formatCurrency';

export interface IressTableFormattedValueProps<
  TRow extends object,
  TVal = unknown,
> {
  /**
   * The currency code to prefix to the value if `format` is set to currency.
   * @default $
   * @deprecated Use the `currencyFormatOptions` prop instead.
   */
  currencyCode?: string;

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
