import {
  type Meta,
  type ReactRenderer,
  type StoryObj,
} from '@storybook/react-vite';
import { type ArgsStoryFn } from 'storybook/internal/types';
import { IressSlideout, type IressSlideoutProps } from '.';
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
import {
  CurrentBreakpoint,
  DiffViewer,
  disableArgTypes,
  withCustomSource,
  withTransformedProviderSource,
  withTransformedRawSource,
} from '@iress-oss/ids-storybook-config';

const SLIDEOUT_ID = 'storybook-slideout';

const renderWithButtonFn = (
  buttonTitle = 'Toggle slideout',
): ArgsStoryFn<ReactRenderer, IressSlideoutProps> => {
  return (args) => {
    const { showSlideout } = useSlideout();

    return (
      <>
        <IressButton onClick={() => showSlideout(SLIDEOUT_ID)}>
          {buttonTitle}
        </IressButton>
        <IressSlideout {...args} />
      </>
    );
  };
};

type Story = StoryObj<typeof IressSlideout>;

export default {
  title: 'Components/Slideout',
  component: IressSlideout,
  tags: ['updated'],
} as Meta<typeof IressSlideout>;

export const Default: Story = {
  args: {
    children: 'Slideout content',
    footer: 'Footer slot',
    id: SLIDEOUT_ID,
  },
  argTypes: {
    ...disableArgTypes(['show']),
  },
  decorators: [
    (Story) => (
      <IressSlideoutProvider>
        <Story />
      </IressSlideoutProvider>
    ),
  ],
  render: renderWithButtonFn(),
  parameters: {
    ...withTransformedProviderSource(
      `<IressSlideoutProvider>
        <Story />
      </IressSlideoutProvider>`,
      `const { showSlideout } = useSlideout();
      const SLIDEOUT_ID = '${SLIDEOUT_ID}';
      return (
        <Story />
      );`,
    ),
  },
};

export const DefaultShow: Story = {
  ...Default,
  args: {
    ...Default.args,
    defaultShow: true,
    mode: 'push',
    eleToPush: '#default-show-page',
  },
  render: (args) => (
    <IressPanel bg="alt" id="default-show-page">
      <IressPanel>
        <IressText>Content on the page</IressText>
      </IressPanel>
      <IressSlideout {...args} />
    </IressPanel>
  ),
};

export const ShowWithState: Story = {
  args: {
    children: 'This slideout was opened via state',
  },
  argTypes: {
    ...disableArgTypes(['footer', 'show']),
  },
  render: (args) => <SlideoutUsingState {...args} />,
  parameters: {
    ...withTransformedRawSource(SlideoutUsingStateSource, 'IressSlideoutProps'),
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
              <IressPanel bg="alt">
                <CurrentBreakpoint />
              </IressPanel>
            </IressText>
          </IressSlideout>
        </IressInline>
      </IressPanel>
    );
  },
};

export const Position: Story = {
  ...Default,
  argTypes: {
    ...disableArgTypes(['children', 'show']),
  },
  render: (args) => <SlideoutPositions {...args} />,
  parameters: {
    ...withCustomSource(SlideoutPositionsSource),
  },
};

export const Size: Story = {
  ...Default,
  args: {
    footer: 'Size slideout footer',
  },
  argTypes: {
    ...disableArgTypes(['children', 'show', 'size', 'id']),
  },
  render: (args) => <SlideoutSizes {...args} />,
  parameters: {
    ...withCustomSource(SlideoutSizesSource),
  },
};

export const Footer: Story = {
  ...Default,
  args: {
    ...Default.args,
    footer: <IressButton>Footer button</IressButton>,
  },
  argTypes: {
    ...disableArgTypes(['footer', 'show']),
  },
  render: renderWithButtonFn('Show slideout with footer'),
};

export const AbsolutePosition: Story = {
  ...Default,
  args: {
    ...Default.args,
    eleToPush: '#contents',
    position: 'left',
    mode: 'push',
  },
  render: (args) => <AbsolutePositionSlideout {...args} />,
  parameters: {
    ...withTransformedRawSource(
      AbsolutePositionSlideoutSource,
      'IressSlideoutProps',
    ),
  },
};

export const Microfrontend: Story = {
  ...Default,
  argTypes: {
    ...disableArgTypes(['children', 'show']),
  },
  render: (args) => <SlideoutMicrofrontend {...args} />,
  parameters: {
    ...withCustomSource(SlideoutMicrofrontendSource),
    layout: 'fullscreen',
  },
};

export const V5TestDiff: Story = {
  render: () => (
    <DiffViewer
      allowModeChange
      oldValue={`import { render, waitFor, screen } from '@testing-library/react';
import { idsFireEvent, componentLoad } from '@iress/ids-react-test-utils';
  
test('opening and closing a slideout', async () => {
  await componentLoad([
    'slideout-trigger',
    'slideout',
  ]);

  const trigger = screen.getByTestId('slideout-trigger');
  const slideout = screen.getByTestId('slideout');

  // In version 4, you can already interact with the slideout here as its in the DOM at this stage.

  // activate slideout
  idsFireEvent.click(trigger);
  await waitFor(() => expect(slideout).toBeVisible());

  // close slideout
  const closeButton = screen.getByTestId('slideout__close-button');
  idsFireEvent.click(closeButton);
  await waitFor(() => expect(slideout).not.toBeVisible());
});`}
      newValue={`import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

test('opening and closing a slideout', async () => {
  const trigger = screen.getByRole('button', { name: /open slideout/i });

  // activate slideout
  await userEvent.click(trigger);
  const slideout = await screen.findByRole('complementary'); // this assumes the slideout has the role="complementary"

  // In version 5, you can only interact with the slideout once it has been loaded here.

  // close slideout
  const closeButton = screen.getByRole('button', { name: /close/i });
  await userEvent.click(closeButton);
  await waitForElementToBeRemoved(slideout);
});`}
    />
  ),
};
