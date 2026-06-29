import { type Meta, type StoryObj } from '@storybook/react-vite';
import { IressSlideout } from '.';
import { IressButton } from '../Button';
import { useSlideout } from './hooks/useSlideout';
import { IressSlideoutProvider } from './SlideoutProvider';
import { SlideoutUsingState } from './mocks/SlideoutUsingState';
import SlideoutUsingStateSource from './mocks/SlideoutUsingState.tsx?raw';
import { IressPanel } from '../Panel';
import { IressText } from '../Text';
import { IressInline } from '../Inline';
import { SlideoutPositions } from './mocks/SlideoutPositions';
import SlideoutPositionsSource from './mocks/SlideoutPositions.tsx?raw';
import { SlideoutSizes } from './mocks/SlideoutSizes';
import SlideoutSizesSource from './mocks/SlideoutSizes.tsx?raw';
import { AbsolutePositionSlideout } from './mocks/AbsolutePositionSlideout';
import AbsolutePositionSlideoutSource from './mocks/AbsolutePositionSlideout.tsx?raw';
import { SlideoutMicrofrontend } from './mocks/SlideoutMicrofrontend';
import SlideoutMicrofrontendSource from './mocks/SlideoutMicrofrontend.tsx?raw';
import { SlideoutModes } from './mocks/SlideoutModes';
import SlideoutModesSource from './mocks/SlideoutModes.tsx?raw';
import { SlideoutWithButton } from './mocks/SlideoutWithButton';
import SlideoutWithButtonSource from './mocks/SlideoutWithButton.tsx?raw';
import { SlideoutWithFooter } from './mocks/SlideoutWithFooter';
import SlideoutWithFooterSource from './mocks/SlideoutWithFooter.tsx?raw';
import {
  componentStoryMeta,
  disableArgTypes,
  withSource,
  reactNodeArgType,
  withBreakpointLabel,
  mergeStorybookConfig,
} from '@iress-oss/ids-storybook-config';
import componentMeta from './meta';

const SLIDEOUT_ID = 'storybook-slideout';

type Story = StoryObj<typeof IressSlideout>;

export default {
  title: 'Components/Slideout',
  component: IressSlideout,
  ...componentStoryMeta(componentMeta, {
    argTypes: {
      children: reactNodeArgType,
      footer: reactNodeArgType,
      heading: reactNodeArgType,
    },
  }),
} as Meta<typeof IressSlideout>;

export const Default: Story = {
  decorators: [
    (Story) => (
      <IressSlideoutProvider>
        <Story />
      </IressSlideoutProvider>
    ),
  ],
  render: (args) => <SlideoutWithButton {...args} />,
  parameters: {
    controls: { disable: true },
    ...withSource(SlideoutWithButtonSource, { stripImports: true }),
  },
};

export const DefaultShow: Story = {
  ...Default,
  args: {
    children: 'Slideout content',
    defaultShow: true,
    mode: 'push',
    eleToPush: '#default-show-page',
    id: SLIDEOUT_ID,
  },
  render: (args) => (
    <IressPanel bg="alt" id="default-show-page">
      <IressPanel>
        <IressText>Content on the page</IressText>
      </IressPanel>
      <IressSlideout {...args} />
    </IressPanel>
  ),
  tags: ['!autodocs'],
};

export const ShowWithState: Story = {
  render: (args) => <SlideoutUsingState {...args} />,
  parameters: {
    controls: { disable: true },
    ...withSource(SlideoutUsingStateSource, { stripImports: true }),
  },
};

export const Modes: Story = {
  render: () => <SlideoutModes />,
  parameters: {
    controls: { disable: true },
    ...withSource(SlideoutModesSource, { stripImports: true }),
  },
  decorators: [
    withBreakpointLabel(),
  ],
};

export const Position: Story = {
  ...Default,
  render: (args) => <SlideoutPositions {...args} />,
  parameters: {
    controls: { disable: true },
    ...withSource(SlideoutPositionsSource, { stripImports: true }),
  },
};

export const Size: Story = {
  ...Default,
  render: (args) => <SlideoutSizes {...args} />,
  parameters: {
    controls: { disable: true },
    ...withSource(SlideoutSizesSource, { stripImports: true }),
  },
};

export const Footer: Story = {
  ...Default,
  render: (args) => <SlideoutWithFooter {...args} />,
  parameters: {
    controls: { disable: true },
    ...withSource(SlideoutWithFooterSource, { stripImports: true }),
  },
};

export const AbsolutePosition: Story = {
  ...Default,
  render: (args) => <AbsolutePositionSlideout {...args} />,
  parameters: {
    controls: { disable: true },
    ...withSource(AbsolutePositionSlideoutSource, { stripImports: true }),
  },
};

export const Microfrontend: Story = {
  ...Default,
  render: (args) => <SlideoutMicrofrontend {...args} />,
  parameters: {
    controls: { disable: true },
    layout: 'fullscreen',
    ...mergeStorybookConfig(
      withSource(SlideoutMicrofrontendSource, { stripImports: true }),
      {
    docs: {
          story: {
            height: '600px',
          },
        },
      },
    )
  },
  tags: ['recipe'],
};
