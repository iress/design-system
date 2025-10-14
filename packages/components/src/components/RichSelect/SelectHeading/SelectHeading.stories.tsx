import { Meta, StoryObj } from '@storybook/react-vite';
import { IressSelectHeading, IressSelectHeadingProps } from './SelectHeading';
import { addToStorybookCategory } from '@iress-storybook/helpers';

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
      'noGutter',
    ]),
  },
} as Meta<typeof IressSelectHeading>;

export const Heading: Story = {
  args: {
    children: <h2>Selected (2)</h2>,
    clearAll: true,
  },
};
