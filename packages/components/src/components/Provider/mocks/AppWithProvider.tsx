import {
  IressButton,
  IressInline,
  IressModal,
  IressPanel,
  IressProvider,
  IressSlideout,
  IressText,
  useModal,
  useSlideout,
  useToaster,
} from '@/main';

const Page = () => {
  const { showModal } = useModal();
  const { showSlideout } = useSlideout();
  const toaster = useToaster();

  return (
    <IressPanel
      bg="alt"
      style={{
        height: '300px',
      }}
    >
      <IressInline gap="md">
        <IressButton onClick={() => showModal('test-modal')}>
          Show modal
        </IressButton>
        <IressModal id="test-modal">
          <IressText>Some modal content</IressText>
        </IressModal>
        <IressButton onClick={() => showSlideout('test-slideout')}>
          Show slideout
        </IressButton>
        <IressSlideout id="test-slideout">
          <IressText>Some slideout content</IressText>
        </IressSlideout>
        <IressButton
          onClick={() => toaster.success({ content: 'A toast message' })}
        >
          Show toast
        </IressButton>
      </IressInline>
    </IressPanel>
  );
};

export const AppWithProvider = () => (
  <IressProvider>
    <Page />
  </IressProvider>
);
