import {
  IressButton,
  IressSlideout,
  type IressSlideoutProps,
  IressSlideoutProvider,
  useSlideout,
} from '@/main';

const SLIDEOUT_ID = 'storybook-slideout';

export function AppWithSlideoutProvider(props: Partial<IressSlideoutProps> = {}) {
  return (
    <IressSlideoutProvider>
      <SlideoutWithTrigger {...props} />
    </IressSlideoutProvider>
  );
}

function SlideoutWithTrigger({
  id = SLIDEOUT_ID,
  ...slideoutProps
}: Partial<IressSlideoutProps>) {
  const { showSlideout } = useSlideout();

  return (
    <>
      <IressButton onClick={() => showSlideout(id)}>
        Show slideout using provider
      </IressButton>
      <IressSlideout
        id={id}
        heading="Provider slideout"
        footer={
          <IressButton onClick={() => showSlideout(id, false)}>
            Close slideout
          </IressButton>
        }
        {...slideoutProps}
      >
        This slideout was opened via IressSlideoutProvider and the useSlideout
        hook.
      </IressSlideout>
    </>
  );
}
