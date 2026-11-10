# Skeleton

> Renders placeholder shapes to indicate content is loading.

## Import

```tsx
import { IressSkeleton } from '@iress-oss/ids-components';
```

- [Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-skeleton--docs)
- [Source](https://github.com/iress/design-system/tree/main/packages/components/src/components/Skeleton)
- [Report issue](https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=skeleton&title=[Skeleton]+Bug:+)
- [Request feature](https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=skeleton,enhancement&title=[Skeleton]+Feature:+)

## Props

> Required props are **bold**.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| height | `string` | — | Sets the height of the skeleton bones. If no unit is specified it will default to pixels. Not allowed when in `text` mode. |
| mode | `SkeletonMode` | `text` | Mode of the skeleton. `rect` and `circle` must have `width` and `height` specified. `text` works with `textStyle`. |
| textStyle | ... 9 more ..., `inherit` , `typography.body.sm.regular` , `typography.body.sm` , `typography.heading.1` , `typography.heading.2` , `typography.heading.3` , `typography.heading.4` , `typography.heading.5`  | — | Use `textStyle` to specify what the Skeleton should emulate. If set to `h1` a non-break space with the same font-size and line-height of a h1 will be rendered. |
| width | `string` | — | Sets the width of the skeleton bones. If no unit is specified it will default to pixels. |
| data-testid | `string` | — | The data-testid attribute is used to target elements in automated tests if no identifier is available. In some components it is propagated to child elements.  Notes: - Please use this prop sparingly and only when no other identifier is available, as per the guiding principles of Testing Library. - Only use this prop for your tests @see https://testing-library.com/docs/queries/bytestid |

📄 [Full type definition](../../dist/components/Skeleton/Skeleton.d.ts)

Also accepts all [styling props](../styling-props/overview.md) ([type definition](../../dist/interfaces.d.ts), [token values](../tokens/tokens-reference.md)).

Skeletons can increase perceived performance for users. As opposed to spinners, skeletons make it feel as though things are happening immediately, then the information is incrementally displayed on the screen.

```tsx
import { IressSkeleton, IressStack } from '@iress-oss/ids-components';

export function SkeletonMode() {
  return (
    <IressStack gap="md">
      <IressSkeleton mode="text" />
      <IressSkeleton mode="rect" height="100px" />
      <IressSkeleton mode="circle" height="100px" width="100px" />
    </IressStack>
  );
}
```

## Design

### When to use

> **Prefer [IressLoading](../patterns/loading.md)** — the Loading pattern handles skeleton display automatically with built-in timing, fade-in, and accessibility. Use `IressSkeleton` directly only when you need a custom skeleton layout that `IressLoading` doesn't support.

- **Custom skeleton layouts**: When `IressLoading` templates (`page`, `form`, `dashboard`) don't match your layout
- **Inline placeholders**: Individual skeleton elements within a larger component (e.g. an avatar placeholder)
- **Composition**: Building blocks for custom loading templates passed to `IressLoading`'s `template` prop

### When not to use

- **Indeterminate actions** with no layout structure — use [Spinner](../components/spinner.md) instead
- **Blocking full-page loads** — use [Progress](../components/progress.md) for determinate progress
- **Content that loads instantly** — avoid skeleton flash for fast responses

### Do's and Don'ts

| ✅ Do | ❌ Don't |
|-------|----------|
| Match the skeleton shape to the actual content layout | Use a single generic rectangle for all loading states |
| Use `text` mode with matching `textStyle` for text content | Show skeletons for longer than 3 seconds without explanation |
| Transition smoothly from skeleton to real content | Animate skeletons with jarring effects |
| Keep skeleton layouts stable to avoid layout shift | Change layout dimensions when real content appears |

### Content guidelines

- Skeletons are visual-only — no text content is needed
- Ensure the skeleton matches the dimensions of the final content
- Use `aria-hidden="true"` (set automatically) to hide from screen readers

### Related patterns

- [Spinner](../components/spinner.md) — for indeterminate loading without layout structure
- [Progress](../components/progress.md) — for determinate progress indicators
- [Loading pattern](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/patterns-loading--docs) — for full loading patterns

## Develop

### Quick Start

```tsx
import { IressSkeleton } from '@iress-oss/ids-components';

<IressSkeleton />;
```

[View all props](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-skeleton--docs#api-props)

### Usage

#### Modes

The `mode` prop can be set to `text` (default), `rect` or `circle`.

```tsx
import { IressSkeleton, IressStack } from '@iress-oss/ids-components';

export function SkeletonMode() {
  return (
    <IressStack gap="md">
      <IressSkeleton mode="text" />
      <IressSkeleton mode="rect" height="100px" />
      <IressSkeleton mode="circle" height="100px" width="100px" />
    </IressStack>
  );
}
```

#### Text

`text` mode works in place of `IressText`, matching sizing via the `textStyle` prop. Accepts `width` but not `height` (determined by font size and line height).

```tsx
import { useState } from 'react';
import {
  IressButton,
  IressSkeleton,
  IressStack,
  IressText,
} from '@iress-oss/ids-components';

const TEXT_STYLES = [
  'typography.heading.1',
  'typography.heading.2',
  'typography.heading.3',
  'typography.body.md',
  'typography.body.sm',
] as const;

export function SkeletonText() {
  const [loading, setLoading] = useState(true);

  return (
    <IressStack gap="md">
      <IressButton onClick={() => setLoading(!loading)}>
        Toggle load
      </IressButton>
      <IressStack gap="md">
        {TEXT_STYLES.map((textStyle) => [
          loading && (
            <IressSkeleton
              key={`skeleton-${textStyle}`}
              mode="text"
              textStyle={textStyle}
            />
          ),
          !loading && (
            <IressText key={`text-${textStyle}`} textStyle={textStyle}>
              {textStyle}
            </IressText>
          ),
        ])}
      </IressStack>
    </IressStack>
  );
}
```

#### Rect

`rect` mode replaces block elements like images. Accepts `width` and `height` (defaults to 100% × 100px).

```tsx
import { useState } from 'react';
import {
  IressButton,
  IressPlaceholder,
  IressSkeleton,
  IressStack,
} from '@iress-oss/ids-components';

export function SkeletonRect() {
  const [loading, setLoading] = useState(true);

  return (
    <IressStack gap="md">
      <IressButton onClick={() => setLoading(!loading)}>
        Toggle load
      </IressButton>
      {loading && <IressSkeleton mode="rect" width="250" height="150" />}
      {!loading && (
        <IressPlaceholder width="250" height="150">
          Image
        </IressPlaceholder>
      )}
    </IressStack>
  );
}
```

#### Circle

`circle` mode replaces circular elements like profile images. Accepts `width` and `height` (defaults to 100% × 100px).

```tsx
import { useState } from 'react';
import {
  IressButton,
  IressPlaceholder,
  IressSkeleton,
  IressStack,
} from '@iress-oss/ids-components';

export function SkeletonCircle() {
  const [loading, setLoading] = useState(true);

  return (
    <IressStack gap="md">
      <IressButton onClick={() => setLoading(!loading)}>
        Toggle load
      </IressButton>
      {loading && <IressSkeleton mode="circle" width="150" height="150" />}
      {!loading && (
        <IressPlaceholder width="150" height="150" borderRadius="50%">
          Image
        </IressPlaceholder>
      )}
    </IressStack>
  );
}
```

#### Size

`width` and `height` props accept any CSS unit. Defaults to pixels if no unit is provided.

```tsx
import { IressInline, IressSkeleton } from '@iress-oss/ids-components';

export function SkeletonSize() {
  return (
    <IressInline gap="md">
      <IressSkeleton mode="rect" width="150" height="150" />
      <IressSkeleton mode="circle" width="150" height="150" />
      <IressSkeleton mode="text" width="150" />
    </IressInline>
  );
}
```

#### Card

A common use case is placing skeletons within card components as loading placeholders.

```tsx
import { useState } from 'react';
import {
  IressButton,
  IressCard,
  IressSkeleton,
  IressStack,
  IressText,
} from '@iress-oss/ids-components';

const CARD_LINE_SIZES = ['100%', '91%', '95%', '89%', '83%'];

const CardLoading = () => (
  <IressCard
    heading={<IressSkeleton textStyle="typography.heading.4" width="75%" />}
    media={<IressSkeleton mode="rect" height="200" />}
    stretch
  >
    <IressStack gap="md">
      <IressStack gap="xs">
        {CARD_LINE_SIZES.map((size) => (
          <IressSkeleton key={`${size}-1`} width={size} />
        ))}
      </IressStack>
      <IressStack gap="xs">
        {CARD_LINE_SIZES.map((size) => (
          <IressSkeleton key={`${size}-2`} width={size} />
        ))}
      </IressStack>
    </IressStack>
  </IressCard>
);

const CardItem = () => (
  <IressCard
    heading={<h4>This is the card heading</h4>}
    media={
      <img
        src="https://www.iress.com/media/images/media-contact.width-600.png"
        alt=""
      />
    }
  >
    <IressText element="p">
      Non cupiditate, libero ex, voluptates ea ipsum deleniti sequi sed eveniet
      ab enim sunt itaque qui ullam, adipisci quo expedita laboriosam deserunt?
    </IressText>
    <IressText element="p">
      Impedit, quasi voluptas quae quibusdam officiis corporis. Distinctio et
      aspernatur quo atque non enim, recusandae at, eum dicta ullam commodi modi
      debitis.
    </IressText>
  </IressCard>
);

export const SkeletonCard = () => {
  const [loading, setLoading] = useState(true);

  return (
    <IressStack gap="md">
      <IressButton onClick={() => setLoading(!loading)}>
        Toggle load
      </IressButton>
      {loading && <CardLoading />}
      {!loading && <CardItem />}
    </IressStack>
  );
};
```

### Testing

`IressSkeleton` is a loading placeholder. Assert that real content appears after loading:

```tsx
await waitFor(() => {
  expect(screen.getByText('Loaded content')).toBeInTheDocument();
});
```

The skeleton has `aria-hidden="true"` and cannot be queried by role. Query by test ID if needed, or assert on the loaded content appearing.

[View test IDs](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-skeleton--docs#testing)


#### Test selectors

| Part | Description | Recommended Query | Test ID |
|------|-------------|-------------------|---------|
| main | The root element of the skeleton | — | `skeleton` |

---

### Storybook

Storybook provides an interactive playground for testing different prop combinations, more complex recipes, all prop details, and accessibility attributes.

[View in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-skeleton--docs)

## Specifications

### Behaviour

| State | Behaviour |
|-------|-----------|
| Loading | Displays animated placeholder matching the expected content shape |
| Loaded | Skeleton is replaced by real content (conditional rendering) |
| Text mode | Height derived from font size/line height, width configurable |
| Rect mode | Block placeholder with configurable width and height |
| Circle mode | Circular placeholder with configurable dimensions |

### Accessibility

**WCAG compliance:**

- **4.1.2 Name, Role, Value** — Uses `aria-hidden="true"` to hide from assistive technology
- **1.4.1 Use of Color** — Animation communicates loading state visually

**Note:** Skeletons are purely decorative and hidden from screen readers. Ensure loading states are communicated through other means if needed (e.g. `aria-busy` on the container).

### Keyboard interaction

No keyboard interaction — skeletons are non-interactive placeholder elements.

### Edge cases

- **Flash of skeleton**: For fast loads, consider delaying skeleton render by ~200ms to avoid flash
- **Layout shift**: Match skeleton dimensions exactly to final content to prevent CLS
- **Multiple skeletons**: Compose multiple skeleton elements to represent complex layouts
- **Dark mode**: Skeleton animation adapts to the current theme automatically

---

### Storybook

Storybook provides an interactive playground for testing different prop combinations and viewing accessibility attributes.

[View in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-skeleton--docs)