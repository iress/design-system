import { IressButton, IressInline, IressSlideout, useSlideout } from '@/main';

const SLIDEOUT_ID = 'slideout-footer';

export function SlideoutWithFooter() {
  const { showSlideout } = useSlideout();

  return (
    <>
      <IressButton onClick={() => showSlideout(SLIDEOUT_ID)}>
        Open slideout with footer
      </IressButton>
      <IressSlideout
        id={SLIDEOUT_ID}
        heading="Slideout with footer"
        footer={
          <IressInline gap="sm">
            <IressButton mode="primary">Save</IressButton>
            <IressButton onClick={() => showSlideout(SLIDEOUT_ID, false)}>
              Cancel
            </IressButton>
          </IressInline>
        }
      >
        The footer stays fixed at the bottom of the slideout.
      </IressSlideout>
    </>
  );
}
