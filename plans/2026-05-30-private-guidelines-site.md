# Private Guidelines Site Plan — `iress-wealth/design-system`

**Goal:** Deploy a private guidelines site for `iress-wealth/design-system` using the same
framework as the public IDS guidelines, protected by GitHub authentication, composing
public IDS content alongside private wealth-specific content.

---

## Findings

### GitHub Enterprise Cloud — Confirmed ✅

Both orgs are on **GitHub Enterprise Cloud** (`plan.name: "enterprise"`):

| Org | Plan | Seats | Private Pages |
|-----|------|-------|---------------|
| `iress` | Enterprise | 738/750 | `members_can_create_private_pages: true` |
| `iress-wealth` | Enterprise | 738/750 | `members_can_create_private_pages: true`, `members_can_create_public_pages: false` |

**Key finding:** `iress-wealth` can create **private pages only** (public pages disabled).
This is exactly what we need — the site will be private by default.

### Existing Pages in `iress-wealth` — Confirmed ✅

Three repos already use GitHub Pages (`ddp-infrastructure`, `iressnet-services`, `cbam-dw-xplan-dataextract`).
The `ddp-infrastructure` site is confirmed private (`public: false`).

### `iress-wealth/design-system` — Ready

- Repo exists, is private, has no pages enabled yet
- Same enterprise, same seat pool as `iress`

### Confluence Policy — No blocker found ✅

Searched the Iress Confluence Security Guardrails document (page 1105395768 in INFOSEC space).
The guardrails cover application security (MFA, secrets, vulnerability scanning, access control)
but do not mention GitHub Pages or static site hosting restrictions. Since the guidelines site
is a static site with no data processing, PII, or secrets — and 3 repos already use private
Pages in the org — there is no policy blocker.

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│  @iress/ids-guidelines-framework (shared package)               │
│  - Vite + MDX config factory                                    │
│  - Layout shell (sidebar, header, search, AI panel)             │
│  - StoryEmbed, CodeBlock, MdxLayout components                  │
│  - Route generation (splat route, section grouping)             │
│  - Build scripts (Pagefind search index)                        │
│  - createGuidelinesApp(config) entry point                      │
└──────────────────────┬──────────────────────┬───────────────────┘
                       │                      │
        ┌──────────────▼──────────┐  ┌───────▼────────────────────┐
        │  iress/design-system    │  │  iress-wealth/design-system │
        │                         │  │                             │
        │  packages/components/   │  │  packages/components/       │
        │    src/                  │  │    src/ (wealth components) │
        │    guidelines/  ← MDX   │  │    guidelines/ ← wealth MDX│
        │    .ai/     ← derived   │  │    .ai/       ← derived    │
        │    meta/    ← metadata  │  │    meta/                    │
        │                         │  │                             │
        │  apps/guidelines/       │  │  apps/guidelines/           │
        │    (framework shell)    │  │    (framework shell)        │
        │    reads from:          │  │    reads from:              │
        │    - local guidelines/  │  │    - local guidelines/      │
        │                         │  │    - @iress-oss/ids-        │
        │  Public GitHub Pages    │  │      components/guidelines  │
        │  iress.github.io/ds     │  │                             │
        └─────────────────────────┘  │  Private GitHub Pages       │
                                     │  (org members only)         │
                                     └─────────────────────────────┘
```

### Content co-location (the key insight)

Guidelines content lives **inside `packages/components/`** — co-located with the source,
just like `.storybook/`, `meta/`, and `.ai/`:

```
packages/components/
  src/components/Button/          ← component source
  src/components/Button/meta/     ← metadata (heading, description, tags)
  guidelines/components/button.mdx  ← human-readable docs (shipped in npm)
  .ai/components/button.md         ← AI-optimized (derived from guidelines/)
```

This means:
- `guidelines/` is the **source of truth** for documentation
- `.ai/` is **derived** from `guidelines/` (AI-improved for LLM consumption)
- Both are shipped in the npm package via exports:
  - `@iress-oss/ids-components/guidelines/components/button` → MDX
  - `@iress-oss/ids-components/.ai/components/button` → markdown

The wealth repo imports public guidelines content at build time and renders it
alongside its own wealth-specific content — unified navigation, single site.

### How private pages auth works

- Site is deployed to GitHub Pages with visibility "private"
- Only users with **read access** to the repo can view the site
- Auth is handled by GitHub's session cookie — no separate login
- Users see a GitHub OAuth prompt if not already logged in
- No passwords, no tokens — just org membership

### Content composition in the wealth site

The private site includes public IDS content at **build time**:

1. `@iress-oss/ids-components` npm package ships `guidelines/` (MDX source)
2. The wealth guidelines app imports these as baseline pages
3. Wealth-specific overrides/additions sit alongside in local `guidelines/`
4. Navigation shows both, with clear labelling of what's IDS-shared vs wealth-specific
5. Wealth can override a public page by creating one with the same path

---

## Phases

### Phase 1: Move content into `packages/components/guidelines/`

Move `apps/guidelines/content/` → `packages/components/guidelines/` and update imports.

- [ ] Move `apps/guidelines/content/**/*.mdx` → `packages/components/guidelines/`
- [ ] Add `"./guidelines/*"` export to `packages/components/package.json`
- [ ] Update `apps/guidelines/` to read from `packages/components/guidelines/` (via workspace link or import)
- [ ] Update `derive-ai-docs.ts` to read from new location
- [ ] Update `ai-runner.ts` targets to point to new location
- [ ] Verify guidelines site still builds and works
- [ ] Verify `.ai/` derivation still works

### Phase 2: Extract shared framework package

Extract the reusable parts of `apps/guidelines/` into a shared package.

- [ ] Create `packages/guidelines-framework/` (or `packages/guidelines-app/`)
- [ ] Move: Vite config factory, MDX plugin setup
- [ ] Move: Layout components (`MdxLayout`, `CodeBlock`, `StoryEmbed`, `Search`, `AiPanel`)
- [ ] Move: Route generation logic (splat route, section grouping, 404)
- [ ] Move: Build scripts (Pagefind index generation)
- [ ] Export `createGuidelinesApp(config)` — accepts:
  - `title` — site title
  - `contentPaths` — array of directories to scan for MDX (local + imported)
  - `chromaticProjectId` — for StoryEmbed iframe URLs
  - `sections` — nav section config
  - `aiPanelUrl` — optional Iris/Gem link
- [ ] Refactor `apps/guidelines/` to be a thin shell consuming the framework
- [ ] Verify public site still builds and works

### Phase 3: Set up private guidelines in `iress-wealth/design-system`

- [ ] Create `apps/guidelines/` in the wealth repo using the shared framework
- [ ] Add `@iress-oss/ids-components` as dependency (for guidelines content)
- [ ] Configure `contentPaths` to include both local and imported guidelines
- [ ] Add wealth-specific content (components, patterns, tokens)
- [ ] Configure navigation to show both IDS-shared and wealth-specific sections
- [ ] Build and verify locally

### Phase 4: Deploy private GitHub Pages

- [ ] Enable GitHub Pages on `iress-wealth/design-system`
- [ ] Set visibility to "private" (default given org settings)
- [ ] Add CI workflow for automated deploys (or `docs/` folder approach)
- [ ] Verify auth works — org members can access, others get 404
- [ ] Add cross-link from wealth Storybook to the private guidelines site

### Phase 5: Cross-linking and composition UX

- [ ] Private site clearly labels which content is from public IDS vs wealth-specific
- [ ] Storybook `guidelinesUrl` function in wealth repo points to private pages URL
- [ ] Public guidelines site links to private site where relevant (with note about access)
- [ ] Consider: wealth site can override any public page by providing same path

---

## Alternatives considered

| Option | Verdict |
|--------|---------|
| GitHub Enterprise Private Pages | ✅ **Selected** — zero infra, native auth, already in use |
| Cloudflare Pages + Access | Good but unnecessary — adds vendor, Enterprise Pages suffices |
| Client-side auth gate | ❌ Not secure — content visible in source |
| Chromatic only | Covers Storybook but not guidelines content |
| Single combined site | ❌ Can't publish private content on public Pages |

---

## Open questions

1. ~~**Confirm with Platform Tech:** Is there any policy against enabling Pages on `iress-wealth/design-system`?~~ — Resolved: no blocker.
2. ~~**IP allowlist:** Will the same CI deploy issue (403 from GitHub Actions) apply?~~ — Use `docs/` folder approach (same as public site, proven to work in `ddp-infrastructure`).
3. **Content boundary:** What content is wealth-specific vs should be upstreamed to public IDS?

## Design decisions

- **npm package size:** `guidelines/` MDX files are shipped in the npm package but excluded from the built app bundle (they're only consumed at build time by the guidelines framework). This is the same pattern as `.ai/` — source content, not runtime code.
- **Versioning:** Wealth site uses `latest` of `@iress-oss/ids-components` for guidelines content. Content freshness over stability — wealth site always shows current IDS docs.
- **Framework extraction (Phase 2):** Do this upfront to avoid repeating the template. The current guidelines app structure is good and worth sharing immediately.
