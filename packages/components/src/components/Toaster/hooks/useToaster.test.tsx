import {
  render,
  renderHook,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { type PropsWithChildren } from 'react';

import { App as AppWithToasterProvider } from '../mocks/AppWithToasterProvider';
import userEvent from '@testing-library/user-event';
import {
  IressButton,
  type IressToastProps,
  IressToasterProvider,
  useToaster,
} from '@/main';
import { CloseToastViaProvider } from '../mocks/CloseToastViaProvider';

const TestWrapper = ({ children }: PropsWithChildren) => (
  <IressToasterProvider>{children}</IressToasterProvider>
);

const TestTopWrapper = ({ children }: PropsWithChildren) => (
  <IressToasterProvider position="top-center">{children}</IressToasterProvider>
);

const WithTrigger = ({ status, ...toast }: IressToastProps) => {
  const toaster = useToaster();

  return (
    <IressButton onClick={() => toaster[status](toast)}>
      Show toast using provider
    </IressButton>
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

  it('should render with the default position "bottom-end"', async () => {
    const { result } = renderHook(() => useToaster(), {
      wrapper: TestWrapper,
    });

    result.current.success({ content: 'content' });

    await waitFor(() => {
      expect(result.current.options.position).toBe('bottom-end');
    });
  });

  it('should render with the position "top-start"', async () => {
    const { result } = renderHook(() => useToaster('top-start'), {
      wrapper: TestWrapper,
    });

    result.current.error({ content: 'content' });

    await waitFor(() => {
      expect(result.current.options.position).toBe('top-start');
    });
  });

  it('opens and closes a toast', async () => {
    const screen = render(
      <AppWithToasterProvider
        toast={{
          children: 'Test toast',
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

  it('closes a test programatically', async () => {
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
});
