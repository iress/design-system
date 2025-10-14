import { Meta, StoryObj } from '@storybook/react';
import { IressLoadingSuspense } from './LoadingSuspense';
import { withCustomSource } from '@iress-storybook/helpers';
import { LoadingSuspenseWizard } from './mocks/LoadingWizardWithSuspense';
import LoadingSuspenseWizardSource from './mocks/LoadingWizardWithSuspense.tsx?raw';
import { LoadingSuspenseWizardFast } from './mocks/LoadingWizardWithSuspenseFast';
import LoadingSuspenseWizardFastSource from './mocks/LoadingWizardWithSuspenseFast.tsx?raw';

type Story = StoryObj<typeof IressLoadingSuspense>;

export default {
  title: 'Patterns/Loading/Suspense',
  component: IressLoadingSuspense,
  tags: ['beta: '],
} as Meta<typeof IressLoadingSuspense>;

export const Suspense: Story = {
  render: () => <LoadingSuspenseWizard />,
  parameters: {
    ...withCustomSource(LoadingSuspenseWizardSource),
    layout: 'fullscreen',
  },
};

export const FastSuspense: Story = {
  render: () => <LoadingSuspenseWizardFast />,
  parameters: {
    ...withCustomSource(LoadingSuspenseWizardFastSource),
    layout: 'fullscreen',
  },
};
