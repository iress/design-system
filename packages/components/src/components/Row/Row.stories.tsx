import { type StoryObj, type Meta } from '@storybook/react-vite';

import { IressRow } from '.';
import { IressContainer } from '../Container';
import { IressPlaceholder } from '../Placeholder';
import { IressText } from '../Text';
import { IressCol } from '../Col';
import { IressDivider } from '../Divider';
import {
  HORIZONTAL_ALIGNS,
  IressPanel,
  IressStack,
  VERTICAL_ALIGNS,
} from '@/main';
import { SPACING_TOKENS } from '@theme-preset/tokens/spacing';
import {
  CurrentBreakpoint,
  disableArgTypes,
} from '@iress-oss/ids-storybook-config';

type Story = StoryObj<typeof IressRow>;

export default {
  title: 'Components/Row',
  component: IressRow,
  tags: ['updated'],
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
    gutter: 'spacing.700',
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
      {SPACING_TOKENS.map((spacing, index) => {
        return (
          <IressText key={spacing}>
            {index > 0 && <IressDivider mb="xl" />}
            <h2>Gutter: {spacing}</h2>
            <IressRow {...args} gutter={spacing} />
          </IressText>
        );
      })}
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
      xs: 'spacing.100',
      sm: 'spacing.200',
      md: 'spacing.400',
      lg: 'spacing.700',
      xl: 'spacing.1200',
      xxl: 'spacing.100',
    },
  },
  argTypes: {
    ...disableArgTypes(['children', 'useColGap']),
  },
  render: (args) => (
    <IressContainer>
      <IressStack gap="md">
        <IressPanel bg="alt">
          Current breakpoint: <CurrentBreakpoint />
        </IressPanel>
        <IressRow {...args} />
      </IressStack>
    </IressContainer>
  ),
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
        {HORIZONTAL_ALIGNS.map((horizontalAlign, index) => (
          <IressText key={horizontalAlign}>
            {index !== 0 && <IressDivider mb="md" />}
            <h2>Horizontal align: {horizontalAlign}</h2>
            <IressRow
              {...args}
              horizontalAlign={horizontalAlign}
              key={horizontalAlign}
            />
          </IressText>
        ))}
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
        {VERTICAL_ALIGNS.map((verticalAlign) => (
          <div key={verticalAlign}>
            <IressText element="h2">Vertical align: {verticalAlign}</IressText>
            <IressRow
              style={{ height: '10rem' }}
              layerStyle="elevation.raised"
              {...args}
              verticalAlign={verticalAlign}
            />
          </div>
        ))}
      </IressStack>
    </IressContainer>
  ),
};
