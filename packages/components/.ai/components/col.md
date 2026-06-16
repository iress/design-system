# Col

> Defines a column within a grid row layout.

## Import

```tsx
import { IressCol } from '@iress-oss/ids-components';
```

- [Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-col--docs)
- [Source](https://github.com/iress/design-system/tree/main/packages/components/src/components/Col)
- [Report issue](https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=col&title=[Col]+Bug:+)
- [Request feature](https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=col,enhancement&title=[Col]+Feature:+)

Used in conjunction with the IressRow component to layout page content.

<StoryEmbed id="components-col--auto-sized"/>

## Design

### When to use

- **Grid layouts**: Divide content into columns within an `IressRow`
- **Responsive layouts**: Adjust column widths at different breakpoints. There are suggested max columns to show at each breakpoint (visible via the Specifications), but these are not hard rules. Use your judgement to determine the best layout for your content and users.

### When not to use

- **Simple horizontal spacing** — use [Inline](../components/inline.md) instead
- **Without a Row** — `IressCol` must be a direct child of `IressRow`

### Related patterns

- [Row](../components/row.md) — parent container for columns
- [Container](../components/container.md) — centres and pads page content
- [Inline](../components/inline.md) — simpler horizontal layout without grid semantics

## Develop

### Quick Start

```tsx
import { IressRow, IressCol } from '@iress-oss/ids-components';

<IressRow>
  <IressCol span="6">Left</IressCol>
  <IressCol span="6">Right</IressCol>
</IressRow>
```

[View all props](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-col--docs#api-props)

### Usage

#### Auto-sized

When no column widths are specified the `IressCol` component will render equal width columns.

<StoryEmbed id="components-col--auto-sized"/>

#### Span

The `span` prop controls the number of grid columns the component should span.

If no `span` is provided it will default to `auto` which will make the column either fill the remaining space in the row (when used with a col number) or size evenly when used with other columns set to auto sizing.

<StoryEmbed id="components-col--span"/>

#### Responsive span

The `span` prop can take an object that takes five key/value pairs that correlate with the IDS breakpoints. Any missing keys will fall back to the value defined for the next smallest key.

**Note:** If a `span` prop is provided an object but no value is given for `xs` it will default to `12`. This means that columns will be full width on screen sizes below the sizes you've specified.

<StoryEmbed id="components-col--responsive-span"/>

#### Offset

The `offset` prop controls the amount of grid columns to offset.

<StoryEmbed id="components-col--offset"/>

#### Responsive offset

When a `ResponsiveSizing` object is passed into the `offset` prop, the offset will change at the specified breakpoints. It will apply to all breakpoints above the specified breakpoint.

For example, if you specify an offset for `md`, it will apply to `lg`, `xl` and `xxl` as well. If you want to change the offset at a specific breakpoint, you can pass in an object with the breakpoint as the key and the offset as the value.

<StoryEmbed id="components-col--responsive-offset"/>

#### Align self

The `alignSelf` prop controls the vertical alignment of the column (use if column alignment needs to differ from other columns in the row).

<StoryEmbed id="components-col--align-self"/>

### Testing

`IressCol` is a layout primitive with no semantic role. Target its children
directly or use a `data-testid`:

```tsx
const col = screen.getByTestId('my-col');
```


#### Test selectors

| Part | Description | Recommended Query | Test ID |
|------|-------------|-------------------|---------|
| main | The root element of the col | — | `col` |

---

### Storybook

[View in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-col--docs)

## Specifications

### Behaviour

A CSS grid column wrapper. Supports `span`, `offset`, and `alignSelf` props with responsive object values.

<StoryEmbed id="foundations--col-breakpoints" controls={false} />