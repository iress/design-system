import { type Meta, type StoryObj } from '@storybook/react-vite';
import { IressTableBody } from '..';
import { TableGroupedRows } from '../mocks/TableGroupedRows';
import GroupedRowsSource from '../mocks/TableGroupedRows.tsx?raw';
import type { TestComponentMeta } from '@iress-oss/ids-storybook-config';
import {
  withSource,
  reactNodeArgType,
  stylingProps,
} from '@iress-oss/ids-storybook-config';

type Story = StoryObj<typeof IressTableBody>;

const testMeta: TestComponentMeta[] = [
  {
    part: 'main',
    description: 'The root element of the table body',
    testId: 'table-body',
  },
  {
    part: 'thead',
    description: 'The table header section',
    testId: 'table-body__thead',
  },
  {
    part: 'tbody',
    description: 'The table body section',
    testId: 'table-body__tbody',
  },
];

export default {
  title: 'Components/Table/Body',
  component: IressTableBody,
  tags: ['updated'],
  argTypes: {
    children: reactNodeArgType,
    ...stylingProps,
  },
  parameters: {
    idsConfig: { testMeta },
  },
} as Meta<typeof IressTableBody>;

export const Body: Story = {
  render: (args) => <TableGroupedRows {...args} />,
  parameters: {
    controls: { disable: true },
    ...withSource(GroupedRowsSource, { stripImports: true }),
  },
};
