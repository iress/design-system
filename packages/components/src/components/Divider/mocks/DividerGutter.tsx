import { IressDivider, IressInline, IressPanel, IressStack, IressText } from '@/main';

export function DividerGutter() {
  return (
    <IressInline gap="spacing.4">
      <IressPanel>
        <IressText element="h2"><code>my="none"</code></IressText>
        <IressText>Separate</IressText>
        <IressDivider my="none" />
        <IressText>this</IressText>
      </IressPanel>
      <IressPanel>
        <IressText element="h2"><code>my="xs"</code></IressText>
        <IressText>Separate</IressText>
        <IressDivider my="xs" />
        <IressText>this</IressText>
      </IressPanel>
      <IressPanel>
        <IressText element="h2"><code>my="sm"</code></IressText>
        <IressText>Separate</IressText>
        <IressDivider my="sm" />
        <IressText>this</IressText>
      </IressPanel>
      <IressPanel>
        <IressText element="h2"><code>my="md"</code></IressText>
        <IressText>Separate</IressText>
        <IressDivider my="md" />
        <IressText>this</IressText>
      </IressPanel>
      <IressPanel>
        <IressText element="h2"><code>my="lg"</code></IressText>
        <IressText>Separate</IressText>
        <IressDivider my="lg" />
        <IressText>this</IressText>
      </IressPanel>
      <IressPanel>
        <IressText element="h2"><code>my="xl"</code></IressText>
        <IressText>Separate</IressText>
        <IressDivider my="xl" />
        <IressText>this</IressText>
      </IressPanel>
    </IressInline>
  );
}
