import {
  IressButton,
  IressInline,
  IressSlideout,
  IressSlideoutProvider,
  SLIDEOUT_SIZES,
  useSlideout,
} from '@/main';

const Slideouts = () => {
  const { showSlideout } = useSlideout();

  return (
    <IressInline gutter="md">
      {SLIDEOUT_SIZES.map((size) => (
        <>
          <IressButton onClick={() => showSlideout(size)}>{size}</IressButton>
          <IressSlideout id={size} size={size}>
            {size} slideout
          </IressSlideout>
        </>
      ))}
    </IressInline>
  );
};

export const SlideoutSizes = () => (
  <IressSlideoutProvider>
    <Slideouts />
  </IressSlideoutProvider>
);
