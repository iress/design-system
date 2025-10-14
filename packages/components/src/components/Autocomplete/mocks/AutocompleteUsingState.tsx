import { IressAutocomplete, IressAutocompleteProps } from '@/main';
import { useState } from 'react';

export const AutocompleteUsingState = (args: IressAutocompleteProps) => {
  const [value, setValue] = useState('Option 1');

  return (
    <IressAutocomplete
      {...args}
      onChange={(_e, newValue) => setValue(newValue ?? '')}
      onClear={() => setValue('')}
      value={value}
    />
  );
};
