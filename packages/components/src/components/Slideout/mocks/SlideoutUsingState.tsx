import { IressButton, IressSlideout, IressSlideoutProps } from '@/main';
import { useState } from 'react';

export const SlideoutUsingState = (args: IressSlideoutProps) => {
  const [show, setShow] = useState(false);

  return (
    <>
      <IressButton onClick={() => setShow(true)}>
        Show slideout using state
      </IressButton>
      <IressSlideout
        {...args}
        show={show}
        onShowChange={setShow}
        footer={<IressButton onClick={() => setShow(false)}>Close</IressButton>}
      />
    </>
  );
};
