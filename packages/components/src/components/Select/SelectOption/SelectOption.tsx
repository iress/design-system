import { type IressSelectOptionProps } from '../Select.types';
import { getFormControlValueAsString } from '@helpers/form/getFormControlValueAsString';

export const IressSelectOption = ({
  value,
  ...restProps
}: IressSelectOptionProps) => (
  <option {...restProps} value={getFormControlValueAsString(value)} />
);
