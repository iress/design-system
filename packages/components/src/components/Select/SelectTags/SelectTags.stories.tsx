import { type Meta, type StoryObj } from '@storybook/react-vite';
import { IressSelectTags } from './SelectTags';
import { MOCK_LABEL_VALUE_META } from '@/mocks/generateLabelValues';
import type { TestComponentMeta } from '@iress-oss/ids-storybook-config';
import {
  reactNodeArgType,
  stylingProps,
} from '@iress-oss/ids-storybook-config';

type Story = StoryObj<typeof IressSelectTags>;

const testMeta: TestComponentMeta[] = [
  {
    part: 'main',
    description: 'The root element of the select tags',
    query: <code>getByRole('combobox')</code>,
    testId: 'select-tags',
  },
  {
    part: 'tag',
    description: 'An individual tag element',
    testId: 'select-tags__tag',
  },
];

export default {
  title: 'Components/Select/Subcomponents/Tags',
  component: IressSelectTags,
  argTypes: {
    append: reactNodeArgType,
    prepend: reactNodeArgType,
    ...stylingProps,
  },
  parameters: {
    idsConfig: { testMeta },
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
