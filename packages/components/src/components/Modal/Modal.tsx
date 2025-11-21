import {
  type ReactElement,
  type ReactNode,
  useEffect,
  useMemo,
  useState,
  type TransitionEvent,
} from 'react';
import { IressCloseButton } from '../Button';
import {
  FloatingFocusManager,
  FloatingOverlay,
  FloatingPortal,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
  useTransitionStatus,
} from '@floating-ui/react';
import { idsLogger } from '@helpers/utility/idsLogger';
import { propagateTestid } from '@helpers/utility/propagateTestid';
import { useIdIfNeeded } from '../../hooks';
import { IressText, text } from '../Text';
import { useProviderModal } from './hooks/useProviderModal';
import { type FloatingUIContainer, type IressStyledProps } from '@/types';
import { modal } from './Modal.styles';
import { cx } from '@/styled-system/css';
import { splitCssProps, styled } from '@/styled-system/jsx';
import { GlobalCSSClass } from '@/enums';
import { getTransitionDuration } from '@/helpers/transition/getTransitionDuration';

export interface IressModalProps extends IressStyledProps {
  /**
   * Text to be displayed inside the modal.
   */
  children?: ReactNode;

  /**
   * Screenreader text for close button.
   * @default Close
   */
  closeText?: string;

  /**
   * The container element to render the modal into.
   * By default, the modal will render at the end of the document body.
   */
  container?: FloatingUIContainer;

  /**
   * When set to `true` the modal will be visible by default. Use for uncontrolled modals.
   */
  defaultShow?: boolean;

  /**
   * When set to `true`, users cannot exit the modal by clicking the backdrop or using the escape key.
   */
  disableBackdropClick?: boolean;

  /**
   * When set to `true` the modal's footer will always be visible and fixed to the bottom of the modal.
   */
  fixedFooter?: boolean;

  /**
   * Panel to place modal controls.
   */
  footer?: ReactNode;

  /**
   * Sets the heading for the modal.
   * If passed an element, it will render the element with an id, to ensure its connection to the modal.
   */
  heading?: ReactElement | string;

  /**
   * Unique ID for the modal. Use if you would like to open this modal from anywhere in your app using the `useModal` hook.
   */
  id?: string;

  /**
   * When set to `true`, no close button will be rendered. You must add your own closing mechanism to ensure accessibility.
   */
  noCloseButton?: boolean;

  /**
   * Emitted when the modal has opened or closed internally. Use for controlled modals.
   */
  onShowChange?: (show: boolean) => void;

  /**
   * Emitted when the modal has mounted, unmounted, opened or closed. Open and close occur before animation begins.
   */
  onStatus?: (status: 'unmounted' | 'initial' | 'open' | 'close') => void;

  /**
   * Emitted when the modal has opened.
   */
  onEntered?: () => void;

  /**
   * Emitted when the modal has closed.
   */
  onExited?: () => void;

  /**
   * When set to `true` the modal will be visible. Use for controlled modals.
   */
  show?: boolean;

  /**
   * When set to `true`, the modal will act like a static element when open.
   * This means it will not lock scroll or focus within the modal.
   * Note: This is used internally to display modals in Styler. It is not recommended to use this prop in your own applications.
   */
  static?: boolean;
}

export const IressModal = ({
  children,
  className,
  closeText,
  container,
  'data-testid': dataTestid,
  defaultShow = false,
  disableBackdropClick,
  fixedFooter,
  footer,
  heading: headingProp,
  noCloseButton,
  onEntered,
  onExited,
  onShowChange,
  onStatus,
  onTransitionEnd,
  show,
  static: isStatic,
  style,
  ...restProps
}: IressModalProps) => {
  const [uncontrolledShow, setUncontrolledShow] =
    useState<boolean>(defaultShow);
  let duration = 240;
  const provider = useProviderModal(restProps.id);
  const id = useIdIfNeeded({ id: restProps.id });
  const headingId = `${id}--heading`;

  // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
  const open = provider.opened || show || uncontrolledShow;

  const onOpenChange = (open: boolean) => {
    provider.show(open);
    setUncontrolledShow(open);
    onShowChange?.(open);
  };

  const { context: floatingContext } = useFloating({
    open,
    onOpenChange,
  });
  const dismiss = useDismiss(floatingContext, {
    enabled: !disableBackdropClick,
    outsidePress: (e) => {
      const target = e.target as HTMLElement;
      return !target.closest(`.${GlobalCSSClass.Toaster}`);
    },
    outsidePressEvent: 'mousedown',
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
    duration: {
      close: duration,
    },
  });

  const styles = modal({
    fixedFooter,
    static: isStatic,
    status,
  });
  const [styleProps, nonStyleProps] = splitCssProps(restProps);
  const { p = 'lg', width = 'overlay.md', ...restStyleProps } = styleProps;

  useEffect(() => {
    if (provider.opened && show) {
      idsLogger(
        'IressModal: Please use either IressModalProvider for uncontrolled components, or the show prop for controlled components, rather than both. If you use both, the open state of the modal will become unpredictable. If you want to show a modal by default in uncontrolled mode, use the defaultShow prop.',
      );
    }
  }, [provider.opened, show]);

  useEffect(() => {
    onStatus?.(status);
  }, [status, onStatus]);

  const heading = useMemo(() => {
    if (typeof headingProp === 'string')
      return (
        <IressText
          className={styles.header}
          id={headingId}
          element="h2"
          data-testid={propagateTestid(dataTestid, 'heading')}
        >
          {headingProp}
        </IressText>
      );

    return headingProp;
  }, [dataTestid, headingId, headingProp, styles.header]);

  const handleTransitionEnd = (e: TransitionEvent<HTMLDivElement>) => {
    onTransitionEnd?.(e);

    // TODO: Tests are not filling in the property name, so we need to check for an empty one instead
    const isFade = e.propertyName === 'opacity' || !e.propertyName;

    if (!isFade || e.target !== e.currentTarget) {
      return;
    }

    if (status === 'open') {
      onEntered?.();

      if (!isStatic) {
        floatingContext.refs.floating?.current?.focus();
      }
    } else if (status === 'close') {
      onExited?.();
    }
  };

  if (!isMounted) return null;

  const innerModal = (
    <FloatingOverlay
      className={cx(className, styles.backdrop, GlobalCSSClass.ModalBackdrop)}
      data-testid={propagateTestid(dataTestid, 'backdrop')}
      lockScroll={!isStatic}
      style={style}
    >
      <FloatingFocusManager
        context={floatingContext}
        initialFocus={floatingContext.refs.floating}
        disabled={isStatic}
      >
        <styled.div
          ref={(ref) => floatingContext.refs.setFloating(ref)}
          className={cx(styles.modal, text(), GlobalCSSClass.Modal)}
          id={id}
          data-testid={dataTestid}
          aria-labelledby={heading ? headingId : undefined}
          {...interactions.getFloatingProps(nonStyleProps)}
          {...restStyleProps}
          w={width}
          onTransitionEnd={handleTransitionEnd}
        >
          {!noCloseButton && (
            <IressCloseButton
              onClick={() => onOpenChange(false)}
              screenreaderText={closeText}
              className={styles.closeButton}
              data-testid={propagateTestid(dataTestid, 'close-button__button')}
            />
          )}
          <styled.div
            className={styles.content}
            data-testid={propagateTestid(dataTestid, 'content')}
            p={p}
          >
            {heading}
            {children}
          </styled.div>
          {footer && (
            <styled.div
              className={styles.footer}
              data-testid={propagateTestid(dataTestid, 'footer')}
              p={p}
            >
              {footer}
            </styled.div>
          )}
        </styled.div>
      </FloatingFocusManager>
    </FloatingOverlay>
  );

  const portalRoot = container ?? provider?.container;

  if (isStatic && !portalRoot) {
    return innerModal;
  }

  return (
    <FloatingPortal root={container ?? provider?.container}>
      {innerModal}
    </FloatingPortal>
  );
};
