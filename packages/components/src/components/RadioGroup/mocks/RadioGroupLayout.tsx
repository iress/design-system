import { IressRadio, IressRadioGroup, IressStack, IressText } from '@/main';

export function RadioGroupLayout() {
  return (
    <IressStack gap="md">
      <IressText>
        <h3>block (default)</h3>
        <IressRadioGroup layout="block">
          <IressRadio value="google">Google</IressRadio>
          <IressRadio value="newspaper">Newspaper</IressRadio>
          <IressRadio value="friend">Friend</IressRadio>
          <IressRadio value="other">Other</IressRadio>
        </IressRadioGroup>
      </IressText>
      <IressText>
        <h3>inline</h3>
        <IressRadioGroup layout="inline">
          <IressRadio value="google">Google</IressRadio>
          <IressRadio value="newspaper">Newspaper</IressRadio>
          <IressRadio value="friend">Friend</IressRadio>
          <IressRadio value="other">Other</IressRadio>
        </IressRadioGroup>
      </IressText>
      <IressText>
        <h3>inlineEqualWidth</h3>
        <IressRadioGroup layout="inlineEqualWidth">
          <IressRadio value="google">Google</IressRadio>
          <IressRadio value="newspaper">Newspaper</IressRadio>
          <IressRadio value="friend">Friend</IressRadio>
          <IressRadio value="other">Other</IressRadio>
        </IressRadioGroup>
      </IressText>
      <IressText>
        <h3>inlineFlex</h3>
        <IressRadioGroup layout="inlineFlex">
          <IressRadio value="google">Google</IressRadio>
          <IressRadio value="newspaper">Newspaper</IressRadio>
          <IressRadio value="friend">Friend</IressRadio>
          <IressRadio value="other">Other</IressRadio>
        </IressRadioGroup>
      </IressText>
      <IressText>
        <h3>stack</h3>
        <IressRadioGroup layout="stack">
          <IressRadio value="google">Google</IressRadio>
          <IressRadio value="newspaper">Newspaper</IressRadio>
          <IressRadio value="friend">Friend</IressRadio>
          <IressRadio value="other">Other</IressRadio>
        </IressRadioGroup>
      </IressText>
    </IressStack>
  );
}
