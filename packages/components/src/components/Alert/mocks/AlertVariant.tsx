import { IressAlert, IressStack } from '@/main';

export function AlertVariant() {
  return (
    <IressStack gap="md">
      <IressAlert variant="sidebar" heading="Sidebar alert">
        This alert is displayed in the sidebar layout.
      </IressAlert>
      <IressAlert variant="full-width" heading="Full-width alert">
        This alert is displayed in the full-width layout.
      </IressAlert>
    </IressStack>
  );
}
