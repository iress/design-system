import { toArray } from '@helpers/formatting/toArray';
import {
  type ControlledStateHook,
  type ControlledStateProps,
  useControlledState,
} from '@/hooks/useControlledState';
import { getFormControlValueAsString } from '@helpers/form/getFormControlValueAsString';
import { type IressSelectMenuProps } from '../SelectMenu/SelectMenu.types';

export interface RichSelectStateHookReturn
  extends ControlledStateHook<IressSelectMenuProps['selected']> {
  getLabelsArray: () => string[];
  getLabelsString: (separator?: string) => string;
  getValuesArray: () => string[];
  getValuesString: () => string;
}

/**
 * This is a wrapper around useControlledState that provides additional helper functions for working with rich select state.
 * - getLabelsArray: Returns an array of the labels of the selected items, used to create tags.
 * - getLabelsString: Returns a string of the labels of the selected items, separated by the provided separator. Used for displaying in inputs.
 * - getValuesArray: Returns an array of the values of the selected items. Used to compare current and previous values.
 * - getValuesString: Returns a string of the values of the selected items, separated by commas. Used for submitting form data.
 *
 */
export const useRichSelectState = (
  props: ControlledStateProps<IressSelectMenuProps['selected']>,
): RichSelectStateHookReturn => {
  const state = useControlledState(props);

  return {
    ...state,
    getLabelsArray: () => toArray(state.value).map((item) => item.label),
    getLabelsString: (separator = ',') =>
      toArray(state.value)
        .map((item) => item.label)
        .join(separator),
    getValuesArray: () =>
      toArray(state.value).map((item) =>
        getFormControlValueAsString(item.value),
      ),
    getValuesString: () =>
      toArray(state.value)
        .map((item) => item.value)
        .join(','),
  };
};
