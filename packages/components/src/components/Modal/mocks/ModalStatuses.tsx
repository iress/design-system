import { useState } from 'react';
import {
  IressButton,
  IressModal,
  IressStack,
  type IressModalProps,
} from '@/main';

const STATUSES = ['danger', 'success', 'warning'] as const;

type StatusModalProps = Omit<
  IressModalProps<'danger' | 'success' | 'warning'>,
  'id' | 'show' | 'onShowChange' | 'status'
>;

export const ModalStatuses = (args: StatusModalProps) => {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  return (
    <IressStack gap="md" horizontalAlign="left">
      {STATUSES.map((status) => (
        <IressStack gap="sm" key={status}>
          <IressButton onClick={() => setActiveModal(`status-${status}`)}>
            {status} status modal
          </IressButton>
          <IressModal
            {...args}
            id={`status-${status}`}
            status={status}
            show={activeModal === `status-${status}`}
            onShowChange={(show) => !show && setActiveModal(null)}
          />
        </IressStack>
      ))}
      <IressButton onClick={() => setActiveModal('status-md')}>
        Medium danger status modal
      </IressButton>
      <IressModal
        {...args}
        id="status-md"
        status="danger"
        size="md"
        actions={[
          { children: 'Button', fluid: true, mode: 'tertiary' },
          { children: 'Button', fluid: true },
        ]}
        show={activeModal === 'status-md'}
        onShowChange={(show) => !show && setActiveModal(null)}
      />
    </IressStack>
  );
};
