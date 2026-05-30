import { IressAlert, IressStack } from '@/main';

export function AlertStatus() {
  return (
    <IressStack gap="md">
      <IressAlert status="danger">
        This is a simple danger alert. It is used for errors and malfunctions
        that must be resolved before moving forward, such as a summary of errors
        to correct in a Form.
      </IressAlert>
      <IressAlert status="info">
        This is a simple info alert. It is used to provide context around a
        situation, such as rules around creating a compliant password, or a link
        to feature documentation or onboarding tips.
      </IressAlert>
      <IressAlert status="success">
        This is a simple success alert. It is used to communicate that an action
        has been successfully completed, such as saving changes in a Form.
      </IressAlert>
      <IressAlert status="warning">
        This is a simple warning alert. It is used for a message requiring
        attention but not resolution in order to continue, such as noting data is
        not current or your password is about to expire.
      </IressAlert>
      <IressAlert status="neutral">
        This is a simple neutral alert. It is normally used for general
        information that does not fit into the other categories, such as a note
        about requesting cookie consent, advertising a new feature or an upcoming
        change.
      </IressAlert>
    </IressStack>
  );
}
