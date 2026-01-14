import { GlobalCSSClass } from '@/enums';
import { IressIcon, type IressIconProps } from '../Icon';
import { chatty, spinner } from './Spinner.styles';
import { cx } from '@/styled-system/css';
import { type IressStyledProps } from '@/types';

type IressSpinnerDefaultProps = Omit<IressIconProps, 'name'> & {
  /**
   * Spin speed of spinner.
   * @default half
   **/
  spin?: IressIconProps['spin'];

  /**
   * Variant of spinner.
   * - 'default': Standard rotating spinner
   **/
  variant?: 'default';
};

type IressSpinnerChattyProps = IressStyledProps<'span'> & {
  /**
   * Variant of spinner.
   * - 'chatty': Animated dots for chatting/typing indicator
   **/
  variant: 'chatty';

  /**
   * Screen reader text for the chatty spinner.
   */
  screenreaderText: string;
};

export type IressSpinnerProps =
  | IressSpinnerDefaultProps
  | IressSpinnerChattyProps;

export const IressSpinner = (props: IressSpinnerProps) => {
  if (props.variant === 'chatty') {
    const { className, screenreaderText, ...restProps } = props;
    const classes = chatty();

    return (
      <span
        className={cx(className, classes.root, GlobalCSSClass.Spinner)}
        aria-label={screenreaderText}
        role="status"
        {...restProps}
      >
        <span className={classes.dot} />
        <span className={classes.dot} />
        <span className={classes.dot} />
      </span>
    );
  }

  const { className, spin = 'half', ...restProps } = props;

  return (
    <IressIcon
      {...restProps}
      className={cx(className, spinner(), GlobalCSSClass.Spinner)}
      name="spinner-third"
      spin={spin}
    />
  );
};

IressSpinner.displayName = 'IressSpinner';
