import {
  IressButton,
  IressInline,
  IressSlideout,
  IressSlideoutProvider,
  useSlideout,
} from '@/main';

const Slideouts = () => {
  const { showSlideout } = useSlideout();

  return (
    <IressInline gap="md" horizontalAlign="between">
      <IressButton onClick={() => showSlideout('right')}>right</IressButton>
      <IressSlideout id="right" position="right">
        Slideout opened on the right
      </IressSlideout>
      <IressButton onClick={() => showSlideout('left')}>left</IressButton>
      <IressSlideout id="left" position="left">
        Slideout opened on the left
      </IressSlideout>
    </IressInline>
  );
};

export const SlideoutPositions = () => (
  <IressSlideoutProvider>
    <Slideouts />
  </IressSlideoutProvider>
);
