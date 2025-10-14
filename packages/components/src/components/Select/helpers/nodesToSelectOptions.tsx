import { toArray } from '@helpers/formatting/toArray';
import { getFormControlValueAsString } from '@helpers/form/getFormControlValueAsString';
import { type FormControlValue } from '@/types';
import {
  type IressSelectOptionProps,
  type SelectOption,
} from '../Select.types';
import { IressSelectOption } from '..';

type NodeProps = IressSelectOptionProps & {
  label: string;
};
type NodeType = typeof IressSelectOption | 'optgroup' | 'option';
type Node = React.ReactElement<NodeProps, NodeType>;

export const mapNodesToSelectOptions = (
  nodes: Node[] | Node,
): SelectOption[] => {
  return toArray(nodes).reduce(
    (
      accumulator,
      node = { type: IressSelectOption, props: { label: '' }, key: '' },
    ) => {
      // If the node is an optgroup, we need to recursively convert the children as well
      if (node.type === 'optgroup') {
        accumulator = [
          ...accumulator,
          {
            label: node.props.label,
            children: mapNodesToSelectOptions(node.props.children as Node),
          },
        ];
        // If the node is an option, use the props as the SelectOption[], and rename children to label
      } else if ([IressSelectOption, 'option'].includes(node.type)) {
        const option = { ...node.props } as SelectOption;
        delete option.children;

        // eslint-disable-next-line @typescript-eslint/no-base-to-string -- The filtered components only accept a string for children, so its OK here
        const label = String(node.props.children);

        accumulator = [
          ...accumulator,
          {
            ...option,
            label,
          },
        ];
        // In some cases the options are in a fragment,
        // so we need to recursively convert the children, or array of nodes
      } else if (node.props?.children || Array.isArray(node)) {
        accumulator = [
          ...accumulator,
          ...mapNodesToSelectOptions((node.props?.children as Node[]) ?? node),
        ];
      }

      return accumulator;
    },
    [] as SelectOption[],
  );
};

export const findValueFromStringInSelectOptions = (
  value: string,
  options: SelectOption[] = [],
): FormControlValue | undefined => {
  return options.reduce(
    (found, option) => {
      if (found) return found;

      if (option.children) {
        return findValueFromStringInSelectOptions(value, option.children);
      }

      return getFormControlValueAsString(option.value) === value
        ? option.value
        : found;
    },
    undefined as FormControlValue | undefined,
  );
};
