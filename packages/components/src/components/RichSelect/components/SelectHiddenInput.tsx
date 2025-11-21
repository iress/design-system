import { propagateTestid } from '@helpers/utility/propagateTestid';
import { type IressRichSelectProps } from '../RichSelect';
import { type ControlledValue } from '../../../hooks/useControlledState';
import { type LabelValueMeta } from '../../../interfaces';
import { type ForwardedRef, forwardRef, type ReactElement } from 'react';

export interface SelectHiddenInputRenderProps<
  TMultiple extends boolean = false,
> {
  /**
   * Gets the current value as a string, separated by comma. Use this if you are using an uncontrolled select.
   */
  getValuesString: () => string;

  /**
   * Selected items.
   */
  value?: ControlledValue<LabelValueMeta, TMultiple>;

  /**
   * Set the reference of the hidden input. Required to be set if needed to work with React Hook Forms.
   */
  ref?: ForwardedRef<HTMLInputElement>;

  /**
   * Whether its required.
   */
  required?: boolean;
}

type SelectHiddenInputProps<TMultiple extends boolean = false> = Pick<
  IressRichSelectProps<TMultiple>,
  'data-testid' | 'name' | 'renderHiddenInput' | 'value' | 'required'
> &
  SelectHiddenInputRenderProps<TMultiple>;

const Component = <TMultiple extends boolean = false>(
  {
    'data-testid': dataTestId,
    getValuesString,
    name,
    renderHiddenInput,
    required,
    value,
  }: SelectHiddenInputProps<TMultiple>,
  ref: ForwardedRef<HTMLInputElement>,
) => {
  if (renderHiddenInput)
    // eslint-disable-next-line react-hooks/refs -- we want to forward the ref
    return renderHiddenInput({
      getValuesString,
      value,
      ref,
      required,
    });

  return (
    <input
      data-testid={propagateTestid(dataTestId, 'hidden-input')}
      name={name}
      type="hidden"
      value={getValuesString()}
      ref={ref}
      required={required}
    />
  );
};

export const SelectHiddenInput = forwardRef(Component) as <
  TMultiple extends boolean,
>(
  props: SelectHiddenInputProps<TMultiple> & {
    ref?: ForwardedRef<HTMLInputElement>;
  },
) => ReactElement;
