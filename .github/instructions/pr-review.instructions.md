---
applyTo: '**'
---

# PR Review Instructions

Coding standards, domain knowledge, and preferences that AI should follow when reviewing pull requests.

## AI Context & Documentation Freshness Checks

When reviewing a PR, always verify that AI-facing documentation stays in sync with code changes. Flag any missing updates as **required changes** (not suggestions).

### Sandbox Dependency Tags

**Trigger:** Any PR that modifies CodeSandbox examples, Storybook sandbox defaults, or docs/snippets that generate `package.json` files for sandbox usage.

**What to verify:**

- IDS v6 sandbox examples use the current prerelease tag: `@iress-oss/ids-components: 'beta'` and `@iress-oss/ids-tokens: 'beta'` when tokens are installed directly.
- Review generated sandbox dependencies in Storybook previews, sandbox stories, mock stories, helper utilities, and README/MDX examples — not just the visible docs page.
- Flag any use of `alpha` for IDS sandbox dependencies unless the PR explicitly documents a temporary rollback and explains why.

**Review comment template:**

> This PR updates a CodeSandbox or Storybook sandbox example but still references IDS `alpha` packages. IDS v6 sandboxes should use the `beta` tag for `@iress-oss/ids-components` and `@iress-oss/ids-tokens` so generated examples install the current prerelease.

### 1. Token Schema — `packages/tokens/.ai/index.json`

**Trigger:** Any PR that modifies files under `packages/tokens/src/schema/` or changes the design token build pipeline (`packages/tokens/src/generated/`, token transforms, or token build config).

**What to verify:**

- If a **new token category** is introduced, `packages/tokens/.ai/index.json` has a new entry in `tokenCategories` with the correct `name`, `description`, `schemaSource`, and `cssVariablePrefix`.
- If a token category is **removed**, its entry is deleted from `tokenCategories`.
- If token values, descriptions, or structure **change significantly**, verify that the `description` fields in `index.json` still accurately reflect the token category.

**Review comment template:**

> This PR modifies the token schema (`packages/tokens/src/schema/`) but `packages/tokens/.ai/index.json` has not been updated. Please ensure `tokenCategories` reflects the current schema so AI tools have accurate token metadata.

### 2. Agent Skills — `.agents/skills/`

**Trigger:** Any PR that:

- Adds, removes, or significantly changes a **component, pattern, or guide** in `packages/components/`
- Changes the **design token schema** in `packages/tokens/src/schema/`
- Changes component **styling props** or **prop types**
- Modifies the **component public API** (new/removed/renamed props, new/removed exports)

**Skills to review:**

| Skill            | Path                                     | Review when…                                                                                                                     |
| ---------------- | ---------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `token-usage`    | `.agents/skills/token-usage/SKILL.md`    | Token schema changes, new token categories, changed CSS variable prefixes, or new import patterns                                |
| `figma-to-ids`   | `.agents/skills/figma-to-ids/SKILL.md`   | New components added, component prop APIs changed, layout component changes, or new Figma-to-IDS mappings needed                 |
| `ui-doctor`      | `.agents/skills/ui-doctor/SKILL.md`      | New components that should be flagged as IDS replacements for native HTML, component removals, or changes to compliance criteria |
| `ui-translation` | `.agents/skills/ui-translation/SKILL.md` | New components, renamed components, changed component APIs, or new patterns that affect natural-language-to-code translation     |

**What to verify:**

- Skills reference up-to-date component names, prop names, and import paths.
- Any new component or pattern is represented in the relevant mapping tables or examples within skills.
- Removed or renamed components/tokens are no longer referenced (or references are updated).
- Token usage examples use current token names and CSS variable prefixes.
- Code examples in skills compile against the current public API.

**Review comment template:**

> This PR changes `<ComponentName>` / token schema but the `.agents/skills/<skill>/SKILL.md` file has not been updated. Please review and update the skill so AI agents produce correct code.

### 3. AGENTS.md Files

**Trigger:** Any PR that:

- Adds, removes, or renames a **package** in `packages/`
- Changes **scripts** in any `package.json` (especially `test`, `dev`, `build`, `lint` commands)
- Changes **setup steps**, Node/Yarn version requirements, or CI configuration
- Modifies the **monorepo structure** (new workspaces, changed dependency graph between packages)
- Changes **code style** config (`.prettierrc.cjs`, `.editorconfig`, `eslint.config.js`)
- Adds or removes **long-running commands** (dev servers, watchers, watch-mode tests)

**Files to review:**

| File | Review when… |
|---|---|
| `AGENTS.md` (root) | Setup steps, monorepo structure, cross-package commands, code style, CI/CD, or long-running command list changes |
| `packages/components/AGENTS.md` | Components package scripts, source layout, build dependencies, or styling approach changes |
| `packages/tokens/AGENTS.md` | Tokens package scripts, source layout, exports, or build pipeline changes |
| `packages/theme-preset/AGENTS.md` | Theme preset scripts, exports, or dependency changes |

**What to verify:**

- Build, test, and lint commands listed in AGENTS.md match the actual `package.json` scripts.
- The long-running commands section is complete — any new watcher or dev server command is listed with its non-blocking alternative.
- Package dependency relationships are accurate (e.g. "build tokens first").
- Source layout descriptions reflect the current directory structure.
- Node/Yarn version requirements match CI and `package.json` `packageManager` field.

**Review comment template:**

> This PR modifies `<package>/package.json` scripts but the corresponding `AGENTS.md` has not been updated. Please ensure the documented commands, long-running command warnings, and alternatives still match the actual scripts so AI agents don't run hanging commands or use stale instructions.

## How to Apply These Checks

When reviewing a PR:

1. **Scan the changed file list** for files under `packages/components/src/components/`, `packages/components/src/patterns/`, `packages/components/docs/`, `packages/tokens/src/schema/`, `packages/tokens/src/generated/`, or any `package.json`.
2. If any of those paths appear, **apply the relevant checks above** (token schema, agent skills, and/or AGENTS.md drift).
3. Flag missing updates as **required changes**, not optional suggestions — stale AI documentation degrades the entire AI-assisted development experience.
4. If the PR is a pure refactor with no public API changes, these checks can be skipped.

## General Code Review Standards

These checks apply to **every PR**, not just those touching AI documentation.

### Code Quality

- **Follow existing patterns**: Match the conventions already used in the file and package being modified. Don't introduce new patterns without justification.
- **Minimal, targeted changes**: Prefer small, focused diffs. Flag unnecessarily broad refactors mixed in with feature or bug fix work.
- **No dead code**: Flag commented-out code, unused imports, unreachable branches, or unused variables/functions being added.
- **DRY without over-abstracting**: Flag obvious duplication, but don't demand abstraction for code that's only used in two places and may diverge.
- **Readable naming**: Variables, functions, and components should have clear, descriptive names. Flag single-letter variables (outside loop indices) and ambiguous names.

### TypeScript

- **Correct and complete types**: No `any` types unless explicitly justified with a comment. Prefer specific types and union types over broad ones.
- **Export only what's needed**: Internal helpers and types should not be exported from the package public API unless intentionally public.
- **Prop interfaces**: Component prop types should be exported and named `Iress<ComponentName>Props`. Flag deviations.
- **Avoid type assertions (`as`)**: Prefer type guards or proper typing. Flag `as` casts that could mask bugs.
- **Generics**: Ensure generic type parameters have meaningful constraints and names (not just `<T>` without context).

### React & Component Patterns

- **Component naming**: All IDS components use the `Iress` prefix (e.g. `IressButton`, `IressInput`). Flag components that don't follow this convention.
- **Hooks rules**: Verify hooks are called at the top level and not inside conditions, loops, or nested functions.
- **Avoid inline object/array/function creation in JSX props**: These create new references on every render. Flag patterns like `style={{ ... }}` or `onClick={() => ...}` in hot paths unless memoized.
- **`key` prop usage**: Flag missing `key` props on list items. Flag use of array index as `key` when list items can be reordered, added, or removed.
- **`useEffect` dependencies**: Verify dependency arrays are correct and complete. Flag missing dependencies and unnecessary effects (effects that could be derived during render).
- **Forwarded refs**: Components that wrap native elements should forward refs correctly using `React.forwardRef` or the `ref` prop pattern used in this codebase.
- **Accessibility**: Flag missing `aria-*` attributes, missing labels on interactive elements, non-semantic HTML where semantic elements exist (e.g. `<div onClick>` instead of `<button>`), and missing keyboard interaction support.

### Styling (Panda CSS / Design Tokens)

- **Use design tokens**: Flag hardcoded colour hex values, pixel spacing values, or font sizes. These should reference IDS design tokens via `cssVars` or CSS custom properties (`--iress-*`).
- **Follow styling prop patterns**: Components should use IDS styling props (`p`, `m`, `gap`, `color`, etc.) rather than raw CSS or `style` props when available.
- **No `!important`**: Flag use of `!important` in CSS. If specificity is needed, find the root cause instead.
- **Responsive patterns**: Flag fixed pixel widths on layout containers. Prefer responsive tokens and relative units.

### Testing

- **Test coverage for changes**: Every new feature, bug fix, or behavioral change should include or update tests. Flag PRs that modify component behavior without corresponding test changes.
- **Test names describe behavior**: Test names should read like specifications (e.g. `"renders error state when validation fails"`, not `"test 1"` or `"works"`).
- **No snapshot-only testing**: Snapshot tests are acceptable as supplements, but flag PRs where snapshots are the only form of testing for behavioral logic.
- **Mock responsibly**: Flag mocks that are too broad (mocking entire modules when only one function is needed) or that mask the behavior being tested.
- **No test implementation details**: Tests should assert on behavior (what the user sees/does), not internal state or implementation details. Flag tests that reach into component internals.
- **Avoid `act()` warnings**: Flag test code patterns that cause React `act()` warnings. Specifically:
  - Use `await waitFor(() => ...)` or `await findByX()` instead of manually wrapping in `act()` when waiting for async state updates. Testing Library queries already handle `act()` internally.
  - Flag bare `render()` calls in tests where the component triggers async state updates on mount (e.g. `useEffect` with data fetching) — these need `await waitFor()` or `findBy*` to await the update.
  - Flag `fireEvent` or `userEvent` calls that trigger async state updates without awaiting the result. Use `await userEvent.click(...)` and follow with `await waitFor()` or `findBy*` for assertions.
  - Flag direct `act(() => { ... })` wrapping when Testing Library's async utilities (`waitFor`, `findBy*`) would be more appropriate and readable.
  - When `act()` is genuinely needed (e.g. testing hooks directly with `renderHook`), ensure async updates use `await act(async () => { ... })`.

### Error Handling & Edge Cases

- **Handle loading, empty, and error states**: Flag components that only handle the happy path. Check for null/undefined guards on data that comes from props or async sources.
- **Validate inputs**: Public API functions and component prop processing should validate or gracefully handle unexpected input.
- **Async error handling**: Flag missing `.catch()` on promises and missing error handling in `async` functions.

### Performance

- **Avoid unnecessary re-renders**: Flag state updates that trigger re-renders in parent components when only children need updating. Check for missing `useMemo`/`useCallback` where reference stability matters.
- **Large lists**: Flag rendering of large datasets without virtualisation or pagination.
- **Bundle size**: Flag new dependencies. Check that imports use tree-shakeable paths (e.g. `import { specific } from 'lib'` not `import lib from 'lib'`).

### Documentation & Comments

- **JSDoc on public APIs**: Exported functions, components, and types should have JSDoc comments describing their purpose, params, and return values.
- **Explain "why", not "what"**: Inline comments should explain non-obvious reasoning, not restate what the code does.
- **Storybook stories**: New or changed components should have corresponding Storybook stories showing realistic usage.
- **Update README/docs**: If a PR changes public API, setup steps, or configuration, flag missing documentation updates.

### Git & PR Hygiene

- **Atomic commits**: Flag PRs that mix unrelated changes (e.g. a feature + an unrelated refactor + a dependency bump).
- **No secrets or credentials**: Flag any hardcoded API keys, tokens, passwords, or internal URLs.
- **No large generated files**: Flag checked-in build artifacts, `node_modules`, or large generated files that should be in `.gitignore`.
