# Hide

> Conditionally hides content based on responsive breakpoints.

## Import

```tsx
import { IressHide } from '@iress-oss/ids-components';
```

- [Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-hide--docs)
- [Source](https://github.com/iress/design-system/tree/main/packages/components/src/components/Hide)
- [Report issue](https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=hide&title=[Hide]+Bug:+)
- [Request feature](https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=hide,enhancement&title=[Hide]+Feature:+)

Makes it easier to create adaptive designs that show or hide content based on screen size.

<StoryEmbed id="components-hide--hidden-on" />

## Design

### When to use

- **Responsive layouts**: Hide content on smaller screens that isn't essential for mobile
- **Progressive disclosure**: Show additional detail only on larger screens
- **Screen reader content**: Use `visuallyHidden` to provide context for assistive technology without visual clutter

### When not to use

- **Interactive show/hide** (user-triggered) — use [Expander](../components/expander.md) instead
- **Conditional rendering based on data** — use standard React conditional rendering
- **Layout changes** — use [Row](../components/row.md)/[Col](../components/col.md) with responsive `span` props

### Do's and Don'ts

| ✅ Do | ❌ Don't |
|-------|----------|
| Hide supplementary content on mobile | Hide primary content or navigation on any screen size |
| Use `visuallyHidden` for screen reader labels | Use `display: none` directly — it removes from accessibility tree |
| Specify both hide and show breakpoints clearly | Assume content is only viewed on desktop |

### Related patterns

- [Col](../components/col.md) — responsive column spans
- [Container](../components/container.md) — responsive max-width
- [Expander](../components/expander.md) — user-triggered show/hide

## Develop

### Quick Start

```tsx
import { IressHide } from '@iress-oss/ids-components';

<IressHide hiddenOn={{ md: true }}>
  This content is hidden on medium screens and above.
</IressHide>
```

[View all props](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-hide--docs#api-props)

### Usage

#### `hiddenOn`

The `hiddenOn` prop accepts a responsive object. Set a breakpoint to `true` to hide content from that breakpoint upward. Set it to `false` to make content visible again at a larger breakpoint.

<StoryEmbed id="components-hide--hidden-on" />

#### Visually hidden

Use `visuallyHidden` for content that should be accessible to screen readers but not visible on screen:

<StoryEmbed id="components-hide--visually-hidden" />

### Testing

Hidden content is removed from both visual and accessibility trees (unless `visuallyHidden` is used):

```tsx
// Content is not in the DOM when hidden
expect(screen.queryByText('Hidden content')).not.toBeInTheDocument();

// Visually hidden content is still accessible
const srContent = screen.getByText('Screen reader only');
```

[View test IDs](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-hide--docs#testing)


#### Test selectors

| Part | Description | Recommended Query | Test ID |
|------|-------------|-------------------|---------|
| main | The root element of the hide | — | `hide` |

## Specifications

### Behaviour

| State | Behaviour |
|-------|-----------|
| `hiddenOn` breakpoint active | Content removed from DOM (not rendered) |
| `hiddenOn` breakpoint inactive | Content rendered normally |
| `visuallyHidden` | Content rendered but positioned off-screen; accessible to screen readers |

<StoryEmbed id="components-hide--breakpoint-table" />

### Accessibility

- Hidden content (`hiddenOn`) is completely removed — not accessible to any user
- `visuallyHidden` uses CSS positioning to hide visually while keeping in accessibility tree
- Use `visuallyHidden` for labels, skip links, or context that sighted users get from visual cues

### Edge cases

- **No breakpoints specified**: Content always visible
- **Only one breakpoint**: Hidden from that breakpoint upward (mobile-first)
- **Nested hides**: Work independently — inner hide doesn't inherit parent's visibility

---

[View in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-hide--docs)