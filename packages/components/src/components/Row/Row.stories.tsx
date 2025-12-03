import { type StoryObj, type Meta } from '@storybook/react';

import {
  CurrentBreakpoint,
  disableArgTypes,
} from '@iress-oss/ids-storybook-config';
import styles from '~storybook/styles.module.scss';

import { IressRow } from '.';
import { IressContainer } from '../Container';
import { IressPlaceholder } from '../Placeholder';
import { IressText } from '../Text';
import { IressCol } from '../Col';
import { IressDivider } from '../Divider';
import {
  GUTTER_SIZES,
  HORIZONTAL_ALIGNS,
  IressPanel,
  VERTICAL_ALIGNS,
} from '@/main';

type Story = StoryObj<typeof IressRow>;

export default {
  title: 'Components/Row',
  component: IressRow,
} as Meta<typeof IressRow>;

const ROW_CHILDREN_OPTIONS = {
  none: null,
  twoBasicPlaceholders: [
    <IressPlaceholder key="1">
      <IressText noGutter align="center" className="iress-p--md">
        Child 1<br />
      </IressText>
    </IressPlaceholder>,
    <IressPlaceholder key="2">
      <IressText noGutter align="center" className="iress-p--md">
        Child 2
      </IressText>
    </IressPlaceholder>,
  ],

  threeDifferentSizedPlaceholders: [
    <IressPlaceholder key="1">
      <IressText noGutter align="center" className="iress-p--md">
        Child 1<br />
        <small>Slightly taller</small>
      </IressText>
    </IressPlaceholder>,
    <IressPlaceholder key="2">
      <IressText noGutter align="center" className="iress-p--md">
        Child 2
      </IressText>
    </IressPlaceholder>,
    <IressPlaceholder key="3">
      <IressText noGutter align="center" className="iress-p--md">
        Child 3
      </IressText>
    </IressPlaceholder>,
  ],
};
export const Default: Story = {
  args: {
    children: ROW_CHILDREN_OPTIONS.threeDifferentSizedPlaceholders,
    gutter: 'lg',
    horizontalAlign: 'left',
    useColGap: true,
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
            <IressText noGutter align="center" className="iress-p--md">
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
    <IressContainer className="iress-u-stack iress--gutter--md">
      {GUTTER_SIZES.map((gutter) => {
        if (gutter === 'none') return <IressRow {...args} key={gutter} />;

        return (
          <>
            <IressDivider />
            <IressText element="h2">Gutter: {gutter}</IressText>
            <IressRow {...args} gutter={gutter} key={gutter} />
          </>
        );
      })}
    </IressContainer>
  ),
};

export const ResponsiveGutter: Story = {
  args: {
    children: (
      <>
        <IressCol span={6}>
          <IressPlaceholder>
            <IressText noGutter align="center" className="iress-p--md">
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
      xs: 'xs',
      sm: 'sm',
      md: 'md',
      lg: 'lg',
      xl: 'xl',
      xxl: 'xs',
    },
  },
  argTypes: {
    ...disableArgTypes(['children', 'useColGap']),
  },
  render: (args) => (
    <IressContainer className="iress-u-stack iress--gutter--md">
      <IressPanel background="alt">
        Current breakpoint: <CurrentBreakpoint />
      </IressPanel>
      <IressRow {...args} />
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
    <IressContainer className="iress-u-stack iress--gutter--md">
      {HORIZONTAL_ALIGNS.map((horizontalAlign, index) => (
        <>
          {index !== 0 && <IressDivider />}
          <IressText element="h2">
            Horizontal align: {horizontalAlign}
          </IressText>
          <IressRow
            {...args}
            horizontalAlign={horizontalAlign}
            key={horizontalAlign}
          />
        </>
      ))}
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
    <IressContainer className="iress-u-stack iress--gutter--lg">
      {VERTICAL_ALIGNS.map((verticalAlign) => (
        <div key={verticalAlign}>
          <IressText element="h2">Vertical align: {verticalAlign}</IressText>
          <IressRow
            className={styles.setHeight}
            {...args}
            verticalAlign={verticalAlign}
          />
        </div>
      ))}
    </IressContainer>
  ),
};
