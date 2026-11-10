import { type Meta, type StoryObj } from '@storybook/react-vite';
import { IressTooltipProvider, type IressTooltipProviderProps } from '.';
import { App as AppWithTooltipProvider } from './mocks/AppWithTooltipProvider';
import AppWithTooltipProviderSource from './mocks/AppWithTooltipProvider.tsx?raw';
import {
  disableArgTypes,
  stylingProps,
  withSource,
} from '@iress-oss/ids-storybook-config';
import type { TestComponentMeta } from '@iress-oss/ids-storybook-config';

type Story = StoryObj<IressTooltipProviderProps>;

const testMeta: TestComponentMeta[] = [
  {
    part: 'main',
    description: 'The root element of the tooltip provider',
    testId: 'tooltip-provider',
  },
];

export default {
  title: 'Components/Tooltip/TooltipProvider',
  component: IressTooltipProvider,
  argTypes: {
    ...disableArgTypes(['children', 'container']),
    ...stylingProps,
  },
  parameters: {
    idsConfig: { testMeta },
    docs: {
      description: {
        component:
          'Provides a context-based API for managing tooltips declaratively via the useTooltip hook.',
      },
    },
    actions: {
      disable: true,
    },
  },
  tags: ['beta'],
} as Meta<typeof IressTooltipProvider>;

export const Provider: Story = {
  render: (_args) => <AppWithTooltipProvider />,
  parameters: {
    controls: { disable: true },
    ...withSource(AppWithTooltipProviderSource, {
      stripImports: true,
    }),
  },
};
