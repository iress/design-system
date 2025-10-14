import {
  type ForwardedRef,
  forwardRef,
  useImperativeHandle,
  useRef,
} from 'react';
import { type IressSelectSearchInputProps } from './SelectSearchInput.types';
import classNames from 'classnames';
import styles from './SelectSearchInput.module.scss';
import { IressIcon } from '@/components/Icon';
import { type InputRef, IressInput } from '@/components/Input';
import { usePopoverItem } from '@/components/Popover/hooks/usePopoverItem';

export const IressSelectSearchInput = forwardRef(
  (
    {
      autoComplete = 'off',
      className,
      placeholder = 'Search',
      prepend = <IressIcon name="search" />,
      watermark = true,
      ...restProps
    }: IressSelectSearchInputProps,
    ref: ForwardedRef<InputRef>,
  ) => {
    const elementRef = useRef<InputRef | null>(null);
    const { isActiveInPopover, ...popoverItemProps } = usePopoverItem();

    useImperativeHandle(ref, () => elementRef.current!);

    return (
      <IressInput
        {...restProps}
        {...popoverItemProps}
        tabIndex={undefined} // Prevents tabIndex from being set, as we use this as the activator inside a popover
        autoComplete={autoComplete}
        className={classNames(className, styles.selectSearchInput, {
          [styles.isActiveInPopover]: isActiveInPopover,
        })}
        placeholder={placeholder}
        prepend={prepend}
        ref={(element) => {
          elementRef.current = element;
          popoverItemProps?.ref?.(elementRef.current?.input ?? null);
        }}
        watermark={watermark}
      />
    );
  },
);

IressSelectSearchInput.displayName = 'IressSelectSearchInput';
