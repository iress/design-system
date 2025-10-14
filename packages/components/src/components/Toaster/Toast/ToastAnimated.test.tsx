import { render, waitFor } from '@testing-library/react';
import styles from './Toast.module.scss';
import { IressToastAnimatedProps } from './Toast.types';
import userEvent from '@testing-library/user-event';
import { IressToastAnimated } from './ToastAnimated';

const TEST_ID = 'test-component';
const TOAST_MESSAGE = 'Toast message';

function renderComponent(
  props: Partial<IressToastAnimatedProps> = {},
  renderFn: typeof render = render,
) {
  return renderFn(
    <IressToastAnimated
      {...props}
      status={props.status ?? 'success'}
      style={{ transitionDuration: '0s' }}
      data-testid={TEST_ID}
    >
      {props?.children ?? TOAST_MESSAGE}
    </IressToastAnimated>,
  );
}

describe('IressToastAnimated', () => {
  it('render the component with the correct classes', async () => {
    const screen = renderComponent({ dismissible: true });

    const toastMessage = screen.getByText(TOAST_MESSAGE);
    expect(toastMessage).toBeInTheDocument();

    const toast = screen.getByTestId(TEST_ID);
    expect(toast).toHaveClass(styles.fade);

    await waitFor(() => toast.classList.contains(styles.open));
    await waitFor(async () =>
      expect(await screen.findByTestId(TEST_ID)).toHaveFocus(),
    );

    const closeButton = screen.getByRole('button');
    await userEvent.click(closeButton);

    await waitFor(() => toast.classList.contains(styles.close));
  });

  describe('props', () => {
    describe('animation', () => {
      it('changes the animation on the toast', () => {
        const screen = renderComponent({
          animation: 'start-x',
        });

        const toast = screen.getByText(TOAST_MESSAGE);
        expect(toast.closest(`.${styles['start-x']}`)).not.toBeNull();
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
