import {
  IressButton,
  IressInline,
  IressToasterProvider,
  type IressToasterProviderProps,
  useToaster,
} from '@/main';

const ToastWithTrigger = ({
  status,
}: {
  status: 'error' | 'success' | 'info';
}) => {
  const toaster = useToaster();

  return (
    <IressButton
      onClick={() =>
        toaster[status]({
          heading: `${status[0].toUpperCase() + status.slice(1)} toast`,
          content: `Hello, I am a ${status} toast`,
          actions: [
            { onClick: () => alert('Action clicked!'), children: 'Click me' },
          ],
        })
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
