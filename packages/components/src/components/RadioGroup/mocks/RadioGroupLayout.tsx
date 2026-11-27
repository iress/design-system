import { IressRadio, IressRadioGroup, IressStack, IressText } from '@/main';

export function RadioGroupLayout() {
  return (
    <IressStack gap="md">
      <IressText>
        <h3>block (default)</h3>
        <IressRadioGroup layout="block" variant="touch">
          <IressRadio value="google">Google</IressRadio>
          <IressRadio value="newspaper">Newspaper</IressRadio>
          <IressRadio value="friend">Friend</IressRadio>
          <IressRadio value="other">Other</IressRadio>
        </IressRadioGroup>
      </IressText>
      <IressText>
        <h3>inline</h3>
        <IressRadioGroup layout="inline" variant="touch">
          <IressRadio value="google">Google</IressRadio>
          <IressRadio value="newspaper">Newspaper</IressRadio>
          <IressRadio value="friend">Friend</IressRadio>
          <IressRadio value="other">Other</IressRadio>
        </IressRadioGroup>
      </IressText>
      <IressText>
        <h3>inlineEqualWidth</h3>
        <IressRadioGroup layout="inlineEqualWidth" variant="touch">
          <IressRadio value="google">Google</IressRadio>
          <IressRadio value="newspaper">Newspaper</IressRadio>
          <IressRadio value="friend">Friend</IressRadio>
          <IressRadio value="other">Other</IressRadio>
        </IressRadioGroup>
      </IressText>
      <IressText>
        <h3>inlineFlex</h3>
        <IressRadioGroup layout="inlineFlex" variant="touch">
          <IressRadio value="google">Google</IressRadio>
          <IressRadio value="newspaper">Newspaper</IressRadio>
          <IressRadio value="friend">Friend</IressRadio>
          <IressRadio value="other">Other</IressRadio>
        </IressRadioGroup>
      </IressText>
      <IressText>
        <h3>stack</h3>
        <IressRadioGroup layout="stack" variant="touch">
          <IressRadio value="google">Google</IressRadio>
          <IressRadio value="newspaper">Newspaper</IressRadio>
          <IressRadio value="friend">Friend</IressRadio>
          <IressRadio value="other">Other</IressRadio>
        </IressRadioGroup>
      </IressText>
    </IressStack>
  );
}
