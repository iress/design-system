import { Meta, StoryObj } from '@storybook/react';
import { IressSelectHeading } from './SelectHeading';
import { addToStorybookCategory } from '@iress-storybook/helpers';
import { IressSelectHeadingProps } from './SelectHeading.types';

type Story = StoryObj<typeof IressSelectHeading>;

export default {
  title: 'Components/RichSelect/Subcomponents/Heading',
  component: IressSelectHeading,
  argTypes: {
    ...addToStorybookCategory<IressSelectHeadingProps>('MenuText props', [
      'append',
      'divider',
      'prepend',
    ]),
    ...addToStorybookCategory<IressSelectHeadingProps>('Text props', [
      'align',
      'element',
      'mode',
      'noGutter',
      'variant',
    ]),
  },
} as Meta<typeof IressSelectHeading>;

export const Heading: Story = {
  args: {
    children: <h2>Selected (2)</h2>,
    clearAll: true,
  },
};
