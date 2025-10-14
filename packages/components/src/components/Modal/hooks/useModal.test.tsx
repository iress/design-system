import { render, renderHook, waitFor } from '@testing-library/react';

import { useModal } from './useModal';
import userEvent from '@testing-library/user-event';
import { App as AppWithModalProvider } from '../mocks/AppWithModalProvider';

const ID = 'modal';

describe('useModal', () => {
  it('throws an error if showModal is used outside the IressModalProvider', () => {
    // Hide expected throwed error.
    vi.spyOn(console, 'error').mockImplementation(() => {});

    const { result } = renderHook(() => useModal());

    expect(() => result.current.showModal('id')).toThrow(
      'IressModal: useModal must be used within a IressModalProvider',
    );
  });

  it('opens a modal with its id', async () => {
    const screen = render(<AppWithModalProvider id={ID} />);

    await userEvent.click(
      screen.getByRole('button', { name: 'Show modal using provider' }),
    );

    const dialog = await screen.findByRole('dialog');
    expect(dialog).toBeInTheDocument();
  });

  it('closes a modal with its id', async () => {
    const screen = render(<AppWithModalProvider id={ID} defaultShow />);

    const dialog = await screen.findByRole('dialog');
    expect(dialog).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: 'Close button' }));

    await waitFor(() => expect(dialog).not.toBeInTheDocument());
  });
});
