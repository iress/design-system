import { type Meta, type StoryObj } from '@storybook/react';
import { IressSelectSearchInput } from './SelectSearchInput';
import { type IressSelectSearchInputProps } from './SelectSearchInput.types';
import { addToStorybookCategory } from '@iress-oss/ids-storybook-config';

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
