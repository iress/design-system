import { type ComboboxHiddenInputProps } from '../Combobox.types';
import styles from '../Combobox.module.scss';
import { propagateTestid } from '@helpers/utility/propagateTestid';
import classNames from 'classnames';
import { forwardRef } from 'react';

export const ComboboxHiddenInput = forwardRef(
  (
    {
      dataTestId,
      hiddenInputProps,
      readOnly,
      ...restProps
    }: ComboboxHiddenInputProps,
    ref: React.ForwardedRef<HTMLInputElement>,
  ) => {
    // Convert 'locked' string to boolean for native HTML elements
    const nativeReadOnly =
      readOnly === 'locked' || readOnly === true ? true : undefined;

    return (
      <input
        {...hiddenInputProps}
        {...restProps}
        className={classNames(hiddenInputProps?.className, styles.hiddenInput)}
        data-testid={propagateTestid(dataTestId, 'hidden-input')}
        ref={ref}
        type="hidden"
        readOnly={nativeReadOnly}
      />
    );
  },
);

ComboboxHiddenInput.displayName = 'ComboboxHiddenInput';
