import { type Meta, type StoryObj } from '@storybook/react';

import { IressPopover } from './Popover';
import { IressButton } from '../Button';
import { IressPanel } from '../Panel';
import { PopoverUsingState } from './mocks/PopoverUsingState';
import PopoverUsingStateSource from './mocks/PopoverUsingState.tsx?raw';
import { IressStack } from '../Stack';
import { IressInline } from '../Inline';
import { IressTooltip } from '../Tooltip';
import { IressRow } from '../Row';
import { IressCol } from '../Col';
import { IressText } from '../Text';
import { MENU_CHILDREN_OPTIONS } from '../Menu/mocks/menuChildrenOptions';
import { IressMenu } from '../Menu';
import { PopoverParentContainer } from './mocks/PopoverParentContainer';
import PopoverParentContainerSource from './mocks/PopoverParentContainer.tsx?raw';
import {
  disableArgTypes,
  withCustomSource,
  withTransformedRawSource,
} from '@iress-oss/ids-storybook-config';

type Story = StoryObj<typeof IressPopover>;

const childrenOptions = {
  none: null,
  hello: <IressPanel className="iress-u-text">Hello!</IressPanel>,
  basic: (
    <IressPanel className="iress-u-text">
      A little more information about this area.
    </IressPanel>
  ),
  details: (
    <IressPanel>
      <IressRow>
        <IressCol span={6}>
          <IressText>Client</IressText>
          <IressText noGutter>
            <ul>
              <li>Entity id 582323</li>
              <li>Fruit Apple</li>
              <li>Preferred email mamaduke@gmail.com</li>
            </ul>
          </IressText>
        </IressCol>
        <IressCol span={6}>
          <IressText>Client</IressText>
          <IressText noGutter>
            <ul>
              <li>Entity id 8766</li>
              <li>Fruit Orange</li>
              <li>Preferred email felicity@yahoo.com</li>
            </ul>
          </IressText>
        </IressCol>
      </IressRow>
    </IressPanel>
  ),
  paragraph: (
    <IressPanel>
      <IressText noGutter>
        <p>
          His head is gone, it is like it is been erased... Erased from
          existence. That was the day I invented time travel. I remember it
          vividly. I was standing on the edge of my toilet hanging a clock, the
          porces was wet, I slipped, hit my head on the edge of the sink. And
          when I came to I had a revelation, a picture, a picture in my head, a
          picture of this. This is what makes time travel possible. The flux
          capacitor.
        </p>
      </IressText>
    </IressPanel>
  ),
  menu: (
    <IressMenu role="listbox">{MENU_CHILDREN_OPTIONS.selectable}</IressMenu>
  ),
};

export default {
  title: 'Components/Popover',
  component: IressPopover,
  argTypes: {
    ...disableArgTypes(['activator']),
    children: {
      control: {
        type: 'select',
        labels: {
          Heading: 'With Custom Children',
        },
      },
      options: Object.keys(childrenOptions),
      mapping: childrenOptions,
    },
  },
} as Meta<typeof IressPopover>;

export const Activator: Story = {
  args: {
    activator: <IressButton>Toggle popover</IressButton>,
    children: 'basic',
  },
};

export const ShowWithState: Story = {
  args: {
    ...Activator.args,
  },
  argTypes: {
    ...disableArgTypes(['activator', 'children', 'show']),
  },
  render: (args) => <PopoverUsingState {...args} />,
  parameters: {
    ...withTransformedRawSource(PopoverUsingStateSource, 'IressPopoverProps', [
      'activator',
      'children',
    ]),
  },
};

export const Align: Story = {
  args: {
    ...Activator.args,
    children: 'hello',
  },
  argTypes: {
    ...disableArgTypes(['align', 'activator']),
  },
  render: (args) => (
    <div style={{ padding: '80px 150px' }}>
      <IressStack gutter="md">
        <IressInline horizontalAlign="center" gutter="sm">
          <IressPopover
            {...args}
            activator={
              <IressTooltip
                align="bottom-start"
                tooltipText="Tooltips and popovers can go together if needed!"
              >
                <IressButton>top-start</IressButton>
              </IressTooltip>
            }
            align="top-start"
          />
          <IressPopover
            {...args}
            activator={<IressButton>top</IressButton>}
            align="top"
          />
          <IressPopover
            {...args}
            activator={<IressButton>top-end</IressButton>}
            align="top-end"
          />
        </IressInline>
        <IressInline horizontalAlign="between">
          <IressStack gutter="sm">
            <IressInline horizontalAlign="left">
              <IressPopover
                {...args}
                activator={<IressButton>left-start</IressButton>}
                align="left-start"
              />
            </IressInline>
            <IressInline horizontalAlign="left">
              <IressPopover
                {...args}
                activator={<IressButton>left</IressButton>}
                align="left"
              />
            </IressInline>
            <IressInline horizontalAlign="left">
              <IressPopover
                {...args}
                activator={<IressButton>left-end</IressButton>}
                align="left-end"
              />
            </IressInline>
          </IressStack>
          <IressStack gutter="sm">
            <IressInline horizontalAlign="right">
              <IressPopover
                {...args}
                activator={<IressButton>right-start</IressButton>}
                align="right-start"
              />
            </IressInline>
            <IressInline horizontalAlign="right">
              <IressPopover
                {...args}
                activator={<IressButton>right</IressButton>}
                align="right"
              />
            </IressInline>
            <IressInline horizontalAlign="right">
              <IressPopover
                {...args}
                activator={<IressButton>right-end</IressButton>}
                align="right-end"
              />
            </IressInline>
          </IressStack>
        </IressInline>
        <IressInline horizontalAlign="center" gutter="sm">
          <IressPopover
            {...args}
            activator={<IressButton>bottom-start</IressButton>}
            align="bottom-start"
          />
          <IressPopover
            {...args}
            activator={<IressButton>bottom</IressButton>}
            align="bottom"
          />
          <IressPopover
            {...args}
            activator={<IressButton>bottom-end</IressButton>}
            align="bottom-end"
          />
        </IressInline>
      </IressStack>
    </div>
  ),
};

export const Width: Story = {
  args: {
    ...Activator.args,
    children: 'details',
    container: document.body,
  },
  argTypes: {
    ...disableArgTypes(['show', 'width']),
  },
  render: (args) => (
    <IressPopover
      {...args}
      style={{ '--iress-max-width': '30rem', '--iress-width': '100%' } as never}
    />
  ),
};

export const Overflow: Story = {
  args: {
    ...Activator.args,
    align: 'bottom-start',
    children: 'paragraph',
    container: document.body,
  },
  render: (args) => (
    <IressInline gutter="md">
      <IressPopover
        {...args}
        activator={<IressButton>Normal popover</IressButton>}
      />
      <IressPopover
        {...args}
        activator={<IressButton>Fixed height popover</IressButton>}
        style={
          {
            '--iress-max-height': '200px',
            '--iress-overflow-y': 'auto',
          } as never
        }
      />
    </IressInline>
  ),
};

export const Inline: Story = {
  args: {
    ...Activator.args,
    displayMode: 'inline',
  },
  render: (args) => (
    <IressStack gutter={IressStack.Gutter.Md}>
      <IressPopover {...args} />
      <IressText>This content will be pushed down</IressText>
    </IressStack>
  ),
};

export const MatchActivatorWidth: Story = {
  ...Activator,
  args: {
    ...Activator.args,
    activator: (
      <IressButton>
        This popover will match the width of its activator
      </IressButton>
    ),
    align: 'bottom',
    matchActivatorWidth: true,
  },
};

export const VirtualFocus: Story = {
  ...Activator,
  args: {
    ...Activator.args,
    children: 'menu',
    type: 'listbox',
    virtualFocus: true,
  },
};

export const ParentContainer: Story = {
  render: (args) => <PopoverParentContainer {...args} />,
  parameters: {
    ...withCustomSource(PopoverParentContainerSource),
  },
};
