import { IressInline, IressTag } from '@/main';

export function TagBordered() {
  return (
    <IressInline gap="sm">
      <IressTag bordered>No mode</IressTag>
      <IressTag mode={10} bordered>10</IressTag>
      <IressTag mode={20} bordered>20</IressTag>
      <IressTag mode={30} bordered>30</IressTag>
      <IressTag mode={40} bordered>40</IressTag>
      <IressTag mode={50} bordered>50</IressTag>
      <IressTag mode={60} bordered>60</IressTag>
      <IressTag mode={70} bordered>70</IressTag>
      <IressTag mode={80} bordered>80</IressTag>
      <IressTag mode={90} bordered>90</IressTag>
      <IressTag mode="danger" bordered>danger</IressTag>
      <IressTag mode="info" bordered>info</IressTag>
      <IressTag mode="success" bordered>success</IressTag>
      <IressTag mode="warning" bordered>warning</IressTag>
    </IressInline>
  );
}
