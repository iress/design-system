import { IressDropdownMenu, type IressDropdownMenuProps } from '@/main';
import { useState } from 'react';

const ALL_OPTIONS = [
  {
    label: 'Awesome',
  },
  {
    label: 'Great',
  },
];

export const ControlledDropdownMenuMultiselect = () => {
  const [selected, setSelected] = useState<
    IressDropdownMenuProps<true>['selected']
  >([ALL_OPTIONS[0]]);

  return (
    <IressDropdownMenu
      label="Select your favourite descriptors"
      options={ALL_OPTIONS}
      multiSelect
      onChange={(newValue) => setSelected(newValue)}
      onReset={() => setSelected([ALL_OPTIONS[0]])}
      selected={selected}
    />
  );
};
