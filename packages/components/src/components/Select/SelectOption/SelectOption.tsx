import { styled } from '@/styled-system/jsx';
import type { IressUnstyledProps, FormControlValue } from '@/types';
import { getFormControlValueAsString } from '@helpers/form/getFormControlValueAsString';

export interface IressSelectOptionProps extends Omit<
  IressUnstyledProps<'option'>,
  'value'
> {
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
