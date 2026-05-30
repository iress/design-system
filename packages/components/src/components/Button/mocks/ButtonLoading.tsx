import { IressButton, IressInline } from '@/main';

export function ButtonLoading() {
  return (
    <IressInline gap="md">
      <IressButton mode="primary" loading>
        Primary
      </IressButton>
      <IressButton mode="secondary" loading>
        Secondary
      </IressButton>
      <IressButton mode="tertiary" loading>
        Tertiary
      </IressButton>
      <IressButton mode="quaternary" loading>
        Quaternary
      </IressButton>
      <IressButton mode="muted" loading icon="edit" />
    </IressInline>
  );
}
