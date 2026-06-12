import { type Meta, type StoryObj } from '@storybook/react-vite';

import { IressHookForm } from './HookForm';
import { HookFormExample } from '../mocks/HookFormExample';
import HookFormExampleSource from '../mocks/HookFormExample.tsx?raw';
import {
  removeArgTypes,
  withSource,
  reactNodeArgType,
  stylingProps,
} from '@iress-oss/ids-storybook-config';
import type { TestComponentMeta } from '@iress-oss/ids-storybook-config';

const testMeta: TestComponentMeta[] = [
  {
    part: 'main',
    description: 'The form element',
    query: <code>getByRole('form')</code>,
    testId: 'hook-form',
  },
];

type Story = StoryObj<typeof IressHookForm>;

export default {
  title: 'Patterns/Form/HookForm',
  component: IressHookForm,
  argTypes: {
    ...removeArgTypes(['ref']),
    children: reactNodeArgType,
    ...stylingProps,
  },
  parameters: {
    idsConfig: { testMeta },
    IDS_Sandbox: {
      scopes: ['react-hook-form'],
    },
  },
} as Meta<typeof IressHookForm>;

export const HookForm: Story = {
  render: (args) => <HookFormExample {...args} />,
  parameters: {
    ...withSource(HookFormExampleSource, { stripImports: true }),
  },
};
