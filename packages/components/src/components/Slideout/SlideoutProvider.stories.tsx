import { type Meta, type StoryObj } from '@storybook/react-vite';
import { IressSlideoutProvider, type IressSlideoutProviderProps } from '.';
import { AppWithSlideoutProvider } from './mocks/AppWithSlideoutProvider';
import AppWithSlideoutProviderSource from './mocks/AppWithSlideoutProvider.tsx?raw';
import {
  disableArgTypes,
  stylingProps,
  withSource,
} from '@iress-oss/ids-storybook-config';
import type { TestComponentMeta } from '@iress-oss/ids-storybook-config';

type Story = StoryObj<IressSlideoutProviderProps>;

const testMeta: TestComponentMeta[] = [
  {
    part: 'main',
    description: 'The root element of the slideout provider',
    testId: 'slideout-provider',
  },
];

export default {
  title: 'Components/Slideout/Provider',
  component: IressSlideoutProvider,
  argTypes: {
    ...disableArgTypes(['children', 'container']),
    ...stylingProps,
  },
  parameters: {
    idsConfig: { testMeta },
    docs: {
      description: {
        component:
          'Provides a context-based API for managing slideouts declaratively via the useSlideout hook.',
      },
    },
    actions: {
      disable: true,
    },
  },
  tags: ['updated'],
} as Meta<typeof IressSlideoutProvider>;

export const Provider: Story = {
  render: (_args) => <AppWithSlideoutProvider />,
  parameters: {
    controls: { disable: true },
    ...withSource(AppWithSlideoutProviderSource, { stripImports: true }),
  },
};
