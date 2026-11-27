import { IressInline, IressTag } from '@/main';

export function TagStatus() {
  return (
    <IressInline gap="sm">
      <IressTag mode="danger">danger</IressTag>
      <IressTag mode="info">info</IressTag>
      <IressTag mode="success">success</IressTag>
      <IressTag mode="warning">warning</IressTag>
    </IressInline>
  );
}
