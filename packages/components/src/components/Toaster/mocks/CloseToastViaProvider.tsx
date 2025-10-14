import {
  IressButton,
  IressInline,
  IressToasterProvider,
  IressToasterProviderProps,
  useToaster,
} from '@/main';
import { useState } from 'react';

const ToastWithTrigger = () => {
  const toaster = useToaster();
  const [lastToastId, setLastToastId] = useState<string | null>(null);

  return (
    <IressInline gutter="sm">
      <IressButton
        onClick={() => {
          const toastId = toaster.error({
            heading: 'Error',
            children:
              'Connection failure. Longer text description should wrap and look like this. Try to limit to 3 lines or less.',
            onClose: () => {
              setLastToastId(null);
            },
          });

          setLastToastId(toastId);
        }}
      >
        Show toast using provider
      </IressButton>
      {lastToastId && (
        <IressButton onClick={() => toaster.close(lastToastId)}>
          Close the last toast opened
        </IressButton>
      )}
    </IressInline>
  );
};

export const CloseToastViaProvider = (args: IressToasterProviderProps) => (
  <IressToasterProvider {...args}>
    <ToastWithTrigger />
  </IressToasterProvider>
);
