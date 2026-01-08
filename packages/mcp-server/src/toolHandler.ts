/**
 * Main tool handler dispatcher
 */
import {
  handleFindComponent,
  handleGetComponentProps,
  handleListComponents,
} from './componentHandlers.js';
import {
  handleGetUsageExamples,
  handleSearchIdsDocs,
  handleGetDesignGuidelines,
} from './searchHandlers.js';
import {
  handleGetIressComponentInfo,
  handleAnalyzeComponentMentions,
} from './iressHandlers.js';
import {
  handleGetDesignTokensUsage,
  handleGetDesignTokens,
} from './tokenHandlers.js';
import { handleGetStylingPropsReference } from './stylingHandlers.js';

interface ToolCallRequest {
  params: {
    name: string;
    arguments?: unknown;
  };
}

export function handleToolCall(request: ToolCallRequest) {
  const { name, arguments: args = {} } = request.params;

  switch (name) {
    case 'find_component':
      return handleFindComponent(args);

    case 'get_component_props':
      return handleGetComponentProps(args);

    case 'get_usage_examples':
      return handleGetUsageExamples(args);

    case 'search_ids_docs':
      return handleSearchIdsDocs(args);

    case 'list_components':
      return handleListComponents(args);

    case 'get_design_tokens':
      return handleGetDesignTokens(args);

    case 'get_design_tokens_usage':
      return handleGetDesignTokensUsage(args as { category?: string });

    case 'get_iress_component_info':
      return handleGetIressComponentInfo(args);

    case 'analyze_component_mentions':
      return handleAnalyzeComponentMentions(args);

    case 'get_design_guidelines':
      return handleGetDesignGuidelines(args);

    case 'get_styling_props_reference':
      return handleGetStylingPropsReference(args);

    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}
