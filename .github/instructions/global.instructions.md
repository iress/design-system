---
applyTo: '**'
---

# Package dependencies:

- @iress-oss/ids-components depends on:
  - @iress-oss/ids-tokens

# Test Commands

## Run all tests

```bash
yarn test          # All packages
yarn test:affected # Affected packages only
```

## Run tests for specific packages

```bash
yarn test:components
yarn test:mcp-server
yarn test:storybook-addon
yarn test:tokens
```

## Run single test files

```bash
# Most common approach
yarn test:components Button.test.tsx
yarn test:mcp-server MyHandler.test.ts

# Direct workspace commands (recommended)
yarn workspace @iress-oss/ids-components run test Button.test.tsx
```

### Important for AI Assistants

**When running tests via `run_in_terminal`:**

- Always use `isBackground=false` for test commands
- **WAIT PATIENTLY** for tests to start up and complete (can take 30 seconds or more)
- Do not cancel or make additional tool calls until you see completion messages
- Test startup has overhead - the delay is normal, not a failure
- Look for final completion messages before proceeding with other actions

## Development modes

```bash
# Watch mode (now defaults to components)
yarn test:watch # Same as yarn test:watch:components
yarn workspace @iress-oss/ids-components run test Button.test.tsx --watch

# UI mode for debugging
yarn workspace @iress-oss/ids-components run test Button.test.tsx --ui

# Verbose output
yarn vitest run --reporter=verbose
```

**Important**: Ensure your `vitest.config.ts` (or equivalent Vitest config file) includes `reporters: ['verbose']` in the configuration. This is required for compatibility with yarn workspace test commands and to ensure proper output formatting.

**Note**: Test files must be in the project's `src/` directory (e.g., `packages/components/src/Button.test.tsx`, `packages/mcp-server/src/MyHandler.test.ts`)

# File Organization

For detailed file organization principles covering implementation and test files, see [file-organization.instructions.md](file-organization.instructions.md).

## Quick Reference

**Implementation Files (.ts/.tsx):**

1. Imports → Types/Interfaces → Constants → Helper Functions → Main Exports

**Test Files (.test.ts/.test.tsx):**

1. Imports → Mocks → Constants/Test Data → Helper Functions → Test Suites

# Lint Commands

For detailed ESLint usage and file-specific linting, see [eslint.instructions.md](eslint.instructions.md).

## Run all linting

```bash
yarn lint          # All packages
yarn lint:affected # Affected packages only
```

## Run linting for specific packages

```bash
yarn lint:components # Only components has a specific lint command
# For other packages, use direct workspace commands:
yarn workspace @iress-oss/ids-components run lint
yarn workspace @iress-oss/ids-mcp-server run lint
yarn workspace @iress-oss/ids-storybook-addon run lint
yarn workspace @iress-oss/ids-tokens run lint
```

## Run linting on specific files

```bash
yarn workspace npx eslint < workspace-name > exec < file-path > --fix
```

Example: `yarn workspace @iress-oss/ids-components exec npx eslint src/components/Button/Button.tsx --fix`

See [eslint.instructions.md](eslint.instructions.md) for more examples and patterns.

**Note**: Test files must be in the project's `src/` directory (e.g., `packages/components/src/Button.test.tsx`, `packages/mcp-server/src/MyHandler.test.ts`)

## Troubleshooting Tests

### Common Issues

- **"Tests taking too long"**: Test startup can take 30 seconds, this is normal
- **"No tests found"**: Ensure test file is in correct `src/` directory
- **"Permission denied"**: Try `authenticate --aws=false` first to ensure authentication

### AI Assistant Guidelines

- Never assume test failure from startup delay alone
- Always wait for explicit test results (PASS/FAIL) before analyzing
- Use `get_terminal_output` only after command completion, not during execution
- Do not create tests for pure interface/type files, as they have no runtime behavior.
