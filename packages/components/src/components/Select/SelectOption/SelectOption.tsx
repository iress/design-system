import { styled } from '@/styled-system/jsx';
import { FormControlValue, IressStyledProps } from '@/types';
import { getFormControlValueAsString } from '@helpers/form/getFormControlValueAsString';

export interface IressSelectOptionProps
  extends Omit<IressStyledProps<'option'>, 'value'> {
  /**
   * Value of selected option.
   * It will be converted to a string and used to match with the value of IressSelect during the onChange event.
   */
  value?: FormControlValue;
}

export const IressSelectOption = ({
  value,
  ...restProps
}: IressSelectOptionProps) => (
  <styled.option {...restProps} value={getFormControlValueAsString(value)} />
);
