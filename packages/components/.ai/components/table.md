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
