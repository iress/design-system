import { IressIcon, type IressIconProps } from '../Icon';
import { IressText, type IressTextProps } from '../Text';
import { propagateTestid } from '@helpers/utility/propagateTestid';
import { alert } from './Alert.styles';
import { cx, css } from '@/styled-system/css';
import { type ReactNode, type MouseEvent, useMemo } from 'react';
import type { Statuses } from '@/types';
import { GlobalCSSClass } from '@/enums';
import {
  IressButton,
  type IressButtonProps,
  IressCloseButton,
} from '../Button';
import { useControlledState } from '@/hooks';
import { splitCssProps } from '@/styled-system/jsx';

export interface IressAlertButtonProps extends Omit<
  IressButtonProps,
  'mode' | 'status'
> {
  mode?: 'secondary' | 'tertiary';
}

export interface IressAlertProps extends Omit<IressTextProps, 'element'> {
  /**
   * Actions to display in the alert. These will be rendered as buttons with opinionated styling.
   * If you want to use custom buttons, use the `footer` prop instead.
   **/
  actions?: IressAlertButtonProps[];

  /**
   * Contents of the alert. Is automatically wrapped in `<IressText />` and will inherit its styling.
   **/
  children?: ReactNode;

  /**
   * If true, the alert will be dismissed and unrendered from the DOM. Use for uncontrolled dismissal of the alert, where the component manages its own dismissed state internally.
   **/
  defaultClosed?: boolean;

  /**
   * If true, the alert will be dismissed and unrendered from the DOM. Use for controlled dismissal of the alert, where the parent component manages the dismissed state and passes it down via this prop.
   **/
  closed?: boolean;

  /**
   * Optional override for the default close button label "Close".
   */
  closeLabel?: string;

  /**
   * Buttons and controls for the alert.
   * @deprecated Use `actions` instead for buttons with opinionated styling. If you need other footer content, use the `children` prop instead.
   **/
  footer?: ReactNode;

  /**
   * Text for alert heading. If a string, it will use a heading with level 2.
   **/
  heading?: ReactNode;

  /**
   * Icon to display in the alert.
   * If set to `false`, no icon will be displayed.
   * If not provided, the icon will be determined by the `status` prop.
   **/
  icon?: IressIconProps['name'] | false;

  /**
   * If true, the alert will have a layout that supports longer content, with increased spacing and the icon aligned to the top of the alert instead of centered. Should be used when the content of the alert is more than a couple of sentences.
   */
  multiLine?: boolean;

  /**
   * Icon to display in the alert.
   * If set to `false`, no icon will be displayed.
   * If not provided, the icon will be determined by the `status` prop.
   **/
  onClose?: (e?: MouseEvent<HTMLButtonElement>) => void;

  /**
   * Alert type - danger, info, success or warning.
   * @default info
   */
  status?: Statuses | 'neutral';

  /**
   * Variants of the alert, allowing it to be styled differently based on where its used in the application.
   * - Sidebar: The icon will be aligned to the heading, and the text will appear below the icon.
   * - Full-width: The border will be removed, except for the bottom border.
   */
  variant?: 'sidebar' | 'full-width';
}

const ALERT_ICONS: Record<Statuses | 'neutral', IressIconProps['name']> = {
  danger: 'cancel',
  info: 'info',
  success: 'check_circle',
  warning: 'error',
  neutral: 'info',
};

/**
 * Communicates important information inline with page content, such as validation errors, warnings, or status messages.
 *
 * @example
 * ```tsx
 * import { IressAlert } from '@iress-oss/ids-components';
 *
 * <IressAlert status="success">Changes saved successfully.</IressAlert>
 * ```
 */
export const IressAlert = ({
  actions,
  children,
  className,
  defaultClosed,
  closed: closedProp,
  closeLabel,
  footer,
  heading,
  icon: iconProp,
  multiLine = false,
  onClose,
  status = 'info',
  variant,
  ...restProps
}: IressAlertProps) => {
  const dismissable = !!onClose;
  const hasActions = !!actions?.length;
  const hasFooter = !!footer || hasActions;
  const classes = alert({ hasFooter, multiLine, status, variant });
  const styles = alert.raw({ hasFooter, multiLine, status, variant });
  const [styleProps, nonStyleProps] = splitCssProps(restProps);

  const { value: dismissed, setValue: close } = useControlledState({
    component: 'IressAlert',
    defaultValue: defaultClosed,
    propName: 'closed',
    value: closedProp,
  });

  const icon = useMemo(() => {
    if (iconProp === false) {
      return null;
    }

    const iconName = iconProp ?? ALERT_ICONS[status];

    return (
      <IressIcon
        name={iconName}
        screenreaderText={`${status}: `}
        className={classes.icon}
      />
    );
  }, [classes.icon, iconProp, status]);

  if (dismissed) {
    return null;
  }

  return (
    <IressText
      className={cx(
        className,
        css(styles.alert, styles.alertVars, styleProps),
        GlobalCSSClass.Alert,
      )}
      role={status === 'info' || status === 'neutral' ? 'status' : 'alert'}
      {...nonStyleProps}
    >
      {variant !== 'sidebar' && icon}
      <div className={classes.wrapper}>
        {heading && (
          <div
            className={classes.heading}
            data-testid={propagateTestid(restProps['data-testid'], 'heading')}
          >
            {typeof heading === 'string' ? (
              <IressText element="h2" className={classes.heading}>
                {variant === 'sidebar' && icon} {heading}
              </IressText>
            ) : (
              heading
            )}
          </div>
        )}
        <div className={classes.children}>{children}</div>
        {hasFooter && (
          <div
            className={classes.footer}
            data-testid={propagateTestid(restProps['data-testid'], 'footer')}
          >
            {hasActions && (
              <div className={classes.footerActions}>
                {actions?.map((action, index) => (
                  <IressButton
                    {...action}
                    className={cx(action.className, classes.action)}
                    status={status as IressButtonProps['status']} // Only for feedback components, we allow warning and info statuses to be used for actions, which is not normally allowed for buttons. This is because the alert provides the necessary context to use these statuses appropriately, whereas using them on a standalone button could be confusing. We cast it as never to bypass the type check, but we ensure through documentation and design that this is used correctly.
                    key={index}
                  />
                ))}
              </div>
            )}

            {footer}
          </div>
        )}
      </div>
      {dismissable && (
        <IressCloseButton
          className={classes.dismiss}
          onClick={(e) => {
            onClose?.(e);
            close(true);
          }}
          screenreaderText={closeLabel}
        />
      )}
    </IressText>
  );
};

IressAlert.displayName = 'IressAlert';
