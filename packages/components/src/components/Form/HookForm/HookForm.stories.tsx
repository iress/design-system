import { type Meta, type StoryObj } from '@storybook/react';

import { IressHookForm } from './HookForm';
import { HookFormExample } from '../mocks/HookFormExample';
import HookFormExampleSource from '../mocks/HookFormExample.tsx?raw';
import { removeArgTypes } from '@iress-oss/ids-storybook-config';
import { withCustomSource } from '@iress-oss/ids-storybook-sandbox';

type Story = StoryObj<typeof IressHookForm>;

export default {
  title: 'Components/Form',
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
