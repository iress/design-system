import { Meta, StoryObj } from '@storybook/react-vite';
import { disableArgTypes } from '@iress-storybook/helpers';
import { IressReadonly, type IressReadonlyProps } from './Readonly';
import { IressInline } from '../Inline';
import { IressIcon } from '../Icon';
import { IressText } from '../Text';

type Story = StoryObj<IressReadonlyProps>;

export default {
  title: 'Components/Readonly',
  component: IressReadonly,
  argTypes: {
    ...disableArgTypes(['children']),
  },
  tags: ['updated'],
} as Meta<typeof IressReadonly>;

export const Default: Story = {
  args: {
    append: '',
    prepend: '',
    value: 'AU',
  },
};

export const RichContent: Story = {
  ...Default,
  args: {
    ...Default.args,
    children: (
      <IressInline verticalAlign="middle" gap="sm">
        <IressIcon name="flag" /> Australia
      </IressInline>
    ),
  },
};

export const InlineStyle: Story = {
  ...Default,
  args: {
    ...Default.args,
    children: (
      <IressInline verticalAlign="middle" gap="sm">
        <IressIcon name="flag" /> Australia
      </IressInline>
    ),
    prepend: <IressText color="colour.neutral.70">Prepend</IressText>,
    append: <IressText color="colour.neutral.70">Append</IressText>,
    inline: true,
  },
};
