import { IressButton, type IressButtonProps } from '@/components/Button';
import { filter } from '../Filter.styles';
import { usePopoverItem } from '@/components/Popover/hooks/usePopoverItem';
import {
  type ForwardedRef,
  forwardRef,
  useImperativeHandle,
  useRef,
} from 'react';

export const FilterResetButton = forwardRef(
  (props: IressButtonProps, ref: ForwardedRef<HTMLButtonElement>) => {
    const elementRef = useRef<HTMLButtonElement | null>(null);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { isActiveInPopover, ...popoverItemProps } = usePopoverItem();

    const classes = filter();

    useImperativeHandle(ref, () => elementRef.current!);

    return (
      <IressButton
        {...props}
        {...popoverItemProps}
        className={classes.reset}
        mode="tertiary"
        ref={(element) => {
          elementRef.current = element;
          popoverItemProps?.ref?.(elementRef.current);
        }}
      />
    );
  },
);

FilterResetButton.displayName = 'FilterResetButton';
