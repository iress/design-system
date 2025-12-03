import {
  type IressMultiComboboxProps,
  IressMultiCombobox,
  type LabelValueMeta,
} from '@/main';
import { useState } from 'react';

export const MultiComboboxUsingState = (args: IressMultiComboboxProps) => {
  const [value, setValue] = useState<LabelValueMeta[] | undefined>();

  return (
    <IressMultiCombobox
      {...args}
      onChange={(_e, newValue) => setValue(newValue)}
      onClear={() => setValue(undefined)}
      value={value}
    />
  );
};
