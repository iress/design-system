import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { IressProvider } from '@iress-oss/ids-components';
import { CodeSandbox } from './CodeSandbox';

// Mock window.open
const mockWindowOpen = vi.fn();

describe('CodeSandbox', () => {
  beforeEach(() => {
    // Mock window.open
    Object.defineProperty(window, 'open', {
      value: mockWindowOpen,
      writable: true,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  const renderWithProvider = (ui: React.ReactElement) => {
    return render(<IressProvider>{ui}</IressProvider>);
  };

  it('throws error when files prop is not provided', () => {
    expect(() => {
      renderWithProvider(<CodeSandbox files={undefined as never} />);
    }).toThrow('CodeSandbox component requires a "files" prop');
  });

  it('renders default title when no title provided', () => {
    const mockFiles = {
      'index.js': { content: 'console.log("test")', isBinary: false },
    };

    renderWithProvider(<CodeSandbox files={mockFiles} />);

    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      'Redirecting to CodeSandbox...',
    );
  });

  it('renders custom title when provided', () => {
    const mockFiles = {
      'index.js': { content: 'console.log("test")', isBinary: false },
    };

    renderWithProvider(
      <CodeSandbox files={mockFiles} title="Opening CodeSandbox" />,
    );

    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      'Opening CodeSandbox',
    );
  });

  it('renders fallback link with correct href', () => {
    const mockFiles = {
      'index.js': { content: 'console.log("test")', isBinary: false },
    };

    renderWithProvider(<CodeSandbox files={mockFiles} />);

    const link = screen.getByRole('link', { name: 'follow the link' });
    expect(link).toHaveAttribute(
      'href',
      expect.stringContaining(
        'https://codesandbox.io/api/v1/sandboxes/define?parameters=',
      ),
    );
  });

  it('redirects to CodeSandbox URL', () => {
    const mockFiles = {
      'index.js': { content: 'console.log("test")', isBinary: false },
    };

    renderWithProvider(<CodeSandbox files={mockFiles} />);

    expect(mockWindowOpen).toHaveBeenCalledWith(
      expect.stringContaining(
        'https://codesandbox.io/api/v1/sandboxes/define?parameters=',
      ),
      '_blank',
    );
  });

  it('opens CodeSandbox in new tab', () => {
    const mockFiles = {
      'index.js': { content: 'console.log("test")', isBinary: false },
    };

    renderWithProvider(<CodeSandbox files={mockFiles} />);

    expect(mockWindowOpen).toHaveBeenCalledWith(
      expect.stringContaining(
        'https://codesandbox.io/api/v1/sandboxes/define?parameters=',
      ),
      '_blank',
    );
  });
});
