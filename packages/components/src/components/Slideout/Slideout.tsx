import { cx } from '@/styled-system/css';
import { querySelectorDeep } from 'query-selector-shadow-dom';
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactElement,
  type ReactNode,
  type MutableRefObject,
  useCallback,
  type TransitionEvent,
} from 'react';
import {
  FloatingPortal,
  type OpenChangeReason,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
  useTransitionStatus,
} from '@floating-ui/react';
import { idsLogger } from '@helpers/utility/idsLogger';
import { propagateTestid } from '@helpers/utility/propagateTestid';
import {
  SlideoutInner,
  type SlideoutInnerProps,
} from './components/SlideoutInner';
import { slideout } from './Slideout.styles';
import { useIdIfNeeded } from '../../hooks';
import { IressText } from '../Text';
import { type FloatingUIContainer, type IressStyledProps } from '@/types';
import { usePushElement } from './hooks/usePushElement';
import { splitCssProps } from '@/styled-system/jsx';
import { GlobalCSSClass } from '@/enums';
import { useProviderSlideout } from './hooks/useProviderSlideout';
import { getTransitionDuration } from '@/helpers/transition/getTransitionDuration';

export interface IressSlideoutProps extends IressStyledProps {
  /**
   * Content to be displayed within the slideout.
   */
  children?: ReactNode;

  /**
   * Screenreader text for close button.
   * @default 'Close'
   */
  closeText?: string;

  /**
   * The container element to render the slideout into.
   * By default, the slideout will render at the end of the document body.
   */
  container?: FloatingUIContainer;

  /**
   * When set to `true` the slideout will be visible.
   * Use for uncontrolled slideouts.
   */
  defaultShow?: boolean;

  /**
   * The element that needs to be pushed relative to the slideout. This can be a string selector to match an existing element in the DOM, a html element, or a React reference.
   * Will be ignored if `mode` is not set to `push` or if element does not exist.
   */
  eleToPush?: string | HTMLElement | MutableRefObject<HTMLElement | null>;

  /**
   * Panel to place slideout controls.
   */
  footer?: ReactNode;

  /**
   * Sets the heading for the slideout.
   * If passed an element, it will render the element with an id, to ensure its connection to the slideout.
   */
  heading?: ReactElement | string;

  /**
   * Unique ID for the slideout. Use if you would like to open this slideout from anywhere in your app using the `useSlideout` hook.
   */
  id?: string;

  /**
   * Sets how the Slideout interacts with the content of the page.
   * `overlay` overlays the page content, obscuring the content below.
   * `push` will push the element (specified by `eleToPush`) across the page. `push` will revert back to `overlay` if `eleToPush` is not specified or if the screen size < 1200px.
   * @default 'overlay'
   */
  mode?: 'overlay' | 'push';

  /**
   * Emitted when the slideout has opened or closed internally.
   * Use for controlled slideouts.
   */
  onShowChange?: (show: boolean, reason?: OpenChangeReason) => void;

  /**
   * Emitted when the slideout has mounted, unmounted, opened or closed. Open and close occur before animation begins.
   */
  onStatus?: (status: 'unmounted' | 'initial' | 'open' | 'close') => void;

  /**
   * Emitted when the slideout has opened.
   */
  onEntered?: () => void;

  /**
   * Emitted when the slideout has closed.
   */
  onExited?: () => void;

  /**
   * Position of the slideout relative to the page. `left` or `right`.
   * @default 'right'
   */
  position?: 'right' | 'left';

  /**
   * When set to `true` the slideout will be visible.
   * Use for controlled slideouts.
   */
  show?: boolean;

  /**
   * Accepts a single `SlideoutSize`. Slideouts will display at 100% for mobile screens (<576px).
   * @default 'sm'
   */
  size?: 'sm' | 'md';
}

export const IressSlideout = ({
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
  position = 'right',
  show,
  size = 'sm',
  style,
  ...restProps
}: IressSlideoutProps) => {
  const [uncontrolledShow, setUncontrolledShow] =
    useState<boolean>(defaultShow);
  let duration = 240;
  const pushElement = useRef<HTMLElement | null | undefined>(null);
  const provider = useProviderSlideout(restProps.id);
  const id = useIdIfNeeded({ id: restProps.id });
  const headingId = `${id}--heading`;

  // Don't change to "??" as it will cause bugs with the provider
  // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
  const open = provider.opened || show || uncontrolledShow;

  const onOpenChange = (
    open: boolean,
    _event?: Event,
    reason?: OpenChangeReason,
  ) => {
    provider?.show?.(open);
    setUncontrolledShow(open);
    onShowChange?.(open, reason);
  };

  const { context: floatingContext } = useFloating({
    open,
    onOpenChange,
  });
  const dismiss = useDismiss(floatingContext, {
    enabled: true,
    outsidePress: false,
  });
  const role = useRole(floatingContext);
  const interactions = useInteractions([dismiss, role]);

  if (floatingContext.refs.floating.current) {
    duration = getTransitionDuration(
      floatingContext.refs.floating.current,
      1.2,
      240,
    );
  }

  const { isMounted, status } = useTransitionStatus(floatingContext, {
    duration,
  });

  const currentStyles = slideout({
    position,
    size,
    status: status,
    mode,
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
    const determineElementToPush = (eleToPushValue: typeof eleToPush) => {
      if (typeof eleToPushValue === 'string')
        return querySelectorDeep(eleToPushValue);
      if (eleToPushValue instanceof Element) return eleToPushValue;
      return eleToPushValue?.current;
    };

    if (mode === 'overlay') {
      pushElement.current = null;
    } else {
      pushElement.current = determineElementToPush(eleToPush);
    }

    return () => {
      pushElement.current = null;
    };
  }, [eleToPush, mode]);

  useEffect(() => {
    if (status === 'open') {
      floatingContext.refs.floating?.current?.focus();
    }
  }, [floatingContext.refs.floating, status]);

  const pushElementHookConfig = useMemo(
    () => ({
      // eslint-disable-next-line react-hooks/refs -- we want to forward the ref
      element: pushElement.current ?? null,
      isActive: mode === 'push',
      position,
      size,
      status,
    }),
    [pushElement, mode, position, size, status],
  );

  usePushElement(pushElementHookConfig);

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

    return headingProp;
  }, [dataTestid, headingId, headingProp]);

  if (!isMounted) return null;

  const slideoutClass = cx(
    currentStyles.root,
    className,
    GlobalCSSClass.Slideout,
    status === 'open' && GlobalCSSClass.SlideoutOpen,
  );

  const [styleProps, nonStyleProps] = splitCssProps(restProps);

  const slideoutInnerProps: SlideoutInnerProps = {
    'aria-labelledby': heading ? headingId : undefined,
    children,
    className: slideoutClass,
    closeText,
    'data-testid': dataTestid,
    footer,
    floatingRef: (ref) => floatingContext.refs.setFloating(ref),
    heading,
    id,
    onOpenChange,
    ...(styleProps as IressStyledProps),
    ...interactions.getFloatingProps(nonStyleProps),
    onTransitionEnd: handleTransitionEnd,
  };

  return (
    <FloatingPortal root={container}>
      <SlideoutInner
        {...slideoutInnerProps}
        style={style}
        data-testid={dataTestid}
      />
    </FloatingPortal>
  );
};
