import {
  IressButton,
  IressToasterProvider,
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

export function ToasterTimeout() {
  return (
    <IressToasterProvider container={document.body}>
      <ToastWithTrigger />
    </IressToasterProvider>
  );
}
