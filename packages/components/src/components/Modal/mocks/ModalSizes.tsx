import {
  IressButton,
  IressInline,
  IressModal,
  IressModalProvider,
  MODAL_SIZES,
  useModal,
} from '@/main';

const ModalWithTrigger = () => {
  const { showModal } = useModal();

  return (
    <IressInline gutter="md">
      {MODAL_SIZES.map((size) => (
        <>
          <IressButton onClick={() => showModal(size)}>{size}</IressButton>
          <IressModal id={size} size={size}>
            {size} modal
          </IressModal>
        </>
      ))}
    </IressInline>
  );
};

export const ModalSizes = () => (
  <IressModalProvider>
    <ModalWithTrigger />
  </IressModalProvider>
);
