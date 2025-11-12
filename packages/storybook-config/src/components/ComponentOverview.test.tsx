// TODO: Probably better done with end-to-end tests
import { render, screen } from '@testing-library/react';
import { ComponentOverview } from './ComponentOverview';
import { ModuleExports, StoryAnnotations } from 'storybook/internal/types';

// We mock the @storybook/addon-docs/blocks package to avoid rendering the actual DocsContainer component,
// Which relies on Storybook's context and would throw an error in a test environment (and is a pain to mock).

vi.mock('@storybook/addon-docs/blocks', async (importOriginal) => ({
  ...(await importOriginal<typeof import('@storybook/addon-docs/blocks')>()),
  useOf: () => ({
    type: 'story',
    story: {
      id: 'story-id',
      name: 'Story name',
    },
  }),
  Canvas: () => <div>Canvas rendered</div>,
  Controls: () => <div>Controls rendered</div>,
}));

// Mock the ComponentCanvas to avoid hook issues

vi.mock('./ComponentCanvas', () => ({
  ComponentCanvas: () => <div>Canvas rendered</div>,
}));

// Mock ComponentApiExpander to avoid import issues

vi.mock('./ComponentApiExpander', () => ({
  ComponentApiExpander: () => (
    <div>
      <button role="button" aria-expanded="false">
        Props
      </button>
      <div>Controls rendered</div>
    </div>
  ),
}));

const storiesMock: ModuleExports = {
  default: {},
  __namedExportsOrder: [],
};

describe('ComponentOverview', () => {
  it('renders canvas, controls and expander by default', () => {
    render(
      <ComponentOverview
        of={storiesMock.default as StoryAnnotations}
        meta={storiesMock}
      />,
    );

    expect(screen.getByText('Canvas rendered')).toBeInTheDocument();
    expect(screen.getByText('Controls rendered')).toBeInTheDocument();

    const props = screen.getByRole('button', { name: 'Props' });
    expect(props).toBeInTheDocument();
  });

  it('renders description if provided', () => {
    render(
      <ComponentOverview
        description="Hello world"
        of={storiesMock.default as StoryAnnotations}
        meta={storiesMock}
      />,
    );

    const heading = screen.getByRole('heading', { name: 'Overview' });
    expect(heading).toBeInTheDocument();

    const description = screen.getByText('Hello world');
    expect(description).toBeInTheDocument();
  });

  it('renders read more expander if provided', () => {
    render(
      <ComponentOverview
        readMore="Hello world"
        of={storiesMock.default as StoryAnnotations}
        meta={storiesMock}
      />,
    );

    const readMore = screen.getByRole('button', {
      name: 'Read more',
      expanded: false,
    });
    expect(readMore).toBeInTheDocument();

    // Content should be rendered into the expander
    const content = screen.getByText('Hello world');
    expect(
      document.getElementById(readMore.getAttribute('aria-controls') ?? ''),
    ).toContainElement(content);
  });
});
