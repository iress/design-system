import { IressFilter, IressFilterProps } from '@/main';
import { useState } from 'react';

export const FilterUsingState = <TMultiple extends boolean = false>(
  args: IressFilterProps<TMultiple>,
) => {
  const [value, setValue] = useState<IressFilterProps<TMultiple>['value']>();

  return (
    <IressFilter
      {...args}
      onChange={(newValue) => setValue(newValue)}
      onReset={() => setValue(undefined)}
      value={value}
    />
  );
};
