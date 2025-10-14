import { useContext, useEffect, useRef } from 'react';
import { IressStack } from '../Stack';
import { FloatingPortal } from '@floating-ui/react';
import { FloatingUIContainer, IressStyledProps } from '@/types';
import { toaster as toasterStyles } from './Toaster.styles';
import { cx } from '@/styled-system/css';
import {
  ToastAnimated,
  ToastAnimatedProps,
} from './components/Toast/ToastAnimated';
import { styled } from '@/styled-system/jsx';
import { GlobalCSSClass } from '@/enums';
import { ToasterContext } from './ToasterProvider';

export interface ToasterItem
  extends Omit<ToastAnimatedProps, 'children' | 'animation'> {
  /**
   * A unique identifier for the toast.
   */
  id: string;
}

export interface ToasterProps extends Omit<IressStyledProps, 'children'> {
  /**
   * The container element to render the toaster into.
   * By default, the toaster will render at the end of the document body.
   */
  container?: FloatingUIContainer;

  /**
   * The position on the screen where the toast will appear.
   * @default bottom-end
   */
  position?:
    | 'bottom-center'
    | 'bottom-end'
    | 'bottom-start'
    | 'top-center'
    | 'top-end'
    | 'top-start';

  /**
   * The toasts that will be displayed in the toaster.
   */
  toasts?: ToasterItem[];
}

const toastAnimationBasedOnToasterPosition: Record<
  Exclude<ToasterProps['position'], undefined>,
  Exclude<ToastAnimatedProps['animation'], undefined>
> = {
  'bottom-end': 'end-x',
  'bottom-start': 'start-x',
  'bottom-center': 'end-y',
  'top-end': 'end-x',
  'top-start': 'start-x',
  'top-center': 'start-y',
};

const toasterAriaAttributes: IressStyledProps = {
  role: 'alert',
  'aria-relevant': 'additions',
  'aria-live': 'assertive',
};

export const Toaster = ({
  className,
  container,
  position = 'bottom-end',
  toasts = [],
  ...restProps
}: ToasterProps) => {
  const context = useContext(ToasterContext);
  const fallbackContainer = useRef<HTMLDivElement | null>(null);
  const classes = toasterStyles({ position });

  useEffect(() => {
    if (!container) {
      return;
    }

    const domContainer =
      container instanceof HTMLElement ? container : container.current;

    Object.entries(toasterAriaAttributes).forEach(([key, value]) => {
      domContainer?.setAttribute(key, String(value));
    });
  }, [container]);

  if (!toasts.length)
    return container ? null : (
      <styled.div ref={fallbackContainer} {...toasterAriaAttributes} />
    );

  return (
    <>
      {!container && (
        <styled.div ref={fallbackContainer} {...toasterAriaAttributes} />
      )}
      <FloatingPortal root={container ?? fallbackContainer}>
        <IressStack
          className={cx(classes.root, className, GlobalCSSClass.Toaster)}
          gap="md"
          {...restProps}
        >
          {toasts.map((toast) => (
            <ToastAnimated
              {...toast}
              animation={toastAnimationBasedOnToasterPosition[position]}
              key={toast.id}
              onClose={(e) => context?.remove(toast.id, e)}
              onTimeout={() => context?.remove(toast.id)}
            />
          ))}
        </IressStack>
      </FloatingPortal>
    </>
  );
};
