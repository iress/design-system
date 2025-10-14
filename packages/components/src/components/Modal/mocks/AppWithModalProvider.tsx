import {
  IressButton,
  IressModal,
  type IressModalProps,
  IressModalProvider,
  useModal,
} from '@/main';

const MODAL_ID = 'storybook-modal';

export const App = (modalProps: IressModalProps) => (
  <IressModalProvider>
    <ModalWithTrigger {...modalProps} />
  </IressModalProvider>
);

const ModalWithTrigger = ({
  id = MODAL_ID,
  ...modalProps
}: IressModalProps) => {
  const { showModal } = useModal();

  return (
    <>
      <IressButton onClick={() => showModal(id)}>
        Show modal using provider
      </IressButton>
      <IressModal
        {...modalProps}
        id={id}
        footer={
          <IressButton onClick={() => showModal(id, false)}>Close</IressButton>
        }
      >
        {modalProps.children ?? 'Modal content'}
      </IressModal>
    </>
  );
};
