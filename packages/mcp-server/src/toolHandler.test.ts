/**
 * Tests for toolHandler.ts
 */
import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest';
import { handleToolCall } from './toolHandler.js';
import { type ToolResponse } from './types.js';
import {
  handleFindComponent,
  handleGetComponentProps,
  handleListComponents,
} from './componentHandlers.js';
import {
  handleGetUsageExamples,
  handleSearchIdsDocs,
  handleGetDesignTokens,
  handleGetDesignGuidelines,
} from './searchHandlers.js';
import {
  handleGetIressComponentInfo,
  handleAnalyzeComponentMentions,
} from './iressHandlers.js';

// Mock all handler modules
vi.mock('./componentHandlers.js', () => ({
  handleFindComponent: vi.fn(),
  handleGetComponentProps: vi.fn(),
  handleListComponents: vi.fn(),
}));

vi.mock('./searchHandlers.js', () => ({
  handleGetUsageExamples: vi.fn(),
  handleSearchIdsDocs: vi.fn(),
  handleGetDesignTokens: vi.fn(),
  handleGetDesignGuidelines: vi.fn(),
}));

vi.mock('./iressHandlers.js', () => ({
  handleGetIressComponentInfo: vi.fn(),
  handleAnalyzeComponentMentions: vi.fn(),
}));

// Type the mocked functions
const mockedHandleFindComponent = handleFindComponent as Mock;
const mockedHandleGetComponentProps = handleGetComponentProps as Mock;
const mockedHandleListComponents = handleListComponents as Mock;
const mockedHandleGetUsageExamples = handleGetUsageExamples as Mock;
const mockedHandleSearchIdsDocs = handleSearchIdsDocs as Mock;
const mockedHandleGetDesignTokens = handleGetDesignTokens as Mock;
const mockedHandleGetDesignGuidelines = handleGetDesignGuidelines as Mock;
const mockedHandleGetIressComponentInfo = handleGetIressComponentInfo as Mock;
const mockedHandleAnalyzeComponentMentions =
  handleAnalyzeComponentMentions as Mock;

describe('handleToolCall', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('component handlers', () => {
    it('should handle find_component tool call', () => {
      const mockResponse: ToolResponse = {
        content: [{ type: 'text', text: 'Component found' }],
      };
      mockedHandleFindComponent.mockReturnValue(mockResponse);

      const request = {
        params: {
          name: 'find_component',
          arguments: { query: 'Button' },
        },
      };

      const result = handleToolCall(request);

      expect(mockedHandleFindComponent).toHaveBeenCalledWith({
        query: 'Button',
      });
      expect(result).toEqual(mockResponse);
    });

    it('should handle get_component_props tool call', () => {
      const mockResponse: ToolResponse = {
        content: [{ type: 'text', text: 'Component props listed' }],
      };
      mockedHandleGetComponentProps.mockReturnValue(mockResponse);

      const request = {
        params: {
          name: 'get_component_props',
          arguments: { component: 'Button' },
        },
      };

      const result = handleToolCall(request);

      expect(mockedHandleGetComponentProps).toHaveBeenCalledWith({
        component: 'Button',
      });
      expect(result).toEqual(mockResponse);
    });

    it('should handle list_components tool call', () => {
      const mockResponse: ToolResponse = {
        content: [{ type: 'text', text: 'Components listed' }],
      };
      mockedHandleListComponents.mockReturnValue(mockResponse);

      const request = {
        params: {
          name: 'list_components',
          arguments: { category: 'forms' },
        },
      };

      const result = handleToolCall(request);

      expect(mockedHandleListComponents).toHaveBeenCalledWith({
        category: 'forms',
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('search handlers', () => {
    it('should handle get_usage_examples tool call', () => {
      const mockResponse: ToolResponse = {
        content: [{ type: 'text', text: 'Usage examples found' }],
      };
      mockedHandleGetUsageExamples.mockReturnValue(mockResponse);

      const request = {
        params: {
          name: 'get_usage_examples',
          arguments: { component: 'Button', pattern: 'primary' },
        },
      };

      const result = handleToolCall(request);

      expect(mockedHandleGetUsageExamples).toHaveBeenCalledWith({
        component: 'Button',
        pattern: 'primary',
      });
      expect(result).toEqual(mockResponse);
    });

    it('should handle search_ids_docs tool call', () => {
      const mockResponse: ToolResponse = {
        content: [{ type: 'text', text: 'Documentation searched' }],
      };
      mockedHandleSearchIdsDocs.mockReturnValue(mockResponse);

      const request = {
        params: {
          name: 'search_ids_docs',
          arguments: { query: 'accessibility' },
        },
      };

      const result = handleToolCall(request);

      expect(mockedHandleSearchIdsDocs).toHaveBeenCalledWith({
        query: 'accessibility',
      });
      expect(result).toEqual(mockResponse);
    });

    it('should handle get_design_tokens tool call', () => {
      const mockResponse: ToolResponse = {
        content: [{ type: 'text', text: 'Design tokens found' }],
      };
      mockedHandleGetDesignTokens.mockReturnValue(mockResponse);

      const request = {
        params: {
          name: 'get_design_tokens',
          arguments: { category: 'colors' },
        },
      };

      const result = handleToolCall(request);

      expect(mockedHandleGetDesignTokens).toHaveBeenCalledWith({
        category: 'colors',
      });
      expect(result).toEqual(mockResponse);
    });

    it('should handle get_design_guidelines tool call', () => {
      const mockResponse: ToolResponse = {
        content: [{ type: 'text', text: 'Design guidelines found' }],
      };
      mockedHandleGetDesignGuidelines.mockReturnValue(mockResponse);

      const request = {
        params: {
          name: 'get_design_guidelines',
          arguments: { topic: 'spacing' },
        },
      };

      const result = handleToolCall(request);

      expect(mockedHandleGetDesignGuidelines).toHaveBeenCalledWith({
        topic: 'spacing',
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('iress handlers', () => {
    it('should handle get_iress_component_info tool call', () => {
      const mockResponse: ToolResponse = {
        content: [{ type: 'text', text: 'Iress component info' }],
      };
      mockedHandleGetIressComponentInfo.mockReturnValue(mockResponse);

      const request = {
        params: {
          name: 'get_iress_component_info',
          arguments: {
            component_name: 'IressButton',
            include_examples: true,
            include_props: false,
          },
        },
      };

      const result = handleToolCall(request);

      expect(mockedHandleGetIressComponentInfo).toHaveBeenCalledWith({
        component_name: 'IressButton',
        include_examples: true,
        include_props: false,
      });
      expect(result).toEqual(mockResponse);
    });

    it('should handle analyze_component_mentions tool call', () => {
      const mockResponse: ToolResponse = {
        content: [{ type: 'text', text: 'Component mentions analyzed' }],
      };
      mockedHandleAnalyzeComponentMentions.mockReturnValue(mockResponse);

      const request = {
        params: {
          name: 'analyze_component_mentions',
          arguments: { content: 'This uses IressButton component' },
        },
      };

      const result = handleToolCall(request);

      expect(mockedHandleAnalyzeComponentMentions).toHaveBeenCalledWith({
        content: 'This uses IressButton component',
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('edge cases', () => {
    it('should handle tool call without arguments', () => {
      const mockResponse: ToolResponse = {
        content: [{ type: 'text', text: 'Components listed' }],
      };
      mockedHandleListComponents.mockReturnValue(mockResponse);

      const request = {
        params: {
          name: 'list_components',
        },
      };

      const result = handleToolCall(request);

      expect(mockedHandleListComponents).toHaveBeenCalledWith({});
      expect(result).toEqual(mockResponse);
    });

    it('should handle tool call with null arguments', () => {
      const mockResponse: ToolResponse = {
        content: [{ type: 'text', text: 'Component found' }],
      };
      mockedHandleFindComponent.mockReturnValue(mockResponse);

      const request = {
        params: {
          name: 'find_component',
          arguments: null,
        },
      };

      const result = handleToolCall(request);

      expect(mockedHandleFindComponent).toHaveBeenCalledWith(null);
      expect(result).toEqual(mockResponse);
    });

    it('should handle tool call with undefined arguments', () => {
      const mockResponse: ToolResponse = {
        content: [{ type: 'text', text: 'Component found' }],
      };
      mockedHandleFindComponent.mockReturnValue(mockResponse);

      const request = {
        params: {
          name: 'find_component',
          arguments: undefined,
        },
      };

      const result = handleToolCall(request);

      expect(mockedHandleFindComponent).toHaveBeenCalledWith({});
      expect(result).toEqual(mockResponse);
    });
  });

  describe('error handling', () => {
    it('should throw error for unknown tool name', () => {
      const request = {
        params: {
          name: 'unknown_tool',
          arguments: { query: 'test' },
        },
      };

      expect(() => handleToolCall(request)).toThrow(
        'Unknown tool: unknown_tool',
      );
    });

    it('should handle empty tool name', () => {
      const request = {
        params: {
          name: '',
          arguments: { query: 'test' },
        },
      };

      expect(() => handleToolCall(request)).toThrow('Unknown tool: ');
    });

    it('should propagate errors from handler functions', () => {
      const mockError = new Error('Handler error');
      mockedHandleFindComponent.mockImplementation(() => {
        throw mockError;
      });

      const request = {
        params: {
          name: 'find_component',
          arguments: { query: 'Button' },
        },
      };

      expect(() => handleToolCall(request)).toThrow('Handler error');
    });
  });

  describe('type checking', () => {
    it('should pass correct argument types to handlers', () => {
      const complexArgs = {
        component: 'Button',
        options: {
          includeExamples: true,
          includeProps: false,
        },
        filters: ['primary', 'secondary'],
        metadata: {
          timestamp: Date.now(),
          version: '1.0.0',
        },
      };

      mockedHandleGetComponentProps.mockReturnValue({
        content: [{ type: 'text', text: 'Success' }],
      });

      const request = {
        params: {
          name: 'get_component_props',
          arguments: complexArgs,
        },
      };

      handleToolCall(request);

      expect(mockedHandleGetComponentProps).toHaveBeenCalledWith(complexArgs);
    });

    it('should handle boolean and number arguments', () => {
      const booleanArgs = {
        include_examples: true,
        include_props: false,
        max_results: 10,
        threshold: 0.5,
      };

      mockedHandleGetIressComponentInfo.mockReturnValue({
        content: [{ type: 'text', text: 'Success' }],
      });

      const request = {
        params: {
          name: 'get_iress_component_info',
          arguments: booleanArgs,
        },
      };

      handleToolCall(request);

      expect(mockedHandleGetIressComponentInfo).toHaveBeenCalledWith(
        booleanArgs,
      );
    });
  });

  describe('all supported tools', () => {
    const supportedTools = [
      'find_component',
      'get_component_props',
      'get_usage_examples',
      'search_ids_docs',
      'list_components',
      'get_design_tokens',
      'get_iress_component_info',
      'analyze_component_mentions',
      'get_design_guidelines',
    ];

    it.each(supportedTools)('should handle %s tool', (toolName) => {
      // Mock all handlers to return a standard response
      const mockResponse: ToolResponse = {
        content: [{ type: 'text', text: `${toolName} executed` }],
      };

      const handlerMocks = [
        mockedHandleFindComponent,
        mockedHandleGetComponentProps,
        mockedHandleListComponents,
        mockedHandleGetUsageExamples,
        mockedHandleSearchIdsDocs,
        mockedHandleGetDesignTokens,
        mockedHandleGetDesignGuidelines,
        mockedHandleGetIressComponentInfo,
        mockedHandleAnalyzeComponentMentions,
      ];

      handlerMocks.forEach((mock) => mock.mockReturnValue(mockResponse));

      const request = {
        params: {
          name: toolName,
          arguments: { test: 'value' },
        },
      };

      const result = handleToolCall(request);

      expect(result).toEqual(mockResponse);
    });
  });
});
