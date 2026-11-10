import { IressInline, IressTag } from '@/main';

export function TagMode() {
  return (
    <IressInline gap="sm">
      <IressTag mode={10}>10</IressTag>
      <IressTag mode={20}>20</IressTag>
      <IressTag mode={30}>30</IressTag>
      <IressTag mode={40}>40</IressTag>
      <IressTag mode={50}>50</IressTag>
      <IressTag mode={60}>60</IressTag>
      <IressTag mode={70}>70</IressTag>
      <IressTag mode={80}>80</IressTag>
      <IressTag mode={90}>90</IressTag>
    </IressInline>
  );
}
