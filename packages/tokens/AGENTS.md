# AGENTS.md

`@iress-oss/ids-tokens` — design tokens for the Iress Design System. Defines colour, spacing, typography, and radius tokens as CSS custom properties.

## Build

```bash
yarn workspace @iress-oss/ids-tokens run build          # generates CSS vars then builds
yarn workspace @iress-oss/ids-tokens run cssVars         # regenerate CSS variables only
```

## ⚠️ Long-running commands

Do not run `dev`, `test`, `watch`, `watch:cssVars`, or `storybook` — they never exit (any `storybook dev` server command is long-running). Use `test:coverage` instead.

## Testing

```bash
yarn workspace @iress-oss/ids-tokens run test:coverage   # runs once and exits
```

Test files live in `src/` alongside their module.

## Source layout

```
src/
  schema/           # token definitions (colour, spacing, typography, radius) + stories
  transforms/       # CSS shorthand transforms (shadow, typography, radius, border, background)
  helpers/          # utility functions (CSS variable mapping, reference conversion)
  generated/        # auto-generated files — do not edit manually
  index.ts          # public API
  interfaces.ts     # shared interfaces
  types.ts          # shared types
  enums.ts          # shared enums
```

## Key exports

- Token schema (colour, spacing, typography, radius)
- CSS shorthand transforms for composite tokens
- `convertReferencesToVariables` — resolves token references to CSS variables
- `mapTokensToCssVariables` — maps token objects to CSS custom properties
- `build/css-vars.css` — pre-built CSS variables stylesheet

## Conventions

- Token schemas are defined in TypeScript, not JSON
- Public CSS variables in `build/css-vars.css` follow `--{category}-{path}` naming (e.g. `--colour-neutral-10`, `--spacing-4`). Do **not** reference `--iress-*` variables directly — those are theme override variables, not part of the public token API.
- Transforms convert composite token values into CSS shorthand strings

## AI context

- `.ai/tokens-reference.md` — full token reference
- `.ai/skills/token-usage.md` — token usage guide for agents
