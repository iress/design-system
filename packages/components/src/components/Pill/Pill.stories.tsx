import { type Meta, type StoryObj } from '@storybook/react-vite';
import {
  reactElementArgType,
  reactNodeArgType,
  stylingProps,
  withSource,
} from '@iress-oss/ids-storybook-config';
import { IressPill } from '@/main';
import componentMeta from './meta';

import { PillMode } from './mocks/PillMode';
import PillModeSource from './mocks/PillMode.tsx?raw';
import { PillStatus } from './mocks/PillStatus';
import PillStatusSource from './mocks/PillStatus.tsx?raw';

type Story = StoryObj<typeof IressPill>;

export default {
  title: 'Components/Pill',
  component: IressPill,
  tags: ['updated'],
  argTypes: {
    children: reactNodeArgType,
    host: reactElementArgType,
    ...stylingProps,
  },
  parameters: {
    docs: {
      description: {
        component: componentMeta.description,
      },
    },
  },
} as Meta<typeof IressPill>;

export const Default: Story = {
  args: {
    children: 'Label',
  },
};

export const Mode: Story = {
  render: (args) => <PillMode {...args} />,
  parameters: {
    controls: { disable: true },
    ...withSource(PillModeSource, { stripImports: true, stripExportFunction: true }),
  },
};

export const Status: Story = {
  render: (args) => <PillStatus {...args} />,
  parameters: {
    controls: { disable: true },
    ...withSource(PillStatusSource, { stripImports: true, stripExportFunction: true }),
  },
};
