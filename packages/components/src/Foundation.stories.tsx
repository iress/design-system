import { type Meta, type StoryObj } from '@storybook/react-vite';
import {
  BREAKPOINT_DETAILS,
  IressCol,
  IressContainer,
  IressDivider,
  IressInline,
  IressPill,
  IressPlaceholder,
  IressRow,
  IressStack,
  IressStyled,
  IressTable,
  IressText,
  type PositiveSpacingToken,
} from '@/main';
import { useState } from 'react';
import { cssVars } from '@iress-oss/ids-tokens';
import { withBreakpointLabel, withSource } from '@iress-oss/ids-storybook-config';
import { GRID_SIZE, Z_INDEX } from '@theme-preset/constants';
import { ResponsiveTableColumns } from './mocks/ResponsiveTableColumns';
import ResponsiveTableColumnsSource from './mocks/ResponsiveTableColumns.tsx?raw';

type Story = StoryObj<typeof IressTable>;

export default {
  title: 'Foundations',
  component: IressTable,
  parameters: {
    chromatic: { disableSnapshot: true },
    controls: { disable: true },
    idsConfig: {
      autodocsTemplate: 'default',
    },
  },
} as Meta<typeof IressTable>;

const BreakpointXs = () => (
  <svg
    width="37"
    height="58"
    viewBox="0 0 37 58"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5.28571 58C3.83214 58 2.5878 57.4837 1.55268 56.4511C0.51756 55.4186 0 54.1773 0 52.7273V5.27273C0 3.82273 0.51756 2.58144 1.55268 1.54886C2.5878 0.516288 3.83214 0 5.28571 0H31.7143C33.1679 0 34.4122 0.516288 35.4473 1.54886C36.4824 2.58144 37 3.82273 37 5.27273V52.7273C37 54.1773 36.4824 55.4186 35.4473 56.4511C34.4122 57.4837 33.1679 58 31.7143 58H5.28571ZM5.28571 50.0909V52.7273H31.7143V50.0909H5.28571ZM5.28571 44.8182H31.7143V13.1818H5.28571V44.8182ZM5.28571 7.90909H31.7143V5.27273H5.28571V7.90909Z"
      fill={cssVars.colour.primary.fill}
    />
    <path
      d="M7 17C7 15.8954 7.89543 15 9 15H28C29.1046 15 30 15.8954 30 17V41C30 42.1046 29.1046 43 28 43H9C7.89543 43 7 42.1046 7 41V17Z"
      fill={cssVars.colour.primary.surface}
    />
  </svg>
);

const BreakpointSm = () => (
  <svg
    width="115"
    height="89"
    viewBox="0 0 115 89"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5.28571 89C3.83214 89 2.5878 88.4837 1.55268 87.4511C0.51756 86.4186 0 85.1773 0 83.7273V36.2727C0 34.8227 0.51756 33.5814 1.55268 32.5489C2.5878 31.5163 3.83214 31 5.28571 31H31.7143C33.1679 31 34.4122 31.5163 35.4473 32.5489C36.4824 33.5814 37 34.8227 37 36.2727V83.7273C37 85.1773 36.4824 86.4186 35.4473 87.4511C34.4122 88.4837 33.1679 89 31.7143 89H5.28571ZM5.28571 81.0909V83.7273H31.7143V81.0909H5.28571ZM5.28571 75.8182H31.7143V44.1818H5.28571V75.8182ZM5.28571 38.9091H31.7143V36.2727H5.28571V38.9091Z"
      fill={cssVars.colour.primary.fill}
    />
    <path
      d="M7 48C7 46.8954 7.89543 46 9 46H28C29.1046 46 30 46.8954 30 48V72C30 73.1046 29.1046 74 28 74H9C7.89543 74 7 73.1046 7 72V48Z"
      fill={cssVars.colour.primary.surface}
    />
    <path
      d="M60 24C60 22.8954 60.8954 22 62 22H102C103.105 22 104 22.8954 104 24V64C104 65.1046 103.105 66 102 66H62C60.8954 66 60 65.1046 60 64V24Z"
      fill={cssVars.colour.primary.surface}
    />
    <path
      d="M115 80.9091C115 83.1341 114.204 85.0388 112.613 86.6233C111.022 88.2078 109.109 89 106.875 89L58.125 89C55.8906 89 53.9779 88.2078 52.3867 86.6233C50.7956 85.0388 50 83.1341 50 80.9091L50 8.09091C50 5.86591 50.7956 3.96117 52.3867 2.3767C53.9779 0.792236 55.8906 -2.57487e-07 58.125 -3.55155e-07L106.875 -2.48609e-06C109.109 -2.58375e-06 111.022 0.792234 112.613 2.3767C114.204 3.96117 115 5.8659 115 8.09091L115 80.9091ZM58.125 76.8636L58.125 80.9091L106.875 80.9091L106.875 76.8636L58.125 76.8636ZM106.875 68.7727L106.875 20.2273L58.125 20.2273L58.125 68.7727L106.875 68.7727ZM58.125 12.1364L106.875 12.1364L106.875 8.09091L58.125 8.09091L58.125 12.1364Z"
      fill={cssVars.colour.primary.fill}
    />
  </svg>
);

const BreakpointMd = () => (
  <svg
    width="213"
    height="92"
    viewBox="0 0 213 92"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M22 39C22 37.8954 22.8954 37 24 37H65C66.1046 37 67 37.8954 67 39V80C67 81.1046 66.1046 82 65 82H24C22.8954 82 22 81.1046 22 80V39Z"
      fill={cssVars.colour.primary.surface}
    />
    <path
      d="M8.09091 92C5.86591 92 3.96117 91.2044 2.3767 89.6133C0.792235 88.0221 0 86.1094 0 83.875L0 35.125C0 32.8906 0.792235 30.9779 2.3767 29.3867C3.96117 27.7956 5.86591 27 8.09091 27L80.9091 27C83.1341 27 85.0388 27.7956 86.6233 29.3867C88.2078 30.9779 89 32.8906 89 35.125L89 83.875C89 86.1094 88.2078 88.0221 86.6233 89.6133C85.0388 91.2044 83.1341 92 80.9091 92L8.09091 92ZM12.1364 35.125H8.09091L8.09091 83.875H12.1364L12.1364 35.125ZM20.2273 83.875L68.7727 83.875L68.7727 35.125L20.2273 35.125L20.2273 83.875ZM76.8636 35.125L76.8636 83.875H80.9091L80.9091 35.125H76.8636Z"
      fill={cssVars.colour.primary.fill}
    />
    <path
      d="M118 14C118 12.8954 118.895 12 120 12H193C194.105 12 195 12.8954 195 14V62C195 63.1046 194.105 64 193 64H120C118.895 64 118 63.1046 118 62V14Z"
      fill={cssVars.colour.primary.surface}
    />
    <path
      d="M100 92V81.7778H213V92H100ZM115.409 76.6667C112.584 76.6667 110.166 75.6657 108.154 73.6639C106.142 71.662 105.136 69.2556 105.136 66.4444V10.2222C105.136 7.41111 106.142 5.00463 108.154 3.00278C110.166 1.00093 112.584 0 115.409 0H197.591C200.416 0 202.834 1.00093 204.846 3.00278C206.858 5.00463 207.864 7.41111 207.864 10.2222V66.4444C207.864 69.2556 206.858 71.662 204.846 73.6639C202.834 75.6657 200.416 76.6667 197.591 76.6667H115.409ZM115.409 66.4444H197.591V10.2222H115.409V66.4444Z"
      fill={cssVars.colour.primary.fill}
    />
  </svg>
);

const BreakpointLg = () => (
  <svg
    width="119"
    height="97"
    viewBox="0 0 119 97"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M19 15C19 13.8954 19.8954 13 21 13H98C99.1046 13 100 13.8954 100 15V66C100 67.1046 99.1046 68 98 68H21C19.8954 68 19 67.1046 19 66V15Z"
      fill={cssVars.colour.primary.surface}
    />
    <path
      d="M0 97V86.2222H119V97H0ZM16.2273 80.8333C13.2523 80.8333 10.7055 79.778 8.58693 77.6674C6.46837 75.5567 5.40909 73.0194 5.40909 70.0556V10.7778C5.40909 7.81389 6.46837 5.27662 8.58693 3.16597C10.7055 1.05532 13.2523 0 16.2273 0H102.773C105.748 0 108.295 1.05532 110.413 3.16597C112.532 5.27662 113.591 7.81389 113.591 10.7778V70.0556C113.591 73.0194 112.532 75.5567 110.413 77.6674C108.295 79.778 105.748 80.8333 102.773 80.8333H16.2273ZM16.2273 70.0556H102.773V10.7778H16.2273V70.0556Z"
      fill={cssVars.colour.primary.fill}
    />
  </svg>
);

const BreakpointXl = () => (
  <svg
    width="108"
    height="97"
    viewBox="0 0 108 97"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M22 15C22 13.8954 22.8954 13 24 13H84C85.1046 13 86 13.8954 86 15V60C86 61.1046 85.1046 62 84 62H24C22.8954 62 22 61.1046 22 60V15Z"
      fill={cssVars.colour.primary.surface}
    />
    <path
      d="M32.4 97V86.2222H43.2V75.4444H10.8C7.83 75.4444 5.2875 74.3891 3.1725 72.2785C1.0575 70.1678 0 67.6306 0 64.6667V10.7778C0 7.81389 1.0575 5.27662 3.1725 3.16597C5.2875 1.05532 7.83 0 10.8 0H97.2C100.17 0 102.713 1.05532 104.828 3.16597C106.943 5.27662 108 7.81389 108 10.7778V64.6667C108 67.6306 106.943 70.1678 104.828 72.2785C102.713 74.3891 100.17 75.4444 97.2 75.4444H64.8V86.2222H75.6V97H32.4ZM10.8 64.6667H97.2V10.7778H10.8V64.6667Z"
      fill={cssVars.colour.primary.fill}
    />
  </svg>
);

const MarginToken = ({ token }: { token?: PositiveSpacingToken }) => {
  const [size, setSize] = useState<number | null>(null);

  return (
    <IressInline gap="xs">
      {size !== null && <IressText element="span">{size}px</IressText>}
      <IressPill>{token}</IressPill>
      <IressStyled
        srOnly
        pl={token}
        ref={(el) => {
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.width !== size) {
              setSize(rect.width);
            }
          }
        }}
      />
    </IressInline>
  );
};

export const Breakpoints: Story = {
  args: {
    caption: (
      <IressText element="h3" textAlign="left">
        Breakpoints supported by IDS
      </IressText>
    ),
    rows: Object.entries(BREAKPOINT_DETAILS)
      .filter(([name]) => name !== 'displayName' && name !== '__docgenInfo')
      .map(([size, value]) => ({
        size,
        screenWidth: value.screenWidthRange,
        mediaQuery: value.mediaQuery,
      })),
  },
};

export const ContainerBreakpoints: Story = {
  args: {
    caption: (
      <IressText element="h3" textAlign="left">
        Breakpoints supported by IDS
      </IressText>
    ),
    rows: Object.entries(BREAKPOINT_DETAILS)
      .filter(([name]) => name !== 'displayName' && name !== '__docgenInfo')
      .map(([size, value]) => ({
        size,
        screenWidth: value.screenWidthRange,
        mediaQuery: value.mediaQuery,
        maxWidth: value.containerMaxWidth,
        marginToken: value.margin,
      })),
  },
};

export const ColBreakpoints: Story = {
  args: {
    caption: (
      <IressText element="h3" textAlign="left">
        Breakpoints supported by IDS
      </IressText>
    ),
    rows: Object.entries(BREAKPOINT_DETAILS)
      .filter(([name]) => name !== 'displayName' && name !== '__docgenInfo')
      .map(([size, value]) => ({
        size,
        screenWidth: value.screenWidthRange,
        mediaQuery: value.mediaQuery,
        maxColumns: 'maxColumns' in value ? value.maxColumns : GRID_SIZE,
      })),
  },
};

export const DesignerBreakpoints: Story = {
  args: {
    caption: (
      <IressText element="h3" textAlign="left">
        Breakpoints supported by IDS
      </IressText>
    ),
    rows: Object.entries(BREAKPOINT_DETAILS)
      .filter(([name]) => name !== 'displayName' && name !== '__docgenInfo')
      .map(([size, value]) => ({
        size,
        screenWidth: value.screenWidthRange,
        mediaQuery: value.mediaQuery,
        maxWidth: value.containerMaxWidth,
        marginToken: value.margin,
        activeViewport: `${value.viewportWidth}px width`,
        maxColumns: 'maxColumns' in value ? value.maxColumns : GRID_SIZE,
      })),
  },
};

export const Xs: Story = {
  args: {
    caption: BREAKPOINT_DETAILS.xs.screenWidthRange,
  },
   decorators: [withBreakpointLabel()],
  render: ({ caption }) => (
    <IressStack gap="lg">
      <IressInline gap="md" verticalAlign="bottom">
        <IressStack gap="xs" maxWidth="input.16">
            <BreakpointXs />
          <IressText>
            <strong>{caption}</strong>
            <br />
            The mobile breakpoint is used for small mobile devices.
          </IressText>
        </IressStack>
        <IressStack gap="xs">
          <IressInline gap="sm">
            <IressText element="strong">Min screen width</IressText>
            <IressText>{BREAKPOINT_DETAILS.xs.minScreenWidth}</IressText>
          </IressInline>
          <IressInline gap="sm">
            <IressText element="strong">Max screen width</IressText>
            <IressText>{BREAKPOINT_DETAILS.xs.maxScreenWidth}</IressText>
          </IressInline>
          <IressInline gap="sm">
            <IressText element="strong">Active viewport</IressText>
            <IressText>{BREAKPOINT_DETAILS.xs.containerMaxWidth}</IressText>
          </IressInline>
          <IressInline gap="sm">
            <IressText element="strong">Margin</IressText>
            <MarginToken token={BREAKPOINT_DETAILS.xs.margin} />
          </IressInline>
        </IressStack>
      </IressInline>
      <IressDivider />
      <IressText>
        <h2>Grid example</h2>
        <p>
          To ensure the best usability and accessibility, please do not use
          grids with more than 4 columns maximum on extra small screens. For
          developers, this means the minimum span on mobile devices is 3.
        </p>
      </IressText>
      <IressContainer
        style={{ maxWidth: `${BREAKPOINT_DETAILS.xs.viewportWidth}px` }}
      >
        <IressRow gutter="md">
          <IressCol span={12}>
            <IressPlaceholder height="5em" />
          </IressCol>
          <IressCol span={6}>
            <IressPlaceholder height="5em" />
          </IressCol>
          <IressCol span={6}>
            <IressPlaceholder height="5em" />
          </IressCol>
          <IressCol span={3}>
            <IressPlaceholder height="5em" />
          </IressCol>
          <IressCol span={3}>
            <IressPlaceholder height="5em" />
          </IressCol>
          <IressCol span={3}>
            <IressPlaceholder height="5em" />
          </IressCol>
          <IressCol span={3}>
            <IressPlaceholder height="5em" />
          </IressCol>
        </IressRow>
      </IressContainer>
    </IressStack>
  ),
};

export const Sm: Story = {
  args: {
    caption: BREAKPOINT_DETAILS.sm.screenWidthRange,
  },
   decorators: [withBreakpointLabel()],
  render: ({ caption }) => (
    <IressStack gap="lg">
      <IressInline gap="md" verticalAlign="bottom">
        <IressStack gap="xs" maxWidth="input.16">
            <BreakpointSm />
          <IressText>
            <strong>{caption}</strong>
            <br />
            Small breakpoint, for larger mobile devices and tablet portrait.
          </IressText>
        </IressStack>
        <IressStack gap="xs">
          <IressInline gap="sm">
            <IressText element="strong">Min screen width</IressText>
            <IressText>{BREAKPOINT_DETAILS.sm.minScreenWidth}</IressText>
          </IressInline>
          <IressInline gap="sm">
            <IressText element="strong">Max screen width</IressText>
            <IressText>{BREAKPOINT_DETAILS.sm.maxScreenWidth}</IressText>
          </IressInline>
          <IressInline gap="sm">
            <IressText element="strong">Active viewport</IressText>
            <IressText>{BREAKPOINT_DETAILS.sm.containerMaxWidth}</IressText>
          </IressInline>
          <IressInline gap="sm">
            <IressText element="strong">Margin</IressText>
            <MarginToken token={BREAKPOINT_DETAILS.sm.margin} />
          </IressInline>
        </IressStack>
      </IressInline>
      <IressDivider />
      <IressText>
        <h2>Grid example</h2>
        <p>
          To ensure the best usability and accessibility, please do not use
          grids with more than 4 columns maximum on small screens. For
          developers, this means the minimum span on mobile devices is 3.
        </p>
      </IressText>
      <IressContainer
        style={{ maxWidth: `${BREAKPOINT_DETAILS.sm.viewportWidth}px` }}
      >
        <IressRow gutter="md">
          <IressCol span={{ base: 12, sm: 12 }}>
            <IressPlaceholder height="5em" />
          </IressCol>
          <IressCol span={{ base: 12, sm: 6 }}>
            <IressPlaceholder height="5em" />
          </IressCol>
          <IressCol span={{ base: 12, sm: 6 }}>
            <IressPlaceholder height="5em" />
          </IressCol>
          <IressCol span={{ base: 12, sm: 3 }}>
            <IressPlaceholder height="5em" />
          </IressCol>
          <IressCol span={{ base: 12, sm: 3 }}>
            <IressPlaceholder height="5em" />
          </IressCol>
          <IressCol span={{ base: 12, sm: 3 }}>
            <IressPlaceholder height="5em" />
          </IressCol>
          <IressCol span={{ base: 12, sm: 3 }}>
            <IressPlaceholder height="5em" />
          </IressCol>
        </IressRow>
      </IressContainer>
    </IressStack>
  ),
};

export const Md: Story = {
  args: {
    caption: BREAKPOINT_DETAILS.md.screenWidthRange,
  },
   decorators: [withBreakpointLabel()],
  render: ({ caption }) => (
    <IressStack gap="lg">
      <IressInline gap="md" verticalAlign="bottom">
        <IressStack gap="xs" maxWidth="input.16">
            <BreakpointMd />
          <IressText>
            <strong>{caption}</strong>
            <br />
            Medium breakpoint for tablets and small laptops such as Chromebooks.
          </IressText>
        </IressStack>
        <IressStack gap="xs">
          <IressInline gap="sm">
            <IressText element="strong">Min screen width</IressText>
            <IressText>{BREAKPOINT_DETAILS.md.minScreenWidth}</IressText>
          </IressInline>
          <IressInline gap="sm">
            <IressText element="strong">Max screen width</IressText>
            <IressText>{BREAKPOINT_DETAILS.md.maxScreenWidth}</IressText>
          </IressInline>
          <IressInline gap="sm">
            <IressText element="strong">Active viewport</IressText>
            <IressText>{BREAKPOINT_DETAILS.md.containerMaxWidth}</IressText>
          </IressInline>
          <IressInline gap="sm">
            <IressText element="strong">Margin</IressText>
            <MarginToken token={BREAKPOINT_DETAILS.md.margin} />
          </IressInline>
        </IressStack>
      </IressInline>
      <IressDivider />
      <IressText>
        <h2>Grid example</h2>
        <p>
          To ensure the best usability and accessibility, please do not use
          grids with more than 6 columns maximum on medium screens. For
          developers, this means the minimum span on medium screems is 2.
        </p>
      </IressText>
      <IressContainer
        style={{ maxWidth: `${BREAKPOINT_DETAILS.md.viewportWidth}px` }}
      >
        <IressRow gutter="md">
          <IressCol span={{ base: 12, md: 12 }}>
            <IressPlaceholder height="5em" />
          </IressCol>
          <IressCol span={{ base: 12, md: 6 }}>
            <IressPlaceholder height="5em" />
          </IressCol>
          <IressCol span={{ base: 12, md: 6 }}>
            <IressPlaceholder height="5em" />
          </IressCol>
          <IressCol span={{ base: 12, md: 4 }}>
            <IressPlaceholder height="5em" />
          </IressCol>
          <IressCol span={{ base: 12, md: 4 }}>
            <IressPlaceholder height="5em" />
          </IressCol>
          <IressCol span={{ base: 12, md: 4 }}>
            <IressPlaceholder height="5em" />
          </IressCol>
          <IressCol span={{ base: 12, md: 2 }}>
            <IressPlaceholder height="5em" />
          </IressCol>
          <IressCol span={{ base: 12, md: 2 }}>
            <IressPlaceholder height="5em" />
          </IressCol>
          <IressCol span={{ base: 12, md: 2 }}>
            <IressPlaceholder height="5em" />
          </IressCol>
          <IressCol span={{ base: 12, md: 2 }}>
            <IressPlaceholder height="5em" />
          </IressCol>
          <IressCol span={{ base: 12, md: 2 }}>
            <IressPlaceholder height="5em" />
          </IressCol>
          <IressCol span={{ base: 12, md: 2 }}>
            <IressPlaceholder height="5em" />
          </IressCol>
        </IressRow>
      </IressContainer>
    </IressStack>
  ),
};

export const Lg: Story = {
  args: {
    caption: BREAKPOINT_DETAILS.lg.screenWidthRange,
  },
   decorators: [withBreakpointLabel()],
  render: ({ caption }) => (
    <IressStack gap="lg">
      <IressInline gap="md" verticalAlign="bottom">
        <IressStack gap="xs" maxWidth="input.16">
            <BreakpointLg />
          <IressText>
            <strong>{caption}</strong>
            <br />
            Large breakpoint for desktops and laptops, such as 13inch MacBooks.
          </IressText>
        </IressStack>
        <IressStack gap="xs">
          <IressInline gap="sm">
            <IressText element="strong">Min screen width</IressText>
            <IressText>{BREAKPOINT_DETAILS.lg.minScreenWidth}</IressText>
          </IressInline>
          <IressInline gap="sm">
            <IressText element="strong">Max screen width</IressText>
            <IressText>{BREAKPOINT_DETAILS.lg.maxScreenWidth}</IressText>
          </IressInline>
          <IressInline gap="sm">
            <IressText element="strong">Active viewport</IressText>
            <IressText>{BREAKPOINT_DETAILS.lg.containerMaxWidth}</IressText>
          </IressInline>
          <IressInline gap="sm">
            <IressText element="strong">Margin</IressText>
            <MarginToken token={BREAKPOINT_DETAILS.lg.margin} />
          </IressInline>
        </IressStack>
      </IressInline>
      <IressDivider />
      <IressText>
        <h2>Grid example</h2>
        <p>
          From large screens onwards, all 12 columns of the grid can be used.
          For developers, this means the minimum span on large screens is 1.
        </p>
      </IressText>
      <IressContainer
        style={{ maxWidth: `${BREAKPOINT_DETAILS.lg.viewportWidth}px` }}
      >
        <IressRow gutter="md">
          <IressCol span={{ base: 12, lg: 12 }}>
            <IressPlaceholder height="5em" />
          </IressCol>
          <IressCol span={{ base: 12, lg: 6 }}>
            <IressPlaceholder height="5em" />
          </IressCol>
          <IressCol span={{ base: 12, lg: 6 }}>
            <IressPlaceholder height="5em" />
          </IressCol>
          <IressCol span={{ base: 12, lg: 4 }}>
            <IressPlaceholder height="5em" />
          </IressCol>
          <IressCol span={{ base: 12, lg: 4 }}>
            <IressPlaceholder height="5em" />
          </IressCol>
          <IressCol span={{ base: 12, lg: 4 }}>
            <IressPlaceholder height="5em" />
          </IressCol>
          <IressCol span={{ base: 12, lg: 2 }}>
            <IressPlaceholder height="5em" />
          </IressCol>
          <IressCol span={{ base: 12, lg: 2 }}>
            <IressPlaceholder height="5em" />
          </IressCol>
          <IressCol span={{ base: 12, lg: 2 }}>
            <IressPlaceholder height="5em" />
          </IressCol>
          <IressCol span={{ base: 12, lg: 2 }}>
            <IressPlaceholder height="5em" />
          </IressCol>
          <IressCol span={{ base: 12, lg: 2 }}>
            <IressPlaceholder height="5em" />
          </IressCol>
          <IressCol span={{ base: 12, lg: 2 }}>
            <IressPlaceholder height="5em" />
          </IressCol>
          <IressCol span={{ base: 12, lg: 1 }}>
            <IressPlaceholder height="5em" />
          </IressCol>
          <IressCol span={{ base: 12, lg: 1 }}>
            <IressPlaceholder height="5em" />
          </IressCol>
          <IressCol span={{ base: 12, lg: 1 }}>
            <IressPlaceholder height="5em" />
          </IressCol>
          <IressCol span={{ base: 12, lg: 1 }}>
            <IressPlaceholder height="5em" />
          </IressCol>
          <IressCol span={{ base: 12, lg: 1 }}>
            <IressPlaceholder height="5em" />
          </IressCol>
          <IressCol span={{ base: 12, lg: 1 }}>
            <IressPlaceholder height="5em" />
          </IressCol>
          <IressCol span={{ base: 12, lg: 1 }}>
            <IressPlaceholder height="5em" />
          </IressCol>
          <IressCol span={{ base: 12, lg: 1 }}>
            <IressPlaceholder height="5em" />
          </IressCol>
          <IressCol span={{ base: 12, lg: 1 }}>
            <IressPlaceholder height="5em" />
          </IressCol>
          <IressCol span={{ base: 12, lg: 1 }}>
            <IressPlaceholder height="5em" />
          </IressCol>
          <IressCol span={{ base: 12, lg: 1 }}>
            <IressPlaceholder height="5em" />
          </IressCol>
          <IressCol span={{ base: 12, lg: 1 }}>
            <IressPlaceholder height="5em" />
          </IressCol>
        </IressRow>
      </IressContainer>
    </IressStack>
  ),
};

export const Xl: Story = {
  args: {
    caption: BREAKPOINT_DETAILS.xl.screenWidthRange,
  },
   decorators: [withBreakpointLabel()],
  render: ({ caption }) => (
    <IressStack gap="lg">
      <IressInline gap="md" verticalAlign="bottom">
        <IressStack gap="xs" maxWidth="input.16">
            <BreakpointXl />
          <IressText>
            <strong>{caption}</strong>
            <br />
            Large breakpoint for desktops and laptops, such as 15inch laptops
            and monitors.
          </IressText>
        </IressStack>
        <IressStack gap="xs">
          <IressInline gap="sm">
            <IressText element="strong">Min screen width</IressText>
            <IressText>{BREAKPOINT_DETAILS.xl.minScreenWidth}</IressText>
          </IressInline>
          <IressInline gap="sm">
            <IressText element="strong">Max screen width</IressText>
            <IressText>{BREAKPOINT_DETAILS.xl.maxScreenWidth}</IressText>
          </IressInline>
          <IressInline gap="sm">
            <IressText element="strong">Active viewport</IressText>
            <IressText>{BREAKPOINT_DETAILS.xl.containerMaxWidth}</IressText>
          </IressInline>
          <IressInline gap="sm">
            <IressText element="strong">Margin</IressText>
            <MarginToken token={BREAKPOINT_DETAILS.xl.margin} />
          </IressInline>
        </IressStack>
      </IressInline>
      <IressDivider />
      <IressText>
        <h2>Grid example</h2>
        <p>
          From large screens onwards, all 12 columns of the grid can be used.
          For developers, this means the minimum span on extra large screens is
          1. At this screen the container max width is applied, but can be opted
          out by using the <code>fluid</code> prop. It is recommended to keep
          the max width in most scenarios to ensure optimal readability.
        </p>
      </IressText>
      <IressContainer>
        <IressRow gutter="md">
          <IressCol span={{ base: 12, xl: 12 }}>
            <IressPlaceholder height="5em" />
          </IressCol>
          <IressCol span={{ base: 12, xl: 6 }}>
            <IressPlaceholder height="5em" />
          </IressCol>
          <IressCol span={{ base: 12, xl: 6 }}>
            <IressPlaceholder height="5em" />
          </IressCol>
          <IressCol span={{ base: 12, xl: 4 }}>
            <IressPlaceholder height="5em" />
          </IressCol>
          <IressCol span={{ base: 12, xl: 4 }}>
            <IressPlaceholder height="5em" />
          </IressCol>
          <IressCol span={{ base: 12, xl: 4 }}>
            <IressPlaceholder height="5em" />
          </IressCol>
          <IressCol span={{ base: 12, xl: 2 }}>
            <IressPlaceholder height="5em" />
          </IressCol>
          <IressCol span={{ base: 12, xl: 2 }}>
            <IressPlaceholder height="5em" />
          </IressCol>
          <IressCol span={{ base: 12, xl: 2 }}>
            <IressPlaceholder height="5em" />
          </IressCol>
          <IressCol span={{ base: 12, xl: 2 }}>
            <IressPlaceholder height="5em" />
          </IressCol>
          <IressCol span={{ base: 12, xl: 2 }}>
            <IressPlaceholder height="5em" />
          </IressCol>
          <IressCol span={{ base: 12, xl: 2 }}>
            <IressPlaceholder height="5em" />
          </IressCol>
          <IressCol span={{ base: 12, xl: 1 }}>
            <IressPlaceholder height="5em" />
          </IressCol>
          <IressCol span={{ base: 12, xl: 1 }}>
            <IressPlaceholder height="5em" />
          </IressCol>
          <IressCol span={{ base: 12, xl: 1 }}>
            <IressPlaceholder height="5em" />
          </IressCol>
          <IressCol span={{ base: 12, xl: 1 }}>
            <IressPlaceholder height="5em" />
          </IressCol>
          <IressCol span={{ base: 12, xl: 1 }}>
            <IressPlaceholder height="5em" />
          </IressCol>
          <IressCol span={{ base: 12, xl: 1 }}>
            <IressPlaceholder height="5em" />
          </IressCol>
          <IressCol span={{ base: 12, xl: 1 }}>
            <IressPlaceholder height="5em" />
          </IressCol>
          <IressCol span={{ base: 12, xl: 1 }}>
            <IressPlaceholder height="5em" />
          </IressCol>
          <IressCol span={{ base: 12, xl: 1 }}>
            <IressPlaceholder height="5em" />
          </IressCol>
          <IressCol span={{ base: 12, xl: 1 }}>
            <IressPlaceholder height="5em" />
          </IressCol>
          <IressCol span={{ base: 12, xl: 1 }}>
            <IressPlaceholder height="5em" />
          </IressCol>
          <IressCol span={{ base: 12, xl: 1 }}>
            <IressPlaceholder height="5em" />
          </IressCol>
        </IressRow>
      </IressContainer>
    </IressStack>
  ),
};

export const Xxl: Story = {
  args: {
    caption: BREAKPOINT_DETAILS.xxl.screenWidthRange,
  },
   decorators: [withBreakpointLabel()],
  render: ({ caption }) => (
    <IressStack gap="lg">
      <IressInline gap="md" verticalAlign="bottom">
        <IressStack gap="xs" maxWidth="input.16">
            <BreakpointXl />
          <IressText>
            <strong>{caption}</strong>
            <br />
            Extra-large breakpoint for modern desktop monitors and large laptops
            (17inch+).
          </IressText>
        </IressStack>
        <IressStack gap="xs">
          <IressInline gap="sm">
            <IressText element="strong">Min screen width</IressText>
            <IressText>{BREAKPOINT_DETAILS.xxl.minScreenWidth}</IressText>
          </IressInline>
          <IressInline gap="sm">
            <IressText element="strong">Max screen width</IressText>
            <IressText>N/A</IressText>
          </IressInline>
          <IressInline gap="sm">
            <IressText element="strong">Active viewport</IressText>
            <IressText>{BREAKPOINT_DETAILS.xxl.containerMaxWidth}</IressText>
          </IressInline>
          <IressInline gap="sm">
            <IressText element="strong">Margin</IressText>
            <MarginToken token={BREAKPOINT_DETAILS.xxl.margin} />
          </IressInline>
        </IressStack>
      </IressInline>
      <IressDivider />
      <IressText>
        <h2>Grid example</h2>
        <p>
          From large screens onwards, all 12 columns of the grid can be used.
          For developers, this means the minimum span on extra large screens is
          1. At this screen the container max width is applied, but can be opted
          out by using the <code>fluid</code> prop. It is recommended to keep
          the max width in most scenarios to ensure optimal readability.
        </p>
      </IressText>
      <IressContainer>
        <IressRow gutter="md">
          <IressCol span={{ base: 12, xxl: 12 }}>
            <IressPlaceholder height="5em" />
          </IressCol>
          <IressCol span={{ base: 12, xxl: 6 }}>
            <IressPlaceholder height="5em" />
          </IressCol>
          <IressCol span={{ base: 12, xxl: 6 }}>
            <IressPlaceholder height="5em" />
          </IressCol>
          <IressCol span={{ base: 12, xxl: 4 }}>
            <IressPlaceholder height="5em" />
          </IressCol>
          <IressCol span={{ base: 12, xxl: 4 }}>
            <IressPlaceholder height="5em" />
          </IressCol>
          <IressCol span={{ base: 12, xxl: 4 }}>
            <IressPlaceholder height="5em" />
          </IressCol>
          <IressCol span={{ base: 12, xxl: 2 }}>
            <IressPlaceholder height="5em" />
          </IressCol>
          <IressCol span={{ base: 12, xxl: 2 }}>
            <IressPlaceholder height="5em" />
          </IressCol>
          <IressCol span={{ base: 12, xxl: 2 }}>
            <IressPlaceholder height="5em" />
          </IressCol>
          <IressCol span={{ base: 12, xxl: 2 }}>
            <IressPlaceholder height="5em" />
          </IressCol>
          <IressCol span={{ base: 12, xxl: 2 }}>
            <IressPlaceholder height="5em" />
          </IressCol>
          <IressCol span={{ base: 12, xxl: 2 }}>
            <IressPlaceholder height="5em" />
          </IressCol>
          <IressCol span={{ base: 12, xxl: 1 }}>
            <IressPlaceholder height="5em" />
          </IressCol>
          <IressCol span={{ base: 12, xxl: 1 }}>
            <IressPlaceholder height="5em" />
          </IressCol>
          <IressCol span={{ base: 12, xxl: 1 }}>
            <IressPlaceholder height="5em" />
          </IressCol>
          <IressCol span={{ base: 12, xxl: 1 }}>
            <IressPlaceholder height="5em" />
          </IressCol>
          <IressCol span={{ base: 12, xxl: 1 }}>
            <IressPlaceholder height="5em" />
          </IressCol>
          <IressCol span={{ base: 12, xxl: 1 }}>
            <IressPlaceholder height="5em" />
          </IressCol>
          <IressCol span={{ base: 12, xxl: 1 }}>
            <IressPlaceholder height="5em" />
          </IressCol>
          <IressCol span={{ base: 12, xxl: 1 }}>
            <IressPlaceholder height="5em" />
          </IressCol>
          <IressCol span={{ base: 12, xxl: 1 }}>
            <IressPlaceholder height="5em" />
          </IressCol>
          <IressCol span={{ base: 12, xxl: 1 }}>
            <IressPlaceholder height="5em" />
          </IressCol>
          <IressCol span={{ base: 12, xxl: 1 }}>
            <IressPlaceholder height="5em" />
          </IressCol>
          <IressCol span={{ base: 12, xxl: 1 }}>
            <IressPlaceholder height="5em" />
          </IressCol>
        </IressRow>
      </IressContainer>
    </IressStack>
  ),
};

export const ResponsiveProps: Story = {
  render: () => <ResponsiveTableColumns />,
  parameters: {
    controls: { disable: true },
    ...withSource(ResponsiveTableColumnsSource, { stripImports: true }),
  },
  decorators: [withBreakpointLabel()],
};

const zIndexUsage: Record<keyof typeof Z_INDEX, string> = {
  DEFAULT:
    'The default z-index used for most elements. Can be combined with raised and floating elevations.',
  NAVBAR: 'Used for navbars. Can be combined with overflow elevation.',
  POPOVER: 'Used for IressPopover. Can be combined with floating elevation.',
  SLIDEOUT: 'Used for IressSlideout. Can be combined with floating elevation.',
  MODAL: 'Used for IressModal. Can be combined with floating elevation.',
  TOAST: 'Used for IressToast. Can be combined with floating elevation.',
  TOOLTIP: 'Used for IressTooltip. Can be combined with floating elevation.',
};

export const ZIndex: Story = {
  render: () => <IressTable caption="Z-Index Usage" columns={[
      { label: 'Name', key: 'name', width: '1%' },
      { label: 'Usage', key: 'usage' },
      { label: 'Value', key: 'value', width: '200px', sort: 'asc' },
    ]} rows={Object.entries(Z_INDEX)
      .filter(([name]) => name !== 'displayName' && name !== '__docgenInfo')
      .map(([name, value]) => ({
        name,
        usage: zIndexUsage[name as keyof typeof Z_INDEX],
        value,
      }))} />,
};