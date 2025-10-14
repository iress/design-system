import {
  IressButton,
  IressInline,
  IressToasterProvider,
  IressToasterProviderProps,
  ToastStatus,
  useToaster,
} from '@/main';

const ToastWithTrigger = ({ status }: { status: ToastStatus }) => {
  const toaster = useToaster();

  return (
    <IressButton
      onClick={() =>
        toaster[status]({ content: `Hello, I am a ${status} toast` })
      }
    >
      {status}
    </IressButton>
  );
};

export const ToastStatuses = (args: IressToasterProviderProps) => (
  <IressToasterProvider {...args}>
    <IressInline gap="sm">
      <ToastWithTrigger {...args} status="error" />
      <ToastWithTrigger {...args} status="info" />
      <ToastWithTrigger {...args} status="success" />
    </IressInline>
  </IressToasterProvider>
);
