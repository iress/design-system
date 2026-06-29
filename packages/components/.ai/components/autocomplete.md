# Autocomplete

> Provides a text input with suggestions that filter as the user types.

## Import

```tsx
import { IressAutocomplete } from '@iress-oss/ids-components';
```

- [Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-autocomplete--docs)
- [Source](https://github.com/iress/design-system/tree/main/packages/components/src/components/Autocomplete)
- [Report issue](https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=autocomplete&title=[Autocomplete]+Bug:+)
- [Request feature](https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=autocomplete,enhancement&title=[Autocomplete]+Feature:+)

Autocomplete allow for users to fill in their input by providing suggestions as they type.

```tsx
<IressAutocomplete
  options={[
    { label: 'Option 1' },
    { label: 'Option 2' },
    { label: 'Option 3' },
    { label: 'Option 4' },
    { label: 'Option 5' },
  ]}
  defaultValue="Option 1"
/>;
```

## Design

### When to use

- **Large option sets**: When the user needs to select from many possible values (e.g. country, city)
- **Known values with free text**: When suggestions help but the user can still type a custom value
- **Search fields**: When filtering results as the user types improves discovery

### When not to use

- **Small fixed lists** (< 10 items) — use a Select or RadioGroup instead
- **Strict selection required** — use Select which restricts input to available options
- **No suggestions available** — use a plain Input

### Do's and Don'ts

| ✅ Do | ❌ Don't |
|-------|----------|
| Provide clear `noResultsText` when no matches found | Leave the dropdown empty with no feedback |
| Use debounce for async options to reduce API calls | Fire API requests on every keystroke |
| Set appropriate `minSearchLength` for async options | Trigger searches on a single character for expensive APIs |
| Use `initialOptions` for recommended/recent items | Overload the dropdown with hundreds of unfiltered results |

### Content guidelines

- **Placeholder**: Use a hint like "Search by name…" to indicate search behaviour
- **No results text**: Provide actionable guidance (e.g. "No matches found. Try a different term.")
- **Options**: Keep labels concise; use `meta` for supplementary info

### Related patterns

- [Select](../components/select.md) — for strict selection from a list
- [Input](../components/input.md) — for free text without suggestions

## Develop

### Quick Start

```tsx
import { IressAutocomplete } from '@iress-oss/ids-components';

<IressAutocomplete />;
```

[View all props](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-autocomplete--docs#api-props)

### Usage

The `IressAutocomplete` element extends `IressInput` with additional functionality to provide suggestions to the user as they type.

There is no validation done between the suggestions and the input value. They are strictly suggestions to improve the user experience. If you would like to restrict the input to the suggestions, use `IressSelect` instead.

#### Uncontrolled

The `defaultValue` prop can be used to set the initial value of the input. The value will be managed by the component.

```tsx
<IressAutocomplete
  options={[
    { label: 'Option 1' },
    { label: 'Option 2' },
    { label: 'Option 3' },
    { label: 'Option 4' },
    { label: 'Option 5' },
  ]}
  defaultValue="Option 1"
/>;
```

#### Controlled

The `value` prop can be used to completely control the state of the component. Use the `onChange` and `onClear` props to sync your state with the component.

```tsx
import { IressAutocomplete } from '@iress-oss/ids-components';
import { useState } from 'react';

export function AutocompleteUsingState() {
  const [value, setValue] = useState('Option 1');

  return (
    <IressAutocomplete
      options={[
        { label: 'Option 1' },
        { label: 'Option 2' },
        { label: 'Option 3' },
        { label: 'Option 4' },
        { label: 'Option 5' },
      ]}
      onChange={(_e, newValue) => setValue(newValue ?? '')}
      onClear={() => setValue('')}
      value={value}
    />
  );
}
```

#### Providing suggestions

##### `options`

To use the suggestion functionality, you can provide an array of `LabelValueMeta[]` objects to the `options` prop.

**Note:** If `value` is provided on a suggestion item, it will be used (casted to a string) instead of the `label` key.

```tsx
<IressAutocomplete
  options={[
    { label: 'Option 1' },
    { label: 'Option 2' },
    { label: 'Option 3' },
    { label: 'Option 4' },
    { label: 'Option 5' },
  ]}
/>;
```

##### Asynchronous `options`

If you would like to render suggestions from the server, you can pass a function to the `options` prop. It accepts a string parameter and returns a promise that resolves to an array of `LabelValueMeta[]` objects.

```tsx
import { IressAutocomplete } from '@iress-oss/ids-components';

interface StarWarsCharacter {
  name: string;
  gender: string;
}

interface StarWarsCharacterApi {
  results: StarWarsCharacter[];
}

export function AutocompleteUsingAsync() {
  return (
    <IressAutocomplete
      placeholder='Search star wars characters, or type "error" to see the error text'
      options={async (query: string) => {
        if (query === 'error') {
          throw new Error('This is an error');
        }

        const data = await fetch(
          `https://swapi.py4e.com/api/people/?search=${query}`,
        ).then((response) => response.json() as Promise<StarWarsCharacterApi>);

        return data.results.map((character: StarWarsCharacter) => ({
          label: character.name,
          value: character.name,
          meta: character.gender,
        }));
      }}
      errorText="Something went wrong. Please try again."
    />
  );
}
```

##### Minimum search length for async options

When using asynchronous options, you can set a minimum number of characters required before triggering the search using the `minSearchLength` prop.

```tsx
import { IressAutocomplete } from '@iress-oss/ids-components';

interface StarWarsCharacter {
  name: string;
  gender: string;
}

interface StarWarsCharacterApi {
  results: StarWarsCharacter[];
}

export function AutocompleteUsingAsyncMinSearch() {
  return (
    <IressAutocomplete
      minSearchLength={3}
      options={async (query: string) => {
        if (query === 'error') {
          throw new Error('This is an error');
        }

        const data = await fetch(
          `https://swapi.py4e.com/api/people/?search=${query}`,
        ).then((response) => response.json() as Promise<StarWarsCharacterApi>);

        return data.results.map((character: StarWarsCharacter) => ({
          label: character.name,
          value: character.name,
          meta: character.gender,
        }));
      }}
      errorText="Something went wrong. Please try again."
    />
  );
}
```

##### `initialOptions`

If you want to provide initial options to the user, you can use the `initialOptions` prop. This is useful when you want to provide a list of options to the user before they start typing (eg. recommended search terms).

```tsx
<IressAutocomplete
  options={[
    { label: 'Option 1' },
    { label: 'Option 2' },
    { label: 'Option 3' },
    { label: 'Option 4' },
    { label: 'Option 5' },
  ]}
  initialOptions={[
    { label: 'Favourite option 1' },
    { label: 'Favourite option 2' },
    { label: 'Favourite option 3' },
  ]}
/>;
```

#### `autoSelect`

The `autoSelect` prop will automatically select the highlighted option when the user blurs the autocomplete. This is set to true by default, but can be switched off.

```tsx
<IressAutocomplete
  options={[
    { label: 'Option 1' },
    { label: 'Option 2' },
    { label: 'Option 3' },
    { label: 'Option 4' },
    { label: 'Option 5' },
  ]}
  autoSelect={false}
  placeholder="Should no longer auto-select when an item is highlighted"
/>;
```

#### Input props

Autocomplete extends `IressInput`, hence it has the same properties as `IressInput`.

It does have some defaults to help with user experience. `append` automatically has a search icon, and `clearable` is set to true by default.

```tsx
import {
  IressAutocomplete,
  IressButton,
  IressIcon,
  IressPanel,
  IressPopover,
} from '@iress-oss/ids-components';

export function AutocompleteInputProps() {
  return (
    <IressAutocomplete
      options={[
        { label: 'Option 1' },
        { label: 'Option 2' },
        { label: 'Option 3' },
        { label: 'Option 4' },
        { label: 'Option 5' },
      ]}
      append={
        <IressPopover
          activator={
            <IressButton mode="muted" mr="-spacing.3">
              <IressIcon name="cog" />
            </IressButton>
          }
          align="bottom-end"
          container={document.body}
        >
          <IressPanel>Some settings in here</IressPanel>
        </IressPopover>
      }
      prepend={<IressIcon name="search" />}
      width="12"
    />
  );
}
```

#### No results

If you would like to show a message when there are no results, you can use the `noResultsText` prop. It accepts any React node.

```tsx
<IressAutocomplete
  options={[
      { label: 'Option 1' },
      { label: 'Option 2' },
      { label: 'Option 3' },
      { label: 'Option 4' },
      { label: 'Option 5' },
    ]}
  placeholder="Type "no" to see the no results text"
  noResultsText={<IressPanel noBorder>No results found</IressPanel>}
/>
```

#### Popover props

Under the hood, autocomplete uses `IressInputPopover` to display the suggestions. It accepts `autoHighlight`, `align`, `className` and `displayMode`.

There are two additional props that autocomplete accepts to customise the popover: `append` and `prepend`.

```tsx
<IressAutocomplete
  options={[
    { label: 'Option 1' },
    { label: 'Option 2' },
    { label: 'Option 3' },
    { label: 'Option 4' },
    { label: 'Option 5' },
  ]}
  popoverProps={{
    append: (
      <>
        <IressDivider />
        <IressPanel noBorder>
          <IressButton>Add an option</IressButton>
        </IressPanel>
      </>
    ),
    container: document.body,
  }}
/>;
```

#### Debounce threshold

The `debounceThreshold` prop can be used to set the time in milliseconds to wait before making a request to the `options` function.

```tsx
<IressAutocomplete
  options={[
    { label: 'Option 1' },
    { label: 'Option 2' },
    { label: 'Option 3' },
    { label: 'Option 4' },
    { label: 'Option 5' },
  ]}
  debounceThreshold={0}
  placeholder="Instant search!"
/>;
```

#### Result limits

You can limit the maximum amount of search results displayed in the suggestions by setting the `limitDesktop` prop. This defaults to 12.

On smaller screens (< 768px), the number of options is further reduced by using the `limitMobile` prop, which defaults to 6.

```tsx
<IressAutocomplete
  options={[
    { label: 'Option 1' },
    { label: 'Option 2' },
    { label: 'Option 3' },
    { label: 'Option 4' },
    { label: 'Option 5' },
    { label: 'Option 6' },
    { label: 'Option 7' },
    { label: 'Option 8' },
    { label: 'Option 9' },
    { label: 'Option 10' },
    { label: 'Option 11' },
    { label: 'Option 12' },
    { label: 'Option 13' },
    { label: 'Option 14' },
    { label: 'Option 15' },
  ]}
  limitDesktop={6}
  limitMobile={3}
/>;
```

#### Read only

The `readOnly` prop can be set to `true` to prevent the user from changing the value of the autocomplete.

```tsx
<IressAutocomplete
  options={[
    { label: 'Option 1' },
    { label: 'Option 2' },
    { label: 'Option 3' },
    { label: 'Option 4' },
    { label: 'Option 5' },
  ]}
  defaultValue="Option 1"
  readOnly
/>;
```

### Testing

To help you effectively test the autocomplete component, we have provided a few tips based on the behaviour of the component and our own experience.

#### Partial query matching

The suggestions are filtered based on the input value. If the input value only matches a part of the option, the input value is highlighted by a `<b />` tag in each option.

```tsx
render(
  <IressAutocomplete
    options={[
      { label: 'Luke Skywalker', value: 'Luke Skywalker', meta: 'male' },
    ]}
  />,
);

const autocomplete = screen.getByRole('combobox');
await user.type(autocomplete, 'lu');

// Exact string match with a space to denote the highlighted value
const option = await screen.findByRole('option', {
  name: 'Lu ke Skywalker male',
});

// Using a regex to match the string
const option = await screen.findByRole('option', { name: /Skywalker/ });
```

#### Query for minimal characters

If you are testing if a specific option appears in the autocomplete that returns asynchronous `options`, it is recommended to use the shortest possible query to return the desired result.

```tsx
// DO: Use the shortest query to return the desired result
await user.type(autocomplete, 'lu');

// DON'T: Use a long query to return the desired result
await user.type(autocomplete, 'luke skywalker');
```

#### Use mocking when testing APIs

When testing the autocomplete component with asynchronous `options`, you should mock the API call to return a known set of results. We recommend using [Mock Service Worker](https://mswjs.io/).

```tsx
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer(
  http.get('https://swapi.py4e.com/api/people', () => {
    return HttpResponse.json([{ name: 'Luke Skywalker', gender: 'male' }]);
  }),
);

server.listen();
```

[View test roles/IDs](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-autocomplete--docs#testing)


#### Test selectors

| Part | Description | Recommended Query | Test ID |
|------|-------------|-------------------|---------|
| main | The root wrapper element (no semantic role) | No role-based query — use `getByTestId('autocomplete')` | `autocomplete` |
| input | The text input element | `getByRole('combobox')` for the input, or `getByLabelText('...')` when inside a Field | `autocomplete__input` |
| menu | The suggestions menu | `getByRole('listbox')` | `autocomplete__menu` |

---

### Storybook

Storybook provides an interactive playground for testing different prop combinations, more complex recipes, all prop details, and accessibility attributes.

[View in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-autocomplete--docs)

## Specifications

### Behaviour

| State | Behaviour |
|-------|-----------|
| Idle | Input is empty, no popover shown |
| Typing | Suggestions popover appears after first character (or `minSearchLength`) |
| Highlighted | Arrow keys highlight suggestions; focus stays on input (virtual focus) |
| Selected | Clicking or pressing Enter on a suggestion sets the input value and closes popover |
| Blurred with highlight | If `autoSelect` is true, highlighted option is selected on blur |
| No results | Shows `noResultsText` content if provided |

### Accessibility

**WCAG compliance:**

- **4.1.2 Name, Role, Value** — Uses `role="combobox"` with `aria-expanded` and `aria-activedescendant`
- **1.3.1 Info and Relationships** — Options use `role="option"` within a `role="listbox"`
- **2.1.1 Keyboard** — Full keyboard navigation via arrow keys, Enter, and Escape

**ARIA pattern:** [WAI combobox with list autocomplete and manual selection](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/)

**Keyboard interaction:**

| Key | Action |
|-----|--------|
| `↓` | Opens popover or moves highlight to next option |
| `↑` | Moves highlight to previous option; closes popover from first option |
| `Enter` | Selects highlighted option and closes popover |
| `Escape` | Closes the popover without selecting |
| `Tab` | Selects highlighted option (if any) and moves focus away |

### Edge cases

- **Async loading**: Shows a loading spinner while options are being fetched
- **Debounce**: Prevents excessive API calls with configurable `debounceThreshold`
- **Empty input with `initialOptions`**: Popover shows initial options on focus
- **Long option labels**: Text truncates within the popover option

---

### Storybook

Storybook provides an interactive playground for testing different prop combinations and viewing accessibility attributes.

[View in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-autocomplete--docs)