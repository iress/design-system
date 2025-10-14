import { IressButton, IressModal, IressModalProps } from '@/main';
import { useState } from 'react';

export const ModalUsingState = (args: IressModalProps) => {
  const [show, setShow] = useState(false);

  return (
    <>
      <IressButton onClick={() => setShow(true)}>
        Show modal using state
      </IressButton>
      <IressModal
        {...args}
        show={show}
        onShowChange={setShow}
        footer={<IressButton onClick={() => setShow(false)}>Close</IressButton>}
      />
    </>
  );
};
