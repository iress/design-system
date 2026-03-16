import type { Config } from '@pandacss/dev';
import idsThemePreset from './index';
import { codegenPrepareHook } from './hooks/codegenPrepareHook';
import { cssgenDoneHook } from './hooks/cssgenDoneHook';
import { staticCssStripHook } from './hooks/staticCssStripHook';

/**
 * Returns Panda CSS config overrides for packages that already include
 * `@iress-oss/ids-components` style.css.
 *
 * Includes the IDS theme preset and disables preflight, globalCss, and
 * staticCss to avoid duplicating CSS already shipped by IDS components.
 * Panda will still generate CSS for utilities your code actually uses.
 *
 * The `cssgen:done` hook runs two passes over the generated styles.css:
 * 1. `cssgenDoneHook` — strips spacing alias classes (e.g. `gap_sm`) that
 *    were generated before runtime alias resolution could redirect them to the
 *    canonical token class.
 * 2. `staticCssStripHook` — strips IDS static-CSS utility classes that are
 *    already shipped in `@iress-oss/ids-components` style.css, preventing
 *    duplication in the consumer's own bundle.
 */
export function createMinimalConfig(): Pick<
  Config,
  'presets' | 'preflight' | 'staticCss' | 'globalCss' | 'hooks'
> {
  return {
    presets: [idsThemePreset],
    preflight: false,
    staticCss: { css: [] },
    globalCss: {},
    hooks: {
      'codegen:prepare': ({ artifacts }) => codegenPrepareHook(artifacts),
      'cssgen:done': ({ artifact, content }) => {
        // Run alias stripping first, then strip IDS static-CSS classes.
        // `??` (not `||`) ensures an empty-string return is treated as valid
        // CSS content rather than falling back to the unmodified input.
        const afterAliasStrip = cssgenDoneHook(artifact, content) ?? content;
        return staticCssStripHook(artifact, afterAliasStrip) ?? afterAliasStrip;
      },
    },
  };
}
