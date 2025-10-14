import { toArray } from '@helpers/formatting/toArray';
import { IressSelectLabel } from '../SelectLabel/SelectLabel';
import { IressSelectTags } from '../SelectTags/SelectTags';
import { getValueAsEvent } from '@helpers/form/getValueAsEvent';
import { IressRichSelectProps, SelectLabelRenderProps } from '../RichSelect';
import { ControlledValue } from '@/hooks';
import { LabelValueMeta } from '@/interfaces';
import { ReactNode } from 'react';
import { IressInputProps } from '@/components/Input';

export interface IressSelectActivatorProps {
  /**
   * Append content.
   * @default <IressIcon name="chevron-down" size="xs" />
   */
  append?: ReactNode;

  /**
   * Placeholder, shown when there is nothing selected.
   */
  placeholder?: ReactNode;

  /**
   * Prepend content.
   */
  prepend?: ReactNode;

  /**
   * Selected items.
   */
  selected?: LabelValueMeta | LabelValueMeta[];

  /**
   * Text displayed next to label when two or more options are selected.
   * @default {{numOptions}} selected
   */
  selectedOptionsText?: string;

  /**
   * The width of the select.
   */
  width?: IressInputProps['width'];
}

interface SelectActivatorProps<TMultiple extends boolean = false>
  extends Pick<
      IressRichSelectProps<TMultiple>,
      | 'id'
      | 'multiSelect'
      | 'onChange'
      | 'placeholder'
      | 'renderLabel'
      | 'value'
      | 'append'
      | 'prepend'
      | 'selectedOptionsText'
    >,
    Omit<SelectLabelRenderProps<TMultiple>, 'close'> {
  async?: boolean;
  setShow: (show: boolean) => void;
}

export const SelectActivator = <TMultiple extends boolean = false>({
  append,
  async,
  id,
  error,
  loading,
  multiSelect,
  onChange,
  placeholder,
  prepend,
  renderLabel,
  selectedOptionsText,
  setShow,
  setValue,
  show,
  value,
}: SelectActivatorProps<TMultiple>) => {
  if (renderLabel) {
    return renderLabel({
      close: () => setShow(false),
      error,
      loading,
      setValue,
      show,
      value,
    });
  }

  if (multiSelect) {
    return (
      <IressSelectTags
        append={append}
        id={id}
        onDelete={(item) => {
          if (!item) return;
          const newValue = toArray(value).filter(
            (valueItem) => valueItem.label !== item.label,
          ) as ControlledValue<LabelValueMeta, TMultiple>;
          setValue(newValue);
          onChange?.(getValueAsEvent(newValue), newValue);
        }}
        onDeleteAll={() => {
          const newValue = [] as LabelValueMeta[] as ControlledValue<
            LabelValueMeta,
            TMultiple
          >;
          setValue(newValue);
          onChange?.(getValueAsEvent([]), newValue);
        }}
        onToggleActions={() => setShow(false)}
        placeholder={placeholder}
        prepend={prepend}
        selected={value}
        selectedOptionsText={selectedOptionsText}
      />
    );
  }

  return (
    <IressSelectLabel
      append={append}
      id={id}
      placeholder={placeholder}
      prepend={prepend}
      role={async ? undefined : 'combobox'}
      selected={value}
      selectedOptionsText={selectedOptionsText}
    />
  );
};
