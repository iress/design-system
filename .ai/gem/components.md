# IDS Components

> 51 docs

---

# Alert

> Communicates important information inline with page content, such as validation errors, warnings, or status messages.

## Import

```tsx
import { IressAlert } from '@iress-oss/ids-components';
```

- [Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-alert--docs)
- [Figma](https://www.figma.com/design/youFqYT4CgpKxfLJQv80hf/WIP-Iress-Design-System-V6?node-id=7305-31616)
- [Source](https://github.com/iress/design-system/tree/main/packages/components/src/components/Alert)
- [Report issue](https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=alert&title=[Alert]+Bug:+)
- [Request feature](https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=alert,enhancement&title=[Alert]+Feature:+)

## Props

> Required props are **bold**.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| actions | `[IressAlertButtonProps](../../dist/components/Alert/Alert.d.ts)[]` | — | Actions to display in the alert. These will be rendered as buttons with opinionated styling. If you want to use custom buttons, use the `footer` prop instead. |
| children | `ReactNode` | — | Contents of the alert. Is automatically wrapped in `<IressText />` and will inherit its styling. |
| defaultClosed | `boolean` | — | If true, the alert will be dismissed and unrendered from the DOM. Use for uncontrolled dismissal of the alert, where the component manages its own dismissed state internally. |
| closed | `boolean` | — | If true, the alert will be dismissed and unrendered from the DOM. Use for controlled dismissal of the alert, where the parent component manages the dismissed state and passes it down via this prop. |
| closeLabel | `string` | — | Optional override for the default close button label "Close". |
| footer | `ReactNode` | — | Buttons and controls for the alert. @deprecated Use `actions` instead for buttons with opinionated styling. If you need other footer content, use the `children` prop instead. |
| heading | `ReactNode` | — | Text for alert heading. If a string, it will use a heading with level 2. |
| icon | [MaterialSymbol](https://fonts.google.com/icons?icon.set=Material+Symbols) | — | Icon to display in the alert. If set to `false`, no icon will be displayed. If not provided, the icon will be determined by the `status` prop. |
| multiLine | `boolean` | `false` | If true, the alert will have a layout that supports longer content, with increased spacing and the icon aligned to the top of the alert instead of centered. Should be used when the content of the alert is more than a couple of sentences. |
| onClose | `((e?: MouseEvent<HTMLButtonElement, MouseEvent>) => void)` | — | Emitted when the alert is dismissed by the user via the close button. |
| status | `danger` , `info` , `neutral`, `success` , `warning`  | `info` | Alert type - danger, info, success or warning. |
| variant | `full-width`, `sidebar`  | — | Variants of the alert, allowing it to be styled differently based on where its used in the application. - Sidebar: The icon will be aligned to the heading, and the text will appear below the icon. - Full-width: The border will be removed, except for the bottom border. |
| data-testid | `string` | — | The data-testid attribute is used to target elements in automated tests if no identifier is available. In some components it is propagated to child elements.  Notes: - Please use this prop sparingly and only when no other identifier is available, as per the guiding principles of Testing Library. - Only use this prop for your tests @see https://testing-library.com/docs/queries/bytestid |

📄 [Full type definition](../../dist/components/Alert/Alert.d.ts)

Also accepts all [styling props](../styling-props/overview.md) ([type definition](../../dist/interfaces.d.ts), [token values](../tokens/tokens-reference.md)).

An alert displays a short, important message in a way that attracts the user's attention without interrupting the user's task.

```tsx
<IressAlert status="info" heading="Alert heading">
  This is a simple info alert
</IressAlert>;
```

## Design

### When to use

- **Form validation**: Display errors or warnings near the relevant form section
- **Page-level status**: Inform users about the state of the current page (e.g. "This record is read-only")
- **Informational banners**: Provide tips, guidance, or announcements inline with content
- **Persistent warnings**: Messages that should remain visible until the condition changes

### When not to use

- **Transient confirmations** of completed actions (e.g. "Saved") — use a Toaster instead
- **Tasks requiring user decisions** before continuing — use a Modal instead

For a full comparison of feedback components, see the [Feedback pattern](../patterns/feedback.md).

### Do's and Don'ts

| ✅ Do | ❌ Don't |
|-------|----------|
| Keep alert messages concise and actionable | Use alerts for success messages that don't need to persist |
| Use the appropriate status for the severity | Stack multiple alerts for the same issue |
| Provide a clear next step when possible | Use alerts as a primary navigation element |
| Use `multiLine` for messages longer than one sentence | Hide critical information inside a dismissable alert |

### Content guidelines

- **Heading**: Use sentence case, keep under 60 characters
- **Body**: Explain what happened and what the user can do about it
- **Actions**: Use clear verb labels (e.g. "Retry", "Learn more", not "OK" or "Click here")
- **Status mapping**:
  - `danger` — errors that block the user
  - `warning` — issues that need attention but don't block
  - `success` — confirmation of a completed action (rare, prefer Toaster)
  - `info` — neutral guidance or tips
  - `neutral` — supplementary information with no urgency

### Related patterns

- [Feedback](../patterns/feedback.md) — decision tree for choosing the right feedback component
- [Toaster](../components/toaster.md) — for transient confirmations
- [Modal](../components/modal.md) — for blocking decisions
- [Validation Message](../components/validation-message.md) — for inline field-level errors

## Develop

### Quick Start

```tsx
import { IressAlert } from '@iress-oss/ids-components';

<IressAlert status="info">This is a simple info alert</IressAlert>;
```

[View all props](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-alert--docs#api-props)

### Status

The alert offers five statuses that set a distinctive colour and icon via the `status` prop.

- `danger` — errors that prevent the user from continuing (e.g. failed submission)
- `warning` — issues that need attention but don't block (e.g. expiring session)
- `success` — rare in alerts; prefer Toaster for transient success messages
- `info` — default; guidance, tips, or neutral information
- `neutral` — supplementary context with no urgency

```tsx
import { IressAlert, IressStack } from '@iress-oss/ids-components';

export function AlertStatus() {
  return (
    <IressStack gap="md">
      <IressAlert status="danger">
        This is a simple danger alert. It is used for errors and malfunctions
        that must be resolved before moving forward, such as a summary of errors
        to correct in a Form.
      </IressAlert>
      <IressAlert status="info">
        This is a simple info alert. It is used to provide context around a
        situation, such as rules around creating a compliant password, or a link
        to feature documentation or onboarding tips.
      </IressAlert>
      <IressAlert status="success">
        This is a simple success alert. It is used to communicate that an action
        has been successfully completed, such as saving changes in a Form.
      </IressAlert>
      <IressAlert status="warning">
        This is a simple warning alert. It is used for a message requiring
        attention but not resolution in order to continue, such as noting data
        is not current or your password is about to expire.
      </IressAlert>
      <IressAlert status="neutral">
        This is a simple neutral alert. It is normally used for general
        information that does not fit into the other categories, such as a note
        about requesting cookie consent, advertising a new feature or an
        upcoming change.
      </IressAlert>
    </IressStack>
  );
}
```

### Heading

An alert can display a heading via the `heading` prop. Accepts a string (renders `<h2>`) or a React element.

```tsx
<IressAlert status="info" heading="Alert heading">
  This is a simple info alert
</IressAlert>;
```

### Actions

The `actions` prop displays call-to-action buttons within the alert.

```tsx
import { IressAlert, IressStack } from '@iress-oss/ids-components';

export function AlertFooter() {
  return (
    <IressStack gap="md">
      <IressAlert
        status="danger"
        heading="Alert heading"
        onClose={() => console.log('dismissed')}
        actions={[
          { children: 'Action', mode: 'secondary' },
          { children: 'Action', mode: 'tertiary' },
        ]}
      >
        Are you sure you want to proceed with this action?
      </IressAlert>
      <IressAlert
        status="info"
        heading="Alert heading"
        actions={[{ children: 'Learn more' }]}
      >
        A new version is available.
      </IressAlert>
    </IressStack>
  );
}
```

### Icon

The `icon` prop customises the icon. Set to `false` to remove it entirely.

```tsx
<IressAlert heading="Some information" multiLine icon={false}>
  This is an alert without an icon
</IressAlert>;
```

### Multi-line

Set `multiLine` to `true` for longer messages that span multiple lines.

```tsx
import { IressAlert, IressStack } from '@iress-oss/ids-components';

export function AlertMultiLine() {
  return (
    <IressStack gap="md">
      <IressAlert status="danger" multiLine heading="Error">
        A detailed error message that spans multiple lines to provide more
        context about what went wrong and how to fix it.
      </IressAlert>
      <IressAlert status="info" multiLine heading="Information">
        Here is some detailed information that requires more space to explain
        the context fully.
      </IressAlert>
      <IressAlert status="success" multiLine heading="Success">
        Your operation completed successfully. Here are the details of what was
        processed.
      </IressAlert>
      <IressAlert status="warning" multiLine heading="Warning">
        Please be aware of the following important details before proceeding
        with this action.
      </IressAlert>
      <IressAlert status="neutral" multiLine heading="Note">
        This is a neutral multi-line alert with additional context for the user.
      </IressAlert>
    </IressStack>
  );
}
```

### Variants

The `variant` prop adjusts the alert layout:

- `sidebar` — for informational messages alongside longer forms
- `full-width` — for site-wide banners visible to all users

```tsx
import { IressAlert, IressStack } from '@iress-oss/ids-components';

export function AlertVariant() {
  return (
    <IressStack gap="md">
      <IressAlert variant="sidebar" heading="Sidebar alert">
        This alert is displayed in the sidebar layout.
      </IressAlert>
      <IressAlert variant="full-width" heading="Full-width alert">
        This alert is displayed in the full-width layout.
      </IressAlert>
    </IressStack>
  );
}
```

### Dismissable

Set the `onClose` prop to show a close button allowing users to dismiss the alert.

```tsx
import { IressAlert, IressStack } from '@iress-oss/ids-components';

export function AlertDismissable() {
  return (
    <IressStack gap="md">
      <IressAlert status="danger" onClose={() => console.log('dismissed')}>
        This danger alert can be dismissed.
      </IressAlert>
      <IressAlert status="info" onClose={() => console.log('dismissed')}>
        This info alert can be dismissed.
      </IressAlert>
      <IressAlert status="success" onClose={() => console.log('dismissed')}>
        This success alert can be dismissed.
      </IressAlert>
      <IressAlert status="warning" onClose={() => console.log('dismissed')}>
        This warning alert can be dismissed.
      </IressAlert>
      <IressAlert status="neutral" onClose={() => console.log('dismissed')}>
        This neutral alert can be dismissed.
      </IressAlert>
    </IressStack>
  );
}
```

### Testing

The component automatically sets `role="alert"` (assertive) for danger/warning/success, and `role="status"` (polite) for info/neutral. Query accordingly:

```tsx
// danger, warning, or success alerts
const alert = screen.getByRole('alert');

// info or neutral alerts
const alert = screen.getByRole('status');
```

Override with the `role` prop if the default doesn't fit your use case:

```tsx
<IressAlert status="info" role="alert">
  Urgent info that needs immediate attention
</IressAlert>;
```

For test roles, IDs and sub-parts, see the Testing tab in Storybook:

[View test roles/IDs](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-alert--docs#testing)


#### Test selectors

| Part | Description | Recommended Query | Test ID |
|------|-------------|-------------------|---------|
| main | The root element of the alert | `getByRole('status')` if the alert has a status of "info" or "neutral", otherwise `getByRole('alert')` | `alert` |
| heading | The alert heading container | `getByRole('heading')` | `alert__heading` |
| footer | The alert footer/actions container | `getByText('...')` | `alert__footer` |

---

### Storybook

Storybook provides an interactive playground for testing different prop combinations, more complex recipes, all prop details, and accessibility attributes.

[View in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-alert--docs)

## Specifications

### Behaviour

| State | Behaviour |
|-------|-----------|
| Default | Alert is visible inline with content. Does not auto-dismiss. |
| Dismissed | Alert is removed from the DOM after `onClose` is called. |
| Multi-line | Content wraps, icon aligns to top of first line. |
| Full-width variant | Spans the full width of its container, typically at page top. |
| Sidebar variant | Narrower width, typically placed alongside form content. |

### Accessibility

**WCAG compliance:**

- **1.4.1 Use of Color** — Status is communicated via icon + text, not colour alone
- **4.1.2 Name, Role, Value** — Uses `role="alert"` or `role="status"` based on severity
- **1.3.1 Info and Relationships** — Heading uses semantic heading element when provided

**ARIA roles:**

| Status | Role | Live region behaviour |
|--------|------|----------------------|
| `danger` | `alert` | Assertive — interrupts screen reader immediately |
| `warning` | `alert` | Assertive — interrupts screen reader immediately |
| `success` | `alert` | Assertive — interrupts screen reader immediately |
| `info` | `status` | Polite — announced at next pause |
| `neutral` | `status` | Polite — announced at next pause |

**Keyboard interaction:**

| Key | Action |
|-----|--------|
| `Tab` | Moves focus to the next focusable element (dismiss button or action buttons) |
| `Enter` / `Space` | Activates the focused button (dismiss or action) |

### Edge cases

- **No children**: Alert renders with icon and optional heading only
- **Very long content**: Use `multiLine` to prevent layout overflow
- **Multiple alerts**: Stack vertically using `IressStack` — avoid more than 3 visible simultaneously
- **Dynamic alerts**: Alerts rendered after page load are announced by screen readers via the live region role
- **Dismissed then re-shown**: Re-render the component — the live region will announce it again

---

### Storybook

Storybook provides an interactive playground for testing different prop combinations and viewing accessibility attributes. Use the "Testing" tab to find test roles, IDs, and sub-parts for querying in automated tests.

[View in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-alert--docs)

---

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

## Props

> Required props are **bold**.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| alwaysShowOnFocus | `boolean` | — | Always shown on focus, even if the user has not interacted with the input. |
| append | `ReactNode` | `<IressIcon name="search" />` | Append content. |
| autoSelect | `boolean` | `true` | If true, the selected option becomes the value of the input when the autocomplete loses focus. |
| clearable | `boolean` | `true` | If `true`, then user can clear the value of the input. |
| errorText | `ReactNode` | `( <IressAlert status="danger" mb="none" borderRadius="radius.system.form"> An unknown error occurred. Please contact support if the error persists. </IressAlert> )` | Text to be displayed when the options function errors out. It is not used when the options are provided as an array. |
| noResultsText | `ReactNode` | — | Text to be displayed when no results are found. |
| onChange | `((e?: SyntheticEvent<HTMLInputElement, Event>, value?: string, option?: [LabelValueMeta](../../dist/interfaces.d.ts)<[FormControlValue](../../dist/types.d.ts)> , undefined) => void) | undefined` | — | Emitted when the user changes the input. The second and third arguments are only available when the options were selected from the `options` prop. |
| popoverProps | `[IressAutocompletePopoverProps](../../dist/components/Autocomplete/Autocomplete.d.ts)` | `{}` | Customise the IressInputPopover props for your needs. |
| actions | `Omit<[IressButtonProps](../../dist/components/Button/Button.d.ts), "status" | "mode">[]` | — | Actions to display in the input field, rendered inside the input on the right. These will be rendered with opinionated styling. If you want to use custom buttons or controls, use the `append` prop instead. |
| width | `any` | — | The width of the input. |
| defaultValue | `string` | — | The value of the input. Can be a string or a number. Use for uncontrolled inputs. |
| data-testid | `string` | — | The data-testid attribute is used to target elements in automated tests if no identifier is available. In some components it is propagated to child elements.  Notes: - Please use this prop sparingly and only when no other identifier is available, as per the guiding principles of Testing Library. - Only use this prop for your tests @see https://testing-library.com/docs/queries/bytestid |
| variant | `search` | — | The variant of the input, which will apply different styles to the input. The `search` variant is designed for search inputs and will have a different style for the clear button and loading spinner. |
| inline | `boolean` | — | Make prepend/append element closer to the input content. |
| readOnly | `[FormControlReadOnly](../../dist/types.d.ts)` | — | Renders the input as read-only. Use `'locked'` when the value is read-only because of permissions. |
| value | `string` | — | The value of the input. Can be a string or a number. Use for controlled inputs. |
| rows | `undefined` | — | Number of rows in the `textarea` (when set the component renders a textarea element) |
| loading | `boolean, string ` | — | The loading states of the input field. If provided a string, will use that text as the loading message. |
| prepend | `ReactNode` | — | Content to prepended to the input field, usually an icon. |
| alignRight | `boolean` | `false` | Set input content align to right, useful for numeric inputs. |
| formatter | `((value?: string) => string | number)` | — | Bring your own formatter that will be used to format the value when the input is not focused, allowing you to display the value in a different format. e.g. User type in value="dsf 987kkk123" => result after formatter: $987,123 (string) |
| onClear | `((e: ChangeEvent<HTMLInputElement, Element>) => void)` | — | Emitted when the input is manually cleared. |
| debounceThreshold | `number` | `500` | Time in milliseconds to wait for before performing result search. Only applies to searchable options (function). |
| initialOptions | `[LabelValueMeta](../../dist/interfaces.d.ts)<[FormControlValue](../../dist/types.d.ts)>[]` | — | Initial options data set, shown when the input is empty. |
| minSearchLength | `number` | `1` | Minimum number of characters required before triggering async search. Only applies to searchable options (function). Below this threshold, no search will be triggered and no loading state will be shown. |
| **options** | `[LabelValueMeta](../../dist/interfaces.d.ts)<[FormControlValue](../../dist/types.d.ts)>[] , ((query: string) => Promise<[LabelValueMeta](../../dist/interfaces.d.ts)<[FormControlValue](../../dist/types.d.ts)>[]>)` | — | Options data set, shown when the input is not empty. |
| limitMobile | `number` | `6` | Maximum number of results displayed on mobile screen sizes (< 768). |
| limitDesktop | `number` | `12` | Maximum number of results displayed on larger screen sizes (>= 768). |

📄 [Full type definition](../../dist/components/Autocomplete/Autocomplete.d.ts)

Also accepts all [styling props](../styling-props/overview.md) ([type definition](../../dist/interfaces.d.ts), [token values](../tokens/tokens-reference.md)).

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

## Recipes

### Search Table

```tsx
import {
  IressInput,
  IressStack,
  IressTable,
  useAutocompleteSearch,
} from '@iress-oss/ids-components';
import { useMemo, useState } from 'react';

const ALL_ROWS = [...Array(5).keys()].map((number) => ({
  label: `Person ${number + 1}`,
  gender: number % 2 ? 'Female' : 'Male',
}));

export const AutocompleteSearchTable = () => {
  const [query, setQuery] = useState('');

  const { debouncedQuery, loading, results } = useAutocompleteSearch({
    initialOptions: ALL_ROWS,
    options: ALL_ROWS,
    query,
  });

  const caption = useMemo(() => {
    if (debouncedQuery && !loading) {
      return `Results matching ${debouncedQuery}`;
    }

    return loading ? 'Searching...' : '';
  }, [debouncedQuery, loading]);

  const columns = useMemo(() => {
    const labelKey = debouncedQuery ? 'formattedLabel' : 'label';
    return [
      { key: labelKey, label: 'Name' },
      { key: 'gender', label: 'Gender' },
    ];
  }, [debouncedQuery]);

  return (
    <IressStack gap="md">
      <IressInput
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by name"
      />
      <IressTable
        caption={caption}
        columns={columns}
        rows={loading ? [] : results}
        empty={loading ? 'Loading...' : 'No results found'}
        scope="col"
      />
    </IressStack>
  );
};
```


---

# ButtonGroup

> Groups related buttons together with consistent spacing and alignment.

## Import

```tsx
import { IressButtonGroup } from '@iress-oss/ids-components';
```

- [Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-button-group--docs)
- [Source](https://github.com/iress/design-system/tree/main/packages/components/src/components/ButtonGroup)
- [Report issue](https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=button-group&title=[ButtonGroup]+Bug:+)
- [Request feature](https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=button-group,enhancement&title=[ButtonGroup]+Feature:+)

## Props

> Required props are **bold**.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | `ReactNode` | — | Content of the button group, usually multiple `IressButton`. |
| defaultSelected | `[ControlledValue](../../dist/hooks/useControlledState.d.ts)<T, TMultiple>` | — | Initially selected value, use for uncontrolled components. |
| hiddenLabel | `boolean` | — | Hides the label if set; label will still be read out by screen readers. |
| **label** | `ReactNode` | — | Sets the label text for the button group. If passed an element, it will render the element with an id, to ensure its connection to the button group. |
| multiple | `boolean` | — | Allows multiple buttons to be selected. |
| onChange | `((newValue?: [ControlledValue](../../dist/hooks/useControlledState.d.ts)<T, TMultiple>) => void)` | — | Called when a user activates one of its children buttons. |
| selected | `[ControlledValue](../../dist/hooks/useControlledState.d.ts)<T, TMultiple>` | — | Selected value, use for controlled components. |
| data-testid | `string` | — | The data-testid attribute is used to target elements in automated tests if no identifier is available. In some components it is propagated to child elements.  Notes: - Please use this prop sparingly and only when no other identifier is available, as per the guiding principles of Testing Library. - Only use this prop for your tests @see https://testing-library.com/docs/queries/bytestid |

📄 [Full type definition](../../dist/components/ButtonGroup/ButtonGroup.d.ts)

Also accepts all [styling props](../styling-props/overview.md) ([type definition](../../dist/interfaces.d.ts), [token values](../tokens/tokens-reference.md)).

ButtonGroup allows users to switch between two or more possible states. ButtonGroups are only used for actions that occur immediately after the user "flips the switch".

```tsx
<IressButtonGroup label="Button group">
  <IressButton>Option 1</IressButton>
  <IressButton>Option 2</IressButton>
  <IressButton>Option 3</IressButton>
  <IressButton>Option 4</IressButton>
</IressButtonGroup>;
```

## Design

### When to use

- **Toggle actions**: Switch between two or more states that take effect immediately
- **View switching**: Toggle between list/grid views, or between different data representations
- **Segmented controls**: Present a compact set of mutually exclusive choices

### When not to use

- **Navigation** — use tabs or a menu instead
- **Form selections** — use [RadioGroup](../components/radio-group.md) for selecting from options in a form
- **Independent toggles** — use [Toggle](../components/toggle.md) for on/off switches

### Content guidelines

- **Label**: Always provide a `label` describing what the group represents
- Use short, parallel button labels (e.g. "Day", "Week", "Month")
- Keep labels to 1–2 words where possible

### Related patterns

- [RadioGroup](../components/radio-group.md) — for form-based single selection
- [Toggle](../components/toggle.md) — for binary on/off states

## Develop

### Quick Start

```tsx
import { IressButtonGroup, IressButton } from '@iress-oss/ids-components';

<IressButtonGroup label="Options">
  <IressButton>Option A</IressButton>
  <IressButton>Option B</IressButton>
</IressButtonGroup>;
```

[View all props](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-buttongroup--docs#api-props)

### Usage

Button Group requires some `label` text to describe what the group of buttons represent. The `label` text can be visually hidden (but still read by screenreaders) using the `hiddenLabel` prop.

The `children` prop should contain multiple `IressButton` components.

You can use the `onChange` prop to watch when a button is clicked.

**Note:**

- The `options` props, originally used to map a set of strings to `IressButton`, has been deprecated. Instead, you can use array.map to map the options to `IressButton` in your own application.
- The `mode` prop on `IressButton` is not supported when used inside an `IressButtonGroup`.

```tsx
<IressButtonGroup label="Button group">
  <IressButton>Option 1</IressButton>
  <IressButton>Option 2</IressButton>
  <IressButton>Option 3</IressButton>
  <IressButton>Option 4</IressButton>
</IressButtonGroup>;
```

#### Rich buttons

By passing the buttons as children you have more control over the display of the button allowing you to use icons or tooltips.

**Note:** In this case, please set the `value` prop on the `IressButton` component to ensure the correct value is used when the button is clicked.

```tsx
<IressButtonGroup label="Text alignment">
  <IressTooltip tooltipText="Left">
    <IressButton value="left">
      <IressIcon name="align-left" screenreaderText="Left" />
    </IressButton>
  </IressTooltip>
  <IressTooltip tooltipText="Center">
    <IressButton value="center">
      <IressIcon name="align-center" screenreaderText="Center" />
    </IressButton>
  </IressTooltip>
  <IressTooltip tooltipText="Right">
    <IressButton value="right">
      <IressIcon name="align-right" screenreaderText="Right" />
    </IressButton>
  </IressTooltip>
  <IressDivider vertical mx="xs" />
  <IressTooltip tooltipText="Justify">
    <IressButton value="justify">
      <IressIcon name="align-justify" screenreaderText="Justify" />
    </IressButton>
  </IressTooltip>
</IressButtonGroup>;
```

#### Multi-select

By default, only one button in the group can be selected at a time. By setting the `multiple` prop, multiple buttons can be selected.

```tsx
<IressButtonGroup multiple label="Multiple options can be selected">
  <IressButton>Option 1</IressButton>
  <IressButton>Option 2</IressButton>
  <IressButton>Option 3</IressButton>
  <IressButton>Option 4</IressButton>
</IressButtonGroup>;
```

#### Pre-selecting buttons

Buttons within the group can be pre-selected using the `defaultSelected` prop (for uncontrolled components), or the `selected` prop if you are planning to control the state yourself.

If the button group is in its default single select mode, these props expects a string that matches the text of one of the buttons, or the `value` prop of the button if it has been set.

In multi-select mode, these props expects an array of matching strings.

```tsx
<IressButtonGroup
  defaultSelected="Option 2"
  label="Selected option for single select"
>
  <IressButton>Option 1</IressButton>
  <IressButton>Option 2</IressButton>
  <IressButton>Option 3</IressButton>
  <IressButton>Option 4</IressButton>
</IressButtonGroup>;
```
```tsx
<IressButtonGroup
  multiple
  defaultSelected={['Option 2', 'Option 4']}
  label="Selected option for multi-select"
>
  <IressButton>Option 1</IressButton>
  <IressButton>Option 2</IressButton>
  <IressButton>Option 3</IressButton>
  <IressButton>Option 4</IressButton>
</IressButtonGroup>;
```

#### `onChange` event

The Button Group emits an event when any of the selected buttons change. The event detail (`ButtonGroupChange`) consist of a string or an array of strings (depending on if it's in single or multi select mode) that represents the selected button(s).

```tsx
import {
  IressButton,
  IressButtonGroup,
  IressToasterProvider,
  useToaster,
} from '@iress-oss/ids-components';

function ButtonGroupWithToaster() {
  const { success } = useToaster();

  return (
    <IressButtonGroup
      label="Trigger toasts by selecting an option below"
      onChange={(selected) => {
        success({
          content: `Selected: ${selected ? String(selected) : 'none'}`,
        });
      }}
    >
      <IressButton>Option 1</IressButton>
      <IressButton>Option 2</IressButton>
      <IressButton>Option 3</IressButton>
      <IressButton>Option 4</IressButton>
    </IressButtonGroup>
  );
}

export function ButtonGroupOnChange() {
  return (
    <IressToasterProvider container={document.body}>
      <ButtonGroupWithToaster />
    </IressToasterProvider>
  );
}
```

#### Hidden label

If you would like to visually hide the label, you can use the `hiddenLabel` prop.

```tsx
<IressButtonGroup label="Button group" hiddenLabel>
  <IressButton>Option 1</IressButton>
  <IressButton>Option 2</IressButton>
  <IressButton>Option 3</IressButton>
  <IressButton>Option 4</IressButton>
</IressButtonGroup>;
```

#### Headings as labels

For semantic reasons, you may need the label to be rendered as a heading. In this case, you can pass the element directly to the `label` prop. The component will automatically add the `id` required to connect the button group to its label.

```tsx
<IressButtonGroup label={<IressText element="h2">Heading as label</IressText>}>
  <IressButton>Option 1</IressButton>
  <IressButton>Option 2</IressButton>
  <IressButton>Option 3</IressButton>
  <IressButton>Option 4</IressButton>
</IressButtonGroup>;
```

### Testing

Query the button group by its `group` role:

```tsx
const group = screen.getByRole('group', { name: 'Alignment' });
```

[View test IDs](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-buttongroup--docs#testing)


#### Test selectors

| Part | Description | Recommended Query | Test ID |
|------|-------------|-------------------|---------|
| main | The root element of the button group | `getByRole('group', { name: '...' })` | `buttongroup` |
| label | The group label element | `getByText('...')` | `buttongroup__label` |

---

### Storybook

[View in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-buttongroup--docs)

## Specifications

### Behaviour

| State | Behaviour |
|-------|-----------|
| Default | Single-select mode — one button active at a time |
| Multi-select | Multiple buttons can be active simultaneously |
| onChange | Emits selected value(s) when selection changes |

### Accessibility

- Renders as a `group` with an accessible label via `label` prop
- **WCAG 4.1.2 Name, Role, Value** — group role with accessible name
- `hiddenLabel` visually hides the label while keeping it available to screen readers

### Keyboard interaction

| Key | Action |
|-----|--------|
| `Tab` | Moves focus into/out of the group |
| `Enter` / `Space` | Activates the focused button |

---

# Button

> A clickable element used to perform an action.

## Import

```tsx
import { IressButton } from '@iress-oss/ids-components';
```

- [Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-button--docs)
- [Figma](https://www.figma.com/design/youFqYT4CgpKxfLJQv80hf/WIP-Iress-Design-System-V6?node-id=6201-26)
- [Source](https://github.com/iress/design-system/tree/main/packages/components/src/components/Button)
- [Report issue](https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=button&title=[Button]+Bug:+)
- [Request feature](https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=button,enhancement&title=[Button]+Feature:+)

## Props

> Required props are **bold**.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| active | `boolean` | — | Sets the active state of the button, usually used to indicate the button has activated a modal, popover or slideout. |
| append | `ReactNode` | — | Content for the append slot. |
| children | `ReactNode` | — | Content is placed between prepend and append if provided. Used to describe the expected action of this button. |
| compact | `boolean` | — | Makes the button more compact by reducing padding and font size. Used for buttons with icon only or when space is limited. |
| element | `ElementType` | — | Change the component that will be rendered as the button, used for third-party libraries that require a specific element type. By default, it will render a button or an anchor tag based on the `href` prop. |
| fluid | `any` | — | If `true`, the button will stretch to fill it's container. The prop is responsive, so you can set the breakpoint(s) at which the button will be fluid.  All breakpoints: `fluid={true}` Up to a specific breakpoint: `fluid="md"` |
| href | `string` | — | Contains a URL or a URL fragment that the hyperlink points to. If this property is set, an anchor tag will be rendered. |
| icon | [MaterialSymbol](https://fonts.google.com/icons?icon.set=Material+Symbols) | — | The icon to be displayed in the button. If provided, the icon will be displayed and the `children` will be used as screen reader text (although you can explicitly override this with `aria-label`) |
| loading | `boolean, string ` | `false` | When true, button is in loading state. If provided a string, will be used as the loading text for screen readers. |
| mode | `muted` , `primary` , `quaternary`, `secondary` , `tertiary`  | `secondary` | Style of the button. - Primary: Used for the main action on a page. Usually only used once per screen. - Secondary: Used for secondary actions on a page, often an action on multiple `IressPanel`s. Can used multiple times per screen. - Tertiary: Used for tertiary actions on a page, often the secondary action on multiple `IressPanel`s. Can used multiple times per screen. - Quaternary: Used for less prominent actions, often used for preference toggles (eg. Collapse all). - Muted: Used for less prominent actions, often used inline with headings. They are mainly used with icons only.  **Migrating to version 6** - `link` mode has been removed. If it is an action, use the `tertiary` mode. If it is a link inside a paragraph, use the new `IressLink` component instead. - `danger` has been removed. Please use the `status` prop instead. - `positive` and `success` have been removed. Please use the `status` prop instead. |
| onClick | `MouseEventHandler<Exclude<Parameters<Exclude<ButtonRef<C, THref>, undefined>>[0], null>>` | — | Emitted when the menu item is clicked. |
| prepend | `ReactNode` | — | Content for the prepend slot. |
| noWrap | `boolean` | `false` | Prevents text wrapping if set to true. |
| status | `danger` , `success` | — | An optional status to assign to the button. - `success`: Indicates a successful or positive action. - `danger`: Indicates a dangerous or potentially negative action. |
| data-testid | `string` | — | The data-testid attribute is used to target elements in automated tests if no identifier is available. In some components it is propagated to child elements.  Notes: - Please use this prop sparingly and only when no other identifier is available, as per the guiding principles of Testing Library. - Only use this prop for your tests @see https://testing-library.com/docs/queries/bytestid |
| value | `[FormControlValue](../../dist/types.d.ts)` | — | The value of the button, when used in `IressButtonGroup`. |

📄 [Full type definition](../../dist/components/Button/Button.d.ts)

Also accepts all [styling props](../styling-props/overview.md) ([type definition](../../dist/interfaces.d.ts), [token values](../tokens/tokens-reference.md)).

A button is a clickable item used to perform an action.

```tsx
import { IressButton, IressInline } from '@iress-oss/ids-components';

export function ButtonMode() {
  return (
    <IressInline gap="md">
      <IressButton mode="primary">Primary button</IressButton>
      <IressButton mode="secondary">Secondary button</IressButton>
      <IressButton mode="tertiary">Tertiary button</IressButton>
      <IressButton mode="quaternary">Quaternary button</IressButton>
      <IressButton mode="muted" icon="share">
        Share
      </IressButton>
    </IressInline>
  );
}
```

## Design

### When to use

- **Primary actions**: Submit forms, confirm dialogs, or trigger the main action on a page
- **Secondary actions**: Provide alternative or supporting actions alongside a primary button
- **Navigation**: Buttons for prominent navigation (e.g. wizard Next/Previous)
- **Destructive actions**: Delete or remove items with appropriate confirmation
- **Trigger non-navigational interactions**: Open modals, toggle popovers/tooltips, or load more content

### When not to use

- **Inline text links** — use `Link` instead for less prominent actions
- **Toggle between states** — use a `Toggle` component

### Do's and Don'ts

| ✅ Do | ❌ Don't |
|-------|----------|
| Use one primary button per view | Use multiple primary buttons that compete for attention |
| Keep button labels short and action-oriented | Use vague labels like "OK" or "Click here" |
| Use `loading` state for async actions | Use `disabled` to prevent submission — validate on click instead |
| Add confirmation for destructive actions | Allow irreversible actions without a confirmation step |

#### Avoid using `disabled`

IDS discourages using `disabled` on `IressButton`. Although the native HTML `disabled` attribute is supported via the underlying `<button>`/`<a>` element, it is an anti-pattern that should be avoided because:

- Screen readers skip disabled elements, making them invisible to assistive technology users
- Users cannot understand why a button is disabled or what they need to do to enable it
- It creates a poor user experience with no path to resolution

See below for recommended alternatives to common disabled button scenarios.

| Scenario | Alternative |
|----------|-------------|
| Form is incomplete | Keep submit enabled. Use `IressForm` with `rules` — shows inline errors on submit. |
| Action is in progress | Use the `loading` prop. Shows spinner, announces to screen readers, prevents duplicate clicks. |
| User lacks permission | Hide the button entirely, or keep it enabled and show an explanation when clicked. |
| Prerequisite step not completed | Guide the user to the prerequisite instead of silently disabling. |
| Destructive action needs confirmation | Use `IressModal` with `status="danger"` for a confirmation step. |

### Content guidelines

- **Labels**: Use sentence case, start with a verb (e.g. "Save changes", "Delete item")
- **Icon-only buttons**: Always provide accessible text via `aria-label` or hidden label
- **Loading text**: Customise the announcement (e.g. "Submitting…") for clarity

### Related patterns

- [Button Group](../components/button-group.md) — for grouping related buttons
- [Modal](../components/modal.md) — for destructive action confirmation
- [Form](../patterns/form.md) — for form submission with validation

## Develop

### Quick Start

```tsx
import { IressButton } from '@iress-oss/ids-components';

<IressButton>Button</IressButton>;
```

[View all props](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-button--docs#api-props)

### Usage

#### Modes

The `mode` prop controls the visual appearance and priority of the button.

- **Primary:** Use for the main call to action. Limit to one per view.
- **Secondary:** Use for secondary calls to action.
- **Tertiary:** Use when you need extra affordance between your secondary actions.
- **Quaternary:** Use for less prominent actions, often used for preference toggles (eg. Collapse all).
- **Muted:** Use for less prominent actions, often in toolbars or inline with headings. Mainly used for icon-only buttons.

```tsx
import { IressButton, IressInline } from '@iress-oss/ids-components';

export function ButtonMode() {
  return (
    <IressInline gap="md">
      <IressButton mode="primary">Primary button</IressButton>
      <IressButton mode="secondary">Secondary button</IressButton>
      <IressButton mode="tertiary">Tertiary button</IressButton>
      <IressButton mode="quaternary">Quaternary button</IressButton>
      <IressButton mode="muted" icon="share">
        Share
      </IressButton>
    </IressInline>
  );
}
```

#### Status

The `status` prop allows you to apply a visual status to the button.

- **Success:** Usually used to indicate an action that should be perceived as positive, such as "Confirm" or "Buy".
- **Danger:** Use for destructive actions, such as "Delete" or "Remove". Also used for actions that are perceived as negative, such as "Cancel" or "Sell".

```tsx
import {
  IressButton,
  IressInline,
  IressStack,
} from '@iress-oss/ids-components';

export function ButtonStatus() {
  return (
    <IressStack gap="md">
      <IressInline gap="md">
        <IressButton mode="primary" status="success">
          Primary
        </IressButton>
        <IressButton mode="secondary" status="success">
          Secondary
        </IressButton>
        <IressButton mode="tertiary" status="success">
          Tertiary
        </IressButton>
        <IressButton mode="quaternary" status="success">
          Quaternary
        </IressButton>
        <IressButton mode="muted" status="success" icon="shopping_cart">
          Add to cart
        </IressButton>
      </IressInline>
      <IressInline gap="md">
        <IressButton mode="primary" status="danger">
          Primary
        </IressButton>
        <IressButton mode="secondary" status="danger">
          Secondary
        </IressButton>
        <IressButton mode="tertiary" status="danger">
          Tertiary
        </IressButton>
        <IressButton mode="quaternary" status="danger">
          Quaternary
        </IressButton>
        <IressButton mode="muted" status="danger" icon="delete">
          Delete
        </IressButton>
      </IressInline>
    </IressStack>
  );
}
```

#### Types

The `type` property controls the behaviour of the button. It defaults to `button`, which is the best option for most situations, but can also be set to `submit` or `reset`. `submit` should be used for buttons that submit forms, and `reset` should be used if the button clears form data and resets the form to its original state.

**Please note:** this differs from a standard HTML button element, where the `type` defaults to submit.

```tsx
<IressInline gap="md">
  <IressButton type="button">button</IressButton>
  <IressButton type="submit">submit</IressButton>
  <IressButton type="reset">reset</IressButton>
</IressInline>;
```

#### Loading

Loading buttons give the user an indication something is happening (eg. a form submission or extra content being loaded) after they have been triggered.

The loading state can be activated by setting the `loading` prop to `true`. To customise the screen reader announcement, pass a string instead of `true` (e.g. `loading="Submitting…"`). The default announcement is "Loading".

When the loading state is activated, any click events on the button are disabled.

```tsx
import { IressButton, IressInline } from '@iress-oss/ids-components';

export function ButtonLoading() {
  return (
    <IressInline gap="md">
      <IressButton mode="primary" loading>
        Primary
      </IressButton>
      <IressButton mode="secondary" loading>
        Secondary
      </IressButton>
      <IressButton mode="tertiary" loading>
        Tertiary
      </IressButton>
      <IressButton mode="quaternary" loading>
        Quaternary
      </IressButton>
      <IressButton mode="muted" loading icon="edit" />
    </IressInline>
  );
}
```

#### Buttons as links

The `href` prop allows you to create a link that looks like a button. When set, the component will render an HTML anchor element instead of an HTML button element.

You can also use the link specific props `target` and `rel`.

```tsx
<IressButton
  href="https://www.iress.com/"
  rel="opener noreferrer"
  target="_blank"
>
  This is a link (anchor tag)
</IressButton>;
```

#### Delete confirmation

> **Make sure that the user understands the consequences of clicking the button**
>
> You may want to add a confirmation step to prevent accidental data loss if the
>   action is irreversible.

The confirmation step should be a modal with a simple message, as with the example below. Use a delete button for the modal's primary call to action, and use a secondary button for the cancel action.

```tsx
import { IressButton, IressModal } from '@iress-oss/ids-components';
import { useState } from 'react';

export function ButtonDeleteConfirmation() {
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <>
      <IressButton status="danger" onClick={() => setShowConfirm(true)}>
        Delete item
      </IressButton>
      <IressModal
        heading="Confirm deletion"
        status="danger"
        show={showConfirm}
        onShowChange={setShowConfirm}
        actions={[
          {
            children: 'Cancel',
            mode: 'tertiary',
            onClick: () => setShowConfirm(false),
          },
          { children: 'Delete', onClick: () => setShowConfirm(false) },
        ]}
      >
        Are you sure you want to delete this item? This action cannot be undone.
      </IressModal>
    </>
  );
}
```

#### Fluid

If the `fluid` prop is set to true, the button will expand to be 100% of the width of its container.

The `fluid` prop can also be set to a breakpoint size, which means the button will be fluid up until its breakpoint is passed.

```tsx
<IressInline gap="md">
  <IressButton fluid>Always fluid</IressButton>
  <IressButton fluid="md">Fluid on xs and sm</IressButton>
</IressInline>;
```

#### Wrapping text

Button text will wrap on to a new line if there's not enough space for the text to sit on a single line. If you want to prevent the text from wrapping, you can set the `noWrap` prop to `true`.

```tsx
<IressText style={{ width: 250 }}>
  <p>
    <IressButton>
      Button with lots of text content that will wrap (default behaviour)
    </IressButton>
  </p>
  <p>
    <IressButton style={{ minWidth: 300 }}>
      Button with lots of text content and a minimum width set via CSS
    </IressButton>
  </p>
  <p>
    <IressButton noWrap>
      Button with lots of text content with the noWrap prop set to true
    </IressButton>
  </p>
</IressText>;
```

#### Prepend & Append

Use the `prepend` and `append` props to correctly position icons or badges inside buttons.

- **`prepend`** — Places the element before the button text
- **`append`** — Places the element after the button text
- **`icon`** — Convenience prop for setting the icon name directly (useful for icon-only buttons)

> ⚠️ **Do not use `slot` attributes on children** (e.g. `<IressIcon slot="start" />`). The `slot` attribute is a legacy v4 pattern that is no longer supported. Always use the `prepend` and `append` props.

```tsx
import {
  IressButton,
  IressIcon,
  IressInline,
  IressPill,
  IressStack,
} from '@iress-oss/ids-components';

export function ButtonSlots() {
  return (
    <IressStack gap="md">
      <IressInline gap="md">
        <IressButton prepend={<IressIcon name="home" />}>
          Prepend icon
        </IressButton>
      </IressInline>

      <IressInline gap="md">
        <IressButton append={<IressIcon name="home" />}>
          Append icon
        </IressButton>
        <IressButton append={<IressPill>+999</IressPill>}>
          Append pill
        </IressButton>
      </IressInline>

      <IressInline gap="md">
        <IressButton icon="home">Home</IressButton>
      </IressInline>
    </IressStack>
  );
}
```

#### Download button

When a `href` is provided, the `download` prop can be used to indicate that the link should download a file instead of navigating to it.

```tsx
<IressButton
  href="assets/iress-logo.png"
  download
  prepend={<IressIcon name="download" />}
/>;
```

#### Element

You can use the `element` prop to render a custom component as the button. This is useful for rendering a component from a third-party library, such as `react-router-dom`.

```tsx
import { IressButton } from '@iress-oss/ids-components';
import { type HTMLAttributes, forwardRef } from 'react';

/**
 * This could be the `Link` component from `react-router-dom` or any other routing library.
 */
const Link = forwardRef<
  HTMLAnchorElement,
  HTMLAttributes<HTMLSpanElement> & { to: string }
>(({ children, className, to, ...restProps }, ref) => (
  <div className={className}>
    <span onClick={() => console.log(to)} ref={ref} {...restProps}>
      {children}
    </span>
  </div>
));

export const RoutingButton = () => (
  <IressButton element={Link} to="https://iress.com">
    Iress
  </IressButton>
);
```

### Close button

`IressCloseButton` is a special variant of `IressButton` that is used to execute a close action. It is used in modals, slideouts, and other components that require a close button.

It has one additional prop, `screenReaderText`, which is used to provide a screen reader only label for the close button.

```tsx
<IressCloseButton />;
```

### Testing

Query buttons by their accessible role:

```tsx
const button = screen.getByRole('button', { name: 'Submit' });
```

When `href` is provided, the button renders as a link:

```tsx
const link = screen.getByRole('link', { name: 'Go to dashboard' });
```

[View test roles/IDs](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-button--docs#testing)


#### Test selectors

| Part | Description | Recommended Query | Test ID |
|------|-------------|-------------------|---------|
| main | The root element of the button | `getByRole('button', { name: '...' })` | `button` |

---

### Storybook

Storybook provides an interactive playground for testing different prop combinations, more complex recipes, all prop details, and accessibility attributes.

[View in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-button--docs)

## Specifications

### Behaviour

| State | Behaviour |
|-------|-----------|
| Default | Button is interactive and responds to click/keyboard activation |
| Loading | Spinner shown, click events disabled, screen reader announces loading state |
| Disabled | Pointer events disabled, element removed from tab order (anti-pattern) |
| As link (`href`) | Renders as `<a>` element, supports `target` and `rel` attributes |
| Fluid | Expands to 100% container width, or up to a breakpoint |

### Accessibility

**WCAG compliance:**

- **4.1.2 Name, Role, Value** — Uses `role="button"` or `role="link"` based on whether `href` is set
- **2.1.1 Keyboard** — All button actions are keyboard accessible
- **1.4.1 Use of Color** — Status communicated via text and icon, not colour alone

**Keyboard interaction:**

| Key | Action |
|-----|--------|
| `Enter` | Activates the button |
| `Space` | Activates the button |
| `Tab` | Moves focus to the next focusable element |

### Edge cases

- **Loading prevents double-submit**: Click events are suppressed while `loading` is active
- **Icon-only buttons**: Must have accessible text via `aria-label` or visually hidden label
- **Button as link**: Role changes to `link` — test with `getByRole('link')` not `getByRole('button')`
- **Wrapping text**: Long labels wrap by default; use `noWrap` to prevent

---

### Storybook

Storybook provides an interactive playground for testing different prop combinations and viewing accessibility attributes.

[View in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-button--docs)

---

# Card

> Groups related content and actions into a contained, visually distinct surface.

## Import

```tsx
import { IressCard } from '@iress-oss/ids-components';
```

- [Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-card--docs)
- [Source](https://github.com/iress/design-system/tree/main/packages/components/src/components/Card)
- [Report issue](https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=card&title=[Card]+Bug:+)
- [Request feature](https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=card,enhancement&title=[Card]+Feature:+)

## Props

> Required props are **bold**.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | `ReactNode` | — | Main body of the card |
| element | `ElementType` | — | Element type to render the Card as. |
| footer | `ReactNode` | — | Section that sticks to the bottom of the card |
| heading | `ReactNode` | — | Heading slot. Often used for a title or description. |
| media | `ReactNode` | — | Section (often for an image, table or chart) that appears before the heading |
| noBorder | `boolean` | — | When set to true, the card will not have a border. This is useful to de-prioritise a card within another bordered container, such as a card within a sidebar. |
| prepend | `ReactNode` | — | Slot to the left of card content. |
| selected | `boolean` | — | When set to true, card appears selected. |
| topRight | `ReactNode` | — | Slot positioned to the top right of the card, often used for an icon or action menu |
| data-testid | `string` | — | The data-testid attribute is used to target elements in automated tests if no identifier is available. In some components it is propagated to child elements.  Notes: - Please use this prop sparingly and only when no other identifier is available, as per the guiding principles of Testing Library. - Only use this prop for your tests @see https://testing-library.com/docs/queries/bytestid |

📄 [Full type definition](../../dist/components/Card/Card.d.ts)

Also accepts all [styling props](../styling-props/overview.md) ([type definition](../../dist/interfaces.d.ts), [token values](../tokens/tokens-reference.md)).

A container for grouping related content and actions with optional heading, footer, and media slots.

```tsx
import {
  IressInline,
  IressToggle,
  IressRow,
  IressCol,
  IressDivider,
  IressCard,
  IressStack,
  IressIcon,
  IressText,
  IressTag,
  IressPill,
  IressContextualMenu,
  IressPanel,
} from '@iress-oss/ids-components';
import { useState } from 'react';

const SLOT_CONTENT = {
  prepend: <IressIcon name="star" />,
  media: (
    <img
      src="https://www.iress.com/media/images/media-contact.width-600.png"
      width="250"
      alt="A man in an Iress branded t-shirt smiles at the camera"
    />
  ),
  heading: <h2>Welcome to Iress!</h2>,
  topRight: <IressContextualMenu>More actions in here</IressContextualMenu>,
  children: (
    <IressText>
      Find out all the onboarding material you need{' '}
      <a href="https://iress.com">with this easy guide</a>.
    </IressText>
  ),
  footer: (
    <IressInline gap="sm" horizontalAlign="between" verticalAlign="middle">
      <IressInline gap="sm">
        <IressTag mode="30">#new-starter</IressTag>
        <IressTag mode="60">#first-day</IressTag>
      </IressInline>
      <IressPill mode="70">NEW</IressPill>
    </IressInline>
  ),
};

const SLOT_NAMES = Object.keys(SLOT_CONTENT) as Array<
  keyof typeof SLOT_CONTENT
>;

export function CardAllSlots() {
  const [show, setShow] = useState({
    children: true,
    prepend: false,
    media: true,
    heading: true,
    topRight: true,
    footer: true,
  });

  const cardProps = Object.fromEntries(
    SLOT_NAMES.filter((slot) => show[slot]).map((slot) => [
      slot,
      SLOT_CONTENT[slot],
    ]),
  );

  return (
    <IressStack maxWidth="container.lg" gap="md" mx="auto">
      <IressInline gap="md">
        {SLOT_NAMES.map((slot) => (
          <IressToggle
            key={slot}
            checked={show[slot]}
            onChange={(checked) => setShow({ ...show, [slot]: checked })}
          >
            {slot}
          </IressToggle>
        ))}
      </IressInline>
      <IressDivider />
      <IressRow gutter="md">
        <IressCol>
          <IressCard {...cardProps} />
        </IressCol>
        <IressCol>
          <IressCard {...cardProps} />
        </IressCol>
        <IressCol>
          <IressCard {...cardProps} />
        </IressCol>
      </IressRow>
    </IressStack>
  );
}
```

## Design

### When to use

- **Content grouping**: Visually separate distinct pieces of content on a page
- **Actionable items**: Cards with clickable headings or entire card clickable
- **Dashboard widgets**: Self-contained content blocks in grid layouts
- **List items**: Repeatable content in a grid or list

### When not to use

- **Full-width sections** — use [Panel](../components/panel.md) instead
- **Navigation items** — use [Menu](../components/menu.md) or [SideNav](../patterns/side-nav.md)
- **Modals or overlays** — use [Modal](../components/modal.md) or [Popover](../components/popover.md)

### Do's and Don'ts

| ✅ Do | ❌ Don't |
|-------|----------|
| Keep card content focused on a single topic | Overload cards with too much information |
| Use consistent card sizes in a grid | Mix different card heights in the same row |
| Use `stretch` prop to fill available height | Manually set fixed heights |
| Use slots (heading, footer, prepend) for structure | Use arbitrary nested markup for layout |

### Content guidelines

- **Heading**: Keep concise — summarises the card's content
- **Footer**: Use for actions (buttons/links) related to the card content
- **Media**: Images should have descriptive alt text

### Related patterns

- [Panel](../components/panel.md) — for full-width content sections
- [Expander](../components/expander.md) — for progressive disclosure within cards

## Develop

### Quick Start

```tsx
import { IressCard } from '@iress-oss/ids-components';

<IressCard heading="Card title">Card content goes here.</IressCard>;
```

[View all props](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-card--docs#api-props)

### Usage

#### Clickable card

```tsx
<IressCard
  role="button"
  onClick={() => alert('Card clicked')}
  onKeyDown={() => alert('Key down on card (for keyboard users)')}
  tabIndex={0}
>
  I am a card with an onClick handler. Click me to see what happens.
</IressCard>;
```

#### Selected state

```tsx
<IressCard selected>I'm a selected card</IressCard>;
```

#### No border

```tsx
<IressCard noBorder>I'm a card</IressCard>;
```

### Testing

Query the card by its test ID:

```tsx
const card = screen.getByTestId('my-card');
```

[View test IDs](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-card--docs#testing)


#### Test selectors

| Part | Description | Recommended Query | Test ID |
|------|-------------|-------------------|---------|
| main | The root element of the card | `getByText('...')` | `card` |
| prepend | The prepend slot container | — | `card__prepend` |
| topRight | The top-right slot container | — | `card__topRight` |
| media | The media slot container | — | `card__media` |
| heading | The card heading container | `getByRole('heading')` | `card__heading` |
| body | The card body container | — | `card__body` |

## Specifications

### Behaviour

| State | Behaviour |
|-------|-----------|
| Default | Static container with optional heading/footer slots |
| Clickable heading | Heading renders as a link or button |
| Clickable card | Entire card is interactive |
| Selected | Visual highlight applied via `selected` prop |
| Stretch | Card fills available height in a flex/grid container |

### Accessibility

- Clickable cards use appropriate `role` and keyboard support
- Card heading level can be configured via `headingLevel` prop
- Selected state communicated via `aria-selected`

### Keyboard interaction

| Key | Action |
|-----|--------|
| `Enter` / `Space` | Activates clickable card or heading link |
| `Tab` | Moves focus to next interactive element |

---

[View in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-card--docs)

---

# CheckboxGroup

> Groups related checkboxes so users can select multiple options from a set.

## Import

```tsx
import { IressCheckboxGroup } from '@iress-oss/ids-components';
```

- [Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-checkbox-group--docs)
- [Figma](https://www.figma.com/design/youFqYT4CgpKxfLJQv80hf/WIP-Iress-Design-System-V6?node-id=7305-28220)
- [Source](https://github.com/iress/design-system/tree/main/packages/components/src/components/CheckboxGroup)
- [Report issue](https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=checkbox-group&title=[CheckboxGroup]+Bug:+)
- [Request feature](https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=checkbox-group,enhancement&title=[CheckboxGroup]+Feature:+)

## Props

> Required props are **bold**.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | `ReactNode` | — | Content to be displayed inside the group, usually multiple `IressCheckbox`. |
| defaultValue | `T , T[]` | — | Value of checkbox group when in uncontrolled mode. |
| layout | `'block' , 'inline', 'stack' ` | `'stack'` | Sets which of the block / inline layout options apply. |
| name | `string` | — | Name to be applied to all checkboxes in the group. |
| onChange | `(value?: T[]) => void` | — | Called with collated new value when a user toggles one of its children checkboxes. |
| readOnly | `[FormControlReadOnly](../../dist/types.d.ts)` | — | Renders the group in a read-only state. |
| value | `T , T[]` | — | Value of checkbox group when in controlled mode. |
| variant | `CheckboxVariants` | — | The visual variant of the checkboxes in the group. This is passed down to child checkboxes, but can be overridden at the individual checkbox level. - `card`: Provides a larger, card-like style with a heading slot. - `touch`: Provides a larger, button-like style, great for mobile devices. - `undefined`: The default checkbox style. |

📄 [Full type definition](../../dist/components/CheckboxGroup/CheckboxGroup.d.ts)

Also accepts all [styling props](../styling-props/overview.md) ([type definition](../../dist/interfaces.d.ts), [token values](../tokens/tokens-reference.md)).

Checkbox groups allow users to make more than one choice in a set of related options.

```tsx
<IressCheckboxGroup name="let-them-eat-cake">
  <IressCheckbox key={1} value="lemon-drizzle">
    Lemon drizzle
  </IressCheckbox>
  <IressCheckbox key={2} value="victoria-sponge">
    Victoria Sponge
  </IressCheckbox>
  <IressCheckbox key={3} value="carrot-cake">
    Carrot Cake
  </IressCheckbox>
</IressCheckboxGroup>;
```

## Design

### When to use

- **Multiple selections**: Allow users to pick several options from a related set
- **Preference lists**: Settings pages with multiple toggleable preferences
- **Filter panels**: Multi-select filters for search results or data tables
- **Table row selection**: Combined with a table for bulk actions

### When not to use

- **Single selection** — use RadioGroup instead
- **Very large lists** (50+ items) — use a multi-select Select with search
- **Single toggle** — use a standalone Checkbox or Toggle

### Do's and Don'ts

| ✅ Do | ❌ Don't |
|-------|----------|
| Use `defaultValue` or `value` to control checked state | Set `checked` directly on child checkboxes within a group |
| Provide a clear group label via the form field | Leave the group unnamed and rely on visual context alone |
| Use `hiddenCheckbox` for custom card-style selections | Create custom checkbox UI without proper ARIA roles |
| Use the `layout` prop for standard arrangements | Overcomplicate layout with unnecessary custom CSS |

### Content guidelines

- **Group label**: Clearly describe what the user is selecting (e.g. "Notification preferences")
- **Option labels**: Keep concise and parallel in structure
- **Limit options**: Ideally 2–7 visible options; use progressive disclosure for more

### Related patterns

- [Checkbox](../components/checkbox.md) — for individual standalone checkboxes
- [Radio Group](../components/radio-group.md) — for single-select option groups
- [Form Field](../patterns/form.md) — for wrapping with label, hint, and validation

## Develop

### Quick Start

```tsx
import { IressCheckboxGroup } from '@iress-oss/ids-components';

<IressCheckboxGroup name="preferences" />;
```

[View all props](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-checkboxgroup--docs#api-props)

### Usage

#### Checkbox children

Individual checkboxes can be passed directly into `IressCheckboxGroup`.

**Note:** The `mapCheckboxGroupOptions` helper function is now deprecated. Use `array.map` to map options to `IressCheckbox` components instead.

```tsx
<IressCheckboxGroup name="let-them-eat-cake">
  <IressCheckbox key={1} value="lemon-drizzle">
    Lemon drizzle
  </IressCheckbox>
  <IressCheckbox key={2} value="victoria-sponge">
    Victoria Sponge
  </IressCheckbox>
  <IressCheckbox key={3} value="carrot-cake">
    Carrot Cake
  </IressCheckbox>
</IressCheckboxGroup>;
```

#### Default checked

The default checked state of the checkbox children should always be set using the `defaultValue` prop (not directly on the checkbox component).

```tsx
<IressCheckboxGroup
  name="let-them-eat-cake"
  defaultValue={['lemon-drizzle', 'victoria-sponge']}
>
  <IressCheckbox key={1} value="lemon-drizzle">
    Lemon drizzle
  </IressCheckbox>
  <IressCheckbox key={2} value="victoria-sponge">
    Victoria Sponge
  </IressCheckbox>
  <IressCheckbox key={3} value="carrot-cake">
    Carrot Cake
  </IressCheckbox>
</IressCheckboxGroup>;
```

#### Changing the checked state

The `value` prop can be updated if you need to change the checked state without interacting with the checkboxes.

```tsx
import {
  IressButton,
  IressCheckbox,
  IressCheckboxGroup,
  IressStack,
} from '@iress-oss/ids-components';
import { useState } from 'react';

export function CheckboxGroupUsingState() {
  const [value, setValue] = useState<string[]>([]);

  return (
    <IressStack gap="sm">
      <IressCheckboxGroup
        value={value}
        onChange={(newValue) => setValue(newValue ?? [])}
      >
        <IressCheckbox value="lemon-drizzle">Lemon drizzle</IressCheckbox>
        <IressCheckbox value="victoria-sponge">Victoria Sponge</IressCheckbox>
        <IressCheckbox value="carrot-cake">Carrot Cake</IressCheckbox>
      </IressCheckboxGroup>
      <IressButton onClick={() => setValue([])}>Clear</IressButton>
    </IressStack>
  );
}
```

#### Layout

The `layout` prop controls how the checkbox group is displayed:

- **Stack (Default):** Checkboxes are laid out vertically. Labels are only as wide as their text.
- **Block:** Same as Stack, but labels take up the full width of the container.
- **Inline:** Checkboxes are laid out horizontally.

```tsx
import {
  IressCheckbox,
  IressCheckboxGroup,
  IressText,
} from '@iress-oss/ids-components';

export function CheckboxGroupLayout() {
  return (
    <IressText>
      <h3>block</h3>
      <IressCheckboxGroup layout="block">
        <IressCheckbox value="google" bg="alt">
          Google
        </IressCheckbox>
        <IressCheckbox value="newspaper" bg="alt">
          Newspaper
        </IressCheckbox>
        <IressCheckbox value="friend" bg="alt">
          Friend
        </IressCheckbox>
        <IressCheckbox value="other" bg="alt">
          Other
        </IressCheckbox>
      </IressCheckboxGroup>
      <h3>inline</h3>
      <IressCheckboxGroup layout="inline">
        <IressCheckbox value="google" bg="alt">
          Google
        </IressCheckbox>
        <IressCheckbox value="newspaper" bg="alt">
          Newspaper
        </IressCheckbox>
        <IressCheckbox value="friend" bg="alt">
          Friend
        </IressCheckbox>
        <IressCheckbox value="other" bg="alt">
          Other
        </IressCheckbox>
      </IressCheckboxGroup>
      <h3>stack</h3>
      <IressCheckboxGroup layout="stack">
        <IressCheckbox value="google" bg="alt">
          Google
        </IressCheckbox>
        <IressCheckbox value="newspaper" bg="alt">
          Newspaper
        </IressCheckbox>
        <IressCheckbox value="friend" bg="alt">
          Friend
        </IressCheckbox>
        <IressCheckbox value="other" bg="alt">
          Other
        </IressCheckbox>
      </IressCheckboxGroup>
    </IressText>
  );
}
```

#### Hidden checkboxes

You can use the `hiddenCheckbox` prop to create custom checkboxes. When enabled, the actual checkbox will be visually hidden, allowing you to create more interesting controls.

```tsx
<IressField
  label="I'd like to discuss the following with my financial adviser:"
  hint="Select all that apply"
>
  <IressCheckboxGroup
    defaultValue={['home']}
    variant="card"
    name="financial-review"
    layout="inline"
  >
    {children}
  </IressCheckboxGroup>
</IressField>;
```

#### Custom checkbox group layout

The checkbox group's `layout` prop gives you some default options to help control the layout of your controls. But sometimes you need more granular control, which you can achieve with a bit of custom CSS.

```tsx
<IressField
  label="I'd like to discuss the following with my financial adviser:"
  hint="Select all that apply"
>
  <IressCheckboxGroup
    defaultValue={['home']}
    variant="card"
    name="financial-review"
    layout="block"
  >
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gridAutoRows: '1fr',
        gridGap: '16px',
        width: '100%',
        padding: '0.5rem',
        border: '1px dashed hsl(43deg 100% 45%)',
        resize: 'horizontal',
        overflow: 'auto',
      }}
    >
      {children}
    </div>
  </IressCheckboxGroup>
</IressField>;
```

#### Read only

The `readOnly` prop changes how the checkbox group is rendered. It will only render the children that are checked (alongside a hidden input that contains the `value` if it was set).

```tsx
<IressCheckboxGroup
  name="let-them-eat-cake"
  defaultValue={['lemon-drizzle', 'victoria-sponge']}
  readOnly
>
  <IressCheckbox key={1} value="lemon-drizzle">
    Lemon drizzle
  </IressCheckbox>
  <IressCheckbox key={2} value="victoria-sponge">
    Victoria Sponge
  </IressCheckbox>
  <IressCheckbox key={3} value="carrot-cake">
    Carrot Cake
  </IressCheckbox>
</IressCheckboxGroup>;
```

#### Touch

The `touch` prop adds the button-like border and padding to checkbox.

```tsx
<IressCheckboxGroup
  name="let-them-eat-cake"
  defaultValue={['lemon-drizzle', 'victoria-sponge']}
  variant="touch"
>
  <IressCheckbox key={1} value="lemon-drizzle">
    Lemon drizzle
  </IressCheckbox>
  <IressCheckbox key={2} value="victoria-sponge">
    Victoria Sponge
  </IressCheckbox>
  <IressCheckbox key={3} value="carrot-cake">
    Carrot Cake
  </IressCheckbox>
</IressCheckboxGroup>;
```

#### Checkboxes inside an `IressTable`

You can use `IressCheckboxGroup` and `IressTable` to create a table with checkboxes, allowing the users to select multiple rows.

```tsx
import {
  type FormControlValue,
  IressButton,
  IressCheckbox,
  IressForm,
  IressFormFieldset,
  IressPanel,
  IressStack,
  IressTable,
} from '@iress-oss/ids-components';
import { IressCheckboxGroup } from '../CheckboxGroup';
import { toArray } from '../../../helpers/formatting/toArray';
import { useWatch } from 'react-hook-form';

interface FieldValues {
  'let-them-eat-cake'?: FormControlValue[];
}

const SelectedValues = () => {
  const value = useWatch<FieldValues>({ name: 'let-them-eat-cake' });
  const valueString = toArray(value).join(', ');

  return (
    <IressPanel>
      Selected values: {valueString ? valueString : 'None'}
    </IressPanel>
  );
};

export const CheckboxGroupTable = () => (
  <IressForm
    defaultValues={{
      'let-them-eat-cake': ['lemon-drizzle', 'victoria-sponge'],
    }}
  >
    <IressStack gap="md">
      <SelectedValues />
      <IressFormFieldset
        label="Let them eat cake"
        name="let-them-eat-cake"
        hiddenLabel
        mb="none"
        rules={{ required: 'Please select a cake' }}
        render={(field) => (
          <IressCheckboxGroup {...field} layout="stack">
            <IressTable
              caption="Available options"
              columns={[
                { key: 'select', label: 'Select', width: '2rem' },
                { key: 'name', label: 'Name' },
              ]}
              rows={[
                {
                  select: (
                    <IressCheckbox hiddenLabel value="lemon-drizzle">
                      Select lemon drizzle
                    </IressCheckbox>
                  ),
                  name: 'Lemon drizzle',
                },
                {
                  select: (
                    <IressCheckbox hiddenLabel value="victoria-sponge">
                      Select Victoria Sponge
                    </IressCheckbox>
                  ),
                  name: 'Victoria Sponge',
                },
                {
                  select: (
                    <IressCheckbox hiddenLabel value="carrot-cake">
                      Select Carrot Cake
                    </IressCheckbox>
                  ),
                  name: 'Carrot Cake',
                },
              ]}
            />
          </IressCheckboxGroup>
        )}
      />
      <IressButton type="submit" mode="primary" alignSelf="start">
        Submit
      </IressButton>
    </IressStack>
  </IressForm>
);
```

### Testing

Query checkboxes within the group by their role:

```tsx
const checkboxes = screen.getAllByRole('checkbox');
await user.click(screen.getByRole('checkbox', { name: 'Option A' }));
```

Query the group itself by its `group` role:

```tsx
const group = screen.getByRole('group', { name: 'Select options' });
```

#### Disambiguating multiple checkbox groups

Use `within` to scope queries when multiple groups share the same option labels:

```tsx
import { within } from '@testing-library/react';

const group = screen.getByRole('group', { name: 'Interests' });
const option = within(group).getByRole('checkbox', { name: 'Music' });
```

#### Gotchas

- **readOnly mode**: When `readOnly` is set, all checkbox roles are removed from
  the DOM. Only selected options' label text and hidden `<input>` elements remain.
- **onChange returns an array**: The `onChange` callback receives the full array
  of selected values, not just the changed item.

[View test roles/IDs](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-checkboxgroup--docs#testing)


#### Test selectors

| Part | Description | Recommended Query | Test ID |
|------|-------------|-------------------|---------|
| main | The root element of the checkbox group | `getByRole('group')` | `checkbox-group` |

---

### Storybook

Storybook provides an interactive playground for testing different prop combinations, more complex recipes, all prop details, and accessibility attributes.

[View in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-checkboxgroup--docs)

## Specifications

### Behaviour

| State | Behaviour |
|-------|-----------|
| Default | All checkboxes unchecked unless `defaultValue` is set |
| Controlled | `value` prop determines checked state; `onChange` fires on interaction |
| Read only | Only checked items render as text with hidden inputs |
| Hidden checkbox | Visual checkbox hidden; checked state shown via label border thickness |

### Accessibility

**WCAG compliance:**

- **4.1.2 Name, Role, Value** — Group uses `role="group"` with an accessible name
- **1.3.1 Info and Relationships** — Checkboxes are semantically grouped
- **2.1.1 Keyboard** — All checkboxes focusable and togglable via keyboard

**Keyboard interaction:**

| Key | Action |
|-----|--------|
| `Space` | Toggles the focused checkbox |
| `Tab` | Moves focus between checkboxes in the group |

### Edge cases

- **readOnly + nothing selected**: Group renders empty
- **onChange returns full array**: Not just the changed value — handle accordingly
- **defaultValue vs value**: Using both causes controlled/uncontrolled conflict
- **hiddenCheckbox**: Checked state communicated via border, not a visible tick

---

### Storybook

Storybook provides an interactive playground for testing different prop combinations and viewing accessibility attributes.

[View in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-checkboxgroup--docs)

---

# Checkbox

> Renders a checkbox input for toggling a boolean value.

## Import

```tsx
import { IressCheckbox } from '@iress-oss/ids-components';
```

- [Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-checkbox--docs)
- [Figma](https://www.figma.com/design/youFqYT4CgpKxfLJQv80hf/WIP-Iress-Design-System-V6?node-id=7305-28220)
- [Source](https://github.com/iress/design-system/tree/main/packages/components/src/components/Checkbox)
- [Report issue](https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=checkbox&title=[Checkbox]+Bug:+)
- [Request feature](https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=checkbox,enhancement&title=[Checkbox]+Feature:+)

## Props

> Required props are **bold**.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| checked | `boolean` | — | If true, the checkbox is selected. Please use this when rendering the checkbox in controlled mode. |
| children | `ReactNode` | — | The checkbox content |
| defaultChecked | `boolean` | — | If true, the checkbox will be initially rendered as selected. Please use this when rendering the checkbox in uncontrolled mode. |
| heading | `ReactNode` | — | Sets the heading for the checkbox when using the `card` variant |
| hiddenLabel | `boolean` | — | Visually hides the label (if set), label will still be read out by screenreaders. |
| indeterminate | `boolean` | — | If true, the checkbox will visually appear as indeterminate. |
| name | `string` | — | The name of the control, which is submitted with the form data. |
| onBlur | `((e: FocusEvent<HTMLInputElement, Element>) => void)` | — | Emitted when the checkbox loses focus. |
| onChange | `((e: ChangeEvent<HTMLInputElement, Element>, checked?: boolean, value?: T) => void) | undefined` | — | Emitted when the checkbox value changes. |
| onFocus | `((e: FocusEvent<HTMLInputElement, Element>) => void)` | — | Emitted when the checkbox gains focus. |
| required | `boolean` | — | If `true`, the checkbox is a required field and will be validated as such. |
| readOnly | `[FormControlReadOnly](../../dist/types.d.ts)` | — | Renders the checkbox as read-only. Use `'locked'` when the value is read-only because of permissions. |
| value | `T` | — | Value of the checkbox when used in a checkbox group. The checked state of the checkbox will be overridden based on this value if used inside a checkbox group. **Note:** - The value of the checkbox does not mean if its checked or not, use the checked property for that. - If the value of the checkbox is true/false, and checked is undefined and not inside a CheckboxGroup, it will use this as the checked value. This ensures out-of-the-box compatibility with React Hook Form. |
| variant | `[IressCheckboxVariants](../../dist/components/Checkbox/Checkbox.d.ts)` | — | The visual variant of the checkbox. - `card`: Provides a larger, card-like style with a heading slot. - `touch`: Provides a larger, button-like style, great for mobile devices. - `undefined`: The default checkbox style. |
| data-testid | `string` | — | The data-testid attribute is used to target elements in automated tests if no identifier is available. In some components it is propagated to child elements.  Notes: - Please use this prop sparingly and only when no other identifier is available, as per the guiding principles of Testing Library. - Only use this prop for your tests @see https://testing-library.com/docs/queries/bytestid |

📄 [Full type definition](../../dist/components/Checkbox/Checkbox.d.ts)

Also accepts all [styling props](../styling-props/overview.md) ([type definition](../../dist/interfaces.d.ts), [token values](../tokens/tokens-reference.md)).

Checkboxes are used to let a user select one or more options for a limited number of choices. Also, works as a child of IressCheckboxGroup

```tsx
<IressCheckbox>A checkbox</IressCheckbox>;
```

## Design

### When to use

- **Multiple selections**: Let users select one or more options from a list
- **Binary toggles**: A single checkbox for opt-in/opt-out (e.g. "Accept terms")
- **Table row selection**: Select individual rows for bulk actions
- **Indeterminate state**: Show partial selection in a parent checkbox

### When not to use

- **Mutually exclusive options** — use RadioGroup instead
- **Immediate effect toggles** — use a Toggle component
- **Large option sets** — use a multi-select Select

### Do's and Don'ts

| ✅ Do | ❌ Don't |
|-------|----------|
| Use a visible label for every checkbox | Hide labels without providing `hiddenLabel` for accessibility |
| Group related checkboxes in a CheckboxGroup | Use standalone checkboxes for related multi-select options |
| Use `indeterminate` only as a visual indicator of partial selection | Rely on `indeterminate` as a third state in form logic |
| Use `readOnly` for confirmed/locked selections | Use `disabled` to prevent interaction without explanation |

### Content guidelines

- **Labels**: Use sentence case, be specific about what the option does
- **Positive framing**: "Send me updates" not "Don't send me updates"
- **Consistent length**: Keep labels similar length within a group

### Related patterns

- [Checkbox Group](../components/checkbox-group.md) — for managing multiple related checkboxes
- [Switch](../components/toggle.md) — for immediate on/off toggles
- [Radio Group](../components/radio-group.md) — for single-select options

## Develop

### Quick Start

```tsx
import { IressCheckbox } from '@iress-oss/ids-components';

<IressCheckbox>A checkbox</IressCheckbox>;
```

[View all props](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-checkbox--docs#api-props)

### Usage

#### Controlled

For single checkboxes in controlled mode the `checked` prop sets the checked state.

When used as part of an `IressCheckboxGroup`, the `checked` prop will be ignored. Instead, the `value` prop on the `IressCheckboxGroup` will determine the checked state of each checkbox.

```tsx
import { IressCheckbox } from '@iress-oss/ids-components';
import { useState } from 'react';

export function CheckboxControlled() {
  const [checked, setChecked] = useState(true);

  return (
    <IressCheckbox
      checked={checked}
      onChange={(_e, newChecked) => setChecked(newChecked ?? false)}
    >
      A controlled checkbox
    </IressCheckbox>
  );
}
```

#### Default Checked

For single checkboxes in uncontrolled mode the `defaultChecked` prop sets the default checked state.

```tsx
<IressCheckbox defaultChecked>
  A checkbox which is initially checked
</IressCheckbox>;
```

#### Indeterminate

The `indeterminate` prop sets the checkbox appearance to an indeterminate dash until it is clicked. It has no impact on the checkbox behavior beyond this purely visual indicator.

```tsx
<IressCheckbox indeterminate>
  A checkbox which is initially in an indeterminate state
</IressCheckbox>;
```

#### Hidden Label

When using a checkbox without a visible label, you must supply a label and apply the `hiddenLabel` property to still be accessible by screen readers.

```tsx
import { IressCheckbox, IressTable } from '@iress-oss/ids-components';

export function CheckboxWithTable() {
  return (
    <IressTable
      caption="List of investments"
      columns={[
        {
          format: (value: boolean) => (
            <IressCheckbox defaultChecked={value} hiddenLabel>
              Toggle row
            </IressCheckbox>
          ),
          key: 'select',
          label: 'Select',
          sort: true,
        },
        { key: 'name', label: 'Name' },
        { key: 'date', label: 'Date' },
        { key: 'cost', label: 'Cost' },
      ]}
      rows={[
        {
          select: false,
          name: 'Artemis Fund Managers Limited',
          date: '2019-09-23',
          cost: 23898.12,
        },
        {
          select: true,
          name: 'CASH.CASH',
          date: '2020-06-28',
          cost: 49751.43,
        },
      ]}
    />
  );
}
```

#### Read only

The `readOnly` prop changes how the checkbox is rendered. It will only render if the checkbox is checked (alongside a hidden input that contains the `value` if it was set), otherwise it will not be rendered.

```tsx
import { IressCheckbox, IressStack } from '@iress-oss/ids-components';

export function CheckboxReadOnly() {
  return (
    <IressStack>
      <IressCheckbox readOnly value="readOnly" defaultChecked>
        I agree to the terms and conditions
      </IressCheckbox>
      <IressCheckbox readOnly value="readOnly">
        I agree to the privacy policy
      </IressCheckbox>
    </IressStack>
  );
}
```

#### Variants

The checkbox component has multiple variants that can be used to change the appearance of the checkbox. The `variant` prop can be set to `default`, `card`, or `touch`.

- `card` variant is used to display the checkbox as a card, which is useful when the checkbox needs to contain more information than just a label.
- `touch` variant is used to display the checkbox with a larger touch target, which is useful for mobile devices.

```tsx
import { IressCheckbox, IressStack } from '@iress-oss/ids-components';

export function CheckboxVariants() {
  return (
    <IressStack gap="lg">
      <IressCheckbox variant="card" heading="Widget">
        A description of the widget
      </IressCheckbox>
      <IressCheckbox variant="touch">Touch variant</IressCheckbox>
    </IressStack>
  );
}
```

### Testing

Query checkboxes by their accessible role:

```tsx
const checkbox = screen.getByRole('checkbox', { name: 'Accept terms' });
```

#### Gotchas

- **readOnly mode**: When `readOnly` is set, the checkbox role is removed from
  the DOM entirely. Only the text label and a hidden `<input>` remain. If the
  checkbox is unchecked and readOnly, it renders nothing at all.
- **indeterminate state**: An indeterminate checkbox starts unchecked
  (`not.toBeChecked()`). Clicking it transitions to checked.

[View test roles/IDs](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-checkbox--docs#testing)


#### Test selectors

| Part | Description | Recommended Query | Test ID |
|------|-------------|-------------------|---------|
| main | The root wrapper element | — | `checkbox` |
| input | The checkbox input element | `getByRole('checkbox', { name: '...' })` | `checkbox__input` |
| checkboxMark | The visual checkbox indicator | — | `checkbox__checkboxMark` |

---

### Storybook

Storybook provides an interactive playground for testing different prop combinations, more complex recipes, all prop details, and accessibility attributes.

[View in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-checkbox--docs)

## Specifications

### Behaviour

| State | Behaviour |
|-------|-----------|
| Unchecked | Checkbox is empty, clicking toggles to checked |
| Checked | Checkbox shows a tick mark, clicking toggles to unchecked |
| Indeterminate | Checkbox shows a dash (visual only), clicking transitions to checked |
| Read only (checked) | Renders label text and hidden input only |
| Read only (unchecked) | Renders nothing |

### Accessibility

**WCAG compliance:**

- **4.1.2 Name, Role, Value** — Uses `role="checkbox"` with `aria-checked` state
- **1.3.1 Info and Relationships** — Label is programmatically associated via `<label>`
- **2.1.1 Keyboard** — Checkbox is focusable and togglable via keyboard

**Keyboard interaction:**

| Key | Action |
|-----|--------|
| `Space` | Toggles the checkbox checked state |
| `Tab` | Moves focus to the next focusable element |

### Edge cases

- **readOnly + unchecked**: Renders nothing — no DOM element present
- **indeterminate**: Purely visual; `aria-checked` reports the actual checked state
- **Within CheckboxGroup**: `checked` prop is ignored; group `value` controls state
- **hiddenLabel**: Label text exists for screen readers but is visually hidden

---

### Storybook

Storybook provides an interactive playground for testing different prop combinations and viewing accessibility attributes.

[View in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-checkbox--docs)

## Recipes

### With Table Data

```tsx
import { IressCheckbox, IressTable } from '@iress-oss/ids-components';

export function CheckboxWithTable() {
  return (
    <IressTable
      caption="List of investments"
      columns={[
        {
          format: (value: boolean) => (
            <IressCheckbox defaultChecked={value} hiddenLabel>
              Toggle row
            </IressCheckbox>
          ),
          key: 'select',
          label: 'Select',
          sort: true,
        },
        { key: 'name', label: 'Name' },
        { key: 'date', label: 'Date' },
        { key: 'cost', label: 'Cost' },
      ]}
      rows={[
        {
          select: false,
          name: 'Artemis Fund Managers Limited',
          date: '2019-09-23',
          cost: 23898.12,
        },
        {
          select: true,
          name: 'CASH.CASH',
          date: '2020-06-28',
          cost: 49751.43,
        },
      ]}
    />
  );
}
```


---

# Col

> Defines a column within a grid row layout.

## Import

```tsx
import { IressCol } from '@iress-oss/ids-components';
```

- [Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-col--docs)
- [Source](https://github.com/iress/design-system/tree/main/packages/components/src/components/Col)
- [Report issue](https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=col&title=[Col]+Bug:+)
- [Request feature](https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=col,enhancement&title=[Col]+Feature:+)

## Props

> Required props are **bold**.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| alignSelf | `center`, `end` , `start` , `stretch`  | — | Individual alignment of column |
| children | `ReactNode` | — | Any content you would like to be contained in a column. |
| offset | `[ResponsiveProp](../../dist/types.d.ts)<0 | 4 | "1" | 6 | 1 | "0" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | 2 | 3 | 5 | 7 | 8 | 9 | 10 | 11>` | — | Number of columns to offset. |
| span | `[ResponsiveProp](../../dist/types.d.ts)<4 | "1" | "auto" | 12 | 6 | 1 | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | 2 | 3 | 5 | 7 | 8 | 9 | 10 | 11 | "12">` | `auto` | Number of columns to span. |
| data-testid | `string` | — | The data-testid attribute is used to target elements in automated tests if no identifier is available. In some components it is propagated to child elements.  Notes: - Please use this prop sparingly and only when no other identifier is available, as per the guiding principles of Testing Library. - Only use this prop for your tests @see https://testing-library.com/docs/queries/bytestid |

📄 [Full type definition](../../dist/components/Col/Col.d.ts)

Also accepts all [styling props](../styling-props/overview.md) ([type definition](../../dist/interfaces.d.ts), [token values](../tokens/tokens-reference.md)).

Used in conjunction with the IressRow component to layout page content.

```tsx
<IressStack gap="spacing.4">
  <IressRow>
    <IressCol>
      <IressPlaceholder>1 of 2</IressPlaceholder>
    </IressCol>
    <IressCol>
      <IressPlaceholder>2 of 2</IressPlaceholder>
    </IressCol>
  </IressRow>
  <IressRow>
    <IressCol>
      <IressPlaceholder>1 of 3</IressPlaceholder>
    </IressCol>
    <IressCol>
      <IressPlaceholder>2 of 3</IressPlaceholder>
    </IressCol>
    <IressCol>
      <IressPlaceholder>3 of 3</IressPlaceholder>
    </IressCol>
  </IressRow>
</IressStack>;
```

## Design

### When to use

- **Grid layouts**: Divide content into columns within an `IressRow`
- **Responsive layouts**: Adjust column widths at different breakpoints. There are suggested max columns to show at each breakpoint (visible via the Specifications), but these are not hard rules. Use your judgement to determine the best layout for your content and users.

### When not to use

- **Simple horizontal spacing** — use [Inline](../components/inline.md) instead
- **Without a Row** — `IressCol` must be a direct child of `IressRow`

### Related patterns

- [Row](../components/row.md) — parent container for columns
- [Container](../components/container.md) — centres and pads page content
- [Inline](../components/inline.md) — simpler horizontal layout without grid semantics

## Develop

### Quick Start

```tsx
import { IressRow, IressCol } from '@iress-oss/ids-components';

<IressRow>
  <IressCol span="6">Left</IressCol>
  <IressCol span="6">Right</IressCol>
</IressRow>;
```

[View all props](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-col--docs#api-props)

### Usage

#### Auto-sized

When no column widths are specified the `IressCol` component will render equal width columns.

```tsx
<IressStack gap="spacing.4">
  <IressRow>
    <IressCol>
      <IressPlaceholder>1 of 2</IressPlaceholder>
    </IressCol>
    <IressCol>
      <IressPlaceholder>2 of 2</IressPlaceholder>
    </IressCol>
  </IressRow>
  <IressRow>
    <IressCol>
      <IressPlaceholder>1 of 3</IressPlaceholder>
    </IressCol>
    <IressCol>
      <IressPlaceholder>2 of 3</IressPlaceholder>
    </IressCol>
    <IressCol>
      <IressPlaceholder>3 of 3</IressPlaceholder>
    </IressCol>
  </IressRow>
</IressStack>;
```

#### Span

The `span` prop controls the number of grid columns the component should span.

If no `span` is provided it will default to `auto` which will make the column either fill the remaining space in the row (when used with a col number) or size evenly when used with other columns set to auto sizing.

```tsx
<IressStack gap="spacing.4">
  <IressRow>
    <IressCol span="12">
      <IressPlaceholder>12</IressPlaceholder>
    </IressCol>
  </IressRow>
  <IressRow>
    <IressCol span="1">
      <IressPlaceholder>1</IressPlaceholder>
    </IressCol>
    <IressCol>
      <IressPlaceholder>11</IressPlaceholder>
    </IressCol>
  </IressRow>
  <IressRow>
    <IressCol span="2">
      <IressPlaceholder>2</IressPlaceholder>
    </IressCol>
    <IressCol>
      <IressPlaceholder>10</IressPlaceholder>
    </IressCol>
  </IressRow>
  <IressRow>
    <IressCol span="3">
      <IressPlaceholder>3</IressPlaceholder>
    </IressCol>
    <IressCol>
      <IressPlaceholder>9</IressPlaceholder>
    </IressCol>
  </IressRow>
  <IressRow>
    <IressCol span="4">
      <IressPlaceholder>4</IressPlaceholder>
    </IressCol>
    <IressCol>
      <IressPlaceholder>8</IressPlaceholder>
    </IressCol>
  </IressRow>
  <IressRow>
    <IressCol span="5">
      <IressPlaceholder>5</IressPlaceholder>
    </IressCol>
    <IressCol>
      <IressPlaceholder>7</IressPlaceholder>
    </IressCol>
  </IressRow>
  <IressRow>
    <IressCol span="6">
      <IressPlaceholder>6</IressPlaceholder>
    </IressCol>
    <IressCol>
      <IressPlaceholder>6</IressPlaceholder>
    </IressCol>
  </IressRow>
</IressStack>;
```

#### Responsive span

The `span` prop can take an object that takes five key/value pairs that correlate with the IDS breakpoints. Any missing keys will fall back to the value defined for the next smallest key.

**Note:** If a `span` prop is provided an object but no value is given for `xs` it will default to `12`. This means that columns will be full width on screen sizes below the sizes you've specified.

```tsx
import {
  IressCol,
  IressRow,
  IressStack,
  IressText,
} from '@iress-oss/ids-components';

export function ColResponsiveSpan() {
  return (
    <IressStack gap="spacing.4">
      <IressRow>
        <IressCol span={{ xs: 12, md: 3 }}>
          <IressText>Sidebar (full width on mobile, 3/12 on desktop)</IressText>
        </IressCol>
        <IressCol span={{ xs: 12, md: 9 }}>
          <IressText>
            Main content (full width on mobile, 9/12 on desktop)
          </IressText>
        </IressCol>
      </IressRow>
    </IressStack>
  );
}
```

#### Offset

The `offset` prop controls the amount of grid columns to offset.

```tsx
<IressStack gap="spacing.4">
  <IressRow>
    <IressCol offset="1">
      <IressPlaceholder>1</IressPlaceholder>
    </IressCol>
  </IressRow>
  <IressRow>
    <IressCol offset="2">
      <IressPlaceholder>2</IressPlaceholder>
    </IressCol>
  </IressRow>
  <IressRow>
    <IressCol offset="3">
      <IressPlaceholder>3</IressPlaceholder>
    </IressCol>
  </IressRow>
  <IressRow>
    <IressCol offset="4">
      <IressPlaceholder>4</IressPlaceholder>
    </IressCol>
  </IressRow>
  <IressRow>
    <IressCol offset="5">
      <IressPlaceholder>5</IressPlaceholder>
    </IressCol>
  </IressRow>
  <IressRow>
    <IressCol offset="6">
      <IressPlaceholder>6</IressPlaceholder>
    </IressCol>
  </IressRow>
  <IressRow>
    <IressCol offset="7">
      <IressPlaceholder>7</IressPlaceholder>
    </IressCol>
  </IressRow>
  <IressRow>
    <IressCol offset="8">
      <IressPlaceholder>8</IressPlaceholder>
    </IressCol>
  </IressRow>
  <IressRow>
    <IressCol offset="9">
      <IressPlaceholder>9</IressPlaceholder>
    </IressCol>
  </IressRow>
  <IressRow>
    <IressCol offset="10">
      <IressPlaceholder>10</IressPlaceholder>
    </IressCol>
  </IressRow>
  <IressRow>
    <IressCol offset="11">
      <IressPlaceholder>11</IressPlaceholder>
    </IressCol>
  </IressRow>
</IressStack>;
```

#### Responsive offset

When a `ResponsiveSizing` object is passed into the `offset` prop, the offset will change at the specified breakpoints. It will apply to all breakpoints above the specified breakpoint.

For example, if you specify an offset for `md`, it will apply to `lg`, `xl` and `xxl` as well. If you want to change the offset at a specific breakpoint, you can pass in an object with the breakpoint as the key and the offset as the value.

```tsx
<IressStack gap="spacing.4">
  <IressRow>
    <IressCol offset={{ md: 5, lg: 2 }}>
      <IressPlaceholder>
        <IressText textAlign="center">
          offset: {'{'} md: 5, lg: 2 {'}'}
        </IressText>
      </IressPlaceholder>
    </IressCol>
  </IressRow>
</IressStack>;
```

#### Align self

The `alignSelf` prop controls the vertical alignment of the column (use if column alignment needs to differ from other columns in the row).

```tsx
<IressContainer>
  <IressRow
    style={{ border: '1px dashed hsl(43deg 100% 45%)', height: '10rem' }}
  >
    <IressCol alignSelf="start">
      <IressPlaceholder>Start</IressPlaceholder>
    </IressCol>
    <IressCol alignSelf="center">
      <IressPlaceholder>Center</IressPlaceholder>
    </IressCol>
    <IressCol alignSelf="end">
      <IressPlaceholder>End</IressPlaceholder>
    </IressCol>
    <IressCol alignSelf="stretch">
      <IressPlaceholder stretch>Stretch</IressPlaceholder>
    </IressCol>
  </IressRow>
</IressContainer>;
```

### Testing

`IressCol` is a layout primitive with no semantic role. Target its children
directly or use a `data-testid`:

```tsx
const col = screen.getByTestId('my-col');
```


#### Test selectors

| Part | Description | Recommended Query | Test ID |
|------|-------------|-------------------|---------|
| main | The root element of the col | — | `col` |

---

### Storybook

[View in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-col--docs)

## Specifications

### Behaviour

A CSS grid column wrapper. Supports `span`, `offset`, and `alignSelf` props with responsive object values.

| Breakpoint | Screen Widths |
|------------|---------------|
| `xs` | 0 - 575px |
| `sm` | 576px - 767px |
| `md` | 768px - 1023px |
| `lg` | 1024px - 1279px |
| `xl` | 1280px - 1599px |
| `xxl` | 1600px and above |

---

# Container

> Provides a max-width wrapper to constrain content within a page layout.

## Import

```tsx
import { IressContainer } from '@iress-oss/ids-components';
```

- [Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-container--docs)
- [Source](https://github.com/iress/design-system/tree/main/packages/components/src/components/Container)
- [Report issue](https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=container&title=[Container]+Bug:+)
- [Request feature](https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=container,enhancement&title=[Container]+Feature:+)

## Props

> Required props are **bold**.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | `ReactNode` | — | Content to be contained, usually used with `IressRow` and `IressCol`. |
| fluid | `boolean` | — | Container stretches to fill the width of the browser window if true. |
| data-testid | `string` | — | The data-testid attribute is used to target elements in automated tests if no identifier is available. In some components it is propagated to child elements.  Notes: - Please use this prop sparingly and only when no other identifier is available, as per the guiding principles of Testing Library. - Only use this prop for your tests @see https://testing-library.com/docs/queries/bytestid |

📄 [Full type definition](../../dist/components/Container/Container.d.ts)

Also accepts all [styling props](../styling-props/overview.md) ([type definition](../../dist/interfaces.d.ts), [token values](../tokens/tokens-reference.md)).

IressContainer provides a means to center and horizontally pad your site's contents.

```tsx
<IressContainer>
  <p>
    IressContainer improves the scannability and visual hierarchy of a user
    interface by snapping the layout to fixed max widths at different
    breakpoints.
  </p>
  <p>Try resizing the screen to see the difference.</p>
</IressContainer>;
```

## Design

### When to use

- **Page wrapper**: Centre content and apply consistent horizontal padding
- **Max-width constraint**: Prevent content from stretching too wide on large screens

### When not to use

- **Full-bleed layouts** — set `fluid` or use no container at all
- **Component-level spacing** — use [Stack](../components/stack.md) or [Inline](../components/inline.md)

### Related patterns

- [Row](../components/row.md) + [Col](../components/col.md) — grid layout within a container
- [Stack](../components/stack.md) — vertical spacing between sections

## Develop

### Quick Start

```tsx
import { IressContainer } from '@iress-oss/ids-components';

<IressContainer>
  <p>Centred content</p>
</IressContainer>;
```

[View all props](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-container--docs#api-props)

### Usage

The `IressContainer` snaps to fixed max widths at different breakpoints:

```tsx
<IressTable
  caption="Container breakpoints"
  rows={BREAKPOINTS.map((breakpoint) => ({
    breakpoint,
    screenWidths: BREAKPOINT_DETAILS[breakpoint].screenWidthRange,
    maxWidth: BREAKPOINT_DETAILS[breakpoint].containerMaxWidth,
  }))}
/>;
```

#### Fluid

If you want the `IressContainer` to fill its containing element, you can set the `fluid` prop. Resize the example below to see how the IressContainer is 100% for all screen sizes.

```tsx
<IressContainer fluid />;
```

### Testing

`IressContainer` is a layout primitive with no semantic role. Target its
children directly or use a `data-testid`:

```tsx
const container = screen.getByTestId('my-container');
```


#### Test selectors

| Part | Description | Recommended Query | Test ID |
|------|-------------|-------------------|---------|
| main | The root element of the container | — | `container` |

---

### Storybook

[View in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-container--docs)

## Specifications

### Behaviour

Centres content with horizontal padding. Snaps to fixed max-widths at each breakpoint unless `fluid` is set.

| Breakpoint | Screen Widths |
|------------|---------------|
| `xs` | 0 - 575px |
| `sm` | 576px - 767px |
| `md` | 768px - 1023px |
| `lg` | 1024px - 1279px |
| `xl` | 1280px - 1599px |
| `xxl` | 1600px and above |

---

# Divider

> Renders a horizontal or vertical line to visually separate content.

## Import

```tsx
import { IressDivider } from '@iress-oss/ids-components';
```

- [Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-divider--docs)
- [Source](https://github.com/iress/design-system/tree/main/packages/components/src/components/Divider)
- [Report issue](https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=divider&title=[Divider]+Bug:+)
- [Request feature](https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=divider,enhancement&title=[Divider]+Feature:+)

## Props

> Required props are **bold**.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| vertical | `boolean` | — | Change to a vertical divider. |
| data-testid | `string` | — | The data-testid attribute is used to target elements in automated tests if no identifier is available. In some components it is propagated to child elements.  Notes: - Please use this prop sparingly and only when no other identifier is available, as per the guiding principles of Testing Library. - Only use this prop for your tests @see https://testing-library.com/docs/queries/bytestid |

📄 [Full type definition](../../dist/components/Divider/Divider.d.ts)

Also accepts all [styling props](../styling-props/overview.md) ([type definition](../../dist/interfaces.d.ts), [token values](../tokens/tokens-reference.md)).

A divider is a UI element that separates content in lists and layouts.

```tsx
<IressDivider />;
```

## Design

### When to use

- **Separating content sections**: Visual break between distinct groups of content
- **List item separation**: Horizontal line between items in a vertical list
- **Toolbar separation**: Vertical divider between groups of actions in a toolbar

### When not to use

- **Creating borders around containers** — use card or box components with borders
- **Spacing content** — use layout components like `IressStack` with appropriate gap values

### Do's and Don'ts

| ✅ Do | ❌ Don't |
|-------|----------|
| Use within `IressStack` or `IressInline` layouts | Add dividers between every single element in a list |
| Use vertical dividers in horizontal layouts | Use dividers as decorative elements without semantic purpose |
| Let dividers inherit spacing from parent layout | Override gutter on every divider when layout spacing suffices |

### Related patterns

- [Stack](../components/stack.md) — vertical layout with consistent spacing
- [Inline](../components/inline.md) — horizontal layout with consistent spacing

## Develop

### Quick Start

```tsx
import { IressDivider } from '@iress-oss/ids-components';

<IressDivider />;
```

[View all props](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-divider--docs#api-props)

### Vertical divider

Use the `vertical` prop to change the divider from horizontal to vertical.

```tsx
<IressInline gap="spacing.4" verticalAlign="middle">
  <IressText>Separate</IressText>
  <IressDivider vertical />
  <IressText>this</IressText>
</IressInline>;
```

### Gutter

You can customise the gutter by using the `my` prop. If the divider is vertical, use the `mx` prop instead.

By default, dividers do not have a gutter, allowing them to adapt to `<IressStack>` and `<IressInline>` layouts.

```tsx
import {
  IressDivider,
  IressInline,
  IressPanel,
  IressText,
} from '@iress-oss/ids-components';

export function DividerGutter() {
  return (
    <IressInline gap="spacing.4">
      <IressPanel>
        <IressText element="h2">
          <code>my="none"</code>
        </IressText>
        <IressText>Separate</IressText>
        <IressDivider my="none" />
        <IressText>this</IressText>
      </IressPanel>
      <IressPanel>
        <IressText element="h2">
          <code>my="xs"</code>
        </IressText>
        <IressText>Separate</IressText>
        <IressDivider my="xs" />
        <IressText>this</IressText>
      </IressPanel>
      <IressPanel>
        <IressText element="h2">
          <code>my="sm"</code>
        </IressText>
        <IressText>Separate</IressText>
        <IressDivider my="sm" />
        <IressText>this</IressText>
      </IressPanel>
      <IressPanel>
        <IressText element="h2">
          <code>my="md"</code>
        </IressText>
        <IressText>Separate</IressText>
        <IressDivider my="md" />
        <IressText>this</IressText>
      </IressPanel>
      <IressPanel>
        <IressText element="h2">
          <code>my="lg"</code>
        </IressText>
        <IressText>Separate</IressText>
        <IressDivider my="lg" />
        <IressText>this</IressText>
      </IressPanel>
      <IressPanel>
        <IressText element="h2">
          <code>my="xl"</code>
        </IressText>
        <IressText>Separate</IressText>
        <IressDivider my="xl" />
        <IressText>this</IressText>
      </IressPanel>
    </IressInline>
  );
}
```

### Testing

Query the divider by its `separator` role:

```tsx
const divider = screen.getByRole('separator');
```


#### Test selectors

| Part | Description | Recommended Query | Test ID |
|------|-------------|-------------------|---------|
| main | The root element of the divider | `getByRole('separator')` | `divider` |

---

### Storybook

Storybook provides an interactive playground for testing different prop combinations and viewing accessibility attributes.

[View in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-divider--docs)

## Specifications

### Behaviour

| State | Behaviour |
|-------|-----------|
| Horizontal (default) | Renders a full-width horizontal line |
| Vertical | Renders a full-height vertical line |
| With gutter | Adds vertical (`my`) or horizontal (`mx`) spacing around the divider |

### Accessibility

**WCAG compliance:**

- **4.1.2 Name, Role, Value** — Renders with `role="separator"` for assistive technologies

**Keyboard interaction:**

Dividers are not interactive and do not receive focus.

---

### Storybook

Storybook provides an interactive playground for testing different prop combinations and viewing accessibility attributes.

[View in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-divider--docs)

---

# Expander

> Reveals or hides a section of content with an expand/collapse toggle.

## Import

```tsx
import { IressExpander } from '@iress-oss/ids-components';
```

- [Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-expander--docs)
- [Figma](https://www.figma.com/design/youFqYT4CgpKxfLJQv80hf/WIP-Iress-Design-System-V6?node-id=7305-30530)
- [Source](https://github.com/iress/design-system/tree/main/packages/components/src/components/Expander)
- [Report issue](https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=expander&title=[Expander]+Bug:+)
- [Request feature](https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=expander,enhancement&title=[Expander]+Feature:+)

## Props

> Required props are **bold**.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| **activator** | `ReactNode` | — | The element used to activate the expandable container. |
| activatorStyle | `[IressCustomiseSlot](../../dist/interfaces.d.ts)` | `{}` | This allows you to customise the content styling specifically, which is the floating element. It accepts an object with any of the styling properties available on `IressCSSProps`, as well as `className` and `style`. |
| children | `ReactNode` | — | Contents that will be expanded/collapsed when the expander is activated. |
| onChange | `((newValue: boolean) => void)` | — | Emitted when the open state changes. |
| mode | `link` , `section` | `section` | Controls the display mode of the activator element. Can be Section or Link. |
| open | `boolean` | `false` | When true the expandable container will be visible and the activator will display as open. |
| data-testid | `string` | — | The data-testid attribute is used to target elements in automated tests if no identifier is available. In some components it is propagated to child elements.  Notes: - Please use this prop sparingly and only when no other identifier is available, as per the guiding principles of Testing Library. - Only use this prop for your tests @see https://testing-library.com/docs/queries/bytestid |

📄 [Full type definition](../../dist/components/Expander/Expander.d.ts)

Also accepts all [styling props](../styling-props/overview.md) ([type definition](../../dist/interfaces.d.ts), [token values](../tokens/tokens-reference.md)).

Expanders are commonly used to reveal more information or details about an element or content on a page.

```tsx
import {
  IressExpander,
  IressStack,
  IressText,
} from '@iress-oss/ids-components';

export function ExpanderMode() {
  return (
    <IressStack gap="lg">
      <IressStack gap="xs">
        <IressText element="h2">Section (default)</IressText>
        <IressExpander activator="Expander activator" mode="section">
          Expander content will go here
        </IressExpander>
      </IressStack>
      <IressStack gap="xs">
        <IressText element="h2">Link</IressText>
        <IressExpander activator="Expander activator" mode="link">
          Expander content will go here
        </IressExpander>
      </IressStack>
    </IressStack>
  );
}
```

## Design

### When to use

- **Progressive disclosure**: Hide secondary content until the user requests it
- **Long pages**: Reduce page length by collapsing non-essential sections
- **Accordion patterns**: Group multiple expanders where only one (or more) can be open at a time
- **Inline details**: Use `link` mode for small "Learn more" or "See details" expansions

### When not to use

- **Navigation between views** — use Tabs or routing instead
- **Critical content** — don't hide essential information behind an expander
- **Very short content** — if the collapsed and expanded states are similar length, show it inline

### Do's and Don'ts

| ✅ Do | ❌ Don't |
|-------|----------|
| Use descriptive activator labels | Use vague labels like "Click here" |
| Use `section` mode for large content blocks | Hide form fields inside expanders |
| Use `link` mode for brief additional context | Nest expanders within expanders |
| Manage accordion state for exclusive opening | Leave all expanders open by default in an accordion |

### Content guidelines

- **Activator label**: Describe what will be revealed (e.g. "View transaction details")
- **Content**: Keep expanded content focused and relevant to the activator label

### Related patterns

- [Tab Set](../components/tab-set.md) — for switching between panels of related content
- [Modal](../components/modal.md) — for content that requires user focus

## Develop

### Quick Start

```tsx
import { IressExpander } from '@iress-oss/ids-components';

<IressExpander activator="Expander activator">
  Expander content will go here
</IressExpander>;
```

[View all props](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-expander--docs#api-props)

### Usage

#### Mode

The `mode` prop controls display style:

- `section` (default): for larger sections of rich content
- `link`: for small inline expansions

```tsx
import {
  IressExpander,
  IressStack,
  IressText,
} from '@iress-oss/ids-components';

export function ExpanderMode() {
  return (
    <IressStack gap="lg">
      <IressStack gap="xs">
        <IressText element="h2">Section (default)</IressText>
        <IressExpander activator="Expander activator" mode="section">
          Expander content will go here
        </IressExpander>
      </IressStack>
      <IressStack gap="xs">
        <IressText element="h2">Link</IressText>
        <IressExpander activator="Expander activator" mode="link">
          Expander content will go here
        </IressExpander>
      </IressStack>
    </IressStack>
  );
}
```

#### Open

The `open` prop controls the expanded state programmatically.

```tsx
<IressExpander activator="Expander activator" open>
  Expander content will go here
</IressExpander>;
```

#### Multiple expanders (accordion)

Use multiple expanders with controlled state for accordion behaviour.

```tsx
import { IressExpander, IressStack } from '@iress-oss/ids-components';
import { useState } from 'react';

export const MultipleExpander = () => {
  const [openActivator, setOpenActivator] = useState('');

  const handleChange = (newOpenActivator: string, open?: boolean) => {
    setOpenActivator(open ? newOpenActivator : '');
  };

  return (
    <IressStack gap="spacing.4">
      <IressExpander
        activator="Top"
        open={openActivator === 'top'}
        onChange={(open) => handleChange('top', open)}
      >
        Expander content for the top activator goes here.
      </IressExpander>
      <IressExpander
        activator="Bottom"
        open={openActivator === 'bottom'}
        onChange={(open) => handleChange('bottom', open)}
      >
        Expander content for the bottom activator goes here.
      </IressExpander>
    </IressStack>
  );
};
```

### Testing

Query the expander trigger by its button role:

```tsx
const trigger = screen.getByRole('button', { name: 'Show details' });
await user.click(trigger);
expect(trigger).toHaveAttribute('aria-expanded', 'true');
expect(screen.getByText('Expanded content')).toBeVisible();
```

[View test IDs](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-expander--docs#testing)


#### Test selectors

| Part | Description | Recommended Query | Test ID |
|------|-------------|-------------------|---------|
| main | The root element of the expander | — | `expander` |
| activator | The expand/collapse trigger button | `getByRole('button', { name: '...' })` | `expander__activator` |
| container | The collapsible content container (visible when expanded) | — | `expander__container` |

---

### Storybook

[View in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-expander--docs)

## Specifications

### Behaviour

| State | Behaviour |
|-------|-----------|
| Collapsed | Only the activator is visible; content is hidden |
| Expanded | Content is visible below the activator |
| Controlled | Open state driven by `open` prop |
| Accordion | Multiple expanders managed via state so only one is open at a time |

### Accessibility

**WCAG compliance:**

- **4.1.2 Name, Role, Value** — Activator uses `aria-expanded` to communicate state
- **2.1.1 Keyboard** — Activator is a button, fully keyboard accessible
- **1.3.1 Info and Relationships** — `aria-controls` links activator to content region

**References:** [W3 ARIA Disclosure Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/), [W3 ARIA Accordion Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/)

**Keyboard interaction:**

| Key | Action |
|-----|--------|
| `Enter` / `Space` | Toggle the expander open/closed |
| `Tab` | Move focus to/from the activator |

### Edge cases

- **Empty content**: Expander still toggles but shows nothing when expanded
- **Nested focusable content**: Focus moves naturally into expanded content on `Tab`
- **Animation**: Content animates open/closed; height transitions are handled internally

---

# FieldGroup

> Groups related form fields together with a shared legend, description, and validation message.

## Import

```tsx
import { IressFieldGroup } from '@iress-oss/ids-components';
```

- [Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-fieldgroup--docs)
- [Source](https://github.com/iress/design-system/tree/main/packages/components/src/components/FieldGroup)
- [Report issue](https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=field-group&title=[FieldGroup]+Bug:+)
- [Request feature](https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=field-group,enhancement&title=[FieldGroup]+Feature:+)

## Props

> Required props are **bold**.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | `ReactNode` | — | Should contain multiple `IressField`, or other elements supported in field group such as `IressButton`. |
| inline | `boolean` | — | Displays multiple children inline rather than stacked, with a small gap. |
| join | `boolean` | — | Displays multiple children inline and removes column gap. |
| data-testid | `string` | — | The data-testid attribute is used to target elements in automated tests if no identifier is available. In some components it is propagated to child elements.  Notes: - Please use this prop sparingly and only when no other identifier is available, as per the guiding principles of Testing Library. - Only use this prop for your tests @see https://testing-library.com/docs/queries/bytestid |
| required | `boolean` | — | When set to true, the 'required asterisk (*)' is displayed next to the label text. |
| hiddenLabel | `boolean` | — | Visually hides the label text, but still available to screen readers. |
| hint | `ReactNode` | — | Text to be displayed as supporting field description. |
| horizontal | `boolean` | — | Displays the label and input field inline instead of stacked vertically. |
| labelWidth | `string` | — | Controls the width of the label container when in horizontal mode. Can be any valid CSS width value (e.g., '200px', '20%', 'auto'). Only applies when `horizontal` is true. |
| htmlFor | `undefined` | — | Used to connect it to the input element, it should be the input's id. If provided, the label will be rendered as a `<label>` element, otherwise it will be rendered as a `<strong>` element.  [Learn more](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/for) |
| **label** | `ReactNode` | — | Text to be displayed in the label. |
| error | `ReactNode` | — | Validation error to be displayed above the field. |
| errorMessages | `[ValidationMessageObj](../../dist/interfaces.d.ts)[]` | — | Validation errors to be displayed above the field, an array of validation messages to be displayed in `IressValidationSummary`. |
| readOnly | `[FormControlReadOnly](../../dist/types.d.ts)` | — | Renders the group in a read-only state (no asterisk symbol). Use `'locked'` when the control is read-only due to permissions. |
| removeErrorMargin | `boolean` | — | Removes the reserved space for error messages, allowing fields to stack with narrower gaps. When true, no margin is reserved for potential error messages. |
| supplementary | `ReactNode` | — | Supplementary content to be displayed below the field. Is only shown when the field is not in an error state. |

📄 [Full type definition](../../dist/components/FieldGroup/FieldGroup.d.ts)

Also accepts all [styling props](../styling-props/overview.md) ([type definition](../../dist/interfaces.d.ts), [token values](../tokens/tokens-reference.md)).

Groups multiple related fields together using a `fieldset` and `legend` for accessibility.

```tsx
<IressFieldGroup label="Full name" inline>
  <IressField label="First name" htmlFor="firstName">
    <IressInput id="firstName" />
  </IressField>
  <IressField label="Last name" htmlFor="lastName">
    <IressInput id="lastName" />
  </IressField>
</IressFieldGroup>;
```

## Design

### When to use

- **Related inputs**: Group radio buttons, checkboxes, or inputs that share a common label (e.g. "Address" with street, city, postcode)
- **Inline fields**: Combine multiple short fields on one line (e.g. first name + last name)
- **Joined inputs**: Visually connect inputs that form a single value (e.g. phone prefix + number)

### When not to use

- **Single field with label** — use [Field](../components/field.md) instead
- **Unrelated fields** — don't group fields just for layout; use [Row](../components/row.md) and [Col](../components/col.md)

### Content guidelines

- **Legend**: Describe the group's purpose (e.g. "Contact details", "Payment method")
- Use sentence case for legends
- Keep legends concise — they're read by screen readers before each field in the group

### Related patterns

- [Field](../components/field.md) — for single input + label + error
- [Form](../patterns/form.md) — for full form patterns with validation
- [Inline](../components/inline.md) — for layout without fieldset semantics

## Develop

### Quick Start

```tsx
import {
  IressFieldGroup,
  IressField,
  IressInput,
} from '@iress-oss/ids-components';

<IressFieldGroup label="Full name" inline>
  <IressField label="First name">
    <IressInput />
  </IressField>
  <IressField label="Last name">
    <IressInput />
  </IressField>
</IressFieldGroup>;
```

[View all props](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-fieldgroup--docs#api-props)

### Usage

#### Inline

Fields arranged horizontally within the group.

```tsx
<IressFieldGroup label="Full name" inline>
  <IressField label="First name" htmlFor="firstName">
    <IressInput id="firstName" />
  </IressField>
  <IressField label="Last name" htmlFor="lastName">
    <IressInput id="lastName" />
  </IressField>
</IressFieldGroup>;
```

#### Inline with sink

Inline fields with error messages that sink below without disrupting layout.

```tsx
<form>
  <IressFieldGroup {...{ ...args, inputs: undefined }}>
    <IressField label="Emoji" htmlFor="emoji">
      <IressSelect
        width="2"
        id="emoji"
        options={[
          { label: '🐶', value: 'dog' },
          { label: '🐱', value: 'cat' },
          { label: '🐭', value: 'mouse' },
        ]}
        container={document.body}
      />
    </IressField>

    <IressField label="Title" htmlFor="title">
      <IressSelect
        native
        width="2"
        id="title"
        options={[
          { label: 'Mr', value: 'mr' },
          { label: 'Mrs', value: 'mrs' },
          { label: 'Miss', value: 'miss' },
        ]}
      />
    </IressField>

    <IressField label="First name" htmlFor="firstName" required>
      <IressInput id="firstName" required />
    </IressField>

    <IressField label="Last name" htmlFor="lastName" required>
      <IressInput id="lastName" required />
    </IressField>

    <IressButton type="submit">Submit</IressButton>

    <IressPopover
      activator={
        <IressButton>
          <IressIcon name="cog" />
        </IressButton>
      }
    >
      Settings goes here
    </IressPopover>
  </IressFieldGroup>
</form>;
```

#### Joined

Visually connected fields that form a single value.

```tsx
<IressFieldGroup label="Full name" join>
  <IressField label="First name" htmlFor="firstName">
    <IressInput id="firstName" />
  </IressField>
  <IressField label="Last name" htmlFor="lastName">
    <IressInput id="lastName" />
  </IressField>
</IressFieldGroup>;
```

#### Joined with sink

Joined fields with error sink behaviour.

```tsx
<form>
  <IressFieldGroup label="Full name" inline join>
    <IressField label="Emoji" htmlFor="emoji">
      <IressSelect
        width="2"
        id="emoji"
        options={[
          { label: '🐶', value: 'dog' },
          { label: '🐱', value: 'cat' },
          { label: '🐭', value: 'mouse' },
        ]}
        container={document.body}
      />
    </IressField>

    <IressField label="First name" htmlFor="firstName" required>
      <IressInput id="firstName" required />
    </IressField>

    <IressField label="Last name" htmlFor="lastName" required>
      <IressInput id="lastName" required />
    </IressField>

    <IressButton type="submit">Submit</IressButton>
  </IressFieldGroup>
</form>;
```

### Testing

Query the field group by its `group` role:

```tsx
const group = screen.getByRole('group', { name: 'Full name' });
```

[View test IDs](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-fieldgroup--docs#testing)

---

### Storybook

[View in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-fieldgroup--docs)

## Specifications

### Behaviour

| State | Behaviour |
|-------|-----------|
| Default | Renders a `<fieldset>` with a visible `<legend>` |
| Inline | Children arranged horizontally with gap |
| Join | Children visually connected (shared border radius) |
| Error | Individual child fields show their own errors |

### Accessibility

- Renders as `<fieldset>` with `<legend>` — screen readers announce the legend before each field
- **WCAG 1.3.1 Info and Relationships** — programmatic grouping communicates field relationships
- Use `IressFieldGroup` instead of wrapping with `role="group"` manually

### Keyboard interaction

| Key | Action |
|-----|--------|
| `Tab` | Moves between fields within the group |

### Edge cases

- **Nested groups**: Avoid nesting `IressFieldGroup` inside another `IressFieldGroup` — screen readers announce each legend
- **Single child**: Valid but unnecessary — use `IressField` directly

---

# Field

> Wraps a form control with its label, description, and validation message.

## Import

```tsx
import { IressField } from '@iress-oss/ids-components';
```

- [Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-field--docs)
- [Source](https://github.com/iress/design-system/tree/main/packages/components/src/components/Field)
- [Report issue](https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=field&title=[Field]+Bug:+)
- [Request feature](https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=field,enhancement&title=[Field]+Feature:+)

## Props

> Required props are **bold**.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| data-testid | `string` | — | The data-testid attribute is used to target elements in automated tests if no identifier is available. In some components it is propagated to child elements.  Notes: - Please use this prop sparingly and only when no other identifier is available, as per the guiding principles of Testing Library. - Only use this prop for your tests @see https://testing-library.com/docs/queries/bytestid |
| required | `boolean` | — | When set to true, the 'required asterisk (*)' is displayed next to the label text. |
| hiddenLabel | `boolean` | — | Visually hides the label text, but still available to screen readers. |
| hint | `ReactNode` | — | Text to be displayed as supporting field description. |
| horizontal | `boolean` | — | Displays the label and input field inline instead of stacked vertically. |
| labelWidth | `string` | — | Controls the width of the label container when in horizontal mode. Can be any valid CSS width value (e.g., '200px', '20%', 'auto'). Only applies when `horizontal` is true. |
| htmlFor | `string` | — | Used to connect it to the input element, it should be the input's id. If provided, the label will be rendered as a `<label>` element, otherwise it will be rendered as a `<strong>` element.  [Learn more](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/for) |
| **label** | `ReactNode` | — | Text to be displayed in the label. |
| error | `ReactNode` | — | Validation error to be displayed above the field. |
| errorMessages | `[ValidationMessageObj](../../dist/interfaces.d.ts)[]` | — | Validation errors to be displayed above the field, an array of validation messages to be displayed in `IressValidationSummary`. |
| readOnly | `[FormControlReadOnly](../../dist/types.d.ts)` | — | Renders the group in a read-only state (no asterisk symbol). Use `'locked'` when the control is read-only due to permissions. |
| removeErrorMargin | `boolean` | `false` | Removes the reserved space for error messages, allowing fields to stack with narrower gaps. When true, no margin is reserved for potential error messages. |
| supplementary | `ReactNode` | — | Supplementary content to be displayed below the field. Is only shown when the field is not in an error state. |

📄 [Full type definition](../../dist/components/Field/Field.d.ts)

Also accepts all [styling props](../styling-props/overview.md) ([type definition](../../dist/interfaces.d.ts), [token values](../tokens/tokens-reference.md)).

The field component is used to place label, hint and error information around form controls.

```tsx
<IressField
  label={
    <>
      <IressIcon name="home" /> Find your address
    </>
  }
>
  <IressInput id="address" name="address" />
</IressField>;
```

## Design

### When to use

- **Form inputs**: Wrap any form control with a label, hint text, and error messages
- **Read-only data**: Display data in a form-like layout with labels
- **Grouped fields**: Use `IressFieldGroup` for multiple related inputs (e.g. checkbox groups)

### When not to use

- **Out-of-the-box validation** — use `IressFormField` inside `IressForm` instead
- **Standalone labels** — use `IressLabel` directly if Field is too restrictive

### Do's and Don'ts

| ✅ Do | ❌ Don't |
|-------|----------|
| Always provide a `label` prop | Leave form controls without a label |
| Use `hint` for supplementary guidance | Put lengthy instructions in the label |
| Use `errorMessages` for validation feedback | Use `disabled` fields — keep enabled and validate on interaction |
| Use `required` to show the asterisk indicator | Hide required indicators from users |

### Content guidelines

- **Labels**: Use sentence case, keep concise (e.g. "Email address", "Date of birth")
- **Hints**: Provide format or requirement info (e.g. "Must be at least 8 characters")
- **Errors**: Explain what went wrong and how to fix it

### Related patterns

- [Label](../components/label.md) — standalone label component
- [Field Group](../components/field-group.md) — for grouping multiple related fields
- [Form](../patterns/form.md) — provides validation with `IressFormField`

## Develop

### Quick Start

```tsx
import { IressField, IressInput } from '@iress-oss/ids-components';

<IressField label="First name">
  <IressInput id="first-name" />
</IressField>;
```

[View all props](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-field--docs#api-props)

### Usage

#### Label

The `label` prop is required to describe the field.

```tsx
<IressField
  label={
    <>
      <IressIcon name="home" /> Find your address
    </>
  }
>
  <IressInput id="address" name="address" />
</IressField>;
```

#### Hint

Provide extra information using the `hint` prop. Accepts any React node.

```tsx
<IressField
  label="Email address"
  hint="For us to be able to contact you in the future"
>
  <IressInput id="email" name="email" required type="email" />
</IressField>;
```

#### Error message

Display errors with the `errorMessages` prop (array of `ValidationMessageObj`).

```tsx
<IressField
  label="Error message"
  errorMessages={[{ message: 'This field is required' }]}
>
  <IressInput id="name" name="name" required />
</IressField>;
```

#### Custom error

Use the `error` prop for custom error markup (e.g. icons).

```tsx
<IressField
  label="Custom error"
  error={
    <IressText element="small" color="colour.system.danger.text">
      This is a custom error message
    </IressText>
  }
>
  <IressInput id="name" name="name" required />
</IressField>;
```

#### Hidden label

Use `hiddenLabel` to accessibly hide the label (e.g. for search fields).

```tsx
<IressField
  label="This label is hidden"
  hint="This hint text is hidden"
  hiddenLabel
>
  <IressInput id="name" name="input1" required type="text" />
</IressField>;
```

Fields with hidden labels should still provide error feedback in an accessible way, either via `error` or `errorMessages`.

```tsx
<IressField
  label="This label is hidden"
  hint="This hint text is hidden"
  error={
    <IressText element="small" color="colour.system.danger.text">
      Even fields with hidden labels will show their validation message
    </IressText>
  }
  hiddenLabel
>
  <IressInput id="name" name="input1" required type="text" />
</IressField>;
```

#### Required

Fields marked `required` display an asterisk on the label.

```tsx
<IressField label="This field is required" required>
  <IressInput id="name" name="input1" required type="text" />
</IressField>;
```

#### Readonly data

Display read-only data in a form-like layout. Use `readOnly="locked"` for permission-based read-only with a lock icon.

```tsx
<IressField label="First name" hint="This field is readonly" readOnly required>
  <IressReadonly />
</IressField>;
```

#### Supplementary

The `supplementary` prop displays metadata based on the field value (e.g. calculated values). Only shown when the field is not in an error state.

```tsx
import { useState } from 'react';
import {
  IressField,
  IressInput,
  IressStack,
  IressToggle,
} from '@iress-oss/ids-components';

export function FieldSupplementary() {
  const [error, setError] = useState<string | undefined>();

  return (
    <IressStack gap="spacing.5">
      <IressToggle
        onChange={(checked) =>
          setError(checked ? 'This field is required' : undefined)
        }
        checked={error !== undefined}
      >
        Show error
      </IressToggle>
      <IressField
        label="First name"
        supplementary="I only show if there is no error"
        error={error}
      >
        <IressInput id="name" name="input1" required type="text" />
      </IressField>
    </IressStack>
  );
}
```

#### Horizontal layout

Use `horizontal` for label and input on the same line. In horizontal mode, hints display as a tooltip.

```tsx
<IressField
  horizontal
  labelWidth="250px"
  label="Email address"
  hint="Enter your email address for contact"
  supplementary="We will not share your email with third parties (Supplementary text)"
>
  <IressInput
    id="email"
    name="email"
    required
    type="email"
    placeholder="john.doe@example.com"
  />
</IressField>;
```

#### Remove error margin

Use `removeErrorMargin` to remove reserved space for error messages for tighter spacing.

```tsx
import { useState } from 'react';
import {
  IressCol,
  IressField,
  IressInline,
  IressInput,
  IressRow,
  IressStack,
  IressText,
  IressToggle,
} from '@iress-oss/ids-components';

export function FieldRemoveErrorMargin() {
  const [removeErrorMargin, setRemoveErrorMargin] = useState(false);
  const [showError, setShowError] = useState(false);

  const fieldProps = {
    removeErrorMargin,
    ...(showError
      ? {
          errorMessages: [{ message: 'This field is required' }],
        }
      : {}),
  };

  const fieldPropsWithContent = {
    removeErrorMargin,
    ...(showError
      ? {
          errorMessages: [{ message: 'This field is required' }],
        }
      : {
          supplementary: 'This is always-displayed supplementary text',
        }),
  };

  return (
    <IressStack gap="spacing.5">
      <IressInline gap="spacing.4">
        <IressToggle
          onChange={(checked) => setRemoveErrorMargin(checked)}
          checked={removeErrorMargin}
        >
          Remove error margin (tighter field spacing)
        </IressToggle>

        <IressToggle
          onChange={(checked) => setShowError(checked)}
          checked={showError}
        >
          Show error message
        </IressToggle>
      </IressInline>

      <IressRow gutter="spacing.6">
        <IressCol span="6">
          <IressStack gap="spacing.2">
            <IressText element="h3">Vertical Label Layout</IressText>
            <IressStack gap="spacing.0">
              <IressField {...fieldProps} label="First Name">
                <IressInput placeholder="Enter first name" />
              </IressField>
              <IressField {...fieldPropsWithContent} label="Last Name">
                <IressInput placeholder="Enter last name" />
              </IressField>
              <IressField {...fieldProps} label="Email Address">
                <IressInput type="email" placeholder="Enter email" />
              </IressField>
            </IressStack>
          </IressStack>
        </IressCol>

        <IressCol span="6">
          <IressStack gap="spacing.2">
            <IressText element="h3">Horizontal Label Layout</IressText>
            <IressStack gap="spacing.0">
              <IressField
                {...fieldProps}
                horizontal
                labelWidth="120px"
                label="First Name"
              >
                <IressInput placeholder="Enter first name" />
              </IressField>
              <IressField
                {...fieldPropsWithContent}
                horizontal
                labelWidth="120px"
                label="Last Name"
              >
                <IressInput placeholder="Enter last name" />
              </IressField>
              <IressField
                {...fieldProps}
                horizontal
                labelWidth="120px"
                label="Email Address"
              >
                <IressInput type="email" placeholder="Enter email" />
              </IressField>
            </IressStack>
          </IressStack>
        </IressCol>
      </IressRow>
    </IressStack>
  );
}
```

### Testing

`IressField` is a wrapper — query the child form control by its accessible role:

```tsx
render(
  <IressField label="Email" htmlFor="email">
    <input id="email" type="email" />
  </IressField>,
);

const input = screen.getByRole('textbox', { name: 'Email' });
expect(input).toBeInTheDocument();
```

[View test IDs](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-field--docs#testing)


#### Test selectors

| Part | Description | Recommended Query | Test ID |
|------|-------------|-------------------|---------|
| main | The root wrapper element (a div with no role) | No role-based query — use `getByTestId('field')`. To query the child input, use `getByRole('textbox', { name: '...' })` or `getByLabelText('...')` | `field` |
| label | The field label element | `getByText('...')` | `field__label` |
| hint | The hint text below the label | `getByText('...')` | `field__hint` |
| error | The error message container | `getByText('...')` | `field__error` |

---

### Storybook

[View in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-field--docs)

## Specifications

### Behaviour

| State | Behaviour |
|-------|-----------|
| Default | Label and input displayed vertically with reserved error space |
| Label click | Clicking the label focuses its associated form control |
| With hint | Hint text appears below the label |
| With error | Error messages appear below the input; supplementary is hidden |
| Horizontal | Label and input on the same line; hint shown as tooltip |
| Read only | Displays value as text; removes form control appearance |
| Required | Asterisk prepended to label |

### Accessibility

**WCAG compliance:**

- **1.3.1 Info and Relationships** — Label is programmatically associated with the input via `htmlFor`
- **3.3.1 Error Identification** — Errors are described via `aria-describedby`
- **3.3.2 Labels or Instructions** — Label and hint text provide clear instructions

**Keyboard interaction:**

| Key | Action |
|-----|--------|
| `Tab` | Move focus to the form control within the field |

### Edge cases

- **No children**: Field renders label, hint, and error without an input
- **Nested test ID propagation**: `my-field__label__text` reaches the label text span
- **Conditional hint/error**: `__hint` and `__error` test IDs only appear when those props are provided
- **Horizontal on mobile**: Consider vertical layout for smaller screens

---

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

## Props

> Required props are **bold**.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| **children** | `ReactNode` | — | Content to hide. |
| **hiddenOn** | `[ResponsiveProp](../../dist/types.d.ts)<boolean>` | — | Content will be hidden on any screen sizes that are set to true. |
| visuallyHidden | `boolean` | — | If true, the content will not be visible, but will be available to screen readers |
| data-testid | `string` | — | The data-testid attribute is used to target elements in automated tests if no identifier is available. In some components it is propagated to child elements.  Notes: - Please use this prop sparingly and only when no other identifier is available, as per the guiding principles of Testing Library. - Only use this prop for your tests @see https://testing-library.com/docs/queries/bytestid |

📄 [Full type definition](../../dist/components/Hide/Hide.d.ts)

Also accepts all [styling props](../styling-props/overview.md) ([type definition](../../dist/interfaces.d.ts), [token values](../tokens/tokens-reference.md)).

> ⚠️ **Deprecated:** `IressHide` has been deprecated. Use the `srOnly`, `hideFrom`, and `hideBelow` styling props instead. See [Styling Props — Accessibility](../styling-props/accessibility.md) for details.

Makes it easier to create adaptive designs that show or hide content based on screen size.

```tsx
<IressStack gap="spacing.1">
  <IressHide hiddenOn={{ xs: true }}>
    <IressText>This text is hidden on xs screens and above.</IressText>
  </IressHide>
  <IressHide hiddenOn={{ md: true }}>
    <IressText color="colour.system.success.text">
      This text is hidden on md screens and above.
    </IressText>
  </IressHide>
  <IressHide hiddenOn={{ xs: true, lg: false }}>
    <IressText color="colour.system.danger.text">
      This text is hidden on md screens and below.
    </IressText>
  </IressHide>
  <IressHide hiddenOn={{ xs: true, sm: false }}>
    <IressText color="colour.system.info.text">
      This text is hidden on xs screens only.
    </IressText>
  </IressHide>
  <IressHide hiddenOn={{ xl: true, xxl: false }}>
    <IressText color="colour.neutral.70">
      This text is hidden on xl screens only.
    </IressText>
  </IressHide>
</IressStack>;
```

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
</IressHide>;
```

[View all props](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-hide--docs#api-props)

### Usage

#### `hiddenOn`

The `hiddenOn` prop accepts a responsive object. Set a breakpoint to `true` to hide content from that breakpoint upward. Set it to `false` to make content visible again at a larger breakpoint.

```tsx
<IressStack gap="spacing.1">
  <IressHide hiddenOn={{ xs: true }}>
    <IressText>This text is hidden on xs screens and above.</IressText>
  </IressHide>
  <IressHide hiddenOn={{ md: true }}>
    <IressText color="colour.system.success.text">
      This text is hidden on md screens and above.
    </IressText>
  </IressHide>
  <IressHide hiddenOn={{ xs: true, lg: false }}>
    <IressText color="colour.system.danger.text">
      This text is hidden on md screens and below.
    </IressText>
  </IressHide>
  <IressHide hiddenOn={{ xs: true, sm: false }}>
    <IressText color="colour.system.info.text">
      This text is hidden on xs screens only.
    </IressText>
  </IressHide>
  <IressHide hiddenOn={{ xl: true, xxl: false }}>
    <IressText color="colour.neutral.70">
      This text is hidden on xl screens only.
    </IressText>
  </IressHide>
</IressStack>;
```

#### Visually hidden

Use `visuallyHidden` for content that should be accessible to screen readers but not visible on screen:

```tsx
<IressStack gap="spacing.1">
  <IressHide visuallyHidden hiddenOn={{ xs: true }}>
    <IressText>This text is visually hidden on xs screens and above.</IressText>
  </IressHide>
  <IressHide visuallyHidden hiddenOn={{ md: true }}>
    <IressText color="colour.system.success.text">
      This text is visually hidden on md screens and above.
    </IressText>
  </IressHide>
</IressStack>;
```

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

| Breakpoint | Screen Widths |
|------------|---------------|
| `xs` | 0 - 575px |
| `sm` | 576px - 767px |
| `md` | 768px - 1023px |
| `lg` | 1024px - 1279px |
| `xl` | 1280px - 1599px |
| `xxl` | 1600px and above |

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

---

# Icon

> Renders an SVG icon from the design system icon set.

## Import

```tsx
import { IressIcon } from '@iress-oss/ids-components';
```

- [Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-icon--docs)
- [Source](https://github.com/iress/design-system/tree/main/packages/components/src/components/Icon)
- [Report issue](https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=icon&title=[Icon]+Bug:+)
- [Request feature](https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=icon,enhancement&title=[Icon]+Feature:+)

## Props

> Required props are **bold**.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| data-testid | `string` | — | The data-testid attribute is used to target elements in automated tests if no identifier is available. In some components it is propagated to child elements.  Notes: - Please use this prop sparingly and only when no other identifier is available, as per the guiding principles of Testing Library. - Only use this prop for your tests @see https://testing-library.com/docs/queries/bytestid |
| filled | `boolean` | `false` | Filled variant for Material Symbols When true, icon uses filled style (fill=1) Useful for active/selected states |
| fixedWidth | `boolean` | — | Adds fixed width class for Font Awesome icons - fa-fw @deprecated Font Awesome specific. Material Symbols inherit text size automatically. |
| **name** | [MaterialSymbol](https://fonts.google.com/icons?icon.set=Material+Symbols) | — | The name of the icon. Note: Font Awesome is deprecated. Please migrate to Material Symbols. |
| screenreaderText | `string` | — | Adds screen reader text if the icon needs to be visible to screen reader users |
| rotate | 180 , `270`, 90  | — | Amount of degrees to rotate the icon. |
| flip | `both` , `horizontal` , `vertical` | — | Flip the icon horizontally, vertically or both axes. |
| set | `fab`, `fal`  | `'fal'` | The icon set to be used (Font Awesome only): - `fal`: Font Awesome Light - `fab`: Font Awesome Brand @deprecated Font Awesome is deprecated. Please migrate to Material Symbols. |
| spin | `half`, 1 , 2 , 3  | — | Accepts a numeric value for speed for one rotation. |
| type | `IconType` | — | The icon provider to use Note: Font Awesome is deprecated. Please migrate to Material Symbols. |

📄 [Full type definition](../../dist/components/Icon/Icon.d.ts)

Also accepts all [styling props](../styling-props/overview.md) ([type definition](../../dist/interfaces.d.ts), [token values](../tokens/tokens-reference.md)).

Icons enhance experiences by visually communicating meaning, actions, status, and feedback.

```tsx
<IressIcon name="home" screenreaderText="Home" />;
```

## Design

### When to use

- **Enhancing labels**: Pair with text to reinforce meaning (e.g. a warning icon next to an error message)
- **Button/link affordances**: Communicate actions like "edit", "delete", or "external link"
- **Status indicators**: Represent states like success, error, or loading (with `spin`)
- **Navigation cues**: Directional icons for menus, breadcrumbs, and accordions

### When not to use

- **Decorative imagery** — use [Image](../components/image.md) for illustrations or photos
- **Icon as the only interactive element without a label** — use an `IressButton` with `screenreaderText` instead
- **Complex illustrations** — use `IressImage` with styled SVG/illustrations

### Do's and Don'ts

| ✅ Do | ❌ Don't |
|-------|----------|
| Add `screenreaderText` when an icon conveys meaning | Use icons purely for decoration without hiding from assistive tech |
| Use Material Symbols (the default icon set) | Continue using Font Awesome for new work (deprecated) |
| Let icons inherit size from parent | Manually set icon sizes (the `size` prop has been removed) |
| Use `filled` to indicate active/selected states | Use colour alone to distinguish icon states |

### Content guidelines

- **`screenreaderText`**: Use a concise description of what the icon represents (e.g. "Close", "External link"), not a description of the icon itself (e.g. "X mark", "Arrow")
- **Decorative icons**: Icons alongside text labels don't need `screenreaderText` — hide them from screen readers
- **Consistency**: Use the same icon for the same concept throughout your application

#### Icon reference

A list of all the icons available in the Iress Design System. If you can't find the icon you are looking for, please refer to the [Material Symbols documentation](https://fonts.google.com/icons?icon.style=Rounded&icon.set=Material+Symbols).

Icons use [Material Symbols](https://fonts.google.com/icons?icon.set=Material+Symbols) via the `name` prop. The AI model already knows Material Symbol names — use any valid name directly.

```tsx
<IressIcon name="home" />
<IressIcon name="settings" filled />
<IressIcon name="arrow_forward" />
```

Also supports legacy Font Awesome names (e.g. `info-circle`, `times`, `chevron-down`) for migration compatibility.

### Related patterns

- [Image](../components/image.md) — for photos, illustrations, and larger visual content
- [Button](../components/button.md) — icon buttons with labels for accessible actions
- [Spinner](../components/spinner.md) — for animated loading indicators

## Develop

### Quick Start

```tsx
import { IressIcon } from '@iress-oss/ids-components';

<IressIcon name="home" />;
```

[View all props](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-icon--docs#api-props)

### Installation

#### Material Symbols

From version 6, the `IressIcon` component supports Material Symbols icons from Google as this is the new icon library being used in new Iress designs.

**Option 1: Automatic loading with `IressProvider` (recommended)**

If you are already using the `IressProvider` component in your application, no further action is required as the Material Symbols font will be automatically loaded for you as it contains the `IressIconProvider` component. The same applies if you are using `IressShadow`, which includes `IressProvider` internally.

```tsx
import { IressProvider } from '@iress-oss/ids-components';

<IressProvider>{/* Your application */}</IressProvider>;
```

<Details>
<summary>Shadow DOM (Microfrontends)</summary>

If you are using Microfrontends or Web Components that use Shadow DOM, you need to ensure that the Material Symbols font is loaded in the parent application as well as the Microfrontend or Web Component. This is because `@font-face` declarations are not supported inside the Shadow DOM.

The `IressProvider` component takes care of this for you when you use it with the `container` prop, which accepts a `HTMLElement` or `Ref<HTMLElement>`.

Or even easier, use `IressShadow` as your root component which includes `IressProvider` with the correct configuration for Shadow DOM.

</Details>

**Option 2: Using the `IressIconProvider`**

For more simpler applications, or if you need to customise the icon provider independently, you can use the `IressIconProvider` directly.

> **Note:** If you are already using `IressProvider` or `IressShadow`, you do not need to add `IressIconProvider` separately — it is already included.

```tsx
import { IressIconProvider } from '@iress-oss/ids-components';
<IressIconProvider>{/* Your application */}</IressIconProvider>;
```

**Option 3: Manual font loading**

If you prefer to manually load the Material Symbols font, you can add the following `<link />` tag to the `<head />` of your application:

```html
<link
  href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,300,0..1,0"
  rel="stylesheet"
/>
```

#### Font Awesome (Deprecated)

> **Deprecation Notice**
>
> The Font Awesome icon library will be removed in a future release. Please migrate to Material Symbols as soon as possible.

If you are planning to include the `<IressIcon />` component in your application, you need to include the Font Awesome CSS.

The easiest way to import the Font Awesome CSS is to use the `combined.css` file and add it to the `<head />` if your application. This file includes both the [Pro Light](https://fontawesome.com/v5/search?o=r&s=light) and [Brand](https://fontawesome.com/v5/search?o=r&f=brands) icon sets.

```html
<link
  href="https://cdn.iress.com/icons/5.15.4/css/combined.min.css"
  rel="stylesheet"
/>
```

<Details>
<summary>Shadow DOM (Microfrontends)</summary>

If you are using Microfrontends or Web Components that use Shadow DOM, you need to ensure that the Font Awesome CSS is loaded in the parent application as well as the Microfrontend or Web Component. This is because styles are not inherited inside the Shadow DOM.

The easiest way to do this is to use the `IressIconProvider` component with the `container` prop.

```tsx
import { IressIconProvider } from '@iress-oss/ids-components';
<IressIconProvider container={document.head}>
  {/* Your application */}
</IressIconProvider>;
```

</Details>

**Making Font Awesome icons the default**

From version 6, the default icon type is Material Symbols. If you want to make Font Awesome the default icon type, you can wrap your application in the `IressIconProvider` component.

```tsx
import { IressIconProvider } from '@iress-oss/ids-components';
<IressIconProvider type="fontawesome">
  {/* Your application */}
</IressIconProvider>;
```

### Screen Reader Text

By default icons are hidden from screen readers. The `screenreaderText` prop makes icons visible to screen readers users, providing a description of the icon.

```tsx
<IressIcon name="home" screenreaderText="Home" />;
```

### Filled

The `filled` prop allows you to use a filled version of the icon, usually to indicate an active state.

```tsx
import { IressIcon, IressInline, IressText } from '@iress-oss/ids-components';

export function IconFilled() {
  return (
    <IressInline gap="md">
      <IressText textAlign="center">
        <IressIcon name="favorite" textStyle="typography.heading.1" />
        <br />
        (default)
      </IressText>
      <IressText textAlign="center">
        <IressIcon name="favorite" filled textStyle="typography.heading.1" />
        <br />
        filled
      </IressText>
    </IressInline>
  );
}
```

### Flip

The `flip` prop can be set to horizontal, vertical or both.

```tsx
import {
  IressIcon,
  IressInline,
  IressStack,
  IressText,
} from '@iress-oss/ids-components';

export function IconFlip() {
  return (
    <IressInline gap="md">
      <IressStack horizontalAlign="center">
        <IressIcon name="home" textStyle="typography.heading.1" />
        <IressText>(default)</IressText>
      </IressStack>
      <IressStack horizontalAlign="center">
        <IressIcon
          name="home"
          textStyle="typography.heading.1"
          flip="horizontal"
        />
        <IressText>horizontal</IressText>
      </IressStack>
      <IressStack horizontalAlign="center">
        <IressIcon
          name="home"
          textStyle="typography.heading.1"
          flip="vertical"
        />
        <IressText>vertical</IressText>
      </IressStack>
      <IressStack horizontalAlign="center">
        <IressIcon name="home" textStyle="typography.heading.1" flip="both" />
        <IressText>both</IressText>
      </IressStack>
    </IressInline>
  );
}
```

### Rotate

The `rotate` prop can be set to 90, 180 or 270 degrees.

```tsx
import { IressIcon, IressInline, IressText } from '@iress-oss/ids-components';

export function IconRotate() {
  return (
    <IressInline gap="md">
      <IressText textAlign="center">
        <IressIcon name="home" textStyle="typography.heading.1" />
        <br />
        (default)
      </IressText>
      <IressText textAlign="center">
        <IressIcon name="home" textStyle="typography.heading.1" rotate={90} />
        <br />
        90
      </IressText>
      <IressText textAlign="center">
        <IressIcon name="home" textStyle="typography.heading.1" rotate={180} />
        <br />
        180
      </IressText>
      <IressText textAlign="center">
        <IressIcon name="home" textStyle="typography.heading.1" rotate={270} />
        <br />
        270
      </IressText>
    </IressInline>
  );
}
```

### Spin

The `spin` prop can be set to half (fastest), 1, 2 or 3 (slowest) to control the speed of the icon spin animation, useful for loading spinners.

```tsx
import { IressIcon, IressInline, IressText } from '@iress-oss/ids-components';

export function IconSpin() {
  return (
    <IressInline gap="md">
      <IressText>
        <IressIcon name="spinner" screenreaderText="Loading..." spin="half" />{' '}
        half
      </IressText>
      <IressText>
        <IressIcon name="spinner" screenreaderText="Loading..." spin={1} /> 1
      </IressText>
      <IressText>
        <IressIcon name="spinner" screenreaderText="Loading..." spin={2} /> 2
      </IressText>
      <IressText>
        <IressIcon name="spinner" screenreaderText="Loading..." spin={3} /> 3
      </IressText>
    </IressInline>
  );
}
```

### External link

Icons now inherit the size of the parent component. This means you can use them inside buttons, links and other components without needing to set a size.

```tsx
<IressLink
  href="https://www.iress.com/"
  target="_blank"
  rel="noreferrer"
  append={
    <IressIcon
      name="external-link"
      pl="spacing.2"
      screenreaderText="(Opens in a new tab)"
    />
  }
>
  Go to this link
</IressLink>;
```

### Reference

A list of all the icons available in the Iress Design System (Material Symbols only, as Font Awesome is deprecated).

If you can't find the icon you are looking for, please refer to the [Material Symbols documentation](https://fonts.google.com/icons?icon.style=Rounded&icon.set=Material+Symbols).

Icons use [Material Symbols](https://fonts.google.com/icons?icon.set=Material+Symbols) via the `name` prop. The AI model already knows Material Symbol names — use any valid name directly.

```tsx
<IressIcon name="home" />
<IressIcon name="settings" filled />
<IressIcon name="arrow_forward" />
```

Also supports legacy Font Awesome names (e.g. `info-circle`, `times`, `chevron-down`) for migration compatibility.

### Migrating from Font Awesome

To help with migrating, we have mapped some common Font Awesome icons to their Material Symbols equivalents.

As of version 6, these names will automatically be mapped when using the `IressIcon` component with the default `type` of `material`. However, we strongly recommend you change them to the material equivalent as soon as possible as the automatic mapping will be removed in a future release.

| Font Awesome | Material Symbol |
|-------------|-----------------|
| `times-circle` | `cancel` |
| `lock-alt` | `lock` |
| `chevron-down` | `keyboard_arrow_down` |
| `chevron-up` | `keyboard_arrow_up` |
| `chevron-left` | `keyboard_arrow_left` |
| `chevron-right` | `keyboard_arrow_right` |
| `chevron-double-down` | `keyboard_double_arrow_down` |
| `chevron-double-up` | `keyboard_double_arrow_up` |
| `chevron-circle-down` | `expand_circle_down` |
| `arrow-left` | `arrow_back` |
| `arrow-right` | `arrow_forward` |
| `arrow-up` | `arrow_upward` |
| `arrow-down` | `arrow_downward` |
| `user-circle` | `account_circle` |
| `power-off` | `power_settings_new` |
| `ellipsis-v` | `more_vert` |
| `ellipsis-h` | `more_horiz` |
| `file-image` | `image` |
| `file-pdf` | `picture_as_pdf` |
| `file-spreadsheet` | `table_chart` |
| `file-word` | `description` |
| `folder-open` | `folder_open` |
| `info-circle` | `info` |
| `question-circle` | `help` |
| `exclamation-triangle` | `warning` |
| `external-link` | `open_in_new` |
| `info-square` | `info` |
| `align-left` | `format_align_left` |
| `align-center` | `format_align_center` |
| `align-right` | `format_align_right` |
| `align-justify` | `format_align_justify` |
| `spinner-third` | `progress_activity` |
| `file-alt` | `draft` |
| `plus-circle` | `add_circle` |

### Testing

Query icons by their accessible name via `screenreaderText`:

```tsx
const icon = screen.getByRole('img', { name: 'Close' });
```

Decorative icons (without `screenreaderText`) are hidden from the accessibility tree and should not be queried directly.


#### Test selectors

| Part | Description | Recommended Query | Test ID |
|------|-------------|-------------------|---------|
| main | The root element of the icon | `getByRole('img', { name: '...' })` when a label is provided, otherwise `getByRole('img', { hidden: true })` | `icon` |

---

### Storybook

Storybook provides an interactive playground for testing different prop combinations and viewing accessibility attributes.

[View in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-icon--docs)

## Specifications

### Behaviour

| State | Behaviour |
|-------|-----------|
| Default | Renders the named icon inline at the inherited font size |
| Filled | Displays the filled variant of the icon |
| Spin | Animates the icon with configurable speed |
| Decorative | Hidden from assistive technologies via `aria-hidden="true"` |

### Accessibility

**WCAG compliance:**

- **1.1.1 Non-text Content** — Decorative icons are hidden; meaningful icons require `screenreaderText`
- **1.4.1 Use of Color** — Icons supplement colour with shape to convey meaning
- **4.1.2 Name, Role, Value** — Icons with `screenreaderText` render with `role="img"` and an accessible label

**Keyboard interaction:**

Icons are not interactive on their own. When used inside buttons or links, the parent element handles keyboard interaction.

### Edge cases

- **Missing font**: If the icon font fails to load, a blank space is rendered — ensure font loading is configured
- **Unknown icon name**: Renders an empty glyph — verify icon names against Material Symbols reference
- **Font Awesome fallback**: Deprecated icons are auto-mapped to Material Symbols equivalents until the mapping is removed

---

### Storybook

Storybook provides an interactive playground for testing different prop combinations and viewing accessibility attributes.

[View in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-icon--docs)

---

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

Also accepts all [styling props](../styling-props/overview.md) ([type definition](../../dist/interfaces.d.ts), [token values](../tokens/tokens-reference.md)).

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

---

# Inline

> Lays out children horizontally with consistent spacing between items.

## Import

```tsx
import { IressInline } from '@iress-oss/ids-components';
```

- [Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-inline--docs)
- [Source](https://github.com/iress/design-system/tree/main/packages/components/src/components/Inline)
- [Report issue](https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=inline&title=[Inline]+Bug:+)
- [Request feature](https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=inline,enhancement&title=[Inline]+Feature:+)

## Props

> Required props are **bold**.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | `ReactNode` | — | Content to be displayed inline. |
| gap | `[ResponsiveProp](../../dist/types.d.ts)<[PositiveSpacingToken](../../dist/types.d.ts)>` | — | Sets the gap between direct children. @see https://developer.mozilla.org/docs/Web/CSS/gap |
| horizontalAlign | `any` | — | Sets the horizontal alignment of the inline content. |
| noWrap | `boolean` | — | Wraps content when stretches beyond container. |
| rowGap | `[ResponsiveProp](../../dist/types.d.ts)<[PositiveSpacingToken](../../dist/types.d.ts)>` | — | Sets the size of the top and bottom gap between direct children when they begin to wrap. @see https://developer.mozilla.org/docs/Web/CSS/row-gap |
| verticalAlign | `any` | — | Sets the vertical alignment of the inline content. |
| data-testid | `string` | — | The data-testid attribute is used to target elements in automated tests if no identifier is available. In some components it is propagated to child elements.  Notes: - Please use this prop sparingly and only when no other identifier is available, as per the guiding principles of Testing Library. - Only use this prop for your tests @see https://testing-library.com/docs/queries/bytestid |

📄 [Full type definition](../../dist/components/Inline/Inline.d.ts)

Also accepts all [styling props](../styling-props/overview.md) ([type definition](../../dist/interfaces.d.ts), [token values](../tokens/tokens-reference.md)).

IressInline renders a set of components in a row with equal spacing around them, wrapping onto multiple lines when necessary.

```tsx
<IressInline gap="spacing.4">
  <IressPlaceholder width="50" style={{ minHeight: '30px' }} />
  <IressPlaceholder width="50" style={{ minHeight: '50px' }} />
  <IressPlaceholder width="50" style={{ minHeight: '40px' }} />
</IressInline>;
```

## Design

### When to use

- **Horizontal layout**: Arrange items in a row with consistent spacing
- **Wrapping content**: Items that should wrap to the next line when space runs out
- **Button rows**: Group buttons or links horizontally

### When not to use

- **Grid columns** — use [Row](../components/row.md) + [Col](../components/col.md) for proportional grid layouts
- **Vertical spacing** — use [Stack](../components/stack.md) instead

### Related patterns

- [Stack](../components/stack.md) — vertical equivalent
- [Row](../components/row.md) + [Col](../components/col.md) — grid-based layout

## Develop

### Quick Start

```tsx
import { IressInline } from '@iress-oss/ids-components';

<IressInline gap="spacing.4">
  <span>Item 1</span>
  <span>Item 2</span>
</IressInline>;
```

[View all props](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-inline--docs#api-props)

### Usage

#### Gap

Inline spacing is applied to the direct children of the `IressInline` component.

The amount of spacing is controlled by the `gap` prop and can be set from `spacing.0` to `spacing.10`.

##### What happened to `gutter`?

The previous `gutter` prop has been replaced by `gap`, which uses the latest set of spacing tokens.

The existing `gutter` values are still supported, as they are now aliases for the spacing tokens.

```tsx
<IressStack gap="spacing.10">
  <IressText element="h3">spacing.1</IressText>
  <IressInline gap="spacing.1">
    <IressPlaceholder width="50" style={{ minHeight: '50px' }} />
    <IressPlaceholder width="50" style={{ minHeight: '50px' }} />
    <IressPlaceholder width="50" style={{ minHeight: '50px' }} />
  </IressInline>
  <IressText element="h3">spacing.4</IressText>
  <IressInline gap="spacing.4">
    <IressPlaceholder width="50" style={{ minHeight: '50px' }} />
    <IressPlaceholder width="50" style={{ minHeight: '50px' }} />
    <IressPlaceholder width="50" style={{ minHeight: '50px' }} />
  </IressInline>
  <IressText element="h3">spacing.8</IressText>
  <IressInline gap="spacing.8">
    <IressPlaceholder width="50" style={{ minHeight: '50px' }} />
    <IressPlaceholder width="50" style={{ minHeight: '50px' }} />
    <IressPlaceholder width="50" style={{ minHeight: '50px' }} />
  </IressInline>
</IressStack>;
```

#### Responsive gap

The `gap` prop can take an object that takes five key/value pairs that correlate with the IDS breakpoints.

```tsx
<IressInline
  gap={{
    xs: 'spacing.1',
    sm: 'spacing.2',
    md: 'spacing.4',
  }}
>
  <IressPlaceholder width="50" style={{ minHeight: '50px' }} />
  <IressPlaceholder width="50" style={{ minHeight: '50px' }} />
  <IressPlaceholder width="50" style={{ minHeight: '50px' }} />
</IressInline>;
```

#### Horizontal align

Horizontal alignment of the children is controlled by the `horizontalAlign` prop. It defaults to left and can be set to the following:

- `around` - space is distributed so each direct child has the same space on the left and on the right. This means that the gap between children is twice as large as the gap between the first / last items and the edges of the container, because the gap between children is comprised one child's spacing right plus the next child's spacing left.
- `between` - space is distributed evenly between direct children, but the first and last children sit tight to the edges of the container.
- `center` - children are aligned center, similar to `text-align: center`.
- `evenly` - space is distributed evenly between direct children.
- `left` - children are aligned left, similar to `text-align: left`.
- `right` - children are aligned right, similar to `text-align: right`.

```tsx
<IressContainer>
  <IressStack gap="spacing.10">
    <IressText element="h3">left</IressText>
    <IressInline gap="spacing.2" horizontalAlign="left">
      <IressPlaceholder width="50" style={{ minHeight: '50px' }} />
      <IressPlaceholder width="50" style={{ minHeight: '50px' }} />
    </IressInline>
    <IressText element="h3">center</IressText>
    <IressInline gap="spacing.2" horizontalAlign="center">
      <IressPlaceholder width="50" style={{ minHeight: '50px' }} />
      <IressPlaceholder width="50" style={{ minHeight: '50px' }} />
    </IressInline>
    <IressText element="h3">right</IressText>
    <IressInline gap="spacing.2" horizontalAlign="right">
      <IressPlaceholder width="50" style={{ minHeight: '50px' }} />
      <IressPlaceholder width="50" style={{ minHeight: '50px' }} />
    </IressInline>
    <IressText element="h3">between</IressText>
    <IressInline gap="spacing.2" horizontalAlign="between">
      <IressPlaceholder width="50" style={{ minHeight: '50px' }} />
      <IressPlaceholder width="50" style={{ minHeight: '50px' }} />
    </IressInline>
  </IressStack>
</IressContainer>;
```

#### Vertical align

Vertical alignment of the children is controlled by the `verticalAlign` prop. It defaults to top and can be set to the following:

- `bottom` - children are aligned to the bottom of the container.
- `middle` - children are aligned to the middle of the container.
- `stretch` - each direct child stretches to the full height of the inline container.
- `top` - children are aligned to the top of the container.

```tsx
<IressContainer>
  <IressStack gap="spacing.10">
    <IressText element="h3">top</IressText>
    <IressInline gap="spacing.2" horizontalAlign="center" verticalAlign="top">
      <IressPlaceholder width="50" style={{ minHeight: '30px' }} />
      <IressPlaceholder width="50" style={{ minHeight: '50px' }} />
      <IressPlaceholder width="50" style={{ minHeight: '40px' }} />
    </IressInline>
    <IressText element="h3">middle</IressText>
    <IressInline
      gap="spacing.2"
      horizontalAlign="center"
      verticalAlign="middle"
    >
      <IressPlaceholder width="50" style={{ minHeight: '30px' }} />
      <IressPlaceholder width="50" style={{ minHeight: '50px' }} />
      <IressPlaceholder width="50" style={{ minHeight: '40px' }} />
    </IressInline>
    <IressText element="h3">bottom</IressText>
    <IressInline
      gap="spacing.2"
      horizontalAlign="center"
      verticalAlign="bottom"
    >
      <IressPlaceholder width="50" style={{ minHeight: '30px' }} />
      <IressPlaceholder width="50" style={{ minHeight: '50px' }} />
      <IressPlaceholder width="50" style={{ minHeight: '40px' }} />
    </IressInline>
    <IressText element="h3">stretch</IressText>
    <IressInline
      gap="spacing.2"
      horizontalAlign="center"
      verticalAlign="stretch"
    >
      <IressPlaceholder width="50" style={{ minHeight: '30px' }} />
      <IressPlaceholder width="50" style={{ minHeight: '50px' }} />
      <IressPlaceholder width="50" style={{ minHeight: '40px' }} />
    </IressInline>
  </IressStack>
</IressContainer>;
```

#### No wrap

The `IressInline` component automatically wraps children. There may be some scenarios where you do not require children to be wrapped. For this you can use the `noWrap` prop.

```tsx
<IressInline gap="spacing.4" noWrap>
  <IressPlaceholder width="50" style={{ minHeight: '50px' }} />
  <IressPlaceholder width="50" style={{ minHeight: '50px' }} />
  <IressPlaceholder width="50" style={{ minHeight: '50px' }} />
  <IressPlaceholder width="50" style={{ minHeight: '50px' }} />
  <IressPlaceholder width="50" style={{ minHeight: '50px' }} />
</IressInline>;
```

### Testing

`IressInline` is a layout primitive with no semantic role. Target its children
directly or use a `data-testid`:

```tsx
const inline = screen.getByTestId('my-inline');
```


#### Test selectors

| Part | Description | Recommended Query | Test ID |
|------|-------------|-------------------|---------|
| main | The root element of the inline | — | `inline` |

---

### Storybook

[View in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-inline--docs)

## Specifications

### Behaviour

A CSS flexbox row wrapper with configurable gap, alignment, and wrapping behaviour.

---

# InputCurrency

> Provides a text input formatted for entering monetary values.

## Import

```tsx
import { IressInputCurrency } from '@iress-oss/ids-components';
```

- [Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-input-currency--docs)
- [Source](https://github.com/iress/design-system/tree/main/packages/components/src/components/InputCurrency)
- [Report issue](https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=input-currency&title=[InputCurrency]+Bug:+)
- [Request feature](https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=input-currency,enhancement&title=[InputCurrency]+Feature:+)

## Props

> Required props are **bold**.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| alignRight | `boolean` | — | Set input content align to right. |
| currencyCode | `string` | — | Set the currency symbol and appended currency code, default is `AUD`. |
| formatOptions | `Omit<NumberFormatOptions, "currency">` | — | Pass additional number format options. @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat |
| locale | `LocalesArgument` | — | Set the region of the currency, default is `en-AU`. |
| withSymbol | `boolean` | — | Set the currency symbol. |
| actions | `Omit<[IressButtonProps](../../dist/components/Button/Button.d.ts), "status" | "mode">[]` | — | Actions to display in the input field, rendered inside the input on the right. These will be rendered with opinionated styling. If you want to use custom buttons or controls, use the `append` prop instead. |
| width | `any` | — | The width of the input. |
| defaultValue | `null, number , string ` | — | The value of the input. Can be a string or a number. Use for uncontrolled inputs. |
| onChange | `((e: ChangeEvent<HTMLInputElement, Element>, value?: T) => void)` | — | Emitted when the input value changes with the new changed value. |
| data-testid | `string` | — | The data-testid attribute is used to target elements in automated tests if no identifier is available. In some components it is propagated to child elements.  Notes: - Please use this prop sparingly and only when no other identifier is available, as per the guiding principles of Testing Library. - Only use this prop for your tests @see https://testing-library.com/docs/queries/bytestid |
| variant | `search` | — | The variant of the input, which will apply different styles to the input. The `search` variant is designed for search inputs and will have a different style for the clear button and loading spinner. |
| inline | `boolean` | — | Make prepend/append element closer to the input content. |
| readOnly | `[FormControlReadOnly](../../dist/types.d.ts)` | — | Renders the input as read-only. Use `'locked'` when the value is read-only because of permissions. |
| value | `null, number , string ` | — | The value of the input. Can be a string or a number. Use for controlled inputs. |
| append | `ReactNode` | — | Content to append to the input field, usually a button or icon. |
| loading | `boolean, string ` | — | The loading states of the input field. If provided a string, will use that text as the loading message. |
| prepend | `ReactNode` | — | Content to prepended to the input field, usually an icon. |
| formatter | `((value?: T) => string | number)` | — | Bring your own formatter that will be used to format the value when the input is not focused, allowing you to display the value in a different format. e.g. User type in value="dsf 987kkk123" => result after formatter: $987,123 (string) |
| onClear | `((e: ChangeEvent<HTMLInputElement, Element>) => void)` | — | Emitted when the input is manually cleared. |
| clearable | `boolean` | `false` | If `true`, then user can clear the value of the input. |

📄 [Full type definition](../../dist/components/InputCurrency/InputCurrency.d.ts)

Also accepts all [styling props](../styling-props/overview.md) ([type definition](../../dist/interfaces.d.ts), [token values](../tokens/tokens-reference.md)).

InputCurrency allows a user to input and interact with currency number. It works just like IressInput, with new props locale and currencyCode. This component meets ISO-4217 standard

```tsx
<IressInputCurrency
  defaultValue={12345.678}
  locale="en-GB"
  currencyCode="GBP"
  placeholder="Enter amount and dispay currency currency separator on blur"
/>;
```

## Design

### When to use

- **Currency entry**: Any field where the user inputs monetary values
- **Multi-locale support**: When the application needs to handle different currency formats (AUD, GBP, JPY)
- **Formatted display**: When you need locale-aware formatting on blur (grouping separators, decimal places)

### When not to use

- **Generic numbers** — use Input with `type="number"` instead
- **Display-only currency** — use a text formatter rather than an interactive input
- **Percentage values** — use Input with a percentage formatter

### Do's and Don'ts

| ✅ Do | ❌ Don't |
|-------|----------|
| Always pass both `locale` and `currencyCode` together | Set `locale` without `currencyCode` or vice versa |
| Use `alignRight` for numeric columns in tables | Use `readOnly` InputCurrency in tables — use column `format` instead |
| Use `withSymbol` when the currency isn't obvious from context | Rely solely on the symbol when multiple currencies are present |
| Use `formatOptions` for custom decimal places | Hardcode formatting logic outside the component |

### Content guidelines

- **Labels**: Describe the value being entered (e.g. "Purchase price", "Annual salary")
- **Currency context**: If the currency is not obvious, show the code in the label or use `withSymbol`

### Related patterns

- [Input](../components/input.md) — for general text/number input
- [Form Field](../patterns/form.md) — for wrapping with label, hint, and validation

## Develop

### Quick Start

```tsx
import { IressInputCurrency } from '@iress-oss/ids-components';

<IressInputCurrency
  defaultValue={12345.678}
  locale="en-AU"
  currencyCode="AUD"
/>;
```

[View all props](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-inputcurrency--docs#api-props)

### Usage

#### Different Locale and CurrencyCode

Display the GBP with `locale="en-GB"` and `currencyCode="GBP"` props (must pass both together)

```tsx
<IressInputCurrency
  defaultValue={12345.678}
  locale="en-GB"
  currencyCode="GBP"
  placeholder="Enter amount and dispay currency currency separator on blur"
/>;
```

Display the JPY with `locale="ja-JPY"` and `currencyCode="JPY"` props (must pass both together)

```tsx
<IressInputCurrency
  defaultValue={12345678}
  locale="ja-JP"
  currencyCode="JPY"
  placeholder="Enter amount and dispay currency currency separator on blur"
/>;
```

#### With Symbol

Display the currency symbol with `withSymbol` props

```tsx
<IressInputCurrency
  defaultValue={12345.678}
  locale="en-AU"
  currencyCode="AUD"
  withSymbol
  placeholder="Enter amount and dispay currency symbol on blur"
/>;
```

#### More Format Options

Pass more format options with `formatOptions` props. More format options in <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat">here</a>

```tsx
<IressInputCurrency
  defaultValue={12345.678}
  locale="en-AU"
  currencyCode="AUD"
  placeholder="Pass and play around with other native Intl.NumberFormat options to the code sandbox"
  formatOptions={{ minimumFractionDigits: 2, maximumFractionDigits: 4 }}
/>;
```

#### Read Only

The `readOnly` prop can be set to prevent the user from changing the value of the input. If you want to make the number align to right, please pass `alignRight` together.

```tsx
<IressInputCurrency
  defaultValue={12345.678}
  locale="en-AU"
  currencyCode="AUD"
  readOnly
  alignRight
  withSymbol
/>;
```

#### Align Right

Set the input content align to right with `alignRight` prop, which is more friendly for number input.

```tsx
<IressInputCurrency
  defaultValue={12345.678}
  locale="en-AU"
  currencyCode="AUD"
  alignRight
/>;
```

### Recipes

#### Using IressInputCurrency in table

It is not recommended to use the `readOnly` prop for `IressInputCurrency` inside tables, as it was designed for forms. This example shows how to use currency in the table, by using the `format` prop of when defining a column inside `IressTable`. Additionally, when all rows have the same currency, it is recommended to add the currency code on the column `label` and remove the `currencyCode` on all rows.

```tsx
import { IressTable } from '@iress-oss/ids-components';

export const CurrencyInTable = () => {
  return (
    <IressTable
      caption="My investments"
      columns={[
        {
          key: 'investmentName',
          label: 'Investment Name',
          format: 'string',
          width: '30%',
        },
        {
          key: 'investmentDate',
          label: 'Investment Date',
          format: 'date',
          width: '30%',
        },
        {
          key: 'totalPercentage',
          label: 'Total %',
          format: 'percent',
          width: '15%',
        },
        {
          key: 'amount',
          label: 'Investment Amount (AUD)',
          format: 'currency',
          currencyCode: '',
          width: '25%',
        },
      ]}
      rows={[
        {
          investmentName: 'US Stocks',
          investmentDate: '2019-09-23',
          totalPercentage: 24.8,
          amount: 23898,
        },
        {
          investmentName: 'US Bonds',
          investmentDate: '2019-02-05',
          totalPercentage: 26.2,
          amount: 26382.456,
        },
        {
          investmentName: 'AU Stocks',
          investmentDate: '2019-02-05',
          totalPercentage: 26.2,
          amount: 9342.1569,
        },
        {
          investmentName: 'UK Stocks',
          investmentDate: '2020-06-28',
          totalPercentage: 49,
          amount: 49751.4,
        },
      ]}
    />
  );
};
```

#### OnChange with valid value

Only able to input valid value when use `IressInputCurrency`. In this example, only number and 2 decimal places are allowed.

```tsx
import { IressInputCurrency } from '@iress-oss/ids-components';
import { useState } from 'react';

export const ValidValueOnChage = () => {
  const [value, setValue] = useState('');

  return (
    <IressInputCurrency
      value={value}
      onChange={(_e, value) => {
        if (typeof value === 'string' && /^-?\d*(\.\d{0,2})?$/.test(value)) {
          console.log('Valid value:', value);
          setValue(value);
        }
      }}
    />
  );
};
```

### Testing

Query the currency input by its role. Note that when a `formatter` is active, the input role changes between `textbox` (blurred) and `spinbutton` (focused):

```tsx
const input = screen.getByRole('textbox', { name: 'Amount' });
```

#### Gotchas

- **readOnly removes the input role**: When `readOnly` is set, the textbox role
  is removed and the formatted value is displayed as plain text.

[View test roles/IDs](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-inputcurrency--docs#testing)


#### Test selectors

| Part | Description | Recommended Query | Test ID |
|------|-------------|-------------------|---------|
| main | The root element of the input currency | `getByRole('textbox')`, or `getByLabelText('...')` when inside a Field. In focus, the input will have the role of `spinbutton`. | `input-currency` |

---

### Storybook

Storybook provides an interactive playground for testing different prop combinations, more complex recipes, all prop details, and accessibility attributes.

[View in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-inputcurrency--docs)

## Specifications

### Behaviour

| State | Behaviour |
|-------|-----------|
| Default (blurred) | Displays formatted currency value with locale-specific separators |
| Focused | Shows raw numeric value for editing |
| Read only | Renders formatted value as plain text with hidden input |
| Align right | Content aligns to the right of the input field |
| With symbol | Currency symbol displayed as prepended content |

### Accessibility

**WCAG compliance:**

- **4.1.2 Name, Role, Value** — Uses `role="textbox"` (blurred) or `role="spinbutton"` (focused)
- **1.3.1 Info and Relationships** — Must be associated with a label via `IressFormField`
- **3.3.2 Labels or Instructions** — Currency context should be clear from label or symbol

**Keyboard interaction:**

| Key | Action |
|-----|--------|
| `Tab` | Moves focus in/out of the input; triggers format on blur |
| Standard numeric keys | Inputs digits and decimal separator |
| `Backspace` / `Delete` | Removes characters from the raw value |

### Edge cases

- **Invalid characters**: Only valid numeric input is accepted; invalid keystrokes are ignored
- **Locale mismatch**: Ensure `locale` and `currencyCode` are compatible (e.g. "en-GB" with "GBP")
- **Zero decimal currencies**: JPY and similar currencies display no decimal places
- **readOnly in tables**: Use column `format` prop instead of `readOnly` InputCurrency

---

### Storybook

Storybook provides an interactive playground for testing different prop combinations and viewing accessibility attributes.

[View in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-inputcurrency--docs)

## Recipes

### Currency In Table Recipe

```tsx
import { IressTable } from '@iress-oss/ids-components';

export const CurrencyInTable = () => {
  return (
    <IressTable
      caption="My investments"
      columns={[
        {
          key: 'investmentName',
          label: 'Investment Name',
          format: 'string',
          width: '30%',
        },
        {
          key: 'investmentDate',
          label: 'Investment Date',
          format: 'date',
          width: '30%',
        },
        {
          key: 'totalPercentage',
          label: 'Total %',
          format: 'percent',
          width: '15%',
        },
        {
          key: 'amount',
          label: 'Investment Amount (AUD)',
          format: 'currency',
          currencyCode: '',
          width: '25%',
        },
      ]}
      rows={[
        {
          investmentName: 'US Stocks',
          investmentDate: '2019-09-23',
          totalPercentage: 24.8,
          amount: 23898,
        },
        {
          investmentName: 'US Bonds',
          investmentDate: '2019-02-05',
          totalPercentage: 26.2,
          amount: 26382.456,
        },
        {
          investmentName: 'AU Stocks',
          investmentDate: '2019-02-05',
          totalPercentage: 26.2,
          amount: 9342.1569,
        },
        {
          investmentName: 'UK Stocks',
          investmentDate: '2020-06-28',
          totalPercentage: 49,
          amount: 49751.4,
        },
      ]}
    />
  );
};
```

### Valid Value On Chage Recipe

```tsx
import { IressInputCurrency } from '@iress-oss/ids-components';
import { useState } from 'react';

export const ValidValueOnChage = () => {
  const [value, setValue] = useState('');

  return (
    <IressInputCurrency
      value={value}
      onChange={(_e, value) => {
        if (typeof value === 'string' && /^-?\d*(\.\d{0,2})?$/.test(value)) {
          console.log('Valid value:', value);
          setValue(value);
        }
      }}
    />
  );
};
```


---

# Input

> Renders a single-line text input for capturing user data.

## Import

```tsx
import { IressInput } from '@iress-oss/ids-components';
```

- [Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-input--docs)
- [Figma](https://www.figma.com/design/youFqYT4CgpKxfLJQv80hf/WIP-Iress-Design-System-V6?node-id=6201-23)
- [Source](https://github.com/iress/design-system/tree/main/packages/components/src/components/Input)
- [Report issue](https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=input&title=[Input]+Bug:+)
- [Request feature](https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=input,enhancement&title=[Input]+Feature:+)

## Props

> Required props are **bold**.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| data-testid | `string` | — | The data-testid attribute is used to target elements in automated tests if no identifier is available. In some components it is propagated to child elements.  Notes: - Please use this prop sparingly and only when no other identifier is available, as per the guiding principles of Testing Library. - Only use this prop for your tests @see https://testing-library.com/docs/queries/bytestid |
| rows | `number` | — | Number of rows in the `textarea` (when set the component renders a textarea element) |
| actions | `Omit<[IressButtonProps](../../dist/components/Button/Button.d.ts), "status" | "mode">[]` | — | Actions to display in the input field, rendered inside the input on the right. These will be rendered with opinionated styling. If you want to use custom buttons or controls, use the `append` prop instead. |
| alignRight | `boolean` | `false` | Set input content align to right, useful for numeric inputs. |
| append | `ReactNode` | — | Content to append to the input field, usually a button or icon. |
| defaultValue | `[FormControlValue](../../dist/types.d.ts)` | — | The value of the input. Can be a string or a number. Use for uncontrolled inputs. |
| formatter | `((value?: T) => string | number)` | — | Bring your own formatter that will be used to format the value when the input is not focused, allowing you to display the value in a different format. e.g. User type in value="dsf 987kkk123" => result after formatter: $987,123 (string) |
| inline | `boolean` | — | Make prepend/append element closer to the input content. |
| loading | `boolean, string ` | — | The loading states of the input field. If provided a string, will use that text as the loading message. |
| onChange | `((e: ChangeEvent<InputBaseElement<TRows>, Element>, value?: T) => void)` | — | Emitted when the input value changes with the new changed value. |
| onClear | `((e: ChangeEvent<InputBaseElement<TRows>, Element>) => void)` | — | Emitted when the input is manually cleared. |
| prepend | `ReactNode` | — | Content to prepended to the input field, usually an icon. |
| readOnly | `[FormControlReadOnly](../../dist/types.d.ts)` | — | Renders the input as read-only. Use `'locked'` when the value is read-only because of permissions. |
| value | `[FormControlValue](../../dist/types.d.ts)` | — | The value of the input. Can be a string or a number. Use for controlled inputs. |
| width | `any` | — | The width of the input. |
| clearable | boolean _(Only when rows is not set)_ | — | If true, the user can clear the value of the input. |
| variant | 'search' _(Only when rows is not set)_ | — | The variant of the input. The search variant applies different styles for the clear button and loading spinner. |
| autoGrow | boolean | number _(Only when rows is set)_ | `false` | Enables auto-grow for textarea. Set to true for default max 5 rows, or a number for custom max rows. |

📄 [Full type definition](../../dist/components/Input/Input.d.ts)

Also accepts all [styling props](../styling-props/overview.md) ([type definition](../../dist/interfaces.d.ts), [token values](../tokens/tokens-reference.md)).

Inputs allow a user to input and interact with data. This component should be used as a child of the IressField component to ensure the correct placement of elements like label, error & hint text.

```tsx
<IressInput
  clearable
  placeholder="Search"
  prepend={<IressIcon name="search" />}
/>;
```

## Design

### When to use

- **Free text entry**: Names, emails, URLs, or any user-typed value
- **Formatted values**: Currency, percentages, or dates with a `formatter`
- **Multi-line text**: Textareas for longer content (via `rows` prop)
- **File uploads**: Selecting files from the user's device

### When not to use

- **Selection from fixed options** — use Select or RadioGroup
- **Rich text editing** — use a dedicated rich text editor
- **Currency input** — use InputCurrency for locale-aware formatting

### Do's and Don'ts

| ✅ Do | ❌ Don't |
|-------|----------|
| Use appropriate `type` for the data (email, tel, url) | Default everything to `type="text"` |
| Set `inputmode` for mobile keyboard hints | Rely on `type="number"` for all numeric input |
| Use `sizing` to hint at expected input length | Make all inputs the same width regardless of content |
| Wrap in `IressFormField` for label and validation | Use a standalone input without an accessible label |

### Content guidelines

- **Placeholder**: Use as a hint, not a replacement for labels (e.g. "e.g. john@example.com")
- **Labels**: Always provide via `IressFormField`; keep concise and specific
- **Error messages**: Explain what went wrong and how to fix it

### Related patterns

- [Form Field](../patterns/form.md) — for wrapping with label, hint, and validation
- [Input Currency](../components/input-currency.md) — for locale-aware currency input
- [Autocomplete](../components/autocomplete.md) — for input with suggestions

## Develop

### Quick Start

```tsx
import { IressInput } from '@iress-oss/ids-components';

<IressInput placeholder="Enter your name" />;
```

[View all props](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-input--docs#api-props)

### Usage

#### Types

The input component's `type` can be set to one of the following value: `text` (default), `date`, `email`, `number`, `password`, `search`, `tel`, `url`, `time`, `color` and `file`.

```tsx
import { IressInput, IressStack } from '@iress-oss/ids-components';

export function InputTypes() {
  return (
    <IressStack gap="md">
      <IressInput type="text" placeholder="Text input" />
      <IressInput type="color" placeholder="Color input" />
      <IressInput type="date" placeholder="Date input" />
      <IressInput type="datetime-local" placeholder="Datetime-local input" />
      <IressInput type="email" placeholder="Email input" />
      <IressInput type="file" placeholder="File input" />
      <IressInput type="month" placeholder="Month input" />
      <IressInput type="number" placeholder="Number input" />
      <IressInput type="password" placeholder="Password input" />
      <IressInput type="search" placeholder="Search input" />
      <IressInput type="tel" placeholder="Tel input" />
      <IressInput type="time" placeholder="Time input" />
      <IressInput type="url" placeholder="Url input" />
      <IressInput type="week" placeholder="Week input" />
    </IressStack>
  );
}
```

#### Input modes

The `inputmode` attribute provides a hint to browsers for devices with onscreen keyboards to help them decide which keyboard to display.

```tsx
import { IressInput, IressStack } from '@iress-oss/ids-components';

export function InputModes() {
  return (
    <IressStack gap="md">
      <IressInput inputMode="text" placeholder="Text mode" />
      <IressInput inputMode="tel" placeholder="Tel mode" />
      <IressInput inputMode="url" placeholder="Url mode" />
      <IressInput inputMode="email" placeholder="Email mode" />
      <IressInput inputMode="numeric" placeholder="Numeric mode" />
      <IressInput inputMode="decimal" placeholder="Decimal mode" />
      <IressInput inputMode="search" placeholder="Search mode" />
    </IressStack>
  );
}
```

#### File uploads

When using the `type="file"` attribute, the input allows users to select one or more files from their device.

```tsx
import { IressField, IressInput } from '@iress-oss/ids-components';

export function InputFileType() {
  return (
    <IressField label="File upload">
      <IressInput type="file" required />
    </IressField>
  );
}
```

#### Clearable

By setting the `clearable` prop to `true` a clear button will appear when the user has entered a value into the input.

```tsx
<IressInput
  clearable
  placeholder="Search"
  prepend={<IressIcon name="search" />}
/>;
```

#### Sizing

Inputs can be resized to suit a specific number of characters. Widths can also be set as a percentage.

```tsx
import { IressInput, IressStack } from '@iress-oss/ids-components';

export function InputSizing() {
  return (
    <IressStack gap="md">
      <IressInput width="2" placeholder="2" />
      <IressInput width="4" placeholder="4" />
      <IressInput width="6" placeholder="6" />
      <IressInput width="8" placeholder="8" />
      <IressInput width="10" placeholder="10" />
      <IressInput width="12" placeholder="12" />
      <IressInput width="16" placeholder="16" />
      <IressInput width="25%" placeholder="25%" />
      <IressInput width="50%" placeholder="50%" />
      <IressInput width="75%" placeholder="75%" />
      <IressInput width="100%" placeholder="100%" />
    </IressStack>
  );
}
```

#### Textareas

Set the `rows` prop to render a `textarea` instead of an `input`.

```tsx
<IressInput rows={5} />;
```

#### Prepend & Append

Content (typically icons) can be added via the `prepend` and `append` props on `IressInput`.

> ⚠️ **Do not use `slot` attributes on children** (e.g. `<IressIcon slot="start" />`). The `slot` attribute is a legacy v4 pattern that is no longer supported. Always use the `prepend` and `append` props.

```tsx
import { IressIcon, IressInput, IressStack } from '@iress-oss/ids-components';

export function InputSlots() {
  return (
    <IressStack gap="md">
      <IressInput
        prepend={<IressIcon name="search" />}
        placeholder="Prepend slot"
      />
      <IressInput
        append={<IressIcon name="search" />}
        placeholder="Append slot"
      />
      <IressInput
        prepend={<IressIcon name="search" />}
        placeholder="Prepend slot"
      />
      <IressInput
        append={<IressIcon name="search" />}
        placeholder="Append slot"
      />
    </IressStack>
  );
}
```

#### Actions

The `actions` prop allows you to add buttons to the input.

```tsx
<IressInput
  actions={[
    {
      icon: 'content_copy',
      children: 'Copy to clipboard',
      onClick: () => {
        void navigator.clipboard.writeText('Copied text!');
      },
    },
  ]}
  placeholder="Input with action button"
/>;
```

#### Read only

The `readOnly` prop can be set to prevent the user from changing the value of the input.

```tsx
<IressInput placeholder="Enter your name" readOnly value="Value" />;
```

#### Formatter

`formatter` allows you to display the value in a different format when the input is not focused.

**Notes:**

- When `formatter` is set, the `type` of the input is changed to `text` when not in focus.
- The value of the native input will be the formatted value, not the raw value.

```tsx
<IressInput
  placeholder="Enter a string and it will show in UPPERCASE when not focused, and show the raw value on focus"
  formatter={(value) => (value ? value.toString().toUpperCase() : '')}
/>;
```

##### Currency formatting example

```tsx
import { IressInput } from '@iress-oss/ids-components';

export function InputCurrencyFormatter() {
  const formatter = (value = '') => {
    const numberValue = Number(value);

    if (Number.isNaN(numberValue)) {
      return value;
    }

    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
    }).format(numberValue);
  };

  return (
    <IressInput
      defaultValue="0.00"
      formatter={formatter}
      placeholder="Enter any number and it will show in currency format when the input is not focused"
      type="number"
    />
  );
}
```

#### Auto-growing textareas

For textareas (when `rows` prop is set), you can enable the `autoGrow` prop to automatically expand the textarea height as the user types more lines.

```tsx
<IressInput rows={1} autoGrow append={<IressIcon name="wand_shine" />} />;
```

#### `variant`

The `variant` prop allows you to apply different styles to the input.

- `search`: Used for search inputs, you can use the `prepend` or `append` prop to add a search icon.

```tsx
<IressInput
  variant="search"
  placeholder="Start your search..."
  prepend={<IressIcon name="search" />}
/>;
```

#### Percentage formatting

You can use `IressInput` to display percentage formatting. When the field is focused, it can display the raw value, and when blurred, it can display the formatted percentage value.

```tsx
import { IressInput } from '@iress-oss/ids-components';

export const InputPercentage = () => (
  <IressInput<string | number>
    defaultValue="0.5"
    formatter={(value = '') => {
      if (value === '') return '';

      const numericValue = Number(value);

      if (Number.isNaN(numericValue)) {
        return String(value) ?? '';
      }

      return new Intl.NumberFormat('en-AU', {
        style: 'percent',
      }).format(numericValue);
    }}
    type="number"
  />
);
```

### Testing

Query the input by its role:

```tsx
const input = screen.getByRole('textbox', { name: 'Email' });
```

For number inputs, use `spinbutton`:

```tsx
const input = screen.getByRole('spinbutton', { name: 'Quantity' });
```

#### Gotchas

- **formatter changes the role**: When `formatter` is set on a `type="number"`
  input, the role changes between `textbox` (blurred) and `spinbutton` (focused).
- **readOnly removes the input role**: When `readOnly` is set, the textbox role
  is removed. The value is displayed as plain text.
- **Textarea vs Input test IDs**: When `rows` is set, the component renders a
  `<textarea>` with a `__textarea` test ID suffix. Without `rows`, it renders an
  `<input>` with a `__input` suffix.

  ```tsx
screen.getByTestId('my-input__input'); // Single-line
screen.getByTestId('my-input__textarea'); // Textarea (rows > 0)
```

- **clearable inputs**: The clear button only appears when the input has a value.

[View test roles/IDs](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-input--docs#testing)


#### Test selectors

| Part | Description | Recommended Query | Test ID |
|------|-------------|-------------------|---------|
| main | The root element of the input | `getByRole('textbox')`, or `getByLabelText('...')` when inside a Field | `input` |

---

### Storybook

Storybook provides an interactive playground for testing different prop combinations, more complex recipes, all prop details, and accessibility attributes.

[View in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-input--docs)

## Specifications

### Behaviour

| State | Behaviour |
|-------|-----------|
| Default | Input accepts text entry and fires `onChange`/`onInput` events |
| Focused with formatter | Shows raw value; type reverts to original |
| Blurred with formatter | Shows formatted value; type becomes `text` |
| Read only | Renders as plain text with hidden input for form value |
| Clearable | Clear button appears when input has a value |
| Auto-grow textarea | Height expands as user types more lines |

### Accessibility

**WCAG compliance:**

- **4.1.2 Name, Role, Value** — Uses `role="textbox"` or `role="spinbutton"` based on type
- **1.3.1 Info and Relationships** — Must be associated with a label via `IressFormField`
- **3.3.2 Labels or Instructions** — Placeholder is supplementary, not a label replacement

**Keyboard interaction:**

| Key | Action |
|-----|--------|
| `Tab` | Moves focus in/out of the input |
| `Escape` | Clears input when `clearable` is set (after clear button focus) |
| Standard text keys | Input characters as expected |

### Edge cases

- **formatter + type="number"**: Role changes between focus states — account for in tests
- **readOnly**: No textbox role in DOM — cannot query by role
- **File type**: Appearance controlled by browser; limited styling possible
- **Empty clearable input**: Clear button is hidden until a value is entered

---

### Storybook

Storybook provides an interactive playground for testing different prop combinations and viewing accessibility attributes.

[View in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-input--docs)

## Recipes

### React Hook Forms

```tsx
import {
  type InputRef,
  IressAlert,
  IressButton,
  IressInline,
  IressInput,
  IressLabel,
  IressModal,
  IressStack,
  IressTable,
} from '@iress-oss/ids-components';
import { useState } from 'react';
import {
  Controller,
  type UseFormRegisterReturn,
  useForm,
} from 'react-hook-form';

const registerInnerElement = (register: UseFormRegisterReturn) => {
  return {
    ...register,
    onClear: register.onChange,
    ref: (ref: InputRef | null) => {
      if (ref) {
        register.ref(ref.input);
      }
    },
  };
};

export const ReactHookFormsInput = () => {
  const { register, handleSubmit, control } = useForm();
  const [data, setData] = useState<Record<string, string> | undefined>();

  return (
    // eslint-disable-next-line sonarjs/void-use -- This is a mock form submission
    <form onSubmit={void handleSubmit(setData)}>
      <IressStack gap="md">
        <IressAlert status="info">
          Although you can use <code>IressInput</code> directly with React Hook
          Forms, we recommend using <code>IressFormField</code> within{' '}
          <code>IressForm</code> for a more integrated experience.
        </IressAlert>
        <IressInline gap="md" verticalAlign="middle">
          <IressLabel htmlFor="Controller">
            Input using <code>{`{ Controller } from 'react-hook-forms'`}</code>
          </IressLabel>
          <Controller
            name="Controller"
            control={control}
            render={({ field }) => (
              <IressInput
                {...field}
                clearable
                onClear={field.onChange}
                id="firstName"
              />
            )}
          />
        </IressInline>
        <IressInline gap="md" verticalAlign="middle">
          <IressLabel htmlFor="register">
            Input using <code>{`{ register } = useForm()`}</code>
          </IressLabel>
          <IressInput
            {...registerInnerElement(register('register'))}
            clearable
            id="register"
          />
        </IressInline>
        <IressButton type="submit">Submit</IressButton>
      </IressStack>
      {data && (
        <IressModal
          show={!!data}
          onShowChange={(show) => !show && setData(undefined)}
        >
          <IressTable
            caption="Submitted details"
            rows={Object.entries(data ?? {}).map((entry) => ({
              name: entry[0],
              value: JSON.stringify(entry[1], null, 2),
            }))}
          />
        </IressModal>
      )}
    </form>
  );
};
```


---

# Label

> Provides an accessible text label for a form control.

## Import

```tsx
import { IressLabel } from '@iress-oss/ids-components';
```

- [Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-label--docs)
- [Source](https://github.com/iress/design-system/tree/main/packages/components/src/components/Label)
- [Report issue](https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=label&title=[Label]+Bug:+)
- [Request feature](https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=label,enhancement&title=[Label]+Feature:+)

## Props

> Required props are **bold**.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| data-testid | `string` | — | The data-testid attribute is used to target elements in automated tests if no identifier is available. In some components it is propagated to child elements.  Notes: - Please use this prop sparingly and only when no other identifier is available, as per the guiding principles of Testing Library. - Only use this prop for your tests @see https://testing-library.com/docs/queries/bytestid |
| readOnly | `locked`, boolean  | — | Renders the label in a read-only state. Use `'locked'` to show a lock indicator when the related field is permission-locked. |
| required | `boolean` | — | When set to true, the 'required asterisk (*)' is displayed next to the label text. |
| append | `ReactNode` | — | Content to be appended to the label. This is not affected by the `hiddenLabel` prop. |
| hiddenLabel | `boolean` | — | Visually hides the label text, but still available to screen readers. |
| htmlFor | `string` | — | Used to connect it to the input element, it should be the input's id. If provided, the label will be rendered as a `<label>` element, otherwise it will be rendered as a `<strong>` element.  [Learn more](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/for) |

📄 [Full type definition](../../dist/components/Label/Label.d.ts)

Also accepts all [styling props](../styling-props/overview.md) ([type definition](../../dist/interfaces.d.ts), [token values](../tokens/tokens-reference.md)).

Use the IressLabel component when building bespoke form inputs and IressField is too restrictive.

```tsx
<IressLabel required>This is a label for a required input</IressLabel>;
```

## Design

### When to use

- **Custom form controls**: When `IressField` is too opinionated for your layout
- **Non-interactive content**: Label read-only data without a `htmlFor` association
- **Required indicators**: Show an asterisk to indicate mandatory fields

### When not to use

- **Standard form fields** — use `IressField` which includes label, hint, and error support
- **Standalone text** — use `IressText` for non-label content

### Do's and Don'ts

| ✅ Do | ❌ Don't |
|-------|----------|
| Pair with a form control using `htmlFor` | Place interactive elements (links, buttons) inside the label |
| Use `hiddenLabel` for visually hidden but accessible labels | Omit labels entirely — screen readers need them |
| Use `readOnly="locked"` for permission-based read-only | Use a label without any associated content |

### Content guidelines

- **Text**: Use sentence case, keep concise and descriptive
- **Required**: Use the `required` prop to add an asterisk; don't manually add asterisks

### Related patterns

- [Field](../components/field.md) — full-featured form field wrapper with hint and error support

## Develop

### Quick Start

```tsx
import { IressLabel } from '@iress-oss/ids-components';

<IressLabel>This is a label</IressLabel>;
```

[View all props](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-label--docs#api-props)

### Usage

#### Required

Use the `required` prop to distinguish the label with an asterisk.

```tsx
<IressLabel required>This is a label for a required input</IressLabel>;
```

#### Hidden label

Set `hiddenLabel` to visually hide the label while keeping it accessible.

```tsx
<IressLabel hiddenLabel>
  This text is visible to screen readers only
</IressLabel>;
```

#### Rich content

Render custom content into the label.

```tsx
<IressLabel>
  <IressInline gap="md" verticalAlign="middle">
    <IressIcon name="home" />
    Home settings
    <IressIcon name="cog" />
  </IressInline>
</IressLabel>;
```

#### Locked readonly

Use `readOnly="locked"` when the field is read-only due to permissions. Adds a lock indicator.

```tsx
<IressLabel readOnly="locked">This label is locked</IressLabel>;
```

### Testing

Labels are typically queried indirectly through the form control they describe:

```tsx
const input = screen.getByLabelText('Email address');
```

[View test IDs](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-label--docs#testing)


#### Test selectors

| Part | Description | Recommended Query | Test ID |
|------|-------------|-------------------|---------|
| main | The root element of the label | `getByText('...')` | `label` |
| text | The label text content | — | `label__text` |

---

### Storybook

[View in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-label--docs)

## Specifications

### Behaviour

| State | Behaviour |
|-------|-----------|
| Default | Renders as a `<label>` element associated via `htmlFor` |
| Without `htmlFor` | Renders as a `<strong>` element for non-interactive content |
| Required | Displays an asterisk before the label text |
| Hidden | Visually hidden but remains in the accessibility tree |
| Locked readonly | Displays a lock icon indicator |

### Accessibility

**WCAG compliance:**

- **1.3.1 Info and Relationships** — Programmatically associates label with input via `htmlFor`
- **2.5.3 Label in Name** — Visible label text matches the accessible name

**Do not** place interactive elements (anchors, buttons) inside `IressLabel`. This makes it difficult to activate the associated form input. See [MDN Label accessibility](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label#accessibility_concerns).

**Keyboard interaction:**

| Key | Action |
|-----|--------|
| Click on label | Focuses the associated form control |

### Edge cases

- **Labelling non-interactive content**: Omit `htmlFor` to render as `<strong>` instead of `<label>`
- **Nested test IDs**: `my-label__text` reaches the label text span
- **Rich content**: Custom children are rendered inside the label element

---

# Link

> Renders a navigational anchor styled consistently with the design system.

## Import

```tsx
import { IressLink } from '@iress-oss/ids-components';
```

- [Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-link--docs)
- [Source](https://github.com/iress/design-system/tree/main/packages/components/src/components/Link)
- [Report issue](https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=link&title=[Link]+Bug:+)
- [Request feature](https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=link,enhancement&title=[Link]+Feature:+)

## Props

> Required props are **bold**.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| data-testid | `string` | — | The data-testid attribute is used to target elements in automated tests if no identifier is available. In some components it is propagated to child elements.  Notes: - Please use this prop sparingly and only when no other identifier is available, as per the guiding principles of Testing Library. - Only use this prop for your tests @see https://testing-library.com/docs/queries/bytestid |
| active | `boolean` | — | Sets the active state of the link, usually used to indicate the link has activated a modal, popover or slideout. |
| append | `ReactNode` | — | Content for the append slot. |
| children | `ReactNode` | — | Content is placed between prepend and append if provided. Used to describe the expected intention of this link. |
| element | `ElementType` | — | Change the component that will be rendered as the link, used for third-party libraries that require a specific element type. By default, it will render a button or an anchor tag based on the `href` prop. |
| href | `string` | — | Contains a URL or a URL fragment that the hyperlink points to. If this property is set, an anchor tag will be rendered. |
| loading | `boolean, string ` | `false` | When true, button is in loading state. If provided a string, will be used as the loading text for screen readers. |
| onClick | `MouseEventHandler<Exclude<Parameters<Exclude<ButtonRef<C, THref>, undefined>>[0], null>>` | — | Emitted when the menu item is clicked. |
| prepend | `ReactNode` | — | Content for the prepend slot. |

📄 [Full type definition](../../dist/components/Link/Link.d.ts)

Also accepts all [styling props](../styling-props/overview.md) ([type definition](../../dist/interfaces.d.ts), [token values](../tokens/tokens-reference.md)).

A link is used to navigate to another page or location.

```tsx
<IressInline gap="md">
  <IressLink prepend={<IressIcon name="home" />}>Prepend icon</IressLink>

  <IressLink append={<IressIcon name="home" />}>Append icon</IressLink>
</IressInline>;
```

## Design

### When to use

- **Inline navigation**: Include a link alongside static text to navigate elsewhere
- **Contextual references**: Link to related pages, documentation, or resources
- **Loading actions**: Trigger asynchronous actions that navigate on completion

### When not to use

- **Call to action at the start/end of content** — use [Button](../components/button.md) instead
- **Primary form actions** (submit, save) — use [Button](../components/button.md) instead
- **Navigation menus** — use dedicated navigation patterns like [SideNav](../patterns/side-nav.md)

### Do's and Don'ts

| ✅ Do | ❌ Don't |
|-------|----------|
| Use descriptive link text that makes sense out of context | Use "click here" or "read more" as link text |
| Use `href` for navigation to render as `<a>` | Omit `href` when the link navigates (renders as `<button>`) |
| Use `prepend`/`append` for icons | Use `slot` attributes on children (legacy v4 pattern) |
| Keep link text concise | Wrap entire paragraphs in a link |

### Content guidelines

- **Link text**: Should describe the destination or action clearly (e.g. "View account settings", not "Click here")
- **External links**: Append an external link icon via `append` to indicate navigation away from the app
- **Loading text**: Provide `loadingText` for screen readers to announce during async actions

### Related patterns

- [Button](../components/button.md) — for primary actions and calls to action
- [Breadcrumbs](../patterns/breadcrumbs.md) — for navigation hierarchy
- [SideNav](../patterns/side-nav.md) — for application navigation menus

## Develop

### Quick Start

```tsx
import { IressLink } from '@iress-oss/ids-components';

<IressLink href="//iress.com">IressLink</IressLink>;
```

[View all props](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-link--docs#api-props)

### Usage

`IressLink` is an alternative to the `IressButton` component, and is used when you want to add interactive text inside a block of static text.

If you provide a `href`, it will render as an `<a />` element. Otherwise it will render as a `<button />` element. This helps ensure it presents the correct role to assistive technologies for the best accessibility.

#### Loading

Loading links give the user an indication something is happening (eg. a form submission or extra content being loaded) after they have been triggered.

The loading state can be activated by setting the `loading` prop to `true` and providing some `loadingText` for screenreaders to announce when in loading state (which defaults to Loading...).

When the loading state is activated, any click events on the link are disabled.

```tsx
<IressLink loading>Link text</IressLink>;
```

#### Prepend & Append

Use the `prepend` and `append` props to correctly position icons or badges inside links.

- **`prepend`** — Places the element before the link text
- **`append`** — Places the element after the link text

> ⚠️ **Do not use `slot` attributes on children** (e.g. `<IressIcon slot="start" />`). The `slot` attribute is a legacy v4 pattern that is no longer supported. Always use the `prepend` and `append` props.

```tsx
<IressInline gap="md">
  <IressLink prepend={<IressIcon name="home" />}>Prepend icon</IressLink>

  <IressLink append={<IressIcon name="home" />}>Append icon</IressLink>
</IressInline>;
```

#### Element

You can use the `element` prop to render a custom component as the link. This is useful for rendering a component from a third-party library, such as `react-router-dom`.

```tsx
import { IressLink } from '@iress-oss/ids-components';
import { type HTMLAttributes, forwardRef } from 'react';

/**
 * This could be the `Link` component from `react-router-dom` or any other routing library.
 */
const Link = forwardRef<
  HTMLAnchorElement,
  HTMLAttributes<HTMLAnchorElement> & { to: string }
>(({ children, className, to, ...restProps }, ref) => (
  <div className={className}>
    <a href={to} ref={ref} {...restProps}>
      {children}
    </a>
  </div>
));

export const RoutingLink = () => (
  <IressLink element={Link} to="https://iress.com">
    Iress
  </IressLink>
);
```

### Testing

Query links by their accessible role:

```tsx
const link = screen.getByRole('link', { name: 'Learn more' });
```

When no `href` is provided, the link renders as a button:

```tsx
const button = screen.getByRole('button', { name: 'Show details' });
```


#### Test selectors

| Part | Description | Recommended Query | Test ID |
|------|-------------|-------------------|---------|
| main | The root element of the link | `getByRole('link', { name: '...' })` when an href is provided, otherwise `getByRole('button', { name: '...' })` | `link` |

---

### Storybook

Storybook provides an interactive playground for testing different prop combinations and viewing accessibility attributes.

[View in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-link--docs)

## Specifications

### Behaviour

| State | Behaviour |
|-------|-----------|
| Default | Renders as `<a>` when `href` is provided, otherwise `<button>` |
| Loading | Disables click events and announces `loadingText` to screen readers |
| With `element` prop | Renders as a custom component (e.g. React Router `Link`) |

### Accessibility

**WCAG compliance:**

- **2.4.4 Link Purpose** — Link text should describe its destination or action
- **4.1.2 Name, Role, Value** — Renders correct role (`link` or `button`) based on `href`
- **1.3.1 Info and Relationships** — Prepend/append content is included in the accessible name

**Keyboard interaction:**

| Key | Action |
|-----|--------|
| `Enter` | Activates the link |
| `Tab` | Moves focus to the next focusable element |

### Edge cases

- **No `href` and no `onClick`**: Link renders as a `<button>` with no action — ensure one is always provided
- **Loading state**: Click events are disabled; users cannot trigger the link again until loading completes

---

### Storybook

Storybook provides an interactive playground for testing different prop combinations and viewing accessibility attributes.

[View in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-link--docs)

---

# Menu

> Displays a list of navigational or actionable items.

## Import

```tsx
import { IressMenu } from '@iress-oss/ids-components';
```

- [Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-menu--docs)
- [Source](https://github.com/iress/design-system/tree/main/packages/components/src/components/Menu)
- [Report issue](https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=menu&title=[Menu]+Bug:+)
- [Request feature](https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=menu,enhancement&title=[Menu]+Feature:+)

## Props

> Required props are **bold**.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| changeOnBlur | `boolean` | — | If set to true, change event will be fired with the correctly selected value. |
| children | `ReactNode` | — | Content of the menu, usually multiple `IressMenuItem`, `IressMenuHeading`, `IressMenuText` or `IressMenuDivider`. |
| defaultSelected | `[ControlledValue](../../dist/hooks/useControlledState.d.ts)<T, TMultiple>` | — | Initially selected values of menu when `role` is listbox. Used for uncontrolled menus. |
| fluid | `boolean` | — | If set to true, menu will fill the width of its container. |
| id | `string` | — | Unique ID of the menu. If not provided, will be automatically generated. Used to add aria attributes for accessibility. |
| layout | `inline-equal-width`, `inline` , `stack`  | `stack` | Sets whether the layout is vertical (stack) or horizontal (inline/inline-equal-width). |
| multiSelect | `boolean` | — | If set to true, menu items will contain checkboxes. |
| noWrap | `boolean` | — | If set to true, menu items will not wrap onto a separate line when space is exceeded. |
| numbered | `boolean` | — | Add a numbered header style to the menu group. Only used when variant is 'side'. |
| onChange | `((value?: [ControlledValue](../../dist/hooks/useControlledState.d.ts)<T, TMultiple> , null) => void)` | — | Emitted when the menu value changes |
| selected | `[ControlledValue](../../dist/hooks/useControlledState.d.ts)<T, TMultiple>` | — | Selected values of menu when `role` is listbox. Used for controlled menus. |
| role | `list` , `listbox`, `menu`  | `list` | Type of menu, corresponding to [aria-roles](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles). Will be set automatically when used inside popover or when the `multiSelect` prop is set to true. |
| variant | `MenuVariants` | — | The variant of the menu, which determines some opinionated styles for the menu items |
| data-testid | `string` | — | The data-testid attribute is used to target elements in automated tests if no identifier is available. In some components it is propagated to child elements.  Notes: - Please use this prop sparingly and only when no other identifier is available, as per the guiding principles of Testing Library. - Only use this prop for your tests @see https://testing-library.com/docs/queries/bytestid |

📄 [Full type definition](../../dist/components/Menu/Menu.d.ts)

Also accepts all [styling props](../styling-props/overview.md) ([type definition](../../dist/interfaces.d.ts), [token values](../tokens/tokens-reference.md)).

### IressMenuItem Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| data-testid | `string` | — | The data-testid attribute is used to target elements in automated tests if no identifier is available. In some components it is propagated to child elements.  Notes: - Please use this prop sparingly and only when no other identifier is available, as per the guiding principles of Testing Library. - Only use this prop for your tests @see https://testing-library.com/docs/queries/bytestid |
| append | `ReactNode` | — | Section after menu item content. |
| canToggle | `boolean` | — | When true, the item can be toggled even in single-select mode. |
| children | `ReactNode` | — | The children to be rendered inside the menu item, describing the action. |
| className | `string` | — | The class name to be applied to the menu item. |
| divider | `boolean` | — | Adds a divider after any content. If you would like to add a divider before the menu item, use a `<IressMenuDivider />` instead. |
| element | `ElementType` | — | Change the component that will be rendered as the menu item, used for third-party libraries that require a specific element type. By default, it will render a button or an anchor tag based on the `href` prop. |
| href | `string` | — | Contains a URL or a URL fragment that the hyperlink points to. If this property is set and no `element` was set, an anchor tag will be rendered. Otherwise, a button will be rendered. |
| icon | [MaterialSymbol](https://fonts.google.com/icons?icon.set=Material+Symbols) | — | The icon to be displayed in the button. If provided, the icon will be displayed and the `children` will be used as screen reader text (although you can explicitly override this with `aria-label`) |
| listItemStyle | `[IressCustomiseSlot](../../dist/interfaces.d.ts)` | — | Style overrides for the menu item wrapper, which is the element rendered at the top level and contains a `role` attribute for accessibility. This is useful for menu item variants that require additional structure, such as the side nav drawer items. This is only applicable for the `listitem` role, as other roles will have the `role` attribute applied directly to the menu item element itself. |
| onBlur | `FocusEventHandler<Exclude<Parameters<Exclude<ButtonRef<C, THref>, undefined>>[0], null>>` | — | Emitted when the menu item is blurred. |
| onClick | `MouseEventHandler<Exclude<Parameters<Exclude<ButtonRef<C, THref>, undefined>>[0], null>>` | — | Emitted when the menu item is clicked. |
| onKeyDown | `KeyboardEventHandler<Exclude<Parameters<Exclude<ButtonRef<C, THref>, undefined>>[0], null>>` | — | Emitted when a key is pressed while focused on the menu item. |
| loading | `boolean, string ` | — | When true, button is in loading state. If provided a string, will be used as the loading text for screen readers. |
| prepend | `ReactNode` | — | Section before menu item content. |
| selected | `boolean` | — | When true, shows the item in selected state. |
| value | `[FormControlValue](../../dist/types.d.ts)` | — | To be used when menu type is listbox. |

📄 [Full type definition](../../dist/components/MenuItem/MenuItem.d.ts)

### IressMenuHeading Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| data-testid | `string` | — | The data-testid attribute is used to target elements in automated tests if no identifier is available. In some components it is propagated to child elements.  Notes: - Please use this prop sparingly and only when no other identifier is available, as per the guiding principles of Testing Library. - Only use this prop for your tests @see https://testing-library.com/docs/queries/bytestid |
| element | `[IressTextElements](../../dist/components/MenuHeading/MenuHeading.d.ts)` | `'h2' as E` | The HTML element that should be rendered. |
| append | `ReactNode` | — | Section after menu item content. |
| divider | `boolean` | — | Adds a divider after any content. If you would like to add content before the menu item, use a `<hr />` instead. |
| prepend | `ReactNode` | — | Section before menu item content. |

📄 [Full type definition](../../dist/components/MenuHeading/MenuHeading.d.ts)

### IressMenuDivider Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| data-testid | `string` | — | The data-testid attribute is used to target elements in automated tests if no identifier is available. In some components it is propagated to child elements.  Notes: - Please use this prop sparingly and only when no other identifier is available, as per the guiding principles of Testing Library. - Only use this prop for your tests @see https://testing-library.com/docs/queries/bytestid |

📄 [Full type definition](../../dist/components/MenuDivider/MenuDivider.d.ts)

### IressMenuGroup Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| data-testid | `string` | — | The data-testid attribute is used to target elements in automated tests if no identifier is available. In some components it is propagated to child elements.  Notes: - Please use this prop sparingly and only when no other identifier is available, as per the guiding principles of Testing Library. - Only use this prop for your tests @see https://testing-library.com/docs/queries/bytestid |
| active | `boolean` | — | Whether this header is active/expanded, revealing child drawer items. Only used when parent Menu has variant="side". |
| append | `string , number , bigint , boolean , (ReactElement> & string) | (Iterable<ReactNode> & string) | ... 23 more ...` | — | Append an element after the label. Only used when variant is 'subdraw' to add an icon indicating a submenu. By default, a right arrow icon is used when variant is 'subdraw', so this prop is only needed if you want to override that. Section after menu item content. |
| **label** | `ReactNode` | — | Label for the group, displayed as a non-selectable heading. |
| children | `ReactNode` | — | Items within the group (typically menu items). |
| defaultActive | `boolean` | — | Uncontrolled default for the active/expanded state. Only used when parent Menu has variant="side". |
| divider | `boolean` | — | Adds a divider after the group. Adds a divider after any content. If you would like to add content before the menu item, use a `<hr />` instead. |
| element | ... 164 more ..., `article` , `circle` , `code` , `details` , `div` , `filter` , `footer` , `html` , `iframe` , `image` , `input` , `object` , `p` , `slot` , `span` , `style` , `symbol` , `title`  | — | Custom element type for the activator (e.g. for third-party routing). Only used when parent Menu has variant="side". The HTML element that should be rendered. |
| href | `string` | — | URL for the group activator link. Only used when parent Menu has variant="side". |
| onActiveChange | `((active?: boolean) => void)` | — | Callback fired when the active/expanded state changes. Only used when parent Menu has variant="side". |
| variant | `MenuVariants` | — | Variant of the menu group. - `undefined` (default): Renders inline with label as heading and children below. - `'subdraw'`: Renders as a trigger that opens a fly-over submenu containing children. - `'side'`: Renders as a numbered header with an expandable drawer containing children. |

📄 [Full type definition](../../dist/components/MenuGroup/MenuGroup.d.ts)

A menu can display grouped action buttons, navigation items or headings.

```tsx
import {
  IressMenu,
  IressMenuDivider,
  IressMenuHeading,
  IressMenuItem,
} from '@iress-oss/ids-components';

export function MenuBasic() {
  return (
    <IressMenu defaultSelected="5">
      <IressMenuHeading>Menu heading</IressMenuHeading>
      <IressMenuItem value="2">Menu item (button)</IressMenuItem>
      <IressMenuDivider />
      <IressMenuItem href="https://iress.com">Menu item (link)</IressMenuItem>
      <IressMenuItem selected value="5">
        Menu item (selected)
      </IressMenuItem>
    </IressMenu>
  );
}
```

## Design

### When to use

Most menu use cases are already covered by higher-level patterns. Use `IressMenu` directly only when these don't fit:

| Need | Use instead |
|------|-------------|
| Action menu on a button click | [ContextualMenu](../patterns/contextual-menu.md) |
| Filterable option list in a dropdown | [DropdownMenu](../patterns/dropdown-menu.md) |
| Select from a list of options | [Select](../components/select.md) |
| Sidebar navigation with sections | [SideNav](../patterns/side-nav.md) |
| Overflow items in breadcrumbs | [Breadcrumbs](../patterns/breadcrumbs.md) |

Use raw `IressMenu` for:

- **Standalone visible menus** — navigation or action lists that are always visible (not in a popover)
- **Custom list interactions** — when you need `listbox` role with custom rendering
- **Inside a Popover** — when building your own popover + menu composition

### When not to use

- **Primary navigation** — use a dedicated navigation component or layout
- **Simple link lists** — use plain links if there's no grouping or interactivity needed
- **Form selects** — use a Select component for form submissions

### Do's and Don'ts

| ✅ Do | ❌ Don't |
|-------|----------|
| Set the correct `role` for the menu's purpose | Mix navigation links and action buttons in the same menu |
| Wrap navigation menus in a `<nav>` element | Use `slot` attributes on children (legacy v4 pattern) |
| Use `IressMenuDivider` to separate logical groups | Stack too many items without headings or dividers |
| Use `prepend` and `append` props for icons | Place complex interactive content inside menu items |

### Content guidelines

- **Labels**: Use sentence case, keep action-oriented (e.g. "Edit profile", "Delete")
- **Headings**: Use `IressMenuHeading` to label groups of related items
- **Dividers**: Separate logical sections visually

### Related patterns

- [ContextualMenu](../patterns/contextual-menu.md) — action menu triggered by a button
- [DropdownMenu](../patterns/dropdown-menu.md) — filterable dropdown with search
- [Select](../components/select.md) — select from a list of options
- [SideNav](../patterns/side-nav.md) — sidebar navigation with sections
- [Breadcrumbs](../patterns/breadcrumbs.md) — overflow navigation menu
- [Popover](../components/popover.md) — commonly wraps menus for contextual display

## Develop

### Quick Start

```tsx
import { IressMenu, IressMenuItem } from '@iress-oss/ids-components';

<IressMenu>
  <IressMenuItem>Action one</IressMenuItem>
  <IressMenuItem>Action two</IressMenuItem>
</IressMenu>;
```

[View all props](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-menu--docs#api-props)

### Usage

#### Basic

`IressMenuDivider`, `IressMenuHeading`, `IressMenuItem` and `IressMenuText` are supplied as children of the menu.

```tsx
import {
  IressMenu,
  IressMenuDivider,
  IressMenuHeading,
  IressMenuItem,
} from '@iress-oss/ids-components';

export function MenuBasic() {
  return (
    <IressMenu defaultSelected="5">
      <IressMenuHeading>Menu heading</IressMenuHeading>
      <IressMenuItem value="2">Menu item (button)</IressMenuItem>
      <IressMenuDivider />
      <IressMenuItem href="https://iress.com">Menu item (link)</IressMenuItem>
      <IressMenuItem selected value="5">
        Menu item (selected)
      </IressMenuItem>
    </IressMenu>
  );
}
```

#### Complex

`IressMenuItem`, `IressMenuHeading` and `IressMenuText` support `prepend`, `divider` and `append` props.

```tsx
import {
  IressIcon,
  IressMenu,
  IressMenuDivider,
  IressMenuHeading,
  IressMenuItem,
} from '@iress-oss/ids-components';

export function MenuComplex() {
  return (
    <IressMenu maxWidth="3/12">
      <IressMenuHeading prepend={<IressIcon name="sentiment_excited" />}>
        Heading with prepend
      </IressMenuHeading>
      <IressMenuItem
        value="3"
        divider
        selected
        prepend={<IressIcon name="flag" />}
        append={<IressIcon name="chevron-right" />}
      >
        Button with append and prepend
      </IressMenuItem>
      <IressMenuHeading
        element="h3"
        append={<IressIcon name="sentiment_excited" />}
        prepend={<IressIcon name="sentiment_excited" />}
      >
        Heading with append and prepend
      </IressMenuHeading>
      <IressMenuItem
        value="4"
        append={<IressIcon name="chevron-right" />}
        href="https://iress.com"
      >
        Link with append
      </IressMenuItem>
      <IressMenuDivider />
      <IressMenuItem value="6" append={<IressIcon name="chevron-right" />}>
        Button with append
      </IressMenuItem>
    </IressMenu>
  );
}
```

#### Secondary navigation

When `href` is set on `IressMenuItem`, it renders as a link. Wrap in a `<nav>` and set `role` to `list`.

```tsx
import { IressMenu, IressMenuItem } from '@iress-oss/ids-components';

export function MenuNavigation() {
  return (
    <nav aria-label="Secondary">
      <IressMenu>
        <IressMenuItem href="https://www.iress.com/software/financial-advice/">
          Financial advice
        </IressMenuItem>
        <IressMenuItem
          selected
          href="https://www.iress.com/software/trading-and-market-data/"
        >
          Trading and market data
        </IressMenuItem>
        <IressMenuItem href="https://www.iress.com/software/investment-management/">
          Investment management
        </IressMenuItem>
        <IressMenuItem href="https://www.iress.com/software/mortgages/">
          Mortgages
        </IressMenuItem>
      </IressMenu>
    </nav>
  );
}
```

#### Headings

Use `IressMenuHeading` with the `element` or `textStyle` prop for heading levels.

```tsx
import {
  IressMenu,
  IressMenuHeading,
  IressMenuItem,
} from '@iress-oss/ids-components';

export function MenuHeadings() {
  return (
    <IressMenu>
      <IressMenuHeading element="h4">Menu heading (h4)</IressMenuHeading>
      <IressMenuItem>Menu item 1</IressMenuItem>
      <IressMenuHeading element="h5">Menu heading (h5)</IressMenuHeading>
      <IressMenuItem>Menu item 2</IressMenuItem>
    </IressMenu>
  );
}
```

#### Dividers

Use `IressMenuDivider` or the `divider` prop on items for visual separation.

```tsx
import {
  IressMenu,
  IressMenuDivider,
  IressMenuHeading,
  IressMenuItem,
} from '@iress-oss/ids-components';

export function MenuDividers() {
  return (
    <IressMenu>
      <IressMenuHeading element="h4" divider>
        Menu heading (h4)
      </IressMenuHeading>
      <IressMenuItem>Menu item 1</IressMenuItem>
      <IressMenuItem divider>Menu item 2</IressMenuItem>
      <IressMenuHeading element="h5">Menu heading (h5)</IressMenuHeading>
      <IressMenuItem selected>Menu item 3</IressMenuItem>
      <IressMenuItem>Menu item 4</IressMenuItem>
      <IressMenuDivider />
      <IressMenuItem>Menu item 5</IressMenuItem>
    </IressMenu>
  );
}
```

#### Fluid menus

Set `fluid` to stretch the menu to its container width.

```tsx
<IressMenu fluid>
  <IressMenuItem value="1">Menu item 1</IressMenuItem>
  <IressMenuItem value="2">Menu item 2</IressMenuItem>
</IressMenu>;
```

#### Layout

The `layout` prop supports `stack` (default), `inline`, and `inline-equal-width`.

```tsx
import {
  IressMenu,
  IressMenuItem,
  IressStack,
  IressText,
} from '@iress-oss/ids-components';

export function MenuLayout() {
  return (
    <IressStack gap="lg">
      <IressText>
        <h3>Stack (default)</h3>
        <IressMenu layout="stack" defaultSelected="1">
          <IressMenuItem value="1">Option 1</IressMenuItem>
          <IressMenuItem value="2">Option 2</IressMenuItem>
          <IressMenuItem value="3">Option 3</IressMenuItem>
          <IressMenuItem value="4">Option 4</IressMenuItem>
          <IressMenuItem value="5">Option 5</IressMenuItem>
        </IressMenu>
      </IressText>
      <IressText>
        <h3>Inline</h3>
        <IressMenu layout="inline" defaultSelected="1">
          <IressMenuItem value="1">Option 1</IressMenuItem>
          <IressMenuItem value="2">Option 2</IressMenuItem>
          <IressMenuItem value="3">Option 3</IressMenuItem>
          <IressMenuItem value="4">Option 4</IressMenuItem>
          <IressMenuItem value="5">Option 5</IressMenuItem>
        </IressMenu>
      </IressText>
      <IressText>
        <h3>Inline Equal Width</h3>
        <IressMenu layout="inline-equal-width" defaultSelected="1">
          <IressMenuItem value="1">Option 1</IressMenuItem>
          <IressMenuItem value="2">Option 2</IressMenuItem>
          <IressMenuItem value="3">Option 3</IressMenuItem>
          <IressMenuItem value="4">Option 4</IressMenuItem>
          <IressMenuItem value="5">Option 5</IressMenuItem>
        </IressMenu>
      </IressText>
    </IressStack>
  );
}
```

#### Text wrapping

Use `noWrap` to prevent menu item text from wrapping.

```tsx
<IressInline>
  <IressMenu width="input.12">
    <IressMenuItem>Menu item with some text that wraps</IressMenuItem>
  </IressMenu>
  <IressMenu width="input.12" noWrap>
    <IressMenuItem>Non wrapping menu item with some text</IressMenuItem>
  </IressMenu>
</IressInline>;
```

#### Prepend & Append

Use `prepend` and `append` props to position content before or after item text.

```tsx
import {
  IressIcon,
  IressMenu,
  IressMenuHeading,
  IressMenuItem,
  IressPill,
} from '@iress-oss/ids-components';

export function MenuSlots() {
  return (
    <IressMenu role="menu">
      <IressMenuHeading prepend={<IressIcon name="cog" />}>
        Prepend slot
      </IressMenuHeading>
      <IressMenuItem prepend={<IressIcon name="file-alt" />}>
        New file
      </IressMenuItem>
      <IressMenuItem divider prepend={<IressIcon name="save" />}>
        Save file as
      </IressMenuItem>
      <IressMenuHeading append={<IressIcon name="link" />}>
        Append slot
      </IressMenuHeading>
      <IressMenuItem
        href="https://www.iress.com"
        append={<IressIcon name="chevron-right" />}
      >
        Visit the Iress website
      </IressMenuItem>
      <IressMenuItem
        href="https://google.com"
        append={<IressPill>8+</IressPill>}
      >
        Visit Google
      </IressMenuItem>
    </IressMenu>
  );
}
```

#### Roles

The `role` prop changes both the ARIA role and interaction model:

- `list` (default): navigated with `Tab`
- `menu`: navigated with arrow keys
- `listbox`: selectable items, navigated with arrow keys

```tsx
import { useState } from 'react';
import {
  IressButton,
  IressButtonGroup,
  IressInline,
  IressMenu,
  IressMenuItem,
  IressStack,
  IressText,
  IressToggle,
} from '@iress-oss/ids-components';

export function MenuRoles() {
  const [role, setRole] = useState<'list' | 'menu' | 'listbox'>('list');
  const [multiSelect, setMultiSelect] = useState(false);

  return (
    <IressStack gap="md">
      <IressInline gap="md" verticalAlign="middle">
        <IressButtonGroup label="Menu role">
          <IressButton
            mode={role === 'list' ? 'primary' : 'secondary'}
            onClick={() => setRole('list')}
          >
            list
          </IressButton>
          <IressButton
            mode={role === 'menu' ? 'primary' : 'secondary'}
            onClick={() => setRole('menu')}
          >
            menu
          </IressButton>
          <IressButton
            mode={role === 'listbox' ? 'primary' : 'secondary'}
            onClick={() => setRole('listbox')}
          >
            listbox
          </IressButton>
        </IressButtonGroup>

        {role === 'listbox' && (
          <IressToggle
            checked={multiSelect}
            onChange={(checked) => setMultiSelect(checked)}
          >
            Multi-select
          </IressToggle>
        )}
      </IressInline>

      <IressText element="p" color="colour.neutral.70">
        {role === 'list' &&
          'List role: items are related context, navigated with tab key.'}
        {role === 'menu' &&
          'Menu role: items perform actions, arrow keys wrap around.'}
        {role === 'listbox' &&
          'Listbox role: items are selectable, like a <select> element.'}
      </IressText>

      <IressMenu
        role={role}
        multiSelect={role === 'listbox' ? multiSelect : undefined}
        aria-label="Role example"
      >
        <IressMenuItem value="1">Option 1</IressMenuItem>
        <IressMenuItem value="2">Option 2</IressMenuItem>
        <IressMenuItem value="3">Option 3</IressMenuItem>
      </IressMenu>
    </IressStack>
  );
}
```

#### Variants

- Default — for popovers, side menus, and navigation
- `subdraw` — adds arrow icons for sub-menu navigation
- `radio` — radio mark style (single select listbox only)

```tsx
import {
  IressMenu,
  IressMenuItem,
  IressStack,
} from '@iress-oss/ids-components';

export function MenuVariants() {
  return (
    <IressStack gap="lg">
      <IressMenu variant="radio" defaultSelected="5">
        <IressMenuItem value="1">Option 1</IressMenuItem>
        <IressMenuItem value="2">Option 2</IressMenuItem>
        <IressMenuItem value="3">Option 3</IressMenuItem>
        <IressMenuItem value="4">Option 4</IressMenuItem>
        <IressMenuItem value="5">Option 5</IressMenuItem>
      </IressMenu>
      <IressMenu variant="subdraw" maxWidth="input.12" defaultSelected="5">
        <IressMenuItem value="1">Option 1</IressMenuItem>
        <IressMenuItem value="2">Option 2</IressMenuItem>
        <IressMenuItem value="3">Option 3</IressMenuItem>
        <IressMenuItem value="4">Option 4</IressMenuItem>
        <IressMenuItem value="5">Option 5</IressMenuItem>
      </IressMenu>
      <IressMenu variant="side" maxWidth="input.12" defaultSelected="5">
        <IressMenuItem value="1">Option 1</IressMenuItem>
        <IressMenuItem value="2">Option 2</IressMenuItem>
        <IressMenuItem value="3">Option 3</IressMenuItem>
        <IressMenuItem value="4">Option 4</IressMenuItem>
        <IressMenuItem value="5">Option 5</IressMenuItem>
      </IressMenu>
      <IressMenu
        variant="side"
        maxWidth="input.12"
        defaultSelected="5"
        numbered
      >
        <IressMenuItem value="1">Option 1</IressMenuItem>
        <IressMenuItem value="2">Option 2</IressMenuItem>
        <IressMenuItem value="3">Option 3</IressMenuItem>
        <IressMenuItem value="4">Option 4</IressMenuItem>
        <IressMenuItem value="5">Option 5</IressMenuItem>
      </IressMenu>
    </IressStack>
  );
}
```

### Menu Group

`IressMenuGroup` groups related items under a common label.

```tsx
<IressMenu>
  <IressMenuGroup label="Fruits">
    <IressMenuItem>Apple</IressMenuItem>
    <IressMenuItem>Banana</IressMenuItem>
    <IressMenuItem>Orange</IressMenuItem>
  </IressMenuGroup>
  <IressMenuGroup label="Vegetables" divider>
    <IressMenuItem>Carrot</IressMenuItem>
    <IressMenuItem>Broccoli</IressMenuItem>
  </IressMenuGroup>
</IressMenu>;
```

### Menu Item

`IressMenuItem` is the individual item within a menu. It can be a button, link, or selectable option depending on the menu's role.

```tsx
import { IressMenu, IressMenuItem } from '@iress-oss/ids-components';

<IressMenu>
  <IressMenuItem value="edit">Edit</IressMenuItem>
  <IressMenuItem href="/settings">Settings</IressMenuItem>
</IressMenu>;
```

[View MenuItem props](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-menu-menuitem--docs#api-props)

#### Selected

```tsx
<IressMenuItem selected>Menu item</IressMenuItem>;
```

#### canToggle

```tsx
<IressMenuItem value={9} canToggle>
  Menu item
</IressMenuItem>;
```

#### Prepend and append

```tsx
<IressMenuItem
  prepend={<IressIcon name="home" />}
  append={<IressPill mode="70">New</IressPill>}
>
  Menu item
</IressMenuItem>;
```

#### Element (custom routing)

```tsx
import { IressMenu, IressMenuItem } from '@iress-oss/ids-components';
import { type HTMLAttributes } from 'react';

/**
 * This could be the `Link` component from `react-router-dom` or any other routing library.
 */
const Link = ({
  to,
  ...restProps
}: Omit<HTMLAttributes<HTMLAnchorElement>, 'href'> & { to: string }) => (
  <a {...restProps} href={to} />
);

export const RoutingLinkMenu = () => {
  return (
    <IressMenu role="menu" fluid>
      <IressMenuItem element={Link} to="https://iress.com" selected>
        Iress
      </IressMenuItem>
      <IressMenuItem element={Link} to="https://google.com">
        Google
      </IressMenuItem>
    </IressMenu>
  );
};
```

### Testing

Query menu items by their role:

```tsx
const menuItem = screen.getByRole('menuitem', { name: 'Settings' });
```

[View test IDs](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-menu--docs#testing)


#### Test selectors

| Part | Description | Recommended Query | Test ID |
|------|-------------|-------------------|---------|
| main | The root element of the menu | `getByRole('list')` by default, or `getByRole('menu')` / `getByRole('listbox')` depending on role prop | `menu` |
| activator | A menu group activator (propagated from IressMenuGroup data-testid) | `getByRole('button', { name: '...' })` | `<menugroup-testid>__activator` |
| subdraw | A subdraw container (propagated from IressMenuGroup data-testid) | — | `<menugroup-testid>__subdraw` |
| subdraw trigger | A subdraw trigger item (propagated from IressMenuGroup data-testid) | — | `<menugroup-testid>__subdraw__trigger` |
| checkbox mark | Checkbox indicator on a selectable item (propagated from IressMenuItem data-testid) | — | `<menuitem-testid>__checkbox-mark` |
| checkbox | Checkbox on a multi-select item (propagated from IressMenuItem data-testid) | — | `<menuitem-testid>__checkbox` |

---

### Storybook

[View in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-menu--docs)

## Specifications

### Behaviour

| State | Behaviour |
|-------|-----------|
| List role | Items navigated with `Tab`, rendered as `listitem` |
| Menu role | Items navigated with arrow keys, rendered as `menuitem` |
| Listbox role | Items are selectable, rendered as `option` |
| Fluid | Menu stretches to container width |
| Subdraw variant | Group labels open fly-over submenus on click |

### Accessibility

**WCAG compliance:**

- **4.1.2 Name, Role, Value** — Uses appropriate ARIA roles (`list`, `menu`, `listbox`) based on `role` prop
- **2.1.1 Keyboard** — All items are keyboard accessible with role-appropriate navigation
- **1.3.1 Info and Relationships** — Headings and groups provide semantic structure

**Keyboard interaction:**

| Key | Action |
|-----|--------|
| `Tab` | Navigate items (list role) |
| `Arrow Up` / `Arrow Down` | Navigate items (menu/listbox role) |
| `Enter` / `Space` | Activate focused item or toggle selection |
| `Escape` | Close subdraw menus |
| `Home` / `End` | Jump to first/last item (menu/listbox role) |

### Edge cases

- **Empty menu**: Renders an empty container with the appropriate role
- **Nested subdraws**: Support multi-level nesting; close on Escape or outside click
- **Mixed content**: Non-interactive items (`IressMenuText`, `IressMenuHeading`) are skipped during keyboard navigation

---

# Modal

> Displays content in a focused overlay dialog that requires user interaction.

## Import

```tsx
import { IressModal } from '@iress-oss/ids-components';
```

- [Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-modal--docs)
- [Figma](https://www.figma.com/design/youFqYT4CgpKxfLJQv80hf/WIP-Iress-Design-System-V6?node-id=7305-32822)
- [Source](https://github.com/iress/design-system/tree/main/packages/components/src/components/Modal)
- [Report issue](https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=modal&title=[Modal]+Bug:+)
- [Request feature](https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=modal,enhancement&title=[Modal]+Feature:+)

## Props

> Required props are **bold**.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| actions | `[IressAlertButtonProps](../../dist/components/Modal/Modal.d.ts)[]` | — | Opinionated action buttons rendered in the modal footer. Each action is rendered as an `IressButton` with the modal's status automatically applied. |
| children | `ReactNode` | — | Text to be displayed inside the modal. |
| closeText | `string` | `Close` | Screenreader text for close button. |
| container | `[FloatingUIContainer](../../dist/types.d.ts)` | — | The container element to render the modal into. By default, the modal will render at the end of the document body. |
| defaultShow | `boolean` | `false` | When set to `true` the modal will be visible by default. Use for uncontrolled modals. |
| disableBackdropClick | `boolean` | — | When set to `true`, users cannot exit the modal by clicking the backdrop or using the escape key. |
| fixedFooter | `boolean` | — | When set to `true` the modal's footer will always be visible and fixed to the bottom of the modal. |
| footer | `ReactNode` | — | Content to be rendered in the modal footer. If `actions` are also provided, this content will be rendered below the actions. |
| heading | `ReactElement>, string ` | — | Sets the heading for the modal. If passed an element, it will render the element with an id, to ensure its connection to the modal. |
| id | `string` | — | Unique ID for the modal. Use if you would like to open this modal from anywhere in your app using the `useModal` hook. |
| noCloseButton | `boolean` | — | When set to `true`, no close button will be rendered. You must add your own closing mechanism to ensure accessibility. |
| onShowChange | `((show: boolean) => void)` | — | Emitted when the modal has opened or closed internally. Use for controlled modals. |
| onStatus | ((status: `close` , `initial` , `open` , `unmounted`) => void) | — | Emitted when the modal has mounted, unmounted, opened or closed. Open and close occur before animation begins. |
| onEntered | `(() => void)` | — | Emitted when the modal has opened. |
| onExited | `(() => void)` | — | Emitted when the modal has closed. |
| show | `boolean` | — | When set to `true` the modal will be visible. Use for controlled modals. |
| size | `lg`, `md` , `sm`  | — | Size of the modal: - `sm`: Small modals communicate the outcome of an irreversible action. They should be concise and straightforward, containing a single action and, in some cases, a single input field. - `md`: Medium modals provide optional supporting information to help users understand the context of a word or screen. They may contain a single action and, in some cases, a larger input such as a textarea. - `lg`: Large modals are used for more complex tasks that require multiple steps or a lot of information as well as media such as video and PDF documents. They can contain multiple actions, inputs, and supporting information.  If status is set, size can only be `sm` or `md`, and will default to `sm`. If status is not set, size can be `sm`, `md` or `lg`, and will default to `md`. |
| static | `boolean` | — | When set to `true`, the modal will act like a static element when open. This means it will not lock scroll or focus within the modal. Note: This is used internally to display modals in Styler. It is not recommended to use this prop in your own applications. |
| status | `ModalStatus` | — | Sets the status style of the modal with an accompanying status icon. Use status modals for communicating outcomes of actions. - `danger`: Communicates destructive or critical action outcomes. - `success`: Communicates successful completions. - `warning`: Communicates important cautions before proceeding. |
| data-testid | `string` | — | The data-testid attribute is used to target elements in automated tests if no identifier is available. In some components it is propagated to child elements.  Notes: - Please use this prop sparingly and only when no other identifier is available, as per the guiding principles of Testing Library. - Only use this prop for your tests @see https://testing-library.com/docs/queries/bytestid |

📄 [Full type definition](../../dist/components/Modal/Modal.d.ts)

Also accepts all [styling props](../styling-props/overview.md) ([type definition](../../dist/interfaces.d.ts), [token values](../tokens/tokens-reference.md)).

Modals gather information, complete a subtask, or provide additional information without losing the context of an underlying page.

```tsx
<IressModal footer="Footer slot" show static>
  Modal content
</IressModal>;
```

## Design

### When to use

- **Subtasks**: Gathering information required by the underlying page (e.g. form inputs)
- **Confirmations**: Requiring explicit user acknowledgement before a destructive action
- **Supplemental content**: Providing non-essential information related to the underlying page
- **Full attention**: Content that requires the user's undivided focus

Use modals sparingly — only when the task has a **direct relationship** to the underlying screen and requires the user's full attention.

#### Choosing a size

| Size | Use case | Example |
|------|----------|---------|
| **Small** | Communicate the outcome of an irreversible action. Concise, single action, optionally one input field. | Terms acceptance, delete confirmation, simple acknowledgement |
| **Medium** | Provide optional supporting information or context. May contain a single action and larger inputs like a textarea. | Help content, detailed descriptions, feedback forms |
| **Large** | Facilitate sub-flows within a primary flow. Used when the action impacts the underlying screen but doesn't warrant a separate page. | CSV upload wizard, multi-step forms, bulk operations |

### When not to use

- **Brief status messages** — use [Alert](../components/alert.md) or [Toaster](../components/toaster.md) instead
- **Content that can be inline** — incorporate into the page without complicating its intent
- **Secondary workflows** — use a [Slideout](../components/slideout.md) for tasks that don't require blocking the page

#### Use a page instead of a modal when:

- **The task is complex or multi-step** — if it takes more than 2-3 steps or has branching logic, it deserves its own page with a proper URL
- **The user needs to reference other content** — modals block the underlying page; if users need to cross-reference data, use a page or slideout
- **The content is long or scrollable** — if the modal would need significant scrolling, the content is too complex for a modal
- **The task can be bookmarked or shared** — modals don't have URLs; if the task needs a permalink, use a page
- **The user may need to leave and return** — modals lose state when closed; for tasks that take time or need saving as draft, use a page
- **It contains a full form with many fields** — forms with more than 5-6 fields should be a dedicated page, not crammed into a modal

> **Rule of thumb:** If you're reaching for `size="lg"` and `fixedFooter`, ask whether a dedicated page would be more appropriate. Large modals should be the exception, not the norm.

For a full comparison of feedback components, see the [Feedback pattern](../patterns/feedback.md).

### Do's and Don'ts

| ✅ Do | ❌ Don't |
|-------|----------|
| Provide a clear way to dismiss the modal (close button, cancel action) | Remove all dismissal methods without providing an alternative |
| Use status modals for confirmations and alerts | Use modals for transient success messages |
| Keep modal content focused on a single task | Nest modals inside other modals |
| Use appropriate size for the content | Use large modals for short confirmation messages |

### Content guidelines

- **Heading**: Use sentence case, describe the task or question
- **Body**: Keep content focused — if it's too long, consider a Slideout or separate page
- **Actions**: Place primary action on the right, cancel/secondary on the left
- **Status modals**: Use `danger` for destructive confirmations, `warning` for caution, `success` for completion

### Related patterns

- [Feedback](../patterns/feedback.md) — decision tree for choosing the right feedback component
- [Slideout](../components/slideout.md) — for longer secondary workflows
- [Alert](../components/alert.md) — for inline persistent messages
- [Toaster](../components/toaster.md) — for transient confirmations

## Develop

### Quick Start

```tsx
import { IressModal } from '@iress-oss/ids-components';

<IressModal heading="Modal Header">
  <p>Modal content goes here.</p>
</IressModal>;
```

[View all props](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-modal--docs#api-props)

### Usage

#### Using the `show` property

You can use state to control the modal by setting the `show` property to `true` or `false`. To sync your state with the modal, use the `onShowChange` prop.

```tsx
import { IressButton, IressModal } from '@iress-oss/ids-components';
import { useState } from 'react';

export function ModalUsingState() {
  const [show, setShow] = useState(false);

  return (
    <>
      <IressButton onClick={() => setShow(true)}>
        Show modal using state
      </IressButton>
      <IressModal
        heading="Modal heading"
        show={show}
        onShowChange={setShow}
        footer={<IressButton onClick={() => setShow(false)}>Close</IressButton>}
      >
        Modal content goes here.
      </IressModal>
    </>
  );
}
```

#### Using the `IressModalProvider`

Use `IressModalProvider` to open and close modals from anywhere in your application via a unique `id` and the `useModal` hook.

> **Note:** If you are already using `IressProvider` or `IressShadow`, you do not need to add `IressModalProvider` separately — it is already included.

```tsx
import {
  IressButton,
  IressModal,
  type IressModalProps,
  IressModalProvider,
  useModal,
} from '@iress-oss/ids-components';

const MODAL_ID = 'storybook-modal';

export const App = (modalProps: IressModalProps) => (
  <IressModalProvider>
    <ModalWithTrigger {...modalProps} />
  </IressModalProvider>
);

const ModalWithTrigger = ({
  id = MODAL_ID,
  ...modalProps
}: IressModalProps) => {
  const { showModal } = useModal();

  return (
    <>
      <IressButton onClick={() => showModal(id)}>
        Show modal using provider
      </IressButton>
      <IressModal
        {...modalProps}
        id={id}
        footer={
          <IressButton onClick={() => showModal(id, false)}>Close</IressButton>
        }
      >
        {modalProps.children ?? 'Modal content'}
      </IressModal>
    </>
  );
};
```

#### Heading

The `heading` prop sets a heading for the modal, rendered in the header and announced by screen readers when opened.

```tsx
<IressModal heading="Modal heading" id={MODAL_ID}>
  Modal content goes here.
</IressModal>;
```

#### Footer

Use the `footer` prop to place content underneath the main content, usually for buttons.

```tsx
import { IressButton, IressModal, useModal } from '@iress-oss/ids-components';

const MODAL_ID = 'storybook-modal';

export function ModalWithButton() {
  const { showModal } = useModal();

  return (
    <>
      <IressButton onClick={() => showModal(MODAL_ID)}>Show modal</IressButton>
      <IressModal
        id={MODAL_ID}
        show={false}
        heading="Modal heading"
        footer={<IressButton>Close</IressButton>}
      >
        Modal content goes here.
      </IressModal>
    </>
  );
}
```

#### Fixed footer

The `fixedFooter` prop fixes the footer to the bottom of the modal, useful when main content scrolls.

> **Using with popovers and tooltips**
>
> The fixed footer variant prevents content from overflowing the modal. This can
> cause layout issues with components that use popovers (e.g. Select). Try using
> a modal without a fixed footer if you encounter these issues.

```tsx
import {
  IressButton,
  IressModal,
  IressText,
  useModal,
} from '@iress-oss/ids-components';

const MODAL_ID = 'fixed-footer-modal';

export function ModalFixedFooter() {
  const { showModal } = useModal();

  return (
    <>
      <IressButton onClick={() => showModal(MODAL_ID)}>
        Show scrollable modal
      </IressButton>
      <IressModal
        id={MODAL_ID}
        show={false}
        heading="Terms and Conditions"
        footer={<IressButton mode="primary">I agree</IressButton>}
        fixedFooter
      >
        <IressText>
          <p>
            Please read the following terms carefully. The footer below remains
            fixed while you scroll through the content.
          </p>
          <h3>1. Acceptance of Terms</h3>
          <p>
            By accessing and using this service, you accept and agree to be
            bound by the terms and provision of this agreement.
          </p>
          <h3>2. Use of Service</h3>
          <p>
            You agree to use the service only for purposes that are permitted by
            these Terms and any applicable law, regulation or generally accepted
            practices or guidelines.
          </p>
          <h3>3. Privacy Policy</h3>
          <p>
            Your privacy is important to us. Our Privacy Policy explains how we
            collect, use, and protect your personal information when you use our
            services.
          </p>
          <h3>4. Account Security</h3>
          <p>
            You are responsible for safeguarding the password that you use to
            access the service and for any activities or actions under your
            account.
          </p>
          <h3>5. Intellectual Property</h3>
          <p>
            The service and its original content, features and functionality are
            owned by the company and are protected by international copyright,
            trademark and other intellectual property laws.
          </p>
          <h3>6. Termination</h3>
          <p>
            We may terminate or suspend your account immediately, without prior
            notice or liability, for any reason whatsoever, including without
            limitation if you breach the Terms.
          </p>
        </IressText>
      </IressModal>
    </>
  );
}
```

#### Size

The `size` prop can be set to `sm`, `md` or `lg`. Defaults to `md`.

```tsx
import {
  IressButton,
  IressCard,
  IressCheckbox,
  IressCol,
  IressDivider,
  IressExpander,
  IressField,
  IressInline,
  IressInput,
  IressModal,
  IressProgress,
  IressSelect,
  IressRow,
  IressStack,
  IressTable,
} from '@iress-oss/ids-components';
import { useState } from 'react';
import modalIsDone from './modal-is-done.svg';

const SmallModal = () => {
  const [show, setShow] = useState(false);

  return (
    <>
      <IressCard
        heading="Small modal"
        stretch
        footer={
          <IressButton onClick={() => setShow(true)}>
            View small modal example
          </IressButton>
        }
      >
        <p>
          Small modals communicate the outcome of an irreversible action. They
          should be concise and straightforward, containing a single action and,
          in some cases, a single input field.
        </p>
      </IressCard>

      <IressModal
        size="sm"
        heading="Terms of service update"
        footer={
          <IressButton mode="primary" onClick={() => setShow(false)}>
            Accept
          </IressButton>
        }
        disableBackdropClick
        show={show}
        onShowChange={setShow}
      >
        <p>
          A change in our <a href="#">terms of service</a> takes effect on July
          1st, 2024. Please read and accept the terms.
        </p>
        <IressCheckbox>I accept the terms of service</IressCheckbox>
      </IressModal>
    </>
  );
};

const MediumModal = () => {
  const [show, setShow] = useState(false);

  return (
    <>
      <IressCard
        stretch
        heading="Medium modal"
        footer={
          <IressButton onClick={() => setShow(true)}>
            View medium modal example
          </IressButton>
        }
      >
        <p>
          Medium modals provide optional supporting information to help users
          understand the context of a word or screen. They may contain a single
          action and, in some cases, a larger input such as a textarea.
        </p>
      </IressCard>

      <IressModal
        size="md"
        heading="History of Iress"
        footer={<IressButton onClick={() => setShow(false)}>Close</IressButton>}
        fixedFooter
        show={show}
        onShowChange={setShow}
      >
        <h3>Founding and Early Years (1993 - 2000)</h3>
        <p>
          Iress Limited (ASX: IRE) was founded in 1993 in Melbourne, Australia,
          as a provider of financial market data and trading software.
          Initially, the company focused on delivering technology solutions for
          stockbrokers and traders, providing real-time market data, order
          management, and trading execution tools.
        </p>
        <h3>Expansion and IPO (2001 - 2010)</h3>
        <p>
          In 2001, Iress went public, listing on the Australian Securities
          Exchange (ASX). This move provided the company with capital to expand
          its operations and invest in new technologies. During this period,
          Iress expanded its services beyond trading platforms to include
          financial planning software, portfolio management, and wealth
          management solutions. The company also started expanding
          internationally, entering markets such as the UK, Canada, New Zealand,
          and South Africa, through organic growth and acquisitions.
        </p>
        <h3>Global Growth and Acquisitions (2011 - 2020)</h3>
        <p>
          Between 2011 and 2020, Iress continued its global expansion through
          acquisitions and product diversification. Key acquisitions included:
        </p>
        <ul>
          <li>
            Avelo (2013): Strengthened its presence in the UK financial services
            market.
          </li>
          <li>
            Pulse Software (2014): Added financial advice solutions to its
            portfolio.
          </li>
          <li>
            INET BFA (2016): Expanded its reach into South Africa’s financial
            market.
          </li>
          <li>
            OneVue (2020): Enhanced its superannuation and investment
            administration capabilities.
          </li>
        </ul>
        <p>
          During this period, Iress also expanded into mortgage lending
          technology and digital financial services, adapting to the increasing
          demand for automation and efficiency in financial markets.
        </p>
        <h3>Recent Developments (2021 - Present)</h3>
        <p>
          In 2021, Iress announced a strategic review of its business, focusing
          on streamlining operations and improving profitability. The company
          also experienced leadership changes, including new CEO appointments to
          drive digital transformation.{' '}
        </p>
        <p>
          Iress has continued to innovate with cloud-based solutions, artificial
          intelligence (AI), and data analytics, catering to financial
          institutions, brokers, and wealth management firms globally.
        </p>
        <IressExpander activator="Was this helpful?">
          <IressStack gap="sm">
            <IressInput rows={2} placeholder="Enter your feedback" />
            <IressButton>Provide feedback</IressButton>
          </IressStack>
        </IressExpander>
      </IressModal>
    </>
  );
};

interface LargeModalActionsProps {
  isStart: boolean;
  isFinal: boolean;
  onBack: () => void;
  onNext: () => void;
  onCancel: () => void;
  onFinish: () => void;
}

const LargeModalActions = ({
  isStart,
  isFinal,
  onBack,
  onNext,
  onCancel,
  onFinish,
}: LargeModalActionsProps) => (
  <IressInline gap="sm" horizontalAlign={isFinal ? 'center' : 'left'}>
    {isFinal && (
      <IressButton mode="primary" onClick={onFinish}>
        Finish
      </IressButton>
    )}
    {!isFinal && (
      <IressButton mode="primary" onClick={onNext}>
        Next
      </IressButton>
    )}
    {!isStart && !isFinal && (
      <IressButton onClick={onBack}>Previous</IressButton>
    )}
    {!isFinal && (
      <IressInline ml="auto">
        <IressButton onClick={onCancel} mode="tertiary">
          Cancel
        </IressButton>
      </IressInline>
    )}
  </IressInline>
);

const LargeModal = () => {
  const [show, setShow] = useState(false);
  const [step, setStep] = useState(0);

  return (
    <>
      <IressCard
        heading="Large modal"
        stretch
        footer={
          <IressButton onClick={() => setShow(true)}>
            View large modal example
          </IressButton>
        }
      >
        <p>
          Large modals facilitate sub-flows within a primary flow, allowing
          users to focus on tasks that will impact the underlying screen once
          the modal is closed (e.g., adding an item to a table or bulk uploading
          items). They should be used sparingly and only when there is a direct
          relationship to the underlying screen, where the action wouldn't
          warrant a separate dedicated screen.
        </p>
      </IressCard>

      <IressModal
        size="lg"
        heading="Upload from CSV"
        footer={
          <LargeModalActions
            isStart={step === 0}
            isFinal={step === 2}
            onBack={() => setStep(step - 1)}
            onNext={() => setStep(step + 1)}
            onFinish={() => setShow(false)}
            onCancel={() => setShow(false)}
          />
        }
        disableBackdropClick
        show={show}
        onShowChange={setShow}
        fixedFooter
      >
        <IressStack gap="lg" mb="md">
          <IressProgress max={3} value={step + 1} />
          {step === 0 && (
            <IressStack gap="md">
              <IressField label="Select a file to upload">
                <IressInput type="file" accept=".csv" />
              </IressField>
              <IressDivider />
              <IressField label="Type of data">
                <IressSelect
                  options={[
                    { label: 'Clients' },
                    { label: 'Products' },
                    { label: 'Transactions' },
                  ]}
                />
              </IressField>
              <IressCheckbox>Overwrite existing data</IressCheckbox>
            </IressStack>
          )}
          {step === 1 && (
            <IressTable
              caption="Preview of data to be uploaded"
              columns={[
                { key: 'import', label: 'Upload', width: '1%' },
                { key: 'name', label: 'Name' },
                { key: 'email', label: 'Email' },
              ]}
              rows={[
                {
                  import: <IressCheckbox defaultChecked />,
                  name: 'Luke Skywalker',
                  email: 'luke.skywalker@iress.com',
                },
                {
                  import: <IressCheckbox defaultChecked />,
                  name: 'Leia Skywalker',
                  email: 'leia.skywalker@iress.com',
                },
                {
                  import: <IressCheckbox defaultChecked />,
                  name: 'Han Solo',
                  email: 'han.solo@iress.com',
                },
              ]}
            />
          )}
          {step === 2 && (
            <IressStack gap="md" horizontalAlign="center">
              <img
                src={modalIsDone}
                alt=""
                style={{ maxWidth: '200px', height: 'auto' }}
              />
              <h3>3 items have been uploaded</h3>
              <IressCheckbox>Send a copy to yourself</IressCheckbox>
            </IressStack>
          )}
        </IressStack>
      </IressModal>
    </>
  );
};

export const ModalSizes = () => (
  <IressRow gutter="spacing.7" verticalAlign="stretch">
    <IressCol>
      <SmallModal />
    </IressCol>
    <IressCol>
      <MediumModal />
    </IressCol>
    <IressCol>
      <LargeModal />
    </IressCol>
  </IressRow>
);
```

#### Responsive size

Use the `width` styling prop for responsive sizes. The modal becomes full width on screens smaller than the specified value.

```tsx
import { IressButton, IressModal, useModal } from '@iress-oss/ids-components';

const MODAL_ID = 'responsive-modal';

export function ModalResponsiveSize() {
  const { showModal } = useModal();

  return (
    <>
      <IressButton onClick={() => showModal(MODAL_ID)}>
        Show responsive modal
      </IressButton>
      <IressModal
        id={MODAL_ID}
        show={false}
        heading="Responsive modal"
        width={{ xs: 'overlay.sm', md: 'overlay.md', xxl: 'overlay.lg' }}
        footer={<IressButton>Close</IressButton>}
      >
        Resize your screen to see the modal width change between sm, md, and lg.
      </IressModal>
    </>
  );
}
```

#### Status

The `status` prop (`danger`, `success`, `warning`) displays a contextual status icon. When set, size is restricted to `sm` or `md` and the `actions` prop is enabled.

```tsx
import { useState } from 'react';
import { IressButton, IressModal, IressStack } from '@iress-oss/ids-components';

const STATUSES = ['danger', 'success', 'warning'] as const;

export function ModalStatuses() {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  return (
    <IressStack gap="md" horizontalAlign="left">
      {STATUSES.map((status) => (
        <IressStack gap="sm" key={status}>
          <IressButton onClick={() => setActiveModal(`status-${status}`)}>
            {status} status modal
          </IressButton>
          <IressModal
            id={`status-${status}`}
            heading={`${status} modal`}
            status={status}
            show={activeModal === `status-${status}`}
            onShowChange={(show) => !show && setActiveModal(null)}
          >
            This is a {status} status modal.
          </IressModal>
        </IressStack>
      ))}
      <IressButton onClick={() => setActiveModal('status-md')}>
        Medium danger status modal
      </IressButton>
      <IressModal
        id="status-md"
        heading="Danger modal"
        status="danger"
        size="md"
        actions={[
          { children: 'Button', fluid: true, mode: 'tertiary' },
          { children: 'Button', fluid: true },
        ]}
        show={activeModal === 'status-md'}
        onShowChange={(show) => !show && setActiveModal(null)}
      >
        This is a medium danger status modal with actions.
      </IressModal>
    </IressStack>
  );
}
```

#### Disable closing

Use `disableBackdropClick` and/or `noCloseButton` when you require the user to complete the task before closing. Ensure you provide an alternative way to close.

```tsx
import {
  IressButton,
  IressModal,
  IressStack,
  useModal,
} from '@iress-oss/ids-components';

export function ModalDisableClosing() {
  const { showModal } = useModal();

  return (
    <IressStack gap="md">
      <IressButton onClick={() => showModal('disable-backdrop-click')} fluid>
        Disable backdrop click
      </IressButton>
      <IressModal
        id="disable-backdrop-click"
        show={false}
        heading="Backdrop click disabled"
        disableBackdropClick
        footer={<IressButton>Close</IressButton>}
      >
        Clicking the backdrop will not close this modal. Use the close button or
        footer button instead.
      </IressModal>

      <IressButton onClick={() => showModal('no-close-button')} fluid>
        No close button
      </IressButton>
      <IressModal
        id="no-close-button"
        show={false}
        heading="No close button"
        noCloseButton
        footer={
          <IressButton onClick={() => showModal('no-close-button', false)}>
            Close
          </IressButton>
        }
      >
        This modal has no close button in the header. Use the footer button to
        close.
      </IressModal>

      <IressButton onClick={() => showModal('both')} fluid>
        Both
      </IressButton>
      <IressModal
        id="both"
        show={false}
        heading="Fully controlled closing"
        disableBackdropClick
        noCloseButton
        footer={
          <IressButton onClick={() => showModal('both', false)}>
            Close
          </IressButton>
        }
      >
        This modal can only be closed via the footer button.
      </IressModal>
    </IressStack>
  );
}
```

### Testing

Query the modal dialog by its role:

```tsx
await user.click(screen.getByRole('button', { name: 'Open modal' }));
const modal = await screen.findByRole('dialog', { name: 'Modal heading' });

await user.click(screen.getByRole('button', { name: 'Close modal' }));
await waitForElementToBeRemoved(modal);
```

**Note:** In version 5, modals are rendered conditionally — they are not in the
DOM until shown. Use `findByRole` when waiting for a modal to appear.

**Gotchas:**

- **Conditional rendering**: Use `findByRole` (async) instead of `getByRole` — content isn't in the DOM until `show` is `true`
- **Backdrop click closes modal**: Use `disableBackdropClick` if your test needs to prevent this
- **Focus management**: Focus moves inside on open, returns to trigger on close

[View test IDs](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-modal--docs#testing)


#### Test selectors

| Part | Description | Recommended Query | Test ID |
|------|-------------|-------------------|---------|
| backdrop | The overlay backdrop (outermost element) | — | `modal__backdrop` |
| main | The dialog element (nested inside backdrop) | `findByRole('dialog', { name: '...' })` | `modal` |
| heading | The modal heading | `getByRole('heading', { name: '...' })` | `modal__heading` |
| close button | The close button | `findByRole('button', { name: 'Close' })` | `modal__close-button__button` |
| content | The modal content area | — | `modal__content` |
| status header | The status icon header (when status is set) | — | `modal__status-header` |
| status icon | The status icon (when status is set) | — | `modal__status-icon` |
| footer | The modal footer | `getByText('...')` | `modal__footer` |

---

### Storybook

Storybook provides an interactive playground for testing different prop combinations, more complex recipes, all prop details, and accessibility attributes.

[View in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-modal--docs)

## Specifications

### Behaviour

| State | Behaviour |
|-------|-----------|
| Default | Modal is hidden until `show` is `true` or opened via `useModal` |
| Active | Backdrop covers page, body scroll is disabled, focus is trapped inside |
| Dismissed | Clicking backdrop, pressing Escape, or clicking close button hides the modal |
| Fixed footer | Footer stays pinned to bottom, content scrolls above it |
| Status | Shows contextual icon in header, restricts size to `sm`/`md` |

### Accessibility

**WCAG compliance:**

- **2.1.2 No Keyboard Trap** — Focus is trapped within modal but can be dismissed via Escape
- **4.1.2 Name, Role, Value** — Uses `role="dialog"` with `aria-labelledby` pointing to heading
- **2.4.3 Focus Order** — Focus moves into modal on open, returns to trigger on close

**ARIA roles:**

| Element | Role | Description |
|---------|------|-------------|
| Modal container | `dialog` | Identifies the modal as a dialog |
| Heading | referenced via `aria-labelledby` | Provides accessible name |

### Keyboard interaction

| Key | Action |
|-----|--------|
| `Escape` | Closes the modal (unless disabled) |
| `Tab` | Moves focus to next focusable element within the modal |
| `Shift+Tab` | Moves focus to previous focusable element within the modal |
| `Enter` / `Space` | Activates focused button |

### Edge cases

- **Conditional rendering**: Modal and its contents are not in the DOM until shown — use async queries in tests
- **Nested popovers**: Fixed footer modals may clip popover content — use non-fixed footer when needed
- **Multiple modals**: Only one modal should be active at a time
- **Focus restore**: If the trigger element is removed while modal is open, focus moves to document body

---

### Storybook

Storybook provides an interactive playground for testing different prop combinations and viewing accessibility attributes.

[View in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-modal--docs)

---

# Overview

### Explore

| Component | Description |
|-----------|-------------|
| [IressAlert](alert.md) | The root element of the alert |
| [IressAutocomplete](autocomplete.md) | The root wrapper element (no semantic role) |
| [IressBreadcrumbs](../patterns/breadcrumbs.md) | Shows the current location within a navigational hierarchy. |
| [IressButton](button.md) | The root element of the button |
| [IressButtonGroup](button-group.md) | The root element of the button group |
| [IressCard](card.md) | The root element of the card |
| [IressCheckbox](checkbox.md) | The root wrapper element |
| [IressCheckboxGroup](checkbox-group.md) | The root element of the checkbox group |
| [IressCol](col.md) | The root element of the col |
| [IressContainer](container.md) | The root element of the container |
| [IressContextual Menu](../patterns/contextual-menu.md) | Displays a context-sensitive menu of actions triggered by user interaction. |
| [IressDivider](divider.md) | The root element of the divider |
| [IressExpander](expander.md) | The root element of the expander |
| [IressFeedback](../patterns/feedback.md) | Displays transient feedback messages to communicate the result of an action. |
| [IressField](field.md) | The root wrapper element (a div with no role) |
| [IressField Group](field-group.md) | Groups related form fields together with a shared legend, description, and validation message. |
| [IressFilter](../patterns/dropdown-menu.md) | Presents a list of actions or options revealed by a trigger button. |
| [IressForm](../patterns/form.md) | Manages form state, validation, and submission for a group of input fields. |
| [IressHide](hide.md) | The root element of the hide |
| [IressIcon](icon.md) | The root element of the icon |
| [IressImage](image.md) | The root element of the image |
| [IressInline](inline.md) | The root element of the inline |
| [IressInput](input.md) | The root element of the input |
| [IressInputCurrency](input-currency.md) | The root element of the input currency |
| [IressLabel](label.md) | The root element of the label |
| [IressLink](link.md) | The root element of the link |
| [IressLoading](../patterns/loading.md) | Displays a loading state to indicate content is being fetched or processed. |
| [IressMenu](menu.md) | The root element of the menu |
| [IressModal](modal.md) | The overlay backdrop (outermost element) |
| [IressPanel](panel.md) | The root element of the panel |
| [IressPill](pill.md) | The root element of the pill |
| [IressPlaceholder](placeholder.md) | The root element of the placeholder |
| [IressPopover](popover.md) | The root element of the popover |
| [IressProgress](progress.md) | The root element of the progress |
| [IressProvider](provider.md) | Application-level wrapper that provides shared context for Modal, Slideout, Toaster, Tooltip, and Popover components. |
| [IressRadio](radio.md) | The root element of the radio |
| [IressRadioGroup](radio-group.md) | The root element of the radio group |
| [IressReadonly](readonly.md) | The root element of the readonly |
| [IressRow](row.md) | The root element of the row |
| [IressSearch & Selection](../patterns/search-selection.md) | Decision guide for choosing between Autocomplete, Select, DropdownMenu, InputPopover, and Popover. |
| [IressSelect](select.md) | The root element of the select |
| [IressShadow](../patterns/shadow.md) | Applies an elevated shadow effect to visually separate content layers. |
| [IressSide Nav](../patterns/side-nav.md) | Provides a vertical navigation menu typically used in application sidebars. |
| [IressSkeleton](skeleton.md) | The root element of the skeleton |
| [IressSkipLink](skip-link.md) | The root element of the skip link |
| [IressSlideout](slideout.md) | The root element of the slideout |
| [IressSlider](slider.md) | The root element of the slider |
| [IressSpinner](spinner.md) | The root element of the spinner. Default variant is decorative (aria-hidden); chatty variant has role= |
| [IressStack](stack.md) | The root element of the stack |
| [IressStyled](styled.md) | A polymorphic utility component that applies design tokens and styling props to any HTML element or custom component. |
| [IressTable](table.md) | The root element of the table |
| [IressTabSet](tab-set.md) | The root wrapper element (tablist is a nested child) |
| [IressTag](tag.md) | The root element of the tag |
| [IressTag Input](tag-input.md) | A form control that allows users to enter and manage a collection of tags via keyboard input. |
| [IressText](text.md) | The root element of the text |
| [IressToaster](toaster.md) | The visible toast list container (rendered inside the aria-live region) |
| [IressToggle](toggle.md) | The root element of the toggle |
| [IressTooltip](tooltip.md) | The root wrapper element (contains activator and tooltip) |
| [IressValidation Message](validation-message.md) | The root element of the validation message |

### What are components?

IDS components are pre-built React elements that implement the Iress Design
System. Each component encodes accessibility, theming, and consistent behaviour
so product teams can focus on business logic rather than UI plumbing.

## How components are structured

Every component page in this documentation follows the same format:

| Section | What it covers |
|---------|---------------|
| **Design** | When to use, when not to use, do's and don'ts, content guidelines, and related patterns. |
| **Develop** | Quick start code, prop highlights, usage examples with live Storybook embeds, and testing guidance. |
| **Specifications** | Behaviour states, WCAG compliance, keyboard interaction, and edge cases. |

## Component categories

| Category | Components | Purpose |
|----------|-----------|---------|
| **Layout** | Container, Row, Col, Stack, Inline, Hide | Structure and position content on the page. |
| **Typography** | Text, Label | Render text with correct tokens and semantic elements. |
| **Forms** | Input, InputCurrency, Select, Checkbox, Radio, Toggle, Slider, TagInput, Field, FieldGroup, ValidationMessage | Collect and validate user input. |
| **Actions** | Button, ButtonGroup, Link | Trigger actions or navigate. |
| **Feedback** | Alert, Toaster, Spinner, Progress, Skeleton, Placeholder | Communicate status, loading, and errors. |
| **Overlays** | Modal, Slideout, Popover, Tooltip | Surface content above the page. |
| **Navigation** | Menu, TabSet, SkipLink | Move between views or sections. |
| **Data display** | Table, Tag, Pill, Readonly, Icon, Image, Divider | Present and organise information. |
| **Utilities** | Provider, Styled, Panel, Expander | App-level setup, style escape hatches, and content grouping. |

## Choosing a component

- **Need user input?** → Start with [Input](../components/input.md), [Select](../components/select.md), or [Checkbox](../components/checkbox.md). Always wrap in [Field](../components/field.md).
- **Need to show status?** → See the [Feedback pattern](../patterns/feedback.md) to pick between Alert, Toaster, and Modal.
- **Need layout?** → Use [Stack](../components/stack.md) (vertical) or [Inline](../components/inline.md) (horizontal) before reaching for custom CSS.
- **Need an overlay?** → [Modal](../components/modal.md) for blocking tasks, [Slideout](../components/slideout.md) for supplementary, [Popover](../components/popover.md) for ephemeral.

## Naming convention

All IDS components are prefixed with `Iress` (e.g. `IressButton`,
`IressModal`). This avoids collisions with native HTML elements and third-party
libraries, and makes IDS usage instantly recognisable in code reviews.

## Next steps

Browse the component list in the sidebar, or jump to:

- [Button](../components/button.md) — the most common interactive element
- [Form pattern](../patterns/form.md) — end-to-end form guidance
- [Common Mistakes](../get-started/common-mistakes.md) — pitfalls to avoid

---

# Panel

> Provides a sectioned container for grouping related content with an optional heading.

## Import

```tsx
import { IressPanel } from '@iress-oss/ids-components';
```

- [Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-panel--docs)
- [Source](https://github.com/iress/design-system/tree/main/packages/components/src/components/Panel)
- [Report issue](https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=panel&title=[Panel]+Bug:+)
- [Request feature](https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=panel,enhancement&title=[Panel]+Feature:+)

## Props

> Required props are **bold**.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | `ReactNode` | — | Main body of the card |
| element | `div` | — | Element type to render the Card as. |
| footer | `ReactNode` | — | Section that sticks to the bottom of the card |
| heading | `ReactNode` | — | Heading slot. Often used for a title or description. |
| media | `ReactNode` | — | Section (often for an image, table or chart) that appears before the heading |
| noBorder | `boolean` | — | When set to true, the card will not have a border. This is useful to de-prioritise a card within another bordered container, such as a card within a sidebar. |
| prepend | `ReactNode` | — | Slot to the left of card content. |
| selected | `boolean` | — | When set to true, card appears selected. |
| topRight | `ReactNode` | — | Slot positioned to the top right of the card, often used for an icon or action menu |
| data-testid | `string` | — | The data-testid attribute is used to target elements in automated tests if no identifier is available. In some components it is propagated to child elements.  Notes: - Please use this prop sparingly and only when no other identifier is available, as per the guiding principles of Testing Library. - Only use this prop for your tests @see https://testing-library.com/docs/queries/bytestid |

📄 [Full type definition](../../dist/components/Panel/Panel.d.ts)

Also accepts all [styling props](../styling-props/overview.md) ([type definition](../../dist/interfaces.d.ts), [token values](../tokens/tokens-reference.md)).

A panel is used to group related content.

```tsx
<IressPanel heading="Panel Heading">
  <p>Content goes here.</p>
</IressPanel>;
```

## Design

### When to use

- **Grouping content**: Create sections within a page that share a common purpose
- **Lists of items**: Group related items together visually

### When not to use

- **Micro-content** — use [Card](../components/card.md) for smaller, self-contained items
- **Custom padding/background** — use [Styled](../components/styled.md) or styling props directly

### Related patterns

- [Card](../components/card.md) — for smaller, self-contained content blocks
- [Expander](../components/expander.md) — for collapsible content sections

## Develop

### Quick Start

```tsx
import { IressPanel } from '@iress-oss/ids-components';

<IressPanel heading="Panel Heading">Panel content</IressPanel>;
```

[View all props](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-panel--docs#api-props)

### Usage

`IressPanel` uses `IressCard` under the hood, so it inherits all of the same props and styling options. It is purely a semantic component that provides a more specific name for grouping related content together.

### Testing

`IressPanel` is a layout container. Query by `data-testid` or target its
children directly:

```tsx
const panel = screen.getByTestId('my-panel');
```


#### Test selectors

| Part | Description | Recommended Query | Test ID |
|------|-------------|-------------------|---------|
| main | The root element of the panel | — | `panel` |

---

### Storybook

[View in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-panel--docs)

## Specifications

### Behaviour

A semantic wrapper around `IressCard` for grouping related content. Inherits all Card props and styling.

---

# Pill

> Displays a small, rounded badge for categorisation or status indication.

## Import

```tsx
import { IressPill } from '@iress-oss/ids-components';
```

- [Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-pill--docs)
- [Figma](https://www.figma.com/design/youFqYT4CgpKxfLJQv80hf/WIP-Iress-Design-System-V6?node-id=7305-29810)
- [Source](https://github.com/iress/design-system/tree/main/packages/components/src/components/Pill)
- [Report issue](https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=pill&title=[Pill]+Bug:+)
- [Request feature](https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=pill,enhancement&title=[Pill]+Feature:+)

## Props

> Required props are **bold**.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | `ReactNode` | — | Content of the badge. |
| mode | `10` , `20` , `30` , `40` , `50` , `60` , `70` , `80` , `90`, `danger` , `info` , `success` , `warning` , 10 , 20 , 30 , 40 , 50 , 60 , 70 , 80 , 90  | `90` | Style of the badge, based on the data colour palette (10-90) or system status colours (danger, info, success, warning). Can be a number (10-90), a string ('10'-'90'), or a system status ('danger', 'info', 'success', 'warning'). |
| data-testid | `string` | — | The data-testid attribute is used to target elements in automated tests if no identifier is available. In some components it is propagated to child elements.  Notes: - Please use this prop sparingly and only when no other identifier is available, as per the guiding principles of Testing Library. - Only use this prop for your tests @see https://testing-library.com/docs/queries/bytestid |

📄 [Full type definition](../../dist/components/Pill/Pill.d.ts)

Also accepts all [styling props](../styling-props/overview.md) ([type definition](../../dist/interfaces.d.ts), [token values](../tokens/tokens-reference.md)).

Pills are used for status indicators and badges — primarily for status updates, notifications and counts.

```tsx
import { IressInline, IressPill } from '@iress-oss/ids-components';

export function PillMode() {
  return (
    <IressInline gap="sm">
      <IressPill mode={10}>10</IressPill>
      <IressPill mode={20}>20</IressPill>
      <IressPill mode={30}>30</IressPill>
      <IressPill mode={40}>40</IressPill>
      <IressPill mode={50}>50</IressPill>
      <IressPill mode={60}>60</IressPill>
      <IressPill mode={70}>70</IressPill>
      <IressPill mode={80}>80</IressPill>
      <IressPill mode={90}>90</IressPill>
    </IressInline>
  );
}
```

## Design

### When to use

- **Status indicators**: Show the state of an item (active, pending, completed)
- **Notification counts**: Display unread messages or pending items
- **Badges**: Highlight "New" or "Updated" labels
- **Visual emphasis**: Draw attention to important information without requiring interaction

### When not to use

- **Interactive items** — use [Tag](../components/tag.md) if users need to click, delete, or manage selections
- **Actions** — use [Button](../components/button.md) for clickable elements
- **Navigation** — use [Link](../components/link.md) for clickable text

Pills are **informational** — they display information but are not meant to be interactive.

### Content guidelines

- Keep pill text short (1–2 words)
- Use sentence case
- Match status colour to semantic meaning (`danger` for errors, `success` for completed)

### Related patterns

- [Tag](../components/tag.md) — for interactive, removable items
- [Alert](../components/alert.md) — for longer status messages

## Develop

### Quick Start

```tsx
import { IressPill } from '@iress-oss/ids-components';

<IressPill>Label</IressPill>;
```

[View all props](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-pill--docs#api-props)

### Usage

#### Mode

The `mode` prop controls the colour scheme of the badge. Use data palette colours (10-90) for data visualization and non-semantic colour needs, or system status colours (`danger`, `info`, `success`, `warning`) for semantic status indication.

```tsx
import { IressInline, IressPill } from '@iress-oss/ids-components';

export function PillMode() {
  return (
    <IressInline gap="sm">
      <IressPill mode={10}>10</IressPill>
      <IressPill mode={20}>20</IressPill>
      <IressPill mode={30}>30</IressPill>
      <IressPill mode={40}>40</IressPill>
      <IressPill mode={50}>50</IressPill>
      <IressPill mode={60}>60</IressPill>
      <IressPill mode={70}>70</IressPill>
      <IressPill mode={80}>80</IressPill>
      <IressPill mode={90}>90</IressPill>
    </IressInline>
  );
}
```

#### Status

System status colours provide semantic meaning for feedback and state indication. Available options are: `danger`, `info`, `success`, and `warning`.

```tsx
import { IressInline, IressPill } from '@iress-oss/ids-components';

export function PillStatus() {
  return (
    <IressInline gap="sm">
      <IressPill mode="danger">danger</IressPill>
      <IressPill mode="info">info</IressPill>
      <IressPill mode="success">success</IressPill>
      <IressPill mode="warning">warning</IressPill>
    </IressInline>
  );
}
```

### Testing

Query pills by their text content:

```tsx
const pill = screen.getByText('Active');
```


#### Test selectors

| Part | Description | Recommended Query | Test ID |
|------|-------------|-------------------|---------|
| main | The root element of the pill | `getByText('...')` | `pill` |

---

### Storybook

[View in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-pill--docs)

## Specifications

### Behaviour

| State | Behaviour |
|-------|-----------|
| Default | Renders an inline badge with text content |
| Mode | Colour controlled by `mode` prop (data palette or status colours) |

### Accessibility

- Pills are purely visual indicators — no interactive role
- Colour is not the sole means of conveying status (text content provides meaning)

---

# Placeholder

> Renders a visual placeholder to represent future or missing content.

## Import

```tsx
import { IressPlaceholder } from '@iress-oss/ids-components';
```

- [Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-placeholder--docs)
- [Source](https://github.com/iress/design-system/tree/main/packages/components/src/components/Placeholder)
- [Report issue](https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=placeholder&title=[Placeholder]+Bug:+)
- [Request feature](https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=placeholder,enhancement&title=[Placeholder]+Feature:+)

## Props

> Required props are **bold**.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | `ReactNode` | — | Description of the placeholder's envisioned contents. |
| heading | `ReactNode` | — | Title for the placeholder content. |
| height | `number, string ` | `auto` | Sets the height of the placeholder. |
| stretch | `boolean` | — | Sets the placeholder to be full width if true. |
| width | `number, string ` | `auto` | Sets the width of the placeholder. |
| data-testid | `string` | — | The data-testid attribute is used to target elements in automated tests if no identifier is available. In some components it is propagated to child elements.  Notes: - Please use this prop sparingly and only when no other identifier is available, as per the guiding principles of Testing Library. - Only use this prop for your tests @see https://testing-library.com/docs/queries/bytestid |

📄 [Full type definition](../../dist/components/Placeholder/Placeholder.d.ts)

Also accepts all [styling props](../styling-props/overview.md) ([type definition](../../dist/interfaces.d.ts), [token values](../tokens/tokens-reference.md)).

A placeholder is a UI element that allows you to reserve space for content that has not been created yet, usually used for prototyping.

```tsx
<IressPlaceholder heading="Placeholder" width="300" height="300">
  This should be a description of the expected content
</IressPlaceholder>;
```

## Design

### When to use

- **Prototyping**: Reserve space for content not yet designed or built
- **Layout testing**: Visualise how content will fill available space

### When not to use

- **Production UIs** — placeholders are a development/prototyping aid, not a user-facing component
- **Loading states** — use [Skeleton](../components/skeleton.md) instead

### Related patterns

- [Skeleton](../components/skeleton.md) — for loading state placeholders in production UIs

## Develop

### Quick Start

```tsx
import { IressPlaceholder } from '@iress-oss/ids-components';

<IressPlaceholder heading="Placeholder" width={300} height={300}>
  This should be a description of the expected content
</IressPlaceholder>;
```

[View all props](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-placeholder--docs#api-props)

### Usage

The `IressPlaceholder` component is a **last resort** component, as it provides very little context to the product team and/or user about what content will be placed in the placeholder.

It is recommended to use placeholders that emulate the content that will be placed in the placeholder, such as images or text that is similar to the final content. This will help the product team and/or user understand what to expect in the final product.

### Testing

`IressPlaceholder` is a visual placeholder. Query by `data-testid`:

```tsx
const placeholder = screen.getByTestId('my-placeholder');
```


#### Test selectors

| Part | Description | Recommended Query | Test ID |
|------|-------------|-------------------|---------|
| main | The root element of the placeholder | `getByText('...')` | `placeholder` |

---

### Storybook

[View in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-placeholder--docs)

## Specifications

### Behaviour

Renders a visual box with configurable width, height, heading, and description text. Development/prototyping aid only.

---

# Popover

> Displays floating content anchored to a trigger element.

## Import

```tsx
import { IressPopover } from '@iress-oss/ids-components';
```

- [Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-popover--docs)
- [Source](https://github.com/iress/design-system/tree/main/packages/components/src/components/Popover)
- [Report issue](https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=popover&title=[Popover]+Bug:+)
- [Request feature](https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=popover,enhancement&title=[Popover]+Feature:+)

## Props

> Required props are **bold**.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| **activator** | `ReactElement> | undefined` | — | Content for an activator element, usually an `IressButton`. |
| align | `[FloatingUIAligns](../../dist/types.d.ts)` | `auto` | Sets the alignment of the popover relative to the activator element. |
| children | `ReactNode` | — | The content to render within the popover. |
| container | `[FloatingUIContainer](../../dist/types.d.ts)` | — | The container element to render the popover into. By default, the popover will render where its parent is rendered.  **Note:** If the `container` doesn’t exist when the popover is mounted, ensure you pass an element directly (not a ref) and specify null as the default value before it is set. This lets it wait for the root to be available. For example, if you reference the parent element of a popover. |
| contentClassName | `string` | — | Class name of the popover content. @deprecated Use `contentStyle` instead. |
| contentStyle | `[IressCustomiseSlot](../../dist/interfaces.d.ts)` | `{}` | This allows you to customise the content styling specifically, which is the floating element. It accepts an object with any of the styling properties available on `IressCSSProps`, as well as `className` and `style`. |
| defaultShow | `boolean` | — | When set to `true` the popover will be visible by default. Use for uncontrolled popovers. |
| displayMode | `inline` , `overlay` | `overlay` | Sets the display mode of popover. |
| fluid | `boolean` | — | Popovers can be fluid, meaning they will take up the full width of their container. |
| focusStartIndex | `number` | — | Which index to start the focus on when the popover is opened. Only works with `type` listbox and menu. Note: The index must exist in the list of items, otherwise it will not work. |
| matchActivatorWidth | `boolean` | — | Sets the popover to match the width of the activator. Note: This only works when `displayMode="overlay"`. |
| offset | `OffsetOptions` | `5` | The offset of the popover from its default position. This can be a number or an object with `mainAxis` and `crossAxis` properties, which specify the offset in pixels along the main axis (the axis along which the popover is aligned) and the cross axis (the perpendicular axis). |
| onActivated | `((e?: Event, reason?: OpenChangeReason, activeIndex?: number , null , undefined) => void) | undefined` | — | Is called when popover is activated. |
| onDeactivated | `((e?: Event, reason?: OpenChangeReason, activeIndex?: number , null , undefined) => void) | undefined` | — | Is called when popover is deactivated. |
| onNavigate | `((activeIndex: number , null) => void)` | — | Is called when registered popover items are navigated using arrow keys. Only works with `type` listbox and menu. |
| show | `boolean` | — | When set to `true` the modal will be visible. Use for controlled popovers. |
| type | `dialog` , `grid` , `listbox`, `menu` , `tree`  | — | Describes the type of content contained in the popover. |
| virtualFocus | `boolean` | `false` | Whether the focus is virtual (using `aria-activedescendant`). Use this if you need focus to remain on the reference element (such as an input), but allow arrow keys to navigate items. Note: This is only applicable when type is set to: `listbox` or `menu`, and only works out of the box with `IressMenu` and its subcomponents. |
| nested | `boolean` | — | Whether this popover uses nested navigation (ArrowRight to open, ArrowLeft to close). When not set, this is auto-detected based on whether the popover is inside another popover. |
| data-testid | `string` | — | The data-testid attribute is used to target elements in automated tests if no identifier is available. In some components it is propagated to child elements.  Notes: - Please use this prop sparingly and only when no other identifier is available, as per the guiding principles of Testing Library. - Only use this prop for your tests @see https://testing-library.com/docs/queries/bytestid |

📄 [Full type definition](../../dist/components/Popover/Popover.d.ts)

Also accepts all [styling props](../styling-props/overview.md) ([type definition](../../dist/interfaces.d.ts), [token values](../tokens/tokens-reference.md)).

A popover is a panel that is toggled on/off by an activator button or text input. The panel is positioned relative to its activator element.

```tsx
<IressPopover activator={<IressButton>Toggle popover</IressButton>}>
  <p>Content goes here.</p>
</IressPopover>;
```

## Design

### When to use

Most popover use cases are already covered by higher-level components. Use `IressPopover` directly only when none of these fit:

| Need | Use instead |
|------|-------------|
| Action menu on a button | [ContextualMenu](../patterns/contextual-menu.md) |
| Filterable dropdown | [DropdownMenu](../patterns/dropdown-menu.md) |
| Select from options | [Select](../components/select.md) |
| Search with suggestions | [Autocomplete](../components/autocomplete.md) |
| Overflow navigation | [Breadcrumbs](../patterns/breadcrumbs.md) |
| Brief hover hint | [Tooltip](../components/tooltip.md) |

Use raw `IressPopover` for **custom floating content** that doesn't fit the patterns above (e.g. colour pickers, date pickers, custom filter panels).

### When not to use

- **Brief helpful text** — use [Tooltip](../components/tooltip.md) instead
- **Blocking decisions** — use a [Modal](../components/modal.md)
- **Large secondary workflows** — use a [Slideout](../components/slideout.md)

### Do's and Don'ts

| ✅ Do | ❌ Don't |
|-------|----------|
| Keep popover content focused and concise | Put complex multi-step forms inside a popover |
| Use an `IressButton` as the activator | Use non-interactive elements as activators |
| Allow the popover to close on outside click | Prevent all dismissal methods without clear reason |
| Consider mobile viewports — popovers reposition automatically | Assume a fixed position will work on all screen sizes |

### Content guidelines

- **Activator**: Use a clear label or icon that indicates content will appear
- **Content**: Keep focused on a single purpose — if it grows complex, consider a Modal or Slideout
- **Actions within**: Clicking a menu item should close the popover automatically

### Related patterns

- [ContextualMenu](../patterns/contextual-menu.md) — action menu triggered by a button
- [DropdownMenu](../patterns/dropdown-menu.md) — filterable dropdown with search
- [Select](../components/select.md) — select from a list of options
- [Autocomplete](../components/autocomplete.md) — search with suggestions
- [Breadcrumbs](../patterns/breadcrumbs.md) — overflow navigation menu
- [Tooltip](../components/tooltip.md) — for brief hover/focus descriptions
- [Modal](../components/modal.md) — for blocking overlay dialogs
- [Menu](../components/menu.md) — often used inside popovers for action lists

## Develop

### Quick Start

```tsx
import { IressPopover, IressButton } from '@iress-oss/ids-components';

<IressPopover activator={<IressButton>Open</IressButton>}>
  Popover content
</IressPopover>;
```

[View all props](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-popover--docs#api-props)

### Usage

#### Activator

The `activator` prop is required. It is the element used to trigger the popover, and works best with an `IressButton`.

```tsx
<IressPopover activator={<IressButton>Toggle popover</IressButton>}>
  <p>Content goes here.</p>
</IressPopover>;
```

#### The `show` property

Control the popover with state using `show`, `onActivated` and `onDeactivated`.

```tsx
import { IressButton, IressPopover } from '@iress-oss/ids-components';
import { useState } from 'react';

export function PopoverUsingState() {
  const [show, setShow] = useState(false);

  return (
    <IressPopover
      activator={
        <IressButton onClick={() => setShow(!show)}>
          Show popover using state
        </IressButton>
      }
      show={show}
      onActivated={() => setShow(true)}
      onDeactivated={() => setShow(false)}
    >
      A little more information about this area.
    </IressPopover>
  );
}
```

#### Align

The popover panel can be aligned in one of 12 positions relative to the activator. Defaults to `auto` and repositions dynamically to avoid overflow.

```tsx
<div style={{ padding: '80px 150px' }}>
  <IressStack gap="md">
    <IressInline horizontalAlign="center" gap="sm">
      <IressPopover
        activator={
          <IressTooltip
            align="bottom-start"
            tooltipText="Tooltips and popovers can go together if needed!"
          >
            <IressButton>top-start</IressButton>
          </IressTooltip>
        }
        align="top-start"
      />
      <IressPopover activator={<IressButton>top</IressButton>} align="top" />
      <IressPopover
        activator={<IressButton>top-end</IressButton>}
        align="top-end"
      />
    </IressInline>
    <IressInline horizontalAlign="between">
      <IressStack gap="sm">
        <IressInline horizontalAlign="left">
          <IressPopover
            activator={<IressButton>left-start</IressButton>}
            align="left-start"
          />
        </IressInline>
        <IressInline horizontalAlign="left">
          <IressPopover
            activator={<IressButton>left</IressButton>}
            align="left"
          />
        </IressInline>
        <IressInline horizontalAlign="left">
          <IressPopover
            activator={<IressButton>left-end</IressButton>}
            align="left-end"
          />
        </IressInline>
      </IressStack>
      <IressStack gap="sm">
        <IressInline horizontalAlign="right">
          <IressPopover
            activator={<IressButton>right-start</IressButton>}
            align="right-start"
          />
        </IressInline>
        <IressInline horizontalAlign="right">
          <IressPopover
            activator={<IressButton>right</IressButton>}
            align="right"
          />
        </IressInline>
        <IressInline horizontalAlign="right">
          <IressPopover
            activator={<IressButton>right-end</IressButton>}
            align="right-end"
          />
        </IressInline>
      </IressStack>
    </IressInline>
    <IressInline horizontalAlign="center" gap="sm">
      <IressPopover
        activator={<IressButton>bottom-start</IressButton>}
        align="bottom-start"
      />
      <IressPopover
        activator={<IressButton>bottom</IressButton>}
        align="bottom"
      />
      <IressPopover
        activator={<IressButton>bottom-end</IressButton>}
        align="bottom-end"
      />
    </IressInline>
  </IressStack>
</div>;
```

#### Width

Set a custom width when content needs more space than the theme default.

```tsx
<IressPopover
  container={document.body}
  contentStyle={{ style: { maxWidth: '30rem' } }}
>
  details
</IressPopover>;
```

#### Overflow

By default popovers grow in height based on content. Use `maxHeight` and `overflowY` via `contentStyle` to fix the height.

```tsx
<IressInline gap="md">
  <IressPopover
    align="bottom-start"
    container={document.body}
    activator={<IressButton>Normal popover</IressButton>}
  >
    paragraph
  </IressPopover>
  <IressPopover
    align="bottom-start"
    container={document.body}
    activator={<IressButton>Fixed height popover</IressButton>}
    contentStyle={{ scrollable: 'y', style: { maxHeight: '200px' } }}
  >
    paragraph
  </IressPopover>
</IressInline>;
```

#### Container

Use the `container` prop to render the popover in a different DOM node.

```tsx
import { useState } from 'react';
import { IressButton, IressPopover } from '@iress-oss/ids-components';

export const PopoverParentContainer = () => {
  const [parentContainer, setParentContainer] = useState<HTMLDivElement | null>(
    null,
  );

  return (
    <div id="parent" ref={setParentContainer}>
      <IressPopover
        activator={<IressButton>Toggle</IressButton>}
        container={parentContainer}
      >
        This content will be rendered in the parent container
      </IressPopover>
    </div>
  );
};
```

#### Using the `IressPopoverProvider`

Use `IressPopoverProvider` to set a shared container for all nested popovers. Individual popovers can override with their own `container` prop.

> **Note:** If using `IressProvider` or `IressShadow`, the popover provider is already included.

```tsx
import { useRef, useState } from 'react';
import {
  IressButton,
  IressPopover,
  IressPopoverProvider,
  IressStack,
  IressText,
} from '@iress-oss/ids-components';

export const App = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [container, setContainer] = useState<HTMLDivElement | null>(null);

  return (
    <IressStack gap="md">
      <IressText>
        The provider below delegates all nested popovers into the green
        container. The second popover overrides the provider&apos;s container
        and renders inline (no portal).
      </IressText>

      <IressPopoverProvider container={container}>
        <IressStack gap="md">
          <IressPopover activator={<IressButton>Uses provider</IressButton>}>
            This popover is rendered inside the provider&apos;s container below.
          </IressPopover>

          <IressPopover
            activator={<IressButton>Overrides provider</IressButton>}
            container={null}
          >
            This popover overrides the provider and renders inline.
          </IressPopover>
        </IressStack>
      </IressPopoverProvider>

      <div
        ref={(node) => {
          containerRef.current = node;
          setContainer(node);
        }}
        style={{
          border: '2px dashed green',
          padding: '16px',
          minHeight: '80px',
        }}
      >
        <IressText>
          <strong>Provider container</strong> — popovers using the provider will
          render here.
        </IressText>
      </div>
    </IressStack>
  );
};
```

#### Input popover

A popover triggered by input changes. The `minLength` prop specifies the minimum characters before the popover shows. Focus inside is **virtual** (using `aria-activedescendant`).

```tsx
<IressInputPopover activator={<IressInput />} container={document.body}>
  basic
</IressInputPopover>;
```

#### With menus

When `IressMenu` is inside `IressPopover`, the popover auto-closes on menu item click and focus moves to the first item on open.

```tsx
import {
  IressButton,
  IressIcon,
  IressMenu,
  IressMenuItem,
  IressPopover,
} from '@iress-oss/ids-components';

export function PopoverWithMenu() {
  return (
    <IressPopover
      activator={<IressButton>Open menu</IressButton>}
      container={document.body}
      type="menu"
      contentStyle={{ p: 'none' }}
    >
      <IressMenu role="menu">
        <IressMenuItem value="edit" prepend={<IressIcon name="edit" />}>
          Edit
        </IressMenuItem>
        <IressMenuItem
          value="duplicate"
          prepend={<IressIcon name="content_copy" />}
        >
          Duplicate
        </IressMenuItem>
        <IressMenuItem value="delete" prepend={<IressIcon name="delete" />}>
          Delete
        </IressMenuItem>
      </IressMenu>
    </IressPopover>
  );
}
```

### Testing

Query the popover trigger, then interact to open:

```tsx
const trigger = screen.getByRole('button', { name: 'Open popover' });
await user.click(trigger);
expect(screen.getByText('Popover content')).toBeVisible();
```

[View test IDs](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-popover--docs#testing)


#### Test selectors

| Part | Description | Recommended Query | Test ID |
|------|-------------|-------------------|---------|
| main | The root element of the popover | — | `popover` |
| activator | The popover trigger element | `getByRole('button')` | `popover__activator` |
| content | The popover content panel | — | `popover__content` |

---

### Storybook

Storybook provides an interactive playground for testing different prop combinations, more complex recipes, all prop details, and accessibility attributes.

[View in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-popover--docs)

## Specifications

### Behaviour

| State | Behaviour |
|-------|-----------|
| Closed | Popover panel is hidden |
| Opened | Panel appears positioned relative to activator, focus moves to content |
| Activator pressed while open | Popover closes |
| Focus lost | Popover closes when panel loses focus |
| Input popover | Opens when input meets `minLength`, uses virtual focus |

### Accessibility

**WCAG compliance:**

- **2.1.1 Keyboard** — Popover is fully keyboard accessible via activator
- **1.3.1 Info and Relationships** — Content is associated with its activator
- **4.1.2 Name, Role, Value** — Activator communicates expanded state via `aria-expanded`

**ARIA attributes:**

| Element | Attribute | Description |
|---------|-----------|-------------|
| Activator | `aria-expanded` | Indicates whether the popover is open |
| Activator | `aria-controls` | References the popover content panel |
| Content (input popover) | `aria-activedescendant` | Points to the virtually focused item |

### Keyboard interaction

| Key | Action |
|-----|--------|
| `Enter` / `Space` | Opens/closes the popover via the activator |
| `Escape` | Closes the popover |
| `Tab` | Moves focus through focusable content inside the popover |
| `ArrowDown` / `ArrowUp` | Navigates items in menu/listbox popovers |

### Edge cases

- **Dynamic repositioning**: Panel moves automatically to stay within viewport bounds
- **Nested popovers**: Supported (e.g. Select inside a popover) — content grows in height by default
- **Container portals**: When using `container`, ensure the target element exists before mount
- **Virtual focus**: `IressInputPopover` keeps real focus on the input while virtually highlighting items

---

### Storybook

Storybook provides an interactive playground for testing different prop combinations and viewing accessibility attributes.

[View in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-popover--docs)

## Recipes

### Focusable Children

```tsx
import { useState } from 'react';
import {
  IressButton,
  IressPopover,
  usePopoverItem,
} from '@iress-oss/ids-components';

const CountButton = () => {
  const [count, setCount] = useState(0);
  const { isActiveInPopover, ...popoverItemProps } = usePopoverItem('Count', {
    onKeyDown: (e) => {
      if (e.key === '+') {
        setCount(count + 1);
      }
    },
  });

  return (
    <IressButton
      {...popoverItemProps}
      active={isActiveInPopover}
      mode="tertiary"
      fluid
    >
      Increase count using the + key: {count}
    </IressButton>
  );
};

export const UsePopoverExample = () => (
  <IressPopover
    activator={<IressButton>Toggle</IressButton>}
    container={document.body}
    type="listbox"
    virtualFocus
  >
    <CountButton />
    <CountButton />
  </IressPopover>
);
```

### With Listbox

```tsx
import { useState } from 'react';
import {
  IressButton,
  IressMenu,
  IressMenuItem,
  IressPopover,
} from '@iress-oss/ids-components';

export function PopoverWithListbox() {
  const [selected, setSelected] = useState<string | undefined>('aus');

  return (
    <IressPopover
      activator={<IressButton>Select country</IressButton>}
      container={document.body}
      type="listbox"
      contentStyle={{ p: 'none' }}
    >
      <IressMenu
        role="listbox"
        aria-label="Country"
        selected={selected}
        onChange={(value) => setSelected(value as string)}
      >
        <IressMenuItem value="aus">Australia</IressMenuItem>
        <IressMenuItem value="nz">New Zealand</IressMenuItem>
        <IressMenuItem value="uk">United Kingdom</IressMenuItem>
        <IressMenuItem value="sg">Singapore</IressMenuItem>
      </IressMenu>
    </IressPopover>
  );
}
```


---

# Progress

> Visualises the completion status of a task or process as a progress bar.

## Import

```tsx
import { IressProgress } from '@iress-oss/ids-components';
```

- [Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-progress--docs)
- [Source](https://github.com/iress/design-system/tree/main/packages/components/src/components/Progress)
- [Report issue](https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=progress&title=[Progress]+Bug:+)
- [Request feature](https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=progress,enhancement&title=[Progress]+Feature:+)

## Props

> Required props are **bold**.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| data-testid | `string` | — | The data-testid attribute is used to target elements in automated tests if no identifier is available. In some components it is propagated to child elements.  Notes: - Please use this prop sparingly and only when no other identifier is available, as per the guiding principles of Testing Library. - Only use this prop for your tests @see https://testing-library.com/docs/queries/bytestid |
| backgroundImage | `string` | — | A background image URL to be used as the background of the progress bar. |
| borderRadius | `RadiusToken` | — | The **`border-radius`** CSS property rounds the corners of an element's outer border edge using the radius tokens in the design system. @see https://developer.mozilla.org/docs/Web/CSS/border-radius |
| min | `number` | `0` | The minimum value of the progress indicator. If `min` is set, the progress indicator will render as a `<meter />` element instead of a `<progress />` element, thereby changing its role to `meter` instead of `progressbar`. |
| sectionTitle | `string` | `Progress is {{current}} of {{max}}` | The text that is announced by the screen reader. Should contain a description of the section the progress is being measured for. You can use {{current}} and {{max}} as string replacers for the current value and maximum value respectively. |
| value | `number` | `0` | The current value of the progress indicator. |

📄 [Full type definition](../../dist/components/Progress/Progress.d.ts)

Also accepts all [styling props](../styling-props/overview.md) ([type definition](../../dist/interfaces.d.ts), [token values](../tokens/tokens-reference.md)).

A progress component is used to indicate to a user the completion of a set of tasks or a process.

```tsx
<IressProgress min={10} max={30} value={20} />;
```

## Design

### When to use

> **Prefer [IressLoading](../patterns/loading.md)** for page/component loading states — it handles skeleton display, timing, and accessibility automatically.

- **Determinate progress**: When you know the completion percentage (e.g. file uploads, multi-step forms)
- **Step indicators**: Show progress through a multi-part process using `sectionTitle`
- **Upload/download progress**: Visualise file transfer progress

### When not to use

- **Indeterminate loading** (unknown duration) — use [Spinner](../components/spinner.md) or [Loading](../patterns/loading.md)
- **Content placeholders** — use [Skeleton](../components/skeleton.md) for layout-preserving loading states
- **Navigation between steps** — use a stepper or wizard pattern with interactive controls

### Do's and Don'ts

| ✅ Do | ❌ Don't |
|-------|----------|
| Set `min` and `max` to match your data range | Leave default 0–100 when your values differ |
| Use `sectionTitle` with tokens for screen readers | Display a progress bar without context for the user |
| Update progress in meaningful increments | Animate progress too frequently (causes layout thrashing) |

### Content guidelines

- **Section title**: Use the `{{current}}` and `{{max}}` tokens to provide context (e.g. "Step {'{{current}}'} of {'{{max}}'}")
- **Visual context**: Pair the progress bar with a text label explaining what is being loaded

### Related patterns

- [Loading](../patterns/loading.md) — full loading pattern with timing and accessibility
- [Spinner](../components/spinner.md) — for indeterminate loading
- [Skeleton](../components/skeleton.md) — for layout-preserving placeholders

## Develop

### Quick Start

```tsx
import { IressProgress } from '@iress-oss/ids-components';

<IressProgress min={0} max={100} value={50} />;
```

[View all props](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-progress--docs#api-props)

### Usage

Progress shows how far through a task or operation you are in a graphical way. The simplest way to use it to set the `value` to specify how much of the task the user has completed, relative to the `max` value (which defaults to 100).

#### Calculation to convert value into width

```tsx
Math.round(((this.value - this.min) / (this.max - this.min)) * 100);
```

This caters for those scenarios where the `min` or `max` values change.

#### Boundary limits

There is a danger that the value can exceed the boundaries set in the `min` and `max` values. To prevent this:

- If the `value` is less than the `min` prop, it is reset to the `min` prop
- If the `value` is more than the `max` prop, it is reset to the `max` prop

#### Section Title

The `sectionTitle` prop is used by assistive technologies and allows you to tailor the message announced when the progress component is selected. It supports two tokens:

- `{'{{current}}'}` — replaced with the `value`
- `{'{{max}}'}` — replaced with the maximum limit

For example, with a max of 10 and value of 6, the screen reader will announce: "Step 6 of 10"

#### Progress variants

The following examples demonstrate different ways to use the Progress component:

- **Empty state**: Shows a progress bar at 0% completion
- **Partial progress**: Shows a progress bar with partial completion (using custom min/max values)
- **With section title**: Uses the `sectionTitle` prop with tokens to display "Step X of Y"
- **With background image**: Demonstrates using a custom background image for visual interest

```tsx
import { IressProgress, IressStack } from '@iress-oss/ids-components';

export function ProgressExamples() {
  return (
    <IressStack gap="md">
      <IressProgress min={0} max={50} value={0} />
      <IressProgress min={10} max={30} value={20} />
      <IressProgress
        min={0}
        max={50}
        value={30}
        sectionTitle="Step {{current}} of {{max}}"
      />
      <IressProgress
        min={0}
        max={100}
        value={75}
        backgroundImage="https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2858&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />
    </IressStack>
  );
}
```

### Testing

Query the progress bar by its role:

```tsx
const progress = screen.getByRole('progressbar');
expect(progress).toHaveValue(75);
```


#### Test selectors

| Part | Description | Recommended Query | Test ID |
|------|-------------|-------------------|---------|
| main | The root element of the progress | `getByRole('meter')` when min, max, and value are all provided, otherwise `getByRole('progressbar')` | `progress` |

---

### Storybook

Storybook provides an interactive playground for testing different prop combinations and viewing accessibility attributes.

[View in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-progress--docs)

## Specifications

### Behaviour

| State | Behaviour |
|-------|-----------|
| Default | Renders a horizontal bar filled to the calculated percentage |
| Value below min | Clamped to `min` value |
| Value above max | Clamped to `max` value |
| With section title | Assistive technologies announce contextual progress message |

### Accessibility

**WCAG compliance:**

- **4.1.2 Name, Role, Value** — Uses `role="progressbar"` with `aria-valuenow`, `aria-valuemin`, `aria-valuemax`
- **1.3.1 Info and Relationships** — `sectionTitle` provides programmatic context for screen readers

**Keyboard interaction:**

Progress bars are not interactive and do not receive focus.

### Edge cases

- **Value equals min**: Renders an empty bar (0% width)
- **Value equals max**: Renders a full bar (100% width)
- **Dynamic min/max changes**: Width recalculates automatically based on the formula

---

### Storybook

Storybook provides an interactive playground for testing different prop combinations and viewing accessibility attributes.

[View in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-progress--docs)

---

# Provider

> Application-level wrapper that provides shared context for Modal, Slideout, Toaster, Tooltip, and Popover components.

## Import

```tsx
import { IressProvider } from '@iress-oss/ids-components';
```

- [Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-provider--docs)
- [Source](https://github.com/iress/design-system/tree/main/packages/components/src/components/Provider)
- [Report issue](https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=provider&title=[Provider]+Bug:+)
- [Request feature](https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=provider,enhancement&title=[Provider]+Feature:+)

## Props

> Required props are **bold**.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | `ReactNode` | — | The contents of your application, and/or the components which will be calling slideouts, modals and toasts. |
| container | `[FloatingUIContainer](../../dist/types.d.ts)` | — | Container to render modals, slideouts and toasts into. If not provided, will render into the body of the document.  **Note:** This does not affect popovers. Use `popoverContainer` to set a shared container for all nested popovers. |
| noIconProvider | `boolean` | `false` | Disable the built-in IconProvider. When true, no IconProvider is rendered, allowing you to provide your own icon loading mechanism (e.g. hiding the app until the Material Symbols font is fully loaded). |
| noSubsetting | `boolean` | `false` | Disable automatic font subsetting via Google Fonts CDN When false, only icons actually used in the component tree are loaded When true, the full Material Symbols font is loaded Ignored when `noIconProvider` is true. |
| noDefaultFont | `boolean` | — | If you don't want to load the default Iress font from the CDN, set this to true. |
| popoverContainer | `container` , [FloatingUIContainer](../../dist/types.d.ts) | — | Container to render popovers into. By default, popovers render where their parent is rendered (no portal).  Set to `"container"` to reuse the same container as the `container` prop (useful when you want modals, slideouts, toasts **and** popovers in the same DOM node).  Individual popovers can still override this by setting their own `container` prop. |
| zIndexOffset | `number` | — | A value added to every IDS z-index layer via `calc()`. Use this when your application has a navigation element with a high z-index and IDS overlays (modal, slideout, toast) appear behind it. @example // Navbar sits at z-index 995 — shift IDS layers above it: <IressProvider zIndexOffset={1000}>...</IressProvider> // Modal → 1400, Toast → 1500, Tooltip → 1600 |
| toasterOffset | `string` | — | Offsets the toaster from the viewport edge (block axis). Useful when a fixed navbar would overlap the toaster. Accepts any valid CSS length value (e.g. `'60px'`, `'4rem'`). @example <IressProvider toasterOffset="60px">...</IressProvider> |
| position | `bottom-center` , `bottom-end` , `bottom-start` , `top-center`, `top-end` , `top-start`  | `top-end` | The position on the screen where the toast will appear. |

📄 [Full type definition](../../dist/components/Provider/Provider.d.ts)

Also accepts all [styling props](../styling-props/overview.md) ([type definition](../../dist/interfaces.d.ts), [token values](../tokens/tokens-reference.md)).

Provider is a component that sets up the Iress Design System for your application. It ensures that the design system is correctly configured and ready to use. It is required for Modal, Slideout, Toaster, and Tooltip to function correctly.

## Design

### When to use

- **App-level wrapper**: Wrap your entire application to set up the design system
- **Micro frontends**: Provide a container for portalled components (modals, slideouts, toasts)

### When not to use

- **Inside IressShadow** — `IressShadow` already includes `IressProvider` internally

## Develop

### Quick Start

```tsx
import { IressProvider } from '@iress-oss/ids-components';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <IressProvider>
    <App />
  </IressProvider>,
);
```

[View all props](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-provider--docs#api-props)

### Usage

The design system provider automates some set-up tasks for you, including:

- Adding the icon fonts and CSS variables to the document head
- Consistent container handling for providers, if you need the modals, slideouts and toasts rendered in a specific area (common with micro frontends)
- Optional separate container for popovers via the `popoverContainer` prop

In most cases, you should wrap the entire application with the `IressProvider` component. This will ensure that the design system is set up correctly and consistently across the application.

> **Note:** `IressProvider` already includes `IressModalProvider`, `IressSlideoutProvider`, `IressToasterProvider`, `IressPopoverProvider`, and `IressIconProvider`. You do not need to add these providers separately when using `IressProvider`. Similarly, `IressShadow` includes `IressProvider` internally, so you do not need any additional providers when using `IressShadow`.

```tsx
import {
  IressButton,
  IressInline,
  IressModal,
  IressPanel,
  IressProvider,
  IressSlideout,
  IressText,
  useModal,
  useSlideout,
  useToaster,
} from '@iress-oss/ids-components';

const Page = () => {
  const { showModal } = useModal();
  const { showSlideout } = useSlideout();
  const toaster = useToaster();

  return (
    <IressPanel
      bg="alt"
      style={{
        height: '300px',
      }}
    >
      <IressInline gap="md">
        <IressButton onClick={() => showModal('test-modal')}>
          Show modal
        </IressButton>
        <IressModal id="test-modal">
          <IressText>Some modal content</IressText>
        </IressModal>
        <IressButton onClick={() => showSlideout('test-slideout')}>
          Show slideout
        </IressButton>
        <IressSlideout id="test-slideout">
          <IressText>Some slideout content</IressText>
        </IressSlideout>
        <IressButton
          onClick={() => toaster.success({ content: 'A toast message' })}
        >
          Show toast
        </IressButton>
      </IressInline>
    </IressPanel>
  );
};

export const AppWithProvider = () => (
  <IressProvider>
    <Page />
  </IressProvider>
);
```

---

### Storybook

[View in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-provider--docs)

## Specifications

### Behaviour

Wraps the application and sets up icon fonts, CSS variables, and container providers for Modal, Slideout, Toaster, Popover, and Icon components.

---

# RadioGroup

> Groups related radio buttons so users can select one option from a set.

## Import

```tsx
import { IressRadioGroup } from '@iress-oss/ids-components';
```

- [Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-radio-group--docs)
- [Figma](https://www.figma.com/design/youFqYT4CgpKxfLJQv80hf/WIP-Iress-Design-System-V6?node-id=7305-28220)
- [Source](https://github.com/iress/design-system/tree/main/packages/components/src/components/RadioGroup)
- [Report issue](https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=radio-group&title=[RadioGroup]+Bug:+)
- [Request feature](https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=radio-group,enhancement&title=[RadioGroup]+Feature:+)

## Props

> Required props are **bold**.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | `ReactNode` | — | Content of the radio group, usually multiple `IressRadio` components. |
| layout | `'block' , 'inline' , 'inlineEqualWidth', 'inlineFlex' , 'stack' ` | `'stack'` | Sets which of the block / inline layout options apply. |
| name | `string` | — | Name to be applied to all radios in the group. |
| onChange | `(e: ChangeEvent<HTMLInputElement>, value?: T) => void` | — | Called when a user selects one of its children radio buttons. If you pass in a non-string value, you can access it using the second parameter of the function. |
| required | `boolean` | — | When true, marks the field as required |
| defaultValue | `T` | — | Initial value of radio group when in uncontrolled mode. |
| readOnly | `[FormControlReadOnly](../../dist/types.d.ts)` | — | Renders a readOnly radio group. |
| value | `T` | — | Value of radio group when in controlled mode. |
| variant | `CheckboxVariants` | — | The visual variant of the radios in the group. This is passed down to child radios, but can be overridden at the individual radio level. - `card`: Provides a larger, card-like style with a heading slot. - `touch`: Provides a larger, button-like style, great for mobile devices. - `undefined`: The default radio style. |

📄 [Full type definition](../../dist/components/RadioGroup/RadioGroup.d.ts)

Also accepts all [styling props](../styling-props/overview.md) ([type definition](../../dist/interfaces.d.ts), [token values](../tokens/tokens-reference.md)).

A radio group is a group of radio buttons that allows the user to select one option from multiple options, where all options are visible.

```tsx
<IressRadioGroup>
  <IressRadio value="google">Google</IressRadio>
  <IressRadio value="newspaper">Newspaper</IressRadio>
  <IressRadio value="friend">Friend</IressRadio>
  <IressRadio value="other">Other</IressRadio>
</IressRadioGroup>;
```

## Design

### When to use

- **Single selection from visible options**: When users must choose one option and all options should be visible
- **Short lists**: Typically 2–7 options
- **Immediate visibility**: When comparing options side-by-side helps decision-making

### When not to use

- **Many options** — use [Select](../components/select.md) for more than 7 options
- **Multiple selections** — use [CheckboxGroup](../components/checkbox-group.md) instead
- **Toggle actions** — use [ButtonGroup](../components/button-group.md) for immediate-action toggles

### Content guidelines

- Provide a clear group label describing the choice
- Use parallel phrasing for option labels
- List options in a logical order (alphabetical, most common first, etc.)

### Related patterns

- [CheckboxGroup](../components/checkbox-group.md) — for multi-select
- [Select](../components/select.md) — for longer lists of options
- [ButtonGroup](../components/button-group.md) — for immediate-action toggles

## Develop

### Quick Start

```tsx
import { IressRadioGroup, IressRadio } from '@iress-oss/ids-components';

<IressRadioGroup name="survey">
  <IressRadio value="a">Option A</IressRadio>
  <IressRadio value="b">Option B</IressRadio>
</IressRadioGroup>;
```

[View all props](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-radiogroup--docs#api-props)

### Usage

Individual radio buttons can be passed directly into `IressRadioGroup`.

**Note:** The `mapRadioGroupOptions` helper function, originally used to map options to `IressRadio` components, is now deprecated. Instead, you can use `array.map` to map the options to `IressRadio` components.

```tsx
<IressRadioGroup>
  <IressRadio value="google">Google</IressRadio>
  <IressRadio value="newspaper">Newspaper</IressRadio>
  <IressRadio value="friend">Friend</IressRadio>
  <IressRadio value="other">Other</IressRadio>
</IressRadioGroup>;
```

#### Selection

The default checked state of the radio children should always be set using the `value` prop. Sometimes you may wish to use the `IressRadioGroup` as an "uncontrolled" component - for example, because you are using a third party form library that requires it. In this case, simply use `defaultValue` instead of `value`.

**Note:** The `value` prop on the `IressRadioGroup` component will always override the `checked` state of the `IressRadio` children.

```tsx
<IressRadioGroup defaultValue="newspaper">
  <IressRadio value="google">Google</IressRadio>
  <IressRadio value="newspaper">Newspaper</IressRadio>
  <IressRadio value="friend">Friend</IressRadio>
  <IressRadio value="other">Other</IressRadio>
</IressRadioGroup>;
```

#### Layout

The layout prop controls how the radio group is displayed and can have three basic layouts:

- **stack (Default):** Radio buttons are laid out vertically. Labels are only as wide as their text.
- **block:** Same as Stack, but labels take up the full width of the container.
- **inline:** Radio buttons are laid out horizontally. Labels are only as wide as their text.
- **inlineFlex:** Radio buttons are laid out horizontally. The container is only as wide as its contents.
- **inlineEqualWidth:** Radio buttons are laid out horizontally. Labels take up an equal amount of space in the container.

> **Note:**
>
> If using any of the inline* props within a `Field` component, the `Field` also
>   needs the inline prop to be set for the inline layouts to take effect.

```tsx
import {
  IressRadio,
  IressRadioGroup,
  IressStack,
  IressText,
} from '@iress-oss/ids-components';

export function RadioGroupLayout() {
  return (
    <IressStack gap="md">
      <IressText>
        <h3>block (default)</h3>
        <IressRadioGroup layout="block" variant="touch">
          <IressRadio value="google">Google</IressRadio>
          <IressRadio value="newspaper">Newspaper</IressRadio>
          <IressRadio value="friend">Friend</IressRadio>
          <IressRadio value="other">Other</IressRadio>
        </IressRadioGroup>
      </IressText>
      <IressText>
        <h3>inline</h3>
        <IressRadioGroup layout="inline" variant="touch">
          <IressRadio value="google">Google</IressRadio>
          <IressRadio value="newspaper">Newspaper</IressRadio>
          <IressRadio value="friend">Friend</IressRadio>
          <IressRadio value="other">Other</IressRadio>
        </IressRadioGroup>
      </IressText>
      <IressText>
        <h3>inlineEqualWidth</h3>
        <IressRadioGroup layout="inlineEqualWidth" variant="touch">
          <IressRadio value="google">Google</IressRadio>
          <IressRadio value="newspaper">Newspaper</IressRadio>
          <IressRadio value="friend">Friend</IressRadio>
          <IressRadio value="other">Other</IressRadio>
        </IressRadioGroup>
      </IressText>
      <IressText>
        <h3>inlineFlex</h3>
        <IressRadioGroup layout="inlineFlex" variant="touch">
          <IressRadio value="google">Google</IressRadio>
          <IressRadio value="newspaper">Newspaper</IressRadio>
          <IressRadio value="friend">Friend</IressRadio>
          <IressRadio value="other">Other</IressRadio>
        </IressRadioGroup>
      </IressText>
      <IressText>
        <h3>stack</h3>
        <IressRadioGroup layout="stack" variant="touch">
          <IressRadio value="google">Google</IressRadio>
          <IressRadio value="newspaper">Newspaper</IressRadio>
          <IressRadio value="friend">Friend</IressRadio>
          <IressRadio value="other">Other</IressRadio>
        </IressRadioGroup>
      </IressText>
    </IressStack>
  );
}
```

#### Hidden radio buttons

You can use the `hiddenRadio` prop to create custom radio buttons. When enabled, the actual radio button will be visually hidden, allowing you to create more interesting controls. The checked state will be shown by the label's border, which is thicker when the radio button is checked.

When `hiddenRadio` is enabled, the label will have no padding. Padding can be added by using a Panel or utility classes.

```tsx
<IressField
  label="I'd like to discuss the following in my financial review:"
  hint="Select one option"
>
  <IressRadioGroup
    defaultValue="home"
    required
    layout="inline"
    variant="card"
  />
</IressField>;
```

#### Laying out custom radio buttons

The radio group's `layout` prop gives you some default options to help control the layout of your controls. But sometimes you need more granular control, which you can achieve with a bit of custom CSS.

The example below uses CSS grid to give us evenly spaced / sized radio buttons, which will wrap on to new lines as the screen size reduces. The grid wrapper element is a div that wraps around the `<IressRadio />` elements, as shown by the dashed border. Use the grab handle in the bottom right-hand corner of the grid wrapper to see how the controls change size to respond to the container's width.

```tsx
<IressField
  label="I'd like to discuss the following in my financial review:"
  hint="Select one option"
>
  <IressRadioGroup
    name="financial-review"
    required
    layout="block"
    variant="card"
  >
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gridAutoRows: '1fr',
        gridGap: '0.75rem',
        width: '100%',
        padding: '0.5rem',
        border: '1px dashed hsl(43deg 100% 45%)',
        resize: 'horizontal',
        overflow: 'auto',
      }}
    >
      {children}
    </div>
  </IressRadioGroup>
</IressField>;
```

#### Read only

The `readOnly` prop changes how the radio group is rendered. It will only render if the children radio that is checked (alongside a hidden input that contains the `value` if it was set), otherwise it will not be rendered.

It is understandable that this may not be the desired behavior for all use cases. If you need a radio group that is not editable, but still visible, simply do not set the `readOnly` prop and set the `value` prop instead.

```tsx
<IressRadioGroup defaultValue="newspaper" readOnly>
  <IressRadio value="google">Google</IressRadio>
  <IressRadio value="newspaper">Newspaper</IressRadio>
  <IressRadio value="friend">Friend</IressRadio>
  <IressRadio value="other">Other</IressRadio>
</IressRadioGroup>;
```

#### Touch

The `touch` prop adds the button-like border and padding to radio.

```tsx
<IressRadioGroup defaultValue="newspaper" variant="touch">
  <IressRadio value="google">Google</IressRadio>
  <IressRadio value="newspaper">Newspaper</IressRadio>
  <IressRadio value="friend">Friend</IressRadio>
  <IressRadio value="other">Other</IressRadio>
</IressRadioGroup>;
```

### Testing

Query radio buttons within the group by their role:

```tsx
const radios = screen.getAllByRole('radio');
await user.click(screen.getByRole('radio', { name: 'Option A' }));
```

Query the group itself by its `radiogroup` role:

```tsx
const group = screen.getByRole('radiogroup', { name: 'Choose an option' });
```

#### Disambiguating multiple radio groups

When you have multiple Yes/No radio groups on the same page, use `within` to
scope queries to a specific group:

```tsx
import { within } from '@testing-library/react';

const approvalGroup = screen.getByRole('radiogroup', { name: 'Approve' });
const yes = within(approvalGroup).getByRole('radio', { name: 'Yes' });
await user.click(yes);
```

#### Gotchas

- **readOnly mode**: When `readOnly` is set, all radio roles are removed from
  the DOM. Only the selected option's label text and a hidden `<input>` remain.
  If nothing is selected, the group renders empty.
- **Focus behaviour**: Focusing the `radiogroup` element moves focus to the
  first radio child. The group needs `tabIndex` to be focusable programmatically.

[View test IDs](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-radiogroup--docs#testing)


#### Test selectors

| Part | Description | Recommended Query | Test ID |
|------|-------------|-------------------|---------|
| main | The root element of the radio group | `getByRole('radiogroup')` | `radio-group` |

---

### Storybook

[View in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-radiogroup--docs)

## Specifications

### Behaviour

| State | Behaviour |
|-------|-----------|
| Default | Single-select, stack layout |
| Read only | Only renders the selected option as text + hidden input |
| Touch | Adds button-like border and padding |

### Accessibility

- Renders as `radiogroup` role with accessible name from label
- **WCAG 4.1.2 Name, Role, Value** — each radio has proper role, name, and checked state
- Arrow keys move selection between options within the group

### Keyboard interaction

| Key | Action |
|-----|--------|
| `Tab` | Moves focus into/out of the radio group |
| `Arrow Up/Down` | Moves selection between radio options (stack layout) |
| `Arrow Left/Right` | Moves selection between radio options (inline layout) |
| `Space` | Selects the focused radio (if not already selected) |

---

# Radio

> Renders a single radio button for use within a group of mutually exclusive options.

## Import

```tsx
import { IressRadio } from '@iress-oss/ids-components';
```

- [Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-radio--docs)
- [Figma](https://www.figma.com/design/youFqYT4CgpKxfLJQv80hf/WIP-Iress-Design-System-V6?node-id=7305-28220)
- [Source](https://github.com/iress/design-system/tree/main/packages/components/src/components/Radio)
- [Report issue](https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=radio&title=[Radio]+Bug:+)
- [Request feature](https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=radio,enhancement&title=[Radio]+Feature:+)

## Props

> Required props are **bold**.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| checked | `boolean` | — | Sets the checked state of the radio. If it is within a radio group, it will be overridden by the radio group's value and whether it matches this radio's value. |
| children | `ReactNode` | — | Label of the radio |
| heading | `ReactNode` | — | Sets the heading for the radio when using the `card` variant |
| name | `string` | — | Sets the name attribute on the radio input. If it is within a radio group, it will be overridden with the radio group's name. |
| onChange | `((e: ChangeEvent<HTMLInputElement, Element>, value?: T) => void)` | — | Handles the onChange event of the radio input. If you pass in a non-string value, you can access it using the second parameter of the function. |
| required | `boolean` | — | If `true`, the radio is a required field and will be validated as such. If it is within a radio group, it will be overridden with the radio group's required state. |
| readOnly | `[FormControlReadOnly](../../dist/types.d.ts)` | — | Renders the radio as read-only. Use `'locked'` when the value is read-only because of permissions. |
| value | `T` | — | The value which is submitted with the form data when this radio button is checked. To set this radio as checked by default, use the `checked` property. |
| variant | `[IressCheckboxVariants](../../dist/components/Checkbox/Checkbox.d.ts)` | — | The visual variant of the radio. - `card`: Provides a larger, card-like style with a heading slot. - `touch`: Provides a larger, button-like style, great for mobile devices. - `undefined`: The default radio style. |
| data-testid | `string` | — | The data-testid attribute is used to target elements in automated tests if no identifier is available. In some components it is propagated to child elements.  Notes: - Please use this prop sparingly and only when no other identifier is available, as per the guiding principles of Testing Library. - Only use this prop for your tests @see https://testing-library.com/docs/queries/bytestid |

📄 [Full type definition](../../dist/components/Radio/Radio.d.ts)

Also accepts all [styling props](../styling-props/overview.md) ([type definition](../../dist/interfaces.d.ts), [token values](../tokens/tokens-reference.md)).

A radio is a single option presented with a radio button. It is used to select a single option from multiple options. It is typically used in an IressRadioGroup.

```tsx
<IressRadio checked>Checked radio button</IressRadio>;
```

## Design

### When to use

- **Inside a RadioGroup**: As individual options within an `IressRadioGroup`
- **Standalone toggle**: Rare — typically only when a single binary choice is needed with radio semantics

### When not to use

- **Multiple selections** — use [Checkbox](../components/checkbox.md) instead
- **On/off toggles** — use [Toggle](../components/toggle.md) for boolean switches

### Related patterns

- [RadioGroup](../components/radio-group.md) — the parent container for radio options
- [Checkbox](../components/checkbox.md) — for multi-select options

## Develop

### Quick Start

```tsx
import { IressRadio } from '@iress-oss/ids-components';

<IressRadio>Radio button</IressRadio>;
```

[View all props](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-radio--docs#api-props)

### Usage

#### Checked

You can set the radio to `checked` by default. This is useful when you want to pre-select an option.

**Note:** If you are using an `IressRadioGroup`, you should use the `value` prop on the `IressRadioGroup` to set the checked state of its `<IressRadio />` children, as the `checked` prop will be ignored.

```tsx
<IressRadio checked>Checked radio button</IressRadio>;
```

#### Read only

The `readOnly` prop changes how the radio is rendered. It will only render if the radio is checked (alongside a hidden input that contains the `value` if it was set), otherwise it not be rendered.

It is understandable that this may not be the desired behavior for all use cases. If you need a radio that is not editable, but still visible, simply do not set the `readOnly` prop and set the `checked` prop instead.

```tsx
import { IressRadio, IressStack } from '@iress-oss/ids-components';

export function RadioReadOnly() {
  return (
    <IressStack gap="sm">
      <IressRadio readOnly checked>
        Radio button
      </IressRadio>
      <IressRadio readOnly>Radio button</IressRadio>
    </IressStack>
  );
}
```

#### Variants

The `variant` prop changes the visual style of the radio. The `card` variant adds a card-like border and the `touch` variant adds button-like border and padding.

```tsx
import { IressRadio, IressStack } from '@iress-oss/ids-components';

export function RadioVariants() {
  return (
    <IressStack gap="lg">
      <IressRadio variant="card" heading="Widget">
        A description of the widget
      </IressRadio>
      <IressRadio variant="touch">Touch variant</IressRadio>
    </IressStack>
  );
}
```

### Testing

Query radio buttons by their accessible role and label text:

```tsx
const radio = screen.getByRole('radio', { name: 'Option A' });
```

When you have multiple radios on the same page (e.g. Yes/No questions), always
query by the specific label text to disambiguate:

```tsx
// Multiple radio groups on the same page
const yesRadio = screen.getByRole('radio', { name: 'Yes' });
const noRadio = screen.getByRole('radio', { name: 'No' });

// If labels are identical across groups, scope your query to a container
const group = screen.getByRole('radiogroup', { name: 'Approve request' });
const yes = within(group).getByRole('radio', { name: 'Yes' });
```

#### Gotchas

- **readOnly mode**: When `readOnly` is set, the radio role is removed from the
  DOM entirely. Only the text label and a hidden `<input>` remain. Use
  `queryByRole('radio')` to assert absence, and `getByText` to find the label.
- **Unchecked readOnly radios render nothing**: If a radio is `readOnly` and not
  checked, it renders no output at all.

[View test IDs](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-radio--docs#testing)


#### Test selectors

| Part | Description | Recommended Query | Test ID |
|------|-------------|-------------------|---------|
| main | The root element of the radio | — | `radio` |
| input | The underlying radio input element | `getByRole('radio', { name: '...' })` | `radio__input` |
| radioMark | The visual radio indicator | — | `radio__radioMark` |

---

### Storybook

[View in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-radio--docs)

## Specifications

### Behaviour

| State | Behaviour |
|-------|-----------|
| Default | Unchecked radio with label |
| Checked | Radio indicator filled |
| Read only | Only renders if checked; otherwise renders nothing |
| Variants | `card` adds border; `touch` adds border + padding |

### Accessibility

- Renders as `radio` role with accessible name from children text
- **WCAG 4.1.2 Name, Role, Value** — checked state communicated programmatically

### Keyboard interaction

| Key | Action |
|-----|--------|
| `Space` | Selects the radio if not already selected |
| `Arrow keys` | Moves between radios when inside a RadioGroup |

---

# Readonly

> Displays a form value in a non-editable, read-only format.

## Import

```tsx
import { IressReadonly } from '@iress-oss/ids-components';
```

- [Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-readonly--docs)
- [Source](https://github.com/iress/design-system/tree/main/packages/components/src/components/Readonly)
- [Report issue](https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=readonly&title=[Readonly]+Bug:+)
- [Request feature](https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=readonly,enhancement&title=[Readonly]+Feature:+)

## Props

> Required props are **bold**.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | `ReactNode` | — | The formatted value. If not provided, the value will be displayed. |
| inline | `boolean` | — | Make prepend/append element closer to the input content. |
| variant | `[FormControlReadOnly](../../dist/types.d.ts)` | — | The readonly variant. - `'locked'`: Applies disabled-like styling (greyed out, `not-allowed`   cursor). The value is still submitted via a hidden input. |
| actions | `Omit<[IressButtonProps](../../dist/components/Button/Button.d.ts), "status" | "mode">[]` | — | Actions to display in the input field, rendered inside the input on the right. These will be rendered with opinionated styling. If you want to use custom buttons or controls, use the `append` prop instead. |
| width | `any` | — | The width of the input. |
| defaultValue | `[FormControlValue](../../dist/types.d.ts)` | — | The value of the input. Can be a string or a number. Use for uncontrolled inputs. |
| data-testid | `string` | — | The data-testid attribute is used to target elements in automated tests if no identifier is available. In some components it is propagated to child elements.  Notes: - Please use this prop sparingly and only when no other identifier is available, as per the guiding principles of Testing Library. - Only use this prop for your tests @see https://testing-library.com/docs/queries/bytestid |
| value | `[FormControlValue](../../dist/types.d.ts)` | — | The value of the input. Can be a string or a number. Use for controlled inputs. |
| append | `ReactNode` | — | Content to append to the input field, usually a button or icon. |
| loading | `boolean, string ` | — | The loading states of the input field. If provided a string, will use that text as the loading message. |
| prepend | `ReactNode` | — | Content to prepended to the input field, usually an icon. |
| alignRight | `boolean` | `false` | Set input content align to right, useful for numeric inputs. |
| formatter | `((value?: T) => string | number)` | — | Bring your own formatter that will be used to format the value when the input is not focused, allowing you to display the value in a different format. e.g. User type in value="dsf 987kkk123" => result after formatter: $987,123 (string) |

📄 [Full type definition](../../dist/components/Readonly/Readonly.d.ts)

Also accepts all [styling props](../styling-props/overview.md) ([type definition](../../dist/interfaces.d.ts), [token values](../tokens/tokens-reference.md)).

Readonly displays a value that cannot be edited by the user. It renders a hidden input field to ensure the value is submitted with the form.

```tsx
<IressReadonly value="AU">
  <IressInline verticalAlign="middle" gap="sm">
    <IressIcon name="flag" /> Australia
  </IressInline>
</IressReadonly>;
```

## Design

### When to use

- **Displaying form values**: Show submitted or pre-populated data the user cannot change
- **Permission-restricted fields**: Display values the current user doesn't have permission to edit
- **Confirmation views**: Show collected data before final submission
- **Inline read-only data**: Display values alongside editable form fields

### When not to use

- **Static text** that isn't part of a form — use [Text](../components/text.md) instead
- **Disabled fields** that may become editable — use a disabled input state instead
- **Displaying status** — use [Alert](../components/alert.md) or [Tag](../components/tag.md) instead

### Do's and Don'ts

| ✅ Do | ❌ Don't |
|-------|----------|
| Use `variant="locked"` for permission-restricted values | Use readonly for fields the user will later edit |
| Provide `actions` for copy-to-clipboard or related actions | Add edit actions that navigate away from the current view |
| Use `children` for rich content that represents the value | Put interactive form controls inside a readonly field |

### Content guidelines

- **Value text**: Display the actual form value clearly — avoid abbreviations unless space-constrained
- **Actions**: Use icon-only buttons (e.g. copy, view) to keep the layout compact
- **Labels**: Always pair with a form label via `IressField` for accessibility

### Related patterns

- [Input](../components/input.md) — for editable text input
- [Text](../components/text.md) — for static display text outside forms
- [Field](../components/field.md) — for labelling form controls including readonly

## Develop

### Quick Start

```tsx
import { IressReadonly } from '@iress-oss/ids-components';

<IressReadonly value="AU" />;
```

[View all props](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-readonly--docs#api-props)

### Usage

#### Rich Content

You can pass in stylised content that represents the value by using the `children` prop. If no `children` is provided, it will display the `value` directly.

```tsx
<IressReadonly value="AU">
  <IressInline verticalAlign="middle" gap="sm">
    <IressIcon name="flag" /> Australia
  </IressInline>
</IressReadonly>;
```

#### Inline

You can make the prepend/append element closer to the input content using the `inline` prop.

```tsx
<IressReadonly
  value="AU"
  prepend={<IressText color="colour.neutral.70">Prepend</IressText>}
  append={<IressText color="colour.neutral.70">Append</IressText>}
  inline
>
  <IressInline verticalAlign="middle" gap="sm">
    <IressIcon name="flag" /> Australia
  </IressInline>
</IressReadonly>;
```

#### Actions

The `actions` prop allows you to add buttons next to the readonly field. These can be used to trigger actions related to the displayed value, such as copying it to the clipboard or opening an edit dialog.

```tsx
import {
  IressInput,
  IressReadonly,
  type IressReadonlyProps,
} from '@iress-oss/ids-components';
import { useState } from 'react';

export const ReadonlyEditToggle = (props: IressReadonlyProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(String(props.value ?? ''));

  if (isEditing) {
    return (
      <IressInput
        value={value}
        onChange={(e) => setValue(e.target.value)}
        actions={[
          {
            icon: 'check',
            children: 'Save',
            onClick: () => setIsEditing(false),
          },
        ]}
        autoFocus
      />
    );
  }

  return (
    <IressReadonly
      {...props}
      value={value}
      actions={[
        {
          icon: 'edit',
          children: 'Edit',
          onClick: () => setIsEditing(true),
        },
      ]}
    />
  );
};
```

#### Locked

Use `variant="locked"` to indicate the value is read-only due to permissions. This applies disabled-like styling (greyed out, `not-allowed` cursor) and still submits the value via a hidden input, but the locked field itself is not focusable or announced as an editable form control by assistive technologies.

When form controls such as `IressInput` or `IressSelect` are rendered with `readOnly="locked"`, they automatically pass the locked variant through to `IressReadonly`.

```tsx
<IressReadonly value="AU" variant="locked" />;
```

### Testing

Query the readonly display by its text content:

```tsx
const value = screen.getByText('Read-only value');
```

**Gotchas:**

- **No input role**: `IressReadonly` does not render a visible input element. The value is displayed as plain text. A hidden `<input>` preserves the form value but is not queryable by role.


#### Test selectors

| Part | Description | Recommended Query | Test ID |
|------|-------------|-------------------|---------|
| main | The root element of the readonly | `getByText('...')` | `readonly` |
| input | The hidden input element | — | `readonly__input` |

---

### Storybook

Storybook provides an interactive playground for testing different prop combinations and viewing accessibility attributes.

[View in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-readonly--docs)

## Specifications

### Behaviour

| State | Behaviour |
|-------|-----------|
| Default | Displays the `value` as plain text with a hidden `<input>` for form submission |
| Rich content | Displays `children` visually while submitting the `value` via hidden input |
| Inline | Prepend/append elements are positioned closer to the content |
| Locked | Greyed out styling with `not-allowed` cursor; not focusable |
| With actions | Displays action buttons adjacent to the readonly value |

### Accessibility

**WCAG compliance:**

- **1.3.1 Info and Relationships** — Should be paired with a label via `IressField` to provide context
- **4.1.2 Name, Role, Value** — Hidden input preserves form value; visible text is presentational

**Keyboard interaction:**

| Key | Action |
|-----|--------|
| `Tab` | Moves focus to action buttons (if present); skips the readonly value itself |

### Edge cases

- **Empty value**: Renders an empty text area — consider showing a placeholder like "—" or "Not set"
- **Locked variant**: Not focusable by keyboard; assistive technologies skip it entirely
- **Long values**: Text wraps within the container; no truncation by default

---

### Storybook

Storybook provides an interactive playground for testing different prop combinations and viewing accessibility attributes.

[View in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-readonly--docs)

---

# Row

> Arranges children in a horizontal row within a grid or flex layout.

## Import

```tsx
import { IressRow } from '@iress-oss/ids-components';
```

- [Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-row--docs)
- [Source](https://github.com/iress/design-system/tree/main/packages/components/src/components/Row)
- [Report issue](https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=row&title=[Row]+Bug:+)
- [Request feature](https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=row,enhancement&title=[Row]+Feature:+)

## Props

> Required props are **bold**.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | `ReactNode` | — | Any content you would like to be contained. Best used with `IressCol`. |
| gutter | `[ResponsiveProp](../../dist/types.d.ts)<[PositiveSpacingToken](../../dist/types.d.ts)>` | — | Sets the gap between the children `<IressCol />` components. |
| horizontalAlign | `any` | `left` | Horizontal alignment, follows flexbox justify-content |
| rowGap | `[ResponsiveProp](../../dist/types.d.ts)<[PositiveSpacingToken](../../dist/types.d.ts)>` | — | Sets the size of the top and bottom gap between direct children when they begin to wrap. @see https://developer.mozilla.org/docs/Web/CSS/row-gap |
| verticalAlign | `any` | `top` | Vertical alignment, follows flexbox align-items |
| data-testid | `string` | — | The data-testid attribute is used to target elements in automated tests if no identifier is available. In some components it is propagated to child elements.  Notes: - Please use this prop sparingly and only when no other identifier is available, as per the guiding principles of Testing Library. - Only use this prop for your tests @see https://testing-library.com/docs/queries/bytestid |

📄 [Full type definition](../../dist/components/Row/Row.d.ts)

Also accepts all [styling props](../styling-props/overview.md) ([type definition](../../dist/interfaces.d.ts), [token values](../tokens/tokens-reference.md)).

Used in conjunction with the IressCol component to lay out page content.

```tsx
<IressRow gutter="spacing.7" horizontalAlign="left" verticalAlign="top">
  <IressCol span={4}>
    <IressPlaceholder>Column 1</IressPlaceholder>
  </IressCol>
  <IressCol span={4}>
    <IressPlaceholder>Column 2</IressPlaceholder>
  </IressCol>
  <IressCol span={4}>
    <IressPlaceholder>Column 3</IressPlaceholder>
  </IressCol>
</IressRow>;
```

## Design

### When to use

- **Grid layouts**: Create multi-column layouts with `IressCol` children
- **Responsive grids**: Columns that reflow at different breakpoints

### When not to use

- **Simple horizontal lists** — use [Inline](../components/inline.md) instead
- **Without Col children** — Row is designed to work with `IressCol`

### Related patterns

- [Col](../components/col.md) — column children for the row grid
- [Container](../components/container.md) — centres and pads the page
- [Inline](../components/inline.md) — simpler horizontal layout

## Develop

### Quick Start

```tsx
import { IressRow, IressCol } from '@iress-oss/ids-components';

<IressRow>
  <IressCol span="6">Left</IressCol>
  <IressCol span="6">Right</IressCol>
</IressRow>;
```

[View all props](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-row--docs#api-props)

### Usage

`IressRow` supports visual hierarchy by allowing you to add multiple columns in your layout, allowing the user to see more content on the screen at the same time.

It works best alongside the `IressContainer` and `IressCol` components.

#### Gutter

The spacing between columns is controlled by the `gutter` prop. To change the spacing between multiple columns once the row wraps, you can use the `rowGrap` prop.

Note: The `gutter` prop only works with `IressCol` components. If you are using other components, please use the `IressInline` component instead.

```tsx
<IressStack maxWidth="container.xl" gap="xl">
  <IressText element="h3">spacing.2</IressText>
  <IressRow gutter="spacing.2">
    <IressCol span={6}>
      <IressPlaceholder>
        <IressText noGutter textAlign="center" className="iress-p--md">
          1 of 4<br />
          <small>Slightly taller</small>
        </IressText>
      </IressPlaceholder>
    </IressCol>
    <IressCol span={6}>
      <IressPlaceholder>
        <IressText noGutter>2 of 4</IressText>
      </IressPlaceholder>
    </IressCol>
    <IressCol span={6}>
      <IressPlaceholder>
        <IressText noGutter>3 of 4</IressText>
      </IressPlaceholder>
    </IressCol>
    <IressCol span={6}>
      <IressPlaceholder>
        <IressText noGutter>4 of 4</IressText>
      </IressPlaceholder>
    </IressCol>
  </IressRow>
  <IressDivider mb="xl" />
  <IressText element="h3">spacing.4</IressText>
  <IressRow gutter="spacing.4">
    <IressCol span={6}>
      <IressPlaceholder>
        <IressText noGutter textAlign="center" className="iress-p--md">
          1 of 4<br />
          <small>Slightly taller</small>
        </IressText>
      </IressPlaceholder>
    </IressCol>
    <IressCol span={6}>
      <IressPlaceholder>
        <IressText noGutter>2 of 4</IressText>
      </IressPlaceholder>
    </IressCol>
    <IressCol span={6}>
      <IressPlaceholder>
        <IressText noGutter>3 of 4</IressText>
      </IressPlaceholder>
    </IressCol>
    <IressCol span={6}>
      <IressPlaceholder>
        <IressText noGutter>4 of 4</IressText>
      </IressPlaceholder>
    </IressCol>
  </IressRow>
  <IressDivider mb="xl" />
  <IressText element="h3">spacing.7</IressText>
  <IressRow gutter="spacing.7">
    <IressCol span={6}>
      <IressPlaceholder>
        <IressText noGutter textAlign="center" className="iress-p--md">
          1 of 4<br />
          <small>Slightly taller</small>
        </IressText>
      </IressPlaceholder>
    </IressCol>
    <IressCol span={6}>
      <IressPlaceholder>
        <IressText noGutter>2 of 4</IressText>
      </IressPlaceholder>
    </IressCol>
    <IressCol span={6}>
      <IressPlaceholder>
        <IressText noGutter>3 of 4</IressText>
      </IressPlaceholder>
    </IressCol>
    <IressCol span={6}>
      <IressPlaceholder>
        <IressText noGutter>4 of 4</IressText>
      </IressPlaceholder>
    </IressCol>
  </IressRow>
</IressStack>;
```

#### Responsive Gutter

The `gutter` prop can take an object that takes five key/value pairs that correlate with the IDS breakpoints.

```tsx
<IressContainer>
  <IressRow
    gutter={{
      xs: 'spacing.1',
      sm: 'spacing.2',
      md: 'spacing.4',
      lg: 'spacing.7',
      xl: 'spacing.10',
      xxl: 'spacing.1',
    }}
  >
    <IressCol span={6}>
      <IressPlaceholder>
        <IressText noGutter textAlign="center" className="iress-p--md">
          1 of 4<br />
          <small>Slightly taller</small>
        </IressText>
      </IressPlaceholder>
    </IressCol>
    <IressCol span={6}>
      <IressPlaceholder>
        <IressText noGutter>2 of 4</IressText>
      </IressPlaceholder>
    </IressCol>
    <IressCol span={6}>
      <IressPlaceholder>
        <IressText noGutter>3 of 4</IressText>
      </IressPlaceholder>
    </IressCol>
    <IressCol span={6}>
      <IressPlaceholder>
        <IressText noGutter>4 of 4</IressText>
      </IressPlaceholder>
    </IressCol>
  </IressRow>
</IressContainer>;
```

#### Horizontal alignment

`IressRow` can be set to align horizontally using the `horizontalAlign` prop.

```tsx
<IressContainer>
  <IressStack gap="md">
    <IressText element="h3">left</IressText>
    <IressRow horizontalAlign="left">
      <IressCol span={2}>
        <IressPlaceholder>
          <IressText noGutter>1 of 3</IressText>
        </IressPlaceholder>
      </IressCol>
      <IressCol span={2}>
        <IressPlaceholder>
          <IressText noGutter>2 of 3</IressText>
        </IressPlaceholder>
      </IressCol>
      <IressCol span={2}>
        <IressPlaceholder>
          <IressText noGutter>3 of 3</IressText>
        </IressPlaceholder>
      </IressCol>
    </IressRow>
    <IressText element="h3">center</IressText>
    <IressRow horizontalAlign="center">
      <IressCol span={2}>
        <IressPlaceholder>
          <IressText noGutter>1 of 3</IressText>
        </IressPlaceholder>
      </IressCol>
      <IressCol span={2}>
        <IressPlaceholder>
          <IressText noGutter>2 of 3</IressText>
        </IressPlaceholder>
      </IressCol>
      <IressCol span={2}>
        <IressPlaceholder>
          <IressText noGutter>3 of 3</IressText>
        </IressPlaceholder>
      </IressCol>
    </IressRow>
    <IressText element="h3">right</IressText>
    <IressRow horizontalAlign="right">
      <IressCol span={2}>
        <IressPlaceholder>
          <IressText noGutter>1 of 3</IressText>
        </IressPlaceholder>
      </IressCol>
      <IressCol span={2}>
        <IressPlaceholder>
          <IressText noGutter>2 of 3</IressText>
        </IressPlaceholder>
      </IressCol>
      <IressCol span={2}>
        <IressPlaceholder>
          <IressText noGutter>3 of 3</IressText>
        </IressPlaceholder>
      </IressCol>
    </IressRow>
    <IressText element="h3">between</IressText>
    <IressRow horizontalAlign="between">
      <IressCol span={2}>
        <IressPlaceholder>
          <IressText noGutter>1 of 3</IressText>
        </IressPlaceholder>
      </IressCol>
      <IressCol span={2}>
        <IressPlaceholder>
          <IressText noGutter>2 of 3</IressText>
        </IressPlaceholder>
      </IressCol>
      <IressCol span={2}>
        <IressPlaceholder>
          <IressText noGutter>3 of 3</IressText>
        </IressPlaceholder>
      </IressCol>
    </IressRow>
  </IressStack>
</IressContainer>;
```

#### Vertical alignment

`IressRow` can be set to align vertically using the `verticalAlign` prop.

```tsx
<IressContainer>
  <IressStack gap="md">
    <IressText element="h3">top</IressText>
    <IressRow style={{ height: '10rem' }} verticalAlign="top">
      <IressCol>
        <IressPlaceholder height="100%">
          <IressText noGutter>1 of 3</IressText>
        </IressPlaceholder>
      </IressCol>
      <IressCol>
        <IressPlaceholder height="100%">
          <IressText noGutter>2 of 3</IressText>
        </IressPlaceholder>
      </IressCol>
      <IressCol>
        <IressPlaceholder height="100%">
          <IressText noGutter>3 of 3</IressText>
        </IressPlaceholder>
      </IressCol>
    </IressRow>
    <IressText element="h3">middle</IressText>
    <IressRow style={{ height: '10rem' }} verticalAlign="middle">
      <IressCol>
        <IressPlaceholder height="100%">
          <IressText noGutter>1 of 3</IressText>
        </IressPlaceholder>
      </IressCol>
      <IressCol>
        <IressPlaceholder height="100%">
          <IressText noGutter>2 of 3</IressText>
        </IressPlaceholder>
      </IressCol>
      <IressCol>
        <IressPlaceholder height="100%">
          <IressText noGutter>3 of 3</IressText>
        </IressPlaceholder>
      </IressCol>
    </IressRow>
    <IressText element="h3">bottom</IressText>
    <IressRow style={{ height: '10rem' }} verticalAlign="bottom">
      <IressCol>
        <IressPlaceholder height="100%">
          <IressText noGutter>1 of 3</IressText>
        </IressPlaceholder>
      </IressCol>
      <IressCol>
        <IressPlaceholder height="100%">
          <IressText noGutter>2 of 3</IressText>
        </IressPlaceholder>
      </IressCol>
      <IressCol>
        <IressPlaceholder height="100%">
          <IressText noGutter>3 of 3</IressText>
        </IressPlaceholder>
      </IressCol>
    </IressRow>
    <IressText element="h3">stretch</IressText>
    <IressRow style={{ height: '10rem' }} verticalAlign="stretch">
      <IressCol>
        <IressPlaceholder height="100%">
          <IressText noGutter>1 of 3</IressText>
        </IressPlaceholder>
      </IressCol>
      <IressCol>
        <IressPlaceholder height="100%">
          <IressText noGutter>2 of 3</IressText>
        </IressPlaceholder>
      </IressCol>
      <IressCol>
        <IressPlaceholder height="100%">
          <IressText noGutter>3 of 3</IressText>
        </IressPlaceholder>
      </IressCol>
    </IressRow>
  </IressStack>
</IressContainer>;
```

### Testing

`IressRow` is a layout primitive with no semantic role. Target its children
directly or use a `data-testid`:

```tsx
const row = screen.getByTestId('my-row');
```


#### Test selectors

| Part | Description | Recommended Query | Test ID |
|------|-------------|-------------------|---------|
| main | The root element of the row | — | `row` |

---

### Storybook

[View in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-row--docs)

## Specifications

### Behaviour

A CSS grid row container. Supports `gutter`, `horizontalAlign`, and `verticalAlign` props with responsive object values.

| Breakpoint | Screen Widths |
|------------|---------------|
| `xs` | 0 - 575px |
| `sm` | 576px - 767px |
| `md` | 768px - 1023px |
| `lg` | 1024px - 1279px |
| `xl` | 1280px - 1599px |
| `xxl` | 1600px and above |

---

# Select

> Renders a dropdown select input for choosing one option from a list.

## Import

```tsx
import { IressSelect } from '@iress-oss/ids-components';
```

- [Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-select--docs)
- [Figma](https://www.figma.com/design/youFqYT4CgpKxfLJQv80hf/WIP-Iress-Design-System-V6?node-id=7305-23433)
- [Source](https://github.com/iress/design-system/tree/main/packages/components/src/components/Select)
- [Report issue](https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=select&title=[Select]+Bug:+)
- [Request feature](https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=select,enhancement&title=[Select]+Feature:+)

## Props

> Required props are **bold**.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| align | `[FloatingUIAligns](../../dist/types.d.ts)` | `bottom-start` | Sets the alignment of the dropdown relative to the activator element. |
| autoHighlight | `boolean` | `true` | By default, the Select will automatically highlight the first option in the list when it is opened. Set this to false to disable that behaviour. |
| disabled | `boolean` | — |  |
| defaultValue | `any` | — | Value of selected option for uncontrolled select. |
| multiSelect | `boolean` | — | Set to true if the user can select multiple options. |
| multiSelectLimit | `number` | `5` | Limits the number of selected value tags shown before the rest are collapsed into a summary tag (e.g. "+3 more"). Only applies when `multiSelect` is `true`. This is not for validation — it only controls how many tags are visibly rendered. |
| name | `string` | — | Name of the select. Used to pass data when submitted within a form. |
| native | `any` | — | If `true`, the select will render a native select element instead of the custom select. This is for use in contexts where the select's popover may not work, such as within modals or tables, or when you want to use the native select's features such as optgroups. |
| onBlur | `((event: Event , FocusEvent<HTMLElement, Element>) => void)` | — | Callback fired when the user has completely blurred away from the Select. This is to kill the blur event bubbling. (component is no longer in focus and popover is closed). |
| onChange | `any` | — | Emitted when the value changes. Required for integration with `IressForm`. When using custom `renderOptions`, pass `handleMenuChange` to your menu's `onChange` to ensure this callback fires. |
| **options** | `FormattedLabelValueMeta<[FormControlValue](../../dist/types.d.ts)>[] , ((query: string) => Promise<[LabelValueMeta](../../dist/interfaces.d.ts)<[FormControlValue](../../dist/types.d.ts)>[]>)` | — | The available options that the user can select from. |
| placeholder | `any` | — | Placeholder, shown when there is nothing selected. |
| readOnly | `[FormControlReadOnly](../../dist/types.d.ts)` | — | Renders the select as read-only. |
| renderHiddenInput | `((props: SelectHiddenInputRenderProps<TMultiple>) => ReactNode)` | — | Completely customise the rendering of the hidden input. |
| renderLabel | `((props: SelectLabelRenderProps<TMultiple>) => ReactElement>)` | — | Completely customise the rendering of the select label. |
| renderOptions | `((props: SelectOptionsRenderProps<TMultiple>) => ReactNode)` | — | Completely customise the rendering of the select options. |
| required | `boolean` | — | Whether its required. Will be passed to the hidden input. |
| type | `dialog` , `grid` , `listbox`, `menu` , `tree`  | — |  |
| value | `any` | — | Value of selected option for controlled select. |
| virtualFocus | `boolean` | — |  |
| header | `ReactNode` | — | Header showed in option panel when expanded. |
| footer | `ReactNode` | — | Footer showed in option panel when expanded. |
| width | `any` | — | The width of the select. |
| matchActivatorWidth | `boolean` | `true` | Whether the popover should match the width of the activator element. When true, the dropdown will have the same width as the select input. When false, the dropdown will size based on its content. |
| minSearchLength | number _(Only when options is a function (async))_ | — | Minimum number of characters required before search results are shown. |

📄 [Full type definition](../../dist/components/Select/Select.d.ts)

Also accepts all [styling props](../styling-props/overview.md) ([type definition](../../dist/interfaces.d.ts), [token values](../tokens/tokens-reference.md)).

Renders a dropdown select input for choosing one option from a list.

```tsx
<IressSelect
  options={[
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3' },
    { label: 'Option 4', value: '4' },
    { label: 'Option 5', value: '5' },
  ]}
/>;
```

## Design

### When to use

- **Choosing from a predefined list**: When users need to pick one (or multiple) options from a known set
- **Form inputs**: Standard form fields where a dropdown is appropriate
- **Async search**: When options are loaded dynamically based on user input
- **Grouped options**: When options are logically grouped into categories

### When not to use

- **Free text input** — use [Input](../components/input.md) instead
- **Boolean choices** — use a [Toggle](../components/toggle.md) or [Checkbox](../components/checkbox.md)
- **Very few options (2–3)** — consider [Radio Group](../components/radio-group.md) for better visibility

### Do's and Don'ts

| ✅ Do | ❌ Don't |
|-------|----------|
| Provide a placeholder that hints at what to select | Leave placeholder empty with no context |
| Use async options for large datasets | Load thousands of options upfront |
| Group related options for easier scanning | Mix unrelated options without grouping |
| Set a sensible `limit` for multi-select | Allow unlimited selections when a max makes sense |

### Content guidelines

- **Placeholder**: Use a descriptive hint (e.g. "Select a country", "Choose an account")
- **Option labels**: Keep concise, use sentence case
- **Groups**: Use clear heading labels for grouped options
- **Empty state**: Provide helpful text when no options match a search

### Related patterns

- [Autocomplete](../components/autocomplete.md) — for free-text input with suggestions
- [Field](../components/field.md) — for wrapping Select with label and validation
- [Form](../patterns/form.md) — for form submission with validation

## Develop

### Quick Start

```tsx
import { IressSelect } from '@iress-oss/ids-components';

<IressSelect
  options={[
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
  ]}
/>;
```

[View all props](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-select--docs#api-props)

### Usage

#### Single Select

Basic single-value selection from a list of options.

```tsx
<IressSelect
  options={[
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3' },
    { label: 'Option 4', value: '4' },
    { label: 'Option 5', value: '5' },
  ]}
/>;
```

#### Multi Select

Enable multiple selection with the `multi` prop. Use `limit` to cap the number of selections.

```tsx
<IressSelect
  options={[
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3' },
    { label: 'Option 4', value: '4' },
    { label: 'Option 5', value: '5' },
  ]}
  multiSelect
/>;
```

##### Limit the multi-select

Add a `multiSelectLimit` prop to restrict the number of selections visible to the user. Note: this only limits the visible selection, not disabling the ability to select more options.

```tsx
<IressSelect
  options={[
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3' },
    { label: 'Option 4', value: '4' },
    { label: 'Option 5', value: '5' },
  ]}
  multiSelect
  multiSelectLimit={2}
  defaultValue={['1', '2', '3', '4', '5']}
/>;
```

#### Async Options

Load options dynamically using the `onSearch` callback.

**Note:** When using async options inside `IressFormField`, you must store the full `{ label, value }` option object in form state (not just the primitive value). This is because `IressSelect` cannot resolve a primitive value back to a display label without re-fetching. See the [Form caveats](../patterns/form.md#storing-select-values-in-form-state) for examples.

```tsx
import {
  IressCol,
  IressField,
  IressRow,
  IressSelect,
} from '@iress-oss/ids-components';

interface StarWarsCharacter {
  name: string;
  gender: string;
}

interface StarWarsCharacterApi {
  results: StarWarsCharacter[];
}

const options = async (query: string) => {
  if (!query) return [];

  if (query === 'error') {
    throw new Error();
  }

  const data = await fetch(
    `https://swapi.py4e.com/api/people/?search=${query}`,
  ).then((response) => response.json() as Promise<StarWarsCharacterApi>);

  return data.results.map((character: StarWarsCharacter) => ({
    label: character.name,
    value: character.name,
    meta: character.gender,
  }));
};

export const SelectAsync = () => (
  <IressRow gutter="md">
    <IressCol>
      <IressField label="Single select" htmlFor="single-select">
        <IressSelect
          container={document.body}
          options={options}
          id="single-select"
        />
      </IressField>
    </IressCol>
    <IressCol>
      <IressField label="Multi-select" htmlFor="multi-select">
        <IressSelect
          container={document.body}
          options={options}
          id="multi-select"
          multiSelect
        />
      </IressField>
    </IressCol>
  </IressRow>
);
```

#### Async Options with Minimum Search Length

To avoid unnecessary API calls, use the `minSearchLength` prop to require a minimum number of characters before triggering the search.

```tsx
import {
  IressCol,
  IressField,
  IressRow,
  IressSelect,
} from '@iress-oss/ids-components';

interface StarWarsCharacter {
  name: string;
  gender: string;
}

interface StarWarsCharacterApi {
  results: StarWarsCharacter[];
}

const options = async (query: string) => {
  if (!query) return [];

  if (query === 'error') {
    throw new Error();
  }

  const data = await fetch(
    `https://swapi.py4e.com/api/people/?search=${query}`,
  ).then((response) => response.json() as Promise<StarWarsCharacterApi>);

  return data.results.map((character: StarWarsCharacter) => ({
    label: character.name,
    value: character.name,
    meta: character.gender,
  }));
};

export const SelectAsyncMinLength = () => (
  <IressRow gutter="md">
    <IressCol>
      <IressField
        label="Default behavior (1 character)"
        htmlFor="default-select"
      >
        <IressSelect
          container={document.body}
          options={options}
          id="default-select"
          placeholder="Type any character..."
        />
      </IressField>
    </IressCol>
    <IressCol>
      <IressField
        label="Search requires 3+ characters"
        htmlFor="min-length-select"
      >
        <IressSelect
          container={document.body}
          options={options}
          id="min-length-select"
          minSearchLength={3}
          placeholder="Type at least 3 characters..."
        />
      </IressField>
    </IressCol>
  </IressRow>
);
```

#### Pre-selected Value

You can set a default selected value using the `defaultValue` prop. This is useful for forms where you want to pre-fill a selection.

```tsx
<IressSelect
  options={[
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3' },
    { label: 'Option 4', value: '4' },
    { label: 'Option 5', value: '5' },
  ]}
  defaultValue="2"
/>;
```

#### Placeholder

You can provide a placeholder to guide users on what to select. The placeholder will be displayed when no option is selected.

```tsx
<IressSelect
  placeholder="Select an option"
  options={[
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3' },
    { label: 'Option 4', value: '4' },
    { label: 'Option 5', value: '5' },
  ]}
/>;
```

#### Sizing

These are the available sizes for the Select component. Use the `width` prop to adjust the size of the select input.

```tsx
import { IressSelect, IressStack } from '@iress-oss/ids-components';

const options = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3', value: '3' },
];

export function SelectSizing() {
  return (
    <IressStack gap="md">
      <IressSelect
        options={options}
        placeholder="2"
        width="2"
        aria-label="Select option (width: 2)"
      />
      <IressSelect
        options={options}
        placeholder="4"
        width="4"
        aria-label="Select option (width: 4)"
      />
      <IressSelect
        options={options}
        placeholder="6"
        width="6"
        aria-label="Select option (width: 6)"
      />
      <IressSelect
        options={options}
        placeholder="8"
        width="8"
        aria-label="Select option (width: 8)"
      />
      <IressSelect
        options={options}
        placeholder="10"
        width="10"
        aria-label="Select option (width: 10)"
      />
      <IressSelect
        options={options}
        placeholder="12"
        width="12"
        aria-label="Select option (width: 12)"
      />
      <IressSelect
        options={options}
        placeholder="16"
        width="16"
        aria-label="Select option (width: 16)"
      />
      <IressSelect
        options={options}
        placeholder="25%"
        width="25%"
        aria-label="Select option (width: 25%)"
      />
      <IressSelect
        options={options}
        placeholder="50%"
        width="50%"
        aria-label="Select option (width: 50%)"
      />
      <IressSelect
        options={options}
        placeholder="75%"
        width="75%"
        aria-label="Select option (width: 75%)"
      />
      <IressSelect
        options={options}
        placeholder="100%"
        width="100%"
        aria-label="Select option (width: 100%)"
      />
    </IressStack>
  );
}
```

#### Custom Label

The `IressSelect` component is fully customisable, allowing you to provide a custom label for the select input whilst keeping all the other functionality. Use the `renderLabel` prop to specify your own label text.

```tsx
import {
  IressSelect,
  type IressSelectProps,
  IressSelectLabel,
} from '@iress-oss/ids-components';

const CustomLabel: IressSelectProps<true>['renderLabel'] = ({ value }) => (
  <IressSelectLabel role="combobox" selected={value} />
);

export const SelectCustomLabel = () => (
  <IressSelect
    multiSelect
    options={[
      { label: 'Option 1', value: 'option-1' },
      { label: 'Option 2', value: 'option-2' },
    ]}
    placeholder="Select an item"
    renderLabel={CustomLabel}
    container={document.body}
  />
);
```

#### Custom Options

If you want to render a custom selection experience, you can use the `renderOptions` prop to provide your own option rendering logic. This allows for more complex option layouts, such as multi-level options or additional stateful metadata display using rows and columns.

```tsx
import {
  type FormattedLabelValueMeta,
  IressMenuDivider,
  IressSelect,
  type IressSelectProps,
  IressSelectMenu,
  IressSelectSearch,
  IressSelectSearchInput,
  type LabelValueMeta,
} from '@iress-oss/ids-components';

const CustomOptions: IressSelectProps<true>['renderOptions'] = ({
  loading,
  query,
  results,
  setQuery,
  handleMenuChange, // Use handleMenuChange instead of setValue to trigger onChange
  value,
}) => {
  const valueArray = Array.isArray(value) ? value : [value];
  const selected = value ? (valueArray as LabelValueMeta[]) : [];
  const simpleSelected = selected.map(
    (selectedItem: FormattedLabelValueMeta) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars -- We only need the unformatted object keys when displaying the selected value
      const { formattedLabel, ...unformatted } = selectedItem;
      return unformatted;
    },
  );
  const hasResults = !!results.length || (query && !loading);
  const hasSelected = !!selected.length;
  const hasResultsAndSelected = hasResults && hasSelected;

  return (
    <IressSelectSearch
      activator={
        <IressSelectSearchInput
          onChange={(e) => setQuery(e.currentTarget.value)}
          value={query}
          loading={loading}
          placeholder="Search and select"
        />
      }
      style={{
        maxHeight: '210px',
      }}
    >
      {hasSelected && (
        <IressSelectMenu
          heading={`Selected (${selected.length})`}
          items={simpleSelected}
          multiSelect
          // Use handleMenuChange to trigger parent onChange callback
          onChange={handleMenuChange}
          selected={value}
        />
      )}
      {hasResultsAndSelected && <IressMenuDivider my="xs" />}
      {hasResults && (
        <IressSelectMenu
          heading={query ? 'Search results' : 'All options'}
          items={results}
          multiSelect
          noResults={query ? 'No results found' : undefined}
          // Use handleMenuChange to trigger parent onChange callback
          onChange={handleMenuChange}
          selected={value}
          hideSelectedItems
        />
      )}
    </IressSelectSearch>
  );
};

export const SelectCustomOptions = () => (
  <IressSelect
    container={document.body}
    multiSelect
    options={[
      { label: 'Option 1', value: 'option-1' },
      { label: 'Option 2', value: 'option-2' },
      { label: 'Option 3', value: 'option-3' },
      { label: 'Option 4', value: 'option-4' },
      { label: 'Option 5', value: 'option-5' },
    ]}
    renderOptions={CustomOptions}
    virtualFocus={false}
  />
);
```

#### Create New Option

Allow users to create new options on the fly using the custom sub-components with `renderOptions`.

```tsx
import {
  type FormattedLabelValueMeta,
  type InputRef,
  IressMenuDivider,
  IressSelect,
  type IressSelectProps,
  IressSelectBody,
  IressSelectCreate,
  IressSelectHeading,
  IressSelectMenu,
  IressSelectSearch,
  IressSelectSearchInput,
} from '@iress-oss/ids-components';
import { toArray } from '@helpers/formatting/toArray';
import { useId, useRef } from 'react';

const FREQUENTLY_SELECTED = [
  { label: 'Frequently selected 1', value: 'freq-1' },
  { label: 'Frequently selected 2', value: 'freq-2' },
];

const OPTIONS = [
  { label: 'Option 1', value: 'option-1' },
  { label: 'Option 2', value: 'option-2' },
  { label: 'Option 3', value: 'option-3' },
  { label: 'Option 4', value: 'option-4' },
  { label: 'Option 5', value: 'option-5' },
];

const WithNewOption: IressSelectProps<true>['renderOptions'] = ({
  loading,
  debouncedQuery,
  query,
  results,
  setQuery,
  setValue,
  value,
}) => {
  const selectedArray = toArray(value);
  const simpleSelected = selectedArray.map(
    (selectedItem: FormattedLabelValueMeta) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars -- We only need the unformatted object keys when displaying the selected value
      const { formattedLabel, ...unformatted } = selectedItem;
      return unformatted;
    },
  );
  const hasResults =
    (!!results.length && results !== OPTIONS) || (debouncedQuery && !loading);
  const hasSelected = !!selectedArray.length;
  const hasResultsAndSelected = hasResults && hasSelected;
  const showFrequentlySelected =
    !hasResults &&
    !FREQUENTLY_SELECTED.every((frequent) =>
      selectedArray.some((selected) => selected.value === frequent.value),
    );
  const canCreate =
    debouncedQuery &&
    !results.some((result) => result.label === debouncedQuery) &&
    !selectedArray.some((selected) => selected.label === debouncedQuery);
  const hasFrequentlyAndOther =
    showFrequentlySelected && (hasResults || hasSelected);
  const headingId = useId();
  const inputRef = useRef<InputRef | null>(null);

  return (
    <IressSelectSearch
      activator={
        <IressSelectSearchInput
          onChange={(e) => setQuery(e.currentTarget.value)}
          value={query}
          loading={loading}
          placeholder="Search for items"
          ref={inputRef}
        />
      }
    >
      <IressSelectBody
        header={
          canCreate && (
            <IressSelectCreate
              heading="Add custom option"
              label={debouncedQuery}
              loading={loading}
              onCreate={() => {
                setValue([...selectedArray, { label: query, value: query }]);
                setQuery('');
                close();
              }}
            />
          )
        }
      >
        {hasSelected && (
          <IressSelectMenu
            aria-labelledby={headingId}
            heading={
              <IressSelectHeading
                clearAll
                onClearAll={() => {
                  setValue([]);
                  inputRef.current?.focus();
                }}
              >
                <h2 id={headingId}>Selected ({selectedArray.length})</h2>
              </IressSelectHeading>
            }
            items={simpleSelected}
            multiSelect
            onChange={setValue}
            selected={value}
          />
        )}
        {hasResultsAndSelected && <IressMenuDivider my="xs" />}
        {hasResults && (
          <IressSelectMenu
            heading="Search results"
            items={results}
            multiSelect
            noResults={debouncedQuery ? 'No results found' : undefined}
            onChange={setValue}
            selected={value}
            hideSelectedItems
          />
        )}
        {hasFrequentlyAndOther && <IressMenuDivider my="xs" />}
        {showFrequentlySelected && (
          <IressSelectMenu
            heading="Frequently selected"
            items={FREQUENTLY_SELECTED}
            multiSelect
            onChange={setValue}
            selected={value}
            hideSelectedItems
          />
        )}
      </IressSelectBody>
    </IressSelectSearch>
  );
};

export const SelectNewOption = () => (
  <IressSelect
    container={document.body}
    multiSelect
    options={OPTIONS}
    placeholder="Select an item"
    renderOptions={WithNewOption}
    virtualFocus={false}
  />
);
```

#### Header & Footer

You can add a header and footer to the options menu using the `header` and `footer` props. This is useful for adding additional context or actions related to the options list.

```tsx
<IressSelect
  options={[
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3' },
    { label: 'Option 4', value: '4' },
    { label: 'Option 5', value: '5' },
  ]}
  header={
    <>
      <IressMenuText>
        <IressText element="h3" style={{ margin: 0 }}>
          Header
        </IressText>
      </IressMenuText>
      <IressDivider style={{ marginTop: 0 }} />
    </>
  }
  footer={
    <>
      <IressDivider style={{ marginBottom: 0 }} />
      <IressMenuText>
        <IressInline gap="sm">
          <IressButton>Button 1</IressButton>
          <IressButton>Button 2</IressButton>
        </IressInline>
      </IressMenuText>
    </>
  }
/>;
```

#### Grouped Options

You can group related options together using the `children` key of each item in the `options` array. This allows for better organisation and easier scanning of options.

```tsx
<IressSelect
  placeholder="Select a food"
  options={[
    {
      label: 'Fruits',
      children: [
        { label: 'Apple', value: 'apple' },
        { label: 'Banana', value: 'banana' },
        { label: 'Orange', value: 'orange' },
        { label: 'Strawberry', value: 'strawberry' },
      ],
    },
    {
      label: 'Vegetables',
      children: [
        { label: 'Carrot', value: 'carrot' },
        { label: 'Broccoli', value: 'broccoli' },
        { label: 'Spinach', value: 'spinach' },
      ],
    },
    {
      label: 'Grains',
      children: [
        { label: 'Rice', value: 'rice' },
        { label: 'Wheat', value: 'wheat' },
        { label: 'Oats', value: 'oats' },
      ],
    },
  ]}
/>;
```

#### Native

Use the `native` prop to render a native `<select>` element on mobile devices.

```tsx
<IressSelect
  options={[
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3' },
    { label: 'Option 4', value: '4' },
    { label: 'Option 5', value: '5' },
  ]}
  native="md"
  defaultValue="2"
/>;
```

### Testing

Query the select activator by its combobox role:

```tsx
const select = screen.getByRole('combobox', { name: 'Label text' });
```

When inside a `Field`, query by label:

```tsx
const select = screen.getByLabelText('Label text');
```

For the options menu:

```tsx
const menu = screen.getByRole('listbox');
const option = screen.getByRole('option', { name: 'Option 1' });
```

[View test IDs](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-select--docs#testing)


#### Test selectors

| Part | Description | Recommended Query | Test ID |
|------|-------------|-------------------|---------|
| main | The root element of the select | `getByRole('combobox')` for the activator, or `getByLabelText('...')` when inside a Field | `select` |
| hidden input | The hidden form input | — | `select__hidden-input` |
| select | The native select element (when native mode is enabled) | — | `select__select` |
| menu group | A grouped options heading | — | `select__menu-group` |
| menu | The options dropdown (visible when open) | `getByRole('listbox')` | `select__menu` |
| menu item | An individual menu option | `getByRole('option', { name: '...' })` | `select__menu-item` |
| tag | A selected value tag (multi-select) | — | `select__tag` |

---

### Storybook

Storybook provides an interactive playground for testing different prop combinations, more complex recipes, all prop details, and accessibility attributes.

[View in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-select--docs)

## Specifications

### Behaviour

| State | Behaviour |
|-------|-----------|
| Closed | Displays selected value or placeholder |
| Open | Shows options list positioned below the activator |
| Searching | Filters options based on typed input |
| Multi-select | Selected values shown as tags; removable individually |
| Native mode | Renders a native `<select>` element |

### Accessibility

**WCAG compliance:**

- **4.1.2 Name, Role, Value** — Uses `role="combobox"` for the activator, `role="listbox"` for the menu
- **1.3.1 Info and Relationships** — Options grouped with proper heading structure
- **2.1.1 Keyboard** — Fully keyboard navigable

**ARIA roles:**

| Element | Role | Description |
|---------|------|-------------|
| Activator | `combobox` | The select trigger input |
| Menu | `listbox` | The dropdown options list |
| Option | `option` | Individual selectable items |

### Keyboard interaction

| Key | Action |
|-----|--------|
| `Enter` / `Space` | Opens the menu or selects the focused option |
| `ArrowDown` | Moves focus to the next option |
| `ArrowUp` | Moves focus to the previous option |
| `Escape` | Closes the menu |
| `Home` | Moves focus to the first option |
| `End` | Moves focus to the last option |
| Type-ahead | Jumps to the first matching option |

### Edge cases

- **No matching options**: Displays empty state message when search yields no results
- **Async loading**: Shows loading indicator while options are being fetched
- **Long option text**: Text truncates with ellipsis in the activator
- **Popover clipping**: In fixed-footer modals, the dropdown may be clipped — use non-fixed footer modals

---

### Storybook

Storybook provides an interactive playground for testing different prop combinations and viewing accessibility attributes.

[View in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-select--docs)

---

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

---

# SkipLink

> Provides a keyboard-accessible link to skip to the main content area.

## Import

```tsx
import { IressSkipLink } from '@iress-oss/ids-components';
```

- [Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-skip-link--docs)
- [Source](https://github.com/iress/design-system/tree/main/packages/components/src/components/SkipLink)
- [Report issue](https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=skip-link&title=[SkipLink]+Bug:+)
- [Request feature](https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=skip-link,enhancement&title=[SkipLink]+Feature:+)

## Props

> Required props are **bold**.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| active | `boolean` | — | Sets the active state of the button, usually used to indicate the button has activated a modal, popover or slideout. |
| append | `ReactNode` | — | Content for the append slot. |
| children | `ReactNode` | `Skip to content` | Content is placed between prepend and append if provided. Used to describe the expected action of this button. Description of where the skip link jumps to. |
| compact | `boolean` | — | Makes the button more compact by reducing padding and font size. Used for buttons with icon only or when space is limited. |
| element | `ElementType` | — | Change the component that will be rendered as the button, used for third-party libraries that require a specific element type. By default, it will render a button or an anchor tag based on the `href` prop. |
| fluid | `any` | — | If `true`, the button will stretch to fill it's container. The prop is responsive, so you can set the breakpoint(s) at which the button will be fluid.  All breakpoints: `fluid={true}` Up to a specific breakpoint: `fluid="md"` |
| href | `string` | — | Contains a URL or a URL fragment that the hyperlink points to. If this property is set, an anchor tag will be rendered. Contains a URL or a URL fragment that the skip link points to. If this property is set, an anchor tag will be rendered. |
| icon | [MaterialSymbol](https://fonts.google.com/icons?icon.set=Material+Symbols) | — | The icon to be displayed in the button. If provided, the icon will be displayed and the `children` will be used as screen reader text (although you can explicitly override this with `aria-label`) |
| loading | `boolean, string ` | — | When true, button is in loading state. If provided a string, will be used as the loading text for screen readers. |
| mode | `muted` , `primary` , `quaternary`, `secondary` , `tertiary`  | — | Style of the button. - Primary: Used for the main action on a page. Usually only used once per screen. - Secondary: Used for secondary actions on a page, often an action on multiple `IressPanel`s. Can used multiple times per screen. - Tertiary: Used for tertiary actions on a page, often the secondary action on multiple `IressPanel`s. Can used multiple times per screen. - Quaternary: Used for less prominent actions, often used for preference toggles (eg. Collapse all). - Muted: Used for less prominent actions, often used inline with headings. They are mainly used with icons only.  **Migrating to version 6** - `link` mode has been removed. If it is an action, use the `tertiary` mode. If it is a link inside a paragraph, use the new `IressLink` component instead. - `danger` has been removed. Please use the `status` prop instead. - `positive` and `success` have been removed. Please use the `status` prop instead. |
| onClick | `MouseEventHandler<Exclude<Parameters<Exclude<ButtonRef<C, THref>, undefined>>[0], null>>` | — | Emitted when the menu item is clicked. |
| prepend | `ReactNode` | — | Content for the prepend slot. |
| noWrap | `boolean` | — | Prevents text wrapping if set to true. |
| status | `danger` , `success` | — | An optional status to assign to the button. - `success`: Indicates a successful or positive action. - `danger`: Indicates a dangerous or potentially negative action. |
| data-testid | `string` | — | The data-testid attribute is used to target elements in automated tests if no identifier is available. In some components it is propagated to child elements.  Notes: - Please use this prop sparingly and only when no other identifier is available, as per the guiding principles of Testing Library. - Only use this prop for your tests @see https://testing-library.com/docs/queries/bytestid |
| value | `[FormControlValue](../../dist/types.d.ts)` | — | The value of the button, when used in `IressButtonGroup`. |

📄 [Full type definition](../../dist/components/SkipLink/SkipLink.d.ts)

Also accepts all [styling props](../styling-props/overview.md) ([type definition](../../dist/interfaces.d.ts), [token values](../tokens/tokens-reference.md)).

The skip link component allows keyboard users to quickly bypass the top-level navigation links and jump to the main content on a page.

```tsx
<IressContainer py="xl">
  <IressSkipLink href="#main" id="skip-link" />
  <main id="main" tabIndex={-1}>
    <IressPanel>
      <p>
        This is where the main content <code>id=&quot;main&quot;</code> of the
        application is located. It is important that whatever your skip link is
        targeting is <strong>focusable</strong>. If its a non-interactive
        element, this can be done by adding <code>tabindex=&quot;-1&quot;</code>{' '}
        to the element.
      </p>

      <p>
        The skip link is{' '}
        <a
          href="#skip-link"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById('skip-link')?.focus();
          }}
        >
          hidden until it is focused
        </a>
        .
      </p>
    </IressPanel>
  </main>
</IressContainer>;
```

## Design

### When to use

- **Every page**: Include a skip link at the top of every page with navigation
- **Keyboard accessibility**: Essential for users who navigate by keyboard or screen reader

### When not to use

- **Pages without navigation** — skip links are unnecessary when there's no content to bypass

### Related patterns

- [Provider](../components/provider.md) — sets up the app-level wrapper where skip links are typically placed

## Develop

### Quick Start

```tsx
import { IressSkipLink } from '@iress-oss/ids-components';

<IressSkipLink href="#main" />;
```

[View all props](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-skiplink--docs#api-props)

### Usage

The skip link component is visually hidden until it is tabbed to. When focused, it appears and allows the user to jump to the target element.

### Testing

Query the skip link by its role. When `href` is provided it renders as a link,
otherwise as a button:

```tsx
const skipLink = screen.getByRole('link', { name: 'Skip to content' });
```


#### Test selectors

| Part | Description | Recommended Query | Test ID |
|------|-------------|-------------------|---------|
| main | The root element of the skip link | `getByRole('link', { name: 'Skip to content' })` | `skip-link` |

---

### Storybook

[View in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-skiplink--docs)

## Specifications

### Behaviour

| State | Behaviour |
|-------|-----------|
| Default | Visually hidden, positioned off-screen |
| Focused | Becomes visible at the top of the page |
| Activated | Moves focus to the target element (`href`) |

### Accessibility

- **WCAG 2.4.1 Bypass Blocks** — provides a mechanism to skip repeated navigation
- Renders as `<a>` (with `href`) or `<button>` (without `href`)
- Visually hidden until focused via keyboard

### Keyboard interaction

| Key | Action |
|-----|--------|
| `Tab` | Reveals the skip link when it receives focus |
| `Enter` | Activates the skip link and moves focus to the target |

---

# Slideout

> Displays supplementary content in a panel that slides in from the edge of the viewport.

## Import

```tsx
import { IressSlideout } from '@iress-oss/ids-components';
```

- [Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-slideout--docs)
- [Source](https://github.com/iress/design-system/tree/main/packages/components/src/components/Slideout)
- [Report issue](https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=slideout&title=[Slideout]+Bug:+)
- [Request feature](https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=slideout,enhancement&title=[Slideout]+Feature:+)

## Props

> Required props are **bold**.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | `ReactNode` | — | Content to be displayed within the slideout. |
| closeText | `string` | `Close` | Screenreader text for close button. |
| container | `[FloatingUIContainer](../../dist/types.d.ts)` | — | The container element to render the slideout into. By default, the slideout will render at the end of the document body. |
| defaultShow | `boolean` | `false` | When set to `true` the slideout will be visible. Use for uncontrolled slideouts. |
| eleToPush | `string , HTMLElement , MutableRefObject<HTMLElement | null>` | — | The element that needs to be pushed relative to the slideout. This can be a string selector to match an existing element in the DOM, a html element, or a React reference. Will be ignored if `mode` is not set to `push` or if element does not exist. |
| footer | `ReactNode` | — | Panel to place slideout controls. |
| heading | `ReactElement>, string ` | — | Sets the heading for the slideout. If passed an element, it will render the element with an id, to ensure its connection to the slideout. |
| id | `string` | — | Unique ID for the slideout. Use if you would like to open this slideout from anywhere in your app using the `useSlideout` hook. |
| mode | `overlay`, `push`  | `overlay` | Sets how the Slideout interacts with the content of the page. `overlay` overlays the page content, obscuring the content below. `push` will push the element (specified by `eleToPush`) across the page. `push` will revert back to `overlay` if `eleToPush` is not specified or if the screen size < 1200px. |
| onShowChange | `((show: boolean, reason?: OpenChangeReason) => void)` | — | Emitted when the slideout has opened or closed internally. Use for controlled slideouts. |
| onStatus | ((status: `close` , `initial` , `open` , `unmounted`) => void) | — | Emitted when the slideout has mounted, unmounted, opened or closed. Open and close occur before animation begins. |
| onEntered | `(() => void)` | — | Emitted when the slideout has opened. |
| onExited | `(() => void)` | — | Emitted when the slideout has closed. |
| position | `left` , `right` | `right` | Position of the slideout relative to the page. `left` or `right`. |
| show | `boolean` | — | When set to `true` the slideout will be visible. Use for controlled slideouts. |
| size | `md`, `sm`  | `sm` | Accepts a single `SlideoutSize`. Slideouts will display at 100% for mobile screens (<576px). |
| data-testid | `string` | — | The data-testid attribute is used to target elements in automated tests if no identifier is available. In some components it is propagated to child elements.  Notes: - Please use this prop sparingly and only when no other identifier is available, as per the guiding principles of Testing Library. - Only use this prop for your tests @see https://testing-library.com/docs/queries/bytestid |

📄 [Full type definition](../../dist/components/Slideout/Slideout.d.ts)

Also accepts all [styling props](../styling-props/overview.md) ([type definition](../../dist/interfaces.d.ts), [token values](../tokens/tokens-reference.md)).

Slideouts are used to show additional information or to allow users to perform secondary tasks without leaving their normal workflow.

```tsx
import { IressButton, IressSlideout } from '@iress-oss/ids-components';
import { useState } from 'react';

export function SlideoutUsingState() {
  const [show, setShow] = useState(false);

  return (
    <>
      <IressButton onClick={() => setShow(true)}>
        Show slideout using state
      </IressButton>
      <IressSlideout
        show={show}
        onShowChange={setShow}
        heading="Slideout"
        footer={<IressButton onClick={() => setShow(false)}>Close</IressButton>}
      >
        This slideout was opened via state
      </IressSlideout>
    </>
  );
}
```

## Design

### When to use

- **Secondary tasks**: Editing details, viewing records, or completing sub-workflows alongside the main page
- **Supplemental information**: Showing additional context without navigating away
- **Multi-step flows**: Guided processes that don't warrant a full page change
- **Settings or filters**: Configuring options that apply to the current view

### When not to use

- **Blocking decisions** that require full attention — use a [Modal](../components/modal.md) instead
- **Brief status messages** — use [Alert](../components/alert.md) or [Toaster](../components/toaster.md)
- **Primary navigation** — use standard page routing

#### Use a page instead of a slideout when:

- **The content is the primary task** — if the user's entire focus shifts to the slideout, it should be a page
- **The user doesn't need to see the underlying page** — slideouts are for tasks where the parent context is useful; if not, a page is simpler
- **The form has many fields or complex validation** — large forms are harder to use in a narrow panel
- **The content needs a permalink** — slideouts don't have URLs; use a page for bookmarkable/shareable content
- **Mobile experience is critical** — slideouts on small screens overlay the full viewport anyway, making them effectively a page but with worse navigation

### Do's and Don'ts

| ✅ Do | ❌ Don't |
|-------|----------|
| Use overlay mode when space is at a premium | Use slideouts for brief confirmations |
| Use push mode when users need to see page content alongside | Nest multiple slideouts |
| Provide a clear heading describing the slideout's purpose | Open a slideout from within another slideout |
| Include a close button and/or cancel action in the footer | Use slideouts for content that should be a separate page |

### Content guidelines

- **Heading**: Use sentence case, describe the task (e.g. "Edit profile", "Filter results")
- **Body**: Keep focused on a single task or information set
- **Footer**: Place primary action on the right, cancel/close on the left
- **Size**: Use `sm` for simple content, `md` for forms or detailed information

### Related patterns

- [Modal](../components/modal.md) — for blocking decisions requiring full attention
- [Popover](../components/popover.md) — for small contextual overlays
- [Feedback](../patterns/feedback.md) — decision tree for choosing the right feedback component

## Develop

### Quick Start

```tsx
import { IressSlideout } from '@iress-oss/ids-components';

<IressSlideout footer="Footer slot">Slideout content</IressSlideout>;
```

[View all props](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-slideout--docs#api-props)

### Usage

#### Using the `show` property

Control the slideout with state via `show` and `onShowChange`.

```tsx
import { IressButton, IressSlideout } from '@iress-oss/ids-components';
import { useState } from 'react';

export function SlideoutUsingState() {
  const [show, setShow] = useState(false);

  return (
    <>
      <IressButton onClick={() => setShow(true)}>
        Show slideout using state
      </IressButton>
      <IressSlideout
        show={show}
        onShowChange={setShow}
        heading="Slideout"
        footer={<IressButton onClick={() => setShow(false)}>Close</IressButton>}
      >
        This slideout was opened via state
      </IressSlideout>
    </>
  );
}
```

#### Using the `IressSlideoutProvider`

Use `IressSlideoutProvider` to open/close slideouts from anywhere via a unique `id` and the `useSlideout` hook.

> **Note:** If using `IressProvider` or `IressShadow`, the slideout provider is already included.

```tsx
import {
  IressButton,
  IressSlideout,
  type IressSlideoutProps,
  IressSlideoutProvider,
  useSlideout,
} from '@iress-oss/ids-components';

const SLIDEOUT_ID = 'storybook-slideout';

export function AppWithSlideoutProvider(
  props: Partial<IressSlideoutProps> = {},
) {
  return (
    <IressSlideoutProvider>
      <SlideoutWithTrigger {...props} />
    </IressSlideoutProvider>
  );
}

function SlideoutWithTrigger({
  id = SLIDEOUT_ID,
  ...slideoutProps
}: Partial<IressSlideoutProps>) {
  const { showSlideout } = useSlideout();

  return (
    <>
      <IressButton onClick={() => showSlideout(id)}>
        Show slideout using provider
      </IressButton>
      <IressSlideout
        id={id}
        heading="Provider slideout"
        footer={
          <IressButton onClick={() => showSlideout(id, false)}>
            Close slideout
          </IressButton>
        }
        {...slideoutProps}
      >
        This slideout was opened via IressSlideoutProvider and the useSlideout
        hook.
      </IressSlideout>
    </>
  );
}
```

#### Modes

Slideouts support `overlay` (default, sits on top of content) and `push` (pushes page content aside).

```tsx
import {
  IressButton,
  IressInline,
  IressSlideout,
  IressSlideoutProvider,
  IressText,
  useSlideout,
} from '@iress-oss/ids-components';

function SlideoutModeExample() {
  const { showSlideout } = useSlideout();

  return (
    <IressInline gap="md">
      <IressButton onClick={() => showSlideout('overlay-example')}>
        Overlay slideout
      </IressButton>
      <IressSlideout id="overlay-example" heading="Overlay mode" mode="overlay">
        <IressText>
          The default mode. The slideout sits on top of page content.
        </IressText>
      </IressSlideout>

      <IressButton onClick={() => showSlideout('push-example')}>
        Push slideout
      </IressButton>
      <IressSlideout
        id="push-example"
        heading="Push mode"
        mode="push"
        eleToPush="#storybook-docs, html"
      >
        <IressText>
          Pushes page content aside. Requires the `eleToPush` prop with the ID
          of the element to push. Falls back to overlay on smaller screens.
        </IressText>
      </IressSlideout>
    </IressInline>
  );
}

export function SlideoutModes() {
  return (
    <IressSlideoutProvider>
      <SlideoutModeExample />
    </IressSlideoutProvider>
  );
}
```

#### Position

Use the `position` prop to slide in from `left` or `right` (default).

```tsx
import {
  IressButton,
  IressInline,
  IressSlideout,
  IressSlideoutProvider,
  useSlideout,
} from '@iress-oss/ids-components';

const Slideouts = () => {
  const { showSlideout } = useSlideout();

  return (
    <IressInline gap="md" horizontalAlign="between">
      <IressButton onClick={() => showSlideout('right')}>right</IressButton>
      <IressSlideout id="right" position="right">
        Slideout opened on the right
      </IressSlideout>
      <IressButton onClick={() => showSlideout('left')}>left</IressButton>
      <IressSlideout id="left" position="left">
        Slideout opened on the left
      </IressSlideout>
    </IressInline>
  );
};

export function SlideoutPositions() {
  return (
    <IressSlideoutProvider>
      <Slideouts />
    </IressSlideoutProvider>
  );
}
```

#### Size

The `size` prop sets the width: `sm` (default) or `md`.

```tsx
import {
  IressButton,
  IressInline,
  IressSlideout,
  IressSlideoutProvider,
  useSlideout,
} from '@iress-oss/ids-components';

const Slideouts = () => {
  const { showSlideout } = useSlideout();

  return (
    <IressInline gap="spacing.4">
      <IressButton onClick={() => showSlideout('sm')}>sm</IressButton>
      <IressSlideout id="sm" size="sm">
        Small slideout
      </IressSlideout>
      <IressButton onClick={() => showSlideout('md')}>md</IressButton>
      <IressSlideout id="md" size="md">
        Medium slideout
      </IressSlideout>
    </IressInline>
  );
};

export function SlideoutSizes() {
  return (
    <IressSlideoutProvider>
      <Slideouts />
    </IressSlideoutProvider>
  );
}
```

#### Footer

The `footer` prop adds content below the main content, typically buttons.

```tsx
import {
  IressButton,
  IressInline,
  IressSlideout,
  useSlideout,
} from '@iress-oss/ids-components';

const SLIDEOUT_ID = 'slideout-footer';

export function SlideoutWithFooter() {
  const { showSlideout } = useSlideout();

  return (
    <>
      <IressButton onClick={() => showSlideout(SLIDEOUT_ID)}>
        Open slideout with footer
      </IressButton>
      <IressSlideout
        id={SLIDEOUT_ID}
        heading="Slideout with footer"
        footer={
          <IressInline gap="sm">
            <IressButton mode="primary">Save</IressButton>
            <IressButton onClick={() => showSlideout(SLIDEOUT_ID, false)}>
              Cancel
            </IressButton>
          </IressInline>
        }
      >
        The footer stays fixed at the bottom of the slideout.
      </IressSlideout>
    </>
  );
}
```

#### Absolute position slideouts

Set `position: 'absolute'` in inline style to appear from the edge of a relative container instead of the browser window. Use the `container` prop to reference the container.

```tsx
import {
  IressStack,
  IressButton,
  IressText,
  IressSlideout,
} from '@iress-oss/ids-components';
import { useRef, useState } from 'react';
import { cssVars } from '@iress-oss/ids-tokens';

export function AbsolutePositionSlideout() {
  const [show, setShow] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  return (
    <IressStack gap="md">
      <IressButton onClick={() => setShow(true)}>Show slideout</IressButton>
      <div
        ref={containerRef}
        style={{
          height: '300px',
          border: `1px solid ${cssVars.colour.neutral[30]}`,
          padding: '1rem',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <IressText id="contents">
          <h3>Absolute slideout</h3>
          <p>
            Almost before was mighty present had him time. But scorching counsel
            if mine dote men have or, one yet from pangs and for and despair
            there. If below nor but the name these deemed oh..
          </p>
        </IressText>
        <IressSlideout
          container={containerRef}
          show={show}
          onShowChange={setShow}
          eleToPush="#contents"
          position="left"
          mode="push"
          heading="Absolute slideout"
          style={{
            position: 'absolute',
          }}
        >
          Slideout content
        </IressSlideout>
      </div>
    </IressStack>
  );
}
```

### Testing

Query the slideout by its role:

```tsx
await user.click(screen.getByRole('button', { name: 'Open slideout' }));
const slideout = screen.findByRole('dialog', { name: 'Slideout heading' });

await user.click(screen.getByRole('button', { name: 'Close slideout' }));
await waitForElementToBeRemoved(slideout);
```

**Gotchas:**

- **Conditional rendering**: Use `findByRole` (async) — content isn't in the DOM until shown
- **Animation timing**: Animations can affect test timing — disable in test environments if needed

[View test IDs](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-slideout--docs#testing)


#### Test selectors

| Part | Description | Recommended Query | Test ID |
|------|-------------|-------------------|---------|
| main | The root element of the slideout | `findByRole('dialog')` by default, or `findByRole('complementary')` if role is set to "complementary" | `slideout` |
| heading | The slideout heading | `getByRole('heading', { name: '...' })` | `slideout__heading` |
| close button | The close button | `findByRole('button', { name: 'Close' })` | `slideout__close-button__button` |
| content | The slideout content area | — | `slideout__content` |
| footer | The slideout footer | `getByText('...')` | `slideout__footer` |

---

### Storybook

Storybook provides an interactive playground for testing different prop combinations, more complex recipes, all prop details, and accessibility attributes.

[View in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-slideout--docs)

## Specifications

### Behaviour

| State | Behaviour |
|-------|-----------|
| Default | Slideout is hidden until `show` is `true` or opened via `useSlideout` |
| Overlay mode | Slides over page content with a backdrop |
| Push mode | Pushes page content aside, all content remains visible |
| Dismissed | Clicking close button, pressing Escape, or clicking backdrop closes it |
| Absolute position | Positioned relative to nearest relative container instead of viewport |

### Accessibility

**WCAG compliance:**

- **2.1.2 No Keyboard Trap** — Focus is trapped within slideout but can be dismissed via Escape
- **4.1.2 Name, Role, Value** — Uses `role="dialog"` with `aria-labelledby` pointing to heading
- **2.4.3 Focus Order** — Focus moves into slideout on open, returns to trigger on close

**ARIA roles:**

| Element | Role | Description |
|---------|------|-------------|
| Slideout container | `dialog` | Identifies the slideout as a dialog |
| Heading | referenced via `aria-labelledby` | Provides accessible name |

### Keyboard interaction

| Key | Action |
|-----|--------|
| `Escape` | Closes the slideout |
| `Tab` | Moves focus to next focusable element within the slideout |
| `Shift+Tab` | Moves focus to previous focusable element within the slideout |
| `Enter` / `Space` | Activates focused button |

### Edge cases

- **Conditional rendering**: Slideout content not in DOM until shown — use async queries in tests
- **Animation timing**: Animations can interfere with test assertions — disable in test environments
- **Push mode on small screens**: Ensure page content remains usable when pushed aside
- **Focus restore**: Focus returns to trigger element when slideout closes

---

### Storybook

Storybook provides an interactive playground for testing different prop combinations and viewing accessibility attributes.

[View in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-slideout--docs)

## Recipes

### Microfrontend

```tsx
import {
  createElement,
  type ElementType,
  Fragment,
  useRef,
  useState,
} from 'react';
import { createRoot, type Root } from 'react-dom/client';
import IDS_CSS from '@iress-oss/ids-components/dist/style.css?raw';
import {
  IressButton,
  IressForm,
  IressFormField,
  IressIcon,
  IressInline,
  IressPanel,
  IressSelect,
  IressSlideout,
  IressSlideoutProvider,
  IressStack,
  IressText,
  IressToggle,
} from '@iress-oss/ids-components';
import { searchStarWarsCharacters } from '@/mocks/starWars';

/**
 * This section creates a custom element that can be used in a microfrontend context.
 * It is copied from the Frontrunner scaffolder, please use that instead.
 */
interface AppStyleProp {
  uri?: string;
  styleContent?: string;
  importType?: 'link' | 'style';
}

class IressCustomElement extends HTMLElement {
  protected AppContent: ElementType;
  private rootId = '';
  private appCssUrls: AppStyleProp[];

  private appRootElement: HTMLElement | null = null;
  private reactRoot: Root | null = null;

  // Static property to hold shared styles
  static readonly sharedStyles: HTMLStyleElement[] = [];

  // Instance property to hold styles specific to this instance
  private instanceStyles: HTMLStyleElement[] = [];

  constructor() {
    super();
    this.AppContent = () => <Fragment />;
    this.appCssUrls = [];
    this.attachShadow({ mode: 'open' });
  }

  /**
   * Define the React component and associated CSS URLs.
   * @param AppContent - The React component to render.
   * @param id - The id of the element where the React root will be attached
   * @param appCssUrls - Array of CSS configurations.
   */
  defineElement(
    AppContent: ElementType,
    rootId: string,
    appCssUrls?: AppStyleProp[],
  ) {
    this.AppContent = AppContent;
    this.rootId = rootId;
    this.appCssUrls = appCssUrls ?? [];
    void this.loadStyles();
  }

  /**
   * Lifecycle method called when the element is added to the DOM.
   */
  connectedCallback() {
    this.renderComponent();
  }

  /**
   * Lifecycle method called when the element is removed from the DOM.
   */
  disconnectedCallback() {
    if (this.reactRoot && this.appRootElement) {
      this.reactRoot.unmount();
    }
  }

  /**
   * Load and inject remote and local CSS into the Shadow DOM.
   */
  private async loadStyles(): Promise<void> {
    try {
      const styles = [
        ...this.appCssUrls.map((style) =>
          style.uri
            ? this.createLinkElement(style.uri)
            : this.createStyleElement(style.styleContent ?? ''),
        ),
      ];

      for (const style of styles) {
        await this.injectStyle(style);
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      console.error(`Error loading styles: ${errorMessage}`);
    }
  }

  importCssFile(url: string): AppStyleProp {
    return {
      uri: new URL(url, import.meta.url).href,
      importType: 'link',
    };
  }

  importCssStyle(styleContent: string): AppStyleProp {
    return {
      styleContent,
      importType: 'style',
    };
  }

  /**
   * Create a link element for external CSS.
   * @param href - The URL of the CSS file.
   * @returns The created HTMLLinkElement.
   */
  private createLinkElement(href: string): HTMLLinkElement {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    return link;
  }

  /**
   * Create a style element for inline CSS.
   * @param cssContent - The CSS content.
   * @returns The created HTMLStyleElement.
   */
  private createStyleElement(cssContent: string): HTMLStyleElement {
    const style = document.createElement('style');
    style.textContent = cssContent;
    return style;
  }

  /**
   * Inject a style element into the Shadow DOM.
   * @param style - The style element to inject.
   */
  private async injectStyle(
    style: HTMLLinkElement | HTMLStyleElement,
  ): Promise<void> {
    if (style.tagName.toLowerCase() === 'link') {
      // Wait for the stylesheet to load
      await new Promise<void>((resolve, reject) => {
        style.onload = () => resolve();
        style.onerror = () =>
          reject(
            new Error(`Failed to load CSS: ${style.getAttribute('href')}`),
          );
        this.shadowRoot?.appendChild(style);
      });
    } else {
      this.shadowRoot?.appendChild(style);
    }

    // Manage shared and instance-specific styles
    if (!IressCustomElement.sharedStyles.includes(style)) {
      IressCustomElement.sharedStyles.push(style);
      this.instanceStyles.push(style);
    }
  }

  /**
   * Attach the Shadow DOM and render the React application.
   */
  private renderComponent() {
    this.appRootElement = document.createElement('div');
    this.appRootElement.setAttribute('id', this.rootId);
    this.shadowRoot?.appendChild(this.appRootElement);
    this.renderReactApp();
  }

  /**
   * Render the React application within the Shadow DOM.
   */
  private renderReactApp() {
    const props = {
      ...this.getProps(this.attributes),
    };

    if (this.appRootElement) {
      this.reactRoot = createRoot(this.appRootElement);
      this.reactRoot.render(<this.AppContent {...props} />);
    }
  }

  /**
   * Extract props from the element's attributes.
   * @param attributes - The attributes of the custom element.
   * @returns An object containing the props.
   */
  private getProps(attributes: NamedNodeMap): Record<string, string> {
    return Array.from(attributes)
      .filter((attr) => attr.name !== 'style')
      .reduce(
        (props, attr) => {
          const propName = attr.name.replace(/-([a-z])/g, (_, char: string) =>
            char.toUpperCase(),
          );
          props[propName] = attr.value;
          return props;
        },
        {} as Record<string, string>,
      );
  }
}

class MicrofrontendElement extends IressCustomElement {
  constructor() {
    super();
    this.defineElement(MicrofrontendApp, 'microfrontend-app', [
      this.importCssStyle(IDS_CSS),
    ]);
  }
}

/**
 * This creates a parent custom element that has no style, essentially mocking
 * a situation where the the microfrontend is rendered inside a parent application without IDS loaded.
 */
class ParentElement extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open' });

    const wrapper = document.createElement('div');
    wrapper.setAttribute('id', 'parent-app');
    wrapper.style.backgroundColor = 'lightgrey';
    wrapper.style.padding = '20px';

    const microfrontend = document.createElement('iress-microfrontend');

    shadow.appendChild(wrapper);
    wrapper.appendChild(microfrontend);
  }
}

class GrandparentElement extends IressCustomElement {
  constructor() {
    super();
    this.defineElement(GrandparentApp, 'grandparent-app', [
      this.importCssStyle(IDS_CSS),
    ]);
  }
}

if (!customElements.get('iress-microfrontend')) {
  customElements.define('iress-microfrontend', MicrofrontendElement);
  customElements.define('iress-parent', ParentElement);
  customElements.define('iress-grandparent', GrandparentElement);
}

/**
 * Actual application component that will be rendered inside the custom element.
 */
const MicrofrontendApp = () => {
  return (
    <IressPanel>
      <h3>Microfrontend form</h3>
      <p>
        This form is inside a microfrontend what is another microfrontend's
        slideout.
      </p>
      <IressForm>
        <IressStack gap="md">
          <IressFormField
            hint="Type to copy an existing character's name"
            label="Asynchronous options"
            name="star_wars_name"
            render={(controlledProps) => (
              <IressSelect
                {...controlledProps}
                options={searchStarWarsCharacters}
              />
            )}
          />

          <IressFormField
            label="Static options"
            name="gender"
            render={(controlledProps) => (
              <IressSelect
                {...controlledProps}
                options={[
                  {
                    label: 'Male',
                    value: 'male',
                    prepend: <IressIcon name="male" />,
                  },
                  {
                    label: 'Female',
                    value: 'female',
                    prepend: <IressIcon name="female" />,
                  },
                  {
                    label: 'Other',
                    value: 'other',
                    prepend: <IressIcon name="agender" />,
                  },
                ]}
              />
            )}
          />

          <IressButton mode="primary" type="submit">
            Sign up
          </IressButton>
        </IressStack>
      </IressForm>
    </IressPanel>
  );
};

/**
 * Grandparent that has the slideout
 */
const GrandparentApp = () => {
  const [show, setShow] = useState(true);
  const [md, setMd] = useState(false);
  const container = useRef<HTMLDivElement | null>(null);

  return (
    <IressSlideoutProvider container={container}>
      <div ref={container} />
      <IressPanel className="iress-m--lg">
        <IressInline gap="sm" verticalAlign="middle">
          <IressButton onClick={() => setShow(!show)}>
            Toggle Slideout
          </IressButton>
          <IressToggle onChange={setMd}>Medium size</IressToggle>
        </IressInline>
      </IressPanel>
      <IressSlideout
        show={show}
        onShowChange={setShow}
        eleToPush="#grandparent-app"
        mode="push"
        size={md ? 'md' : 'sm'}
      >
        <IressText>
          <h2>Microfrontend slideout</h2>
          <p>
            This is a slideout that is inside a microfrontend, and its contents
            are another microfrontend.
          </p>
        </IressText>
        {createElement('iress-parent')}
      </IressSlideout>
    </IressSlideoutProvider>
  );
};

export function SlideoutMicrofrontend() {
  // To avoid typescript issues, we have done it this way
  // But in your html it should be used as `<iress-microfrontend></iress-microfrontend>`
  return createElement('iress-grandparent');
}
```


---

# Slider

> Allows users to select a value from a range by dragging a handle.

## Import

```tsx
import { IressSlider } from '@iress-oss/ids-components';
```

- [Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-slider--docs)
- [Source](https://github.com/iress/design-system/tree/main/packages/components/src/components/Slider)
- [Report issue](https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=slider&title=[Slider]+Bug:+)
- [Request feature](https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=slider,enhancement&title=[Slider]+Feature:+)

## Props

> Required props are **bold**.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| defaultValue | `number` | — | Initial value of the slider. Used for uncontrolled sliders. |
| formatValue | `((value: number, tick?: SliderTickLabelValue, readOnly?: [FormControlReadOnly](../../dist/types.d.ts)) => ReactNode) | undefined` | — | Format the changed value. |
| hiddenValueTooltip | `boolean` | — | If `true`, the value tooltip will be hidden. |
| max | `number` | `10` | Set the maximum value for the slider. |
| min | `number` | `0` | Sets minimum value for the slider. |
| name | `string` | — | The name of the control, which is submitted with the form data. |
| onChange | `((e: ChangeEvent<HTMLInputElement, Element>, value?: number) => void)` | — | Emitted when the slider value changes. |
| readOnly | `[FormControlReadOnly](../../dist/types.d.ts)` | — | If `true`, the user cannot modify the value. |
| step | `number` | `1` | Sets the step value of the slider. |
| tickLabels | `boolean , SliderTickLabel[]` | — | List of labels to be displayed. |
| value | `number` | — | Value of the slider. Used for controlled sliders. |
| data-testid | `string` | — | The data-testid attribute is used to target elements in automated tests if no identifier is available. In some components it is propagated to child elements.  Notes: - Please use this prop sparingly and only when no other identifier is available, as per the guiding principles of Testing Library. - Only use this prop for your tests @see https://testing-library.com/docs/queries/bytestid |

📄 [Full type definition](../../dist/components/Slider/Slider.d.ts)

Also accepts all [styling props](../styling-props/overview.md) ([type definition](../../dist/interfaces.d.ts), [token values](../tokens/tokens-reference.md)).

Sliders provide a visual indication of adjustable content, where the user can select a value from a range usually represented on a horizontal track.

```tsx
<IressSlider defaultValue={3} />;
```

## Design

### When to use

- **Numeric ranges**: Allow users to select a value within a defined range (e.g. volume, price)
- **Visual feedback**: When users benefit from seeing their position within a range
- **Approximate values**: When an exact number is less important than a relative position

### When not to use

- **Exact numeric entry** — use an Input with type `number`
- **Very large ranges** — a slider with hundreds of steps is hard to control precisely
- **Non-numeric values** — use a Select or Radio group

### Do's and Don'ts

| ✅ Do | ❌ Don't |
|-------|----------|
| Use tick labels for key values | Use a slider without any indication of the range |
| Set meaningful `min`, `max`, and `step` | Use very large step counts that make precise selection difficult |
| Provide a label via `IressField` | Use a slider without an accessible label |
| Use `formatValue` for custom display | Rely solely on the tooltip for value communication |

### Content guidelines

- **Labels**: Always pair with a Field or label that describes what the slider controls
- **Tick labels**: Use short values; hide less important labels on small screens with `srOnly`

### Related patterns

- [Field](../components/field.md) — wraps the slider with a label, hint, and error support
- [Input](../components/input.md) — for precise numeric entry

## Develop

### Quick Start

```tsx
import { IressSlider } from '@iress-oss/ids-components';

<IressSlider min={0} max={100} defaultValue={50} />;
```

[View all props](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-slider--docs#api-props)

### Usage

#### Default value

Set the initial value with `defaultValue`. Use `value` + `onChange` for controlled state.

```tsx
<IressSlider defaultValue={3} />;
```

#### Min, max and step

Configure the selectable range and increment size.

```tsx
<IressSlider min={10} max={100} step={10} />;
```

#### Ticks and labels

Use `tickLabels` to display value markers along the track. Pass an array of numbers, `TickLabel` objects, or `true` to auto-infer from min/max/step.

```tsx
<IressSlider
  min={0}
  max={200}
  step={20}
  tickLabels={[
    { value: 0, label: 'Zero' },
    { value: 20 },
    { value: 40 },
    { value: 60 },
    { value: 80 },
    { value: 100 },
    { value: 120 },
    { value: 140 },
    { value: 160 },
    { value: 180 },
    { value: 200, label: 'All' },
  ]}
/>;
```

#### Flexible ticks and labels

`min`, `max` and `step` are no longer automatically inferred from `tickLabels`. Use `formatValue` for custom tooltip display.

```tsx
<IressSlider
  min={-10}
  max={50}
  formatValue={(value) => `${value}°C`}
  tickLabels={[
    {
      value: 0,
      label: (
        <>
          0°C <br />
          Hypothermia
        </>
      ),
    },
    {
      value: 37,
      label: (
        <>
          37°C <br />
          Normal
        </>
      ),
    },
    {
      value: 45,
      label: (
        <>
          45°C <br />
          Wicked witch
          <br />
          of the west
        </>
      ),
    },
  ]}
/>;
```

#### Hidden labels

Use the `srOnly` property in `TickLabel` objects to hide labels on specific breakpoints while keeping them accessible.

```tsx
<IressSlider
  min={0}
  max={200}
  step={20}
  tickLabels={[
    { value: 0, label: 'Zero' },
    { value: 20, srOnly: { base: true, xl: false } },
    { value: 40, srOnly: { base: true, xl: false } },
    { value: 60, srOnly: { base: true, xl: false } },
    { value: 80, srOnly: { base: true, xl: false } },
    { value: 100 },
    { value: 120, srOnly: { base: true, xl: false } },
    { value: 140, srOnly: { base: true, xl: false } },
    { value: 160, srOnly: { base: true, xl: false } },
    { value: 180, srOnly: { base: true, xl: false } },
    { value: 200, label: 'All' },
  ]}
/>;
```

#### Read only

Use the `readOnly` prop to render the slider as read-only with a displayed value.

```tsx
<IressSlider
  min={0}
  max={200}
  step={20}
  value={0}
  readOnly
  tickLabels={[
    { value: 0, label: 'Zero' },
    { value: 200, label: 'All' },
  ]}
/>;
```

### Testing

Query the slider by its role:

```tsx
const slider = screen.getByRole('slider', { name: 'Volume' });
```

**Note:** `userEvent` does not work with range inputs. Use `fireEvent.change`:

```tsx
import { fireEvent } from '@testing-library/react';
fireEvent.change(screen.getByRole('slider'), { target: { value: '5' } });
```

[View test IDs](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-slider--docs#testing)


#### Test selectors

| Part | Description | Recommended Query | Test ID |
|------|-------------|-------------------|---------|
| main | The root element of the slider | — | `slider` |
| slider | The range input element | `getByRole('slider')` | `slider__slider` |
| datalist | The tick marks datalist | — | `slider__datalist` |
| option | An individual tick mark option | — | `slider__datalist__option` |

---

### Storybook

[View in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-slider--docs)

## Specifications

### Behaviour

| State | Behaviour |
|-------|-----------|
| Default | Slider shows at `defaultValue` or `min` position |
| Dragging | Thumb follows pointer; value updates in real time |
| Controlled | Value driven by `value` prop and `onChange` |
| Read only | Renders value as plain text; slider role removed |
| Step constraint | Thumb snaps to nearest valid step value |

### Accessibility

**WCAG compliance:**

- **4.1.2 Name, Role, Value** — Uses `role="slider"` with `aria-valuemin`, `aria-valuemax`, `aria-valuenow`
- **2.1.1 Keyboard** — Fully operable via keyboard
- **1.3.1 Info and Relationships** — Label associated via `aria-labelledby` or wrapping Field

**Keyboard interaction:**

| Key | Action |
|-----|--------|
| `Arrow Right` / `Arrow Up` | Increase value by one step |
| `Arrow Left` / `Arrow Down` | Decrease value by one step |
| `Home` | Set to minimum value |
| `End` | Set to maximum value |
| `Page Up` | Increase by a larger step (10× step or 10% of range) |
| `Page Down` | Decrease by a larger step |

### Edge cases

- **readOnly removes slider role**: Query by text content instead of role when read-only
- **Tick labels with `srOnly`**: Labels are always available to screen readers regardless of visibility
- **`formatValue`**: Custom formatted node replaces the value tooltip but does not affect `aria-valuenow`

---

# Spinner

> Displays an animated loading indicator to signal an ongoing process.

## Import

```tsx
import { IressSpinner } from '@iress-oss/ids-components';
```

- [Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-spinner--docs)
- [Source](https://github.com/iress/design-system/tree/main/packages/components/src/components/Spinner)
- [Report issue](https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=spinner&title=[Spinner]+Bug:+)
- [Request feature](https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=spinner,enhancement&title=[Spinner]+Feature:+)

## Props

> Required props are **bold**.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| data-testid | `string` | — | The data-testid attribute is used to target elements in automated tests if no identifier is available. In some components it is propagated to child elements.  Notes: - Please use this prop sparingly and only when no other identifier is available, as per the guiding principles of Testing Library. - Only use this prop for your tests @see https://testing-library.com/docs/queries/bytestid |
| flip | `both` , `horizontal` , `vertical` | — | Flip the icon horizontally, vertically or both axes. |
| type | `material` | — | The icon provider to use Note: Font Awesome is deprecated. Please migrate to Material Symbols. |
| set | `undefined` | `'fal'` | The icon set to be used (Font Awesome only): - `fal`: Font Awesome Light - `fab`: Font Awesome Brand @deprecated Font Awesome is deprecated. Please migrate to Material Symbols. |
| screenreaderText | `string` | — | Adds screen reader text if the icon needs to be visible to screen reader users Screen reader text for the chatty spinner. |
| rotate | 180 , `270`, 90  | — | Amount of degrees to rotate the icon. |
| spin | `half`, 1 , 2 , 3  | `half` | Accepts a numeric value for speed for one rotation. Spin speed of spinner. |
| filled | `boolean` | `false` | Filled variant for Material Symbols When true, icon uses filled style (fill=1) Useful for active/selected states |
| fixedWidth | `undefined` | — | Adds fixed width class for Font Awesome icons - fa-fw @deprecated Font Awesome specific. Material Symbols inherit text size automatically. |
| variant | `chatty`, `default`  | — | Variant of spinner. - 'default': Standard rotating spinner Variant of spinner. - 'chatty': Animated dots for chatting/typing indicator |

📄 [Full type definition](../../dist/components/Spinner/Spinner.d.ts)

Also accepts all [styling props](../styling-props/overview.md) ([type definition](../../dist/interfaces.d.ts), [token values](../tokens/tokens-reference.md)).

Spinners notify the user that a task is being processed. They indicate that the app is busy, and should be used when the user has to wait for more than a few seconds.

```tsx
<IressSpinner screenreaderText="Making magic happen..." />;
```

## Design

### When to use

> **Prefer [IressLoading](../patterns/loading.md)** — the Loading pattern handles timing and accessibility automatically. Use `IressSpinner` directly only when you need a standalone spinning indicator outside of a loading state.

- **Inline loading indicators**: Show a spinner next to a button or field during an async action
- **Chat typing indicators**: Use the `chatty` variant to show someone is typing
- **Custom loading UIs**: When building a bespoke loading experience not covered by `IressLoading`

### When not to use

- **Page or component loading states** — use [IressLoading](../patterns/loading.md) which handles skeleton display, timing, and accessibility
- **Determinate progress** — use [Progress](../components/progress.md) when you know the completion percentage
- **Content placeholders** — use [Skeleton](../components/skeleton.md) for layout-preserving loading states

### Do's and Don'ts

| ✅ Do | ❌ Don't |
|-------|----------|
| Provide `screenreaderText` or a visible `message` | Use a spinner without any accessible label |
| Use for indeterminate waits (unknown duration) | Use a spinner when you can show a progress bar |
| Keep messages concise ("Loading...", "Saving...") | Display spinners indefinitely without timeout handling |

### Related patterns

- [Loading](../patterns/loading.md) — full loading pattern with timing, fade-in, and accessibility
- [Skeleton](../components/skeleton.md) — layout-preserving placeholders
- [Progress](../components/progress.md) — for determinate progress indicators

## Develop

### Quick Start

```tsx
import { IressSpinner } from '@iress-oss/ids-components';

<IressSpinner screenreaderText="Loading..." />;
```

[View all props](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-spinner--docs#api-props)

### Standalone

When using the spinner on its own, you can define the `screenreaderText` prop to provide context to screen readers.

```tsx
<IressSpinner screenreaderText="Making magic happen..." />;
```

### Chatty variant

The chatty variant displays an animated "typing" indicator with three dots. This is commonly used in chat interfaces to show that another user or system is currently typing a message.

```tsx
<IressSpinner variant="chatty" screenreaderText="User is typing..." />;
```

### Message

You can display a message alongside the spinner. In this case, you do not need to define the `screenreaderText` prop, as you have a visible message to the user telling them what is happening.

```tsx
<IressInline gap="sm" verticalAlign="middle">
  <IressSpinner color="colour.neutral.70" />
  <IressText color="colour.neutral.70">Making magic happen...</IressText>
</IressInline>;
```

### Testing

The query depends on the spinner variant:

**Default spinner** — renders as a decorative icon with `aria-hidden="true"`.
Wrap it in a container with an accessible label, or query by `data-testid`:

```tsx
const spinner = screen.getByTestId('my-spinner');
```

**Chatty spinner** (`variant="chatty"`) — renders with `role="status"`:

```tsx
const spinner = screen.getByRole('status');
```


#### Test selectors

| Part | Description | Recommended Query | Test ID |
|------|-------------|-------------------|---------|
| main | The root element of the spinner. Default variant is decorative (aria-hidden); chatty variant has role="status" | `getByRole('status')` for the chatty variant, or `getByTestId('...')` for the decorative default | `spinner` |

---

### Storybook

Storybook provides an interactive playground for testing different prop combinations and viewing accessibility attributes.

[View in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-spinner--docs)

## Specifications

### Behaviour

| State | Behaviour |
|-------|-----------|
| Default | Renders an animated spinning indicator |
| Chatty | Renders three animated dots for typing indication |
| With message | Displays visible text alongside the spinner |

### Accessibility

**WCAG compliance:**

- **1.1.1 Non-text Content** — `screenreaderText` provides an accessible name for the spinner
- **4.1.3 Status Messages** — Chatty variant uses `role="status"` for polite announcements

**Keyboard interaction:**

Spinners are not interactive and do not receive focus.

### Edge cases

- **No `screenreaderText` or `message`**: The spinner is purely decorative and hidden from assistive technologies — ensure context is provided by a parent element
- **Long-running operations**: Consider adding a timeout and showing an error state if the operation takes too long

---

### Storybook

Storybook provides an interactive playground for testing different prop combinations and viewing accessibility attributes.

[View in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-spinner--docs)

---

# Stack

> Lays out children vertically with consistent spacing between items.

## Import

```tsx
import { IressStack } from '@iress-oss/ids-components';
```

- [Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-stack--docs)
- [Source](https://github.com/iress/design-system/tree/main/packages/components/src/components/Stack)
- [Report issue](https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=stack&title=[Stack]+Bug:+)
- [Request feature](https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=stack,enhancement&title=[Stack]+Feature:+)

## Props

> Required props are **bold**.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| data-testid | `string` | — | The data-testid attribute is used to target elements in automated tests if no identifier is available. In some components it is propagated to child elements.  Notes: - Please use this prop sparingly and only when no other identifier is available, as per the guiding principles of Testing Library. - Only use this prop for your tests @see https://testing-library.com/docs/queries/bytestid |
| element | `keyof IntrinsicElements` | `'div'` | The HTML element that should be rendered. |
| gap | `[ResponsiveProp](../../dist/types.d.ts)<[PositiveSpacingToken](../../dist/types.d.ts)>` | — | Sets the gap between direct children. @see https://developer.mozilla.org/docs/Web/CSS/gap |
| horizontalAlign | `any` | — | Sets the horizontal alignment of the stack content. |
| verticalAlign | `any` | — | Sets the vertical alignment of the stack content. |

📄 [Full type definition](../../dist/components/Stack/Stack.d.ts)

Also accepts all [styling props](../styling-props/overview.md) ([type definition](../../dist/interfaces.d.ts), [token values](../tokens/tokens-reference.md)).

Use IressStack to control vertical spacing between content with consistent preset values.

```tsx
<IressStack gap="spacing.1">
  <IressPlaceholder height="50" />
  <IressPlaceholder height="50" />
  <IressPlaceholder height="50" />
</IressStack>;
```

## Design

### When to use

- **Vertical spacing**: Apply consistent vertical gaps between content blocks
- **Form layouts**: Stack fields vertically with even spacing
- **Section spacing**: Space content sections within a page

### When not to use

- **Horizontal layout** — use [Inline](../components/inline.md) instead
- **Grid columns** — use [Row](../components/row.md) + [Col](../components/col.md)

### Related patterns

- [Inline](../components/inline.md) — horizontal equivalent
- [Row](../components/row.md) + [Col](../components/col.md) — grid-based layout

## Develop

### Quick Start

```tsx
import { IressStack } from '@iress-oss/ids-components';

<IressStack gap="spacing.4">
  <p>Item 1</p>
  <p>Item 2</p>
</IressStack>;
```

[View all props](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-stack--docs#api-props)

### Usage

#### Gap

Vertical spacing is applied to the direct children of the `IressStack` component. The amount of spacing is controlled by the gap prop which accepts from `spacing.0` to `spacing.10`.

##### What happened to `gutter`?

The previous `gutter` prop has been replaced by `gap`, which uses the latest set of spacing tokens. In terms of how it is used to space items inside the `IressStack` component, it is now directly mapped to the [CSS gap property](https://developer.mozilla.org/en-US/docs/Web/CSS/gap), which may change how your application is spaced. For most cases, there should be no change.

```tsx
<IressStack gap="spacing.4">
  <IressText element="h3">spacing.1</IressText>
  <IressStack gap="spacing.1">
    <IressPlaceholder height="50" />
    <IressPlaceholder height="50" />
    <IressPlaceholder height="50" />
  </IressStack>
  <IressText element="h3">spacing.4</IressText>
  <IressStack gap="spacing.4">
    <IressPlaceholder height="50" />
    <IressPlaceholder height="50" />
    <IressPlaceholder height="50" />
  </IressStack>
  <IressText element="h3">spacing.8</IressText>
  <IressStack gap="spacing.8">
    <IressPlaceholder height="50" />
    <IressPlaceholder height="50" />
    <IressPlaceholder height="50" />
  </IressStack>
</IressStack>;
```

#### Responsive gap

The `gap` prop can take an object that takes five key/value pairs that correlate with the IDS breakpoints.

```tsx
<IressStack
  gap={{
    xs: 'spacing.1',
    sm: 'spacing.2',
    md: 'spacing.4',
  }}
>
  <IressPlaceholder height="50" />
  <IressPlaceholder height="50" />
  <IressPlaceholder height="50" />
</IressStack>;
```

#### Inline children

The stack component will treat the direct children as a block element. If you want to wrap some items to display them inline, wrap them with `IressInline`.

In the example below: `IressButton` are inline because of wrapped by `IressInline`.

```tsx
<IressStack gap="spacing.4">
  <IressPanel bg="alt">Panel 1 (block)</IressPanel>
  <span>I am a block span with the same margin</span>
  <IressPanel bg="alt">Panel 2 (block)</IressPanel>
</IressStack>;
```

#### Lists

`IressStack` can also apply gap between the list items by using the new `element` (e.g. `ul`) prop.

```tsx
<IressStack gap="spacing.7" element="ul">
  <li>List item 1</li>
  <li>List item 2</li>
  <li>List item 3</li>
</IressStack>;
```

#### Vertical alignment

The `verticalAlign` prop controls how content is positioned vertically within the stack. It accepts six values: `top`, `middle`, `bottom`, `between`, `around`, and `evenly`.

Use `top`, `middle`, or `bottom` to align items within the available space, and `between`, `around`, or `evenly` to distribute extra vertical space between items (similar to `space-between`, `space-around`, and `space-evenly` in CSS flexbox).

```tsx
<IressPanel style={{ height: '300px' }}>
  <IressStack gap="spacing.4" verticalAlign="bottom" stretch>
    <IressPlaceholder height="50" />
    <IressPlaceholder height="50" />
    <IressPlaceholder height="50" />
  </IressStack>
</IressPanel>;
```

### Testing

`IressStack` is a layout primitive with no semantic role. Target its children
directly or use a `data-testid`:

```tsx
const stack = screen.getByTestId('my-stack');
```


#### Test selectors

| Part | Description | Recommended Query | Test ID |
|------|-------------|-------------------|---------|
| main | The root element of the stack | — | `stack` |

---

### Storybook

[View in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-stack--docs)

## Specifications

### Behaviour

A CSS flexbox column wrapper with configurable gap, vertical alignment, and optional `element` prop for rendering as a list.

---

# Styled

> A polymorphic utility component that applies design tokens and styling props to any HTML element or custom component.

## Import

```tsx
import { IressStyled } from '@iress-oss/ids-components';
```

- [Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-styled--docs)
- [Source](https://github.com/iress/design-system/tree/main/packages/components/src/components/Styled)
- [Report issue](https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=styled&title=[Styled]+Bug:+)
- [Request feature](https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=styled,enhancement&title=[Styled]+Feature:+)

## Props

> Required props are **bold**.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | `ReactNode` | — | Content to be styled. |
| element | `ElementType` | — | The HTML element or custom component to render. |
| data-testid | `string` | — | The data-testid attribute is used to target elements in automated tests if no identifier is available. In some components it is propagated to child elements.  Notes: - Please use this prop sparingly and only when no other identifier is available, as per the guiding principles of Testing Library. - Only use this prop for your tests @see https://testing-library.com/docs/queries/bytestid |

📄 [Full type definition](../../dist/components/Styled/Styled.d.ts)

Also accepts all [styling props](../styling-props/overview.md) ([type definition](../../dist/interfaces.d.ts), [token values](../tokens/tokens-reference.md)).

The IressStyled component is a utility for applying design tokens to any element. It provides an unopinionated wrapper that gives you direct access to all supported styling properties without creating a dedicated component or writing custom CSS.

```tsx
<IressStack gap="spacing.3">
  <IressStyled p="spacing.2" bg="colour.neutral.20" borderRadius="radius.2">
    <IressText>Small padding (spacing.2)</IressText>
  </IressStyled>

  <IressStyled p="spacing.4" bg="colour.neutral.20" borderRadius="radius.2">
    <IressText>Medium padding (spacing.4)</IressText>
  </IressStyled>

  <IressStyled p="spacing.6" bg="colour.neutral.20" borderRadius="radius.2">
    <IressText>Large padding (spacing.6)</IressText>
  </IressStyled>

  <IressStyled
    m="spacing.4"
    p="spacing.4"
    bg="colour.system.info.surface"
    borderRadius="radius.2"
  >
    <IressText>With margin (spacing.4)</IressText>
  </IressStyled>
</IressStack>;
```

## Design

### When to use

- **Custom layouts**: When you need a unique layout that doesn't match existing components
- **Semantic HTML**: When you need specific HTML elements with custom styling
- **Quick prototyping**: For rapid development without creating dedicated styled components
- **One-off designs**: When a design pattern doesn't warrant creating a reusable component

### When not to use

- **Repeated patterns** — create a dedicated component instead
- **Simple spacing** — use [Stack](../components/stack.md) or [Inline](../components/inline.md)
- **Typography** — use [Text](../components/text.md) for text styling with semantic elements

## Develop

### Quick Start

```tsx
import { IressStyled } from '@iress-oss/ids-components';

<IressStyled p="spacing.4" bg="colour.neutral.20" borderRadius="radius.2">
  This is styled content using design tokens for padding, background color, and
  border radius.
</IressStyled>;
```

[View all props](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-styled--docs#api-props)

### Usage

#### The `element` prop

With the `element` prop you can select which HTML element the component should render as. It renders as a `div` by default, but can be set to any standard HTML element like `section`, `article`, `aside`, `nav`, `main`, `header`, `footer`, or `span`.

This allows you to maintain proper semantic HTML structure while applying custom styling.

```tsx
<IressStack gap="spacing.3">
  <IressStyled
    element="section"
    p="spacing.4"
    bg="colour.neutral.20"
    borderRadius="radius.2"
  >
    <IressText element="h3">Section Element</IressText>
    <IressText>This is rendered as a section element.</IressText>
  </IressStyled>

  <IressStyled
    element="article"
    p="spacing.4"
    bg="colour.neutral.20"
    borderRadius="radius.2"
  >
    <IressText element="h3">Article Element</IressText>
    <IressText>This is rendered as an article element.</IressText>
  </IressStyled>

  <IressStyled
    element="aside"
    p="spacing.4"
    bg="colour.neutral.20"
    borderRadius="radius.2"
  >
    <IressText element="h3">Aside Element</IressText>
    <IressText>This is rendered as an aside element.</IressText>
  </IressStyled>

  <IressStyled
    element="nav"
    p="spacing.4"
    bg="colour.neutral.20"
    borderRadius="radius.2"
  >
    <IressText element="h3">Nav Element</IressText>
    <IressText>This is rendered as a nav element.</IressText>
  </IressStyled>
</IressStack>;
```

#### Styling props

You can apply any of the styling props supported by the design system.

[View supported styling props](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components_styling-props-reference--docs#reference)

##### Spacing

Use spacing tokens to control padding and margin. The spacing system provides consistent values from `spacing.0` to `spacing.10`.

```tsx
<IressStack gap="spacing.3">
  <IressStyled p="spacing.2" bg="colour.neutral.20" borderRadius="radius.2">
    <IressText>Small padding (spacing.2)</IressText>
  </IressStyled>

  <IressStyled p="spacing.4" bg="colour.neutral.20" borderRadius="radius.2">
    <IressText>Medium padding (spacing.4)</IressText>
  </IressStyled>

  <IressStyled p="spacing.6" bg="colour.neutral.20" borderRadius="radius.2">
    <IressText>Large padding (spacing.6)</IressText>
  </IressStyled>

  <IressStyled
    m="spacing.4"
    p="spacing.4"
    bg="colour.system.info.surface"
    borderRadius="radius.2"
  >
    <IressText>With margin (spacing.4)</IressText>
  </IressStyled>
</IressStack>;
```

##### Colors

Apply design system color tokens to set background colors, text colors, and border colors. Use semantic color tokens like `colour.system.info.surface` for consistent theming.

```tsx
<IressStack gap="spacing.3">
  <IressStyled
    p="spacing.4"
    bg="colour.system.info.surface"
    color="colour.system.info.text"
    borderRadius="radius.2"
  >
    <IressText>Info color scheme</IressText>
  </IressStyled>

  <IressStyled
    p="spacing.4"
    bg="colour.system.success.surface"
    color="colour.system.success.text"
    borderRadius="radius.2"
  >
    <IressText>Success color scheme</IressText>
  </IressStyled>

  <IressStyled
    p="spacing.4"
    bg="colour.system.warning.surface"
    color="colour.system.warning.text"
    borderRadius="radius.2"
  >
    <IressText>Warning color scheme</IressText>
  </IressStyled>

  <IressStyled
    p="spacing.4"
    bg="colour.system.danger.surface"
    color="colour.system.danger.text"
    borderRadius="radius.2"
  >
    <IressText>Danger color scheme</IressText>
  </IressStyled>
</IressStack>;
```

##### Complex compositions

Combine multiple styling properties to create rich, semantic HTML structures. The component provides full access to design tokens for maximum flexibility.

```tsx
<IressStyled
  maxWidth="2/12"
  m="auto"
  p="spacing.5"
  bg="colour.neutral.10"
  borderRadius="radius.4"
>
  <IressStyled mb="spacing.4">
    <IressIcon
      name="info"
      color="colour.system.info.text"
      textStyle="typography.heading.4"
    />
    <IressText element="h2" textStyle="typography.heading.3">
      Complex Styled Component
    </IressText>
  </IressStyled>

  <IressText element="p" mb="spacing.3">
    The <code>IressStyled</code> component provides full access to Panda CSS
    styling props, allowing you to create complex layouts and designs without
    writing custom CSS.
  </IressText>

  <IressStyled p="spacing.4" bg="colour.neutral.20" borderRadius="radius.2">
    <IressText>
      This example demonstrates combining multiple styling properties to create
      a rich, semantic HTML structure with custom styling.
    </IressText>
  </IressStyled>
</IressStyled>;
```

---

### Storybook

[View in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-styled--docs)

## Specifications

### Behaviour

Renders a configurable HTML element (`div` by default) with full design token support for spacing, colour, borders, and layout.

---

# TabSet

> Organises content into tabbed panels, showing one panel at a time.

## Import

```tsx
import { IressTabSet } from '@iress-oss/ids-components';
```

- [Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-tab-set--docs)
- [Figma](https://www.figma.com/design/youFqYT4CgpKxfLJQv80hf/WIP-Iress-Design-System-V6?node-id=7305-28714)
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

---

# Table

> Displays structured data in rows and columns.

## Import

```tsx
import { IressTable } from '@iress-oss/ids-components';
```

- [Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-table--docs)
- [Figma](https://www.figma.com/design/youFqYT4CgpKxfLJQv80hf/WIP-Iress-Design-System-V6?node-id=7305-33833)
- [Source](https://github.com/iress/design-system/tree/main/packages/components/src/components/Table)
- [Report issue](https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=table&title=[Table]+Bug:+)
- [Request feature](https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=table,enhancement&title=[Table]+Feature:+)

## Props

> Required props are **bold**.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| data-testid | `string` | — | The data-testid attribute is used to target elements in automated tests if no identifier is available. In some components it is propagated to child elements.  Notes: - Please use this prop sparingly and only when no other identifier is available, as per the guiding principles of Testing Library. - Only use this prop for your tests @see https://testing-library.com/docs/queries/bytestid |
| alternate | `boolean` | `false` | If set to true, the table will have alternating row colors. This is useful for improving readability in tables with many rows. |
| **caption** | `ReactNode` | — | Caption that describes the data in the table, required for accessibility. |
| columns | `[IressTableColumn](../../dist/components/Table/Table.d.ts)<TRow, TVal>[]` | — | A mapping of columns to be displayed in the table. If not provided, it will be automatically regenerated from the row data. |
| compact | `boolean` | `false` | Compact view of the table, used for tables with a lot of data. |
| empty | `ReactNode` | — | Content to be show when there is no rowData (columns must also be provided). |
| hiddenCaption | `boolean` | — | When set to true, the table caption will be visually hidden. |
| hiddenHeader | `boolean` | — | When set to true, the table header (`<thead></thead>`) will be not be rendered. Only use with very simple tables. |
| hover | `boolean` | — | When set to true, hovering over a row will trigger a UI change. |
| removeRowBorders | `boolean` | `false` | If set to true, the table will not have borders between rows. This is useful for simpler tables where the row borders are not needed. |
| rowProps | `[IressStyledProps](../../dist/components/Styled/Styled.d.ts)<"tr"> , ((row: Row<TRow>) => [IressStyledProps](../../dist/components/Styled/Styled.d.ts)<"tr">)` | — | Add additional props to the row element. Can be a props map or a function that returns an props map. The function is called with the row data. |
| rows | `TRow[]` | `[]` | Each object in the array contains the data for a row. |
| scope | `col`, `row`  | `'row'` | Defaults to 'row' - the first cell in the row is a `<th>`, otherwise it's a `<td>`. |
| virtualise | `boolean , TableVirtualiseOptions` | — | Enable row virtualisation for large datasets. Only visible rows (plus overscan) are rendered to the DOM. Requires a fixed height on the table container. Pass `true` for defaults, or an options object to configure. |

📄 [Full type definition](../../dist/components/Table/Table.d.ts)

Also accepts all [styling props](../styling-props/overview.md) ([type definition](../../dist/interfaces.d.ts), [token values](../tokens/tokens-reference.md)).

Data driven component for displaying tabular data.

```tsx
<IressTable
  caption="My investments"
  rows={[
    {
      investment_name: 'Artemis Fund Managers Limited',
      cost: 23898,
      investmentDate: '2019-09-23',
      totalPercentage: 24.8,
    },
    {
      investment_name: 'CASH.CASH',
      cost: 49751.4,
      investmentDate: '2020-06-28',
      totalPercentage: 49,
    },
    {
      investment_name: 'VODAFONE GRP',
      cost: 26382.456,
      investmentDate: '2019-02-05',
      totalPercentage: 26.2,
    },
  ]}
/>;
```

## Design

### When to use

- **Structured data**: Displaying rows of related data with consistent columns
- **Comparison**: Allowing users to compare values across rows
- **Data-heavy views**: Presenting large datasets with sorting, filtering, and formatting
- **Reports**: Tabular output for financial, analytical, or administrative data

### When not to use

- **Key-value pairs** — use a description list or simple layout
- **Card-based layouts** — use cards when each item has distinct visual treatment
- **Single column lists** — use a list component instead

### Do's and Don'ts

| ✅ Do | ❌ Don't |
|-------|----------|
| Always provide a `caption` for accessibility | Omit captions — screen readers need them |
| Use appropriate column formats (currency, date, etc.) | Display raw unformatted data |
| Enable sorting on columns where comparison matters | Enable sorting on every column by default |
| Use virtualisation for large datasets (hundreds+ rows) | Render thousands of rows without virtualisation |

### Content guidelines

- **Caption**: Every table must have a `caption` for accessibility. When the surrounding context already makes the table's purpose obvious (e.g. a heading directly above), use `hiddenCaption` to visually hide the caption while keeping it accessible to screen readers.
- **Column labels**: Keep concise, use sentence case
- **Empty state**: Provide helpful message when no data matches filters
- **Numeric alignment**: Currency and number columns auto-align right for readability

### Related patterns

- [Skeleton](../components/skeleton.md) — for table loading placeholders
- [Loading pattern](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/patterns-loading--docs) — for loading states with tables

## Develop

### Quick Start

```tsx
import { IressTable } from '@iress-oss/ids-components';

<IressTable caption="Data table" rows={[{ name: 'Alice', age: 30 }]} />;
```

[View all props](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-table--docs#api-props)

### Usage

#### Automatic columns

Only `caption` and `rows` are required. Columns are derived from the keys of the first row object.

```tsx
<IressTable
  caption="My investments"
  rows={[
    {
      investment_name: 'Artemis Fund Managers Limited',
      cost: 23898,
      investmentDate: '2019-09-23',
      totalPercentage: 24.8,
    },
    {
      investment_name: 'CASH.CASH',
      cost: 49751.4,
      investmentDate: '2020-06-28',
      totalPercentage: 49,
    },
    {
      investment_name: 'VODAFONE GRP',
      cost: 26382.456,
      investmentDate: '2019-02-05',
      totalPercentage: 26.2,
    },
  ]}
/>;
```

#### Custom columns

Use the `columns` prop for full control over which columns display and how.

```tsx
import {
  IressPill,
  IressTable,
  IressTableFormattedValue,
} from '@iress-oss/ids-components';

const renderColumn = (value: number) => (
  <IressPill mode={value > 30000 ? '70' : '10'}>
    <IressTableFormattedValue value={value} format="currency" />
  </IressPill>
);

export function TableCustomColumns() {
  return (
    <IressTable
      caption="My investments"
      rows={[
        {
          investment_name: 'Artemis Fund Managers Limited',
          cost: 23898,
          investmentDate: '2019-09-23',
          totalPercentage: 24.8,
        },
        {
          investment_name: 'CASH.CASH',
          cost: 49751.4,
          investmentDate: '2020-06-28',
          totalPercentage: 49,
        },
        {
          investment_name: 'VODAFONE GRP',
          cost: 26382.456,
          investmentDate: '2019-02-05',
          totalPercentage: 26.2,
        },
      ]}
      columns={[
        {
          key: 'investment_name',
          label: 'Investment',
          divider: true,
        },
        {
          key: 'investmentDate',
          label: 'Date',
          format: 'date',
        },
        {
          key: 'totalPercentage',
          label: 'Share',
          format: 'percent',
        },
        {
          key: 'cost',
          label: 'Cost',
          textAlign: 'right',
          format: renderColumn,
        },
      ]}
    />
  );
}
```

#### Formats

Built-in formatters: `date`, `currency`, `percent`, `number`, `shortDate`, `isoDateTime`, `relativeTime`. Or pass a custom function returning a ReactNode.

```tsx
import { IressPill, IressTable } from '@iress-oss/ids-components';

const renderColumn = (value: string) => <IressPill>{value}</IressPill>;

// https://blog.devgenius.io/javascript-date-subtract-seconds-83b3285b7959
const subtractSeconds = (date: Date, seconds: number) => {
  // make copy with Date() constructor
  const dateCopy = new Date(date);
  dateCopy.setSeconds(date.getSeconds() - seconds);
  return dateCopy;
};

const tenSecondsAgo = subtractSeconds(new Date(), 10);

export function TableFormats() {
  return (
    <IressTable
      caption="Available formats"
      compact
      rows={[
        {
          string: 'Hello, world!',
          number: 123456,
          date: '2020-06-28',
          shortDate: '2020-06-28',
          isoDateTime: '2020-06-28',
          relativeTime: tenSecondsAgo,
          currency: 123456.78,
          percent: 12,
          custom: 'Custom',
        },
      ]}
      columns={[
        { key: 'string', label: 'String', format: 'string' },
        { key: 'number', label: 'Number', format: 'number' },
        { key: 'date', label: 'Date', format: 'date' },
        { key: 'shortDate', label: 'Short date', format: 'shortDate' },
        { key: 'isoDateTime', label: 'ISO Date & Time', format: 'isoDateTime' },
        { key: 'relativeTime', label: 'Relative time', format: 'relativeTime' },
        {
          key: 'currency',
          label: 'Currency (AUD)',
          format: 'currency',
          currencyCode: '',
        },
        { key: 'percent', label: 'Percent', format: 'percent' },
        {
          key: 'custom',
          label: 'Custom',
          format: renderColumn,
        },
      ]}
    />
  );
}
```

#### Sorting

Enable with `sort: true` on a column. Set to `asc` or `desc` for initial sort direction.

```tsx
import {
  IressPill,
  IressTable,
  IressTableFormattedValue,
} from '@iress-oss/ids-components';

const renderColumn = (value: number) => (
  <IressPill mode={value > 30000 ? '70' : '10'}>
    <IressTableFormattedValue value={value} format="currency" />
  </IressPill>
);

export function TableSorting() {
  return (
    <IressTable
      caption="My investments"
      rows={[
        {
          investment_name: 'Artemis Fund Managers Limited',
          cost: 23898,
          investmentDate: '2019-09-23',
          totalPercentage: 24.8,
        },
        {
          investment_name: 'CASH.CASH',
          cost: 49751.4,
          investmentDate: '2020-06-28',
          totalPercentage: 49,
        },
        {
          investment_name: 'VODAFONE GRP',
          cost: 26382.456,
          investmentDate: '2019-02-05',
          totalPercentage: 26.2,
        },
      ]}
      columns={[
        {
          key: 'investment_name',
          label: 'Investment',
          divider: true,
          sort: 'asc',
        },
        {
          key: 'investmentDate',
          label: 'Date',
          format: 'date',
          sort: true,
        },
        {
          key: 'totalPercentage',
          label: 'Share',
          format: 'percent',
          sort: true,
        },
        {
          key: 'cost',
          label: 'Cost',
          textAlign: 'right',
          sort: true,
          format: renderColumn,
        },
      ]}
    />
  );
}
```

#### Custom sorting logic

Use `sortFn` for custom sort — pass a built-in name or a custom comparison function.

```tsx
import {
  IressTable,
  IressTableFormattedValue,
  type IressTableColumn,
} from '@iress-oss/ids-components';

interface Row {
  investment_name: string;
  cost: number;
  netCost?: number;
  investmentDate: string;
  totalPercentage: number;
}

const columns: IressTableColumn<Row>[] = [
  {
    key: 'investment_name',
    label: 'Investment',
    divider: true,
    sort: 'asc',
    sortFn: 'textCaseSensitive',
  },
  {
    key: 'investmentDate',
    label: 'Date',
    format: 'date',
    sort: true,
    sortFn: 'datetime',
  },
  {
    key: 'totalPercentage',
    label: 'Share',
    format: 'percent',
    sort: true,
    sortFn: 'alphanumeric',
  },
  {
    key: 'cost',
    label: 'Cost (sorts by net cost if available)',
    textAlign: 'right',
    format: (value: number, row) => {
      return (
        <>
          <IressTableFormattedValue value={value} format="currency" /> (net:{' '}
          {row?.netCost ? (
            <IressTableFormattedValue value={row.netCost} format="currency" />
          ) : (
            'N/A'
          )}
          )
        </>
      );
    },
    sortFn: (a, b) => {
      const aCost = a.original.netCost ?? a.original.cost;
      const bCost = b.original.netCost ?? b.original.cost;
      return aCost - bCost;
    },
  },
];

export function TableSortingFn() {
  return (
    <IressTable<Row>
      caption="My investments"
      rows={[
        {
          investment_name: 'Artemis Fund Managers Limited',
          cost: 23898,
          investmentDate: '2019-09-23',
          totalPercentage: 24.8,
        },
        {
          investment_name: 'CASH.CASH',
          cost: 49751.4,
          netCost: 20000,
          investmentDate: '2020-06-28',
          totalPercentage: 49,
        },
        {
          investment_name: 'VODAFONE GRP',
          cost: 26382.456,
          investmentDate: '2019-02-05',
          totalPercentage: 26.2,
        },
      ]}
      columns={columns}
    />
  );
}
```

#### Filtering

Enable with `filter: true` on a column, or pass a `TableColumnFilter` object for control over default values, custom filter functions, and explicit option lists.

```tsx
import { IressTable } from '@iress-oss/ids-components';
import { IressPill } from '@iress-oss/ids-components';

const STATUS_MODES: Record<string, 'success' | 'info' | 'warning' | 'danger'> =
  {
    Current: 'success',
    Proposed: 'info',
    Alternative: 'warning',
    Archived: 'danger',
  };

export function TableFiltering() {
  return (
    <IressTable
      caption="My investments"
      compact
      rows={[
        {
          investment_name: 'Artemis Fund Managers Limited',
          status: 'Current',
          cost: 23898,
          investmentDate: '2019-09-23',
          totalPercentage: 24.8,
        },
        {
          investment_name: 'CASH.CASH',
          status: 'Proposed',
          cost: 49751.4,
          investmentDate: '2020-06-28',
          totalPercentage: 49,
        },
        {
          investment_name: 'VODAFONE GRP',
          status: 'Alternative',
          cost: 26382.456,
          investmentDate: '2019-02-05',
          totalPercentage: 26.2,
        },
        {
          investment_name: 'APPLE INC',
          status: 'Archived',
          cost: 12000,
          investmentDate: '2021-11-15',
          totalPercentage: 12.1,
        },
      ]}
      columns={[
        {
          key: 'investment_name',
          label: 'Investment',
          divider: true,
          filter: true,
          sort: true,
        },
        {
          key: 'status',
          label: 'Status',
          filter: {
            defaultValue: ['Current', 'Proposed'],
            format: (value: string) => (
              <IressPill mode={STATUS_MODES[value] ?? 'info'}>
                {value}
              </IressPill>
            ),
          },
          format: (value: string) => (
            <IressPill mode={STATUS_MODES[value] ?? 'info'}>{value}</IressPill>
          ),
        },
        {
          key: 'investmentDate',
          label: 'Date',
          format: 'date',
          filter: true,
        },
        {
          key: 'totalPercentage',
          label: 'Share',
          format: 'percent',
          sort: true,
        },
        {
          key: 'cost',
          label: 'Cost',
          textAlign: 'right',
          format: 'currency',
        },
      ]}
    />
  );
}
```

#### Server-side filtering

Set `filterFn: false` to disable client-side filtering. Use `onChange` to fetch new data and `values` for explicit options.

```tsx
import { useState, useCallback, useRef } from 'react';
import { IressTable } from '@iress-oss/ids-components';
import { IressPill } from '@iress-oss/ids-components';
import { IressLoading } from '@/patterns/Loading';

const STATUS_MODES: Record<string, 'success' | 'info' | 'warning' | 'danger'> =
  {
    Current: 'success',
    Proposed: 'info',
    Alternative: 'warning',
    Archived: 'danger',
  };

const ALL_ROWS = [
  {
    investment_name: 'Artemis Fund Managers Limited',
    status: 'Current',
    cost: 23898,
    investmentDate: '2019-09-23',
    totalPercentage: 24.8,
  },
  {
    investment_name: 'CASH.CASH',
    status: 'Proposed',
    cost: 49751.4,
    investmentDate: '2020-06-28',
    totalPercentage: 49,
  },
  {
    investment_name: 'VODAFONE GRP',
    status: 'Alternative',
    cost: 26382.456,
    investmentDate: '2019-02-05',
    totalPercentage: 26.2,
  },
  {
    investment_name: 'APPLE INC',
    status: 'Archived',
    cost: 12000,
    investmentDate: '2021-11-15',
    totalPercentage: 12.1,
  },
];

/**
 * Simulates a server-side fetch with a delay. In a real application,
 * replace this with an actual API call.
 */
const simulateServerFetch = (statusFilter: string[]): Promise<object[]> =>
  new Promise((resolve) => {
    setTimeout(() => {
      const filtered =
        statusFilter.length === 0
          ? ALL_ROWS
          : ALL_ROWS.filter((row) => statusFilter.includes(row.status));
      resolve(filtered);
    }, 800);
  });

export function TableFilteringServerSide() {
  const [rows, setRows] = useState<object[]>(ALL_ROWS);
  const [loaded, setLoaded] = useState(true);
  const [updating, setUpdating] = useState(false);
  const latestRequest = useRef(0);

  const handleStatusFilter = useCallback(async (selectedValues: string[]) => {
    const requestId = ++latestRequest.current;
    setUpdating(true);
    const data = await simulateServerFetch(selectedValues);
    // Only apply the result if this is still the latest request
    if (requestId === latestRequest.current) {
      setRows(data);
      setUpdating(false);
      setLoaded(true);
    }
  }, []);

  return (
    <IressLoading
      pattern="component"
      loaded={loaded}
      update={updating}
      width="12/12"
    >
      <IressTable<object>
        caption="My investments"
        compact
        rows={rows}
        columns={[
          {
            key: 'investment_name',
            label: 'Investment',
            divider: true,
          },
          {
            key: 'status',
            label: 'Status',
            filter: {
              // Provide all possible values so the dropdown is always complete,
              // even when the current rows are already filtered server-side.
              values: Object.keys(STATUS_MODES),
              // Disable client-side filtering — the server controls which rows
              // are shown.
              filterFn: false,
              // Fetch new data when the user changes the filter selection.
              onChange: (values: string[]) => void handleStatusFilter(values),
              format: (value: string) => (
                <IressPill mode={STATUS_MODES[value] ?? 'info'}>
                  {value}
                </IressPill>
              ),
            },
            format: (value: string) => (
              <IressPill mode={STATUS_MODES[value] ?? 'info'}>
                {value}
              </IressPill>
            ),
          },
          {
            key: 'investmentDate',
            label: 'Date',
            format: 'date',
          },
          {
            key: 'totalPercentage',
            label: 'Share',
            format: 'percent',
          },
          {
            key: 'cost',
            label: 'Cost',
            textAlign: 'right',
            format: 'currency',
          },
        ]}
      />
    </IressLoading>
  );
}
```

#### Width

Control column width via the `width` property. Horizontal scrollbar appears when the table exceeds container width.

```tsx
<IressTable
  caption="My investments"
  rows={[
    {
      investment_name: 'Artemis Fund Managers Limited',
      cost: 23898,
      investmentDate: '2019-09-23',
      totalPercentage: 24.8,
    },
    {
      investment_name: 'CASH.CASH',
      cost: 49751.4,
      investmentDate: '2020-06-28',
      totalPercentage: 49,
    },
    {
      investment_name: 'VODAFONE GRP',
      cost: 26382.456,
      investmentDate: '2019-02-05',
      totalPercentage: 26.2,
    },
  ]}
  columns={[
    {
      key: 'investment_name',
      label: 'Investment',
      width: '450px',
    },
    {
      key: 'cost',
      label: 'Cost',
      width: '220px',
    },
    { key: 'investmentDate', label: 'Investment date', width: '220px' },
    { key: 'totalPercentage', label: 'Share', format: 'percent' },
  ]}
/>;
```

#### Alignment

Columns can be aligned `left`, `right`, or `center`. Currency/number formats auto-align right.

```tsx
<IressTable
  caption="My investments"
  rows={[
    {
      investment_name: 'Artemis Fund Managers Limited',
      cost: 23898,
      investmentDate: '2019-09-23',
      totalPercentage: 24.8,
    },
    {
      investment_name: 'CASH.CASH',
      cost: 49751.4,
      investmentDate: '2020-06-28',
      totalPercentage: 49,
    },
    {
      investment_name: 'VODAFONE GRP',
      cost: 26382.456,
      investmentDate: '2019-02-05',
      totalPercentage: 26.2,
    },
  ]}
  columns={[
    {
      key: 'investment_name',
      label: 'Investment (left)',
      textAlign: 'left',
    },
    {
      key: 'cost',
      label: 'Cost (center)',
      textAlign: 'center',
      format: 'currency',
    },
    {
      key: 'investmentDate',
      label: 'Date (center)',
      textAlign: 'center',
      format: 'date',
    },
    {
      key: 'totalPercentage',
      label: 'Share (right)',
      textAlign: 'right',
      format: 'percent',
    },
  ]}
/>;
```

#### Dividers

Set `divider: true` on a column to add a vertical border after it.

```tsx
<IressTable
  caption="My investments"
  rows={[
    {
      investment_name: 'Artemis Fund Managers Limited',
      cost: 23898,
      investmentDate: '2019-09-23',
      totalPercentage: 24.8,
    },
    {
      investment_name: 'CASH.CASH',
      cost: 49751.4,
      investmentDate: '2020-06-28',
      totalPercentage: 49,
    },
    {
      investment_name: 'VODAFONE GRP',
      cost: 26382.456,
      investmentDate: '2019-02-05',
      totalPercentage: 26.2,
    },
  ]}
  columns={[
    {
      key: 'investment_name',
      label: 'Investment',
      divider: true,
    },
    {
      key: 'investmentDate',
      label: 'Date',
      format: 'date',
    },
    {
      key: 'totalPercentage',
      label: 'Share',
      format: 'percent',
    },
    {
      key: 'cost',
      label: 'Cost',
      format: 'currency',
    },
  ]}
/>;
```

#### Highlight on hover

Enable row highlighting on hover with the `hover` prop.

```tsx
<IressTable
  caption="My investments"
  rows={[
    {
      investment_name: 'Artemis Fund Managers Limited',
      cost: 23898,
      investmentDate: '2019-09-23',
      totalPercentage: 24.8,
    },
    {
      investment_name: 'CASH.CASH',
      cost: 49751.4,
      investmentDate: '2020-06-28',
      totalPercentage: 49,
    },
    {
      investment_name: 'VODAFONE GRP',
      cost: 26382.456,
      investmentDate: '2019-02-05',
      totalPercentage: 26.2,
    },
  ]}
  hover
/>;
```

#### Hidden header

Use `hiddenHeader` to visually hide the table header for simple data.

```tsx
<IressTable
  caption="My investments"
  rows={[
    {
      investment_name: 'Artemis Fund Managers Limited',
      cost: 23898,
      investmentDate: '2019-09-23',
      totalPercentage: 24.8,
    },
    {
      investment_name: 'CASH.CASH',
      cost: 49751.4,
      investmentDate: '2020-06-28',
      totalPercentage: 49,
    },
    {
      investment_name: 'VODAFONE GRP',
      cost: 26382.456,
      investmentDate: '2019-02-05',
      totalPercentage: 26.2,
    },
  ]}
  hiddenHeader
/>;
```

#### Rich rows (JSX)

Use ReactNodes as cell values for links, buttons, or icons.

```tsx
<IressTable
  caption="My rich investments"
  rows={[
    {
      investment_name: <IressButton>Artemis Fund Managers Limited</IressButton>,
      cost: '$23,898',
      investmentDate: '2019/09/23',
      totalPercentage: <IressPill mode="20">24.8%</IressPill>,
    },
    {
      investment_name: <IressButton>CASH.CASH</IressButton>,
      cost: '$49,751.40',
      investmentDate: '2020/06/28',
      totalPercentage: <IressPill mode="30">49%</IressPill>,
    },
    {
      investment_name: <IressButton>VODAFONE GRP</IressButton>,
      cost: '$26,382.46',
      investmentDate: '2019/02/05',
      totalPercentage: <IressPill mode="40">26.2%</IressPill>,
    },
  ]}
/>;
```

#### Empty state

Use the `empty` prop to display content when there is no row data. Requires `columns` prop.

```tsx
<IressTable
  columns={[
    {
      key: 'investment_name',
      label: 'Investment',
      divider: true,
    },
    {
      key: 'investmentDate',
      label: 'Date',
      format: 'date',
    },
    {
      key: 'totalPercentage',
      label: 'Share',
      format: 'percent',
    },
    {
      key: 'cost',
      label: 'Cost',
      textAlign: 'right',
      format: 'currency',
    },
  ]}
  empty="This table has no data"
  rows={[]}
/>;
```

#### Static table

Use `children` for a styled table without data-driven features. Only `caption`, `hiddenCaption`, `hiddenHeader`, and `hover` props are supported.

```tsx
<IressTable caption="My investments">
  <thead>
    <tr>
      <th>Investment</th>
      <th>Cost</th>
      <th>Investment date</th>
      <th>Share</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>Artemis Fund Managers Limited</th>
      <td>$23,898</td>
      <td>2019/09/23</td>
      <td>24.8%</td>
    </tr>
    <tr>
      <th>CASH.CASH</th>
      <td>$49,751.40</td>
      <td>2020/06/28</td>
      <td>49%</td>
    </tr>
    <tr>
      <th>VODAFONE GRP</th>
      <td>$26,382.46</td>
      <td>2019/02/05</td>
      <td>26.2%</td>
    </tr>
  </tbody>
</IressTable>;
```

#### Row props

Customise rows with `rowProps` — pass an object or a function receiving the row data.

```tsx
<IressTable
  caption="My investments"
  rows={[
    {
      investment_name: 'Artemis Fund Managers Limited',
      cost: 23898,
      investmentDate: '2019-09-23',
      totalPercentage: 24.8,
    },
    {
      investment_name: 'CASH.CASH',
      cost: 49751.4,
      investmentDate: '2020-06-28',
      totalPercentage: 49,
    },
    {
      investment_name: 'VODAFONE GRP',
      cost: 26382.456,
      investmentDate: '2019-02-05',
      totalPercentage: 26.2,
    },
  ]}
  rowProps={(row: Row<{ cost?: number }>) => ({
    bg:
      row.original.cost && row.original.cost > 30000
        ? 'colour.neutral.10'
        : 'colour.system.success.surface',
  })}
/>;
```

#### Compact

The `compact` prop reduces padding and font size for dense data display.

```tsx
import { IressTable } from '@iress-oss/ids-components';

export function TableCompact() {
  return (
    <IressTable
      caption="My investments"
      compact
      alternate
      removeRowBorders
      scope="col"
      rows={[
        {
          investment_name: 'Artemis Fund Managers Limited',
          cost: 23898,
          investmentDate: '2019-09-23',
          totalPercentage: 24.8,
        },
        {
          investment_name: 'CASH.CASH',
          cost: 49751.4,
          investmentDate: '2020-06-28',
          totalPercentage: 49,
        },
        {
          investment_name: 'VODAFONE GRP',
          cost: 26382.456,
          investmentDate: '2019-02-05',
          totalPercentage: 26.2,
        },
      ]}
      columns={[
        { key: 'investment_name', label: 'Investment', divider: true },
        { key: 'investmentDate', label: 'Date', format: 'date' },
        { key: 'totalPercentage', label: 'Share', format: 'percent' },
      ]}
      rowProps={(row) => ({
        bg:
          row.original.investment_name === 'VODAFONE GRP'
            ? 'colour.data.subtle.30'
            : undefined,
      })}
    />
  );
}
```

#### Virtualisation

For large datasets, `virtualise` renders only visible rows. Accepts `true` or `{ height, overscan, estimateSize }`.

```tsx
import { useState } from 'react';
import {
  IressButton,
  IressInline,
  IressPill,
  IressStack,
  IressTable,
  IressText,
  IressToggle,
  type IressTableColumn,
} from '@iress-oss/ids-components';

interface Row {
  id: string;
  name: string;
  value: string;
  status: 'pending' | 'approved' | 'rejected';
}

const ROW_COUNT = 1000;

const generateRows = (count: number): Row[] =>
  Array.from({ length: count }, (_, i) => ({
    id: `${i}`,
    name: `Item ${i}`,
    value: `Value ${i}`,
    status: 'pending' as const,
  }));

const columns: IressTableColumn<Row, string>[] = [
  { key: 'name', label: 'Name', width: '35%' },
  { key: 'value', label: 'Value', width: '35%' },
  {
    key: 'status',
    label: 'Status',
    width: '30%',
    format: (value: string) => {
      const modeMap = {
        approved: 'success',
        rejected: 'danger',
      } as const;
      const mode = modeMap[value as keyof typeof modeMap] ?? 'info';
      return <IressPill mode={mode}>{value}</IressPill>;
    },
  },
];

export function TableVirtualised() {
  const [rows, setRows] = useState(() => generateRows(ROW_COUNT));
  const [virtualised, setVirtualised] = useState(true);
  const [lastDuration, setLastDuration] = useState<number | null>(null);

  const updateAll = (status: Row['status']) => {
    const start = performance.now();
    setRows((prev) => prev.map((r) => ({ ...r, status })));
    requestAnimationFrame(() => {
      setLastDuration(Math.round(performance.now() - start));
    });
  };

  return (
    <IressStack gap="md">
      <IressInline gap="sm" verticalAlign="middle">
        <IressToggle
          checked={virtualised}
          onChange={() => setVirtualised((v) => !v)}
        >
          Virtualisation {virtualised ? 'on' : 'off'}
        </IressToggle>
        <IressButton mode="primary" onClick={() => updateAll('approved')}>
          Approve All
        </IressButton>
        <IressButton mode="secondary" onClick={() => updateAll('rejected')}>
          Reject All
        </IressButton>
        <IressButton mode="tertiary" onClick={() => updateAll('pending')}>
          Reset
        </IressButton>
        {lastDuration !== null && (
          <IressText>Last update: {lastDuration}ms</IressText>
        )}
      </IressInline>
      <IressText>
        {ROW_COUNT} rows — toggle virtualisation off to feel the difference.
      </IressText>
      <IressTable
        caption="Virtualisation demo"
        rows={rows}
        columns={columns}
        virtualise={virtualised ? { height: 500 } : undefined}
        compact
      />
    </IressStack>
  );
}
```

### Tables with grouped rows

For tables with multiple groups of rows sharing the same columns.

```tsx
import {
  IressButton,
  IressIcon,
  IressTable,
  IressTableBody,
  type IressTableColumn,
} from '@iress-oss/ids-components';

interface Liability {
  owner: string;
  type: string;
  provider?: string;
  status: string;
  outstanding: number;
  interestRate: number;
  repayment: number;
  frequency: string;
}

const currentLiabilities = [
  {
    owner: 'Client',
    type: 'Credit card',
    status: 'Current',
    outstanding: 5000,
    interestRate: 0,
    repayment: 300,
    frequency: 'Monthly',
  },
];

const longTermLiabilities = [
  {
    owner: 'Joint',
    type: 'Primary residence mortgage',
    provider: 'Other',
    status: 'Current',
    outstanding: 1000000,
    interestRate: 0,
    repayment: 0,
    frequency: 'Monthly',
  },
  {
    owner: 'Joint',
    type: 'Buy to let mortgage',
    status: 'Current',
    outstanding: 1000000,
    interestRate: 0,
    repayment: 0,
    frequency: 'Monthly',
  },
  {
    owner: 'Joint',
    type: 'Buy to let mortgage',
    status: 'Current',
    outstanding: 5000,
    interestRate: 0,
    repayment: 0,
    frequency: 'Monthly',
  },
];

const contingentLiabilities = [
  {
    owner: 'Partner',
    type: 'Limited',
    status: 'Current',
    outstanding: 1000,
    interestRate: 0,
    repayment: 100,
    frequency: 'Monthly',
  },
];

const columns: IressTableColumn<Liability>[] = [
  {
    key: 'owner',
    label: 'Owner',
    width: '75px',
  },
  {
    key: 'type',
    label: 'Type',
    width: '100px',
  },
  {
    key: 'provider',
    label: 'Provider',
  },
  {
    key: 'status',
    label: 'Status',
    divider: true,
  },
  {
    key: 'frequency',
    label: 'Frequency',
  },
  {
    key: 'outstanding',
    label: 'Outstanding (GBP)',
    format: 'currency',
    currencyCode: '',
    sort: true,
  },
  {
    key: 'interestRate',
    label: 'Interest rate p.a.',
    format: 'percent',
    textAlign: 'right',
    sort: true,
  },
  {
    key: 'repayment',
    label: 'Repayment (GBP)',
    format: 'currency',
    currencyCode: '',
    sort: true,
  },
];

export const TableGroupedRows = () => (
  <IressTable caption="My liabilities">
    <IressTableBody
      rows={currentLiabilities}
      columns={columns}
      caption="Current liabilities"
      scope="col"
      open
    >
      <IressButton prepend={<IressIcon name="plus-circle" />}>
        Add current liability
      </IressButton>
    </IressTableBody>
    <IressTableBody
      rows={longTermLiabilities}
      columns={columns}
      caption="Long term liabilities"
      scope="col"
    >
      <IressButton prepend={<IressIcon name="plus-circle" />}>
        Add long term liability
      </IressButton>
    </IressTableBody>
    <IressTableBody
      rows={contingentLiabilities}
      columns={columns}
      caption="Contingent liabilities"
      scope="col"
    >
      <IressButton prepend={<IressIcon name="plus-circle" />}>
        Add contingent liability
      </IressButton>
    </IressTableBody>
  </IressTable>
);
```

### Formatted values

Exposed component for formatting values the same way the table does.

```tsx
import {
  IressTable,
  IressTableFormattedValue,
} from '@iress-oss/ids-components';

export function TableFormattedValueExample() {
  return (
    <IressTable
      caption="IressTableFormattedValue"
      rows={[
        {
          format: 'string',
          example: <IressTableFormattedValue value="Hello" format="string" />,
        },
        {
          format: 'number',
          example: <IressTableFormattedValue value={10000} format="number" />,
        },
        {
          format: 'date',
          example: (
            <IressTableFormattedValue value="2024-01-15" format="date" />
          ),
        },
        {
          format: 'currency',
          example: <IressTableFormattedValue value={10000} format="currency" />,
        },
        {
          format: 'percent',
          example: <IressTableFormattedValue value={50} format="percent" />,
        },
      ]}
    />
  );
}
```

### Testing

Query the table by its role:

```tsx
const table = screen.getByRole('table', { name: 'Users' });
```

[View test IDs](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-table--docs#testing)


#### Test selectors

| Part | Description | Recommended Query | Test ID |
|------|-------------|-------------------|---------|
| main | The root element of the table | — | `table` |
| table | The table element | `getByRole('table', { name: '...' })` | `table__table` |
| caption | The table caption | `getByText('...')` | `table__caption` |
| thead | The table header section | — | `table__thead` |
| tbody | The table body section | — | `table__tbody` |
| header row | A header row (uses dash separator) | `getByRole('row')` | `table__thead-row` |
| body row | A body row | `getByRole('row')` | `table__row` |
| cell | A table body cell | `getByRole('cell')` | `table__cell__row_*__col_*` |
| header | A column header cell | `getByRole('columnheader')` | `table__header__*` |

---

### Storybook

Storybook provides an interactive playground for testing different prop combinations, more complex recipes, all prop details, and accessibility attributes.

[View in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-table--docs)

## Specifications

### Behaviour

| State | Behaviour |
|-------|-----------|
| Default | Renders table with auto-generated or custom columns |
| Sorted | Column sorted ascending or descending, indicated visually and to screen readers |
| Filtered | Rows filtered by selected column values via popover checkboxes |
| Virtualised | Only visible rows rendered to DOM; scrolling loads more |
| Empty | Displays empty state content when no rows match |
| Compact | Reduced padding and font size for dense layouts |

### Accessibility

**WCAG compliance:**

- **1.3.1 Info and Relationships** — Uses semantic `<table>`, `<thead>`, `<tbody>`, `<th>`, `<td>` elements
- **4.1.2 Name, Role, Value** — Caption provides accessible name; sort state announced
- **2.1.1 Keyboard** — Sort and filter controls are keyboard accessible

**ARIA attributes:**

| Element | Attribute | Description |
|---------|-----------|-------------|
| Table | `aria-rowcount` | Total row count (virtualised tables) |
| Row | `aria-rowindex` | Row position (virtualised tables) |
| Sort header | `aria-sort` | Current sort direction |
| Column header | `scope="col"` or `scope="row"` | Identifies header scope |

### Keyboard interaction

| Key | Action |
|-----|--------|
| `Enter` / `Space` | Activates sort button or filter button in column header |
| `Tab` | Moves focus between interactive elements (sort/filter buttons) |
| `Escape` | Closes filter popover |

### Edge cases

- **Virtualisation requires fixed height**: Without a bounded container height, all rows render
- **Rich row sorting**: Custom `sortFn` needed when cells contain JSX
- **Column width stability**: Set explicit `width` on columns when using virtualisation
- **Server-side filtering**: Set `filterFn: false` and handle data fetching in `onChange`

---

### Storybook

Storybook provides an interactive playground for testing different prop combinations and viewing accessibility attributes.

[View in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-table--docs)

## Recipes

### Server Side Filtering

```tsx
import { useState, useCallback, useRef } from 'react';
import { IressTable } from '@iress-oss/ids-components';
import { IressPill } from '@/components/Pill';
import { IressLoading } from '@/patterns/Loading';

const STATUS_MODES: Record<string, 'success' | 'info' | 'warning' | 'danger'> =
  {
    Current: 'success',
    Proposed: 'info',
    Alternative: 'warning',
    Archived: 'danger',
  };

const ALL_ROWS = [
  {
    investment_name: 'Artemis Fund Managers Limited',
    status: 'Current',
    cost: 23898,
    investmentDate: '2019-09-23',
    totalPercentage: 24.8,
  },
  {
    investment_name: 'CASH.CASH',
    status: 'Proposed',
    cost: 49751.4,
    investmentDate: '2020-06-28',
    totalPercentage: 49,
  },
  {
    investment_name: 'VODAFONE GRP',
    status: 'Alternative',
    cost: 26382.456,
    investmentDate: '2019-02-05',
    totalPercentage: 26.2,
  },
  {
    investment_name: 'APPLE INC',
    status: 'Archived',
    cost: 12000,
    investmentDate: '2021-11-15',
    totalPercentage: 12.1,
  },
];

/**
 * Simulates a server-side fetch with a delay. In a real application,
 * replace this with an actual API call.
 */
const simulateServerFetch = (statusFilter: string[]): Promise<object[]> =>
  new Promise((resolve) => {
    setTimeout(() => {
      const filtered =
        statusFilter.length === 0
          ? ALL_ROWS
          : ALL_ROWS.filter((row) => statusFilter.includes(row.status));
      resolve(filtered);
    }, 800);
  });

export function TableFilteringServerSide() {
  const [rows, setRows] = useState<object[]>(ALL_ROWS);
  const [loaded, setLoaded] = useState(true);
  const [updating, setUpdating] = useState(false);
  const latestRequest = useRef(0);

  const handleStatusFilter = useCallback(async (selectedValues: string[]) => {
    const requestId = ++latestRequest.current;
    setUpdating(true);
    const data = await simulateServerFetch(selectedValues);
    // Only apply the result if this is still the latest request
    if (requestId === latestRequest.current) {
      setRows(data);
      setUpdating(false);
      setLoaded(true);
    }
  }, []);

  return (
    <IressLoading
      pattern="component"
      loaded={loaded}
      update={updating}
      width="12/12"
    >
      <IressTable<object>
        caption="My investments"
        compact
        rows={rows}
        columns={[
          {
            key: 'investment_name',
            label: 'Investment',
            divider: true,
          },
          {
            key: 'status',
            label: 'Status',
            filter: {
              // Provide all possible values so the dropdown is always complete,
              // even when the current rows are already filtered server-side.
              values: Object.keys(STATUS_MODES),
              // Disable client-side filtering — the server controls which rows
              // are shown.
              filterFn: false,
              // Fetch new data when the user changes the filter selection.
              onChange: (values: string[]) => void handleStatusFilter(values),
              format: (value: string) => (
                <IressPill mode={STATUS_MODES[value] ?? 'info'}>
                  {value}
                </IressPill>
              ),
            },
            format: (value: string) => (
              <IressPill mode={STATUS_MODES[value] ?? 'info'}>
                {value}
              </IressPill>
            ),
          },
          {
            key: 'investmentDate',
            label: 'Date',
            format: 'date',
          },
          {
            key: 'totalPercentage',
            label: 'Share',
            format: 'percent',
          },
          {
            key: 'cost',
            label: 'Cost',
            textAlign: 'right',
            format: 'currency',
          },
        ]}
      />
    </IressLoading>
  );
}
```


---

# TagInput

> A form control that allows users to enter and manage a collection of tags via keyboard input.

## Import

```tsx
import { IressTagInput } from '@iress-oss/ids-components';
```

- [Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-taginput--docs)
- [Source](https://github.com/iress/design-system/tree/main/packages/components/src/components/TagInput)
- [Report issue](https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=tag-input&title=[TagInput]+Bug:+)
- [Request feature](https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=tag-input,enhancement&title=[TagInput]+Feature:+)

## Props

> Required props are **bold**.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| defaultValue | `string[]` | — | Tags to display (uncontrolled) |
| onChange | `((e?: SyntheticEvent<HTMLInputElement, Event>, value?: string[]) => void) | undefined` | — | Emitted when the value changes. |
| onExistingTag | `((tag: string) => void)` | — | Emitted when the user attempts to add a tag that already exists. |
| onTagDelete | `((children: string, e: SyntheticEvent<HTMLButtonElement, Event>) => void)` | — | Emitted when a tag is deleted |
| onTagDeleteAll | `((children: string, e: SyntheticEvent<HTMLButtonElement, Event>) => void)` | — | Emitted when the combined tag delete button is clicked |
| onTagDeleteButtonBlur | `((e: FocusEvent<HTMLButtonElement, Element>) => void)` | — | Emitted when a tag's delete button is blurred |
| selectedOptionsTagText | `string` | `selected` | Text displayed next to tag count in tag when tag limit is exceeded |
| tagLimit | `number` | `5` | Limit of tags to display before shortening to `selectedOptionsTagText` |
| value | `string[]` | — | Tags to display (controlled) |
| actions | `Omit<[IressButtonProps](../../dist/components/Button/Button.d.ts), "status" | "mode">[]` | — | Actions to display in the input field, rendered inside the input on the right. These will be rendered with opinionated styling. If you want to use custom buttons or controls, use the `append` prop instead. |
| width | `any` | `100%` | The width of the input. |
| data-testid | `string` | — | The data-testid attribute is used to target elements in automated tests if no identifier is available. In some components it is propagated to child elements.  Notes: - Please use this prop sparingly and only when no other identifier is available, as per the guiding principles of Testing Library. - Only use this prop for your tests @see https://testing-library.com/docs/queries/bytestid |
| variant | `search` | — | The variant of the input, which will apply different styles to the input. The `search` variant is designed for search inputs and will have a different style for the clear button and loading spinner. |
| inline | `boolean` | — | Make prepend/append element closer to the input content. |
| readOnly | `[FormControlReadOnly](../../dist/types.d.ts)` | — | Renders the input as read-only. Use `'locked'` when the value is read-only because of permissions. |
| append | `ReactNode` | — | Content to append to the input field, usually a button or icon. |
| loading | `boolean, string ` | — | The loading states of the input field. If provided a string, will use that text as the loading message. |
| alignRight | `boolean` | `false` | Set input content align to right, useful for numeric inputs. |
| formatter | `((value?: string) => string | number)` | — | Bring your own formatter that will be used to format the value when the input is not focused, allowing you to display the value in a different format. e.g. User type in value="dsf 987kkk123" => result after formatter: $987,123 (string) |
| onClear | `((e: ChangeEvent<HTMLInputElement, Element>) => void)` | — | Emitted when the input is manually cleared. |
| clearable | `boolean` | `false` | If `true`, then user can clear the value of the input. |

📄 [Full type definition](../../dist/components/TagInput/TagInput.d.ts)

Also accepts all [styling props](../styling-props/overview.md) ([type definition](../../dist/interfaces.d.ts), [token values](../tokens/tokens-reference.md)).

A form control that allows users to enter and manage a collection of tags via keyboard input.

```tsx
<IressTagInput
  defaultValue={['Tag']}
  placeholder="Type and hit enter to add a tag"
  tagLimit={999}
/>;
```

## Design

### When to use

- **Free-form multi-value input**: Allow users to type and add multiple values (e.g. email addresses, keywords)
- **Token-based entry**: When selections need to be individually removable
- **Dynamic lists**: Building a list of items from user-typed content

### When not to use

- **Predefined options only** — use [Select](../components/select.md) with multi-select
- **Single value input** — use [Input](../components/input.md) instead
- **Non-removable display tags** — use [Tag](../components/tag.md) or [Pill](../components/pill.md)

### Do's and Don'ts

| ✅ Do | ❌ Don't |
| --- | --- |
| Provide a clear placeholder indicating expected input | Leave the input without guidance |
| Set a reasonable `tagLimit` when appropriate | Allow unlimited tags if the backend has constraints |
| Use within a [Field](../components/field.md) for label and validation | Use without a visible label |
| Validate tag content before adding (e.g. email format) | Accept any input without validation |

### Content guidelines

- **Placeholder**: Use action-oriented text like "Type and press Enter to add"
- **Validation**: Show errors via the parent Field component's validation message
- **Tag limit**: Communicate limits clearly — disable input when limit is reached

### Related patterns

- [Tag](../components/tag.md) — for displaying non-editable tags
- [Select](../components/select.md) — for selecting from predefined options
- [Autocomplete](../components/autocomplete.md) — for search + suggestions
- [Field](../components/field.md) — wrap TagInput for label and validation

## Develop

### Quick Start

```tsx
import { IressTagInput } from '@iress-oss/ids-components';

<IressTagInput
  defaultValue={['Tag 1', 'Tag 2']}
  placeholder="Type and press Enter"
/>;
```

[View all props](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-taginput--docs#api-props)

### Controlled usage

Use `value` and `onChange` for controlled tag management:

```tsx
const [tags, setTags] = useState(['initial']);

<IressTagInput value={tags} onChange={setTags} placeholder="Add tags" />;
```

### With Field

Wrap in a Field for label, hint, and validation:

```tsx
<IressField label="Keywords" hint="Press Enter after each keyword">
  <IressTagInput placeholder="Add keyword" />
</IressField>;
```

### Tag limit

Restrict the number of tags a user can add:

```tsx
<IressTagInput tagLimit={5} placeholder="Max 5 tags" />;
```

## Specifications

### Keyboard interaction

| Key | Action |
| --- | --- |
| Enter | Adds the current input text as a tag |
| Backspace | Removes the last tag when input is empty |
| Tab | Moves focus out of the component |

### Accessibility

- The input has `role="textbox"` and is labelled via the parent Field
- Each tag is focusable and has a delete button with an accessible label
- Screen readers announce tag additions and removals via live regions

---

# Tag

> Displays a compact label for categorisation, filtering, or metadata.

## Import

```tsx
import { IressTag } from '@iress-oss/ids-components';
```

- [Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-tag--docs)
- [Figma](https://www.figma.com/design/youFqYT4CgpKxfLJQv80hf/WIP-Iress-Design-System-V6?node-id=7305-29810)
- [Source](https://github.com/iress/design-system/tree/main/packages/components/src/components/Tag)
- [Report issue](https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=tag&title=[Tag]+Bug:+)
- [Request feature](https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=tag,enhancement&title=[Tag]+Feature:+)

## Props

> Required props are **bold**.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | `ReactNode` | — | Contents of the tag. |
| compact | `boolean` | — | If true, reduces the padding and height of the tag. Useful when used inside an input component. |
| deleteButton | `ReactNode` | — | You can completely replace the delete button to provide your own functionality. When this is provided, `deleteButtonText` will not be used and `onDelete` and `onDeleteButtonBlur` will not be called. |
| deleteButtonText | `string` | `Delete` | Screen reader text for delete button |
| element | `ElementType` | `'span'` | Element type to render the Tag as. |
| mode | `10` , `20` , `30` , `40` , `50` , `60` , `70` , `80` , `90`, `danger` , `info` , `success` , `warning` , 10 , 20 , 30 , 40 , 50 , 60 , 70 , 80 , 90  | — | Style of the tag, based on the data colour palette (10-90) or system status colours (danger, info, success, warning). Can be a number (10-90), a string ('10'-'90'), or a system status ('danger', 'info', 'success', 'warning'). |
| bordered | `boolean` | `false` | When true, renders the tag with a visible border instead of a filled background. |
| onDelete | `((children: string, e: SyntheticEvent<HTMLButtonElement, Event>) => void)` | — | Callback triggered when the tag is deleted |
| onDeleteButtonBlur | `((e: FocusEvent<HTMLButtonElement, Element>) => void)` | — | Callback triggered when the close button is blurred |
| data-testid | `string` | — | The data-testid attribute is used to target elements in automated tests if no identifier is available. In some components it is propagated to child elements.  Notes: - Please use this prop sparingly and only when no other identifier is available, as per the guiding principles of Testing Library. - Only use this prop for your tests @see https://testing-library.com/docs/queries/bytestid |

📄 [Full type definition](../../dist/components/Tag/Tag.d.ts)

Also accepts all [styling props](../styling-props/overview.md) ([type definition](../../dist/interfaces.d.ts), [token values](../tokens/tokens-reference.md)).

Tags represent individual units in a group of selected items.

```tsx
import { IressInline, IressTag } from '@iress-oss/ids-components';

export function TagMode() {
  return (
    <IressInline gap="sm">
      <IressTag mode={10}>10</IressTag>
      <IressTag mode={20}>20</IressTag>
      <IressTag mode={30}>30</IressTag>
      <IressTag mode={40}>40</IressTag>
      <IressTag mode={50}>50</IressTag>
      <IressTag mode={60}>60</IressTag>
      <IressTag mode={70}>70</IressTag>
      <IressTag mode={80}>80</IressTag>
      <IressTag mode={90}>90</IressTag>
    </IressInline>
  );
}
```

## Design

### When to use

- **Multi-select display**: Showing selected items in multi-select interfaces
- **Email recipients or domains**: Managing collections of addresses
- **Applied filters**: Showing removable filter criteria
- **Categorization**: Labelling content with removable categories

Tags are **interactive** — they can be clicked and deleted by users.

### When not to use

- **Status indicators** — use [Pill](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-pill--docs) for non-interactive status badges or category labels
- **Action buttons** — use [Button](../components/button.md) or [ButtonGroup](../components/button-group.md) for triggering actions
- **Navigation items** — use [Link](../components/link.md) or navigation patterns

### Do's and Don'ts

| ✅ Do | ❌ Don't |
|-------|----------|
| Use `element="button"` explicitly for clickable tags | Rely on `onClick` alone to make tags interactive |
| Use semantic status modes (`danger`, `info`) for system states | Use status colours for decorative categorisation (use data palette `10`–`90`) |
| Use `compact` in dense layouts (e.g. inside inputs) | Mix compact and regular tags in the same context |
| Provide `deleteButtonText` for accessible delete labels | Use generic "Delete" text when context is needed |

### Content guidelines

- **Label**: Keep tag text short (1–3 words) and meaningful
- **Delete label**: Use `deleteButtonText` to provide context (e.g. "Remove john@example.com")
- **Colour**: Use data palette colours (`10`–`90`) for non-semantic categorisation; reserve status colours for system states

### Related patterns

- [Select](../components/select.md) — for selecting from an existing list (use `multiple` prop for multi-select with tags)
- [Pill](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-pill--docs) — for non-interactive status/category display
- [TagInput](#iresstagsinput) — for free-form tag entry

## Develop

### Quick Start

```tsx
import { IressTag } from '@iress-oss/ids-components';

<IressTag>Label</IressTag>;
```

[View all props](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-tag--docs#api-props)

### Mode

The `mode` prop controls the colour scheme of the tag. Use data palette colours (`10`–`90`) for non-semantic colour needs.

```tsx
import { IressInline, IressTag } from '@iress-oss/ids-components';

export function TagMode() {
  return (
    <IressInline gap="sm">
      <IressTag mode={10}>10</IressTag>
      <IressTag mode={20}>20</IressTag>
      <IressTag mode={30}>30</IressTag>
      <IressTag mode={40}>40</IressTag>
      <IressTag mode={50}>50</IressTag>
      <IressTag mode={60}>60</IressTag>
      <IressTag mode={70}>70</IressTag>
      <IressTag mode={80}>80</IressTag>
      <IressTag mode={90}>90</IressTag>
    </IressInline>
  );
}
```

### Status mode

Use semantic status values (`danger`, `info`, `success`, `warning`) when tags need to communicate a system status.

```tsx
import { IressInline, IressTag } from '@iress-oss/ids-components';

export function TagStatus() {
  return (
    <IressInline gap="sm">
      <IressTag mode="danger">danger</IressTag>
      <IressTag mode="info">info</IressTag>
      <IressTag mode="success">success</IressTag>
      <IressTag mode="warning">warning</IressTag>
    </IressInline>
  );
}
```

### Bordered tags

Set `bordered` to render a tag with a visible border using the tag's current colour, without altering its background. This enhances visibility and makes tags look more interactive — useful for dropdown filter tags or any context where tags need to stand out.

```tsx
import { IressInline, IressTag } from '@iress-oss/ids-components';

export function TagBordered() {
  return (
    <IressInline gap="sm">
      <IressTag bordered>No mode</IressTag>
      <IressTag mode={10} bordered>
        10
      </IressTag>
      <IressTag mode={20} bordered>
        20
      </IressTag>
      <IressTag mode={30} bordered>
        30
      </IressTag>
      <IressTag mode={40} bordered>
        40
      </IressTag>
      <IressTag mode={50} bordered>
        50
      </IressTag>
      <IressTag mode={60} bordered>
        60
      </IressTag>
      <IressTag mode={70} bordered>
        70
      </IressTag>
      <IressTag mode={80} bordered>
        80
      </IressTag>
      <IressTag mode={90} bordered>
        90
      </IressTag>
      <IressTag mode="danger" bordered>
        danger
      </IressTag>
      <IressTag mode="info" bordered>
        info
      </IressTag>
      <IressTag mode="success" bordered>
        success
      </IressTag>
      <IressTag mode="warning" bordered>
        warning
      </IressTag>
    </IressInline>
  );
}
```

### Clickable tags

Tags can be made clickable by setting `element="button"`. This is the recommended, explicit API and renders the tag as a `<button>` with hover styles to indicate it is clickable.

For backwards compatibility, passing `onClick` without setting `element` is also supported and will automatically render the tag as a `<button>`.

Use `element="a"` to render the tag as a link.

```tsx
<IressTag
  bordered
  onClick={() => {
    console.log('Tag clicked');
  }}
>
  Tag
</IressTag>;
```

### Compact tags

Set `compact` to render a smaller tag. This is useful in dense layouts, such as inside inputs where tags are displayed inline.

```tsx
<IressTag
  compact
  onDelete={() => {
    console.log('Tag deleted');
  }}
>
  Label
</IressTag>;
```

### Deleting tags

The delete button will not automatically remove the tag from the screen. Instead it will trigger the `onDelete` event. Use this event within your app to handle the display of tags.

The text a screen reader will announce defaults to "Delete" but can be changed using the `deleteButtonText` prop.

```tsx
import {
  IressButton,
  type IressButtonProps,
  IressInline,
  IressTag,
  type IressTagProps,
} from '@iress-oss/ids-components';
import { useState } from 'react';

export const TagDeletion = () => {
  const [tags, setTags] = useState(['Tag 1', 'Tag 2', 'Tag 3']);

  const handleAdd: IressButtonProps['onClick'] = () => {
    setTags([...tags, `Tag ${tags.length + 1}`]);
  };

  const handleDelete: IressTagProps['onDelete'] = (tag) => {
    setTags((existingTags) =>
      existingTags.filter((existingTag) => existingTag !== tag),
    );
  };

  return (
    <IressInline gap="sm" verticalAlign="middle">
      {tags.map((tag) => (
        <IressTag
          key={tag}
          deleteButtonText={`Delete ${tag}`}
          onDelete={handleDelete}
        >
          {tag}
        </IressTag>
      ))}
      <IressButton onClick={handleAdd} icon="add" mode="muted">
        Add tag
      </IressButton>
    </IressInline>
  );
};
```

### Custom button

You can completely override the delete button by passing a custom component to the `deleteButton` prop.

```tsx
<IressTag
  deleteButton={
    <IressPopover
      activator={
        <IressButton mode="muted">
          <IressIcon name="chevron-circle-down" screenreaderText="Actions" />
        </IressButton>
      }
      align="bottom-start"
    >
      Some actions go in here
    </IressPopover>
  }
>
  Label
</IressTag>;
```

### Testing

Query tags by their text content:

```tsx
const tag = screen.getByText('Category');
```

When `element="button"` is set, the tag renders as a `<button>`:

```tsx
const tag = screen.getByRole('button', { name: 'Category' });
```

When `element="a"` is set, the tag renders as a link:

```tsx
const tag = screen.getByRole('link', { name: 'Category' });
```

For deletable tags, query the delete button:

```tsx
const deleteButton = screen.getByRole('button', { name: 'Delete Category' });
```

**Test IDs:**

When you pass a `data-testid` to `IressTag`, the following nested test IDs are generated automatically:

| Suffix | Example | Description |
| --- | --- | --- |
| `delete-button__button` | `my-tag__delete-button__button` | The tag delete button |


#### Test selectors

| Part | Description | Recommended Query | Test ID |
|------|-------------|-------------------|---------|
| main | The root element of the tag | `getByRole('button', { name: '...' })` when interactive, or `getByRole('link', { name: '...' })` when rendered as a link | `tag` |
| delete button | The tag delete button | `getByRole('button', { name: 'Remove item' })` | `tag__delete-button__button` |

---

### Storybook

Storybook provides an interactive playground for testing different prop combinations and viewing accessibility attributes.

[View in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-tag--docs)

## Specifications

### Behaviour

| State | Behaviour |
|-------|-----------|
| Default | Renders as a static `<span>` with label text |
| Clickable (`element="button"`) | Renders as a `<button>` with hover/active styles |
| Deletable | Shows a delete button that triggers `onDelete` callback |
| Compact | Renders at smaller size for dense layouts |
| Bordered | Adds a visible border using the tag's colour |

### Accessibility

**WCAG compliance:**

- **4.1.2 Name, Role, Value** — Clickable tags render with `role="button"`; link tags with `role="link"`
- **2.4.4 Link Purpose** — Tag labels should describe their content or category
- **1.4.1 Use of Color** — Status is communicated via text label, not colour alone

**Keyboard interaction:**

| Key | Action |
|-----|--------|
| `Tab` | Moves focus to the tag (if clickable) or delete button |
| `Enter` / `Space` | Activates the tag click or delete action |

### Edge cases

- **Empty label**: Renders a tag with only the delete button — always provide meaningful text
- **Many tags**: Wrap in a scrollable container or use pagination to avoid overwhelming the user
- **Long labels**: Text truncates with ellipsis when exceeding available width

---

### Storybook

Storybook provides an interactive playground for testing different prop combinations and viewing accessibility attributes.

[View in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-tag--docs)

---

# Text

> Renders styled text with consistent typography from the design system.

## Import

```tsx
import { IressText } from '@iress-oss/ids-components';
```

- [Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-text--docs)
- [Source](https://github.com/iress/design-system/tree/main/packages/components/src/components/Text)
- [Report issue](https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=text&title=[Text]+Bug:+)
- [Request feature](https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=text,enhancement&title=[Text]+Feature:+)

## Props

> Required props are **bold**.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| data-testid | `string` | — | The data-testid attribute is used to target elements in automated tests if no identifier is available. In some components it is propagated to child elements.  Notes: - Please use this prop sparingly and only when no other identifier is available, as per the guiding principles of Testing Library. - Only use this prop for your tests @see https://testing-library.com/docs/queries/bytestid |
| element | `[IressTextElements](../../dist/components/Text/Text.d.ts)` | — | The HTML element that should be rendered. |

📄 [Full type definition](../../dist/components/Text/Text.d.ts)

Also accepts all [styling props](../styling-props/overview.md) ([type definition](../../dist/interfaces.d.ts), [token values](../tokens/tokens-reference.md)).

The IressText component allows you to set typographic styles either on one element, or a block of HTML elements.

```tsx
import { IressStack, IressText } from '@iress-oss/ids-components';

export function TextElement() {
  return (
    <IressStack gap="spacing.1">
      <IressText element="p">This is a p element.</IressText>
      <IressText element="div">This is a div element.</IressText>
      <IressText element="span">This is a span element.</IressText>
      <IressText element="h1">This is a h1 element.</IressText>
      <IressText element="h2">This is a h2 element.</IressText>
      <IressText element="h3">This is a h3 element.</IressText>
      <IressText element="h4">This is a h4 element.</IressText>
      <IressText element="h5">This is a h5 element.</IressText>
      <IressText element="h6">This is a h6 element.</IressText>
      <IressText element="code">This is a code element.</IressText>
      <IressText element="small">This is a small element.</IressText>
      <IressText element="cite">This is a cite element.</IressText>
      <IressText element="strong">This is a strong element.</IressText>
      <IressText element="em">This is a em element.</IressText>
      <IressText element="a">This is a a element.</IressText>
      <IressText element="blockquote">This is a blockquote element.</IressText>
      <IressText element="pre">This is a pre element.</IressText>
      <IressText element="mark">This is a mark element.</IressText>
    </IressStack>
  );
}
```

## Design

### When to use

- **Semantic headings with custom styling**: Render an `h2` visually as an `h4` to maintain document outline
- **Display text**: Apply display typography styles to content headings
- **Colour modes**: Apply semantic colour (e.g. muted, danger) to text blocks
- **Typographic blocks**: Wrap a block of HTML content to inherit consistent typography

### When not to use

- **Single paragraphs without styling** — use standard HTML `<p>` elements
- **Interactive text** — use [Link](../components/link.md) or [Button](../components/button.md) instead
- **Status messages** — use [Alert](../components/alert.md) for contextual feedback

### Do's and Don'ts

| ✅ Do | ❌ Don't |
|-------|----------|
| Use `element` to set the correct semantic element | Rely solely on `textStyle` for document structure |
| Only add `textStyle` when overriding the default visual treatment | Add redundant `textStyle` matching the element's default (e.g. `element="h1" textStyle="typography.heading.1"`) |
| Use `color` for semantic text colouring | Use inline styles for text colour |
| Maintain heading hierarchy in the document | Skip heading levels for visual reasons without using `textStyle` |

### Content guidelines

- **Heading hierarchy**: Ensure headings follow a logical order (h1 → h2 → h3) for accessibility
- **Text alignment**: Use left alignment for body text (default); centre for short labels or headings where appropriate
- **Colour usage**: Reserve `danger` and `warning` colours for error/warning text; use `muted` for secondary information

### Related patterns

- [Link](../components/link.md) — for interactive inline text
- [Alert](../components/alert.md) — for status messages
- [Readonly](../components/readonly.md) — for displaying non-editable form values

## Develop

### Quick Start

```tsx
import { IressText } from '@iress-oss/ids-components';

<IressText element="h1">Page Title</IressText>;
```

[View all props](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-text--docs#api-props)

### The `element` prop

With the `element` prop you can select which HTML element you would like the text component to render as.

It renders as a `div` by default, but can also be set to any standard typography element.

```tsx
import { IressStack, IressText } from '@iress-oss/ids-components';

export function TextElement() {
  return (
    <IressStack gap="spacing.1">
      <IressText element="p">This is a p element.</IressText>
      <IressText element="div">This is a div element.</IressText>
      <IressText element="span">This is a span element.</IressText>
      <IressText element="h1">This is a h1 element.</IressText>
      <IressText element="h2">This is a h2 element.</IressText>
      <IressText element="h3">This is a h3 element.</IressText>
      <IressText element="h4">This is a h4 element.</IressText>
      <IressText element="h5">This is a h5 element.</IressText>
      <IressText element="h6">This is a h6 element.</IressText>
      <IressText element="code">This is a code element.</IressText>
      <IressText element="small">This is a small element.</IressText>
      <IressText element="cite">This is a cite element.</IressText>
      <IressText element="strong">This is a strong element.</IressText>
      <IressText element="em">This is a em element.</IressText>
      <IressText element="a">This is a a element.</IressText>
      <IressText element="blockquote">This is a blockquote element.</IressText>
      <IressText element="pre">This is a pre element.</IressText>
      <IressText element="mark">This is a mark element.</IressText>
    </IressStack>
  );
}
```

### The `textStyle` prop

The `textStyle` prop (previously `variant`) allows you alter the default styling of the element that it selected.

For example, in order to maintain the semantic structure of headings, you may need to style a `h2` element like a `h4`. Or you may want to style your heading using one of our display text formats.

> ⚠️ **Do not add `textStyle` when the `element` already provides the correct styling.** For example, `element="h1"` already renders with `typography.heading.1` styling — adding `textStyle="typography.heading.1"` is redundant. Only use `textStyle` to intentionally override the default visual treatment (e.g. `element="h2" textStyle="typography.heading.4"` to make an h2 visually smaller), or when a designer has specified a different visual hierarchy in a Figma file.

```tsx
import { IressStack, IressText } from '@iress-oss/ids-components';

export function TextVariant() {
  return (
    <IressStack gap="md">
      <IressText textStyle="typography.heading.1">
        This is the typography.heading.1 text style.
      </IressText>
      <IressText textStyle="typography.heading.2">
        This is the typography.heading.2 text style.
      </IressText>
      <IressText textStyle="typography.heading.3">
        This is the typography.heading.3 text style.
      </IressText>
      <IressText textStyle="typography.heading.4">
        This is the typography.heading.4 text style.
      </IressText>
      <IressText textStyle="typography.heading.5">
        This is the typography.heading.5 text style.
      </IressText>
      <IressText textStyle="typography.body.sm">
        This is the typography.body.sm text style.
      </IressText>
    </IressStack>
  );
}
```

### The `color` prop

The `color` prop (previously `mode`) can be used to set the colour of the text to these predefined mode colours: Body, Muted, Primary, Info, Success, Warning, Danger, Positive and Negative.

```tsx
import { IressStack, IressText } from '@iress-oss/ids-components';

export function TextMode() {
  return (
    <IressStack gap="md">
      <IressText color="colour.neutral.70">
        This is colour.neutral.70 mode.
      </IressText>
      <IressText color="colour.primary.text">
        This is colour.primary.text mode.
      </IressText>
      <IressText color="colour.system.danger.text">
        This is colour.system.danger.text mode.
      </IressText>
      <IressText color="colour.system.success.text">
        This is colour.system.success.text mode.
      </IressText>
      <IressText color="colour.system.warning.text">
        This is colour.system.warning.text mode.
      </IressText>
      <IressText color="colour.system.info.text">
        This is colour.system.info.text mode.
      </IressText>
      <IressText color="colour.system.danger.text">
        Nested text mode demonstration:{' '}
        <IressText>I am nested, and return to the original colour</IressText>
      </IressText>
    </IressStack>
  );
}
```

### The `textAlign` prop

The `textAlign` prop (previously `align`) can be used to set the text's alignment.

```tsx
import { IressStack, IressText } from '@iress-oss/ids-components';

export function TextAlign() {
  return (
    <IressStack gap="md">
      <IressText textAlign="left">
        The quick brown fox jumps over the lazy dog
      </IressText>
      <IressText textAlign="center">
        The quick brown fox jumps over the lazy dog
      </IressText>
      <IressText textAlign="right">
        The quick brown fox jumps over the lazy dog
      </IressText>
      <IressText textAlign="justify">
        The quick brown fox jumps over the lazy dog
      </IressText>
      <IressText textAlign="inherit">
        The quick brown fox jumps over the lazy dog
      </IressText>
    </IressStack>
  );
}
```

### Block of typographic content

If you just need to style a block of typography content, you can just wrap the entire block of HTML with the text component.

```tsx
<IressText maxWidth="container.md" mx="auto" px="spacing.2">
  <h2>History</h2>
  <h3>Founding and Early Years (1993 - 2000)</h3>
  <p>
    <a href="https://iress.com" target="_blank">
      Iress Limited (ASX: IRE)
    </a>{' '}
    was founded in 1993 in Melbourne, Australia, as a provider of financial
    market data and trading software.
  </p>
  <h3>Expansion and IPO (2001 - 2010)</h3>
  <p>
    In 2001, Iress went public, listing on the Australian Securities Exchange
    (ASX). This move provided the company with capital to expand its operations
    and invest in new technologies.
  </p>
  <pre>Some code in here</pre>
</IressText>;
```

### Testing

Query text elements by their content:

```tsx
const heading = screen.getByRole('heading', { name: 'Page title' });
const paragraph = screen.getByText('Some content');
```


#### Test selectors

| Part | Description | Recommended Query | Test ID |
|------|-------------|-------------------|---------|
| main | The root element of the text | `getByText('...')` | `text` |

---

### Storybook

Storybook provides an interactive playground for testing different prop combinations and viewing accessibility attributes.

[View in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-text--docs)

## Specifications

### Behaviour

| State | Behaviour |
|-------|-----------|
| Default | Renders as `<div>` with inherited typography styles |
| With `element` | Renders as the specified semantic HTML element |
| With `textStyle` | Overrides the element's default visual styling |
| With `color` | Applies the specified semantic colour token |

### Accessibility

**WCAG compliance:**

- **1.3.1 Info and Relationships** — Use correct `element` to maintain semantic heading hierarchy
- **1.4.1 Use of Color** — Text colour supplements (not replaces) semantic meaning
- **2.4.6 Headings and Labels** — Headings should describe the content that follows

**Keyboard interaction:**

Text is not interactive. When content within text is interactive, those elements handle their own keyboard interaction.

---

### Storybook

Storybook provides an interactive playground for testing different prop combinations and viewing accessibility attributes.

[View in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-text--docs)

---

# Toaster

> Manages and displays temporary toast notifications to the user.

## Import

```tsx
import { IressToasterProvider, useToaster } from '@iress-oss/ids-components';
```

- [Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-toaster--docs)
- [Source](https://github.com/iress/design-system/tree/main/packages/components/src/components/Toaster)
- [Report issue](https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=toaster&title=[Toaster]+Bug:+)
- [Request feature](https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=toaster,enhancement&title=[Toaster]+Feature:+)

Toaster provide users with important, time-sensitive information.

```tsx
import {
  IressButton,
  IressToasterProvider,
  useToaster,
} from '@iress-oss/ids-components';

const ToastWithTrigger = () => {
  const toaster = useToaster();

  return (
    <IressButton
      onClick={() =>
        toaster.error({
          heading: 'Error',
          content:
            'Connection failure. Longer text description should wrap and look like this. Try to limit to 3 lines or less.',
        })
      }
    >
      Show toast using provider
    </IressButton>
  );
};

export function SimpleToasterExample() {
  return (
    <IressToasterProvider container={document.body}>
      <ToastWithTrigger />
    </IressToasterProvider>
  );
}
```

## Design

### When to use

- **Action confirmations**: "Record saved", "Email sent", "Item deleted"
- **Background process updates**: "File uploaded successfully", "Data synced"
- **Non-critical status changes**: Information the user should see but does not need to act on

### When not to use

- **Persistent contextual messages** that relate to page content — use [Alert](../components/alert.md) instead
- **Critical information or decisions** the user must acknowledge — use [Modal](../components/modal.md) instead
- **Messages containing actions** the user needs to take — toasts auto-dismiss and should not contain essential actions

For a full comparison of feedback components, see the [Feedback pattern](../patterns/feedback.md).

### Do's and Don'ts

| ✅ Do | ❌ Don't |
|-------|----------|
| Use for transient confirmations of completed actions | Use toasts for persistent information that must remain visible |
| Keep toast messages concise (under 60 characters) | Include complex actions or forms inside toasts |
| Use consistent positioning throughout the application | Change toast position based on context |
| Use appropriate status for the severity | Stack multiple toasts for the same action |

### Content guidelines

- **Message**: Keep short and actionable — confirm what happened (e.g. "Changes saved", not "Your changes have been successfully saved to the database")
- **Status mapping**:
  - `success` — confirms a completed action
  - `info` — non-critical update
  - `error` — an operation failed (provide a retry path if possible)
- **Timing**: Default 6 seconds is appropriate for most messages; use longer timeouts for messages requiring reading

### Related patterns

- [Feedback](../patterns/feedback.md) — decision tree for choosing the right feedback component
- [Alert](../components/alert.md) — for persistent inline messages
- [Modal](../components/modal.md) — for blocking decisions

## Develop

### Quick Start

```tsx
import { IressToasterProvider, useToaster } from '@iress-oss/ids-components';

function App() {
  const { success } = useToaster();

  const handleClick = () => {
    success('Changes saved');
  };

  return <IressButton onClick={handleClick}>Save changes</IressButton>;
}

<IressToasterProvider position="top-end">
  <App />
</IressToasterProvider>;
```

[View all props](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-toaster--docs#api-props)

### Usage

To use the toaster, wrap your `<App/>` or the component that you want to use the toasts within with `<IressToasterProvider />`. This provides the context for the `useToaster` hook, which is used to trigger toasts in your application.

> **Note:** If you are already using `IressProvider` or `IressShadow`, you do not need to add `IressToasterProvider` separately — it is already included.

You can use the `success`, `info` and `error` methods from the hook to trigger toasts in your application.

```tsx
import {
  IressButton,
  IressToasterProvider,
  useToaster,
} from '@iress-oss/ids-components';

const ToastWithTrigger = () => {
  const toaster = useToaster();

  return (
    <IressButton
      onClick={() =>
        toaster.error({
          heading: 'Error',
          content:
            'Connection failure. Longer text description should wrap and look like this. Try to limit to 3 lines or less.',
        })
      }
    >
      Show toast using provider
    </IressButton>
  );
};

export function SimpleToasterExample() {
  return (
    <IressToasterProvider container={document.body}>
      <ToastWithTrigger />
    </IressToasterProvider>
  );
}
```

#### Closing toasts via the provider

If you want to dismiss a toast programmatically, you can use the `close` method from the `useToaster` hook. This method takes a toast ID as an argument, which is returned when you create a toast using the `useToaster` hook.

```tsx
import {
  IressButton,
  IressInline,
  IressToasterProvider,
  useToaster,
} from '@iress-oss/ids-components';
import { useState } from 'react';

const ToastWithTrigger = () => {
  const toaster = useToaster();
  const [lastToastId, setLastToastId] = useState<string | null>(null);

  return (
    <IressInline gap="sm">
      <IressButton
        onClick={() => {
          const toastId = toaster.error({
            heading: 'Error',
            content:
              'Connection failure. Longer text description should wrap and look like this. Try to limit to 3 lines or less.',
            onClose: () => {
              setLastToastId(null);
            },
          });

          setLastToastId(toastId);
        }}
      >
        Show toast using provider
      </IressButton>
      {lastToastId && (
        <IressButton onClick={() => toaster.close(lastToastId)}>
          Close the last toast opened
        </IressButton>
      )}
    </IressInline>
  );
};

export function CloseToastViaProvider() {
  return (
    <IressToasterProvider container={document.body}>
      <ToastWithTrigger />
    </IressToasterProvider>
  );
}
```

#### Status

The toast offers three statuses that set a distinctive colour and icon. They can be set using the `status` prop.

```tsx
import {
  IressButton,
  IressInline,
  IressToasterProvider,
  useToaster,
} from '@iress-oss/ids-components';

const ToastWithTrigger = ({
  status,
}: {
  status: 'error' | 'success' | 'info';
}) => {
  const toaster = useToaster();

  return (
    <IressButton
      onClick={() =>
        toaster[status]({
          heading: `${status[0].toUpperCase() + status.slice(1)} toast`,
          content: `Hello, I am a ${status} toast`,
          actions: [
            { onClick: () => alert('Action clicked!'), children: 'Click me' },
          ],
        })
      }
    >
      {status}
    </IressButton>
  );
};

export function ToastStatuses() {
  return (
    <IressToasterProvider container={document.body}>
      <IressInline gap="sm">
        <ToastWithTrigger status="error" />
        <ToastWithTrigger status="info" />
        <ToastWithTrigger status="success" />
      </IressInline>
    </IressToasterProvider>
  );
}
```

#### Timeout

By default, toasts will time out after six seconds, after which they will animate out of view. This can be customised using the `timeout` prop when created using the `useToaster` hook.

Timeouts must be set in milliseconds; as an example, if you want a timeout of five seconds, set the timeout to 5000.

```tsx
import {
  IressButton,
  IressToasterProvider,
  useToaster,
} from '@iress-oss/ids-components';

const ToastWithTrigger = () => {
  const toaster = useToaster();

  return (
    <IressButton
      onClick={() =>
        toaster.success({
          content: 'This is a really quick toast',
          timeout: 1000,
        })
      }
    >
      1000ms timeout
    </IressButton>
  );
};

export function ToasterTimeout() {
  return (
    <IressToasterProvider container={document.body}>
      <ToastWithTrigger />
    </IressToasterProvider>
  );
}
```

#### Position

By default, the `IressToasterProvider`'s `position` is set to `top-end`, but there may be occasions when you need toasts to appear in a different part of the screen. This can be controlled with the `position` prop on the `IressToasterProvider` component, or as the first argument to `useToaster`. There are 6 positions to choose from.

**Note:** The toast position should be consistent based on context, so users can find them easily.

```tsx
import {
  IressButton,
  IressInline,
  IressPanel,
  IressStack,
  IressText,
  IressToasterProvider,
  type NewToast,
  useToaster,
} from '@iress-oss/ids-components';

const DEFAULT_TOAST: NewToast = {
  content: 'Message sent successfully',
  heading: 'Success',
  status: 'success',
};

const Toaster = () => {
  const topStart = useToaster('top-start');
  const topCenter = useToaster('top-center');
  const topEnd = useToaster('top-end');
  const bottomStart = useToaster('bottom-start');
  const bottomCenter = useToaster('bottom-center');
  const bottomEnd = useToaster('bottom-end');

  return (
    <div style={{ padding: '80px 150px' }}>
      <IressStack gap="md">
        <IressInline horizontalAlign="between" gap="sm">
          <IressButton onClick={() => topStart.success(DEFAULT_TOAST)}>
            top-start
          </IressButton>
          <IressButton onClick={() => topCenter.success(DEFAULT_TOAST)}>
            top-center
          </IressButton>
          <IressButton onClick={() => topEnd.success(DEFAULT_TOAST)}>
            top-end
          </IressButton>
        </IressInline>
        <IressPanel bg="transparent" p="lg">
          <IressText textAlign="center">Toaster positions</IressText>
        </IressPanel>
        <IressInline horizontalAlign="between">
          <IressButton onClick={() => bottomStart.success(DEFAULT_TOAST)}>
            bottom-start
          </IressButton>
          <IressButton onClick={() => bottomCenter.success(DEFAULT_TOAST)}>
            bottom-center
          </IressButton>
          <IressButton onClick={() => bottomEnd.success(DEFAULT_TOAST)}>
            bottom-end
          </IressButton>
        </IressInline>
      </IressStack>
    </div>
  );
};

export function ToasterPositionExamples() {
  return (
    <IressToasterProvider
      container={document.body}
      id="bottom-end"
      position="bottom-end"
    >
      <IressToasterProvider
        container={document.body}
        id="bottom-center"
        position="bottom-center"
      >
        <IressToasterProvider
          container={document.body}
          id="bottom-start"
          position="bottom-start"
        >
          <IressToasterProvider
            container={document.body}
            id="top-start"
            position="top-start"
          >
            <IressToasterProvider
              container={document.body}
              id="top-center"
              position="top-center"
            >
              <IressToasterProvider
                container={document.body}
                id="top-end"
                position="top-end"
              >
                <Toaster />
              </IressToasterProvider>
            </IressToasterProvider>
          </IressToasterProvider>
        </IressToasterProvider>
      </IressToasterProvider>
    </IressToasterProvider>
  );
}
```

### Testing

Query toast notifications by their text content:

```tsx
const toast = await screen.findByText('Changes saved');
expect(toast).toBeInTheDocument();
```

**Gotchas:**

- **Toasts appear asynchronously**: Always use `findByText` or `findByRole` (async) instead of `getByText`.
- **Dismissing toasts**: After clicking the dismiss button, use `waitForElementToBeRemoved` to wait for the exit animation:

  ```tsx
const toast = await screen.findByText('Changes saved');
const dismiss = screen.getByRole('button', { name: 'Dismiss' });
await user.click(dismiss);
await waitForElementToBeRemoved(toast);
```

- **Toast status icons**: Each toast has a status label accessible via `getByLabelText('success:')` (or `danger:`, `info:`, etc.).


#### Test selectors

| Part | Description | Recommended Query | Test ID |
|------|-------------|-------------------|---------|
| main | The visible toast list container (rendered inside the aria-live region) | — | `toaster` |
| toast | An individual toast notification within the Toaster | `getByRole('alert')` | `toast` |

---

### Storybook

Storybook provides an interactive playground for testing different prop combinations and viewing accessibility attributes.

[View in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-toaster--docs)

## Specifications

### Behaviour

| State | Behaviour |
|-------|-----------|
| Visible | Toast appears in the configured position with enter animation |
| Auto-dismiss | Toast animates out after timeout (default 6 seconds) |
| Manual dismiss | User clicks dismiss button; toast animates out immediately |
| Programmatic close | `close(id)` removes the toast by ID |
| Multiple toasts | Stack vertically in the configured position |

### Accessibility

**WCAG compliance:**

- **4.1.3 Status Messages** — Toasts are announced via `role="status"` (polite live region)
- **2.2.1 Timing Adjustable** — Timeout can be customised per toast; hover pauses the timer
- **1.4.1 Use of Color** — Status is communicated via icon and text, not colour alone

**Keyboard interaction:**

| Key | Action |
|-----|--------|
| `Tab` | Moves focus to the dismiss button within the toast |
| `Enter` / `Space` | Activates the dismiss button |

### Edge cases

- **No provider**: Using `useToaster` without `IressToasterProvider` in the tree throws an error
- **Multiple providers**: Only the nearest ancestor provider handles toasts
- **Many simultaneous toasts**: Stack vertically; consider limiting visible toasts in your application logic
- **Navigation during toast**: Toasts persist during client-side navigation within the provider scope

---

### Storybook

Storybook provides an interactive playground for testing different prop combinations and viewing accessibility attributes.

[View in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-toaster--docs)

---

# Toggle

> Renders a switch control for toggling between on and off states.

## Import

```tsx
import { IressToggle } from '@iress-oss/ids-components';
```

- [Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-toggle--docs)
- [Source](https://github.com/iress/design-system/tree/main/packages/components/src/components/Toggle)
- [Report issue](https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=toggle&title=[Toggle]+Bug:+)
- [Request feature](https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=toggle,enhancement&title=[Toggle]+Feature:+)

## Props

> Required props are **bold**.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| checked | `boolean` | — | If true, the toggle on. Please use this when are rendering the toggle in controlled mode, meaning it will not change unless you explicitly set the value using `onChange` and `checked`. |
| **children** | `ReactNode` | — | Provides the label for the Toggle. |
| defaultChecked | `boolean` | — | If true, the toggle will be initially rendered as off. Please use this when are rendering the toggle in uncontrolled mode, meaning the value will change automatically when the user interacts with the toggle. |
| disabled | `boolean` | — | If true, the toggle is disabled and cannot be interacted with. |
| hiddenLabel | `boolean` | — | Hides the label if true (label will still be read out by screen readers). |
| layout | `inline-between` , `inline-reverse`, `inline` , `stack`  | `inline` | Determines the layout of the label with respect to the control. |
| onChange | `((checked: boolean, event: MouseEvent<HTMLButtonElement, MouseEvent>) => void)` | — | Emitted when the checked state changes. |
| data-testid | `string` | — | The data-testid attribute is used to target elements in automated tests if no identifier is available. In some components it is propagated to child elements.  Notes: - Please use this prop sparingly and only when no other identifier is available, as per the guiding principles of Testing Library. - Only use this prop for your tests @see https://testing-library.com/docs/queries/bytestid |

📄 [Full type definition](../../dist/components/Toggle/Toggle.d.ts)

Also accepts all [styling props](../styling-props/overview.md) ([type definition](../../dist/interfaces.d.ts), [token values](../tokens/tokens-reference.md)).

Toggles allow users to turn things on or off. When toggled, the associated change happens straight away.

```tsx
<IressToggle layout="inline">Toggle</IressToggle>;
```

## Design

### When to use

- **Immediate effect settings**: WiFi on/off, dark mode, notifications
- **Binary preferences**: Any setting with exactly two mutually exclusive states
- **Standalone controls**: Settings that take effect instantly without a save action

### When not to use

- **Form submissions** — use a Checkbox instead; toggles don't submit values with forms
- **Multiple related options** — use a Checkbox group or Radio group
- **Actions that need confirmation** — use a Button with a confirmation dialog

### Do's and Don'ts

| ✅ Do | ❌ Don't |
|-------|----------|
| Use for immediate on/off changes | Use toggles inside forms that need submission |
| Always provide a label (visible or hidden) | Use a toggle without any label |
| Use `defaultChecked` for uncontrolled usage | Use toggles for actions that require a save step |

### Content guidelines

- **Labels**: Use sentence case, describe what will happen when on (e.g. "Show notifications")
- **State clarity**: The toggle's visual state should make it obvious whether the feature is on or off

### Related patterns

- [Checkbox](../components/checkbox.md) — for form inputs that submit values
- [Radio Group](../components/radio-group.md) — for mutually exclusive selections in forms

## Develop

### Quick Start

```tsx
import { IressToggle } from '@iress-oss/ids-components';

<IressToggle>Toggle</IressToggle>;
```

[View all props](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-toggle--docs#api-props)

### Usage

#### Labels

Toggles should always have a label, set via `children`.

```tsx
<IressToggle layout="inline">Toggle</IressToggle>;
```

#### Hidden labels

Use `hiddenLabel` to visually hide the label while keeping it accessible to screen readers.

```tsx
<IressToggle hiddenLabel layout="inline">
  Toggle
</IressToggle>;
```

#### Checked

Use `checked` for controlled state, or `defaultChecked` for uncontrolled.

```tsx
import { IressToggle } from '@iress-oss/ids-components';
import { useState } from 'react';

export function ControlledToggle() {
  const [isChecked, setIsChecked] = useState(true);

  return (
    <IressToggle checked={isChecked} onChange={() => setIsChecked(!isChecked)}>
      Controlled Toggle
    </IressToggle>
  );
}
```

#### Layout

The `layout` prop controls label position:

- `inline` (default)
- `inline-between` — label and control at opposite ends
- `inline-reverse` — label after the control
- `stack` — label above the control

```tsx
import {
  IressPanel,
  IressStack,
  IressText,
  IressToggle,
} from '@iress-oss/ids-components';

export function ToggleLayout() {
  return (
    <IressStack gap="lg">
      <IressText>
        <h3>inline</h3>
        <IressPanel>
          <IressToggle layout="inline">Toggle</IressToggle>
        </IressPanel>
      </IressText>
      <IressText>
        <h3>inline-between</h3>
        <IressPanel>
          <IressToggle layout="inline-between" defaultChecked>
            Toggle
          </IressToggle>
        </IressPanel>
      </IressText>
      <IressText>
        <h3>inline-reverse</h3>
        <IressPanel>
          <IressToggle layout="inline-reverse">Toggle</IressToggle>
        </IressPanel>
      </IressText>
      <IressText>
        <h3>stack</h3>
        <IressPanel>
          <IressToggle layout="stack" defaultChecked>
            Toggle
          </IressToggle>
        </IressPanel>
      </IressText>
    </IressStack>
  );
}
```

### Testing

Query the toggle by its `switch` role (not `checkbox`):

```tsx
const toggle = screen.getByRole('switch', { name: 'Dark mode' });
await user.click(toggle);
expect(toggle).toBeChecked();
```

[View test IDs](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-toggle--docs#testing)


#### Test selectors

| Part | Description | Recommended Query | Test ID |
|------|-------------|-------------------|---------|
| main | The root element of the toggle | `getByRole('switch', { name: '...' })` | `toggle` |
| label | The toggle label element | `getByText('...')` | `toggle__label` |
| button | The toggle switch button | — | `toggle__button__button` |

---

### Storybook

[View in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-toggle--docs)

## Specifications

### Behaviour

| State | Behaviour |
|-------|-----------|
| Unchecked | Toggle is in the off position |
| Checked | Toggle is in the on position; change takes effect immediately |
| Controlled | State driven by `checked` prop and `onChange` handler |
| Uncontrolled | Initial state set by `defaultChecked`; internal state management |

### Accessibility

**WCAG compliance:**

- **4.1.2 Name, Role, Value** — Uses `role="switch"` with `aria-checked` to communicate state
- **2.1.1 Keyboard** — Toggle is operable via keyboard
- **1.3.1 Info and Relationships** — Label is programmatically associated

**Keyboard interaction:**

| Key | Action |
|-----|--------|
| `Space` | Toggle the switch on/off |
| `Enter` | Toggle the switch on/off |
| `Tab` | Move focus to/from the toggle |

### Edge cases

- **No label**: Always provide a label; use `hiddenLabel` if it must be visually hidden
- **Inside forms**: Toggle does not participate in form submission — use Checkbox instead
- **Rapid toggling**: Each toggle fires `onChange` immediately; debounce in the handler if needed

---

# Tooltip

> Shows additional contextual information on hover or focus of a trigger element.

## Import

```tsx
import { IressTooltip } from '@iress-oss/ids-components';
```

- [Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-tooltip--docs)
- [Source](https://github.com/iress/design-system/tree/main/packages/components/src/components/Tooltip)
- [Report issue](https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=tooltip&title=[Tooltip]+Bug:+)
- [Request feature](https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=tooltip,enhancement&title=[Tooltip]+Feature:+)

## Props

> Required props are **bold**.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| align | `[FloatingUIAligns](../../dist/types.d.ts)` | `top` | Sets the alignment of the popover relative to the activator element. |
| **children** | `ReactNode` | — | The element to add a tooltip to. |
| container | `[FloatingUIContainer](../../dist/types.d.ts)` | — | The container element to render the tooltip into. Overrides the container set by `IressTooltipProvider`. |
| delay | `number` | `500` | Sets the tooltip display delay in milliseconds. |
| open | `boolean` | `false` | Only used for internal testing. |
| **tooltipText** | `string , string[]` | — | Sets the tooltip text. Can accept a string or an array of strings - if given an array, will output each string on a new line. |
| data-testid | `string` | — | The data-testid attribute is used to target elements in automated tests if no identifier is available. In some components it is propagated to child elements.  Notes: - Please use this prop sparingly and only when no other identifier is available, as per the guiding principles of Testing Library. - Only use this prop for your tests @see https://testing-library.com/docs/queries/bytestid |

📄 [Full type definition](../../dist/components/Tooltip/Tooltip.d.ts)

Also accepts all [styling props](../styling-props/overview.md) ([type definition](../../dist/interfaces.d.ts), [token values](../tokens/tokens-reference.md)).

A component that shows concise, informative text about an element when focussed upon, hovered over or on a long touch.

```tsx
<IressStyled pt="spacing.6">
  <IressInline gap="md">
    <IressTooltip tooltipText="Single line Hello! This is a really long tooltip to try and see if it goes behind the scrollbar">
      <IressButton>Single line</IressButton>
    </IressTooltip>
    <IressTooltip tooltipText={['This tooltip', 'has multiple lines']}>
      <IressButton>Multi line</IressButton>
    </IressTooltip>
  </IressInline>
</IressStyled>;
```

## Design

### When to use

- **Icon-only buttons**: Provide a text label for buttons that only show an icon
- **Truncated content**: Show the full text of a truncated label
- **Supplementary info**: Add brief context to an element without cluttering the UI

### When not to use

- **Help text for form fields** — use hint text on the Field component instead
- **Rich or interactive content** — use a Popover or Modal
- **Critical information** — tooltips are not immediately visible; use inline text

### Do's and Don'ts

| ✅ Do | ❌ Don't |
|-------|----------|
| Keep tooltip text concise (a few words) | Put paragraph-length content in a tooltip |
| Only attach tooltips to focusable elements | Attach tooltips to non-focusable elements |
| Remove any `title` attribute from the trigger | Leave `title` attributes that duplicate or conflict with the tooltip |
| Use `align` to avoid obscuring content | Let tooltips cover interactive elements |

### Content guidelines

- **Text**: Plain text only — no HTML, links, or formatting
- **Length**: A few words to a short sentence; use a Popover for anything longer
- **Multi-line**: Pass an array of strings for line breaks

### Related patterns

- [Popover](../components/popover.md) — for rich, interactive content on hover/click
- [Field](../components/field.md) — use `hint` prop instead of tooltips for form help text

## Develop

### Quick Start

```tsx
import { IressTooltip, IressButton } from '@iress-oss/ids-components';

<IressTooltip tooltipText="Save your changes">
  <IressButton>Save</IressButton>
</IressTooltip>;
```

[View all props](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-tooltip--docs#api-props)

### Usage

#### Tooltip text

The `tooltipText` prop sets the content. Pass a string or an array of strings for multiple lines.

```tsx
<IressStyled pt="spacing.6">
  <IressInline gap="md">
    <IressTooltip tooltipText="Single line Hello! This is a really long tooltip to try and see if it goes behind the scrollbar">
      <IressButton>Single line</IressButton>
    </IressTooltip>
    <IressTooltip tooltipText={['This tooltip', 'has multiple lines']}>
      <IressButton>Multi line</IressButton>
    </IressTooltip>
  </IressInline>
</IressStyled>;
```

#### Align

The tooltip can be aligned in 12 positions relative to the activator. Position changes dynamically to avoid overflow.

```tsx
<div style={{ padding: '80px 150px' }}>
  <IressStack gap="md">
    <IressInline horizontalAlign="center" gap="sm">
      <IressTooltip tooltipText="Hello!" align="top-start">
        <IressButton>Top Start</IressButton>
      </IressTooltip>
      <IressTooltip tooltipText="Hello!" align="top">
        <IressButton>Top</IressButton>
      </IressTooltip>
      <IressTooltip tooltipText="Hello!" align="top-end">
        <IressButton>Top End</IressButton>
      </IressTooltip>
    </IressInline>
    <IressInline horizontalAlign="between">
      <IressStack gap="sm">
        <IressInline horizontalAlign="left">
          <IressTooltip tooltipText="Hello!" align="left-start">
            <IressButton>Left Start</IressButton>
          </IressTooltip>
        </IressInline>
        <IressInline horizontalAlign="left">
          <IressTooltip tooltipText="Hello!" align="left">
            <IressButton>Left</IressButton>
          </IressTooltip>
        </IressInline>
        <IressInline horizontalAlign="left">
          <IressTooltip tooltipText="Hello!" align="left-end">
            <IressButton>Left End</IressButton>
          </IressTooltip>
        </IressInline>
      </IressStack>
      <IressStack gap="sm">
        <IressInline horizontalAlign="right">
          <IressTooltip tooltipText="Hello!" align="right-start">
            <IressButton>Right Start</IressButton>
          </IressTooltip>
        </IressInline>
        <IressInline horizontalAlign="right">
          <IressTooltip tooltipText="Hello!" align="right">
            <IressButton>Right</IressButton>
          </IressTooltip>
        </IressInline>
        <IressInline horizontalAlign="right">
          <IressTooltip tooltipText="Hello!" align="right-end">
            <IressButton>Right End</IressButton>
          </IressTooltip>
        </IressInline>
      </IressStack>
    </IressInline>
    <IressInline horizontalAlign="center" gap="sm">
      <IressTooltip tooltipText="Hello!" align="bottom-start">
        <IressButton>Bottom Start</IressButton>
      </IressTooltip>
      <IressTooltip tooltipText="Hello!" align="bottom">
        <IressButton>Bottom</IressButton>
      </IressTooltip>
      <IressTooltip tooltipText="Hello!" align="bottom-end">
        <IressButton>Bottom End</IressButton>
      </IressTooltip>
    </IressInline>
  </IressStack>
</div>;
```

#### Delay

The `delay` prop sets milliseconds before the tooltip appears after `mouseEnter`.

```tsx
<IressStyled pt="spacing.6">
  <IressInline horizontalAlign="center" gap="sm">
    <IressTooltip tooltipText="Hello!" delay={0}>
      <IressButton>0ms (no delay)</IressButton>
    </IressTooltip>
    <IressTooltip tooltipText="Hello!">
      <IressButton>500ms (default)</IressButton>
    </IressTooltip>

    <IressTooltip tooltipText="Hello!" delay={2000}>
      <IressButton>2000ms</IressButton>
    </IressTooltip>
  </IressInline>
</IressStyled>;
```

### Testing

Hover over the trigger to show the tooltip, then query the content:

```tsx
const trigger = screen.getByText('Hover me');
await user.hover(trigger);
expect(screen.getByRole('tooltip')).toHaveTextContent('Tooltip text');
```

[View test IDs](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-tooltip--docs#testing)


#### Test selectors

| Part | Description | Recommended Query | Test ID |
|------|-------------|-------------------|---------|
| main | The root wrapper element (contains activator and tooltip) | — | `tooltip` |
| activator | The tooltip trigger element | — | `tooltip__activator` |
| tooltip text | The floating tooltip content (visible on hover/focus) | `getByRole('tooltip')` | `tooltip__tooltip-text` |

---

### Storybook

[View in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-tooltip--docs)

## Specifications

### Behaviour

| State | Behaviour |
|-------|-----------|
| Hidden | Tooltip is not rendered in the DOM |
| Visible (hover) | Shows on `mouseEnter`, hides 500ms after `mouseLeave` |
| Visible (focus) | Shows on focus, hides immediately on blur |
| Visible (touch) | Shows on long press, hides on tap elsewhere |
| Pointer on tooltip | Tooltip remains visible while pointer is over it |

### Accessibility

**WCAG compliance:**

- **1.4.13 Content on Hover or Focus** — Tooltip is dismissable, hoverable, and persistent per WCAG requirements
- **4.1.2 Name, Role, Value** — Uses `role="tooltip"` and `aria-describedby` linking

**Keyboard interaction:**

| Key | Action |
|-----|--------|
| `Tab` | Focus the activator, showing the tooltip |
| `Escape` | Dismiss the tooltip while it is visible |
| `Tab` (away) | Blur the activator, hiding the tooltip |

### Edge cases

- **Existing title attribute**: Not suppressed — remove it manually to avoid duplicate text
- **Non-focusable activator**: Tooltip won't show on keyboard; always use a focusable trigger
- **Overflow positioning**: Tooltip auto-repositions to stay within the viewport
- **Very long text**: Text wraps at the tooltip's max-width

---

# ValidationMessage

> Displays a validation error or helper message associated with a form field.

## Import

```tsx
import { IressValidationMessage } from '@iress-oss/ids-components';
```

- [Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-validation-message--docs)
- [Source](https://github.com/iress/design-system/tree/main/packages/components/src/components/ValidationMessage)
- [Report issue](https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=validation-message&title=[ValidationMessage]+Bug:+)
- [Request feature](https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=validation-message,enhancement&title=[ValidationMessage]+Feature:+)

## Props

> Required props are **bold**.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| element | `a`, `div`  | — | The HTML element that should be rendered. |
| data-testid | `string` | — | The data-testid attribute is used to target elements in automated tests if no identifier is available. In some components it is propagated to child elements.  Notes: - Please use this prop sparingly and only when no other identifier is available, as per the guiding principles of Testing Library. - Only use this prop for your tests @see https://testing-library.com/docs/queries/bytestid |
| linkToTarget | `string` | — | ID of element the message is describing. If nothing is supplied a link will not render. |
| prefix | `ReactNode` | — | Prefix to the validation message. Will be `status` prop if nothing is provided. |
| status | `danger` , `info` , `success`, `warning`  | `danger` | Whether message is danger, warning, success or info. **Note**: danger is translated to Error when used as the prefix. |
| visiblePrefix | `boolean` | `false` | If set to true, the prefix will be visually displayed (default is only available to screen readers) |

📄 [Full type definition](../../dist/components/ValidationMessage/ValidationMessage.d.ts)

Also accepts all [styling props](../styling-props/overview.md) ([type definition](../../dist/interfaces.d.ts), [token values](../tokens/tokens-reference.md)).

A validation message is used to inform the user of the status of a form input. If there are multiple messages, they can be combined using the IressValidationSummary component.

```tsx
<IressStack>
  <IressValidationMessage status="info">
    Something you should know.
  </IressValidationMessage>
  <IressValidationMessage status="danger">
    Something is wrong.
  </IressValidationMessage>
  <IressValidationMessage status="warning">
    Something could go wrong.
  </IressValidationMessage>
  <IressValidationMessage status="success">
    Something went right.
  </IressValidationMessage>
</IressStack>;
```

## Design

### When to use

- **Field-level feedback**: Show errors, warnings, or success messages next to an input
- **Form validation**: Indicate which fields need attention after submission
- **Validation summary**: Combine multiple messages at the top of a form

### When not to use

- **Page-level messages** — use [Alert](../components/alert.md) for broader status messages
- **Transient confirmations** — use [Toaster](../components/toaster.md) for brief success messages

### Content guidelines

- Be specific about what went wrong and how to fix it (e.g. "Enter a valid email address" not "Invalid input")
- Use sentence case
- Keep messages concise — one sentence maximum

### Related patterns

- [Field](../components/field.md) — wraps input + label + validation message together
- [Form](../patterns/form.md) — full form patterns with validation
- [Alert](../components/alert.md) — for page-level status messages

## Develop

### Quick Start

```tsx
import { IressValidationMessage } from '@iress-oss/ids-components';

<IressValidationMessage>This field is required</IressValidationMessage>;
```

[View all props](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-validationmessage--docs#api-props)

### Usage

#### Status

Validation status is controlled by the status prop. It defaults to `error`.

```tsx
<IressStack>
  <IressValidationMessage status="info">
    Something you should know.
  </IressValidationMessage>
  <IressValidationMessage status="danger">
    Something is wrong.
  </IressValidationMessage>
  <IressValidationMessage status="warning">
    Something could go wrong.
  </IressValidationMessage>
  <IressValidationMessage status="success">
    Something went right.
  </IressValidationMessage>
</IressStack>;
```

#### Prefix

You can add a prefix to the message. If not provided, it uses the `status` prop to determine the prefix.

It is hidden by default, but can be shown by setting the `visiblePrefix` prop to `true`.

```tsx
<IressStack>
  <IressValidationMessage prefix="Prefix: " visiblePrefix status="info">
    Something you should know.
  </IressValidationMessage>
  <IressValidationMessage prefix="Prefix: " visiblePrefix status="danger">
    Something is wrong.
  </IressValidationMessage>
  <IressValidationMessage prefix="Prefix: " visiblePrefix status="warning">
    Something could go wrong.
  </IressValidationMessage>
  <IressValidationMessage prefix="Prefix: " visiblePrefix status="success">
    Something went right.
  </IressValidationMessage>
</IressStack>;
```

#### Link to target

You can use the `linkToTarget` prop to link the message to a specific target in the DOM. This is useful to take the user to a specific part of the form when they click on the message.

```tsx
<IressStack gap="md">
  <IressStack>
    <IressValidationMessage
      linkToTarget="input"
      status="info"
      linkToTarget="input"
    >
      Something you should know.
    </IressValidationMessage>
    <IressValidationMessage
      linkToTarget="input"
      status="danger"
      linkToTarget="input"
    >
      Something is wrong.
    </IressValidationMessage>
    <IressValidationMessage
      linkToTarget="input"
      status="warning"
      linkToTarget="input"
    >
      Something could go wrong.
    </IressValidationMessage>
    <IressValidationMessage
      linkToTarget="input"
      status="success"
      linkToTarget="input"
    >
      Something went right.
    </IressValidationMessage>
  </IressStack>
  <IressDivider />
  <IressInput id="input" />
</IressStack>;
```

#### ValidationSummary

Messages can be passed programmatically as a `ValidationMessageObj[]` using the `messages` prop of the `IressValidationSummary` component.

```tsx
<IressValidationSummary
  messages={[
    {
      message: 'Something you should know.',
      status: 'info',
    },
    {
      message: 'Something is wrong.',
      status: 'danger',
    },
    {
      message: 'Something could go wrong.',
      status: 'warning',
    },
    {
      message: 'Something went right.',
      status: 'success',
    },
  ]}
/>;
```

### Testing

Query validation messages by their text content or `data-testid`:

```tsx
const error = screen.getByText('This field is required');
```

[View test IDs](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-validationmessage--docs#testing)


#### Test selectors

| Part | Description | Recommended Query | Test ID |
|------|-------------|-------------------|---------|
| main | The root element of the validation message | `getByText('...')` | `validationmessage` |
| error | An individual error message | `getByRole('link')` | `validationmessage__error` |

---

### Storybook

[View in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-validationmessage--docs)

## Specifications

### Behaviour

| State | Behaviour |
|-------|-----------|
| Error (default) | Displays error styling with danger colour |
| Warning | Displays warning styling |
| Success | Displays success styling |
| Link to target | Message becomes a clickable link to the target element |

### Accessibility

- Messages are associated with their input via `aria-describedby` (when used inside `IressField`)
- **WCAG 3.3.1 Error Identification** — errors are identified and described in text
- Status is conveyed via text prefix, not colour alone