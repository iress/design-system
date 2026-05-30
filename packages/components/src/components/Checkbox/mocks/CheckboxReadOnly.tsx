import { IressCheckbox, IressStack } from '@/main';

export function CheckboxReadOnly() {
  return (
    <IressStack>
      <IressCheckbox readOnly value="readOnly" defaultChecked>
        I agree to the terms and conditions
      </IressCheckbox>
      <IressCheckbox readOnly value="readOnly">
        I agree to the terms and conditions
      </IressCheckbox>
    </IressStack>
  );
}
