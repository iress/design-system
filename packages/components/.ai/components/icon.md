# 
> **Component:** `import { IressIcon } from '@iress-oss/ids-components'`
> **Storybook:** [ in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components_components-icon--docs)```tsx
```

## Quick Start

```tsx
<IressIcon name="home" />
```

## Installation

### Material Symbols

From version 6, the `IressIcon` component supports Material Symbols icons from Google as this is the new icon library being used in new Iress designs.

#### Option 1: Automatic loading with `IressProvider` (recommended)

If you are already using the `IressProvider` component in your application, no further action is required as the Material Symbols font will be automatically loaded for you as it contains the `IressIconProvider` component. The same applies if you are using `IressShadow`, which includes `IressProvider` internally.

```tsx
<IressProvider>
  <App />
</IressProvider>;
```

<details>
<summary>Shadow DOM (Microfrontends)</summary>

If you are using Microfrontends or Web Components that use Shadow DOM, you need to ensure that the Material Symbols font is loaded in the parent application as well as the Microfrontend or Web Component. This is because `@font-face` declarations are not supported inside the Shadow DOM.

The `IressProvider` component takes care of this for you when you use it with the `container` prop, which accepts a `HTMLElement` or `Ref<HTMLElement>`.

</details>

#### Option 2: Using the `IressIconProvider`

For more simpler applications, or if you need to customise the icon provider independently, you can use the `IressIconProvider` directly.

> **Note:** If you are already using `IressProvider` or `IressShadow`, you do not need to add `IressIconProvider` separately — it is already included.

```tsx
const [showMoreIcons, setShowMoreIcons] = useState(false);
    const [showEvenMore, setShowEvenMore] = useState(false);

    return (
      <IressIconProvider>
        <IressText element="h3" textStyle="typography.heading.4" mb="spacing.4">
          Icons with Auto-Subsetting Enabled
        </IressText>
        <IressText mb="spacing.4" color="muted">
          Initial set: 6 icons (~5-10KB from Google Fonts CDN vs 100KB full
          font)
        </IressText>
        <IressInline gap="md" mb="spacing.6">
          <IressText textAlign="center">
            <IressIcon name="home" textStyle="typography.heading.2" />
            <br />
            home
          </IressText>
          <IressText textAlign="center">
            <IressIcon name="search" textStyle="typography.heading.2" />
            <br />
            search
          </IressText>
          <IressText textAlign="center">
            <IressIcon name="settings" textStyle="typography.heading.2" />
            <br />
            settings
          </IressText>
          <IressText textAlign="center">
            <IressIcon name="star" filled textStyle="typography.heading.2" />
            <br />
            star (filled)
          </IressText>
          <IressText textAlign="center">
            <IressIcon name="delete" textStyle="typography.heading.2" />
            <br />
            delete
          </IressText>
          <IressText textAlign="center">
            <IressIcon name="check" textStyle="typography.heading.2" />
            <br />
            check
          </IressText>
        </IressInline>

        {!showMoreIcons && (
          <IressButton
            onClick={() => setShowMoreIcons(true)}
            style={{
              padding: '8px 16px',
              marginBottom: '16px',
              cursor: 'pointer',
            }}
          >
            Load More Icons (Set 2)
          </IressButton>
        )}

        {showMoreIcons && (
          <>
            <IressText
              element="h3"
              textStyle="typography.heading.4"
              mb="spacing.4"
            >
              Additional Icons (Set 2)
            </IressText>
            <IressText mb="spacing.4" color="muted">
              Watch: Previous icons stay visible while these load!
            </IressText>
            <IressInline gap="md" mb="spacing.6">
              <IressText textAlign="center">
                <IressIcon name="folder" textStyle="typography.heading.2" />
                <br />
                folder
              </IressText>
              <IressText textAlign="center">
                <IressIcon name="mail" textStyle="typography.heading.2" />
                <br />
                mail
              </IressText>
              <IressText textAlign="center">
                <IressIcon
                  name="notifications"
                  textStyle="typography.heading.2"
                />
                <br />
                notifications
              </IressText>
              <IressText textAlign="center">
                <IressIcon
                  name="calendar_today"
                  textStyle="typography.heading.2"
                />
                <br />
                calendar_today
              </IressText>
            </IressInline>
          </>
        )}

        {showMoreIcons && !showEvenMore && (
          <IressButton
            onClick={() => setShowEvenMore(true)}
            style={{
              padding: '8px 16px',
              marginBottom: '16px',
              cursor: 'pointer',
            }}
          >
            Load Even More Icons (Set 3)
          </IressButton>
        )}

        {showEvenMore && (
          <>
            <IressText
              element="h3"
              textStyle="typography.heading.4"
              mb="spacing.4"
            >
              Even More Icons (Set 3)
            </IressText>
            <IressText mb="spacing.4" color="muted">
              All previous icons remain visible during this transition too!
            </IressText>
            <IressInline gap="md">
              <IressText textAlign="center">
                <IressIcon name="download" textStyle="typography.heading.2" />
                <br />
                download
              </IressText>
              <IressText textAlign="center">
                <IressIcon name="upload" textStyle="typography.heading.2" />
                <br />
                upload
              </IressText>
              <IressText textAlign="center">
                <IressIcon name="share" textStyle="typography.heading.2" />
                <br />
                share
              </IressText>
              <IressText textAlign="center">
                <IressIcon name="print" textStyle="typography.heading.2" />
                <br />
                print
              </IressText>
            </IressInline>
          </>
        )}
      </IressIconProvider>
    );
```

[View "IconProvider" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_components-provider--icon-provider)

#### Option 3: Manual font loading

If you prefer to manually load the Material Symbols font, you can add the following `<link />` tag to the `<head />` of your application:

```html
<link
  href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,300,0..1,0"
  rel="stylesheet"
/>
```

### Font Awesome

> [!WARNING]
> **Deprecation Notice**
>
> The Font Awesome icon library will be removed in a future release. Please
>   migrate to Material Symbols as soon as possible.

If you are planning to include the `<IressIcon />` component in your application, you need to include the Font Awesome CSS.

The easiest way to import the Font Awesome CSS is to use the `combined.css` file and add it to the `<head />` if your application. This file includes both the [Pro Light](https://fontawesome.com/v5/search?o=r&s=light) and [Brand](https://fontawesome.com/v5/search?o=r&f=brands) icon sets.

```html
<link
  href="https://cdn.iress.com/icons/5.15.4/css/combined.min.css"
  rel="stylesheet"
/>
```

<details>
<summary>Shadow DOM (Microfrontends)</summary>

If you are using Microfrontends or Web Components that use Shadow DOM, you need to ensure that the Font Awesome CSS is loaded in the parent application as well as the Microfrontend or Web Component. This is because styles are not inherited inside the Shadow DOM.

The easiest way to do this is to use the `IressIconProvider` component with the `container` prop.

```tsx
<IressIconProvider type="fontawesome" container={shadowRoot}>
  <App />
</IressIconProvider>;
```

</details>

#### Making Font Awesome icons the default

From version 6, the default icon type is Material Symbols. If you want to make Font Awesome the default icon type, you can wrap your application in the `IressIconProvider` component.

```tsx
// Export a version of IressIcon that uses Font Awesome by default for typing
export const IressIcon = Icon<'fontawesome'>;

<IressIconProvider type="fontawesome">
  <App />
</IressIconProvider>;
```

## Usage

### `name`

The `name` prop controls which icon is shown. You can use either Material Symbols or Font Awesome icons.

It should be automatically inferred based on the `type` prop of `IressIcon`.

### Screen Reader Text

By default icons are hidden from screen readers. The `screenreaderText` prop makes icons visible to screen readers users, providing a description of the icon.

If you use an icon to improve the visual appeal of content, for example by replacing the default list icons with tick marks when listing product features, you don't need to add any screen reader text.

If you use an icon to convey meaning, for example using an icon as the only content inside a button, you do need to supply a value for the `screenreaderText`; if you don't the button meaning will be completely lost for screen reader users.

```tsx
<IressIcon screenreaderText="Home" />
```

[View "ScreenReaderText" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_components-icon--screen-reader-text)

### Filled

The `filled` prop allows you to use a filled version of the icon, usually to indicate an active state.

```tsx
<IressInline gap="md">
<IressText textAlign="center">
<IressIcon textStyle="typography.heading.1" />
<br />
(default)
</IressText>
<IressText textAlign="center">
<IressIcon filled textStyle="typography.heading.1" />
<br />
filled
</IressText>
</IressInline>
```

[View "Filled" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_components-icon--filled)

---

## Reference

This is a list of all the icons available in the Iress Design System (we only list the Material Symbols icons here as Font Awesome is no longer supported).

It is a very basic search tool, so if you can't find the icon you are looking for, please refer to the [Material Symbols documentation](https://fonts.google.com/icons?icon.style=Rounded&icon.set=Material+Symbols).

```tsx
const [query, setQuery] = useState('');
    const [showFilled, setShowFilled] = useState(false);
    const [showAllIcons, setShowAllIcons] = useState(false);
    const [allIcons, setAllIcons] = useState<LabelValueMeta[]>([]);
    const [loading, setLoading] = useState(true);
    const [copiedIcon, setCopiedIcon] = useState<string | null>(null);

    // Load icons on mount
    React.useEffect(() => {
      getMaterialSymbolsListCached()
        .then((symbols) => {
          const iconData: LabelValueMeta[] = symbols.map((name) => ({
            label: name,
            value: name,
          }));
          setAllIcons(iconData);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Failed to load Material Symbols:', error);
          setLoading(false);
        });
    }, []);

    const {
      debouncedQuery,
      loading: searching,
      results,
    } = useAutocompleteSearch({
      debounceThreshold: 0,
      initialOptions: allIcons,
      options: allIcons,
      query,
    });

    const handleCopyIconName = (iconName: string) => {
      void navigator.clipboard.writeText(iconName);
      setCopiedIcon(iconName);
      setTimeout(() => setCopiedIcon(null), 2000);
    };

    const columns = useMemo(
      () => [
        {
          key: 'value',
          label: 'Preview',
          width: '80px',
          format: (name: MaterialSymbol) => (
            <IressIcon
              name={name}
              filled={showFilled}
              textStyle="typography.heading.3"
            />
          ),
        },
        {
          key: debouncedQuery ? 'formattedLabel' : 'label',
          label: 'Name (click to copy)',
          format: (name: MaterialSymbol) => {
            if (copiedIcon === name) {
              return <IressTag>✓ Copied!</IressTag>;
            }

            return (
              <IressTag onClick={() => handleCopyIconName(name)}>
                {name}
              </IressTag>
            );
          },
        },
      ],
      [showFilled, copiedIcon, debouncedQuery],
    );

    const displayedResults = useMemo(() => {
      // If searching or showing all icons, display full results
      if (showAllIcons) {
        return results;
      }
      // Otherwise, limit to first 100 icons
      return results.slice(0, 100);
    }, [results, showAllIcons]);

    const caption = useMemo(() => {
      if (loading) return 'Loading icons...';
      if (searching) return 'Searching...';

      let append = 'total';

      if (debouncedQuery) {
        append = `matching "${debouncedQuery}"`;
      }

      if (!showAllIcons) {
        if (results.length < 100) {
          return `Material Symbols (${results.length} ${append})`;
        }

        return `Material Symbols (showing first 100 of ${results.length} ${append})`;
      }

      return `Material Symbols (${results.length} ${append})`;
    }, [loading, searching, debouncedQuery, results.length, showAllIcons]);

    return (
      <IressIconProvider noSubsetting>
        <IressStack gap="xs">
          <IressStack gap="sm">
            <IressInput
              clearable
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onClear={() => setQuery('')}
              placeholder="Search by name (e.g., home, arrow, settings)..."
              type="search"
              prepend={<IressIcon name="search" />}
              loading={searching || loading}
              variant="search"
            />
            <IressInline
              gap="md"
              horizontalAlign="between"
              verticalAlign="middle"
            >
              <IressText color="muted">
                Click any icon name to copy it to clipboard
              </IressText>
              <IressInline gap="md" verticalAlign="middle">
                <IressToggle checked={showFilled} onChange={setShowFilled}>
                  Show filled variant
                </IressToggle>
                <IressToggle checked={showAllIcons} onChange={setShowAllIcons}>
                  Show all icons{' '}
                  <IressTooltip tooltipText="Enable to use browser search (Ctrl+F/Cmd+F) for easier browsing">
                    <IressButton mode="muted">
                      <IressIcon name="info-circle" />
                    </IressButton>
                  </IressTooltip>
                </IressToggle>
              </IressInline>
            </IressInline>
          </IressStack>

          <IressTable
            caption={caption}
            columns={columns}
            rows={displayedResults}
            empty={loading ? 'Loading icons...' : 'No icons found'}
            scope="col"
            mb="none"
          />
        </IressStack>
      </IressIconProvider>
    );
```

[View "Reference" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_components-icon--reference)

---

## Examples

### Size

The `size` prop has been removed. It will now inherit the size of the parent component.

For larger icons, it is recommended to use `IressImage` with stylised illustrations.

### Mode

Mode has been removed. Please use the `color` prop instead.

<div>
  [Learn more](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components_styling-props-colour--docs#color)
</div>

### Flip

The `flip` prop can be set to horizontal, vertical or both.

```tsx
<IressInline gap="md">
<IressStack horizontalAlign="center">
<IressIcon />
<IressText>(default)</IressText>
</IressStack>
<IressStack horizontalAlign="center">
<IressIcon flip="horizontal" />
<IressText>horizontal</IressText>
</IressStack>
<IressStack horizontalAlign="center">
<IressIcon flip="vertical" />
<IressText>vertical</IressText>
</IressStack>
<IressStack horizontalAlign="center">
<IressIcon flip="both" />
<IressText>both</IressText>
</IressStack>
</IressInline>
```

[View "Flip" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_components-icon--flip)

### Rotate

The `rotate` prop can be set to 90, 180 or 270 degrees.

```tsx
<IressInline gap="md">
<IressText textAlign="center">
<IressIcon />
<br />
(default)
</IressText>
<IressText textAlign="center">
<IressIcon rotate={90} />
<br />
90
</IressText>
<IressText textAlign="center">
<IressIcon rotate={180} />
<br />
180
</IressText>
<IressText textAlign="center">
<IressIcon rotate={270} />
<br />
270
</IressText>
</IressInline>
```

[View "Rotate" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_components-icon--rotate)

### Spin

The `spin` prop can be set to half (fastest), 1, 2 or 3 (slowest) to control the speed of the icon spin animation, useful for loading spinners.

```tsx
<IressInline gap="md">
<IressText>
<IressIcon spin="half" /> half
</IressText>
<IressText>
<IressIcon spin={1} /> 1
</IressText>
<IressText>
<IressIcon spin={2} /> 2
</IressText>
<IressText>
<IressIcon spin={3} /> 3
</IressText>
</IressInline>
```

[View "Spin" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_components-icon--spin)

### External link

Icons now inherit the size of the parent component. This means you can use them inside buttons, links and other components without needing to set a size.

```tsx
<IressLink
href="https://www.iress.com/"
target="_blank"
rel="noreferrer"
append={<IressIcon />}
>
Go to this link
</IressLink>
```

[View "ExternalLink" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_components-icon--external-link)

## Migrating from Font Awesome

To help with migrating, we have mapped some common Font Awesome icons to their Material Symbols equivalents.

As of version 6, these names will automatically be mapped when using the `IressIcon` component with the default `type` of `material`. However, we strongly recommend you change them to the material equivalent as soon as possible as the automatic mapping will be removed in a future release.

```tsx
<IressTable
{...(args as object)}
caption="Font Awesome to Material Symbols Migration Reference"
columns={[
{
key: 'fontAwesome',
label: 'Font Awesome',
format: (icon: never) => (
<IressText>
<IressIcon type="fontawesome" name={icon} /> ({icon})
</IressText>
),
},
{
key: 'materialSymbols',
label: 'Material Symbols',
format: (icon: never) => (
<IressText>
<IressIcon name={icon} /> ({icon})
</IressText>
),
},
]}
rows={Object.entries(FA_TO_MATERIAL_MAP).map(
([fontAwesome, materialSymbols]) => ({
fontAwesome,
materialSymbols,
}),
)}
scope="col"
/>
```

[View "FontAwesomeToMaterialMigration" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_components-icon--font-awesome-to-material-migration)

## Testing

Query icons by their accessible name via `screenreaderText`:

```tsx
const icon = screen.getByRole('img', { name: 'Close' });
```

Decorative icons (without `screenreaderText`) are hidden from the accessibility
tree and should not be queried directly.

---

[View in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components_components-icon--docs)
