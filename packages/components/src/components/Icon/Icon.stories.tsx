import { Meta, StoryObj } from '@storybook/react';
import { IressIcon } from './Icon';
import {
  ICON_FLIPS,
  ICON_ROTATES,
  ICON_SIZES,
  ICON_SPINS,
  IressIconProps,
} from './Icon.types';
import { disableArgTypes } from '@iress-storybook/helpers';
import { IressText } from '../Text';
import styles from '~storybook/styles.module.scss';
import { IressInline } from '../Inline';
import { TEXT_MODES } from '@/main';

type Story = StoryObj<IressIconProps>;

export default {
  title: 'Components/Icon',
  component: IressIcon,
} as Meta<typeof IressIcon>;

export const Default: Story = {
  args: {
    name: 'home',
  },
};

export const ScreenReaderText: Story = {
  args: {
    ...Default.args,
    screenreaderText: 'Home',
  },
};

export const Size: Story = {
  args: {
    ...Default.args,
  },
  argTypes: {
    ...disableArgTypes(['size']),
  },
  render: (args) => (
    <IressInline gutter="md" verticalAlign="bottom">
      {ICON_SIZES.map((size) => (
        <div key={size}>
          <IressIcon {...args} size={size} />
          <IressText align="center">{size}</IressText>
        </div>
      ))}
    </IressInline>
  ),
};

export const Mode: Story = {
  args: {
    ...Default.args,
    size: '5x',
  },
  argTypes: {
    ...disableArgTypes(['mode']),
  },
  render: (args) => (
    <IressInline gutter="md">
      {TEXT_MODES.map((mode) => (
        <div key={mode}>
          <IressIcon {...args} mode={mode} />
          <IressText align="center">{mode}</IressText>
        </div>
      ))}
    </IressInline>
  ),
};

export const Flip: Story = {
  args: {
    ...Default.args,
    size: '5x',
  },
  argTypes: {
    ...disableArgTypes(['flip']),
  },
  render: (args) => (
    <IressInline gutter="md">
      <div>
        <IressIcon {...args} />
        <IressText align="center">original</IressText>
      </div>
      {ICON_FLIPS.map((flip) => (
        <div key={flip}>
          <IressIcon {...args} flip={flip} />
          <IressText align="center">{flip}</IressText>
        </div>
      ))}
    </IressInline>
  ),
};

export const Rotate: Story = {
  args: {
    ...Default.args,
    size: '5x',
  },
  argTypes: {
    ...disableArgTypes(['rotate']),
  },
  render: (args) => (
    <IressInline gutter="md">
      <div>
        <IressIcon {...args} />
        <IressText align="center">original</IressText>
      </div>
      {ICON_ROTATES.map((rotate) => (
        <div key={rotate}>
          <IressIcon {...args} rotate={rotate} />
          <IressText align="center">{rotate}</IressText>
        </div>
      ))}
    </IressInline>
  ),
};

export const Spin: Story = {
  args: {
    name: 'spinner',
    screenreaderText: 'Loading...',
  },
  argTypes: {
    ...disableArgTypes(['spin']),
  },
  render: (args) => (
    <IressInline gutter="md">
      {ICON_SPINS.map((spin) => (
        <IressText key={spin}>
          <IressIcon {...args} spin={spin} /> {spin}
        </IressText>
      ))}
    </IressInline>
  ),
};

export const FixedWidth: Story = {
  args: {
    size: '3x',
  },
  argTypes: {
    ...disableArgTypes(['name', 'fixedWidth']),
  },
  render: (args) => (
    <IressInline gutter="md">
      <div>
        <IressText element="h2" variant="h5">
          Default width
        </IressText>
        <IressIcon
          {...args}
          name="space-shuttle"
          className={styles.altBackground}
        />
        <br />
        <IressIcon
          {...args}
          name="wine-glass-alt"
          className={styles.altBackground}
        />
      </div>
      <div>
        <IressText element="h2" variant="h5">
          Fixed width
        </IressText>
        <IressIcon
          {...args}
          name="space-shuttle"
          fixedWidth
          className={styles.altBackground}
        />
        <br />
        <IressIcon
          {...args}
          name="wine-glass-alt"
          fixedWidth
          className={styles.altBackground}
        />
      </div>
    </IressInline>
  ),
};

export const ExternalLink: Story = {
  render: (args) => (
    <IressText>
      <a href="https://www.iress.com/" target="_blank" rel="noreferrer">
        Go to this link:
        <IressIcon
          {...args}
          name={args.name ?? 'external-link'}
          size="xs"
          style={
            {
              position: 'relative',
              'inset-block-start': '-0.25em',
              'margin-inline-start':
                'var(--iress-g-spacing-xs, var(--iress-default-spacing-xs))',
            } as never
          }
        />
      </a>
    </IressText>
  ),
};
