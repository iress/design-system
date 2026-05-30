import { IressAlert, IressStack } from '@/main';

export function AlertDismissable() {
  return (
    <IressStack gap="md">
      <IressAlert status="danger" onClose={() => console.log('dismissed')}>
        This danger alert can be dismissed.
      </IressAlert>
      <IressAlert status="info" onClose={() => console.log('dismissed')}>
        This info alert can be dismissed.
      </IressAlert>
      <IressAlert status="success" onClose={() => console.log('dismissed')}>
        This success alert can be dismissed.
      </IressAlert>
      <IressAlert status="warning" onClose={() => console.log('dismissed')}>
        This warning alert can be dismissed.
      </IressAlert>
      <IressAlert status="neutral" onClose={() => console.log('dismissed')}>
        This neutral alert can be dismissed.
      </IressAlert>
    </IressStack>
  );
}
