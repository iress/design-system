import { IressRadio, IressStack } from '@/main';

export function RadioReadOnly() {
  return (
    <IressStack gap="sm">
      <IressRadio readOnly defaultChecked>
        Radio button
      </IressRadio>
      <IressRadio readOnly>Radio button</IressRadio>
    </IressStack>
  );
}
