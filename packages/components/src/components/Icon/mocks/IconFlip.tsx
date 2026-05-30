import { IressIcon, IressInline, IressStack, IressText } from '@/main';

export function IconFlip() {
  return (
    <IressInline gap="md">
      <IressStack horizontalAlign="center">
        <IressIcon name="home" textStyle="typography.heading.1" />
        <IressText>(default)</IressText>
      </IressStack>
      <IressStack horizontalAlign="center">
        <IressIcon name="home" textStyle="typography.heading.1" flip="horizontal" />
        <IressText>horizontal</IressText>
      </IressStack>
      <IressStack horizontalAlign="center">
        <IressIcon name="home" textStyle="typography.heading.1" flip="vertical" />
        <IressText>vertical</IressText>
      </IressStack>
      <IressStack horizontalAlign="center">
        <IressIcon name="home" textStyle="typography.heading.1" flip="both" />
        <IressText>both</IressText>
      </IressStack>
    </IressInline>
  );
}
