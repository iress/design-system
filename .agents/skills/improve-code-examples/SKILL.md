---
name: improve-code-examples
description: >
  Validate and improve code examples in IDS documentation files. Checks that
  components exist, props match TypeScript interfaces, imports are correct, and
  examples are idiomatic React. Use when asked to "improve code examples",
  "fix code examples", "clean up .ai docs", "validate examples", or when
  modifying files in apps/guidelines/content/ or packages/components/.ai/.
license: Apache-2.0
compatibility: React 19, TypeScript, @iress-oss/ids-components
metadata:
  author: iress
  version: '1.0'
---

# Skill: Improve Code Examples

Validate and improve code examples in IDS documentation to ensure they are correct, complete, and idiomatic.

## When to Use

Activate this skill when:

- "Improve code examples for Button"
- "Fix code examples in .ai docs"
- "Clean up code examples"
- "Validate examples"
- "Find and fix code examples with spread args"
- "Improve all code examples"
- After modifying files in `apps/guidelines/content/` or `packages/components/.ai/`

## Process

### Step 1: Identify Target Files

- If a specific component is named, locate its file in `apps/guidelines/content/components/{slug}.mdx`
- If "all" is requested, process all `.mdx` files in `apps/guidelines/content/` (including `components/`, `patterns/`, `styling-props/`, `foundations/`)
- For `.ai/` files: `packages/components/.ai/components/{slug}.md` and `packages/components/.ai/guides/{slug}.md`

### Step 2: Validate Against Implementation

For each fenced `tsx` code block in the target file:

1. **Component exists?** Check that the component referenced exists in `packages/components/src`. If not:
   - Check the corresponding `.stories.tsx` file's `component:` field in the default export meta for the real component name
   - Replace the non-existent component with the one from the stories meta (e.g. `IressColour` → `IressPanel` if `component: IressPanel` in stories)

2. **Props match interface?** Read the component's TypeScript interface (the `Props` type export) and verify:
   - All props used in the example are real props on the interface
   - Required props are present
   - Enum/union values (e.g. `variant="primary"`) are valid per the type definition
   - Boolean props use correct syntax (`disabled` not `disabled="true"`)

3. **Import names correct?** Verify:
   - Component uses `Iress` prefix with correct PascalCase (e.g. `IressButton`, not `Button`)
   - Import path is `@iress-oss/ids-components`

### Step 3: Improve Quality

For each code block:

| Issue                                                       | Fix                                                                     |
| ----------------------------------------------------------- | ----------------------------------------------------------------------- |
| `{...args}` spread                                          | Replace with concrete props from the interface (pick sensible defaults) |
| Storybook patterns (`argTypes`, `render` functions, `args`) | Simplify to plain JSX                                                   |
| Missing import statement                                    | Add `import { IressX } from '@iress-oss/ids-components';`               |
| Not idiomatic React                                         | Fix (e.g. use `children` instead of `dangerouslySetInnerHTML`)          |
| Incomplete example (no wrapping component)                  | Add minimal wrapper if needed for context                               |

### Step 4: Write Changes

- Rewrite code blocks in-place
- **Preserve all non-code content unchanged** (prose, headings, frontmatter, metadata)
- Do not reformat or reorder sections outside code blocks

## Rules

- Never invent props that don't exist on the interface
- Never remove code blocks — only improve them
- If a code block is already clean (has imports, concrete props, idiomatic), leave it unchanged
- When replacing `{...args}`, choose props that demonstrate the component's primary use case, or check the content around the code block for clues on which props to use
- For components with many required props, include all required props with realistic values
- Always import from `@iress-oss/ids-components` (not relative paths or `@/main`)

## Example

**Before:**

```tsx
<IressButton {...args}>Click me</IressButton>
```

**After:**

```tsx
import { IressButton } from '@iress-oss/ids-components';

<IressButton mode="primary" onClick={() => alert('clicked')}>
  Click me
</IressButton>;
```

## Styling Props

When the file is in `apps/guidelines/content/styling-props/`, also apply the `token-usage` skill:

- Verify token names are valid (cross-reference `packages/tokens/`)
- Ensure styling prop examples use the correct API (`paddingX`, `gap`, etc.)
- Validate token values exist in the token set
