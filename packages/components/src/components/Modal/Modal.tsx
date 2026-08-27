import {
  type ReactElement,
  type ReactNode,
  useEffect,
  useMemo,
  useState,
  type TransitionEvent,
} from 'react';
import {
  IressButton,
  type IressButtonProps,
  IressCloseButton,
} from '../Button';
import { IressIcon, type IressIconProps } from '../Icon';
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
import { alert as alertStyles } from '../Alert/Alert.styles';
import { cx } from '@/styled-system/css';
import { splitCssProps, styled } from '@/styled-system/jsx';
import { GlobalCSSClass } from '@/enums';
import { getTransitionDuration } from '@/helpers/transition/getTransitionDuration';
import type { IressAlertButtonProps } from '../Alert';

export type ModalStatus = 'danger' | 'success' | 'warning' | undefined;

export interface IressModalProps<
  TStatus extends ModalStatus = undefined,
> extends IressStyledProps {
  /**
   * Opinionated action buttons rendered in the modal footer.
   * Each action is rendered as an `IressButton` with the modal's status automatically applied.
   */
  actions?: TStatus extends undefined ? never : IressAlertButtonProps[];

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
   * When set to `true`, users cannot exit the modal by clicking the backdrop.
   * When set to `"no-esc"`, users also cannot exit the modal using the escape key.
   */
  disableBackdropClick?: boolean | 'no-esc';

  /**
   * When set to `true` the modal's footer will always be visible and fixed to the bottom of the modal.
   */
  fixedFooter?: boolean;

  /**
   * Content to be rendered in the modal footer. If `actions` are also provided, this content will be rendered below the actions.
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
   * Size of the modal:
   * - `sm`: Small modals communicate the outcome of an irreversible action. They should be concise and straightforward, containing a single action and, in some cases, a single input field.
   * - `md`: Medium modals provide optional supporting information to help users understand the context of a word or screen. They may contain a single action and, in some cases, a larger input such as a textarea.
   * - `lg`: Large modals are used for more complex tasks that require multiple steps or a lot of information as well as media such as video and PDF documents. They can contain multiple actions, inputs, and supporting information.
   *
   * If status is set, size can only be `sm` or `md`, and will default to `sm`. If status is not set, size can be `sm`, `md` or `lg`, and will default to `md`.
   */
  size?: TStatus extends undefined ? 'sm' | 'md' | 'lg' : 'sm' | 'md';

  /**
   * When set to `true`, the modal will act like a static element when open.
   * This means it will not lock scroll or focus within the modal.
   * Note: This is used internally to display modals in Styler. It is not recommended to use this prop in your own applications.
   */
  static?: boolean;

  /**
   * Sets the status style of the modal with an accompanying status icon.
   * Use status modals for communicating outcomes of actions.
   * - `danger`: Communicates destructive or critical action outcomes.
   * - `success`: Communicates successful completions.
   * - `warning`: Communicates important cautions before proceeding.
   */
  status?: TStatus;
}

const MODAL_STATUS_ICONS: Record<
  NonNullable<ModalStatus>,
  IressIconProps['name']
> = {
  danger: 'report',
  success: 'check',
  warning: 'warning',
};

export const IressModal = <TStatus extends ModalStatus = undefined>({
  actions,
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
  size: sizeProp,
  status: alertStatus,
  static: isStatic,
  style,
  ...restProps
}: IressModalProps<TStatus>) => {
  const size = sizeProp ?? (alertStatus ? 'sm' : 'md');
  const hasActions = !!actions?.length;
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
    escapeKey: disableBackdropClick !== 'no-esc',
    outsidePress: (e) => {
      if (disableBackdropClick === true || disableBackdropClick === 'no-esc') {
        return false;
      }

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
    alertStatus,
    fixedFooter,
    size,
    static: isStatic,
    status,
  });
  const actionStyles = alertStyles({ status: alertStatus });

  const isSmallStatus = size === 'sm' && !!alertStatus;
  const [styleProps, nonStyleProps] = splitCssProps(restProps);
  const { p = 'lg', ...restStyleProps } = styleProps;

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
          className={cx(
            styles.modal,
            actionStyles.alertVars,
            text(),
            GlobalCSSClass.Modal,
          )}
          id={id}
          data-testid={dataTestid}
          aria-labelledby={heading ? headingId : undefined}
          {...interactions.getFloatingProps(nonStyleProps)}
          {...restStyleProps}
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
            textAlign={isSmallStatus ? 'center' : undefined}
          >
            {alertStatus ? (
              <div
                className={styles.statusHeader}
                data-testid={propagateTestid(dataTestid, 'status-header')}
              >
                <IressIcon
                  name={MODAL_STATUS_ICONS[alertStatus]}
                  className={styles.statusIcon}
                  screenreaderText={`${alertStatus}: `}
                  data-testid={propagateTestid(dataTestid, 'status-icon')}
                />
                {heading}
              </div>
            ) : (
              heading
            )}
            {children}
          </styled.div>
          {(footer ?? hasActions) && (
            <styled.div
              className={styles.footer}
              data-testid={propagateTestid(dataTestid, 'footer')}
              p={p}
            >
              {hasActions && (
                <div className={styles.footerActions}>
                  {actions?.map((action, index) => (
                    <IressButton
                      {...action}
                      className={cx(
                        action.className,
                        styles.action,
                        actionStyles.action,
                      )}
                      status={alertStatus as IressButtonProps['status']}
                      key={index}
                    />
                  ))}
                </div>
              )}
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

IressModal.displayName = 'IressModal';
