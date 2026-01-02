import { toArray } from '@helpers/formatting/toArray';
import { type LabelValue } from '@/interfaces';

/**
 * Retrieves value(s) from an array or single LabelValue item.
 */
export const getValueFromLabelValues = <T extends LabelValue = LabelValue>(
  items?: T[] | T,
  array = false,
) => {
  const itemsArray = toArray(items);

  if (array) {
    return itemsArray.map((item) => item?.value ?? item?.label);
  }

  return itemsArray[0]?.value ?? itemsArray[0]?.label;
};
