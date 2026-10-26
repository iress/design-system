import { cx } from '@/styled-system/css';
import { select } from '@/components/Select/Select.styles';
import {
  forwardRef,
  useImperativeHandle,
  useRef,
  type ReactNode,
  type UIEvent,
} from 'react';
import { IressMenuHeading, type IressMenuTextProps } from '../../Menu';
import { GlobalCSSClass } from '@/enums';
import { IressButton, type IressButtonProps } from '@/components/Button';
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

const classes = select();

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
        className={cx(classes.dropdownClear, GlobalCSSClass.SelectClearButton)}
        active={isActiveInPopover}
        mode="quaternary"
        ref={(element) => {
          elementRef.current = element;
          popoverItemProps?.ref?.(elementRef.current);
        }}
      />
    );
  },
);

/**
 * A heading displayed within a select dropdown, with an optional clear-all button.
 *
 * @example
 * ```tsx
 * import { IressSelectHeading } from '@iress-oss/ids-components';
 *
 * <IressSelectHeading clearAll="Clear all" onClearAll={() => {}}>
 *   Selected items
 * </IressSelectHeading>
 * ```
 */
export const IressSelectHeading = ({
  children,
  className,
  clearAll,
  onClearAll,
  textStyle = 'typography.body.md.medium',
  ...restProps
}: IressSelectHeadingProps) => (
  <IressMenuHeading
    {...restProps}
    className={cx(
      classes.dropdownSelectedHeading,
      className,
      GlobalCSSClass.SelectHeading,
    )}
    role={undefined}
    textStyle={textStyle}
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

IressSelectHeading.displayName = 'IressSelectHeading';
