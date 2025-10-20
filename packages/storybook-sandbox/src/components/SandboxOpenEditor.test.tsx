import { type ComponentProps } from 'react';
import { render, screen } from '@testing-library/react';
import { SandboxOpenEditor } from './SandboxOpenEditor';
import { type API } from 'storybook/internal/manager-api';
import { type API_Layout } from 'storybook/internal/types';
import { type IconButton } from 'storybook/internal/components';
import userEvent from '@testing-library/user-event';
import { ADDON_ID } from '../constants';

// Mocking the Storybook API
const setSelectedPanel = vi.fn();
const togglePanel = vi.fn();
const api = {
  setSelectedPanel,
  togglePanel,
} as unknown as API;

// We mock the storybook/manager-api package,
// Which relies on Storybook's context and would throw an error in a test environment (and is a pain to mock).
const storybookLayout: Partial<API_Layout> = {
  bottomPanelHeight: 0,
  rightPanelWidth: 0,
};
vi.mock('storybook/manager-api', async (importOriginal) => ({
  ...(await importOriginal<typeof import('storybook/manager-api')>()),
  useStorybookState: () => ({
    layout: storybookLayout,
  }),
}));

// We mock the storybook/internal/components package to avoid rendering the actual components,
// as we are not testing the components themselves (and there's some magic going on with their Styled Components)
const iconButtonProps = vi.fn();
vi.mock('storybook/internal/components', async (importOriginal) => ({
  ...(await importOriginal<typeof import('storybook/internal/components')>()),
  IconButton: (props: ComponentProps<typeof IconButton>) => {
    iconButtonProps(props);
    return <button onClick={props.onClick}>{props.children}</button>;
  },
}));

describe('SandboxOpenEditor', () => {
  it('renders when the panel is hidden', async () => {
    render(<SandboxOpenEditor api={api} />);

    const button = screen.getByRole('button', { name: 'Open editor' });
    expect(button).toBeInTheDocument();

    expect(iconButtonProps).toHaveBeenCalledWith(
      expect.objectContaining({
        active: true,
        className: 'sandbox-open-editor',
      }),
    );

    // Click the button to toggle the editor on
    await userEvent.click(button);

    expect(togglePanel).toHaveBeenCalledWith(true);
    expect(setSelectedPanel).toHaveBeenCalledWith(ADDON_ID);
  });

  it('does not render if panel is visible (has a height)', () => {
    storybookLayout.bottomPanelHeight = 100;
    storybookLayout.rightPanelWidth = 0;

    render(<SandboxOpenEditor api={api} />);

    const button = screen.queryByRole('button');
    expect(button).not.toBeInTheDocument();
  });

  it('does not render if panel is visible (has a width)', () => {
    storybookLayout.bottomPanelHeight = 0;
    storybookLayout.rightPanelWidth = 100;

    render(<SandboxOpenEditor api={api} />);

    const button = screen.queryByRole('button');
    expect(button).not.toBeInTheDocument();
  });
});
