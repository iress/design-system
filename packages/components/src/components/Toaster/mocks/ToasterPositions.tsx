import {
  IressButton,
  IressInline,
  IressPanel,
  IressStack,
  IressText,
  IressToasterProvider,
  IressToasterProviderProps,
  NewToast,
  useToaster,
} from '@/main';

const DEFAULT_TOAST: NewToast = {
  content: 'Message sent successfully',
  heading: 'Success',
  status: 'success',
};

const Toaster = () => {
  const topStart = useToaster('top-start');
  const topCenter = useToaster('top-center');
  const topEnd = useToaster('top-end');
  const bottomStart = useToaster('bottom-start');
  const bottomCenter = useToaster('bottom-center');
  const bottomEnd = useToaster('bottom-end');

  return (
    <div style={{ padding: '80px 150px' }}>
      <IressStack gap="md">
        <IressInline horizontalAlign="between" gap="sm">
          <IressButton onClick={() => topStart.success(DEFAULT_TOAST)}>
            top-start
          </IressButton>
          <IressButton onClick={() => topCenter.success(DEFAULT_TOAST)}>
            top-center
          </IressButton>
          <IressButton onClick={() => topEnd.success(DEFAULT_TOAST)}>
            top-end
          </IressButton>
        </IressInline>
        <IressPanel bg="transparent" p="lg">
          <IressText textAlign="center">Toaster positions</IressText>
        </IressPanel>
        <IressInline horizontalAlign="between">
          <IressButton onClick={() => bottomStart.success(DEFAULT_TOAST)}>
            bottom-start
          </IressButton>
          <IressButton onClick={() => bottomCenter.success(DEFAULT_TOAST)}>
            bottom-center
          </IressButton>
          <IressButton onClick={() => bottomEnd.success(DEFAULT_TOAST)}>
            bottom-end
          </IressButton>
        </IressInline>
      </IressStack>
    </div>
  );
};

export const ToasterPositionExamples = (args: IressToasterProviderProps) => (
  <IressToasterProvider {...args} id="bottom-end" position="bottom-end">
    <IressToasterProvider {...args} id="bottom-center" position="bottom-center">
      <IressToasterProvider {...args} id="bottom-start" position="bottom-start">
        <IressToasterProvider {...args} id="top-start" position="top-start">
          <IressToasterProvider {...args} id="top-center" position="top-center">
            <IressToasterProvider {...args} id="top-end" position="top-end">
              <Toaster />
            </IressToasterProvider>
          </IressToasterProvider>
        </IressToasterProvider>
      </IressToasterProvider>
    </IressToasterProvider>
  </IressToasterProvider>
);
