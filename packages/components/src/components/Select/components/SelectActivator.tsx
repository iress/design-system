import { toArray } from '@helpers/formatting/toArray';
import { IressSelectLabel } from '../SelectLabel/SelectLabel';
import { IressSelectTags } from '../SelectTags/SelectTags';
import { getValueAsEvent } from '@helpers/form/getValueAsEvent';
import { type IressSelectProps, type SelectLabelRenderProps } from '../Select';
import { toPrimitiveValue } from '../helpers/toPrimitiveValue';
import { type ControlledValue } from '@/hooks';
import { type LabelValueMeta } from '@/interfaces';
import { type ReactNode } from 'react';
import { type IressInputProps } from '@/components/Input';
import { type FloatingUIContainer } from '@/types';

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
   * The container element to render the multiselect tags actions popover into.
   * Useful when rendering inside a Shadow DOM or a custom portal root.
   * By default, the popover will render where its parent is rendered.
   */
  popoverContainer?: FloatingUIContainer;

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
  extends
    Pick<
      IressSelectProps<TMultiple>,
      | 'disabled'
      | 'id'
      | 'multiSelect'
      | 'multiSelectLimit'
      | 'onChange'
      | 'placeholder'
      | 'popoverContainer'
      | 'renderLabel'
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
  disabled,
  error,
  loading,
  multiSelect,
  multiSelectLimit,
  onChange,
  placeholder,
  popoverContainer,
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
      disabled,
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
        limit={multiSelectLimit}
        onDelete={(item) => {
          if (!item) return;
          const newValue = toArray(value).filter(
            (valueItem) => valueItem.label !== item.label,
          ) as ControlledValue<LabelValueMeta, TMultiple>;
          setValue(newValue);
          const primitive = toPrimitiveValue(newValue);
          onChange?.(getValueAsEvent(primitive), primitive, newValue);
        }}
        onDeleteAll={() => {
          const newValue = [] as LabelValueMeta[] as ControlledValue<
            LabelValueMeta,
            TMultiple
          >;
          setValue(newValue);
          const primitive = toPrimitiveValue(newValue);
          onChange?.(getValueAsEvent(primitive), primitive, newValue);
        }}
        onToggleActions={() => setShow(false)}
        placeholder={placeholder}
        popoverContainer={popoverContainer}
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
      disabled={disabled}
      placeholder={placeholder}
      prepend={prepend}
      role={async ? undefined : 'combobox'}
      selected={value}
      selectedOptionsText={selectedOptionsText}
    />
  );
};

SelectActivator.displayName = 'SelectActivator';
