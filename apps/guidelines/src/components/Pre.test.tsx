import { render, screen, fireEvent } from '@testing-library/react';
import { Pre } from './Pre';

vi.mock('@iress-oss/ids-components', () => ({
  IressButton: ({
    children,
    onClick,
    ...props
  }: React.PropsWithChildren<{ onClick?: () => void }>) => (
    <button data-testid="ids-button" onClick={onClick} {...props}>
      {children}
    </button>
  ),
  IressIcon: ({ name, screenreaderText }: { name: string; screenreaderText?: string }) => (
    <span data-testid="ids-icon" data-name={name}>
      {screenreaderText ?? name}
    </span>
  ),
  IressInline: ({ children }: React.PropsWithChildren) => (
    <div data-testid="ids-inline">{children}</div>
  ),
  IressStack: ({ children }: React.PropsWithChildren) => (
    <div data-testid="ids-stack">{children}</div>
  ),
}));

vi.mock('@iress-oss/ids-tokens', () => ({
  cssVars: {
    colour: {
      system: {
        danger: { text: '#red', surface: '#light-red' },
        success: { text: '#green', surface: '#light-green' },
      },
    },
  },
}));

describe('Pre', () => {
  it('renders children inside a pre element', () => {
    const { container } = render(
      <Pre>
        <code>some code</code>
      </Pre>,
    );
    const pre = container.querySelector('pre');
    expect(pre).toBeInTheDocument();
    expect(pre).toHaveTextContent('some code');
  });

  it('shows copy button by default', () => {
    render(
      <Pre>
        <code>code</code>
      </Pre>,
    );
    expect(screen.getByTestId('ids-button')).toBeInTheDocument();
  });

  it('hides copy button for diff code blocks', () => {
    render(
      <Pre className="language-diff">
        <code>- old line</code>
      </Pre>,
    );
    expect(screen.queryByTestId('ids-button')).not.toBeInTheDocument();
  });

  it('copies pre content to clipboard when copy is clicked', () => {
    const writeTextMock = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, {
      clipboard: { writeText: writeTextMock },
    });

    render(
      <Pre>
        <code>copy this</code>
      </Pre>,
    );
    fireEvent.click(screen.getByTestId('ids-button'));
    expect(writeTextMock).toHaveBeenCalledWith('copy this');
  });

  it('shows "Copied!" feedback after clicking copy', () => {
    const writeTextMock = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, {
      clipboard: { writeText: writeTextMock },
    });

    render(
      <Pre>
        <code>code</code>
      </Pre>,
    );
    fireEvent.click(screen.getByTestId('ids-button'));
    expect(screen.getByText('Copied!')).toBeInTheDocument();
  });
});
