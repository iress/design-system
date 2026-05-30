import { IressStack, IressText } from '@/main';

export function TextVariant() {
  return (
    <IressStack gap="md">
      <IressText textStyle="typography.heading.1">This is the typography.heading.1 text style.</IressText>
      <IressText textStyle="typography.heading.2">This is the typography.heading.2 text style.</IressText>
      <IressText textStyle="typography.heading.3">This is the typography.heading.3 text style.</IressText>
      <IressText textStyle="typography.heading.4">This is the typography.heading.4 text style.</IressText>
      <IressText textStyle="typography.heading.5">This is the typography.heading.5 text style.</IressText>
      <IressText textStyle="typography.body.sm">This is the typography.body.sm text style.</IressText>
    </IressStack>
  );
}
