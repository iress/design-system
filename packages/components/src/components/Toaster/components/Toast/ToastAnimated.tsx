import { useEffect, useState } from 'react';
import { getTransitionDuration } from '@helpers/transition/getTransitionDuration';
import { useFloating, useTransitionStatus } from '@floating-ui/react';
import { toast as toastStyles } from './Toast.styles';
import { cx } from '@/styled-system/css';
import { Toast, type ToastProps } from './Toast';

export interface ToastAnimatedProps extends ToastProps {
  /**
   * The animation of the toast. If not provided, it will simply fade in and out.
   */
  animation?: 'start-x' | 'end-x' | 'start-y' | 'end-y';

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

export const ToastAnimated = ({
  animation,
  className,
  onClose,
  onTimeout,
  timeout = 6000,
  ...restProps
}: ToastAnimatedProps) => {
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
    <Toast
      {...restProps}
      className={cx(className, classes.root)}
      data-state={mappedStatus}
      onClose={(e) => {
        setOpen(false);
        setTimeout(() => onClose?.(e), duration);
      }}
      ref={(ref) => floatingContext.refs.setFloating(ref)}
    />
  );
};
