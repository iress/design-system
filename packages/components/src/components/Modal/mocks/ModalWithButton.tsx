import { IressButton, IressModal, useModal } from '@/main';

const MODAL_ID = 'storybook-modal';

export function ModalWithButton() {
  const { showModal } = useModal();

  return (
    <>
      <IressButton onClick={() => showModal(MODAL_ID)}>Show modal</IressButton>
      <IressModal
        id={MODAL_ID}
        show={false}
        heading="Modal heading"
        footer={<IressButton>Close</IressButton>}
      >
        Modal content goes here.
      </IressModal>
    </>
  );
}
