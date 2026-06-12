import { type Meta, type StoryObj } from '@storybook/react-vite';
import { IressTab, IressTabSet } from '.';
import {
  IressExpander,
  IressIcon,
  IressInline,
  IressPill,
  IressStack,
  IressText,
} from '../../main';
import { TabsUsingState } from './mocks/TabsUsingState';
import TabsUsingStateSource from './mocks/TabsUsingState.tsx?raw';
import { TabsLazyLoading } from './mocks/TabsLazyLoading';
import TabsLazyLoadingSource from './mocks/TabsLazyLoading.tsx?raw';
import { TabsWithDynamicBadge } from './mocks/TabsWithDynamicBadge';
import TabsWithDynamicBadgeSource from './mocks/TabsWithDynamicBadge.tsx?raw';
import { TabSetLayout } from './mocks/TabSetLayout';
import TabSetLayoutSource from './mocks/TabSetLayout.tsx?raw';
import {
  componentStoryMeta,
  disableArgTypes,
  mergeStorybookConfig,
  withSource,
  reactNodeArgType,
} from '@iress-oss/ids-storybook-config';
import componentMeta from './meta';

type Story = StoryObj<typeof IressTabSet>;

export default {
  title: 'Components/TabSet',
  component: IressTabSet,
  ...componentStoryMeta(componentMeta, {
    argTypes: {
      ...mergeStorybookConfig(disableArgTypes(['children']), {
        children: reactNodeArgType,
      }),
    },
  }),
} as Meta<typeof IressTabSet>;

export const Default: Story = {
  args: {
    children: [
      <IressTab key="tab1" label="Tab 1">
        Tab 1 content
      </IressTab>,
      <IressTab key="tab2" label="Tab 2">
        Tab 2 content
      </IressTab>,
      <IressTab key="tab3" label="Tab 3">
        Tab 3 content
      </IressTab>,
    ],
  },
};

export const TabNavigation: Story = {
  args: {
    children: [
      <IressTab key="iress" label="Iress" href="https://iress.com" />,
      <IressTab key="google" label="Google" href="https://google.com" />,
    ],
  },
};

export const Panels: Story = {
  args: {
    children: [
      <IressTab key="address" label="Address">
        Address information goes here
      </IressTab>,
      <IressTab key="employment" label="Employment">
        Employment information goes here
      </IressTab>,
      <IressTab key="history" label="History">
        Medical history goes here
      </IressTab>,
    ],
  },
};

export const DefaultSelected: Story = {
  ...Panels,
  args: {
    ...TabNavigation.args,
    defaultSelected: 1,
  },
};

export const Controlled: Story = {
  render: (args) => <TabsUsingState {...args} />,
  parameters: {
    controls: { disable: true },
    ...withSource(TabsUsingStateSource, { stripImports: true }),
  },
};

export const Layout: Story = {
  render: (args) => <TabSetLayout {...args} />,
  parameters: {
    controls: { disable: true },
    ...withSource(TabSetLayoutSource, { stripImports: true, stripExportFunction: true }),
  },
};

export const LazyLoading: Story = {
  render: (args) => <TabsLazyLoading {...args} />,
  parameters: {
    controls: { disable: true },
    ...withSource(TabsLazyLoadingSource, { stripImports: true }),
  },
};

export const TabsWithBadges: Story = {
  args: {
    children: [
      <IressTab
        key="address"
        label={
          <>
            Address <IressPill ml="xs">3</IressPill>
          </>
        }
      >
        Address information goes here{' '}
      </IressTab>,
      <IressTab
        key="employment"
        label={
          <IressInline gap="sm" verticalAlign="middle" noWrap>
            <IressIcon name="user" /> Employment
          </IressInline>
        }
      >
        Employment information goes here
      </IressTab>,
      <IressTab key="history" label="History">
        Medical history goes here
      </IressTab>,
    ],
  },
};

export const DynamicBadge: Story = {
  render: (args) => <TabsWithDynamicBadge {...args} />,
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'Toggle the pill on the active tab to see the active indicator resize and reposition automatically. This demonstrates that `ResizeObserver` correctly tracks tab size changes at runtime.',
      },
      ...withSource(TabsWithDynamicBadgeSource, { stripImports: true }).docs as object,
    },
  },
};

export const Append: Story = {
  args: {
    append: <IressPill>3 items</IressPill>,
    children: [
      <IressTab key="address" label="Address">
        Address information goes here
      </IressTab>,
      <IressTab key="employment" label="Employment">
        Employment information goes here
      </IressTab>,
    ],
  },
};

export const Type: Story = {
  ...Panels,
  args: {
    ...TabNavigation.args,
    defaultSelected: 1,
  },
  render: (args) => (
    <IressStack gap="md">
      <IressText element="h2">Primary</IressText>
      <IressTabSet {...args} type="primary" />
      <IressExpander activator="Secondary">
        <IressTabSet {...args} type="secondary" mt="-md" />
      </IressExpander>
    </IressStack>
  ),
};
