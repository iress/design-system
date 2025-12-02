// TODO: Probably needs end-to-end testing
import React from 'react';
import { type ComponentProps } from 'react';
import { render, screen } from '@testing-library/react';
import { type Button, type IconButton } from 'storybook/internal/components';
import userEvent from '@testing-library/user-event';
import { SandboxScopes } from './SandboxScopes';

// We mock the storybook/internal/components package to avoid rendering the actual components,
// as we are not testing the components themselves (and there's some magic going on with their Styled Components)
const buttonProps = vi.fn();
const iconButtonProps = vi.fn();
vi.mock('storybook/internal/components', async (importOriginal) => ({
  ...(await importOriginal<typeof import('storybook/internal/components')>()),
  Button: (props: ComponentProps<typeof Button>) => {
    buttonProps(props);
    return <button onClick={props.onClick}>{props.children}</button>;
  },
  IconButton: (props: ComponentProps<typeof IconButton>) => {
    iconButtonProps(props);
    return (
      <button onClick={props.onClick} aria-label="Scopes">
        {props.children}
      </button>
    );
  },
}));

// Mock the missing methods from the dialog element in JS DOM
// https://github.com/jsdom/jsdom/issues/3294
const showModal = vi.fn();
const close = vi.fn();
beforeAll(() => {
  HTMLDialogElement.prototype.show = vi.fn();
  HTMLDialogElement.prototype.showModal = showModal;
  HTMLDialogElement.prototype.close = close;
});

afterEach(() => {
  showModal.mockClear();
  close.mockClear();
});

describe('SandboxScopes', () => {
  it('renders scopes in a dialog window', async () => {
    const onChange = vi.fn();
    const scopes = ['react-hook-form', 'ag-grid'];

    render(<SandboxScopes onChange={onChange} availableScopes={scopes} />);

    // Check for trigger button
    const button = screen.getByRole('button', { name: 'Scopes' });
    expect(button).toBeInTheDocument();

    // Open dialog
    await userEvent.click(button);

    // Check that showModal was called on the dialog element
    expect(showModal).toHaveBeenCalled();

    // TODO: JSDom does not support getByRole for dialog elements
    const dialog = screen.getByTestId('dialog');
    expect(dialog).toBeInTheDocument();

    // Check for heading (it is hidden, cause JSDom does not really support dialog elements)
    expect(
      screen.getByRole('heading', {
        name: 'Scopes',
        level: 2,
        hidden: true,
      }),
    ).toBeInTheDocument();

    // Check for items (it is hidden, cause JSDom does not really support dialog elements)
    const rhfCheckbox = screen.getByRole('checkbox', {
      name: 'react-hook-form',
      hidden: true,
    });
    const agGridCheckbox = screen.getByRole('checkbox', {
      name: 'ag-grid',
      hidden: true,
    });

    expect(rhfCheckbox).toBeInTheDocument();
    expect(agGridCheckbox).toBeInTheDocument();

    // Select the first scope
    await userEvent.click(rhfCheckbox);

    // It calls the onChange prop with the scope is selected
    expect(onChange).toHaveBeenCalledWith(['react-hook-form']);
  });

  it('renders checkboxes as checked if the scope is selected via prop', () => {
    const scopes = ['react-hook-form', 'ag-grid'];

    render(<SandboxScopes scopes={scopes} availableScopes={scopes} />);

    const rhfCheckbox = screen.getByRole('checkbox', {
      name: 'react-hook-form',
      hidden: true,
      checked: true,
    });
    const agGridCheckbox = screen.getByRole('checkbox', {
      name: 'ag-grid',
      hidden: true,
      checked: true,
    });

    expect(rhfCheckbox).toBeChecked();
    expect(agGridCheckbox).toBeChecked();
  });

  it('renders a close button for the dialog', async () => {
    const availableScopes = ['react-hook-form', 'ag-grid'];

    render(<SandboxScopes availableScopes={availableScopes} />);

    // Check for close button
    const closeButton = screen.getByRole('button', {
      name: 'close',
      hidden: true,
    });
    expect(closeButton).toBeInTheDocument();

    // Close dialog
    await userEvent.click(closeButton);

    // The dialog should be closed
    expect(close).toHaveBeenCalled();
  });

  it('does not render if no scopes', () => {
    render(<SandboxScopes />);

    const button = screen.queryByRole('button', { name: 'Scopes' });
    expect(button).not.toBeInTheDocument();
  });
});
