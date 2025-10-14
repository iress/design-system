import {
  IressButton,
  IressInline,
  IressToastProps,
  IressToasterProps,
  IressToasterProvider,
  TOAST_STATUS,
  useToaster,
} from '@/main';

const ToastWithTrigger = ({ status }: Pick<IressToastProps, 'status'>) => {
  const toaster = useToaster();

  return (
    <IressButton
      onClick={() =>
        toaster[status]({ children: `Hello, I am a ${status} toast` })
      }
    >
      {status}
    </IressButton>
  );
};

export const ToastStatuses = (args: IressToasterProps) => (
  <IressToasterProvider {...args}>
    <IressInline gutter="sm">
      {TOAST_STATUS.map((status) => (
        <ToastWithTrigger {...args} status={status} />
      ))}
    </IressInline>
  </IressToasterProvider>
);
