import { type FieldLegendProps, type IressFieldProps } from '@/main';

export interface IressFieldGroupProps
  extends Omit<
    IressFieldProps<HTMLFieldSetElement, FieldLegendProps>,
    'htmlFor'
  > {
  /**
   * Should contain multiple `IressField`, or other elements supported in field group such as `IressButton`.
   */
  children?: React.ReactNode;

  /**
   * Displays multiple children inline rather than stacked, with a small gap.
   */
  inline?: boolean;

  /**
   * Displays multiple children inline and removes column gap.
   */
  join?: boolean;
}
