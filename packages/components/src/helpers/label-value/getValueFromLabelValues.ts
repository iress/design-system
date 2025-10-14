import { toArray } from '@helpers/formatting/toArray';
import { type LabelValue } from '@/interfaces';

export const getValueFromLabelValues = (
  items?: LabelValue | LabelValue[],
  array = false,
) => {
  const itemsArray = toArray(items);

  if (array) {
    return itemsArray.map((item) => item?.value ?? item?.label);
  }

  return itemsArray[0]?.value ?? itemsArray[0]?.label;
};
