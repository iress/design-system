import { IressPanel, IressStack, IressText, IressToggle } from '@/main';

export function ToggleLayout() {
  return (
    <IressStack gap="lg">
      <IressText>
        <h3>inline</h3>
        <IressPanel>
          <IressToggle layout="inline">Toggle</IressToggle>
        </IressPanel>
      </IressText>
      <IressText>
        <h3>inline-between</h3>
        <IressPanel>
          <IressToggle layout="inline-between" defaultChecked>
            Toggle
          </IressToggle>
        </IressPanel>
      </IressText>
      <IressText>
        <h3>inline-reverse</h3>
        <IressPanel>
          <IressToggle layout="inline-reverse">Toggle</IressToggle>
        </IressPanel>
      </IressText>
      <IressText>
        <h3>stack</h3>
        <IressPanel>
          <IressToggle layout="stack" defaultChecked>
            Toggle
          </IressToggle>
        </IressPanel>
      </IressText>
    </IressStack>
  );
}
