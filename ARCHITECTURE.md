# Architecture

## Monorepo Structure

```mermaid
flowchart TD
    subgraph Core["Core Packages (build order)"]
        direction LR
        Tokens["@iress-oss/ids-tokens<br/>packages/tokens/"]
        ThemePreset["@iress-oss/ids-theme-preset<br/>packages/theme-preset/"]
        Components["@iress-oss/ids-components<br/>packages/components/"]
        Tokens --> ThemePreset --> Components
    end

    subgraph Storybook["Storybook Packages"]
        SBConfig["storybook-config"]
        SBOkta["storybook-okta"]
        SBSandbox["storybook-sandbox"]
        SBToggle["storybook-toggle-stories"]
        SBBadge["storybook-version-badge"]
    end

    subgraph Apps["Apps"]
        Guidelines["apps/guidelines/<br/>Documentation site (GitHub Pages)"]
    end

    subgraph Scripts["Automation"]
        Translate["scripts/translate.ts<br/>AI docs pipeline"]
        Watcher["scripts/dev-watcher.ts<br/>Watches content + stories"]
    end

    Components --> SBConfig
    SBConfig --> Guidelines
    Components --> Translate
    Tokens --> Translate
```

## Package Dependency Graph

| Package | Depends on | Consumers |
|---------|-----------|-----------|
| `@iress-oss/ids-tokens` | — | theme-preset, components, translate pipeline |
| `@iress-oss/ids-theme-preset` | tokens | components (Panda CSS preset) |
| `@iress-oss/ids-components` | tokens, theme-preset | product applications, guidelines site |
| `@iress-oss/ids-storybook-config` | components | all Storybook addons, component stories |

## Technology Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Components | React 19 + TypeScript | UI library |
| Styling | Panda CSS + design tokens | Zero-runtime CSS-in-JS via theme preset |
| Build | Vite | Library bundling (components, tokens, theme-preset) |
| Testing | Vitest + Testing Library | Unit/integration tests |
| Storybook | Storybook 9 + Chromatic | Component development, visual regression |
| Documentation | MDX + TanStack Router | Guidelines site (SPA on GitHub Pages) |
| Search | Pagefind | Client-side full-text search on guidelines site |
| CI/CD | GitHub Actions | Lint, test, typecheck, size, deploy |
| Package Manager | Yarn 4 (Berry) + Corepack | Monorepo workspace management |
| Linting | ESLint 10 (flat config) + Prettier | Code quality enforcement |

## Build Pipeline

```mermaid
flowchart LR
    subgraph Build["yarn build"]
        direction LR
        B1["tokens build"] --> B2["theme-preset build"] --> B3["components build<br/>(panda prepare → vite)"] --> B4["translate pipeline"]
    end

    B3 --> Dist["dist/<br/>ESM + types + CSS"]
    B4 --> AI[".ai/<br/>docs + index + llms.txt"]
```

Topological build order is enforced by `yarn monorepo run build`. The translate pipeline runs after all packages are built so it can read the compiled `.d.ts` files for props extraction.

## Documentation Content Flow

Where content lives, what derives from what, and what ships where.

```mermaid
flowchart TD
    subgraph Sources["Source of Truth"]
        MDX["apps/guidelines/content/**/*.mdx<br/>(human-authored)"]
        Stories[".stories.tsx files<br/>(P1/P2/P3 patterns)"]
        Meta["meta/index.tsx<br/>(component metadata)"]
        TokenSchema["packages/tokens/src/schema/<br/>(token definitions)"]
        Skills[".agents/skills/*/SKILL.md"]
    end

    subgraph Pipeline["scripts/translate.ts"]
        T["--tokens"]
        C["--components"]
        S["--skills"]
        L["--llms-txt"]
        F["--full-reference"]
    end

    subgraph Outputs["Generated Artifacts (.ai/)"]
        CompDocs["packages/components/.ai/<br/>components/*.md, patterns/*.md,<br/>foundations/*.md, index.json"]
        TokenRef["packages/tokens/.ai/<br/>tokens-reference.md"]
        SkillsDocs["packages/components/.ai/skills/*.md"]
        LlmsFile["packages/*/llms.txt"]
        FullRefFile[".ai/IDS-FULL-REFERENCE.md"]
    end

    subgraph Consumers["Consumers"]
        NPM["npm package<br/>(@iress-oss/ids-components)"]
        Gem["Iris Gemini Gem"]
        GHPages["Guidelines Site<br/>(GitHub Pages)"]
        Storybook["Storybook<br/>(Chromatic)"]
    end

    MDX --> C
    Stories --> C
    Meta --> C
    TokenSchema --> T
    Skills --> S

    T --> TokenRef
    C --> CompDocs
    S --> SkillsDocs
    CompDocs --> L --> LlmsFile
    CompDocs --> F --> FullRefFile

    CompDocs --> NPM
    TokenRef --> NPM
    LlmsFile --> NPM
    FullRefFile --> Gem
    MDX --> GHPages
    Stories --> Storybook
```

## Dev Workflow

What happens when you edit content or stories during development.

```mermaid
sequenceDiagram
    participant Dev as Developer
    participant FS as File System
    participant Watcher as dev-watcher.ts
    participant Translate as translate.ts
    participant AI as .ai/ output

    Dev->>FS: Edit content/*.mdx or *.stories.tsx
    FS->>Watcher: chokidar detects change (2s debounce)

    alt Token source changed
        Watcher->>Translate: --tokens --components
        Translate->>AI: Regenerate token ref + all docs
    else Content/story changed
        Watcher->>Translate: --components
        Translate->>AI: Regenerate all component docs
    end

    Note over AI: Props extracted (react-docgen-typescript)<br/>Stories resolved (P1/P2/P3)<br/>Plugins applied (overrides)<br/>Code formatted (prettier)

    Dev->>FS: Commit .ai/ changes with PR
```

## Translate Pipeline Internals

```mermaid
flowchart LR
    subgraph CLI["translate.ts CLI"]
        direction TB
        T["--tokens"]
        C["--components"]
        S["--skills"]
        L["--llms-txt"]
        F["--full-reference"]
    end

    subgraph Helpers["scripts/translate/helpers/"]
        StripMDX["strip-mdx.ts<br/>MDX → markdown"]
        Resolve["resolve-stories.ts<br/>StoryEmbed → code"]
        Props["extract-props.ts<br/>react-docgen + .d.ts fallback"]
        Format["format-code.ts<br/>prettier"]
        TokenGen["generate-token-reference.ts"]
        TransSkills["translate-skills.ts"]
    end

    subgraph Plugins["scripts/translate/plugins/"]
        SP["StoryPlugin<br/>(children mapping, field rendering)"]
        OP["StoryOverridePlugin<br/>(breakpoints, icons, z-index,<br/>forms, feedback, tokens, etc.)"]
    end

    C --> StripMDX
    C --> Resolve
    C --> Props
    C --> Format
    Resolve --> SP
    Resolve --> OP
    T --> TokenGen
    S --> TransSkills
```

## CI/CD Pipeline

```mermaid
flowchart LR
    Push["Push / Merge Group"] --> Setup["Setup<br/>(Node, Yarn, Cache)"]
    Setup --> Build["Build<br/>(topological)"]
    Build --> Matrix["Validation Matrix"]

    subgraph Matrix
        Lint["lint"]
        TypeCheck["typecheck"]
        Test["test:ci"]
        Size["size"]
        Docs["docs-check"]
    end

    Matrix --> Publish["Publish<br/>(on main only)"]
```

The `docs-check` job rebuilds the guidelines site and fails if `docs/` is stale vs the committed version.

## Story Patterns (P1/P2/P3)

Stories follow three strict patterns to ensure the translate pipeline can extract clean, standalone code examples for AI documentation. This was a deliberate design decision — stories are both interactive Storybook demos AND the source material for shipped `.ai/` docs.

| Pattern | When to use | How it works |
|---------|-------------|--------------|
| **P1: Args-only** | Simple prop demos | Story has `args: { ... }` with literal values. Pipeline reads args and renders `<IressComponent prop="value" />` |
| **P2: Mock + withSource** | Complex examples, multi-component | A `mocks/` file has the full example. Story imports it with `?raw` and uses `withSource()`. Pipeline reads the raw file directly. |
| **P3: Inline render** | Interactive demos needing state/logic | Story has `render: (args) => <JSX />`. Pipeline extracts the render body and inlines args. |

**Why this matters:** Without these patterns, the pipeline would need to execute Storybook at build time to get rendered output. Instead, stories are statically analysable — the pipeline reads source files, not runtime output. This makes `yarn translate` fast (~5s for 98 docs) and deterministic.

**How it's enforced:**

- ESLint `no-restricted-syntax` bans `...OtherStory.args` spreads in P1 stories (args must be self-contained literals)
- ESLint `no-restricted-syntax` bans `render: () =>` without args (code panel needs args)
- ESLint `ids-local/require-story-meta` warns when primary stories are missing testMeta, description, or stylingProps
- `withCustomSource` and deprecated helpers are banned via `no-restricted-imports`
- Full reference: `.github/instructions/story-patterns.instructions.md`

## Key Design Decisions

| Decision | Rationale |
|----------|-----------|
| Panda CSS (zero-runtime) | No CSS-in-JS overhead at runtime; tokens compile to CSS variables |
| Guidelines MDX is source of truth | Single place to edit documentation; `.ai/` is derived |
| Stories use P1/P2/P3 patterns | Enables automated code extraction without runtime evaluation |
| Props via react-docgen-typescript | Reads TypeScript interfaces directly; `.d.ts` fallback for complex patterns |
| Plugins for story overrides | Generates from source data (constants, configs) — prevents drift |
| `componentStoryMeta()` helper | Standardises testMeta, description, stylingProps without hiding Storybook patterns |
| ESLint enforces quality | Catches missing meta, arg spreads, unprefixed types at authoring time |
| Component prefix (`Iress*`) | Avoids collisions with HTML elements and third-party libraries |
| Committed `.ai/` folder | Ships in npm package; AI tools can read docs without build step |
| `llms.txt` in package root | Standard discovery mechanism for AI agents to find component docs |
