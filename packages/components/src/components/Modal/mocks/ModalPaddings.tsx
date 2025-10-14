import {
  IressButton,
  IressInline,
  IressModal,
  IressModalProvider,
  PADDING_SIZES,
  useModal,
} from '@/main';

const ModalWithTrigger = () => {
  const { showModal } = useModal();

  return (
    <IressInline gutter="md">
      {PADDING_SIZES.map((size) => (
        <>
          <IressButton onClick={() => showModal(size)}>
            {size} padding
          </IressButton>
          <IressModal id={size} padding={size}>
            {size} padded modal
          </IressModal>
        </>
      ))}
    </IressInline>
  );
};

export const ModalPaddings = () => (
  <IressModalProvider>
    <ModalWithTrigger />
  </IressModalProvider>
);
