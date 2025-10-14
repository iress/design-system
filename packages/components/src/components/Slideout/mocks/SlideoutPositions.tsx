import {
  IressButton,
  IressInline,
  IressSlideout,
  IressSlideoutProvider,
  SLIDEOUT_POSITIONS,
  useSlideout,
} from '@/main';

const Slideouts = () => {
  const { showSlideout } = useSlideout();

  return (
    <IressInline gutter="md">
      {SLIDEOUT_POSITIONS.map((position) => (
        <>
          <IressButton onClick={() => showSlideout(position)}>
            {position}
          </IressButton>
          <IressSlideout id={position} position={position}>
            Slideout opened on the {position}
          </IressSlideout>
        </>
      ))}
    </IressInline>
  );
};

export const SlideoutPositions = () => (
  <IressSlideoutProvider>
    <Slideouts />
  </IressSlideoutProvider>
);
