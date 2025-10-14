import { useState } from 'react';
import {
  ButtonCssClass,
  IressButton,
  IressPopover,
  usePopoverItem,
} from '@/main';

const CountButton = () => {
  const [count, setCount] = useState(0);
  const { isActiveInPopover, ...popoverItemProps } = usePopoverItem('Count', {
    onKeyDown: (e) => {
      if (e.key === '+') {
        setCount(count + 1);
      }
    },
  });

  const className = isActiveInPopover ? ButtonCssClass.Active : '';

  return (
    <IressButton
      {...popoverItemProps}
      className={className}
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
