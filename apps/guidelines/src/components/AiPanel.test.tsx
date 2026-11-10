import { render, screen } from '@testing-library/react';
import { AiPanel } from './AiPanel';

vi.mock('@iress-oss/ids-components', () => ({
  IressButton: ({
    children,
    href,
    ...props
  }: React.PropsWithChildren<{ href?: string }>) => (
    <a href={href} data-testid="ids-button" {...props}>
      {children}
    </a>
  ),
  IressTooltip: ({
    children,
    tooltipText,
  }: React.PropsWithChildren<{ tooltipText?: string }>) => (
    <div data-testid="ids-tooltip" data-tooltip={tooltipText}>
      {children}
    </div>
  ),
}));

describe('AiPanel', () => {
  it('renders the Ask Iris button', () => {
    render(<AiPanel />);
    expect(screen.getByText('🌸 Ask Iris')).toBeInTheDocument();
  });

  it('links to the Gemini Gem URL', () => {
    render(<AiPanel />);
    const link = screen.getByTestId('ids-button');
    expect(link).toHaveAttribute(
      'href',
      'https://gemini.google.com/gem/68dd0863ccea',
    );
  });

  it('opens in a new tab', () => {
    render(<AiPanel />);
    const link = screen.getByTestId('ids-button');
    expect(link).toHaveAttribute('target', '_blank');
  });

  it('has noopener noreferrer for security', () => {
    render(<AiPanel />);
    const link = screen.getByTestId('ids-button');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('has a tooltip with helpful description', () => {
    render(<AiPanel />);
    const tooltip = screen.getByTestId('ids-tooltip');
    expect(tooltip.dataset.tooltip).toContain('Ask Iris');
  });
});
