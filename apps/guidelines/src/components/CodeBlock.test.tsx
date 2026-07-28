import { render, screen, fireEvent } from '@testing-library/react';
import { CodeBlock } from './CodeBlock';

vi.mock('@iress-oss/ids-components', () => ({
  IressCard: ({ children }: React.PropsWithChildren) => (
    <div data-testid="ids-card">{children}</div>
  ),
  IressButton: ({
    children,
    onClick,
    ...props
  }: React.PropsWithChildren<{ onClick?: () => void }>) => (
    <button data-testid="ids-button" onClick={onClick} {...props}>
      {children}
    </button>
  ),
  IressInline: ({ children }: React.PropsWithChildren) => (
    <div data-testid="ids-inline">{children}</div>
  ),
  IressLink: ({
    children,
    href,
    ...props
  }: React.PropsWithChildren<{ href?: string }>) => (
    <a href={href} data-testid="ids-link" {...props}>
      {children}
    </a>
  ),
}));

describe('CodeBlock', () => {
  it('renders the code content', () => {
    render(<CodeBlock>const x = 1;</CodeBlock>);
    expect(screen.getByText('const x = 1;')).toBeInTheDocument();
  });

  it('applies the language class to the code element', () => {
    const { container } = render(
      <CodeBlock language="tsx">code</CodeBlock>,
    );
    const codeEl = container.querySelector('code');
    expect(codeEl).toHaveClass('language-tsx');
  });

  it('does not apply language class when language is not provided', () => {
    const { container } = render(<CodeBlock>code</CodeBlock>);
    const codeEl = container.querySelector('code');
    expect(codeEl).not.toHaveAttribute('class');
  });

  it('renders a Copy button', () => {
    render(<CodeBlock>code</CodeBlock>);
    expect(screen.getByText('Copy')).toBeInTheDocument();
  });

  it('copies code to clipboard when Copy is clicked', () => {
    const writeTextMock = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, {
      clipboard: { writeText: writeTextMock },
    });

    render(<CodeBlock>const y = 2;</CodeBlock>);
    fireEvent.click(screen.getByText('Copy'));
    expect(writeTextMock).toHaveBeenCalledWith('const y = 2;');
  });

  it('renders a Storybook link when chromaticUrl is provided', () => {
    render(
      <CodeBlock chromaticUrl="https://chromatic.com/story">code</CodeBlock>,
    );
    const link = screen.getByTestId('ids-link');
    expect(link).toHaveAttribute('href', 'https://chromatic.com/story');
    expect(screen.getByText('View in Storybook')).toBeInTheDocument();
  });

  it('does not render a Storybook link when chromaticUrl is not provided', () => {
    render(<CodeBlock>code</CodeBlock>);
    expect(screen.queryByTestId('ids-link')).not.toBeInTheDocument();
  });
});
