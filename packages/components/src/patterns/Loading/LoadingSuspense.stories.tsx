import { type Meta, type StoryObj } from '@storybook/react-vite';
import { IressLoadingSuspense } from './LoadingSuspense';
import { LoadingSuspenseWizard } from './mocks/LoadingWizardWithSuspense';
import LoadingSuspenseWizardSource from './mocks/LoadingWizardWithSuspense.tsx?raw';
import { LoadingSuspenseWizardFast } from './mocks/LoadingWizardWithSuspenseFast';
import LoadingSuspenseWizardFastSource from './mocks/LoadingWizardWithSuspenseFast.tsx?raw';
import { withSource } from '@iress-oss/ids-storybook-config';
import type { TestComponentMeta } from '@iress-oss/ids-storybook-config';

type Story = StoryObj<typeof IressLoadingSuspense>;

const testMeta: TestComponentMeta[] = [
  {
    part: 'main',
    description: 'The root loading element (delegates to IressLoading)',
    testId: 'loading',
  },
  {
    part: 'message',
    description: 'The loading message text',
    query: <code>getByText('...')</code>,
    testId: 'loading__message',
  },
];

export default {
  title: 'Patterns/Loading/Suspense',
  component: IressLoadingSuspense,
  tags: ['beta: '],
  parameters: {
    idsConfig: { testMeta },
  },
} as Meta<typeof IressLoadingSuspense>;

export const Suspense: Story = {
  parameters: {
    controls: { disable: true },
    ...withSource(LoadingSuspenseWizardSource, { stripImports: true }),
    layout: 'fullscreen',
  },
  render: (args) => <LoadingSuspenseWizard {...args} />,
};

export const FastSuspense: Story = {
  parameters: {
    controls: { disable: true },
    ...withSource(LoadingSuspenseWizardFastSource, { stripImports: true }),
    layout: 'fullscreen',
  },
  render: (args) => <LoadingSuspenseWizardFast {...args} />,
};
