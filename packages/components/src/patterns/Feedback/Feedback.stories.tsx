import { type Meta, type StoryObj } from '@storybook/react-vite';
import { FeedbackDecisionTree } from './mocks/FeedbackDecisionTree';
import FeedbackDecisionTreeSource from './mocks/FeedbackDecisionTree.tsx?raw';
import { componentStoryMeta, withSource } from '@iress-oss/ids-storybook-config';
import componentMeta from './meta';

type Story = StoryObj<typeof FeedbackDecisionTree>;

export default {
  title: 'Patterns/Feedback',
  component: FeedbackDecisionTree,
  tags: ['beta'],
  ...componentStoryMeta(componentMeta, {
    idsConfig: {
      autodocsTemplate: 'landing',
    },
    parameters: {
      chromatic: {
        disableSnapshot: true,
      },
      controls: {
        disable: true,
      },
    },
  }),
} as Meta<typeof FeedbackDecisionTree>;

export const DecisionTree: Story = {
  render: (_args) => <FeedbackDecisionTree />,
  parameters: {
    ...withSource(FeedbackDecisionTreeSource, { stripImports: true }),
  },
};
