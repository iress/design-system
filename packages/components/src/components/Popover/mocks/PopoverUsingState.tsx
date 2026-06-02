import { IressButton, IressPopover } from '@/main';
import { useState } from 'react';

export function PopoverUsingState() {
  const [show, setShow] = useState(false);

  return (
    <IressPopover
      activator={
        <IressButton onClick={() => setShow(!show)}>
          Show popover using state
        </IressButton>
      }
      show={show}
      onActivated={() => setShow(true)}
      onDeactivated={() => setShow(false)}
      container={document.body}
    >
      A little more information about this area.
    </IressPopover>
  );
}
