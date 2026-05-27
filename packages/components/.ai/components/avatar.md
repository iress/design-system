# Avatar

Avatars display user initials in a circular frame, with optional badge indicators and multi-person layouts.

> **Component:** `import { IressAvatar } from '@iress-oss/ids-components'`
> **Storybook:** [Avatar in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components_components-avatar--docs)

## Quick Start

```tsx
import { IressAvatar } from '@iress-oss/ids-components';

<IressAvatar initials="BC" badge variant="single" />
```

## When to use

Use avatars to **represent users or entities** in your interface:

- Displaying user profile identity (initials-based)
- Showing assignment or ownership of items
- Indicating shared/joint entities with the multiple variant
- Stacking multiple users in compact layouts (e.g., attendee lists)

## Examples

### No badge

Set `badge={false}` to hide the status indicator.

```tsx
<IressAvatar initials="JD" badge={false} />
```

[View "NoBadge" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_components-avatar--no-badge)

### Multiple persons

Use `variant="multiple"` to show an overlapping dual-avatar layout representing shared or joint entities.

```tsx
<IressAvatar initials="BC" variant="multiple" badge={false} />
```

[View "MultiplePersons" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_components-avatar--multiple-persons)

### Compact

Set `compact={true}` for a smaller 32×32px avatar with a white stroke border, designed for stacking with negative margin.

```tsx
<IressAvatar initials="MT" compact />
```

[View "Compact" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_components-avatar--compact)

### Compact group

Multiple compact avatars can be stacked with negative margin to show a group of users.

```tsx
<div style={{ display: 'flex' }}>
<IressAvatar initials="MT" compact />
<IressAvatar initials="HM" compact style={{ marginLeft: '-16px' }} />
<IressAvatar initials="TL" compact style={{ marginLeft: '-16px' }} />
</div>
```

[View "CompactGroup" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_components-avatar--compact-group)

## Testing

Query avatars by their accessible role and label:

```tsx
const avatar = screen.getByRole('img', { name: 'Avatar: BC' });
```

## Props

- **Type:** `IressAvatarProps`
- **Type declarations:** `@iress-oss/ids-components/dist/components/Avatar/Avatar.d.ts`

```typescript
import type { IressAvatarProps } from '@iress-oss/ids-components';
```


---

*View interactive examples: [https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components_components-avatar--docs](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components_components-avatar--docs)*
