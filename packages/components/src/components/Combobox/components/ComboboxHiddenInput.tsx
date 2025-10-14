import { type ComboboxHiddenInputProps } from '../Combobox.types';
import styles from '../Combobox.module.scss';
import { propagateTestid } from '@helpers/utility/propagateTestid';
import classNames from 'classnames';
import { forwardRef } from 'react';

export const ComboboxHiddenInput = forwardRef(
  (
    { dataTestId, hiddenInputProps, ...restProps }: ComboboxHiddenInputProps,
    ref: React.ForwardedRef<HTMLInputElement>,
  ) => (
    <input
      {...hiddenInputProps}
      {...restProps}
      className={classNames(hiddenInputProps?.className, styles.hiddenInput)}
      data-testid={propagateTestid(dataTestId, 'hidden-input')}
      ref={ref}
      type="hidden"
    />
  ),
);

ComboboxHiddenInput.displayName = 'ComboboxHiddenInput';
