# SearchSelection

> Decision guide for choosing between Autocomplete, Select, DropdownMenu, InputPopover, and Popover.

- [Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/patterns-search-selection--docs)
- [Source](https://github.com/iress/design-system/tree/main/packages/components/src/patterns/SearchSelection)

Choosing between InputPopover, Autocomplete, Select, DropdownMenu, and Popover depends on whether users need to navigate to results, pick a form value, or trigger actions.

<StoryEmbed id="patterns-search-selection--decision-tree"/>

## Design

### Decision guide

| Criteria                  | Autocomplete               | DropdownMenu              | InputPopover + Menu        | Popover                   | Select                     |
| ------------------------- | -------------------------- | ------------------------- | -------------------------- | ------------------------- | -------------------------- |
| User types to filter      | Yes                        | No                        | Yes                        | No                        | Optional (async options)   |
| Result is navigation      | No (sets form value)       | Sometimes                 | Yes (links)                | N/A                       | No (sets form value)       |
| Freetext value allowed    | Yes                        | N/A                       | N/A                        | N/A                       | No (must pick an option)   |
| Triggered by              | Input focus / typing       | Button click              | Input focus / typing       | Button click              | Input click                |
| Custom result rendering   | No (label + meta only)     | Limited                   | Full control               | Full control              | No (label + meta only)     |
| Common use cases          | City input, tag input      | Actions, filters          | Site search, command palette | Custom content, previews | Country, status, category  |

### When to use each component

#### Autocomplete (`IressAutocomplete`)

Use Autocomplete when users type freetext and receive suggestions to **set a form value**. The input is not restricted to the suggestion list.

- **Address / city input**: User types and gets matching suggestions
- **Tag input**: Suggesting existing tags while allowing new ones
- **Form fields with large datasets**: When the option list is too large for a static dropdown

```tsx
import { IressAutocomplete, IressField } from '@iress-oss/ids-components';

<IressField label="Search clients">
  <IressAutocomplete
    placeholder="Type a name…"
    options={(query) => fetchClients(query)}
    noResultsText="No clients found"
    clearable
  />
</IressField>
```

**Autocomplete vs Select:** If the user can submit any text value (even one not in the list), use Autocomplete. If the value *must* be one of the options, use Select.

#### DropdownMenu (`IressDropdownMenu`)

Use DropdownMenu for a list of actions or filter options triggered by a button.

- **Row actions**: Edit, delete, duplicate on a table row
- **Context menus**: Right-click or overflow (...) menus
- **Toolbar actions**: Grouped actions behind a single button
- **Filter menus**: Selecting filter criteria from a predefined list

```tsx
import { IressDropdownMenu } from '@iress-oss/ids-components';

<IressDropdownMenu
  label="Actions"
  options={[
    { label: 'Edit', value: 'edit' },
    { label: 'Duplicate', value: 'duplicate' },
    { label: 'Delete', value: 'delete' },
  ]}
  onChange={(selected) => {
    if (selected.value === 'edit') handleEdit();
    if (selected.value === 'duplicate') handleDuplicate();
    if (selected.value === 'delete') handleDelete();
  }}
/>
```

#### InputPopover + Menu (search navigation)

Use InputPopover with a Menu when users type a query and **navigate to a result** rather than selecting a form value. This gives you full control over how results are rendered and supports real links with proper routing.

- **Site search**: Type to find pages, click to navigate
- **Command palette**: Type to find actions or pages
- **Entity lookup with navigation**: Search for a record and go to its detail page

```tsx
import { Link } from 'your-router';
import { IressInput, IressInputPopover, IressMenu, IressMenuItem } from '@iress-oss/ids-components';

<IressInputPopover
  activator={
    <IressInput
      type="search"
      placeholder="Search…"
      onChange={handleSearch}
      clearable
    />
  }
>
  <IressMenu>
    {results.map((result) => (
      <IressMenuItem key={result.url} element={Link} to={result.url}>
        {result.title}
      </IressMenuItem>
    ))}
  </IressMenu>
</IressInputPopover>
```

**Why not Autocomplete?** Autocomplete is designed for form values — it sets a value on selection. For search-and-navigate, you want real links (`<a>` or router `Link` elements) so that users can right-click → open in new tab, and screen readers announce results as links rather than listbox options.

#### Popover (`IressPopover`)

Use Popover for custom content triggered by a button that doesn't fit into the other categories. Popover gives you full control over what's rendered inside.

- **Rich previews**: Showing additional details or a summary on click
- **Custom forms**: A small inline form that doesn't warrant a modal
- **Composite content**: Anything that needs more than a simple list of options

```tsx
import { IressPopover, IressButton, IressStack, IressCheckbox } from '@iress-oss/ids-components';

<IressPopover
  activator={<IressButton icon="filter_list" mode="tertiary">Filters</IressButton>}
>
  <IressStack gap="sm">
    <IressCheckbox value="active">Active</IressCheckbox>
    <IressCheckbox value="archived">Archived</IressCheckbox>
  </IressStack>
</IressPopover>
```

#### Select (`IressSelect`)

Use Select when users must choose from a predefined set of valid options.

- **Form fields**: Country, status, category, role
- **Filters**: Where the filter values are a known set
- **Configuration**: Choosing from predefined settings

When the list is long, use an async `options` function to enable built-in search:

```tsx
import { IressSelect, IressField } from '@iress-oss/ids-components';

<IressField label="Country">
  <IressSelect
    options={(query) => fetchCountries(query)}
    placeholder="Select a country"
  />
</IressField>
```

### Quick reference

- **User types to set a form value with suggestions?** → Autocomplete
- **Button opens a list of actions or filters?** → DropdownMenu
- **User types to search and navigate to a page?** → InputPopover + Menu + MenuItem
- **Button opens custom content that doesn't fit the above?** → Popover
- **User must pick from a known list?** → Select (use async `options` function if large)