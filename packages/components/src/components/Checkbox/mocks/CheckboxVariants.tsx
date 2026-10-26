import { IressCheckbox, IressStack } from '@/main';

export function CheckboxVariants() {
  return (
    <IressStack gap="lg">
      <IressCheckbox variant="card" heading="Widget">
        A description of the widget
      </IressCheckbox>
      <IressCheckbox variant="touch">Touch variant</IressCheckbox>
    </IressStack>
  );
}
