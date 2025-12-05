import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { IressProvider } from '@iress-oss/ids-components';
import { CodeSandbox } from './CodeSandbox';

// Mock window.location.href
const mockLocationHref = vi.fn();

describe('CodeSandbox', () => {
  beforeEach(() => {
    // Mock window.top and window.location
    Object.defineProperty(window, 'top', {
      value: {
        location: {
          set href(url: string) {
            mockLocationHref(url);
          },
        },
      },
      writable: true,
    });

    Object.defineProperty(window, 'location', {
      value: {
        set href(url: string) {
          mockLocationHref(url);
        },
      },
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
      'Redirecting...',
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

    expect(mockLocationHref).toHaveBeenCalledWith(
      expect.stringContaining(
        'https://codesandbox.io/api/v1/sandboxes/define?parameters=',
      ),
    );
  });

  it('falls back to window.location when window.top is not available', () => {
    Object.defineProperty(window, 'top', {
      value: null,
      writable: true,
    });

    const mockFiles = {
      'index.js': { content: 'console.log("test")', isBinary: false },
    };

    renderWithProvider(<CodeSandbox files={mockFiles} />);

    expect(mockLocationHref).toHaveBeenCalledWith(
      expect.stringContaining(
        'https://codesandbox.io/api/v1/sandboxes/define?parameters=',
      ),
    );
  });
});
