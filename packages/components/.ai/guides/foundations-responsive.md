# Responsive layout

> **Guide:** `@iress-oss/ids-components`
> **Storybook:** [Responsive layout in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components_foundations-responsive-layout--docs)

The Iress Design System (IDS) is built with responsive design principles in mind. This means that our components are designed to adapt to different screen sizes and orientations, ensuring a consistent user experience across devices.

## Breakpoints

- Implement mobile-first responsive design
- Use consistent breakpoint values across all components
- Provide appropriate component variants for different screen sizes
- Consider content priority and progressive disclosure on smaller screens

  [View "Breakpoints" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_foundations-responsive--breakpoints)

### Extra-small screens (`xs`)

```tsx
<IressStack gap="lg">
<IressInline gap="md" verticalAlign="bottom">
<IressStack gap="xs" maxWidth="input.16">
<Suspense>
<BreakpointXs />
</Suspense>
<IressText>
<strong>{caption}</strong>
<br />
The mobile breakpoint is used for small mobile devices.
</IressText>
</IressStack>
<IressStack gap="xs">
<IressInline gap="sm">
<IressText element="strong">Min screen width</IressText>
<IressText>{BREAKPOINT_DETAILS.xs.minScreenWidth}</IressText>
</IressInline>
<IressInline gap="sm">
<IressText element="strong">Max screen width</IressText>
<IressText>{BREAKPOINT_DETAILS.xs.maxScreenWidth}</IressText>
</IressInline>
<IressInline gap="sm">
<IressText element="strong">Active viewport</IressText>
<IressText>{BREAKPOINT_DETAILS.xs.containerMaxWidth}</IressText>
</IressInline>
<IressInline gap="sm">
<IressText element="strong">Margin</IressText>
<MarginToken token={BREAKPOINT_DETAILS.xs.margin} />
</IressInline>
</IressStack>
</IressInline>
<IressDivider />
<IressText>
<h2>Grid example</h2>
<p>
To ensure the best usability and accessibility, please do not use
grids with more than 4 columns maximum on extra small screens. For
developers, this means the minimum span on mobile devices is 3.
</p>
<IressPanel bg="alt">
<CurrentBreakpoint renderLabel="viewing" />
</IressPanel>
</IressText>
<IressContainer
style={{ maxWidth: `${BREAKPOINT_DETAILS.xs.viewportWidth}px` }}
>
<IressRow gutter="md">
<IressCol span={12}>
<IressPlaceholder height="5em" />
</IressCol>
<IressCol span={6}>
<IressPlaceholder height="5em" />
</IressCol>
<IressCol span={6}>
<IressPlaceholder height="5em" />
</IressCol>
<IressCol span={3}>
<IressPlaceholder height="5em" />
</IressCol>
<IressCol span={3}>
<IressPlaceholder height="5em" />
</IressCol>
<IressCol span={3}>
<IressPlaceholder height="5em" />
</IressCol>
<IressCol span={3}>
<IressPlaceholder height="5em" />
</IressCol>
</IressRow>
</IressContainer>
</IressStack>
```

[View "Xs" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_foundations-responsive--xs)

### Small screens (`sm`)

```tsx
<IressStack gap="lg">
<IressInline gap="md" verticalAlign="bottom">
<IressStack gap="xs" maxWidth="input.16">
<Suspense>
<BreakpointSm />
</Suspense>
<IressText>
<strong>{caption}</strong>
<br />
Small breakpoint, for larger mobile devices and tablet portrait.
</IressText>
</IressStack>
<IressStack gap="xs">
<IressInline gap="sm">
<IressText element="strong">Min screen width</IressText>
<IressText>{BREAKPOINT_DETAILS.sm.minScreenWidth}</IressText>
</IressInline>
<IressInline gap="sm">
<IressText element="strong">Max screen width</IressText>
<IressText>{BREAKPOINT_DETAILS.sm.maxScreenWidth}</IressText>
</IressInline>
<IressInline gap="sm">
<IressText element="strong">Active viewport</IressText>
<IressText>{BREAKPOINT_DETAILS.sm.containerMaxWidth}</IressText>
</IressInline>
<IressInline gap="sm">
<IressText element="strong">Margin</IressText>
<MarginToken token={BREAKPOINT_DETAILS.sm.margin} />
</IressInline>
</IressStack>
</IressInline>
<IressDivider />
<IressText>
<h2>Grid example</h2>
<p>
To ensure the best usability and accessibility, please do not use
grids with more than 4 columns maximum on small screens. For
developers, this means the minimum span on mobile devices is 3.
</p>
<IressPanel bg="alt">
<CurrentBreakpoint renderLabel="viewing" />
</IressPanel>
</IressText>
<IressContainer
style={{ maxWidth: `${BREAKPOINT_DETAILS.sm.viewportWidth}px` }}
>
<IressRow gutter="md">
<IressCol span={{ base: 12, sm: 12 }}>
<IressPlaceholder height="5em" />
</IressCol>
<IressCol span={{ base: 12, sm: 6 }}>
<IressPlaceholder height="5em" />
</IressCol>
<IressCol span={{ base: 12, sm: 6 }}>
<IressPlaceholder height="5em" />
</IressCol>
<IressCol span={{ base: 12, sm: 3 }}>
<IressPlaceholder height="5em" />
</IressCol>
<IressCol span={{ base: 12, sm: 3 }}>
<IressPlaceholder height="5em" />
</IressCol>
<IressCol span={{ base: 12, sm: 3 }}>
<IressPlaceholder height="5em" />
</IressCol>
<IressCol span={{ base: 12, sm: 3 }}>
<IressPlaceholder height="5em" />
</IressCol>
</IressRow>
</IressContainer>
</IressStack>
```

[View "Sm" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_foundations-responsive--sm)

### Medium screens (`md`)

```tsx
<IressStack gap="lg">
<IressInline gap="md" verticalAlign="bottom">
<IressStack gap="xs" maxWidth="input.16">
<Suspense>
<BreakpointMd />
</Suspense>
<IressText>
<strong>{caption}</strong>
<br />
Medium breakpoint for tablets and small laptops such as Chromebooks.
</IressText>
</IressStack>
<IressStack gap="xs">
<IressInline gap="sm">
<IressText element="strong">Min screen width</IressText>
<IressText>{BREAKPOINT_DETAILS.md.minScreenWidth}</IressText>
</IressInline>
<IressInline gap="sm">
<IressText element="strong">Max screen width</IressText>
<IressText>{BREAKPOINT_DETAILS.md.maxScreenWidth}</IressText>
</IressInline>
<IressInline gap="sm">
<IressText element="strong">Active viewport</IressText>
<IressText>{BREAKPOINT_DETAILS.md.containerMaxWidth}</IressText>
</IressInline>
<IressInline gap="sm">
<IressText element="strong">Margin</IressText>
<MarginToken token={BREAKPOINT_DETAILS.md.margin} />
</IressInline>
</IressStack>
</IressInline>
<IressDivider />
<IressText>
<h2>Grid example</h2>
<p>
To ensure the best usability and accessibility, please do not use
grids with more than 6 columns maximum on medium screens. For
developers, this means the minimum span on medium screems is 2.
</p>
<IressPanel bg="alt">
<CurrentBreakpoint renderLabel="viewing" />
</IressPanel>
</IressText>
<IressContainer
style={{ maxWidth: `${BREAKPOINT_DETAILS.md.viewportWidth}px` }}
>
<IressRow gutter="md">
<IressCol span={{ base: 12, md: 12 }}>
<IressPlaceholder height="5em" />
</IressCol>
<IressCol span={{ base: 12, md: 6 }}>
<IressPlaceholder height="5em" />
</IressCol>
<IressCol span={{ base: 12, md: 6 }}>
<IressPlaceholder height="5em" />
</IressCol>
<IressCol span={{ base: 12, md: 4 }}>
<IressPlaceholder height="5em" />
</IressCol>
<IressCol span={{ base: 12, md: 4 }}>
<IressPlaceholder height="5em" />
</IressCol>
<IressCol span={{ base: 12, md: 4 }}>
<IressPlaceholder height="5em" />
</IressCol>
<IressCol span={{ base: 12, md: 2 }}>
<IressPlaceholder height="5em" />
</IressCol>
<IressCol span={{ base: 12, md: 2 }}>
<IressPlaceholder height="5em" />
</IressCol>
<IressCol span={{ base: 12, md: 2 }}>
<IressPlaceholder height="5em" />
</IressCol>
<IressCol span={{ base: 12, md: 2 }}>
<IressPlaceholder height="5em" />
</IressCol>
<IressCol span={{ base: 12, md: 2 }}>
<IressPlaceholder height="5em" />
</IressCol>
<IressCol span={{ base: 12, md: 2 }}>
<IressPlaceholder height="5em" />
</IressCol>
</IressRow>
</IressContainer>
</IressStack>
```

[View "Md" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_foundations-responsive--md)

### Large screens (`lg`)

```tsx
<IressStack gap="lg">
<IressInline gap="md" verticalAlign="bottom">
<IressStack gap="xs" maxWidth="input.16">
<Suspense>
<BreakpointLg />
</Suspense>
<IressText>
<strong>{caption}</strong>
<br />
Large breakpoint for desktops and laptops, such as 13inch MacBooks.
</IressText>
</IressStack>
<IressStack gap="xs">
<IressInline gap="sm">
<IressText element="strong">Min screen width</IressText>
<IressText>{BREAKPOINT_DETAILS.lg.minScreenWidth}</IressText>
</IressInline>
<IressInline gap="sm">
<IressText element="strong">Max screen width</IressText>
<IressText>{BREAKPOINT_DETAILS.lg.maxScreenWidth}</IressText>
</IressInline>
<IressInline gap="sm">
<IressText element="strong">Active viewport</IressText>
<IressText>{BREAKPOINT_DETAILS.lg.containerMaxWidth}</IressText>
</IressInline>
<IressInline gap="sm">
<IressText element="strong">Margin</IressText>
<MarginToken token={BREAKPOINT_DETAILS.lg.margin} />
</IressInline>
</IressStack>
</IressInline>
<IressDivider />
<IressText>
<h2>Grid example</h2>
<p>
From large screens onwards, all 12 columns of the grid can be used.
For developers, this means the minimum span on large screens is 1.
</p>
<IressPanel bg="alt">
<CurrentBreakpoint renderLabel="viewing" />
</IressPanel>
</IressText>
<IressContainer
style={{ maxWidth: `${BREAKPOINT_DETAILS.lg.viewportWidth}px` }}
>
<IressRow gutter="md">
<IressCol span={{ base: 12, lg: 12 }}>
<IressPlaceholder height="5em" />
</IressCol>
<IressCol span={{ base: 12, lg: 6 }}>
<IressPlaceholder height="5em" />
</IressCol>
<IressCol span={{ base: 12, lg: 6 }}>
<IressPlaceholder height="5em" />
</IressCol>
<IressCol span={{ base: 12, lg: 4 }}>
<IressPlaceholder height="5em" />
</IressCol>
<IressCol span={{ base: 12, lg: 4 }}>
<IressPlaceholder height="5em" />
</IressCol>
<IressCol span={{ base: 12, lg: 4 }}>
<IressPlaceholder height="5em" />
</IressCol>
<IressCol span={{ base: 12, lg: 2 }}>
<IressPlaceholder height="5em" />
</IressCol>
<IressCol span={{ base: 12, lg: 2 }}>
<IressPlaceholder height="5em" />
</IressCol>
<IressCol span={{ base: 12, lg: 2 }}>
<IressPlaceholder height="5em" />
</IressCol>
<IressCol span={{ base: 12, lg: 2 }}>
<IressPlaceholder height="5em" />
</IressCol>
<IressCol span={{ base: 12, lg: 2 }}>
<IressPlaceholder height="5em" />
</IressCol>
<IressCol span={{ base: 12, lg: 2 }}>
<IressPlaceholder height="5em" />
</IressCol>
<IressCol span={{ base: 12, lg: 1 }}>
<IressPlaceholder height="5em" />
</IressCol>
<IressCol span={{ base: 12, lg: 1 }}>
<IressPlaceholder height="5em" />
</IressCol>
<IressCol span={{ base: 12, lg: 1 }}>
<IressPlaceholder height="5em" />
</IressCol>
<IressCol span={{ base: 12, lg: 1 }}>
<IressPlaceholder height="5em" />
</IressCol>
<IressCol span={{ base: 12, lg: 1 }}>
<IressPlaceholder height="5em" />
</IressCol>
<IressCol span={{ base: 12, lg: 1 }}>
<IressPlaceholder height="5em" />
</IressCol>
<IressCol span={{ base: 12, lg: 1 }}>
<IressPlaceholder height="5em" />
</IressCol>
<IressCol span={{ base: 12, lg: 1 }}>
<IressPlaceholder height="5em" />
</IressCol>
<IressCol span={{ base: 12, lg: 1 }}>
<IressPlaceholder height="5em" />
</IressCol>
<IressCol span={{ base: 12, lg: 1 }}>
<IressPlaceholder height="5em" />
</IressCol>
<IressCol span={{ base: 12, lg: 1 }}>
<IressPlaceholder height="5em" />
</IressCol>
<IressCol span={{ base: 12, lg: 1 }}>
<IressPlaceholder height="5em" />
</IressCol>
</IressRow>
</IressContainer>
</IressStack>
```

[View "Lg" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_foundations-responsive--lg)

### Extra-large screens (`xl`)

```tsx
<IressStack gap="lg">
<IressInline gap="md" verticalAlign="bottom">
<IressStack gap="xs" maxWidth="input.16">
<Suspense>
<BreakpointXl />
</Suspense>
<IressText>
<strong>{caption}</strong>
<br />
Large breakpoint for desktops and laptops, such as 15inch laptops
and monitors.
</IressText>
</IressStack>
<IressStack gap="xs">
<IressInline gap="sm">
<IressText element="strong">Min screen width</IressText>
<IressText>{BREAKPOINT_DETAILS.xl.minScreenWidth}</IressText>
</IressInline>
<IressInline gap="sm">
<IressText element="strong">Max screen width</IressText>
<IressText>{BREAKPOINT_DETAILS.xl.maxScreenWidth}</IressText>
</IressInline>
<IressInline gap="sm">
<IressText element="strong">Active viewport</IressText>
<IressText>{BREAKPOINT_DETAILS.xl.containerMaxWidth}</IressText>
</IressInline>
<IressInline gap="sm">
<IressText element="strong">Margin</IressText>
<MarginToken token={BREAKPOINT_DETAILS.xl.margin} />
</IressInline>
</IressStack>
</IressInline>
<IressDivider />
<IressText>
<h2>Grid example</h2>
<p>
From large screens onwards, all 12 columns of the grid can be used.
For developers, this means the minimum span on extra large screens is
1. At this screen the container max width is applied, but can be opted
out by using the <code>fluid</code> prop. It is recommended to keep
the max width in most scenarios to ensure optimal readability.
</p>
<IressPanel bg="alt">
<CurrentBreakpoint renderLabel="viewing" />
</IressPanel>
</IressText>
<IressContainer>
<IressRow gutter="md">
<IressCol span={{ base: 12, xl: 12 }}>
<IressPlaceholder height="5em" />
</IressCol>
<IressCol span={{ base: 12, xl: 6 }}>
<IressPlaceholder height="5em" />
</IressCol>
<IressCol span={{ base: 12, xl: 6 }}>
<IressPlaceholder height="5em" />
</IressCol>
<IressCol span={{ base: 12, xl: 4 }}>
<IressPlaceholder height="5em" />
</IressCol>
<IressCol span={{ base: 12, xl: 4 }}>
<IressPlaceholder height="5em" />
</IressCol>
<IressCol span={{ base: 12, xl: 4 }}>
<IressPlaceholder height="5em" />
</IressCol>
<IressCol span={{ base: 12, xl: 2 }}>
<IressPlaceholder height="5em" />
</IressCol>
<IressCol span={{ base: 12, xl: 2 }}>
<IressPlaceholder height="5em" />
</IressCol>
<IressCol span={{ base: 12, xl: 2 }}>
<IressPlaceholder height="5em" />
</IressCol>
<IressCol span={{ base: 12, xl: 2 }}>
<IressPlaceholder height="5em" />
</IressCol>
<IressCol span={{ base: 12, xl: 2 }}>
<IressPlaceholder height="5em" />
</IressCol>
<IressCol span={{ base: 12, xl: 2 }}>
<IressPlaceholder height="5em" />
</IressCol>
<IressCol span={{ base: 12, xl: 1 }}>
<IressPlaceholder height="5em" />
</IressCol>
<IressCol span={{ base: 12, xl: 1 }}>
<IressPlaceholder height="5em" />
</IressCol>
<IressCol span={{ base: 12, xl: 1 }}>
<IressPlaceholder height="5em" />
</IressCol>
<IressCol span={{ base: 12, xl: 1 }}>
<IressPlaceholder height="5em" />
</IressCol>
<IressCol span={{ base: 12, xl: 1 }}>
<IressPlaceholder height="5em" />
</IressCol>
<IressCol span={{ base: 12, xl: 1 }}>
<IressPlaceholder height="5em" />
</IressCol>
<IressCol span={{ base: 12, xl: 1 }}>
<IressPlaceholder height="5em" />
</IressCol>
<IressCol span={{ base: 12, xl: 1 }}>
<IressPlaceholder height="5em" />
</IressCol>
<IressCol span={{ base: 12, xl: 1 }}>
<IressPlaceholder height="5em" />
</IressCol>
<IressCol span={{ base: 12, xl: 1 }}>
<IressPlaceholder height="5em" />
</IressCol>
<IressCol span={{ base: 12, xl: 1 }}>
<IressPlaceholder height="5em" />
</IressCol>
<IressCol span={{ base: 12, xl: 1 }}>
<IressPlaceholder height="5em" />
</IressCol>
</IressRow>
</IressContainer>
</IressStack>
```

[View "Xl" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_foundations-responsive--xl)

### Extremely large screens (`xxl`)

```tsx
<IressStack gap="lg">
<IressInline gap="md" verticalAlign="bottom">
<IressStack gap="xs" maxWidth="input.16">
<Suspense>
<BreakpointXl />
</Suspense>
<IressText>
<strong>{caption}</strong>
<br />
Extra-large breakpoint for modern desktop monitors and large laptops
(17inch+).
</IressText>
</IressStack>
<IressStack gap="xs">
<IressInline gap="sm">
<IressText element="strong">Min screen width</IressText>
<IressText>{BREAKPOINT_DETAILS.xxl.minScreenWidth}</IressText>
</IressInline>
<IressInline gap="sm">
<IressText element="strong">Max screen width</IressText>
<IressText>N/A</IressText>
</IressInline>
<IressInline gap="sm">
<IressText element="strong">Active viewport</IressText>
<IressText>{BREAKPOINT_DETAILS.xxl.containerMaxWidth}</IressText>
</IressInline>
<IressInline gap="sm">
<IressText element="strong">Margin</IressText>
<MarginToken token={BREAKPOINT_DETAILS.xxl.margin} />
</IressInline>
</IressStack>
</IressInline>
<IressDivider />
<IressText>
<h2>Grid example</h2>
<p>
From large screens onwards, all 12 columns of the grid can be used.
For developers, this means the minimum span on extra large screens is
1. At this screen the container max width is applied, but can be opted
out by using the <code>fluid</code> prop. It is recommended to keep
the max width in most scenarios to ensure optimal readability.
</p>
<IressPanel bg="alt">
<CurrentBreakpoint renderLabel="viewing" />
</IressPanel>
</IressText>
<IressContainer>
<IressRow gutter="md">
<IressCol span={{ base: 12, xxl: 12 }}>
<IressPlaceholder height="5em" />
</IressCol>
<IressCol span={{ base: 12, xxl: 6 }}>
<IressPlaceholder height="5em" />
</IressCol>
<IressCol span={{ base: 12, xxl: 6 }}>
<IressPlaceholder height="5em" />
</IressCol>
<IressCol span={{ base: 12, xxl: 4 }}>
<IressPlaceholder height="5em" />
</IressCol>
<IressCol span={{ base: 12, xxl: 4 }}>
<IressPlaceholder height="5em" />
</IressCol>
<IressCol span={{ base: 12, xxl: 4 }}>
<IressPlaceholder height="5em" />
</IressCol>
<IressCol span={{ base: 12, xxl: 2 }}>
<IressPlaceholder height="5em" />
</IressCol>
<IressCol span={{ base: 12, xxl: 2 }}>
<IressPlaceholder height="5em" />
</IressCol>
<IressCol span={{ base: 12, xxl: 2 }}>
<IressPlaceholder height="5em" />
</IressCol>
<IressCol span={{ base: 12, xxl: 2 }}>
<IressPlaceholder height="5em" />
</IressCol>
<IressCol span={{ base: 12, xxl: 2 }}>
<IressPlaceholder height="5em" />
</IressCol>
<IressCol span={{ base: 12, xxl: 2 }}>
<IressPlaceholder height="5em" />
</IressCol>
<IressCol span={{ base: 12, xxl: 1 }}>
<IressPlaceholder height="5em" />
</IressCol>
<IressCol span={{ base: 12, xxl: 1 }}>
<IressPlaceholder height="5em" />
</IressCol>
<IressCol span={{ base: 12, xxl: 1 }}>
<IressPlaceholder height="5em" />
</IressCol>
<IressCol span={{ base: 12, xxl: 1 }}>
<IressPlaceholder height="5em" />
</IressCol>
<IressCol span={{ base: 12, xxl: 1 }}>
<IressPlaceholder height="5em" />
</IressCol>
<IressCol span={{ base: 12, xxl: 1 }}>
<IressPlaceholder height="5em" />
</IressCol>
<IressCol span={{ base: 12, xxl: 1 }}>
<IressPlaceholder height="5em" />
</IressCol>
<IressCol span={{ base: 12, xxl: 1 }}>
<IressPlaceholder height="5em" />
</IressCol>
<IressCol span={{ base: 12, xxl: 1 }}>
<IressPlaceholder height="5em" />
</IressCol>
<IressCol span={{ base: 12, xxl: 1 }}>
<IressPlaceholder height="5em" />
</IressCol>
<IressCol span={{ base: 12, xxl: 1 }}>
<IressPlaceholder height="5em" />
</IressCol>
<IressCol span={{ base: 12, xxl: 1 }}>
<IressPlaceholder height="5em" />
</IressCol>
</IressRow>
</IressContainer>
</IressStack>
```

[View "Xxl" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_foundations-responsive--xxl)

---

## For designers

When designing for responsive layouts, consider how your designs will adapt to different screen sizes. Use the breakpoints defined in the design system to guide your layout decisions and ensure that your designs are flexible and adaptable.

### Tips

1. Use the example viewport sizes provided in the breakpoints table to show your designs at different screen widths.
2. Prioritise content based on screen size — identify the primary task on each page and ensure the mobile layout focuses on it.
3. Relocate secondary content (filters, sidebars, metadata panels) into a slideout or collapsible section on mobile rather than simply stacking everything vertically.
4. Reduce option counts on mobile devices where appropriate.
5. Implement responsive navigation patterns.
6. Adjust spacing and sizing for different contexts.
7. Maintain usability across all supported devices — all functionality should remain accessible on mobile, just reorganised into appropriate containers.

---

## For developers

If you are using the IDS components, the breakpoints have already been mapped out to their respective props. You can use props such as `gap` to change the visual properties of the component at certain breakpoints.

```jsx
import { IressStack } from '@iress-oss/ids-components';

<IressStack gap={{ xs: 'spacing.1', md: 'spacing.2' }} />;
```

### Hooks

#### `useBreakpoint`

We also provide a `useBreakpoint` hook that allows you to access the current breakpoint in your components. This can be useful for conditionally rendering components based on the current screen size.

**Note:** It is best to use media queries for responsive styling. Most props that require responsive values already support breakpoints which map to CSS values. Only use the `useBreakpoint` hook when there is no other way to achieve the desired responsive behavior.

```jsx
import { useBreakpoint } from '@iress-oss/ids-components';

const MyComponent = () => {
  const { breakpoint } = useBreakpoint();

  return (
    <div>
      {breakpoint === 'xs' && <p>This is extra small screen</p>}
      {breakpoint === 'md' && <p>This is medium screen</p>}
    </div>
  );
};
```

#### `useResponsiveProps`

Another hook is `useResponsiveProps`, which allows you to define responsive properties that change based on the current breakpoint. This is particularly useful for completely changing components at various screen sizes.

**Note:** It is best to use media queries for responsive styling. Most props that require responsive values already support breakpoints which map to CSS values. Only use the `useResponsiveProps` hook when there is no other way to achieve the desired responsive behavior.

```tsx
<ResponsiveTableColumns />
```

[View "ResponsiveProps" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_foundations-responsive--responsive-props)

### Constant

You can also use the breakpoints directly in your CSS or styled components. The breakpoints are defined in the `@iress-oss/ids-components` package.

```jsx
import { BREAKPOINT_DETAILS } from '@iress-oss/ids-components';

const css = `
  @media (${BREAKPOINT_DETAILS.md.mediaQuery}}) {
    .my-class {
      padding: 20px;
    }
  }
`;

<style>{css}</style>;
```

The base grid size is exported as `GRID_SIZE` from the `@iress-oss/ids-components` package, in case you need to reference it in your own code.

---

*View in Storybook: [https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components_foundations-responsive-layout--docs](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components_foundations-responsive-layout--docs)*
