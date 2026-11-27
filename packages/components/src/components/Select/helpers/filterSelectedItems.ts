import { getFormControlValueAsStringIfDefined } from '@helpers/form/getFormControlValueAsStringIfDefined';
import { toArray } from '@helpers/formatting/toArray';
import type { LabelValueMeta } from '@/interfaces';
import type { FormControlValue } from '@/types';

const isSelected = (item: LabelValueMeta, selectedArray: FormControlValue[]) =>
  selectedArray.includes(
    getFormControlValueAsStringIfDefined(item.value) ?? item.label,
  );

/**
 * Removes selected items from a list of items, including selected children of grouped items.
 * Groups with no remaining children are removed.
 */
export const filterSelectedItems = <T extends LabelValueMeta>(
  items: T[],
  selected?: FormControlValue | FormControlValue[],
): T[] => {
  const selectedArray = toArray(selected);

  return items
    .map((item) => {
      if (item.children && item.children.length > 0) {
        const filteredChildren = item.children.filter(
          (child) => !isSelected(child, selectedArray),
        );

        return filteredChildren.length > 0
          ? { ...item, children: filteredChildren }
          : null;
      }

      return isSelected(item, selectedArray) ? null : item;
    })
    .filter((item): item is T => item !== null);
};

/**
 * Counts the number of selectable items, counting the children of grouped items instead of the groups themselves.
 */
export const countItems = (items: LabelValueMeta[]): number =>
  items.reduce(
    (count, item) =>
      count +
      (item.children && item.children.length > 0 ? item.children.length : 1),
    0,
  );
