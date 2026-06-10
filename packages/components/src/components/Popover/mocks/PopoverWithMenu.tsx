import { IressButton, IressIcon, IressMenu, IressMenuItem, IressPopover } from '@/main';

export function PopoverWithMenu() {
  return (
    <IressPopover
      activator={<IressButton>Open menu</IressButton>}
      container={document.body}
      type="menu"
      contentStyle={{ p: 'none' }}
    >
      <IressMenu role="menu">
        <IressMenuItem value="edit" prepend={<IressIcon name="edit" />}>
          Edit
        </IressMenuItem>
        <IressMenuItem value="duplicate" prepend={<IressIcon name="content_copy" />}>
          Duplicate
        </IressMenuItem>
        <IressMenuItem value="delete" prepend={<IressIcon name="delete" />}>
          Delete
        </IressMenuItem>
      </IressMenu>
    </IressPopover>
  );
}
