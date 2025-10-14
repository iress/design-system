/**
 * Tool handlers for Iress component-specific operations
 */
import { z } from 'zod';
import * as path from 'path';
import {
  mapIressComponentToFile,
  extractIressComponents,
  readFileContent,
} from './utils.js';
import { DOCS_DIR } from './config.js';
import { type ToolResponse } from './types.js';

export function handleGetIressComponentInfo(args: unknown): ToolResponse {
  const schema = z.object({
    component_name: z.string(),
    include_examples: z.boolean().default(true),
    include_props: z.boolean().default(true),
  });

  const { component_name, include_examples, include_props } =
    schema.parse(args);

  // Find the corresponding documentation file
  const componentFile = mapIressComponentToFile(component_name);

  if (!componentFile) {
    return {
      content: [
        {
          type: 'text',
          text: `Component "${component_name}" not found. Make sure you're using the correct Iress component name (e.g., IressButton, IressInput, IressTable).`,
        },
      ],
    };
  }

  try {
    const filePath = path.join(DOCS_DIR, componentFile);
    const content = readFileContent(filePath);

    let response = `**${component_name} Component Documentation**\n\n`;

    // Extract overview/description
    const lines = content.split('\n');
    const overviewStart = lines.findIndex((line) =>
      line.toLowerCase().includes('overview'),
    );
    if (overviewStart !== -1) {
      const overviewEnd = lines.findIndex(
        (line, index) => index > overviewStart && line.startsWith('#'),
      );
      const overviewLines = lines.slice(
        overviewStart,
        overviewEnd !== -1 ? overviewEnd : overviewStart + 10,
      );
      response += `${overviewLines.join('\n')}\n\n`;
    }

    // Include props if requested
    if (include_props) {
      const propSections =
        content.match(/(mode|prop|Properties|API)[\s\S]*?(?=\n##|\n\[#|$)/gi) ??
        [];
      if (propSections.length > 0) {
        response += `**Props & API:**\n${propSections
          .slice(0, 3)
          .join('\n\n')}\n\n`;
      }
    }

    // Include examples if requested
    if (include_examples) {
      const codeBlocks = content.match(/```[\s\S]*?```/g) ?? [];
      const jsxBlocks =
        content.match(/<Iress[A-Z][^>]*>[\s\S]*?<\/Iress[A-Z][^>]*>/g) ?? [];
      const examples = [...codeBlocks, ...jsxBlocks];

      if (examples.length > 0) {
        response += `**Usage Examples:**\n${examples
          .slice(0, 3)
          .join('\n\n')}\n\n`;
      }
    }

    return {
      content: [
        {
          type: 'text',
          text: response,
        },
      ],
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    throw new Error(`Failed to read component documentation: ${errorMessage}`);
  }
}

function formatComponentDetails(
  componentName: string,
  componentFile: string | null,
): string {
  if (!componentFile) {
    return `**${componentName}** ❌ Not found\n\n`;
  }

  try {
    const filePath = path.join(DOCS_DIR, componentFile);
    const content = readFileContent(filePath);
    const lines = content.split('\n');

    const description =
      lines
        .slice(0, 20)
        .find(
          (line) =>
            line.trim() &&
            !line.startsWith('#') &&
            !line.startsWith('<!--') &&
            !line.includes('Overview') &&
            line.length > 20,
        )
        ?.trim() ?? 'IDS component';

    return `**${componentName}** ✅\n  - File: ${componentFile}\n  - Description: ${description}\n\n`;
  } catch {
    return `**${componentName}** ❌\n  - Error reading documentation\n\n`;
  }
}

function formatComponentSummary(
  componentName: string,
  componentFile: string | null,
): string {
  const status = componentFile ? '✅ Available' : '❌ Not found';
  let result = `**${componentName}** ${status}\n`;

  if (componentFile) {
    result += `  - Documentation: ${componentFile}\n`;
  }

  return result + '\n';
}

export function handleAnalyzeComponentMentions(args: unknown): ToolResponse {
  const schema = z.object({
    text: z.string(),
    detailed: z.boolean().default(false),
  });

  const { text, detailed } = schema.parse(args);
  const componentMentions = extractIressComponents(text);

  if (componentMentions.length === 0) {
    return {
      content: [
        {
          type: 'text',
          text: "No Iress component mentions found in the provided text. Components should be mentioned with the 'Iress' prefix (e.g., IressButton, IressInput).",
        },
      ],
    };
  }

  let response = `**Found ${componentMentions.length} Iress component mention(s):**\n\n`;

  for (const componentName of componentMentions) {
    const componentFile = mapIressComponentToFile(componentName);

    if (detailed && componentFile) {
      response += formatComponentDetails(componentName, componentFile);
    } else {
      response += formatComponentSummary(componentName, componentFile);
    }
  }

  if (
    !detailed &&
    componentMentions.some((name) => mapIressComponentToFile(name))
  ) {
    response +=
      '\n*Use the `get_iress_component_info` tool with a specific component name for detailed information.*';
  }

  return {
    content: [
      {
        type: 'text',
        text: response,
      },
    ],
  };
}
