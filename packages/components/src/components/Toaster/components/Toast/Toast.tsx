import { type ReactNode, useEffect, useState } from 'react';
import { getTransitionDuration } from '@helpers/transition/getTransitionDuration';
import { useFloating, useTransitionStatus } from '@floating-ui/react';
import { toast as toastStyles } from './Toast.styles';
import { cx } from '@/styled-system/css';
import { IressAlert, type IressAlertProps } from '@/components/Alert';
import { GlobalCSSClass } from '@/enums';

export interface ToastProps extends Omit<
  IressAlertProps,
  'children' | 'content' | 'multiLine' | 'variant'
> {
  /**
   * The animation of the toast. If not provided, it will simply fade in and out.
   */
  animation?: 'start-x' | 'end-x' | 'start-y' | 'end-y';

  /**
   * Contents of the toast.
   */
  content?: ReactNode;

  /**
   * Called when the element timed out.
   */
  onTimeout?: () => void;

  /**
   * The amount of time, in milliseconds, the toast is displayed on screen without
   * the users interaction. Will fall back to timeout prop on parent toaster and then
   * the default time of 6000ms. If set to 0, the toast will not auto dismiss.
   * @default 6000
   */
  timeout?: number;
}

export const Toast = ({
  animation,
  className,
  content,
  onClose,
  onTimeout,
  timeout = 6000,
  ...restProps
}: ToastProps) => {
  const [open, setOpen] = useState<boolean>(true);
  let duration = 240;

  const { context: floatingContext } = useFloating({
    open,
    onOpenChange: setOpen,
  });

  if (floatingContext.refs.floating.current) {
    duration = getTransitionDuration(floatingContext.refs.floating.current);
  }

  const { isMounted, status } = useTransitionStatus(floatingContext, {
    duration,
  });

  useEffect(() => {
    if (!timeout) return;

    setTimeout(() => {
      setOpen(false);
      setTimeout(() => onTimeout?.(), duration);
    }, timeout);
  }, [duration, onTimeout, timeout]);

  useEffect(() => {
    if (status === 'open') {
      floatingContext.refs.floating.current?.focus();
    }
  }, [status, floatingContext.refs.floating]);

  if (!isMounted) return false;

  const mappedStatus = status === 'close' ? 'closed' : status;

  const classes = toastStyles({
    animation: animation ?? 'fade',
    transitionState: mappedStatus,
  });

  return (
    <div
      ref={(ref) =>
        floatingContext.refs.setFloating(ref?.firstChild as HTMLElement)
      }
    >
      <IressAlert
        {...restProps}
        className={cx(className, classes, GlobalCSSClass.Toast)}
        multiLine
        data-state={mappedStatus}
        closed={false}
        onClose={(e) => {
          setOpen(false);
          setTimeout(() => onClose?.(e), duration);
        }}
        mb="none"
      >
        {content}
      </IressAlert>
    </div>
  );
};

Toast.displayName = 'Toast';
