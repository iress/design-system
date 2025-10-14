import {
  IressButton,
  IressInline,
  IressSlideout,
  IressSlideoutProvider,
  PADDING_SIZES,
  useSlideout,
} from '@/main';

const Slideouts = () => {
  const { showSlideout } = useSlideout();

  return (
    <IressInline gutter="md">
      {PADDING_SIZES.map((padding) => (
        <>
          <IressButton onClick={() => showSlideout(padding)}>
            {padding}
          </IressButton>
          <IressSlideout id={padding} padding={padding}>
            Slideout opened with {padding} padding
          </IressSlideout>
        </>
      ))}
    </IressInline>
  );
};

export const SlideoutPaddings = () => (
  <IressSlideoutProvider>
    <Slideouts />
  </IressSlideoutProvider>
);
