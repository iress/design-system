# AGENTS.md

`@iress-oss/ids-components` — React component library for the Iress Design System, built with Panda CSS.

## Build

```bash
yarn workspace @iress-oss/ids-components run build
```

Depends on `@iress-oss/ids-tokens` and `@iress-oss/ids-theme-preset` — build tokens and theme-preset first.

## ⚠️ Long-running commands

Do not run `dev`, `test`, `test:ui`, `storybook`, or `panda:watch` — they never exit. Use `test:coverage` or a build command (e.g. `build-storybook`, `build`) instead.

## Testing

```bash
yarn workspace @iress-oss/ids-components run test:coverage                   # runs once and exits
yarn workspace @iress-oss/ids-components run test:coverage Button.test.tsx   # single file
```

Test files live in `src/` alongside their component (e.g. `src/components/Button/Button.test.tsx`). Do not create tests for pure interface/type files.

## Linting

```bash
yarn workspace @iress-oss/ids-components exec npx eslint src/components/Button/Button.tsx --fix
```

## Source layout

```
src/
  components/       # individual component folders (Button, Input, Select, etc.)
  patterns/         # composite patterns (Form, SideNav, Loading, etc.)
  hooks/            # shared React hooks
  helpers/          # utility functions (dom, formatting, form, etc.)
  styled-system/    # Panda CSS generated code — do not edit manually
  main.ts           # public API barrel export
  interfaces.ts     # shared interfaces
  enums.ts          # shared enums
  types.ts          # shared types
  constants.ts      # shared constants
```

Each component folder contains: implementation, tests, stories, recipe (Panda CSS), and docs.

## Styling

Uses Panda CSS via `@iress-oss/ids-theme-preset`. Component styles are defined as recipes in each component folder. The `styled-system/` directory is auto-generated — never edit it directly.

## Component conventions

See `.github/instructions/component-creation.instructions.md` for the full creation guide. Props interfaces follow `Iress<ComponentName>Props` naming.

## AI context

- `.ai/components/` — per-component API reference and usage examples
- `.ai/patterns/` — composite pattern documentation
- `.ai/guides/` — styling props, migration guides, foundations
- `.ai/skills/` — agent skills for UI translation, Figma-to-IDS, etc.
