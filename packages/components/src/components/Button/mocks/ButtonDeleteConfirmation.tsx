import { IressButton, IressModal } from '@/main';
import { useState } from 'react';

export function ButtonDeleteConfirmation() {
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <>
      <IressButton status="danger" onClick={() => setShowConfirm(true)}>
        Delete item
      </IressButton>
      <IressModal
        heading="Confirm deletion"
        status="danger"
        show={showConfirm}
        onShowChange={setShowConfirm}
        actions={[
          {
            children: 'Cancel',
            mode: 'tertiary',
            onClick: () => setShowConfirm(false),
          },
          { children: 'Delete', onClick: () => setShowConfirm(false) },
        ]}
      >
        Are you sure you want to delete this item? This action cannot be undone.
      </IressModal>
    </>
  );
}
