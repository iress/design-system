import { IressIcon, IressInline, IressText } from '@/main';

export function IconFilled() {
  return (
    <IressInline gap="md">
      <IressText textAlign="center">
        <IressIcon name="favorite" textStyle="typography.heading.1" />
        <br />
        (default)
      </IressText>
      <IressText textAlign="center">
        <IressIcon name="favorite" filled textStyle="typography.heading.1" />
        <br />
        filled
      </IressText>
    </IressInline>
  );
}
