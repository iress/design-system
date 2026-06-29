import { type StoryObj, type Meta } from '@storybook/react-vite';

import { IressRow } from '.';
import { IressContainer } from '../Container';
import { IressPlaceholder } from '../Placeholder';
import { IressText } from '../Text';
import { IressCol } from '../Col';
import { IressDivider } from '../Divider';
import { HORIZONTAL_ALIGNS, IressStack, VERTICAL_ALIGNS } from '@/main';
import { SPACING_AND_ALIAS_TOKENS } from '@theme-preset/tokens/spacing';
import {
  componentStoryMeta,
  disableArgTypes,
  reactNodeArgType,
  withBreakpointLabel,
} from '@iress-oss/ids-storybook-config';
import { cssVars } from '@iress-oss/ids-tokens';
import componentMeta from './meta';

type Story = StoryObj<typeof IressRow>;

export default {
  title: 'Components/Row',
  component: IressRow,
  ...componentStoryMeta(componentMeta, {
    argTypes: {
      children: reactNodeArgType,
    },
  }),
} as Meta<typeof IressRow>;

const ROW_CHILDREN_OPTIONS = {
  none: null,
  twoBasicPlaceholders: [
    <IressCol key="1">
      <IressPlaceholder>
        <IressText noGutter textAlign="center" p="md">
          Child 1<br />
        </IressText>
      </IressPlaceholder>
    </IressCol>,
    <IressCol key="2">
      <IressPlaceholder>
        <IressText noGutter textAlign="center" p="md">
          Child 2
        </IressText>
      </IressPlaceholder>
    </IressCol>,
  ],

  threeDifferentSizedPlaceholders: [
    <IressCol key="1">
      <IressPlaceholder>
        <IressText noGutter textAlign="center" p="md">
          Child 1<br />
          <small>Slightly taller</small>
        </IressText>
      </IressPlaceholder>
    </IressCol>,
    <IressCol key="2">
      <IressPlaceholder>
        <IressText noGutter textAlign="center" p="md">
          Child 2
        </IressText>
      </IressPlaceholder>
    </IressCol>,
    <IressCol key="3">
      <IressPlaceholder>
        <IressText noGutter textAlign="center" p="md">
          Child 3
        </IressText>
      </IressPlaceholder>
    </IressCol>,
  ],
};
export const Default: Story = {
  args: {
    children: ROW_CHILDREN_OPTIONS.threeDifferentSizedPlaceholders,
    gutter: 'spacing.7',
    horizontalAlign: 'left',
    verticalAlign: 'top',
  },
  argTypes: {
    ...disableArgTypes(['children']),
    children: {
      control: {
        type: 'select',
      },
      options: Object.keys(ROW_CHILDREN_OPTIONS),
      mapping: ROW_CHILDREN_OPTIONS,
    },
  },
  render: (args) => (
    <IressRow {...args}>
      <IressCol span={4}>
        <IressPlaceholder>Column 1</IressPlaceholder>
      </IressCol>
      <IressCol span={4}>
        <IressPlaceholder>Column 2</IressPlaceholder>
      </IressCol>
      <IressCol span={4}>
        <IressPlaceholder>Column 3</IressPlaceholder>
      </IressCol>
    </IressRow>
  ),
};

export const Gutter: Story = {
  args: {
    children: (
      <>
        <IressCol span={6}>
          <IressPlaceholder>
            <IressText noGutter textAlign="center" className="iress-p--md">
              1 of 4<br />
              <small>Slightly taller</small>
            </IressText>
          </IressPlaceholder>
        </IressCol>
        <IressCol span={6}>
          <IressPlaceholder>
            <IressText noGutter>2 of 4</IressText>
          </IressPlaceholder>
        </IressCol>
        <IressCol span={6}>
          <IressPlaceholder>
            <IressText noGutter>3 of 4</IressText>
          </IressPlaceholder>
        </IressCol>
        <IressCol span={6}>
          <IressPlaceholder>
            <IressText noGutter>4 of 4</IressText>
          </IressPlaceholder>
        </IressCol>
      </>
    ),
  },
  argTypes: {
    ...disableArgTypes(['children', 'gutter', 'useColGap']),
  },
  render: (args) => (
    <IressStack maxWidth="container.xl" gap="xl">
      <IressText element="h3">spacing.2</IressText>
      <IressRow {...args} gutter="spacing.2">{args.children}</IressRow>
      <IressDivider mb="xl" />
      <IressText element="h3">spacing.4</IressText>
      <IressRow {...args} gutter="spacing.4">{args.children}</IressRow>
      <IressDivider mb="xl" />
      <IressText element="h3">spacing.7</IressText>
      <IressRow {...args} gutter="spacing.7">{args.children}</IressRow>
    </IressStack>
  ),
};

export const ResponsiveGutter: Story = {
  args: {
    children: (
      <>
        <IressCol span={6}>
          <IressPlaceholder>
            <IressText noGutter textAlign="center" className="iress-p--md">
              1 of 4<br />
              <small>Slightly taller</small>
            </IressText>
          </IressPlaceholder>
        </IressCol>
        <IressCol span={6}>
          <IressPlaceholder>
            <IressText noGutter>2 of 4</IressText>
          </IressPlaceholder>
        </IressCol>
        <IressCol span={6}>
          <IressPlaceholder>
            <IressText noGutter>3 of 4</IressText>
          </IressPlaceholder>
        </IressCol>
        <IressCol span={6}>
          <IressPlaceholder>
            <IressText noGutter>4 of 4</IressText>
          </IressPlaceholder>
        </IressCol>
      </>
    ),
    gutter: {
      xs: 'spacing.1',
      sm: 'spacing.2',
      md: 'spacing.4',
      lg: 'spacing.7',
      xl: 'spacing.10',
      xxl: 'spacing.1',
    },
  },
  argTypes: {
    ...disableArgTypes(['children', 'useColGap']),
  },
  render: (args) => (
    <IressContainer>
      <IressRow {...args}>
        {args.children}
      </IressRow>
    </IressContainer>
  ),
  decorators: [withBreakpointLabel()],
};

export const HorizontalAlignment: Story = {
  args: {
    children: (
      <>
        <IressCol span={2}>
          <IressPlaceholder>
            <IressText noGutter>1 of 3</IressText>
          </IressPlaceholder>
        </IressCol>
        <IressCol span={2}>
          <IressPlaceholder>
            <IressText noGutter>2 of 3</IressText>
          </IressPlaceholder>
        </IressCol>
        <IressCol span={2}>
          <IressPlaceholder>
            <IressText noGutter>3 of 3</IressText>
          </IressPlaceholder>
        </IressCol>
      </>
    ),
  },
  argTypes: {
    ...disableArgTypes(['children', 'horizontalAlign']),
  },
  render: (args) => (
    <IressContainer>
      <IressStack gap="md">
        <IressText element="h3">left</IressText>
        <IressRow {...args} horizontalAlign="left">{args.children}</IressRow>
        <IressText element="h3">center</IressText>
        <IressRow {...args} horizontalAlign="center">{args.children}</IressRow>
        <IressText element="h3">right</IressText>
        <IressRow {...args} horizontalAlign="right">{args.children}</IressRow>
        <IressText element="h3">between</IressText>
        <IressRow {...args} horizontalAlign="between">{args.children}</IressRow>
      </IressStack>
    </IressContainer>
  ),
};

export const VerticalAlignment: Story = {
  args: {
    children: (
      <>
        <IressCol>
          <IressPlaceholder height="100%">
            <IressText noGutter>1 of 3</IressText>
          </IressPlaceholder>
        </IressCol>
        <IressCol>
          <IressPlaceholder height="100%">
            <IressText noGutter>2 of 3</IressText>
          </IressPlaceholder>
        </IressCol>
        <IressCol>
          <IressPlaceholder height="100%">
            <IressText noGutter>3 of 3</IressText>
          </IressPlaceholder>
        </IressCol>
      </>
    ),
  },
  argTypes: {
    ...disableArgTypes(['children', 'verticalAlign']),
  },
  render: (args) => (
    <IressContainer>
      <IressStack gap="md">
        <IressText element="h3">top</IressText>
        <IressRow {...args} style={{ height: '10rem' }} verticalAlign="top">{args.children}</IressRow>
        <IressText element="h3">middle</IressText>
        <IressRow {...args} style={{ height: '10rem' }} verticalAlign="middle">{args.children}</IressRow>
        <IressText element="h3">bottom</IressText>
        <IressRow {...args} style={{ height: '10rem' }} verticalAlign="bottom">{args.children}</IressRow>
        <IressText element="h3">stretch</IressText>
        <IressRow {...args} style={{ height: '10rem' }} verticalAlign="stretch">{args.children}</IressRow>
      </IressStack>
    </IressContainer>
  ),
};
