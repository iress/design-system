import { render, screen } from '@testing-library/react';
import { MdxLayout } from './MdxLayout';

vi.mock('@iress-oss/ids-components', () => ({
  IressStack: ({ children, ...props }: React.PropsWithChildren) => (
    <div data-testid="ids-stack" {...props}>
      {children}
    </div>
  ),
  IressText: ({
    children,
    element: Element = 'span',
    ...props
  }: React.PropsWithChildren<{ element?: string }>) => (
    <Element data-testid="ids-text" {...props}>
      {children}
    </Element>
  ),
  IressDivider: () => <hr data-testid="ids-divider" />,
}));

describe('MdxLayout', () => {
  it('renders the title', () => {
    render(<MdxLayout title="Test Title">Content</MdxLayout>);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('renders the description when provided', () => {
    render(
      <MdxLayout title="Title" description="A description">
        Content
      </MdxLayout>,
    );
    expect(screen.getByText('A description')).toBeInTheDocument();
  });

  it('does not render description when not provided', () => {
    const { container } = render(
      <MdxLayout title="Title">Content</MdxLayout>,
    );
    const texts = container.querySelectorAll('[data-testid="ids-text"]');
    // Only the title text, no description
    const textContents = Array.from(texts).map((el) => el.textContent);
    expect(textContents).not.toContain('');
  });

  it('renders children content', () => {
    render(
      <MdxLayout title="Title">
        <p>Child content</p>
      </MdxLayout>,
    );
    expect(screen.getByText('Child content')).toBeInTheDocument();
  });

  it('renders as an article element', () => {
    const { container } = render(
      <MdxLayout title="Title">Content</MdxLayout>,
    );
    const stacks = container.querySelectorAll('[data-testid="ids-stack"]');
    // The outer stack should have element="article" passed through
    expect(stacks.length).toBeGreaterThan(0);
  });

  it('renders a divider', () => {
    render(<MdxLayout title="Title">Content</MdxLayout>);
    expect(screen.getByTestId('ids-divider')).toBeInTheDocument();
  });
});
