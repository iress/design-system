# AGENTS.md

`@iress-oss/ids-theme-preset` — Panda CSS preset for the Iress Design System. Bridges `@iress-oss/ids-tokens` into Panda CSS theme configuration.

## Build

```bash
yarn workspace @iress-oss/ids-theme-preset run build     # builds with tsup
```

Depends on `@iress-oss/ids-tokens`. Peer-requires `@pandacss/dev >= 1.8.0`.

## ⚠️ Long-running commands

Do not run `dev` or `test` — they never exit. Use `test:coverage` instead.

## Testing

```bash
yarn workspace @iress-oss/ids-theme-preset run test:coverage   # runs once and exits
```

## Key exports

- Default export: Panda CSS preset with IDS tokens, recipes, and patterns
- `config` — Panda CSS config helpers
- `constants` — shared constants
- `hooks` — Panda hooks for theme access
- `vite` — Vite plugin integration
