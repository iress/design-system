import { IressToggle } from '@/main';
import { useState } from 'react';

export function ControlledToggle() {
  const [isChecked, setIsChecked] = useState(true);

  return (
    <IressToggle checked={isChecked} onChange={() => setIsChecked(!isChecked)}>
      Controlled Toggle
    </IressToggle>
  );
}
