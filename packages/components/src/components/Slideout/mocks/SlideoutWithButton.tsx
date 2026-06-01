import { IressButton, IressSlideout, type IressSlideoutProps } from '@/main';
import { useSlideout } from '../hooks/useSlideout';

const SLIDEOUT_ID = 'storybook-slideout';

export function SlideoutWithButton(args: Readonly<IressSlideoutProps>) {
  const { showSlideout } = useSlideout();

  return (
    <>
      <IressButton onClick={() => showSlideout(SLIDEOUT_ID)}>
        Toggle slideout
      </IressButton>
      <IressSlideout {...args} id={SLIDEOUT_ID} />
    </>
  );
}
