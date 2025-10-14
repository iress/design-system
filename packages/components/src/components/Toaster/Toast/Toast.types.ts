import type React from 'react';
import { type IressHTMLAttributes } from '@/interfaces';
import { type HeadingLevel } from '@/enums';
import { type ButtonRef } from '@/components/Button';

interface ToastHeadingProps<T = HTMLDivElement> extends IressHTMLAttributes<T> {
  /**
   * The heading area of the toast. You can pass react component such as `<IressText>Error</IressText>`.
   * If a string is provided, it will default to a `<h2 />` element.
   */
  heading?: React.ReactNode;
}

interface ToastCloseButtonProps<T = HTMLDivElement>
  extends IressHTMLAttributes<T> {
  /**
   * A boolean to show hide the dismiss close button on the top right of the corner.
   * @default true
   */
  dismissible?: boolean;

  /**
   * Click event on the close button of the toast.
   */
  onClose?: (e?: React.MouseEvent<ButtonRef>) => void;
}

interface ToastActionProps<T = HTMLDivElement> extends IressHTMLAttributes<T> {
  /**
   * Buttons and controls for the toast.
   */
  actions?: React.ReactNode;
}

interface ToastContentProps
  extends ToastHeadingProps,
    ToastCloseButtonProps,
    ToastActionProps {
  /**
   * The toast message.
   */
  children?: React.ReactNode;

  /**
   * The content of the toast message.
   * @deprecated use children instead.
   */
  content?: string;

  /**
   * System status of Toast
   */
  status: ToastStatus;
}

export interface IressToastProps
  extends IressHTMLAttributes<HTMLDivElement>,
    ToastContentProps {
  /**
   * The toast message.
   */
  children?: React.ReactNode;

  /**
   * The content of the toast message.
   * @deprecated use children instead.
   */
  content?: string;

  /**
   * Heading level for the Toast heading. Will be ignored if headingText is not supplied.
   * @default h2
   * @deprecated Use `heading` instead.
   */
  headingLevel?: HeadingLevel;

  /**
   * Text for Toast heading. If not supplied, heading will not be displayed.
   * @deprecated Use `heading` instead.
   */
  headingText?: string;

  /**
   * The amount of time, in milliseconds, the toast is displayed on screen without
   * the users interaction. Will fall back to timeout prop on parent toaster and then
   * the default time of 6000ms. If set to 0, the toast will not auto dismiss.
   * @default 6000
   */
  timeout?: number;
}

export interface IressToastAnimatedProps extends IressToastProps {
  /**
   * The animation of the toast. If not provided, it will simply fade in and out.
   */
  animation?: ToastAnimation;

  /**
   * Called when the element timed out.
   */
  onTimeout?: () => void;
}

export type ToastActionComponent = React.FC<ToastActionProps>;
export type ToastCloseButtonComponent = React.FC<ToastCloseButtonProps>;
export type ToastContentComponent = React.FC<ToastContentProps>;
export type ToastWithEnums = React.ForwardRefExoticComponent<
  IressToastProps & React.RefAttributes<HTMLDivElement>
> & {
  /** @deprecated IressToast.HeadingLevel is now deprecated and will be removed in a future version. Please use the value directly. **/
  HeadingLevel: typeof HeadingLevel;
};

export type NewToast = Omit<IressToastProps, 'status'>;

export const TOAST_STATUS = ['success', 'error', 'info'] as const;
export type ToastStatus = (typeof TOAST_STATUS)[number];

export const TOAST_ANIMATION = [
  'start-x',
  'end-x',
  'start-y',
  'end-y',
] as const;
export type ToastAnimation = (typeof TOAST_ANIMATION)[number];
