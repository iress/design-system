# Divider

> Renders a horizontal or vertical line to visually separate content.

## Import

```tsx
import { IressDivider } from '@iress-oss/ids-components';
```

- [Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-divider--docs)
- [Source](https://github.com/iress/design-system/tree/main/packages/components/src/components/Divider)
- [Report issue](https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=divider&title=[Divider]+Bug:+)
- [Request feature](https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=divider,enhancement&title=[Divider]+Feature:+)

## Props

> Required props are **bold**.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| vertical | `boolean` | — | Change to a vertical divider. |
| data-testid | `string` | — | The data-testid attribute is used to target elements in automated tests if no identifier is available. In some components it is propagated to child elements.  Notes: - Please use this prop sparingly and only when no other identifier is available, as per the guiding principles of Testing Library. - Only use this prop for your tests @see https://testing-library.com/docs/queries/bytestid |

📄 [Full type definition](../../dist/components/Divider/Divider.d.ts)

Also accepts all [styling props](../styling-props/overview.md) ([type definition](../../dist/interfaces.d.ts), [token values](../tokens/tokens-reference.md)).

A divider is a UI element that separates content in lists and layouts.

```tsx
<IressDivider />;
```

## Design

### When to use

- **Separating content sections**: Visual break between distinct groups of content
- **List item separation**: Horizontal line between items in a vertical list
- **Toolbar separation**: Vertical divider between groups of actions in a toolbar

### When not to use

- **Creating borders around containers** — use card or box components with borders
- **Spacing content** — use layout components like `IressStack` with appropriate gap values

### Do's and Don'ts

| ✅ Do | ❌ Don't |
|-------|----------|
| Use within `IressStack` or `IressInline` layouts | Add dividers between every single element in a list |
| Use vertical dividers in horizontal layouts | Use dividers as decorative elements without semantic purpose |
| Let dividers inherit spacing from parent layout | Override gutter on every divider when layout spacing suffices |

### Related patterns

- [Stack](../components/stack.md) — vertical layout with consistent spacing
- [Inline](../components/inline.md) — horizontal layout with consistent spacing

## Develop

### Quick Start

```tsx
import { IressDivider } from '@iress-oss/ids-components';

<IressDivider />;
```

[View all props](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-divider--docs#api-props)

### Vertical divider

Use the `vertical` prop to change the divider from horizontal to vertical.

```tsx
<IressInline gap="spacing.4" verticalAlign="middle">
  <IressText>Separate</IressText>
  <IressDivider vertical />
  <IressText>this</IressText>
</IressInline>;
```

### Gutter

You can customise the gutter by using the `my` prop. If the divider is vertical, use the `mx` prop instead.

By default, dividers do not have a gutter, allowing them to adapt to `<IressStack>` and `<IressInline>` layouts.

```tsx
import {
  IressDivider,
  IressInline,
  IressPanel,
  IressText,
} from '@iress-oss/ids-components';

export function DividerGutter() {
  return (
    <IressInline gap="spacing.4">
      <IressPanel>
        <IressText element="h2">
          <code>my="none"</code>
        </IressText>
        <IressText>Separate</IressText>
        <IressDivider my="none" />
        <IressText>this</IressText>
      </IressPanel>
      <IressPanel>
        <IressText element="h2">
          <code>my="xs"</code>
        </IressText>
        <IressText>Separate</IressText>
        <IressDivider my="xs" />
        <IressText>this</IressText>
      </IressPanel>
      <IressPanel>
        <IressText element="h2">
          <code>my="sm"</code>
        </IressText>
        <IressText>Separate</IressText>
        <IressDivider my="sm" />
        <IressText>this</IressText>
      </IressPanel>
      <IressPanel>
        <IressText element="h2">
          <code>my="md"</code>
        </IressText>
        <IressText>Separate</IressText>
        <IressDivider my="md" />
        <IressText>this</IressText>
      </IressPanel>
      <IressPanel>
        <IressText element="h2">
          <code>my="lg"</code>
        </IressText>
        <IressText>Separate</IressText>
        <IressDivider my="lg" />
        <IressText>this</IressText>
      </IressPanel>
      <IressPanel>
        <IressText element="h2">
          <code>my="xl"</code>
        </IressText>
        <IressText>Separate</IressText>
        <IressDivider my="xl" />
        <IressText>this</IressText>
      </IressPanel>
    </IressInline>
  );
}
```

### Testing

Query the divider by its `separator` role:

```tsx
const divider = screen.getByRole('separator');
```


#### Test selectors

| Part | Description | Recommended Query | Test ID |
|------|-------------|-------------------|---------|
| main | The root element of the divider | `getByRole('separator')` | `divider` |

---

### Storybook

Storybook provides an interactive playground for testing different prop combinations and viewing accessibility attributes.

[View in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-divider--docs)

## Specifications

### Behaviour

| State | Behaviour |
|-------|-----------|
| Horizontal (default) | Renders a full-width horizontal line |
| Vertical | Renders a full-height vertical line |
| With gutter | Adds vertical (`my`) or horizontal (`mx`) spacing around the divider |

### Accessibility

**WCAG compliance:**

- **4.1.2 Name, Role, Value** — Renders with `role="separator"` for assistive technologies

**Keyboard interaction:**

Dividers are not interactive and do not receive focus.

---

### Storybook

Storybook provides an interactive playground for testing different prop combinations and viewing accessibility attributes.

[View in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-divider--docs)