// =============================================================================
// CODE ANALYSIS UTILITIES
// =============================================================================

/**
 * Extract all custom components from JSX using regex
 */
function getCustomComponents(code: string): string[] {
  const regex = /<([A-Z][A-Za-z0-9]*)\b/g;
  const components = new Set<string>();
  let match: RegExpExecArray | null;

  while ((match = regex.exec(code)) !== null) {
    components.add(match[1]);
  }

  return Array.from(components);
}

/**
 * Parse a single import line and extract component names and source
 */
function parseImportLine(
  line: string,
): { components: string[]; source: string } | null {
  const trimmedLine = line.trim();

  if (!trimmedLine.startsWith('import ')) {
    return null;
  }

  const fromIndex = trimmedLine.lastIndexOf(' from ');
  if (fromIndex === -1) {
    return null;
  }

  // Extract source (remove quotes)
  const sourceWithQuotes = trimmedLine.slice(fromIndex + 6).trim();
  const source = sourceWithQuotes.slice(1, -1);

  // Extract import part
  const importPart = trimmedLine.slice(6, fromIndex).trim();

  const components: string[] = [];

  // Handle named imports { ... }
  if (importPart.startsWith('{') && importPart.endsWith('}')) {
    const namedImports = importPart.slice(1, -1);
    namedImports.split(',').forEach((name: string) => {
      const trimmed = name.trim();
      if (trimmed) {
        components.push(trimmed);
      }
    });
  }
  // Handle default imports
  else {
    const defaultImportRegex = /^\w+$/;
    if (defaultImportRegex.exec(importPart)) {
      components.push(importPart);
    }
  }

  return { components, source };
}

/**
 * Detect existing imports: returns { ComponentName: source }
 */
function getExistingImports(code: string): Record<string, string> {
  const imports: Record<string, string> = {};
  const lines = code.split('\n');

  for (const line of lines) {
    const parsed = parseImportLine(line);
    if (parsed) {
      parsed.components.forEach((component) => {
        imports[component] = parsed.source;
      });
    }
  }

  return imports;
}

/**
 * Detect locally defined components (const, function, class)
 */
function getLocalComponents(code: string): string[] {
  const regex = /(?:const|let|var|function|class)\s+([A-Z][A-Za-z0-9]*)\b/g;
  const locals = new Set<string>();
  let match: RegExpExecArray | null;

  while ((match = regex.exec(code)) !== null) {
    locals.add(match[1]);
  }

  return Array.from(locals);
}

// =============================================================================
// IMPORT INJECTION UTILITIES
// =============================================================================

/**
 * Find components that need to be imported
 */
function findMissingComponents(
  template: string,
  existingImports: Record<string, string>,
  localComponents: string[],
): string[] {
  const jsxComponents = getCustomComponents(template);

  return jsxComponents.filter(
    (component) =>
      !localComponents.includes(component) && !existingImports[component],
  );
}

/**
 * Update existing import line with additional components
 */
function updateExistingImport(
  template: string,
  library: string,
  missingComponents: string[],
): string {
  const escapedLibrary = library.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const importRegex = new RegExp(
    `import\\s+\\{([^}]+)\\}\\s+from\\s+["']${escapedLibrary}["']`,
  );

  return template.replace(importRegex, (match, group1: string) => {
    const existing = group1
      .split(',')
      .map((c: string) => c.trim())
      .filter(Boolean);
    const merged = Array.from(new Set([...existing, ...missingComponents]));
    return `import { ${merged.join(', ')} } from '${library}'`;
  });
}

/**
 * Add new import line after the last existing import
 */
function addNewImport(
  template: string,
  library: string,
  missingComponents: string[],
): string {
  const lastImportIndex = template.lastIndexOf('import');
  const insertPos =
    template.indexOf('\n', template.indexOf('\n', lastImportIndex) + 1) + 1;

  return (
    template.slice(0, insertPos) +
    `import { ${missingComponents.join(', ')} } from '${library}';\n` +
    template.slice(insertPos)
  );
}

/**
 * Inject missing imports into user-provided template
 */
export const injectImportsIntoTemplate = (
  template: string,
  library = '@iress-oss/ids-components',
) => {
  const existingImports = getExistingImports(template);
  const localComponents = getLocalComponents(template);
  const missingComponents = findMissingComponents(
    template,
    existingImports,
    localComponents,
  );

  if (missingComponents.length === 0) {
    return template;
  }

  const escapedLibrary = library.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const importRegex = new RegExp(
    `import\\s+\\{([^}]+)\\}\\s+from\\s+["']${escapedLibrary}["']`,
  );

  if (importRegex.test(template)) {
    return updateExistingImport(template, library, missingComponents);
  } else {
    return addNewImport(template, library, missingComponents);
  }
};
