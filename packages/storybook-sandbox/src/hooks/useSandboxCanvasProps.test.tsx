import { renderHook, act } from '@testing-library/react';
import { vi, type Mock } from 'vitest';
import type { ComponentProps } from 'react';
import type { Canvas } from '@storybook/addon-docs/blocks';
import type { StorybookParameters } from 'storybook/internal/types';
import {
  useSandboxCanvasProps,
  type UseSandboxCanvasProps,
} from './useSandboxCanvasProps';
import { COMMON_TRANSFORMERS } from '../constants';
import * as helpers from '../helpers';
import * as useSandboxDocParametersModule from './useSandboxDocParameters';

// Mock dependencies
vi.mock('../helpers', () => ({
  getSandboxActionItems: vi.fn(),
  transformCode: vi.fn(),
}));

vi.mock('./useSandboxDocParameters', () => ({
  useSandboxDocParameters: vi.fn(),
}));

const mockGetSandboxActionItems = helpers.getSandboxActionItems as Mock;
const mockTransformCode = helpers.transformCode as Mock;
const mockUseSandboxDocParameters =
  useSandboxDocParametersModule.useSandboxDocParameters as Mock;

type CanvasProps = ComponentProps<typeof Canvas>;

describe('useSandboxCanvasProps', () => {
  const mockDocParameters: StorybookParameters = {
    'storybook/docs': {
      source: {
        code: 'const App = () => <div>Hello</div>;',
      },
    },
  } as any;

  const mockActionItems = [
    {
      title: 'Sandbox',
      className: 'sandbox-open-in-sandbox',
      onClick: vi.fn(),
    },
  ];

  const mockTransformFn = vi
    .fn()
    .mockImplementation((code: string) => `transformed: ${code}`);

  beforeEach(() => {
    vi.clearAllMocks();
    mockGetSandboxActionItems.mockReturnValue(mockActionItems);
    mockTransformCode.mockImplementation(
      (code: string) => `transformed: ${code}`,
    );
    // Simple mock that doesn't cause re-renders
    mockUseSandboxDocParameters.mockImplementation(() => {
      // Do nothing - just a no-op mock
    });
  });

  const defaultProps: UseSandboxCanvasProps = {
    of: {
      parameters: {
        docs: {
          source: {
            code: 'const Component = () => <div>Test</div>;',
          },
        },
      },
    },
  };

  describe('basic functionality', () => {
    it('should return canvas props with default values', () => {
      const { result } = renderHook(() => useSandboxCanvasProps({}));

      expect(result.current).toMatchObject({
        additionalActions: expect.any(Array),
        of: undefined,
        source: expect.objectContaining({
          transform: expect.any(Function),
        }),
        withToolbar: true,
      });
    });

    it('should preserve passed props', () => {
      const props: UseSandboxCanvasProps = {
        ...defaultProps,
        withToolbar: false,
        className: 'test-class',
      };

      const { result } = renderHook(() => useSandboxCanvasProps(props));

      expect(result.current).toMatchObject({
        withToolbar: false,
        className: 'test-class',
        of: props.of,
      });
    });
  });

  describe('transformers handling', () => {
    it('should use empty transformers when no additionalTransformers provided', async () => {
      const { result } = renderHook(() => useSandboxCanvasProps(defaultProps));

      // Trigger transform to see what transformers are used
      const mockCode = 'test code';
      const mockContext = { parameters: {} };

      await act(async () => {
        await result.current.source?.transform?.(mockCode, mockContext);
      });

      expect(mockTransformCode).toHaveBeenCalledWith(mockCode, {});
    });

    it('should merge COMMON_TRANSFORMERS with additionalTransformers', async () => {
      const additionalTransformers = {
        customTransform: (code: string) => `custom: ${code}`,
      };

      const props: UseSandboxCanvasProps = {
        ...defaultProps,
        additionalTransformers,
      };

      const { result } = renderHook(() => useSandboxCanvasProps(props));

      const mockCode = 'test code';
      const mockContext = { parameters: {} };

      await act(async () => {
        await result.current.source?.transform?.(mockCode, mockContext);
      });

      expect(mockTransformCode).toHaveBeenCalledWith(mockCode, {
        ...COMMON_TRANSFORMERS,
        ...additionalTransformers,
      });
    });

    it('should not include COMMON_TRANSFORMERS when no additionalTransformers provided', async () => {
      const { result } = renderHook(() => useSandboxCanvasProps({}));

      const mockCode = 'test code';
      const mockContext = { parameters: {} };

      await act(async () => {
        await result.current.source?.transform?.(mockCode, mockContext);
      });

      expect(mockTransformCode).toHaveBeenCalledWith(mockCode, {});
    });
  });

  describe('source code handling', () => {
    it('should use code from docsConfig.source when available', () => {
      const codeFromDocs = 'const DocsComponent = () => <div>From docs</div>;';
      const props: UseSandboxCanvasProps = {
        of: {
          parameters: {
            docs: {
              source: {
                code: codeFromDocs,
              },
            },
          },
        },
        additionalTransformers: {
          test: (code: string) => code,
        },
      };

      const { result } = renderHook(() => useSandboxCanvasProps(props));

      expect(mockTransformCode).toHaveBeenCalledWith(codeFromDocs, {
        ...COMMON_TRANSFORMERS,
        test: expect.any(Function),
      });
      expect(result.current.source?.code).toBe('transformed: ' + codeFromDocs);
    });

    it('should use sourceProp when no docsConfig.source.code', () => {
      const sourceProp = {
        code: 'const SourceComponent = () => <div>From source prop</div>;',
      };

      const props: UseSandboxCanvasProps = {
        of: {
          parameters: {
            docs: {},
          },
        },
        source: sourceProp,
      };

      const { result } = renderHook(() => useSandboxCanvasProps(props));

      expect(result.current.source?.code).toBe(sourceProp.code);
    });

    it('should preserve sourceProp properties when transforming docsConfig code', () => {
      const sourceProp = {
        code: 'should be overridden',
        transform: mockTransformFn,
        language: 'tsx' as const,
      };

      const docsCode = 'const DocsComponent = () => <div>From docs</div>;';
      const props: UseSandboxCanvasProps = {
        of: {
          parameters: {
            docs: {
              source: {
                code: docsCode,
              },
            },
          },
        },
        source: sourceProp,
        additionalTransformers: {
          test: (code: string) => code,
        },
      };

      const { result } = renderHook(() => useSandboxCanvasProps(props));

      expect(result.current.source).toMatchObject({
        code: 'transformed: ' + docsCode,
        transform: expect.any(Function),
        language: 'tsx',
      });
    });
  });

  describe('transform function', () => {
    it('should handle transform function from source prop', async () => {
      const sourceProp = {
        transform: mockTransformFn,
      };

      const props: UseSandboxCanvasProps = {
        source: sourceProp,
        additionalTransformers: {
          test: (code: string) => `test: ${code}`,
        },
      };

      const { result } = renderHook(() => useSandboxCanvasProps(props));

      const testCode = 'original code';
      const mockContext = { parameters: {} };

      const transformedResult = await result.current.source?.transform?.(
        testCode,
        mockContext,
      );

      expect(mockTransformFn).toHaveBeenCalledWith(testCode, mockContext);
      expect(transformedResult).toBe('transformed: transformed: original code');
    });

    it('should handle context transform function', async () => {
      const contextTransformFn = vi
        .fn()
        .mockImplementation((code: string) => `context: ${code}`);
      const mockContext = {
        parameters: {
          docs: {
            source: {
              transform: contextTransformFn,
            },
          },
        },
      };

      const { result } = renderHook(() => useSandboxCanvasProps({}));

      const testCode = 'original code';
      await result.current.source?.transform?.(testCode, mockContext);

      expect(contextTransformFn).toHaveBeenCalledWith(testCode, mockContext);
    });

    it('should handle case when no transform function is available', async () => {
      const { result } = renderHook(() => useSandboxCanvasProps({}));

      const testCode = 'original code';
      const mockContext = { parameters: {} };

      const transformedResult = await result.current.source?.transform?.(
        testCode,
        mockContext,
      );

      expect(mockTransformCode).toHaveBeenCalledWith(testCode, {});
      expect(transformedResult).toBe('transformed: original code');
    });
  });

  describe('additionalActions handling', () => {
    it('should merge additionalActions with sandbox action items', () => {
      const existingActions = [{ title: 'Existing Action', onClick: vi.fn() }];

      const props: UseSandboxCanvasProps = {
        additionalActions: existingActions,
      };

      const { result } = renderHook(() => useSandboxCanvasProps(props));

      expect(result.current.additionalActions).toEqual([
        ...existingActions,
        ...mockActionItems,
      ]);
    });

    it('should handle empty additionalActions array', () => {
      const props: UseSandboxCanvasProps = {};

      const { result } = renderHook(() => useSandboxCanvasProps(props));

      expect(result.current.additionalActions).toEqual(mockActionItems);
    });

    it('should call getSandboxActionItems with renderedCode and docParameters', () => {
      renderHook(() => useSandboxCanvasProps({}));

      expect(mockGetSandboxActionItems).toHaveBeenCalledWith(
        expect.objectContaining({
          current: null,
        }),
        undefined, // Since we're using a no-op mock for useSandboxDocParameters
      );
    });
  });

  describe('useSandboxDocParameters integration', () => {
    it('should call useSandboxDocParameters with setState function', () => {
      renderHook(() => useSandboxCanvasProps({}));

      expect(mockUseSandboxDocParameters).toHaveBeenCalledWith(
        expect.any(Function),
      );
    });

    it('should call getSandboxActionItems during render', () => {
      renderHook(() => useSandboxCanvasProps({}));

      expect(mockGetSandboxActionItems).toHaveBeenCalled();
    });
  });

  describe('memoization and performance', () => {
    it('should handle transformers memoization correctly', async () => {
      const additionalTransformers = {
        test: (code: string) => code,
      };

      const props: UseSandboxCanvasProps = {
        additionalTransformers,
      };

      const { result } = renderHook(() => useSandboxCanvasProps(props));

      // Test that transformers are used
      await act(async () => {
        await result.current.source?.transform?.('test', {});
      });

      expect(mockTransformCode).toHaveBeenCalledWith('test', {
        ...COMMON_TRANSFORMERS,
        ...additionalTransformers,
      });
    });

    it('should handle changing additionalTransformers', () => {
      let transformers: Record<string, (code: string) => string> | undefined = {
        test1: (code: string) => code,
      };

      const { result, rerender } = renderHook(() =>
        useSandboxCanvasProps({ additionalTransformers: transformers }),
      );

      expect(result.current.source?.transform).toBeDefined();

      // Change transformers and rerender
      transformers = undefined;
      rerender();

      expect(result.current.source?.transform).toBeDefined();
    });
  });

  describe('edge cases', () => {
    it('should handle undefined of parameter', () => {
      const props: UseSandboxCanvasProps = {
        of: undefined,
      };

      const { result } = renderHook(() => useSandboxCanvasProps(props));

      expect(result.current.of).toBeUndefined();
      expect(result.current.source).toBeDefined();
    });

    it('should handle missing parameters in of', () => {
      const props: UseSandboxCanvasProps = {
        of: {} as any,
      };

      const { result } = renderHook(() => useSandboxCanvasProps(props));

      expect(result.current.of).toEqual({});
    });

    it('should handle missing docs in parameters', async () => {
      const props: UseSandboxCanvasProps = {
        of: {
          parameters: {},
        },
      };

      const { result } = renderHook(() => useSandboxCanvasProps(props));

      await act(async () => {
        const transformResult = await result.current.source?.transform?.(
          'test',
          {},
        );
        expect(transformResult).toBe('transformed: test');
      });
    });

    it('should call getSandboxActionItems with initial state', () => {
      renderHook(() => useSandboxCanvasProps({}));

      expect(mockGetSandboxActionItems).toHaveBeenCalledWith(
        expect.objectContaining({
          current: null,
        }),
        undefined,
      );
    });
  });
});
