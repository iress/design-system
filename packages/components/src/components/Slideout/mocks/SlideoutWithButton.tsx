import { IressButton, IressSlideout } from '@/main';
import { useSlideout } from '../hooks/useSlideout';

const SLIDEOUT_ID = 'storybook-slideout';

export function SlideoutWithButton() {
  const { showSlideout } = useSlideout();

  return (
    <>
      <IressButton onClick={() => showSlideout(SLIDEOUT_ID)}>
        Toggle slideout
      </IressButton>
      <IressSlideout id={SLIDEOUT_ID} heading="Slideout">
        Slideout content
      </IressSlideout>
    </>
  );
}
