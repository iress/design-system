import { render, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { toast } from './Toast.styles';
import { Toast } from './Toast';
import { GlobalCSSClass } from '@/enums';

describe('Toast', () => {
  it('render the component with the correct attributes', async () => {
    render(<Toast data-testid="test" content="I am a toast message" />);

    const toastMessage = screen.getByText('I am a toast message');
    expect(toastMessage).toBeInTheDocument();

    const element = screen.getByTestId('test');
    await waitFor(async () => expect(element).toHaveFocus());

    expect(element).toHaveClass(
      toast({ transitionState: 'open' }),
      GlobalCSSClass.Toast,
    );

    const closeButton = screen.getByRole('button');
    await userEvent.click(closeButton);
  });

  describe('props', () => {
    describe('animation', () => {
      it('changes the animation on the toast', () => {
        render(
          <Toast
            data-testid="toast"
            animation="start-x"
            content="I am a toast message"
          />,
        );

        const toastElement = screen.getByTestId('toast');
        expect(toastElement).toHaveClass(toast({ animation: 'start-x' }));
      });
    });

    describe('onClose', () => {
      it('calls the onClose prop when the user dismisses the toast', async () => {
        const onClose = vi.fn();
        const onTimeout = vi.fn();

        render(
          <Toast
            onClose={onClose}
            onTimeout={onTimeout}
            content="I am a toast message"
          />,
        );

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
        render(
          <Toast
            timeout={200}
            onTimeout={onTimeout}
            content="I am a toast message"
          />,
        );
        await waitFor(() => expect(onTimeout).toHaveBeenCalledTimes(1));
      });
    });
  });
});
