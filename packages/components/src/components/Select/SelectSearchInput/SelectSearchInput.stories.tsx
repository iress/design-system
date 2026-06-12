import { type Meta, type StoryObj } from '@storybook/react-vite';
import {
  IressSelectSearchInput,
  type IressSelectSearchInputProps,
} from './SelectSearchInput';
import type { TestComponentMeta } from '@iress-oss/ids-storybook-config';
import {
  addToStorybookCategory,
  stylingProps,
} from '@iress-oss/ids-storybook-config';

type Story = StoryObj<typeof IressSelectSearchInput>;

const testMeta: TestComponentMeta[] = [
  {
    part: 'main',
    description: 'The root element of the select search input',
    query: <code>getByRole('searchbox')</code>,
    testId: 'select-search-input',
  },
];

export default {
  title: 'Components/Select/Subcomponents/SearchInput',
  component: IressSelectSearchInput,
  argTypes: {
    ...stylingProps,
    ...addToStorybookCategory<IressSelectSearchInputProps>('Input props', [
      'append',
      'clearable',
      'loading',
      'onClear',
    ]),
  },
  parameters: {
    idsConfig: { testMeta },
  },
} as Meta<typeof IressSelectSearchInput>;

export const SearchInput: Story = {
  args: {},
};
