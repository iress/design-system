import classNames from 'classnames';
import { type IressModalProps, type ModalWithEnums } from './Modal.types';
import styles from './Modal.module.scss';
import {
  cloneElement,
  type TransitionEvent,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { GlobalCSSClass, ModalSize, PaddingSize } from '@/enums';
import { getResponsiveLayoutModifiers } from '@helpers/responsive/getResponsiveLayoutModifiers';
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
import { IressText } from '../Text';
import { useIDSProvidedModal } from './hooks/useIDSProvidedModal';
import toasterStyles from '../Toaster/Toaster.module.scss';
import { getTransitionDuration } from '@/helpers/transition/getTransitionDuration';

export const IressModal: ModalWithEnums = ({
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
  padding = 'md',
  show,
  size = 'md',
  static: isStatic,
  style,
  ...restProps
}: IressModalProps) => {
  const [uncontrolledShow, setUncontrolledShow] =
    useState<boolean>(defaultShow);
  let duration = 240;
  const provider = useIDSProvidedModal(restProps.id);
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
      return !target.closest(`.${toasterStyles.toaster}`);
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

  const sizeClasses = getResponsiveLayoutModifiers(
    'size',
    size,
    'fullpage',
  ).map((sizeClass) => styles[sizeClass]);
  const paddingClass = `iress-p--${padding}`;

  const classes = classNames(styles.modal, styles[status], {
    [styles.fixedFooter]: fixedFooter,
  });

  const heading = useMemo(() => {
    if (typeof headingProp === 'string')
      return (
        <IressText
          id={headingId}
          element="h2"
          data-testid={propagateTestid(dataTestid, 'heading')}
        >
          {headingProp}
        </IressText>
      );

    return headingProp
      ? cloneElement(headingProp, {
          id: headingId,
        } as never)
      : null;
  }, [dataTestid, headingId, headingProp]);

  const handleTransitionEnd = (e: TransitionEvent<HTMLDivElement>) => {
    onTransitionEnd?.(e);

    // TODO: Tests are not filling in the property name, so we need to check for an empty one instead
    const isFade = e.propertyName === 'opacity' || !e.propertyName;

    if (!isFade || e.target !== e.currentTarget) {
      return;
    }

    if (status === 'open') {
      onEntered?.();
      floatingContext.refs.floating?.current?.focus();
    } else if (status === 'close') {
      onExited?.();
    }
  };

  if (!isMounted) return null;

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
          sizeClasses,
          GlobalCSSClass.IgnoreStack,
          {
            [styles.static]: isStatic,
          },
        )}
        data-testid={propagateTestid(dataTestid, 'backdrop')}
        lockScroll={!isStatic}
        style={overlayStyles}
      >
        <FloatingFocusManager
          context={floatingContext}
          initialFocus={floatingContext.refs.floating}
          disabled={isStatic}
        >
          <div
            ref={(ref) => floatingContext.refs.setFloating(ref)}
            className={classes}
            id={id}
            data-testid={dataTestid}
            aria-labelledby={heading ? headingId : undefined}
            {...interactions.getFloatingProps(restProps)}
            onTransitionEnd={handleTransitionEnd}
          >
            {!noCloseButton && (
              <IressCloseButton
                onClick={() => onOpenChange(false)}
                screenreaderText={closeText}
                className={styles.closeButton}
                data-testid={propagateTestid(
                  dataTestid,
                  'close-button__button',
                )}
              />
            )}
            <div
              className={classNames(styles.content, paddingClass)}
              data-testid={propagateTestid(dataTestid, 'content')}
            >
              {heading}
              {children}
            </div>
            {footer && (
              <div
                className={classNames(styles.footer, paddingClass)}
                data-testid={propagateTestid(dataTestid, 'footer')}
              >
                {footer}
              </div>
            )}
          </div>
        </FloatingFocusManager>
      </FloatingOverlay>
    </FloatingPortal>
  );
};

/** @deprecated IressModal.Size enum is now deprecated and will be removed in a future version. Please use the value directly instead. **/
IressModal.Size = ModalSize;

/** @deprecated IressModal.Padding enum is now deprecated and will be removed in a future version. Please use the value directly instead. **/
IressModal.Padding = PaddingSize;
