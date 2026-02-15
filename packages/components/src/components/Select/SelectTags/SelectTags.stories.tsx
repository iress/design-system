import { type Meta, type StoryObj } from '@storybook/react-vite';
import { IressSelectTags } from './SelectTags';
import { MOCK_LABEL_VALUE_META } from '@/mocks/generateLabelValues';
import { reactNodeArgType, stylingProps } from '@theme-preset/storybookHelpers';

type Story = StoryObj<typeof IressSelectTags>;

export default {
  title: 'Components/Select/Subcomponents/Tags',
  component: IressSelectTags,
  argTypes: {
    append: reactNodeArgType,
    prepend: reactNodeArgType,
    ...stylingProps,
  },
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
