# Phase C: StoryEmbed Resolution — Revised Plan

## Status

Current state (2026-06-29):
- 61 component/pattern docs generated
- ~56 unresolved StoryEmbeds remaining (sub-components, styling-props, foundations)
- ~47 files differ from staged baseline (regressions or improvements)
- P2 (mock+withSource) extraction is solid and reliable
- P1/P3 extraction works but has edge cases causing regressions

## Problem Statement

The translate pipeline extracts code examples from stories to embed in `.ai/` docs. Three story patterns exist:

| Pattern | Source of code | Extraction approach |
|---------|---------------|-------------------|
| P1: args-only | Story has `args: {}`, no `render:` | Generate `<Component prop={value} />` from args |
| P2: mock+withSource | Story uses `withSource(MockSource)` + `?raw` import | Read mock file directly ✅ |
| P3: inline render | Story has `render: (args) => <JSX>` | Extract JSX, strip/inline arg spreads |
| Inherited render | Story spreads `...Default` (which has render) | Falls through to P1 if no own `render:` |

P2 is reliable. P1 and P3 have issues:
- P1: must parse complex TypeScript expressions (arrays, objects, JSX, arrow functions) from raw text
- P3: must strip Storybook control noise (`{...args}`, `{args.X ? ...}`, destructured variables)
- Inherited render: story has no `render:` but inherits one — currently treated as P1 but render-helper args like `input` pollute the output

## Revised Approach

### Principle: Trust only what we can extract cleanly

1. **P2 is the gold standard** — mock files are complete, standalone, correct
2. **P1 with simple literal args** — works for basic stories, keep as-is
3. **P3 with clean JSX** — works after stripping `{...args}` spreads
4. **Everything else** — leave StoryEmbed in place for manual review

### Requirements

#### R1: Never produce broken/incorrect code
If extraction can't produce valid, complete JSX, leave the StoryEmbed unresolved rather than emitting garbage.

#### R2: Validate against Storybook source
After generation, compare a sample of outputs against Storybook's own "Show code" panel using Chrome DevTools MCP. This catches regressions.

#### R3: Snapshot tests for extraction logic
Create test cases covering each pattern variant:
- P1: simple string args, boolean args, array args, object args, JSX args, `...Spread.args`
- P2: withSource import, mock in ./mocks/
- P3: `(args) => <JSX {...args}>`, `() => <explicit JSX>`, destructured args
- Inherited: `...Default` with render, own args override

#### R4: Blocklist approach for arg filtering
Only exclude known render-helper args (`input`, `inputs`, `row`, `columns`, `numberOfColumns`, `columnProps`). All other args pass through to JSX output.

#### R5: ESLint enforcement (future)
Add lint rule banning `...OtherStory.args` in P1 stories and requiring all StoryEmbed-referenced stories to be self-contained. This removes the need for complex spread resolution long-term.

### Validation Process

After each translate run:

1. **Diff check** — `diff` output against staged baseline, review any regressions
2. **StoryEmbed audit** — list all remaining unresolved StoryEmbeds, categorise:
   - Sub-component stories (e.g. `components-modal-modalprovider--provider`) — need path finder fix
   - Styling props stories (e.g. `styling-props-colour--bg`) — need path finder fix
   - Foundation stories (e.g. `foundations--col-breakpoints`) — different story source location
   - Truly un-extractable — leave as StoryEmbed
3. **Storybook comparison** (sample) — for 5 representative components, open Storybook, show code on each example story, compare with `.ai/` output

### Remaining Work

#### Category 1: Path finder gaps (22 unresolved)
Stories that can't be found because `findStoriesFile` doesn't handle:
- Sub-components: `components-modal-modalprovider` → `Modal/ModalProvider/`
- Multi-word sub-components: `components-input-popover` → `Popover/InputPopover/` or `InputPopover/`
- Styling props with numbers: `styling-props-colour` → `020-Colour.stories.tsx`
- Foundation stories: `foundations--col-breakpoints` → different file entirely

#### Category 2: P3 with destructured args (5-10 stories)
Stories like Col/Field that use `({ input, ...args }) =>` — the inherited render uses custom arg shapes. Fix approach:
- Add explicit `render:` to the story (preferred — keeps Storybook working AND gives clean P3 extraction)
- Or ensure the blocklist filters render-helpers correctly

#### Category 3: Snapshot test suite
Create `scripts/translate/__tests__/resolve-stories.test.ts`:
- Test each extraction path with known inputs/outputs
- Run as part of `yarn test:coverage`

#### Category 4: Storybook comparison script
Create `scripts/validate-translate.ts`:
- Opens Storybook via Chrome DevTools MCP
- Navigates to N component docs pages
- Clicks "Show code" on each example
- Extracts the displayed source
- Compares with corresponding `.ai/` output
- Reports mismatches

## Success Criteria

- [ ] All files match staged baseline OR are strictly improvements (more resolved StoryEmbeds)
- [ ] Zero broken code examples (syntax errors, `{...args}`, incomplete JSX)
- [ ] Snapshot tests pass for all extraction patterns
- [ ] Storybook comparison passes for sample components (alert, button, field, autocomplete, select)
- [ ] Remaining unresolved StoryEmbeds are documented and categorised
