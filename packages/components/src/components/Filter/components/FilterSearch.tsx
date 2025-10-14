import { filter } from '../Filter.styles';
import { usePopoverItem } from '@/components/Popover/hooks/usePopoverItem';
import {
  type ForwardedRef,
  forwardRef,
  useImperativeHandle,
  useRef,
} from 'react';
import { cx } from '@/styled-system/css';
import { type InputRef } from '@/components/Input/InputBase/InputBase';
import { IressInput, type IressInputProps } from '@/components/Input';

export const FilterSearch = forwardRef(
  (props: IressInputProps, ref: ForwardedRef<InputRef>) => {
    const elementRef = useRef<InputRef | null>(null);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { isActiveInPopover, ...popoverItemProps } = usePopoverItem();

    useImperativeHandle<InputRef, InputRef>(ref, () => elementRef.current!);

    const classes = filter();

    return (
      <IressInput
        {...props}
        {...popoverItemProps}
        autoCorrect="off"
        className={cx(classes.searchInput, props.className)}
        style={{ width: '100%' }}
        ref={(element) => {
          elementRef.current = element;
          popoverItemProps?.ref?.(elementRef.current?.input ?? null);
        }}
        type="search"
      />
    );
  },
);

FilterSearch.displayName = 'FilterSearch';
