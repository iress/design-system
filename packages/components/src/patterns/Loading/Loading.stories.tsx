import { type Meta, type StoryObj } from '@storybook/react-vite';
import { IressLoading } from '.';
import { LoadingWizard } from './mocks/LoadingWizard';
import LoadingWizardSource from './mocks/LoadingWizard.tsx?raw';
import { LoadingWizardFast } from './mocks/LoadingWizardFast';
import LoadingWizardFastSource from './mocks/LoadingWizardFast.tsx?raw';
import { withCustomSource } from '@iress-oss/ids-storybook-sandbox';

type Story = StoryObj<typeof IressLoading>;

export default {
  title: 'Patterns/Loading',
  component: IressLoading,
  tags: ['beta: '],
} as Meta<typeof IressLoading>;

export const Wizard: Story = {
  render: () => <LoadingWizard />,
  parameters: {
    ...withCustomSource(LoadingWizardSource),
    layout: 'fullscreen',
  },
};

export const FastWizard: Story = {
  render: () => <LoadingWizardFast />,
  parameters: {
    ...withCustomSource(LoadingWizardFastSource),
    layout: 'fullscreen',
  },
};
