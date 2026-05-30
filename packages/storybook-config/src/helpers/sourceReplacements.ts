export interface SourceReplacement {
  pattern: RegExp;
  replacement: string;
}

/**
 * Default replacements for non-serializable values in auto-generated source.
 * Applied in both `getPreview` (global) and `withSource` (per-story).
 */
export const DEFAULT_SOURCE_REPLACEMENTS: SourceReplacement[] = [
  { pattern: /container:\s*\{\}/g, replacement: 'container: document.body' },
];

/**
 * Applies source replacements to a code string.
 */
export function applySourceReplacements(
  code: string,
  replacements: SourceReplacement[] = DEFAULT_SOURCE_REPLACEMENTS,
): string {
  return replacements.reduce(
    (result, { pattern, replacement }) => result.replace(pattern, replacement),
    code,
  );
}
