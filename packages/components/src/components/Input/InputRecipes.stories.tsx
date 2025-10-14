import { Meta, StoryObj } from '@storybook/react';
import { IressInput, IressInputProps } from '../../main';
import { ReactHookFormsInput } from './mocks/ReactHookFormsInput';
import ReactHookFormsInputSource from './mocks/ReactHookFormsInput.tsx?raw';
import { InputPercentage } from './mocks/InputPercentage';
import InputPercentageSource from './mocks/InputPercentage.tsx?raw';

type Story = StoryObj<IressInputProps>;

export default {
  title: 'Components/Input/Recipes',
  component: IressInput,
  parameters: {
    actions: {
      disable: true,
    },
    controls: {
      disable: true,
    },
    IDS_Sandbox: {
      scopes: ['react-hook-form'],
    },
  },
} as Meta<typeof IressInput>;

export const ReactHookForms: Story = {
  render: (args) => <ReactHookFormsInput {...args} />,
  parameters: {
    docs: {
      source: {
        code: ReactHookFormsInputSource,
        language: 'tsx',
      },
    },
  },
};

export const Percentage: Story = {
  render: (args) => <InputPercentage {...args} />,
  parameters: {
    docs: {
      source: {
        code: InputPercentageSource,
        language: 'tsx',
      },
    },
  },
};
