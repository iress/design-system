# Image

> Renders a responsive image with optional fallback and loading behaviour.

## Import

```tsx
import { IressImage } from '@iress-oss/ids-components';
```

- [Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-image--docs)
- [Source](https://github.com/iress/design-system/tree/main/packages/components/src/components/Image)
- [Report issue](https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=image&title=[Image]+Bug:+)
- [Request feature](https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=image,enhancement&title=[Image]+Feature:+)

## Props

> Required props are **bold**.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| **alt** | `string` | — | The alternative text representation of the image. It is used by screen readers to describe the image. If the image is intended for decoration purposes only, make it an empty string. |
| maxWidth | `number, string ` | `100%` | Override the maximum width of the image |
| **src** | `string` | — | The address of the image |
| data-testid | `string` | — | The data-testid attribute is used to target elements in automated tests if no identifier is available. In some components it is propagated to child elements.  Notes: - Please use this prop sparingly and only when no other identifier is available, as per the guiding principles of Testing Library. - Only use this prop for your tests @see https://testing-library.com/docs/queries/bytestid |

📄 [Full type definition](../../dist/components/Image/Image.d.ts)

Also accepts all [styling props](../styling-props/overview.md) ([type definition](../../dist/interfaces.d.ts), [token values](../../tokens/.ai/tokens-reference.md)).

IressImage renders an image that resizes based on the user's screen width. The component accepts standard image attributes like `src` and `alt`.

```tsx
<IressImage
  src="https://www.fdcbuilding.com.au/wp-content/webp-express/webp-images/uploads/2020/01/4-1.jpg.webp"
  alt="Placeholder image"
  maxWidth="200px"
/>;
```

## Design

### When to use

- **Responsive images**: Display photos or illustrations that adapt to screen size
- **Avatars and thumbnails**: Small images within cards, lists, or profiles
- **Content imagery**: Supporting visuals within articles or documentation

### When not to use

- **Icons or symbols** — use [Icon](../components/icon.md) for scalable iconography
- **Decorative backgrounds** — use CSS `background-image` instead
- **Charts or data visualisations** — use a dedicated charting library

### Do's and Don'ts

| ✅ Do | ❌ Don't |
|-------|----------|
| Always provide meaningful `alt` text | Leave `alt` empty for informational images |
| Export images at the largest required size | Use `maxWidth` to downscale oversized source images |
| Use appropriate image formats (WebP for photos) | Use PNG for complex photographs |

### Content guidelines

- **`alt` text**: Describe the image content concisely — what it shows, not what it looks like technically
- **Decorative images**: Set `alt=""` for images that don't add informational value
- **File naming**: Use descriptive file names to support SEO and maintainability

### Related patterns

- [Icon](../components/icon.md) — for scalable UI iconography
- [Skeleton](../components/skeleton.md) — for image loading placeholders

## Develop

### Quick Start

```tsx
import { IressImage } from '@iress-oss/ids-components';

<IressImage src="https://example.com/photo.webp" alt="Placeholder image" />;
```

[View all props](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-image--docs#api-props)

### Usage

#### Max width

`maxWidth` accepts formats like `70 (numbers)` `250px (pixels)` `50% (percentages)` `undefined (fall back to default 100%)`, allowing you to display the image smaller than its original size, yet still responsive on smaller screen sizes.

**Note:** Please consider not using this prop, but rather exporting images at the largest size required for your application (the maximum width).

```tsx
<IressStack gap="md">
  <IressText element="h3">70</IressText>
  <IressImage
    src="https://www.fdcbuilding.com.au/wp-content/webp-express/webp-images/uploads/2020/01/4-1.jpg.webp"
    alt="Placeholder image"
    maxWidth={70}
  />

  <IressText element="h3">250px</IressText>
  <IressImage
    src="https://www.fdcbuilding.com.au/wp-content/webp-express/webp-images/uploads/2020/01/4-1.jpg.webp"
    alt="Placeholder image"
    maxWidth="250px"
  />

  <IressText element="h3">50%</IressText>
  <IressImage
    src="https://www.fdcbuilding.com.au/wp-content/webp-express/webp-images/uploads/2020/01/4-1.jpg.webp"
    alt="Placeholder image"
    maxWidth="50%"
  />

  <IressText element="h3">undefined</IressText>
  <IressImage
    src="https://www.fdcbuilding.com.au/wp-content/webp-express/webp-images/uploads/2020/01/4-1.jpg.webp"
    alt="Placeholder image"
  />
</IressStack>;
```

### Testing

Query images by their `alt` text:

```tsx
const image = screen.getByRole('img', { name: 'Company logo' });
```


#### Test selectors

| Part | Description | Recommended Query | Test ID |
|------|-------------|-------------------|---------|
| main | The root element of the image | `getByRole('img')`, or `getByAltText('...')` to match by alt text | `image` |

---

### Storybook

Storybook provides an interactive playground for testing different prop combinations and viewing accessibility attributes.

[View in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-image--docs)

## Specifications

### Behaviour

| State | Behaviour |
|-------|-----------|
| Default | Renders at 100% width of container, maintaining aspect ratio |
| With `maxWidth` | Constrains to specified width while remaining responsive |
| Broken `src` | Browser default broken image indicator is shown |

### Accessibility

**WCAG compliance:**

- **1.1.1 Non-text Content** — Requires `alt` attribute for screen reader announcement
- **1.4.5 Images of Text** — Do not use images to display text content

**Keyboard interaction:**

Images are not interactive. When wrapped in a link or button, the parent element handles keyboard interaction.

---

### Storybook

Storybook provides an interactive playground for testing different prop combinations and viewing accessibility attributes.

[View in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-image--docs)