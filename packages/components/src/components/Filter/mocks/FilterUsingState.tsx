import { IressFilter, IressFilterProps } from '@/main';
import { useState } from 'react';

export const FilterUsingState = (args: IressFilterProps) => {
  const [value, setValue] = useState<IressFilterProps['value']>();

  return (
    <IressFilter
      {...args}
      onChange={(newValue) => setValue(newValue)}
      onReset={() => setValue(undefined)}
      value={value}
    />
  );
};
