/**
 * Tool definitions for the IDS MCP Server
 */

export const toolDefinitions = [
  {
    name: 'find_component',
    description:
      'Find IDS components by name or functionality. Perfect for discovering which component to use for specific UI needs.',
    inputSchema: {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          description:
            "Component name (e.g., 'button', 'input') or functionality (e.g., 'form submission', 'navigation')",
        },
        category: {
          type: 'string',
          description:
            'Optional: filter by category (components, foundations, resources)',
          enum: ['components', 'foundations', 'resources'],
        },
      },
      required: ['query'],
    },
  },
  {
    name: 'get_component_props',
    description:
      'Get detailed prop information and usage examples for IDS components. Essential for implementing components correctly.',
    inputSchema: {
      type: 'object',
      properties: {
        component: {
          type: 'string',
          description: "Component name (e.g., 'button', 'input', 'table')",
        },
      },
      required: ['component'],
    },
  },
  {
    name: 'get_usage_examples',
    description:
      'Get code examples and implementation patterns for IDS components. Shows real-world usage in React applications.',
    inputSchema: {
      type: 'object',
      properties: {
        component: {
          type: 'string',
          description: 'Component name to get examples for',
        },
        pattern: {
          type: 'string',
          description:
            "Optional: specific usage pattern (e.g., 'form', 'modal', 'table')",
        },
      },
      required: ['component'],
    },
  },
  {
    name: 'search_ids_docs',
    description:
      'Search across all IDS documentation for specific terms, patterns, or implementation details.',
    inputSchema: {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          description:
            'Search term (component names, props, CSS classes, implementation patterns)',
        },
        case_sensitive: {
          type: 'boolean',
          description: 'Whether to perform case-sensitive search',
          default: false,
        },
      },
      required: ['query'],
    },
  },
  {
    name: 'list_components',
    description:
      'List all available IDS components, organized by category. Great for component discovery.',
    inputSchema: {
      type: 'object',
      properties: {
        category: {
          type: 'string',
          description:
            'Filter by category: components, foundations, or resources',
          enum: ['components', 'foundations', 'resources', 'all'],
          default: 'all',
        },
      },
    },
  },
  {
    name: 'get_design_tokens',
    description:
      'Get information about IDS design tokens (colors, spacing, typography) for consistent UI implementation.',
    inputSchema: {
      type: 'object',
      properties: {
        type: {
          type: 'string',
          description: 'Type of design token to search for',
          enum: ['colors', 'spacing', 'typography', 'breakpoints', 'all'],
          default: 'all',
        },
      },
    },
  },
  {
    name: 'get_iress_component_info',
    description:
      'Get comprehensive information about Iress components mentioned by their full name (e.g., IressButton, IressInput, IressTable). Perfect for when components are mentioned with the Iress prefix.',
    inputSchema: {
      type: 'object',
      properties: {
        component_name: {
          type: 'string',
          description:
            "Full Iress component name (e.g., 'IressButton', 'IressInput', 'IressTable')",
        },
        include_examples: {
          type: 'boolean',
          description: 'Whether to include usage examples in the response',
          default: true,
        },
        include_props: {
          type: 'boolean',
          description: 'Whether to include prop information in the response',
          default: true,
        },
      },
      required: ['component_name'],
    },
  },
  {
    name: 'analyze_component_mentions',
    description:
      'Analyze text to find all Iress component mentions (e.g., IressButton, IressInput) and provide information about each one.',
    inputSchema: {
      type: 'object',
      properties: {
        text: {
          type: 'string',
          description: 'Text content to analyze for Iress component mentions',
        },
        detailed: {
          type: 'boolean',
          description:
            'Whether to provide detailed information for each component found',
          default: false,
        },
      },
      required: ['text'],
    },
  },
  {
    name: 'get_design_guidelines',
    description:
      'Get IDS design guidelines covering core principles, visual standards, accessibility requirements, and best practices for consistent design implementation.',
    inputSchema: {
      type: 'object',
      properties: {
        section: {
          type: 'string',
          description:
            "Optional: specific guideline section (e.g., 'principles', 'typography', 'accessibility', 'layout', 'colors')",
        },
        query: {
          type: 'string',
          description:
            'Optional: search for specific guidelines or best practices',
        },
      },
    },
  },
] as const;
