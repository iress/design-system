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
import { SlideoutWithButton } from './mocks/SlideoutWithButton';
import SlideoutWithButtonSource from './mocks/SlideoutWithButton.tsx?raw';
import { SlideoutWithFooter } from './mocks/SlideoutWithFooter';
import SlideoutWithFooterSource from './mocks/SlideoutWithFooter.tsx?raw';
import {
  disableArgTypes,
  withSource,
  reactNodeArgType,
  stylingProps,
  withBreakpointLabel,
  mergeStorybookConfig,
} from '@iress-oss/ids-storybook-config';
import componentMeta from './meta';

const SLIDEOUT_ID = 'storybook-slideout';

type Story = StoryObj<typeof IressSlideout>;

export default {
  title: 'Components/Slideout',
  component: IressSlideout,
  tags: ['updated'],
  argTypes: {
    children: reactNodeArgType,
    footer: reactNodeArgType,
    heading: reactNodeArgType,
    ...stylingProps,
  },
  parameters: {
    idsConfig: {
      testMeta: componentMeta.testMeta,
    },
    docs: {
      description: {
        component: componentMeta.description,
      },
    },
  },
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
  ...Default,
  args: {
    children: '',
    footer: '',
  },
  argTypes: {
    ...disableArgTypes(['children', 'show', 'id', 'mode']),
  },
  render: (args) => {
    const { showSlideout } = useSlideout();

    return (
      <IressPanel bg="alt">
        <IressInline gap="md">
          <IressButton onClick={() => showSlideout('overlay')}>
            Overlay slideout
          </IressButton>
          <IressSlideout {...args} id="overlay" mode="overlay">
            <h2>Overlay</h2>
            For most situations <code>overlay</code> will be what you need,
            which is why this is the default behaviour. You do not need to
            specify the mode if you want your slideout to sit on top of the
            page.
          </IressSlideout>

          <IressButton onClick={() => showSlideout('push')}>
            Push slideout
          </IressButton>
          <IressSlideout
            {...args}
            id="push"
            mode="push"
            eleToPush="#storybook-docs, html"
          >
            <IressText>
              <h2>Push</h2>
              <p>
                If you have a data-heavy screen where you need all of the data
                to be visible when the slideout is open, use <code>push</code>.
                To allow push to work you will need to supply the ID of the
                element that needs to be pushed via the <code>eleToPush</code>{' '}
                prop. If the ID is not supplied, or the element cannot be found,
                the slideout will revert to <code>overlay</code> behaviour.
              </p>
              <p>
                Be aware though that push will only work on larger screens
                (&gt;1200px); on smaller screens the slideout will overlay the
                content.
              </p>
            </IressText>
          </IressSlideout>
        </IressInline>
      </IressPanel>
    );
  },
  decorators: [
    withBreakpointLabel(),
  ]
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
