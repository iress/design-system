import { type ComponentProps, type ReactNode } from 'react';
import { SandboxButton } from './SandboxButton';
import { render, screen } from '@testing-library/react';
import {
  type WithTooltip,
  type IconButton,
} from 'storybook/internal/components';
import userEvent from '@testing-library/user-event';

// We mock the storybook/internal/components package to avoid rendering the actual components,
// as we are not testing the components themselves (and there's some magic going on with their Styled Components)
const iconButtonProps = vi.fn();
const withTooltipProps = vi.fn();
vi.mock('storybook/internal/components', async (importOriginal) => ({
  ...(await importOriginal<typeof import('storybook/internal/components')>()),
  IconButton: (props: ComponentProps<typeof IconButton>) => {
    iconButtonProps(props);
    return <button onClick={props.onClick}>{props.children}</button>;
  },
  WithTooltip: (props: ComponentProps<typeof WithTooltip>) => {
    withTooltipProps(props);
    return <div>WithTooltip rendered</div>;
  },
}));

describe('SandboxButton', () => {
  it('renders a button with a label', async () => {
    const onClick = vi.fn();
    render(<SandboxButton label="Hello" onClick={onClick} />);

    const button = screen.getByRole('button', { name: 'Hello' });
    expect(button).toBeInTheDocument();

    await userEvent.click(button);

    expect(onClick).toHaveBeenCalled();
  });

  it('renders an icon', () => {
    render(<SandboxButton label="Search" icon="search" />);

    const button = screen.getByRole('button', { name: 'search' });
    expect(button).toBeInTheDocument();
  });

  it('renders a menu inside a tooltip (popover)', () => {
    render(
      <SandboxButton
        label="Search"
        icon="search"
        menu="Menu that is toggled"
      />,
    );

    expect(withTooltipProps).toHaveBeenCalled();

    // Check if tooltip will be styled correctly
    const withTooltipPropsArgs = withTooltipProps.mock
      .calls[0]?.[0] as ComponentProps<typeof WithTooltip>;

    render(withTooltipPropsArgs.tooltip as ReactNode);
    expect(screen.getByText('Menu that is toggled')).toHaveClass(
      'sandbox-button__menu',
    );
  });
});
