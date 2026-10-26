import { IressButton, IressInline } from '@/main';

export function ButtonActive() {
  return (
    <IressInline gap="md">
      <IressButton mode="primary" active>
        Active Primary
      </IressButton>
      <IressButton mode="secondary" active>
        Active Secondary
      </IressButton>
      <IressButton mode="tertiary" active>
        Active Tertiary
      </IressButton>
      <IressButton mode="quaternary" active>
        Active Quaternary
      </IressButton>
      <IressButton mode="muted" icon="more_vert" active>
        More actions
      </IressButton>
    </IressInline>
  );
}
