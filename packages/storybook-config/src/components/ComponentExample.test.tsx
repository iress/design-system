// TODO: Probably better done with end-to-end tests
import { render, screen } from '@testing-library/react';
import { ComponentExample } from './ComponentExample';
import { ModuleExports, StoryAnnotations } from 'storybook/internal/types';

// We mock the @storybook/addon-docs/blocks package to avoid rendering the actual DocsContainer component,
// Which relies on Storybook's context and would throw an error in a test environment (and is a pain to mock).
// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
vi.mock('@storybook/addon-docs/blocks', async (importOriginal) => ({
  ...(await (
    importOriginal as () => Promise<
      typeof import('@storybook/addon-docs/blocks')
    >
  )()),
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
// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
vi.mock('./ComponentCanvas', () => ({
  ComponentCanvas: () => <div>Canvas rendered</div>,
}));

// Mock ComponentApiExpander to avoid import issues
// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
vi.mock('./ComponentApiExpander', () => ({
  ComponentApiExpander: ({
    heading = 'Props',
    headingLevel = 4,
    details,
    ...props
  }: {
    heading?: string;
    headingLevel?: number;
    details?: React.ReactNode;
  }) => (
    <div role="region" aria-labelledby={`heading-${heading}`} {...props}>
      <button role="button" aria-expanded="false">
        {heading}
      </button>
      <h4 id={`heading-${heading}`} role="heading" aria-level={headingLevel}>
        {heading}
      </h4>
      {details && <div>{details}</div>}
    </div>
  ),
}));

const storiesMock: ModuleExports = {
  default: {},
  __namedExportsOrder: [],
};

describe('ComponentExample', () => {
  it('renders canvas only by default', () => {
    render(
      <ComponentExample
        of={storiesMock.default as StoryAnnotations}
        meta={storiesMock}
      />,
    );

    expect(screen.getByText('Canvas rendered')).toBeInTheDocument();
    expect(screen.queryByText('Controls rendered')).not.toBeInTheDocument();
  });

  it('renders expander if api is provided', () => {
    render(
      <ComponentExample
        of={storiesMock.default as StoryAnnotations}
        meta={storiesMock}
        api="API"
      />,
    );

    const expander = screen.getByRole('button', {
      name: 'API',
      expanded: false,
    });
    expect(expander).toBeInTheDocument();

    const heading = screen.getByRole('heading', { name: 'API', level: 4 });
    expect(heading).toBeInTheDocument();
  });

  it('renders custom api', () => {
    render(
      <ComponentExample
        of={storiesMock.default as StoryAnnotations}
        meta={storiesMock}
        api={{
          heading: 'Custom API',
          headingLevel: 2,
          details: 'Details',
        }}
      />,
    );

    const expander = screen.getByRole('button', {
      name: 'Custom API',
      expanded: false,
    });
    expect(expander).toBeInTheDocument();

    const heading = screen.getByRole('heading', {
      name: 'Custom API',
      level: 2,
    });
    expect(heading).toBeInTheDocument();

    const details = screen.getByText('Details');
    expect(details).toBeInTheDocument();
  });
});
