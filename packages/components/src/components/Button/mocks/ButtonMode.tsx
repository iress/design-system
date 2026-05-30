import { IressButton, IressInline } from '@/main';

export function ButtonMode() {
  return (
    <IressInline gap="md">
      <IressButton mode="primary">Primary button</IressButton>
      <IressButton mode="secondary">Secondary button</IressButton>
      <IressButton mode="tertiary">Tertiary button</IressButton>
      <IressButton mode="quaternary">Quaternary button</IressButton>
      <IressButton mode="muted" icon="share">
        Share
      </IressButton>
    </IressInline>
  );
}
