export interface CurrencyFormatterProps {
  /**
   * The currency code to use when formatting the value.
   */
  currencyCode?: string;
  /**
   * Additional options to pass to the `Intl.NumberFormat` constructor.
   * [Learn more](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat)
   */
  formatOptions?: Omit<Intl.NumberFormatOptions, 'currency'>;

  /**
   * The locale to use when formatting the value.
   * @default 'en-AU'
   */
  locale?: Intl.LocalesArgument;

  /**
   * The value to format.
   */
  value?: string | number | null;

  /**
   * Whether to include the currency symbol in the output.
   */
  withSymbol?: boolean;
}

export const formatCurrency = ({
  value,
  locale = 'en-AU',
  currencyCode = 'AUD',
  withSymbol = false,
  formatOptions,
}: CurrencyFormatterProps) => {
  if (value === '') return '';

  const numericValue = Number(value);

  if (Number.isNaN(numericValue)) {
    return value ?? '';
  }

  const output = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyCode,
    currencyDisplay: withSymbol ? 'symbol' : 'code',
    ...formatOptions,
  }).format(numericValue);

  return withSymbol ? output : output.replace(currencyCode, '').trim();
};
