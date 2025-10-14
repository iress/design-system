import { useState } from 'react';
import { IressButton, IressPanel, IressPopover } from '@/main';

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
        <IressPanel>
          This content will be rendered in the parent container
        </IressPanel>
      </IressPopover>
    </div>
  );
};
