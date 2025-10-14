import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { toast } from './Toast.styles';
import { ToastAnimated, ToastAnimatedProps } from './ToastAnimated';

const TEST_ID = 'test-component';
const TOAST_MESSAGE = 'Toast message';

function renderComponent(
  props: Partial<ToastAnimatedProps> = {},
  renderFn: typeof render = render,
) {
  return renderFn(
    <ToastAnimated
      {...props}
      status={props.status ?? 'success'}
      style={{ transitionDuration: '0s' }}
      data-testid={TEST_ID}
    >
      {props?.children ?? TOAST_MESSAGE}
    </ToastAnimated>,
  );
}

describe('ToastAnimated', () => {
  it('render the component with the correct attributes', async () => {
    const screen = renderComponent({ dismissible: true });

    const toastMessage = screen.getByText(TOAST_MESSAGE);
    expect(toastMessage).toBeInTheDocument();

    const toast = screen.getByTestId(TEST_ID);
    await waitFor(() => expect(toast).toHaveAttribute('data-state', 'open'));
    await waitFor(async () =>
      expect(await screen.findByTestId(TEST_ID)).toHaveFocus(),
    );

    const closeButton = screen.getByRole('button');
    await userEvent.click(closeButton);

    await waitFor(() => expect(toast).toHaveAttribute('data-state', 'closed'));
  });

  describe('props', () => {
    describe('animation', () => {
      it('changes the animation on the toast', () => {
        const screen = renderComponent({
          animation: 'start-x',
        });

        const toastElement = screen.getByTestId(TEST_ID);
        expect(toastElement).toHaveClass(toast({ animation: 'start-x' }).root!);
      });
    });

    describe('onClose', () => {
      it('calls the onClose prop when the user dismisses the toast', async () => {
        const onClose = vi.fn();
        const onTimeout = vi.fn();

        const screen = renderComponent({
          dismissible: true,
          onClose,
          onTimeout,
        });

        const closeButton = screen.getByRole('button');
        await userEvent.click(closeButton);

        await waitFor(() =>
          expect(onClose).toHaveBeenCalledWith(
            expect.objectContaining({
              target: closeButton,
            }),
          ),
        );
        expect(onTimeout).not.toHaveBeenCalled();
      });
    });

    describe('timeout and onTimeout', () => {
      it('calls the onTimeout prop when the toast times out', async () => {
        const onTimeout = vi.fn();
        renderComponent({
          onTimeout,
          timeout: 100,
        });
        await waitFor(() => expect(onTimeout).toHaveBeenCalledTimes(1));
      });
    });
  });
});
