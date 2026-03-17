import { type Meta, type StoryObj } from '@storybook/react-vite';
import { FeedbackExample } from './mocks/FeedbackExample';
import FeedbackExampleSource from './mocks/FeedbackExample.tsx?raw';
import { DecisionTreeDecorator } from './mocks/DecisionTreeDecorator';

type Story = StoryObj<typeof FeedbackExample>;

export default {
  title: 'Patterns/Feedback',
  component: FeedbackExample,
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
    controls: {
      disable: true,
    },
  },
} as Meta<typeof FeedbackExample>;

export const DecisionTree: Story = {
  decorators: [
    (Story) => (
      <DecisionTreeDecorator>
        <Story />
      </DecisionTreeDecorator>
    ),
  ],
  parameters: {
    docs: {
      source: {
        code: FeedbackExampleSource,
      },
    },
  },
};
