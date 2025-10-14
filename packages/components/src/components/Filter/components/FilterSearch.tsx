import { IressInput, type IressInputProps } from '@/main';
import styles from '../Filter.module.scss';
import { usePopoverItem } from '@/components/Popover/hooks/usePopoverItem';
import { forwardRef, useImperativeHandle, useRef } from 'react';
import classNames from 'classnames';
import { type InputRef } from '@/components/Input/InputBase/InputBase.types';

type TheRef = InputRef | null;

export const FilterSearch = forwardRef(
  (props: IressInputProps, ref: React.ForwardedRef<InputRef>) => {
    const elementRef = useRef<InputRef | null>(null);
    const { isActiveInPopover, ...popoverItemProps } = usePopoverItem();

    useImperativeHandle<TheRef, TheRef>(ref, () => elementRef.current);

    return (
      <IressInput
        {...props}
        {...popoverItemProps}
        autoCorrect="off"
        className={classNames(styles.searchInput, {
          [styles.isActiveInPopover]: isActiveInPopover,
        })}
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
