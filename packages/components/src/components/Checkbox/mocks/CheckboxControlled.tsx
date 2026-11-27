import { IressCheckbox } from '@/main';
import { useState } from 'react';

export function CheckboxControlled() {
  const [checked, setChecked] = useState(true);

  return (
    <IressCheckbox
      checked={checked}
      onChange={(_e, newChecked) => setChecked(newChecked ?? false)}
    >
      A controlled checkbox
    </IressCheckbox>
  );
}
