import {
  IressButton,
  IressSlideout,
  IressSlideoutProvider,
  useSlideout,
} from '@/main';

const SLIDEOUT_ID = 'storybook-slideout';

export function AppWithSlideoutProvider() {
  return (
    <IressSlideoutProvider>
      <SlideoutWithTrigger />
    </IressSlideoutProvider>
  );
}

function SlideoutWithTrigger() {
  const { showSlideout } = useSlideout();

  return (
    <>
      <IressButton onClick={() => showSlideout(SLIDEOUT_ID)}>
        Show slideout using provider
      </IressButton>
      <IressSlideout
        id={SLIDEOUT_ID}
        heading="Provider slideout"
        footer={
          <IressButton onClick={() => showSlideout(SLIDEOUT_ID, false)}>
            Close slideout
          </IressButton>
        }
      >
        This slideout was opened via IressSlideoutProvider and the useSlideout
        hook.
      </IressSlideout>
    </>
  );
}
