import { type Meta, type StoryObj } from '@storybook/react-vite';
import { IressTable, IressTableFormattedValue } from '..';
import { disableArgTypes } from '@iress-storybook/helpers';

type Story = StoryObj<typeof IressTableFormattedValue<object, string>>;

export default {
  title: 'Components/Table/FormattedValue',
  component: IressTableFormattedValue,
  tags: ['updated'],
} as Meta<typeof IressTableFormattedValue>;

export const FormattedValue: Story = {
  args: {
    value: '100',
  },
  argTypes: {
    ...disableArgTypes(['format', 'value']),
  },
  render: () => (
    <IressTable
      caption="IressTableFormattedValue"
      rows={[
        {
          mode: 'string',
          example: <IressTableFormattedValue value="string" format="string" />,
        },
        {
          mode: 'number',
          example: <IressTableFormattedValue value="10000" format="number" />,
        },
        {
          mode: 'date',
          example: (
            <IressTableFormattedValue value={new Date()} format="date" />
          ),
        },
        {
          mode: 'shortDate',
          example: (
            <IressTableFormattedValue value={new Date()} format="shortDate" />
          ),
        },
        {
          mode: 'isoDateTime',
          example: (
            <IressTableFormattedValue value={new Date()} format="isoDateTime" />
          ),
        },
        {
          mode: 'relativeTime',
          example: (
            <IressTableFormattedValue
              value={new Date()}
              format="relativeTime"
            />
          ),
        },
        {
          mode: 'currency',
          example: <IressTableFormattedValue value={10000} format="currency" />,
        },
        {
          mode: 'percent',
          example: <IressTableFormattedValue value={50} format="percent" />,
        },
      ]}
    />
  ),
};
