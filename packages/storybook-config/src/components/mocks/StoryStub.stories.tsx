import { type StoryObj, type Meta } from '@storybook/react-vite';
import { StoryStub } from './StoryStub';

type Story = StoryObj<typeof StoryStub>;

export default {
  title: 'Components/StoryStub',
  component: StoryStub,
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
  tags: ['hideInSidebar', 'updated'],
} as Meta<typeof StoryStub>;

export const IsStub = {
  args: {
    children: 'This is a story stub',
  },
};

export const Beta: Story = {
  ...IsStub,
  tags: ['beta:'],
};

export const BetaReplace: Story = {
  ...IsStub,
  tags: ['beta:replaced component'],
};

export const Caution: Story = {
  ...IsStub,
  tags: ['caution:a new component'],
};
