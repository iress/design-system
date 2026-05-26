# IDS Guidelines Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a standalone IDS guidelines site with MDX documentation, code examples sourced from Storybook stories, full-text search, and an AI assistance panel — deployed to GitHub Pages.

**Architecture:** React SPA using TanStack Router (hash-based routing for GH Pages), Vite for build, MDX for content pages. Code examples are extracted from Storybook CSF stories at build time. Flexsearch provides client-side search built at compile time. AI panel uses IDS skills compiled into static context with a client-side LLM API call.

**Tech Stack:** React 19, TanStack Router (file-based, hash history), Vite 8, MDX, Flexsearch, GitHub Actions, GitHub Pages

**Ticket:** [APE-1237](https://iress-wealth.atlassian.net/browse/APE-1237)

---

## Scope Breakdown

This plan is split into 6 independent phases. Each phase produces working, testable software.

1. **Project scaffolding** — Vite + React + TanStack Router app in `apps/guidelines`
2. **MDX content infrastructure** — MDX plugin, layout, and first guideline page
3. **Code examples from Storybook** — Build-time extraction of story source code
4. **Client-side search** — Flexsearch index built at compile time from MDX content
5. **AI assistance panel** — Contextual AI panel powered by compiled IDS skill knowledge
6. **GitHub Pages deployment** — GitHub Actions workflow for automated deploys

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

## Phase 5: AI Assistance Panel (Hybrid: Knowledge Search + WebLLM)

> **Strategy:** Ship with Flexsearch-powered "IDS Knowledge Search" as the default experience.
> WebLLM (Llama 3.2 3B, in-browser) is wired up behind a feature flag, pending model approval
> via the [Alfred portal](https://iress.atlassian.net/servicedesk/customer/portal/91).
> No server code required — everything runs client-side.

### Task 5.1: Compile IDS skill knowledge into chunked context

**Files:**
- Create: `apps/guidelines/scripts/compile-ai-context.ts`
- Create: `apps/guidelines/src/data/ai-context.json` (generated)

- [ ] **Step 1: Create `apps/guidelines/scripts/compile-ai-context.ts`**

Compiles IDS skills into chunked JSON. Each chunk is ~500 tokens for efficient RAG retrieval.

```typescript
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { resolve } from 'path';

const SKILLS_DIR = resolve(__dirname, '../../../.agents/skills');
const PACKAGE_AI_DIR = resolve(__dirname, '../../../packages/components/.ai');
const OUTPUT = resolve(__dirname, '../src/data/ai-context.json');

const SKILL_FILES = [
  'token-usage/SKILL.md',
  'ui-translation/SKILL.md',
  'figma-to-ids/SKILL.md',
  'ui-doctor/SKILL.md',
];

interface AiChunk {
  id: string;
  source: string;
  heading: string;
  content: string;
}

function chunkByHeadings(source: string, filePath: string): AiChunk[] {
  const sections = source.split(/^(?=#{1,3} )/m);
  return sections
    .filter((s) => s.trim().length > 50)
    .map((section, i) => {
      const headingMatch = section.match(/^#{1,3} (.+)/);
      return {
        id: `${filePath}-${i}`,
        source: filePath,
        heading: headingMatch?.[1] ?? filePath,
        content: section.trim(),
      };
    });
}

const chunks: AiChunk[] = [];

for (const skillPath of SKILL_FILES) {
  const full = resolve(SKILLS_DIR, skillPath);
  if (existsSync(full)) {
    chunks.push(...chunkByHeadings(readFileSync(full, 'utf-8'), skillPath));
  }
}

if (existsSync(PACKAGE_AI_DIR)) {
  for (const file of ['COMPONENTS.md', 'TOKENS.md']) {
    const full = resolve(PACKAGE_AI_DIR, file);
    if (existsSync(full)) {
      chunks.push(...chunkByHeadings(readFileSync(full, 'utf-8'), `components/.ai/${file}`));
    }
  }
}

writeFileSync(OUTPUT, JSON.stringify(chunks, null, 2));
console.log(`Compiled AI context: ${chunks.length} chunks from ${SKILL_FILES.length + 2} sources`);
```

- [ ] **Step 2: Create placeholder `apps/guidelines/src/data/ai-context.json`**

```json
[]
```

- [ ] **Step 3: Run and verify**

```bash
tsx apps/guidelines/scripts/compile-ai-context.ts
cat apps/guidelines/src/data/ai-context.json | python3 -c "import sys,json; d=json.load(sys.stdin); print(f'{len(d)} chunks')"
```

Expected: Non-zero chunks output.

- [ ] **Step 4: Commit**

```bash
git add apps/guidelines/scripts/compile-ai-context.ts apps/guidelines/src/data/ai-context.json
git commit -m "feat(guidelines): compile IDS skill knowledge into chunked context"
```

---

### Task 5.2: Knowledge Search mode (default — always available)

**Files:**
- Create: `apps/guidelines/src/hooks/useKnowledgeSearch.ts`
- Create: `apps/guidelines/src/components/AiPanel.tsx`

- [ ] **Step 1: Create `apps/guidelines/src/hooks/useKnowledgeSearch.ts`**

Uses Flexsearch to find relevant skill chunks and displays them as formatted answers.

```typescript
import { useMemo } from 'react';
import FlexSearch from 'flexsearch';
import aiChunks from '@/data/ai-context.json';

export interface KnowledgeResult {
  heading: string;
  source: string;
  content: string;
}

const index = new FlexSearch.Index({ tokenize: 'forward' });
aiChunks.forEach((chunk, i) => {
  index.add(i, `${chunk.heading} ${chunk.content}`);
});

export function useKnowledgeSearch(query: string): KnowledgeResult[] {
  return useMemo(() => {
    if (!query.trim()) return [];
    const ids = index.search(query, 5) as number[];
    return ids.map((i) => aiChunks[i]).filter(Boolean);
  }, [query]);
}
```

- [ ] **Step 2: Create `apps/guidelines/src/components/AiPanel.tsx`**

```tsx
import { useState } from 'react';
import { useKnowledgeSearch } from '@/hooks/useKnowledgeSearch';

const AI_ENABLED = false; // Feature flag — flip when Llama 3.2 3B is approved

export function AiPanel() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const results = useKnowledgeSearch(query);

  if (!open) {
    return (
      <button onClick={() => setOpen(true)} aria-label="Open IDS knowledge panel">
        💡 Ask IDS
      </button>
    );
  }

  return (
    <aside aria-label="IDS knowledge panel">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>IDS Knowledge{AI_ENABLED ? ' (AI)' : ''}</h2>
        <button onClick={() => setOpen(false)} aria-label="Close panel">×</button>
      </div>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="How do I use IressStack with spacing tokens?"
          aria-label="Ask a question about IDS"
        />
      </form>
      {results.length > 0 && (
        <div>
          {results.map((r, i) => (
            <details key={i} open={i === 0}>
              <summary>
                <strong>{r.heading}</strong>
                <small> — {r.source}</small>
              </summary>
              <pre style={{ whiteSpace: 'pre-wrap', fontSize: '0.85em' }}>{r.content}</pre>
            </details>
          ))}
        </div>
      )}
      {query && results.length === 0 && <p>No results found. Try different keywords.</p>}
    </aside>
  );
}
```

- [ ] **Step 3: Add AI panel to root layout**

Import and render `<AiPanel />` in `apps/guidelines/src/routes/__root.tsx` alongside `<Outlet />`.

- [ ] **Step 4: Verify build**

```bash
yarn workspace @iress/ids-guidelines build
```

- [ ] **Step 5: Commit**

```bash
git add apps/guidelines/src/components/AiPanel.tsx apps/guidelines/src/hooks/useKnowledgeSearch.ts
git commit -m "feat(guidelines): add Knowledge Search panel with Flexsearch over IDS skills"
```

---

### Future Phase (separate repo): WebLLM AI Mode

> **Deferred:** WebLLM integration (Llama 3.2 3B, in-browser) will live in a **private repository**
> to reduce attack surface. It will consume the same `ai-context.json` compiled in Task 5.1.
> Pending model approval via [Alfred portal](https://iress.atlassian.net/servicedesk/customer/portal/91).
>
> The AiPanel component is designed to accept a pluggable AI mode — the private repo can
> provide a script/package that the guidelines site loads at runtime (e.g. via dynamic import
> from a CDN or as an optional dependency).

---

## Phase 6: GitHub Pages Deployment

### Task 6.1: GitHub Actions workflow

**Files:**
- Create: `.github/workflows/deploy-guidelines.yml`
- Modify: `apps/guidelines/vite.config.ts` (ensure base path is correct)

- [ ] **Step 1: Create `.github/workflows/deploy-guidelines.yml`**

```yaml
name: Deploy Guidelines Site

on:
  push:
    branches: [main]
    paths:
      - 'apps/guidelines/**'
      - '.agents/skills/**'
      - 'packages/components/src/components/**/*.stories.*'
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version-file: .nvmrc
      - run: corepack enable
      - run: yarn install --immutable
      - run: yarn workspace @iress/ids-guidelines build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: apps/guidelines/dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 2: Create 404.html for SPA hash routing fallback**

In `apps/guidelines/public/404.html`:
```html
<!doctype html>
<html>
  <head>
    <script>
      // Redirect all 404s to index.html for hash-based SPA routing
      window.location.replace(
        window.location.origin + '/design-system/' + '#' + window.location.pathname.replace('/design-system/', '')
      );
    </script>
  </head>
</html>
```

- [ ] **Step 3: Add `.nojekyll` file**

Create `apps/guidelines/public/.nojekyll` (empty file) to prevent GitHub Pages from processing with Jekyll.

- [ ] **Step 4: Verify full build pipeline**

```bash
yarn workspace @iress/ids-guidelines build
ls apps/guidelines/dist
```

Expected: `index.html`, `404.html`, `.nojekyll`, and `assets/` directory present.

- [ ] **Step 5: Commit**

```bash
git add .github/workflows/deploy-guidelines.yml apps/guidelines/public
git commit -m "feat(guidelines): add GitHub Actions deployment workflow for GitHub Pages"
```

---

## Summary

| Phase | Deliverable | Key dependency |
|-------|-------------|----------------|
| 1 | Working SPA shell with routing | None |
| 2 | MDX pages rendering with navigation | Phase 1 |
| 3 | Translate pipeline → guidelines MDX (from `.ai/` content) | Phase 2 |
| 4 | Client-side full-text search | Phase 2 |
| 5 | Knowledge Search panel (Flexsearch over IDS skills) | Phase 2 |
| 6 | Automated GitHub Pages deploys | Phase 1 |
| 7 | AI-improved code examples (skill + commit `.ai/`) | Phase 3 |
| 8 | Dogfood IDS components in guidelines site UI | Phase 1 |
| Future | WebLLM AI mode (private repo, pending approval) | Phase 5 context format |

Phases 3, 4, 5, 6, and 7 are independent of each other (only depend on Phase 2 or 1) and can be worked in parallel.

---

## Phase 7: AI-Improved Code Examples

> **Strategy:** Create a skill that uses Bedrock (Claude) to improve code examples in `.ai/`.
> Run locally with SSO credentials. Commit results to git — reviewable in PRs.
> No CI cost. The `.ai/` folder is committed (not gitignored) and serves both
> AI consumers and the guidelines site.

### Task 7.1: Commit `.ai/` folder (stop ignoring it)

- [ ] **Step 1:** Remove `packages/components/.ai/` from `.gitignore` if present
- [ ] **Step 2:** Commit the current `.ai/` output as baseline
- [ ] **Step 3:** Update `translate-components.ts` to not regenerate unchanged files (compare before write)

### Task 7.2: Create `improve-code-examples` skill

**Skill location:** `.kiro/skills/improve-code-examples/SKILL.md`

The skill instructs the AI agent to:
1. Read a component's `.ai/{component}.md` file
2. Find code examples (fenced `tsx` blocks)
3. For each example, evaluate quality:
   - Does it have `{...args}` spreads? → replace with concrete props
   - Does it use Storybook patterns (argTypes, render functions)? → simplify
   - Is it missing an import statement? → add one
   - Is it idiomatic React? → fix if not
4. Rewrite the code block in-place
5. Preserve all non-code content unchanged

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

### Task 7.3: Add Bedrock-powered batch mode (optional)

For bulk improvement without interactive agent sessions:

- [ ] Create `scripts/improve-examples.ts` with `--component` or `--all` flag
- [ ] Uses `@aws-sdk/client-bedrock-runtime` with Claude Sonnet
- [ ] Reads from `.ai/components/*.md`, improves code blocks, writes back
- [ ] Skips files where examples already look clean (no `{...args}`, has imports)
- [ ] `--dry-run` shows proposed changes without writing

**Run:** `npx tsx scripts/improve-examples.ts --all` (locally, with SSO auth)

---

## Phase 8: Dogfood IDS Components in Guidelines Site

> **Goal:** Replace plain HTML elements in the guidelines site UI with IDS components.
> The guidelines site *for* IDS should use IDS itself.

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

## Action Item (non-code)

Submit Llama 3.2 3B model approval request via [Alfred portal](https://iress.atlassian.net/servicedesk/customer/portal/91):
- **Model:** Meta Llama 3.2 3B Instruct
- **Use case:** In-browser AI assistant for developer documentation site (WebLLM/WebGPU)
- **Data classification:** No sensitive data — only public IDS documentation as context
- **Justification:** Same Meta Llama family already approved (3.3 70B). Runs entirely in user's browser — no data leaves device. Internal developer tool, not client-facing.
- **Note:** WebLLM code will live in a separate private repo for security.
