import { fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AutoDocs } from './AutoDocs';
import type { ParametersConfig } from '../types';

interface TestStory {
  id: string;
  name: string;
  tags: string[];
  moduleExport: { label: string; tags?: string[] };
}

const docs: {
  stories: TestStory[];
  config: NonNullable<ParametersConfig['idsConfig']>;
} = vi.hoisted(() => ({
  stories: [],
  config: {},
}));

vi.mock('@storybook/addon-docs/blocks', async () => {
  const { createContext } = await import('react');
  return {
    DocsContext: createContext({ componentStories: () => docs.stories }),
    useOf: () => ({
      type: 'meta',
      preparedMeta: {
        title: 'Components/Example',
        tags: [],
        parameters: { idsConfig: docs.config },
      },
    }),
    Title: () => <h1>Example documentation</h1>,
    Subtitle: () => <span>Example subtitle</span>,
    Description: () => <p>Example description</p>,
    Controls: () => <div>Playground controls</div>,
    ArgTypes: () => <div>Component properties</div>,
    Story: ({ of }: { of: { label: string } }) => (
      <div>Reference: {of.label}</div>
    ),
  };
});

vi.mock('./ComponentCanvas', () => ({
  ComponentCanvas: ({ of }: { of: { label: string } }) => (
    <div>Canvas: {of.label}</div>
  ),
}));

vi.mock('./ComponentStatus', () => ({
  ComponentStatus: () => null,
}));

const story = (name: string, tags: string[] = []): TestStory => ({
  id: name.toLowerCase(),
  name,
  tags,
  moduleExport: { label: name, tags },
});

describe('autodocs templates', () => {
  beforeEach(() => {
    window.location.hash = '';
    docs.config = {};
    docs.stories = [story('Default'), story('Example')];
  });

  afterEach(() => {
    window.location.hash = '';
  });

  it('renders standard stories with a table of contents by default', () => {
    render(<AutoDocs />);

    expect(screen.getByRole('heading', { name: 'Default' })).toBeVisible();
    expect(screen.getByText('Canvas: Example')).toBeVisible();
    expect(screen.getByRole('link', { name: 'Example' })).toHaveAttribute(
      'href',
      '#example',
    );
    expect(screen.queryByRole('tab')).not.toBeInTheDocument();
  });

  it('separates migration references from the main stories', async () => {
    docs.stories.push(story('Upgrade', ['migration']));
    render(<AutoDocs />);

    expect(screen.getByRole('tab', { name: 'Main' })).toBeVisible();
    await userEvent.click(screen.getByRole('tab', { name: 'Migration' }));

    expect(screen.getByText('Reference: Upgrade')).toBeVisible();
    expect(screen.queryByText('Canvas: Upgrade')).not.toBeInTheDocument();
  });

  it('renders landing pages without canvases or documentation chrome', () => {
    render(<AutoDocs template="landing" />);

    expect(screen.getByText('Reference: Default')).toBeVisible();
    expect(screen.getByText('Reference: Example')).toBeVisible();
    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
    expect(screen.queryByText('Canvas: Default')).not.toBeInTheDocument();
  });

  it('uses metadata to select a template and resolve the guidelines link', () => {
    docs.config = {
      autodocsTemplate: 'component',
      guidelinesUrl: (title) => `https://example.com/${title}`,
    };
    render(<AutoDocs template="landing" />);

    expect(screen.getByRole('tab', { name: 'Playground' })).toBeVisible();
    expect(
      screen.getByRole('link', { name: 'How to use this component?' }),
    ).toHaveAttribute('href', 'https://example.com/Components/Example');
  });

  it('groups examples, recipes, references, migrations, and custom tabs', async () => {
    docs.config.tabDescriptions = { slots: 'Configure the slots' };
    docs.stories.push(
      story('Recipe', ['recipe']),
      story('Rationale', ['reference']),
      story('Upgrade', ['migration']),
      story('Slots', ['tab:slots']),
      story('Hidden', ['!autodocs']),
    );
    render(<AutoDocs template="component" />);

    expect(screen.getByText('Canvas: Default')).toBeVisible();
    expect(screen.getByText('Playground controls')).toBeVisible();

    for (const [tab, content] of [
      ['Examples', 'Canvas: Example'],
      ['Recipes', 'Canvas: Recipe'],
      ['References', 'Reference: Rationale'],
      ['Migration', 'Canvas: Upgrade'],
      ['Slots', 'Canvas: Slots'],
    ]) {
      await userEvent.click(screen.getByRole('tab', { name: tab }));
      expect(screen.getByText(content)).toBeVisible();
    }

    expect(screen.getByText('Configure the slots')).toBeVisible();
    expect(screen.queryByText('Canvas: Hidden')).not.toBeInTheDocument();
    expect(window.location.hash).toBe('#slots');

    await userEvent.click(screen.getByRole('tab', { name: 'API (Props)' }));
    expect(screen.getByText('Component properties')).toBeVisible();
  });

  it('shows testing queries and the test-ID fallback when metadata is available', async () => {
    docs.config = {
      guidelinesUrl: 'https://example.com/guidelines',
      testMeta: [
        {
          part: 'button',
          description: 'Main button',
          query: "getByRole('button')",
          testId: 'button',
        },
        {
          part: 'icon',
          description: 'Decorative icon',
          testId: 'button__icon',
        },
      ],
    };
    render(<AutoDocs template="component" />);
    await userEvent.click(screen.getByRole('tab', { name: 'Testing' }));

    const table = screen.getByRole('table');
    expect(within(table).getByText("getByRole('button')")).toBeVisible();
    expect(within(table).getByText('Use test ID →')).toBeVisible();
    expect(
      within(table).getByText("getByTestId('button__icon')"),
    ).toBeVisible();
  });

  it('navigates to a tab requested by an embed hash message', async () => {
    render(<AutoDocs template="component" />);
    const target = screen.getByRole('heading', {
      name: 'Example',
      hidden: true,
    });
    target.scrollIntoView = vi.fn();
    fireEvent(
      window,
      new MessageEvent('message', {
        data: { type: 'UPDATE_HASH', hash: 'examples_example' },
      }),
    );

    expect(
      await screen.findByRole('tab', { name: 'Examples', selected: true }),
    ).toBeVisible();
    expect(target.scrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
    });
  });

  it('omits story tabs when no stories are available', () => {
    docs.stories = [];
    render(<AutoDocs template="component" />);

    expect(screen.queryByRole('tab', { name: 'Playground' })).toBeNull();
    expect(screen.queryByRole('tab', { name: 'Examples' })).toBeNull();
    expect(screen.queryByRole('tab', { name: 'Testing' })).toBeNull();
    expect(screen.getByRole('tab', { name: 'API (Props)' })).toBeVisible();
  });
});
