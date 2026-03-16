import { type Meta, type StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { IressReadonly, type IressReadonlyProps } from './Readonly';
import { IressInput } from '../Input';
import { IressInline } from '../Inline';
import { IressIcon } from '../Icon';
import { IressText } from '../Text';
import {
  disableArgTypes,
  reactNodeArgType,
  stylingProps,
} from '@iress-oss/ids-storybook-config';

type Story = StoryObj<IressReadonlyProps>;

export default {
  title: 'Components/Readonly',
  component: IressReadonly,
  argTypes: {
    ...disableArgTypes(['children']),
    children: reactNodeArgType,
    ...stylingProps,
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

export const Actions: Story = {
  ...Default,
  args: {
    ...Default.args,
    value: 'AU',
  },
  argTypes: {
    ...disableArgTypes(['actions']),
  },
  render: (args) => {
    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState(String(args.value ?? ''));

    if (isEditing) {
      return (
        <IressInput
          value={value}
          onChange={(e) => setValue(e.target.value)}
          actions={[
            {
              icon: 'check',
              children: 'Save',
              onClick: () => setIsEditing(false),
            },
          ]}
          autoFocus
        />
      );
    }

    return (
      <IressReadonly
        {...args}
        value={value}
        actions={[
          {
            icon: 'edit',
            children: 'Edit',
            onClick: () => setIsEditing(true),
          },
        ]}
      />
    );
  },
};
