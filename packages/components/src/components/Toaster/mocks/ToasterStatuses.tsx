import {
  IressButton,
  IressInline,
  IressToasterProvider,
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

export function ToastStatuses() {
  return (
    <IressToasterProvider container={document.body}>
      <IressInline gap="sm">
        <ToastWithTrigger status="error" />
        <ToastWithTrigger status="info" />
        <ToastWithTrigger status="success" />
      </IressInline>
    </IressToasterProvider>
  );
}
