import { IressMenu, IressMenuItem, IressText } from '@/main';

export function MenuExtraInformation() {
  return (
    <IressMenu>
      <IressMenuItem>
        <IressText>New task</IressText>
        <IressText element="small" color="colour.neutral.70">
          Modified on: 01/01/2020 00:00am
        </IressText>
      </IressMenuItem>
      <IressMenuItem>
        <IressText>Send prospect welcome pack</IressText>
        <IressText element="small" color="colour.neutral.70">
          Modified on: 01/01/2020 01:30am
        </IressText>
      </IressMenuItem>
      <IressMenuItem>
        <IressText>Book in Discovery meeting</IressText>
        <IressText element="small" color="colour.neutral.70">
          Modified on: 01/01/2020 11:59am
        </IressText>
      </IressMenuItem>
    </IressMenu>
  );
}
