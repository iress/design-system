import { propagateTestid } from '@helpers/utility/propagateTestid';
import {
  IressButton,
  type IressButtonProps,
  IressCloseButton,
} from '../../../Button';
import { IressInline } from '../../../Inline';
import { IressText } from '../../../Text';
import { forwardRef, type ReactNode, type MouseEvent } from 'react';
import { cx } from '@/styled-system/css';
import { toast as toastStyles } from './Toast.styles';
import { type IressStyledProps } from '@/types';
import { styled } from '@/styled-system/jsx';
import { IressIcon, type IressIconProps } from '@/components/Icon';
import { GlobalCSSClass } from '@/enums';

export type ToastStatus = 'success' | 'error' | 'info';

export interface ToastProps extends Omit<IressStyledProps, 'content'> {
  /**
   * Actions to display in the alert. These will be rendered as buttons with opinionated styling.
   * If you want to use custom buttons, use the `footer` prop instead.
   **/
  actions?: Omit<IressButtonProps, 'mode' | 'status'>[];

  /**
   * Alternative to children.
   */
  content?: ReactNode;

  /**
   * A boolean to show/hide the dismiss close button.
   * @default true
   */
  dismissible?: boolean;

  /**
   * The heading area of the toast. You can pass react component such as `<IressText>Error</IressText>`.
   * If a string is provided, it will default to a `<h2 />` element.
   */
  heading?: ReactNode;

  /**
   * Click event on the close button of the toast.
   */
  onClose?: (e?: MouseEvent<HTMLButtonElement>) => void;

  /**
   * System status of Toast
   */
  status: ToastStatus;
}

const iconColor: Record<ToastStatus, IressStyledProps['color']> = {
  error: 'colour.system.danger.text',
  success: 'colour.system.success.text',
  info: 'colour.system.info.text',
};

const icons: Record<ToastStatus, IressIconProps['name']> = {
  error: 'ban',
  success: 'check',
  info: 'info-square',
};

export const Toast = forwardRef<HTMLDivElement, ToastProps>(
  (
    {
      actions,
      heading,
      status,
      children,
      content,
      dismissible = true,
      onClose,
      'data-testid': dataTestId,
      className,
      ...restProps
    },
    ref,
  ) => {
    const classes = toastStyles({ status });
    const hasActions = !!actions?.length;

    return (
      <styled.div
        {...restProps}
        data-testid={dataTestId}
        className={cx(className, classes.root, GlobalCSSClass.Toast)}
        tabIndex={-1}
        ref={ref}
      >
        <div className={classes.panel}>
          <IressInline gap="sm" verticalAlign="top" noWrap>
            <IressIcon
              name={icons[status]}
              screenreaderText={`${status}: `}
              textStyle="typography.heading.4"
              color={iconColor[status]}
            />

            <div
              className={classes.wrapper}
              data-testid={propagateTestid(dataTestId, 'content')}
            >
              {heading && (
                <IressText
                  className={classes.heading}
                  data-testid={propagateTestid(dataTestId, 'heading')}
                >
                  {typeof heading === 'string' ? <h2>{heading}</h2> : heading}
                </IressText>
              )}
              {dismissible && (
                <IressCloseButton
                  data-testid={propagateTestid(
                    dataTestId,
                    'close-button__button',
                  )}
                  className={classes.closeButton}
                  onClick={(e) => onClose?.(e)}
                  screenreaderText="Dismiss"
                />
              )}

              <div className={classes.content}>{content ?? children}</div>

              {hasActions && (
                <IressInline gap="sm" mt="spacing.1">
                  {actions?.map((action, index) => (
                    <IressButton
                      {...action}
                      className={cx(action.className, classes.action)}
                      key={index}
                    />
                  ))}
                </IressInline>
              )}
            </div>
          </IressInline>
        </div>
      </styled.div>
    );
  },
);

Toast.displayName = 'Toast';
