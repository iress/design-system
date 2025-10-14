import { composeLabelValueDescriptor } from '@helpers/label-value/composeLabelValueDescriptor';
import { type IressFilterProps } from '../Filter.types';
import { toArray } from '@helpers/formatting/toArray';

export const FilterLabel = ({
  label,
  selectedOptionsText,
  value,
}: Pick<IressFilterProps, 'label' | 'selectedOptionsText' | 'value'>) => {
  if (!toArray(value).length) {
    return label;
  }

  if (typeof label === 'string') {
    return `${label}: ${composeLabelValueDescriptor(value, selectedOptionsText)}`;
  }

  return label;
};
