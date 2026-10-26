import { IressMenu, IressMenuItem, IressStack, IressText } from '@/main';

export function MenuLayout() {
  return (
    <IressStack gap="lg">
      <IressText>
        <h3>Stack (default)</h3>
        <IressMenu layout="stack" defaultSelected="1">
          <IressMenuItem value="1">Option 1</IressMenuItem>
          <IressMenuItem value="2">Option 2</IressMenuItem>
          <IressMenuItem value="3">Option 3</IressMenuItem>
          <IressMenuItem value="4">Option 4</IressMenuItem>
          <IressMenuItem value="5">Option 5</IressMenuItem>
        </IressMenu>
      </IressText>
      <IressText>
        <h3>Inline</h3>
        <IressMenu layout="inline" defaultSelected="1">
          <IressMenuItem value="1">Option 1</IressMenuItem>
          <IressMenuItem value="2">Option 2</IressMenuItem>
          <IressMenuItem value="3">Option 3</IressMenuItem>
          <IressMenuItem value="4">Option 4</IressMenuItem>
          <IressMenuItem value="5">Option 5</IressMenuItem>
        </IressMenu>
      </IressText>
      <IressText>
        <h3>Inline Equal Width</h3>
        <IressMenu layout="inline-equal-width" defaultSelected="1">
          <IressMenuItem value="1">Option 1</IressMenuItem>
          <IressMenuItem value="2">Option 2</IressMenuItem>
          <IressMenuItem value="3">Option 3</IressMenuItem>
          <IressMenuItem value="4">Option 4</IressMenuItem>
          <IressMenuItem value="5">Option 5</IressMenuItem>
        </IressMenu>
      </IressText>
    </IressStack>
  );
}
