import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import {
  IressButton,
  IressModal,
  IressSlideout,
  useModal,
  useSlideout,
  useToaster,
} from '@/main';
import userEvent from '@testing-library/user-event';
import { IressProvider } from './Provider';

const App = () => {
  const { showModal } = useModal();
  const { showSlideout } = useSlideout();
  const { success } = useToaster();

  return (
    <>
      <IressButton onClick={() => showModal('test-modal')}>
        Show modal
      </IressButton>
      <IressModal id="test-modal">Some modal content</IressModal>
      <IressButton onClick={() => showSlideout('test-slideout')}>
        Show slideout
      </IressButton>
      <IressSlideout id="test-slideout" role="complementary">
        Some slideout content
      </IressSlideout>
      <IressButton onClick={() => success({ children: 'This is a toast!' })}>
        Show toast
      </IressButton>
    </>
  );
};

describe('IressProvider', () => {
  it('adds icons', () => {
    render(<IressProvider />);

    expect(document.head.innerHTML).toContain(
      'https://cdn.iress.com/icons/5.15.4/css/combined.min.css',
    );
  });

  it('adds providers', async () => {
    render(
      <IressProvider>
        <App />
      </IressProvider>,
    );

    const triggerModal = screen.getByRole('button', { name: 'Show modal' });
    expect(screen.queryByText('Some modal content')).not.toBeInTheDocument();
    await userEvent.click(triggerModal);

    const modalContent = await screen.findByText('Some modal content');

    expect(modalContent).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: 'Close button' }));
    await waitForElementToBeRemoved(modalContent);

    const triggerSlideout = screen.getByRole('button', {
      name: 'Show slideout',
    });
    expect(screen.queryByText('Some slideout content')).not.toBeInTheDocument();
    await userEvent.click(triggerSlideout);

    const slideoutContent = await screen.findByText('Some slideout content');
    expect(slideoutContent).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: 'Close' }));
    await waitForElementToBeRemoved(slideoutContent);

    const triggerToast = screen.getByRole('button', {
      name: 'Show toast',
    });
    await userEvent.click(triggerToast);

    const toastContent = await screen.findByText('This is a toast!');
    expect(toastContent).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: 'Dismiss' }));
    await waitForElementToBeRemoved(toastContent);
  });

  describe('props', () => {
    describe('container', () => {
      it('renders modals, toasts and slideouts in the container', async () => {
        const container = document.createElement('div');

        render(
          <IressProvider container={container}>
            <App />
          </IressProvider>,
        );

        const triggerModal = screen.getByRole('button', { name: 'Show modal' });
        await userEvent.click(triggerModal);

        await waitFor(() =>
          expect(container.querySelector('[role="dialog"]')).not.toBeNull(),
        );
      });
    });

    describe('noIcons', () => {
      it('does not render icons into the head', () => {
        render(<IressProvider noIcons />);

        expect(document.head.innerHTML).not.toContain(
          'https://cdn.iress.com/icons/5.15.4/css/combined.min.css',
        );
      });
    });
  });
});
