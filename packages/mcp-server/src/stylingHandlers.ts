/**
 * Tool handlers for styling props reference and discovery
 */
import { z } from 'zod';
import * as path from 'path';
import { getMarkdownFiles, readFileContent } from './utils.js';
import { DOCS_DIR } from './config.js';
import { type ToolResponse } from './types.js';

/**
 * Mapping of category names to generated documentation files
 */
const STYLING_PROPS_FILE_MAP: Record<string, string[]> = {
  spacing: ['components_styling-props-spacing-docs.md'],
  colors: ['components_styling-props-colour-docs.md'],
  typography: ['components_styling-props-typography-docs.md'],
  visual: [
    'components_styling-props-elevation-docs.md',
    'components_styling-props-radius-docs.md',
  ],
  sizing: ['components_styling-props-sizing-docs.md'],
  utility: [
    'components_styling-props-screen-readers-docs.md',
    'components_styling-props-scrollable-docs.md',
  ],
};

/**
 * Get list of files for a given category
 */
function getStylingPropsFiles(category: string): string[] {
  if (category === 'all') {
    // Return reference + all category files
    const allFiles = ['components_styling-props-reference-docs.md'];
    Object.values(STYLING_PROPS_FILE_MAP).forEach((files) => {
      allFiles.push(...files);
    });
    return allFiles;
  }

  return STYLING_PROPS_FILE_MAP[category] || [];
}

/**
 * Read styling props documentation file
 */
function readStylingPropsDoc(fileName: string): string | null {
  try {
    const filePath = path.join(DOCS_DIR, fileName);
    return readFileContent(filePath);
  } catch (error) {
    console.error(`Error reading styling props doc ${fileName}:`, error);
    return null;
  }
}

/**
 * Combine multiple documentation files into one response
 */
function combineStylingDocs(files: string[]): string {
  const markdownFiles = getMarkdownFiles();
  const contents: string[] = [];

  for (const file of files) {
    // Check if file exists
    if (!markdownFiles.includes(file)) {
      console.warn(`Styling props file not found: ${file}`);
      continue;
    }

    const content = readStylingPropsDoc(file);
    if (content) {
      contents.push(content);
      contents.push('\n---\n'); // Separator between files
    }
  }

  return contents.join('\n');
}

/**
 * Format the final response with optional styling approach guide
 */
function formatStylingResponse(content: string, _category: string): string {
  // For 'all' category, the reference docs already include the styling approach guide
  // (Best Practices section in 010-Reference.mdx)
  // No need to append anything - it's already in the generated content
  return content;
}

/**
 * Handle get_styling_props_reference tool call
 */
export function handleGetStylingPropsReference(args: unknown): ToolResponse {
  const schema = z.object({
    category: z
      .enum([
        'all',
        'spacing',
        'colors',
        'typography',
        'visual',
        'sizing',
        'utility',
      ])
      .default('all'),
    component: z.string().optional(),
  });

  const { category, component } = schema.parse(args);

  // Handle component-specific query
  if (component) {
    const componentGuidance = `
## Styling Props Support for ${component}

All public IDS components (Iress*) support styling props via IressStyledProps interface.
This includes all props documented in the styling props reference.

**Related Tools:**

- For ${component}'s specific props and API, use \`get_component_props\` tool
- For real-world usage examples of ${component}, use \`get_usage_examples\` tool
- For comprehensive information about ${component}, use \`get_iress_component_info\` tool
- To see all available styling props, use this tool with category="all"

**Note**: Some internal/helper components may not support styling props.
`;

    return {
      content: [
        {
          type: 'text',
          text: componentGuidance,
        },
      ],
    };
  }

  // Get files for the requested category
  const files = getStylingPropsFiles(category);

  if (files.length === 0) {
    const validCategories = Object.keys(STYLING_PROPS_FILE_MAP).join(', ');
    return {
      content: [
        {
          type: 'text',
          text: `Invalid category "${category}". Valid categories are: all, ${validCategories}`,
        },
      ],
    };
  }

  // Read and combine documentation files
  const combinedContent = combineStylingDocs(files);

  if (!combinedContent || combinedContent.trim().length === 0) {
    return {
      content: [
        {
          type: 'text',
          text: `No documentation found for category "${category}". This may indicate the documentation hasn't been generated yet.`,
        },
      ],
    };
  }

  // Format final response
  const formattedResponse = formatStylingResponse(combinedContent, category);

  return {
    content: [
      {
        type: 'text',
        text: formattedResponse,
      },
    ],
  };
}
