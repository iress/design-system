import { Meta, StoryObj } from '@storybook/react-vite';
import { IressPanel } from './Panel';
import { IressPlaceholder } from '../Placeholder';
import { IressText } from '../Text';
import { disableArgTypes } from '@iress-storybook/helpers';
import { IressStack } from '../Stack';
import {
  IressCol,
  IressContainer,
  IressInline,
  IressRow,
  TEXT_ALIGNS,
} from '@/main';

type PanelCustomArgs = React.ComponentProps<typeof IressPanel>;
type Story = StoryObj<PanelCustomArgs>;

const childrenOptions = {
  none: null,
  text: 'His head is gone, it is like it is been erased... Erased from existence. That was the day I invented time travel. I remember it vividly. I was standing on the edge of my toilet hanging a clock, the porces was wet, I slipped, hit my head on the edge of the sink. And when I came to I had a revelation, a picture, a picture in my head, a picture of this. This is what makes time travel possible. The flux capacitor.',
  paragraphs: [
    <p key="1">
      Prow scuttle parrel provost Sail ho shrouds spirits boom mizzenmast
      yardarm. Pinnace holystone mizzenmast quarter crow&apos;s nest nipperkin
      grog yardarm hempen halter furl. Swab barque interloper chantey doubloon
      starboard grog black jack gangway rutters.
    </p>,
    <p key="2">
      Deadlights jack lad schooner scallywag dance the hempen jig carouser
      broadside cable strike colors. Bring a spring upon her cable holystone
      blow the man down spanker Shiver me timbers to go on account lookout
      wherry doubloon chase. Belay yo-ho-ho keelhaul squiffy black spot yardarm
      spyglass sheet transom heave to.
    </p>,
  ],
  story: (
    <IressInline noWrap gap="spacing.400">
      <IressPlaceholder
        width="100px"
        height="100px"
        style={{ minWidth: '100px' }}
      ></IressPlaceholder>
      <IressText>
        His head is gone, it is like it is been erased... Erased from existence.
        That was the day I invented time travel. I remember it vividly. I was
        standing on the edge of my toilet hanging a clock, the porces was wet, I
        slipped, hit my head on the edge of the sink. And when I came to I had a
        revelation, a picture, a picture in my head, a picture of this. This is
        what makes time travel possible. The flux capacitor.
      </IressText>
    </IressInline>
  ),
};

export default {
  title: 'Components/Panel',
  component: IressPanel,
  argTypes: {
    children: {
      control: {
        type: 'select',
      },
      options: Object.keys(childrenOptions),
      mapping: childrenOptions,
    },
  },
  tags: ['updated'],
  decorators: [
    (Story) => (
      <IressPanel bg="alt" borderRadius="radius.000" stretch>
        <Story />
      </IressPanel>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
} as Meta<typeof IressPanel>;

export const Default: Story = {
  args: {
    children: 'text',
  },
};

export const bg: Story = {
  args: {
    children: 'text',
  },
  argTypes: {
    ...Default.argTypes,
    ...disableArgTypes(['bg', 'color']),
  },
  render: (args) => (
    <IressContainer>
      <IressRow gutter="spacing.400">
        <IressCol>
          <IressPanel {...args}>
            <IressText element="h2">(default)</IressText>
            {args.children}
          </IressPanel>
        </IressCol>
        <IressCol>
          <IressPanel
            {...args}
            bg="colour.primary.fill"
            color="colour.primary.onFill"
          >
            <h2>
              Primary <code>bg</code>
            </h2>
            {args.children}
          </IressPanel>
        </IressCol>
        <IressCol>
          <IressPanel {...args} bg="transparent">
            <IressText element="h2">
              Transparent <code>bg</code>
            </IressText>
            {args.children}
          </IressPanel>
        </IressCol>
      </IressRow>
    </IressContainer>
  ),
};

export const TextAlign: Story = {
  ...Default,
  argTypes: {
    ...Default.argTypes,
    ...disableArgTypes(['textAlign']),
  },
  render: (args) => (
    <IressStack gap="md">
      {TEXT_ALIGNS.map((textAlign) => (
        <IressPanel
          key={textAlign}
          {...args}
          textAlign={textAlign === 'inherit' ? 'center' : textAlign}
        >
          <IressText element="h2">{textAlign}</IressText>
          {args.children}
          {textAlign === 'inherit' && (
            <IressPanel {...args} textAlign={textAlign}>
              <h3>Inherits center align of parent panel</h3>
              {args.children}
            </IressPanel>
          )}
        </IressPanel>
      ))}
    </IressStack>
  ),
};

export const Stretch: Story = {
  ...Default,
  args: {
    ...Default.args,
    stretch: true,
  },
  render: (args) => (
    <IressStack style={{ height: '200px' }}>
      <IressPanel {...args} />
    </IressStack>
  ),
};

export const NoBorderRadius: Story = {
  ...Default,
  args: {
    ...Default.args,
    borderRadius: 'none',
  },
};
