import { IressIcon, IressInline, IressText } from '@/main';

export function IconRotate() {
  return (
    <IressInline gap="md">
      <IressText textAlign="center">
        <IressIcon name="home" textStyle="typography.heading.1" />
        <br />
        (default)
      </IressText>
      <IressText textAlign="center">
        <IressIcon name="home" textStyle="typography.heading.1" rotate={90} />
        <br />
        90
      </IressText>
      <IressText textAlign="center">
        <IressIcon name="home" textStyle="typography.heading.1" rotate={180} />
        <br />
        180
      </IressText>
      <IressText textAlign="center">
        <IressIcon name="home" textStyle="typography.heading.1" rotate={270} />
        <br />
        270
      </IressText>
    </IressInline>
  );
}
