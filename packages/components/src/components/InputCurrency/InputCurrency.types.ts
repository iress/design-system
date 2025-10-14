import { type IressInputProps } from '@/components/Input/Input.types';

export interface IressInputCurrencyProps extends IressInputProps {
  /**
   * Set the region of the currency, default is `en-AU`.
   */
  locale?: Intl.LocalesArgument;
  /**
   * Set the currency symbol and appended currency code, default is `AUD`.
   */
  currencyCode?: string;
  /**
   * Pass more format options, examples in here: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat
   */
  formatOptions?: Omit<Intl.NumberFormatOptions, 'currency'>;
  /**
   * Set the currency symbol.
   */
  withSymbol?: boolean;
  /**
   * Set input content align to right.
   */
  alignRight?: boolean;
}
