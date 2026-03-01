import { resolve } from 'node:path';
import { Project, type SourceFile } from 'ts-morph';

/**
 * Absolute path to the IDS components source directory.
 * Resolved from the Next.js working directory (packages/guidelines).
 */
const IDS_COMPONENTS_SRC = resolve(process.cwd(), '../components/src');

const propsCache = new Map<string, Set<string>>();
let project: Project | undefined;

function getProject(): Project {
  if (!project) {
    project = new Project({
      skipAddingFilesFromTsConfig: true,
      skipFileDependencyResolution: true,
    });
  }
  return project;
}

function getSourceFile(absolutePath: string): SourceFile {
  const p = getProject();
  return p.getSourceFile(absolutePath) ?? p.addSourceFileAtPath(absolutePath);
}

/**
 * Extract direct property names from a TypeScript interface.
 *
 * Only properties declared in the interface body are returned —
 * inherited props from `extends` clauses are excluded.  This lets us
 * distinguish component-specific props from shared/inherited ones.
 *
 * Results are cached per file + interface pair.
 *
 * @param relativePath - Path relative to the IDS components `src/` directory
 * @param interfaceName - The interface to extract properties from
 */
export function getInterfaceProps(
  relativePath: string,
  interfaceName: string,
): Set<string> {
  const absolutePath = resolve(IDS_COMPONENTS_SRC, relativePath);
  const key = `${absolutePath}:${interfaceName}`;

  const cached = propsCache.get(key);
  if (cached) return cached;

  const sourceFile = getSourceFile(absolutePath);
  const iface = sourceFile.getInterface(interfaceName);

  if (!iface) {
    console.warn(
      `[extract-props] Interface "${interfaceName}" not found in ${absolutePath}`,
    );
    return new Set();
  }

  const props = new Set(iface.getProperties().map((p) => p.getName()));
  propsCache.set(key, props);
  return props;
}

/**
 * Shared IressCSSProps styling prop names.
 * Extracted once from the IDS components source and reused across all stories.
 */
export const STYLING_PROPS = getInterfaceProps(
  'interfaces.ts',
  'IressCSSProps',
);
