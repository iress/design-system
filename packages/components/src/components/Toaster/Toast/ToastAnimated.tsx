import { useEffect, useState } from 'react';
import classNames from 'classnames';
import styles from './Toast.module.scss';
import { getTransitionDuration } from '@helpers/transition/getTransitionDuration';
import { useFloating, useTransitionStatus } from '@floating-ui/react';
import { type IressToastAnimatedProps } from './Toast.types';
import { IressToast } from './Toast';

export const IressToastAnimated = ({
  animation,
  className,
  onClose,
  onTimeout,
  timeout = 6000,
  ...restProps
}: IressToastAnimatedProps) => {
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
    duration: {
      close: duration,
    },
  });

  useEffect(() => {
    if (!timeout) return;

    setTimeout(() => {
      setOpen(false);
      setTimeout(() => onTimeout?.(), duration);
    }, timeout);
  }, [onTimeout, timeout, duration]);

  useEffect(() => {
    if (status === 'open') floatingContext.refs.floating.current?.focus();
  }, [status, floatingContext.refs.floating]);

  if (!isMounted) return false;

  return (
    <IressToast
      {...restProps}
      className={classNames(
        className,
        styles[status],
        styles[animation ?? 'fade'],
      )}
      onClose={(e) => {
        setOpen(false);
        setTimeout(() => onClose?.(e), duration);
      }}
      ref={(ref) => floatingContext.refs.setFloating(ref)}
    />
  );
};
