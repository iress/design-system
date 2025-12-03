import { type Meta, type StoryObj } from '@storybook/react';
import { IressTable } from '.';
import { IressBadge } from '../Badge';
import { IressButton } from '../Button';
import { TableCustomColumns } from './mocks/TableCustomColumns';
import TableCustomColumnsSource from './mocks/TableCustomColumns.tsx?raw';
import { TableFormats } from './mocks/TableFormats';
import TableFormatsSource from './mocks/TableFormats.tsx?raw';
import { TableSorting } from './mocks/TableSorting';
import TableSortingSource from './mocks/TableSorting.tsx?raw';
import { TableSortingFn } from './mocks/TableSortingFn';
import TableSortingFnSource from './mocks/TableSortingFn.tsx?raw';
import { type Row } from '@tanstack/react-table';
import { type CSSProperties } from 'react';
import {
  disableArgTypes,
  withJsxTransformer,
  withTransformedRawSource,
} from '@iress-oss/ids-storybook-config';

type Story = StoryObj<typeof IressTable>;

export default {
  title: 'Components/Table',
  component: IressTable,
  argTypes: {
    ...disableArgTypes(['children']),
  },
  parameters: {
    ...withJsxTransformer({
      sortProps: false,
    }),
  },
} as Meta<typeof IressTable>;

export const AutomaticColumns: Story = {
  args: {
    caption: 'My investments',
    rows: [
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
    ],
  },
};

export const CustomColumns: Story = {
  ...AutomaticColumns,
  args: {},
  argTypes: {
    ...disableArgTypes(['caption', 'rows', 'columns']),
  },
  render: (args) => <TableCustomColumns {...args} />,
  parameters: {
    ...withTransformedRawSource(TableCustomColumnsSource, 'Props'),
  },
};

export const Formats: Story = {
  args: {},
  argTypes: {
    ...disableArgTypes(['caption', 'rows', 'columns']),
  },
  render: (args) => <TableFormats {...args} />,
  parameters: {
    ...withTransformedRawSource(TableFormatsSource, 'Props'),
  },
};

export const Sorting: Story = {
  ...CustomColumns,
  render: (args) => <TableSorting {...args} />,
  parameters: {
    ...withTransformedRawSource(TableSortingSource, 'Props'),
  },
};

export const CustomSortingLogic: Story = {
  ...CustomColumns,
  render: (args) => <TableSortingFn {...(args as object)} />,
  parameters: {
    ...withTransformedRawSource(TableSortingFnSource, 'Props'),
  },
};

export const Width: Story = {
  ...AutomaticColumns,
  args: {
    ...AutomaticColumns.args,
    columns: [
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
    ],
  },
};

export const Alignment: Story = {
  ...AutomaticColumns,
  args: {
    ...AutomaticColumns.args,
    columns: [
      {
        key: 'investment_name',
        label: 'Investment (left)',
        align: 'left',
      },
      {
        key: 'cost',
        label: 'Cost (center)',
        align: 'center',
        format: 'currency',
      },
      {
        key: 'investmentDate',
        label: 'Date (center)',
        align: 'center',
        format: 'date',
      },
      {
        key: 'totalPercentage',
        label: 'Share (right)',
        align: 'right',
        format: 'percent',
      },
    ],
  },
};

export const Dividers: Story = {
  args: {
    ...AutomaticColumns.args,
    columns: [
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
    ],
  },
};

export const HighlightOnHover: Story = {
  args: {
    ...AutomaticColumns.args,
    hover: true,
  },
};

export const Scope: Story = {
  args: {
    ...AutomaticColumns.args,
    scope: 'col',
  },
};

export const HiddenHeader: Story = {
  args: {
    ...AutomaticColumns.args,
    hiddenHeader: true,
  },
};

export const RichRows: Story = {
  args: {
    caption: 'My rich investments',
    rows: [
      {
        investment_name: (
          <IressButton>Artemis Fund Managers Limited</IressButton>
        ),
        cost: '$23,898',
        investmentDate: '2019/09/23',
        totalPercentage: <IressBadge mode="info">24.8%</IressBadge>,
      },
      {
        investment_name: <IressButton>CASH.CASH</IressButton>,
        cost: '$49,751.40',
        investmentDate: '2020/06/28',
        totalPercentage: <IressBadge mode="success">49%</IressBadge>,
      },
      {
        investment_name: <IressButton>VODAFONE GRP</IressButton>,
        cost: '$26,382.46',
        investmentDate: '2019/02/05',
        totalPercentage: <IressBadge mode="info">26.2%</IressBadge>,
      },
    ],
  },
};

export const EmptyState: Story = {
  args: {
    columns: [
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
        align: 'right',
        format: 'currency',
      },
    ],
    empty: 'This table has no data',
    rows: [],
  },
};

export const Static: Story = {
  args: {
    caption: 'My investments',
    children: [
      <thead key="thead">
        <tr>
          <th>Investment</th>
          <th>Cost</th>
          <th>Investment date</th>
          <th>Share</th>
        </tr>
      </thead>,
      <tbody key="tbody">
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
      </tbody>,
    ],
  },
};

export const RowProps: Story = {
  args: {
    ...AutomaticColumns.args,
    rowProps: (row: Row<{ cost?: number }>) => ({
      style: {
        '--iress-row-even-background-color':
          row.original.cost && row.original.cost > 30000
            ? 'white'
            : 'lightblue',
        '--iress-row-odd-background-color':
          row.original.cost && row.original.cost > 30000
            ? 'white'
            : 'lightblue',
      } as CSSProperties,
    }),
  },
  parameters: {
    ...withJsxTransformer({
      functionValue: (functionString: string) => {
        return functionString.toString().replace(/3e4/g, '30000');
      },
      showFunctions: true,
    }),
  },
};

export const Compact: Story = {
  ...AutomaticColumns,
  args: {
    ...AutomaticColumns.args,
    compact: true,
  },
};
