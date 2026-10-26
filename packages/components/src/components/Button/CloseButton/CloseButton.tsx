import { IressButton, type IressButtonProps } from '../Button';
import { forwardRef, type Ref } from 'react';
import { cx } from '@/styled-system/css';
import { GlobalCSSClass } from '@/enums';

export interface IressCloseButtonProps extends Omit<
  IressButtonProps,
  'children' | 'mode'
> {
  /**
   * Description for screen readers.
   * @default Close button
   **/
  screenreaderText?: string;
}

/**
 * A circular close button with a close icon, typically used to dismiss modals, slideouts, or notifications.
 *
 * @example
 * ```tsx
 * import { IressCloseButton } from '@iress-oss/ids-components';
 *
 * <IressCloseButton screenreaderText="Close dialog" onClick={handleClose} />
 * ```
 */
export const IressCloseButton = forwardRef(
  (
    {
      className,
      screenreaderText = 'Close button',
      ...restProps
    }: IressCloseButtonProps,
    ref: Ref<HTMLButtonElement>,
  ) => (
    <IressButton
      borderRadius="50%"
      {...restProps}
      aria-label={screenreaderText}
      className={cx(className, GlobalCSSClass.CloseButton)}
      mode="muted"
      icon="close"
      ref={ref}
    />
  ),
);

IressCloseButton.displayName = 'IressCloseButton';
