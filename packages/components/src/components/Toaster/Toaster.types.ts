import {
  type DetailedHTMLProps,
  type HTMLAttributes,
  type PropsWithChildren,
} from 'react';
import { type IressToastProps, type ToastAnimation } from './Toast/Toast.types';
import { type FloatingUIContainer } from '@/types';

export type ToastItem = IressToastProps & {
  id: string;
  content?: React.ReactNode;
};

export interface IressToasterOptions {
  /**
   * The position on the screen where the toast will appear.
   * @default bottom-end
   */
  position?: ToasterPosition | ToasterPositions;

  /**
   * The container element to render the toaster into.
   * By default, the toaster will render at the end of the document body.
   */
  container?: FloatingUIContainer;
}

export interface IressToasterProps
  extends React.HTMLAttributes<HTMLDivElement>,
    IressToasterOptions {
  toasts?: ToastItem[];
}

export interface IressToasterProviderProps
  extends PropsWithChildren,
    IressToasterOptions {}

/** @deprecated IressToaster.Position is now deprecated and will be removed in a future version. Please use the value directly. **/
export enum ToasterPosition {
  BottomStart = 'bottom-start',
  BottomCenter = 'bottom-center',
  BottomEnd = 'bottom-end',
  TopStart = 'top-start',
  TopCenter = 'top-center',
  TopEnd = 'top-end',
}
export const TOASTER_POSITION = [
  'bottom-center',
  'bottom-end',
  'bottom-start',
  'top-center',
  'top-end',
  'top-start',
] as const;
export type ToasterPositions = (typeof TOASTER_POSITION)[number];

export const TOAST_POSITION_ANIMATION_MATRIX: Record<
  ToasterPosition,
  ToastAnimation
> = {
  'bottom-end': 'end-x',
  'bottom-start': 'start-x',
  'bottom-center': 'end-y',
  'top-end': 'end-x',
  'top-start': 'start-x',
  'top-center': 'start-y',
};

export const TOASTER_ARIA_ATTRIBUTES: DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> = {
  role: 'alert',
  'aria-relevant': 'additions',
  'aria-live': 'assertive',
};
