import { IressButton, IressModal, IressStack, useModal } from '@/main';

export function ModalDisableClosing() {
  const { showModal } = useModal();

  return (
    <IressStack gap="md">
      <IressButton onClick={() => showModal('disable-backdrop-click')} fluid>
        Disable backdrop click
      </IressButton>
      <IressModal
        id="disable-backdrop-click"
        show={false}
        heading="Backdrop click disabled"
        disableBackdropClick
        footer={<IressButton>Close</IressButton>}
      >
        Clicking the backdrop will not close this modal. Use the close button or
        footer button instead.
      </IressModal>

      <IressButton onClick={() => showModal('no-close-button')} fluid>
        No close button
      </IressButton>
      <IressModal
        id="no-close-button"
        show={false}
        heading="No close button"
        noCloseButton
        footer={
          <IressButton onClick={() => showModal('no-close-button', false)}>
            Close
          </IressButton>
        }
      >
        This modal has no close button in the header. Use the footer button to
        close.
      </IressModal>

      <IressButton onClick={() => showModal('both')} fluid>
        Both
      </IressButton>
      <IressModal
        id="both"
        show={false}
        heading="Fully controlled closing"
        disableBackdropClick
        noCloseButton
        footer={
          <IressButton onClick={() => showModal('both', false)}>
            Close
          </IressButton>
        }
      >
        This modal can only be closed via the footer button.
      </IressModal>
    </IressStack>
  );
}
