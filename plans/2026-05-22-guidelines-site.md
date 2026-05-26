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

## Phase 3: Code Examples from Storybook

### Task 3.1: Build-time story source extraction

**Files:**
- Create: `apps/guidelines/scripts/extract-story-source.ts`
- Create: `apps/guidelines/src/components/StoryExample.tsx`
- Create: `apps/guidelines/src/data/story-sources.json` (generated)

- [ ] **Step 1: Create `apps/guidelines/scripts/extract-story-source.ts`**

This script reads Storybook CSF story files and extracts the source code of exported stories.

```typescript
import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { resolve, relative, basename } from 'path';

const STORIES_DIR = resolve(__dirname, '../../../packages/components/src/components');
const OUTPUT = resolve(__dirname, '../src/data/story-sources.json');

interface StorySource {
  componentName: string;
  storyName: string;
  source: string;
  filePath: string;
}

function findStoryFiles(dir: string): string[] {
  const results: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = resolve(dir, entry);
    if (statSync(full).isDirectory()) {
      results.push(...findStoryFiles(full));
    } else if (entry.endsWith('.stories.tsx') || entry.endsWith('.stories.ts')) {
      results.push(full);
    }
  }
  return results;
}

function extractStories(filePath: string): StorySource[] {
  const source = readFileSync(filePath, 'utf-8');
  const componentName = basename(filePath).replace(/\.stories\.tsx?$/, '');
  const exportRegex = /export const (\w+)[\s\S]*?(?=export const |\Z)/g;
  const stories: StorySource[] = [];
  let match;

  while ((match = exportRegex.exec(source)) !== null) {
    const storyName = match[1];
    if (storyName === 'default') continue;
    stories.push({
      componentName,
      storyName,
      source: match[0].trim(),
      filePath: relative(STORIES_DIR, filePath),
    });
  }
  return stories;
}

const storyFiles = findStoryFiles(STORIES_DIR);
const allStories = storyFiles.flatMap(extractStories);
const grouped: Record<string, StorySource[]> = {};

for (const story of allStories) {
  if (!grouped[story.componentName]) grouped[story.componentName] = [];
  grouped[story.componentName].push(story);
}

writeFileSync(OUTPUT, JSON.stringify(grouped, null, 2));
console.log(`Extracted ${allStories.length} stories from ${storyFiles.length} files`);
```

- [ ] **Step 2: Create `apps/guidelines/src/components/StoryExample.tsx`**

```tsx
import { CodeBlock } from './CodeBlock';
import storySources from '@/data/story-sources.json';

const CHROMATIC_BASE = 'https://main--691abcc79dfa560a36d0a74f.chromatic.com';

interface StoryExampleProps {
  component: string;
  story?: string;
}

export function StoryExample({ component, story }: StoryExampleProps) {
  const componentStories = (storySources as Record<string, Array<{ storyName: string; source: string }>>)[component];
  if (!componentStories) return <p>No examples found for {component}</p>;

  const examples = story
    ? componentStories.filter((s) => s.storyName === story)
    : componentStories.slice(0, 3);

  return (
    <div>
      {examples.map((ex) => (
        <CodeBlock
          key={ex.storyName}
          language="tsx"
          chromaticUrl={`${CHROMATIC_BASE}/?path=/story/${component.toLowerCase()}--${ex.storyName.toLowerCase()}`}
        >
          {ex.source}
        </CodeBlock>
      ))}
    </div>
  );
}
```

- [ ] **Step 3: Add build script to `apps/guidelines/package.json`**

Update scripts:
```json
"scripts": {
  "prebuild": "tsx scripts/extract-story-source.ts",
  "dev": "tsx scripts/extract-story-source.ts && vite",
  "build": "tsx scripts/extract-story-source.ts && vite build",
  "preview": "vite preview",
  "typecheck": "tsc --noEmit"
}
```

Add to devDependencies:
```json
"tsx": "^4.21.0"
```

- [ ] **Step 4: Create placeholder `apps/guidelines/src/data/story-sources.json`**

```json
{}
```

- [ ] **Step 5: Run extraction and verify**

```bash
yarn workspace @iress/ids-guidelines build
```

Expected: `story-sources.json` is populated and build succeeds.

- [ ] **Step 6: Commit**

```bash
git add apps/guidelines/scripts apps/guidelines/src/components/StoryExample.tsx apps/guidelines/src/data
git commit -m "feat(guidelines): add build-time Storybook story source extraction"
```

---

## Phase 4: Client-Side Search

### Task 4.1: Flexsearch index built at compile time

**Files:**
- Create: `apps/guidelines/scripts/build-search-index.ts`
- Create: `apps/guidelines/src/components/Search.tsx`
- Create: `apps/guidelines/src/hooks/useSearch.ts`
- Modify: `apps/guidelines/package.json` (add flexsearch dep)

- [ ] **Step 1: Add flexsearch dependency**

Add to `apps/guidelines/package.json` dependencies:
```json
"flexsearch": "^0.7.43"
```

- [ ] **Step 2: Create `apps/guidelines/scripts/build-search-index.ts`**

```typescript
import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { resolve, basename } from 'path';

const CONTENT_DIR = resolve(__dirname, '../content');
const OUTPUT = resolve(__dirname, '../src/data/search-index.json');

interface SearchEntry {
  id: string;
  title: string;
  slug: string;
  content: string;
}

function stripMdx(source: string): string {
  return source
    .replace(/^export const meta[\s\S]*?};/m, '')
    .replace(/^import .*$/gm, '')
    .replace(/```[\s\S]*?```/g, '')
    .replace(/<[^>]+>/g, '')
    .replace(/[#*_`~\[\]()]/g, '')
    .replace(/\n{2,}/g, '\n')
    .trim();
}

const entries: SearchEntry[] = [];

for (const file of readdirSync(CONTENT_DIR)) {
  if (!file.endsWith('.mdx')) continue;
  const source = readFileSync(resolve(CONTENT_DIR, file), 'utf-8');
  const slug = basename(file, '.mdx');
  const titleMatch = source.match(/title:\s*['"](.+?)['"]/);
  const title = titleMatch?.[1] ?? slug;

  entries.push({
    id: slug,
    title,
    slug,
    content: stripMdx(source),
  });
}

writeFileSync(OUTPUT, JSON.stringify(entries, null, 2));
console.log(`Built search index with ${entries.length} entries`);
```

- [ ] **Step 3: Create `apps/guidelines/src/hooks/useSearch.ts`**

```typescript
import { useState, useMemo } from 'react';
import FlexSearch from 'flexsearch';
import searchData from '@/data/search-index.json';

interface SearchResult {
  id: string;
  title: string;
  slug: string;
}

export function useSearch() {
  const [query, setQuery] = useState('');

  const index = useMemo(() => {
    const idx = new FlexSearch.Index({ tokenize: 'forward' });
    for (const entry of searchData) {
      idx.add(entry.id as unknown as number, `${entry.title} ${entry.content}`);
    }
    return idx;
  }, []);

  const results: SearchResult[] = useMemo(() => {
    if (!query.trim()) return [];
    const ids = index.search(query, 10) as string[];
    return ids
      .map((id) => searchData.find((e) => e.id === id))
      .filter(Boolean) as SearchResult[];
  }, [query, index]);

  return { query, setQuery, results };
}
```

- [ ] **Step 4: Create `apps/guidelines/src/components/Search.tsx`**

```tsx
import { useSearch } from '@/hooks/useSearch';
import { Link } from '@tanstack/react-router';

export function Search() {
  const { query, setQuery, results } = useSearch();

  return (
    <div>
      <input
        type="search"
        placeholder="Search guidelines..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        aria-label="Search guidelines"
      />
      {results.length > 0 && (
        <ul role="listbox">
          {results.map((r) => (
            <li key={r.id}>
              <Link to="/guides/$slug" params={{ slug: r.slug }}>
                {r.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
```

- [ ] **Step 5: Add search to root layout**

Update `apps/guidelines/src/routes/__root.tsx` to include `<Search />` in the header nav.

- [ ] **Step 6: Update build script to include search index**

Update `apps/guidelines/package.json` build script:
```json
"build": "tsx scripts/extract-story-source.ts && tsx scripts/build-search-index.ts && vite build"
```

- [ ] **Step 7: Create placeholder `apps/guidelines/src/data/search-index.json`**

```json
[]
```

- [ ] **Step 8: Verify build**

```bash
yarn workspace @iress/ids-guidelines build
```

Expected: Build succeeds with search-index.json populated.

- [ ] **Step 9: Commit**

```bash
git add apps/guidelines
git commit -m "feat(guidelines): add client-side Flexsearch with compile-time index"
```

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
| 3 | Story source code displayed inline | Phase 2 |
| 4 | Client-side full-text search | Phase 2 |
| 5 | Knowledge Search panel (Flexsearch over IDS skills) | Phase 2 |
| 6 | Automated GitHub Pages deploys | Phase 1 |
| Future | WebLLM AI mode (private repo, pending approval) | Phase 5 context format |

Phases 3, 4, 5, and 6 are independent of each other (only depend on Phase 2 or 1) and can be worked in parallel.

## Action Item (non-code)

Submit Llama 3.2 3B model approval request via [Alfred portal](https://iress.atlassian.net/servicedesk/customer/portal/91):
- **Model:** Meta Llama 3.2 3B Instruct
- **Use case:** In-browser AI assistant for developer documentation site (WebLLM/WebGPU)
- **Data classification:** No sensitive data — only public IDS documentation as context
- **Justification:** Same Meta Llama family already approved (3.3 70B). Runs entirely in user's browser — no data leaves device. Internal developer tool, not client-facing.
- **Note:** WebLLM code will live in a separate private repo for security.
