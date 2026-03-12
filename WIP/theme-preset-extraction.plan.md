# Theme Preset Extraction Plan

## Goal

Extract `packages/components/theme-preset/` into a standalone package (`@iress-oss/ids-theme-preset`) so it can be consumed by other Panda CSS projects outside this monorepo.

## Background

The theme-preset is a Panda CSS preset that defines the IDS design token system — tokens, utilities, recipes, conditions, global CSS, and static CSS. It's currently embedded inside the components package but has **no imports from component source code**, making it a clean extraction candidate.

Panda CSS presets are the official mechanism for sharing design systems across projects:

```ts
import idsPreset from '@iress-oss/ids-theme-preset';

export default defineConfig({
  presets: [idsPreset],
});
```

## Current Structure

```
packages/components/theme-preset/
├── index.ts                          # definePreset(...) — main export
├── globalCss.ts
├── staticCss.ts
├── storybookHelpers.ts               # ⚠️ Storybook-specific, stays behind
├── config-recipes/
│   ├── button.ts
│   ├── table.ts
│   └── text.ts
├── hooks/
│   ├── codegenPrepareHook.ts         # Build hook for spacing alias resolution
│   ├── codegenPrepareHook.test.ts
│   ├── cssgenDoneHook.ts             # Build hook for CSS cleanup
│   ├── cssgenDoneHook.test.ts
│   ├── spacingAliasMap.ts
│   └── spacingAliasMap.test.ts
├── tokens/
│   ├── animationStyles.ts
│   ├── borders.ts
│   ├── breakpoints.ts
│   ├── colors.ts
│   ├── keyframes.ts
│   ├── layerStyles.ts
│   ├── radii.ts
│   ├── sizes.ts
│   ├── spacing.ts
│   ├── textStyles.ts
│   └── zIndex.ts
└── utilities/
    ├── chevron.ts
    ├── focusable.ts
    ├── gutter.ts
    ├── horizontalAlign.ts
    ├── materialSymbols.ts
    ├── noGutter.ts
    ├── offset.ts
    ├── scrollable.ts
    ├── sliderThumb.ts
    ├── span.ts
    ├── stretch.ts
    └── verticalAlign.ts
```

## Target Structure

```
packages/theme-preset/
├── package.json                      # @iress-oss/ids-theme-preset
├── tsconfig.json
├── tsconfig.lib.json
├── tsup.config.ts                    # or vite.config.ts for build
├── vitest.config.ts
├── README.md
├── src/
│   ├── index.ts                      # Re-exports preset as default + named
│   ├── globalCss.ts
│   ├── staticCss.ts
│   ├── config-recipes/
│   │   ├── button.ts
│   │   ├── table.ts
│   │   └── text.ts
│   ├── hooks/
│   │   ├── index.ts                  # Barrel export for hooks
│   │   ├── codegenPrepareHook.ts
│   │   ├── codegenPrepareHook.test.ts
│   │   ├── cssgenDoneHook.ts
│   │   ├── cssgenDoneHook.test.ts
│   │   ├── spacingAliasMap.ts
│   │   └── spacingAliasMap.test.ts
│   ├── tokens/
│   │   └── (all 11 token files)
│   └── utilities/
│       └── (all 12 utility files)
```

## Implementation Checklist

### Phase 1: Create the new package

- [ ] Create `packages/theme-preset/package.json`
  - Name: `@iress-oss/ids-theme-preset`
  - `peerDependencies`: `@pandacss/dev` (match current version `1.8.2`)
  - `devDependencies`: `@pandacss/dev`, `typescript`, `vitest`
  - Exports: `"."` → main preset, `"./hooks"` → hooks barrel
  - `files`: `["dist", "src"]` (publish source for Panda resolution + built output)
- [ ] Create `tsconfig.json` and `tsconfig.lib.json`
- [ ] Create build config (tsup or vite — tsup is simpler for pure TS libraries)
- [ ] Create `vitest.config.ts` for hook tests
- [ ] Create `README.md` with usage instructions

### Phase 2: Move source files

- [ ] Move all files from `packages/components/theme-preset/` to `packages/theme-preset/src/`
  - **Except** `storybookHelpers.ts` — stays in components
- [ ] Update internal import paths if needed (should be relative, likely no changes)
- [ ] Create `src/hooks/index.ts` barrel export:
  ```ts
  export { codegenPrepareHook } from './codegenPrepareHook';
  export { cssgenDoneHook } from './cssgenDoneHook';
  export { SPACING_ALIAS_MAP } from './spacingAliasMap';
  ```
- [ ] Verify preset `index.ts` has both default and named export:
  ```ts
  const idsThemePreset = definePreset({ ... });
  export default idsThemePreset;
  export { idsThemePreset };
  ```

### Phase 3: Update components package

- [ ] Add `@iress-oss/ids-theme-preset` as a `devDependency` in `packages/components/package.json`
- [ ] Update `packages/components/panda.config.ts`:
  ```diff
  -import themePreset from './theme-preset';
  -import { codegenPrepareHook } from './theme-preset/hooks/codegenPrepareHook';
  -import { cssgenDoneHook } from './theme-preset/hooks/cssgenDoneHook';
  +import themePreset from '@iress-oss/ids-theme-preset';
  +import { codegenPrepareHook, cssgenDoneHook } from '@iress-oss/ids-theme-preset/hooks';
  ```
- [ ] Update `dependencies` array in panda config (remove `'./theme-preset/**/*'`)
- [ ] Remove `@theme-preset` alias from `vitest.config.ts` (no longer needed)
- [ ] Remove `'theme-preset/**/*.test.ts'` from vitest include (tests now live in new package)
- [ ] Update `vite.config.ts` exclude pattern for `theme-preset/**/*`
- [ ] Delete the old `packages/components/theme-preset/` directory (now empty)

### Phase 3.5: Move `storybookHelpers` to `@iress-oss/ids-storybook-config`

The `storybookHelpers.ts` file provides IDS-specific Storybook argType utilities (`stylingProps`, `omitStylingProps`, `reactNodeArgType`). The `@iress-oss/ids-storybook-config` package already has a `helpers/` directory with similar utilities, so this is a natural home.

- [ ] Move `packages/components/theme-preset/storybookHelpers.ts` → `packages/storybook-config/src/helpers/stylingProps.ts`
- [ ] Add exports to `packages/storybook-config/src/index.ts`:
  ```ts
  // Helpers
  export * from './helpers/stylingProps';
  ```
- [ ] Verify `@storybook/react-vite` is already a dependency of `storybook-config` (it is — used in `preview.tsx`)
- [ ] If `storybookHelpers.ts` references any Panda CSS generated types (e.g. `IressCSSProps`), either:
  - Add `@iress-oss/ids-components` as a peer dependency of storybook-config, OR
  - Make the PROPS list generic / string-based (no typed dependency)
- [ ] Add a new subpath export if preferred to keep it separate:
  ```json
  "./helpers": {
    "types": "./dist/helpers/index.d.ts",
    "import": "./dist/helpers/index.js"
  }
  ```
- [ ] Build storybook-config and verify exports resolve correctly

### Phase 4: Update story imports

- [ ] Update all `@theme-preset/storybookHelpers` imports (~20+ story files) to new path
  - New import: `from '@iress-oss/ids-storybook-config'` (or `from '@iress-oss/ids-storybook-config/helpers'` if using subpath)
  - Files affected (non-exhaustive):
    - `Col/Col.stories.tsx`
    - `DropdownMenu/DropdownMenu.stories.tsx`
    - `Shadow/Shadow.stories.tsx`
    - `Loading/Loading.stories.tsx`
    - `ButtonGroup/ButtonGroup.stories.tsx`
    - `Tag/Tag.stories.tsx`
    - `Tooltip/Tooltip.stories.tsx`
    - `Tab/Tab.stories.tsx`
    - `TagInput/TagInput.stories.tsx`
    - `Radio/Radio.stories.tsx`
    - `Autocomplete/Autocomplete.stories.tsx`
    - `Card/Card.stories.tsx`
    - `TabSet/TabSet.stories.tsx`
    - `Modal/Modal.stories.tsx`
    - `Panel/Panel.stories.tsx`
    - `Toaster/Toaster.stories.tsx`
    - `RadioMark/RadioMark.stories.tsx`
    - `Slider/Slider.stories.tsx`
    - `ValidationSummary/ValidationSummary.stories.tsx`
    - `DefaultLoading.stories.tsx`
    - `ValidateLoading.stories.tsx`
    - (grep for full list: `@theme-preset/storybookHelpers`)

### Phase 5: Monorepo wiring

- [ ] Confirm `packages/*` glob in root `package.json` workspaces already covers the new package
- [ ] Run `yarn install` to link the new workspace package
- [ ] Verify `panda:prepare` still works in components package
- [ ] Run `yarn test:components` — all existing tests pass
- [ ] Run tests in theme-preset package — hook tests pass
- [ ] Run `yarn lint:components` — no lint errors
- [ ] Verify Storybook still starts (`yarn workspace @iress-oss/ids-components run storybook`)

### Phase 6: Validate external consumption

- [ ] Verify the package can be imported in a standalone `panda.config.ts`:

  ```ts
  import { defineConfig } from '@pandacss/dev';
  import idsPreset from '@iress-oss/ids-theme-preset';

  export default defineConfig({
    presets: [idsPreset],
    include: ['./src/**/*.{ts,tsx}'],
    outdir: './styled-system',
  });
  ```

- [ ] Document any required peer dependencies for external consumers

## Design Decisions

### Hooks: Include in preset package or keep in components?

**Recommendation: Include in preset, export from `./hooks` subpath.**

Rationale: Other consumers using the preset may also want the spacing alias resolution and CSS cleanup hooks. Exporting them from a subpath keeps the main preset import clean while making hooks available:

```ts
import idsPreset from '@iress-oss/ids-theme-preset';
import {
  codegenPrepareHook,
  cssgenDoneHook,
} from '@iress-oss/ids-theme-preset/hooks';
```

### storybookHelpers: Move to `@iress-oss/ids-storybook-config`

This file imports from `@storybook/react-vite` and provides IDS-specific Storybook helpers (`stylingProps`, `omitStylingProps`, `reactNodeArgType`). Rather than keeping it buried in the components package, move it to `@iress-oss/ids-storybook-config` which already has a `helpers/` directory with similar argType utilities (`disableArgTypes`, `removeArgTypes`, `addToStorybookCategory`, `mergeStorybookConfig`). This makes the helpers available to any library that uses IDS in its Storybook, not just this repo.

### Source vs built output

**Recommendation: Publish both `src/` and `dist/`.**

- Panda CSS resolves presets at build time via Node.js, so publishing TypeScript source works fine when the consumer's toolchain handles TS
- A compiled `dist/` (via tsup) provides compatibility for consumers not using TypeScript
- Package exports should point to `dist/` by default

### Build tool

**Recommendation: tsup** — simpler than Vite for pure TypeScript libraries, handles CJS/ESM dual output, and requires minimal config.

### Package naming

`@iress-oss/ids-theme-preset` — follows existing convention (`ids-tokens`, `ids-components`).

## Risk Assessment

- **Low risk**: The preset directory has zero imports from component source code
- **No runtime impact**: Preset is only used at Panda CSS build time
- **Backward compatible**: Components package consumes the same preset, just via a package import instead of relative path
- **Rollback**: If issues arise, revert to relative imports — the source files are identical

## Dependencies

```
@iress-oss/ids-theme-preset
├── peerDependencies
│   └── @pandacss/dev >= 1.8.0
├── devDependencies
│   ├── @pandacss/dev 1.8.2
│   ├── @pandacss/types 1.8.2
│   ├── typescript ~5.9.0
│   └── vitest ~4.0.0
└── dependencies
    └── (none — pure config, no runtime deps)
```
