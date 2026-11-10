import { IressButton, IressModal } from '@/main';
import { useState } from 'react';

export function ModalUsingState() {
  const [show, setShow] = useState(false);

  return (
    <>
      <IressButton onClick={() => setShow(true)}>
        Show modal using state
      </IressButton>
      <IressModal
        heading="Modal heading"
        show={show}
        onShowChange={setShow}
        footer={<IressButton onClick={() => setShow(false)}>Close</IressButton>}
      >
        Modal content goes here.
      </IressModal>
    </>
  );
}
