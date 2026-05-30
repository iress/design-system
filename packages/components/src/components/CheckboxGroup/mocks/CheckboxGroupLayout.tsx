import { IressCheckbox, IressCheckboxGroup, IressText } from '@/main';

export function CheckboxGroupLayout() {
  return (
    <IressText>
      <h3>block</h3>
      <IressCheckboxGroup layout="block">
        <IressCheckbox value="google">Google</IressCheckbox>
        <IressCheckbox value="newspaper">Newspaper</IressCheckbox>
        <IressCheckbox value="friend">Friend</IressCheckbox>
        <IressCheckbox value="other">Other</IressCheckbox>
      </IressCheckboxGroup>
      <h3>inline</h3>
      <IressCheckboxGroup layout="inline">
        <IressCheckbox value="google">Google</IressCheckbox>
        <IressCheckbox value="newspaper">Newspaper</IressCheckbox>
        <IressCheckbox value="friend">Friend</IressCheckbox>
        <IressCheckbox value="other">Other</IressCheckbox>
      </IressCheckboxGroup>
      <h3>stack</h3>
      <IressCheckboxGroup layout="stack">
        <IressCheckbox value="google">Google</IressCheckbox>
        <IressCheckbox value="newspaper">Newspaper</IressCheckbox>
        <IressCheckbox value="friend">Friend</IressCheckbox>
        <IressCheckbox value="other">Other</IressCheckbox>
      </IressCheckboxGroup>
    </IressText>
  );
}
