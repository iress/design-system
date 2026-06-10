import { useState } from 'react';
import {
  IressButton,
  IressMenu,
  IressMenuItem,
  IressPopover,
} from '@/main';

export function PopoverWithListbox() {
  const [selected, setSelected] = useState<string | undefined>('aus');

  return (
    <IressPopover
      activator={<IressButton>Select country</IressButton>}
      container={document.body}
      type="listbox"
      contentStyle={{ p: 'none' }}
    >
      <IressMenu
        role="listbox"
        aria-label="Country"
        selected={selected}
        onChange={(value) => setSelected(value as string)}
      >
        <IressMenuItem value="aus">Australia</IressMenuItem>
        <IressMenuItem value="nz">New Zealand</IressMenuItem>
        <IressMenuItem value="uk">United Kingdom</IressMenuItem>
        <IressMenuItem value="sg">Singapore</IressMenuItem>
      </IressMenu>
    </IressPopover>
  );
}
