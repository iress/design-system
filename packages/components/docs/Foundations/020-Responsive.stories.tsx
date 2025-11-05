import { type Meta, type StoryObj } from '@storybook/react-vite';
import { withCustomSource } from '@iress-oss/ids-storybook-sandbox';
import { ResponsiveTableColumns } from './mocks/ResponsiveTableColumns';
import ResponsiveTableColumnsSource from './mocks/ResponsiveTableColumns.tsx?raw';
import {
  BREAKPOINT_DETAILS,
  IressCol,
  IressContainer,
  IressDivider,
  IressInline,
  IressPanel,
  IressPlaceholder,
  IressRow,
  IressStack,
  IressTable,
  IressText,
} from '@/main';
import { lazy, Suspense } from 'react';
import { CurrentBreakpoint } from '@docs/components/CurrentBreakpoint';

type Story = StoryObj<typeof IressTable>;

const BreakpointXs = lazy(() => import('@docs/components/BreakpointXs'));
const BreakpointSm = lazy(() => import('@docs/components/BreakpointSm'));
const BreakpointMd = lazy(() => import('@docs/components/BreakpointMd'));
const BreakpointLg = lazy(() => import('@docs/components/BreakpointLg'));
const BreakpointXl = lazy(() => import('@docs/components/BreakpointXl'));

export default {
  title: 'Foundations/Responsive layout',
  component: IressTable,
} as Meta<typeof IressTable>;

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
        activeViewport: value.containerMaxWidth,
        exampleViewport: `${value.viewportWidth}px width`,
      })),
  },
};

export const Xs: Story = {
  args: {
    caption: BREAKPOINT_DETAILS.xs.screenWidthRange,
  },
  render: ({ caption }) => (
    <IressStack gap="lg">
      <IressInline gap="md" verticalAlign="bottom">
        <IressStack gap="xs" maxWidth="input.16">
          <Suspense>
            <BreakpointXs />
          </Suspense>
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
            <IressText element="strong">Example viewport</IressText>
            <IressText>{BREAKPOINT_DETAILS.xs.containerMaxWidth}</IressText>
          </IressInline>
          <IressInline gap="sm">
            <IressText element="strong">Margin</IressText>
            <IressText>16px</IressText>
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
        <IressPanel bg="alt">
          <CurrentBreakpoint renderLabel="viewing" />
        </IressPanel>
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
  render: ({ caption }) => (
    <IressStack gap="lg">
      <IressInline gap="md" verticalAlign="bottom">
        <IressStack gap="xs" maxWidth="input.16">
          <Suspense>
            <BreakpointSm />
          </Suspense>
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
            <IressText element="strong">Example viewport</IressText>
            <IressText>{BREAKPOINT_DETAILS.sm.containerMaxWidth}</IressText>
          </IressInline>
          <IressInline gap="sm">
            <IressText element="strong">Margin</IressText>
            <IressText>16px</IressText>
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
        <IressPanel bg="alt">
          <CurrentBreakpoint renderLabel="viewing" />
        </IressPanel>
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
  render: ({ caption }) => (
    <IressStack gap="lg">
      <IressInline gap="md" verticalAlign="bottom">
        <IressStack gap="xs" maxWidth="input.16">
          <Suspense>
            <BreakpointMd />
          </Suspense>
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
            <IressText element="strong">Example viewport</IressText>
            <IressText>{BREAKPOINT_DETAILS.md.containerMaxWidth}</IressText>
          </IressInline>
          <IressInline gap="sm">
            <IressText element="strong">Margin</IressText>
            <IressText>16px</IressText>
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
        <IressPanel bg="alt">
          <CurrentBreakpoint renderLabel="viewing" />
        </IressPanel>
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
  render: ({ caption }) => (
    <IressStack gap="lg">
      <IressInline gap="md" verticalAlign="bottom">
        <IressStack gap="xs" maxWidth="input.16">
          <Suspense>
            <BreakpointLg />
          </Suspense>
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
            <IressText element="strong">Example viewport</IressText>
            <IressText>{BREAKPOINT_DETAILS.lg.containerMaxWidth}</IressText>
          </IressInline>
          <IressInline gap="sm">
            <IressText element="strong">Margin</IressText>
            <IressText>16px</IressText>
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
        <IressPanel bg="alt">
          <CurrentBreakpoint renderLabel="viewing" />
        </IressPanel>
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
  render: ({ caption }) => (
    <IressStack gap="lg">
      <IressInline gap="md" verticalAlign="bottom">
        <IressStack gap="xs" maxWidth="input.16">
          <Suspense>
            <BreakpointXl />
          </Suspense>
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
            <IressText element="strong">Example viewport</IressText>
            <IressText>{BREAKPOINT_DETAILS.xl.containerMaxWidth}</IressText>
          </IressInline>
          <IressInline gap="sm">
            <IressText element="strong">Margin</IressText>
            <IressText>16px</IressText>
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
        <IressPanel bg="alt">
          <CurrentBreakpoint renderLabel="viewing" />
        </IressPanel>
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
  render: ({ caption }) => (
    <IressStack gap="lg">
      <IressInline gap="md" verticalAlign="bottom">
        <IressStack gap="xs" maxWidth="input.16">
          <Suspense>
            <BreakpointXl />
          </Suspense>
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
            <IressText element="strong">Example viewport</IressText>
            <IressText>{BREAKPOINT_DETAILS.xxl.containerMaxWidth}</IressText>
          </IressInline>
          <IressInline gap="sm">
            <IressText element="strong">Margin</IressText>
            <IressText>16px</IressText>
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
        <IressPanel bg="alt">
          <CurrentBreakpoint renderLabel="viewing" />
        </IressPanel>
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
  render: (args) => <ResponsiveTableColumns {...args} />,
  parameters: withCustomSource(ResponsiveTableColumnsSource),
};
