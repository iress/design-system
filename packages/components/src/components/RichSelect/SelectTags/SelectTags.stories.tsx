import { Meta, StoryObj } from '@storybook/react-vite';
import { IressSelectTags } from './SelectTags';
import { MOCK_LABEL_VALUE_META } from '@/mocks/generateLabelValues';

type Story = StoryObj<typeof IressSelectTags>;

export default {
  title: 'Components/RichSelect/Subcomponents/Tags',
  component: IressSelectTags,
} as Meta<typeof IressSelectTags>;

export const NoneSelected: Story = {
  args: {
    placeholder: 'Select an item',
  },
};

export const Selected: Story = {
  args: {
    ...NoneSelected.args,
    selected: MOCK_LABEL_VALUE_META[0],
  },
};

export const LimitReached: Story = {
  args: {
    ...NoneSelected.args,
    limit: 3,
    selected: MOCK_LABEL_VALUE_META,
  },
};
