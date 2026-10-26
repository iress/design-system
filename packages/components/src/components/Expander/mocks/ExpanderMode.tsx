import { IressExpander, IressStack, IressText } from '@/main';

export function ExpanderMode() {
  return (
    <IressStack gap="lg">
      <IressStack gap="xs">
        <IressText element="h2">Section (default)</IressText>
        <IressExpander activator="Expander activator" mode="section">
          Expander content will go here
        </IressExpander>
      </IressStack>
      <IressStack gap="xs">
        <IressText element="h2">Link</IressText>
        <IressExpander activator="Expander activator" mode="link">
          Expander content will go here
        </IressExpander>
      </IressStack>
    </IressStack>
  );
}
