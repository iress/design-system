import { type StoryObj, type Meta } from '@storybook/react';
import { IressMultiCombobox } from './MultiCombobox';
import { MultiComboboxUsingState } from './mocks/MultiComboboxUsingState';
import MultiComboboxUsingStateSource from './mocks/MultiComboboxUsingState.tsx?raw';
import { MultiComboboxUsingAsync } from './mocks/MultiComboboxUsingAsync';
import MultiComboboxUsingAsyncSource from './mocks/MultiComboboxUsingAsync.tsx?raw';
import { disableArgTypes } from '@iress-oss/ids-storybook-config';

type Story = StoryObj<typeof IressMultiCombobox>;

export default {
  title: 'Components/Combobox/MultiCombobox',
  component: IressMultiCombobox,
  args: {
    popoverProps: {
      container: document.body,
    },
  },
  tags: ['caution:IressRichSelect'],
} as Meta<typeof IressMultiCombobox>;

export const Options: Story = {
  args: {
    options: [...Array(5).keys()].map((number) => ({
      label: `Option ${number + 1}`,
      value: number + 1,
    })),
  },
};

export const Uncontrolled: Story = {
  args: {
    ...Options.args,
    defaultValue: [
      {
        label: 'Option 1',
        value: 1,
      },
    ],
  },
};

export const Controlled: Story = {
  ...Options,
  argTypes: {
    ...disableArgTypes(['defaultValue', 'value']),
  },
  render: (args) => <MultiComboboxUsingState {...args} />,
  parameters: {
    docs: {
      source: {
        code: MultiComboboxUsingStateSource,
        language: 'tsx',
      },
    },
  },
};

export const AsyncOptions: Story = {
  argTypes: {
    ...disableArgTypes(['options']),
  },
  render: (args) => <MultiComboboxUsingAsync {...args} />,
  parameters: {
    docs: {
      source: {
        code: MultiComboboxUsingAsyncSource,
        language: 'tsx',
      },
    },
  },
};

export const TagLimit: Story = {
  args: {
    ...Options.args,
    defaultValue: [
      { label: 'Option 1', value: 1 },
      { label: 'Option 2', value: 2 },
      { label: 'Option 3', value: 3 },
    ],
    multiOptionTagLimit: 2,
    selectedOptionsTagText: 'options selected',
  },
};

export const Readonly: Story = {
  args: {
    ...Options.args,
    defaultValue: TagLimit.args?.defaultValue,
    readOnly: true,
  },
};
