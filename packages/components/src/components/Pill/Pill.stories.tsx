import { type Meta, type StoryObj } from '@storybook/react-vite';
import {
  disableArgTypes,
  reactElementArgType,
  reactNodeArgType,
  stylingProps,
} from '@iress-oss/ids-storybook-config';
import { IressPill, IressInline, IressTab, IressTabSet } from '@/main';
import { STATUSES } from '@/constants';

type Story = StoryObj<typeof IressPill>;
const BADGE_MODES = [10, 20, 30, 40, 50, 60, 70, 80, 90] as const;

export default {
  title: 'Components/Pill',
  component: IressPill,
  tags: ['updated'],
  argTypes: {
    children: reactNodeArgType,
    host: reactElementArgType,
    ...stylingProps,
  },
} as Meta<typeof IressPill>;

export const Default: Story = {
  args: {
    children: 'Label',
  },
};

export const Mode: Story = {
  ...Default,
  argTypes: {
    ...disableArgTypes(['mode']),
  },
  render: (args) => (
    <IressInline gap="sm">
      {BADGE_MODES.map((mode) => (
        <IressPill {...args} key={mode} mode={mode}>
          {mode}
        </IressPill>
      ))}
    </IressInline>
  ),
};

export const Status: Story = {
  ...Default,
  argTypes: {
    ...disableArgTypes(['mode']),
  },
  render: (args) => (
    <IressInline gap="sm">
      {STATUSES.map((status) => (
        <IressPill {...args} mode={status} key={status}>
          {status}
        </IressPill>
      ))}
    </IressInline>
  ),
};

export const Neutral: Story = {
  args: {
    children: 'Neutral',
    mode: 'neutral',
  },
};

export const Compact: Story = {
  ...Default,
  argTypes: {
    ...disableArgTypes(['compact']),
  },
  args: {
    mode: 'neutral',
  },
  render: (args) => (
    <IressInline gap="sm" verticalAlign="middle">
      <IressPill {...args}>2</IressPill>
      <IressPill {...args}>3/6</IressPill>
      <IressPill {...args} compact>
        2
      </IressPill>
      <IressPill {...args} compact>
        3/6
      </IressPill>
    </IressInline>
  ),
};

export const CompactInTabs: Story = {
  ...Default,
  argTypes: {
    ...disableArgTypes(['compact']),
  },
  args: {
    mode: 'neutral',
  },
  render: (args) => (
    <IressTabSet>
      <IressTab label="Feed">Feed content</IressTab>
      <IressTab
        label={
          <>
            Comments
            <IressPill {...args} compact ml="xs">
              2
            </IressPill>
          </>
        }
      >
        Comments content
      </IressTab>
      <IressTab
        label={
          <>
            Checklist
            <IressPill {...args} compact ml="xs">
              3/6
            </IressPill>
          </>
        }
      >
        Checklist content
      </IressTab>
      <IressTab
        label={
          <>
            Attachments
            <IressPill {...args} compact ml="xs">
              4
            </IressPill>
          </>
        }
      >
        Attachments content
      </IressTab>
    </IressTabSet>
  ),
};
