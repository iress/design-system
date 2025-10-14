import { Meta, StoryObj } from '@storybook/react';
import { IressTab, IressTabSet, TAB_SET_LAYOUTS } from '.';
import { IressStack } from '../Stack';
import {
  IressBadge,
  IressIcon,
  IressInline,
  IressPanel,
  IressText,
} from '../../main';
import {
  disableArgTypes,
  withTransformedRawSource,
} from '@iress-storybook/helpers';
import { TabsUsingState } from './mocks/TabsUsingState';
import TabsUsingStateSource from './mocks/TabsUsingState.tsx?raw';
import { TabsLazyLoading } from './mocks/TabsLazyLoading';
import TabsLazyLoadingSource from './mocks/TabsLazyLoading.tsx?raw';

type Story = StoryObj<typeof IressTabSet>;

export default {
  title: 'Components/TabSet',
  component: IressTabSet,
  argTypes: {
    ...disableArgTypes(['children']),
  },
} as Meta<typeof IressTabSet>;

export const TabNavigation: Story = {
  args: {
    children: [
      <IressTab key="address" label="Address" />,
      <IressTab key="employment" label="Employment" />,
      <IressTab key="history" label="History" />,
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
    defaultSelected: 2,
  },
};

export const Controlled: Story = {
  ...Panels,
  argTypes: {
    ...disableArgTypes(['children', 'selected']),
  },
  render: (args) => <TabsUsingState {...args} />,
  parameters: {
    ...withTransformedRawSource(TabsUsingStateSource, 'IressTabSetProps', [
      'children',
    ]),
  },
};

export const Layout: Story = {
  ...Panels,
  argTypes: {
    ...disableArgTypes(['layout']),
  },
  render: (args) => (
    <IressStack gutter="md">
      {TAB_SET_LAYOUTS.map((layout) => (
        <IressPanel key={layout}>
          <IressText element={IressText.Element.H2}>{layout}</IressText>
          <IressTabSet {...args} layout={layout} />
        </IressPanel>
      ))}
    </IressStack>
  ),
};

export const LazyLoading: Story = {
  args: {
    defaultSelected: 'medical',
  },
  render: (args) => <TabsLazyLoading {...args} />,
  parameters: {
    ...withTransformedRawSource(TabsLazyLoadingSource, 'IressTabSetProps', [
      'children',
    ]),
  },
};

export const TabsWithBadges: Story = {
  args: {
    children: [
      <IressBadge
        key="address"
        pill
        host={
          <IressTab label="Address">Address information goes here</IressTab>
        }
        mode="info"
      >
        3
      </IressBadge>,
      <IressTab
        key="employment"
        label={
          <IressInline gutter="sm">
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
