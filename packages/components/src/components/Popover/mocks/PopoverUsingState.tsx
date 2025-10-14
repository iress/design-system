import {
  IressButton,
  IressPanel,
  IressPopover,
  type IressPopoverProps,
} from '@/main';
import { useState } from 'react';

export const PopoverUsingState = (args: IressPopoverProps) => {
  const [show, setShow] = useState(false);

  return (
    <IressPopover
      {...args}
      activator={
        <IressButton onClick={() => setShow(!show)}>
          Show popover using state
        </IressButton>
      }
      show={show}
      onActivated={() => setShow(true)}
      onDeactivated={() => setShow(false)}
    >
      <IressPanel>A little more information about this area.</IressPanel>
    </IressPopover>
  );
};
