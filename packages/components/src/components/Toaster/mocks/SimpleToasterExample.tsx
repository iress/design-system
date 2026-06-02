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
        toaster.error({
          heading: 'Error',
          content:
            'Connection failure. Longer text description should wrap and look like this. Try to limit to 3 lines or less.',
        })
      }
    >
      Show toast using provider
    </IressButton>
  );
};

export function SimpleToasterExample() {
  return (
    <IressToasterProvider container={document.body}>
      <ToastWithTrigger />
    </IressToasterProvider>
  );
}
