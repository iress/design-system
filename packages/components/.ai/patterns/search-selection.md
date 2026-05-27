# Search & selection
Choosing between Autocomplete, Select, Popover, and DropdownMenu depends on whether users need freetext input, must choose from a fixed set, or are triggering an action menu.## Which component should I use?

Answer the questions below to find the right component for your use case.

1. **Does the user type freetext to find or filter results?**
   - Yes → `IressAutocomplete`
2. **Must the user pick from a fixed set of options?**
   - Yes → `IressSelect`
3. **Is the dropdown triggered by a button (not an input)?**
   - Contains actions (edit, delete, etc.) → `IressDropdownMenu`
   - Contains content or a form → `IressPopover`

## Decision guide

| Criteria                  | Autocomplete               | Select                     | DropdownMenu              | Popover                   |
| ------------------------- | -------------------------- | -------------------------- | ------------------------- | ------------------------- |
| User types to filter      | Yes                        | Optional (searchable)      | No                        | No                        |
| Freetext value allowed    | Yes                        | No (must pick an option)   | N/A                       | N/A                       |
| Triggered by              | Input focus / typing       | Input click                | Button click              | Button click              |
| Async options             | Yes (function)             | Yes (function)             | No                        | N/A                       |
| Keyboard navigation       | Arrow keys + Enter         | Arrow keys + Enter         | Arrow keys + Enter        | Focus trap                |
| Common use cases          | Search, lookup, city input | Country, status, category  | Row actions, context menu | Filters, settings form    |

## When to use each component

### Autocomplete (`IressAutocomplete`)

Use Autocomplete when users type freetext and receive suggestions, but their input is not restricted to the suggestion list.

- **Search fields**: Global search, page search, entity lookup
- **Address / city input**: User types and gets matching suggestions
- **Tag input**: Suggesting existing tags while allowing new ones
- **Large datasets**: When the option list is too large for a dropdown (use an async `options` function)

```tsx
<IressField label="Search clients">
  <IressAutocomplete
    placeholder="Type a name…"
    options={(query) => fetchClients(query)}
    noResultsText="No clients found"
    clearable
  />
</IressField>
```

### Select (`IressSelect`)

Use Select when users must choose from a predefined set of valid options.

- **Form fields**: Country, status, category, role
- **Filters**: Where the filter values are a known set
- **Configuration**: Choosing from predefined settings

When the list is long, enable the built-in search by setting `searchable`:

```tsx
<IressField label="Country">
  <IressSelect
    options={countries}
    searchable
    placeholder="Select a country"
  />
</IressField>
```

**Autocomplete vs Select:** If the user can submit any text value (even one not in the list), use Autocomplete. If the value *must* be one of the options, use Select.

### DropdownMenu (`IressDropdownMenu`)

Use DropdownMenu for a list of actions triggered by a button.

- **Row actions**: Edit, delete, duplicate on a table row
- **Context menus**: Right-click or overflow (...) menus
- **Toolbar actions**: Grouped actions behind a single button

```tsx
<IressDropdownMenu
  activator={<IressButton icon="more_vert" mode="muted">Actions</IressButton>}
  items={[
    { label: 'Edit', icon: 'edit', onClick: handleEdit },
    { label: 'Duplicate', icon: 'content_copy', onClick: handleDuplicate },
    { label: 'Delete', icon: 'delete', onClick: handleDelete, status: 'danger' },
  ]}
/>
```

### Popover (`IressPopover`)

Use Popover for non-action content triggered by a button — forms, filters, rich content panels.

- **Filter panels**: A small form with checkboxes/selects that narrows results
- **Settings popovers**: Quick settings without navigating away
- **Rich previews**: Showing additional details on click

```tsx
<IressPopover
  activator={<IressButton icon="filter_list" mode="tertiary">Filters</IressButton>}
>
  <IressStack gap="sm">
    <IressCheckbox value="active">Active</IressCheckbox>
    <IressCheckbox value="archived">Archived</IressCheckbox>
  </IressStack>
</IressPopover>
```

## Quick reference

- **User types to search or look up data?** → Autocomplete
- **User must pick from a known list?** → Select (add `searchable` if >10 options)
- **Button opens a list of actions?** → DropdownMenu
- **Button opens a form or content panel?** → Popover
- **Need async/remote data in a search?** → Autocomplete with an `options` function
- **Need async/remote data in a select?** → Select with an `options` function
