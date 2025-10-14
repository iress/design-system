import { Meta, StoryObj } from '@storybook/react';
import { IressSelectLabel } from './SelectLabel';
import { MOCK_LABEL_VALUE_META } from '@/mocks/generateLabelValues';

type Story = StoryObj<typeof IressSelectLabel>;

export default {
  title: 'Components/RichSelect/Subcomponents/Label',
  component: IressSelectLabel,
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
