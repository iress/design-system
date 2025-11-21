import {
  IressRichSelect,
  type IressRichSelectProps,
  IressSelectLabel,
} from '@/main';

const CustomLabel: IressRichSelectProps['renderLabel'] = ({ value }) => (
  <IressSelectLabel role="combobox" selected={value} />
);

export const SelectCustomLabel = () => (
  <IressRichSelect
    multiSelect
    options={[
      { label: 'Option 1', value: 'option-1' },
      { label: 'Option 2', value: 'option-2' },
    ]}
    placeholder="Select an item"
    renderLabel={CustomLabel}
    container={document.body}
  />
);
