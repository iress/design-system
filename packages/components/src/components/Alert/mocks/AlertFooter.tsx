import { IressAlert, IressStack } from '@/main';

export function AlertFooter() {
  return (
    <IressStack gap="md">
      <IressAlert
        status="danger"
        heading="Alert heading"
        onClose={() => console.log('dismissed')}
        actions={[
          { children: 'Action', mode: 'secondary' },
          { children: 'Action', mode: 'tertiary' },
        ]}
      >
        Are you sure you want to proceed with this action?
      </IressAlert>
      <IressAlert
        status="info"
        heading="Alert heading"
        actions={[{ children: 'Learn more' }]}
      >
        A new version is available.
      </IressAlert>
    </IressStack>
  );
}
