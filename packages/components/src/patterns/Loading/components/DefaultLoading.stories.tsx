import { type Meta, type StoryObj } from '@storybook/react-vite';
import { DefaultLoading } from './DefaultLoading';
import { type FC } from 'react';
import {
  reactNodeArgType,
  stylingProps,
} from '@iress-oss/ids-storybook-config';

// This is a pattern for IressLoading, hence we change the name
(DefaultLoading as FC).displayName = 'IressLoading';

type Story = StoryObj<typeof DefaultLoading>;

export default {
  title: 'Patterns/Loading/Patterns/Default',
  component: DefaultLoading,
  tags: ['beta: '],
  argTypes: {
    children: reactNodeArgType,
    ...stylingProps,
  },
} as Meta<typeof DefaultLoading>;

export const Default: Story = {
  args: {
    pattern: 'default',
  },
};
