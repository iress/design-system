import { useState } from 'react';
import { IressButton, IressPopover, usePopoverItem } from '@/main';

const CountButton = () => {
  const [count, setCount] = useState(0);
  const { isActiveInPopover, ...popoverItemProps } = usePopoverItem('Count', {
    onKeyDown: (e) => {
      if (e.key === '+') {
        setCount(count + 1);
      }
    },
  });

  return (
    <IressButton
      {...popoverItemProps}
      active={isActiveInPopover}
      mode="tertiary"
      fluid
    >
      Increase count using the + key: {count}
    </IressButton>
  );
};

export const UsePopoverExample = () => (
  <IressPopover
    activator={<IressButton>Toggle</IressButton>}
    container={document.body}
    type="listbox"
    virtualFocus
  >
    <CountButton />
    <CountButton />
  </IressPopover>
);
