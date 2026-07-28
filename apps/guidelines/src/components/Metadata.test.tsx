import { render, screen } from '@testing-library/react';
import { Metadata } from './Metadata';
import type { ComponentMeta } from '@iress-oss/ids-storybook-config';

vi.mock('@iress-oss/ids-components', () => ({
  IressInline: ({ children }: React.PropsWithChildren) => (
    <div data-testid="ids-inline">{children}</div>
  ),
  IressIcon: ({ name }: { name: string }) => (
    <span data-testid="ids-icon" data-name={name} />
  ),
  IressText: ({
    children,
    element: Element = 'span',
  }: React.PropsWithChildren<{ element?: string }>) => (
    <Element data-testid="ids-text">{children}</Element>
  ),
  IressStack: ({ children }: React.PropsWithChildren) => (
    <div data-testid="ids-stack">{children}</div>
  ),
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
    <div data-tooltip={tooltipText}>{children}</div>
  ),
  IressStyled: ({ children }: React.PropsWithChildren) => (
    <span>{children}</span>
  ),
}));

const baseMeta: ComponentMeta = {
  heading: 'Alert',
  description: 'An alert component',
  tags: ['stable'],
};

describe('Metadata', () => {
  it('renders the import statement when provided', () => {
    const meta = {
      ...baseMeta,
      import: "import { IressAlert } from '@iress-oss/ids-components';",
    };
    render(<Metadata meta={meta} />);
    expect(
      screen.getByText(
        "import { IressAlert } from '@iress-oss/ids-components';",
      ),
    ).toBeInTheDocument();
  });

  it('does not render import section when import is not provided', () => {
    render(<Metadata meta={baseMeta} />);
    expect(screen.queryByText('Import')).not.toBeInTheDocument();
  });

  it('renders GitHub source link when provided', () => {
    const meta = {
      ...baseMeta,
      github: { source: 'https://github.com/iress/design-system/src/Alert' },
    };
    render(<Metadata meta={meta} />);
    expect(screen.getByText('Source')).toBeInTheDocument();
    const sourceLink = screen.getByText('Source').closest('a');
    expect(sourceLink).toHaveAttribute(
      'href',
      'https://github.com/iress/design-system/src/Alert',
    );
  });

  it('renders report issue link when provided', () => {
    const meta = {
      ...baseMeta,
      github: { reportIssue: 'https://github.com/iress/design-system/issues' },
    };
    render(<Metadata meta={meta} />);
    expect(screen.getByText('Report issue')).toBeInTheDocument();
  });

  it('renders guidelines link when provided', () => {
    const meta = {
      ...baseMeta,
      guidelines: 'https://example.com/guidelines/alert',
    };
    render(<Metadata meta={meta} />);
    expect(screen.getByText('Guidelines')).toBeInTheDocument();
  });

  it('renders storybook link when provided', () => {
    const meta = {
      ...baseMeta,
      storybook: 'https://storybook.example.com/alert',
    };
    render(<Metadata meta={meta} />);
    expect(screen.getByText('Storybook')).toBeInTheDocument();
  });

  it('renders figma link when provided', () => {
    const meta = {
      ...baseMeta,
      figma: 'https://figma.com/file/abc',
    };
    render(<Metadata meta={meta} />);
    expect(screen.getByText('Figma')).toBeInTheDocument();
  });

  it('renders nothing for docs section when no links provided', () => {
    render(<Metadata meta={baseMeta} />);
    expect(screen.queryByText('Docs')).not.toBeInTheDocument();
    expect(screen.queryByText('Github')).not.toBeInTheDocument();
  });
});
