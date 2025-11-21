import { type CSSProperties, useEffect, useRef } from 'react';
import { type IressSlideoutProps } from '../Slideout';
import { GlobalCSSClass } from '@/enums';
import { token } from '@/styled-system/tokens';
import { useBreakpoint } from '@/hooks';

type PushElementStyleProperties = Pick<
  CSSProperties,
  'marginInlineStart' | 'marginInlineEnd' | 'transition'
>;

// TODO: Fix WAF-863 with this new hook, so that the push element remains open when closing a slideout and opening another one
export function usePushElement({
  element,
  isActive,
  position,
  size,
  status,
  onOpen,
  onClose,
}: {
  element: HTMLElement | null;
  isActive: boolean;
  position: IressSlideoutProps['position'];
  size: IressSlideoutProps['size'];
  status: 'initial' | 'open' | 'close' | 'unmounted';
  onOpen?: () => void;
  onClose?: () => void;
}) {
  const originalState = useRef<{
    classNames: string[];
    style: PushElementStyleProperties;
  } | null>(null);
  const { breakpoint } = useBreakpoint();

  useEffect(() => {
    if (!element) return;

    if (!originalState.current) {
      const marginProperty =
        position === 'left' ? 'marginInlineStart' : 'marginInlineEnd';

      originalState.current = {
        classNames: [...element.classList],
        style: {
          [marginProperty]: element.style[marginProperty],
          transition: element.style.transition,
        },
      };
    }

    const motionReduce = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    element.classList.add(GlobalCSSClass.SlideoutPushElement);
    // eslint-disable-next-line react-hooks/immutability -- we are intentionally modifying style here
    element.style.transition = motionReduce ? 'none' : 'all 0.3s ease-out';

    return () => {
      if (element) {
        if (originalState.current) {
          element.className = originalState.current.classNames.join(' ');

          if (originalState.current.style) {
            for (const prop in originalState.current.style) {
              const cssProp = prop as keyof PushElementStyleProperties;
              element.style.setProperty(
                prop,
                String(originalState.current.style[cssProp] ?? ''),
              );
            }
          }
        }
      }
    };
  }, [element, position]);

  useEffect(() => {
    if (!element || !isActive) return;

    const marginProperty =
      position === 'left' ? 'marginInlineStart' : 'marginInlineEnd';
    const sizeToken = size === 'md' ? 'sizes.overlay.md' : 'sizes.overlay.sm';
    const allowedBreakpoints = ['xl', 'xxl'];

    if (status === 'open') {
      onOpen?.();
      element.classList.add(GlobalCSSClass.SlideoutOpen);

      if (allowedBreakpoints.includes(breakpoint)) {
        // eslint-disable-next-line react-hooks/immutability -- we are intentionally modifying style here
        element.style[marginProperty] = token
          .var(sizeToken)
          .replace(')', `, ${token(sizeToken)})`);
      } else {
        element.style[marginProperty] = 'initial';
      }
    } else if (status === 'close') {
      onClose?.();
      element.classList.remove(GlobalCSSClass.SlideoutOpen);
      element.style[marginProperty] = 'initial';
    }

    return () => {
      if (element && status === 'unmounted') {
        onClose?.();
      }
    };
  }, [element, isActive, position, size, status, onOpen, onClose, breakpoint]);
}
