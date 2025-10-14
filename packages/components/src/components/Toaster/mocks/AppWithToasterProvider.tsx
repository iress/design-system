import {
  IressButton,
  IressToastProps,
  IressToasterProps,
  IressToasterProvider,
  useToaster,
} from '@/main';

export const App = ({
  toast: toastProps,
  ...toasterProps
}: IressToasterProps & { toast: IressToastProps }) => (
  <IressToasterProvider {...toasterProps}>
    <ToastWithTrigger {...toastProps} />
  </IressToasterProvider>
);

const ToastWithTrigger = ({ status, ...toastProps }: IressToastProps) => {
  const toaster = useToaster();

  return (
    <IressButton onClick={() => toaster[status](toastProps)}>
      Show toast using provider
    </IressButton>
  );
};
