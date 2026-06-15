import { type Meta, type StoryObj } from '@storybook/react-vite';
import { SearchSelectionDecisionTree } from './mocks/SearchSelectionDecisionTree';
import SearchSelectionDecisionTreeSource from './mocks/SearchSelectionDecisionTree.tsx?raw';
import { componentStoryMeta, withSource } from '@iress-oss/ids-storybook-config';
import componentMeta from './meta';

type Story = StoryObj<typeof SearchSelectionDecisionTree>;

export default {
  title: 'Patterns/Search & Selection',
  component: SearchSelectionDecisionTree,
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
} as Meta<typeof SearchSelectionDecisionTree>;

export const DecisionTree: Story = {
  render: (_args) => <SearchSelectionDecisionTree />,
  parameters: {
    ...withSource(SearchSelectionDecisionTreeSource, { stripImports: true }),
  },
};
