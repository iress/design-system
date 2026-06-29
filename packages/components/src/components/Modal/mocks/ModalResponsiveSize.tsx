import { IressButton, IressModal, useModal } from '@/main';

const MODAL_ID = 'responsive-modal';

export function ModalResponsiveSize() {
  const { showModal } = useModal();

  return (
    <>
      <IressButton onClick={() => showModal(MODAL_ID)}>
        Show responsive modal
      </IressButton>
      <IressModal
        id={MODAL_ID}
        show={false}
        heading="Responsive modal"
        width={{ xs: 'overlay.sm', md: 'overlay.md', xxl: 'overlay.lg' }}
        footer={<IressButton>Close</IressButton>}
      >
        Resize your screen to see the modal width change between sm, md, and lg.
      </IressModal>
    </>
  );
}
