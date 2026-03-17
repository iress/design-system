import { useState } from 'react';
import {
  IressAlert,
  IressButton,
  IressModal,
  IressText,
  IressToasterProvider,
  useToaster,
} from '@/main';
import { useRecommendation } from './RecommendationContext';

const ToastExample = () => {
  const toaster = useToaster();

  return (
    <>
      <IressText mb="sm">
        Toasts are ideal for brief, transient confirmations of completed
        actions. They auto-dismiss and should not contain critical information.
      </IressText>
      <IressButton
        onClick={() =>
          toaster.success({
            heading: 'Record saved',
            content: 'Your changes have been saved successfully.',
          })
        }
        alignSelf="start"
      >
        Save record
      </IressButton>
    </>
  );
};

const ModalExample = () => {
  const [show, setShow] = useState(false);

  return (
    <>
      <IressText mb="sm">
        Modals block interaction with the page and require the user to make a
        decision or complete a task before continuing.
      </IressText>
      <IressButton onClick={() => setShow(true)} alignSelf="start">
        Delete record
      </IressButton>
      <IressModal
        show={show}
        onShowChange={setShow}
        heading="Discard unsaved changes?"
        status="warning"
        actions={[
          { children: 'Discard', mode: 'tertiary' },
          { children: 'Keep editing' },
        ]}
      >
        You have unsaved changes that will be lost if you leave this page.
      </IressModal>
    </>
  );
};

export const FeedbackExample = () => {
  const recommendation = useRecommendation();

  if (recommendation === 'alert') {
    return (
      <>
        <IressText mb="sm">
          Alerts display inline with content and persist on the page. They are
          ideal for contextual messages the user can act on at their own pace.
        </IressText>
        <IressAlert status="info" heading="This record is read-only">
          You do not have permission to edit this record. Contact your
          administrator to request access.
        </IressAlert>
      </>
    );
  }

  if (recommendation === 'toast') {
    return (
      <IressToasterProvider>
        <ToastExample />
      </IressToasterProvider>
    );
  }

  if (recommendation === 'modal') {
    return <ModalExample />;
  }

  return null;
};
