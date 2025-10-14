import { toArray } from '@helpers/formatting/toArray';
import { IressSelectLabel } from '../SelectLabel/SelectLabel';
import { IressSelectTags } from '../SelectTags/SelectTags';
import { getValueAsEvent } from '@helpers/form/getValueAsEvent';
import {
  type IressRichSelectProps,
  type SelectLabelRenderProps,
} from '../RichSelect.types';
import { IressButton } from '@/components/Button';
import { IressIcon } from '@/components/Icon';
import { IressHide } from '@/components/Hide';

interface SelectActivatorProps
  extends Pick<
      IressRichSelectProps,
      | 'id'
      | 'multiSelect'
      | 'onChange'
      | 'placeholder'
      | 'renderLabel'
      | 'value'
    >,
    Omit<SelectLabelRenderProps, 'close'> {
  async?: boolean;
  setShow: (show: boolean) => void;
}

export const SelectActivator = ({
  async,
  id,
  error,
  loading,
  multiSelect,
  onChange,
  placeholder,
  renderLabel,
  setShow,
  setValue,
  show,
  value,
}: SelectActivatorProps) => {
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
        append={
          <IressButton mode="tertiary" role={async ? undefined : 'combobox'}>
            <IressIcon name="chevron-down" size="xs" />
            <IressHide visuallyHidden hiddenOn={{ xs: true }}>
              Selected:{' '}
              {toArray(value).length
                ? toArray(value)
                    .map((item) => item.label)
                    .join(', ')
                : 'None'}
            </IressHide>
          </IressButton>
        }
        id={id}
        onDelete={(item) => {
          if (!item) return;
          const newValue = toArray(value).filter(
            (valueItem) => valueItem.label !== item.label,
          );
          setValue(newValue);
          onChange?.(getValueAsEvent(newValue), newValue);
        }}
        onDeleteAll={() => {
          setValue([]);
          onChange?.(getValueAsEvent([]), []);
        }}
        onToggleActions={() => setShow(false)}
        placeholder={placeholder}
        selected={value}
      />
    );
  }

  return (
    <IressSelectLabel
      id={id}
      placeholder={placeholder}
      role={async ? undefined : 'combobox'}
      selected={value}
    />
  );
};
