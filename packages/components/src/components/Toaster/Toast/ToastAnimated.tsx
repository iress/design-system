import { useEffect, useRef, useState } from 'react';
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
  const durationRef = useRef<number>(240);

  const { context: floatingContext } = useFloating({
    open,
    onOpenChange: setOpen,
  });
  const { isMounted, status } = useTransitionStatus(floatingContext, {
    duration: {
      close: durationRef.current,
    },
  });

  useEffect(() => {
    if (!timeout) return;

    setTimeout(() => {
      setOpen(false);
      setTimeout(() => onTimeout?.(), durationRef.current);
    }, timeout);
  }, [onTimeout, timeout]);

  useEffect(() => {
    if (status === 'initial')
      durationRef.current = getTransitionDuration(
        floatingContext.refs.floating.current,
      );

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
        setTimeout(() => onClose?.(e), durationRef.current);
      }}
      ref={(ref) => floatingContext.refs.setFloating(ref)}
    />
  );
};
