import { IressButton, IressModal, type IressModalProps } from '@/main';
import { useModal } from '../hooks/useModal';

const MODAL_ID = 'storybook-modal';

export function ModalWithButton(args: Readonly<IressModalProps>) {
  const { showModal } = useModal();

  return (
    <>
      <IressButton onClick={() => showModal(MODAL_ID)}>Show modal</IressButton>
      <IressModal {...args} id={MODAL_ID} show={false} />
    </>
  );
}
