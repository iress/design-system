import classNames from 'classnames';
import {
  type IressSlideoutProps,
  type SlideoutInnerProps,
  SlideoutMode,
  SlideoutPosition,
  SlideoutSize,
  type SlideoutWithEnums,
} from './Slideout.types';
import { querySelectorDeep } from 'query-selector-shadow-dom';
import {
  cloneElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type TransitionEvent,
} from 'react';
import {
  FloatingFocusManager,
  FloatingOverlay,
  FloatingPortal,
  type OpenChangeReason,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
  useTransitionStatus,
} from '@floating-ui/react';
import { timeStringToNumber } from '@helpers/transition/timeStringToNumber';
import { GlobalCSSClass, PaddingSize } from '@/enums';
import { idsLogger } from '@helpers/utility/idsLogger';
import { propagateTestid } from '@helpers/utility/propagateTestid';
import { SlideoutInner } from './components/SlideoutInner';

import styles from './Slideout.module.scss';
import pushElementStyles from './SlideoutPushElement.module.scss';
import { useIdIfNeeded } from '../../hooks';
import { IressText } from '../Text';
import { useIDSProvidedSlideout } from './hooks/useIDSProvidedSlideout';

export const IressSlideout: SlideoutWithEnums = ({
  backdrop,
  children,
  className,
  closeText = 'Close',
  container,
  'data-testid': dataTestid,
  defaultShow = false,
  eleToPush,
  footer,
  heading: headingProp,
  mode = 'overlay',
  onEntered,
  onExited,
  onShowChange,
  onStatus,
  onTransitionEnd,
  padding = 'md',
  position = 'right',
  show,
  size = 'sm',
  style,
  ...restProps
}: IressSlideoutProps) => {
  const [uncontrolledShow, setUncontrolledShow] =
    useState<boolean>(defaultShow);
  const durationRef = useRef<number>(240);
  const pushElement = useRef<HTMLElement | null | undefined>(null);
  const provider = useIDSProvidedSlideout(restProps.id);
  const id = useIdIfNeeded({ id: restProps.id });
  const headingId = `${id}--heading`;

  // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
  const open = provider.opened || show || uncontrolledShow;

  const onOpenChange = (
    open: boolean,
    _event?: Event,
    reason?: OpenChangeReason,
  ) => {
    provider.show(open);
    setUncontrolledShow(open);
    onShowChange?.(open, reason);
  };

  const { context: floatingContext } = useFloating({
    open,
    onOpenChange,
  });
  const dismiss = useDismiss(floatingContext, {
    enabled: true,
    outsidePress: backdrop === true,
  });
  const role = useRole(floatingContext, {
    enabled: backdrop === true,
  });
  const interactions = useInteractions([dismiss, role]);
  const { isMounted, status } = useTransitionStatus(floatingContext, {
    duration: durationRef.current,
  });

  useEffect(() => {
    if (provider.opened && show) {
      idsLogger(
        'IressSlideout: Please use either IressSlideoutProvider for uncontrolled components, or the show prop for controlled components, rather than both. If you use both, the open state of the slideout will become unpredictable. If you want to show a slideout by default in uncontrolled mode, use the defaultShow prop.',
      );
    }
  }, [provider.opened, show]);

  useEffect(() => {
    onStatus?.(status);
  }, [status, onStatus]);

  useEffect(() => {
    if (mode === 'overlay') {
      pushElement.current = null;
    } else {
      let element: HTMLElement | null | undefined;

      if (typeof eleToPush === 'string') element = querySelectorDeep(eleToPush);
      else if (eleToPush instanceof Element) element = eleToPush;
      else element = eleToPush?.current;

      pushElement.current = element;
    }

    return () => {
      pushElement.current = null;
    };
  }, [eleToPush, mode]);

  useEffect(() => {
    if (status === 'initial') {
      pushElement?.current?.classList.add(
        pushElementStyles.slideoutPushElement,
        pushElementStyles[position],
        pushElementStyles[`size--${size}`],
      );

      if (floatingContext.refs.floating?.current) {
        durationRef.current =
          timeStringToNumber(
            window
              .getComputedStyle(floatingContext.refs.floating.current, null)
              ?.getPropertyValue('--iress-transition-duration') || '.3s',
          ) * 1.2;
      }
    }
  }, [floatingContext.refs.floating, position, size, status]);

  useEffect(() => {
    if (status === 'open') {
      floatingContext.refs.floating?.current?.focus();
      pushElement?.current?.classList.add(pushElementStyles.open);
    }
  }, [floatingContext.refs.floating, onEntered, status]);

  useEffect(() => {
    if (status === 'close') {
      pushElement?.current?.classList.remove(pushElementStyles.open);
    }
  }, [onExited, status]);

  useEffect(() => {
    if (
      status === 'unmounted' &&
      !pushElement?.current?.classList.contains(pushElementStyles.open)
    ) {
      pushElement?.current?.classList.remove(
        pushElementStyles.slideoutPushElement,
        pushElementStyles[position],
        pushElementStyles[`size--${size}`],
      );
    }
  }, [position, size, status]);

  useEffect(() => {
    if (status === 'open' && pushElement?.current) {
      pushElement.current.classList.remove(
        pushElementStyles['size--sm'],
        pushElementStyles['size--md'],
        pushElementStyles['size--lg'],
      );
      pushElement.current.classList.add(pushElementStyles[`size--${size}`]);
    }
  }, [size, status, pushElement]);

  const handleTransitionEnd = useCallback(
    (e: TransitionEvent<HTMLDivElement>) => {
      onTransitionEnd?.(e);
      const property = position === 'right' ? 'right' : 'left';

      // TODO: Tests are not filling in the property name, so we need to check for an empty one instead
      const isSlide =
        e.propertyName === property ||
        e.propertyName === 'opacity' ||
        !e.propertyName;

      if (!isSlide || e.target !== e.currentTarget) {
        return;
      }

      if (status === 'open') {
        onEntered?.();
      } else if (status === 'close') {
        onExited?.();
      }
    },
    [onTransitionEnd, position, status, onEntered, onExited],
  );

  const heading = useMemo(() => {
    if (typeof headingProp === 'string')
      return (
        <IressText
          id={headingId}
          data-testid={propagateTestid(dataTestid, 'heading')}
          element="h2"
        >
          {headingProp}
        </IressText>
      );

    return headingProp
      ? cloneElement(headingProp, {
          id: headingId,
        })
      : null;
  }, [dataTestid, headingId, headingProp]);

  if (!isMounted) return null;

  const slideoutInnerProps: SlideoutInnerProps = {
    'aria-labelledby': heading ? headingId : undefined,
    children,
    className: classNames(
      styles.slideout,
      styles[status],
      styles[position],
      styles[`size--${size}`],
      GlobalCSSClass.IgnoreStack,
      {
        [styles.push]: mode === 'push' && pushElement.current,
        [`${className}`]: className && !backdrop,
      },
    ),
    closeText,
    'data-testid': dataTestid,
    footer,
    floatingRef: (ref) => floatingContext.refs.setFloating(ref),
    heading,
    id,
    onOpenChange,
    padding,
    ...interactions.getFloatingProps(restProps),
    onTransitionEnd: handleTransitionEnd,
  };

  if (backdrop) {
    const overlayStyles: Record<string, unknown> = {
      position: 'var(--iress-position, fixed)',
      ...style,
    };

    return (
      <FloatingPortal root={container ?? provider?.container}>
        <FloatingOverlay
          className={classNames(
            className,
            styles.backdrop,
            styles[status],
            GlobalCSSClass.IgnoreStack,
          )}
          data-testid={propagateTestid(dataTestid, 'backdrop')}
          lockScroll
          style={overlayStyles}
        >
          <FloatingFocusManager
            context={floatingContext}
            initialFocus={floatingContext.refs.floating}
          >
            <SlideoutInner {...slideoutInnerProps} data-testid={dataTestid} />
          </FloatingFocusManager>
        </FloatingOverlay>
      </FloatingPortal>
    );
  }

  return (
    <FloatingPortal root={container ?? provider?.container}>
      <SlideoutInner
        {...slideoutInnerProps}
        style={style}
        data-testid={dataTestid}
      />
    </FloatingPortal>
  );
};

/** @deprecated IressSlideout.Mode will be removed in future versions of IDS. Please use the value directly. */
IressSlideout.Mode = SlideoutMode;

/** @deprecated IressSlideout.Padding will be removed in future versions of IDS. Please use the value directly. */
IressSlideout.Padding = PaddingSize;

/** @deprecated IressSlideout.Position will be removed in future versions of IDS. Please use the value directly. */
IressSlideout.Position = SlideoutPosition;

/** @deprecated IressSlideout.Size will be removed in future versions of IDS. Please use the value directly. */
IressSlideout.Size = SlideoutSize;
