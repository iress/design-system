import { IressRadio, IressStack } from '@/main';

export function RadioVariants() {
  return (
    <IressStack gap="lg">
      <IressRadio variant="card" heading="Widget">
        A description of the widget
      </IressRadio>
      <IressRadio variant="touch">Touch variant</IressRadio>
    </IressStack>
  );
}
