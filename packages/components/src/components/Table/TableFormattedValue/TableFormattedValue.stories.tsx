import { type Meta, type StoryObj } from '@storybook/react-vite';
import { IressTable, IressTableFormattedValue } from '..';
import type { TestComponentMeta } from '@iress-oss/ids-storybook-config';
import {
  disableArgTypes,
  reactNodeArgType,
  stylingProps,
} from '@iress-oss/ids-storybook-config';

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
  args: {
    value: '100',
  },
  argTypes: {
    ...disableArgTypes(['format', 'value']),
  },
  render: (args) => (
    <IressTable
      caption="IressTableFormattedValue"
      rows={[
        {
          mode: 'string',
          example: <IressTableFormattedValue {...args} value="string" format="string" />,
        },
        {
          mode: 'number',
          example: <IressTableFormattedValue {...args} value="10000" format="number" />,
        },
        {
          mode: 'date',
          example: (
            <IressTableFormattedValue
              {...args}
              value={new Date('2025-11-14')}
              format="date"
            />
          ),
        },
        {
          mode: 'shortDate',
          example: (
            <IressTableFormattedValue
              {...args}
              value={new Date('2025-11-14')}
              format="shortDate"
            />
          ),
        },
        {
          mode: 'isoDateTime',
          example: (
            <IressTableFormattedValue
              {...args}
              value={new Date('2025-11-14')}
              format="isoDateTime"
            />
          ),
        },
        {
          mode: 'relativeTime',
          example: (
            <IressTableFormattedValue
              {...args}
              value={fourDaysAgo}
              format="relativeTime"
            />
          ),
        },
        {
          mode: 'currency',
          example: <IressTableFormattedValue {...args} value={10000} format="currency" />,
        },
        {
          mode: 'percent',
          example: <IressTableFormattedValue {...args} value={50} format="percent" />,
        },
      ]}
    />
  ),
};
