/**
 * Tool handlers for component-related operations
 */
import { z } from 'zod';
import * as path from 'path';
import {
  getMarkdownFiles,
  mapIressComponentToFile,
  extractIressComponents,
  readFileContent,
} from './utils.js';
import { DOCS_DIR } from './config.js';
import { type SearchResult, type ComponentCategories } from './types.js';

function checkIressComponentMatch(query: string) {
  if (query.startsWith('Iress')) {
    const componentFile = mapIressComponentToFile(query);
    if (componentFile) {
      return {
        content: [
          {
            type: 'text' as const,
            text: `Found exact match for **${query}**:\n\n**${componentFile}**\n   ${query} component documentation\n\n*Use \`get_iress_component_info\` with "${query}" for detailed information.*`,
          },
        ],
      };
    }
  }
  return null;
}

function calculateRelevanceScore(
  file: string,
  content: string,
  query: string,
  lines: string[],
): number {
  let relevanceScore = 0;
  const queryLower = query.toLowerCase();
  const filenameLower = file.toLowerCase();

  // Check for Iress component mentions in content
  const iressComponents = extractIressComponents(content);
  const hasMatchingIressComponent = iressComponents.some(
    (comp) =>
      comp.toLowerCase().includes(queryLower) ||
      queryLower.includes(comp.toLowerCase().replace('iress', '')),
  );
  if (hasMatchingIressComponent) {
    relevanceScore += 75;
  }

  // High relevance for filename matches
  if (filenameLower.includes(queryLower)) {
    relevanceScore += 100;
  }

  // Medium relevance for title matches
  const title =
    lines.find((line) => line.startsWith('#'))?.replace(/^#+\s*/, '') ?? '';
  if (title.toLowerCase().includes(queryLower)) {
    relevanceScore += 50;
  }

  // Lower relevance for content matches
  const contentMatches = content.toLowerCase().split(queryLower).length - 1;
  relevanceScore += contentMatches * 2;

  return relevanceScore;
}

function createSearchResult(
  file: string,
  relevanceScore: number,
  lines: string[],
): SearchResult {
  const componentName = file
    .replace(/^components-/, '')
    .replace('-docs.md', '');
  const description =
    lines
      .slice(0, 10)
      .find(
        (line) =>
          line.trim() && !line.startsWith('#') && !line.startsWith('<!--'),
      )
      ?.trim() ?? 'IDS component documentation';

  return {
    file,
    relevance: relevanceScore,
    description: `${componentName}: ${description}`,
  };
}

export function handleFindComponent(args: unknown) {
  const schema = z.object({
    query: z.string(),
    category: z.enum(['components', 'foundations', 'resources']).optional(),
  });

  const { query, category } = schema.parse(args);

  // Check if query is an Iress component name
  const iressMatch = checkIressComponentMatch(query);
  if (iressMatch) {
    return iressMatch;
  }

  const markdownFiles = getMarkdownFiles();

  // Filter files by category if specified
  const filteredFiles = category
    ? markdownFiles.filter((file) => file.startsWith(`${category}-`))
    : markdownFiles;

  const results: SearchResult[] = [];

  for (const file of filteredFiles) {
    try {
      const filePath = path.join(DOCS_DIR, file);
      const content = readFileContent(filePath);
      const lines = content.split('\n');

      const relevanceScore = calculateRelevanceScore(
        file,
        content,
        query,
        lines,
      );

      if (relevanceScore > 0) {
        results.push(createSearchResult(file, relevanceScore, lines));
      }
    } catch (error) {
      console.error(`Error reading file ${file}:`, error);
    }
  }

  // Sort by relevance
  results.sort((a, b) => b.relevance - a.relevance);

  return {
    content: [
      {
        type: 'text',
        text:
          results.length > 0
            ? `Found ${results.length} relevant IDS components:\n\n${results
                .slice(0, 10) // Limit to top 10 results
                .map(
                  (r, index) =>
                    `${index + 1}. **${r.file}**\n   ${r.description}`,
                )
                .join('\n\n')}`
            : `No IDS components found matching "${query}". Try searching for common component names like "button", "input", "table", or "modal".`,
      },
    ],
  };
}

function findComponentFile(
  component: string,
  markdownFiles: string[],
): string | undefined {
  return markdownFiles.find(
    (file) =>
      file.includes(`components-${component.toLowerCase()}`) ||
      file.toLowerCase().includes(component.toLowerCase()),
  );
}

function formatAvailableComponents(markdownFiles: string[]): string {
  return markdownFiles
    .filter((f) => f.startsWith('components-'))
    .map((f) => `- ${f.replace('components-', '').replace('-docs.md', '')}`)
    .join('\n');
}

function isPropsRelatedLine(line: string): boolean {
  return (
    line.includes('mode') ||
    line.includes('prop') ||
    line.includes('Properties') ||
    line.includes('API') ||
    line.includes('Examples')
  );
}

function extractPropSections(content: string): string[] {
  const lines = content.split('\n');
  const propSections: string[] = [];
  let inPropsSection = false;
  let currentSection = '';

  for (const line of lines) {
    if (isPropsRelatedLine(line)) {
      if (currentSection) {
        propSections.push(currentSection);
      }
      currentSection = line + '\n';
      inPropsSection = true;
    } else if (inPropsSection && line.trim()) {
      currentSection += line + '\n';
    } else if (inPropsSection && !line.trim()) {
      if (currentSection) {
        propSections.push(currentSection);
        currentSection = '';
      }
      inPropsSection = false;
    }
  }

  if (currentSection) {
    propSections.push(currentSection);
  }

  return propSections;
}

function formatPropsResponse(
  propSections: string[],
  content: string,
  componentFile: string,
): string {
  return propSections.length > 0
    ? propSections.join('\n---\n\n')
    : `Props information extracted from ${componentFile}:\n\n${content.slice(0, 2000)}...`;
}

export function handleGetComponentProps(args: unknown) {
  const schema = z.object({
    component: z.string(),
  });

  const { component } = schema.parse(args);
  const markdownFiles = getMarkdownFiles();

  const componentFile = findComponentFile(component, markdownFiles);

  if (!componentFile) {
    return {
      content: [
        {
          type: 'text',
          text: `Component "${component}" not found. Available components:\n${formatAvailableComponents(markdownFiles)}`,
        },
      ],
    };
  }

  try {
    const filePath = path.join(DOCS_DIR, componentFile);
    const content = readFileContent(filePath);
    const propSections = extractPropSections(content);

    return {
      content: [
        {
          type: 'text',
          text: `**${component} Component Props & API**\n\n${formatPropsResponse(propSections, content, componentFile)}`,
        },
      ],
    };
  } catch (error) {
    throw new Error(
      `Failed to read component file ${componentFile}: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
}

export function handleListComponents(args: unknown) {
  const schema = z.object({
    category: z
      .enum(['components', 'foundations', 'resources', 'all'])
      .default('all'),
  });

  const { category } = schema.parse(args);
  const markdownFiles = getMarkdownFiles();

  const categorized: ComponentCategories = {
    components: markdownFiles
      .filter((f) => f.startsWith('components-'))
      .map((f) => f.replace('components-', '').replace('-docs.md', '')),
    foundations: markdownFiles
      .filter((f) => f.startsWith('foundations-'))
      .map((f) => f.replace('foundations-', '').replace('-docs.md', '')),
    resources: markdownFiles
      .filter((f) => f.startsWith('resources-'))
      .map((f) => f.replace('resources-', '').replace('-docs.md', '')),
  };

  let output = '**IDS Component Library**\n\n';

  if (category === 'all') {
    const componentsList = categorized.components
      .map((c) => `- ${c}`)
      .join('\n');
    const foundationsList = categorized.foundations
      .map((c) => `- ${c}`)
      .join('\n');
    const resourcesList = categorized.resources.map((c) => `- ${c}`).join('\n');

    output += `**Components (${categorized.components.length})**\n${componentsList}\n\n`;
    output += `**Foundations (${categorized.foundations.length})**\n${foundationsList}\n\n`;
    output += `**Resources (${categorized.resources.length})**\n${resourcesList}`;
  } else {
    const items = categorized[category as keyof typeof categorized];
    const itemsList = items.map((c) => `- ${c}`).join('\n');
    const categoryTitle = category.charAt(0).toUpperCase() + category.slice(1);

    output += `**${categoryTitle} (${items.length})**\n${itemsList}`;
  }

  return {
    content: [
      {
        type: 'text',
        text: output,
      },
    ],
  };
}
