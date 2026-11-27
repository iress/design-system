import {
  IressMenu,
  IressMenuDivider,
  IressMenuHeading,
  IressMenuItem,
} from '@/main';

export function MenuBasic() {
  return (
    <IressMenu defaultSelected="5">
      <IressMenuHeading>Menu heading</IressMenuHeading>
      <IressMenuItem value="2">Menu item (button)</IressMenuItem>
      <IressMenuDivider />
      <IressMenuItem href="https://iress.com">Menu item (link)</IressMenuItem>
      <IressMenuItem selected value="5">
        Menu item (selected)
      </IressMenuItem>
    </IressMenu>
  );
}
