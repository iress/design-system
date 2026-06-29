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