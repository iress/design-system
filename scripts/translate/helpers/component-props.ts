/**
 * Extracts valid prop names for a component from its .d.ts file.
 * Used to filter story args — only real props get rendered in code examples.
 */

import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = typeof import.meta.dirname === 'string' ? import.meta.dirname : dirname(fileURLToPath(import.meta.url));
const DIST = join(__dirname, '../../../packages/components/dist');

const cache = new Map<string, Set<string>>();

/**
 * Gets the set of valid prop names for a component.
 * Parses the component's .d.ts file to extract prop interface members.
 */
export function getComponentProps(componentName: string, type: 'components' | 'patterns'): Set<string> | null {
  const cacheKey = `${type}/${componentName}`;
  if (cache.has(cacheKey)) return cache.get(cacheKey)!;

  // Find the .d.ts file
  const dirName = componentName.replace(/^Iress/, '');
  const dtsPath = join(DIST, type, dirName, `${dirName}.d.ts`);

  if (!existsSync(dtsPath)) {
    cache.set(cacheKey, null as any);
    return null;
  }

  const source = readFileSync(dtsPath, 'utf-8');
  const props = new Set<string>();

  // Always include children and data-testid
  props.add('children');
  props.add('data-testid');

  // Extract from type/interface definition (most reliable)
  const typeMatch = source.match(/(?:type|interface)\s+\w+Props[^{]*\{([\s\S]*?)\n\}/);
  if (typeMatch) {
    for (const line of typeMatch[1].split('\n')) {
      const propMatch = line.match(/^\s+(\w+)\??:/);
      if (propMatch) props.add(propMatch[1]);
    }
  }

  // Also extract from the declare const destructuring pattern
  const declareMatch = source.match(/\(\{([^}]+)\}\s*:/);
  if (declareMatch) {
    for (const part of declareMatch[1].split(',')) {
      const trimmed = part.trim();
      if (!trimmed || trimmed.startsWith('...')) continue;
      const quotedMatch = trimmed.match(/^"([^"]+)"/);
      if (quotedMatch) { props.add(quotedMatch[1]); continue; }
      const name = trimmed.split(/[=:]/)[0].trim();
      if (name) props.add(name);
    }
  }

  if (props.size <= 2) {
    // Only children and data-testid — couldn't parse, return null to skip filtering
    cache.set(cacheKey, null as any);
    return null;
  }

  cache.set(cacheKey, props);
  return props;
}
