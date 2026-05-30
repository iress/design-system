import { type Meta, type StoryObj } from '@storybook/react-vite';
import { IressLoadingSuspense } from './LoadingSuspense';
import { LoadingSuspenseWizard } from './mocks/LoadingWizardWithSuspense';
import LoadingSuspenseWizardSource from './mocks/LoadingWizardWithSuspense.tsx?raw';
import { LoadingSuspenseWizardFast } from './mocks/LoadingWizardWithSuspenseFast';
import LoadingSuspenseWizardFastSource from './mocks/LoadingWizardWithSuspenseFast.tsx?raw';
import { withSource } from '@iress-oss/ids-storybook-config';

type Story = StoryObj<typeof IressLoadingSuspense>;

export default {
  title: 'Patterns/Loading/Suspense',
  component: IressLoadingSuspense,
  tags: ['beta: '],
} as Meta<typeof IressLoadingSuspense>;

export const Suspense: Story = {
  parameters: {
    controls: { disable: true },
    ...withSource(LoadingSuspenseWizardSource, { stripImports: true, stripExportFunction: true }),
    layout: 'fullscreen',
  },
  render: (args) => <LoadingSuspenseWizard {...args} />,
};

export const FastSuspense: Story = {
  parameters: {
    controls: { disable: true },
    ...withSource(LoadingSuspenseWizardFastSource, { stripImports: true, stripExportFunction: true }),
    layout: 'fullscreen',
  },
  render: (args) => <LoadingSuspenseWizardFast {...args} />,
};
