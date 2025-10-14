import { IressButton, IressButtonProps } from '../Button';
import { IressIcon } from '../../Icon';
import { forwardRef, Ref } from 'react';
import { cx } from '@/styled-system/css';
import { GlobalCSSClass } from '@/enums';

export interface IressCloseButtonProps
  extends Omit<IressButtonProps, 'children' | 'mode'> {
  /**
   * Description for screen readers.
   * @default Close button
   **/
  screenreaderText?: string;
}

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
      {...restProps}
      className={cx(className, GlobalCSSClass.CloseButton)}
      mode="tertiary"
      ref={ref}
    >
      <IressIcon name="times" screenreaderText={screenreaderText} />
    </IressButton>
  ),
);

IressCloseButton.displayName = 'IressCloseButton';
