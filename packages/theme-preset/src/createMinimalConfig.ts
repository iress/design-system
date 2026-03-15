import type { Config } from '@pandacss/dev';
import idsThemePreset from './index';
import { codegenPrepareHook } from './hooks/codegenPrepareHook';
import { cssgenDoneHook } from './hooks/cssgenDoneHook';

/**
 * Returns Panda CSS config overrides for packages that already include
 * `@iress-oss/ids-components` style.css.
 *
 * Includes the IDS theme preset and disables preflight, globalCss, and
 * staticCss to avoid duplicating CSS already shipped by IDS components.
 * Panda will still generate CSS for utilities your code actually uses.
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
      'cssgen:done': ({ artifact, content }) =>
        cssgenDoneHook(artifact, content),
    },
  };
}
