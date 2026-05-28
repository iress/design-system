# 
> **Component:** `import { IressDivider } from '@iress-oss/ids-components'`
> **Storybook:** [ in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components_components-divider--docs)```tsx
```

## Quick Start

```tsx
<IressDivider />
```

## Examples

### Vertical divider

Use the `vertical` prop to change the divider from horizontal to vertical.

```tsx
<IressInline gap="spacing.4" verticalAlign="middle">
  <span>Left content</span>
  <IressDivider vertical />
  <span>Right content</span>
</IressInline>
```

[View "Vertical" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_components-divider--vertical)

### Gutter

You can customise the gutter by using the `my` prop. If the divider is vertical, use the `mx` prop instead.

By default, dividers do not have a gutter, allowing them to adapt to `<IressStack>` and `<IressInline>` layouts.

```tsx
<IressStack gap="spacing.4">
  <span>Content above</span>
  <IressDivider my="spacing.4" />
  <span>Content below</span>
</IressStack>
```

[View "Gutter" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_components-divider--gutter)

## Testing

Query the divider by its `separator` role:

```tsx
const divider = screen.getByRole('separator');
```

---

[View in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components_components-divider--docs)
