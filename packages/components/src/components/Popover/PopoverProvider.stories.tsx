import { type Meta, type StoryObj } from '@storybook/react-vite';
import { IressPopoverProvider, type IressPopoverProviderProps } from '.';
import { App as AppWithPopoverProvider } from './mocks/AppWithPopoverProvider';
import AppWithPopoverProviderSource from './mocks/AppWithPopoverProvider.tsx?raw';
import {
  disableArgTypes,
  stylingProps,
  withSource,
} from '@iress-oss/ids-storybook-config';
import type { TestComponentMeta } from '@iress-oss/ids-storybook-config';

type Story = StoryObj<IressPopoverProviderProps>;

const testMeta: TestComponentMeta[] = [
  {
    part: 'main',
    description: 'The root element of the popover provider',
    testId: 'popover-provider',
  },
];

export default {
  title: 'Components/Popover/Provider',
  component: IressPopoverProvider,
  argTypes: {
    ...disableArgTypes(['children', 'container']),
    ...stylingProps,
  },
  parameters: {
    idsConfig: { testMeta },
    docs: {
      description: {
        component:
          'Provides a context-based API for managing popovers declaratively via the usePopover hook.',
      },
    },
    actions: {
      disable: true,
    },
  },
  tags: ['beta'],
} as Meta<typeof IressPopoverProvider>;

export const Provider: Story = {
  render: (_args) => <AppWithPopoverProvider />,
  parameters: {
    controls: { disable: true },
    ...withSource(AppWithPopoverProviderSource, { stripImports: true }),
  },
};
