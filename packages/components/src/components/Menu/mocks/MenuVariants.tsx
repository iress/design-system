import { IressMenu, IressMenuItem, IressStack } from '@/main';

export function MenuVariants() {
  return (
    <IressStack gap="lg">
      <IressMenu variant="radio" defaultSelected="5">
        <IressMenuItem value="1">Option 1</IressMenuItem>
        <IressMenuItem value="2">Option 2</IressMenuItem>
        <IressMenuItem value="3">Option 3</IressMenuItem>
        <IressMenuItem value="4">Option 4</IressMenuItem>
        <IressMenuItem value="5">Option 5</IressMenuItem>
      </IressMenu>
      <IressMenu variant="subdraw" maxWidth="input.12" defaultSelected="5">
        <IressMenuItem value="1">Option 1</IressMenuItem>
        <IressMenuItem value="2">Option 2</IressMenuItem>
        <IressMenuItem value="3">Option 3</IressMenuItem>
        <IressMenuItem value="4">Option 4</IressMenuItem>
        <IressMenuItem value="5">Option 5</IressMenuItem>
      </IressMenu>
      <IressMenu variant="side" maxWidth="input.12" defaultSelected="5">
        <IressMenuItem value="1">Option 1</IressMenuItem>
        <IressMenuItem value="2">Option 2</IressMenuItem>
        <IressMenuItem value="3">Option 3</IressMenuItem>
        <IressMenuItem value="4">Option 4</IressMenuItem>
        <IressMenuItem value="5">Option 5</IressMenuItem>
      </IressMenu>
      <IressMenu variant="side" maxWidth="input.12" defaultSelected="5" numbered>
        <IressMenuItem value="1">Option 1</IressMenuItem>
        <IressMenuItem value="2">Option 2</IressMenuItem>
        <IressMenuItem value="3">Option 3</IressMenuItem>
        <IressMenuItem value="4">Option 4</IressMenuItem>
        <IressMenuItem value="5">Option 5</IressMenuItem>
      </IressMenu>
    </IressStack>
  );
}
