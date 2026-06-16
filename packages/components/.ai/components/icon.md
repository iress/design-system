# Icon

> Renders an SVG icon from the design system icon set.

## Import

```tsx
import { IressIcon } from '@iress-oss/ids-components';
```

- [Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-icon--docs)
- [Source](https://github.com/iress/design-system/tree/main/packages/components/src/components/Icon)
- [Report issue](https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=icon&title=[Icon]+Bug:+)
- [Request feature](https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=icon,enhancement&title=[Icon]+Feature:+)

Icons enhance experiences by visually communicating meaning, actions, status, and feedback.

<StoryEmbed id="components-icon--screen-reader-text"/>

## Design

### When to use

- **Enhancing labels**: Pair with text to reinforce meaning (e.g. a warning icon next to an error message)
- **Button/link affordances**: Communicate actions like "edit", "delete", or "external link"
- **Status indicators**: Represent states like success, error, or loading (with `spin`)
- **Navigation cues**: Directional icons for menus, breadcrumbs, and accordions

### When not to use

- **Decorative imagery** — use [Image](../components/image.md) for illustrations or photos
- **Icon as the only interactive element without a label** — use an `IressButton` with `screenreaderText` instead
- **Complex illustrations** — use `IressImage` with styled SVG/illustrations

### Do's and Don'ts

| ✅ Do | ❌ Don't |
|-------|----------|
| Add `screenreaderText` when an icon conveys meaning | Use icons purely for decoration without hiding from assistive tech |
| Use Material Symbols (the default icon set) | Continue using Font Awesome for new work (deprecated) |
| Let icons inherit size from parent | Manually set icon sizes (the `size` prop has been removed) |
| Use `filled` to indicate active/selected states | Use colour alone to distinguish icon states |

### Content guidelines

- **`screenreaderText`**: Use a concise description of what the icon represents (e.g. "Close", "External link"), not a description of the icon itself (e.g. "X mark", "Arrow")
- **Decorative icons**: Icons alongside text labels don't need `screenreaderText` — hide them from screen readers
- **Consistency**: Use the same icon for the same concept throughout your application

#### Icon reference

A list of all the icons available in the Iress Design System. If you can't find the icon you are looking for, please refer to the [Material Symbols documentation](https://fonts.google.com/icons?icon.style=Rounded&icon.set=Material+Symbols).

<StoryEmbed id="components-icon--icons"/>

### Related patterns

- [Image](../components/image.md) — for photos, illustrations, and larger visual content
- [Button](../components/button.md) — icon buttons with labels for accessible actions
- [Spinner](../components/spinner.md) — for animated loading indicators

## Develop

### Quick Start

```tsx
import { IressIcon } from '@iress-oss/ids-components';

<IressIcon name="home" />
```

[View all props](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-icon--docs#api-props)

### Installation

#### Material Symbols

From version 6, the `IressIcon` component supports Material Symbols icons from Google as this is the new icon library being used in new Iress designs.

**Option 1: Automatic loading with `IressProvider` (recommended)**

If you are already using the `IressProvider` component in your application, no further action is required as the Material Symbols font will be automatically loaded for you as it contains the `IressIconProvider` component. The same applies if you are using `IressShadow`, which includes `IressProvider` internally.

```tsx
import { IressProvider } from '@iress-oss/ids-components';

<IressProvider>
  {/* Your application */}
</IressProvider>
```

<Details>
<summary>Shadow DOM (Microfrontends)</summary>

If you are using Microfrontends or Web Components that use Shadow DOM, you need to ensure that the Material Symbols font is loaded in the parent application as well as the Microfrontend or Web Component. This is because `@font-face` declarations are not supported inside the Shadow DOM.

The `IressProvider` component takes care of this for you when you use it with the `container` prop, which accepts a `HTMLElement` or `Ref<HTMLElement>`.

Or even easier, use `IressShadow` as your root component which includes `IressProvider` with the correct configuration for Shadow DOM.

</Details>

**Option 2: Using the `IressIconProvider`**

For more simpler applications, or if you need to customise the icon provider independently, you can use the `IressIconProvider` directly.

> **Note:** If you are already using `IressProvider` or `IressShadow`, you do not need to add `IressIconProvider` separately — it is already included.

```tsx
import { IressIconProvider } from '@iress-oss/ids-components';
<IressIconProvider>
  {/* Your application */}
</IressIconProvider>
```

**Option 3: Manual font loading**

If you prefer to manually load the Material Symbols font, you can add the following `<link />` tag to the `<head />` of your application:

```html
<link
  href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,300,0..1,0"
  rel="stylesheet"
/>
```

#### Font Awesome (Deprecated)

> **Deprecation Notice**
>
> The Font Awesome icon library will be removed in a future release. Please migrate to Material Symbols as soon as possible.

If you are planning to include the `<IressIcon />` component in your application, you need to include the Font Awesome CSS.

The easiest way to import the Font Awesome CSS is to use the `combined.css` file and add it to the `<head />` if your application. This file includes both the [Pro Light](https://fontawesome.com/v5/search?o=r&s=light) and [Brand](https://fontawesome.com/v5/search?o=r&f=brands) icon sets.

```html
<link
  href="https://cdn.iress.com/icons/5.15.4/css/combined.min.css"
  rel="stylesheet"
/>
```

<Details>
<summary>Shadow DOM (Microfrontends)</summary>

If you are using Microfrontends or Web Components that use Shadow DOM, you need to ensure that the Font Awesome CSS is loaded in the parent application as well as the Microfrontend or Web Component. This is because styles are not inherited inside the Shadow DOM.

The easiest way to do this is to use the `IressIconProvider` component with the `container` prop.

```tsx
import { IressIconProvider } from '@iress-oss/ids-components';
<IressIconProvider container={document.head}>
  {/* Your application */}
</IressIconProvider>
```

</Details>

**Making Font Awesome icons the default**

From version 6, the default icon type is Material Symbols. If you want to make Font Awesome the default icon type, you can wrap your application in the `IressIconProvider` component.

```tsx
import { IressIconProvider } from '@iress-oss/ids-components';
<IressIconProvider type="fontawesome">
  {/* Your application */}
</IressIconProvider>
```

### Screen Reader Text

By default icons are hidden from screen readers. The `screenreaderText` prop makes icons visible to screen readers users, providing a description of the icon.

<StoryEmbed id="components-icon--screen-reader-text"/>

### Filled

The `filled` prop allows you to use a filled version of the icon, usually to indicate an active state.

<StoryEmbed id="components-icon--filled"/>

### Flip

The `flip` prop can be set to horizontal, vertical or both.

<StoryEmbed id="components-icon--flip"/>

### Rotate

The `rotate` prop can be set to 90, 180 or 270 degrees.

<StoryEmbed id="components-icon--rotate"/>

### Spin

The `spin` prop can be set to half (fastest), 1, 2 or 3 (slowest) to control the speed of the icon spin animation, useful for loading spinners.

<StoryEmbed id="components-icon--spin"/>

### External link

Icons now inherit the size of the parent component. This means you can use them inside buttons, links and other components without needing to set a size.

<StoryEmbed id="components-icon--external-link"/>

### Reference

A list of all the icons available in the Iress Design System (Material Symbols only, as Font Awesome is deprecated).

If you can't find the icon you are looking for, please refer to the [Material Symbols documentation](https://fonts.google.com/icons?icon.style=Rounded&icon.set=Material+Symbols).

<StoryEmbed id="components-icon--icons"/>

### Migrating from Font Awesome

To help with migrating, we have mapped some common Font Awesome icons to their Material Symbols equivalents.

As of version 6, these names will automatically be mapped when using the `IressIcon` component with the default `type` of `material`. However, we strongly recommend you change them to the material equivalent as soon as possible as the automatic mapping will be removed in a future release.

<StoryEmbed id="components-icon--font-awesome-to-material-migration"/>

### Testing

Query icons by their accessible name via `screenreaderText`:

```tsx
const icon = screen.getByRole('img', { name: 'Close' });
```

Decorative icons (without `screenreaderText`) are hidden from the accessibility tree and should not be queried directly.


#### Test selectors

| Part | Description | Recommended Query | Test ID |
|------|-------------|-------------------|---------|
| main | The root element of the icon | — | `icon` |

---

### Storybook

Storybook provides an interactive playground for testing different prop combinations and viewing accessibility attributes.

[View in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-icon--docs)

## Specifications

### Behaviour

| State | Behaviour |
|-------|-----------|
| Default | Renders the named icon inline at the inherited font size |
| Filled | Displays the filled variant of the icon |
| Spin | Animates the icon with configurable speed |
| Decorative | Hidden from assistive technologies via `aria-hidden="true"` |

### Accessibility

**WCAG compliance:**

- **1.1.1 Non-text Content** — Decorative icons are hidden; meaningful icons require `screenreaderText`
- **1.4.1 Use of Color** — Icons supplement colour with shape to convey meaning
- **4.1.2 Name, Role, Value** — Icons with `screenreaderText` render with `role="img"` and an accessible label

**Keyboard interaction:**

Icons are not interactive on their own. When used inside buttons or links, the parent element handles keyboard interaction.

### Edge cases

- **Missing font**: If the icon font fails to load, a blank space is rendered — ensure font loading is configured
- **Unknown icon name**: Renders an empty glyph — verify icon names against Material Symbols reference
- **Font Awesome fallback**: Deprecated icons are auto-mapped to Material Symbols equivalents until the mapping is removed

---

### Storybook

Storybook provides an interactive playground for testing different prop combinations and viewing accessibility attributes.

[View in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-icon--docs)