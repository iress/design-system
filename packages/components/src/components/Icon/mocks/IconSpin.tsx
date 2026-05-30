import { IressIcon, IressInline, IressText } from '@/main';

export function IconSpin() {
  return (
    <IressInline gap="md">
      <IressText>
        <IressIcon name="spinner" screenreaderText="Loading..." spin="half" /> half
      </IressText>
      <IressText>
        <IressIcon name="spinner" screenreaderText="Loading..." spin={1} /> 1
      </IressText>
      <IressText>
        <IressIcon name="spinner" screenreaderText="Loading..." spin={2} /> 2
      </IressText>
      <IressText>
        <IressIcon name="spinner" screenreaderText="Loading..." spin={3} /> 3
      </IressText>
    </IressInline>
  );
}
