import { Meta, StoryObj } from '@storybook/react';
import { IressSelectSearchInput } from './SelectSearchInput';
import { addToStorybookCategory } from '@iress-storybook/helpers';
import { IressSelectSearchInputProps } from './SelectSearchInput.types';

type Story = StoryObj<typeof IressSelectSearchInput>;

export default {
  title: 'Components/RichSelect/Subcomponents/SearchInput',
  component: IressSelectSearchInput,
  argTypes: {
    ...addToStorybookCategory<IressSelectSearchInputProps>('Input props', [
      'append',
      'clearable',
      'loading',
      'onClear',
    ]),
  },
} as Meta<typeof IressSelectSearchInput>;

export const SearchInput: Story = {
  args: {},
};
