# AI Documentation Pipeline — Analysis & Consolidation Proposal

> Generated: 2026-05-30

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
│  apps/guidelines/content/**/*.mdx     (component/pattern/guide docs)│
│  packages/components/src/**/*.stories.tsx (story source for embeds) │
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
2. **Extract `derive-ai-docs.ts` logic** as the new `--components` path in `translate.ts` (reads from `apps/guidelines/content/`, writes to `packages/components/.ai/`).
3. **Move token-reference, skills, llms-txt** into `translate.ts` as subcommands (or keep as imported modules called sequentially).
4. **Remove `translate-components.ts`** — its `--target=ai` logic is replaced by the new derive path; its `--target=guidelines` is no longer needed.
5. **Remove `derive-ai-docs.ts`** — absorbed into `translate.ts`.
6. **Update `package.json`** scripts:
   ```json
   "translate": "tsx ./scripts/translate.ts",
   "translate:components": "tsx ./scripts/translate.ts --components",
   "ai-improve": "tsx ./scripts/ai-improve.ts",
   "dev:improve": "tsx ./scripts/dev-watcher.ts"
   ```
7. **Update `dev-watcher.ts`** to call `translate.ts --components --files <changed>` instead of `derive-ai-docs.ts`.
8. **Verify CI** — `yarn build` still calls `yarn translate` which now runs the unified script.

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
