import { type Meta, type StoryObj } from '@storybook/react';
import { IressSpinner, type IressSpinnerProps } from '.';
import { IressInline } from '../Inline';
import { IressText } from '../Text';

type Story = StoryObj<typeof IressSpinner>;

const addToIconCategory = (
  props: (keyof IressSpinnerProps)[],
): Record<string, { table: { category: string } }> => {
  return props.reduce(
    (acc, prop) => {
      acc[prop] = { table: { category: 'Icon' } };
      return acc;
    },
    {} as Record<string, { table: { category: string } }>,
  );
};

export default {
  title: 'Components/Spinner',
  component: IressSpinner,
  argTypes: {
    ...addToIconCategory([
      'fixedWidth',
      'flip',
      'name',
      'mode',
      'name',
      'rotate',
      'set',
      'size',
      'spin',
    ]),
  },
} as Meta<typeof IressSpinner>;

export const Standalone: Story = {
  args: {
    screenreaderText: 'Making magic happen...',
  },
};

export const Message: Story = {
  render: (args) => (
    <IressInline gutter="sm" verticalAlign="middle">
      <IressSpinner {...args} />
      <IressText mode="muted">Making magic happen...</IressText>
    </IressInline>
  ),
};
