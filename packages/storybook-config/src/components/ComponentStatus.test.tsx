// TODO: Probably better done with end-to-end tests
import { render, screen } from '@testing-library/react';
import { ComponentStatus } from './ComponentStatus';
import { ModuleExports } from 'storybook/internal/types';

// We mock the @storybook/addon-docs/blocks package to avoid rendering the actual DocsContainer component,
// Which relies on Storybook's context and would throw an error in a test environment (and is a pain to mock).
vi.mock('storybook/internal/components', async (importOriginal) => ({
  ...(await importOriginal<typeof import('storybook/internal/components')>()),
  Badge: ({ children }) => <div>{children}</div>,
}));

describe('ComponentStatus', () => {
  it('renders nothing if no applicable tags', () => {
    const storiesMock: ModuleExports = {
      default: {
        tags: ['tag'],
      },
      __namedExportsOrder: [],
    };

    const { container } = render(<ComponentStatus stories={storiesMock} />);

    expect(container).toBeEmptyDOMElement();
  });

  it('renders caution tag', () => {
    const storiesMock: ModuleExports = {
      default: {
        tags: ['caution:SomeComponent'],
      },
      __namedExportsOrder: [],
    };

    render(<ComponentStatus stories={storiesMock} />);

    expect(screen.getByText('Caution')).toBeInTheDocument();
    expect(screen.getByText(`Use SomeComponent instead`)).toBeInTheDocument();
  });

  it('renders beta tag', () => {
    const storiesMock: ModuleExports = {
      default: {
        tags: ['beta:SomeComponent'],
      },
      __namedExportsOrder: [],
    };

    render(<ComponentStatus stories={storiesMock} />);

    expect(screen.getByText('Beta')).toBeInTheDocument();
    expect(screen.getByText(`Replaces SomeComponent`)).toBeInTheDocument();
  });

  it('renders updated tag', () => {
    const storiesMock: ModuleExports = {
      default: {
        tags: ['updated'],
      },
      __namedExportsOrder: [],
    };

    render(<ComponentStatus stories={storiesMock} />);

    expect(screen.getByText('Updated')).toBeInTheDocument();
  });
});
