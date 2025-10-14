import classNames from 'classnames';
import styles from './Toast.module.scss';
import {
  type IressToastProps,
  type ToastActionComponent,
  type ToastCloseButtonComponent,
  type ToastWithEnums,
  type ToastContentComponent,
} from './Toast.types';
import { ToastIcon } from './ToastIcon';
import { HeadingLevel } from '@/enums';
import { propagateTestid } from '@helpers/utility/propagateTestid';
import { IressCloseButton } from '../../Button';
import { InlineCssClass, IressInline } from '../../Inline';
import { IressPanel } from '../../Panel';
import { forwardRef } from 'react';
import { HeadingWithDeprecatedFallback } from '@/components/HeadingWithDeprecatedFallback/HeadingWithDeprecatedFallback';

const ToastLogicCloseButton: ToastCloseButtonComponent = ({
  dismissible,
  onClose,
  'data-testid': dataTestId,
}) => {
  if (!dismissible) {
    return;
  }

  return (
    <IressCloseButton
      data-testid={dataTestId}
      className={styles['toast__close-button']}
      onClick={onClose}
      screenreaderText="Dismiss"
    />
  );
};

const ToastLogicAction: ToastActionComponent = ({ actions }) =>
  actions ? <div className={styles.toast__footer}>{actions}</div> : null;

const ToasterContent: ToastContentComponent = ({
  heading,
  dismissible = true,
  onClose,
  content,
  children,
  actions,
  'data-testid': dataTestId,
}) => (
  <div
    className={styles.toast__wrapper}
    data-testid={propagateTestid(dataTestId, 'content')}
  >
    {heading}
    <ToastLogicCloseButton
      data-testid={propagateTestid(dataTestId, 'close-button__button')}
      dismissible={dismissible}
      onClose={onClose}
    />
    {content ?? children}
    <ToastLogicAction actions={actions} />
  </div>
);

export const Toast = (
  {
    heading,
    headingLevel,
    headingText,
    status,
    actions,
    content,
    dismissible,
    onClose,
    children,
    'data-testid': dataTestId,
    className,
    ...restProps
  }: IressToastProps,
  ref: React.Ref<HTMLDivElement>,
) => (
  <div
    {...restProps}
    data-testid={dataTestId}
    className={classNames(className, styles.toast, styles[`toast--${status}`])}
    tabIndex={-1}
    ref={ref}
  >
    <IressPanel className={classNames(InlineCssClass.Base, styles.panel)}>
      <IressInline gutter="sm" verticalAlign="top" noWrap>
        <ToastIcon status={status} />
        <ToasterContent
          {...{
            'data-testid': dataTestId,
            status,
            heading: (
              <HeadingWithDeprecatedFallback
                component="IressToast"
                heading={heading}
                headingText={headingText}
                HeadingTag={headingLevel}
                data-testid={propagateTestid(dataTestId, 'heading')}
              />
            ),
            actions,
            content,
            dismissible,
            onClose,
            children,
          }}
        />
      </IressInline>
    </IressPanel>
  </div>
);

export const IressToast = forwardRef(Toast) as ToastWithEnums;

/** @deprecated IressToast.HeadingLevel is now deprecated and will be removed in a future version. Please use the value directly. **/
IressToast.HeadingLevel = HeadingLevel;
