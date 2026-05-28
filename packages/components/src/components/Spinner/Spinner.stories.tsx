import { type Meta, type StoryObj } from '@storybook/react-vite';
import { IressSpinner } from '.';
import { IressInline } from '../Inline';
import { IressText } from '../Text';
import {
  addToStorybookCategory,
  stylingProps,
} from '@iress-oss/ids-storybook-config';
import componentMeta from './meta';

type Story = StoryObj<typeof IressSpinner>;

export default {
  title: 'Components/Spinner',
  component: IressSpinner,
  argTypes: {
    ...stylingProps,
    ...addToStorybookCategory('Icon props', [
      'fixedWidth',
      'flip',
      'rotate',
      'set',
      'spin',
    ]),
  },
  tags: ['updated'],
  parameters: {
    docs: {
      description: {
        component: componentMeta.description,
      },
    },
  },
} as Meta<typeof IressSpinner>;

export const Default: Story = {
  args: {
    screenreaderText: 'Loading...',
  },
};

export const Standalone: Story = {
  args: {
    screenreaderText: 'Making magic happen...',
  },
};

export const Chatty: Story = {
  args: {
    variant: 'chatty',
    screenreaderText: 'User is typing...',
  },
};

export const Message: Story = {
  render: (args) => (
    <IressInline gap="sm" verticalAlign="middle">
      <IressSpinner {...args} color="colour.neutral.70" />
      <IressText color="colour.neutral.70">Making magic happen...</IressText>
    </IressInline>
  ),
};
