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
    <IressInline gap="spacing.400">
      <IressButton onClick={() => showSlideout('sm')}>sm</IressButton>
      <IressSlideout id="sm" size="sm">
        Small slideout
      </IressSlideout>
      <IressButton onClick={() => showSlideout('md')}>md</IressButton>
      <IressSlideout id="md" size="md">
        Medium slideout
      </IressSlideout>
    </IressInline>
  );
};

export const SlideoutSizes = () => (
  <IressSlideoutProvider>
    <Slideouts />
  </IressSlideoutProvider>
);
