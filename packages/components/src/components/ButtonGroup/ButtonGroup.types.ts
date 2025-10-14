import {
  type PropsWithChildren,
  type ReactElement,
  type ReactNode,
} from 'react';
import { type IressHTMLAttributes } from '@/interfaces';
import { type FormControlValue } from '@/types';

export interface IressButtonGroupProps
  extends Omit<IressHTMLAttributes, 'onChange'> {
  /**
   * Content of the button group, usually multiple `IressButton`.
   */
  children?: ReactNode;

  /**
   * Initially selected value, use for uncontrolled components.
   */
  defaultSelected?: FormControlValue | FormControlValue[];

  /**
   * Hides the label if set; label will still be read out by screen readers.
   */
  hiddenLabel?: boolean;

  /**
   * Sets the label text for the button group.
   * If passed an element, it will render the element with an id, to ensure its connection to the button group.
   */
  label: ReactElement | string;

  /**
   * Allows multiple buttons to be selected.
   */
  multiple?: boolean;

  /**
   * Called when a user activates one of its children buttons.
   */
  onChange?: (event: ButtonGroupChange) => void;

  /**
   * Provides the label and value for each option in the button group.
   * @deprecated Use `IressButton` instead.
   */
  options?: string[] | string;

  /**
   * Selected value, use for controlled components.
   */
  selected?: FormControlValue | FormControlValue[];
}

export interface IressButtonGroupProviderProps extends PropsWithChildren {
  defaultSelected?: FormControlValue | FormControlValue[];
  multiple?: boolean;
  onChange?: (event: ButtonGroupChange) => void;
  selected?: FormControlValue | FormControlValue[];
}

export interface ButtonGroupContextValue<
  TArray = FormControlValue[],
  TValue = FormControlValue,
> {
  isActive: (value?: TValue) => boolean;
  selected?: TArray;
  toggle?: (value?: TValue, flag?: boolean) => void;
}

export interface ButtonGroupItemProps {
  value?: FormControlValue;
}

export interface ButtonGroupItemHook {
  className: string;
  props: {
    'aria-pressed': boolean;
  };
  toggle: () => void;
}

export interface ButtonGroupChange {
  selected?: FormControlValue | FormControlValue[];
}
