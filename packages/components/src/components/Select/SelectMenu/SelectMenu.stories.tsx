import { type Meta, type StoryObj } from '@storybook/react-vite';
import { IressSelectMenu, type IressSelectMenuProps } from './SelectMenu';
import { MOCK_LABEL_VALUES } from '../../../mocks/generateLabelValues';
import { addToStorybookCategory } from '@iress-oss/ids-storybook-config';
import { reactNodeArgType, stylingProps } from '@theme-preset/storybookHelpers';

type Story = StoryObj<typeof IressSelectMenu>;

export default {
  title: 'Components/Select/Subcomponents/Menu',
  component: IressSelectMenu,
  argTypes: {
    children: reactNodeArgType,
    ...stylingProps,
    ...addToStorybookCategory<IressSelectMenuProps>('Menu props', [
      'changeOnBlur',
      'fluid',
      'id',
      'layout',
      'noWrap',
    ]),
  },
} as Meta<typeof IressSelectMenu>;

export const Results: Story = {
  args: {
    heading: 'Search results',
    items: MOCK_LABEL_VALUES,
    noResults: 'No results found',
    fluid: true,
  },
};

export const NoResults: Story = {
  args: {
    ...Results.args,
    items: [],
  },
};
