import { IressMenu, IressMenuHeading, IressMenuItem } from '@/main';

export function MenuHeadings() {
  return (
    <IressMenu>
      <IressMenuHeading element="h4">Menu heading (h4)</IressMenuHeading>
      <IressMenuItem>Menu item 1</IressMenuItem>
      <IressMenuHeading element="h5">Menu heading (h5)</IressMenuHeading>
      <IressMenuItem>Menu item 2</IressMenuItem>
    </IressMenu>
  );
}
