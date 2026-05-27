# Container

IressContainer provides a means to center and horizontally pad your site’s contents.

> **Component:** `import { IressContainer } from '@iress-oss/ids-components'`
> **Storybook:** [Container in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components_components-container--docs)

## Quick Start

```tsx
import { IressContainer } from '@iress-oss/ids-components';

<IressContainer />
```

## Behaviour

The `IressContainer` snaps to fixed max widths at different breakpoints. Those max widths are as follows:

```tsx
<IressTable
caption="Container breakpoints"
rows={BREAKPOINTS.map((breakpoint) => ({
breakpoint,
screenWidths: BREAKPOINT_DETAILS[breakpoint].screenWidthRange,
maxWidth: BREAKPOINT_DETAILS[breakpoint].containerMaxWidth,
}))}
/>
```

[View "BreakpointTable" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_components-container--breakpoint-table)

## Examples

### Fluid

If you want the `IressContainer` to fill its containing element, you can set the `fluid` prop. Resize the example below to see how the IressContainer is 100% for all screen sizes.

```tsx
<IressContainer fluid />
```

[View "Fluid" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_components-container--fluid)

## Testing

`IressContainer` is a layout primitive with no semantic role. Target its
children directly or use a `data-testid`:

```tsx
const container = screen.getByTestId('my-container');
```

## Props

- **Type:** `IressContainerProps`
- **Type declarations:** `@iress-oss/ids-components/dist/components/Container/Container.d.ts`

```typescript
import type { IressContainerProps } from '@iress-oss/ids-components';
```


---

*View interactive examples: [https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components_components-container--docs](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components_components-container--docs)*
