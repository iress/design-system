import { IressSelect, type IressSelectProps, IressSelectLabel } from '@/main';

const CustomLabel: IressSelectProps<true>['renderLabel'] = ({ value }) => (
  <IressSelectLabel role="combobox" selected={value} />
);

export const SelectCustomLabel = () => (
  <IressSelect
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
