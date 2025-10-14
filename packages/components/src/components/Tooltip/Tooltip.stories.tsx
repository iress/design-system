import { type StoryObj, type Meta } from '@storybook/react-vite';
import { disableArgTypes } from '@iress-storybook/helpers';

import { IressTooltip } from '.';
import { IressButton } from '../Button';
import { IressStack } from '../Stack';
import { IressInline } from '../Inline';

type Story = StoryObj<typeof IressTooltip>;

export default {
  title: 'Components/Tooltip',
  component: IressTooltip,
  argTypes: {
    ...disableArgTypes(['children', 'open']),
  },
  tags: ['updated'],
} as Meta<typeof IressTooltip>;

export const Default: Story = {
  args: {
    children: <IressButton>Hover me</IressButton>,
    tooltipText:
      'Hello! This is a really long tooltip to try and see if it goes behind the scrollbar',
  },
};

export const TooltipText: Story = {
  render: (args) => (
    <div style={{ paddingTop: '30px' }}>
      <IressInline gap="md">
        <IressTooltip
          {...args}
          tooltipText="Single line Hello! This is a really long tooltip to try and see if it goes behind the scrollbar"
        >
          <IressButton>Single line</IressButton>
        </IressTooltip>
        <IressTooltip
          {...args}
          tooltipText={['This tooltip', 'has multiple lines']}
        >
          <IressButton>Multi line</IressButton>
        </IressTooltip>
      </IressInline>
    </div>
  ),
};

export const Align: Story = {
  render: (args) => (
    <div style={{ padding: '80px 150px' }}>
      <IressStack gap="md">
        <IressInline horizontalAlign="center" gap="sm">
          <IressTooltip {...args} align="top-start">
            <IressButton>Top Start</IressButton>
          </IressTooltip>
          <IressTooltip {...args} align="top">
            <IressButton>Top</IressButton>
          </IressTooltip>
          <IressTooltip {...args} align="top-end">
            <IressButton>Top End</IressButton>
          </IressTooltip>
        </IressInline>
        <IressInline horizontalAlign="between">
          <IressStack gap="sm">
            <IressInline horizontalAlign="left">
              <IressTooltip {...args} align="left-start">
                <IressButton>Left Start</IressButton>
              </IressTooltip>
            </IressInline>
            <IressInline horizontalAlign="left">
              <IressTooltip {...args} align="left">
                <IressButton>Left</IressButton>
              </IressTooltip>
            </IressInline>
            <IressInline horizontalAlign="left">
              <IressTooltip {...args} align="left-end">
                <IressButton>Left End</IressButton>
              </IressTooltip>
            </IressInline>
          </IressStack>
          <IressStack gap="sm">
            <IressInline horizontalAlign="right">
              <IressTooltip {...args} align="right-start">
                <IressButton>Right Start</IressButton>
              </IressTooltip>
            </IressInline>
            <IressInline horizontalAlign="right">
              <IressTooltip {...args} align="right">
                <IressButton>Right</IressButton>
              </IressTooltip>
            </IressInline>
            <IressInline horizontalAlign="right">
              <IressTooltip {...args} align="right-end">
                <IressButton>Right End</IressButton>
              </IressTooltip>
            </IressInline>
          </IressStack>
        </IressInline>
        <IressInline horizontalAlign="center" gap="sm">
          <IressTooltip {...args} align="bottom-start">
            <IressButton>Bottom Start</IressButton>
          </IressTooltip>
          <IressTooltip {...args} align="bottom">
            <IressButton>Bottom</IressButton>
          </IressTooltip>
          <IressTooltip {...args} align="bottom-end">
            <IressButton>Bottom End</IressButton>
          </IressTooltip>
        </IressInline>
      </IressStack>
    </div>
  ),
  args: {
    tooltipText: 'Hello!',
  },
  argTypes: {
    ...disableArgTypes(['align']),
  },
};

export const Delay: Story = {
  render: (args) => (
    <div style={{ paddingTop: '30px' }}>
      <IressInline horizontalAlign="center" gap="sm">
        <IressTooltip {...args} delay={0}>
          <IressButton>0ms (no delay)</IressButton>
        </IressTooltip>
        <IressTooltip {...args}>
          <IressButton>500ms (default)</IressButton>
        </IressTooltip>

        <IressTooltip {...args} delay={2000}>
          <IressButton>2000ms</IressButton>
        </IressTooltip>
      </IressInline>
    </div>
  ),
  args: {
    tooltipText: 'Hello!',
  },
};
