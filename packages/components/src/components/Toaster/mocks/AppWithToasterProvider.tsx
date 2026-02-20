import { IressButton, IressToasterProvider, useToaster } from '@/main';

export const App = () => (
  <IressToasterProvider>
    <ToastWithTrigger />
  </IressToasterProvider>
);

const ToastWithTrigger = () => {
  const toaster = useToaster();

  return (
    <IressButton onClick={() => toaster.success('Message sent successfully')}>
      Show toast using provider
    </IressButton>
  );
};
