import { type IressSelectHeadingProps } from './SelectHeading.types';
import {
  ButtonCssClass,
  type ButtonRef,
  IressButton,
  type IressButtonProps,
  IressInline,
  IressMenuText,
  type PopoverVirtualNode,
  usePopoverItem,
} from '@/main';
import classNames from 'classnames';
import styles from '@/components/RichSelect/RichSelect.module.scss';
import { forwardRef, useImperativeHandle, useRef } from 'react';

type TheRef = ButtonRef | null;

const ClearButton = forwardRef(
  (props: IressButtonProps, ref: React.ForwardedRef<ButtonRef>) => {
    const elementRef = useRef<TheRef>(null);
    const { isActiveInPopover, ...popoverItemProps } = usePopoverItem('', {
      onKeyDown: props.onKeyDown as PopoverVirtualNode['onKeyDown'],
    });

    useImperativeHandle<TheRef, TheRef>(ref, () => elementRef.current);

    return (
      <IressButton
        {...props}
        {...popoverItemProps}
        className={classNames(styles.dropdownClear, {
          [ButtonCssClass.Active]: isActiveInPopover,
        })}
        mode="tertiary"
        ref={(element) => {
          elementRef.current = element;
          popoverItemProps?.ref?.(elementRef.current);
        }}
      />
    );
  },
);

export const IressSelectHeading = ({
  children,
  className,
  clearAll,
  onClearAll,
  role = 'option',
  ...restProps
}: IressSelectHeadingProps) => (
  <IressMenuText
    {...restProps}
    className={classNames(styles.dropdownSelectedHeading, className)}
    role={role}
  >
    <IressInline horizontalAlign="between" verticalAlign="middle">
      {children}
      {clearAll && (
        <ClearButton
          onClick={onClearAll}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              onClearAll?.(e);
            }
          }}
        >
          {typeof clearAll === 'boolean' ? 'Clear all' : clearAll}
        </ClearButton>
      )}
    </IressInline>
  </IressMenuText>
);
