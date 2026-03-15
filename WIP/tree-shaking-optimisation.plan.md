# Tree-Shaking Optimisation Plan

## Problem Summary

Consumers importing a single component (e.g. `import { IressButton } from '@iress-oss/ids-components'`) pull in far more code than necessary. A Button import transitively includes Spinner, Icon, Tooltip, Popover, ButtonGroup, all their styles, and every shared utility/type/constant — because bundlers cannot effectively prune unused modules from the current build output.

**Goal:** Fix tree-shaking so consumers get only the code they use, **without any changes to the consumer import API**.

Consumers continue to write:

```ts
import { IressButton } from '@iress-oss/ids-components';
```

All changes are library-internal.

---

## Root Causes

### 1. `export *` barrels obscure the module graph

`main.ts` uses `export * from './components/Button'` for 50+ re-exports. Each component's `index.ts` uses `export *` again. Bundlers cannot statically determine which bindings are actually used through multiple layers of star re-exports, so they conservatively keep everything.

### 2. Internal imports go through barrels, pulling in extras

Components import from sibling barrel files:

```ts
// Alert.tsx
import { IressButton, IressCloseButton } from '../Button';
// Resolves to Button/index.ts which re-exports:
//   Button.tsx + button recipe styles + CloseButton.tsx
```

Importing `IressButton` from `../Button` also pulls in `CloseButton` and the `button` Panda recipe export — neither of which Alert needs.

Similarly, `import { IressIcon } from '../Icon'` pulls in `Icon.constants`, `Icon.styles`, and `IressIconProvider`.

### 3. No `exports` field in package.json

Modern bundlers (Webpack 5, Vite, Rollup, esbuild) use the `exports` field to resolve entry points and determine module boundaries. Without it, they fall back to `main` and cannot do package-level module pruning.

### 4. Build output doesn't preserve module structure

The current Rollup config uses a glob-based multi-entry approach that flattens module relationships. The dist output has individual files, but import relationships between them aren't preserved — bundlers can't trace the real dependency graph.

### 5. Heavy optional dependencies are bundled

`@tanstack/react-table` (~50KB), `@floating-ui/react` (~30KB), and `material-symbols` are bundled into dist. Consumers who don't use Table, Popover, or Icon still pay the cost if tree-shaking fails on any ancestor module.

---

## Implementation Phases

### Phase 1: `preserveModules` in Vite/Rollup Config

**Impact: HIGH | Effort: SMALL | Risk: MEDIUM**

Switch the Rollup output from flattened multi-entry to `preserveModules`. This makes the dist output mirror the source module structure, preserving exact import/export relationships so bundlers can trace and prune at the module level.

#### Changes

- [ ] **`packages/components/vite.config.ts`** — Replace the glob-based `input` with `preserveModules` in rollup output options:

  ```ts
  // BEFORE (lines 110-140)
  rollupOptions: {
    input: Object.fromEntries(
      glob.sync([...]).map(...)
    ),
    output: {
      assetFileNames: '[name][extname]',
      entryFileNames: '[name].js',
    },
  }

  // AFTER
  rollupOptions: {
    external: [
      'react', 'react-dom', 'react-dom/client',
      'react/jsx-runtime', 'react-hook-form',
    ],
    output: {
      preserveModules: true,
      preserveModulesRoot: 'src',
      assetFileNames: '[name][extname]',
      entryFileNames: '[name].js',
      format: 'es',
    },
  }
  ```

- [ ] Remove the `glob` import and associated `input` generation code (no longer needed)
- [ ] Verify `lib.entry` still points to `src/main.ts` as the main entry
- [ ] **Test the build** — run `yarn workspace @iress-oss/ids-components run build` and verify:
  - dist/ contains a module tree mirroring src/
  - `dist/main.js` re-exports from `dist/components/Button/index.js`, etc.
  - CSS output is still correct (`style.css` with Panda layers)
  - DTS generation (`vite-plugin-dts`) still works correctly
  - `vite-plugin-static-copy` for styled-system types still works

#### Validation

- [ ] Check dist/ file structure matches src/ module structure
- [ ] Verify a consumer bundler (Vite or Webpack) can tree-shake unused components
- [ ] Compare bundle sizes before/after using `vite-bundle-visualizer`
- [ ] Run full test suite to ensure nothing is broken

---

### Phase 2: Add `exports` Field to package.json

**Impact: HIGH | Effort: SMALL | Risk: LOW**

Add an `exports` map so bundlers know the exact entry points and can resolve modules optimally.

#### Changes

- [ ] **`packages/components/package.json`** — Add `exports` field:

  ```jsonc
  {
    "exports": {
      ".": {
        "import": {
          "types": "./dist/main.d.ts",
          "default": "./dist/main.js",
        },
      },
      "./styles.css": "./dist/style.css",
    },
    // Keep main/types for backward compat with older tools
    "main": "dist/main.js",
    "types": "dist/main.d.ts",
  }
  ```

  > Note: We intentionally only expose `"."` and `"./styles.css"` — not per-component paths. The consumer API stays as `import { X } from '@iress-oss/ids-components'`. The `preserveModules` output from Phase 1 lets the bundler do sub-module pruning internally.

- [ ] Verify TypeScript resolution works with `moduleResolution: "bundler"` and `"node16"`
- [ ] Test that `import { IressButton } from '@iress-oss/ids-components'` still resolves correctly in a consumer project

#### Validation

- [ ] Run `tsc --noEmit` in a test consumer project to verify types resolve
- [ ] Verify Storybook still works (it imports from the source, not dist, but confirm)

---

### Phase 3: Fix Internal Imports to Bypass Barrels

**Impact: HIGH | Effort: MEDIUM | Risk: LOW**

Change cross-component imports from barrel paths (`../Icon`) to direct file paths (`../Icon/Icon`). This breaks the transitive dependency chains where importing one component pulls in all siblings and their styles.

#### Current Pattern (causes bloat)

```ts
// Alert.tsx — imports from barrel
import { IressButton, IressCloseButton } from '../Button';
// Resolves to Button/index.ts → exports Button + CloseButton + button recipe styles
```

#### Target Pattern (precise imports)

```ts
// Alert.tsx — imports from direct files
import { IressButton } from '../Button/Button';
import { IressCloseButton } from '../Button/CloseButton/CloseButton';
```

#### Changes

- [ ] **Audit all component .tsx files** for imports from sibling component barrel paths (`../ComponentName` that resolve to `index.ts`)
- [ ] **Update imports** to point directly to the source file (e.g. `../Icon/Icon` instead of `../Icon`)
- [ ] **Key files to update** (based on analysis — these import the most from other barrels):
  - `Alert.tsx` — imports Button, Icon, Text via barrels
  - `Button.tsx` — imports Spinner, Icon, Tooltip via barrels
  - `Modal.tsx` — imports Button, Icon, Text via barrels
  - `Provider.tsx` — imports Modal, Toaster, Slideout, Icon via barrels
  - `Autocomplete.tsx` — imports Popover, Input, Icon, Select, Readonly, Alert via barrels
  - `Select.tsx` and related — imports Popover, Input, Icon via barrels
  - All other components that import `IressIcon` from `../Icon`
- [ ] **Do NOT change** barrel `index.ts` files or `main.ts` — only change internal `.tsx` implementation imports
- [ ] **Type-only imports** can stay as barrel imports (they are erased at build time):
  ```ts
  import type { IressIconProps } from '../Icon'; // OK — erased at build
  import { IressIcon } from '../Icon/Icon'; // Changed — runtime import
  ```

#### Validation

- [ ] Run `yarn workspace @iress-oss/ids-components run typecheck` — all types resolve
- [ ] Run `yarn test:components` — all tests pass
- [ ] Build and verify dist output hasn't changed in structure
- [ ] Spot-check a few dist files to confirm they only import what they need

---

### Phase 4: Named Exports in main.ts

**Impact: MEDIUM | Effort: SMALL | Risk: LOW**

Replace `export *` with explicit named exports. This gives bundlers a clear, finite list of what each re-export provides, rather than forcing them to resolve star exports through multiple barrel layers.

#### Changes

- [ ] **`packages/components/src/main.ts`** — Replace star exports with named exports:

  ```ts
  // BEFORE
  export * from './components/Button';

  // AFTER
  export {
    IressButton,
    type IressButtonProps,
  } from './components/Button/Button';
  export {
    IressCloseButton,
    type IressCloseButtonProps,
  } from './components/Button/CloseButton/CloseButton';
  export { button } from './styled-system/recipes/button';
  ```

- [ ] Repeat for all ~50 component re-exports and ~7 pattern re-exports
- [ ] Keep shared exports (constants, enums, interfaces, types, hooks) — these can remain as `export *` since they're leaf modules with no transitive deps
- [ ] **Consider writing a codegen script** (`scripts/generate-main-exports.ts`) that reads component source files and auto-generates the named export list — prevents this from going stale as components are added/removed

#### Validation

- [ ] Run `yarn workspace @iress-oss/ids-components run typecheck`
- [ ] Verify no public exports were accidentally dropped (compare before/after with `tsc --declaration`)
- [ ] Run Storybook to confirm all component imports still resolve

---

### Phase 5: Externalize Heavy Dependencies (Build Only)

**Impact: MEDIUM | Effort: SMALL | Risk: LOW**

Mark large dependencies as `external` in the Vite/Rollup build config so they are **not bundled into the dist output**, but **keep them as regular `dependencies`** in package.json so consumers still get them installed automatically. This is the standard approach used by most component libraries — it avoids duplicating dependency code inside the library bundle while requiring zero changes from consumers.

> **Why NOT move to peerDependencies?** Today these are regular `dependencies` and consumers get them automatically. Moving them to `peerDependencies` (even optional) would force consumers to add new packages to their own `package.json` — that's a consumer-side breaking change. We only want to **externalize at build time** so the bundled code references these packages as imports rather than inlining them. The consumer's bundler can then tree-shake unused imports from these external packages independently.

#### Candidates

| Dependency                  | Size (approx) | Used By                                | Action                                               |
| --------------------------- | ------------- | -------------------------------------- | ---------------------------------------------------- |
| `@tanstack/react-table`     | ~50KB         | Table only                             | Externalize in build                                 |
| `@floating-ui/react`        | ~30KB         | Popover, Tooltip, Select, Autocomplete | Externalize in build                                 |
| `material-symbols`          | ~15KB         | Icon                                   | Externalize in build                                 |
| `fuzzysort`                 | ~5KB          | Autocomplete                           | Externalize in build                                 |
| `query-selector-shadow-dom` | ~3KB          | Shadow pattern                         | Externalize in build                                 |
| `use-debounce`              | ~2KB          | Autocomplete                           | Externalize in build (tiny, but still best practice) |

#### Changes

- [ ] **`packages/components/vite.config.ts`** — Add all production deps to `external` array:
  ```ts
  external: [
    // Existing
    'react', 'react-dom', 'react-dom/client', 'react/jsx-runtime',
    'react-hook-form',
    // Externalize all production dependencies (keeps them as imports,
    // not bundled inline — consumers get them via normal npm install)
    '@tanstack/react-table',
    '@floating-ui/react',
    '@fortawesome/fontawesome-common-types',
    'material-symbols',
    'fuzzysort',
    'query-selector-shadow-dom',
    'use-debounce',
  ],
  ```
- [ ] **Keep `dependencies` in package.json unchanged** — consumers still get everything installed automatically via `npm install @iress-oss/ids-components`, no action needed on their side
- [ ] Verify that dist output files contain `import ... from '@tanstack/react-table'` (external reference) instead of inlined TanStack code

#### Why This Matters for Tree-Shaking

Currently, `@tanstack/react-table` code is **copied into the IDS dist bundle**. Even with `preserveModules` (Phase 1), the consumer's bundler sees this inlined code as part of IDS — it can't tree-shake TanStack internals because they've lost their original module boundaries.

After externalizing, the consumer's bundler resolves `@tanstack/react-table` from `node_modules` directly, getting the original package with its own `exports` field, `sideEffects` declarations, and module structure — enabling full tree-shaking of unused TanStack features.

#### Validation

- [ ] Build succeeds — dist files reference external packages as imports
- [ ] `npm install @iress-oss/ids-components` in a fresh consumer project still installs all deps automatically (no consumer changes)
- [ ] Consumer using `IressButton` (no Table) → `@tanstack/react-table` code is tree-shaken by consumer's bundler
- [ ] Consumer using `IressTable` → works correctly with TanStack resolved from node_modules
- [ ] Bundle size comparison: IDS dist should be smaller (no inlined third-party code)

---

### Phase 6 (Optional): ESLint Rule to Prevent Barrel Regressions

**Impact: LOW | Effort: SMALL | Risk: NONE**

Add a lint rule to prevent internal component files from importing through barrel `index.ts` files, so Phase 3 improvements don't regress over time.

#### Changes

- [ ] Add `eslint-plugin-no-barrel-files` or equivalent to the components package
- [ ] Configure rule to flag imports like `from '../Icon'` or `from '@components/Icon'` inside component `.tsx` files (but allow them in `main.ts` and `index.ts` barrels)
- [ ] Alternatively, add `no-restricted-imports` patterns for common barrel paths

#### Validation

- [ ] Lint passes on current codebase (after Phase 3 changes)
- [ ] Intentionally adding a barrel import triggers lint error

---

## Execution Order & Dependencies

```
Phase 1 (preserveModules)
    ↓
Phase 2 (exports field)     ← depends on Phase 1 output structure
    ↓
Phase 3 (fix internal imports) ← independent, can start alongside Phase 1
    ↓
Phase 4 (named exports)     ← builds on Phase 3 (uses direct file paths)
    ↓
Phase 5 (externalize deps)  ← independent, can be done anytime
    ↓
Phase 6 (lint rule)          ← depends on Phase 3 being complete
```

**Phases 1+2** can be done together as a single PR.
**Phase 3** is the largest change (many files) — best as its own PR.
**Phase 4** depends on Phase 3 paths — same or follow-up PR.
**Phase 5** is independent — can be its own PR at any time.
**Phase 6** is a safeguard — do after Phase 3 merges.

---

## Measuring Success

### Before (Baseline)

Before starting, capture baseline metrics:

- [ ] Run `vite-bundle-visualizer` on the current build output
- [ ] Create a minimal consumer app that imports only `IressButton` and measure the bundle size
- [ ] Note which modules are included in the consumer bundle

### After (Target)

- [ ] Consumer importing only `IressButton` should include ≤ Button + Icon + Spinner + Tooltip (its actual runtime deps), not the entire library
- [ ] Consumer importing nothing from `@iress-oss/ids-components` should have 0 bytes from the package in their bundle
- [ ] Total package size on npm may increase slightly (more files in dist) but consumer bundle sizes should decrease significantly

### Metrics to Track

| Metric                                  | Before | After Phase 1+2 | After Phase 3+4 | After Phase 5 |
| --------------------------------------- | ------ | --------------- | --------------- | ------------- |
| Consumer bundle (Button only)           | TBD    | TBD             | TBD             | TBD           |
| Consumer bundle (full app)              | TBD    | TBD             | TBD             | TBD           |
| npm package size                        | TBD    | TBD             | TBD             | TBD           |
| Number of modules in Button-only bundle | TBD    | TBD             | TBD             | TBD           |

---

## Risk Mitigation

| Risk                                                                         | Mitigation                                                                                                           |
| ---------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `preserveModules` breaks CSS output                                          | Test CSS output thoroughly; the `preservePandaLayerDeclaration` plugin may need adjustments for new output structure |
| DTS generation breaks with new module structure                              | Test `vite-plugin-dts` output; may need `rollupTypes: false` to preserve per-module declarations                     |
| Consumers using deep imports like `@iress-oss/ids-components/dist/...` break | The `exports` field can block unauthorized deep imports — need to check if any known consumers do this               |
| Phase 3 import changes cause circular dependency issues                      | Run build and typecheck after each component update; circular deps will surface as build errors                      |
| Externalized deps not resolved correctly                                     | Keep them as regular `dependencies` in package.json — consumer's `npm install` handles resolution automatically      |

---

## Relationship to Existing Work

- **[css-bundle-optimisation.md](css-bundle-optimisation.md)** — Focuses on reducing the CSS output size (fewer atomic classes). This plan focuses on JS tree-shaking. They are complementary and can proceed in parallel.
- **[theme-preset-extraction.plan.md](theme-preset-extraction.plan.md)** — Extracting the Panda theme preset to a standalone package. This plan's Phase 1 (`preserveModules`) should be compatible with the extracted theme preset since CSS generation happens at build time before Vite runs.
