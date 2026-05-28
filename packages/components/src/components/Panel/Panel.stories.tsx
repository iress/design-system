import { type Meta, type StoryObj } from '@storybook/react-vite';
import { IressPanel } from './Panel';
import { IressPlaceholder } from '../Placeholder';
import { IressText } from '../Text';
import { IressInline } from '@/main';
import { stylingProps } from '@iress-oss/ids-storybook-config';
import componentMeta from './meta';

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
    <IressInline noWrap gap="spacing.4">
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
    ...stylingProps,
  },
  tags: ['updated'],
  parameters: {
    docs: {
      description: {
        component: componentMeta.description,
      },
    },
  },
} as Meta<typeof IressPanel>;

export const Default: Story = {
  args: {
    heading: 'Panel Heading',
    children: 'text',
  },
};
