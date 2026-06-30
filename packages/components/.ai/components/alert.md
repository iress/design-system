# Alert

> Communicates important information inline with page content, such as validation errors, warnings, or status messages.

## Import

```tsx
import { IressAlert } from '@iress-oss/ids-components';
```

- [Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-alert--docs)
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
| onClose | `((e?: MouseEvent<HTMLButtonElement, MouseEvent>) => void)` | — | Icon to display in the alert. If set to `false`, no icon will be displayed. If not provided, the icon will be determined by the `status` prop. |
| status | `danger` , `info` , `neutral`, `success` , `warning`  | `info` | Alert type - danger, info, success or warning. |
| variant | `full-width`, `sidebar`  | — | Variants of the alert, allowing it to be styled differently based on where its used in the application. - Sidebar: The icon will be aligned to the heading, and the text will appear below the icon. - Full-width: The border will be removed, except for the bottom border. |
| data-testid | `string` | — | The data-testid attribute is used to target elements in automated tests if no identifier is available. In some components it is propagated to child elements.  Notes: - Please use this prop sparingly and only when no other identifier is available, as per the guiding principles of Testing Library. - Only use this prop for your tests @see https://testing-library.com/docs/queries/bytestid |

📄 [Full type definition](../../dist/components/Alert/Alert.d.ts)

Also accepts all [styling props](../styling-props/overview.md) (spacing, colour, layout, typography, radius).

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