import {
  RenderResult,
  act,
  fireEvent,
  render,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { axe } from 'jest-axe';
import userEvent from '@testing-library/user-event';
import { idsLogger } from '@helpers/utility/idsLogger';
import { App as AppWithModalProvider } from './mocks/AppWithModalProvider';
import {
  GlobalCSSClass,
  IressModal,
  IressModalProps,
  IressModalProvider,
  IressModalProviderProps,
  modal,
  text,
  IressToasterProvider,
  useModal,
  useToaster,
} from '@/main';

const TEST_ID = 'test-component';

function renderComponent(
  { children, ...restProps }: Partial<IressModalProps> = {},
  renderFn: typeof render = render,
): RenderResult {
  return renderFn(
    <IressModal
      {...restProps}
      id={restProps?.id ?? TEST_ID}
      data-testid={TEST_ID}
    >
      {children ?? TEST_ID}
    </IressModal>,
  );
}

function renderComponentInProvider(
  { children, ...restProps }: Partial<IressModalProps> = {},
  providerProps?: IressModalProviderProps,
  renderFn: typeof render = render,
): RenderResult {
  return renderFn(
    <IressModalProvider {...providerProps}>
      <IressModal
        {...restProps}
        id={restProps?.id ?? TEST_ID}
        data-testid={TEST_ID}
      >
        {children ?? TEST_ID}
      </IressModal>
    </IressModalProvider>,
  );
}

describe('IressModal', () => {
  it('renders the component with the correct text and classes (hidden)', () => {
    const screen = renderComponent({
      children: 'Test text',
    });

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(screen.queryByText('Test text')).not.toBeInTheDocument();
  });

  it('renders the component with the correct text and classes (shown)', async () => {
    const screen = renderComponent({
      children: 'Test text',
      show: true,
    });

    const dialog = await screen.findByRole('dialog');
    const backdrop = await screen.findByTestId(`${TEST_ID}__backdrop`);
    await screen.findByText('Test text');
    const closeButton = await screen.findByRole('button', {
      name: 'Close button',
    });

    expect(dialog).toBeInTheDocument();
    expect(backdrop).toBeInTheDocument();
    expect(closeButton).toBeInTheDocument();

    const styles = modal({ status: 'open' });

    expect(dialog).toHaveClass(
      styles.modal ?? '',
      text(),
      GlobalCSSClass.Modal,
    );
    expect(backdrop).toHaveClass(
      styles.backdrop ?? '',
      GlobalCSSClass.ModalBackdrop,
    );
    expect(closeButton).toHaveClass(styles.closeButton ?? '');
  });

  it('renders the component with the correct data-testids', async () => {
    const screen = renderComponent({
      footer: 'Footer slot',
      show: true,
    });

    expect(await screen.findByTestId(TEST_ID)).toBeInTheDocument();
    expect(
      await screen.findByTestId(`${TEST_ID}__backdrop`),
    ).toBeInTheDocument();
    expect(
      await screen.findByTestId(`${TEST_ID}__content`),
    ).toBeInTheDocument();
    expect(
      await screen.findByTestId(`${TEST_ID}__close-button__button`),
    ).toBeInTheDocument();
    expect(await screen.findByTestId(`${TEST_ID}__footer`)).toBeInTheDocument();
  });

  it('renders the className and style on the backdrop', async () => {
    const screen = renderComponent({
      className: 'test-class',
      style: { color: 'red' },
      show: true,
    });

    const backdrop = await screen.findByTestId(`${TEST_ID}__backdrop`);
    const dialog = await screen.findByRole('dialog');

    expect(backdrop).toHaveClass('test-class');
    expect(dialog).not.toHaveClass('test-class');

    expect(backdrop).toHaveStyle({ color: 'rgb(255, 0, 0)' });
  });

  describe('interactions', () => {
    it('closes when the user clicks the close button (uncontrolled)', async () => {
      const screen = renderComponent({
        defaultShow: true,
      });

      const dialog = await screen.findByRole('dialog');
      const closeButton = await screen.findByRole('button', {
        name: 'Close button',
      });

      await userEvent.click(closeButton);

      await waitForElementToBeRemoved(dialog);

      expect(dialog).not.toBeInTheDocument();
    });

    it('closes when the user clicks the close button (controlled)', async () => {
      let show = true;

      const screen = renderComponent({
        show,
        onShowChange: (newShow) => (show = newShow),
      });

      const dialog = await screen.findByRole('dialog');
      const closeButton = await screen.findByRole('button', {
        name: 'Close button',
      });

      await userEvent.click(closeButton);
      expect(show).toBe(false);

      renderComponent(
        {
          show,
        },
        screen.rerender as never,
      );

      await waitForElementToBeRemoved(dialog);
    });

    it('closes when the user clicks the close button (provider)', async () => {
      const screen = renderComponentInProvider({
        defaultShow: true,
      });

      const dialog = await screen.findByRole('dialog');
      const closeButton = await screen.findByRole('button', {
        name: 'Close button',
      });

      await userEvent.click(closeButton);

      await waitForElementToBeRemoved(dialog);

      expect(dialog).not.toBeInTheDocument();
    });

    it('closes when clicking the backdrop', async () => {
      const screen = renderComponent({
        defaultShow: true,
      });

      const backdrop = await screen.findByTestId(`${TEST_ID}__backdrop`);
      expect(backdrop).toBeInTheDocument();

      await userEvent.click(backdrop);

      await waitForElementToBeRemoved(backdrop);
    });

    it('closes when using the escape key', async () => {
      const screen = renderComponent({
        defaultShow: true,
      });

      const dialog = await screen.findByRole('dialog');

      await waitFor(() => expect(dialog).toHaveFocus());

      await userEvent.keyboard('{Escape}');

      await waitForElementToBeRemoved(dialog);
    });

    it('does not close when a toast is closed whilst it is open', async () => {
      const ModalAndToaster = () => {
        const { showModal } = useModal();
        const toaster = useToaster();

        return (
          <>
            <button onClick={() => showModal('modal')}>Show modal</button>
            <IressModal footer="Footer slot" id="modal">
              <button
                onClick={() =>
                  toaster.error({
                    timeout: 0,
                    heading: 'Error',
                    content:
                      'maybe network error happened... and showing error',
                  })
                }
              >
                Show toast
              </button>
            </IressModal>
          </>
        );
      };

      const screen = render(
        <IressToasterProvider>
          <IressModalProvider>
            <ModalAndToaster />
          </IressModalProvider>
        </IressToasterProvider>,
      );

      const button = screen.getByRole('button', {
        name: 'Show modal',
      });
      await userEvent.click(button);

      const dialog = await screen.findByRole('dialog');
      await waitFor(() => expect(dialog).toHaveFocus());

      const toastButton = screen.getByRole('button', {
        name: 'Show toast',
      });
      await userEvent.click(toastButton);

      const dismiss = await screen.findByRole('button', {
        name: 'Dismiss',
      });
      await userEvent.click(dismiss);

      await waitForElementToBeRemoved(dismiss);

      expect(dialog).toBeInTheDocument();
    });
  });

  describe('props', () => {
    describe('closeText', () => {
      it('replaces default close button text', async () => {
        const screen = renderComponent({
          closeText: 'Exit',
          show: true,
        });

        await screen.findByRole('dialog');

        const closeButton = await screen.findByRole('button', { name: 'Exit' });
        expect(closeButton).toBeInTheDocument();
      });
    });

    describe('container', () => {
      it('changes where the modal is rendered', async () => {
        const container = document.createElement('div');
        renderComponent({
          defaultShow: true,
          container,
        });

        await waitFor(() => expect(container.children).toHaveLength(1));
        expect(container.querySelector('[role="dialog"]')).not.toBeNull();
      });

      it('changes where the modal is rendered, if using a provider', async () => {
        const container = document.createElement('div');
        renderComponentInProvider(
          {
            defaultShow: true,
          },
          {
            container,
          },
        );

        await waitFor(() => expect(container.children).toHaveLength(1));
        expect(container.querySelector('[role="dialog"]')).not.toBeNull();
      });
    });

    describe('defaultShow', () => {
      it('shows the modal by default', async () => {
        const screen = renderComponent({
          defaultShow: true,
        });

        const dialog = await screen.findByRole('dialog');
        expect(dialog).toBeInTheDocument();
      });
    });

    describe('disableBackdropClick', () => {
      it('does not allow closing by clicking the backdrop', async () => {
        const screen = renderComponent({
          defaultShow: true,
          disableBackdropClick: true,
        });

        const backdrop = await screen.findByTestId(`${TEST_ID}__backdrop`);
        expect(backdrop).toBeInTheDocument();

        await userEvent.click(backdrop);

        expect(backdrop).toBeInTheDocument();
      });
    });

    describe('fixedFooter', () => {
      it('adds the fixed footer styles to the modal', async () => {
        const screen = renderComponent({
          defaultShow: true,
          fixedFooter: true,
        });

        const dialog = await screen.findByRole('dialog');
        await waitFor(() =>
          expect(dialog).toHaveClass(
            modal({ fixedFooter: true, status: 'open' }).modal ?? '',
            text(),
          ),
        );
      });
    });

    describe('footer', () => {
      it('renders the content into the footer slot', async () => {
        const screen = renderComponent({
          defaultShow: true,
          footer: 'Footer',
        });

        const footer = await screen.findByText('Footer');
        expect(footer).toHaveClass(modal({}).footer ?? '');
      });
    });

    describe('heading', () => {
      it('renders a string heading', async () => {
        const screen = renderComponent({
          defaultShow: true,
          heading: 'Test label',
        });

        const dialog = await screen.findByRole('dialog', {
          name: 'Test label',
        });
        expect(dialog).toBeInTheDocument();
      });

      it('renders an element directly, with the id', async () => {
        const screen = renderComponent({
          defaultShow: true,
          heading: <h3>Heading label</h3>,
        });

        const dialog = await screen.findByRole('dialog', {
          name: 'Heading label',
        });
        expect(dialog).toBeInTheDocument();
      });
    });

    describe('noCloseButton', () => {
      it('does not render a close button', async () => {
        const screen = renderComponent({
          defaultShow: true,
          noCloseButton: true,
        });

        await screen.findByRole('dialog');

        expect(
          screen.queryByRole('button', {
            name: 'Close button',
          }),
        ).not.toBeInTheDocument();
      });
    });

    describe('onShowChange', () => {
      it('is called when the close button is clicked', async () => {
        const onShowChange = vi.fn();

        const screen = renderComponent({
          show: true,
          onShowChange,
        });

        const closeButton = await screen.findByRole('button', {
          name: 'Close button',
        });
        await userEvent.click(closeButton);

        expect(onShowChange).toHaveBeenCalledWith(false);
      });
    });

    describe('onEntered', () => {
      it('is called when the modal is opened', async () => {
        const onEntered = vi.fn();

        const screen = renderComponent({
          defaultShow: true,
          onEntered,
        });

        const dialog = await screen.findByRole('dialog');

        // Simulate the transition end event, as its not triggered in test environments
        await waitFor(() => expect(dialog).toHaveFocus());
        fireEvent.transitionEnd(dialog, {
          propertyName: 'opacity',
        });

        await waitFor(() => expect(onEntered).toHaveBeenCalledOnce());
      });
    });

    describe('onExited', () => {
      it('is called when the modal is closed via the button', async () => {
        const onExited = vi.fn();

        const screen = renderComponent({
          defaultShow: true,
          onExited,
        });

        const closeButton = await screen.findByRole('button', {
          name: 'Close button',
        });
        await userEvent.click(closeButton);

        // Fire transition end event to simulate CSS transition completion
        const dialog = screen.getByRole('dialog');
        fireEvent.transitionEnd(dialog, {
          propertyName: 'opacity',
        });

        await waitFor(() => expect(onExited).toHaveBeenCalledTimes(1));
      });

      it('is called when the modal is closed via backdrop click', async () => {
        const onExited = vi.fn();

        const screen = renderComponent({
          defaultShow: true,
          onExited,
        });

        const backdrop = await screen.findByTestId(`${TEST_ID}__backdrop`);
        await userEvent.click(backdrop);

        // Fire transition end event to simulate CSS transition completion
        const dialog = screen.getByRole('dialog');
        fireEvent.transitionEnd(dialog, {
          propertyName: 'opacity',
        });

        await waitFor(() => expect(onExited).toHaveBeenCalledTimes(1));
      });

      it('is called when the modal is closed via escape key', async () => {
        const onExited = vi.fn();

        const screen = renderComponent({
          defaultShow: true,
          onExited,
        });

        await screen.findByRole('dialog');
        await userEvent.keyboard('{Escape}');

        // Fire transition end event to simulate CSS transition completion
        const dialog = screen.getByRole('dialog');
        fireEvent.transitionEnd(dialog, {
          propertyName: 'opacity',
        });

        await waitFor(() => expect(onExited).toHaveBeenCalledTimes(1));
      });
    });

    describe('onStatus', () => {
      it('is called with the correct status values during modal transitions', async () => {
        const onStatus = vi.fn();

        const screen = renderComponent({
          defaultShow: true,
          onStatus,
        });

        // Wait for the modal to be mounted and open
        await screen.findByRole('dialog');
        await waitFor(() => expect(screen.getByRole('dialog')).toHaveFocus());

        // Verify that onStatus was called with the expected status values
        expect(onStatus).toHaveBeenCalledWith('initial');
        expect(onStatus).toHaveBeenCalledWith('open');

        // Close the modal
        const closeButton = await screen.findByRole('button', {
          name: 'Close button',
        });
        await userEvent.click(closeButton);

        // Wait for the modal to be removed
        await waitForElementToBeRemoved(screen.getByRole('dialog'));

        // Verify that onStatus was called with 'close' and 'unmounted' status
        expect(onStatus).toHaveBeenCalledWith('close');
        expect(onStatus).toHaveBeenCalledWith('unmounted');
      });

      it('is called with status changes when modal is controlled', async () => {
        const onStatus = vi.fn();
        let show = true;

        const screen = renderComponent({
          show,
          onStatus,
          onShowChange: (newShow) => (show = newShow),
        });

        // Wait for the modal to be mounted and open
        await screen.findByRole('dialog');
        await waitFor(() => expect(screen.getByRole('dialog')).toHaveFocus());

        // Verify initial status calls
        expect(onStatus).toHaveBeenCalledWith('initial');
        expect(onStatus).toHaveBeenCalledWith('open');

        // Close the modal
        const closeButton = await screen.findByRole('button', {
          name: 'Close button',
        });
        await userEvent.click(closeButton);

        // Re-render with show = false
        renderComponent(
          {
            show,
            onStatus,
            onShowChange: (newShow) => (show = newShow),
          },
          screen.rerender as never,
        );

        // Wait for the modal to be removed
        await waitForElementToBeRemoved(screen.getByRole('dialog'));

        // Verify that onStatus was called with 'close' and 'unmounted' status
        expect(onStatus).toHaveBeenCalledWith('close');
        expect(onStatus).toHaveBeenCalledWith('unmounted');
      });
    });

    describe('padding', () => {
      it('changes the padding of the content and footer', async () => {
        const screen = renderComponent({
          children: 'Content',
          defaultShow: true,
          p: 'none',
          footer: 'Footer',
        });

        const content = await screen.findByText('Content');
        const footer = await screen.findByText('Footer');

        expect(content).toHaveClass('p_none');
        expect(footer).toHaveClass('p_none');
      });
    });

    describe('show', () => {
      it('opens the modal if set to true', async () => {
        const screen = renderComponent({
          show: true,
        });

        const dialog = await screen.findByRole('dialog');
        expect(dialog).toBeInTheDocument();
      });
    });

    describe('width', () => {
      it('changes the size of the modal if provided (single size)', async () => {
        const screen = renderComponent({
          show: true,
          width: 'overlay.sm',
        });

        const dialog = await screen.findByRole('dialog');
        expect(dialog).toHaveClass('w_overlay.sm');
      });

      it('changes the size of the modal if provided (responsive size)', async () => {
        const screen = renderComponent({
          show: true,
          width: { xs: 'overlay.lg', lg: 'overlay.sm' },
        });

        const dialog = await screen.findByRole('dialog');
        expect(dialog).toHaveClass('xs:w_overlay.lg', 'lg:w_overlay.sm');
      });
    });

    describe('static', () => {
      it('renders modal as static content without backdrop behavior', async () => {
        const screen = renderComponent({
          show: true,
          static: true,
        });

        const backdrop = await screen.findByTestId(`${TEST_ID}__backdrop`);
        const dialog = await screen.findByRole('dialog');

        // Static modals should have the static class
        expect(backdrop).toHaveClass(modal({ static: true }).backdrop!);

        // Static modals should not lock scroll (this is handled by FloatingOverlay)
        // The lockScroll prop is set to false when static is true
        expect(dialog).toBeInTheDocument();
        expect(backdrop).toBeInTheDocument();
      });

      it('disables focus management when static is true', async () => {
        const screen = renderComponent({
          show: true,
          static: true,
        });

        const dialog = await screen.findByRole('dialog');

        // Static modals should not automatically focus the dialog
        // This is handled by FloatingFocusManager being disabled
        expect(dialog).toBeInTheDocument();

        // The dialog should not have focus automatically
        expect(dialog).not.toHaveFocus();
      });

      it('allows backdrop clicks when static is true', async () => {
        const screen = renderComponent({
          show: true,
          static: true,
        });

        const backdrop = await screen.findByTestId(`${TEST_ID}__backdrop`);

        // Clicking the backdrop should not close the modal when static is true
        await userEvent.click(backdrop);

        // The modal should still be visible
        expect(backdrop).toBeInTheDocument();
        expect(screen.getByRole('dialog')).toBeInTheDocument();
      });
    });
  });

  describe('warnings', () => {
    it('logs a warning when both provider and show prop is used', async () => {
      const screen = render(<AppWithModalProvider id={TEST_ID} />);

      await userEvent.click(
        screen.getByRole('button', {
          name: 'Show modal using provider',
          hidden: true,
        }),
      );

      screen.rerender(<AppWithModalProvider id={TEST_ID} show />);

      await waitFor(() => expect(idsLogger).toHaveBeenCalledTimes(1));
    });
  });

  describe('accessibility', () => {
    it('does not have basic accessibility issues (hidden)', async () => {
      const screen = renderComponent();
      const results = await axe(screen.container);
      expect(results).toHaveNoViolations();
    });

    it('does not have basic accessibility issues (shown)', async () => {
      const screen = renderComponent({
        show: true,
      });

      // TODO: act warning only shows when running in parallel with other tests. not sure why.
      // Floating UI flushing: https://floating-ui.com/docs/react#testing
      await act(async () => {});

      const dialog = await screen.findByRole('dialog');
      expect(dialog).toBeInTheDocument();

      const results = await axe(screen.container);
      expect(results).toHaveNoViolations();
    });
  });
});
