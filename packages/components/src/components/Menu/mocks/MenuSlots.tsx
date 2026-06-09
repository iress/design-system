import {
  IressIcon,
  IressMenu,
  IressMenuHeading,
  IressMenuItem,
  IressPill,
} from '@/main';

export function MenuSlots() {
  return (
    <IressMenu role="menu">
      <IressMenuHeading prepend={<IressIcon name="cog" />}>
        Prepend slot
      </IressMenuHeading>
      <IressMenuItem prepend={<IressIcon name="file-alt" />}>
        New file
      </IressMenuItem>
      <IressMenuItem divider prepend={<IressIcon name="save" />}>
        Save file as
      </IressMenuItem>
      <IressMenuHeading append={<IressIcon name="link" />}>
        Append slot
      </IressMenuHeading>
      <IressMenuItem
        href="https://www.iress.com"
        append={<IressIcon name="chevron-right" />}
      >
        Visit the Iress website
      </IressMenuItem>
      <IressMenuItem href="https://google.com" append={<IressPill>8+</IressPill>}>
        Visit Google
      </IressMenuItem>
    </IressMenu>
  );
}
