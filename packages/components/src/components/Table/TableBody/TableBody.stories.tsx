import { type Meta, type StoryObj } from '@storybook/react';
import { IressTableBody } from '..';
import { TableGroupedRows } from '../mocks/TableGroupedRows';
import GroupedRowsSource from '../mocks/TableGroupedRows.tsx?raw';
import { withCustomSource } from '@iress-oss/ids-storybook-config';

type Story = StoryObj<typeof IressTableBody>;

export default {
  title: 'Components/Table/Body',
  component: IressTableBody,
} as Meta<typeof IressTableBody>;

export const Body: Story = {
  render: (args) => <TableGroupedRows {...args} />,
  parameters: {
    ...withCustomSource(GroupedRowsSource),
  },
};
