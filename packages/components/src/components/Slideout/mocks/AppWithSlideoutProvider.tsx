import {
  IressButton,
  IressSlideout,
  type IressSlideoutProps,
  IressSlideoutProvider,
  useSlideout,
} from '@/main';

const SLIDEOUT_ID = 'storybook-slideout';

export const App = (slideoutProps: IressSlideoutProps) => (
  <IressSlideoutProvider>
    <SlideoutWithTrigger {...slideoutProps} />
  </IressSlideoutProvider>
);

const SlideoutWithTrigger = ({
  id = SLIDEOUT_ID,
  ...slideoutProps
}: IressSlideoutProps) => {
  const { showSlideout } = useSlideout();

  return (
    <>
      <IressButton onClick={() => showSlideout(id)}>
        Show slideout using provider
      </IressButton>
      <IressSlideout
        {...slideoutProps}
        id={id}
        footer={
          <IressButton onClick={() => showSlideout(id, false)}>
            Close slideout
          </IressButton>
        }
      >
        {slideoutProps.children ?? 'Slideout content'}
      </IressSlideout>
    </>
  );
};
