# IDS Styling props

> 8 docs

---

# Accessibility

These are all styling props related to screen readers and accessibility. They allow you to hide content from visual users while still providing context for screen reader users, ensuring an inclusive experience for all users.

## `focusable`

The `focusable` prop allows you to set the focus state of a component. This is useful for components that need to be interactive via keyboard, but are not necessarily a button or input.

It accepts the following values:

| Value                  | Description                                                    |
| ---------------------- | -------------------------------------------------------------- |
| `'true'`               | Standard focus-visible ring on the element itself              |
| `'within'`             | Focus ring when the element or any of its children are focused |
| `'inset'`              | Inset focus ring inside the element                            |
| `'has-button'`         | Focus ring delegated from a child button                       |
| `'has-input'`          | Focus ring delegated from a child input, textarea, or select   |
| `'has-switch'`         | Focus ring delegated from a child switch                       |
| `'label-after'`        | Focus ring applied to the adjacent label                       |
| `'expander-activator'` | Focus ring for expander/activator elements                     |
| `'select-activator'`   | Focus ring for select activator elements                       |
| `'slider'`             | Focus ring for range slider thumbs                             |
| `'group'`              | Focus ring triggered by a parent `.group` container            |
| `'within:inset'`       | Inset focus ring when a child element is focused               |

```tsx
<IressText focusable="true" tabIndex={0}>
  This element will have focus styles applied when it is focused. This is useful
  for accessibility and keyboard navigation.
</IressText>;
```

### Inset focus ring

```tsx
<IressText focusable="inset" tabIndex={0} p="spacing.4" bg="colour.neutral.20">
  This element uses an inset focus ring, which renders inside the element
  boundary.
</IressText>;
```

## `srOnly`

The `srOnly` prop allows you to set a component to be only visible on screen readers. It is used to ensure the screen reader has context of the screen to help the user understand the tasks required of them.

```tsx
<IressText srOnly>Hello screen readers</IressText>;
```

### Responsive

The `srOnly` prop is responsive, allowing you to show content on larger screens and hiding them on smaller ones, enabling screen readers to have the same context as larger screens as they are not limited by device size.

```tsx
<IressText srOnly={{ base: true, lg: false }}>
  This content is visible on large screens and screen readers
</IressText>;
```

---

## See also

- [Accessibility foundations](../foundations/accessibility.md) — Key practices and principles for building accessible components in IDS

---

[View in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components_styling-props-accessibility--docs)

---

# Colour

These are all styling props related to changing the foreground and background
colours of a component.

## Background (`bg`)

The `bg` prop allows you to change the background of any component to the value of a colour token. It should be used sparingly, and usually alongside the `color` prop to ensure accessibility.

Below is an example of a component using `bg` and `color` to create a featured panel that changes colour depending on the theme.

```tsx
<IressPanel bg="colour.primary.fill" color="colour.primary.onFill">
  <h5>Featured panel</h5>
  <p>
    This is a featured panel, in case you want to highlight something important
    or draw attention to a specific piece of content.
  </p>
</IressPanel>;
```

## Foreground (`color`)

The `color` prop allows you to change the foreground of any component to the value of a colour token. It should be used sparingly, and usually alongside the `bg` prop to ensure accessibility.

Below is an example of using the `color` prop to highlight text throughout a component.

```tsx
<IressPanel>
  <p>
    Sometimes actions are{' '}
    <IressText element="strong" color="colour.system.success.text">
      successful
    </IressText>
    , and sometimes they are{' '}
    <IressText element="strong" color="colour.system.danger.text">
      dangerous
    </IressText>
    .
  </p>
</IressPanel>;
```

---

## Best Practices

When applying colors to components, always use design tokens instead of hardcoded values. This ensures theme compatibility, accessibility, and consistency across your application.

### ✅ DO: Use semantic color tokens

Semantic color tokens like `colour.primary.text`, `colour.primary.fill`, and `colour.system.success.text` automatically adapt to theme changes and maintain proper contrast ratios.

```tsx
// ✅ CORRECT - Semantic color tokens
<IressText color="colour.primary.text">Primary text</IressText>
<IressPanel bg="colour.primary.fill" color="colour.primary.onFill">
  Featured content
</IressPanel>
<IressText color="colour.system.success.text">Success message</IressText>
```

### ✅ DO: Use the special "alt" value for alternate backgrounds

The special value `"alt"` provides an alternate background color that adapts to the current theme context.

```tsx
// ✅ CORRECT - Using "alt" for alternate backgrounds
<IressPanel bg="alt">Content with alternate background</IressPanel>;
```

### ✅ DO: Pair `bg` and `color` props together for accessibility

When setting a background color, always pair it with an appropriate foreground color to ensure proper contrast and accessibility.

```tsx
// ✅ CORRECT - Paired bg and color for accessibility
<IressPanel bg="colour.primary.fill" color="colour.primary.onFill">
  Accessible content with proper contrast
</IressPanel>

<IressPanel bg="colour.system.success.fill" color="colour.system.success.onFill">
  Success message with guaranteed contrast
</IressPanel>
```

### ❌ DON'T: Use hardcoded hex values

Hardcoded hex values don't respond to theme changes and may violate accessibility standards.

```tsx
// ❌ INCORRECT - Hardcoded hex values
<IressText style={{ color: '#000000' }}>Text</IressText>
<IressPanel style={{ backgroundColor: '#13213F', color: '#FFFFFF' }}>
  Content
</IressPanel>

// ✅ CORRECT - Semantic tokens
<IressText color="colour.primary.text">Text</IressText>
<IressPanel bg="colour.primary.fill" color="colour.primary.onFill">
  Content
</IressPanel>
```

### ✅ DO: Use `cssVars` for CSS-in-JS

If you're using a CSS-in-JS library, use `cssVars` from `@iress-oss/ids-tokens` to reference color tokens.

```tsx
import { cssVars } from '@iress-oss/ids-tokens';
import styled from 'styled-components';

// ✅ CORRECT - Using cssVars for colors in CSS-in-JS
const StyledPanel = styled.div`
  background-color: ${cssVars.colour.primary.fill};
  color: ${cssVars.colour.primary.onFill};
`;

const SuccessText = styled.span`
  color: ${cssVars.colour.system.success.text};
`;
```

### ❌ DON'T: Use inline styles for colors

Inline styles bypass the design system and prevent theme adaptation.

```tsx
// ❌ INCORRECT - Inline styles
<IressPanel style={{ backgroundColor: '#F5F5F5', color: '#333333' }}>
  Content
</IressPanel>

// ✅ CORRECT - Styling props
<IressPanel bg="colour.neutral.10" color="colour.neutral.80">
  Content
</IressPanel>
```

## Token Reference

For a complete reference of all available color tokens, including WCAG contrast ratios and allowed foreground/background combinations, see the tokens documentation.

**Most commonly used color tokens:**

- `colour.primary.fill`, `colour.primary.onFill` - Primary brand colors with guaranteed contrast
- `colour.primary.text`, `colour.primary.surface` - Primary text and surface colors
- `colour.neutral.10`, `colour.neutral.20`, `colour.neutral.80` - Neutral grays for backgrounds and text
- `colour.system.success.text`, `colour.system.danger.text`, `colour.system.warning.text` - System status colors
- `"alt"` - Special value for alternate backgrounds

[View Full Colour Token Reference](../tokens/colour.md)

---

[View in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components_styling-props-colour--docs)

---

# Layout

These are all styling props related to modifying layout.

## `alignSelf`

The `alignSelf` prop allows you to override the alignItems value set by a parent flex container for individual components. This is useful when you want to adjust the alignment of a single item without affecting the entire container.

```tsx
<IressStack gap="md" horizontalAlign="center">
  <IressPanel bg="alt">First panel (no alignSelf)</IressPanel>
  <IressPanel bg="colour.primary.surface" alignSelf={alignSelf}>
    Panel with alignSelf prop
  </IressPanel>
  <IressPanel bg="alt">Third panel (no alignSelf)</IressPanel>
</IressStack>;
```

## `flex="1"`

The `flex="1"` prop is used to make a component grow and fill available space in a flex container. Setting `flex` to `1` allows the component to take up one unit of available space, ensuring consistent behavior across components.

Note: We only allow `1` as a value to maintain design consistency.

```tsx
<IressStack gap="md" horizontalAlign="center" style={{ height: 400 }}>
      <IressPanel bg="alt">First panel (no flex)</IressPanel>
      <IressPanel bg="alt" flex="1">
        {children ?? (
          <></>
```

## `hideFrom` and `hideBelow`

The `hideFrom` and `hideBelow` props allow you to hide content from both visual users and screen readers at different breakpoints. This is useful when certain content is not relevant on smaller screens, and you want to ensure that screen reader users have the same experience as visual users.

```tsx
<IressPanel hideFrom="lg">Only on mobile screens</IressPanel>;
```

```tsx
<IressPanel hideBelow="lg">Only on large screens</IressPanel>;
```

## `scrollable`

The scrollable prop enables scrolling behavior for an element when its content
overflows its bounds. It sets the `overflow` CSS property to `auto`, allowing
scrollbars to appear as needed. The scrollbar has been styled to match the
design system.

You can set the value to `true` to enable scrolling on both axes, or specify `'x'` or `'y'` to restrict scrolling to a single axis.

```tsx
<IressCard px="sm">
  <IressPanel scrollable="y" style={{ height: '200px' }} noBorder>
    <h1>History of Iress</h1>

    <p>
      <strong>Iress Limited</strong> (originally “Iress Market Technology”) is
      an Australian-based software company that provides technology solutions to
      the financial services industry. Its clients span sectors including wealth
      management, financial advice, trading, investment management, mortgages,
      and superannuation.
    </p>

    <section>
      <h2>Early Years (1993 – 2000)</h2>
      <p>
        Iress was founded in <strong>1993</strong> in Melbourne, Australia. The
        company's initial product offerings focused on market data and trading
        software for financial institutions and professionals needing live
        pricing and analytics tools.
      </p>
      <p>
        In <strong>2000</strong>, Iress listed on the{' '}
        <strong>Australian Stock Exchange (ASX)</strong> under the ticker{' '}
        <strong>IRE</strong>, signaling its growth beyond market data services.
      </p>
    </section>
  </IressPanel>
</IressCard>;
```

## `stretch`

The `stretch` prop is used to stretch a component to fill the available space. It is used in components such as `IressPanel` to ensure each column in a layout takes up the same amount of space.

```tsx
<IressContainer bg="alt" py="xl" px="xl" borderRadius="none" fluid>
  <IressRow gutter="xl" verticalAlign="stretch">
    <IressCol>
      <IressPanel stretch stretch>
        Panel is set to stretch, so it will fill the available space.
      </IressPanel>
    </IressCol>
    <IressCol>
      <IressPanel>
        <h1>Taller content</h1>
        <p>
          This panel has more content, making the row taller. The stretched
          panel on the left will grow to match this height.
        </p>
      </IressPanel>
    </IressCol>
  </IressRow>
</IressContainer>;
```

---

[View in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components_styling-props-layout--docs)

---

# Styling props

This page lists all the custom styling properties available in our components,
which design tokens they are mapped to and which CSS properties they affect.

Styling properties are the recommended way of customising components for your needs, as they ensure your styles are compatible when any theme is applied to your application. If you need further customisation, you can use regular CSS and reference the tokens directly.

These replace the utility classes and internal component tokens provided by previous versions of the design system.

## Reference

| Prop | CSS Property | Token | Responsive |
|------|-------------|-------|------------|
| `alignSelf` | `align-self` | N/A |  |
| `bg` | `background` | Colour |  |
| `borderRadius` | `border-radius` | Radius |  |
| `color` | `color` | Colour |  |
| `flex` | `flex` | N/A |  |
| `focusable` | `border and box-shadow` | Colour |  |
| `hideBelow` | `display` | N/A |  |
| `hideFrom` | `display` | N/A |  |
| `maxWidth` | `max-width` | N/A |  |
| `m` | `margin` | Spacing | ✓ |
| `mx` | `margin-inline` | Spacing | ✓ |
| `my` | `margin-block` | Spacing | ✓ |
| `mb` | `margin-bottom` | Spacing | ✓ |
| `ml` | `margin-left` | Spacing | ✓ |
| `mr` | `margin-right` | Spacing | ✓ |
| `mt` | `margin-top` | Spacing | ✓ |
| `noGutter` | `margin-block-end` | N/A |  |
| `p` | `padding` | Spacing | ✓ |
| `px` | `padding-inline` | Spacing | ✓ |
| `py` | `padding-block` | Spacing | ✓ |
| `pb` | `padding-bottom` | Spacing | ✓ |
| `pl` | `padding-left` | Spacing | ✓ |
| `pr` | `padding-right` | Spacing | ✓ |
| `pt` | `padding-top` | Spacing | ✓ |
| `scrollable` | `Multiple properties` | N/A |  |
| `srOnly` | `Multiple properties` | N/A | ✓ |
| `stretch` | `align-self, height and flex` | N/A |  |
| `textAlign` | `text-align` | N/A |  |
| `textStyle` | `font` | Typography |  |
| `width` | `width` | N/A | ✓ |

---

## Responsive

Props marked responsive can accept either a single value that affects all breakpoints, or a responsive object map that sets a different value based on breakpoint.

```tsx
<IressPanel p="xs" /> // applies extra small padding to all breakpoints
<IressPanel p={{ base: 'lg', md: 'sm' }} /> // applies large padding by default, and changes to small padding once on medium sized screens.
```

## `iressCss`

In some cases you may need to apply styling props to a non-IDS component. You can do this by using the `iressCss` prop, which accepts an object of styling props and returns a string of class names that can be applied to any element.

This will also work without JSX, allowing you to apply styling props to any element in your application.

```tsx
<div className={iressCss({ p: 'xs', bg: 'colour.primary.surface' })}>
  This div has extra small padding and a primary background colour.
</div>;
```

## `IressStyled`

The `IressStyled` component is a flexible wrapper that gives you direct access to all styling props. Use it when you need custom styling without creating a dedicated component or writing custom CSS.

```tsx
<IressStyled p="xs" bg="colour.primary.surface">
  This div has extra small padding and a primary background colour.
</IressStyled>;
```

## Migrating from version 5

### Utility classes

If you have been using the utility classes from previous versions of IDS (eg. `iress-p--xs`), you will need to replace them with the new styling props. The utility classes are no longer supported in version 6.

```diff
-<IressPanel className="iress-p--xs" />
+<IressPanel p="xs" />
```

---

### Internal component tokens

If you have been using the internal component tokens (eg. `--iress-background-color`), you will need to replace them with the new styling props. The internal component tokens are no longer supported in version 6.

#### Note

- Not every single internal component token has a direct mapping to a styling prop. For example, things like border width are no longer customisable. This helps ensure a consistent and accessible experience for all applications no matter the theme that is applied to them.
- Styling props only allow token values, not custom values (eg. `colour.system.status.danger` is allowed but not `red`). This is to ensure that the styling props are theme agnostic and can be used with any theme. If you need to use a custom value, you can use custom CSS or inline styles.

```diff
-<IressPanel style={{ '--iress-background-color': 'var(--iress-g-success-color)' }} />
+<IressPanel bg="colour.system.success.fill" />
```

---

## Best Practices

### When to use styling props

Styling props should be your **first choice** for customizing components in most cases. They provide:

- **Theme compatibility**: Automatically work with any theme
- **Type safety**: TypeScript ensures you use valid tokens
- **Consistency**: Design tokens enforce the design system's visual language
- **Accessibility**: Semantic color tokens maintain proper contrast ratios
- **Maintainability**: Changes to design tokens automatically update all usages

**✅ Use styling props when:**

- Customizing IDS components (`IressPanel`, `IressButton`, `IressText`, etc.)
- Applying spacing, colors, or typography that exist in the design system
- Building new features that should follow the design system
- Creating reusable layouts and patterns

### When to use `iressCss()`

The `iressCss()` function is useful for applying styling props to **non-IDS components** or when you need to combine styling props programmatically.

**✅ Use `iressCss()` when:**

- Styling third-party library components that don't accept styling props
- Applying styling props to native HTML elements (`<div>`, `<section>`, etc.)
- Building complex, reusable style combinations
- Working outside of JSX (e.g., in vanilla JavaScript)

```tsx
// ✅ CORRECT - Using iressCss for non-IDS component
<ThirdPartyComponent
  className={iressCss({ p: 'md', bg: 'colour.primary.surface' })}
>
  Content
</ThirdPartyComponent>

// ✅ CORRECT - Using iressCss with native HTML
<div className={iressCss({ display: 'flex', gap: 'sm' })}>
  Flexbox layout with design system spacing
</div>
```

### When to use CSS-in-JS

If you're using a CSS-in-JS library (like styled-components, emotion, or vanilla-extract), use the **`cssVars` object from `@iress-oss/ids-tokens`** to reference design tokens.

**✅ Use CSS-in-JS with `cssVars` when:**

- Building custom components with a CSS-in-JS library
- Creating complex styling logic that needs JavaScript
- Working with third-party CSS-in-JS frameworks
- Need programmatic access to token values

```tsx
import { cssVars } from '@iress-oss/ids-tokens';
import styled from 'styled-components';

// ✅ CORRECT - Using cssVars in CSS-in-JS
const StyledComponent = styled.div`
  padding: ${cssVars.spacing[400]}; /* md spacing */
  background-color: ${cssVars.colour.primary.fill};
  color: ${cssVars.colour.primary.onFill};
  font-family: ${cssVars.typography.fontFamily.body};
`;

// ❌ INCORRECT - Hardcoded values in CSS-in-JS
const BadComponent = styled.div`
  padding: 16px;
  background-color: #13213f;
  color: #ffffff;
`;
```

### When to use custom CSS

Custom CSS should be **reserved for edge cases** where styling props and `iressCss()` don't meet your needs.

**✅ Use custom CSS when:**

- Implementing complex selectors (`:hover:not(.disabled)`, `> * + *`)
- Working with pseudo-elements (`::before`, `::after`)
- Creating animations and transitions
- Styling custom components with unique design requirements
- Using CSS features not available in styling props (e.g., `grid-template-areas`)

**Important**: Even in custom CSS, prefer referencing design tokens via CSS variables:

```css
.custom-component {
  /* ✅ CORRECT - Reference tokens in custom CSS */
  padding: var(--spacing-4); /* md spacing */
  background-color: var(--colour-primary-fill);

  /* ❌ INCORRECT - Hardcoded values */
  padding: 16px;
  background-color: #13213f;
}
```

### Decision guide

Use this flowchart to choose the right approach:

1. **Is it an IDS component?**
   - Yes → Use styling props (``)
   - No → Go to step 2

2. **Does it need design system styling?**
   - Yes → Use `iressCss()` (`className={iressCss({ p: 'md' })}`)
   - No → Go to step 3

3. **Are you using a CSS-in-JS library?**
   - Yes → Use `cssVars` from `@iress-oss/ids-tokens`
   - No → Go to step 4

4. **Does it need complex selectors or CSS features?**
   - Yes → Use custom CSS with CSS variable references
   - No → Reconsider if styling props or `iressCss()` can work

## Common Anti-Patterns

Avoid these common mistakes when styling components:

### ❌ Using inline styles instead of styling props

**Problem**: Inline styles bypass the design system, making code non-themeable and inconsistent.

```tsx
// ❌ INCORRECT - Inline styles with hardcoded values
<IressPanel style={{ padding: '16px', backgroundColor: '#F5F5F5' }}>
  Content
</IressPanel>

// ✅ CORRECT - Styling props with tokens
<IressPanel p="md" bg="colour.neutral.10">
  Content
</IressPanel>
```

**Why this matters**: Inline styles won't respond to theme changes, breaking the visual consistency of your application.

### ❌ Hardcoded colors instead of semantic tokens

**Problem**: Hardcoded color values don't adapt to different themes and may fail accessibility standards.

```tsx
// ❌ INCORRECT - Hardcoded hex colors
<IressText style={{ color: '#000000' }}>Primary text</IressText>
<IressPanel style={{ backgroundColor: '#13213F', color: '#FFFFFF' }}>
  Featured content
</IressPanel>

// ✅ CORRECT - Semantic color tokens
<IressText color="colour.primary.text">Primary text</IressText>
<IressPanel bg="colour.primary.fill" color="colour.primary.onFill">
  Featured content
</IressPanel>
```

**Why this matters**: Semantic tokens like `colour.primary.fill` and `colour.primary.onFill` are guaranteed to have proper contrast and automatically adapt to theme changes.

### ❌ Using className for basic styling

**Problem**: Adding custom classes for basic spacing/colors adds unnecessary CSS and bypasses the design system.

```tsx
// ❌ INCORRECT - Custom class for basic styling
<IressPanel className="my-custom-padding">
  Content
</IressPanel>

// CSS file:
.my-custom-padding {
  padding: 24px;
}

// ✅ CORRECT - Styling prop with token
<IressPanel p="lg">
  Content
</IressPanel>
```

**Why this matters**: Styling props are more maintainable, type-safe, and ensure consistency. Custom classes should only be used for complex styling needs.

### ❌ Arbitrary spacing values

**Problem**: Using spacing values outside the design system's scale creates inconsistency.

```tsx
// ❌ INCORRECT - Arbitrary spacing value
<IressPanel style={{ padding: '17px' }}>
  Content
</IressPanel>

// ✅ CORRECT - Design system spacing scale
<IressPanel p="md"> {/* 16px */}
  Content
</IressPanel>

// ✅ ALSO CORRECT - If you need more, use the next step
<IressPanel p="lg"> {/* 24px */}
  Content
</IressPanel>
```

**Why this matters**: The spacing scale (`xs`, `sm`, `md`, `lg`, `xl`) creates visual rhythm and consistency. Stick to the scale unless you have a very specific edge case.

### When hardcoded values ARE acceptable

There are rare cases where hardcoded values are acceptable:

- **One-off edge cases** that don't fit the design system (after discussion with design team)
- **Third-party library constraints** where styling props can't be applied
- **Gradual migration** from legacy code (with a plan to refactor)
- **Prototyping** (with the expectation to use tokens in production)

Even in these cases, document why the exception exists and plan to revisit it.

---

# Radius

These are all styling props related to changing the radius of a component
affects the visual softness and perceived friendliness of the interface,
influencing the overall user experience.

## `borderRadius`

The `borderRadius` prop allows you to change the border radius of any component. It should be used sparingly, and often used when creating custom components that are not part of the design system, however you still want to retain the look and feel of the rest of the system.

```tsx
<IressInput
  borderRadius="radius.system.layout"
  px="spacing.4"
  py="spacing.2"
  placeholder="Search everything"
/>;
```

### Removing border radius

In some cases you may need to remove the border-radius to achieve design requirements. This can be done using `radius.000` or `none`.

```tsx
<IressPanel borderRadius="none" bg="alt">
  No radius here
</IressPanel>;
```

---

[View in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components_styling-props-radius--docs)

---

# Sizing

These are all styling props related to changing the size of a component,
refining the users expectation of the content and making screens easier to
scan.

## Overview

The sizing props are a collection of widths that are used throughout the design system. Although they are not part of the design tokens (which is more related to theming), we have exposed them to you to allow you to build consistent user experiences where you may need to deviate from the default props of a component.

The sizes here can be used in the `maxWidth` or `width` prop of any component, but they have been documented here according to their designated component.

## Input widths

Input widths are sizes that suit a specific number of characters. This sets an expectation of what data a user has to enter. The following list is the widths we have created for inputs, and have been designed to be used with `IressInput` but can be used with any component.

- `input.2`: Two character width, usually used for accessor codes
- `input.4`: Four character width, usually used for CVC, one-time passwords and pin numbers
- `input.6`: Six character width, usually used for one-time passwords and pin numbers
- `input.8`: Eight character width
- `input.10`: Ten character width, usually used for dates
- `input.12`: Twelve character width
- `input.16`: Sixteen character width, usually used for credit cards

For variable data entry, you can use grid tokens. These are usually used inside `IressFieldGroup`, and denote a connection between fields with different widths (eg. First name and Last name under Name). In most cases where there is no relationship but you would like to compact the layout to make it easier to scan, and you should use `IressRow` and `IressCol` instead with the `span` prop.

- `3/12`: 25% width of parent container
- `6/12`: 50% width of parent container
- `9/12`: 75% width of parent container
- `12/12`: 100% width of parent container

```tsx
<IressPanel bg="alt" width="input.16">
  Credit card number wide panel
</IressPanel>;
```

## Container widths

Container widths are sizes that define the maximum width where content is considered easy to read on specific screen ranges. They are used by `IressContainer` to help ensure content is readable no matter the screen size.

In some cases however, you may want to restrain the width even further (for example, single column content is usually easiest to read when it is confined to the centre of the screen). The container widths have been exposed so they can be used in the `maxWidth` prop of your own components.

- `container.xl`: 1140px
- `container.xxl`: 1400px

## Overlay widths

Overlay widths are sizes that define the width of overlay components such as Modals and Slideouts.

- `overlay.sm`: 368px
- `overlay.md`: 628px
- `overlay.lg`: 800px

```tsx
<IressContainer maxWidth="overlay.lg" bg="alt" fluid p="lg">
  This container has maxWidth set to <code>overlay.lg</code>.
</IressContainer>;
```

---

[View in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components_styling-props-sizing--docs)

---

# Spacing

These are all styling props related to changing the spacing of a component.

## Padding

There are seven props you can use to customise the padding of any component. It accepts the entire spacing token spectrum.

- `p`: Change the padding on all axes
- `px`: Change the padding on the left and right of a component
- `py`: Change the padding on the top and bottom of a component
- `pl`: Change the padding on the left of a component
- `pr`: Change the padding on the right of a component
- `pt`: Change the padding on the top of a component
- `pb`: Change the padding on the bottom of a component

```tsx
<IressPanel bg="alt" p="xl">
  A panel that has extra large padding on all sides.
</IressPanel>;
```

```tsx
<IressPanel bg="alt" p="xl">
  A panel that has extra large padding on all sides.
</IressPanel>;
```

```tsx
<IressButton px={px} mode="primary">
  Submit
</IressButton>;
```

```tsx
<IressPanel bg="alt" pb="xl" pt="spacing.1" pl="md" pr="spacing.6">
  A panel that has different padding on each side.
</IressPanel>;
```

### Responsive padding

All padding props are responsive and can be changed according to different screen sizes.

```tsx
<IressPanel bg="alt" p={{ base: 'xl', lg: 'none' }}>
  A panel that has extra large padding on small screens and no padding on large
  screens.
</IressPanel>;
```

```tsx
<IressPanel
  bg="alt"
  px={{ base: 'none', lg: 'xl' }}
  py={{ base: 'xl', lg: 'none' }}
>
  A panel that has responsive padding on the vertical and horizontal axes.
</IressPanel>;
```

### Migrating from version 5

Responsive padding worked differently in version 5. The `p` prop no longer accepts a nested object of axes to change the padding, you must change every prop based on the breakpoint.

```diff
-<IressPanel p={{ t: 'xl', b: 'xl' }} />
+<IressPanel pt="xl" pb="xl" />
```

## Margin

There are seven props you can use to customise the margin of any component. It accepts the entire spacing token spectrum, `auto` and negative values of the spacing token spectrum.

- `m`: Change the margin on all axes
- `mx`: Change the margin on the left and right of a component
- `my`: Change the margin on the top and bottom of a component
- `ml`: Change the margin on the left of a component
- `mr`: Change the margin on the right of a component
- `mt`: Change the margin on the top of a component
- `mb`: Change the margin on the bottom of a component

```tsx
<IressPanel bg="alt" m="xl">
  A panel that has the same margin on all sides.
</IressPanel>;
```

```tsx
<IressPanel bg="alt" mb="xl" mt="spacing.1" ml="md" mr="spacing.6">
  A panel that has different margin on each side.
</IressPanel>;
```

### Responsive margin

All margin props are responsive and can be changed according to different screen sizes.

```tsx
<IressPanel bg="alt" m={{ base: 'xl', lg: 'none' }}>
  A panel that has extra large margin on small screens and no margin on large
  screens.
</IressPanel>;
```

```tsx
<IressPanel
  bg="alt"
  mx={{ base: 'none', lg: 'xl' }}
  my={{ base: 'xl', lg: 'none' }}
>
  A panel that has responsive margin on the vertical and horizontal axes.
</IressPanel>;
```

### Negative margin

Negative margin is supported in the same way as positive margin. You can use the same props to set negative margin.

```tsx
<IressPanel bg="colour.primary.surface" maxWidth="container.sm" mx="auto">
  <IressPanel bg="colour.primary.fill" color="colour.primary.onFill" mx="-xl" />
</IressPanel>;
```

## `noGutter`

The `noGutter` prop removes the bottom margin of the last direct child of a component. This is useful when you have nested content inside a component with padding, such as `IressPanel` or `IressCard`, to remove unnecessary spacing in your layout.

```tsx
<IressPanel bg="alt" noGutter>
  <ul>
    <li>
      Margin is removed due to <code>noGutter</code>
    </li>
    <li>Last child has no bottom margin</li>
  </ul>
</IressPanel>;
```

---

## Best Practices

Always use spacing tokens from the design system scale instead of hardcoded pixel values. This ensures visual consistency and rhythm across your application.

### ✅ DO: Use spacing token aliases

The spacing scale provides convenient aliases (`xs`, `sm`, `md`, `lg`, `xl`) that map to specific pixel values.

```tsx
// ✅ CORRECT - Using aliases
<IressPanel p="xl">Extra large padding (48px)</IressPanel>
<IressStack spacing="md">Medium gap between items (16px)</IressStack>
```

### ✅ DO: Use full token names

You can also use the full token names (e.g., `spacing.4`) for the same effect as aliases.

```tsx
// ✅ CORRECT - Using full token names
<IressPanel p="spacing.10">Same as xl (48px)</IressPanel>
<IressStack spacing="spacing.4">Same as md (16px)</IressStack>
```

### ✅ DO: Use directional props for precise control

Use directional spacing props (`px`, `py`, `pl`, `pr`, `pt`, `pb`) when you need different spacing on different axes.

```tsx
// ✅ CORRECT - Directional spacing with tokens
<IressPanel px="lg" py="sm">
  Horizontal padding: large (24px), Vertical padding: small (8px)
</IressPanel>;
```

### ❌ DON'T: Use hardcoded pixel values

Hardcoded pixel values break the design system's visual rhythm and don't adapt to spacing scale changes.

```tsx
// ❌ INCORRECT - Hardcoded pixel values
<IressPanel style={{ padding: '24px' }}>Content</IressPanel>

// ✅ CORRECT - Spacing token
<IressPanel p="lg">Content</IressPanel>
```

### ❌ DON'T: Use inline styles for spacing

Inline styles bypass the design system and make code non-themeable.

```tsx
// ❌ INCORRECT - Inline styles
<IressPanel style={{ margin: '16px 0', padding: '8px 24px' }}>
  Content
</IressPanel>

// ✅ CORRECT - Styling props with tokens
<IressPanel my="md" px="lg" py="sm">
  Content
</IressPanel>
```

### ✅ DO: Use `cssVars` for CSS-in-JS

If you're using a CSS-in-JS library, use `cssVars` from `@iress-oss/ids-tokens` to reference spacing tokens.

```tsx
import { cssVars } from '@iress-oss/ids-tokens';
import styled from 'styled-components';

// ✅ CORRECT - Using cssVars for spacing in CSS-in-JS
const StyledPanel = styled.div`
  padding: ${cssVars.spacing[10]}; /* xl - 40px */
  margin: ${cssVars.spacing[4]} 0; /* md - 16px vertical */
  gap: ${cssVars.spacing[2]}; /* sm - 8px */
`;

// ✅ CORRECT - Directional spacing
const StyledBox = styled.div`
  padding-left: ${cssVars.spacing[6]}; /* lg - 24px */
  padding-right: ${cssVars.spacing[6]};
  padding-top: ${cssVars.spacing[2]}; /* sm - 8px */
  padding-bottom: ${cssVars.spacing[2]};
`;
```

### ❌ DON'T: Use arbitrary values - stick to the spacing scale

The spacing scale is designed to create visual consistency. Avoid arbitrary values that don't fit the scale.

```tsx
// ❌ INCORRECT - Arbitrary spacing value
<IressPanel style={{ padding: '17px' }}>Content</IressPanel>

// ✅ CORRECT - Use the closest value from the scale
<IressPanel p="md">Content (16px)</IressPanel>

// ✅ ALSO CORRECT - If you need more, use the next step
<IressPanel p="lg">Content (24px)</IressPanel>
```

## Token Reference

For a complete reference of the full spacing scale with all available tokens (spacing.0 through spacing.10), visual examples, and pixel values, see the documentation.

**Quick reference - Most commonly used spacing tokens:**

- `spacing.1` / `xs`: 4px - Extra small spacing
- `spacing.2` / `sm`: 8px - Small spacing
- `spacing.4` / `md`: 16px - Medium spacing (default for many components)
- `spacing.6` / `lg`: 24px - Large spacing
- `spacing.10` / `xl`: 40px - Extra large spacing

[View Full Spacing Token Reference](../tokens/spacing.md)

---

[View in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components_styling-props-spacing--docs)

---

# Typography

These are all styling props related to changing the typography of a component.

## `textStyle`

The `textStyle` prop allows you to change the default text style of a component. For more control and nested element styling, it is recommended to use `IressText` instead.

```tsx
<IressPanel bg="alt" textStyle="typography.heading.5">
  A panel with large text
</IressPanel>;
```

## `textAlign`

The `textAlign` prop allows you to change the alignment of text inside a component. For more control, it is recommended to use `IressText` instead.

```tsx
<IressPanel bg="alt" textAlign="center">
  A panel with centered text
</IressPanel>;
```

---

## Best Practices

For typography, the **IressText component is the preferred approach** for most use cases. It provides semantic HTML elements, accessibility features, and proper text styling out of the box.

### ✅ DO (PREFERRED): Use the `IressText` component

The `IressText` component is the recommended way to render text content. It handles typography tokens automatically and provides semantic HTML elements.

```tsx
// ✅ CORRECT - Use IressText (recommended)
<IressText>Default body text with proper styling</IressText>

<IressText element="h1">Heading rendered as h1 element</IressText>
```

**Why use IressText:**

- Provides semantic HTML elements (`h1`, `h2`, `p`, `span`, etc.)
- Handles typography tokens automatically
- Ensures accessibility with proper heading hierarchy
- No need to manage font properties manually

### ✅ DO (ALTERNATIVE): Use `textStyle` prop with typography tokens

When you need to apply typography styling to components that aren't text-specific (like `IressPanel`), use the `textStyle` prop with typography tokens.

```tsx
// ✅ CORRECT - Using textStyle prop with tokens
<IressPanel textStyle="typography.heading.1">
  Panel with heading-sized text
</IressPanel>;
```

**Available typography tokens:**

- `typography.body.sm`, `typography.body.md` - Body text variants
- `typography.heading.1`, `typography.heading.2`, `typography.heading.3` - Heading text variants

### ❌ DON'T: Use inline styles for typography

Inline styles with hardcoded font properties bypass the design system and don't respond to typography token updates.

```tsx
// ❌ INCORRECT - Hardcoded typography
<h1 style={{ fontSize: '24px', fontWeight: 'bold', lineHeight: '1.2' }}>
  Heading
</h1>

<p style={{ fontSize: '16px', fontFamily: 'Arial' }}>
  Body text
</p>

// ✅ CORRECT - Use IressText
<IressText element="h1">Heading</IressText>

<IressText>Body text</IressText>
```

### ✅ DO: Use `cssVars` for CSS-in-JS

If you're using a CSS-in-JS library, use `cssVars` from `@iress-oss/ids-tokens` to reference typography tokens.

```tsx
import { cssVars } from '@iress-oss/ids-tokens';
import styled from 'styled-components';

// ✅ CORRECT - Using cssVars for typography in CSS-in-JS
const Heading = styled.h1`
  font: ${cssVars.typography.heading[1]};
`;

const BodyText = styled.p`
  font: ${cssVars.typography.md.regular};
`;
```

### ❌ DON'T: Use hardcoded font properties

Hardcoded font sizes, weights, and families don't adapt to design system changes and break consistency.

```tsx
// ❌ INCORRECT - Hardcoded font properties
<div style={{
  fontSize: '16px',
  fontWeight: '600',
  fontFamily: 'Inter, sans-serif'
}}>
  Content
</div>

// ✅ CORRECT - Use textStyle prop with token
<IressPanel textStyle="typography.body.md">
  Content
</IressPanel>
```

### When to use IressText vs textStyle prop

**Use `IressText` when:**

- Rendering text content (paragraphs, headings, labels)
- You need semantic HTML elements
- Building accessible content with proper heading hierarchy
- Creating text-focused UI components

**Use `textStyle` prop when:**

- Applying typography styling to non-text components
- You already have a component and just need text styling
- Working with layout components like `IressPanel` or `IressStack`

## Token Reference

For a complete reference of all available typography tokens with font families, sizes, weights, and line heights, see the documentation.

Typography tokens include font family, size, weight, and line height specifications

[View Full Typography Token Reference](../tokens/typography.md)

---

[View in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components_styling-props-typography--docs)