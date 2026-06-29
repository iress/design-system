import { type Meta, type StoryObj } from '@storybook/react-vite';
import { IressTable, IressTableFormattedValue } from '..';
import type { TestComponentMeta } from '@iress-oss/ids-storybook-config';
import {
  disableArgTypes,
  reactNodeArgType,
  stylingProps,
  withSource,
} from '@iress-oss/ids-storybook-config';
import { TableFormattedValueExample } from './mocks/TableFormattedValueExample';
import TableFormattedValueExampleSource from './mocks/TableFormattedValueExample.tsx?raw';

type Story = StoryObj<typeof IressTableFormattedValue<object, string>>;

const testMeta: TestComponentMeta[] = [
  {
    part: 'main',
    description: 'The root element of the table formatted value',
    testId: 'table-formatted-value',
  },
];

export default {
  title: 'Components/Table/FormattedValue',
  component: IressTableFormattedValue,
  tags: ['updated'],
  argTypes: {
    children: reactNodeArgType,
    ...stylingProps,
  },
  parameters: {
    idsConfig: { testMeta },
  },
} as Meta<typeof IressTableFormattedValue>;

const fourDaysAgo = new Date();
fourDaysAgo.setDate(fourDaysAgo.getDate() - 4);

export const FormattedValue: Story = {
  render: () => <TableFormattedValueExample />,
  parameters: {
    controls: { disable: true },
    ...withSource(TableFormattedValueExampleSource, { stripImports: true }),
  },
};
