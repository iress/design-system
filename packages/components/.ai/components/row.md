# Row

> Arranges children in a horizontal row within a grid or flex layout.

## Import

```tsx
import { IressRow } from '@iress-oss/ids-components';
```

- [Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-row--docs)
- [Source](https://github.com/iress/design-system/tree/main/packages/components/src/components/Row)
- [Report issue](https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=row&title=[Row]+Bug:+)
- [Request feature](https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=row,enhancement&title=[Row]+Feature:+)

Used in conjunction with the IressCol component to lay out page content.

<StoryEmbed id="components-row--default"/>

## Design

### When to use

- **Grid layouts**: Create multi-column layouts with `IressCol` children
- **Responsive grids**: Columns that reflow at different breakpoints

### When not to use

- **Simple horizontal lists** — use [Inline](../components/inline.md) instead
- **Without Col children** — Row is designed to work with `IressCol`

### Related patterns

- [Col](../components/col.md) — column children for the row grid
- [Container](../components/container.md) — centres and pads the page
- [Inline](../components/inline.md) — simpler horizontal layout

## Develop

### Quick Start

```tsx
import { IressRow, IressCol } from '@iress-oss/ids-components';

<IressRow>
  <IressCol span="6">Left</IressCol>
  <IressCol span="6">Right</IressCol>
</IressRow>
```

[View all props](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-row--docs#api-props)

### Usage

`IressRow` supports visual hierarchy by allowing you to add multiple columns in your layout, allowing the user to see more content on the screen at the same time.

It works best alongside the `IressContainer` and `IressCol` components.

#### Gutter

The spacing between columns is controlled by the `gutter` prop. To change the spacing between multiple columns once the row wraps, you can use the `rowGrap` prop.

Note: The `gutter` prop only works with `IressCol` components. If you are using other components, please use the `IressInline` component instead.

<StoryEmbed id="components-row--gutter"/>

#### Responsive Gutter

The `gutter` prop can take an object that takes five key/value pairs that correlate with the IDS breakpoints.

<StoryEmbed id="components-row--responsive-gutter"/>

#### Horizontal alignment

`IressRow` can be set to align horizontally using the `horizontalAlign` prop.

<StoryEmbed id="components-row--horizontal-alignment"/>

#### Vertical alignment

`IressRow` can be set to align vertically using the `verticalAlign` prop.

<StoryEmbed id="components-row--vertical-alignment"/>

### Testing

`IressRow` is a layout primitive with no semantic role. Target its children
directly or use a `data-testid`:

```tsx
const row = screen.getByTestId('my-row');
```


#### Test selectors

| Part | Description | Recommended Query | Test ID |
|------|-------------|-------------------|---------|
| main | The root element of the row | — | `row` |

---

### Storybook

[View in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-row--docs)

## Specifications

### Behaviour

A CSS grid row container. Supports `gutter`, `horizontalAlign`, and `verticalAlign` props with responsive object values.

<StoryEmbed id="foundations--col-breakpoints" controls={false}/>