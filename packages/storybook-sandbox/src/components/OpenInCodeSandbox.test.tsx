import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { OpenInCodeSandbox } from './OpenInCodeSandbox';
import { ADDON_ID, PREVIEW_SNIPPET } from '../constants';
import type { API } from 'storybook/manager-api';

// Mock dependencies
vi.mock('../helpers/getSandboxUrl', () => ({
  getSandboxUrl: vi.fn(() => 'https://codesandbox.io/s/mock-sandbox'),
}));

vi.mock('../helpers/transformCode', () => ({
  transformCodeWithParameters: vi.fn((code) => `transformed: ${code}`),
}));

vi.mock('storybook/manager-api', () => ({
  useParameter: vi.fn(),
}));

vi.mock('storybook/internal/components', () => ({
  IconButton: ({
    children,
    onClick,
    title,
  }: {
    children?: React.ReactNode;
    onClick?: () => void;
    title?: string;
  }) => (
    <button onClick={onClick} title={title} data-testid="icon-button">
      {children}
    </button>
  ),
}));

// Mock raw imports
vi.mock('./OpenInCodeSandbox.html?raw', () => ({
  default: '<div id="root"></div>',
}));

vi.mock('./OpenInCodeSandbox.template?raw', () => ({
  default: 'import React from "react";\n<Story />',
}));

vi.mock('./OpenInCodeSandboxCustom.template?raw', () => ({
  default:
    'import React from "react";\nimport Component from "./component";\n<Component />',
}));

import { getSandboxUrl } from '../helpers/getSandboxUrl';
import { transformCodeWithParameters } from '../helpers/transformCode';
import { useParameter } from 'storybook/manager-api';
import type { NodeEventTarget } from 'events';

describe('OpenInCodeSandbox', () => {
  let mockApi: Partial<API>;
  let mockChannel: {
    on: ReturnType<typeof vi.fn>;
    off: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    mockChannel = {
      on: vi.fn(),
      off: vi.fn(),
    };
    mockApi = {
      getChannel: vi.fn(() => mockChannel),
    } as unknown as API;

    vi.mocked(useParameter).mockImplementation(
      (key: string, defaultValue: unknown) => {
        if (key === 'docs') return {} as Record<string, unknown>;
        if (key === ADDON_ID)
          return {
            html: '<div id="root"></div>',
            template: 'import React from "react";\n<Story />',
            ...(defaultValue as Record<string, unknown>),
          } as Record<string, unknown>;
        return defaultValue;
      },
    );

    // Mock window.open
    Object.defineProperty(window, 'open', {
      value: vi.fn(),
      writable: true,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders icon button when active', () => {
    render(<OpenInCodeSandbox api={mockApi as never} />);
    expect(screen.getByTestId('icon-button')).toBeInTheDocument();
  });

  it('does not render when inactive', () => {
    render(<OpenInCodeSandbox api={mockApi as never} active={false} />);
    expect(screen.queryByTestId('icon-button')).not.toBeInTheDocument();
  });

  it('sets up event listener for preview snippet', () => {
    render(<OpenInCodeSandbox api={mockApi as never} />);

    expect(mockChannel.on).toHaveBeenCalledWith(
      PREVIEW_SNIPPET,
      expect.any(Function),
    );
  });

  it('cleans up event listener on unmount', () => {
    const { unmount } = render(<OpenInCodeSandbox api={mockApi as never} />);

    unmount();

    expect(mockChannel.off).toHaveBeenCalledWith(
      PREVIEW_SNIPPET,
      expect.any(Function),
    );
  });

  it('opens CodeSandbox with default template when clicked', () => {
    render(<OpenInCodeSandbox api={mockApi as never} />);

    fireEvent.click(screen.getByTestId('icon-button'));

    expect(getSandboxUrl).toHaveBeenCalledWith({
      files: expect.objectContaining({
        'index.tsx': {
          content: '',
          isBinary: false,
        },
        'index.html': {
          content: '<div id="root"></div>',
          isBinary: false,
        },
        'package.json': {
          content: expect.stringContaining('"react": "latest"') as string,
          isBinary: false,
        },
      }) as NodeEventTarget,
    });
    expect(window.open).toHaveBeenCalledWith(
      'https://codesandbox.io/s/mock-sandbox',
      '_blank',
    );
  });

  it('uses custom template when docs source code exists', () => {
    vi.mocked(useParameter).mockImplementation(
      (key: string, defaultValue: unknown) => {
        if (key === 'docs')
          return {
            source: {
              code: 'const App = () => <div>Custom</div>;',
            },
          };
        if (key === ADDON_ID) return defaultValue;
        return defaultValue;
      },
    );

    render(<OpenInCodeSandbox api={mockApi as never} />);

    fireEvent.click(screen.getByTestId('icon-button'));

    expect(getSandboxUrl).toHaveBeenCalledWith({
      files: expect.objectContaining({
        'index.tsx': {
          content:
            'import React from "react";\nimport Component from "./component";\n<Component />',
          isBinary: false,
        },
        'component.tsx': {
          content: '',
          isBinary: false,
        },
      }) as never,
    });
  });

  it('transforms source code when received', () => {
    render(<OpenInCodeSandbox api={mockApi as never} />);

    // Get the callback function that was registered
    const callback = mockChannel.on.mock.calls[0]?.[1] as
      | ((code: string) => void)
      | undefined;

    // Simulate preview snippet event
    act(() => {
      callback?.('const App = () => <div>Test</div>;');
    });

    expect(transformCodeWithParameters).toHaveBeenCalledWith(
      'const App = () => <div>Test</div>;',
      expect.any(Object),
      expect.any(Object),
    );
  });

  it('includes additional dependencies from config', () => {
    vi.mocked(useParameter).mockImplementation(
      (key: string, defaultValue: unknown) => {
        if (key === 'docs') return {} as Record<string, unknown>;
        if (key === ADDON_ID)
          return {
            ...(defaultValue as Record<string, unknown>),
            dependencies: {
              'custom-lib': '1.0.0',
            },
          };
        return defaultValue;
      },
    );

    render(<OpenInCodeSandbox api={mockApi as never} />);

    fireEvent.click(screen.getByTestId('icon-button'));

    expect(getSandboxUrl).toHaveBeenCalledWith({
      files: expect.objectContaining({
        'package.json': {
          content: expect.stringContaining('"custom-lib": "1.0.0"') as string,
          isBinary: false,
        },
      }) as never,
    });
  });

  it('includes additional files from config', () => {
    vi.mocked(useParameter).mockImplementation(
      (key: string, defaultValue: unknown) => {
        if (key === 'docs') return {} as Record<string, unknown>;
        if (key === ADDON_ID)
          return {
            ...(defaultValue as Record<string, unknown>),
            files: {
              'custom.js': {
                content: 'console.log("custom");',
                isBinary: false,
              },
            },
          };
        return defaultValue;
      },
    );

    render(<OpenInCodeSandbox api={mockApi as never} />);

    fireEvent.click(screen.getByTestId('icon-button'));

    expect(getSandboxUrl).toHaveBeenCalledWith({
      files: expect.objectContaining({
        'custom.js': {
          content: 'console.log("custom");',
          isBinary: false,
        },
      }) as never,
    });
  });

  it('uses custom HTML from config', () => {
    vi.mocked(useParameter).mockImplementation(
      (key: string, defaultValue: unknown) => {
        if (key === 'docs') return {} as Record<string, unknown>;
        if (key === ADDON_ID)
          return {
            ...(defaultValue as Record<string, unknown>),
            html: '<div id="custom-root"></div>',
          };
        return defaultValue;
      },
    );

    render(<OpenInCodeSandbox api={mockApi as never} />);

    fireEvent.click(screen.getByTestId('icon-button'));

    expect(getSandboxUrl).toHaveBeenCalledWith({
      files: expect.objectContaining({
        'index.html': {
          content: '<div id="custom-root"></div>',
          isBinary: false,
        },
      }) as never,
    });
  });

  it('updates when parameters change', () => {
    const { rerender } = render(<OpenInCodeSandbox api={mockApi as never} />);

    // Change the mock to return different parameters
    vi.mocked(useParameter).mockImplementation(
      (key: string, defaultValue: unknown) => {
        if (key === 'docs')
          return {
            source: {
              code: 'const App = () => <div>Updated</div>;',
            },
          };
        if (key === ADDON_ID) return defaultValue;
        return defaultValue;
      },
    );

    rerender(<OpenInCodeSandbox api={mockApi as never} />);

    fireEvent.click(screen.getByTestId('icon-button'));

    expect(getSandboxUrl).toHaveBeenCalledWith({
      files: expect.objectContaining({
        'index.tsx': {
          content:
            'import React from "react";\nimport Component from "./component";\n<Component />',
          isBinary: false,
        },
      }) as never,
    });
  });
});
