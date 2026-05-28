# 
> **Component:** `import { IressImage } from '@iress-oss/ids-components'`
> **Storybook:** [ in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components_components-image--docs)```tsx
```

## Quick Start

```tsx
<IressImage src="https://www.fdcbuilding.com.au/wp-content/webp-express/webp-images/uploads/2020/01/4-1.jpg.webp" alt="Placeholder image" />
```

## Examples

### MaxWidth

`maxWidth` accepts formats like `70 (numbers)` `250px (pixels)` `50% (percentages)` `undefined (fall back to default 100%)`, allowing you to display the image smaller than its original size, yet still responsive on smaller screen sizes.

**Note:** Please consider not using this prop, but rather exporting images at the largest size required for your application (the maximum width).

```tsx
<IressStack gap="md">
{MAX_WIDTHS.map((width, index) => (
<React.Fragment key={index}>
<IressText element="h3">{width ?? 'undefined'}</IressText>
<IressImage maxWidth={width} />
</React.Fragment>
))}
</IressStack>
```

[View "MaxWidth" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_components-image--max-width)

## Testing

Query images by their `alt` text:

```tsx
const image = screen.getByRole('img', { name: 'Company logo' });
```

---

[View in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components_components-image--docs)
