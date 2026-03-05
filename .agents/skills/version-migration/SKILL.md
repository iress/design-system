---
name: version-migration
description: Guide AI agents on migrating applications between IDS (Iress Design System) major versions — including v4→v5, v5→v6, and OUI→v6. Covers component renaming, prop changes, form architecture migration (Formik→React Hook Form), testing updates, and common gotchas.
---

# Skill: IDS Version Migration

## When to Use

- Migrating from IDS v5 (or v4) to IDS v6
- Migrating from OUI (`@iress/oui`) to IDS v6
- Updating imports from `@iress/components-react` to `@iress-oss/ids-components`
- Converting Formik forms to React Hook Form via `IressForm`/`IressFormField`
- Updating test files that use IDS v4 test utilities
- Reviewing migration PRs for correctness

## Decision Table: Which Migration Path?

| Current stack | Migration path                       | Complexity                      |
| ------------- | ------------------------------------ | ------------------------------- |
| OUI only      | OUI→v6 guide                         | High (form architecture change) |
| IDS v4 only   | v5→v6 guide (skip v5 step)           | Medium                          |
| IDS v5 only   | v5→v6 guide                          | Low–Medium                      |
| OUI + IDS v4  | Both OUI→v6 and v5→v6 guides         | High                            |
| OUI + IDS v5  | OUI→v6 guide + v5→v6 for IDS changes | High                            |

Full interactive guides with diff viewers are available in Storybook:

- [v4→v5 guide](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/resources-migration-guides-from-v4-to-v5--docs)
- [v5→v6 guide](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/resources-migration-guides-from-v5-to-v6--docs)
- [OUI→v6 guide](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/resources-migration-guides-from-oui-to-v6--docs)

---

## Quick Reference: Package Changes

### Import path

```ts
// ❌ Old (IDS v4)
import { IressButton } from '@iress/components-react';

// ❌ Old (OUI)
import { Button, Input } from '@iress/oui';

// ✅ IDS v6
import { IressButton, IressInput } from '@iress-oss/ids-components';
```

### CSS entry point

```ts
// ✅ Required in your app entry point
import '@iress-oss/ids-components/dist/style.css';
```

### Token package

```ts
// ✅ Required for design tokens
import '@iress-oss/ids-tokens/build/css-vars.css';
import { cssVars } from '@iress-oss/ids-tokens';
```

---

## Key Migration Areas

### Component renames

Components that changed names between versions (IDS and OUI → v6), plus removed and new components. See [references/component-renames.md](references/component-renames.md) for the full map.

Key renames: `IressBadge` → `IressPill`, `IressRichSelect` → `IressSelect`, `IressField` → `IressFormField`, `IressFilter` → `IressDropdownMenu`.

### Prop renames (CRITICAL — verified against source code)

Using old prop names will silently fail. See [references/prop-renames.md](references/prop-renames.md) for the complete table.

Most common renames:

| Component                  | Old prop     | New prop (v6)  |
| -------------------------- | ------------ | -------------- |
| `IressButton`              | `variant`    | `mode`         |
| `IressAlert`               | `variant`    | `status`       |
| `IressModal`               | `isOpen`     | `show`         |
| `IressModal`               | `onClose`    | `onShowChange` |
| `IressModal`               | `title`      | `heading`      |
| `IressPanel`               | `background` | `bg`           |
| `IressStack`/`IressInline` | `gutter`     | `gap`          |

### Form migration (Formik → React Hook Form)

The most significant architectural change. Forms use `IressForm` + `IressFormField` with `render` prop, replacing Formik's `<Field as={...}>` pattern. Yup schemas become per-field `rules` props.

See [references/form-migration.md](references/form-migration.md) for validation mapping, before/after examples, and common patterns.

Quick example:

```tsx
<IressForm defaultValues={{ email: '' }} onSubmit={handle}>
  <IressFormField
    name="email"
    label="Email"
    render={(props) => <IressInput {...props} type="email" />}
    rules={{ required: 'Required' }}
  />
  <IressButton type="submit" mode="primary">
    Submit
  </IressButton>
</IressForm>
```

### Testing migration

IDS v6 uses standard React Testing Library — no special test utilities. Replace `idsFireEvent` with `fireEvent`/`userEvent`, remove `mockLazyLoadedComponents`, prefer `getByRole`/`getByLabelText` over `getByTestId`.

See [references/testing-migration.md](references/testing-migration.md) for import changes, pattern mapping, config updates, and form test examples.

### Styling migration

OUI CSS classes and IDS v4 Stencil classes are removed. Use styling props (`p`, `m`, `bg`, `gap`, `scrollable`) or design tokens (`var(--iress-*)`). Declare `@layer` order if custom CSS is overridden.

See [references/styling-migration.md](references/styling-migration.md) for examples and AG Grid migration.

---

## Common Gotchas

| Problem                              | Cause                                            | Solution                                                             |
| ------------------------------------ | ------------------------------------------------ | -------------------------------------------------------------------- |
| Components have no styles            | Missing CSS import                               | Add `import '@iress-oss/ids-components/dist/style.css'` to app entry |
| Form validation not working          | Using HTML5 attributes (`required`, `maxLength`) | Move validation to `rules` prop on `IressFormField`                  |
| Modal won't close                    | Using `isOpen` prop                              | Rename to `show`                                                     |
| Button variant not applying          | Using `variant` prop                             | Rename to `mode`                                                     |
| Tests fail "Cannot find module"      | Jest can't transform IDS v6                      | Update `transformIgnorePatterns`                                     |
| `idsFireEvent` not found             | Using removed IDS v4 test utils                  | Replace with standard `fireEvent` from RTL                           |
| Form fields render without labels    | Using standalone `<Label>`                       | Move label text into `label` prop on `IressFormField`                |
| Custom CSS overriding components     | Cascade layer ordering                           | Declare `@layer` order in stylesheet                                 |
| `IressPanel alt` prop not working    | No boolean `alt` prop exists                     | Use `bg="alt"` instead                                               |
| `IressAlert mode` not working        | Prop was renamed                                 | Use `status` (e.g. `status="danger"`)                                |
| `IressFieldGroup legend` not working | Prop was renamed                                 | Use `label` instead                                                  |

---

## Cross-References

### Generated migration guides (read these for full details)

- **v4→v5** — `node_modules/@iress-oss/ids-components/.ai/guides/migration-guides-v5.md`
- **v5→v6** — `node_modules/@iress-oss/ids-components/.ai/guides/migration-guides-v6.md`
- **OUI→v6** — `node_modules/@iress-oss/ids-components/.ai/guides/migration-guides-oui.md`

### Component and pattern docs

- **Component docs** — `node_modules/@iress-oss/ids-components/.ai/components/`
- **Pattern docs** — `node_modules/@iress-oss/ids-components/.ai/patterns/`
- **Index** — `node_modules/@iress-oss/ids-components/.ai/index.json`

### Related skills

- **token-usage** — Design token usage patterns
- **ui-translation** — Building new IDS v6 UIs from scratch
- **ui-doctor** — Auditing IDS compliance

## Reference

- **Storybook and Guidelines:** https://main--691abcc79dfa560a36d0a74f.chromatic.com
