import { type Meta, type StoryObj } from '@storybook/react-vite';
import { IressProvider } from './Provider';
import { AppWithProvider } from './mocks/AppWithProvider';
import AppWithProviderSource from './mocks/AppWithProvider.tsx?raw';
import {
  disableArgTypes,
  reactNodeArgType,
  withSource,
  stylingProps,
} from '@iress-oss/ids-storybook-config';
import type { TestComponentMeta } from '@iress-oss/ids-storybook-config';

type Story = StoryObj<typeof IressProvider>;

const testMeta: TestComponentMeta[] = [
  {
    part: 'main',
    description: 'The root element of the provider',
    testId: 'provider',
  },
];

export default {
  title: 'Components/Provider',
  component: IressProvider,
  argTypes: {
    ...disableArgTypes(['children']),
    children: reactNodeArgType,
    ...stylingProps,
  },
  parameters: {
    idsConfig: { testMeta },
    docs: {
      description: {
        component:
          'The root provider that wraps your application to enable IDS theming, icons, and context features.',
      },
    },
  },
} as Meta<typeof IressProvider>;

export const Default: Story = {
  render: (_args) => <AppWithProvider />,
  parameters: {
    controls: { disable: true },
    ...withSource(AppWithProviderSource, { stripImports: true }),
  },
};
