import {
  IressButton,
  IressToasterProvider,
  type IressToasterProviderProps,
  type NewToast,
  type ToastStatus,
  useToaster,
} from '@/main';

export const App = ({
  toast: toastProps,
  ...toasterProps
}: IressToasterProviderProps & { toast: NewToast }) => (
  <IressToasterProvider {...toasterProps}>
    <ToastWithTrigger {...toastProps} />
  </IressToasterProvider>
);

const ToastWithTrigger = ({
  status = 'success',
  ...toastProps
}: NewToast & { status?: ToastStatus }) => {
  const toaster = useToaster();

  return (
    <IressButton onClick={() => toaster[status](toastProps)}>
      Show toast using provider
    </IressButton>
  );
};
