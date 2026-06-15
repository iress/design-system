import { IressCheckbox, IressCheckboxGroup, IressText } from '@/main';

export function CheckboxGroupLayout() {
  return (
    <IressText>
      <h3>block</h3>
      <IressCheckboxGroup layout="block">
        <IressCheckbox value="google" bg="alt">Google</IressCheckbox>
        <IressCheckbox value="newspaper" bg="alt">Newspaper</IressCheckbox>
        <IressCheckbox value="friend" bg="alt">Friend</IressCheckbox>
        <IressCheckbox value="other" bg="alt">Other</IressCheckbox>
      </IressCheckboxGroup>
      <h3>inline</h3>
      <IressCheckboxGroup layout="inline">
        <IressCheckbox value="google" bg="alt">Google</IressCheckbox>
        <IressCheckbox value="newspaper" bg="alt">Newspaper</IressCheckbox>
        <IressCheckbox value="friend" bg="alt">Friend</IressCheckbox>
        <IressCheckbox value="other" bg="alt">Other</IressCheckbox>
      </IressCheckboxGroup>
      <h3>stack</h3>
      <IressCheckboxGroup layout="stack">
        <IressCheckbox value="google" bg="alt">Google</IressCheckbox>
        <IressCheckbox value="newspaper" bg="alt">Newspaper</IressCheckbox>
        <IressCheckbox value="friend" bg="alt">Friend</IressCheckbox>
        <IressCheckbox value="other" bg="alt">Other</IressCheckbox>
      </IressCheckboxGroup>
    </IressText>
  );
}
