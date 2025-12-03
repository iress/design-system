import { type Meta, type StoryObj } from '@storybook/react';
import { IressContainer } from '.';
import { IressPanel } from '../Panel';
import {
  CurrentBreakpoint,
  disableArgTypes,
} from '@iress-oss/ids-storybook-config';

type Story = StoryObj<typeof IressContainer>;

export default {
  title: 'Components/Container',
  component: IressContainer,
  argTypes: {
    ...disableArgTypes(['children']),
  },
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
