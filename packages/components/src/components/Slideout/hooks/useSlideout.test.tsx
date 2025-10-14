import {
  render,
  renderHook,
  waitForElementToBeRemoved,
} from '@testing-library/react';

import { useSlideout } from './useSlideout';
import userEvent from '@testing-library/user-event';
import { App as AppWithSlideoutProvider } from '../mocks/AppWithSlideoutProvider';

const ID = 'slideout';

describe('useSlideout', () => {
  it('throws an error if showSlideout is used outside the IressSlideoutProvider', () => {
    // Hide expected throwed error.
    vi.spyOn(console, 'error').mockImplementation(() => {});

    const { result } = renderHook(() => useSlideout());

    expect(() => result.current.showSlideout('id')).toThrow(
      'IressSlideout: showSlideout must be used within a IressSlideoutProvider',
    );
  });

  it('opens a slideout with its id', async () => {
    const screen = render(
      <AppWithSlideoutProvider id={ID} role="complementary" />,
    );

    await userEvent.click(
      screen.getByRole('button', { name: 'Show slideout using provider' }),
    );

    const dialog = await screen.findByRole('complementary');
    expect(dialog).toBeInTheDocument();
  });

  it('closes a slideout with its id', async () => {
    const screen = render(
      <AppWithSlideoutProvider id={ID} role="complementary" defaultShow />,
    );

    const complementary = await screen.findByRole('complementary');
    expect(complementary).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: 'Close' }));

    await waitForElementToBeRemoved(complementary);
  });
});
