import { useState } from 'react';
import { IressButton, IressPopover } from '@/main';

export const PopoverParentContainer = () => {
  const [parentContainer, setParentContainer] = useState<HTMLDivElement | null>(
    null,
  );

  return (
    <div id="parent" ref={setParentContainer}>
      <IressPopover
        activator={<IressButton>Toggle</IressButton>}
        container={parentContainer}
      >
        This content will be rendered in the parent container
      </IressPopover>
    </div>
  );
};
