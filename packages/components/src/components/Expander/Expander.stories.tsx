import { IressExpander } from '.';
import { type Meta, type StoryObj } from '@storybook/react-vite';
import { IressText } from '../Text';
import { MultipleExpander } from './mocks/MultipleExpander';
import MultipleExpanderSource from './mocks/MultipleExpander.tsx?raw';
import { IressStack } from '../Stack';
import { disableArgTypes } from '@iress-oss/ids-storybook-config';
import { withCustomSource } from '@iress-oss/ids-storybook-sandbox';

export default {
  title: 'Components/Expander',
  component: IressExpander,
  tags: ['updated'],
} as Meta<typeof IressExpander>;

export const Default: StoryObj<typeof IressExpander> = {
  args: {
    activator: 'Expander activator',
    children: 'Expander content will go here',
  },
};

export const Mode: StoryObj<typeof IressExpander> = {
  args: {
    ...Default.args,
  },
  argTypes: {
    ...disableArgTypes(['mode', 'activator', 'children']),
  },
  render: (args) => (
    <IressStack gap="lg">
      <IressStack gap="xs">
        <IressText element="h2">Section (default)</IressText>
        <IressExpander {...args} mode="section" />
      </IressStack>
      <IressStack gap="xs">
        <IressText element="h2">Link</IressText>
        <IressExpander {...args} mode="link" />
      </IressStack>
    </IressStack>
  ),
};

export const Open: StoryObj<typeof IressExpander> = {
  args: {
    ...Default.args,
    open: true,
  },
};

export const Multiple: StoryObj<typeof IressExpander> = {
  argTypes: disableArgTypes([
    'open',
    'mode',
    'activator',
    'onChange',
    'children',
  ]),
  render: () => <MultipleExpander />,
  parameters: {
    ...withCustomSource(MultipleExpanderSource),
  },
};
