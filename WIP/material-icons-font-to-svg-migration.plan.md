# Material Icons: Font → SVG Migration Plan (v5)

## Background

The design system currently uses **Material Symbols Rounded** via Google Fonts CDN as a **web font**. Icons render by placing the icon name as text content inside a `<span>` with the `material-symbols-rounded` CSS class. The font is loaded dynamically with a custom subsetting mechanism (`useDynamicFontSubsetting`) that requests only the glyphs in use.

### Current Architecture

```
IressIconProvider (context)
  └─ useDynamicFontSubsetting (fetches font CSS from Google CDN)
  └─ FontLoader (injects <style> with @import into document head / shadow DOM)
  └─ IconContext (tracks registered icons, loading state)

IressIcon
  └─ Reads IconContext
  └─ Registers icon name on mount
  └─ Renders: <span class="material-symbols-rounded">{iconName}</span>
```

### Key Files

| File                                     | Purpose                                                       |
| ---------------------------------------- | ------------------------------------------------------------- |
| `Icon/Icon.tsx`                          | Main icon component (renders `<span>` with icon name as text) |
| `Icon/IconProvider.tsx`                  | Context + dynamic font loading orchestration                  |
| `Icon/Icon.styles.ts`                    | CVA styles including `fontFamily: 'Material Symbols Rounded'` |
| `Icon/Icon.constants.ts`                 | Font config (weight: 300, grade: 0, opticalSize: 36)          |
| `Icon/hooks/useDynamicFontSubsetting.ts` | Dynamic font subsetting hook (fetch + Font Loading API)       |
| `Icon/components/FontLoader.tsx`         | Injects font stylesheet via `createPortal`                    |
| `Icon/helpers/iconMapping.ts`            | FA → Material name mapping                                    |
| `Icon/helpers/getMaterialSymbolsList.ts` | Extracts all icon names from type definitions                 |

### Current Dependencies

- `material-symbols: 0.40.2` — provides TypeScript types (`MaterialSymbol`) only
- Google Fonts CDN at runtime — `https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:...`

---

## Problem Statement

The font-based approach has several limitations:

1. **CSP (Content Security Policy) failures** — `useDynamicFontSubsetting` uses `fetch()` to download CSS from Google Fonts CDN, then injects it via `document.createElement('style')`. This violates `style-src` and `connect-src` CSP directives. Consumers must whitelist Google Fonts domains and provide SHA hashes for the dynamically-generated style content, which changes every time the icon subset changes. This is a **blocking issue** for enterprise deployments.
2. **Network dependency** — Requires internet to fetch font from Google CDN
3. **Loading flash** — Icons are invisible until font loads (FOIT), causing layout shift
4. **No offline support** — Fails in air-gapped/restricted network environments
5. **Non-deterministic versioning** — Google CDN can update fonts without notice
6. **Shadow DOM complexity** — Font styles must be injected into both document head and shadow roots via `FontLoader` + `createPortal`, and the `Shadow` component already has CSP nonce workarounds
7. **Large baseline payload** — Full font is ~1.4MB; subsetting reduces but adds complexity
8. **Text rendering quirks** — Icons render as ligature text, causing accessibility & copy-paste issues
9. **Testing difficulty** — Font loading is async and hard to assert in unit tests

### CSP Violation Details

The current flow that breaks CSP:

```
1. useDynamicFontSubsetting calls fetch(googleFontsUrl)  → violates connect-src
2. Response CSS is wrapped in @layer and injected via style.textContent  → violates style-src
3. The CSS contains @font-face with src: url() to font files  → violates font-src
4. FontLoader uses createPortal with <style> containing @import  → violates style-src
```

Moving to inline SVGs eliminates **all four CSP violation vectors** since SVGs are bundled in JS at build time — no runtime fetches, no dynamic style injection, no font loading.

---

## Proposed Solution

Migrate from the **font-based** approach to **inline SVG** by generating lazy-loaded React components directly from Google's official **`@material-symbols/svg-300`** package at build time.

### Why This Approach?

After evaluating multiple approaches (Iconify wrappers, `@mui/icons-material`, custom SVGR pipelines, companion packages), generating from official Google SVGs provides the best balance of control, simplicity, and maintainability:

- **Official Google source** — `@material-symbols/svg-300` is the canonical source for Material Symbols at weight 300 (our exact font weight)
- **Exact naming match** — Icon names are `snake_case` matching Google's Material Symbols icon finder and our current API
- **Simple generation** — All 7,596 SVGs have identical structure (single `<path>`, consistent `viewBox="0 -960 960 960"`)
- **Tree-shakable output** — Per-icon ES modules mean consumers only bundle icons they use
- **No third-party runtime** — Pure React components, no external library dependencies
- **Full control** — We own the generation, rendering, and naming conventions
- **Both variants included** — Outline (`.svg`) and filled (`-fill.svg`) versions for all 3,798 unique icons

### `@material-symbols/svg-300` Package Details

**Package:** `@material-symbols/svg-300` v0.40.2 (published 2025-12-09)  
**Author:** marella (same author as `material-symbols` types package)  
**Source:** Auto-generated from Google's official Material Symbols repository  
**License:** Apache 2.0

**Contents:**

- **7,596 SVG files** in the `rounded/` directory (matches our "Material Symbols Rounded" font)
- **3,798 unique icons** × 2 variants (outline + filled)
- **Naming convention:**
  - Outline: `{snake_case_name}.svg` (e.g., `search.svg`, `check_circle.svg`)
  - Filled: `{snake_case_name}-fill.svg` (e.g., `search-fill.svg`, `check_circle-fill.svg`)
- **Consistent SVG structure:** All SVGs are `<svg xmlns="..." width="48" height="48" viewBox="0 -960 960 960"><path d="..."/></svg>`
- **Single path elements only:** No circles, rects, polygons, or multi-path SVGs
- **Package size:** 89MB on disk (devDependency only — generated output is tiny)

**Why NOT `@material-design-icons/svg`?**

`@material-design-icons/svg` (v0.14.15) is the older **Material Icons** set with only 2,122 icons. Our design system uses the newer **Material Symbols** set. The README of `@material-design-icons/svg` explicitly says: "For Material Symbols, see `material-symbols`" — and `@material-symbols/svg-300` is that package. Critically, `@material-design-icons/svg` is **missing** icons like `progress_activity` that our Spinner component requires.

### How It Works

**Build-time generation script:**

1. Read all SVGs from `@material-symbols/svg-300/rounded/` directory
2. Extract the `<path d="...">` data from each SVG
3. Generate per-icon TypeScript modules exporting the path data and metadata
4. Output tree-shakable ES modules to `src/components/Icon/generated/`

**Consumer API — IDENTICAL to today:**

```tsx
<IressIcon name="search" />
<IressIcon name="star" filled />
<IressIcon name="close" spin />
<IressIcon name="check_circle" />  // Uses snake_case as today
```

**Under the hood:**

```tsx
// Generated file: src/components/Icon/generated/search.tsx
import React from 'react';

export const SearchIcon = () => (
  <svg
    viewBox="0 -960 960 960"
    width="100%"
    height="100%"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M784-120L532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
  </svg>
);

export default SearchIcon;

// IressIcon dynamically imports the React component:
const IconSvg = lazy(
  () => import(`./generated/${iconName}${filled ? '-fill' : ''}`),
);
// Renders: <styled.span><IconSvg /></styled.span>
```

**Bundle optimization:**

- **Per-icon modules** are tree-shakable — consumers only pay for icons they use
- **Lazy loading** via dynamic `import()` — icons not rendered = not bundled
- **Tiny per-icon cost:** ~600 bytes per icon module (React component with inline SVG)
- **Internal icons automatically bundled:** ~17 icon files used by design system components ≈ ~10KB total

### Previous Approaches Evaluated & Rejected

| Approach                                         | Why Rejected                                                                                                                         |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------ |
| Iconify (`@iconify/react`) wrapper               | Icon naming differs from Google's official names (`cancel-outline-rounded` vs `cancel.svg`), adds external dependency trust concerns |
| Custom `@iress-oss/ids-icons` companion package  | Requires building and maintaining a separate package, more complex monorepo setup, slower iteration                                  |
| `icon={Component}` prop API                      | Breaks the `name` string prop — significant migration burden on consumers                                                            |
| `@mui/icons-material`                            | Hard dependency on `@mui/material` — cannot be used standalone, brings heavy framework                                               |
| `react-material-symbols`, `material-icons-react` | Still font-based (loads font CSS), doesn't solve CSP violations                                                                      |
| `@material-design-icons/svg` direct              | Wrong icon set (Material Icons, not Material Symbols), missing icons like `progress_activity`, fewer icons (2,122 vs 3,798)          |
| Consumer registration (`registerIcon`)           | Too burdensome — consumers don't have a fixed list of icons upfront                                                                  |

**Why generation is better than runtime approaches:**

- **No naming translation** — Exact match with Google's icon finder and our current `MaterialSymbol` type
- **Build-time validation** — Missing icons fail at build, not runtime
- **TypeScript autocomplete** — All icon names known at compile time
- **No external runtime** — Pure React, no library dependencies
- **Full control** — We decide rendering approach, sizing, transforms, aria handling

---

## Architecture Design

### Design Goal

**Preserve the `name` string prop** as the primary API: `<IressIcon name="search" />`. This is the DX consumers know and love — no import gymnastics, no component props, no breaking changes.

### New Architecture

```
@material-symbols/svg-300 (devDependency — source SVGs)
  └─ 7,596 SVG files in rounded/ directory
  └─ Used only at build time (not shipped to consumers)

Build Script (scripts/generate-icons.ts)
  └─ Reads SVGs from @material-symbols/svg-300/rounded/
  └─ Extracts <path d="..."> data from each SVG
  └─ Generates per-icon TS modules → src/components/Icon/generated/
  └─ Runs as part of build process (yarn build)

Generated Icon Components (src/components/Icon/generated/)
  └─ {icon_name}.tsx — exports React component rendering <svg> with path data
  └─ {icon_name}-fill.tsx — exports filled variant React component
  └─ Tree-shakable, lazy-loadable ES modules
  └─ ~600 bytes per icon (React component with inline SVG)

IressIcon (updated component)
  └─ Accepts name prop (string) — same API as today
  └─ Dynamically imports icon component: import(`./generated/${name}${filled ? '-fill' : ''}`)
  └─ Lazy loads with React.lazy() + Suspense
  └─ Renders: <styled.span><IconSvg /></styled.span>
  └─ Wrapper span handles: flip, rotate, spin, ARIA attributes
  └─ Keeps FA → Material name mapping intact

IressIconProvider (optional)
  └─ Only needed for Font Awesome legacy support
  └─ No longer manages Material Symbol loading state
```

### How IressIcon Renders SVG

```tsx
// Icon/Icon.tsx — updated implementation
import { styled } from '@/styled-system/jsx';
import { icon } from './Icon.styles';
import { lazy, Suspense } from 'react';
import type { MaterialSymbol } from 'material-symbols';

export const IressIcon = ({
  name,
  filled,
  flip,
  rotate,
  spin,
  screenreaderText,
  className,
  ...restProps
}: IressIconProps) => {
  // Handle FA → Material name mapping (existing iconMapping.ts)
  const materialName = faToMaterialMap[name] ?? name;

  // Dynamically import the icon component
  const IconSvg = lazy(() =>
    import(`./generated/${materialName}${filled ? '-fill' : ''}`).catch(() => {
      console.warn(`Icon "${materialName}" not found`);
      return import('./generated/help'); // Fallback icon
    }),
  );

  return (
    <Suspense fallback={<span className={icon({ loading: true })} />}>
      <styled.span
        className={cx(
          className,
          icon({ flip, rotate, spin }),
          GlobalCSSClass.Icon,
        )}
        role={screenreaderText ? 'img' : 'presentation'}
        aria-label={screenreaderText}
        aria-hidden={!screenreaderText}
        {...restProps}
      >
        <IconSvg />
      </styled.span>
    </Suspense>
  );
};
```

**Generated icon component structure:**

```tsx
// generated/search.tsx (auto-generated by build script)
import React from 'react';

export const SearchIcon = () => (
  <svg
    viewBox="0 -960 960 960"
    width="100%"
    height="100%"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M784-120L532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
  </svg>
);

export default SearchIcon;
```

**Note:** Generated files include `import React from 'react'` for JSX support. Alternatively, configure `tsconfig.json` with `"jsx": "react-jsx"` to use the automatic JSX runtime (React 17+).

### Generation Script Design

**Location:** `scripts/generate-icons.ts`

**Purpose:** Read SVGs from `@material-symbols/svg-300`, extract path data, generate React component modules

**Key functions:**

1. **`readSVGFiles()`** — Read all SVG files from `node_modules/@material-symbols/svg-300/rounded/`
2. **`extractPathData(svgContent)`** — Parse SVG XML, extract `<path d="...">` and `viewBox` attributes
3. **`generateIconComponent(iconName, pathData, viewBox, filled)`** — Generate TSX module with React component
4. **`writeGeneratedFiles()`** — Write all generated components to `src/components/Icon/generated/`
5. **`generateIndexFile()`** — Create `generated/index.ts` with all component exports for type checking

**Script execution:**

- Runs as part of `yarn build` in components package
- Can be run manually: `yarn generate:icons`
- Runs in CI to ensure generated files are up to date

**Parse SVG example:**

```typescript
// Input: <svg xmlns="..." width="48" height="48" viewBox="0 -960 960 960"><path d="M784-120L532..."/></svg>
// Output: { path: 'M784-120L532...', viewBox: '0 -960 960 960' }

import { parseStringPromise } from 'xml2js';

const extractPathData = async (svgContent: string) => {
  const parsed = await parseStringPromise(svgContent);
  const svgElement = parsed.svg;
  const pathElement = svgElement.path[0];
  const pathData = pathElement.$.d;
  const viewBox = svgElement.$.viewBox;

  return { path: pathData, viewBox };
};
```

### Generation Script Example

```typescript
// scripts/generate-icon-modules.ts
import fs from 'fs/promises';
import path from 'path';
import xml2js from 'xml2js';

async function generateIconModules() {
  const svgDir = path.resolve(
    __dirname,
    '../node_modules/@material-symbols/svg-300/rounded',
  );
  const outputDir = path.resolve(
    __dirname,
    '../packages/components/src/components/Icon/generated',
  );

  // Read all SVG files
  const files = await fs.readdir(svgDir);
  const svgFiles = files.filter((f) => f.endsWith('.svg'));

  console.log(`Found ${svgFiles.length} SVG files`);

  // Clear output directory
  await fs.rm(outputDir, { recursive: true, force: true });
  await fs.mkdir(outputDir, { recursive: true });

  // Process each SVG
  for (const file of svgFiles) {
    const svgPath = path.join(svgDir, file);
    const svgContent = await fs.readFile(svgPath, 'utf-8');

    // Parse SVG to extract path data
    const parser = new xml2js.Parser();
    const result = await parser.parseStringPromise(svgContent);
    const pathData = result.svg.path[0].$.d;
    const viewBox = result.svg.$.viewBox;

    // Determine icon name and variant
    const isFilled = file.endsWith('-fill.svg');
    const baseName = file.replace(/-fill\.svg$/, '').replace(/\.svg$/, '');

    // Convert to PascalCase for component name
    const componentName =
      baseName
        .split('_')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join('') + 'Icon';

    // Generate React component
    const outputFile = path.join(outputDir, file.replace('.svg', '.tsx'));
    const tsxContent = `// Auto-generated from @material-symbols/svg-300
import React from 'react';

export const ${componentName} = () => (
  <svg
    viewBox="${viewBox}"
    width="100%"
    height="100%"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="${pathData}" />
  </svg>
);

export default ${componentName};
`;

    await fs.writeFile(outputFile, tsxContent, 'utf-8');
  }

  console.log(`✅ Generated ${svgFiles.length} icon components`);
}

generateIconModules().catch(console.error);
```

### Updated Icon Component

```tsx
// Icon/Icon.tsx
import React, { Suspense, lazy } from 'react';
import { styled } from '@/styled-system/jsx';
import { icon } from './Icon.styles';

interface IressIconProps {
  name: string;
  filled?: boolean;
  flip?: 'horizontal' | 'vertical' | 'both';
  rotate?: 0 | 90 | 180 | 270;
  spin?: boolean;
  screenreaderText?: string;
}

export const IressIcon: React.FC<IressIconProps> = ({
  name,
  filled = false,
  flip,
  rotate,
  spin,
  screenreaderText,
  className,
  ...restProps
}) => {
  // Lazy load the icon SVG component
  const IconSvg = lazy(() =>
    import(`./generated/${name}${filled ? '-fill' : ''}`).catch(() => {
      console.warn(`Icon "${name}" not found`);
      return import('./generated/help'); // Fallback icon
    }),
  );

  return (
    <Suspense fallback={<span className={icon({ loading: true })} />}>
      <styled.span
        className={cx(className, icon({ flip, rotate, spin }))}
        role={screenreaderText ? 'img' : 'presentation'}
        aria-label={screenreaderText}
        aria-hidden={!screenreaderText}
        {...restProps}
      >
        <IconSvg />
      </styled.span>
    </Suspense>
  );
};
```

**Key Features:**

- **Lazy Loading:** `React.lazy()` + `Suspense` ensures only used icons are bundled
- **Tree-Shaking:** Vite/Rollup will eliminate unused imports
- **CSP Compliant:** All SVG data is inlined, no external requests
- **Type-Safe:** Generated React components with proper TypeScript types
- **Fallback Handling:** Missing icons fall back to `help` icon
- **Minimal Bundle Impact:** Each icon component is ~600 bytes
- **Idiomatic React:** Standard component pattern works with all React tooling

---

## Implementation Checklist

### Phase 1: Install Dependencies & Setup

- [ ] Install `@material-symbols/svg-300` as a **devDependency** of `@iress-oss/ids-components`
- [ ] Install `xml2js` as a **devDependency** (for parsing SVG XML during generation)
- [ ] Install `@types/xml2js` as a **devDependency**
- [ ] Verify packages install correctly
- [ ] Create `src/components/Icon/generated/` directory (will hold generated icon modules)
- [ ] Add `generated/` to `.gitignore` (optional — or commit generated files for faster builds)
- [ ] Verify `tsconfig.json` JSX configuration:
  - Either uses `"jsx": "react-jsx"` (automatic runtime, React 17+)
  - Or generated files will include `import React from 'react'` explicitly

### Phase 2: Icon Generation Script

- [ ] Create `scripts/generate-icons.ts`:
  - `readSVGFiles()` — Read all SVGs from `node_modules/@material-symbols/svg-300/rounded/`
  - `extractPathData(svgContent)` — Parse SVG XML, extract `<path d="...">` and `viewBox`
  - `generateIconComponent(iconName, pathData, viewBox, filled)` — Generate TSX React component
  - `writeGeneratedFiles()` — Write all 7,596 icon components to `src/components/Icon/generated/`
  - `generateIndexFile()` — Create `generated/index.ts` with type-only exports for validation
  - Handle both outline (`.svg`) and filled (`-fill.svg`) variants
  - Log progress/stats (e.g., "Generated 7,596 icon components")
- [ ] Add `generate:icons` script to `packages/components/package.json`:
  ```json
  {
    "scripts": {
      "generate:icons": "tsx scripts/generate-icons.ts",
      "prebuild": "yarn generate:icons"
    }
  }
  ```
- [ ] Test script execution: `yarn generate:icons`
- [ ] Verify generated files appear in `src/components/Icon/generated/`
- [ ] Verify generated components export React components with inline SVG elements

### Phase 3: Icon Component Migration

- [ ] Update `IressIcon` to render lazy-loaded SVG components instead of font-based `<span>` with text
- [ ] Replace font-based rendering with React component rendering:
  - Remove `<styled.span>{materialIconName}</styled.span>`
  - Add lazy loading with `React.lazy(() => import(\`./generated/${iconName}\`))`
  - Render `<styled.span><IconSvg /></styled.span>` (wrapper span handles transforms)
- [ ] Handle dynamic import of icon components:
  - Use `Suspense` with loading fallback
  - Add `.catch()` for missing icons with fallback to `help` icon
  - Map `name` + `filled` props to correct file path: `{name}` or `{name}-fill`
  - Keep FA → Material name mapping working (`iconMapping.ts`)
- [ ] Update `Icon.styles.ts`:
  - Remove font-specific styles (`fontFamily`, `fontWeight`, `fontFeatureSettings`, `materialSymbols`, ligature)
  - Keep `flip`, `rotate`, `spin` transform styles (CSS-based, same as before)
  - Keep `loading` variant for `React.lazy()` Suspense fallback
  - Ensure wrapper span has `display: inline-block`, `width: 1em`, `height: 1em`
  - Add `svg` element styling if needed (`fill: currentColor` already in generated SVG)
- [ ] Keep Font Awesome rendering path unchanged (legacy support)
- [ ] Update `IressIconProps` types — no API changes, same props as today

### Phase 4: Internal Component Verification

No code changes needed for internal components! The `name` prop API is preserved. **All internal usage automatically switches to SVG rendering.** Verify each component still renders correctly:

- [ ] `Alert.tsx` (uses `cancel`, `info`, `check_circle`, `error`)
- [ ] `CloseButton.tsx` (uses `close`)
- [ ] `Autocomplete.tsx` (uses `search`)
- [ ] `Spinner.tsx` (uses `progress_activity`)
- [ ] `SelectSearchInput.tsx` (uses `search`)
- [ ] `SelectTags.tsx` (uses `expand_circle_down`)
- [ ] `SelectCreate.tsx` (uses `add`)
- [ ] `FieldFooter.tsx` (uses `cancel`)
- [ ] `FieldHint.tsx` (uses `info`)
- [ ] `MenuGroup.tsx` (uses `keyboard_arrow_right`)
- [ ] `ContextualMenu.tsx` (uses `more_vert`)
- [ ] `DropdownMenu.tsx` (uses `search`)

### Phase 5: IconProvider Simplification

- [ ] Remove `useDynamicFontSubsetting` hook entirely (no longer needed)
- [ ] Remove `registerIcon` / `isIconLoaded` from `IconContext` (icons are bundled, always "loaded")
- [ ] Remove Google Fonts CDN URL construction for Material Symbols
- [ ] Remove `FontLoader` for Material Symbols (keep for Font Awesome legacy only)
- [ ] Simplify `IressIconProvider` — only needed for Font Awesome legacy
- [ ] Remove `noSubsetting` prop (no longer applicable to Material Symbols)
- [ ] Remove `container` prop for Material Symbols (SVG rendering, no shadow DOM font injection needed)
- [ ] Update provider documentation — clarify it's FA-only now

### Phase 6: Testing & Validation

- [ ] Update `Icon.test.tsx` — test that `name` prop renders inline `<svg>` with path data
- [ ] Add test: icons render with correct viewBox and path data
- [ ] Add test: `filled` prop renders the filled variant (imports `{name}-fill.ts`)
- [ ] Add test: `flip`, `rotate`, `spin` props work correctly (CSS transforms)
- [ ] Add test: `screenreaderText` adds proper aria attributes
- [ ] Add test: FA name mapping still works
- [ ] Update `IconProvider.test.tsx` — remove Material Symbol font loading assertions
- [ ] Remove `useDynamicFontSubsetting.test.ts` entirely
- [ ] Update `FontLoader.test.tsx` — ensure FA path still works
- [ ] Visual regression test via Storybook — compare icon appearance before/after
- [ ] Run full test suite: `yarn test:components`
- [ ] Verify CSP compliance — no `fetch()`, no dynamic `<style>`, no `@import`, no external URLs
- [ ] Test lazy loading behavior — icons should render after Suspense boundary resolves

### Phase 7: Stories & Documentation

- [ ] Update `Icon.stories.tsx` — showcase `name` prop (same API, now SVG-backed)
- [ ] Add story showing all internal icons rendering
- [ ] Add story showing `filled` variant toggle
- [ ] Update `IconProvider.stories.tsx` — simplify, only show FA legacy usage
- [ ] Update `Icon.docs.mdx`:
  - Document the generation-based approach
  - Explain that all 3,798 icons are available by name
  - No consumer registration needed — all icons auto-generated
  - Lazy loading means consumers only bundle icons they render

### Phase 8: Cleanup

- [ ] Remove `useDynamicFontSubsetting.ts` hook
- [ ] Remove `getMaterialSymbolsList.ts`
- [ ] Remove Google Fonts CDN references entirely for Material Symbols
- [ ] Remove `material-symbols` npm dependency (types no longer needed — generated files provide types)
- [ ] Remove `MATERIAL_SYMBOLS.className` usage from Icon rendering
- [ ] Clean up `Icon.constants.ts` — remove font-specific constants (`family`, `weight`, etc.)
- [ ] Update `package.json` — remove unused deps, add `@material-symbols/svg-300` as devDependency
- [ ] Remove `FontLoader` component if no longer used by FA either (or mark as legacy)

---

## Icons Used Internally (Auto-Generated)

These Material Symbol names are used directly by design system components. **No special handling needed** — they're generated like all other icons and lazy-loaded on first use:

| #   | Icon Name              | Filled Variant? | Used By                                       |
| --- | ---------------------- | --------------- | --------------------------------------------- |
| 1   | `add`                  | No              | SelectCreate                                  |
| 2   | `cancel`               | Yes             | Alert, FieldFooter                            |
| 3   | `check`                | No              | (via FA mapping)                              |
| 4   | `check_circle`         | Yes             | Alert                                         |
| 5   | `close`                | No              | CloseButton                                   |
| 6   | `error`                | Yes             | Alert                                         |
| 7   | `expand_circle_down`   | Yes             | SelectTags                                    |
| 8   | `info`                 | Yes             | Alert, FieldHint                              |
| 9   | `keyboard_arrow_right` | No              | MenuGroup                                     |
| 10  | `more_vert`            | No              | ContextualMenu                                |
| 11  | `progress_activity`    | No              | Spinner                                       |
| 12  | `search`               | No              | Autocomplete, SelectSearchInput, DropdownMenu |

**Total generated files for internal icons: ~17 modules** (12 base icons + 5 filled variants)

- Icons without filled variants: 7 (add, check, close, keyboard_arrow_right, more_vert, progress_activity, search)
- Icons with filled variants: 5 × 2 files = 10 (cancel, check_circle, error, expand_circle_down, info)
- Total: 7 + 10 = 17 files

Each generated icon module is ~600 bytes. Internal icons lazy-loaded on demand: **~10KB total** (only if all are rendered).

---

## New Dependencies

| Package                     | Type          | Purpose                                      | Size                 |
| --------------------------- | ------------- | -------------------------------------------- | -------------------- |
| `@material-symbols/svg-300` | devDependency | Source SVGs for icon generation (build-time) | 89MB (not shipped)   |
| `xml2js`                    | devDependency | SVG parsing during generation (build-time)   | ~100KB (not shipped) |
| `@types/xml2js`             | devDependency | TypeScript types for xml2js (build-time)     | ~10KB (not shipped)  |

### Dependencies to Remove

| Package                     | Reason                                                                                    |
| --------------------------- | ----------------------------------------------------------------------------------------- |
| `material-symbols` (0.40.2) | Only provided TypeScript types. Types now derived from generated icon modules themselves. |

---

## Bundle Size Impact

### Before (Font-Based)

- Runtime: 15-20KB per page (subsetted font via Google CDN)
- Full font fallback: ~1.4MB
- Network request required on every page load
- `useDynamicFontSubsetting` hook + Font Loading API overhead: ~3KB
- `material-symbols` types package in dependencies (0 runtime cost, types only)

### After (Generated SVG)

- Per-icon cost: ~600 bytes per icon module (path data + metadata)
- Internal 17 icon files (12 unique + 5 filled variants): ~10KB (lazy-loaded)
- Consumer arbitrary icons: automatically available, lazy-loaded, tree-shaken
- **Only icons actually rendered are bundled** — dynamic `import()` means unused icons add zero bytes
- Zero network requests
- Zero runtime dependencies
- Font CSS + font files removed entirely
- `useDynamicFontSubsetting` + Font Loading API overhead removed

**Net result:**

- **For minimal icon usage (1-5 icons):** ~3-5KB (down from ~18-23KB) — **~80% reduction**
- **For typical usage (10-15 icons):** ~6-10KB (down from ~18-23KB) — **~50% reduction**
- **For heavy usage (50+ icons):** ~30KB (down from ~1.4MB full font) — **~98% reduction**
- Plus elimination of all CSP violations and network dependency

---

## Migration Strategy for Consumers

### What Changes

1. **`IressIconProvider` API simplification:**
   - `noSubsetting` prop removed (no longer applicable)
   - `container` prop for shadow DOM font injection removed (SVGs are inline)
   - Provider becomes optional — only needed for Font Awesome legacy

2. **Icon rendering changes:**
   - Icons render as inline `<svg>` instead of `<span>` with text content
   - CSS selectors targeting `.material-symbols-rounded` will break
   - Copy-paste behavior changes (no ligature text content to copy)

### What Does NOT Change

- **`<IressIcon name="search" />` — same API, just works**
- **`<IressIcon name="close" />` — same API, just works**
- **`<IressIcon name="star" filled />` — same API, just works**
- **`<IressIcon name="check_circle" />` — same API, just works**
- **All 3,798 icons available by name — no registration, no imports needed by consumers**
- All `filled`, `flip`, `rotate`, `spin` props — same behavior
- FA icon names with auto-mapping — still works via `name` prop
- Font Awesome legacy path — unchanged
- All design system components (Alert, Spinner, etc.) — work without any consumer changes

### Consumer Migration Guide

```tsx
// FOR ALL CONSUMERS: Nothing changes at the API level!
// The `name` prop works exactly as before — all 3,798 icons available:

<IressIcon name="search" />      // ✅ Auto-generated, lazy-loaded
<IressIcon name="close" />       // ✅ Auto-generated, lazy-loaded
<IressIcon name="star" filled /> // ✅ Imports star-fill.ts, lazy-loaded
<IressIcon name="analytics" />   // ✅ Auto-generated, lazy-loaded
<IressIcon name="bar_chart" />   // ✅ Auto-generated, lazy-loaded

// ALL 3,798 Material Symbols available by name — no registration needed!
// Icons lazy-loaded on first use — unused icons = zero bundle cost

// ICONPROVIDER: No longer required for Material Symbols:
// BEFORE:
<IressIconProvider noSubsetting={false}>
  <App />
</IressIconProvider>

// AFTER:
<App />  // Just works — no provider needed for Material Symbols
// (Provider only needed if using Font Awesome legacy icons)
```

### For Consumers NOT Using Custom Icons

If you only use design system components (Alert, Button, Select, etc.) and don't render `<IressIcon>` directly, **no migration is needed at all**. Everything continues working.

### Breaking Changes

1. **`.material-symbols-rounded` CSS class removed** — Icons now render as `<svg>`, not `<span>`
   - **Impact:** Low — most consumers don't target this class
   - **Workaround:** Use `.ids-icon` global class instead (targets all icons)

2. **Copy-paste behavior** — Copying an icon no longer copies the icon name as text
   - **Impact:** Very Low — edge case, not common UX pattern
   - **Workaround:** None needed — icons are visual elements, not text

3. **`IressIconProvider` props removed:** `noSubsetting`, `container`
   - **Impact:** Low — provider is now optional for Material Symbols
   - **Workaround:** Remove these props from provider usage

4. **`ReactHookFormCompatibleRef.extras` removed** — The `extras` property (`additionalOnChangeProps`, `valueProp`) has been removed from the ref interface
   - **Impact:** Medium — consumers with custom form components using `extras` will break
   - **Workaround:** Handle `onChange` directly in your component instead of relying on `extras.additionalOnChangeProps`. For custom value props, pass the value through `onChange` as the second argument.

---

## Risk Assessment

| Risk                                       | Likelihood | Impact | Mitigation                                                                              |
| ------------------------------------------ | ---------- | ------ | --------------------------------------------------------------------------------------- |
| Visual regressions (SVG vs font rendering) | Medium     | Medium | Visual regression tests, side-by-side Storybook comparison, adjust viewBox if needed    |
| Consumers relying on font CSS classes      | Low        | Medium | Document as breaking change, provide `.ids-icon` alternative                            |
| Generation script failures in CI           | Low        | High   | Add script validation, fail build if generation fails, commit generated files as backup |
| SVG path data changes in upstream package  | Very Low   | Low    | Pin `@material-symbols/svg-300` version, update deliberately with testing               |
| Increased JS bundle size                   | Very Low   | Low    | Lazy loading ensures only rendered icons bundled; ~600 bytes per icon                   |
| Shadow DOM compatibility                   | Very Low   | Low    | Inline SVG — no cross-boundary font/style issues (already works)                        |
| Missing icon names at runtime              | Very Low   | Medium | All icons auto-generated from package; TypeScript catches typos at compile time         |
| Build time increases                       | Low        | Low    | Generation runs once per build; ~7,596 files processed in ~10-30 seconds                |

---

## Open Questions

1. **Should we commit generated files to git?**
   - **Option A (Recommended):** Commit generated files — faster consumer installs, no build-time dependency on `@material-symbols/svg-300`
   - **Option B:** Generate on every build — cleaner git history, but slower builds and install-time dependency
   - **Recommendation:** Option A — generated files are stable and rarely change

2. **Optical size / visual parity** — Current font uses `opsz: 36`, SVGs use default. Need to compare icons side-by-side in Storybook. May need to adjust SVG sizing or wrapper styles.

3. **Grade parameter** — Font supports `GRAD: 0`. SVGs are static — do we notice any visual difference?

4. **Missing icon fallback** — When a consumer uses `<IressIcon name="nonexistent_icon" />`, what should happen?
   - Option A: Render nothing (dynamic import fails silently)
   - Option B: Render a fallback placeholder icon (`help_outline` or `block`)
   - Option C: Log a console error with the missing icon name
   - **Recommendation:** Option C — helpful developer experience, but don't crash the app

5. **Should internal components accept an `icon` override prop?** — E.g., `<IressAlert icon="custom_warning" />` to let consumers swap the default icon

6. **TypeScript type for icon names** — Should we generate a union type of all icon names for compile-time validation?
   - Currently uses `MaterialSymbol` type from `material-symbols` package (3,798 names)
   - After migration, could generate our own union type from the generated files
   - **Recommendation:** Keep using `MaterialSymbol` type for now; generates too large a type for ~7,596 names

7. **Vite dynamic import warnings** — Dynamic `import()` might trigger Vite warnings about glob patterns. May need to use template literals carefully or configure Vite.

---

## Timeline Estimate

| Phase                                    | Effort         | Dependencies |
| ---------------------------------------- | -------------- | ------------ |
| Phase 1: Install Dependencies & Setup    | 0.5 day        | None         |
| Phase 2: Icon Generation Script          | 1-2 days       | Phase 1      |
| Phase 3: Icon Component Migration        | 2-3 days       | Phase 2      |
| Phase 4: Internal Component Verification | 0.5-1 day      | Phase 3      |
| Phase 5: IconProvider Simplification     | 1-2 days       | Phase 4      |
| Phase 6: Testing & Validation            | 2-3 days       | Phase 4-5    |
| Phase 7: Stories & Docs                  | 1-2 days       | Phase 4-5    |
| Phase 8: Cleanup                         | 0.5-1 day      | Phase 6-7    |
| **Total**                                | **~7-12 days** |              |

**Key advantages of this approach:**

- **No third-party runtime dependencies** — pure React + generated code
- **Perfect name matching** — `snake_case` names match Google's Material Symbols icon finder exactly
- **Complete control** — we own the generation, rendering, and update cycle
- **Tree-shakable by default** — lazy loading via dynamic `import()` means unused icons = zero bytes
- **Build-time type checking** — missing icons caught at compile time
- **Zero CSP concerns** — no network, no dynamic styles, fully bundled at build time
- **Simple generation script** — no complex SVGR configuration or build pipeline
- **All 3,798 icons available** — no registration required, no consumer setup
- **Official Google source** — direct from `@material-symbols/svg-300` package
