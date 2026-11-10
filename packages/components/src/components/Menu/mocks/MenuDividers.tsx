import {
  IressMenu,
  IressMenuDivider,
  IressMenuHeading,
  IressMenuItem,
} from '@/main';

export function MenuDividers() {
  return (
    <IressMenu>
      <IressMenuHeading element="h4" divider>
        Menu heading (h4)
      </IressMenuHeading>
      <IressMenuItem>Menu item 1</IressMenuItem>
      <IressMenuItem divider>Menu item 2</IressMenuItem>
      <IressMenuHeading element="h5">Menu heading (h5)</IressMenuHeading>
      <IressMenuItem selected>Menu item 3</IressMenuItem>
      <IressMenuItem>Menu item 4</IressMenuItem>
      <IressMenuDivider />
      <IressMenuItem>Menu item 5</IressMenuItem>
    </IressMenu>
  );
}
