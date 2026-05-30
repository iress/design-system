# IDS Guidelines Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a standalone IDS guidelines site with MDX documentation, live Storybook story embeds via Chromatic iframes, full-text search, and an AI assistance panel — deployed to GitHub Pages. The guidelines site is the source of truth for all IDS documentation; `.ai/` docs are derived during dev for npm distribution.

**Architecture:** React SPA using TanStack Router (hash-based routing for GH Pages), Vite for build, MDX for content pages. Live examples are rendered via Chromatic iframe embeds. `packages/components/.ai/` is derived from guidelines content with AI-improved code examples (validated against component source). Flexsearch provides client-side search. AI assistance via Iris Gemini Gem.

**Tech Stack:** React 19, TanStack Router (file-based, hash history), Vite 8, MDX, Flexsearch, GitHub Actions, GitHub Pages

**Ticket:** [APE-1237](https://iress-wealth.atlassian.net/browse/APE-1237)

---

## Scope Breakdown

This plan is split into 12 phases. Each phase produces working, testable software.

1. **Project scaffolding** — Vite + React + TanStack Router app in `apps/guidelines`
2. **MDX content infrastructure** — MDX plugin, layout, and first guideline page
3. **One-time translate** — Migrate `.docs.mdx` → `apps/guidelines/content/` (done once)
4. **Client-side search** — Flexsearch index built at compile time from MDX content
5. **AI assistance panel** — Iris Gemini Gem linked from guidelines site
6. **GitHub Pages deployment** — GitHub Actions workflow for automated deploys
7. **AI-improved code examples** — Skill, ai-runner, derive script, dev watcher
8. **Dogfood IDS components** — Guidelines site UI uses IDS itself
9. **Token documentation** — Design tokens in guidelines with values, usage, and CSS variables
10. **Remove `.docs.mdx`** — Storybook becomes autodocs only, clean up storybook-config
11. **Story embeds + derived code examples** — Chromatic iframes in guidelines, derive resolves to code
12. **Validation & cleanup** — Fix known issues, broken MDX, bundle size, transition cutover

---

## Phase 1: Project Scaffolding

### Task 1.1: Initialize the guidelines app package

**Files:**

- Create: `apps/guidelines/package.json`
- Create: `apps/guidelines/tsconfig.json`
- Create: `apps/guidelines/vite.config.ts`
- Create: `apps/guidelines/index.html`
- Create: `apps/guidelines/src/main.tsx`
- Create: `apps/guidelines/src/routes/__root.tsx`
- Create: `apps/guidelines/src/routes/index.tsx`
- Modify: `package.json` (root — add `apps/*` to workspaces)

- [x] **Step 1: Clean existing build artifacts**
- [x] **Step 2: Update root package.json to include apps workspace**
- [x] **Step 3: Create `apps/guidelines/package.json`**
- [x] **Step 4: Create `apps/guidelines/tsconfig.json`**
- [x] **Step 5: Create `apps/guidelines/vite.config.ts`**

> **Note:** Updated from plan — uses `@vitejs/plugin-react` v6 (has OXC built in) and `tanstackRouter()` instead of deprecated `TanStackRouterVite()`.

- [x] **Step 6: Create `apps/guidelines/index.html`**

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>IDS Guidelines</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [x] **Step 7: Create `apps/guidelines/src/main.tsx`**
- [x] **Step 8: Create `apps/guidelines/src/routes/__root.tsx`**
- [x] **Step 9: Create `apps/guidelines/src/routes/index.tsx`**
- [x] **Step 10: Install dependencies and verify build**

Build succeeds: `dist/index.html` + `assets/index-C8yWASOB.js` (274KB, 87KB gzip) in 105ms.

- [x] **Step 11: Commit**

Committed as `624f65fe chore: guidelines p1`

---

## Phase 2: MDX Content Infrastructure

### Task 2.1: Add MDX support and layout components

**Files:**

- Create: `apps/guidelines/src/components/MdxLayout.tsx`
- Create: `apps/guidelines/src/components/CodeBlock.tsx`
- Create: `apps/guidelines/content/getting-started.mdx`
- Create: `apps/guidelines/src/routes/$slug.tsx`
- Create: `apps/guidelines/src/mdx.d.ts`
- Modify: `apps/guidelines/vite.config.ts` (add MDX plugin)
- Modify: `apps/guidelines/package.json` (add MDX deps)
- Modify: `apps/guidelines/tsconfig.json` (include content dir)
- Modify: `apps/guidelines/src/routes/index.tsx` (redirect to /getting-started)

- [x] **Step 1: Add MDX dependencies to `apps/guidelines/package.json`**
- [x] **Step 2: Update `apps/guidelines/vite.config.ts` with MDX plugin**
- [x] **Step 3: Create `apps/guidelines/src/components/CodeBlock.tsx`**
- [x] **Step 4: Create `apps/guidelines/src/components/MdxLayout.tsx`**
- [x] **Step 5: Create first MDX guideline `apps/guidelines/content/getting-started.mdx`**
- [x] **Step 6: Create dynamic route `apps/guidelines/src/routes/$slug.tsx`**
- [x] **Step 7: Update root layout navigation**
- [x] **Step 8: Install deps and verify build**
- [x] **Step 9: Commit**

> **Deviations from original plan:**
>
> - Route is `/$slug` (not `/guides/$slug`) — simpler URLs
> - Index redirects to `/getting-started`
> - 404 page shows list of available guides
> - Added `mdx.d.ts` for TypeScript MDX imports
> - Uses `@vitejs/plugin-react` v6 + `tanstackRouter()` (non-deprecated APIs)

## Phase 3: Translate Pipeline → Guidelines Content ✅

> **Approach changed:** Instead of extracting raw story source, we extended the existing
> `translate-components.ts` pipeline with a `--target=guidelines` flag that outputs clean
> MDX (with `export const meta`) into `apps/guidelines/content/` subfolders matching the
> Storybook information architecture.

### Task 3.1: Extend translate pipeline

- [x] Added `--target=ai|guidelines` flag (both by default)
- [x] Created `buildGuidelinesComponentOutput()` and `buildGuidelinesGuideOutput()` functions
- [x] Output goes to section subfolders: `content/{components,patterns,foundations,get-started,styling-props,resources-migration-guides}/*.mdx`
- [x] Guide slugs use `guideSbSlug` (e.g. `accessibility` not `foundations-accessibility`)

### Task 3.2: Wire guidelines app routing

- [x] Splat route (`src/routes/$.tsx`) loads all MDX from `content/**/*.mdx`
- [x] URLs mirror Storybook IA: `/components/button`, `/foundations/accessibility`, etc.
- [x] Nav links point to section entry pages
- [x] Index redirects to `/get-started/develop`
- [x] 404 shows all available pages grouped by section

**Result:** 84 component/pattern docs + 23 guides, URLs match Storybook IA.

**Known issues (fix later):**

- 3 MDX files have broken JSX (card, select, loading) — excluded
- Code example quality needs improvement (Phase 7)
- Bundle is 1.1MB — needs code splitting

---

## Phase 4: Client-Side Search ✅

- [x] Added `flexsearch` dependency
- [x] Created `src/hooks/useSearch.ts` — FlexSearch index over all MDX meta (title + description)
- [x] Created `src/components/Search.tsx` — search input with results dropdown
- [x] Added Search to root layout header
- [x] Build verified (190 modules, 675ms)

---

## Phase 5: AI Assistance — "Iris" Gemini Gem ✅

> **Approach changed:** Instead of a custom in-browser knowledge search panel, we created
> a Gemini Gem ("Iris") pre-loaded with all IDS documentation. The guidelines site has a
> simple "🌸 Ask Iris" button that opens the Gem in a new tab.

- [x] Created `IDS-FULL-REFERENCE.md` — concatenated file (1004KB) with all components, patterns, guides, and skills
- [x] Output location: `.ai/IDS-FULL-REFERENCE.md` (repo root, not in published package)
- [x] Generated by `yarn translate` (added to `translate-components.ts`)
- [x] Created Gemini Gem "Iris": https://gemini.google.com/gem/68dd0863ccea
- [x] `AiPanel.tsx` — fixed button linking to the Gem
- [x] Removed unused knowledge search code (compile-ai-context, useKnowledgeSearch, ai-context.json)

**Gem config:**

- Knowledge: upload `.ai/IDS-FULL-REFERENCE.md`
- Instructions: scoped to IDS, adapts responses for developers and non-developers
- Prompt starters configured in Gem settings

**To update:** Re-run `yarn translate`, then re-upload `.ai/IDS-FULL-REFERENCE.md` to the Gem.

**TODO (after Phase 9):** When `translate-components.ts` is removed, move `IDS-FULL-REFERENCE.md`
generation into `derive-ai-docs.ts` (it concatenates all `.ai/*.md` files + skills into a single file).
Source is `packages/components/.ai/` (AI-optimized format), not raw guidelines MDX.

---

## Phase 6: GitHub Pages Deployment ✅

- [x] Created `apps/guidelines/public/404.html` — SPA hash routing fallback
- [x] Created `apps/guidelines/public/.nojekyll` — prevents Jekyll processing
- [x] Build verified: `dist/` contains `index.html`, `404.html`, `.nojekyll`, `assets/`
- [x] Build script copies output to `docs/` at repo root (`vite build && rm -rf ../../docs && cp -r dist ../../docs`)
- [x] GitHub Pages configured: source = `main` branch, folder = `/docs`
- [x] CI `docs-check` job verifies `docs/` is up to date on every push (rebuilds and diffs)

**Current implementation (manual deploy):** The `apps/guidelines` build script automatically
copies output to the repo-root `docs/` folder. Commit and push `docs/` to `main` to deploy.
A CI validation job (`docs-check` in the validate matrix) rebuilds the guidelines and fails
if the committed `docs/` is stale.

The CI-based `actions/deploy-pages@v4` job is **commented out** in `.github/workflows/ci-cd.yml`
due to the `iress` org IP allowlist blocking GitHub-hosted runner IPs (403 on both the Pages API
and git push). `peaceiris/actions-gh-pages@v4` was also blocked for the same reason.

**Deploy URL:** `https://iress.github.io/design-system/`

**⚠️ TODO — Contact Platform Tech to re-enable automated CI deployment:**
1. Enable "Allow GitHub Actions" toggle in org IP allowlist settings (simplest), OR
2. Add GitHub Actions runner IP ranges to the org IP allowlist, OR
3. Provide a self-hosted runner whose IP is already allowlisted

Once unblocked, uncomment the `deploy-guidelines` job in `ci-cd.yml`, switch Pages source
back to "GitHub Actions", and remove the `docs-check` CI job and `docs/` from the repo.

**TODO (after Phase 9):** Remove `yarn translate` from the deploy workflow once `.docs.mdx`
files are deleted and content is fully human-authored. The deploy step becomes just
`yarn workspace @iress/ids-guidelines build`.

---

## Summary

| Phase  | Deliverable                                               | Key dependency         |
| ------ | --------------------------------------------------------- | ---------------------- |
| 1      | Working SPA shell with routing                            | None                   |
| 2      | MDX pages rendering with navigation                       | Phase 1                |
| 3      | One-time translate → guidelines MDX (from `.docs.mdx`)    | Phase 2                |
| 4      | Client-side full-text search                              | Phase 2                |
| 5      | AI assistance (Iris Gemini Gem)                           | Phase 2                |
| 6      | GitHub Pages deploy (manual via `docs/`, CI staleness check) | Phase 1                |
| 7      | AI-improved code examples (skill + ai-runner + derive)    | Phase 3                |
| 8      | Dogfood IDS components in guidelines site UI              | Phase 1                |
| 9      | Token documentation in guidelines                         | Phase 2                |
| 10     | Remove `.docs.mdx` — Storybook autodocs only             | Phase 3, 7, 9          |
| 11     | Story embeds (Chromatic iframes) + derived code examples  | Phase 7, 9             |
| 12     | Validation, cleanup, transition cutover                   | Phase 7, 10, 11        |
| Future | WebLLM AI mode (private repo, pending approval)           | Phase 5 context format |

**Parallelism:** Phases 3–9 are independent (depend only on Phase 1 or 2).
Phase 10 requires 3 + 7 + 9. Phase 11 requires 7 + 9. Phase 12 is the final cutover after 7, 10, 11.

---

## Phase 7: AI-Improved Code Examples ✅

> **Strategy:** `apps/guidelines/content/` is the **source of truth** for all documentation
> (the old `.docs.mdx` files in `packages/components/` are being removed). A central skill
> validates and improves code examples in-place. `packages/components/.ai/` is a **derived
> artifact** generated from guidelines content for shipping in the npm package to external
> consumers. An AI tool runner auto-detects which CLI is available (kiro-cli, copilot,
> future: claude, codex) and runs the skill non-interactively.

**Data flow:**

```
apps/guidelines/content/*.mdx     ← source of truth (committed, human-authored)
    │
    ├─▶ ai-runner (validate + improve examples in-place)
    │
    └─▶ scripts/derive-ai-docs.ts → packages/components/.ai/*.md (derived, committed)
                                     └── shipped in @iress-oss/ids-components npm package
```

### Task 7.1: Commit `.ai/` folder and update .gitignore

- [x] **Step 1:** Remove `packages/*/.ai/*` from `.gitignore`
- [x] **Step 2:** Keep `!packages/tokens/.ai/index.json` exception (or remove if redundant)
- [x] **Step 3:** Commit the current `.ai/` output as baseline

### Task 7.2: Create `improve-code-examples` skill

**Skill location:** `.kiro/skills/improve-code-examples/SKILL.md`

The skill instructs the AI agent to:

1. Read the target `apps/guidelines/content/**/*.mdx` file(s)
2. Find code examples (fenced `tsx` blocks)
3. For each example, **validate against implementation**:
   - Does the component exist in `packages/components/src/components/`? → error if not
   - Do the props used match the component's TypeScript interface? → fix or flag mismatches
   - Are imported component names correct (`Iress` prefix, correct casing)? → fix
   - Do enum/union prop values match the type definition? → fix invalid values
4. For each example, evaluate quality:
   - Does it have `{...args}` spreads? → replace with concrete props from the interface
   - Does it use Storybook patterns (argTypes, render functions)? → simplify
   - Is it missing an import statement? → add one
   - Is it idiomatic React? → fix if not
5. Rewrite the code block in-place
6. Preserve all non-code content unchanged

**Trigger:** "improve code examples", "fix code examples", "clean up .ai docs"

**Usage:**

```
# Improve one component
> improve code examples for Button

# Improve all components
> improve all code examples

# Improve components that have {...args}
> find and fix code examples with spread args
```

### Task 7.3: Create AI tool runner (`scripts/ai-runner.ts`)

A central, repo-wide script that detects which AI CLI is available and invokes it
non-interactively. Used by dev watchers, Copilot agent, and manual invocations.

- [x] **Step 1:** Create `scripts/ai-runner.ts`

**Tool detection order** (first available wins):

| Tool              | Detection             | Invocation                                                    |
| ----------------- | --------------------- | ------------------------------------------------------------- |
| kiro-cli          | `command -v kiro-cli` | `kiro-cli chat --no-interactive --trust-all-tools "<prompt>"` |
| copilot           | `command -v copilot`  | `copilot --allow-all-tools --allow-all-paths "<prompt>"`      |
| _(future)_ claude | `command -v claude`   | `claude --print --allowedTools "..." "<prompt>"`              |
| _(future)_ codex  | `command -v codex`    | `codex --quiet --approval-mode full-auto "<prompt>"`          |

**Interface:**

```ts
// scripts/ai-runner.ts
// Usage:
//   npx tsx scripts/ai-runner.ts --target guidelines --files apps/guidelines/content/components/button.mdx
//   npx tsx scripts/ai-runner.ts --target styling-props --files apps/guidelines/content/styling-props/spacing.mdx
//   npx tsx scripts/ai-runner.ts --prompt "improve all code examples"
```

**Targets** (determines which skill/prompt to use):

| Target | Watch paths | Skill invoked |
|--------|-------------|---------------|
| `guidelines` | `apps/guidelines/content/components/**/*.mdx` | improve-code-examples |
| `styling-props` | `apps/guidelines/content/styling-props/**/*.mdx` | improve-code-examples + token-usage |
| `patterns` | `apps/guidelines/content/patterns/**/*.mdx` | improve-code-examples |

- Accepts `--target` (scopes the prompt context) + `--files` (paths to process)
- Or `--prompt` for freeform invocations
- Exits with error + helpful message if no AI tool found
- Extensible: adding a new tool = one entry in `AI_TOOLS` array; adding a new target = one entry in `TARGETS` map

- [x] **Step 2:** Add `"ai-improve": "tsx scripts/ai-runner.ts"` to root `package.json` scripts

### Task 7.4: Create derive script (`scripts/derive-ai-docs.ts`)

Generates `packages/components/.ai/` from `apps/guidelines/content/` for npm distribution.

- [x] **Step 1:** Create `scripts/derive-ai-docs.ts`
  - Reads `apps/guidelines/content/components/*.mdx` and `patterns/*.mdx`
  - Strips MDX frontmatter/imports, converts to plain markdown
  - Resolves `<StoryEmbed>` references → extracts story render source
  - Writes to `packages/components/.ai/{components,patterns}/*.md`
  - Generates `packages/components/.ai/index.json` manifest
  - **Incremental:** compare-before-write (skip unchanged files)
- [x] **Step 2:** Add `"derive:ai-docs": "tsx scripts/derive-ai-docs.ts"` to root scripts
- [x] **Step 3:** Do NOT wire into `yarn build` — derive + AI improve runs only during dev (see Task 7.5)

**`.ai/` is committed.** CI just publishes whatever is in git. No derive or AI in the pipeline.

**Replaces:** the current `translate-components.ts` (which generated both `.ai/` and `content/`
from `.docs.mdx`). The old script becomes obsolete once `.docs.mdx` files are removed.

### Task 7.5: Wire dev watcher (derive + improve)

The dev watcher runs the full chain: derive → AI improve. This is the **only** place
where `.ai/` gets updated.

- [x] **Step 1:** Add chokidar watcher for:
  - `apps/guidelines/content/**/*.mdx` (content changes)
  - `packages/components/src/**/*.stories.tsx` (story changes)
- [x] **Step 2:** On change (debounced 2s):
  1. Run `derive-ai-docs.ts --files <affected>` (incremental — only changed components)
  2. Run `ai-runner.ts --target guidelines --files <affected>` (validate + improve)
- [x] **Step 3:** Wire into root `package.json` as `"dev:improve"` script
- [x] **Step 4:** Update root `yarn dev` or add `concurrently` to run both Vite + watcher

**Dev experience:**

```bash
yarn dev
# → Vite dev server starts (guidelines)
# → Watcher detects story or content changes
# → derive-ai-docs regenerates .ai/ (incremental)
# → AI runner validates/improves code examples
# → Developer commits updated .ai/ with their PR
```

### Task 7.6: Copilot agent integration

- [x] **Step 1:** Add to `.github/copilot-instructions.md`:

> After modifying any file in `apps/guidelines/content/`, follow the `improve-code-examples`
> skill to validate examples, then run `npx tsx scripts/derive-ai-docs.ts` to sync `.ai/`.

### Task 7.7: Pre-commit hook (lightweight, no AI)

- [x] Add a check to the husky pre-commit hook that warns if staged `.mdx` files
      contain `{...args}` spreads (quick grep, no AI invocation needed)

---

## Phase 8: Dogfood IDS Components in Guidelines Site

> **Goal:** Replace plain HTML elements in the guidelines site UI with IDS components.
> The guidelines site _for_ IDS should use IDS itself.

### Task 8.1: Add IDS dependency and provider

- [x] Add `@iress-oss/ids-components` to `apps/guidelines/package.json` dependencies
- [x] Wrap app in IDS provider (if required) in `src/main.tsx`

### Task 8.2: Convert layout and navigation

- [x] `__root.tsx` — Replace `<header>`, `<nav>`, `<Link>` with `IressSideNav`, `IressContainer`, `IressStack`, `IressStyled`, `IressImage`, `IressText`, `IressInline`, `IressDivider`
- [x] Add sidebar navigation with section grouping (matching Storybook IA)

### Task 8.3: Convert content components

- [x] `Search.tsx` — Use `IressInputPopover` + `IressMenu` + `IressMenuItem` for search with Pagefind
- [x] `CodeBlock.tsx` — Use `IressCard`, `IressButton`, `IressInline`, `IressLink`
- [x] `MdxLayout.tsx` — Use `IressStack`, `IressText`, `IressDivider`
- [x] `$.tsx` (404/listing) — Use `IressStack`, `IressText`, `IressLink`
- [x] `AiPanel.tsx` — Use `IressButton` (as link)

### Task 8.4: Add IDS styling/tokens

- [x] Import IDS CSS/theme in `main.tsx` (`@iress-oss/ids-components/dist/style.css`)
- [x] Use IDS spacing/typography tokens for layout (via `IressStyled` and component props)
- [x] Ensure the site looks consistent with IDS design language

---

## Phase 9: Token Documentation in Guidelines

> **Goal:** Add design token documentation to the guidelines site, matching the treatment
> components receive. Token pages show available values, usage guidance, CSS variables, and
> accessibility pairings. Source content lives in `apps/guidelines/content/tokens/`.

**Existing sources:**
- `packages/tokens/src/schema/*.mdx` — Storybook token docs (Colour, Spacing, Radius, Typography)
- `packages/tokens/.ai/tokens-reference.md` — auto-generated full token reference with values
- `packages/tokens/.ai/skills/token-usage.md` — usage guidance skill

### Task 9.1: Create token content pages

- [x] **Step 1:** Create `apps/guidelines/content/tokens/` directory
- [x] **Step 2:** Create pages for each token category:
  - `colour.mdx` — neutral, primary, success, warning, danger, info palettes with values & pairings
  - `spacing.mdx` — spacing scale, usage guidance
  - `radius.mdx` — border radius tokens
  - `typography.mdx` — font families, sizes, weights, line heights
- [x] **Step 3:** Include CSS variable names, JS import paths, and concrete values
- [x] **Step 4:** Add usage examples showing tokens applied in CSS and via IDS styling props

### Task 9.2: Add token navigation

- [x] **Step 1:** Add "Tokens" section to nav (link to `/tokens/colour`)
- [x] **Step 2:** Ensure splat route resolves `tokens/*` paths correctly

### Task 9.3: Generate token content from source data

- [x] **Step 1:** Created `apps/guidelines/scripts/generate-token-pages.ts` — generates MDX from `packages/tokens/.ai/tokens-reference.md`
- [x] **Step 2:** Run on demand via `npx tsx scripts/generate-token-pages.ts`; wire into build pipeline deferred to Phase 12
- [x] **Step 3:** Include the auto-generated token tables in each category page

### Task 9.4: Derive token AI docs

- [x] **Step 1:** `packages/tokens/.ai/` already maintained by `generate-token-reference.ts`
- [ ] **Step 2:** Include token pages in `IDS-FULL-REFERENCE.md` generation — deferred to Phase 12

---

## Phase 10: Remove `.docs.mdx` — Storybook Autodocs Only

> **Goal:** Storybook becomes purely stories + autodocs. All narrative documentation lives
> in `apps/guidelines/content/`. The 65 `.docs.mdx` files in `packages/components/src/` are
> removed. Storybook auto-generates docs pages from component meta, JSDoc comments, and
> stories — no hand-written MDX needed.

**Prerequisite:** Phase 3 (translate) migrated component content, Phase 9 added token content.
This phase removes the originals and switches Storybook to autodocs mode.

### Task 10.1: Enable autodocs in Storybook

- [x] **Step 1:** Enabled globally via `experimental_indexers` in `main.ts` (injects `'autodocs'` tag at index time)
- [x] **Step 2:** Verified autodocs generates acceptable pages (confirmed via Chrome DevTools)
- [x] **Step 3:** Created `AutoDocsPage` custom template using `ComponentCanvas` for per-story sandbox

### Task 10.2: Update stories glob to exclude MDX

- [x] **Step 1:** Changed `getMainConfig` stories pattern to `'../src/**/*.stories.@(ts|tsx)'`
- [x] **Step 2:** Removed `'../docs/**/*.mdx'` (all guides are in guidelines site)

### Task 10.3: Formalize shared component meta

Leverage the existing `meta/` folder in each component to provide a single source of truth
for component metadata (title, description, tags, etc.) shared across Storybook, guidelines,
and AI docs. This must happen before removing `.docs.mdx` files so the autodocs pages can
render the same information that `.docs.mdx` provided (description, status, etc.).

- [x] **Step 1:** Add `description` field to each component's `meta/index.tsx`
- [x] **Step 2:** Create a `/meta` package export in `@iress-oss/ids-components` (re-exports all component metas)
- [x] **Step 3:** ~~Wire stories to use meta for `title`~~ — **Not possible.** Storybook requires static string literal titles (parsed at index time without execution). Meta `heading` is used for guidelines and AI docs only. Story titles remain hardcoded strings.
- [x] **Step 4:** Wire guidelines `content/*.mdx` to import meta from `@iress-oss/ids-components/meta/<component>`
- [x] **Step 5:** Ensure `AutoDocsPage` can render component description from meta (via story parameters or CSF meta)
- [x] **Step 6:** Storybook URLs are inferred from title (no explicit URL needed in meta)

**Design constraints:**
- Meta must be data-only (no JSX in the shared export — `Thumbnail` stays in the local `meta/` but isn't re-exported via `/meta`)
- Separate entry point keeps it tree-shakeable
- Co-located with each component for easy authoring

### Task 10.4: Remove `.docs.mdx` files

- [x] **Step 1:** Delete all 65 `*.docs.mdx` files from `packages/components/src/`
- [x] **Step 2:** Remove `packages/components/docs/` folder (guides moved to guidelines site)
- [x] **Step 3:** Delete all `.mdx` files from `packages/tokens/`:
  - `packages/tokens/docs/010-Introduction.mdx`
  - `packages/tokens/docs/020-Sandbox.mdx`
  - `packages/tokens/src/schema/Colour.mdx`
  - `packages/tokens/src/schema/Spacing.mdx`
  - `packages/tokens/src/schema/Radius.mdx`
  - `packages/tokens/src/schema/Typography.mdx`
- [x] **Step 4:** Update `translate-components.ts` — either delete entirely or simplify to only run `derive-ai-docs.ts`

### Task 10.5: Clean up `@iress-oss/ids-storybook-config`

With autodocs + shared meta, some custom doc components are no longer needed but others
can be retained and adapted to read from meta instead of `.docs.mdx`.

- [x] **Step 1:** Evaluate which doc components to keep vs remove:
  - `ComponentOverview.tsx` — **removed** (autodocs uses Description block)
  - `ComponentStatus.tsx` — **kept** (renders status badge in AutoDocsPage)
  - `ComponentExample.tsx` — **removed** (replaced by `ComponentCanvas` in `AutoDocsPage`)
  - `ComponentApi.tsx`, `ComponentApiExpander.tsx`, `ComponentApiHeading.tsx` — **removed** (autodocs generates API tables)
- [x] **Step 2:** Refactor kept components to read from shared meta instead of `.docs.mdx` props
- [x] **Step 3:** Remove unused exports from `src/index.ts`
- [x] **Step 4:** Remove related tests and stories for deleted components
- [x] **Step 5:** Update `packages/storybook-config/package.json` if docs-related deps can be dropped
- [x] **Step 6:** Keep utility helpers that are still used by stories (`disableArgTypes`, `removeArgTypes`, `stylingProps`, etc.)

### Task 10.6: Remove stale docs infrastructure

- [x] Remove Storybook doc blocks that are no longer needed (`<Meta of=.../>` pattern)
- [x] Verify no remaining imports of removed components across the monorepo

### Task 10.7: Add cross-links from Storybook to Guidelines

- [x] Add a Storybook toolbar link or panel that points to the guidelines site
- [x] Optionally add a "📖 Full docs" link in each autodocs page pointing to `https://<pages-url>/components/<slug>`

> **Implementation:** Guidelines link portals into `#storybook-checklist-widget` (replacing the
> onboarding checklist). Configured via `setUpManager({ guidelines: { url, title } })`.
> Autodocs "Guidelines" button auto-derives URL from story title via `guidelinesUrl` function
> in `getPreview()`.

---

## Phase 11: Story Embeds in Guidelines + Derived Code Examples

> **Goal:** Guidelines shows live rendered stories via Chromatic iframe embeds (Storybook
> best practice). The `derive-ai-docs` script resolves story references, extracts source,
> and produces standalone code examples for `.ai/`. No coupling to Storybook internals.

**Prerequisite:** Phase 7 (derive script exists).

**Architecture:**

```
apps/guidelines/content/components/button.mdx (human-authored)
    │
    │  <StoryEmbed id="components-button--default" />   ← live iframe in guidelines
    │  <StoryEmbed id="components-button--with-icon" />
    │
    ▼
scripts/derive-ai-docs.ts
    │  reads story source (.stories.tsx) for each <StoryEmbed> reference
    │  extracts render JSX, strips args/decorators/meta
    │  runs improve-code-examples skill
    │
    ▼
packages/components/.ai/components/button.md (shipped in npm)
    ```tsx
    import { IressButton } from '@iress-oss/ids-components';
    <IressButton variant="primary">Click</IressButton>
    ```
```

### Task 11.1: Create `<StoryEmbed>` component for guidelines site

- [x] **Step 1:** Create `apps/guidelines/src/components/StoryEmbed.tsx`
  - Accepts `id` (Storybook story ID, e.g. `components-button--default`)
  - Renders a Chromatic iframe: `<iframe src="https://main--691abcc79dfa560a36d0a74f.chromatic.com/iframe.html?id={id}&viewMode=story" />`
  - Responsive height, loading state, optional caption
  - Optionally shows "Open in Storybook" link

### Task 11.2: Use `<StoryEmbed>` in guidelines content

- [ ] **Step 1:** Replace hardcoded JSX snippets in `apps/guidelines/content/components/*.mdx`
  with `<StoryEmbed id="..." />` where a live demo is needed
- [ ] **Step 2:** Keep prose/written code snippets for simple prop demonstrations (not everything needs an iframe)

### Task 11.3: Build unified `translate.ts` pipeline

> **Expanded from original scope.** See `plans/ai-docs-pipeline-consolidation.md` for full details
> and `plans/story-code-patterns.md` for the story migration that simplifies extraction.

- [ ] **Step 1:** Migrate complex stories to mock files (prerequisite — simplifies extraction)
- [ ] **Step 2:** Create `scripts/translate.ts` with `--components` subcommand
  - Reads `apps/guidelines/content/{components,patterns}/*.mdx`
  - Resolves `<StoryEmbed id="..."/>` → reads raw source from mock files or extracts render bodies
  - Applies `transformSource` (from `withSource` helper) to clean up code
  - Writes to `packages/components/.ai/{components,patterns}/*.md`
- [ ] **Step 3:** Add `--tokens` subcommand (port from `generate-token-reference.ts`)
- [ ] **Step 4:** Add `--skills` subcommand (port skill concatenation)
- [ ] **Step 5:** Add `--full-reference` subcommand (generates `IDS-FULL-REFERENCE.md`)
- [ ] **Step 6:** Add `--all` (default) that runs all subcommands
- [ ] **Step 7:** Wire into `package.json` as `"translate": "tsx scripts/translate.ts"`

### Task 11.4: Keeping examples in sync

- Stories change → Chromatic iframe automatically reflects the update (no rebuild needed)
- `.ai/` code examples update on next `yarn dev` run (derive step re-extracts source)
- improve-code-examples validates against current TypeScript interfaces

---

## Phase 11.5: Improve JSDoc for Autodocs

> **Goal:** Add comprehensive JSDoc comments to all exported IDS components and patterns
> so that Storybook autodocs automatically renders rich component descriptions with
> usage examples. Descriptions must be in sync with the shared `meta/` descriptions.

**Context:** Storybook autodocs renders the JSDoc comment above the component export as
the component description on the docs page. Currently most IDS components have no JSDoc.
Adding JSDoc with a description + usage example gives autodocs the same quality that the
old `.docs.mdx` files provided — without maintaining separate documentation files.

**Reference:** See `packages/storybook-config/src/components/CurrentBreakpoint.tsx` line 62
for the pattern — a JSDoc comment with a brief description above the component export.

### Task 11.5.1: Define JSDoc standards

- [x] **Step 1:** Define the required JSDoc format:
  ```ts
  /**
   * <description from meta — must match meta.description>
   *
   * @example
   * ```tsx
   * import { IressAlert } from '@iress-oss/ids-components';
   *
   * <IressAlert status="success">Saved!</IressAlert>
   * ```
   */
  export const IressAlert = ...
  ```
- [x] **Step 2:** Description must match the component's `meta/index.tsx` `description` field
- [x] **Step 3:** Example should be a minimal, self-contained usage (import + JSX)

### Task 11.5.2: Add JSDoc to all component exports

- [x] **Step 1:** Add JSDoc with description + `@example` to all 46 component exports
- [x] **Step 2:** Add JSDoc with description + `@example` to all 8 pattern exports
- [x] **Step 3:** Add JSDoc with description + `@example` to all 31 subcomponent exports (providers, sub-parts)
- [x] **Step 4:** Verify autodocs renders the description and example correctly in Storybook

### Task 11.5.3: Lint rule to enforce JSDoc presence

- [x] **Step 1:** Add `eslint-plugin-jsdoc` with `require-jsdoc` rule targeting `export const Iress*` in components/patterns
- [ ] **Step 2:** Optionally add a custom lint rule or script to verify description matches meta

---

## Phase 12: Validation & Cleanup

> **Goal:** Fix all known issues accumulated during earlier phases, perform the cutover
> from translate-based workflow to content-as-source-of-truth, and verify everything works.

### Task 12.1: Fix broken MDX files

- [ ] Fix 3 broken MDX files excluded in Phase 3 (card, select, loading)
- [ ] Validate all `apps/guidelines/content/**/*.mdx` files parse without errors

### Task 12.2: Bundle size — code splitting

- [ ] Add route-based code splitting (lazy-load each section)
- [ ] Target: initial bundle < 300KB (currently 1.1MB)
- [ ] Verify Lighthouse performance score

### Task 12.3: Simplify dev watcher (post Phase 11)

After Phase 11, guidelines content uses `<StoryEmbed>` instead of inline code examples.
The AI improve step only targets `.ai/` output (not content files), eliminating the
write-back loop.

- [ ] Update ai-runner to target `.ai/` files (not content MDX) — derive produces rough
  examples, AI cleans them up in `.ai/` only
- [ ] Remove `ignoreChanges` loop-prevention logic (AI no longer writes to watched content dir)
- [ ] Watcher becomes: content/story change → derive → AI improve `.ai/` — no loop
- [ ] Delete `apps/guidelines/.ai-improve.log` gitignore entry if unused

### Task 12.4: Transition cutover (old → new workflow)

Performed after Phases 7, 9, 10, and 11.3 are complete:

- [ ] **Step 1:** Run `translate.ts --all` to produce a clean `.ai/` baseline from current content
- [ ] **Step 2:** Run `ai-improve.ts` on all files to validate/improve (optional)
- [ ] **Step 3:** Commit `.ai/` as the authoritative baseline
- [ ] **Step 4:** Update `yarn build` to use `yarn translate` (now runs `translate.ts`)
- [ ] **Step 5:** Delete old scripts: `translate-components.ts`, `derive-ai-docs.ts`, `generate-token-reference.ts`
- [ ] **Step 6:** Remove `packages/*/.ai/*` ignore from `.gitignore`
- [ ] **Step 7:** Verify CI builds pass
- [ ] **Step 8:** Verify `yarn dev` watcher correctly updates `.ai/` on content/story changes
- [ ] **Step 9:** Remove deprecated `withCustomSource` / `withTransformedRawSource` exports (replaced by `withSource`)
- [ ] **Step 10:** Remove old `withCustomSource.test.ts`

### Task 12.4: Update `IDS-FULL-REFERENCE.md` generation

- [ ] Now handled by `translate.ts --full-reference` subcommand
- [ ] Source: `packages/components/.ai/**/*.md` + `.kiro/skills/` (AI-optimized, not raw MDX)
- [ ] Verify `.ai/IDS-FULL-REFERENCE.md` is regenerated correctly
- [ ] Re-upload to Iris Gemini Gem

### Task 12.5: Architecture diagrams

- [ ] **Diagram 1: Content flow** — where content lives, what derives from what, what ships where
  ```
  .stories.tsx → Chromatic (visual) → <StoryEmbed> iframe in guidelines
  content/*.mdx → guidelines site (GitHub Pages)
  content/*.mdx → derive-ai-docs → .ai/*.md → npm package
  content + skills → IDS-FULL-REFERENCE.md → Iris Gem
  ```
- [ ] **Diagram 2: Dev workflow** — what happens during `yarn dev`
  ```
  file change (story or content) → watcher → derive-ai-docs (incremental) → ai-runner (validate/improve) → .ai/ updated → developer commits
  ```
- [ ] Add diagrams to `apps/guidelines/` README or `docs/ARCHITECTURE.md`
- [ ] Use mermaid so they render in GitHub

### Task 12.6: Documentation

- [ ] Update `AGENTS.md` to reflect new workflow (no more `yarn translate`, use `yarn dev` for .ai updates)
- [ ] Update `README.md` development section if needed
- [ ] Add a `CONTRIBUTING.md` note about committing `.ai/` changes with PRs

### Task 12.7: Sub-navigation and anchor link search

- [ ] **Step 1:** Generate sub-menu items from MDX headings (h2/h3) for each page
  - Parse MDX headings at build time or on page load
  - Show heading-level navigation in the SideNav panel when a page is active
  - Use `IressSideNav` `children` items with `href` anchor links (`#heading-id`)
- [ ] **Step 2:** Add heading IDs to rendered MDX content
  - Configure remark/rehype plugin to auto-generate `id` attributes on headings
  - Ensure heading anchors work with hash routing (`/#/components/button#usage`)
- [ ] **Step 3:** Enable Pagefind sub-results for anchor link search
  - Pagefind `sub_results` returns section-level matches with `url` including `#anchor`
  - Update `build-search-index.ts` to include heading structure in indexed content
  - Update `Search.tsx` to render sub-results with section titles and anchor URLs
- [ ] **Step 4:** Verify anchor navigation works end-to-end
  - Clicking a search result with `#anchor` scrolls to the correct section
  - Sub-menu items highlight the active section on scroll

### Task 12.8: Contributor documentation

Document how to add/edit guidelines content for contributors and AI agents:

- [ ] **Step 1:** Create `apps/guidelines/CONTRIBUTING.md` covering:
  - How to add a new guideline page (create MDX in `content/<section>/`, add meta export)
  - Content structure (sections: `components`, `patterns`, `tokens`, `foundations`, `get-started`, etc.)
  - MDX format requirements (frontmatter, meta export, code block conventions)
  - How to preview locally (`yarn workspace @iress/ids-guidelines run dev`)
  - How to deploy (build + commit `docs/`)
- [ ] **Step 2:** Update `.github/instructions/` to reference guidelines as the docs source of truth
- [ ] **Step 3:** Update `AGENTS.md` to document:
  - All narrative docs live in `apps/guidelines/content/` (not `.docs.mdx`)
  - `packages/components/.ai/` is a derived artifact, not hand-edited
  - Token docs live in `apps/guidelines/content/tokens/`
- [ ] **Step 4:** Add a note to the root `README.md` development section about the guidelines app

### Task 12.9: Add Storybook introduction/cover page

Add a single MDX introduction page to the components Storybook that explains its new role
and directs users to the guidelines site for full documentation.

- [x] **Step 1:** Create an introduction MDX page (e.g. `packages/components/src/Introduction.mdx`) with:
  - Clear statement: Storybook is for interactive examples, visual regression testing, and API documentation
  - Link to the guidelines site for design guidance, usage patterns, and full component docs
  - Brief explanation of how autodocs pages work (auto-generated from component props + stories)
- [x] **Step 2:** Ensure it appears first in the sidebar (via story sort order in preview config)

### Task 12.10: Create story factory in storybook-config

Create a `createComponentStories` helper in `@iress-oss/ids-storybook-config` that
enforces conventions and reduces boilerplate across all component/pattern story files.

- [ ] **Step 1:** Design the factory API:
  ```ts
  const { meta, Story } = createComponentStories({
    component: IressAlert,
    meta: componentMeta,       // shared meta (heading, description, tags)
    category: 'Components',    // or 'Patterns'
    argTypes: { ... },         // component-specific only
  });
  ```
- [ ] **Step 2:** Factory auto-applies:
  - `parameters.docs.subtitle` from `meta.description`
  - `stylingProps` helper appended to argTypes automatically
  - `tags` from meta merged with defaults (`['autodocs']`)
  - Correctly typed `Story` type for the component
- [ ] **Step 3:** Enforce `description` as required in `ComponentMeta` (already done)
- [ ] **Step 4:** Title remains a static string (Storybook indexer limitation) — factory sets everything else
- [ ] **Step 5:** Migrate all 54 primary story files to use the factory
- [ ] **Step 6:** Add lint rule or reviewer guidance: all new stories must use `createComponentStories`

---

## Phase 13: Tabbed Content Architecture + TypeDoc API Reference

> **Goal:** Restructure component documentation pages into tabbed views (Design, Develop,
> Specifications) to serve both designers and developers. Add TypeDoc as a generated API
> reference linked from each component page.

**Prerequisite:** Phases 10–12 complete (autodocs, shared meta, guidelines content stable).

### Task 13.1: Implement tabbed component pages

- [ ] **Step 1:** Design the tab structure per component page:
  - **Design** — when to use, visual examples, do's/don'ts, design tokens used, Figma link
  - **Develop** — quick start, code examples, common patterns, key props overview
  - **Specifications** — expected behaviour, accessibility (WCAG), keyboard interactions, states matrix
- [ ] **Step 2:** Implement tab UI using `IressTabSet` (dogfooding)
- [ ] **Step 3:** Decide content file structure — either:
  - Multiple MDX files per component (`button.design.mdx`, `button.develop.mdx`, `button.specs.mdx`)
  - Or single file with sections rendered into tabs via frontmatter/headings
- [ ] **Step 4:** Update the splat route to render tabbed pages for component/pattern content
- [ ] **Step 5:** Update navigation to show component name (tabs appear within the page, not sidebar)

### Task 13.2: Add design-focused content

- [ ] **Step 1:** Define design content template (when to use, visual examples, do's/don'ts, related patterns)
- [ ] **Step 2:** Add Figma embed or link per component (source of truth file)
- [ ] **Step 3:** Document design token usage per component (which tokens apply, pairing guidance)
- [ ] **Step 4:** Populate design content for key components (Button, Alert, Modal, Form, etc.)

### Task 13.3: Add specifications content

- [ ] **Step 1:** Define specs template:
  - Expected behaviour (interaction states, edge cases)
  - Accessibility (WCAG criteria, required ARIA, keyboard interaction table)
  - States/variants matrix
  - Token customisation points (stable system tokens that can be themed, e.g. `radius.system.button`)
- [ ] **Step 2:** Link to Figma source file for each component (visual token mapping lives here)
- [ ] **Step 3:** Link to Storybook autodocs (API / Examples) per component
- [ ] **Step 4:** Link to TypeDoc API reference per component
- [ ] **Step 5:** Link to component source in the repo (e.g. GitHub link to the component directory — shows styles/recipes for exact token usage, always up to date)
- [ ] **Step 6:** Populate specs content for key components

**Token mapping approach:**
- Do NOT manually map tokens to component parts (drifts, unmaintainable)
- Visual token mapping → Figma (designers inspect layers there)
- Implementation details → link to source code (style file is always current)
- Only document stable **customisation points** (system tokens the consumer can theme)

### Task 13.4: Set up TypeDoc for API reference

- [ ] **Step 1:** Install and configure TypeDoc for `@iress-oss/ids-components`
- [ ] **Step 2:** Configure to read from component source + JSDoc comments (from Phase 11.5)
- [ ] **Step 3:** Generate static HTML output to a `/api/` path (e.g. `docs/api/` or separate deploy)
- [ ] **Step 4:** Add TypeDoc generation to the build pipeline
- [ ] **Step 5:** Add "View full API →" link from each component's Specifications tab to the TypeDoc page
- [ ] **Step 6:** Style TypeDoc output to match IDS design language (custom theme or CSS overrides)

### Task 13.5: Surface component specifications in Storybook autodocs

Add component-level metadata (links, resources, ownership) to `ComponentMeta` and display
it in the Storybook autodocs page via `AutoDocsPage`. This gives developers quick access
to related resources without leaving Storybook.

- [ ] **Step 1:** Extend `ComponentMeta` interface with optional specification fields:
  ```ts
  interface ComponentMeta {
    // existing fields...
    heading: string;
    description: string;
    tags: string[];

    // new specification fields (human-authored)
    github?: string;         // e.g. 'packages/components/src/components/Alert'
    figma?: string;          // Figma file/frame URL
    guidelines?: string;     // guidelines site URL path (e.g. '/components/alert')
    owner?: string;          // team or individual responsible
    status?: 'stable' | 'beta' | 'deprecated' | 'experimental';
    related?: string[];      // related components (e.g. ['IressToaster', 'IressModal'])
    a11y?: 'audited' | 'partial' | 'unaudited'; // accessibility conformance level
  }
  ```
  **Note:** `since` (version introduced) stays in the auto-generated `component-versions.json`
  — it's already wired into `AutoDocsPage` via `parameters.docs.componentVersions`. Machine-derivable
  data should not be hand-maintained in meta.
- [ ] **Step 2:** Populate these fields in each component's `meta/index.tsx`
- [ ] **Step 3:** Pass specification metadata through story parameters (via `createMeta` factory)
- [ ] **Step 4:** Render a "Resources" section in `AutoDocsPage` showing:
  - 📖 Guidelines link (from meta)
  - 🎨 Figma link (from meta)
  - 💻 GitHub source link (from meta)
  - 🐛 Report issue link (auto-generated, pre-fills GitHub issue template with component name)
  - 📦 Version introduced (from auto-generated `component-versions.json` — already available)
  - 👥 Owner/team (from meta)
  - 🔗 Related components (from meta — links to their autodocs pages)
  - ♿ Accessibility status badge (from meta — audited/partial/unaudited)

  **Issue link format:** `https://github.com/iress/design-system/issues/new?template=bug_report.md&title=[BUG]+ComponentName:+&labels=bug,component:component-name`
  — derived automatically from the component's meta heading (no manual config needed).
- [ ] **Step 5:** Style the resources section to be compact and non-intrusive (e.g. a collapsible panel or inline chips at the top of the page)
- [ ] **Step 6:** Enhance the existing Introduction page (from Task 12.9) to also show library-level resources:
  - 📦 NPM package link (`@iress-oss/ids-components`)
  - 📊 Total bundle size (from build artifacts)
  - 🔗 Guidelines site link
  - 📋 Changelog link
  - 🏷️ Current version
  - 🐛 Report an issue (`https://github.com/iress/design-system/issues/new/choose`)
  - 💡 Request a feature (`https://github.com/iress/design-system/issues/new?template=feature_request.md`)
  - 🧩 Propose a component (`https://github.com/iress/design-system/issues/new?template=new-component-proposal.md`)

### Task 13.6: Add `related` field for patterns as well as components

Components can reference related components (`related?: string[]`), but patterns should
also be linkable. Extend `related` to accept both component and pattern names.

- [ ] **Step 1:** Allow `related` to reference both components and patterns (e.g. `['IressToaster', 'Feedback']`)
- [ ] **Step 2:** In `AutoDocsPage`, render related items as links — resolve component names to their autodocs URL, pattern names to their autodocs URL
- [ ] **Step 3:** In guidelines, render related items as navigation links to other pages

---

## Action Item (non-code)

Submit Llama 3.2 3B model approval request via [Alfred portal](https://iress.atlassian.net/servicedesk/customer/portal/91):

- **Model:** Meta Llama 3.2 3B Instruct
- **Use case:** In-browser AI assistant for developer documentation site (WebLLM/WebGPU)
- **Data classification:** No sensitive data — only public IDS documentation as context
- **Justification:** Same Meta Llama family already approved (3.3 70B). Runs entirely in user's browser — no data leaves device. Internal developer tool, not client-facing.
- **Note:** WebLLM code will live in a separate private repo for security.

---

## Known Issues: StoryEmbed Panel Control

The `StoryEmbed` component (`apps/guidelines/src/components/StoryEmbed.tsx`) and its
Storybook-side handlers (`packages/storybook-config/src/main.ts` managerHead scripts)
have the following outstanding issues to resolve:

1. **Panel should start hidden**: Stories should always load with the addon panel closed.
   Currently Storybook may open the panel by default before `EMBED_STORYBOOK` fires.
   Fix: either use a URL param Storybook respects, or add a CSS rule that hides the panel
   initially and reveals it only after `EMBED_STORYBOOK` runs.

2. **Animate loading overlay**: Add a fade-out transition on the "Loading example…" overlay
   to give time for the `EMBED_STORYBOOK` setup (hide elements, close panel, filter tabs)
   to complete before the user sees the iframe content. This avoids a flash of unstyled
   Storybook chrome.

3. **Show Code / Accessibility should toggle**: Clicking "Show code" when the code panel
   is already open should close it (and vice versa). Currently it always sends `showPanel: true`
   with the panel ID. Needs state tracking of which panel is currently open.

4. **Controls tab showing by default**: When the addon panel opens, it sometimes defaults
   to the Controls tab instead of the panel specified in `EMBED_STORYBOOK`. This is a timing
   issue — the `allowedPanels` filter hides Controls but Storybook's internal state may
   re-select it. Fix: delay the `SELECT_PANEL` click until after `FILTER_PANELS` completes,
   or use `_waitFor` on the specific tab becoming visible before clicking.

5. **Search not indexing dynamic content**: Since component pages now import metadata
   dynamically (from `meta/index.tsx`), the Pagefind search index may not capture the
   full page content at build time. Fix: either pre-render pages at build time so Pagefind
   can crawl them, or switch to a search index built from the MDX source files directly
   (like the original FlexSearch approach that indexed `meta.title` + `meta.description`).
