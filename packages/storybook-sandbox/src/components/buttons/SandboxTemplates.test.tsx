// TODO: Probably needs end-to-end testing
import { type ComponentProps } from 'react';
import { SandboxTemplates } from './SandboxTemplates';
import { render, screen } from '@testing-library/react';
import { type Button, type IconButton } from 'storybook/internal/components';
import userEvent from '@testing-library/user-event';
import { type SandboxTemplate } from '../../types';

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
      <button onClick={props.onClick} aria-label="Templates">
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

describe('SandboxTemplates', () => {
  it('renders templates in a dialog window', async () => {
    const onChange = vi.fn();
    const templates: SandboxTemplate[] = [
      {
        title: 'Template 1',
        thumbnail: <>Thumbnail 1</>,
        state: { code: 'code1' },
      },
      {
        title: 'Template 2',
        thumbnail: <>Thumbnail 2</>,
        state: { code: 'code2' },
        description: 'Some random description',
      },
    ];

    render(<SandboxTemplates onChange={onChange} templates={templates} />);

    // Check for trigger button
    const button = screen.getByRole('button', { name: 'Templates' });
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
        name: 'Templates',
        level: 2,
        hidden: true,
      }),
    ).toBeInTheDocument();

    // Check for items (it is hidden, cause JSDom does not really support dialog elements)
    const items = screen.getAllByRole('listitem', { hidden: true });
    expect(items).toHaveLength(2);

    expect(items[0]).toHaveTextContent('Template 1');
    expect(items[1]).toHaveTextContent('Template 2');

    // Select the first template
    const firstSelect = items[0]?.querySelector('button')!;
    await userEvent.click(firstSelect);

    // The dialog should be closed
    expect(close).toHaveBeenCalled();

    // It calls the onChange prop with the template selected
    expect(onChange).toHaveBeenCalledWith(templates[0]);
  });

  it('renders a close button for the dialog', async () => {
    const templates: SandboxTemplate[] = [
      {
        title: 'Template 1',
        thumbnail: <>Thumbnail 1</>,
        state: { code: 'code1' },
      },
      {
        title: 'Template 2',
        thumbnail: <>Thumbnail 2</>,
        state: { code: 'code2' },
        description: 'Some random description',
      },
    ];

    render(<SandboxTemplates templates={templates} />);

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

  it('does not render if no templates', () => {
    render(<SandboxTemplates />);

    const button = screen.queryByRole('button', { name: 'Templates' });
    expect(button).not.toBeInTheDocument();
  });
});
