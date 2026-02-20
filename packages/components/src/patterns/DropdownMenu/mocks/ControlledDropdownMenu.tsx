import { IressDropdownMenu, type IressDropdownMenuProps } from '@/main';
import { useState } from 'react';

const ALL_OPTIONS = [
  {
    label: 'This financial year',
    value: 'this_financial_year',
  },
  {
    label: 'Last financial year',
    value: 'last_financial_year',
  },
];

export const ControlledDropdownMenu = () => {
  const [selected, setSelected] =
    useState<IressDropdownMenuProps<false>['selected']>();

  return (
    <IressDropdownMenu
      container={document.body}
      label="Portfolio performance"
      options={ALL_OPTIONS}
      onChange={(newValue) => setSelected(newValue)}
      onReset={() => setSelected(ALL_OPTIONS[0])}
      selected={selected}
    />
  );
};
