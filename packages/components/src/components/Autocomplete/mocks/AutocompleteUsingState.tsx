import { IressAutocomplete } from '@/main';
import { useState } from 'react';

export function AutocompleteUsingState() {
  const [value, setValue] = useState('Option 1');

  return (
    <IressAutocomplete
      options={[
        { label: 'Option 1' },
        { label: 'Option 2' },
        { label: 'Option 3' },
        { label: 'Option 4' },
        { label: 'Option 5' },
      ]}
      onChange={(_e, newValue) => setValue(newValue ?? '')}
      onClear={() => setValue('')}
      value={value}
    />
  );
}
