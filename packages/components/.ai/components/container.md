# Container

> Provides a max-width wrapper to constrain content within a page layout.

## Import

```tsx
import { IressContainer } from '@iress-oss/ids-components';
```

- [Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-container--docs)
- [Source](https://github.com/iress/design-system/tree/main/packages/components/src/components/Container)
- [Report issue](https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=container&title=[Container]+Bug:+)
- [Request feature](https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=container,enhancement&title=[Container]+Feature:+)

IressContainer provides a means to center and horizontally pad your site's contents.

<StoryEmbed id="components-container--container"/>

## Design

### When to use

- **Page wrapper**: Centre content and apply consistent horizontal padding
- **Max-width constraint**: Prevent content from stretching too wide on large screens

### When not to use

- **Full-bleed layouts** — set `fluid` or use no container at all
- **Component-level spacing** — use [Stack](../components/stack.md) or [Inline](../components/inline.md)

### Related patterns

- [Row](../components/row.md) + [Col](../components/col.md) — grid layout within a container
- [Stack](../components/stack.md) — vertical spacing between sections

## Develop

### Quick Start

```tsx
import { IressContainer } from '@iress-oss/ids-components';

<IressContainer>
  <p>Centred content</p>
</IressContainer>
```

[View all props](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-container--docs#api-props)

### Usage

The `IressContainer` snaps to fixed max widths at different breakpoints:

<StoryEmbed id="components-container--breakpoint-table"/>

#### Fluid

If you want the `IressContainer` to fill its containing element, you can set the `fluid` prop. Resize the example below to see how the IressContainer is 100% for all screen sizes.

<StoryEmbed id="components-container--fluid"/>

### Testing

`IressContainer` is a layout primitive with no semantic role. Target its
children directly or use a `data-testid`:

```tsx
const container = screen.getByTestId('my-container');
```


#### Test selectors

| Part | Description | Recommended Query | Test ID |
|------|-------------|-------------------|---------|
| main | The root element of the container | — | `container` |

---

### Storybook

[View in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-container--docs)

## Specifications

### Behaviour

Centres content with horizontal padding. Snaps to fixed max-widths at each breakpoint unless `fluid` is set.

<StoryEmbed id="foundations--container-breakpoints" controls={false} />