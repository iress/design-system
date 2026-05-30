import { IressButton, IressIcon, IressInline, IressPill, IressStack } from '@/main';

export function ButtonSlots() {
  return (
    <IressStack gap="md">
      <IressInline gap="md">
        <IressButton prepend={<IressIcon name="home" />}>
          Prepend icon
        </IressButton>
      </IressInline>

      <IressInline gap="md">
        <IressButton append={<IressIcon name="home" />}>
          Append icon
        </IressButton>
        <IressButton append={<IressPill>+999</IressPill>}>
          Append pill
        </IressButton>
      </IressInline>

      <IressInline gap="md">
        <IressButton icon="home">Home</IressButton>
      </IressInline>
    </IressStack>
  );
}
