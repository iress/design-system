import { Meta, StoryObj } from '@storybook/react';
import { disableArgTypes } from '@iress-storybook/helpers';
import { IressReadonlyProps } from './Readonly.types';
import { IressReadonly } from './Readonly';
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
      <IressInline verticalAlign="middle" gutter="sm">
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
      <IressInline verticalAlign="middle" gutter="sm">
        <IressIcon name="flag" /> Australia
      </IressInline>
    ),
    prepend: <IressText mode="muted">Prepend</IressText>,
    append: <IressText mode="muted">Append</IressText>,
    inline: true,
  },
};
