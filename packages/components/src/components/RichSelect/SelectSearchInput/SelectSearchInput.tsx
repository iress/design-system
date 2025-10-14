import { ForwardedRef, forwardRef, useImperativeHandle, useRef } from 'react';
import { cx } from '@/styled-system/css';
import { selectSearchInput } from './SelectSearchInput.styles';
import { IressIcon } from '@/components/Icon';
import { InputRef, IressInput, IressInputProps } from '@/components/Input';
import { usePopoverItem } from '@/components/Popover/hooks/usePopoverItem';
import { GlobalCSSClass } from '@/enums';

export interface IressSelectSearchInputProps
  extends Omit<IressInputProps, 'rows' | 'width'> {
  /**
   * Content to place inside the input when it has no value.
   * @default Search
   **/
  placeholder?: string;

  /**
   * Content to prepended to the input field, usually an icon.
   * @default <IressIcon name="search" />
   **/
  prepend?: React.ReactNode;
}

export const IressSelectSearchInput = forwardRef(
  (
    {
      'aria-label': ariaLabel,
      autoComplete = 'off',
      className,
      placeholder = 'Search',
      prepend = <IressIcon name="search" />,
      ...restProps
    }: IressSelectSearchInputProps,
    ref: ForwardedRef<InputRef>,
  ) => {
    const elementRef = useRef<InputRef | null>(null);
    const { isActiveInPopover, ...popoverItemProps } = usePopoverItem();
    const classes = selectSearchInput({ isActiveInPopover });

    useImperativeHandle(ref, () => elementRef.current!);

    return (
      <IressInput
        {...restProps}
        {...popoverItemProps}
        tabIndex={undefined} // Prevents tabIndex from being set, as we use this as the activator inside a popover
        aria-label={ariaLabel ?? placeholder ?? 'Search'}
        autoComplete={autoComplete}
        className={cx(
          classes.root,
          className,
          GlobalCSSClass.RichSelectSearchInput,
        )}
        placeholder={placeholder}
        prepend={prepend}
        ref={(element) => {
          elementRef.current = element;
          popoverItemProps?.ref?.(elementRef.current?.input ?? null);
        }}
      />
    );
  },
);

IressSelectSearchInput.displayName = 'IressSelectSearchInput';
