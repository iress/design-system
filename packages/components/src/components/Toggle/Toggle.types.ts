import { type ReactNode } from 'react';
import { type IressHTMLAttributes } from '@/interfaces';

export interface ToggleProps extends Omit<IressHTMLAttributes, 'onChange'> {
  /**
   * Sets the checked state of the Toggle.
   */
  checked?: boolean;

  /**
   * 	Provides the label for the Toggle.
   */
  children: ReactNode;

  /**
   * Hides the label if true (label will still be read out by screen readers).
   */
  hiddenLabel?: boolean;

  /**
   * Determines the layout of the label with respect to the control.
   */
  layout?: ToggleLayout | ToggleLayouts;

  /**
   * Emitted when the checked state changes.
   */
  onChange?: (
    checked: boolean,
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => void;
}

export interface ToggleLabelProps extends IressHTMLAttributes {
  /**
   * Hides the label if true (label will still be read out by screen readers)
   */
  hiddenLabel?: boolean;
}

/**
 * @deprecated The ToggleLayout enum will be removed in future versions of IDS. Please use the ToggleLayouts type instead.
 */
export enum ToggleLayout {
  Inline = 'inline',
  InlineBetween = 'inline-between',
  InlineReverse = 'inline-reverse',
  Stack = 'stack',
}
export const TOGGLE_LAYOUTS = [
  'inline',
  'inline-between',
  'inline-reverse',
  'stack',
] as const;
export type ToggleLayouts = (typeof TOGGLE_LAYOUTS)[number];

export interface ToggleWithEnums
  extends React.ForwardRefExoticComponent<
    ToggleProps & React.RefAttributes<HTMLDivElement>
  > {
  /** @deprecated The IressToggle.Layout enum will be removed in future versions of IDS. Please use the value directly instead. */
  Layout: typeof ToggleLayout;
}
