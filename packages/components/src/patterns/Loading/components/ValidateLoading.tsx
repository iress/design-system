import { IressButton, type IressButtonProps } from '@/components/Button';
import classNames from 'classnames';
import { type ReactNode, useEffect, useState } from 'react';
import { IressText } from '@/components/Text';
import styles from './ValidateLoading.module.scss';
import loadingStyles from '../Loading.module.scss';
import { type IressHTMLAttributes } from '@/interfaces';

export interface ValidateLoadingProps extends IressHTMLAttributes {
  /**
   * When true, button is in loading state. If provided a string, will be used as the loading text for screen readers.
   */
  loading?: IressButtonProps['loading'];

  /**
   * Set the message to be displayed when the button is in the loading state.
   * @default 'This is taking longer than expected...'
   */
  message?: ReactNode;

  /**
   * Use `pattern="validate"` for the following use cases:
   * - Submitting a form
   * - Saving a record
   */
  pattern?: 'validate';

  /**
   * This sets where the loading message will be displayed.
   * - `bottom` - The loading message will be displayed below the button. It will be absolute positioned.
   * - `top` - The loading message will be displayed above the button. It will be absolute positioned.
   * - `right` - The loading message will be displayed to the right of the button. It will be inline positioned.
   */
  position?: 'bottom' | 'top' | 'right';

  /**
   * This is a render prop that allows you to override the default button rendering.
   * This is useful if you want to use a different button component or if you want to add additional props to the button.
   */
  renderButton?: (
    props: Pick<IressButtonProps, 'className' | 'loading'>,
  ) => ReactNode;

  /**
   * The time in milliseconds before the loading message is displayed.
   * @default 2500
   */
  timeout?: number;
}

export const ValidateLoading = ({
  children,
  className,
  loading = false,
  message = 'This is taking longer than expected...',
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- Pattern is not used
  pattern = 'validate',
  position = 'bottom',
  renderButton = (props: Pick<IressButtonProps, 'className' | 'loading'>) => (
    <IressButton {...props} type="submit">
      Submit
    </IressButton>
  ),
  timeout = 2500,
  ...restProps
}: ValidateLoadingProps) => {
  const [showMessage, setShowMessage] = useState(timeout === 0 && loading);

  useEffect(() => {
    if (!loading) {
      setShowMessage(false);
      return;
    }

    const timer = setTimeout(() => {
      setShowMessage(true);
    }, timeout);

    return () => clearTimeout(timer);
  }, [loading, timeout]);

  if (!showMessage) return renderButton({ loading, className: styles.loading });

  return (
    <div
      className={classNames(styles.root, className, {
        [styles.loading]: loading,
        [styles[position]]: !!position,
      })}
      {...restProps}
    >
      {renderButton({ loading })}
      {children}
      <IressText
        className={classNames(styles.message, loadingStyles['fade-next'], {
          [loadingStyles['fade-next-width']]: position === 'right',
        })}
        mode="muted"
      >
        {message}
      </IressText>
    </div>
  );
};
