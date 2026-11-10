import { IressButton, IressSlideout } from '@/main';
import { useState } from 'react';

export function SlideoutUsingState() {
  const [show, setShow] = useState(false);

  return (
    <>
      <IressButton onClick={() => setShow(true)}>
        Show slideout using state
      </IressButton>
      <IressSlideout
        show={show}
        onShowChange={setShow}
        heading="Slideout"
        footer={<IressButton onClick={() => setShow(false)}>Close</IressButton>}
      >
        This slideout was opened via state
      </IressSlideout>
    </>
  );
}
