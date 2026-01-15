import { IressInput } from '@/components/Input';
import { IressText } from '@/components/Text';
import { type InputRef } from '@/components/Input/InputBase/InputBase';
import {
  type ForwardedRef,
  forwardRef,
  type ReactElement,
  type RefAttributes,
} from 'react';
import { formatCurrency } from '@/helpers/formatting/formatCurrency';
import { type IressInputProps } from '@/components/Input/Input';
import { cx } from '@/styled-system/css';
import { GlobalCSSClass } from '@/enums';
import { type FormControlValue } from '@/types';

export interface IressInputCurrencyProps<
  T extends FormControlValue = string | number,
> extends Omit<IressInputProps<T, undefined>, 'rows'> {
  /**
   * Set input content align to right.
   */
  alignRight?: boolean;

  /**
   * Set the currency symbol and appended currency code, default is `AUD`.
   */
  currencyCode?: string;

  /**
   * Pass additional number format options.
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat
   */
  formatOptions?: Omit<Intl.NumberFormatOptions, 'currency'>;

  /**
   * Set the region of the currency, default is `en-AU`.
   */
  locale?: Intl.LocalesArgument;

  /**
   * Set the currency symbol.
   */
  withSymbol?: boolean;
}

const InputCurrency = <
  T extends Exclude<FormControlValue, boolean> = string | number,
>(
  props: IressInputCurrencyProps<T>,
  ref: ForwardedRef<InputRef>,
) => {
  const {
    locale = 'en-AU',
    currencyCode = 'AUD',
    withSymbol,
    formatOptions,
    alignRight = false,
    type = 'number',
    className,
    ...inputProps
  } = props;

  return (
    <IressInput<T>
      className={cx(className, GlobalCSSClass.InputCurrency)}
      formatter={(value) =>
        formatCurrency({
          value,
          locale,
          currencyCode,
          withSymbol,
          formatOptions,
        })
      }
      type={type}
      append={<IressText color="colour.neutral.70">{currencyCode}</IressText>}
      inline={inputProps.readOnly === true}
      alignRight={alignRight}
      ref={ref}
      {...inputProps}
    />
  );
};

export const IressInputCurrency = forwardRef(InputCurrency) as (<
  T extends Exclude<FormControlValue, boolean> = string | number,
>(
  props: IressInputCurrencyProps<T> & RefAttributes<InputRef | null>,
) => ReactElement) & {
  displayName: 'IressInputCurrency';
};

IressInputCurrency.displayName = 'IressInputCurrency';
