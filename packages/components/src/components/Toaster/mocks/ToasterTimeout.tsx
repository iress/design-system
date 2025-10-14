import {
  IressButton,
  IressToasterProvider,
  IressToasterProviderProps,
  useToaster,
} from '@/main';

const ToastWithTrigger = () => {
  const toaster = useToaster();

  return (
    <IressButton
      onClick={() =>
        toaster.success({
          content: 'This is a really quick toast',
          timeout: 1000,
        })
      }
    >
      1000ms timeout
    </IressButton>
  );
};

export const ToasterTimeout = (args: IressToasterProviderProps) => (
  <IressToasterProvider {...args}>
    <ToastWithTrigger />
  </IressToasterProvider>
);
