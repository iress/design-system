import { IressButton, IressInline, IressStack } from '@/main';

export function ButtonStatus() {
  return (
    <IressStack gap="md">
      <IressInline gap="md">
        <IressButton mode="primary" status="success">
          Primary
        </IressButton>
        <IressButton mode="secondary" status="success">
          Secondary
        </IressButton>
        <IressButton mode="tertiary" status="success">
          Tertiary
        </IressButton>
        <IressButton mode="quaternary" status="success">
          Quaternary
        </IressButton>
        <IressButton mode="muted" status="success" icon="shopping_cart">
          Add to cart
        </IressButton>
      </IressInline>
      <IressInline gap="md">
        <IressButton mode="primary" status="danger">
          Primary
        </IressButton>
        <IressButton mode="secondary" status="danger">
          Secondary
        </IressButton>
        <IressButton mode="tertiary" status="danger">
          Tertiary
        </IressButton>
        <IressButton mode="quaternary" status="danger">
          Quaternary
        </IressButton>
        <IressButton mode="muted" status="danger" icon="delete">
          Delete
        </IressButton>
      </IressInline>
    </IressStack>
  );
}
