import { IressRichSelect } from '@/main';

export const SelectInitialOptions = () => (
  <IressRichSelect
    container={document.body}
    initialOptions={[
      { label: 'Frequently selected 1', value: 'freq-1' },
      { label: 'Frequently selected 2', value: 'freq-2' },
    ]}
    multiSelect
    options={async () =>
      Promise.resolve([
        { label: 'Option 1', value: 'option-1' },
        { label: 'Option 2', value: 'option-2' },
        { label: 'Option 3', value: 'option-3' },
        { label: 'Option 4', value: 'option-4' },
        { label: 'Option 5', value: 'option-5' },
      ])
    }
    virtualFocus={false}
  />
);
