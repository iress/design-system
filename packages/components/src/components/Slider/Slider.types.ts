import { type ReactNode } from 'react';
import { type IressHTMLAttributes, type ResponsiveSizing } from '@/interfaces';

export interface IressSliderProps
  extends Omit<
    IressHTMLAttributes<HTMLInputElement>,
    'children' | 'onInput' | 'onChange'
  > {
  /**
   * Initial value of the slider. Used for uncontrolled sliders.
   */
  defaultValue?: number;

  /**
   * Format the changed value.
   */
  formatValue?: (
    value: number,
    tick?: SliderTickLabelValueWithClassName,
    readonly?: boolean,
  ) => ReactNode;

  /**
   * If `true`, the value tooltip will be hidden.
   */
  hiddenValueTooltip?: boolean;

  /**
   * Set the maximum value for the slider.
   * @default 10
   */
  max?: number;

  /**
   * Sets minimum value for the slider.
   * @default 0
   */
  min?: number;

  /**
   * The name of the control, which is submitted with the form data.
   */
  name?: string;

  /**
   * Emitted when the slider value changes.
   */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>, value?: number) => void;

  /**
   * If `true`, the user cannot modify the value.
   */
  readonly?: boolean;

  /**
   * Sets the step value of the slider.
   * @default 1
   */
  step?: number;

  /**
   * List of labels to be displayed.
   */
  tickLabels?: SliderTickLabel[] | boolean;

  /**
   * Value of the slider. Used for controlled sliders.
   */
  value?: number;
}

export interface SliderTicksProps
  extends IressHTMLAttributes<HTMLDataListElement> {
  /**
   * Set the maximum value for the slider.
   * @default 10
   */
  max?: number;

  /**
   * Sets minimum value for the slider.
   * @default 0
   */
  min?: number;

  /**
   * List of labels to be displayed.
   */
  tickLabels?: SliderTickLabelValue[];
}

export interface SliderReadonlyProps
  extends Omit<IressHTMLAttributes<HTMLInputElement>, 'value'> {
  /**
   * The label of the value.
   */
  label?: ReactNode;

  /**
   * The name of the control, which is submitted with the form data.
   */
  name?: string;

  /**
   * The current value of the slider.
   */
  value?: number;
}

export type SliderTickLabel = number | SliderTickLabelValue;
export interface SliderTickLabelValue {
  value: number;
  label?: ReactNode;
  hiddenOn?: ResponsiveSizing<boolean>;
}
export type SliderTickLabelValueWithClassName = SliderTickLabelValue & {
  className?: Record<string, boolean>;
};

export type SliderCustomCSSProperties = React.CSSProperties & {
  '--iress-thumb-value-offset'?: string;
  '--iress-tick-label-width'?: string;
};
