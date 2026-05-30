import { IressStack, IressText } from '@/main';

export function TextAlign() {
  return (
    <IressStack gap="md">
      <IressText textAlign="left">The quick brown fox jumps over the lazy dog</IressText>
      <IressText textAlign="center">The quick brown fox jumps over the lazy dog</IressText>
      <IressText textAlign="right">The quick brown fox jumps over the lazy dog</IressText>
      <IressText textAlign="justify">The quick brown fox jumps over the lazy dog</IressText>
      <IressText textAlign="inherit">The quick brown fox jumps over the lazy dog</IressText>
    </IressStack>
  );
}
