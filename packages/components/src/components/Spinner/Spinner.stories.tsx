import { type Meta, type StoryObj } from '@storybook/react-vite';
import { IressSpinner } from '.';
import { IressInline } from '../Inline';
import { IressText } from '../Text';
import { addToStorybookCategory } from '@iress-oss/ids-storybook-config';

type Story = StoryObj<typeof IressSpinner>;

export default {
  title: 'Components/Spinner',
  component: IressSpinner,
  argTypes: {
    ...addToStorybookCategory('Icon props', [
      'fixedWidth',
      'flip',
      'rotate',
      'set',
      'spin',
    ]),
  },
  tags: ['updated'],
} as Meta<typeof IressSpinner>;

export const Standalone: Story = {
  args: {
    screenreaderText: 'Making magic happen...',
  },
};

export const Message: Story = {
  render: (args) => (
    <IressInline gap="sm" verticalAlign="middle">
      <IressSpinner {...args} />
      <IressText color="colour.neutral.70">Making magic happen...</IressText>
    </IressInline>
  ),
};
