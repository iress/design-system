import {
  IressCombobox,
  type IressComboboxProps,
  type LabelValueMeta,
} from '@/main';
import { useState } from 'react';

export const ComboboxUsingState = (args: IressComboboxProps) => {
  const [value, setValue] = useState<LabelValueMeta | undefined>();

  return (
    <IressCombobox
      {...args}
      onChange={(_e, newValue) => setValue(newValue)}
      onClear={() => setValue(undefined)}
      value={value}
    />
  );
};
