/**
 * Resolves <StoryEmbed id="..."/> markers in markdown to inline code examples.
 *
 * Resolution chain:
 * 1. Parse story ID (e.g. "components-alert--status")
 * 2. Find the stories file
 * 3. Find the story export matching the slug
 * 4. If it has withSource(...Source, ...) -> find the ?raw import -> read the mock file
 * 5. Transform @/main imports and inline as fenced code block
 */

import { readFileSync, readdirSync, existsSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { transformImports } from './transform-imports';
import { getPlugin, getOverridePlugin } from '../plugins';

const ROOT = join(import.meta.dirname, '../../..');
const COMPONENTS_SRC = join(ROOT, 'packages/components/src');

/** Args that are render-plumbing, not real component props — excluded from P1 output */
const RENDER_HELPER_ARGS = new Set([
  'input', 'inputs', 'row', 'numberOfColumns', 'columnProps',
  'stylingProps',
]);

interface ResolvedStory {
  code: string;
  name: string;
}

function findStoriesFile(storyId: string): string | null {
  const parts = storyId.split('--');
  const prefix = parts[0];

  // Map prefix to directory and component name
  // "components-alert" -> components/Alert
  // "patterns-form" -> patterns/Form
  // "styling-props-layout" -> styling-props (flat, numbered files)
  // "components-button-closebutton" -> components/Button/CloseButton

  const searchDirs: Array<{ dir: string; prefix: string }> = [
    { dir: join(COMPONENTS_SRC, 'components'), prefix: 'components-' },
    { dir: join(COMPONENTS_SRC, 'patterns'), prefix: 'patterns-' },
    { dir: join(COMPONENTS_SRC, 'styling-props'), prefix: 'styling-props-' },
  ];

  // Foundations stories live in a single file at src root
  if (prefix === 'foundations') {
    const foundationsFile = join(COMPONENTS_SRC, 'Foundation.stories.tsx');
    return existsSync(foundationsFile) ? foundationsFile : null;
  }

  for (const { dir, prefix: dirPrefix } of searchDirs) {
    if (!prefix.startsWith(dirPrefix)) continue;
    if (!existsSync(dir)) continue;

    const slug = prefix.slice(dirPrefix.length); // e.g. "alert", "button-closebutton", "layout"

    // For styling-props, files are flat with number prefixes (e.g. 035-Layout.stories.tsx)
    if (dirPrefix === 'styling-props-') {
      const files = readdirSync(dir).filter((f) => f.endsWith('.stories.tsx'));
      const match = files.find((f) => f.toLowerCase().includes(slug));
      return match ? join(dir, match) : null;
    }

    // For components/patterns, find matching directory
    for (const entry of readdirSync(dir)) {
      const entryPath = join(dir, entry);
      if (!statSync(entryPath).isDirectory()) continue;

      // Storybook generates IDs by lowercasing the title segment without hyphens
      // Components/ButtonGroup -> components-buttongroup
      const lowered = entry.toLowerCase(); // "buttongroup"
      const kebab = entry.replace(/([A-Z])/g, (_, c, i) => (i > 0 ? '-' : '') + c.toLowerCase()); // "button-group"

      if (slug === lowered || slug === kebab || slug.startsWith(lowered + '-') || slug.startsWith(kebab + '-')) {
        // Might be a sub-component: "button-closebutton" -> Button/CloseButton/
        const matchedPrefix = slug === lowered ? lowered : (slug === kebab ? kebab : (slug.startsWith(lowered + '-') ? lowered : kebab));
        if (slug !== matchedPrefix && (slug.startsWith(lowered + '-') || slug.startsWith(kebab + '-'))) {
          const subSlug = slug.startsWith(lowered + '-') ? slug.slice(lowered.length + 1) : slug.slice(kebab.length + 1);
          // Look in subdirectories
          for (const sub of readdirSync(entryPath)) {
            const subPath = join(entryPath, sub);
            if (!statSync(subPath).isDirectory()) continue;
            const subLowered = sub.toLowerCase();
            if (subLowered === subSlug || subLowered.endsWith(subSlug.replace(/-/g, ''))) {
              const files = readdirSync(subPath).filter((f: string) => f.endsWith('.stories.tsx'));
              if (files.length > 0) return join(subPath, files[0]);
            }
          }
          // Also check for a stories file named after the sub-component in the parent dir
          // e.g. Modal/ModalProvider.stories.tsx for "modal-modalprovider"
          const subFile = readdirSync(entryPath).find(
            (f) => f.endsWith('.stories.tsx') && f.toLowerCase().includes(subSlug),
          );
          if (subFile) return join(entryPath, subFile);
        }

        const files = readdirSync(entryPath).filter((f: string) => f.endsWith('.stories.tsx'));
        if (files.length > 0) return join(entryPath, files[0]);
      }
    }
  }

  return null;
}

function resolveStoryToCode(storiesFile: string, storySlug: string): ResolvedStory | null {
  const source = readFileSync(storiesFile, 'utf-8');
  const storiesDir = dirname(storiesFile);

  // Convert slug to PascalCase export name
  const exportName = storySlug
    .split('-')
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join('');

  // Find the story export (try exact PascalCase, then case-insensitive)
  let storyRegex = new RegExp(`export const ${exportName}[^=]*=\\s*\\{([\\s\\S]*?)\\n?\\};`, 'm');
  let storyMatch = source.match(storyRegex);
  if (!storyMatch) {
    // Fallback: case-insensitive search for the export name
    const ciRegex = new RegExp(`export const (${exportName})[^=]*=\\s*\\{([\\s\\S]*?)\\n?\\};`, 'mi');
    const ciMatch = source.match(ciRegex);
    if (ciMatch) {
      storyMatch = [ciMatch[0], ciMatch[2]];
    } else {
      return null;
    }
  }

  const storyBody = storyMatch[1];

  // P2: withSource(XxxSource, ...) -> follow ?raw import -> read mock
  const sourceVarMatch = storyBody.match(/withSource\((\w+Source)/);
  if (sourceVarMatch) {
    const sourceVar = sourceVarMatch[1];
    const rawImportRegex = new RegExp(`import\\s+${sourceVar}\\s+from\\s+['"]([^'"]+)\\?raw['"]`);
    const rawImportMatch = source.match(rawImportRegex);
    if (rawImportMatch) {
      const mockPath = join(storiesDir, rawImportMatch[1]);
      if (existsSync(mockPath)) {
        let mockSource = readFileSync(mockPath, 'utf-8');
        mockSource = transformImports(mockSource);
        return { code: mockSource, name: exportName };
      }
    }
  }

  // P2 fallback: render uses a mock component (imported from ./mocks/)
  const mockRenderMatch = storyBody.match(/render:\s*\(?[^)]*\)?\s*=>\s*<(\w+)/);
  if (mockRenderMatch) {
    const mockName = mockRenderMatch[1];
    const mockImportRegex = new RegExp(`import\\s*\\{[^}]*\\b${mockName}\\b[^}]*\\}\\s*from\\s+['"](\\.\/mocks\/[^'"]+)['"]`);
    const mockImportMatch = source.match(mockImportRegex);
    if (mockImportMatch) {
      const mockPath = join(storiesDir, mockImportMatch[1] + '.tsx');
      if (existsSync(mockPath)) {
        let mockSource = readFileSync(mockPath, 'utf-8');
        mockSource = transformImports(mockSource);
        return { code: mockSource, name: exportName };
      }
    }
  }

  // P1: Args-only (no render function) — extract raw args and format as JSX
  if (!storyBody.includes('render:') || storyBody.includes('render: undefined')) {
    const componentMatch = source.match(/component:\s*(\w+)/);
    const componentName = componentMatch?.[1] ?? 'Component';

    // Extract the full args block using brace-matching
    const argsRaw = extractArgsBlock(storyBody);
    if (!argsRaw) {
      // Empty story (no args) — just render the component
      return { code: `<${componentName} />`, name: exportName };
    }

    // Convert args object to JSX props, excluding known render-helper args
    const jsx = argsToJsx(componentName, argsRaw, RENDER_HELPER_ARGS);
    if (jsx) return { code: jsx, name: exportName };
    return { code: `<${componentName} />`, name: exportName };
  }

  // P3: Inline render — resolve {...args} and strip destructured arg spreads
  // Extract destructured param names from render signature (e.g. { messages, ...args })
  const renderSig = storyBody.match(/render:\s*\(\s*\{?\s*([^)]*)\}\s*\)/)?.[1] ?? '';
  const destructuredParams = new Set(
    renderSig.split(',').map((p) => p.trim().replace(/^\.\.\./, '').split(/[=:]/)[0].trim()).filter(Boolean),
  );

  const multiLineRender = storyBody.match(/render:\s*\([^)]*\)\s*=>\s*\(\s*\n([\s\S]*?)\n\s*\)/);
  if (multiLineRender) {
    let jsx = multiLineRender[1].trim();
    jsx = inlineArgsIntoJsx(jsx, storyBody, source, destructuredParams);
    return { code: jsx, name: exportName };
  }

  const singleLineRender = storyBody.match(/render:\s*\([^)]*\)\s*=>\s*(<.+)/);
  if (singleLineRender) {
    let jsx = singleLineRender[1].trim().replace(/,\s*$/, '');
    jsx = inlineArgsIntoJsx(jsx, storyBody, source, destructuredParams);
    return { code: jsx, name: exportName };
  }

  // P3: Block-body render — extract return (...) JSX
  const blockRender = storyBody.match(/render:\s*\([^)]*\)\s*=>\s*\{[\s\S]*?return\s*\(\s*\n([\s\S]*?)\n\s*\);\s*\n\s*\}/);
  if (blockRender) {
    let jsx = blockRender[1].trim();
    jsx = inlineArgsIntoJsx(jsx, storyBody, source, destructuredParams);
    return { code: jsx, name: exportName };
  }

  return null;
}

/**
 * Resolves all args for a story, following spread references recursively.
 */
function resolveArgs(storyBody: string, fullSource: string): Record<string, string> {
  const result: Record<string, string> = {};

  // Follow ...OtherStory.args spreads
  const spreads = storyBody.match(/\.\.\.(\w+)\.args/g) ?? [];
  for (const spread of spreads) {
    const refName = spread.match(/\.\.\.(\w+)\.args/)?.[1];
    if (!refName) continue;
    const refRegex = new RegExp(`export const ${refName}[^=]*=\\s*\\{([\\s\\S]*?)\\n\\};`, 'm');
    const refMatch = fullSource.match(refRegex);
    if (refMatch) {
      // Recursively resolve the referenced story's args
      const refArgs = resolveArgs(refMatch[1], fullSource);
      Object.assign(result, refArgs);
    }
  }

  // Parse this story's own args
  const argsMatch = storyBody.match(/args:\s*\{([^}]*)\}/s);
  if (argsMatch) {
    parseArgs(argsMatch[1], result);
  }

  return result;
}

/**
 * Replaces {...args} in JSX with resolved prop attributes from the story's args block.
 * Also removes {args.X ? ...} ternaries and replaces {args.propName} references.
 */
function inlineArgsIntoJsx(jsx: string, storyBody: string, _fullSource: string, excludeParams?: Set<string>): string {
  if (!jsx.includes('{...args}') && !jsx.includes('{...') && !jsx.includes('{args.')) return jsx;

  // Extract args from the story body
  const argsRaw = extractArgsBlock(storyBody);
  if (!argsRaw) {
    // No args block — just strip spreads
    return jsx.replace(/\s*\{\.\.\.\w+\}/g, '');
  }

  // Parse args into key-value pairs (raw source values)
  const argPairs: Array<[string, string]> = [];
  let i = 0;
  while (i < argsRaw.length) {
    while (i < argsRaw.length && /[\s,]/.test(argsRaw[i])) i++;
    if (i >= argsRaw.length) break;
    if (argsRaw.slice(i).startsWith('...')) {
      const end = argsRaw.indexOf(',', i);
      i = end === -1 ? argsRaw.length : end + 1;
      continue;
    }
    const keyMatch = argsRaw.slice(i).match(/^(\w+)\s*:\s*/);
    if (!keyMatch) break;
    const key = keyMatch[1];
    i += keyMatch[0].length;
    const valueStart = i;
    i = findValueEnd(argsRaw, i);
    const value = argsRaw.slice(valueStart, i).trim();
    // Skip render-helper args and destructured render params
    if (!RENDER_HELPER_ARGS.has(key) && !excludeParams?.has(key)) {
      argPairs.push([key, value]);
    }
  }

  // Build props string from args
  const propsStr = argPairs
    .filter(([k]) => k !== 'children')
    .map(([k, v]) => {
      if (v === 'true') return k;
      if (v === 'false') return `${k}={false}`;
      if (/^['"].*['"]$/.test(v)) return `${k}=${v.replace(/^'|'$/g, '"')}`;
      return `${k}={${v}}`;
    })
    .join(' ');

  // Replace {...args} with inlined props, strip destructured param spreads, keep others
  jsx = jsx.replace(/\s*\{\.\.\.\w+\}/g, (match) => {
    if (match.includes('{...args}')) return propsStr ? ' ' + propsStr : '';
    // Strip spreads of destructured render params (e.g. {...row}, {...column})
    const varName = match.match(/\{\.\.\.(\w+)\}/)?.[1];
    if (varName && excludeParams?.has(varName)) return '';
    return match; // Keep other spreads (e.g. {...controlledProps})
  });

  // Replace {args.propName} with the value
  const argMap = new Map(argPairs);
  jsx = jsx.replace(/\{args\.(\w+)\}/g, (_, prop) => {
    let val = argMap.get(prop);
    if (!val) return '';
    if (/^['"].*['"]$/.test(val)) return val.replace(/^['"]|['"]$/g, '');
    // Unwrap parenthesized fragments: (\n<>...</>)\n → the inner content
    if (val.startsWith('(')) {
      val = val.slice(1, -1).trim();
      // Strip fragment wrapper <> ... </>
      if (val.startsWith('<>')) {
        val = val.slice(2, val.lastIndexOf('</>')).trim();
        return val;
      }
      if (val.startsWith('<')) return val;
    }
    return `{${val}}`;
  });

  // Remove {args.X ? ... : ...} ternaries
  jsx = jsx.replace(/\s*\{args\.\w+\s*\?[\s\S]*?\}\s*/g, '');

  return jsx;
}

function parseArgs(argsStr: string, out: Record<string, string>) {
  for (const line of argsStr.split('\n')) {
    const match = line.trim().match(/^(\w+):\s*['"]([^'"]*)['"]/);
    if (match) out[match[1]] = match[2];
  }
}

/**
 * Extracts the raw content of the `args: { ... }` block using brace-matching.
 */
function extractArgsBlock(storyBody: string): string | null {
  const argsIdx = storyBody.indexOf('args:');
  if (argsIdx === -1) return null;

  // Find the opening brace
  const braceStart = storyBody.indexOf('{', argsIdx);
  if (braceStart === -1) return null;

  // Brace-match to find the closing brace
  let depth = 0;
  let inString = false;
  let stringChar = '';
  let inTemplate = false;

  for (let i = braceStart; i < storyBody.length; i++) {
    const ch = storyBody[i];
    const prev = i > 0 ? storyBody[i - 1] : '';

    if (inString) {
      if (ch === stringChar && prev !== '\\') inString = false;
      continue;
    }
    if (inTemplate) {
      if (ch === '`' && prev !== '\\') inTemplate = false;
      continue;
    }

    if (ch === "'" || ch === '"') { inString = true; stringChar = ch; continue; }
    if (ch === '`') { inTemplate = true; continue; }
    if (ch === '{' || ch === '(' || ch === '[') depth++;
    else if (ch === '}' || ch === ')' || ch === ']') {
      depth--;
      if (depth === 0) {
        return storyBody.slice(braceStart + 1, i).trim();
      }
    }
  }
  return null;
}

/**
 * Converts a raw args block into JSX for a component.
 * Parses top-level key: value pairs and renders them as props.
 */
function argsToJsx(componentName: string, argsRaw: string, excludeArgs?: Set<string>): string | null {
  const props: string[] = [];
  let children = '';
  const excludedArgValues: Record<string, string> = {};

  // Parse top-level properties from the args block
  let i = 0;
  while (i < argsRaw.length) {
    // Skip whitespace and commas
    while (i < argsRaw.length && /[\s,]/.test(argsRaw[i])) i++;
    if (i >= argsRaw.length) break;

    // Skip ...Spread.args references
    if (argsRaw.slice(i).startsWith('...')) {
      // Advance past the spread
      const spreadEnd = argsRaw.indexOf(',', i);
      i = spreadEnd === -1 ? argsRaw.length : spreadEnd + 1;
      continue;
    }

    // Match property name
    const keyMatch = argsRaw.slice(i).match(/^(\w+)\s*:\s*/);
    if (!keyMatch) break;

    const key = keyMatch[1];
    i += keyMatch[0].length;

    // Extract the value (handle nested braces, parens, brackets, strings, JSX)
    const valueStart = i;
    i = findValueEnd(argsRaw, i);
    const value = argsRaw.slice(valueStart, i).trim();

    // Skip known render-helper args that aren't real component props
    if (excludeArgs?.has(key)) {
      excludedArgValues[key] = value;
      continue;
    }

    if (key === 'children') {
      children = value;
      // Apply plugin transformation for Storybook control keys
      const plugin = getPlugin(componentName);
      if (plugin?.transformChildren) {
        // Strip quotes to get the raw key for comparison
        const rawKey = value.replace(/^['"]|['"]$/g, '');
        const transformed = plugin.transformChildren(rawKey);
        if (transformed !== rawKey) children = transformed ?? '';
      }
    } else {
      // Format as JSX prop
      if (value === 'true') {
        props.push(key);
      } else if (value === 'false') {
        props.push(`${key}={false}`);
      } else if (/^['"].*['"]$/.test(value)) {
        // String literal — use as attribute value
        props.push(`${key}=${value.replace(/^'|'$/g, '"')}`);
      } else {
        // Expression (array, object, number, variable, JSX)
        props.push(`${key}={${value}}`);
      }
    }
  }

  // Use plugin to generate children from excluded args
  if (!children && Object.keys(excludedArgValues).length > 0) {
    const plugin = getPlugin(componentName);
    if (plugin) {
      children = plugin.renderChildren(excludedArgValues) ?? '';
    }
  }

  if (props.length === 0 && !children) return null;

  const propsStr = props.length > 0 ? '\n  ' + props.join('\n  ') + '\n' : '';

  if (children) {
    // If children is a string literal, unwrap quotes
    const unwrapped = children.replace(/^['"]|['"]$/g, '');
    if (children.startsWith("'") || children.startsWith('"')) {
      return `<${componentName}${propsStr}>${unwrapped}</${componentName}>`;
    }
    // If children is an array of JSX elements, unwrap the array and strip keys
    if (children.startsWith('[')) {
      const inner = children.slice(1, -1).trim()
        .replace(/\s*key="[^"]*"/g, '')
        .replace(/\s*key={'[^']*'}/g, '')
        .replace(/>,\s*/g, '>\n  ')
        .replace(/\/>,\s*/g, '/>\n  ');
      return `<${componentName}${propsStr}>\n  ${inner.trim()}\n</${componentName}>`;
    }
    // Plain JSX children (e.g. from plugins)
    if (children.startsWith('<') || children.startsWith('\n')) {
      return `<${componentName}${propsStr}>\n  ${children.trim()}\n</${componentName}>`;
    }
    // Parenthesized JSX children — unwrap parens
    if (children.startsWith('(')) {
      const inner = children.slice(1, -1).trim();
      if (inner.startsWith('<')) {
        return `<${componentName}${propsStr}>\n  ${inner}\n</${componentName}>`;
      }
    }
    // JSX expression children
    return `<${componentName}${propsStr}>\n  {${children}}\n</${componentName}>`;
  }

  return `<${componentName}${propsStr}/>`;
}

/**
 * Finds the end of a value expression, accounting for nested structures.
 */
function findValueEnd(source: string, start: number): number {
  let depth = 0;
  let inString = false;
  let stringChar = '';
  let inTemplate = false;
  let i = start;

  while (i < source.length) {
    const ch = source[i];
    const prev = i > start ? source[i - 1] : '';

    if (inString) {
      if (ch === stringChar && prev !== '\\') inString = false;
      i++; continue;
    }
    if (inTemplate) {
      if (ch === '`' && prev !== '\\') inTemplate = false;
      i++; continue;
    }

    if (ch === "'" || ch === '"') { inString = true; stringChar = ch; i++; continue; }
    if (ch === '`') { inTemplate = true; i++; continue; }

    if (ch === '{' || ch === '(' || ch === '[') { depth++; i++; continue; }
    if (ch === '}' || ch === ')' || ch === ']') {
      if (depth === 0) return i;
      depth--; i++; continue;
    }

    // At top level, comma or newline followed by a key indicates end
    if (depth === 0 && ch === ',') return i;
    if (depth === 0 && ch === '\n') {
      // Check if next non-whitespace is a key or end
      const rest = source.slice(i + 1).match(/^\s*(\w+)\s*:|^\s*$/);
      if (rest) return i;
    }

    i++;
  }
  return i;
}

/**
 * Strips Storybook control noise from JSX: destructured arg spreads,
 * args.X ternaries, args.X && expressions.
 */
function stripArgSpreads(jsx: string): string {
  let result = jsx;
  // Remove {...variableName} spreads
  result = result.replace(/\s*\{\.\.\.\w+\}/g, '');
  // Remove multi-line {args.X ? (...) : (...)} ternary blocks
  result = result.replace(/\n?\s*\{args\.\w+[\s\S]*?\n\s*\)/g, (match) => {
    // Only strip if it contains a ternary
    if (match.includes('?') && match.includes(':')) return '';
    return match;
  });
  return result;
}

/**
 * Resolves all <StoryEmbed id="..."/> in markdown to code blocks.
 * Returns the markdown with StoryEmbeds replaced.
 */
export function resolveStoryEmbeds(markdown: string): string {
  return markdown.replace(
    /<StoryEmbed\s+id="([^"]+)"[^/]*\/>/g,
    (match, storyId: string) => {
      // Check override plugins first
      const override = getOverridePlugin(storyId);
      if (override) {
        try {
          const result = override.render(storyId);
          if (result) return result;
        } catch { /* fall through to normal extraction */ }
      }

      const parts = storyId.split('--');
      if (parts.length < 2) return match;

      const storySlug = parts[1];
      const storiesFile = findStoriesFile(storyId);
      if (!storiesFile) return match;

      const resolved = resolveStoryToCode(storiesFile, storySlug);
      if (!resolved) return match;

      return `\`\`\`tsx\n${resolved.code.trim()}\n\`\`\``;
    },
  );
}

/**
 * Collects ALL mock files from a component's mocks/ directory
 * that weren't already inlined via StoryEmbed resolution.
 */
export function collectAdditionalMocks(componentName: string, type: string, alreadyResolved: Set<string>): string {
  const mocksDir = join(COMPONENTS_SRC, type, componentName, 'mocks');
  if (!existsSync(mocksDir)) return '';

  const mockFiles = readdirSync(mocksDir).filter(
    (f) => f.endsWith('.tsx') && !f.includes('.test.'),
  );

  const additional: string[] = [];

  for (const file of mockFiles) {
    if (alreadyResolved.has(file)) continue;

    const mockPath = join(mocksDir, file);
    let source = readFileSync(mockPath, 'utf-8');
    source = transformImports(source);

    const name = file.replace('.tsx', '');
    additional.push(`### ${name}\n`);
    additional.push('```tsx');
    additional.push(source.trim());
    additional.push('```\n');
  }

  return additional.join('\n');
}
