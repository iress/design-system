/**
 * Pure utility functions for icon generation.
 * Separated from generate-icons.ts to enable easy testing without
 * module-level side effects (fileURLToPath, createRequire, etc.)
 */

import { parseStringPromise } from 'xml2js';

export interface IconData {
  name: string;
  componentName: string;
  pathData: string;
  viewBox: string;
  isFilled: boolean;
}

interface SvgAttributes {
  d: string;
  viewBox?: string;
}

interface PathElement {
  $: SvgAttributes;
}

interface SvgElement {
  $: { viewBox?: string };
  path?: PathElement[];
}

interface ParsedSvg {
  svg: SvgElement;
}

/**
 * Extract path data and viewBox from SVG content
 */
export async function extractPathData(
  svgContent: string,
): Promise<{ path: string; viewBox: string }> {
  try {
    const parsed = (await parseStringPromise(svgContent)) as ParsedSvg;
    const svgElement = parsed.svg;

    if (!svgElement?.path?.[0]) {
      throw new Error('Invalid SVG structure: missing path element');
    }

    const pathElement = svgElement.path[0];
    const pathData = pathElement.$.d;
    const viewBox = svgElement.$.viewBox ?? '0 -960 960 960';

    return { path: pathData, viewBox };
  } catch (error) {
    throw new Error(
      `Failed to parse SVG: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
}

/**
 * Convert snake_case icon name to PascalCase component name
 * Handles icon names that start with numbers by prepending "Icon"
 * Adds "Fill" suffix for filled variants to avoid naming conflicts
 */
export function toComponentName(iconName: string, isFilled = false): string {
  const pascalCase = iconName
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');

  const startsWithNumber = /^\d/.test(pascalCase);

  if (startsWithNumber) {
    // For icons starting with numbers: Icon10k or Icon10kFill
    return isFilled ? `Icon${pascalCase}Fill` : `Icon${pascalCase}`;
  } else {
    // For regular icons: HomeIcon or HomeFillIcon
    return isFilled ? `${pascalCase}FillIcon` : `${pascalCase}Icon`;
  }
}

/**
 * Generate React component TSX content
 */
export function generateComponentContent(iconData: IconData): string {
  return `// Auto-generated from @material-symbols/svg-300
export const ${iconData.componentName} = () => (
  <svg
    viewBox="${iconData.viewBox}"
    width="100%"
    height="100%"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="${iconData.pathData}" />
  </svg>
);

export default ${iconData.componentName};
`;
}

/**
 * Generate index file content with all exports (for type checking)
 */
export function generateIndexContent(iconDataList: IconData[]): string {
  const exports = iconDataList
    .map((icon) => {
      const fileName = icon.isFilled ? `${icon.name}-fill` : icon.name;
      return `export { ${icon.componentName} } from './${fileName}';`;
    })
    .join('\n');

  return `// Auto-generated index file for icon components
// This file is used for type checking only
${exports}
`;
}
