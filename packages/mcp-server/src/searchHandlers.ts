/**
 * Tool handlers for search and documentation operations
 */
import { z } from 'zod';
import * as path from 'path';
import { getMarkdownFiles, readFileContent } from './utils.js';
import { DOCS_DIR } from './config.js';
import { type SearchMatch, type ToolResponse } from './types.js';

export function handleGetUsageExamples(args: unknown): ToolResponse {
  const schema = z.object({
    component: z.string(),
    pattern: z.string().optional(),
  });

  const { component, pattern } = schema.parse(args);
  const markdownFiles = getMarkdownFiles();

  // Find component files (main + recipes)
  const componentFiles = markdownFiles.filter(
    (file) =>
      file.includes(`${component.toLowerCase()}`) ||
      (file.includes('recipes') &&
        file.toLowerCase().includes(component.toLowerCase())),
  );

  if (componentFiles.length === 0) {
    return {
      content: [
        {
          type: 'text',
          text: `No examples found for "${component}". Try: ${markdownFiles
            .filter((f) => f.startsWith('components-'))
            .slice(0, 5)
            .map((f) => f.replace('components-', '').replace('-docs.md', ''))
            .join(', ')}`,
        },
      ],
    };
  }

  const examples: string[] = [];

  for (const file of componentFiles) {
    try {
      const filePath = path.join(DOCS_DIR, file);
      const content = readFileContent(filePath);

      // Extract code examples
      const codeBlocks = content.match(/```[\s\S]*?```/g) ?? [];
      const jsxBlocks =
        content.match(/<[A-Z][^>]*>[\s\S]*?<\/[A-Z][^>]*>/g) ?? [];

      if (pattern) {
        // Filter examples by pattern
        const patternMatches = [...codeBlocks, ...jsxBlocks].filter((block) =>
          block.toLowerCase().includes(pattern.toLowerCase()),
        );
        examples.push(...patternMatches);
      } else {
        examples.push(...codeBlocks, ...jsxBlocks);
      }
    } catch (error) {
      console.error(`Error reading file ${file}:`, error);
    }
  }

  const patternSuffix = pattern ? ` (${pattern} pattern)` : '';
  const patternNotFoundSuffix = pattern ? ` with pattern "${pattern}"` : '';

  // Add token usage best practices note if examples found
  const tokenBestPractices =
    examples.length > 0
      ? '\n\n---\n\n**🎨 Styling Best Practices**\n\n' +
        'When implementing IDS components, always use design tokens for styling:\n\n' +
        '- **Spacing**: Use `p="md"`, `m="lg"` instead of hardcoded pixel values\n' +
        '- **Colors**: Use `bg="colour.primary.fill"`, `color="colour.primary.text"` instead of hex codes\n' +
        '- **Typography**: Use `<IressText>` component or `textStyle` prop with tokens\n\n' +
        '*See `get_design_tokens_usage` for complete token usage guidelines and anti-patterns.*\n' +
        '*See styling props documentation for available props and tokens.*'
      : '';

  const examplesText =
    examples.length > 0
      ? `**${component} Usage Examples**${patternSuffix}:\n\n${examples
          .slice(0, 5)
          .join('\n\n---\n\n')}${tokenBestPractices}`
      : `No usage examples found for "${component}"${patternNotFoundSuffix}.`;

  return {
    content: [
      {
        type: 'text',
        text: examplesText,
      },
    ],
  };
}

export function handleSearchIdsDocs(args: unknown): ToolResponse {
  const schema = z.object({
    query: z.string(),
    case_sensitive: z.boolean().default(false),
  });

  const { query, case_sensitive } = schema.parse(args);
  const markdownFiles = getMarkdownFiles();
  const results: SearchMatch[] = [];

  for (const file of markdownFiles) {
    try {
      const filePath = path.join(DOCS_DIR, file);
      const content = readFileContent(filePath);
      const lines = content.split('\n');

      lines.forEach((line: string, index: number) => {
        const searchLine = case_sensitive ? line : line.toLowerCase();
        const searchQuery = case_sensitive ? query : query.toLowerCase();

        if (searchLine.includes(searchQuery)) {
          // Get context (surrounding lines)
          const contextStart = Math.max(0, index - 1);
          const contextEnd = Math.min(lines.length - 1, index + 1);
          const context = lines.slice(contextStart, contextEnd + 1).join('\n');

          results.push({
            file: file.replace('-docs.md', '').replace(/^[a-z]+-/, ''),
            line: index + 1,
            content: line.trim(),
            context,
          });
        }
      });
    } catch (error) {
      console.error(`Error reading file ${file}:`, error);
    }
  }

  return {
    content: [
      {
        type: 'text',
        text:
          results.length > 0
            ? `Found ${
                results.length
              } matches in IDS documentation:\n\n${results
                .slice(0, 15) // Limit results
                .map(
                  (r) =>
                    `**${r.file}:${r.line}**\n\`\`\`\n${r.context}\n\`\`\``,
                )
                .join('\n\n')}`
            : `No matches found for "${query}" in IDS documentation.`,
      },
    ],
  };
}

function findSectionContent(content: string, section: string): string | null {
  const sectionRegex = new RegExp(
    `(#{1,3}\\s+.*${section}.*?(?=#{1,3}|$))`,
    'gis',
  );
  const sectionMatch = sectionRegex.exec(content);

  if (sectionMatch) {
    return sectionMatch[0];
  }

  // Try to find sections that contain the search term
  const sections = content.split(/(?=#{1,3}\s+)/);
  const matchingSections = sections.filter((sectionContent) =>
    sectionContent.toLowerCase().includes(section.toLowerCase()),
  );

  return matchingSections.length > 0 ? matchingSections.join('\n\n') : null;
}

function addContextLines(
  lines: string[],
  startIndex: number,
  endIndex: number,
  contextLines: string[],
): void {
  for (let j = startIndex; j < endIndex; j++) {
    if (!contextLines.includes(lines[j])) {
      contextLines.push(lines[j]);
    }
  }
}

function filterContentByQuery(content: string, query: string): string | null {
  const lines = content.split('\n');
  const contextLines: string[] = [];
  const queryLower = query.toLowerCase();

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.toLowerCase().includes(queryLower)) {
      // Add context lines before
      const startContext = Math.max(0, i - 3);
      addContextLines(lines, startContext, i, contextLines);

      // Add the matching line
      if (!contextLines.includes(line)) {
        contextLines.push(line);
      }

      // Add context lines after
      const endContext = Math.min(lines.length, i + 4);
      addContextLines(lines, i + 1, endContext, contextLines);
    }
  }

  return contextLines.length > 0 ? contextLines.join('\n') : null;
}

export function handleGetDesignGuidelines(args: unknown): ToolResponse {
  const schema = z.object({
    section: z.string().optional(),
    query: z.string().optional(),
  });

  const { section, query } = schema.parse(args);

  try {
    // Read the guidelines.md file from the docs directory
    const guidelinesPath = path.join(DOCS_DIR, 'guidelines.md');
    const content = readFileContent(guidelinesPath);

    if (!content) {
      return {
        content: [
          {
            type: 'text',
            text: 'Design guidelines file not found. Please ensure guidelines.md exists in the docs directory.',
          },
        ],
      };
    }

    let filteredContent = content;

    // Filter by section if specified
    if (section) {
      const sectionContent = findSectionContent(content, section);

      if (sectionContent) {
        filteredContent = sectionContent;
      } else {
        return {
          content: [
            {
              type: 'text',
              text: `Section "${section}" not found in design guidelines. Available sections include: Core Design Principles, Visual Design Standards, Component Guidelines, Accessibility, Layout Systems, and Best Practices.`,
            },
          ],
        };
      }
    }

    // Filter by query if specified
    if (query) {
      const queryContent = filterContentByQuery(filteredContent, query);

      if (queryContent) {
        filteredContent = queryContent;
      } else {
        return {
          content: [
            {
              type: 'text',
              text: `No guidelines found matching "${query}". Try searching for terms like: accessibility, typography, colors, spacing, components, principles, or usability.`,
            },
          ],
        };
      }
    }

    const sectionSuffix = section ? ` - ${section}` : '';
    const querySuffix = query ? ` (filtered by: ${query})` : '';

    return {
      content: [
        {
          type: 'text',
          text: `**IDS Design Guidelines${sectionSuffix}${querySuffix}**\n\n${filteredContent}`,
        },
      ],
    };
  } catch (error) {
    console.error('Error reading guidelines:', error);
    return {
      content: [
        {
          type: 'text',
          text: 'Error reading design guidelines. Please ensure the guidelines.md file exists and is accessible.',
        },
      ],
    };
  }
}
