import {
  render,
  renderHook,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { PropsWithChildren } from 'react';

import { App as AppWithToasterProvider } from '../mocks/AppWithToasterProvider';
import userEvent from '@testing-library/user-event';
import { IressToasterProvider } from '../ToasterProvider';
import { useToaster } from './useToaster';
import { ToastProps } from '../components/Toast/Toast';
import { IressButton } from '@/components/Button';
import { CloseToastViaProvider } from '../mocks/CloseToastViaProvider';

const TestTopWrapper = ({ children }: PropsWithChildren) => (
  <IressToasterProvider position="top-center">{children}</IressToasterProvider>
);

const WithTrigger = ({ status, ...toast }: ToastProps) => {
  const toaster = useToaster();

  return (
    <IressButton onClick={() => toaster[status](toast)}>
      Show toast using provider
    </IressButton>
  );
};

const WithStringToasts = () => {
  const toaster = useToaster();

  return (
    <div>
      <IressButton onClick={() => toaster.success('Simple success message')}>
        Show string success
      </IressButton>
      <IressButton onClick={() => toaster.error('Simple error message')}>
        Show string error
      </IressButton>
      <IressButton onClick={() => toaster.info('Simple info message')}>
        Show string info
      </IressButton>
    </div>
  );
};

describe('useToaster hook', () => {
  it('throws an error if used outside the ToasterProvider', () => {
    // Hide expected throwed error.
    vi.spyOn(console, 'error').mockImplementation(() => undefined);

    expect(() => {
      renderHook(() => useToaster());
    }).toThrow('useToaster must be used within a IressToasterProvider');
  });

  it('opens and closes a toast', async () => {
    const screen = render(
      <AppWithToasterProvider
        toast={{
          content: 'Test toast',
          status: 'error',
          dismissible: true,
        }}
      />,
    );

    await userEvent.click(
      screen.getByRole('button', {
        name: 'Show toast using provider',
      }),
    );

    const toast = await screen.findByText('Test toast');
    expect(toast).toBeInTheDocument();

    const closeButton = screen.getByRole('button', { name: 'Dismiss' });
    await userEvent.click(closeButton);

    await waitForElementToBeRemoved(toast);
    expect(toast).not.toBeInTheDocument();
  });

  it('prepends the toast position starts with top-*', async () => {
    const screen = render(
      <WithTrigger status="error" dismissible>
        Error toast
      </WithTrigger>,
      { wrapper: TestTopWrapper },
    );

    const triggerButton = screen.getByRole('button', {
      name: 'Show toast using provider',
    });

    await userEvent.click(triggerButton);

    const firstRound = await screen.findAllByText('Error toast');
    expect(firstRound).toHaveLength(1);

    await userEvent.click(triggerButton);

    const secondRound = await screen.findAllByText('Error toast');
    expect(secondRound).toHaveLength(2);

    expect(secondRound[1]).toBe(firstRound[0]);
  });

  it('closes a toast programatically', async () => {
    const screen = render(<CloseToastViaProvider />);

    await userEvent.click(
      screen.getByRole('button', {
        name: 'Show toast using provider',
      }),
    );

    const toast = await screen.findByText('Error');
    expect(toast).toBeInTheDocument();

    const closeButton = screen.getByRole('button', {
      name: 'Close the last toast opened',
    });
    await userEvent.click(closeButton);

    await waitForElementToBeRemoved(toast);
    expect(toast).not.toBeInTheDocument();
  });

  describe('string toast messages', () => {
    it('handles string messages for success toasts', async () => {
      const screen = render(<WithStringToasts />, { wrapper: TestTopWrapper });

      await userEvent.click(
        screen.getByRole('button', { name: 'Show string success' }),
      );

      const toast = await screen.findByText('Simple success message');
      expect(toast).toBeInTheDocument();
    });

    it('handles string messages for error toasts', async () => {
      const screen = render(<WithStringToasts />, { wrapper: TestTopWrapper });

      await userEvent.click(
        screen.getByRole('button', { name: 'Show string error' }),
      );

      const toast = await screen.findByText('Simple error message');
      expect(toast).toBeInTheDocument();
    });

    it('handles string messages for info toasts', async () => {
      const screen = render(<WithStringToasts />, { wrapper: TestTopWrapper });

      await userEvent.click(
        screen.getByRole('button', { name: 'Show string info' }),
      );

      const toast = await screen.findByText('Simple info message');
      expect(toast).toBeInTheDocument();
    });
  });
});
