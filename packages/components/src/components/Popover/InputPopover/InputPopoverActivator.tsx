import {
  type ChangeEvent,
  type FocusEvent,
  type MouseEvent,
  cloneElement,
  useCallback,
  useContext,
} from 'react';
import { hasFocus } from '../helpers/hasFocus';
import { usePopoverActivatorInteractions } from '../hooks/usePopoverActivatorInteractions';
import { type PopoverActivatorProps } from '../components/PopoverActivator';
import { PopoverContext } from '../hooks/usePopover';
import { type InputBaseProps, type IressInputProps } from '@/components/Input';

export interface InputPopoverActivatorProps extends PopoverActivatorProps {
  /**
   * Min length of input activator before popover is shown, if input activator has minLength
   * prop it will use that as a fallback. Defaults to 1 if not provided and not found in activator.
   */
  minLength?: number;
}

export const InputPopoverActivator = ({
  children,
  minLength,
  ...restProps
}: InputPopoverActivatorProps) => {
  const popover = useContext(PopoverContext);

  const childrenProps = children?.props as IressInputProps;
  const inputMinLength = minLength ?? childrenProps.minLength ?? 1;
  const pressEvent = 'focus';

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.currentTarget.value;

      const hasValue = value.length >= inputMinLength;

      if (hasValue && popover?.show === false) {
        popover.setShowWithReason(true, e.nativeEvent, pressEvent);
      } else if (!hasValue && popover?.show) {
        popover.setShowWithReason(false, e.nativeEvent, pressEvent);
      }

      childrenProps.onChange?.(e, value);
    },
    [childrenProps, inputMinLength, popover],
  );

  const handleClick = useCallback(
    (e: MouseEvent<HTMLInputElement>) => {
      const value = e.currentTarget.value;
      childrenProps.onClick?.(e);

      if (
        popover?.show === false &&
        hasFocus(e.currentTarget) &&
        value.length >= inputMinLength
      ) {
        popover.setShowWithReason(true, e.nativeEvent, pressEvent);
      }
    },
    [childrenProps, inputMinLength, popover],
  );

  const handleFocus = useCallback(
    (e: FocusEvent<HTMLInputElement>) => {
      childrenProps.onFocus?.(e);

      if (
        (!inputMinLength || e.currentTarget.value.length >= inputMinLength) &&
        popover?.show === false
      ) {
        popover.setShowWithReason(true, e.nativeEvent, 'focus');
      }
    },
    [childrenProps, inputMinLength, popover],
  );

  const activatorInteractions = usePopoverActivatorInteractions(
    popover,
    childrenProps as InputBaseProps,
  );

  return (
    <div {...restProps} ref={popover?.api.refs.setReference}>
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
