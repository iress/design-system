import { IressInput } from '@/components/Input';
import { type IressInputCurrencyProps } from './InputCurrency.types';
import { IressText } from '@/components/Text';
import { type InputRef } from '@/components/Input/InputBase/InputBase.types';
import { forwardRef } from 'react';
import { formatCurrency } from '@/helpers/formatting/formatCurrency';

export const IressInputCurrency = forwardRef<InputRef, IressInputCurrencyProps>(
  (props, ref) => {
    const {
      locale = 'en-US',
      currencyCode = 'AUD',
      withSymbol,
      formatOptions,
      alignRight = false,
      type = 'number',
      className,
      ...inputProps
    } = props;

    return (
      <IressInput
        className={className}
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
        append={<IressText mode="muted">{currencyCode}</IressText>}
        inline={inputProps.readOnly}
        alignRight={alignRight}
        ref={ref}
        {...inputProps}
      />
    );
  },
);

IressInputCurrency.displayName = 'IressInputCurrency';
