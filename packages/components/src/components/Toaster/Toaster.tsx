import {
  type IressToasterProps,
  TOAST_POSITION_ANIMATION_MATRIX,
  TOASTER_ARIA_ATTRIBUTES,
} from './Toaster.types';
import classNames from 'classnames';
import styles from './Toaster.module.scss';
import { GlobalCSSClass } from '@/enums';
import { IressStack } from '../Stack';
import { FloatingPortal } from '@floating-ui/react';
import { IressToastAnimated } from './Toast/ToastAnimated';
import { useContext, useEffect, useRef } from 'react';
import { ToasterContext } from './ToasterProvider';

export const IressToaster = ({
  container,
  position = 'bottom-end',
  toasts = [],
}: IressToasterProps) => {
  const toaster = useContext(ToasterContext);
  const fallbackContainer = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!container) {
      return;
    }

    const domContainer =
      container instanceof HTMLElement ? container : container.current;

    Object.entries(TOASTER_ARIA_ATTRIBUTES).forEach(([key, value]) => {
      domContainer?.setAttribute(key, String(value));
    });
  }, [container]);

  if (!toasts.length)
    return container ? null : (
      <div ref={fallbackContainer} {...TOASTER_ARIA_ATTRIBUTES} />
    );

  return (
    <>
      {!container && (
        <div ref={fallbackContainer} {...TOASTER_ARIA_ATTRIBUTES} />
      )}
      <FloatingPortal root={container ?? fallbackContainer}>
        <IressStack
          className={classNames(
            GlobalCSSClass.IgnoreStack,
            styles.toaster,
            styles[`toaster__${position}`],
          )}
          gutter="md"
        >
          {toasts.map((toast) => (
            <IressToastAnimated
              {...toast}
              animation={TOAST_POSITION_ANIMATION_MATRIX[position]}
              key={toast.id}
              onClose={(e) => {
                toaster?.close(toast.id, e);
              }}
              onTimeout={() => toaster?.close(toast.id)}
              timeout={toast.timeout}
            />
          ))}
        </IressStack>
      </FloatingPortal>
    </>
  );
};
