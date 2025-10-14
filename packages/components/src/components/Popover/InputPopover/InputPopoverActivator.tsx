import styles from '../Popover.module.scss';
import { usePopover } from '../hooks/usePopover';
import {
  type ChangeEvent,
  type FocusEvent,
  type MouseEvent,
  cloneElement,
  useCallback,
} from 'react';
import { type InputPopoverActivatorProps } from './InputPopover.types';
import { type InputBaseProps, type IressInputProps } from '@/main';
import { hasFocus } from '../helpers/hasFocus';
import { usePopoverActivatorInteractions } from '../hooks/usePopoverActivatorInteractions';

export const InputPopoverActivator = ({
  children,
  disabledAutoToggle,
  minLength,
  ...restProps
}: InputPopoverActivatorProps) => {
  const popover = usePopover();

  const childrenProps = children?.props as IressInputProps;
  const inputMinLength = minLength ?? childrenProps.minLength ?? 1;
  const pressEvent = 'focus';

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.currentTarget.value;

      if (!disabledAutoToggle) {
        const hasValue = value.length >= inputMinLength;

        if (hasValue && popover?.show === false) {
          popover.setShowWithReason(true, e.nativeEvent, pressEvent);
        } else if (!hasValue && popover?.show) {
          popover.setShowWithReason(false, e.nativeEvent, pressEvent);
        }
      }

      childrenProps.onChange?.(e, value);
    },
    [childrenProps, disabledAutoToggle, inputMinLength, popover],
  );

  const handleClick = useCallback(
    (e: MouseEvent<HTMLInputElement>) => {
      const value = e.currentTarget.value;
      childrenProps.onClick?.(e);

      if (
        !disabledAutoToggle &&
        popover?.show === false &&
        hasFocus(e.currentTarget) &&
        value.length >= inputMinLength
      ) {
        popover.setShowWithReason(true, e.nativeEvent, pressEvent);
      }
    },
    [childrenProps, disabledAutoToggle, inputMinLength, popover],
  );

  const handleFocus = useCallback(
    (e: FocusEvent<HTMLInputElement>) => {
      childrenProps.onFocus?.(e);

      if (disabledAutoToggle) return;

      if (
        (!inputMinLength || e.currentTarget.value.length >= inputMinLength) &&
        popover?.show === false
      ) {
        popover.setShowWithReason(true, e.nativeEvent, 'focus');
      }
    },
    [childrenProps, disabledAutoToggle, inputMinLength, popover],
  );

  const activatorInteractions = usePopoverActivatorInteractions(
    popover,
    childrenProps as InputBaseProps,
  );

  return (
    <div
      {...restProps}
      className={styles.activator}
      ref={popover?.api.refs.setReference}
    >
      {children &&
        popover &&
        cloneElement(
          children,
          popover.interactions.getReferenceProps({
            ...activatorInteractions,
            'aria-autocomplete': 'list',
            onChange: handleChange,
            onClick: handleClick,
            onFocus: handleFocus,
          }),
        )}
    </div>
  );
};
