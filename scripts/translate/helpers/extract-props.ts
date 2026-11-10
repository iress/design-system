/**
 * Extracts component props using react-docgen-typescript.
 * Parses ALL component source files in a single pass for performance.
 */

import { join, dirname } from 'path';
import { existsSync, readFileSync, readdirSync, statSync } from 'fs';
import { fileURLToPath } from 'url';
import { withCompilerOptions, type ComponentDoc } from 'react-docgen-typescript';
import ts from 'typescript';

const __dirname = typeof import.meta.dirname === 'string' ? import.meta.dirname : dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '../../..');
const COMPONENTS_SRC = join(ROOT, 'packages/components/src');
const DIST = join(ROOT, 'packages/components/dist');

export interface PropEntry {
  name: string;
  type: string;
  required: boolean;
  description: string;
  defaultValue?: string;
}

/** Styling props — documented in the styling-props section, excluded from component props tables */
const STYLING_PROPS = new Set([
  'alignSelf', 'bg', 'borderRadius', 'color', 'focusable', 'flex', 'hideFrom',
  'hideBelow', 'maxWidth', 'm', 'my', 'mx', 'mb', 'ml', 'mr', 'mt', 'noGutter',
  'p', 'py', 'px', 'pb', 'pl', 'pr', 'pt', 'scrollable', 'srOnly', 'stretch',
  'textAlign', 'textStyle', 'width', 'minWidth',
]);

const parser = withCompilerOptions(
  {
    esModuleInterop: true,
    jsx: ts.JsxEmit.React,
    strict: true,
    baseUrl: COMPONENTS_SRC,
    paths: {
      '@/main': ['./main.ts'],
      '@/main/*': ['./*'],
      '@/*': ['./*'],
    },
  },
  {
    savePropValueAsString: true,
    shouldExtractLiteralValuesFromEnum: true,
    shouldRemoveUndefinedFromOptional: true,
    propFilter: (prop) => {
      if (prop.declarations?.some((d) => d.fileName.includes('node_modules'))) return false;
      if (prop.name.startsWith('_')) return false;
      if (prop.name === 'ref') return false;
      // Only filter styling props if they come from IressCSSProps/IressStyledProps (shared)
      // Keep them if they're declared directly on the component's own interface
      if (STYLING_PROPS.has(prop.name)) {
        const isFromStylingInterface = prop.declarations?.every(
          (d) => d.fileName.includes('types') || d.fileName.includes('interfaces') || d.fileName.includes('styled-system')
        );
        if (isFromStylingInterface) return false;
      }
      return true;
    },
  },
);

/** Cache: componentName → PropEntry[] */
let propsCache: Map<string, PropEntry[]> | null = null;

/**
 * Finds all component source files and parses them in one pass.
 */
function buildCache(): Map<string, PropEntry[]> {
  const cache = new Map<string, PropEntry[]>();
  const files: string[] = [];

  for (const type of ['components', 'patterns']) {
    const dir = join(COMPONENTS_SRC, type);
    if (!existsSync(dir)) continue;
    for (const entry of readdirSync(dir)) {
      const entryPath = join(dir, entry);
      if (!statSync(entryPath).isDirectory()) continue;
      const srcFile = join(entryPath, `${entry}.tsx`);
      if (existsSync(srcFile)) files.push(srcFile);
      // Also scan one level deeper for sub-components (e.g. Form/FormField/)
      for (const sub of readdirSync(entryPath)) {
        const subPath = join(entryPath, sub);
        if (!statSync(subPath).isDirectory()) continue;
        const subFile = join(subPath, `${sub}.tsx`);
        if (existsSync(subFile)) files.push(subFile);
        // Also pick up sibling component files (e.g. FormFieldset.tsx in FormField/)
        for (const sibling of readdirSync(subPath)) {
          if (sibling.endsWith('.tsx') && !sibling.includes('.stories.') && !sibling.includes('.test.') && sibling !== `${sub}.tsx`) {
            files.push(join(subPath, sibling));
          }
        }
      }
    }
  }

  // Parse ALL files in one TypeScript program
  const docs: ComponentDoc[] = parser.parse(files);

  for (const doc of docs) {
    if (!doc.displayName.startsWith('Iress')) continue;
    const propEntries: PropEntry[] = Object.values(doc.props).map((p) => ({
      name: p.name,
      type: simplifyType(p.type.name === 'enum' ? ((p.type as any).raw ?? p.type.name) : p.type.name),
      required: p.required,
      description: p.description,
      defaultValue: p.defaultValue?.value,
    }));
    if (propEntries.length > 0) {
      cache.set(doc.displayName, propEntries);
    }
  }

  return cache;
}

/**
 * Extracts props for a component. First call triggers full parse.
 * Falls back to individual parsing for components the batch misses.
 */
export function extractProps(componentName: string, _type: 'components' | 'patterns'): PropEntry[] | null {
  if (!propsCache) {
    propsCache = buildCache();
  }
  const cached = propsCache.get(componentName);
  if (cached) return cached;

  // Fallback: try parsing the individual file (batch mode can miss some components)
  const dirName = componentName.replace(/^Iress/, '');
  for (const type of ['components', 'patterns']) {
    const srcFile = join(COMPONENTS_SRC, type, dirName, `${dirName}.tsx`);
    if (existsSync(srcFile)) {
      try {
        const docs = parser.parse(srcFile);
        const doc = docs.find((d) => d.displayName === componentName);
        if (doc && Object.keys(doc.props).length > 1) {
          const props: PropEntry[] = Object.values(doc.props).map((p) => ({
            name: p.name,
            type: simplifyType(p.type.name === 'enum' ? ((p.type as any).raw ?? p.type.name) : p.type.name),
            required: p.required,
            description: p.description,
            defaultValue: p.defaultValue?.value,
          }));
          propsCache.set(componentName, props);
          return props;
        }
      } catch { /* continue */ }
    }

    // Final fallback: parse from .d.ts file directly
    const dtsFile = join(DIST, type, dirName, `${dirName}.d.ts`);
    if (existsSync(dtsFile)) {
      const props = parsePropsFromDts(dtsFile, componentName);
      if (props && props.length > 0) {
        propsCache.set(componentName, props);
        return props;
      }
    }
  }

  return null;
}

function simplifyType(type: string): string {
  type = type.replace(/ReactElement<[^>]+>/g, 'ReactElement');
  // Replace pipe union separators with commas, but NOT inside generics (e.g. Omit<X, 'a' | 'b'>)
  let result = '';
  let genericDepth = 0;
  for (let i = 0; i < type.length; i++) {
    const ch = type[i];
    if (ch === '<') genericDepth++;
    else if (ch === '>') genericDepth--;
    else if (ch === '|' && genericDepth === 0) {
      result += ',';
      // Skip surrounding whitespace
      while (type[i + 1] === ' ') i++;
      result += ' ';
      continue;
    }
    result += ch;
  }
  type = result;
  // Sort union values alphabetically (only for simple unions, not generics)
  if (type.includes(', ') && !type.includes('=>') && !type.startsWith('((') && !type.includes('<')) {
    const parts = type.split(', ');
    type = parts.sort((a, b) => a.localeCompare(b)).join(', ');
  }
  // Collapse expanded ReactNode back to ReactNode
  if (type.includes('ReactPortal') && type.includes('Iterable<ReactNode>')) {
    return '`ReactNode`';
  }
  // Detect MaterialSymbol unions (huge icon name lists) and simplify
  const commaCount = type.split(',').length;
  if (commaCount > 15 && (type.includes('translate') || type.includes('home') || type.includes('settings'))) {
    const hasFalse = type.startsWith('false');
    return hasFalse ? '`false`, [MaterialSymbol](https://fonts.google.com/icons?icon.set=Material+Symbols)' : '[MaterialSymbol](https://fonts.google.com/icons?icon.set=Material+Symbols)';
  }
  // Wrap each string literal value in backticks (skip for generic types to preserve structure)
  if (!type.includes('<')) {
    type = type.replace(/"([^"]+)"/g, '`$1`');
  }
  // Wrap standalone numbers in backticks
  type = type.replace(/(?<=, |^)(\d+)(?=,|$)/g, '`$1`');
  if (type.length > 100) {
    // Only truncate union-like types (comma-separated values), not function signatures
    if (!type.includes('=>') && !type.startsWith('((')) {
      const parts = type.split(', ');
      if (parts.length > 25) {
        return parts.slice(0, 3).join(', ') + `, ... (${parts.length} total)`;
      }
    }
  }
  // If no backticks yet (simple types like boolean, ReactNode), wrap the whole thing
  if (!type.includes('`') && !type.includes('](')) {
    type = '`' + type + '`';
  }
  return type;
}

/**
 * Renders props as a markdown table.
 */
export function renderPropsTable(props: PropEntry[], componentName?: string, type?: string): string {
  const dirName = componentName?.replace(/^Iress/, '') ?? '';
  const dtsRelPath = type && dirName ? `../../dist/${type}/${dirName}/${dirName}.d.ts` : '';

  const rows = props.map((p) => {
    const name = p.required ? `**${p.name}**` : p.name;
    const def = p.defaultValue ? `\`${p.defaultValue.replace(/\n\s*/g, ' ').trim()}\`` : '—';
    const desc = p.description.replace(/\|/g, '\\|').replace(/\n/g, ' ');
    // Link custom types to their .d.ts source
    const typeStr = linkCustomTypes(p.type, type, componentName);
    return `| ${name} | ${typeStr} | ${def} | ${desc} |`;
  });

  const table = [
    '| Prop | Type | Default | Description |',
    '|------|------|---------|-------------|',
    ...rows,
  ].join('\n');

  const dtsLink = dtsRelPath ? `\n\n📄 [Full type definition](${dtsRelPath})` : '';

  return table + dtsLink;
}

/** Known shared types and their .d.ts locations (relative to package dist/) */
const SHARED_TYPE_PATHS: Record<string, string> = {
  FormControlValue: 'types.d.ts',
  FormControlReadOnly: 'types.d.ts',
  ResponsiveProp: 'types.d.ts',
  PositiveSpacingToken: 'types.d.ts',
  FloatingUIContainer: 'types.d.ts',
  FloatingUIAligns: 'types.d.ts',
  IressCSSProps: 'interfaces.d.ts',
  IressCustomiseSlot: 'interfaces.d.ts',
  LabelValueMeta: 'interfaces.d.ts',
  LabelValue: 'interfaces.d.ts',
  ValidationMessageObj: 'interfaces.d.ts',
  ControlledValue: 'hooks/useControlledState.d.ts',
};

/**
 * Wraps custom type references with relative links to .d.ts files.
 */
function linkCustomTypes(typeStr: string, componentType?: string, componentName?: string): string {
  if (!componentType) return typeStr;

  // Link Iress* types to their component .d.ts (both backtick-wrapped and inside expressions)
  typeStr = typeStr.replace(/\b(Iress\w+?)(\[\])?\b/g, (match, typeName, arraySuffix) => {
    // Skip if already inside a markdown link
    if (typeStr.includes(`[${match}]`)) return match;
    // Skip if it's a shared type (handled below)
    if (SHARED_TYPE_PATHS[typeName]) return match;
    // Derive component directory by stripping Iress prefix and common suffixes
    const stripped = typeName.replace(/^Iress/, '').replace(/(Props|Variants|Options|Config)$/, '');
    if (stripped) {
      const suffix = arraySuffix ?? '';
      // Check if the derived path exists in the same type dir, then try components/
      const derivedPath = join(DIST, componentType ?? '', stripped, `${stripped}.d.ts`);
      const componentsPath = join(DIST, 'components', stripped, `${stripped}.d.ts`);
      if (existsSync(derivedPath)) {
        return `[${typeName}${suffix}](../../dist/${componentType}/${stripped}/${stripped}.d.ts)`;
      }
      if (existsSync(componentsPath)) {
        return `[${typeName}${suffix}](../../dist/components/${stripped}/${stripped}.d.ts)`;
      }
      // Fallback: type might be defined in the current component's file
      const parentDir = componentName?.replace(/^Iress/, '') ?? '';
      if (parentDir) {
        return `[${typeName}${suffix}](../../dist/${componentType}/${parentDir}/${parentDir}.d.ts)`;
      }
    }
    return match;
  });

  // Link shared types to their definition files
  for (const [typeName, filePath] of Object.entries(SHARED_TYPE_PATHS)) {
    const regex = new RegExp(`\\b${typeName}\\b`, 'g');
    typeStr = typeStr.replace(regex, `[${typeName}](../../dist/${filePath})`);
  }

  return typeStr;
}

/**
 * Fallback: parse props directly from the .d.ts file when react-docgen-typescript fails.
 * Less accurate (won't resolve inherited types) but catches the directly-declared props.
 */
function parsePropsFromDts(dtsPath: string, componentName: string): PropEntry[] | null {
  const source = readFileSync(dtsPath, 'utf-8');

  // Find the Props interface matching the component
  const propsName = `${componentName}Props`;
  const propsRegex = new RegExp(`(?:export\\s+)?interface\\s+${propsName}[^{]*\\{([\\s\\S]*?)\\n\\}`);
  const propsMatch = source.match(propsRegex);
  if (!propsMatch) return null;

  const body = propsMatch[1];
  const props: PropEntry[] = [];

  // Parse: /** JSDoc */ propName?: type;
  const propRegex = /(?:\/\*\*([\s\S]*?)\*\/\s*)?(\w+)(\??):\s*([^;]+);/g;
  let m;

  while ((m = propRegex.exec(body)) !== null) {
    const jsdoc = m[1] ?? '';
    const name = m[2];
    const optional = m[3] === '?';
    let rawType = m[4].trim();

    // Extract description from JSDoc
    const descLines = jsdoc
      .split('\n')
      .map((l: string) => l.replace(/^\s*\*\s?/, '').trim())
      .filter((l: string) => l && !l.startsWith('@'));
    const description = descLines.join(' ').trim();

    // Extract @default
    let defaultValue: string | undefined;
    const defaultMatch = jsdoc.match(/@default\s+(.+)/);
    if (defaultMatch) defaultValue = defaultMatch[1].trim();

    // Skip styling props
    if (STYLING_PROPS.has(name)) continue;
    if (name.startsWith('_') || name === 'ref') continue;

    props.push({
      name,
      type: simplifyType(rawType),
      required: !optional,
      description,
      defaultValue,
    });
  }

  return props.length > 0 ? props : null;
}
