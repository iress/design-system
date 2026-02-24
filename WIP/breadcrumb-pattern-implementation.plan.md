# Breadcrumb Pattern Implementation Plan

## Problem Summary

Create a new Breadcrumb pattern component for the Iress Design System that provides secondary navigation, helping users understand their current location within the site hierarchy and navigate back to parent levels.

## Figma Design Analysis

### Design Links

- **Main Design**: [Breadcrumb Overview](https://www.figma.com/design/ilgbCkPI7jwNHoOg93y18n/Xtool-?node-id=1480-9913&t=YPG8XgFBICLjqvXK-4)
- **Master Frames**: [Component Structure](https://www.figma.com/design/ilgbCkPI7jwNHoOg93y18n/Xtool-?node-id=1978-13922&t=YPG8XgFBICLjqvXK-4)
- **Documentation**: [Usage Guidelines](https://www.figma.com/design/ilgbCkPI7jwNHoOg93y18n/Xtool-?node-id=3737-46696&t=YPG8XgFBICLjqvXK-4)
- **Prototype**: [Interactive Demo](https://www.figma.com/design/ilgbCkPI7jwNHoOg93y18n/Xtool-?node-id=3829-77419&t=YPG8XgFBICLjqvXK-4)

### Key Design Features

Based on Figma analysis:

1. **Component Hierarchy**:
   - Main container (Breadcrumb)
   - Individual crumb items (.Master/Breadcrumb/Crumbs)
   - Overflow indicator (.Breadcrumb/Overflow) for 5+ items
   - Chevron-right separators between items

2. **States**:
   - **Default**: Standard clickable link appearance
   - **Hover**: Interactive hover state for clickable items
   - **Current**: Final breadcrumb (current page) - not clickable, visually distinct

3. **Page Types**:
   - **Previous**: Clickable breadcrumb links to parent pages (medium weight, neutral/70 color)
   - **Current**: Non-clickable current page indicator (semi-bold, neutral/90 color)

4. **Configurations**:
   - 2 breadcrumbs: Parent → Current
   - 3 breadcrumbs: Grandparent → Parent → Current
   - 4 breadcrumbs: Great-grandparent → Grandparent → Parent → Current
   - 5+ breadcrumbs: Root → ... → Parent → Parent → Current (with overflow)

5. **Styling Details** (from Figma):
   - Font: Inter, sizes 12px (crumbs), 14px (overflow "...")
   - Previous crumbs: Medium (500), neutral/70 color
   - Current crumb: Semi Bold (600), neutral/90 color
   - Separator: 16px chevron-right icon
   - Gap: 4px between crumbs and separators
   - Focus ring: 4px border radius, focus-ring color (#005bff)

6. **Accessibility Requirements**:
   - Semantic HTML: `<nav>`, `<ol>`, `<li>`
   - ARIA attributes: `aria-label` for nav, `aria-current="page"` for current item
   - Keyboard navigation support
   - Focus ring visibility

## Solution Approach

Implement a **Pattern** (not a simple component) in the `patterns/` directory with the following structure:

### Pattern Structure

```
patterns/Breadcrumb/
├── index.ts                          # Exports
├── Breadcrumb.tsx                    # Main pattern container
├── Breadcrumb.styles.ts              # Styling (SVA recipe)
├── Breadcrumb.stories.tsx            # Storybook stories
├── Breadcrumb.test.tsx               # Tests
├── Breadcrumb.docs.mdx               # Documentation
├── components/
│   ├── BreadcrumbItem.tsx            # Individual breadcrumb item
│   ├── BreadcrumbSeparator.tsx       # Chevron separator
│   └── BreadcrumbOverflow.tsx        # Overflow indicator ("...")
└── meta/
    ├── index.tsx                     # Meta information
    └── Thumbnail.tsx                 # Component thumbnail for Storybook
```

### Component Architecture

**Main Pattern** (`IressBreadcrumb`):

- Renders semantic `<nav aria-label="Breadcrumb"><ol>...</ol></nav>`
- Accepts array of breadcrumb items or children
- Automatic overflow handling for 5+ items
- Manages separator rendering between items

**Sub-components**:

- `IressBreadcrumbItem`: Individual clickable/non-clickable item wrapped in `<li>`
- `IressBreadcrumbSeparator`: Chevron-right icon separator (visual only, not in DOM for screen readers)
- `IressBreadcrumbOverflow`: Overflow menu/popover for collapsed items (stretch goal)

### API Design

```typescript
export interface IressBreadcrumbItem {
  /**
   * Label for the breadcrumb item.
   */
  label: string;

  /**
   * URL to navigate to. If not provided, item is treated as current page.
   */
  href?: string;

  /**
   * Custom element to render (for routing libraries like React Router).
   */
  element?: ElementType;

  /**
   * Additional props passed to the link/element.
   */
  [key: string]: unknown;
}

export interface IressBreadcrumbProps extends IressStyledProps {
  /**
   * Array of breadcrumb items defining the navigation path.
   * The last item without an href is automatically treated as the current page.
   */
  items: IressBreadcrumbItem[];

  /**
   * Accessible label for the breadcrumb navigation.
   * @default 'Breadcrumb'
   */
  ariaLabel?: string;

  /**
   * Maximum number of items to show before collapsing with overflow.
   * @default 4
   */
  maxItems?: number;

  /**
   * Enable overflow behavior for breadcrumbs exceeding maxItems.
   * @default true
   */
  showOverflow?: boolean;
}
```

## Implementation Checklist

### Phase 1: Setup and Core Structure

- [ ] Create `patterns/Breadcrumb/` directory structure
- [ ] Create `Breadcrumb.styles.ts` with SVA recipe
  - [ ] Define slots: `root` (nav), `list` (ol), `item` (li), `link`, `current`, `separator`
  - [ ] Implement base styles matching Figma specs
  - [ ] Add state variants (hover, focus)
  - [ ] Add page type variants (previous, current)
- [ ] Create `Breadcrumb.tsx` main component
  - [ ] Implement semantic HTML structure (nav > ol > li)
  - [ ] Accept items array prop
  - [ ] Render breadcrumb items with separators
  - [ ] Apply aria-label to nav
  - [ ] Mark last item as current with aria-current="page"

### Phase 2: Sub-components

- [ ] Create `components/BreadcrumbItem.tsx`
  - [ ] Render as IressLink when href is provided
  - [ ] Render as styled span when no href (current page)
  - [ ] Support custom element prop for routing libraries
  - [ ] Apply appropriate styling based on current/previous state
  - [ ] Implement focus ring styling
- [ ] Create `components/BreadcrumbSeparator.tsx`
  - [ ] Render chevron-right icon from IressIcon
  - [ ] Apply aria-hidden="true" (decorative only)
  - [ ] Style according to Figma (16px, 4px gap)
- [ ] Create `components/BreadcrumbOverflow.tsx` (Optional/Stretch)
  - [ ] Render "..." indicator
  - [ ] Optional: Implement popover with collapsed items

### Phase 3: Testing

- [ ] Create `Breadcrumb.test.tsx`
  - [ ] **Default rendering tests**
    - [ ] Renders semantic nav with ol/li structure
    - [ ] Applies correct aria-label
    - [ ] Marks last item with aria-current="page"
    - [ ] Renders correct number of items
  - [ ] **Item rendering tests**
    - [ ] Renders links for items with href
    - [ ] Renders span for current item (no href)
    - [ ] Applies correct CSS classes
    - [ ] Renders separators between items (not after last)
  - [ ] **Navigation behavior tests**
    - [ ] Clicking breadcrumb navigates correctly
    - [ ] Supports custom element prop
    - [ ] Current page item is not clickable
  - [ ] **Overflow tests**
    - [ ] Shows overflow indicator when items exceed maxItems
    - [ ] Hides overflow when items are within maxItems
  - [ ] **Accessibility tests**
    - [ ] Passes axe accessibility validation
    - [ ] Keyboard navigation works (tab to each link)
    - [ ] Focus ring visible on keyboard focus
    - [ ] Screen reader announces breadcrumb navigation
  - [ ] **Visual variant tests**
    - [ ] Previous items use medium weight, neutral/70
    - [ ] Current item uses semi-bold, neutral/90
    - [ ] Hover state applied correctly

### Phase 4: Storybook Stories

- [ ] Create `Breadcrumb.stories.tsx`
  - [ ] **Default story**: 2-item breadcrumb (Home → Current)
  - [ ] **ThreeItems story**: 3-item breadcrumb
  - [ ] **FourItems story**: 4-item breadcrumb
  - [ ] **FivePlusItems story**: 5+ items with overflow
  - [ ] **CustomElement story**: Using custom routing element
  - [ ] **LongLabels story**: Test with long breadcrumb labels
  - [ ] Tag with `['beta']` for new pattern
- [ ] Create `Breadcrumb.docs.mdx`
  - [ ] Component overview with description
  - [ ] Usage examples for each configuration
  - [ ] Accessibility guidelines
  - [ ] Integration with routing libraries
  - [ ] Best practices (when to use, how many levels)

### Phase 5: Meta and Exports

- [ ] Create `meta/index.tsx`
  - [ ] Export metadata: heading, href, tags
  - [ ] Tags: ['navigation', 'breadcrumb', 'hierarchy']
- [ ] Create `meta/Thumbnail.tsx`
  - [ ] Design thumbnail SVG for Storybook showcase
- [ ] Update `patterns/010-Introduction.stories.tsx`
  - [ ] Add breadcrumb to patterns list
- [ ] Create `index.ts` with proper exports
  ```typescript
  export * from './Breadcrumb.styles';
  export * from './Breadcrumb';
  export * from './components/BreadcrumbItem';
  export * from './components/BreadcrumbSeparator';
  export * from './components/BreadcrumbOverflow';
  ```

### Phase 6: Integration

- [ ] Update `@/main` exports to include breadcrumb pattern
- [ ] Update pattern documentation in main README
- [ ] Ensure all imports use proper paths (no @/main in implementation)
- [ ] Run linting and fix any issues
- [ ] Run tests and ensure 100% pass rate
- [ ] Test in Storybook to verify visual appearance

### Phase 7: Quality Checklist

Apply quality checklist from component creation guidelines:

#### ✅ Implementation

- [ ] Component follows naming conventions (`Iress` prefix)
- [ ] Extends appropriate base props (`IressStyledProps`)
- [ ] Uses functional component with destructured props
- [ ] Includes comprehensive TypeScript interfaces
- [ ] Supports children/content composition
- [ ] Uses helper utilities (`cx`, `propagateTestid`, etc.)
- [ ] No direct imports from `@/main` in component files

#### ✅ Styling

- [ ] Uses SVA (Slot Variant Authority) for multiple component parts
- [ ] Follows design token conventions (`colour.*`, `spacing.*`, etc.)
- [ ] Includes semantic slot names (`root`, `list`, `item`, `link`, etc.)
- [ ] Base styles are comprehensive and well-defined
- [ ] Matches Figma design specifications exactly
- [ ] No direct imports from `@/main` in styling files

#### ✅ Stories

- [ ] Includes `Default` story showing basic usage
- [ ] Demonstrates key variants systematically
- [ ] Uses Storybook helpers from `@iress-oss/ids-storybook-config`
- [ ] Imports from `@storybook/react-vite` and `@/main`
- [ ] Properly tagged with `['beta']`

#### ✅ Testing

- [ ] Default rendering tests with semantic HTML verification
- [ ] Accessibility tests with `axe` validation
- [ ] Systematic variant testing
- [ ] Interactive behavior testing (navigation, clicks)
- [ ] CSS class verification for all variants
- [ ] Edge cases covered (empty state, single item, etc.)

#### ✅ Documentation

- [ ] Clear component description with use case guidance
- [ ] Comprehensive examples with context
- [ ] Accessibility considerations documented
- [ ] Integration patterns shown (routing libraries)

#### ✅ Files

- [ ] All required files present
- [ ] Consistent naming across files
- [ ] Proper imports/exports
- [ ] Follows file organization principles

## Design Token Mapping

Map Figma values to design tokens:

| Figma Value                 | Design Token                            |
| --------------------------- | --------------------------------------- |
| Font: Inter Medium 12px     | `typography.body.sm.medium`             |
| Font: Inter Semi Bold 12px  | `typography.body.sm.strong`             |
| Font: Inter Medium 14px     | `typography.body.md.medium`             |
| Color: neutral/70 (#5d6c7e) | `colour.neutral.70`                     |
| Color: neutral/90 (#141f4d) | `colour.neutral.90`                     |
| Gap: 4px                    | `spacing.1` (4px)                       |
| Focus ring: #005bff         | `colour.global.interactions.focus-ring` |
| Border radius: 4px          | `radius.1` or `radius.system.form`      |

## Files to Create

### Core Files

1. `packages/components/src/patterns/Breadcrumb/index.ts`
2. `packages/components/src/patterns/Breadcrumb/Breadcrumb.tsx`
3. `packages/components/src/patterns/Breadcrumb/Breadcrumb.styles.ts`
4. `packages/components/src/patterns/Breadcrumb/Breadcrumb.stories.tsx`
5. `packages/components/src/patterns/Breadcrumb/Breadcrumb.test.tsx`
6. `packages/components/src/patterns/Breadcrumb/Breadcrumb.docs.mdx`

### Sub-component Files

7. `packages/components/src/patterns/Breadcrumb/components/BreadcrumbItem.tsx`
8. `packages/components/src/patterns/Breadcrumb/components/BreadcrumbSeparator.tsx`
9. `packages/components/src/patterns/Breadcrumb/components/BreadcrumbOverflow.tsx`

### Meta Files

10. `packages/components/src/patterns/Breadcrumb/meta/index.tsx`
11. `packages/components/src/patterns/Breadcrumb/meta/Thumbnail.tsx`

## Risk Assessment

- **Low risk change** - New pattern addition without modifying existing components
- **Potential side effects**: None, isolated new pattern
- **Rollback plan**: Simply remove the pattern directory and exports

## Implementation Notes

### Semantic HTML Structure

```html
<nav aria-label="Breadcrumb">
  <ol>
    <li><a href="/home">Home</a></li>
    <li aria-hidden="true">›</li>
    <li><a href="/products">Products</a></li>
    <li aria-hidden="true">›</li>
    <li aria-current="page">Product Details</li>
  </ol>
</nav>
```

### Accessibility Considerations

- Use `<nav>` with `aria-label="Breadcrumb"`
- Use ordered list (`<ol>`) for semantic hierarchy
- Mark current page with `aria-current="page"`
- Ensure separator icons are `aria-hidden="true"`
- Support keyboard navigation (tab through links)
- Maintain visible focus indicators

### Integration with Routing Libraries

Support custom element prop to work with:

- React Router: `<Link to="..." />`
- Next.js: `<NextLink href="..." />`
- Remix: `<RemixLink to="..." />`

Example:

```tsx
import { Link as RouterLink } from 'react-router-dom';

<IressBreadcrumb
  items={[
    { label: 'Home', href: '/', element: RouterLink },
    { label: 'Products', href: '/products', element: RouterLink },
    { label: 'Details' }, // Current page
  ]}
/>;
```

## Success Criteria

- ✅ Component matches Figma design specifications exactly
- ✅ All accessibility requirements met (WCAG 2.1 AA)
- ✅ Tests achieve 100% coverage and pass
- ✅ Storybook stories demonstrate all use cases
- ✅ Documentation is comprehensive and clear
- ✅ No TypeScript errors or warnings
- ✅ ESLint passes with no issues
- ✅ Component is reusable and flexible for various use cases

## Future Enhancements (Post-MVP)

- [ ] Overflow menu with popover showing collapsed items
- [ ] Responsive behavior (collapse on mobile)
- [ ] Custom separator support (not just chevron)
- [ ] Icon support in breadcrumb items
- [ ] Truncation of long breadcrumb labels
- [ ] Support for breadcrumb schema markup (JSON-LD)
