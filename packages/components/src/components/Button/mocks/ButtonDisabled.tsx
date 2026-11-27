import { IressButton, IressInline } from '@/main';

export function ButtonDisabled() {
  return (
    <IressInline gap="md">
      <IressButton disabled mode="primary">
        Button text
      </IressButton>
      <IressButton disabled mode="secondary">
        Button text
      </IressButton>
      <IressButton disabled mode="tertiary">
        Button text
      </IressButton>
      <IressButton disabled mode="quaternary">
        Button text
      </IressButton>
      <IressButton disabled icon="edit" mode="muted">
        Edit
      </IressButton>
    </IressInline>
  );
}
