import { IressStack, IressText } from '@/main';

export function TextMode() {
  return (
    <IressStack gap="md">
      <IressText color="colour.neutral.70">This is colour.neutral.70 mode.</IressText>
      <IressText color="colour.primary.text">This is colour.primary.text mode.</IressText>
      <IressText color="colour.system.danger.text">This is colour.system.danger.text mode.</IressText>
      <IressText color="colour.system.success.text">This is colour.system.success.text mode.</IressText>
      <IressText color="colour.system.warning.text">This is colour.system.warning.text mode.</IressText>
      <IressText color="colour.system.info.text">This is colour.system.info.text mode.</IressText>
      <IressText color="colour.system.danger.text">
        Nested text mode demonstration:{' '}
        <IressText>I am nested, and return to the original colour</IressText>
      </IressText>
    </IressStack>
  );
}
