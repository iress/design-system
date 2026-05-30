import { type Meta, type StoryObj } from '@storybook/react-vite';
import { IressLoading } from '.';
import { LoadingWizard } from './mocks/LoadingWizard';
import LoadingWizardSource from './mocks/LoadingWizard.tsx?raw';
import { LoadingWizardFast } from './mocks/LoadingWizardFast';
import LoadingWizardFastSource from './mocks/LoadingWizardFast.tsx?raw';
import {
  withSource,
  stylingProps,
} from '@iress-oss/ids-storybook-config';
import componentMeta from './meta';

type Story = StoryObj<typeof IressLoading>;

export default {
  title: 'Patterns/Loading',
  component: IressLoading,
  argTypes: {
    ...stylingProps,
  },
  parameters: {
    docs: {
      description: {
        component: componentMeta.description,
      },
    },
  },
} as Meta<typeof IressLoading>;

export const Default: Story = {
  args: {
    screenReaderText: 'Loading...',
  },
};

export const Wizard: Story = {
  parameters: {
    controls: { disable: true },
    ...withSource(LoadingWizardSource, { stripImports: true, stripExportFunction: true }),
    layout: 'fullscreen',
  },
  render: (args) => <LoadingWizard {...args} />,
};

export const FastWizard: Story = {
  parameters: {
    controls: { disable: true },
    ...withSource(LoadingWizardFastSource, { stripImports: true, stripExportFunction: true }),
    layout: 'fullscreen',
  },
  render: (args) => <LoadingWizardFast {...args} />,
};
