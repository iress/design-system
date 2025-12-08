import React from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { PREVIEW_SNIPPET } from '../constants';
import { SNIPPET_RENDERED } from 'storybook/internal/docs-tools';

// Mock storybook addons
vi.mock('storybook/preview-api', () => ({
  addons: {
    getChannel: vi.fn(() => ({
      emit: vi.fn(),
      on: vi.fn(),
      off: vi.fn(),
    })),
  },
}));

import { PreviewSnippet } from './PreviewSnippet';
import { addons } from 'storybook/preview-api';

describe('PreviewSnippet', () => {
  let mockChannel: {
    emit: ReturnType<typeof vi.fn>;
    on: ReturnType<typeof vi.fn>;
    off: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    mockChannel = {
      emit: vi.fn(),
      on: vi.fn(),
      off: vi.fn(),
    };
    vi.mocked(addons.getChannel).mockReturnValue(mockChannel as never);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(<PreviewSnippet />);
    expect(true).toBe(true);
  });

  it('emits custom code when provided in parameters', () => {
    const context: { parameters: { docs: { source: { code: string } } } } = {
      parameters: {
        docs: {
          source: {
            code: 'const App = () => <div>Custom Code</div>;',
          },
        },
      },
    };

    render(<PreviewSnippet context={context as never} />);

    expect(mockChannel.emit).toHaveBeenCalledWith(
      PREVIEW_SNIPPET,
      'const App = () => <div>Custom Code</div>;',
    );
  });

  it('sets up event listener for automated snippet', () => {
    render(<PreviewSnippet />);

    expect(mockChannel.on).toHaveBeenCalledWith(
      SNIPPET_RENDERED,
      expect.any(Function),
    );
  });

  it('cleans up event listener on unmount', () => {
    const { unmount } = render(<PreviewSnippet />);

    unmount();

    expect(mockChannel.off).toHaveBeenCalledWith(
      SNIPPET_RENDERED,
      expect.any(Function),
    );
  });

  it('emits automated snippet when no custom code', () => {
    const context: { parameters: Record<string, unknown> } = {
      parameters: {},
    };

    render(<PreviewSnippet context={context as never} />);

    // Get the callback function that was registered
    const callback = mockChannel.on.mock.calls[0]?.[1] as
      | ((data: { source: string }) => void)
      | undefined;

    // Simulate automated snippet event
    callback?.({ source: 'const App = () => <div>Automated</div>;' });

    expect(mockChannel.emit).toHaveBeenCalledWith(
      PREVIEW_SNIPPET,
      'const App = () => <div>Automated</div>;',
    );
  });

  it('does not emit automated snippet when custom code exists', () => {
    const context: { parameters: { docs: { source: { code: string } } } } = {
      parameters: {
        docs: {
          source: {
            code: 'const App = () => <div>Custom</div>;',
          },
        },
      },
    };

    render(<PreviewSnippet context={context as never} />);

    // Clear the emit call from custom code
    mockChannel.emit.mockClear();

    // Get the callback function that was registered
    const callback = mockChannel.on.mock.calls[0]?.[1] as
      | ((data: { source: string }) => void)
      | undefined;

    // Simulate automated snippet event
    callback?.({ source: 'const App = () => <div>Automated</div>;' });

    // Should not emit automated snippet since custom code exists
    expect(mockChannel.emit).not.toHaveBeenCalled();
  });

  it('applies transform function when provided', () => {
    const mockTransform = vi.fn((source: string) => `transformed: ${source}`);
    const context: {
      parameters: { docs: { source: { transform: typeof mockTransform } } };
    } = {
      parameters: {
        docs: {
          source: {
            transform: mockTransform,
          },
        },
      },
    };

    render(<PreviewSnippet context={context as never} />);

    // Get the callback function that was registered
    const callback = mockChannel.on.mock.calls[0]?.[1] as
      | ((data: { source: string }) => void)
      | undefined;

    // Simulate automated snippet event
    callback?.({ source: 'const App = () => <div>Original</div>;' });

    expect(mockTransform).toHaveBeenCalledWith(
      'const App = () => <div>Original</div>;',
      context,
    );
    expect(mockChannel.emit).toHaveBeenCalledWith(
      PREVIEW_SNIPPET,
      'transformed: const App = () => <div>Original</div>;',
    );
  });

  it('does not emit when source is empty', () => {
    render(<PreviewSnippet />);

    // Get the callback function that was registered
    const callback = mockChannel.on.mock.calls[0]?.[1] as
      | ((data: { source: string }) => void)
      | undefined;

    // Simulate automated snippet event with empty source
    callback?.({ source: '' });

    expect(mockChannel.emit).not.toHaveBeenCalled();
  });

  it('does not emit when source is undefined', () => {
    render(<PreviewSnippet />);

    // Get the callback function that was registered
    const callback = mockChannel.on.mock.calls[0]?.[1] as
      | ((data: { source?: string }) => void)
      | undefined;

    // Simulate automated snippet event with no source
    callback?.({});

    expect(mockChannel.emit).not.toHaveBeenCalled();
  });

  it('handles missing channel gracefully', () => {
    vi.mocked(addons.getChannel).mockReturnValue(null as never);

    expect(() => {
      render(<PreviewSnippet />);
    }).not.toThrow();
  });

  it('updates when context parameters change', () => {
    const { rerender } = render(<PreviewSnippet />);

    const newContext: { parameters: { docs: { source: { code: string } } } } = {
      parameters: {
        docs: {
          source: {
            code: 'const App = () => <div>Updated</div>;',
          },
        },
      },
    };

    rerender(<PreviewSnippet context={newContext as never} />);

    expect(mockChannel.emit).toHaveBeenCalledWith(
      PREVIEW_SNIPPET,
      'const App = () => <div>Updated</div>;',
    );
  });
});
