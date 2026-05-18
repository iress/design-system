# AGENTS.md

Iress Design System (IDS) monorepo — React component library and design tokens for Iress products.

## Setup

```bash
corepack enable
yarn
yarn prepare        # installs husky hooks and builds all packages
```

Node 22, Yarn 4 (Berry). The `packageManager` field in `package.json` pins the exact Yarn version; `corepack enable` is required to activate it.

## ⚠️ Long-running commands — never run in agent workflows

Any `dev`, `test` (without `:coverage`), or `watch` command starts a persistent process that **never exits**. Always use these non-blocking alternatives:

| Instead of                    | Use                                                          |
| ----------------------------- | ------------------------------------------------------------ |
| `yarn dev` / `yarn storybook` | `yarn build` (one-shot build)                                |
| `yarn workspace ... run test` | `yarn workspace ... run test:coverage` (runs once and exits) |

## Build

```bash
yarn build           # builds all packages (topological order) then runs translate scripts
```

The `yarn monorepo` alias runs `yarn workspaces foreach -Ai --topological-dev --exclude=@iress/design-system-monorepo`. Use it for cross-package commands.

## Testing

```bash
yarn test:coverage           # all packages, with coverage
yarn test:ci                 # coverage + threshold check

# single package
yarn workspace @iress-oss/ids-components run test:coverage

# single file
yarn workspace @iress-oss/ids-components run test:coverage Button.test.tsx
```

Tests use Vitest. Test startup can take 30+ seconds — this is normal, not a failure. Wait for explicit PASS/FAIL output.

Test files must live inside each package's `src/` directory. Do not create tests for pure interface/type files with no runtime behavior.

## Type checking

```bash
yarn typecheck               # all packages
```

## Bundle size

```bash
yarn size                    # check all packages against budgets
yarn size:check              # same, but JSON output (useful for scripting)
```

Budgets are defined in `.size-limit.json`. The `ci-cd.yml` workflow checks bundle sizes as part of the validation matrix on every push.

## Linting

```bash
yarn lint                    # all packages
yarn workspace @iress-oss/ids-components exec npx eslint src/components/Button/Button.tsx --fix
```

ESLint 10 with flat config. Key rules:

- TypeScript strict mode (`@typescript-eslint/no-explicit-any: error`)
- Prettier enforced via eslint-plugin-prettier
- `@typescript-eslint/consistent-type-imports` — prefer `import type { Foo }` inline style
- Unused vars with `_` prefix are allowed

## Code style

- TypeScript strict, single quotes, semicolons, trailing commas (`all`), 2-space indent
- LF line endings, UTF-8
- Markdown/MDX: 80 char line length
- Mock/example components (in `mocks/` dirs, used by Storybook stories) must NOT use `styled` from `@/styled-system/jsx` — use plain HTML elements with inline styles or CSS classes instead. `styled` is an internal implementation detail not exposed to consumers.
- Mock/example components must import IDS components from `@/main` (e.g. `import { IressButton } from '@/main'`). The build replaces `@/main` with `@iress-oss/ids-components` in displayed source examples.
- Styling should be in CSS (recipes/styles files) where possible, not inline styles. Inline styles are a last resort for truly dynamic values (e.g. user-provided dimensions).
- See `.prettierrc.cjs` and `.editorconfig` for full config

## Monorepo structure

Core packages (build order: tokens → theme-preset → components):

- `packages/tokens/` — `@iress-oss/ids-tokens` — design tokens
- `packages/theme-preset/` — `@iress-oss/ids-theme-preset` — Panda CSS theme preset
- `packages/components/` — `@iress-oss/ids-components` — React component library (Panda CSS)

Supporting: `storybook-config/`, `storybook-okta/`, `storybook-sandbox/`, `storybook-toggle-stories/`, `storybook-version-badge/`

## File organization

- Implementation: Imports → Types/Interfaces → Constants → Helper Functions → Main Exports
- Tests: Imports → Mocks → Constants/Test Data → Helper Functions → Test Suites

## PR guidelines

- Run `yarn lint`, `yarn typecheck`, and `yarn test:coverage` before committing
- Husky pre-commit and pre-push hooks enforce linting and tests
- Follow existing patterns and conventions in the codebase
- Prefer minimal, targeted changes over over-engineering

## CI/CD

GitHub Actions workflow in `.github/workflows/ci-cd.yml`. Runs on all pushes and merge groups. Supports canary releases via workflow_dispatch.

## Security

- Never commit secrets or API keys
- See `SECURITY.md` in `packages/components/` and `packages/tokens/` for package-level security policies

## Additional context

- `.github/instructions/` — domain-specific instructions for component creation, bug fixing, PR review, file organization, ESLint usage, and testing
- `.agents/skills/` — agent skills for Figma-to-IDS translation, token usage, UI auditing, UI translation, and version migration
- `packages/components/.ai/` and `packages/tokens/.ai/` — package-level AI context
