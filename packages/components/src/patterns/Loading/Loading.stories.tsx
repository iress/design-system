import { type Meta, type StoryObj } from '@storybook/react-vite';
import { IressLoading } from '.';
import { LoadingWizard } from './mocks/LoadingWizard';
import LoadingWizardSource from './mocks/LoadingWizard.tsx?raw';
import { LoadingWizardFast } from './mocks/LoadingWizardFast';
import LoadingWizardFastSource from './mocks/LoadingWizardFast.tsx?raw';
import { withSource, stylingProps } from '@iress-oss/ids-storybook-config';
import componentMeta from './meta';
import { LoadingGraph } from './mocks/LoadingGraph';
import LoadingGraphSource from './mocks/LoadingGraph.tsx?raw';
import { LoadingLongWithError } from './mocks/LoadingLongWithError';
import LoadingLongWithErrorSource from './mocks/LoadingLongWithError.tsx?raw';
import { LoadingDashboard } from './mocks/LoadingDashboard';
import LoadingDashboardSource from './mocks/LoadingDashboard.tsx?raw';
import { LoadingDashboardError } from './mocks/LoadingDashboardError';
import LoadingDashboardErrorSource from './mocks/LoadingDashboardError.tsx?raw';
import { IressButton, IressInline } from '@/main';
import type { LongLoading } from './components/LongLoading';
import type { StartUpLoading } from './components/StartUpLoading';
import type { DefaultLoading } from './components/DefaultLoading';
import type { ValidateLoading } from './components/ValidateLoading';

type Story = StoryObj<typeof IressLoading>;
type LongLoadingStory = StoryObj<typeof LongLoading>;
type StartUpLoadingStory = StoryObj<typeof StartUpLoading>;
type DefaultLoadingStory = StoryObj<typeof DefaultLoading>;
type ValidateLoadingStory = StoryObj<typeof ValidateLoading>;

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
    idsConfig: {
      tabDescriptions: {
        patterns:
          'Loading patterns are pre-built configurations of the `IressLoading` component that are designed to cover common loading scenarios. They provide a consistent user experience while saving development time. Each pattern is built with accessibility in mind and can be easily customized to fit your specific use case.',
      },
    },
  },
} as Meta<typeof IressLoading>;

export const Playground: Story = {
  args: {
    screenReaderText: 'Loading...',
  },
};

export const Wizard: Story = {
  parameters: {
    controls: { disable: true },
    ...withSource(LoadingWizardSource, {
      stripImports: true,
    }),
    layout: 'fullscreen',
  },
  render: (args) => <LoadingWizard {...args} />,
};

export const FastWizard: Story = {
  parameters: {
    controls: { disable: true },
    ...withSource(LoadingWizardFastSource, {
      stripImports: true,
    }),
    layout: 'fullscreen',
  },
  render: (args) => <LoadingWizardFast {...args} />,
};

// Loading Patterns (merged from components/*.stories.tsx)

export const Default: DefaultLoadingStory = {
  tags: ['tab:patterns'],
  render: (args) => <IressLoading {...args} pattern="default" />,
};

export const Component: Story = {
  tags: ['tab:patterns'],
  render: (args) => <LoadingGraph {...args} />,
  parameters: {
    controls: { disable: true },
    ...withSource(LoadingGraphSource, {
      stripImports: true,
    }),
  },
};

export const Page: Story = {
  tags: ['tab:patterns'],
  render: (args) => <LoadingDashboard {...args} />,
  parameters: {
    controls: { disable: true },
    ...withSource(LoadingDashboardSource, {
      stripImports: true,
    }),
  },
};

export const PageError: Story = {
  tags: ['tab:patterns'],
  render: (args) => <LoadingDashboardError {...args} />,
  parameters: {
    controls: { disable: true },
    ...withSource(LoadingDashboardErrorSource, {
      stripImports: true,
    }),
  },
};

export const Long: LongLoadingStory = {
  tags: ['tab:patterns'],
  render: (args) => (
    <IressLoading
      {...args}
      pattern="long"
      messageList={{
        3000: 'Processing transcript',
        5000: 'Noting key information',
        7000: 'Generating summary',
      }}
    />
  ),
};

export const LongError: Story = {
  tags: ['tab:patterns'],
  render: (args) => <LoadingLongWithError {...args} />,
  parameters: {
    controls: { disable: true },
    ...withSource(LoadingLongWithErrorSource, {
      stripImports: true,
    }),
  },
};

export const StartUp: StartUpLoadingStory = {
  tags: ['tab:patterns'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      story: {
        height: '600px',
      },
    },
  },
  render: (args) => (
    <IressLoading
      {...args}
      pattern="start-up"
      messageList={{
        0: 'Switching applications...',
        4500: 'This is taking longer than expected...',
      }}
    />
  ),
};

export const Validate: ValidateLoadingStory = {
  tags: ['tab:patterns'],
  render: (args) => (
    <IressInline gap="sm">
      <IressLoading {...args} pattern="validate" loading />
      <IressButton mode="quaternary">Cancel</IressButton>
    </IressInline>
  ),
};
