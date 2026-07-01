# TabSet

> Organises content into tabbed panels, showing one panel at a time.

## Import

```tsx
import { IressTabSet } from '@iress-oss/ids-components';
```

- [Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-tab-set--docs)
- [Source](https://github.com/iress/design-system/tree/main/packages/components/src/components/TabSet)
- [Report issue](https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=tab-set&title=[TabSet]+Bug:+)
- [Request feature](https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=tab-set,enhancement&title=[TabSet]+Feature:+)

## Props

> Required props are **bold**.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| append | `ReactNode` | — | Content rendered alongside the tablist in the tab bar row, but outside the tablist itself. Useful for placing action buttons (e.g. "Add tab") at the end of the tab bar. |
| children | `ReactNode` | — | Content to be displayed inside the IressTabs, usually multiple `IressTab`. |
| defaultSelected | `[FormControlValue](../../dist/types.d.ts)` | — | Set the selected tab for uncontrolled tabs. If the `IressTab` does not have a `value` prop, it will match by index. |
| layout | `top-center` , `top-left` , `top-right` | `top-left` | Layout options for the positioning of tabs. |
| onChange | `((event: [IressTabSetChangedEventDetail](../../dist/components/TabSet/TabSet.d.ts)) => void)` | — | Emitted when a tab changes. |
| panelStyle | `[IressCustomiseSlot](../../dist/interfaces.d.ts)` | — | Custom style for the panel (the area that contains the tab content). |
| selected | `[FormControlValue](../../dist/types.d.ts)` | — | Set the selected tab for controlled tabs. If the `IressTab` does not have a `value` prop, it will match by index. |
| tabHolderStyle | `[IressCustomiseSlot](../../dist/interfaces.d.ts)` | — | Custom style for the tab holder (the area that contains the tabs). |
| type | `primary` , `secondary` | `'primary'` | The type of the tabs, which determines their styling. - `primary`: The default tab style, which is more prominent and suitable for main navigation. - `secondary`: A more subdued tab style, suitable for secondary level of tabs (within expanders) |
| data-testid | `string` | — | The data-testid attribute is used to target elements in automated tests if no identifier is available. In some components it is propagated to child elements.  Notes: - Please use this prop sparingly and only when no other identifier is available, as per the guiding principles of Testing Library. - Only use this prop for your tests @see https://testing-library.com/docs/queries/bytestid |

📄 [Full type definition](../../dist/components/TabSet/TabSet.d.ts)

Also accepts all [styling props](../styling-props/overview.md) ([type definition](../../dist/interfaces.d.ts), [token values](../tokens/tokens-reference.md)).

### IressTab Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| data-testid | `string` | — | The data-testid attribute is used to target elements in automated tests if no identifier is available. In some components it is propagated to child elements.  Notes: - Please use this prop sparingly and only when no other identifier is available, as per the guiding principles of Testing Library. - Only use this prop for your tests @see https://testing-library.com/docs/queries/bytestid |
| active | `boolean` | — | Sets the active styling of the tab. |
| href | `string` | — | Contains a URL or a URL fragment that the hyperlink points to. If this property is set, an anchor tag will be rendered.  **Note:** This prop should be avoided when using `children`. |
| **label** | `ReactNode` | — | The label of this tab. |
| value | `[FormControlValue](../../dist/types.d.ts)` | — | You can provide your own value to allow you to control its active state when used in `IressTabSet`. |

📄 [Full type definition](../../dist/components/Tab/Tab.d.ts)

Tabs are used to display modular pieces of related data that do not need to be compared or accessed simultaneously.

```tsx
<IressTabSet>
  <IressTab label="Iress" href="https://iress.com" />
  <IressTab label="Google" href="https://google.com" />
</IressTabSet>;
```

## Design

### When to use

- **Organising related content**: Group related information into panels users can switch between
- **Reducing page length**: Hide secondary content behind tabs to keep the page scannable
- **Navigation within a section**: Control which content panel is visible without navigating to a new page

### When not to use

- **Sequential steps** — use a Stepper or Wizard pattern instead
- **Comparing content side by side** — tabs hide content; use a layout that shows both panels
- **Very few items** — if there are only two short sections, consider showing both inline

### Do's and Don'ts

| ✅ Do | ❌ Don't |
|-------|----------|
| Keep tab labels short (1–2 words) | Use long sentences as tab labels |
| Use tabs for content at the same level of hierarchy | Nest tabs within tabs |
| Ensure the default tab is the most relevant | Hide critical information in non-default tabs |
| Provide keyboard navigation between tabs | Rely solely on mouse interaction |

### Content guidelines

- **Labels**: Use sentence case, keep concise and descriptive
- **Panel content**: Each panel should be self-contained and not require content from other tabs
- **Tab count**: Aim for 2–7 tabs; more than 7 becomes difficult to scan

### Related patterns

- [Expander](../components/expander.md) — for progressive disclosure without navigation
- [SideNav](../patterns/side-nav.md) — for persistent section navigation in a sidebar
- [Menu](../components/menu.md) — for navigation link lists (non-tabbed)
- [Stack](../components/stack.md) — for stacking content vertically when tabs aren't needed

## Develop

### Quick Start

```tsx
import { IressTabSet, IressTab } from '@iress-oss/ids-components';

<IressTabSet>
  <IressTab label="First">Panel one</IressTab>
  <IressTab label="Second">Panel two</IressTab>
</IressTabSet>;
```

[View all props](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-tabset--docs#api-props)

### Usage

#### Navigation

You can use `IressTabSet` to create tab navigation to control an area of the page, or navigate between pages.

```tsx
<IressTabSet>
  <IressTab label="Iress" href="https://iress.com" />
  <IressTab label="Google" href="https://google.com" />
</IressTabSet>;
```

#### With children prop

Using the `children` prop will automatically inject the content as a tab panel when active, along with appropriate attributes for accessibility.

```tsx
<IressTabSet>
  <IressTab label="Address">Address information goes here</IressTab>
  <IressTab label="Employment">Employment information goes here</IressTab>
  <IressTab label="History">Medical history goes here</IressTab>
</IressTabSet>;
```

#### Default selected

Set a tab by default using the `defaultSelected` prop.

```tsx
<IressTabSet defaultSelected={1}>
  <IressTab label="Iress" href="https://iress.com" />
  <IressTab label="Google" href="https://google.com" />
</IressTabSet>;
```

#### Controlled

Use state to control the active tab by setting the `selected` property.

```tsx
import {
  IressButton,
  IressStack,
  IressTab,
  IressTabSet,
} from '@iress-oss/ids-components';
import { useState } from 'react';

export function TabsUsingState() {
  const [selected, setSelected] = useState<number>();

  return (
    <IressStack gap="md">
      <IressButton
        onClick={() => setSelected(selected === 2 ? 0 : 2)}
        alignSelf="start"
      >
        {selected === 2 ? `Back to first tab` : `Change to last tab`}
      </IressButton>
      <IressTabSet
        selected={selected}
        onChange={({ index }) => setSelected(index)}
      >
        <IressTab label="Address">Address information goes here</IressTab>
        <IressTab label="Employment">Employment information goes here</IressTab>
        <IressTab label="History">Medical history goes here</IressTab>
      </IressTabSet>
    </IressStack>
  );
}
```

#### Layout

`IressTabSet` controls the layout of the tab buttons. These can be aligned left (default), center, or right via the `layout` prop.

```tsx
import {
  IressPanel,
  IressStack,
  IressTab,
  IressTabSet,
  IressText,
} from '@iress-oss/ids-components';

export function TabSetLayout() {
  return (
    <IressStack gap="md">
      <IressPanel>
        <IressText element="h2">top-left</IressText>
        <IressTabSet layout="top-left">
          <IressTab label="Address">Address information goes here</IressTab>
          <IressTab label="Employment">
            Employment information goes here
          </IressTab>
          <IressTab label="History">Medical history goes here</IressTab>
        </IressTabSet>
      </IressPanel>
      <IressPanel>
        <IressText element="h2">top-center</IressText>
        <IressTabSet layout="top-center">
          <IressTab label="Address">Address information goes here</IressTab>
          <IressTab label="Employment">
            Employment information goes here
          </IressTab>
          <IressTab label="History">Medical history goes here</IressTab>
        </IressTabSet>
      </IressPanel>
      <IressPanel>
        <IressText element="h2">top-right</IressText>
        <IressTabSet layout="top-right">
          <IressTab label="Address">Address information goes here</IressTab>
          <IressTab label="Employment">
            Employment information goes here
          </IressTab>
          <IressTab label="History">Medical history goes here</IressTab>
        </IressTabSet>
      </IressPanel>
    </IressStack>
  );
}
```

#### Type

Use the `type` prop to control visual emphasis:

- `primary` (default): prominent active state with a raised indicator
- `secondary`: subdued style for nested or secondary tab groups

```tsx
<IressStack gap="md">
  <IressText element="h2">Primary</IressText>
  <IressTabSet defaultSelected={1} type="primary" />
  <IressExpander activator="Secondary">
    <IressTabSet defaultSelected={1} type="secondary" mt="-md" />
  </IressExpander>
</IressStack>;
```

#### Lazy Loading

Tabs can be lazy loaded via state, allowing you to add/remove tabs as needed.

```tsx
import {
  IressButton,
  IressStack,
  IressTab,
  IressTabSet,
} from '@iress-oss/ids-components';
import { useState } from 'react';

export function TabsLazyLoading() {
  const [loadTabs, setLoadTabs] = useState<boolean>();

  return (
    <IressStack gap="md">
      <IressButton onClick={() => setLoadTabs(!loadTabs)} alignSelf="start">
        Toggle tabs
      </IressButton>
      <IressTabSet>
        {loadTabs && (
          <>
            <IressTab label="Address">Address information goes here</IressTab>
            <IressTab label="Employment">
              Employment information goes here
            </IressTab>
            <IressTab label="Medical history">
              Medical history goes here
            </IressTab>
          </>
        )}
      </IressTabSet>
    </IressStack>
  );
}
```

#### Badges and icons

Add rich content into the `label` of `IressTab` to customise tabs with badges or icons.

```tsx
<IressTabSet>
  <IressTab
    label={
      <>
        Address <IressPill ml="xs">3</IressPill>
      </>
    }
  >
    Address information goes here{' '}
  </IressTab>
  <IressTab
    label={
      <IressInline gap="sm" verticalAlign="middle" noWrap>
        <IressIcon name="user" /> Employment
      </IressInline>
    }
  >
    Employment information goes here
  </IressTab>
  <IressTab label="History">Medical history goes here</IressTab>
</IressTabSet>;
```

### Testing

Query tabs by their role. The tab's accessible name comes from the `label` prop:

```tsx
const tab = screen.getByRole('tab', { name: 'Details' });
await user.click(tab);
const panel = screen.getByRole('tabpanel');
```

[View test IDs](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-tabset--docs#testing)


#### Test selectors

| Part | Description | Recommended Query | Test ID |
|------|-------------|-------------------|---------|
| main | The root wrapper element (tablist is a nested child) | — | `tabset` |
| tablist | The tab list container (nested inside root) | `getByRole('tablist')` | `—` |
| tab | An individual tab item (rendered by IressTab, receives its own data-testid) | `getByRole('tab', { name: '...' })` | `<tab-testid>` |
| panel | The active tab panel | `getByRole('tabpanel')` | `tabset__panel` |

---

### Storybook

[View in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-tabset--docs)

## Specifications

### Behaviour

| State | Behaviour |
|-------|-----------|
| Default | First tab is active unless `defaultSelected` is set |
| Active | Selected tab is visually highlighted, its panel is rendered |
| Controlled | Active tab is driven by external state via `selected` prop |
| Lazy loaded | Tabs are rendered dynamically as needed |

### Accessibility

**WCAG compliance:**

- **1.3.1 Info and Relationships** — Uses `role="tablist"`, `role="tab"`, and `role="tabpanel"` semantics
- **2.1.1 Keyboard** — All tabs are operable via keyboard
- **4.1.2 Name, Role, Value** — `aria-selected` indicates active tab; `aria-controls` links tab to panel

**Keyboard interaction:**

| Key | Action |
|-----|--------|
| `Arrow Left` / `Arrow Right` | Move focus between tabs |
| `Enter` / `Space` | Activate the focused tab |
| `Home` | Move focus to first tab |
| `End` | Move focus to last tab |
| `Tab` | Move focus into the active panel |

### Edge cases

- **Single tab**: Renders without tab navigation controls
- **Dynamic tabs**: Adding/removing tabs updates the tablist; if the active tab is removed, the first remaining tab becomes active
- **Overflow**: When tabs exceed container width, they may scroll or wrap depending on container constraints