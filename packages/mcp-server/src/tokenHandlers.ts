/**
 * Token usage handlers for the IDS MCP Server
 * These handlers read from generated Storybook documentation to provide
 * token usage examples, best practices, and anti-patterns.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { z } from 'zod';
import { designTokens } from '@iress-oss/ids-tokens';
import type { IressDesignToken } from '@iress-oss/ids-tokens';
import type { ToolResponse } from './types.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface TokenInfo {
  name: string;
  description: string;
  aliases?: string[];
  aaCompliant?: string[];
  groupPath?: string; // Track which group this token belongs to
}

interface GroupInfo {
  path: string;
  description: string;
}

/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */
function extractTokensFromGroup(
  obj: Record<string, unknown>,
  prefix = '',
  tokens: TokenInfo[] = [],
  groups: GroupInfo[] = [],
): { tokens: TokenInfo[]; groups: GroupInfo[]; topLevelDescription?: string } {
  // Capture the group description if it exists
  const groupDescription =
    '$description' in obj && typeof obj.$description === 'string'
      ? obj.$description
      : undefined;

  // Count dots in prefix to determine depth (0 dots = top level category)
  const depth = prefix ? prefix.split('.').length : 0;
  const isTopLevel = depth === 1; // e.g., "typography", "colour"

  // Store top-level description separately (for the main category)
  const topLevelDescription = isTopLevel ? groupDescription : undefined;

  // Add this group to the list if it has a description and is not top-level
  if (groupDescription && prefix) {
    groups.push({ path: prefix, description: groupDescription });
  }

  for (const [key, value] of Object.entries(obj)) {
    // Skip special $ prefixed properties
    if (key.startsWith('$')) continue;

    const tokenName = prefix ? `${prefix}.${key}` : key;

    // Check if this is a token (has $type, $value, and $description)
    if (
      typeof value === 'object' &&
      value !== null &&
      '$description' in value &&
      '$type' in value &&
      '$value' in value &&
      typeof value.$description === 'string'
    ) {
      const token = value as unknown as IressDesignToken;
      // Extract the group path (everything before the last dot)
      const lastDotIndex = tokenName.lastIndexOf('.');
      const groupPath =
        lastDotIndex > 0 ? tokenName.substring(0, lastDotIndex) : undefined;

      const tokenInfo: TokenInfo = {
        name: tokenName,
        description: token.$description,
        groupPath,
      };

      // Add aliases if present
      const aliases = token.$extensions?.['iress.aliases'];
      if (Array.isArray(aliases) && aliases.length > 0) {
        tokenInfo.aliases = aliases;
      }

      // Add AA compliant combinations if present
      const aaCompliant = token.$extensions?.['iress.contrast.AA'];
      if (Array.isArray(aaCompliant) && aaCompliant.length > 0) {
        tokenInfo.aaCompliant = aaCompliant;
      }

      tokens.push(tokenInfo);
    }

    // Recursively process nested groups (items without $type or $value)
    if (
      typeof value === 'object' &&
      value !== null &&
      (!('$type' in value) || !('$value' in value))
    ) {
      const result = extractTokensFromGroup(
        value as Record<string, unknown>,
        tokenName,
        tokens,
        groups,
      );
      // Propagate results back to parent arrays
      tokens = result.tokens;
      groups = result.groups;
    }
  }

  return { tokens, groups, topLevelDescription };
}
/* eslint-enable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */

// Map category to generated documentation file
const CATEGORY_FILE_MAP: Record<string, string> = {
  colour: 'components_styling-props-colour-docs.md',
  color: 'components_styling-props-colour-docs.md',
  colors: 'components_styling-props-colour-docs.md',
  spacing: 'components_styling-props-spacing-docs.md',
  typography: 'components_styling-props-typography-docs.md',
  elevation: 'components_styling-props-elevation-docs.md',
  radius: 'components_styling-props-radius-docs.md',
  'best-practices': 'components_styling-props-reference-docs.md',
};

/**
 * Read generated documentation file from disk
 */
function readGeneratedDoc(filename: string): string | null {
  try {
    const docsPath = path.join(__dirname, '../generated/docs', filename);

    if (!fs.existsSync(docsPath)) {
      console.warn(`Documentation file not found: ${filename}`);
      return null;
    }

    return fs.readFileSync(docsPath, 'utf-8');
  } catch (error) {
    console.error(`Error reading documentation file ${filename}:`, error);
    return null;
  }
}

/**
 * Extract usage guidelines and best practices from markdown content
 * These files contain examples and best practices, but not necessarily a "Usage Guidelines" section
 */
function extractUsageGuidelines(content: string): string {
  // The content typically includes:
  // 1. Introduction/description at the top
  // 2. Examples sections (Background, Foreground, etc.)
  // 3. Best Practices section
  // We want all of this, so just return the content as-is
  return content.trim();
}

/**
 * Extract best practices and anti-patterns sections from reference doc
 */
function extractBestPractices(content: string): string {
  // Look for "Best Practices" section and capture everything until
  // we hit a new H1/H2 section that is NOT "Common Anti-Patterns"
  const bestPracticesMatch =
    /(##? Best Practices|Best Practices\n[-=]+)[\s\S]*?(?=\n(?:##? (?!Common Anti-Patterns)|[A-Z][^\n]+\n===+)|$)/i.exec(
      content,
    );

  if (bestPracticesMatch) {
    return bestPracticesMatch[0].trim();
  }

  return content;
}

/**
 * Handle get_design_tokens_usage tool call
 */
export function handleGetDesignTokensUsage(args: { category?: string }): {
  content: { type: string; text: string }[];
} {
  const category = args.category ?? 'all';

  let responseText = '# Design Token Usage Examples and Best Practices\n\n';

  if (category === 'all') {
    // Combine all categories
    const categories: string[] = [
      'best-practices',
      'colour',
      'spacing',
      'typography',
      'elevation',
      'radius',
    ];

    for (const cat of categories) {
      const filename = CATEGORY_FILE_MAP[cat];
      const content = readGeneratedDoc(filename);

      if (content) {
        // Format category name: "best-practices" → "Best-practices", "colors" → "Colors"
        const displayName = cat.charAt(0).toUpperCase() + cat.slice(1);

        responseText += `\n## ${displayName}\n\n`;

        if (cat === 'best-practices') {
          responseText += extractBestPractices(content);
        } else {
          responseText += extractUsageGuidelines(content);
        }

        responseText += '\n\n---\n\n';
      }
    }

    // Add cross-reference to get_design_tokens tool
    responseText += '\n\n**Related Tools:**\n\n';
    responseText +=
      '- For token definitions and values, use `get_design_tokens` tool\n';
    responseText +=
      '- For component implementation, use `get_component_props` and `get_usage_examples` tools\n';
  } else {
    // Single category
    const filename = CATEGORY_FILE_MAP[category];

    if (!filename) {
      return {
        content: [
          {
            type: 'text',
            text: `Error: Invalid category '${category}'. Valid categories are: colors, spacing, typography, best-practices, all`,
          },
        ],
      };
    }

    const content = readGeneratedDoc(filename);

    if (!content) {
      return {
        content: [
          {
            type: 'text',
            text: `Error: Could not load documentation for category '${category}'.`,
          },
        ],
      };
    }

    if (category === 'best-practices') {
      responseText += extractBestPractices(content);
    } else {
      responseText += extractUsageGuidelines(content);
    }

    // Add cross-reference
    responseText += '\n\n**Related Tools:**\n\n';
    responseText +=
      '- For token definitions and values, use `get_design_tokens` tool\n';
    responseText +=
      '- For complete documentation, use `get_design_tokens_usage` with category="all"\n';
  }

  return {
    content: [
      {
        type: 'text',
        text: responseText,
      },
    ],
  };
}

/**
 * Handle get_design_tokens tool call
 */
export function handleGetDesignTokens(args: unknown): ToolResponse {
  const schema = z.object({
    type: z.string().default('all'),
  });

  const { type } = schema.parse(args);

  // Map common aliases
  const typeAliases: Record<string, keyof typeof designTokens> = {
    colors: 'colour',
    color: 'colour',
    padding: 'spacing',
    margin: 'spacing',
    gutter: 'spacing',
    gap: 'spacing',
    layer: 'elevation',
    text: 'typography',
    font: 'typography',
    radii: 'radius',
  };

  // Explicitly define available token categories to avoid Object.keys type issues
  const availableTypes = [
    'colour',
    'elevation',
    'radius',
    'spacing',
    'typography',
  ] as const satisfies readonly (keyof typeof designTokens)[];

  type TokenCategory = (typeof availableTypes)[number];
  const requestedType = (typeAliases[type] || type) as TokenCategory;

  // Determine which token categories to include
  const categoriesToInclude: TokenCategory[] =
    type === 'all'
      ? [...availableTypes]
      : availableTypes.includes(requestedType)
        ? [requestedType]
        : [];

  if (categoriesToInclude.length === 0) {
    const crossReference =
      '\n\n**Related Tools:**\n\n' +
      '- For usage examples and best practices, use `get_design_tokens_usage` tool\n' +
      "- See when to use tokens vs hardcoded values with practical ✅ DO / ❌ DON'T examples\n";

    return {
      content: [
        {
          type: 'text',
          text: `No design tokens found for type "${type}". Available types: ${availableTypes.join(', ')}${crossReference}`,
        },
      ],
    };
  }

  const tokenInfo: string[] = [];

  for (const category of categoriesToInclude) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const categoryData = designTokens[category];
    const { tokens, groups, topLevelDescription } = extractTokensFromGroup(
      categoryData as Record<string, unknown>,
      String(category),
    );

    if (tokens.length > 0) {
      let categoryInfo = `**${String(category)}**\n\n`;

      // Include category description if available
      if (topLevelDescription) {
        categoryInfo += `*${topLevelDescription}*\n\n`;
      }

      // Group tokens by their group path
      const tokensByGroup = new Map<string, TokenInfo[]>();
      for (const token of tokens) {
        const groupKey = token.groupPath ?? 'root';
        if (!tokensByGroup.has(groupKey)) {
          tokensByGroup.set(groupKey, []);
        }
        tokensByGroup.get(groupKey)!.push(token);
      }

      // Sort groups by path
      const sortedGroups = Array.from(tokensByGroup.keys()).sort();

      categoryInfo += `Tokens (${tokens.length}):\n\n`;

      // Output tokens organized by group
      for (const groupKey of sortedGroups) {
        const groupTokens = tokensByGroup.get(groupKey)!;

        // Find and include group description if available
        // Skip the top-level category itself as it's already shown above
        if (groupKey !== 'root' && groupKey !== String(category)) {
          const groupInfo = groups.find((g) => g.path === groupKey);
          if (groupInfo) {
            // Convert dot notation to slash notation with title case (e.g., "colour.accent" -> "Colour / Accent")
            const formattedGroupName = groupKey
              .split('.')
              .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
              .join(' / ');
            categoryInfo += `## ${formattedGroupName}\n${groupInfo.description}\n\n`;
          }
        }

        for (const token of groupTokens) {
          categoryInfo += `- \`${token.name}\``;

          // Add aliases if present
          if (token.aliases?.length) {
            categoryInfo += ` (aliases: ${token.aliases.map((a) => `\`${a}\``).join(', ')})`;
          }

          categoryInfo += `\n  ${token.description}`;

          // Add AA compliant combinations if present
          if (token.aaCompliant?.length) {
            categoryInfo += `\n  **AA Compliant with:** ${token.aaCompliant.map((t) => `\`${t}\``).join(', ')}`;
          }

          categoryInfo += '\n\n';
        }
      }

      tokenInfo.push(categoryInfo);
    }
  }

  const typeLabel = type !== 'all' ? ` (${type})` : '';
  const crossReference =
    '\n**Related Tools:**\n\n' +
    '- For usage examples and best practices, use `get_design_tokens_usage` tool\n' +
    "- See when to use tokens vs hardcoded values with practical ✅ DO / ❌ DON'T examples";

  return {
    content: [
      {
        type: 'text',
        text: `**IDS Design Tokens${typeLabel}**\n\n${tokenInfo.join('\n---\n\n')}${crossReference}`,
      },
    ],
  };
}
