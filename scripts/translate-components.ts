#!/usr/bin/env tsx

/**
 * Component Documentation Translator: converts Storybook MDX files directly
 * to AI-consumable markdown for embedding in distributed packages (.ai/ directory).
 *
 * Source: packages/components/src/{components,patterns}/**\/*.docs.mdx
 *         packages/components/docs/{Foundations,StylingProps,GetStarted,Resources}/*.mdx
 * Output: packages/components/.ai/{components,patterns,guides}/*.md + index.json manifest
 *
 * Transformations:
 * - Strips all Storybook imports, <Meta>, <ComponentOverview>, <ComponentApiExpander>
 * - Converts <ComponentExample of={Stories.Name} /> to Chromatic Storybook links
 * - Converts <IressAlert> to blockquote callouts
 * - Converts <IressExpander> to <details> elements
 * - Wraps bare <Iress*> JSX in code fences
 * - Resolves Props type references from component TypeScript source
 * - Generates an index.json manifest for AI agent discovery
 *
 * Usage: npx tsx scripts/translate-components.ts [--dry-run]
 */

import fs from 'fs/promises';
import { existsSync, readFileSync } from 'fs';
import path from 'path';

// ─── Configuration ───────────────────────────────────────────

const ROOT = path.resolve(import.meta.dirname, '..');
const COMPONENTS_SRC = path.join(ROOT, 'packages/components/src/components');
const PATTERNS_SRC = path.join(ROOT, 'packages/components/src/patterns');
const DOCS_SRC = path.join(ROOT, 'packages/components/docs');
const OUTPUT_DIR = path.join(ROOT, 'packages/components/.ai');

const STORYBOOK_URL =
  process.env.STORYBOOK_URL ||
  'https://main--691abcc79dfa560a36d0a74f.chromatic.com';

const CHROMATIC_BASE = `${STORYBOOK_URL}/?path=/story/`;

/** Composition storybook ref prefix — the components storybook is embedded under this ref */
const STORYBOOK_REF_PREFIX = 'components_';

const DRY_RUN = process.argv.includes('--dry-run');

// ─── Types ───────────────────────────────────────────────────

type DocCategory = 'component' | 'pattern' | 'guide';

interface DocFile {
  /** Absolute path to the .docs.mdx file */
  filePath: string;
  /** 'component', 'pattern', or 'guide' */
  category: DocCategory;
  /** Whether this is a recipe file (e.g. AutocompleteRecipes) */
  isRecipe: boolean;
  /** Component directory name (e.g. 'Button', 'MenuItem') */
  componentName: string;
  /** Kebab-case slug for output file (e.g. 'button', 'menu-item') */
  slug: string;
  /** Raw MDX content */
  content: string;
  /** For nested components: relative src path (e.g. 'Menu/MenuItem') */
  componentSrcPath: string;
  /** For guides: Storybook section path (e.g. 'foundations', 'styling-props') */
  guideSection?: string;
  /** For guides: Storybook URL slug (e.g. 'accessibility', 'develop') */
  guideSbSlug?: string;
}

interface TranslatedDoc {
  title: string;
  description: string;
  slug: string;
  category: DocCategory;
  isRecipe: boolean;
  propsType?: string;
  componentSourceFile?: string;
  guideSection?: string;
  guideSbSlug?: string;
}

// ─── Helpers ─────────────────────────────────────────────────

/** Convert PascalCase to kebab-case */
function toKebab(name: string): string {
  return name
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .toLowerCase();
}

/** Build a Chromatic URL from component name + story export name */
function buildStorybookUrl(
  componentName: string,
  exportName: string,
  category: string,
): string {
  const kebab = toKebab(exportName);
  const componentKebab = toKebab(componentName);
  return `${CHROMATIC_BASE}${STORYBOOK_REF_PREFIX}${category}-${componentKebab}--${kebab}`;
}

// ─── Description Extraction ─────────────────────────────────

/**
 * Extract description text from <ComponentOverview description="..." />
 * or <ComponentOverview description={<>...</>} />
 */
function extractDescription(content: string): string | null {
  // Simple string: description="..."
  const simpleMatch = content.match(
    /<ComponentOverview[\s\S]*?description="([^"]+)"/,
  );
  if (simpleMatch) return simpleMatch[1];

  // JSX fragment: description={<>...</>}
  const jsxMatch = content.match(
    /<ComponentOverview[\s\S]*?description=\{[\s\S]*?<>([\s\S]*?)<\/>[\s\S]*?\}/,
  );
  if (jsxMatch) {
    return jsxMatch[1]
      .replace(/<[^>]+>/g, '') // strip inner HTML/JSX tags
      .replace(/\{' '\}/g, ' ') // replace JSX spaces
      .replace(/\s+/g, ' ') // normalize whitespace
      .trim();
  }

  return null;
}

/**
 * Extract the first paragraph after the H1 heading.
 * Useful for guides that don't have <ComponentOverview>.
 */
function extractFirstParagraph(content: string): string | null {
  // Find text after the first H1 heading, before the next heading or blank line pair
  const match = content.match(/^#\s+.+\n+([^#<\n][^\n]+)/m);
  if (match) {
    const para = match[1]
      .replace(/<[^>]+>/g, '')
      .replace(/\s+/g, ' ')
      .trim();
    if (para.length > 20) return para;
  }
  return null;
}

/** Extract the H1 heading from the doc content */
function extractHeading(content: string): string | null {
  const match = content.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : null;
}

/**
 * Get all story module names from import statements.
 * e.g. "import * as ComponentStories from ..." → "ComponentStories"
 */
function getStoryModuleNames(content: string): string[] {
  const matches = [
    ...content.matchAll(
      /import\s+\*\s+as\s+(\w+)\s+from\s+['"][^'"]+\.stories[^'"]*['"]/g,
    ),
  ];
  return matches.map((m) => m[1]);
}

// ─── Stories File & Code Example Extraction ─────────────────

/** Find the .stories.tsx file for a component */
function findStoriesFile(
  docFilePath: string,
  componentName: string,
): string | null {
  const dir = path.dirname(docFilePath);
  const storiesPath = path.join(dir, `${componentName}.stories.tsx`);
  if (existsSync(storiesPath)) return storiesPath;
  const tsPath = path.join(dir, `${componentName}.stories.ts`);
  if (existsSync(tsPath)) return tsPath;
  return null;
}

/**
 * Extract the Default story's args from a stories file.
 * Uses brace-counting to correctly handle nested objects.
 */
function extractDefaultArgs(
  storiesContent: string,
): Record<string, string> | null {
  // Match exactly "export const Default" (not DefaultValues, DefaultArgs, etc.)
  const defaultMatch = storiesContent.match(
    /export\s+const\s+Default(?=[^a-zA-Z0-9_])/,
  );
  if (!defaultMatch || defaultMatch.index === undefined) return null;
  const defaultIdx = defaultMatch.index;

  // First, find the opening brace of the Default story object
  const defaultOpenBrace = storiesContent.indexOf('{', defaultIdx);
  if (defaultOpenBrace === -1 || defaultOpenBrace - defaultIdx > 200)
    return null;

  // Brace-count to find the matching closing brace of the Default object
  let depth = 1;
  let pos = defaultOpenBrace + 1;
  while (pos < storiesContent.length && depth > 0) {
    if (storiesContent[pos] === '{') depth++;
    if (storiesContent[pos] === '}') depth--;
    pos++;
  }
  if (depth !== 0) return null;

  // Extract just the Default object body
  const defaultBody = storiesContent.substring(defaultOpenBrace + 1, pos - 1);

  // Look for args: within the Default object body only
  const argsIdx = defaultBody.indexOf('args:');
  if (argsIdx === -1) return null;

  const openBrace = defaultBody.indexOf('{', argsIdx + 5);
  if (openBrace === -1) return null;

  // Brace-count to find the matching closing brace of the args object
  depth = 1;
  let i = openBrace + 1;
  while (i < defaultBody.length && depth > 0) {
    if (defaultBody[i] === '{') depth++;
    if (defaultBody[i] === '}') depth--;
    i++;
  }
  if (depth !== 0) return null;

  const argsBlock = defaultBody.substring(openBrace + 1, i - 1);
  const args: Record<string, string> = {};

  // Extract only top-level content from argsBlock (skip nested {}, [], <> blocks)
  let topLevel = '';
  let nestDepth = 0;
  for (let c = 0; c < argsBlock.length; c++) {
    const ch = argsBlock[c];
    if (ch === '{' || ch === '[' || ch === '<') {
      nestDepth++;
    } else if (ch === '}' || ch === ']' || ch === '>') {
      nestDepth--;
      if (nestDepth < 0) nestDepth = 0;
    } else if (nestDepth === 0) {
      topLevel += ch;
    }
  }

  // Parse simple key-value pairs (strings, booleans, numbers) from top-level only
  const pairRegex =
    /(\w+)\s*:\s*(?:'([^']*)'|"([^"]*)"|(true|false)|(\d+(?:\.\d+)?))\s*[,\n}]/g;
  let match;
  while ((match = pairRegex.exec(topLevel))) {
    const key = match[1];
    const value = match[2] ?? match[3] ?? match[4] ?? match[5];
    if (value !== undefined && value !== '') {
      args[key] = value;
    }
  }

  return Object.keys(args).length > 0 ? args : null;
}

/**
 * Check if a stories file has an `export const Default` (but args may not be parseable).
 */
function hasDefaultExport(storiesContent: string): boolean {
  return /export\s+const\s+Default(?=[^a-zA-Z0-9_])/.test(storiesContent);
}

/**
 * Generate a minimal Quick Start when Default exists but args can't be parsed.
 */
function generateMinimalUsageExample(componentExportName: string): string {
  return `\`\`\`tsx\nimport { ${componentExportName} } from '@iress-oss/ids-components';\n\n<${componentExportName} />\n\`\`\``;
}

/**
 * Generate a Quick Start code example from the component name and Default args.
 */
function generateUsageExample(
  componentExportName: string,
  args: Record<string, string>,
): string {
  const children = args.children;
  const otherArgs = { ...args };
  delete otherArgs.children;

  const propFragments: string[] = [];
  for (const [key, value] of Object.entries(otherArgs)) {
    if (value === 'true') {
      propFragments.push(key);
    } else if (value === 'false') {
      propFragments.push(`${key}={false}`);
    } else if (/^\d+(\.\d+)?$/.test(value)) {
      propFragments.push(`${key}={${value}}`);
    } else {
      propFragments.push(`${key}="${value}"`);
    }
  }
  const propsStr =
    propFragments.length > 0 ? ' ' + propFragments.join(' ') : '';

  let jsx: string;
  if (children) {
    jsx = `<${componentExportName}${propsStr}>\n  ${children}\n</${componentExportName}>`;
  } else {
    jsx = `<${componentExportName}${propsStr} />`;
  }

  return `\`\`\`tsx\nimport { ${componentExportName} } from '@iress-oss/ids-components';\n\n${jsx}\n\`\`\``;
}

// ─── Props Type Resolution ──────────────────────────────────

/**
 * Find the exported Props type from a component's TypeScript source.
 * Searches for: IressXxxProps, XxxProps, or any exported *Props type.
 */
function findExportedPropsType(
  componentDir: string,
  componentName: string,
): string | null {
  const tsxPath = path.join(componentDir, `${componentName}.tsx`);
  if (!existsSync(tsxPath)) return null;

  const source = readFileSync(tsxPath, 'utf-8');

  // Priority 1: Iress-prefixed Props (e.g. IressButtonProps)
  const iressPrefixed = `Iress${componentName}Props`;
  const iressPattern = new RegExp(
    `export\\s+(?:interface|type)\\s+${iressPrefixed}\\b`,
  );
  if (iressPattern.test(source)) return iressPrefixed;

  // Priority 2: Bare Props (e.g. ButtonProps)
  const bareName = `${componentName}Props`;
  const barePattern = new RegExp(
    `export\\s+(?:interface|type)\\s+${bareName}\\b`,
  );
  if (barePattern.test(source)) return bareName;

  // Priority 3: Any exported *Props type
  const anyPropsMatch = source.match(
    /export\s+(?:interface|type)\s+(\w+Props)\b/,
  );
  if (anyPropsMatch) return anyPropsMatch[1];

  return null;
}

/**
 * Generate a Props reference section pointing to .d.ts type declarations.
 */
function generatePropsReference(
  componentSourceFile: string,
  propsType: string,
): string {
  const dtsRelPath = componentSourceFile.replace(/\.tsx?$/, '.d.ts');
  const dtsPackagePath = `@iress-oss/ids-components/dist/components/${dtsRelPath}`;

  let md = '';
  md += `## Props\n\n`;
  md += `- **Type:** \`${propsType}\`\n`;
  md += `- **Type declarations:** \`${dtsPackagePath}\`\n\n`;
  md += `\`\`\`typescript\nimport type { ${propsType} } from '@iress-oss/ids-components';\n\`\`\`\n`;

  return md;
}

// ─── Content Transformation ──────────────────────────────────

/**
 * Remove <ComponentOverview .../> tags, handling nested JSX and braces.
 * Uses brace-counting to find the real end of the tag.
 */
function removeComponentOverview(content: string): string {
  let result = content;
  let safety = 0;

  while (result.includes('<ComponentOverview') && safety < 10) {
    safety++;
    const start = result.indexOf('<ComponentOverview');
    if (start === -1) break;

    let braceDepth = 0;
    let i = start + '<ComponentOverview'.length;
    let foundEnd = -1;

    while (i < result.length) {
      const ch = result[i];

      if (ch === '{') {
        braceDepth++;
        i++;
        continue;
      }
      if (ch === '}') {
        braceDepth--;
        i++;
        continue;
      }

      if (braceDepth === 0) {
        // Self-closing: />
        if (ch === '/' && i + 1 < result.length && result[i + 1] === '>') {
          foundEnd = i + 2;
          break;
        }
        // Opening tag end: >
        if (ch === '>') {
          const closeTag = '</ComponentOverview>';
          const closeIdx = result.indexOf(closeTag, i + 1);
          foundEnd = closeIdx !== -1 ? closeIdx + closeTag.length : i + 1;
          break;
        }
      }
      i++;
    }

    if (foundEnd === -1) break;

    const before = result.substring(0, start);
    let after = result.substring(foundEnd);
    after = after.replace(/^\s*\n?/, '');
    result = before + after;
  }

  return result;
}

/**
 * Convert <IressAlert status="..." heading="...">content</IressAlert>
 * to markdown blockquote callouts.
 */
function convertIressAlertToCallout(content: string): string {
  let result = content;
  let safety = 0;
  const typeMap: Record<string, string> = {
    info: 'NOTE',
    warning: 'WARNING',
    error: 'CAUTION',
    success: 'TIP',
    danger: 'CAUTION',
  };

  while (result.includes('<IressAlert') && safety < 50) {
    safety++;
    const start = result.indexOf('<IressAlert');
    if (start === -1) break;

    const tagMatch = result.substring(start).match(/^<IressAlert([^>]*)>/s);
    if (!tagMatch) {
      const selfClose = result.substring(start).match(/^<IressAlert[^/]*\/>/s);
      if (selfClose) {
        result =
          result.substring(0, start) +
          result.substring(start + selfClose[0].length);
        continue;
      }
      break;
    }

    const attrs = tagMatch[1];
    const statusMatch = attrs.match(/status="(\w+)"/);
    const headingMatch = attrs.match(/(?:heading|title)="([^"]+)"/);

    const status = statusMatch ? statusMatch[1] : 'info';
    const heading = headingMatch ? headingMatch[1] : '';
    const alertType = typeMap[status] || 'NOTE';

    const closeTag = '</IressAlert>';
    const closeIdx = result.indexOf(closeTag, start);
    if (closeIdx === -1) break;

    const innerContent = result
      .substring(start + tagMatch[0].length, closeIdx)
      .trim();

    const lines = innerContent
      .split('\n')
      .map((l) => `> ${l.trimEnd()}`)
      .join('\n');
    const titleLine = heading ? `> **${heading}**\n>\n` : '';
    const callout = `> [!${alertType}]\n${titleLine}${lines}`;

    result =
      result.substring(0, start) +
      callout +
      result.substring(closeIdx + closeTag.length);
  }

  return result;
}

/**
 * Convert <IressExpander activator="Title">content</IressExpander>
 * to a <details><summary> block.
 */
function convertIressExpanderToDetails(content: string): string {
  let result = content;
  let safety = 0;

  while (result.includes('<IressExpander') && safety < 50) {
    safety++;
    const start = result.indexOf('<IressExpander');
    if (start === -1) break;

    const tagMatch = result.substring(start).match(/^<IressExpander([^>]*)>/s);
    if (!tagMatch) {
      const selfClose = result
        .substring(start)
        .match(/^<IressExpander[^/]*\/>/s);
      if (selfClose) {
        result =
          result.substring(0, start) +
          result.substring(start + selfClose[0].length);
        continue;
      }
      break;
    }

    const attrs = tagMatch[1];
    const activatorMatch = attrs.match(/activator="([^"]+)"/);
    const summary = activatorMatch ? activatorMatch[1] : 'Details';

    const closeTag = '</IressExpander>';
    const closeIdx = result.indexOf(closeTag, start);
    if (closeIdx === -1) break;

    const innerContent = result
      .substring(start + tagMatch[0].length, closeIdx)
      .trim();
    const details = `<details>\n<summary>${summary}</summary>\n\n${innerContent}\n\n</details>`;

    result =
      result.substring(0, start) +
      details +
      result.substring(closeIdx + closeTag.length);
  }

  return result;
}

/**
 * Apply a regex replacement only on lines outside code fences.
 */
function replaceOutsideCodeFences(
  content: string,
  pattern: RegExp,
  replacement: string,
): string {
  const lines = content.split('\n');
  const result: string[] = [];
  let inCodeFence = false;

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('```')) {
      inCodeFence = !inCodeFence;
      result.push(line);
      continue;
    }
    if (inCodeFence) {
      result.push(line);
    } else {
      const replaced = line.replace(pattern, replacement);
      if (replaced !== '' || line === '') {
        result.push(replaced);
      }
    }
  }

  return result.join('\n');
}

/**
 * Wrap bare <Iress...> JSX blocks (outside code fences) in code fences.
 */
function wrapBareJsxInCodeFences(content: string): string {
  const lines = content.split('\n');
  const outputLines: string[] = [];
  let inCodeFence = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    if (trimmed.startsWith('```')) {
      inCodeFence = !inCodeFence;
      outputLines.push(line);
      continue;
    }

    if (inCodeFence) {
      outputLines.push(line);
      continue;
    }

    // Outside code fences: check for bare <Iress...> JSX
    if (/^<Iress\w+/.test(trimmed)) {
      // Self-closing tag on one line
      if (/\/>$/.test(trimmed)) {
        outputLines.push('```tsx');
        outputLines.push(line);
        outputLines.push('```');
        continue;
      }

      // Multi-line JSX block: find closing tag
      const tagNameMatch = trimmed.match(/^<(Iress\w+)/);
      if (tagNameMatch) {
        const tagName = tagNameMatch[1];
        const closeTag = `</${tagName}>`;
        const jsxLines = [line];
        let j = i + 1;
        let found = false;

        while (j < lines.length) {
          jsxLines.push(lines[j]);
          if (lines[j].includes(closeTag)) {
            found = true;
            break;
          }
          j++;
          if (j - i > 20) break; // Safety limit
        }

        if (found) {
          outputLines.push('```tsx');
          outputLines.push(...jsxLines);
          outputLines.push('```');
          i = j; // Skip processed lines
          continue;
        }
      }
    }

    outputLines.push(line);
  }

  return outputLines.join('\n');
}

/**
 * Transform raw Storybook MDX content to clean AI-consumable markdown.
 */
function transformContent(doc: DocFile): {
  output: string;
  title: string;
  description: string;
  warnings: string[];
} {
  const warnings: string[] = [];
  const { content, componentName, category } = doc;
  const categoryPrefix =
    category === 'guide'
      ? (doc.guideSection || 'foundations')
      : category === 'component'
        ? 'components'
        : 'patterns';
  const storyModules = getStoryModuleNames(content);

  // Extract metadata before stripping
  const description =
    extractDescription(content) ||
    extractFirstParagraph(content) ||
    `${componentName} ${category} documentation.`;
  const heading = extractHeading(content) || componentName;

  let result = content;

  // 1. Remove all import statements
  result = result.replace(
    /import\s+(?:\{[^}]*\}|\*\s+as\s+\w+|\w+)\s+from\s+['"][^'"]+['"];?\n?/g,
    '',
  );

  // 2. Remove <Meta of={...} /> and <Meta title="..." />
  result = result.replace(/<Meta\s+of=\{[^}]+\}\s*\/>\s*\n?/g, '');
  result = result.replace(/<Meta\s+title="[^"]*"\s*\/>\s*\n?/g, '');

  // 3. Remove <ComponentOverview>
  result = removeComponentOverview(result);

  // 4. Convert <ComponentExample of={ModuleName.ExportName} /> to Storybook links
  result = result.replace(
    /<ComponentExample[\s\S]*?of=\{(\w+)\.(\w+)\}[\s\S]*?\/>/g,
    (_match, moduleName, exportName) => {
      let storyComponentName = componentName;
      for (const mod of storyModules) {
        if (mod === moduleName) {
          const nameFromModule = moduleName
            .replace(/Stories$/, '')
            .replace(/Recipes$/, '');
          if (nameFromModule !== 'Component') {
            storyComponentName = nameFromModule;
          }
        }
      }
      const url = buildStorybookUrl(
        storyComponentName,
        exportName,
        categoryPrefix,
      );
      return `[View "${exportName}" example in Storybook →](${url})`;
    },
  );

  // 5. Remove wrapping <ComponentExample>...</ComponentExample>
  result = result.replace(
    /<ComponentExample[\s\S]*?>[\s\S]*?<\/ComponentExample>\s*\n?/g,
    (_match) => {
      warnings.push('Found wrapping <ComponentExample>. Manual review needed.');
      return '';
    },
  );

  // 6. Remove <ComponentApiExpander>
  result = result.replace(/<ComponentApiExpander[\s\S]*?\/>\s*\n?/g, '');
  result = result.replace(
    /<ComponentApiExpander[\s\S]*?>[\s\S]*?<\/ComponentApiExpander>\s*\n?/g,
    '',
  );

  // 7. Convert <Story of={...} /> to Storybook links
  result = result.replace(
    /<Story\s+of=\{(\w+)\.(\w+)\}\s*\/>/g,
    (_match, moduleName, exportName) => {
      let storyComponentName = componentName;
      for (const mod of storyModules) {
        if (mod === moduleName) {
          const nameFromModule = moduleName
            .replace(/Stories$/, '')
            .replace(/Recipes$/, '');
          if (nameFromModule !== 'Component') {
            storyComponentName = nameFromModule;
          }
        }
      }
      const url = buildStorybookUrl(
        storyComponentName,
        exportName,
        categoryPrefix,
      );
      return `[View "${exportName}" example in Storybook →](${url})`;
    },
  );

  // 8. Remove remaining <Story> tags
  result = result.replace(/<Story[\s\S]*?\/>\s*\n?/g, '');

  // 9. Convert <IressAlert> to blockquote callouts
  result = convertIressAlertToCallout(result);

  // 10. Convert <IressExpander> to <details>
  result = convertIressExpanderToDetails(result);

  // 11. Remove <p> wrappers around content
  result = result.replace(/<p>\s*\n?([\s\S]*?)\n?\s*<\/p>/g, (_match, inner) =>
    inner.trim(),
  );

  // 11b. Remove <IressPanel> wrappers outside code fences (keep inner content)
  result = replaceOutsideCodeFences(result, /<IressPanel[^>]*>/g, '');
  result = replaceOutsideCodeFences(result, /<\/IressPanel>/g, '');

  // 11c. Remove inline JSX expressions like <>{VAR}</> (runtime JS we can't evaluate)
  result = replaceOutsideCodeFences(result, /<>\{[^}]+\}<\/>/g, '(see Storybook)');

  // 12. Convert <IressButton href="...">text</IressButton> to markdown links
  result = result.replace(
    /<IressButton\s+href="([^"]+)"[^>]*>\s*([\s\S]*?)\s*<\/IressButton>/g,
    (_match, href, text) => `[${text.trim()}](${href})`,
  );

  // 13. Wrap bare Iress JSX outside code fences in code blocks
  result = wrapBareJsxInCodeFences(result);

  // 14. Remove orphaned closing tags outside code fences
  result = replaceOutsideCodeFences(result, /^<\/Iress\w+>;\s*$/gm, '');
  result = replaceOutsideCodeFences(result, /^<\/Iress\w+>\s*$/gm, '');

  // 15. Fix nested code fences
  result = result.replace(/```tsx\s*\n\s*```tsx/g, '```tsx');

  // 16. Convert Storybook internal doc links to full Storybook URLs
  result = result.replace(
    /\(\?path=\/docs\/components-(\w+)--docs\)/g,
    (_match, slug) =>
      `(${STORYBOOK_URL}/?path=/docs/${STORYBOOK_REF_PREFIX}components-${slug}--docs)`,
  );
  result = result.replace(
    /\(\?path=\/docs\/patterns-(\w+)--docs\)/g,
    (_match, slug) =>
      `(${STORYBOOK_URL}/?path=/docs/${STORYBOOK_REF_PREFIX}patterns-${slug}--docs)`,
  );

  // 17. Remove any remaining MDX-specific elements
  result = result.replace(/import\s+.*from\s+['"].*['"];?\n/g, '');

  // 18. Clean up excessive blank lines
  result = result.replace(/\n{3,}/g, '\n\n');
  result = result.trim();

  // Remove the H1 heading (we'll add it back in the header)
  result = result.replace(/^#\s+.+\n*/m, '');

  return { output: result, title: heading, description, warnings };
}

/**
 * Build the final AI-consumable markdown for a doc file.
 */
function buildOutput(
  doc: DocFile,
  transformed: string,
  title: string,
  description: string,
  propsMarkdown: string | null,
  componentExportName: string | null,
  codeExample: string | null,
): string {
  const categoryLabel = doc.category === 'component' ? 'Component' : 'Pattern';
  const storybookPath =
    doc.category === 'component' ? 'components' : 'patterns';
  const storybookUrl = `${STORYBOOK_URL}/?path=/docs/${STORYBOOK_REF_PREFIX}${storybookPath}-${toKebab(doc.componentName)}--docs`;

  let output = '';

  // Header
  output += `# ${title}\n\n`;
  if (description) {
    output += `${description}\n\n`;
  }

  // Reference links — show actual import for components/patterns
  if (componentExportName) {
    output += `> **${categoryLabel}:** \`import { ${componentExportName} } from '@iress-oss/ids-components'\`\n`;
  } else {
    output += `> **${categoryLabel}:** \`@iress-oss/ids-components\`\n`;
  }
  output += `> **Storybook:** [${title} in Storybook](${storybookUrl})\n\n`;

  // Quick Start code example
  if (codeExample) {
    output += `## Quick Start\n\n${codeExample}\n\n`;
  }

  // Main content
  output += transformed;

  // Props section
  if (propsMarkdown) {
    output += `\n\n${propsMarkdown}`;
  }

  // Footer
  output += '\n\n---\n\n';
  output += `*View interactive examples: [${storybookUrl}](${storybookUrl})*\n`;

  return output;
}

// ─── File Discovery ──────────────────────────────────────────

/**
 * Check if a component is deprecated by scanning its .tsx source for
 * `@deprecated` JSDoc on the main component or interface export.
 * Only flags whole-component deprecations, not individual prop deprecations.
 */
function isComponentDeprecated(
  componentDir: string,
  componentName: string,
): boolean {
  const tsxPath = path.join(componentDir, `${componentName}.tsx`);
  if (!existsSync(tsxPath)) return false;

  const source = readFileSync(tsxPath, 'utf-8');

  // Match JSDoc @deprecated immediately followed by the component export
  // e.g. /** @deprecated IressHide has been deprecated. */\nexport const IressHide
  // or   /** @deprecated ... */\nexport interface IressHideProps
  const deprecatedExportRe = new RegExp(
    `@deprecated[^]*?\\*/\\s*\nexport\\s+(?:const|interface|function)\\s+Iress${componentName}(?:Props)?\\b`,
  );
  return deprecatedExportRe.test(source);
}

async function findDocFiles(
  baseDir: string,
  category: 'component' | 'pattern',
): Promise<{ docs: DocFile[]; skippedDeprecated: string[] }> {
  const docs: DocFile[] = [];
  const skippedDeprecated: string[] = [];

  async function walk(dir: string) {
    if (!existsSync(dir)) return;

    const entries = await fs.readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        await walk(fullPath);
        continue;
      }

      if (!entry.name.endsWith('.docs.mdx')) continue;

      const fileName = entry.name.replace('.docs.mdx', '');
      const isRecipe = fileName.toLowerCase().includes('recipe');
      const componentName = path.basename(path.dirname(fullPath));

      // Skip deprecated components (check the main .tsx source)
      if (!isRecipe && isComponentDeprecated(path.dirname(fullPath), componentName)) {
        skippedDeprecated.push(componentName);
        continue;
      }

      const content = await fs.readFile(fullPath, 'utf-8');

      // For nested components (e.g. Menu/MenuItem), build the src path
      const componentSrcPath = path.relative(baseDir, path.dirname(fullPath));

      // Generate kebab-case slug
      const slug = toKebab(fileName);

      docs.push({
        filePath: fullPath,
        category,
        isRecipe,
        componentName,
        slug,
        content,
        componentSrcPath,
      });
    }
  }

  await walk(baseDir);
  return { docs, skippedDeprecated };
}

// ─── Guide File Discovery ────────────────────────────────────

/**
 * Curated list of guide MDX files to translate.
 * Excludes introductory/navigation pages and developer learning resources.
 *
 * Each entry: [subdir, filename, storybookSection, storybookSlug]
 * storybookSection: the Storybook nav section (e.g. 'foundations')
 * storybookSlug: the slug used in Storybook URLs (e.g. 'accessibility')
 */
const GUIDE_SOURCES: [string, string, string, string][] = [
  // Foundations
  ['Foundations', '010-Principles.mdx', 'foundations', 'principles'],
  ['Foundations', '015-Accessibility.mdx', 'foundations', 'accessibility'],
  ['Foundations', '020-Iconography.mdx', 'foundations', 'iconography'],
  ['Foundations', '020-Responsive.mdx', 'foundations', 'responsive-layout'],
  ['Foundations', '040-Zindex.mdx', 'foundations', 'z-index-stacking'],
  ['Foundations', '050-VisualDesign.mdx', 'foundations', 'visual-design-standards'],
  ['Foundations', '060-Consistency.mdx', 'foundations', 'using-components-consistently'],
  ['Foundations', '070-Content.mdx', 'foundations', 'content'],
  ['Foundations', '080-UserExperience.mdx', 'foundations', 'user-experience'],
  // Styling Props
  ['StylingProps', '010-Reference.mdx', 'styling-props', 'styling-props'],
  ['StylingProps', '015-Accessibility.mdx', 'styling-props', 'accessibility'],
  ['StylingProps', '020-Colour.mdx', 'styling-props', 'colour'],
  ['StylingProps', '035-Layout.mdx', 'styling-props', 'layout'],
  ['StylingProps', '040-Radius.mdx', 'styling-props', 'radius'],
  ['StylingProps', '060-Sizing.mdx', 'styling-props', 'sizing'],
  ['StylingProps', '070-Spacing.mdx', 'styling-props', 'spacing'],
  ['StylingProps', '080-Typography.mdx', 'styling-props', 'typography'],
  // Get Started
  ['GetStarted', '010-Develop.mdx', 'get-started', 'develop'],
  // Resources — Migration
  ['Resources/030-MigrationGuides', 'v5.mdx', 'resources-migration-guides', 'migration-from-v4-to-v5'],
];

/**
 * Load curated guide MDX files for translation.
 * Uses a hardcoded list to avoid translating introductory/navigation pages.
 */
async function findGuideFiles(): Promise<DocFile[]> {
  const docs: DocFile[] = [];

  for (const [subdir, filename, section, sbSlug] of GUIDE_SOURCES) {
    const fullPath = path.join(DOCS_SRC, subdir, filename);
    if (!existsSync(fullPath)) {
      console.warn(`  ⚠ Guide file not found: ${subdir}/${filename}`);
      continue;
    }

    const content = await fs.readFile(fullPath, 'utf-8');
    const baseName = filename.replace(/\.mdx$/, '');
    // Strip numeric prefix: "010-Principles" → "Principles", "v5" stays "v5"
    const cleanName = baseName.replace(/^\d+-/, '');
    // Strip numeric prefix from subdir leaf too: "030-MigrationGuides" → "MigrationGuides"
    const subdirLeaf = (subdir.split('/').pop() || subdir).replace(/^\d+-/, '');
    const slug = `${toKebab(subdirLeaf)}-${toKebab(cleanName)}`;

    docs.push({
      filePath: fullPath,
      category: 'guide',
      isRecipe: false,
      componentName: cleanName,
      slug,
      content,
      componentSrcPath: '',
      guideSection: section,
      guideSbSlug: sbSlug,
    });
  }

  return docs;
}

/**
 * Build output for a guide document (no Props, no Quick Start — just clean markdown).
 */
function buildGuideOutput(
  doc: DocFile,
  transformed: string,
  title: string,
  _description: string,
): string {
  const storybookUrl = `${STORYBOOK_URL}/?path=/docs/${STORYBOOK_REF_PREFIX}${doc.guideSection}-${doc.guideSbSlug}--docs`;

  let output = '';
  output += `# ${title}\n\n`;
  // Description is already the first paragraph in the body — don't duplicate it
  output += `> **Guide:** \`@iress-oss/ids-components\`\n`;
  output += `> **Storybook:** [${title} in Storybook](${storybookUrl})\n\n`;
  output += transformed;
  output += '\n\n---\n\n';
  output += `*View in Storybook: [${storybookUrl}](${storybookUrl})*\n`;

  return output;
}

// ─── Manifest Generation ─────────────────────────────────────

interface ManifestEntry {
  name: string;
  path: string;
  category: string;
  storybookUrl: string;
  propsType?: string;
  typeDeclPath?: string;
}

function generateManifest(translatedDocs: TranslatedDoc[]): object {
  const components: ManifestEntry[] = [];
  const patterns: ManifestEntry[] = [];
  const guides: ManifestEntry[] = [];

  for (const doc of translatedDocs) {
    if (doc.category === 'guide') {
      guides.push({
        name: doc.title,
        path: `guides/${doc.slug}.md`,
        category: 'guide',
        storybookUrl: `${STORYBOOK_URL}/?path=/docs/${STORYBOOK_REF_PREFIX}${doc.guideSection}-${doc.guideSbSlug}--docs`,
      });
      continue;
    }

    const storybookPath =
      doc.category === 'component' ? 'components' : 'patterns';
    const entry: ManifestEntry = {
      name: doc.title,
      path: `${storybookPath}/${doc.slug}.md`,
      category: doc.category,
      storybookUrl: `${STORYBOOK_URL}/?path=/docs/${STORYBOOK_REF_PREFIX}${storybookPath}-${doc.slug}--docs`,
    };

    if (doc.propsType && doc.componentSourceFile) {
      entry.propsType = doc.propsType;
      entry.typeDeclPath = `dist/components/${doc.componentSourceFile.replace(/\.tsx?$/, '.d.ts')}`;
    }

    if (doc.category === 'component') {
      components.push(entry);
    } else {
      patterns.push(entry);
    }
  }

  return {
    package: '@iress-oss/ids-components',
    urls: {
      storybook: STORYBOOK_URL,
    },
    documentation: {
      components,
      patterns,
      guides,
    },
    api: {
      source: 'TypeScript .d.ts type declarations with JSDoc annotations',
      note: 'For full Props details, read the .d.ts files listed in each component entry above.',
    },
  };
}

// ─── Main ────────────────────────────────────────────────────

async function main() {
  console.log('📝 Translating Storybook docs → AI-consumable format...\n');

  if (DRY_RUN) {
    console.log('🏃 DRY RUN — no files will be written\n');
  }

  // Discover docs
  const { docs: componentDocs, skippedDeprecated: deprecatedComponents } =
    await findDocFiles(COMPONENTS_SRC, 'component');
  const { docs: patternDocs, skippedDeprecated: deprecatedPatterns } =
    await findDocFiles(PATTERNS_SRC, 'pattern');
  const guideDocs = await findGuideFiles();
  const allDocs = [...componentDocs, ...patternDocs, ...guideDocs];
  const allDeprecated = [...deprecatedComponents, ...deprecatedPatterns];

  console.log(`Found ${allDocs.length} docs to translate`);
  console.log(`  Components: ${componentDocs.length}`);
  console.log(`  Patterns:   ${patternDocs.length}`);
  console.log(`  Guides:     ${guideDocs.length}`);
  if (allDeprecated.length > 0) {
    console.log(
      `  Skipped (deprecated): ${allDeprecated.length} — ${allDeprecated.join(', ')}`,
    );
  }
  console.log();

  let translated = 0;
  let errors = 0;
  const allWarnings: string[] = [];
  const translatedDocs: TranslatedDoc[] = [];

  for (const doc of allDocs) {
    try {
      // Transform content
      const { output, title, description, warnings } = transformContent(doc);

      for (const w of warnings) {
        allWarnings.push(`${doc.slug}: ${w}`);
      }

      let finalOutput: string;
      let propsType: string | undefined;
      let componentSourceFile: string | undefined;

      if (doc.category === 'guide') {
        // ── Guide: no Props, no Quick Start ──
        finalOutput = buildGuideOutput(doc, output, title, description);
      } else {
        // ── Component / Pattern ──

        // Resolve Props type (for non-recipe components only)
        let propsMarkdown: string | null = null;

        if (doc.category === 'component' && !doc.isRecipe) {
          const componentDir = path.dirname(doc.filePath);
          propsType =
            findExportedPropsType(componentDir, doc.componentName) ?? undefined;

          if (propsType) {
            componentSourceFile = `${doc.componentSrcPath}/${doc.componentName}.tsx`;
            propsMarkdown = generatePropsReference(
              componentSourceFile,
              propsType,
            );
          } else {
            allWarnings.push(
              `${doc.slug}: No Props type found for ${doc.componentName}`,
            );
          }
        }

        // Derive component export name
        const componentExportName = !doc.isRecipe
          ? `Iress${doc.componentName}`
          : null;

        // Extract code example from stories Default export
        let codeExample: string | null = null;
        if (!doc.isRecipe) {
          const storiesFile = findStoriesFile(doc.filePath, doc.componentName);
          if (storiesFile) {
            const storiesContent = readFileSync(storiesFile, 'utf-8');
            const defaultArgs = extractDefaultArgs(storiesContent);
            if (defaultArgs && componentExportName) {
              codeExample = generateUsageExample(
                componentExportName,
                defaultArgs,
              );
            } else if (hasDefaultExport(storiesContent) && componentExportName) {
              codeExample = generateMinimalUsageExample(componentExportName);
            }
          }
        }

        finalOutput = buildOutput(
          doc,
          output,
          title,
          description,
          propsMarkdown,
          componentExportName,
          codeExample,
        );
      }

      // Write output
      const outputSubDir =
        doc.category === 'component'
          ? 'components'
          : doc.category === 'pattern'
            ? 'patterns'
            : 'guides';
      const outputPath = path.join(OUTPUT_DIR, outputSubDir, `${doc.slug}.md`);

      if (!DRY_RUN) {
        await fs.mkdir(path.dirname(outputPath), { recursive: true });
        await fs.writeFile(outputPath, finalOutput, 'utf-8');
      }

      console.log(`  ✓ ${title} → ${path.relative(process.cwd(), outputPath)}`);
      translated++;

      translatedDocs.push({
        title,
        description,
        slug: doc.slug,
        category: doc.category,
        isRecipe: doc.isRecipe,
        propsType,
        componentSourceFile,
        guideSection: doc.guideSection,
        guideSbSlug: doc.guideSbSlug,
      });
    } catch (error) {
      console.error(
        `  ✗ ${doc.slug}: ${error instanceof Error ? error.message : error}`,
      );
      errors++;
    }
  }

  // Generate manifest
  if (!DRY_RUN) {
    const manifest = generateManifest(translatedDocs);
    const manifestPath = path.join(OUTPUT_DIR, 'index.json');
    await fs.mkdir(OUTPUT_DIR, { recursive: true });
    await fs.writeFile(
      manifestPath,
      JSON.stringify(manifest, null, 2),
      'utf-8',
    );
    console.log(
      `\n  ✓ Manifest → ${path.relative(process.cwd(), manifestPath)}`,
    );
  }

  // Summary
  console.log(`\n${'═'.repeat(60)}`);
  console.log(`✅ Translation complete!`);
  console.log(`  Translated: ${translated}`);
  console.log(`  Errors:     ${errors}`);
  console.log(`  Warnings:   ${allWarnings.length}`);

  if (allWarnings.length > 0) {
    console.log(`\n⚠️  Warnings:`);
    for (const w of allWarnings) {
      console.log(`  - ${w}`);
    }
  }

  if (DRY_RUN) {
    console.log('\n(dry run — no files written)');
  }

  if (errors > 0) {
    process.exit(1);
  }
}

main().catch(console.error);
