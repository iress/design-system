import { type Meta, type StoryObj } from '@storybook/react-vite';
import { IressSelectLabel } from './SelectLabel';
import { MOCK_LABEL_VALUE_META } from '@/mocks/generateLabelValues';
import type { TestComponentMeta } from '@iress-oss/ids-storybook-config';
import {
  reactNodeArgType,
  stylingProps,
} from '@iress-oss/ids-storybook-config';

type Story = StoryObj<typeof IressSelectLabel>;

const testMeta: TestComponentMeta[] = [
  {
    part: 'main',
    description: 'The root element of the select label',
    testId: 'select-label',
  },
];

export default {
  title: 'Components/Select/Subcomponents/Label',
  component: IressSelectLabel,
  argTypes: {
    children: reactNodeArgType,
    ...stylingProps,
  },
  parameters: {
    idsConfig: { testMeta },
  },
} as Meta<typeof IressSelectLabel>;

export const NoneSelected: Story = {
  args: {
    placeholder: '',
  },
};

export const OneSelected: Story = {
  args: {
    placeholder: '',
    selected: MOCK_LABEL_VALUE_META[0],
  },
};

export const MultipleSelected: Story = {
  args: {
    placeholder: '',
    selected: MOCK_LABEL_VALUE_META,
  },
};

export const Disabled: Story = {
  args: {
    placeholder: '',
    selected: MOCK_LABEL_VALUE_META[0],
    disabled: true,
  },
};
