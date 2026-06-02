import { IressStack, IressButton, IressText, IressSlideout } from '@/main';
import { useRef, useState } from 'react';
import { cssVars } from '@iress-oss/ids-tokens';

export function AbsolutePositionSlideout() {
  const [show, setShow] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  return (
    <IressStack gap="md">
      <IressButton onClick={() => setShow(true)}>Show slideout</IressButton>
      <div
        ref={containerRef}
        style={{
          height: '300px',
          border: `1px solid ${cssVars.colour.neutral[30]}`,
          padding: '1rem',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <IressText id="contents">
          <h3>Absolute slideout</h3>
          <p>
            Almost before was mighty present had him time. But scorching counsel
            if mine dote men have or, one yet from pangs and for and despair
            there. If below nor but the name these deemed oh..
          </p>
        </IressText>
        <IressSlideout
          container={containerRef}
          show={show}
          onShowChange={setShow}
          eleToPush="#contents"
          position="left"
          mode="push"
          heading="Absolute slideout"
          style={
            {
              position: 'absolute',
            } as never
          }
        >
          Slideout content
        </IressSlideout>
      </div>
    </IressStack>
  );
}
