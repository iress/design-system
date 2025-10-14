import { composeLabelValueDescriptor } from '@helpers/label-value/composeLabelValueDescriptor';
import { IressFilterProps } from '../Filter';
import { toArray } from '@helpers/formatting/toArray';

export type FilterLabelProps<TMultiple extends boolean = false> = Pick<
  IressFilterProps<TMultiple>,
  'label' | 'selectedOptionsText' | 'value'
>;

export const FilterLabel = <TMultiple extends boolean = false>({
  label,
  selectedOptionsText,
  value,
}: FilterLabelProps<TMultiple>) => {
  if (!toArray(value).length) {
    return label;
  }

  if (typeof label === 'string') {
    return `${label}: ${composeLabelValueDescriptor(value, selectedOptionsText)}`;
  }

  return label;
};
