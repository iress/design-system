# Figma Component → IDS Component Mapping

## Auto-Layout → Layout Components

| Figma Property           | IDS Component                       | Notes                               |
| ------------------------ | ----------------------------------- | ----------------------------------- |
| Auto-layout (vertical)   | `IressStack`                        | Default direction is vertical       |
| Auto-layout (horizontal) | `IressInline`                       | Horizontal flow with wrapping       |
| Auto-layout gap          | `gap` prop                          | Map px to spacing token (see below) |
| Auto-layout padding      | `p`, `px`, `py` props               | Map px to spacing token             |
| Auto-layout alignment    | `horizontalAlign` / `verticalAlign` | Maps to start, center, end          |
| Grid layout              | `IressRow` + `IressCol`             | Use responsive `span` prop (see below) |

## Component Instances

| Figma Component    | IDS Component                                | Key Props                  |
| ------------------ | -------------------------------------------- | -------------------------- |
| Button / Primary   | `IressButton mode="primary"`                 |                            |
| Button / Secondary | `IressButton mode="secondary"`               |                            |
| Button / Tertiary  | `IressButton mode="tertiary"`                |                            |
| Button / Muted     | `IressButton mode="muted"`                   |                            |
| Button / Danger    | `IressButton mode="primary" status="danger"` |                            |
| Button / Icon Only | `IressButton icon="..." mode="muted"`        | Set icon name              |
| Input / Text       | `IressField` + `IressInput`                  | label, placeholder         |
| Input / Currency   | `IressField` + `IressInputCurrency`          | label                      |
| Select / Dropdown  | `IressField` + `IressSelect`                 | label, options             |
| Checkbox           | `IressCheckbox`                              | `children` for label       |
| Checkbox Group     | `IressCheckboxGroup` + `IressCheckbox`s      | Wrap in `IressField` for label |
| Radio Group        | `IressRadioGroup` + `IressRadio`s            | Wrap in `IressField` for label |
| Toggle             | `IressToggle`                                | `children` for label       |
| Card               | `IressCard`                                  | `heading`, `footer` props; `children` for body |
| Panel              | `IressPanel`                                 |                            |
| Alert / Success    | `IressAlert status="success"`                |                            |
| Alert / Danger     | `IressAlert status="danger"`                 |                            |
| Alert / Warning    | `IressAlert status="warning"`                |                            |
| Alert / Info       | `IressAlert status="info"`                   |                            |
| Modal              | `IressModal`                                 |                            |
| Modal / Danger     | `IressModal status="danger"`                 | actions, size sm/md only   |
| Modal / Success    | `IressModal status="success"`                | actions, size sm/md only   |
| Modal / Warning    | `IressModal status="warning"`                | actions, size sm/md only   |
| Slideout / Drawer  | `IressSlideout`                              |                            |
| Tabs               | `IressTabSet` + `IressTab`                   |                            |
| Table              | `IressTable`                                 | Data-driven: `rows`, `columns`, `caption` props |
| Tag                | `IressTag`                                   | `bordered` for visible border; `element="button"` for clickable, `element="a"` for link; `onClick` alone also auto-renders as button |
| Pill               | `IressPill`                                  |                            |
| Avatar             | `IressAvatar`                                | `mode` for colour, `badge` for status indicator, `type` for secondary icon |
| CompactAvatar      | `IressAvatarGroup` + `IressAvatar compact`   | `max` limits visible; `overflowLabel` render prop for overflow |
| Tooltip            | `IressTooltip`                               |                            |
| Icon               | `IressIcon name="..."`                       | Material Symbols name      |
| Divider            | `IressDivider`                               |                            |
| Spinner            | `IressSpinner`                               |                            |
| Skeleton           | `IressSkeleton`                              |                            |
| Progress           | `IressProgress`                              |                            |
| Breadcrumbs        | `IressBreadcrumbs`                           | items array                |
| Menu               | `IressMenu` + `IressMenuItem`                |                            |
| Side Navigation    | `IressSideNav`                               |                            |
