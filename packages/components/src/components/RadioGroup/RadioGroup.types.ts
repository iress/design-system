import { type ReactNode } from 'react';
import { type IressHTMLAttributes } from '@/interfaces';
import { type FormControlValue } from '@/types';

export interface IressRadioGroupProps
  extends Omit<IressHTMLAttributes, 'onChange' | 'defaultValue'> {
  /**
   * Content of the radio group, usually multiple `IressRadio` components.
   */
  children?: ReactNode;

  /**
   * Hides the radio control to allow the creation of custom radio buttons.
   */
  hiddenRadio?: boolean;

  /**
   * Sets which of the block / inline layout options apply.
   * @default 'stack'
   */
  layout?: RadioGroupLayout | RadioGroupLayouts;

  /**
   * Name to be applied to all radios in the group.
   */
  name?: string;

  /**
   * Called when a user selects one of its children radio buttons.
   * If you pass in a non-string value, you can access it using the second parameter of the function.
   */
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement>,
    value?: FormControlValue,
  ) => void;

  /**
   * When true, marks the field as required
   */
  required?: boolean;

  /**
   * Initial value of radio group when in uncontrolled mode.
   */
  defaultValue?: FormControlValue;

  /**
   * Renders a readonly radio group.
   */
  readonly?: boolean;

  /**
   * Value of radio group when in controlled mode.
   */
  value?: FormControlValue;

  /**
   * Add the button-like border and padding to radio when `touch` is true.
   */
  touch?: boolean;
}

export type RadioGroupContextValue = Pick<
  IressRadioGroupProps,
  | 'name'
  | 'value'
  | 'hiddenRadio'
  | 'required'
  | 'onChange'
  | 'readonly'
  | 'touch'
>;

export interface RadioGroupRef {
  input?: HTMLDivElement | null;
  reset: () => void;
  focus: () => void;
  blur: () => void;
}

export interface RadioGroupWithEnums
  extends React.ForwardRefExoticComponent<
    IressRadioGroupProps & React.RefAttributes<HTMLElement>
  > {
  /** @deprecated IressRadioGroup.Layout will be removed in future versions of IDS. Please use the value directly. */
  Layout: typeof RadioGroupLayout;
}

/**
 * @deprecated The RadioGroupLayout enum will be removed in future versions of IDS. Please use the value directly.
 */
export enum RadioGroupLayout {
  Stack = 'stack',
  Block = 'block',
  Inline = 'inline',
  InlineFlex = 'inlineFlex',
  InlineEqualWidth = 'inlineEqualWidth',
}
export const RADIO_GROUP_LAYOUTS = [
  'stack',
  'block',
  'inline',
  'inlineFlex',
  'inlineEqualWidth',
] as const;
export type RadioGroupLayouts = (typeof RADIO_GROUP_LAYOUTS)[number];
