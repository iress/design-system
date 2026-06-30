# AI Documentation Pipeline — Analysis & Consolidation Proposal

> Generated: 2026-05-30

## Status (Updated 2026-06-30)

| Phase | Status | Notes |
|-------|--------|-------|
| Phase A: Scaffold + guides copy | ✅ Done | CLI, strip-mdx, transform-imports, all subcommands |
| Phase B: Component docs — prose + meta | ✅ Done | 88 docs, meta enrichment, testMeta tables |
| Phase C: StoryEmbed resolution | ✅ Done | P1/P2/P3 extraction, prettier formatting, case-insensitive matching, sub-component paths, Foundation stories |
| Phase C2: Reference data extraction | ✅ Done | Plugin system (StoryPlugin + StoryOverridePlugin), 10+ plugins for breakpoints, icons, z-index, forms, feedback, etc. |
| Pipeline unification | ✅ Done | Single `--components` pass over all `apps/guidelines/content/` dirs. `--guides` is now an alias. |
| Phase D: Props extraction | ✅ Done | react-docgen-typescript + .d.ts fallback, type linking, MaterialSymbol detection, enum expansion, subComponents, additionalProps, CI check planned |
| Phase E: Append unreferenced recipes + cleanup | ✅ Done | Recipe stories appended to form/popover; stale files deleted |
| Phase F: Composition + styling props | ❌ Not started | |
| Phase G: Wire into build + cleanup | ❌ Not started | Includes CI prop table validation |

### Future Phases

| Phase | Status | Notes |
|-------|--------|-------|
| Phase H: Enriched index.json + llms.txt | ❌ Not started | Component catalog with descriptions, imports, keywords; fix llms.txt generation |

### Future Phases

| Phase | Status | Notes |
|-------|--------|-------|
| Phase I: Documentation & skills sync | ❌ Not started | Update instructions, skills, and AGENTS.md to reflect new pipeline |

## Overview

The repository has **7 scripts** and **2 orchestration mechanisms** involved in translating, generating, or deriving AI-consumable documentation. This document catalogues each, identifies overlaps, and proposes a simplified architecture.

---

## Pipeline Inventory

### 1. `scripts/translate-components.ts`

| Attribute | Detail |
|-----------|--------|
| **Purpose** | Converts Storybook MDX docs into AI-consumable markdown. Produces two targets: `ai` (for npm `.ai/` directory) and `guidelines` (for the guidelines app content). Also generates `IDS-FULL-REFERENCE.md` and `index.json` manifest. |
| **Input** | `packages/components/src/{components,patterns}/**/*.docs.mdx`, `packages/components/docs/{Foundations,StylingProps,GetStarted,Resources}/*.mdx` |
| **Output** | `packages/components/.ai/{components,patterns,guides}/*.md`, `packages/components/.ai/index.json`, `apps/guidelines/content/{components,patterns,styling-props,foundations}/*.mdx`, `.ai/IDS-FULL-REFERENCE.md` |
| **Trigger** | `yarn translate:components` — called by `yarn translate` (part of `yarn build`/`yarn prepare`) |
| **Dependencies** | `tsx`, `fs`, `path` (no external AI tools) |
| **Status** | **Active** — core pipeline. ~68KB, the largest script. Dual-target (ai + guidelines) makes it complex. |

### 2. `scripts/derive-ai-docs.ts`

| Attribute | Detail |
|-----------|--------|
| **Purpose** | Generates `packages/components/.ai/` from `apps/guidelines/content/` — the *reverse* direction of `translate-components.ts` (guidelines → .ai). Strips MDX syntax, converts to plain markdown, extracts story source code inline. |
| **Input** | `apps/guidelines/content/{components,patterns}/**/*.mdx` |
| **Output** | `packages/components/.ai/{components,patterns}/*.md`, `packages/components/.ai/index.json` |
| **Trigger** | `yarn derive:ai-docs` (manual), or via `dev-watcher.ts` on file change |
| **Dependencies** | `tsx`, `glob` |
| **Status** | **Active** — used during development. Overlaps significantly with `translate-components.ts` (both produce `packages/components/.ai/`). |

### 3. `scripts/ai-runner.ts`

| Attribute | Detail |
|-----------|--------|
| **Purpose** | Detects available AI CLI tools (kiro-cli, copilot) and invokes them non-interactively with the `improve-code-examples` skill to improve code examples in documentation files. |
| **Input** | File paths passed via `--files` flag, or freeform `--prompt` |
| **Output** | Modified `.mdx` files in `apps/guidelines/content/` (in-place edits by the AI tool) |
| **Trigger** | `yarn ai-improve --target <target> --files <files>` (manual), or via `dev-watcher.ts` |
| **Dependencies** | `tsx`, external AI CLI (`kiro-cli` or `copilot` must be installed) |
| **Status** | **Active** — orchestrator for AI-powered code improvement. |

### 4. `scripts/dev-watcher.ts`

| Attribute | Detail |
|-----------|--------|
| **Purpose** | Watches `apps/guidelines/content/` and `packages/components/src/` for `.mdx` and `.stories.tsx` changes. On change: (1) runs `derive-ai-docs.ts` to sync `.ai/`, then (2) runs `ai-runner.ts` to improve code examples. |
| **Input** | File system events (chokidar) |
| **Output** | Triggers `derive-ai-docs.ts` and `ai-runner.ts` |
| **Trigger** | `yarn dev:improve` (manual, long-running watcher) |
| **Dependencies** | `chokidar`, `tsx`, AI CLI tools (optional — degrades gracefully) |
| **Status** | **Active** — development convenience tool. |

### 5. `scripts/generate-token-reference.ts`

| Attribute | Detail |
|-----------|--------|
| **Purpose** | Reads the design token schema and generates a comprehensive markdown reference with all token values, descriptions, aliases, and AA-compliant colour pairings. |
| **Input** | `@iress-oss/ids-tokens` package (imported `designTokens` schema) |
| **Output** | `packages/tokens/.ai/tokens-reference.md`, `.agents/skills/token-usage/references/token-reference.md` |
| **Trigger** | `yarn generate:token-reference` — called by `yarn translate` (part of build) |
| **Dependencies** | `tsx`, `@iress-oss/ids-tokens` |
| **Status** | **Active** — standalone, well-scoped. No overlap with other scripts. |

### 6. `scripts/translate-skills.ts`

| Attribute | Detail |
|-----------|--------|
| **Purpose** | Copies skills from `.agents/skills/` to package `.ai/skills/` directories for npm distribution. Strips YAML frontmatter and inlines reference files. |
| **Input** | `.agents/skills/<name>/SKILL.md` and `references/*.md` |
| **Output** | `packages/components/.ai/skills/{figma-to-ids,ui-translation,ui-doctor,version-migration}.md`, `packages/tokens/.ai/skills/token-usage.md` |
| **Trigger** | `yarn translate:skills` — called by `yarn translate` (part of build) |
| **Dependencies** | `tsx` |
| **Status** | **Active** — standalone, well-scoped. No overlap. |

### 7. `scripts/generate-llms-txt.ts`

| Attribute | Detail |
|-----------|--------|
| **Purpose** | Generates `llms.txt` files for each package from the `.ai/` directory content. Provides a standardised discovery file for LLM tools. |
| **Input** | `packages/components/.ai/index.json`, `packages/components/.ai/skills/*.md`, `packages/tokens/.ai/index.json`, `packages/tokens/.ai/skills/*.md`, `.agents/skills/<name>/SKILL.md` (frontmatter) |
| **Output** | `packages/components/llms.txt`, `packages/tokens/llms.txt` |
| **Trigger** | `yarn generate:llms-txt` — called by `yarn translate` (part of build) |
| **Dependencies** | `tsx` |
| **Status** | **Active** — standalone, well-scoped. Depends on outputs of other scripts. |

---

## Orchestration & Triggers

### `yarn translate` (build-time pipeline)

```
yarn translate
  ├── yarn translate:components    → translate-components.ts
  ├── yarn generate:token-reference → generate-token-reference.ts
  ├── yarn translate:skills        → translate-skills.ts
  └── yarn generate:llms-txt       → generate-llms-txt.ts
```

Called by `yarn build` and `yarn prepare`. This is the **production pipeline**.

### `yarn dev:improve` (development watcher)

```
dev-watcher.ts (chokidar)
  └── on .mdx/.stories.tsx change:
      ├── derive-ai-docs.ts --files <changed>
      └── ai-runner.ts --target <detected> --files <changed>
```

### Pre-commit hook (`.husky/pre-commit`)

- Warns (does not block) if staged `.mdx` files contain `{...args}` spreads
- Suggests running `yarn ai-improve`

### CI (`ci-cd.yml`)

- `yarn build` (which calls `yarn translate`) runs in the **setup** job
- Build outputs (including `packages/*/.ai`, `packages/*/llms.txt`) are cached
- `docs-check` job verifies `docs/` is up to date with guidelines build
- No CI job runs `derive-ai-docs` or `ai-runner` (those are dev-only)

---

## The `improve-code-examples` Skill

| Attribute | Detail |
|-----------|--------|
| **Location** | `.agents/skills/improve-code-examples/SKILL.md` |
| **Purpose** | Instructions for AI tools to validate and improve code examples (fix `{...args}`, verify props against TypeScript interfaces, add imports) |
| **Consumed by** | `ai-runner.ts` (passes as prompt context to kiro-cli/copilot) |
| **Not in `.kiro/skills/`** | Only in `.agents/skills/` |
| **Not distributed** | Not in `SKILL_TARGETS` of `translate-skills.ts` (internal-only skill) |

---

## Overlap Analysis

### Critical Overlap: `translate-components.ts` ↔ `derive-ai-docs.ts`

Both scripts produce `packages/components/.ai/{components,patterns}/*.md` and `index.json`:

| Aspect | `translate-components.ts` | `derive-ai-docs.ts` |
|--------|--------------------------|---------------------|
| **Source** | Storybook `.docs.mdx` (component source) | Guidelines `.mdx` (app content) |
| **Direction** | Source → .ai + guidelines | Guidelines → .ai |
| **When** | Build time (production) | Dev time (watcher) |
| **Story extraction** | From `.docs.mdx` `<ComponentExample>` tags | From `.stories.tsx` via `<StoryEmbed>` tags |
| **IDS-FULL-REFERENCE.md** | ✅ Generates | ❌ Does not |
| **Guidelines output** | ✅ Generates `apps/guidelines/content/` | ❌ Reads from it |

**The problem:** These two scripts work in opposite directions on the same data. During development, the flow is:

1. `translate-components.ts` generates guidelines content from Storybook MDX (build)
2. Developer edits guidelines content
3. `derive-ai-docs.ts` syncs those edits back to `.ai/` (watcher)
4. On next build, `translate-components.ts` overwrites guidelines content again

This creates a **circular dependency** where the source of truth is ambiguous.

### Minor Overlap: `IDS-FULL-REFERENCE.md`

Generated as a side-effect at the end of `translate-components.ts`. It's a concatenation of all `.ai/` files — purely for Gemini Gem upload. Could be a separate step.

---

## Consolidation Proposal

### Proposed Architecture: 2 Scripts + 1 Orchestrator

#### Decision: Single Source of Truth

The guidelines app content (`apps/guidelines/content/`) should be the **source of truth** for documentation. Reasons:
- It's what developers edit directly
- It's what the guidelines site builds from
- It's richer (MDX with interactive examples)

The `.ai/` directory is a **derived artifact** for npm distribution.

#### Proposed Scripts

| Script | Responsibility |
|--------|---------------|
| **`scripts/translate.ts`** | Single script that derives ALL `.ai/` content from source. Replaces `translate-components.ts` (ai target only) + `derive-ai-docs.ts` + `translate-skills.ts` + `generate-token-reference.ts` + `generate-llms-txt.ts`. Orchestrates sub-steps internally. |
| **`scripts/ai-improve.ts`** | Renamed `ai-runner.ts`. Invokes AI tools to improve code examples. Unchanged in function. |
| **`scripts/dev-watcher.ts`** | Kept as-is. Calls `translate.ts --files <changed>` + `ai-improve.ts`. |

#### Proposed Data Flow

```
┌─────────────────────────────────────────────────────────────────────┐
│                        SOURCE OF TRUTH                               │
├─────────────────────────────────────────────────────────────────────┤
│  apps/guidelines/content/**/*.mdx     (prose, usage docs, embeds)   │
│  packages/components/src/**/mocks/*.tsx (code examples via ?raw)    │
│  packages/components/src/**/meta/index.tsx (description, testMeta)  │
│  packages/components/src/**/*.stories.tsx (story→mock mapping)      │
│  .agents/skills/*/SKILL.md            (skill definitions)           │
│  @iress-oss/ids-tokens schema         (token data)                  │
└──────────────────────────────┬──────────────────────────────────────┘
                               │
                    ┌──────────▼──────────┐
                    │  scripts/translate.ts │
                    │                      │
                    │  Subcommands:        │
                    │  --components        │
                    │  --tokens            │
                    │  --skills            │
                    │  --llms-txt          │
                    │  --full-reference    │
                    │  --all (default)     │
                    └──────────┬──────────┘
                               │
              ┌────────────────┼────────────────┐
              ▼                ▼                 ▼
┌──────────────────┐ ┌─────────────────┐ ┌──────────────┐
│ packages/        │ │ packages/       │ │ .ai/IDS-FULL │
│ components/.ai/  │ │ tokens/.ai/     │ │ -REFERENCE.md│
│  ├─ components/  │ │  ├─ tokens-ref  │ └──────────────┘
│  ├─ patterns/    │ │  ├─ skills/     │
│  ├─ guides/      │ │  └─ index.json  │
│  ├─ skills/      │ │                 │
│  ├─ index.json   │ │ packages/       │
│  └─ llms.txt     │ │ tokens/llms.txt │
└──────────────────┘ └─────────────────┘

              ┌──────────────────────────┐
              │  scripts/ai-improve.ts   │
              │  (invokes kiro-cli/      │
              │   copilot on .mdx files) │
              └──────────┬───────────────┘
                         │
                         ▼
              apps/guidelines/content/**/*.mdx
              (in-place improvements)
```

#### Development Flow

```
Developer edits .mdx
        │
        ▼
dev-watcher.ts detects change
        │
        ├──► translate.ts --components --files <changed>
        │         └──► updates packages/components/.ai/
        │
        └──► ai-improve.ts --target guidelines --files <changed>
                  └──► AI improves code examples in-place
```

### What Can Be Removed

| Item | Reason |
|------|--------|
| `scripts/derive-ai-docs.ts` | Merged into `translate.ts` (its logic becomes the `--components` subcommand reading from guidelines content) |
| `scripts/translate-components.ts` `--target=guidelines` mode | The guidelines content IS the source now; no need to generate it from Storybook MDX |
| `scripts/generate-token-reference.ts` (standalone) | Becomes a subcommand of `translate.ts` |
| `scripts/translate-skills.ts` (standalone) | Becomes a subcommand of `translate.ts` |
| `scripts/generate-llms-txt.ts` (standalone) | Becomes a subcommand of `translate.ts` |
| Circular flow (Storybook MDX → guidelines → .ai) | Replaced by unidirectional: guidelines → .ai |

### What Stays (Unchanged)

| Item | Reason |
|------|--------|
| `scripts/ai-runner.ts` (renamed `ai-improve.ts`) | Distinct responsibility (AI invocation), no overlap |
| `scripts/dev-watcher.ts` | Orchestration layer, just updates which scripts it calls |
| `.agents/skills/improve-code-examples/SKILL.md` | Consumed by ai-improve, not part of translation |
| Pre-commit hook | Lightweight warning, no change needed |

### Migration Steps

1. **Resolve source-of-truth:** Confirm guidelines content is canonical. Run `translate-components.ts --target=guidelines` one final time to ensure guidelines are up to date, then freeze.
2. **Build `translate.ts --components`** — the core subcommand that produces `.ai/` docs:
   - Reads `apps/guidelines/content/{components,patterns}/*.mdx` for prose (usage, do's/don'ts)
   - When encountering `<StoryEmbed storyId="..." />`, resolves it to a code example:
     - **P2 (mock + withSource):** Follow `withSource(XxxSource, ...)` → `?raw` import → read mock file → strip `@/main` → inline as fenced code block
     - **P1 (args-only):** Read the story's `args` object → generate JSX from component + args (e.g. `{ mode: 'primary', children: 'Button' }` → `<IressButton mode="primary">Button</IressButton>`)
     - **P3 (inline render):** Extract the JSX from the `render` function body → inline as code block
   - Also appends ALL mock source files for the component as "Additional Examples" (even those not referenced by `<StoryEmbed>`)
   - For P1/P3 stories without mocks, generates code examples from args/render and appends those too
   - Reads `meta/index.tsx` for `description` and `testMeta` → generates `## Testing` section
   - Reads `componentStoryMeta` from stories for structured metadata
   - **Props extraction:** Uses `react-docgen-typescript` (already a dep) to extract the public props interface → generates `## Props` table with prop name, type, default, and JSDoc description. Resolves extended interfaces into a flat table.
   - **Recipe extraction:** Stories tagged `['recipe']` are grouped under a `## Recipes` section with their story name as heading and code example beneath
   - **Dynamic tab extraction:** Stories tagged `['tab:<name>']` are each grouped under a dedicated section. The section heading and description come from `parameters.idsConfig.tabDescriptions[name]` in the story meta. Handles slots, rules, patterns, and any future tabs generically — no hardcoding per tab type.
   - **Migration extraction:** Stories tagged `['migration']` are grouped under a `## Migration` section with old→new code diffs
   - **Styling props:** Appends a `## Styling Props` section noting that the component accepts all IDS styling props (spacing, colour, layout, typography, radius) with a reference to the full styling props documentation. The pipeline reads from `apps/guidelines/content/styling-props/` to generate a shared props summary.
   - **Component relationships:** Extracts decorator patterns (e.g. `IressForm` wrapping `IressFormField`) and documents required providers/parents in a `## Composition` note
   - Output structure per component:
     ```markdown
     # ComponentName
     > description from meta
     ## Import
     ## Props
     ## Usage (prose from guidelines)
     ## Examples (code from stories)
     ## Recipes (tagged recipe stories)
     ## Slots (if applicable)
     ## Validation Rules (if applicable)
     ## Migration (if applicable)
     ## Composition (required parents/providers)
     ## Testing (from testMeta)
     ```
   - Output: `packages/components/.ai/{components,patterns}/*.md` + `index.json`
   - **Guides copy:** Also copies and strips MDX from non-component content directories into `.ai/`, mirroring the guidelines content structure:
     - `apps/guidelines/content/foundations/*.mdx` → `packages/components/.ai/foundations/*.md`
     - `apps/guidelines/content/get-started/*.mdx` → `packages/components/.ai/get-started/*.md`
     - `apps/guidelines/content/resources-migration-guides/*.mdx` → `packages/components/.ai/migration/*.md`
     - `apps/guidelines/content/styling-props/*.mdx` → `packages/components/.ai/styling-props/*.md`
     - These are stripped of MDX syntax (imports, JSX components) and converted to plain markdown
     - The `.ai/` directory mirrors the guidelines site navigation — no flattening

---

## Implementation Phases

### Phase A: Scaffold + guides copy

- Create `scripts/translate.ts` CLI entry point with subcommand routing
- Create `scripts/translate/helpers/strip-mdx.ts` — strips MDX imports, exports, JSX components → clean markdown
- Create `scripts/translate/helpers/transform-imports.ts` — `@/main` → `@iress-oss/ids-components`
- Implement guides copy: read all MDX from foundations/get-started/migration/styling-props, strip, write to `.ai/`
- Wire `--tokens`, `--skills`, `--llms-txt` as delegating wrappers to existing scripts
- **Test:** `yarn tsx scripts/translate.ts` produces `.ai/{foundations,get-started,migration,styling-props}/` with clean markdown

### Phase B: Component docs — guidelines prose + meta

- For each component/pattern guidelines MDX:
  - Read and strip MDX to markdown (but keep `<StoryEmbed>` markers for Phase C)
  - Read `meta/index.tsx` for `description` and `import` statement
  - Assemble with correct section order: `# Name` → `> description` → `## Import` → `## Props` (placeholder) → guidelines prose → `## Testing`
- Render `testMeta` into a markdown table for the Testing section
- **Test:** `yarn tsx scripts/translate.ts --components` produces `.ai/components/*.md` with prose + testing tables

### Phase C: StoryEmbed resolution + mock extraction

- Parse `<StoryEmbed id="...">` markers left in the markdown
- Resolve story ID → find story export in `.stories.tsx` → find `withSource(XxxSource, ...)` → follow `?raw` import → read mock file
- Transform imports in mock source, inline as fenced code block replacing the StoryEmbed marker
- For P1 (args-only) stories referenced by StoryEmbed: generate JSX from component + args
- For P3 (inline render) stories: extract render function body
- Append ALL mock files not already referenced as "Additional Examples"
- **Test:** Alert/Button `.ai/` docs have inline code examples instead of `<StoryEmbed>` markers

### Phase C2: Reference story data extraction

- For StoryEmbeds with `controls={false}` or stories tagged `['reference']`:
  - Instead of showing the React source code, extract the static data from the mock
  - Parse data arrays/objects from the mock file (e.g. `stylingPropsReference`, `TableColumnReference`)
  - Render the data as a markdown table directly
  - This produces AI-consumable reference content (the "output") rather than implementation code
- Applies to: styling props reference table, Table column API, any future reference stories
- **Test:** `.ai/styling-props/overview.md` has an actual props reference table, not React code

### Phase D: Props extraction

- Use `react-docgen-typescript` to extract public props interface per component
- Render as markdown table (prop | type | default | description)
- Insert into the `## Props` placeholder from Phase B
- **Test:** `.ai/components/alert.md` has a complete Props table

### Phase E: Append unreferenced recipe stories + cleanup

- Scan stories files for `tags: ['recipe']` exports after StoryEmbed resolution
- Track which story IDs were already resolved during Phase C
- Append unreferenced recipe stories (P2 mocks only) under a `## Recipes` section at the bottom of the component doc
- Skip `['migration']` stories — migration content lives in guidelines MDX with diff code blocks (remove migration stories from Storybook in a separate task)
- Skip `['tab:*']` stories — Storybook UI groupings, not documentation content
- Delete stale files from old pipeline (`form-recipes.md`, `styling-props.md`, etc.)
- **Test:** Recipe stories not in guidelines MDX are appended to the component doc

### Phase F: Composition + styling props + full-reference + index

- Detect decorator patterns in stories (e.g. `IressForm` wrapping children) → generate `## Composition` notes
- Append shared `## Styling Props` section to each component doc
- Implement `--full-reference` subcommand (concatenates all `.ai/` files)
- Generate `index.json` manifest listing all docs with metadata
- **Test:** Full pipeline produces complete, self-contained `.ai/` output

### Phase G: Wire into build + cleanup

- Update `package.json`: `"translate": "tsx scripts/translate.ts"`
- Remove old scripts (translate-components.ts, derive-ai-docs.ts)
- Update `dev-watcher.ts` to call new script
- Verify `yarn build` → `yarn translate` works end-to-end
- Add CI validation script: cross-reference `.ai/` prop tables against exported TypeScript interfaces to catch drift (missing props, incorrect types, stale descriptions). Run as part of `yarn test:ci`.
- **Test:** CI-equivalent build succeeds
3. **Add `testMeta` → .ai/ sync** to `translate.ts --components`: import `testMeta` from each component's `meta/index.tsx`, generate the `## Testing` section with test ID table in the `.ai/` output.
4. **Move token-reference, skills, llms-txt** into `translate.ts` as subcommands (or keep as imported modules called sequentially).
5. **Remove `translate-components.ts`** — its logic is replaced by the new `--components` path.
6. **Remove `derive-ai-docs.ts`** — absorbed into `translate.ts`.
7. **Update `package.json`** scripts:
   ```json
   "translate": "tsx ./scripts/translate.ts",
   "translate:components": "tsx ./scripts/translate.ts --components",
   "ai-improve": "tsx ./scripts/ai-improve.ts",
   "dev:improve": "tsx ./scripts/dev-watcher.ts"
   ```
8. **Update `dev-watcher.ts`** to call `translate.ts --components --files <changed>` instead of `derive-ai-docs.ts`.
9. **Verify CI** — `yarn build` still calls `yarn translate` which now runs the unified script.

### Risk Assessment

| Risk | Mitigation |
|------|-----------|
| `IDS-FULL-REFERENCE.md` breaks for Gemini Gem | Include as `--full-reference` subcommand, tested in CI |
| Story source extraction complexity | Handled by the story-code-patterns migration (see `plans/story-code-patterns.md`). Once stories are standardised, extraction is straightforward. This work is done first, then absorbed into `translate.ts`. |

### Future: Token Documentation in Guidelines

Token documentation (`packages/tokens/.ai/`) is currently generated from `packages/tokens/` source data via `generate-token-reference.ts`. Once token docs are moved into `apps/guidelines/content/tokens/` (Phase 9 of the guidelines plan), the `--tokens` subcommand of `translate.ts` will read from guidelines content instead of the tokens package directly — following the same unidirectional pattern as components.

This means the final unified flow becomes:

```
apps/guidelines/content/
  ├─ components/*.mdx  ──► translate.ts --components ──► packages/components/.ai/
  ├─ patterns/*.mdx    ──► translate.ts --components ──► packages/components/.ai/
  ├─ tokens/*.mdx      ──► translate.ts --tokens     ──► packages/tokens/.ai/
  └─ (all content)     ──► translate.ts --full-reference ──► .ai/IDS-FULL-REFERENCE.md
```

Single source of truth (guidelines content) → multiple derived outputs. No circular dependencies.

### Phase H: Enriched index.json + llms.txt

Transform `index.json` from a bare slug list into a searchable component catalog, and fix `llms.txt` generation to use it:

```json
{
  "components": [
    {
      "slug": "alert",
      "name": "IressAlert",
      "description": "Communicates important information inline with page content.",
      "import": "import { IressAlert } from '@iress-oss/ids-components';",
      "keywords": ["feedback", "error", "warning", "info", "status"],
      "category": "components",
      "path": "components/alert.md"
    }
  ]
}
```

- [ ] Generate from meta (description, import) already available at translate time
- [ ] Add keywords from guidelines content (extracted from "When to use" sections)
- [ ] Include all types: components, patterns, foundations, styling-props, get-started
- [ ] Rewrite `generate-llms-txt.ts` to read from enriched manifest (fixes current error)
- [ ] Generate proper `llms.txt` with component descriptions and file paths
- [ ] Consider: should skills be listed here too?


### Phase I: Documentation & skills sync

Update all instructions, skills, and agent docs to reflect the new translate pipeline:

- [ ] **`.github/instructions/story-patterns.instructions.md`** — Add rules for AI-translatable stories:
  - P1 args must be self-contained literals (no `...Default.args` spreads)
  - P3 renders must not use `.map()` over constants — use explicit repeated elements
  - `children` Storybook control mappings are handled by plugins
  - `{...args}` is fine; the translator inlines them
- [ ] **`.agents/skills/improve-code-examples/SKILL.md`** — Update to reflect:
  - Code examples are auto-generated by `scripts/translate.ts --components`
  - Fixing quality means fixing source (stories/MDX), not `.ai/` output directly
  - Document `additionalProps` and `subComponents` in ComponentMeta
- [ ] **`.agents/skills/repo-maintenance/SKILL.md`** — Update translate pipeline reference:
  - Unified `--components` command covers all content directories
  - Plugin system for story overrides
  - `ComponentMeta.subComponents` and `additionalProps`
- [ ] **`AGENTS.md`** — Update build section to reference unified translate pipeline
- [ ] **`.github/instructions/component-creation.instructions.md`** — Add steps:
  - Add `additionalProps` to meta if component has conditional/discriminated union types
  - Add `subComponents` to meta if it has sub-components needing props docs
  - Ensure stories referenced by StoryEmbed are P2 (mock+withSource) or have explicit renders

