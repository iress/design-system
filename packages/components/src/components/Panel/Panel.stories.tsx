import { type Meta, type StoryObj } from '@storybook/react';
import { IressPanel } from './Panel';
import { IressPlaceholder } from '../Placeholder';
import { IressText } from '../Text';
import { IressStack } from '../Stack';
import {
  IressInline,
  type IressPanelProps,
  PADDING_SIZES,
  TEXT_ALIGNS,
} from '@/main';
import {
  CurrentBreakpoint,
  disableArgTypes,
  withJsxTransformer,
} from '@iress-oss/ids-storybook-config';
import { PANEL_BACKGROUNDS } from './Panel.types';

type PanelCustomArgs = React.ComponentProps<typeof IressPanel> & {
  responsivePadding?: IressPanelProps['padding'];
};
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
    <IressInline noWrap gutter="md">
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
} as Meta<typeof IressPanel>;

export const Default: Story = {
  args: {
    children: 'text',
  },
};

export const Background: Story = {
  ...Default,
  argTypes: {
    ...Default.argTypes,
    ...disableArgTypes(['background']),
  },
  render: (args) => (
    <IressStack gutter="md">
      {PANEL_BACKGROUNDS.map((background) => (
        <IressPanel key={background} {...args} background={background}>
          <IressText element="h2">{background}</IressText>
          {args.children}
        </IressPanel>
      ))}
    </IressStack>
  ),
};

export const Padding: Story = {
  ...Default,
  argTypes: {
    ...Default.argTypes,
    ...disableArgTypes(['padding']),
  },
  render: (args) => (
    <IressStack gutter="md">
      {PADDING_SIZES.map((padding) => (
        <IressPanel key={padding} {...args} padding={padding}>
          <IressText element="h2">{padding}</IressText>
          {args.children}
        </IressPanel>
      ))}
    </IressStack>
  ),
};

export const ResponsivePadding: Story = {
  ...Default,
  args: {
    noGutter: true,
    padding: {
      xs: 'none',
      sm: 'sm',
      md: 'md',
      lg: 'lg',
    },
  },
  argTypes: {
    ...Default.argTypes,
    ...disableArgTypes(['children']),
  },
  render: (args) => (
    <IressPanel {...args}>
      <p>
        Current breakpoint: <CurrentBreakpoint />.
      </p>
      <p>
        <pre>padding=&#123;{JSON.stringify(args.padding, null, 2)}&#125;</pre>
      </p>
    </IressPanel>
  ),
};

export const VariablePadding: Story = {
  ...Default,
  args: {
    noGutter: true,
    padding: {
      xs: 'none',
      sm: 'sm',
      md: 'md',
      lg: 'lg',
    },
    responsivePadding: {
      xs: {
        b: 'sm',
        t: 'lg',
        r: 'sm',
        l: 'lg',
      },
      xl: {
        b: 'none',
        t: 'sm',
        r: 'lg',
        l: 'sm',
      },
    },
  },
  argTypes: {
    ...Default.argTypes,
    ...disableArgTypes(['children']),
  },
  render: (args) => (
    <IressStack gutter="md">
      <IressPanel {...args}>
        <h2>Variable padding</h2>
        <p>
          <pre>padding=&#123;{JSON.stringify(args.padding, null, 2)}&#125;</pre>
        </p>
      </IressPanel>
      <IressPanel {...args} padding={args.responsivePadding}>
        <h2>Responsive variable padding</h2>
        <p>
          Current breakpoint: <CurrentBreakpoint />.
        </p>
        <p>
          <pre>
            padding=&#123;{JSON.stringify(args.responsivePadding, null, 2)}
            &#125;
          </pre>
        </p>
      </IressPanel>
    </IressStack>
  ),
  parameters: {
    ...withJsxTransformer({
      filterProps: ['responsivePadding'],
    }),
  },
};

export const TextAlign: Story = {
  ...Default,
  argTypes: {
    ...Default.argTypes,
    ...disableArgTypes(['textAlign']),
  },
  render: (args) => (
    <IressStack gutter="md">
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
    noBorderRadius: true,
  },
};
