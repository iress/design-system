import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
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
      <IressButton onClick={() => success({ content: 'This is a toast!' })}>
        Show toast
      </IressButton>
    </>
  );
};

describe('IressProvider', () => {
  afterEach(() => {
    document.head
      .querySelectorAll('link[data-material-icons-subset]')
      .forEach((el) => el.remove());
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
    describe('noIconProvider', () => {
      it('does not render IconProvider when true', () => {
        const { container } = render(
          <IressProvider noIconProvider>
            <span>test</span>
          </IressProvider>,
        );

        expect(container).toHaveTextContent('test');
        // Verify no icon font link was injected by IconProvider
        expect(
          document.head.querySelector('link[data-material-icons-subset]'),
        ).toBeNull();
      });
    });

    describe('zIndexOffset', () => {
      afterEach(() => {
        document.documentElement.style.removeProperty('--iress-zindex-offset');
      });

      it('sets --iress-zindex-offset on :root when provided', () => {
        render(
          <IressProvider zIndexOffset={1000}>
            <span>test</span>
          </IressProvider>,
        );

        expect(
          document.documentElement.style.getPropertyValue(
            '--iress-zindex-offset',
          ),
        ).toBe('1000');
      });

      it('removes --iress-zindex-offset from :root on unmount', () => {
        const { unmount } = render(
          <IressProvider zIndexOffset={1000}>
            <span>test</span>
          </IressProvider>,
        );

        unmount();

        expect(
          document.documentElement.style.getPropertyValue(
            '--iress-zindex-offset',
          ),
        ).toBe('');
      });
    });

    describe('toasterOffset', () => {
      afterEach(() => {
        document.documentElement.style.removeProperty('--iress-toaster-offset');
      });

      it('sets --iress-toaster-offset on :root when provided', () => {
        render(
          <IressProvider toasterOffset="60px">
            <span>test</span>
          </IressProvider>,
        );

        expect(
          document.documentElement.style.getPropertyValue(
            '--iress-toaster-offset',
          ),
        ).toBe('60px');
      });

      it('removes --iress-toaster-offset from :root on unmount', () => {
        const { unmount } = render(
          <IressProvider toasterOffset="60px">
            <span>test</span>
          </IressProvider>,
        );

        unmount();

        expect(
          document.documentElement.style.getPropertyValue(
            '--iress-toaster-offset',
          ),
        ).toBe('');
      });
    });
  });
});
