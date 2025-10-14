import { Meta, StoryObj } from '@storybook/react-vite';
import { IressCheckboxGroup } from '.';
import {
  disableArgTypes,
  withTransformedRawSource,
} from '@iress-storybook/helpers';
import { CheckboxGroupTable } from './mocks/CheckboxGroupTable';
import CheckboxGroupTableSource from './mocks/CheckboxGroupTable.tsx?raw';

type Story = StoryObj<typeof IressCheckboxGroup>;

export default {
  title: 'Components/CheckboxGroup/Recipes',
  component: IressCheckboxGroup,
  argTypes: {
    ...disableArgTypes(['children']),
  },
  tags: ['updated'],
} as Meta<typeof IressCheckboxGroup>;

export const Table: Story = {
  argTypes: {
    ...disableArgTypes(['children', 'layout', 'name', 'onChange', 'value']),
  },
  render: (args) => <CheckboxGroupTable {...args} />,
  parameters: {
    ...withTransformedRawSource(
      CheckboxGroupTableSource,
      'IressCheckboxGroupProps',
      ['children'],
    ),
  },
};
