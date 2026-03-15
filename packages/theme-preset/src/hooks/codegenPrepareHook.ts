import type { Artifact } from '@pandacss/types';
import { SPACING_ALIAS_MAP } from './spacingAliasMap';

/**
 * Injects alias resolution into the generated css runtime so that
 * gap="sm" produces class `gap_spacing.2` (reusing the canonical class)
 * instead of generating a duplicate `gap_sm` class.
 */
export function codegenPrepareHook(artifacts: Artifact[]): Artifact[] | void {
  const cssFnArtifact = artifacts.find((a) => a.id === 'css-fn');
  if (!cssFnArtifact?.files) return;

  const cssFile = cssFnArtifact.files.find((f) =>
    f.code?.includes('withoutSpace(value)'),
  );
  if (!cssFile) return;

  const negAliases = Object.fromEntries(
    Object.entries(SPACING_ALIAS_MAP).map(([k, v]) => [`-${k}`, `-${v}`]),
  );

  const spacingProps = [
    'gap',
    'columnGap',
    'rowGap',
    'gutter',
    'margin',
    'marginTop',
    'marginBottom',
    'marginLeft',
    'marginRight',
    'marginBlock',
    'marginInline',
    'padding',
    'paddingTop',
    'paddingBottom',
    'paddingLeft',
    'paddingRight',
    'paddingBlock',
    'paddingInline',
  ];

  const injection = `const __spacingAliases__ = ${JSON.stringify(SPACING_ALIAS_MAP)};
const __negSpacingAliases__ = ${JSON.stringify(negAliases)};
const __spacingProps__ = new Set(${JSON.stringify(spacingProps)});
const __resolveAlias__ = (prop, v) => __spacingProps__.has(prop) ? (__spacingAliases__[v] || __negSpacingAliases__[v] || v) : v;
`;

  cssFile.code =
    injection +
    cssFile.code!.replace(
      /withoutSpace\(value\)/,
      'withoutSpace(__resolveAlias__(key, value))',
    );

  return artifacts;
}
