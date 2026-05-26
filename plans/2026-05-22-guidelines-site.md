# IDS Guidelines Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a standalone IDS guidelines site with MDX documentation, live Storybook story embeds via Chromatic iframes, full-text search, and an AI assistance panel — deployed to GitHub Pages. The guidelines site is the source of truth for all IDS documentation; `.ai/` docs are derived during dev for npm distribution.

**Architecture:** React SPA using TanStack Router (hash-based routing for GH Pages), Vite for build, MDX for content pages. Live examples are rendered via Chromatic iframe embeds. `packages/components/.ai/` is derived from guidelines content with AI-improved code examples (validated against component source). Flexsearch provides client-side search. AI assistance via Iris Gemini Gem.

**Tech Stack:** React 19, TanStack Router (file-based, hash history), Vite 8, MDX, Flexsearch, GitHub Actions, GitHub Pages

**Ticket:** [APE-1237](https://iress-wealth.atlassian.net/browse/APE-1237)

---

## Scope Breakdown

This plan is split into 11 phases. Each phase produces working, testable software.

1. **Project scaffolding** — Vite + React + TanStack Router app in `apps/guidelines`
2. **MDX content infrastructure** — MDX plugin, layout, and first guideline page
3. **One-time translate** — Migrate `.docs.mdx` → `apps/guidelines/content/` (done once)
4. **Client-side search** — Flexsearch index built at compile time from MDX content
5. **AI assistance panel** — Iris Gemini Gem linked from guidelines site
6. **GitHub Pages deployment** — GitHub Actions workflow for automated deploys
7. **AI-improved code examples** — Skill, ai-runner, derive script, dev watcher
8. **Dogfood IDS components** — Guidelines site UI uses IDS itself
9. **Remove `.docs.mdx`** — Storybook becomes autodocs only
10. **Story embeds + derived code examples** — Chromatic iframes in guidelines, derive resolves to code
11. **Validation & cleanup** — Fix known issues, broken MDX, bundle size, transition cutover

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
| 9      | Remove `.docs.mdx` — Storybook autodocs only             | Phase 3, 7             |
| 10     | Story embeds (Chromatic iframes) + derived code examples  | Phase 7                |
| 11     | Validation, cleanup, transition cutover                   | Phase 7, 9, 10         |
| Future | WebLLM AI mode (private repo, pending approval)           | Phase 5 context format |

**Parallelism:** Phases 3–8 are independent (depend only on Phase 1 or 2).
Phase 9 requires 3 + 7. Phase 10 requires 7. Phase 11 is the final cutover after 7, 9, 10.

---

## Phase 7: AI-Improved Code Examples

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

- [ ] **Step 1:** Remove `packages/*/.ai/*` from `.gitignore`
- [ ] **Step 2:** Keep `!packages/tokens/.ai/index.json` exception (or remove if redundant)
- [ ] **Step 3:** Commit the current `.ai/` output as baseline

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

- [ ] **Step 1:** Create `scripts/ai-runner.ts`

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

- [ ] **Step 2:** Add `"ai-improve": "tsx scripts/ai-runner.ts"` to root `package.json` scripts

### Task 7.4: Create derive script (`scripts/derive-ai-docs.ts`)

Generates `packages/components/.ai/` from `apps/guidelines/content/` for npm distribution.

- [ ] **Step 1:** Create `scripts/derive-ai-docs.ts`
  - Reads `apps/guidelines/content/components/*.mdx` and `patterns/*.mdx`
  - Strips MDX frontmatter/imports, converts to plain markdown
  - Resolves `<StoryEmbed>` references → extracts story render source
  - Writes to `packages/components/.ai/{components,patterns}/*.md`
  - Generates `packages/components/.ai/index.json` manifest
  - **Incremental:** compare-before-write (skip unchanged files)
- [ ] **Step 2:** Add `"derive:ai-docs": "tsx scripts/derive-ai-docs.ts"` to root scripts
- [ ] **Step 3:** Do NOT wire into `yarn build` — derive + AI improve runs only during dev (see Task 7.5)

**`.ai/` is committed.** CI just publishes whatever is in git. No derive or AI in the pipeline.

**Replaces:** the current `translate-components.ts` (which generated both `.ai/` and `content/`
from `.docs.mdx`). The old script becomes obsolete once `.docs.mdx` files are removed.

### Task 7.5: Wire dev watcher (derive + improve)

The dev watcher runs the full chain: derive → AI improve. This is the **only** place
where `.ai/` gets updated.

- [ ] **Step 1:** Add chokidar watcher for:
  - `apps/guidelines/content/**/*.mdx` (content changes)
  - `packages/components/src/**/*.stories.tsx` (story changes)
- [ ] **Step 2:** On change (debounced 2s):
  1. Run `derive-ai-docs.ts --files <affected>` (incremental — only changed components)
  2. Run `ai-runner.ts --target guidelines --files <affected>` (validate + improve)
- [ ] **Step 3:** Wire into root `package.json` as `"dev:improve"` script
- [ ] **Step 4:** Update root `yarn dev` or add `concurrently` to run both Vite + watcher

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

- [ ] **Step 1:** Add to `.github/copilot-instructions.md`:

> After modifying any file in `apps/guidelines/content/`, run:
> `npx tsx scripts/ai-runner.ts --target <target> --files <changed-files>`
> This validates code examples against component source before committing.

### Task 7.7: Pre-commit hook (lightweight, no AI)

- [ ] Add a check to the husky pre-commit hook that warns if staged `.mdx` files
      contain `{...args}` spreads (quick grep, no AI invocation needed)

---

## Phase 8: Dogfood IDS Components in Guidelines Site

> **Goal:** Replace plain HTML elements in the guidelines site UI with IDS components.
> The guidelines site _for_ IDS should use IDS itself.

### Task 8.1: Add IDS dependency and provider

- [ ] Add `@iress-oss/ids-components` to `apps/guidelines/package.json` dependencies
- [ ] Wrap app in IDS provider (if required) in `src/main.tsx`

### Task 8.2: Convert layout and navigation

- [ ] `__root.tsx` — Replace `<header>`, `<nav>`, `<Link>` with `IressAppShell`, `IressNavigation`, `IressButton` (or appropriate IDS layout components)
- [ ] Add sidebar navigation with section grouping (matching Storybook IA)

### Task 8.3: Convert content components

- [ ] `Search.tsx` — Use `IressInput` with search icon for the search input
- [ ] `CodeBlock.tsx` — Use `IressPanel` or appropriate container, `IressButton` for copy
- [ ] `MdxLayout.tsx` — Use `IressText`, `IressStack` for article layout
- [ ] 404 page — Use IDS components for the not-found state

### Task 8.4: Add IDS styling/tokens

- [ ] Import IDS CSS/theme in `main.tsx`
- [ ] Use IDS spacing/typography tokens for layout
- [ ] Ensure the site looks consistent with IDS design language

---

## Phase 9: Remove `.docs.mdx` — Storybook Autodocs Only

> **Goal:** Storybook becomes purely stories + autodocs. All narrative documentation lives
> in `apps/guidelines/content/`. The 65 `.docs.mdx` files in `packages/components/src/` are
> removed. Storybook auto-generates docs pages from component meta, JSDoc comments, and
> stories — no hand-written MDX needed.

**Prerequisite:** Phase 3 (translate) already migrated content to guidelines. This phase
removes the originals and switches Storybook to autodocs mode.

### Task 9.1: Enable autodocs in Storybook

- [ ] **Step 1:** Add `tags: ['autodocs']` to each component's stories meta (or set globally in preview)
- [ ] **Step 2:** Ensure component TSDoc/JSDoc on props is comprehensive (autodocs renders these)
- [ ] **Step 3:** Verify autodocs generates acceptable pages for a sample (Button, Alert, Select)

### Task 9.2: Update stories glob to exclude MDX

- [ ] **Step 1:** Change `getMainConfig` stories pattern from:
  ```ts
  '../src/**/*.@(stories.ts|stories.tsx|mdx)'
  ```
  to:
  ```ts
  '../src/**/*.stories.@(ts|tsx)'
  ```
- [ ] **Step 2:** Keep `'../docs/**/*.mdx'` only if non-component docs (guides) remain in Storybook
  (or remove entirely if all guides are in the guidelines site)

### Task 9.3: Remove `.docs.mdx` files

- [ ] **Step 1:** Delete all 65 `*.docs.mdx` files from `packages/components/src/`
- [ ] **Step 2:** Remove `ComponentOverview`, `ComponentExample` imports from storybook-config (if no longer used)
- [ ] **Step 3:** Remove `packages/components/docs/` folder (guides moved to guidelines site)
- [ ] **Step 4:** Update `translate-components.ts` — either delete entirely or simplify to only run `derive-ai-docs.ts`

### Task 9.4: Remove stale docs infrastructure

- [ ] Remove Storybook doc blocks that are no longer needed (`<Meta of=.../>` pattern)
- [ ] Clean up `@iress-oss/ids-storybook-config` exports (ComponentOverview, ComponentExample, etc.) if unused
- [ ] Update `packages/components/package.json` if docs-related deps can be dropped

### Task 9.5: Add cross-links from Storybook to Guidelines

- [ ] Add a Storybook toolbar link or panel that points to the guidelines site
- [ ] Optionally add a "📖 Full docs" link in each autodocs page pointing to `https://<pages-url>/components/<slug>`

---

## Phase 10: Story Embeds in Guidelines + Derived Code Examples

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

### Task 10.1: Create `<StoryEmbed>` component for guidelines site

- [ ] **Step 1:** Create `apps/guidelines/src/components/StoryEmbed.tsx`
  - Accepts `id` (Storybook story ID, e.g. `components-button--default`)
  - Renders a Chromatic iframe: `<iframe src="https://main--691abcc79dfa560a36d0a74f.chromatic.com/iframe.html?id={id}&viewMode=story" />`
  - Responsive height, loading state, optional caption
  - Optionally shows "Open in Storybook" link

### Task 10.2: Use `<StoryEmbed>` in guidelines content

- [ ] **Step 1:** Replace hardcoded JSX snippets in `apps/guidelines/content/components/*.mdx`
  with `<StoryEmbed id="..." />` where a live demo is needed
- [ ] **Step 2:** Keep prose/written code snippets for simple prop demonstrations (not everything needs an iframe)

### Task 10.3: Update `derive-ai-docs.ts` to resolve embeds

- [ ] **Step 1:** When processing guidelines MDX → `.ai/`, find `<StoryEmbed id="..." />`
- [ ] **Step 2:** Map story ID back to `.stories.tsx` file + export name
- [ ] **Step 3:** Extract the render function source, strip Storybook boilerplate (args spread, decorators)
- [ ] **Step 4:** Replace the embed with a clean fenced code block in the `.ai/` output
- [ ] **Step 5:** Run improve-code-examples skill on the result (validate props, add imports)

### Task 10.4: Keeping examples in sync

- Stories change → Chromatic iframe automatically reflects the update (no rebuild needed)
- `.ai/` code examples update on next `yarn dev` run (derive step re-extracts source)
- improve-code-examples validates against current TypeScript interfaces

---

## Phase 11: Validation & Cleanup

> **Goal:** Fix all known issues accumulated during earlier phases, perform the cutover
> from translate-based workflow to content-as-source-of-truth, and verify everything works.

### Task 11.1: Fix broken MDX files

- [ ] Fix 3 broken MDX files excluded in Phase 3 (card, select, loading)
- [ ] Validate all `apps/guidelines/content/**/*.mdx` files parse without errors

### Task 11.2: Bundle size — code splitting

- [ ] Add route-based code splitting (lazy-load each section)
- [ ] Target: initial bundle < 300KB (currently 1.1MB)
- [ ] Verify Lighthouse performance score

### Task 11.3: Transition cutover (old → new workflow)

Performed after Phases 7, 9, and 10 are complete:

- [ ] **Step 1:** Run `derive-ai-docs.ts` to produce a clean `.ai/` baseline from current content
- [ ] **Step 2:** Run `ai-runner.ts` on all files to validate/improve
- [ ] **Step 3:** Commit `.ai/` as the authoritative baseline
- [ ] **Step 4:** Remove `yarn translate` from `yarn build` script
- [ ] **Step 5:** Remove `yarn translate` from CI deploy workflow (just `yarn workspace @iress/ids-guidelines build`)
- [ ] **Step 6:** Delete `scripts/translate-components.ts` (or archive in git history)
- [ ] **Step 7:** Remove `packages/*/.ai/*` ignore from `.gitignore`
- [ ] **Step 8:** Verify CI builds pass without translate
- [ ] **Step 9:** Verify `yarn dev` watcher correctly updates `.ai/` on content/story changes

### Task 11.4: Update `IDS-FULL-REFERENCE.md` generation

- [ ] Move concatenation logic from old translate script into `derive-ai-docs.ts`
- [ ] Source: `packages/components/.ai/**/*.md` + `.kiro/skills/` (AI-optimized, not raw MDX)
- [ ] Verify `.ai/IDS-FULL-REFERENCE.md` is regenerated correctly
- [ ] Re-upload to Iris Gemini Gem

### Task 11.5: Architecture diagrams

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

### Task 11.6: Documentation

- [ ] Update `AGENTS.md` to reflect new workflow (no more `yarn translate`, use `yarn dev` for .ai updates)
- [ ] Update `README.md` development section if needed
- [ ] Add a `CONTRIBUTING.md` note about committing `.ai/` changes with PRs

---

## Action Item (non-code)

Submit Llama 3.2 3B model approval request via [Alfred portal](https://iress.atlassian.net/servicedesk/customer/portal/91):

- **Model:** Meta Llama 3.2 3B Instruct
- **Use case:** In-browser AI assistant for developer documentation site (WebLLM/WebGPU)
- **Data classification:** No sensitive data — only public IDS documentation as context
- **Justification:** Same Meta Llama family already approved (3.3 70B). Runs entirely in user's browser — no data leaves device. Internal developer tool, not client-facing.
- **Note:** WebLLM code will live in a separate private repo for security.
