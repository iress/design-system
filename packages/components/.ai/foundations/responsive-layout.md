# Responsive layout

The Iress Design System (IDS) is built with responsive design principles in mind. This means that our components are designed to adapt to different screen sizes and orientations, ensuring a consistent user experience across devices.

## Breakpoints

- Implement mobile-first responsive design
- Use consistent breakpoint values across all components
- Provide appropriate component variants for different screen sizes
- Consider content priority and progressive disclosure on smaller screens

| Breakpoint | Screen Widths |
|------------|---------------|
| `xs` | 0 - 575px |
| `sm` | 576px - 767px |
| `md` | 768px - 1023px |
| `lg` | 1024px - 1279px |
| `xl` | 1280px - 1599px |
| `xxl` | 1600px and above |

### Extra-small screens (`xs`)

| Property | Value |
|----------|-------|
| Screen widths | 0 - 575px |
| Min screen width | 0px |
| Max screen width | 575px |
| Container max width | 100% |
| Margin | `spacing.4` |

### Small screens (`sm`)

| Property | Value |
|----------|-------|
| Screen widths | 576px - 767px |
| Min screen width | 576px |
| Max screen width | 767px |
| Container max width | 100% |
| Margin | `spacing.4` |

### Medium screens (`md`)

| Property | Value |
|----------|-------|
| Screen widths | 768px - 1023px |
| Min screen width | 768px |
| Max screen width | 1023px |
| Container max width | 100% |
| Margin | `spacing.6` |

### Large screens (`lg`)

| Property | Value |
|----------|-------|
| Screen widths | 1024px - 1279px |
| Min screen width | 1024px |
| Max screen width | 1279px |
| Container max width | 100% |
| Margin | `spacing.6` |

### Extra-large screens (`xl`)

| Property | Value |
|----------|-------|
| Screen widths | 1280px - 1599px |
| Min screen width | 1280px |
| Max screen width | 1599px |
| Container max width | 1440px |
| Margin | `spacing.6` |

### Extremely large screens (`xxl`)

| Property | Value |
|----------|-------|
| Screen widths | 1600px and above |
| Min screen width | 1600px |
| Container max width | 1690px |
| Margin | `spacing.6` |

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
import { IressTable, useResponsiveProps } from '@iress-oss/ids-components';

export function ResponsiveTableColumns() {
  const { value: columns } = useResponsiveProps({
    base: [{ key: 'name', label: 'Name' }],
    lg: [
      { key: 'name', label: 'Name' },
      { key: 'age', label: 'Age' },
    ],
  });

  return (
    <IressTable
      caption="Responsive columns example"
      columns={columns}
      rows={[
        { name: 'Luke Skywalker', age: 19 },
        { name: 'Princess Leia', age: 19 },
        { name: 'Han Solo', age: 32 },
      ]}
    />
  );
}
```

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