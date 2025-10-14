import { toArray } from '@helpers/formatting/toArray';
import { LabelValueMeta } from '@/interfaces';

/**
 * Converts the selected options into a human-readable string.
 *
 * @param selected the selected state, usually a single or array of LabelValueMeta
 * @param selectedOptionsText when multiple options are selected, this text will be used to describe the selection. {{numOptions}} is replaced with the number of options selected.
 * @returns
 */
export const composeLabelValueDescriptor = (
  selected?: LabelValueMeta | LabelValueMeta[],
  selectedOptionsText = '{{numOptions}} selected',
) => {
  const selectedAsArray = toArray(selected);

  if (!selectedAsArray.length) return '';

  const multipleLabel = selectedOptionsText?.replace(
    '{{numOptions}}',
    selectedAsArray.length.toString(),
  );

  return selectedAsArray.length === 1
    ? selectedAsArray[0].label
    : multipleLabel;
};
