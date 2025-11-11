import { type Meta, type StoryObj } from '@storybook/react-vite';
import { IressCheckboxGroup } from '.';
import { CheckboxGroupTable } from './mocks/CheckboxGroupTable';
import CheckboxGroupTableSource from './mocks/CheckboxGroupTable.tsx?raw';
import {
  disableArgTypes,
  withTransformedRawSource,
} from '@iress-oss/ids-storybook-config';

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
