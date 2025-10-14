import { type ButtonRef, IressButton, type IressButtonProps } from '@/main';
import styles from '../Filter.module.scss';
import { usePopoverItem } from '@/components/Popover/hooks/usePopoverItem';
import { forwardRef, useImperativeHandle, useRef } from 'react';
import classNames from 'classnames';

type TheRef = ButtonRef | null;

export const FilterResetButton = forwardRef(
  (props: IressButtonProps, ref: React.ForwardedRef<ButtonRef>) => {
    const elementRef = useRef<TheRef>(null);
    const { isActiveInPopover, ...popoverItemProps } = usePopoverItem();

    useImperativeHandle<TheRef, TheRef>(ref, () => elementRef.current);

    return (
      <IressButton
        {...props}
        {...popoverItemProps}
        className={classNames(styles.reset, {
          [styles.isActiveInPopover]: isActiveInPopover,
        })}
        mode={IressButton.Mode.Link}
        ref={(element) => {
          elementRef.current = element;
          popoverItemProps?.ref?.(elementRef.current);
        }}
      />
    );
  },
);

FilterResetButton.displayName = 'FilterResetButton';
