import {
  IressButton,
  IressInline,
  IressPanel,
  IressStack,
  IressText,
  type IressToasterProps,
  IressToasterProvider,
  type IressToasterProviderProps,
  type IressToastProps,
  useToaster,
} from '@/main';
import { useState } from 'react';

const DEFAULT_TOAST: IressToastProps = {
  children: 'Message sent successfully',
  heading: 'Success',
  status: 'success',
};

const Toaster = () => {
  const [position, setPosition] =
    useState<IressToasterProps['position']>('bottom-end');
  const { status, ...toast } = DEFAULT_TOAST;
  const toaster = useToaster(position);

  const changePosition = (position: IressToasterProps['position']) => {
    setPosition(position);
    queueMicrotask(() => toaster[status](toast));
  };

  return (
    <div style={{ padding: '80px 150px' }}>
      <IressStack gutter="md">
        <IressInline horizontalAlign="between" gutter="sm">
          <IressButton onClick={() => changePosition('top-start')}>
            top-start
          </IressButton>
          <IressButton onClick={() => changePosition('top-center')}>
            top-center
          </IressButton>
          <IressButton onClick={() => changePosition('top-end')}>
            top-end
          </IressButton>
        </IressInline>
        <IressPanel background="transparent" padding="lg">
          <IressText align="center">Toaster positions</IressText>
        </IressPanel>
        <IressInline horizontalAlign="between">
          <IressButton onClick={() => changePosition('bottom-start')}>
            bottom-start
          </IressButton>
          <IressButton onClick={() => changePosition('bottom-center')}>
            bottom-center
          </IressButton>
          <IressButton onClick={() => changePosition('bottom-end')}>
            bottom-end
          </IressButton>
        </IressInline>
      </IressStack>
    </div>
  );
};

export const ToasterPositionExamples = (args: IressToasterProviderProps) => (
  <IressToasterProvider {...args}>
    <Toaster />
  </IressToasterProvider>
);
