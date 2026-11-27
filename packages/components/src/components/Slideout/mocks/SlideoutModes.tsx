import {
  IressButton,
  IressInline,
  IressSlideout,
  IressSlideoutProvider,
  IressText,
  useSlideout,
} from '@/main';

function SlideoutModeExample() {
  const { showSlideout } = useSlideout();

  return (
    <IressInline gap="md">
      <IressButton onClick={() => showSlideout('overlay-example')}>
        Overlay slideout
      </IressButton>
      <IressSlideout id="overlay-example" heading="Overlay mode" mode="overlay">
        <IressText>
          The default mode. The slideout sits on top of page content.
        </IressText>
      </IressSlideout>

      <IressButton onClick={() => showSlideout('push-example')}>
        Push slideout
      </IressButton>
      <IressSlideout
        id="push-example"
        heading="Push mode"
        mode="push"
        eleToPush="#storybook-docs, html"
      >
        <IressText>
          Pushes page content aside. Requires the `eleToPush` prop with the ID
          of the element to push. Falls back to overlay on smaller screens.
        </IressText>
      </IressSlideout>
    </IressInline>
  );
}

export function SlideoutModes() {
  return (
    <IressSlideoutProvider>
      <SlideoutModeExample />
    </IressSlideoutProvider>
  );
}
