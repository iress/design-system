import { type Meta, type StoryObj } from '@storybook/react-vite';
import { IressContainer } from '.';
import { IressPanel } from '../Panel';
import { CurrentBreakpoint } from '@iress-storybook/components';
import { themeControlNames, withThemeArgTypes } from '@theme-preset/storybook';

type Story = StoryObj<typeof IressContainer>;

export default {
  title: 'Components/Container',
  component: IressContainer,
  argTypes: {
    ...withThemeArgTypes({
      children: {
        description: 'The content of the container.',
        control: { disable: true, type: undefined },
        table: {
          type: {
            summary: 'ReactNode',
          },
        },
      },
    }),
  },
  parameters: {
    controls: { include: ['children', 'fluid', ...themeControlNames] },
    layout: 'fullscreen',
  },
  tags: ['updated'],
  decorators: [
    (Story) => (
      <IressPanel bg="alt" borderRadius="radius.000" stretch>
        <Story />
      </IressPanel>
    ),
  ],
} as Meta<typeof IressContainer>;

export const Container: Story = {
  render: (args) => (
    <IressContainer {...args}>
      <p>
        IressContainer improves the scannability and visual hierarchy of a user
        interface by snapping the layout to fixed max widths at different
        breakpoints.
      </p>

      {args.fluid ? (
        <p>
          When the <code>fluid</code> prop is enabled, the container will span
          the full width of its containing element. Try resizing the screen to
          see how the IressContainer is 100% for all screen sizes.
        </p>
      ) : (
        <p>Try resizing the screen to see the difference.</p>
      )}

      <IressPanel>
        <CurrentBreakpoint
          renderLabel={args.fluid ? 'container-fluid' : 'container'}
        />
      </IressPanel>
    </IressContainer>
  ),
};

export const Fluid: Story = {
  ...Container,
  args: {
    fluid: true,
  },
};
