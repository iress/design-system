import { render, screen } from '@testing-library/react';
import { Metadata } from './Metadata';
import type { ComponentMeta } from '@iress-oss/ids-storybook-config';

vi.mock('@iress-oss/ids-components', () => ({
  IressInline: (props: Record<string, unknown>) => (
    <div data-testid="ids-inline">{props.children as React.ReactNode}</div>
  ),
  IressIcon: ({ name }: { name: string }) => (
    <span data-testid="ids-icon" data-name={name} />
  ),
  IressText: (props: Record<string, unknown>) => {
    const Element = (props.element as string) || 'span';
    return (
      // @ts-expect-error — dynamic element for mock
      <Element data-testid="ids-text">
        {props.children as React.ReactNode}
      </Element>
    );
  },
  IressStack: (props: Record<string, unknown>) => (
    <div data-testid="ids-stack">{props.children as React.ReactNode}</div>
  ),
  IressButton: (props: Record<string, unknown>) => (
    <a
      href={props.href as string | undefined}
      data-testid="ids-button"
      target={props.target as string | undefined}
      rel={props.rel as string | undefined}
    >
      {props.children as React.ReactNode}
    </a>
  ),
  IressTooltip: (props: Record<string, unknown>) => (
    <div data-tooltip={props.tooltipText as string | undefined}>
      {props.children as React.ReactNode}
    </div>
  ),
  IressStyled: (props: Record<string, unknown>) => (
    <span>{props.children as React.ReactNode}</span>
  ),
}));

const baseMeta: ComponentMeta = {
  heading: 'Alert',
  description: 'An alert component',
  tags: ['stable'],
  Thumbnail: null,
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
