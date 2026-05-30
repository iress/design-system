import { IressInline, IressPill } from '@/main';

export function PillMode() {
  return (
    <IressInline gap="sm">
      <IressPill mode={10}>10</IressPill>
      <IressPill mode={20}>20</IressPill>
      <IressPill mode={30}>30</IressPill>
      <IressPill mode={40}>40</IressPill>
      <IressPill mode={50}>50</IressPill>
      <IressPill mode={60}>60</IressPill>
      <IressPill mode={70}>70</IressPill>
      <IressPill mode={80}>80</IressPill>
      <IressPill mode={90}>90</IressPill>
    </IressInline>
  );
}
