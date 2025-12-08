import { IressIcon, type IressIconProps } from '../Icon';
import { IressText, type IressTextProps } from '../Text';
import { propagateTestid } from '@helpers/utility/propagateTestid';
import { alert } from './Alert.styles';
import { cx } from '@/styled-system/css';
import { type ReactNode, useMemo } from 'react';
import { type SystemValidationStatuses } from '@/types';
import { GlobalCSSClass } from '@/enums';
import {
  IressButton,
  type IressButtonProps,
  IressCloseButton,
  type IressCloseButtonProps,
} from '../Button';
import { IressInline } from '../Inline';
import { useControlledState } from '@/hooks';

export interface IressAlertProps extends Omit<IressTextProps, 'element'> {
  /**
   * Actions to display in the alert. These will be rendered as buttons with opinionated styling.
   * If you want to use custom buttons, use the `footer` prop instead.
   **/
  actions?: Omit<IressButtonProps, 'mode' | 'status'>[];

  /**
   * Contents of the alert. Is automatically wrapped in `<IressText />` and will inherit its styling.
   **/
  children?: ReactNode;

  /**
   * Contents of the alert. Is automatically wrapped in `<IressText />` and will inherit its styling.
   **/
  defaultDismissed?: boolean;

  /**
   * Contents of the alert. Is automatically wrapped in `<IressText />` and will inherit its styling.
   **/
  dismissed?: boolean;

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
   * Icon to display in the alert.
   * If set to `false`, no icon will be displayed.
   * If not provided, the icon will be determined by the `status` prop.
   **/
  onDismiss?: IressCloseButtonProps['onClick'];

  /**
   * Alert type - danger, info, success or warning.
   * @default info
   */
  status?: SystemValidationStatuses;

  /**
   * Variants of the alert, allowing it to be styled differently based on where its used in the application.
   * - Sidebar: The icon will be aligned to the heading, and the text will appear below the icon.
   * - Site-wide: The border will be removed, except for the bottom border.
   */
  variant?: 'sidebar' | 'site-wide';
}

const ALERT_ICONS: Record<SystemValidationStatuses, IressIconProps['name']> = {
  danger: 'ban',
  info: 'info-square',
  success: 'check',
  warning: 'exclamation-triangle',
};

export const IressAlert = ({
  actions,
  children,
  className,
  defaultDismissed,
  dismissed: dismissedProp,
  footer,
  heading,
  icon: iconProp,
  onDismiss,
  status = 'info',
  variant,
  ...restProps
}: IressAlertProps) => {
  const dismissable = !!onDismiss;
  const classes = alert({ status, variant });
  const hasActions = !!actions?.length;
  const hasFooter = !!footer || hasActions;

  const { value: dismissed, setValue: dismiss } = useControlledState({
    component: 'IressAlert',
    defaultValue: defaultDismissed,
    propName: 'dismissed',
    value: dismissedProp,
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
        fixedWidth
        className={classes.icon}
      />
    );
  }, [classes.icon, iconProp, status]);

  if (dismissed) {
    return null;
  }

  return (
    <IressText
      className={cx(className, classes.alert, GlobalCSSClass.Alert)}
      {...restProps}
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
              <IressInline gap="sm" pb="spacing.1">
                {actions?.map((action, index) => (
                  <IressButton
                    {...action}
                    className={cx(action.className, classes.action)}
                    color={`colour.system.${status}.text`}
                    key={index}
                  />
                ))}
              </IressInline>
            )}

            {footer}
          </div>
        )}
      </div>
      {dismissable && (
        <IressCloseButton
          className={classes.dismiss}
          onClick={(e) => {
            onDismiss?.(e);
            dismiss(true);
          }}
        />
      )}
    </IressText>
  );
};
