/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useSandboxCanvasProps } from './useSandboxCanvasProps';
import { ADDON_ID } from '../constants';

// Mock dependencies
vi.mock('../helpers/getSandboxUrl', () => ({
  getSandboxUrl: vi.fn(() => 'https://codesandbox.io/s/mock-sandbox'),
}));

vi.mock('../helpers/transformCode', () => ({
  transformCodeWithParameters: vi.fn((code) => `transformed: ${code}`),
}));

vi.mock('../components/SandboxIcon', () => ({
  SandboxIcon: () => 'SandboxIcon',
}));

// Mock raw imports
vi.mock('../components/OpenInCodeSandbox.html?raw', () => ({
  default: '<div id="root"></div>',
}));

vi.mock('../components/OpenInCodeSandboxCustom.template?raw', () => ({
  default:
    'import React from "react";\nimport Component from "./component";\n<Component />',
}));

import { getSandboxUrl } from '../helpers/getSandboxUrl';
import { transformCodeWithParameters } from '../helpers/transformCode';

// Helper function to find and type the sandbox action
function findSandboxAction(actions: unknown[] | undefined) {
  return actions?.find((action) => {
    const title = action as {
      title?: { props?: { children?: [unknown, string] } };
    };
    return title?.title?.props?.children?.[1] === 'Open in CodeSandbox';
  }) as { onClick?: () => void } | undefined;
}

describe('useSandboxCanvasProps', () => {
  beforeEach(() => {
    // Mock window.open
    Object.defineProperty(window, 'open', {
      value: vi.fn(),
      writable: true,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('returns canvas props with default values', () => {
    const { result } = renderHook(() => useSandboxCanvasProps({}));

    expect(result.current).toEqual(
      expect.objectContaining({
        additionalActions: expect.arrayContaining([
          expect.objectContaining({
            title: expect.anything(),
            onClick: expect.any(Function) as () => void,
          }),
        ]),
        source: expect.objectContaining({
          transform: expect.any(Function) as (code: string) => string,
        }),
        withToolbar: true,
      }),
    );
  });

  it('preserves existing additional actions', () => {
    const existingAction = {
      title: 'Existing Action',
      onClick: vi.fn(),
    };

    const { result } = renderHook(() =>
      useSandboxCanvasProps({
        additionalActions: [existingAction],
      }),
    );

    expect(result.current.additionalActions).toHaveLength(2);
    expect(result.current.additionalActions?.[0]).toBe(existingAction);
  });

  it('preserves other canvas props', () => {
    const { result } = renderHook(() =>
      useSandboxCanvasProps({
        className: 'test-class',
        withToolbar: false,
      }),
    );

    expect(result.current.className).toBe('test-class');
    expect(result.current.withToolbar).toBe(false);
  });

  it('opens CodeSandbox when action is clicked', async () => {
    const { result } = renderHook(() => useSandboxCanvasProps({}));

    const sandboxAction = findSandboxAction(result.current.additionalActions);

    await act(async () => {
      sandboxAction?.onClick?.();
    });

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
          content: expect.stringContaining('"react": "latest"'),
          isBinary: false,
        },
      }),
    });
    expect(window.open).toHaveBeenCalledWith(
      'https://codesandbox.io/s/mock-sandbox',
      '_blank',
    );
  });

  it('uses custom template when docs source code exists', () => {
    const storyOf = {
      parameters: {
        docs: {
          source: {
            code: 'const App = () => <div>Custom</div>;',
          },
        },
      },
    };

    const { result } = renderHook(() => useSandboxCanvasProps({ of: storyOf }));

    const sandboxAction = result.current.additionalActions?.find(
      (action) =>
        (action.title as { props?: { children?: [unknown, string] } })?.props
          ?.children?.[1] === 'Open in CodeSandbox',
    );

    act(() => {
      (sandboxAction as { onClick?: () => void } | undefined)?.onClick?.();
    });

    expect(getSandboxUrl).toHaveBeenCalledWith({
      files: expect.objectContaining({
        'index.tsx': {
          content:
            'import React from "react";\nimport Component from "./component";\n<Component />',
          isBinary: false,
        },
        'component.tsx': {
          content: 'const App = () => <div>Custom</div>;',
          isBinary: false,
        },
      }),
    });
  });

  it('includes additional dependencies from addon config', () => {
    const storyOf = {
      parameters: {
        [ADDON_ID]: {
          dependencies: {
            'custom-lib': '1.0.0',
          },
        },
      },
    };

    const { result } = renderHook(() => useSandboxCanvasProps({ of: storyOf }));

    const sandboxAction = result.current.additionalActions?.find(
      (action) =>
        (action.title as { props?: { children?: [unknown, string] } })?.props
          ?.children?.[1] === 'Open in CodeSandbox',
    );

    act(() => {
      (sandboxAction as { onClick?: () => void } | undefined)?.onClick?.();
    });

    expect(getSandboxUrl).toHaveBeenCalledWith({
      files: expect.objectContaining({
        'package.json': {
          content: expect.stringContaining('"custom-lib": "1.0.0"'),
          isBinary: false,
        },
      }),
    });
  });

  it('includes additional files from addon config', () => {
    const storyOf = {
      parameters: {
        [ADDON_ID]: {
          files: {
            'custom.js': {
              content: 'console.log("custom");',
              isBinary: false,
            },
          },
        },
      },
    };

    const { result } = renderHook(() => useSandboxCanvasProps({ of: storyOf }));

    const sandboxAction = result.current.additionalActions?.find(
      (action) =>
        (action.title as { props?: { children?: [unknown, string] } })?.props
          ?.children?.[1] === 'Open in CodeSandbox',
    );

    act(() => {
      (sandboxAction as { onClick?: () => void } | undefined)?.onClick?.();
    });

    expect(getSandboxUrl).toHaveBeenCalledWith({
      files: expect.objectContaining({
        'custom.js': {
          content: 'console.log("custom");',
          isBinary: false,
        },
      }),
    });
  });

  it('uses custom HTML from addon config', () => {
    const storyOf = {
      parameters: {
        [ADDON_ID]: {
          html: '<div id="custom-root"></div>',
        },
      },
    };

    const { result } = renderHook(() => useSandboxCanvasProps({ of: storyOf }));

    const sandboxAction = result.current.additionalActions?.find(
      (action) =>
        (action.title as { props?: { children?: [unknown, string] } })?.props
          ?.children?.[1] === 'Open in CodeSandbox',
    );

    act(() => {
      (sandboxAction as { onClick?: () => void } | undefined)?.onClick?.();
    });

    expect(getSandboxUrl).toHaveBeenCalledWith({
      files: expect.objectContaining({
        'index.html': {
          content: '<div id="custom-root"></div>',
          isBinary: false,
        },
      }),
    });
  });

  it('handles transform function correctly', async () => {
    const mockTransform = vi.fn().mockResolvedValue('transformed code');
    const storyOf = {
      parameters: {
        docs: {
          source: {
            transform: mockTransform,
          },
        },
      },
    };

    const { result } = renderHook(() => useSandboxCanvasProps({ of: storyOf }));

    const transformContext = { kind: 'test', name: 'test' };

    await act(async () => {
      await result.current.source?.transform?.(
        'original code',
        transformContext,
      );
    });

    expect(mockTransform).toHaveBeenCalledWith(
      'original code',
      transformContext,
    );
    expect(transformCodeWithParameters).toHaveBeenCalledWith(
      'transformed code',
      undefined,
      expect.objectContaining({
        source: {
          transform: mockTransform,
        },
      }),
      undefined,
    );
  });

  it('applies additional transformers', async () => {
    const additionalTransformers = {
      customTransform: vi.fn((code: string) => `custom: ${code}`),
    };

    const { result } = renderHook(() =>
      useSandboxCanvasProps({ additionalTransformers }),
    );

    await act(async () => {
      await result.current.source?.transform?.('test code', {
        kind: 'test',
        name: 'test',
      });
    });

    expect(transformCodeWithParameters).toHaveBeenCalledWith(
      'test code',
      undefined,
      undefined,
      additionalTransformers,
    );
  });

  it('uses source prop code when provided', () => {
    const { result } = renderHook(() =>
      useSandboxCanvasProps({
        source: {
          code: 'const App = () => <div>Source Prop</div>;',
        },
      }),
    );

    const sandboxAction = result.current.additionalActions?.find(
      (action) =>
        (action.title as { props?: { children?: [unknown, string] } })?.props
          ?.children?.[1] === 'Open in CodeSandbox',
    );

    act(() => {
      (sandboxAction as { onClick?: () => void } | undefined)?.onClick?.();
    });

    expect(getSandboxUrl).toHaveBeenCalledWith({
      files: expect.objectContaining({
        'index.tsx': {
          content: 'const App = () => <div>Source Prop</div>;',
          isBinary: false,
        },
      }),
    });
  });

  it('preserves source prop transform when provided', async () => {
    const sourcePropTransform = vi
      .fn()
      .mockResolvedValue('source prop transformed');

    const { result } = renderHook(() =>
      useSandboxCanvasProps({
        source: {
          transform: sourcePropTransform,
        },
      }),
    );

    const transformContext = { kind: 'test', name: 'test' };

    await act(async () => {
      await result.current.source?.transform?.('test code', transformContext);
    });

    expect(sourcePropTransform).toHaveBeenCalledWith(
      'test code',
      transformContext,
    );
  });
});
