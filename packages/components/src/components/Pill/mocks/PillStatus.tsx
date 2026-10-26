import { IressInline, IressPill } from '@/main';

export function PillStatus() {
  return (
    <IressInline gap="sm">
      <IressPill mode="danger">danger</IressPill>
      <IressPill mode="info">info</IressPill>
      <IressPill mode="success">success</IressPill>
      <IressPill mode="warning">warning</IressPill>
    </IressInline>
  );
}
