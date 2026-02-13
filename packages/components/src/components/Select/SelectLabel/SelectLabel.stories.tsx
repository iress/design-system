import { type Meta, type StoryObj } from '@storybook/react-vite';
import { IressSelectLabel } from './SelectLabel';
import { MOCK_LABEL_VALUE_META } from '@/mocks/generateLabelValues';
import { reactNodeArgType, stylingProps } from '@theme-preset/storybookHelpers';

type Story = StoryObj<typeof IressSelectLabel>;

export default {
  title: 'Components/Select/Subcomponents/Label',
  component: IressSelectLabel,
  argTypes: {
    children: reactNodeArgType,
    ...stylingProps,
  },
} as Meta<typeof IressSelectLabel>;

export const NoneSelected: Story = {
  args: {
    placeholder: '',
  },
};

export const OneSelected: Story = {
  args: {
    ...NoneSelected.args,
    selected: MOCK_LABEL_VALUE_META[0],
  },
};

export const MultipleSelected: Story = {
  args: {
    ...NoneSelected.args,
    selected: MOCK_LABEL_VALUE_META,
  },
};
