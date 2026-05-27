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
import { fileURLToPath, pathToFileURL } from 'url';

// ─── Configuration ───────────────────────────────────────────

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT = path.resolve(__dirname, '..');
const COMPONENTS_SRC = path.join(ROOT, 'packages/components/src/components');
const PATTERNS_SRC = path.join(ROOT, 'packages/components/src/patterns');
const DOCS_SRC = path.join(ROOT, 'packages/components/docs');
const OUTPUT_DIR_AI = path.join(ROOT, 'packages/components/.ai');
const OUTPUT_DIR_GUIDELINES = path.join(ROOT, 'apps/guidelines/content/components');

const STORYBOOK_URL =
  process.env.STORYBOOK_URL ||
  'https://main--691abcc79dfa560a36d0a74f.chromatic.com';

const CHROMATIC_BASE = `${STORYBOOK_URL}/?path=/story/`;

/** Composition storybook ref prefix — the components storybook is embedded under this ref */
const STORYBOOK_REF_PREFIX = 'components_';

type Target = 'ai' | 'guidelines';
const targetArg = process.argv.find((a) => a.startsWith('--target='))?.split('=')[1];
const TARGETS: Target[] = targetArg
  ? [targetArg as Target]
  : ['ai', 'guidelines'];

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

// ─── Story Code Extraction ───────────────────────────────────

/**
 * Find matching close delimiter, skipping string/template literals.
 * Starts counting from position `startAfterOpen` with depth=1.
 * Returns the position one past the closing delimiter, or -1 on failure.
 */
function findMatchingClose(
  content: string,
  startAfterOpen: number,
  openChar: string,
  closeChar: string,
): number {
  let depth = 1;
  let pos = startAfterOpen;
  while (pos < content.length && depth > 0) {
    const ch = content[pos];
    // Skip string / template literals
    if (ch === "'" || ch === '"' || ch === '`') {
      const quote = ch;
      pos++;
      while (pos < content.length) {
        if (content[pos] === '\\') {
          pos += 2;
          continue;
        }
        if (content[pos] === quote) break;
        // Template literal expression ${...}
        if (
          quote === '`' &&
          content[pos] === '$' &&
          pos + 1 < content.length &&
          content[pos + 1] === '{'
        ) {
          pos += 2;
          let exprDepth = 1;
          while (pos < content.length && exprDepth > 0) {
            if (content[pos] === '{') exprDepth++;
            if (content[pos] === '}') exprDepth--;
            pos++;
          }
          continue;
        }
        pos++;
      }
    } else if (ch === openChar) {
      depth++;
    } else if (ch === closeChar) {
      depth--;
    }
    pos++;
  }
  return depth === 0 ? pos : -1;
}

/**
 * Extract the object body (content between outer braces) of a named story export.
 * e.g. for `export const Mode: ButtonStory = { args: {...}, render: ... };`
 * returns the content between the outer `{` and `}`.
 */
function extractStoryObjectBody(
  storiesContent: string,
  exportName: string,
): string | null {
  const pattern = new RegExp(
    `export\\s+const\\s+${exportName}(?=[^a-zA-Z0-9_])`,
  );
  const match = storiesContent.match(pattern);
  if (!match || match.index === undefined) return null;

  const startIdx = match.index;
  const openBrace = storiesContent.indexOf('{', startIdx);
  if (openBrace === -1 || openBrace - startIdx > 300) return null;

  const endPos = findMatchingClose(storiesContent, openBrace + 1, '{', '}');
  if (endPos === -1) return null;

  return storiesContent.substring(openBrace + 1, endPos - 1);
}

/**
 * Extract the render function's JSX from a story body.
 * Handles:
 * - Parenthesized arrow return: `render: (...) => (JSX)`
 * - Block body with return: `render: (...) => { ... return (JSX); }`
 * - Direct JSX element: `render: () => <Component />`
 */
function extractRenderJsx(
  storyBody: string,
): { jsx: string; hasLogic: boolean } | null {
  const renderIdx = storyBody.indexOf('render:');
  if (renderIdx === -1) return null;

  const arrowIdx = storyBody.indexOf('=>', renderIdx);
  if (arrowIdx === -1 || arrowIdx - renderIdx > 200) return null;

  let pos = arrowIdx + 2;
  while (pos < storyBody.length && /\s/.test(storyBody[pos])) pos++;

  // Case 1: Parenthesized return — render: (args) => ( <JSX /> )
  if (storyBody[pos] === '(') {
    const endPos = findMatchingClose(storyBody, pos + 1, '(', ')');
    if (endPos === -1) return null;
    return {
      jsx: storyBody.substring(pos + 1, endPos - 1).trim(),
      hasLogic: false,
    };
  }

  // Case 2: Block body — render: (args) => { ... return (...); }
  if (storyBody[pos] === '{') {
    const funcEndPos = findMatchingClose(storyBody, pos + 1, '{', '}');
    if (funcEndPos === -1) return null;

    const funcBody = storyBody.substring(pos + 1, funcEndPos - 1);
    const hasLogic = /\b(const|let|var|use\w+|await|if|for|while)\b/.test(
      funcBody,
    );

    // Find parenthesized return
    const returnMatch = funcBody.match(/return\s*\(/);
    if (returnMatch && returnMatch.index !== undefined) {
      const retStart = returnMatch.index + returnMatch[0].length;
      const retEndPos = findMatchingClose(funcBody, retStart, '(', ')');
      if (retEndPos !== -1) {
        if (hasLogic) {
          // Include the full function body — it has meaningful state/hook logic
          return { jsx: funcBody.trim(), hasLogic: true };
        }
        return {
          jsx: funcBody.substring(retStart, retEndPos - 1).trim(),
          hasLogic: false,
        };
      }
    }

    return null;
  }

  // Case 3: Direct JSX — render: () => <Component ... />
  if (storyBody[pos] === '<') {
    // Self-closing
    const selfClose = storyBody.substring(pos).match(/^<\w+[^>]*\/>/);
    if (selfClose) return { jsx: selfClose[0], hasLogic: false };

    // Opening tag — find matching closing tag
    const tagNameMatch = storyBody.substring(pos).match(/^<(\w+)/);
    if (tagNameMatch) {
      const tagName = tagNameMatch[1];
      const closeTag = `</${tagName}>`;
      const closeIdx = storyBody.indexOf(closeTag, pos);
      if (closeIdx !== -1) {
        return {
          jsx: storyBody.substring(pos, closeIdx + closeTag.length).trim(),
          hasLogic: false,
        };
      }
    }
  }

  return null;
}

/**
 * Clean up extracted story JSX for AI consumption.
 * - Removes Storybook-specific `{...args}` / `{...rest}` spreads
 * - Simplifies ternary children expressions
 * - Normalises indentation
 */
function cleanStoryJsx(jsx: string): string {
  let result = jsx;

  // Remove {...args}, {...rest} spreads
  result = result.replace(/\s*\{\.\.\.(?:args|rest)\}\s*/g, ' ');

  // Simplify {children === '' ? 'Text' : children} → Text
  result = result.replace(
    /\{children\s*===\s*''\s*\?\s*'([^']*)'\s*:\s*children\}/g,
    '$1',
  );
  result = result.replace(
    /\{children\s*===\s*""\s*\?\s*"([^"]*)"\s*:\s*children\}/g,
    '$1',
  );

  // Simplify {children || 'Text'} → Text
  result = result.replace(/\{children\s*\|\|\s*'([^']*)'\}/g, '$1');

  // Replace bare {children} with placeholder
  result = result.replace(/\{children\}/g, '...');

  // Clean up double-spacing left by removed spreads
  result = result.replace(/ {2,}/g, ' ');

  // Fix trailing space before > or /> in JSX tags
  result = result.replace(/ >/g, '>');
  result = result.replace(/ \/>/g, ' />');

  // Normalise indentation: strip the common leading whitespace
  const lines = result.split('\n');
  const nonEmptyLines = lines.filter((l) => l.trim().length > 0);
  if (nonEmptyLines.length > 1) {
    const indents = nonEmptyLines
      .map((l) => {
        const m = l.match(/^(\s+)/);
        return m ? m[1].length : 0;
      })
      .filter((n) => n > 0);
    if (indents.length > 0) {
      const minIndent = Math.min(...indents);
      if (minIndent > 0) {
        result = lines
          .map((l) =>
            l.startsWith(' '.repeat(minIndent)) ? l.substring(minIndent) : l,
          )
          .join('\n');
      }
    }
  }

  return result.trim();
}

/**
 * Extract args from a named story export (generalised extractDefaultArgs).
 */
function extractExportArgs(
  storiesContent: string,
  exportName: string,
): Record<string, string> | null {
  const storyBody = extractStoryObjectBody(storiesContent, exportName);
  if (!storyBody) return null;

  const argsIdx = storyBody.indexOf('args:');
  if (argsIdx === -1) return null;

  const openBrace = storyBody.indexOf('{', argsIdx + 5);
  if (openBrace === -1) return null;

  const endPos = findMatchingClose(storyBody, openBrace + 1, '{', '}');
  if (endPos === -1) return null;

  const argsBlock = storyBody.substring(openBrace + 1, endPos - 1);
  const args: Record<string, string> = {};

  // Extract only top-level simple values (skip nested objects/JSX)
  let topLevel = '';
  let nestDepth = 0;
  for (let c = 0; c < argsBlock.length; c++) {
    const ch = argsBlock[c];
    if (ch === '{' || ch === '[' || ch === '<') nestDepth++;
    else if (ch === '}' || ch === ']' || ch === '>') {
      nestDepth--;
      if (nestDepth < 0) nestDepth = 0;
    } else if (nestDepth === 0) {
      topLevel += ch;
    }
  }

  const pairRegex =
    /(\w+)\s*:\s*(?:'([^']*)'|"([^"]*)"|(true|false)|(\d+(?:\.\d+)?))\s*[,\n}]/g;
  let m;
  while ((m = pairRegex.exec(topLevel))) {
    const key = m[1];
    const value = m[2] ?? m[3] ?? m[4] ?? m[5];
    if (value !== undefined && value !== '') {
      args[key] = value;
    }
  }

  return Object.keys(args).length > 0 ? args : null;
}

/**
 * Extract the `component:` name from a stories file's default export meta.
 * Returns the component name as-is (e.g. "IressPanel", "IressText") or null.
 */
function extractMetaComponent(storiesContent: string): string | null {
  const match = storiesContent.match(
    /component:\s*(Iress\w+)/,
  );
  return match?.[1] ?? null;
}

/**
 * Generate a code example for a specific named story export.
 * Tries render-function extraction first, then falls back to args-based generation.
 * Returns null if no useful code can be extracted.
 */
function generateStoryCodeExample(
  storiesContent: string,
  exportName: string,
  componentExportName: string,
): string | null {
  const storyBody = extractStoryObjectBody(storiesContent, exportName);
  if (!storyBody) return null;

  // Try render function JSX extraction
  const renderResult = extractRenderJsx(storyBody);
  if (renderResult) {
    const code = renderResult.hasLogic
      ? renderResult.jsx
      : cleanStoryJsx(renderResult.jsx);
    return code;
  }

  // No render — try args-only approach (use meta component: name if available)
  const args = extractExportArgs(storiesContent, exportName);
  if (args) {
    const metaComponent =
      extractMetaComponent(storiesContent) || componentExportName;
    const children = args.children;
    const otherArgs = { ...args };
    delete otherArgs.children;

    const propFragments: string[] = [];
    for (const [key, value] of Object.entries(otherArgs)) {
      if (value === 'true') propFragments.push(key);
      else if (value === 'false') propFragments.push(`${key}={false}`);
      else if (/^\d+(\.\d+)?$/.test(value))
        propFragments.push(`${key}={${value}}`);
      else propFragments.push(`${key}="${value}"`);
    }
    const propsStr =
      propFragments.length > 0 ? ' ' + propFragments.join(' ') : '';

    if (children) {
      return `<${metaComponent}${propsStr}>\n  ${children}\n</${metaComponent}>`;
    }
    return `<${metaComponent}${propsStr} />`;
  }

  return null;
}

/**
 * Load stories file content for all imported story modules in a doc file.
 * Returns a map from module variable name → file content.
 */
function loadStoriesContentMap(
  docContent: string,
  docFilePath: string,
): Map<string, string> {
  const map = new Map<string, string>();
  const importRegex =
    /import\s+\*\s+as\s+(\w+)\s+from\s+['"]([^'"]+\.stories[^'"]*)['"];?/g;

  let match;
  while ((match = importRegex.exec(docContent))) {
    const moduleName = match[1];
    const importPath = match[2];
    const docDir = path.dirname(docFilePath);
    let resolvedPath = path.resolve(docDir, importPath);

    if (!resolvedPath.endsWith('.tsx') && !resolvedPath.endsWith('.ts')) {
      if (existsSync(resolvedPath + '.tsx')) resolvedPath += '.tsx';
      else if (existsSync(resolvedPath + '.ts')) resolvedPath += '.ts';
    }

    if (existsSync(resolvedPath)) {
      map.set(moduleName, readFileSync(resolvedPath, 'utf-8'));
    }
  }

  return map;
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
 * Get the name of the first exported story const (excluding `default` and meta-like exports).
 */
function getFirstStoryExportName(storiesContent: string): string | null {
  const match = storiesContent.match(
    /export\s+const\s+([A-Z]\w*)(?:\s*:|[^a-zA-Z0-9_])/,
  );
  return match ? match[1] : null;
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

// ─── TestId Table Resolution ─────────────────────────────────

interface TestIdEntry {
  suffix: string;
  description: string;
}

/**
 * Load the `testIds` export from a component's meta/index.tsx via dynamic import.
 * Works because `import type` is erased at compile time, so no path alias resolution is needed.
 */
async function loadTestIdsFromMeta(
  metaPath: string,
): Promise<TestIdEntry[] | null> {
  if (!existsSync(metaPath)) return null;

  try {
    const mod = await import(pathToFileURL(metaPath).href);
    const testIds = mod.testIds as TestIdEntry[] | undefined;
    return testIds?.length ? testIds : null;
  } catch (error) {
    console.warn(
      `  ⚠ Failed to load testIds from ${metaPath}: ${error instanceof Error ? error.message : error}`,
    );
    return null;
  }
}

/**
 * Convert a TestIdEntry array to a markdown table.
 */
function testIdsToMarkdownTable(
  entries: TestIdEntry[],
  prefix?: string,
): string {
  const hasPrefix = !!prefix;
  const header = hasPrefix
    ? '| Suffix | Example | Description |'
    : '| Suffix | Description |';
  const separator = hasPrefix ? '| --- | --- | --- |' : '| --- | --- |';
  const rows = entries.map((e) =>
    hasPrefix
      ? `| \`${e.suffix}\` | \`${prefix}__${e.suffix}\` | ${e.description} |`
      : `| \`${e.suffix}\` | ${e.description} |`,
  );
  return [header, separator, ...rows].join('\n');
}

/**
 * Replace <TestIdTable testIds={testIds} testIdPrefix="..." /> with a markdown table.
 * Reads testIds from the component's meta/index.tsx via dynamic import.
 */
async function resolveTestIdTables(
  content: string,
  docFilePath: string,
): Promise<string> {
  const regex =
    /<TestIdTable\s+testIds=\{testIds\}\s+testIdPrefix="([^"]+)"\s*\/>/g;
  const matches = [...content.matchAll(regex)];
  if (matches.length === 0) return content;

  const metaPath = path.join(path.dirname(docFilePath), 'meta', 'index.tsx');
  const entries = await loadTestIdsFromMeta(metaPath);

  let result = content;
  for (const match of matches) {
    const prefix = match[1];
    const replacement = entries
      ? testIdsToMarkdownTable(entries, prefix)
      : '*No test IDs documented.*';
    result = result.replace(match[0], replacement);
  }

  return result;
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
 * Remove all import statements (single-line and multi-line) outside code fences.
 */
function removeImportsOutsideCodeFences(content: string): string {
  const lines = content.split('\n');
  const result: string[] = [];
  let inCodeFence = false;
  let inImport = false;

  for (const line of lines) {
    const trimmed = line.trim();

    if (trimmed.startsWith('```')) {
      inCodeFence = !inCodeFence;
      result.push(line);
      continue;
    }

    if (inCodeFence) {
      result.push(line);
      continue;
    }

    // Currently consuming a multi-line import — skip until we see the `from '...'` line
    if (inImport) {
      if (/from\s+['"][^'"]+['"];?\s*$/.test(trimmed)) {
        inImport = false; // end of multi-line import
      }
      continue;
    }

    // Single-line import: import { X } from '...' or import X from '...' or import * as X from '...'
    // Also handles: import type { X } from '...'
    if (/^import\s+.+from\s+['"][^'"]+['"];?\s*$/.test(trimmed)) {
      continue;
    }

    // Side-effect import: import '...' or import "..."
    if (/^import\s+['"][^'"]+['"];?\s*$/.test(trimmed)) {
      continue;
    }

    // Start of a multi-line import (with or without `type`): import { / import type {
    if (/^import\s+(?:type\s+)?\{/.test(trimmed) && !/from\s+['"]/.test(trimmed)) {
      inImport = true;
      continue;
    }

    result.push(line);
  }

  return result.join('\n');
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

// ─── Styling Props Reference Table Generation ───────────────

import { stylingPropsReference } from '../packages/components/docs/StylingProps/stylingPropsReference.js';

/**
 * Generate a markdown table from the styling props reference data.
 * Imports data directly from the shared source file
 * (`packages/components/docs/StylingProps/stylingPropsReference.ts`)
 * so the AI documentation always matches the Storybook table.
 */
function generateStylingPropsReferenceTable(): string {
  const header = '| JSX Prop | CSS Property | Token Mapping | Responsive |';
  const separator = '| --- | --- | --- | --- |';
  const rows = stylingPropsReference.map((entry) => {
    const tokenMapping = Array.isArray(entry.tokenMapping)
      ? entry.tokenMapping.join(', ')
      : entry.tokenMapping;
    const responsive = entry.responsive ? '✓' : '';
    return `| \`${entry.jsxProp}\` | ${entry.cssProperty} | ${tokenMapping} | ${responsive} |`;
  });

  return [header, separator, ...rows].join('\n');
}

/**
 * Transform raw Storybook MDX content to clean AI-consumable markdown.
 */
async function transformContent(doc: DocFile): Promise<{
  output: string;
  title: string;
  description: string;
  warnings: string[];
}> {
  const warnings: string[] = [];
  const { content, componentName, category } = doc;
  const categoryPrefix =
    category === 'guide'
      ? doc.guideSection || 'foundations'
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

  // Pre-load stories files so we can extract code examples inline
  const storiesContentMap = loadStoriesContentMap(content, doc.filePath);

  // Store extracted code blocks behind placeholders so that later JSX-transformation
  // steps (IressAlert→callout, IressExpander→details, IressButton→link) don't
  // modify content that should stay as-is inside code fences.
  const deferredCodeBlocks: string[] = [];

  let result = content;

  // 1. Remove all import statements (only outside code fences)
  result = removeImportsOutsideCodeFences(result);

  // 2. Remove <Meta of={...} /> and <Meta title="..." />
  result = result.replace(/<Meta\s+of=\{[^}]+\}\s*\/>\s*\n?/g, '');
  result = result.replace(/<Meta\s+title="[^"]*"\s*\/>\s*\n?/g, '');

  // 2b. Resolve <TestIdTable> to markdown tables before other JSX transforms
  result = await resolveTestIdTables(result, doc.filePath);

  // 3. Remove <ComponentOverview>
  result = removeComponentOverview(result);

  // 4. Convert <ComponentExample of={ModuleName.ExportName} /> to code examples + Storybook links
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
      const link = `[View "${exportName}" example in Storybook →](${url})`;

      // Try to extract inline code example from the stories file
      const storiesContent = storiesContentMap.get(moduleName);
      if (storiesContent) {
        const componentExport = `Iress${storyComponentName}`;
        const code = generateStoryCodeExample(
          storiesContent,
          exportName,
          componentExport,
        );
        if (code) {
          const idx = deferredCodeBlocks.length;
          deferredCodeBlocks.push(code);
          return `%%STORY_CODE_${idx}%%\n\n${link}`;
        }
      }

      return link;
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

  // 7. Convert <Story of={...} /> to code examples + Storybook links
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
      const link = `[View "${exportName}" example in Storybook →](${url})`;

      // Try to extract inline code example from the stories file
      const storiesContent = storiesContentMap.get(moduleName);
      if (storiesContent) {
        const componentExport = `Iress${storyComponentName}`;
        const code = generateStoryCodeExample(
          storiesContent,
          exportName,
          componentExport,
        );
        if (code) {
          const idx = deferredCodeBlocks.length;
          deferredCodeBlocks.push(code);
          return `%%STORY_CODE_${idx}%%\n\n${link}`;
        }
      }

      return link;
    },
  );

  // 8. Remove remaining <Story> tags
  result = result.replace(/<Story[\s\S]*?\/>\s*\n?/g, '');

  // 9. Protect existing code fences from JSX transforms (IressAlert, IressExpander, IressButton)
  const protectedCodeBlocks: string[] = [];
  result = result.replace(/```[\s\S]*?```/g, (block) => {
    const idx = protectedCodeBlocks.length;
    protectedCodeBlocks.push(block);
    return `%%PROTECTED_CODE_${idx}%%`;
  });

  // 9b. Convert <IressAlert> to blockquote callouts
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
  result = replaceOutsideCodeFences(
    result,
    /<>\{[^}]+\}<\/>/g,
    '(see Storybook)',
  );

  // 12. Convert <IressButton href="...">text</IressButton> to markdown links
  result = result.replace(
    /<IressButton\s+href="([^"]+)"[^>]*>\s*([\s\S]*?)\s*<\/IressButton>/g,
    (_match, href, text) => `[${text.trim()}](${href})`,
  );

  // 12b. Restore protected code fences (after all JSX transforms are done)
  for (let i = 0; i < protectedCodeBlocks.length; i++) {
    result = result.replace(`%%PROTECTED_CODE_${i}%%`, protectedCodeBlocks[i]);
  }

  // 13. Wrap bare Iress JSX outside code fences in code blocks
  result = wrapBareJsxInCodeFences(result);

  // 14. Remove orphaned closing tags outside code fences
  result = replaceOutsideCodeFences(result, /^<\/Iress\w+>;\s*$/gm, '');
  result = replaceOutsideCodeFences(result, /^<\/Iress\w+>\s*$/gm, '');

  // 15. Fix nested code fences
  result = result.replace(/```tsx\s*\n\s*```tsx/g, '```tsx');

  // 16. Convert Storybook internal doc links to full Storybook URLs
  // Handles all /?path=/docs/... and ?path=/docs/... link forms (components,
  // patterns, foundations, styling-props, resources, tokens, etc.) and adds
  // the composition ref prefix when the slug doesn't already carry one.
  const resolveStorybookDocLink = (slug: string): string => {
    // Slugs that already contain a composition ref prefix (word_) keep it as-is
    const prefixedSlug = /^\w+_/.test(slug)
      ? slug
      : `${STORYBOOK_REF_PREFIX}${slug}`;
    return `${STORYBOOK_URL}/?path=/docs/${prefixedSlug}`;
  };

  // Markdown-style links: [text](/?path=/docs/slug) or [text](?path=/docs/slug)
  result = result.replace(
    /\(\/?\?path=\/docs\/([^)#\s]+)(#[^)\s]*)?\)/g,
    (_match, slug, fragment) =>
      `(${resolveStorybookDocLink(slug)}${fragment || ''})`,
  );

  // HTML href attributes: href="/?path=/docs/slug" or href="?path=/docs/slug"
  result = result.replace(
    /href="\/?\?path=\/docs\/([^"#\s]+)(#[^"\s]*)?"/g,
    (_match, slug, fragment) =>
      `href="${resolveStorybookDocLink(slug)}${fragment || ''}"`,
  );

  // 17. (handled by step 1)

  // 18. Restore deferred story code blocks (protected from JSX transformations above)
  for (let i = 0; i < deferredCodeBlocks.length; i++) {
    result = result.replace(
      `%%STORY_CODE_${i}%%`,
      `\`\`\`tsx\n${deferredCodeBlocks[i]}\n\`\`\``,
    );
  }

  // 19. Clean up excessive blank lines
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
      if (
        !isRecipe &&
        isComponentDeprecated(path.dirname(fullPath), componentName)
      ) {
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
  [
    'Foundations',
    '050-VisualDesign.mdx',
    'foundations',
    'visual-design-standards',
  ],
  [
    'Foundations',
    '060-Consistency.mdx',
    'foundations',
    'using-components-consistently',
  ],
  ['Foundations', '070-Content.mdx', 'foundations', 'content'],
  ['Foundations', '080-UserExperience.mdx', 'foundations', 'user-experience'],
  ['Foundations', '090-CommonMistakes.mdx', 'foundations', 'common-mistakes'],
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
  [
    'GetStarted',
    '030-ContentSecurityPolicy.mdx',
    'get-started',
    'content-security-policy',
  ],
  // Resources — Migration
  [
    'Resources/030-MigrationGuides',
    'v5.mdx',
    'resources-migration-guides',
    'migration-from-v4-to-v5',
  ],
  [
    'Resources/030-MigrationGuides',
    'v6.mdx',
    'resources-migration-guides',
    'from-v5-to-v6',
  ],
  [
    'Resources/030-MigrationGuides',
    'oui.mdx',
    'resources-migration-guides',
    'from-oui-to-v6',
  ],
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

  let body = transformed;

  // ── Styling Props Reference: inject the full table ──
  // The translator converts <ComponentExample of={ComponentStories.Reference} />
  // to a Storybook link. For the styling-props-reference guide, we insert a
  // complete markdown table so AI consumers can read all props without loading
  // Storybook.
  if (doc.slug === 'styling-props-reference') {
    const referenceStoryLink =
      /\[View "Reference" example in Storybook →\]\([^)]+\)/;
    const table = generateStylingPropsReferenceTable();
    body = body.replace(referenceStoryLink, (link) => `${table}\n\n${link}`);
  }

  let output = '';
  output += `# ${title}\n\n`;
  // Description is already the first paragraph in the body — don't duplicate it
  output += `> **Guide:** \`@iress-oss/ids-components\`\n`;
  output += `> **Storybook:** [${title} in Storybook](${storybookUrl})\n\n`;
  output += body;
  output += '\n\n---\n\n';
  output += `*View in Storybook: [${storybookUrl}](${storybookUrl})*\n`;

  return output;
}

// ─── Guidelines Output (MDX with meta export) ───────────────

/**
 * Build MDX output for the guidelines site.
 * Exports a `meta` object for the router and renders clean markdown content.
 */
function buildGuidelinesComponentOutput(
  doc: DocFile,
  transformed: string,
  title: string,
  description: string,
  componentExportName: string | null,
  codeExample: string | null,
): string {
  const storybookPath =
    doc.category === 'component' ? 'components' : 'patterns';
  const storybookUrl = `${STORYBOOK_URL}/?path=/docs/${STORYBOOK_REF_PREFIX}${storybookPath}-${toKebab(doc.componentName)}--docs`;

  let output = '';

  // Meta export for the router
  output += `export const meta = {\n`;
  output += `  title: '${title.replace(/'/g, "\\'")}',\n`;
  output += `  description: '${description.replace(/'/g, "\\'")}',\n`;
  if (componentExportName) {
    output += `  component: '${componentExportName}',\n`;
  }
  output += `  storybookUrl: '${storybookUrl}',\n`;
  output += `};\n\n`;

  // Content
  output += `# ${title}\n\n`;
  output += `${description}\n\n`;

  if (componentExportName) {
    output += `\`\`\`tsx\nimport { ${componentExportName} } from '@iress-oss/ids-components';\n\`\`\`\n\n`;
  }

  if (codeExample) {
    output += `## Quick Start\n\n${codeExample}\n\n`;
  }

  output += transformed;
  output += `\n\n---\n\n`;
  output += `[View in Storybook →](${storybookUrl})\n`;

  return output;
}

function buildGuidelinesGuideOutput(
  doc: DocFile,
  transformed: string,
  title: string,
  description: string,
): string {
  const storybookUrl = `${STORYBOOK_URL}/?path=/docs/${STORYBOOK_REF_PREFIX}${doc.guideSection}-${doc.guideSbSlug}--docs`;

  let output = '';

  output += `export const meta = {\n`;
  output += `  title: '${title.replace(/'/g, "\\'")}',\n`;
  output += `  description: '${description.replace(/'/g, "\\'")}',\n`;
  output += `  category: 'guide',\n`;
  output += `  storybookUrl: '${storybookUrl}',\n`;
  output += `};\n\n`;

  output += `# ${title}\n\n`;
  output += transformed;
  output += `\n\n---\n\n`;
  output += `[View in Storybook →](${storybookUrl})\n`;

  return output;
}

// ─── Manifest Generation ─────────────────────────────────────

interface ManifestEntry {
  name: string;
  description: string;
  path: string;
  category: string;
  storybookUrl: string;
  propsType?: string;
  typeDeclPath?: string;
  /** For guides: which section this belongs to (e.g. 'foundations', 'styling-props') */
  guideSection?: string;
}

function generateManifest(translatedDocs: TranslatedDoc[]): object {
  const components: ManifestEntry[] = [];
  const patterns: ManifestEntry[] = [];
  const guides: ManifestEntry[] = [];

  for (const doc of translatedDocs) {
    if (doc.category === 'guide') {
      guides.push({
        name: doc.title,
        description: doc.description,
        path: `guides/${doc.slug}.md`,
        category: 'guide',
        storybookUrl: `${STORYBOOK_URL}/?path=/docs/${STORYBOOK_REF_PREFIX}${doc.guideSection}-${doc.guideSbSlug}--docs`,
        guideSection: doc.guideSection,
      });
      continue;
    }

    const storybookPath =
      doc.category === 'component' ? 'components' : 'patterns';
    const entry: ManifestEntry = {
      name: doc.title,
      description: doc.description,
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
      const { output, title, description, warnings } = await transformContent(doc);

      for (const w of warnings) {
        allWarnings.push(`${doc.slug}: ${w}`);
      }

      let finalOutput: string;
      let propsType: string | undefined;
      let componentSourceFile: string | undefined;
      let componentExportName: string | null = null;
      let codeExample: string | null = null;

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

        // Derive component export name (only if a real component file exists)
        const componentFile = path.join(
          path.dirname(doc.filePath),
          `${doc.componentName}.tsx`,
        );
        if (!doc.isRecipe && existsSync(componentFile)) {
          componentExportName = `Iress${doc.componentName}`;
        } else if (!doc.isRecipe) {
          // No component file — check stories meta for the actual component
          const storiesFile = findStoriesFile(doc.filePath, doc.componentName);
          if (storiesFile) {
            const storiesContent = readFileSync(storiesFile, 'utf-8');
            componentExportName = extractMetaComponent(storiesContent);
          } else {
            componentExportName = null;
          }
        } else {
          componentExportName = null;
        }

        // Extract code example from stories Default export (or first story as fallback)
        if (!doc.isRecipe) {
          const storiesFile = findStoriesFile(doc.filePath, doc.componentName);
          if (storiesFile) {
            const storiesContent = readFileSync(storiesFile, 'utf-8');
            const storyName = hasDefaultExport(storiesContent)
              ? 'Default'
              : getFirstStoryExportName(storiesContent);

            if (storyName && componentExportName) {
              const args = extractExportArgs(storiesContent, storyName);
              if (args) {
                codeExample = generateUsageExample(componentExportName, args);
              } else {
                codeExample = generateMinimalUsageExample(componentExportName);
              }
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

      // AI target
      if (TARGETS.includes('ai')) {
        const outputPath = path.join(OUTPUT_DIR_AI, outputSubDir, `${doc.slug}.md`);
        if (!DRY_RUN) {
          await fs.mkdir(path.dirname(outputPath), { recursive: true });
          await fs.writeFile(outputPath, finalOutput, 'utf-8');
        }
        console.log(`  ✓ [ai] ${title} → ${path.relative(process.cwd(), outputPath)}`);
      }

      // Guidelines target
      if (TARGETS.includes('guidelines')) {
        const guidelinesOutput = doc.category === 'guide'
          ? buildGuidelinesGuideOutput(doc, output, title, description)
          : buildGuidelinesComponentOutput(
              doc,
              output,
              title,
              description,
              componentExportName,
              codeExample,
            );
        const guidelinesBase = path.join(ROOT, 'apps/guidelines/content');
        let guidelinesSubDir: string;
        let guidelinesSlug: string;
        if (doc.category === 'guide') {
          guidelinesSubDir = doc.guideSection ?? 'guides';
          guidelinesSlug = doc.guideSbSlug ?? doc.slug;
        } else if (doc.category === 'pattern') {
          guidelinesSubDir = 'patterns';
          guidelinesSlug = doc.slug;
        } else {
          guidelinesSubDir = 'components';
          guidelinesSlug = doc.slug;
        }
        const guidelinesPath = path.join(guidelinesBase, guidelinesSubDir, `${guidelinesSlug}.mdx`);

        // Skip known broken MDX files (orphan closing tags from translate pipeline)
        const GUIDELINES_SKIP = ['card', 'select', 'loading'];
        if (GUIDELINES_SKIP.includes(guidelinesSlug)) {
          console.log(`  ⊘ [guidelines] ${title} — skipped (known MDX issue)`);
        } else if (!DRY_RUN) {
          await fs.mkdir(path.dirname(guidelinesPath), { recursive: true });
          await fs.writeFile(guidelinesPath, guidelinesOutput, 'utf-8');
          console.log(`  ✓ [guidelines] ${title} → ${path.relative(process.cwd(), guidelinesPath)}`);
        }
      }

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

  // Generate manifest (AI target only)
  if (!DRY_RUN && TARGETS.includes('ai')) {
    const manifest = generateManifest(translatedDocs);
    const manifestPath = path.join(OUTPUT_DIR_AI, 'index.json');
    await fs.mkdir(OUTPUT_DIR_AI, { recursive: true });
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

  // Generate concatenated reference files for Gemini Gem knowledge upload
  if (!DRY_RUN && TARGETS.includes('ai')) {
    const refParts: string[] = [];
    const dirs = ['components', 'patterns', 'guides', 'skills'];
    for (const dir of dirs) {
      const dirPath = path.join(OUTPUT_DIR_AI, dir);
      if (!existsSync(dirPath)) continue;
      const files = (await fs.readdir(dirPath)).filter((f) => f.endsWith('.md')).sort();
      for (const file of files) {
        refParts.push(await fs.readFile(path.join(dirPath, file), 'utf-8'));
      }
    }
    const refPath = path.join(ROOT, '.ai', 'IDS-FULL-REFERENCE.md');
    await fs.mkdir(path.join(ROOT, '.ai'), { recursive: true });
    await fs.writeFile(refPath, refParts.join('\n\n---\n\n'), 'utf-8');
    console.log(`\n  ✓ Full reference → ${path.relative(process.cwd(), refPath)} (${Math.round(refParts.join('').length / 1024)}KB)`);
  }

  if (errors > 0) {
    process.exit(1);
  }
}

main().catch(console.error);
