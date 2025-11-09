// TODO: Probably better done with end-to-end tests
import { render, screen } from '@testing-library/react';
import { ComponentStatus } from './ComponentStatus';
import { ModuleExports } from 'storybook/internal/types';
import { vi, describe, it, expect } from 'vitest';
import React from 'react';

// We mock the @storybook/addon-docs/blocks package to avoid rendering the actual DocsContainer component,
// Which relies on Storybook's context and would throw an error in a test environment (and is a pain to mock).
vi.mock('storybook/internal/components', async (importOriginal) => ({
  ...(await importOriginal<typeof import('storybook/internal/components')>()),
  Badge: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

// Mock React's use function to return mock components
vi.mock('react', async (importOriginal) => {
  const actual = await importOriginal<typeof React>();
  return {
    ...actual,
    use: () => ({
      IressDivider: ({ children }: { children?: React.ReactNode }) => (
        <hr>{children}</hr>
      ),
      IressInline: ({ children }: { children?: React.ReactNode }) => (
        <div style={{ display: 'flex' }}>{children}</div>
      ),
      IressStack: ({ children }: { children?: React.ReactNode }) => (
        <div>{children}</div>
      ),
      IressText: ({
        children,
        element,
      }: {
        children?: React.ReactNode;
        element?: string;
      }) =>
        element === 'strong' ? (
          <strong>{children}</strong>
        ) : (
          <span>{children}</span>
        ),
    }),
  };
});

describe('ComponentStatus', () => {
  it('renders nothing if no applicable tags', () => {
    const storiesMock: ModuleExports = {
      default: {
        tags: ['tag'],
      },
      __namedExportsOrder: [],
    };

    const { container } = render(<ComponentStatus meta={storiesMock} />);

    expect(container).toBeEmptyDOMElement();
  });

  it('renders caution tag', () => {
    const storiesMock: ModuleExports = {
      default: {
        tags: ['caution:SomeComponent'],
      },
      __namedExportsOrder: [],
    };

    render(<ComponentStatus meta={storiesMock} />);

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

    render(<ComponentStatus meta={storiesMock} />);

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

    render(<ComponentStatus meta={storiesMock} />);

    expect(screen.getByText('Updated')).toBeInTheDocument();
  });
});
