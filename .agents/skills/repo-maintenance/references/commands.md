# Repo Maintenance Command Cheatsheet

Quick reference for common maintenance commands. Run all commands from the monorepo root.

## Setup

```bash
nvm use                    # use pinned Node version
corepack enable            # activate Yarn Berry
yarn                       # install dependencies
yarn prepare               # husky hooks + build all packages
```

## Build

```bash
yarn build                 # all packages (topological order)

# Individual packages (respect build order: tokens → theme-preset → components):
yarn workspace @iress-oss/ids-tokens run build
yarn workspace @iress-oss/ids-theme-preset run build
yarn workspace @iress-oss/ids-components run build
```

## Validate

```bash
yarn lint                  # ESLint all packages
yarn typecheck             # TypeScript all packages
yarn test:coverage         # Vitest all packages (runs once)
yarn test:ci               # coverage + threshold check (what CI runs)
yarn lint:mermaid          # validate Mermaid diagrams
yarn size                  # bundle size budgets
```

## Single Package / File

```bash
# Test single package:
yarn workspace @iress-oss/ids-components run test:coverage

# Test single file:
yarn workspace @iress-oss/ids-components run test:coverage Button.test.tsx

# Lint single file:
yarn workspace @iress-oss/ids-components exec npx eslint src/components/Button/Button.tsx --fix
```

## Tokens

```bash
yarn workspace @iress-oss/ids-tokens run cssVars    # regenerate CSS variables
yarn workspace @iress-oss/ids-tokens run build       # full token build
```

## Bundle Size

```bash
yarn size                  # human-readable check
yarn size:check            # JSON output
```

## Storybook

```bash
yarn dev                   # all 3 Storybooks (ports 6005, 6006, 6007)
yarn dev:kill              # kill stuck dev servers
```

## Releases

```bash
# Stable: bump version in package.json, merge to main (or 5.x for v5 backports)
# CI auto-publishes if local version > npm registry version

# After publish, create GitHub release (manual step):
.github/scripts/create-releases.sh "<package>|<version>|<is_prerelease>;"

# ⏳ ~2 hour delay before packages appear in private npm registry
```

## ⚠️ Never Run in Scripts/CI

These commands start persistent processes that never exit:

- `yarn dev` / `yarn storybook`
- `yarn test` (without `:coverage`)
- Any `watch` command

Exception: `yarn dev` is acceptable when using Playwright CLI/MCP or Chrome DevTools with your agent to visually debug components. It never exits — you must manually stop it when done.
