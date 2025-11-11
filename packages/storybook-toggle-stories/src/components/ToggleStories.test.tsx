import { type API } from 'storybook/internal/manager-api';
import { ToggleStories } from './ToggleStories';
import { render, screen } from '@testing-library/react';
import { ADDON_ID } from '../constants';
import userEvent from '@testing-library/user-event';
import type { ComponentProps } from 'react';
import type { IconButton } from 'storybook/internal/components';

// Mocking the Storybook API
const api = {
  experimental_setFilter: vi.fn(),
  getRefs: vi.fn().mockReturnValue({}),
} as unknown as API;

// We mock the storybook/internal/components package to avoid rendering the actual components,
// as we are not testing the components themselves (and Storybook components throw errors in tests).
const iconButtonProps = vi.fn();
vi.mock('storybook/internal/components', async (importOriginal) => ({
  ...(await importOriginal<typeof import('storybook/internal/components')>()),
  IconButton: (props: ComponentProps<typeof IconButton>) => {
    iconButtonProps(props);
    return <button onClick={props.onClick}>IconButton rendered</button>;
  },
}));

describe('ToggleStories', () => {
  const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');
  const removeItemSpy = vi.spyOn(Storage.prototype, 'removeItem');

  afterEach(() => {
    localStorage.clear();
    setItemSpy.mockClear();
    removeItemSpy.mockClear();
    iconButtonProps.mockClear();
    vi.clearAllMocks();
  });

  it('renders defaults', () => {
    render(<ToggleStories api={api} />);
    expect(iconButtonProps).toHaveBeenLastCalledWith(
      expect.objectContaining({
        active: false,
        title: 'Show stories',
      }),
    );
  });

  it('renders active by default if visible in local storage', () => {
    window.localStorage.setItem(ADDON_ID, 'true');
    render(<ToggleStories api={api} />);
    expect(iconButtonProps).toHaveBeenLastCalledWith(
      expect.objectContaining({
        active: true,
        title: 'Hide stories',
      }),
    );
  });

  it('toggles the stories on click', async () => {
    render(<ToggleStories api={api} />);

    const toggle = screen.getByRole('button', { name: 'IconButton rendered' });

    // Click to show
    await userEvent.click(toggle);

    expect(setItemSpy).toHaveBeenCalledWith(ADDON_ID, 'true');
    expect(api.experimental_setFilter).toHaveBeenCalledWith(
      ADDON_ID,
      expect.any(Function),
    );
    expect(iconButtonProps).toHaveBeenLastCalledWith(
      expect.objectContaining({
        active: true,
        title: 'Hide stories',
      }),
    );

    // Click again to hide
    await userEvent.click(toggle);

    expect(removeItemSpy).toHaveBeenCalledWith(ADDON_ID);
    expect(api.experimental_setFilter).toHaveBeenCalledWith(
      ADDON_ID,
      expect.any(Function),
    );
    expect(iconButtonProps).toHaveBeenLastCalledWith(
      expect.objectContaining({
        active: false,
        title: 'Show stories',
      }),
    );
  });

  it('does not render if not active', () => {
    render(<ToggleStories active={false} api={api} />);
    expect(iconButtonProps).not.toHaveBeenCalled();
  });
});
