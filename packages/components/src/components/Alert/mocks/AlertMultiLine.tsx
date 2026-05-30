import { IressAlert, IressStack } from '@/main';

export function AlertMultiLine() {
  return (
    <IressStack gap="md">
      <IressAlert status="danger" multiLine heading="Error">
        A detailed error message that spans multiple lines to provide more
        context about what went wrong and how to fix it.
      </IressAlert>
      <IressAlert status="info" multiLine heading="Information">
        Here is some detailed information that requires more space to explain the
        context fully.
      </IressAlert>
      <IressAlert status="success" multiLine heading="Success">
        Your operation completed successfully. Here are the details of what was
        processed.
      </IressAlert>
      <IressAlert status="warning" multiLine heading="Warning">
        Please be aware of the following important details before proceeding with
        this action.
      </IressAlert>
      <IressAlert status="neutral" multiLine heading="Note">
        This is a neutral multi-line alert with additional context for the user.
      </IressAlert>
    </IressStack>
  );
}
