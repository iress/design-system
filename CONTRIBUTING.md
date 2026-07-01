# Contributing

## Quick Start

```bash
corepack enable
yarn
yarn prepare        # installs husky hooks and builds all packages
```

Node 22, Yarn 4 (Berry). See `AGENTS.md` for the full setup and command reference.

## Before Submitting a PR

```bash
yarn lint            # ESLint + Prettier
yarn typecheck       # TypeScript
yarn test:coverage   # Vitest (all packages)
yarn translate       # Regenerate .ai/ docs
```

Husky pre-commit and pre-push hooks enforce linting and tests automatically.

## Component Development

### Creating a Component

1. Scaffold under `packages/components/src/components/MyComponent/`
2. Add `meta/index.tsx` with `heading`, `description`, `testMeta`, and links
3. Add a `.stories.tsx` file following [story patterns](#story-patterns)
4. Add JSDoc with `@example` on the exported component
5. Write tests in a `.test.tsx` file (use Testing Library)
6. Export from `packages/components/src/index.ts`

See `.github/instructions/component-creation.instructions.md` for the full guide.

### Story Patterns

Stories follow three strict patterns so the translate pipeline can extract code examples:

| Pattern | When | Example |
|---------|------|---------|
| **P1: Args-only** | Simple prop demos | `args: { variant: 'primary', children: 'Click' }` |
| **P2: Mock + withSource** | Complex examples | Import from `mocks/` with `?raw`, use `withSource()` |
| **P3: Inline render** | State/logic needed | `render: (args) => <Component {...args} />` |

Full reference: `.github/instructions/story-patterns.instructions.md`

### Styling

- Use Panda CSS recipes/styles files, not inline styles
- Use IDS tokens for all spacing, colours, radius, typography
- Mock components (in `mocks/` dirs) must NOT use `styled` from `@/styled-system/jsx`
- Mock components import IDS from `@/main` (build replaces with `@iress-oss/ids-components`)

## Guidelines Content

The guidelines site (`apps/guidelines/`) is the **source of truth** for all IDS documentation. The `packages/components/.ai/` folder is derived — never edit `.ai/` files directly.

### Content Structure

```
apps/guidelines/content/
├── components/       # Component docs (one .mdx per component)
├── patterns/         # Multi-component pattern guides
├── foundations/      # Design principles, accessibility, responsiveness
├── get-started/      # Getting started, common mistakes
├── styling-props/    # Styling props reference
├── tokens/           # Token docs (colour, spacing, radius, typography)
└── migration/        # Version migration guides
```

### Adding a Page

1. Create an MDX file in the appropriate section
2. Add the required `meta` export:

```mdx
export const meta = {
  title: 'Page Title',
  description: 'One sentence description.',
};

# Page Title

Content...
```

3. Use `<StoryEmbed id="section-component--story-name" />` for live examples
4. Run `yarn translate` to regenerate `.ai/` output

### MDX Rules

- Imports at the top (component meta, IDS components)
- Use absolute paths for links: `[Button](/components/button)`
- `<IressTabSet>` / `<IressTab label="...">` for tabbed content (converts to headings in `.ai/`)
- 80 character line length for prose
- Fenced code blocks: ` ```tsx ` for React, ` ```css ` for CSS

### Previewing

```bash
yarn workspace @iress/ids-guidelines run dev
```

### How Content Becomes .ai/ Docs

`yarn translate` reads MDX → strips syntax → resolves StoryEmbeds → extracts props → formats → writes to `.ai/`. See `ARCHITECTURE.md` for diagrams.

## Tokens

Design tokens live in `packages/tokens/src/schema/`. Changes to token values are automatically picked up by the translate pipeline and reflected in `.ai/tokens/tokens-reference.md`.

## Testing

- Tests live inside each package's `src/` directory
- Use Vitest + Testing Library
- Don't create tests for pure type files with no runtime behaviour
- Test startup can take 30+ seconds — wait for PASS/FAIL output

```bash
# Single file
yarn workspace @iress-oss/ids-components run test:coverage Button.test.tsx
```

## Committing

- Run `yarn translate` if you changed content, stories, or component meta
- Commit `.ai/` changes alongside your source changes
- PR titles: concise, under 70 characters
- Follow [Conventional Commits](https://www.conventionalcommits.org/) where possible

## AI Artifacts and Skills

### .ai/ Folders

Each published package has a `.ai/` folder shipped in npm:

- `packages/components/.ai/` — component docs, patterns, index.json, llms.txt
- `packages/tokens/.ai/` — token reference, index.json, skills

These are **generated artifacts** — never edit directly. Fix the source and run `yarn translate`.

### Creating a Skill

Skills live in `.agents/skills/<name>/SKILL.md`. They give AI agents contextual knowledge about IDS.

1. Create the skill directory: `.agents/skills/my-skill/`
2. Write `SKILL.md` with YAML frontmatter (description, trigger patterns)
3. Add reference files in `references/` if needed (these get inlined during translate)
4. Map it to a package in `scripts/translate/helpers/translate-skills.ts` (`SKILL_TARGETS`)
5. Run `yarn translate --skills` — it copies to the package `.ai/skills/` directory

Tips:
- Skills should be self-contained — inline any references so agents don't need filesystem access
- Include concrete examples (code, tables) not just prose instructions
- Test by pasting the skill content into an AI chat and asking it to use the knowledge
- Keep skills focused — one skill per concern (tokens, components, migration, etc.)

### llms.txt

Each package has a `llms.txt` at its root (included in npm `files`). Generated by `yarn translate --llms-txt`. This is the standard discovery file for AI agents — lists all available docs with paths and descriptions.

### IDS-FULL-REFERENCE.md

A single concatenated file (`.ai/IDS-FULL-REFERENCE.md`) containing all component docs, patterns, guides, and skills. Used as knowledge for the Iris Gemini Gem. Regenerated by `yarn translate --full-reference`.

### index.json

Each package `.ai/` folder has an `index.json` manifest:
- `packages/components/.ai/index.json` — generated by the translate pipeline (lists all docs with slug, type, name, description, import path)
- `packages/tokens/.ai/index.json` — generated by `--tokens` (package info, skills, sources, token categories)

## Key Files

| File | Purpose |
|------|---------|
| `ARCHITECTURE.md` | System diagrams and design decisions |
| `AGENTS.md` | Setup, commands, and AI agent instructions |
| `.github/instructions/` | Domain-specific guides (components, stories, testing, ESLint) |
| `.agents/skills/` | AI agent skills (figma-to-ids, ui-translation, ui-doctor, etc.) |
| `scripts/translate.ts` | Documentation generation pipeline |
| `scripts/dev-watcher.ts` | Auto-regenerates .ai/ on content/story changes |
