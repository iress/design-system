import {
  IressButton,
  IressModal,
  IressModalProvider,
  IressToasterProvider,
  type IressToasterProviderProps,
  useModal,
  useToaster,
} from '@/main';

const MODAL_ID = 'toaster-modal-repro';

const ToastFromModalTrigger = () => {
  const { showModal } = useModal();
  const toaster = useToaster();

  return (
    <>
      <IressButton onClick={() => showModal(MODAL_ID)}>Show modal</IressButton>
      <IressModal id={MODAL_ID} heading="Scenario" footer="Footer slot">
        <IressButton
          onClick={() =>
            toaster.error({
              heading: 'Could not create Scenario',
              content: 'Open a toast while this modal is visible.',
            })
          }
        >
          Trigger error toast
        </IressButton>
      </IressModal>
    </>
  );
};

export const ToasterWithModal = (args: IressToasterProviderProps) => (
  <IressModalProvider>
    <IressToasterProvider {...args}>
      <ToastFromModalTrigger />
    </IressToasterProvider>
  </IressModalProvider>
);
