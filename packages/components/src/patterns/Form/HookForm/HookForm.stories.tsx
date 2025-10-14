import { Meta, StoryObj } from '@storybook/react-vite';

import { IressHookForm } from './HookForm';
import { HookFormExample } from '../mocks/HookFormExample';
import HookFormExampleSource from '../mocks/HookFormExample.tsx?raw';
import { removeArgTypes, withCustomSource } from '@iress-storybook/helpers';

type Story = StoryObj<typeof IressHookForm>;

export default {
  title: 'Patterns/Form',
  component: IressHookForm,
  argTypes: {
    ...removeArgTypes(['ref']),
  },
  parameters: {
    IDS_Sandbox: {
      scopes: ['react-hook-form'],
    },
  },
} as Meta<typeof IressHookForm>;

export const HookForm: Story = {
  render: (args) => <HookFormExample {...args} />,
  parameters: {
    ...withCustomSource(HookFormExampleSource),
  },
};
