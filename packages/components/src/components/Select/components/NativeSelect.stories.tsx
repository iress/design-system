import { type Meta, type StoryObj } from '@storybook/react-vite';
import { FORM_ELEMENT_WIDTHS } from '@/constants';
import type { TestComponentMeta } from '@iress-oss/ids-storybook-config';
import {
  disableArgTypes,
  mergeStorybookConfig,
  reactNodeArgType,
  stylingProps,
} from '@iress-oss/ids-storybook-config';
import { IressStack } from '../../Stack';
import { IressSelect } from '../Select';

type Story = StoryObj<typeof IressSelect>;

const testMeta: TestComponentMeta[] = [
  {
    part: 'main',
    description: 'The root element of the native select',
    query: <code>getByRole('combobox')</code>,
    testId: 'native-select',
  },
  {
    part: 'select',
    description: 'The native select element',
    testId: 'native-select__select',
  },
];

export default {
  title: 'Components/Select/Native',
  component: IressSelect,
  argTypes: {
    ...mergeStorybookConfig(disableArgTypes(['children']), {
      children: reactNodeArgType,
    }),
    ...stylingProps,
  },
  tags: ['updated'],
  parameters: {
    idsConfig: { testMeta },
  },
} as Meta<typeof IressSelect>;

export const Options: Story = {
  args: {
    options: [
      { label: 'Option 1', value: '1' },
      { label: 'Option 2', value: 2 },
      { label: 'Option 3', value: '3' },
      { label: 'Option 4', value: 4 },
      { label: 'Option 5', value: '5' },
    ],
    native: true,
  },
};

export const OptionGroups: Story = {
  args: {
    options: [
      {
        label: 'Group 1',
        children: [
          { label: 'Group 1 / Option 1', value: '1-1' },
          { label: 'Group 1 / Option 2', value: '1-2' },
          { label: 'Group 1 / Option 3', value: '1-3' },
          { label: 'Group 1 / Option 4', value: '1-4' },
          { label: 'Group 1 / Option 5', value: '1-5' },
        ],
      },
      {
        label: 'Group 2',
        children: [
          { label: 'Group 2 / Option 1', value: '2-1' },
          { label: 'Group 2 / Option 2', value: '2-2' },
          { label: 'Group 2 / Option 3', value: '2-3' },
          { label: 'Group 2 / Option 4', value: '2-4' },
          { label: 'Group 2 / Option 5', value: '2-5' },
        ],
      },
    ],
    native: true,
  },
};

export const Placeholder: Story = {
  args: {
    options: [
      { label: 'Option 1', value: '1' },
      { label: 'Option 2', value: 2 },
      { label: 'Option 3', value: '3' },
      { label: 'Option 4', value: 4 },
      { label: 'Option 5', value: '5' },
    ],
    native: true,
    placeholder: 'Please select an option',
  },
};

export const SelectedOption: Story = {
  args: {
    options: [
      { label: 'Option 1', value: '1' },
      { label: 'Option 2', value: 2 },
      { label: 'Option 3', value: '3' },
      { label: 'Option 4', value: 4 },
      { label: 'Option 5', value: '5' },
    ],
    native: true,
    value: { label: 'Option 2', value: 2 },
  },
};

export const Sizing: Story = {
  ...Options,
  argTypes: {
    ...disableArgTypes(['placeholder', 'width']),
  },
  render: (args) => (
    <IressStack gap="md">
      {FORM_ELEMENT_WIDTHS.map((width) => (
        <div key={width}>
          <IressSelect {...args} placeholder={width} width={width} />
        </div>
      ))}
    </IressStack>
  ),
};

export const Disabled: Story = {
  args: {
    options: [
      { label: 'Option 1', value: '1' },
      { label: 'Option 2', value: 2 },
      { label: 'Option 3', value: '3' },
      { label: 'Option 4', value: 4 },
      { label: 'Option 5', value: '5' },
    ],
    native: true,
    value: { label: 'Option 2', value: 2 },
    disabled: true,
  },
};
