import { type Meta, type StoryObj } from '@storybook/react-vite';
import { IressContainer } from '.';
import {
  componentStoryMeta,
  reactNodeArgType,
  withBreakpointLabel,
} from '@iress-oss/ids-storybook-config';
import { IressTable } from '../Table';
import { BREAKPOINT_DETAILS, BREAKPOINTS } from '@/constants';
import componentMeta from './meta';

type Story = StoryObj<typeof IressContainer>;

export default {
  title: 'Components/Container',
  component: IressContainer,
  ...componentStoryMeta(componentMeta, {
    argTypes: {
      children: reactNodeArgType,
    },
  }),
} as Meta<typeof IressContainer>;

export const Default: Story = {
  args: {
    children:
      'This content is inside a container that snaps to fixed max widths at different breakpoints.',
  },
};

export const Container: Story = {
  render: (args) => (
    <IressContainer {...args}>
      <p>
        IressContainer improves the scannability and visual hierarchy of a user
        interface by snapping the layout to fixed max widths at different
        breakpoints.
      </p>
      <p>Try resizing the screen to see the difference.</p>
    </IressContainer>
  ),
  decorators: [withBreakpointLabel('container')],
};

export const Fluid: Story = {
  ...Container,
  args: {
    fluid: true,
  },
};

export const BreakpointTable: Story = {
  render: (args) => (
    <IressTable
      {...args}
      caption="Container breakpoints"
      rows={BREAKPOINTS.map((breakpoint) => ({
        breakpoint,
        screenWidths: BREAKPOINT_DETAILS[breakpoint].screenWidthRange,
        maxWidth: BREAKPOINT_DETAILS[breakpoint].containerMaxWidth,
      }))}
    />
  ),
  tags: ['reference'],
};
