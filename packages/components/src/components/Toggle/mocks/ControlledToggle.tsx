import { IressToggle, type IressToggleProps } from '@/main';
import { useState } from 'react';

export const ControlledToggle = (props: IressToggleProps) => {
  const [isChecked, setIsChecked] = useState(true);

  return (
    <IressToggle
      {...props}
      checked={isChecked}
      onChange={() => setIsChecked(!isChecked)}
    >
      Controlled Toggle
    </IressToggle>
  );
};
