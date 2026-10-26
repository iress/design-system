import { useState } from 'react';
import { IressButton, IressModal, IressStack } from '@/main';

const STATUSES = ['danger', 'success', 'warning'] as const;

export function ModalStatuses() {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  return (
    <IressStack gap="md" horizontalAlign="left">
      {STATUSES.map((status) => (
        <IressStack gap="sm" key={status}>
          <IressButton onClick={() => setActiveModal(`status-${status}`)}>
            {status} status modal
          </IressButton>
          <IressModal
            id={`status-${status}`}
            heading={`${status} modal`}
            status={status}
            show={activeModal === `status-${status}`}
            onShowChange={(show) => !show && setActiveModal(null)}
          >
            This is a {status} status modal.
          </IressModal>
        </IressStack>
      ))}
      <IressButton onClick={() => setActiveModal('status-md')}>
        Medium danger status modal
      </IressButton>
      <IressModal
        id="status-md"
        heading="Danger modal"
        status="danger"
        size="md"
        actions={[
          { children: 'Button', fluid: true, mode: 'tertiary' },
          { children: 'Button', fluid: true },
        ]}
        show={activeModal === 'status-md'}
        onShowChange={(show) => !show && setActiveModal(null)}
      >
        This is a medium danger status modal with actions.
      </IressModal>
    </IressStack>
  );
}
