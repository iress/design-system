import { cx } from '@/styled-system/css';
import { richSelect } from '@/components/RichSelect/RichSelect.styles';
import {
  forwardRef,
  useImperativeHandle,
  useRef,
  ReactNode,
  UIEvent,
} from 'react';
import { IressMenuHeading, IressMenuTextProps } from '../../Menu';
import { GlobalCSSClass } from '@/enums';
import { IressButton, IressButtonProps } from '@/components/Button';
import { usePopoverItem } from '@/components/Popover';
import { IressInline } from '@/components/Inline';

export interface IressSelectHeadingProps extends IressMenuTextProps {
  /**
   * The content to be rendered; can be a string or a ReactNode (e.g. IressIcon).
   */
  children: ReactNode;

  /**
   * Adds a clear all button to the heading.
   */
  clearAll?: string | boolean;

  /**
   * Emitted when the user clicks the clear button, or triggers it using a keyboard.
   */
  onClearAll?: (e: UIEvent<HTMLButtonElement>) => void;
}

const classes = richSelect();

const ClearButton = forwardRef(
  (
    props: IressButtonProps,
    ref: React.ForwardedRef<HTMLButtonElement | null>,
  ) => {
    const elementRef = useRef<HTMLButtonElement | null>(null);
    const { isActiveInPopover, ...popoverItemProps } = usePopoverItem('', {
      onKeyDown: props.onKeyDown,
    });

    useImperativeHandle(ref, () => elementRef.current!);

    return (
      <IressButton
        {...props}
        {...popoverItemProps}
        className={cx(
          classes.dropdownClear,
          GlobalCSSClass.RichSelectClearButton,
        )}
        active={isActiveInPopover}
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
  ...restProps
}: IressSelectHeadingProps) => (
  <IressMenuHeading
    {...restProps}
    className={cx(
      classes.dropdownSelectedHeading,
      className,
      GlobalCSSClass.RichSelectHeading,
    )}
    role={undefined}
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
  </IressMenuHeading>
);
