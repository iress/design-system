import { type ReactNode } from 'react';
import { type IressHTMLAttributes } from '@/interfaces';
import { type FormControlValue } from '@/types';
import { type IressCheckboxProps } from '@/main';

export interface IressCheckboxGroupProps
  extends Omit<IressHTMLAttributes, 'defaultValue' | 'onChange'> {
  /**
   * Content to be displayed inside the group, usually multiple `IressCheckbox`.
   */
  children?: ReactNode;

  /**
   * Value of checkbox group when in uncontrolled mode.
   */
  defaultValue?: FormControlValue | FormControlValue[];

  /**
   * Hides the checkbox controls to allow the creation of custom checkboxes.
   */
  hiddenCheckbox?: boolean;

  /**
   * Sets which of the block / inline layout options apply.
   * @default 'stack'
   */
  layout?: CheckboxGroupLayout | CheckboxGroupLayouts;

  /**
   * Name to be applied to all checkboxes in the group.
   */
  name?: string;

  /**
   * Called with collated new value when a user toggles one of its children checkboxes.
   */
  onChange?: (value?: FormControlValue[]) => void;

  /**
   * Renders the group in a read-only state.
   */
  readonly?: boolean;

  /**
   * Value of checkbox group when in controlled mode.
   */
  value?: FormControlValue | FormControlValue[];

  /**
   * Add the button-like border and padding to checkbox when `touch` is true.
   */
  touch?: boolean;
}

export interface IressCheckboxItemsProps
  extends Omit<IressCheckboxGroupProps, 'onChange'> {
  checkedValues: FormControlValue[];
  onChange?: (newValue: FormControlValue) => void;
}

/**
 * @deprecated The CheckboxGroupLayout enum will be removed in future versions of IDS. Please use the value directly.
 */
export enum CheckboxGroupLayout {
  Block = 'block',
  Full = 'full',
  Stack = 'stack',
  Inline = 'inline',
}

export const CHECKBOX_GROUP_LAYOUTS = [
  'stack',
  'block',
  'inline',
  'full',
] as const;
export type CheckboxGroupLayouts = (typeof CHECKBOX_GROUP_LAYOUTS)[number];

export interface CheckboxGroupRef {
  input?: HTMLDivElement | null;
  check: (checked: boolean) => void;
  reset: () => void;
  focus: () => void;
  blur: () => void;
}

export type CheckboxGroupContextValue = Pick<
  IressCheckboxGroupProps,
  'name' | 'hiddenCheckbox' | 'value' | 'readonly' | 'touch'
> &
  Pick<IressCheckboxProps, 'onChange'>;

export interface CheckboxGroupWithEnums
  extends React.ForwardRefExoticComponent<
    IressCheckboxGroupProps & React.RefAttributes<HTMLElement>
  > {
  /** @deprecated The CheckboxGroupLayout enum will be removed in future versions of IDS. Please use the value directly. */
  Layout: typeof CheckboxGroupLayout;
}
