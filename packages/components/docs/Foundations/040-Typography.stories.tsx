import { type Meta, type StoryObj } from '@storybook/react';
import { IressStack, IressText } from '@/main';
import { disableArgTypes } from '@iress-oss/ids-storybook-config';

type Story = StoryObj<typeof IressText>;

export default {
  title: 'Foundations/Typography',
  component: IressText,
} as Meta<typeof IressText>;

export const Body: Story = {
  args: {
    children: [
      <p>
        Nobis odit nesciunt in, harum provident deleniti molestiae dolorum
        aliquid tempora optio accusamus dolore porro voluptatibus. Dolorum,
        repellat expedita.
      </p>,
      <ul>
        <li>Voluptatem assumenda soluta!</li>
        <li>
          Illum et atque alias possimus maiores rem in corrupti consectetur!
        </li>
        <li>Dolorum, repellat expedita!</li>
      </ul>,
    ],
  },
};

export const Headings: Story = {
  argTypes: {
    ...disableArgTypes(['children']),
  },
  render: (args) => (
    <IressStack gutter="md">
      <IressText {...args} element="h1">
        Hello, we are a company that puts clients first.
      </IressText>
      <IressText {...args} element="h2">
        Hello, we are a company that puts clients first.
      </IressText>
      <IressText {...args} element="h3">
        Hello, we are a company that puts clients first.
      </IressText>
      <IressText {...args} element="h4">
        Hello, we are a company that puts clients first.
      </IressText>
      <IressText {...args} element="h5">
        Hello, we are a company that puts clients first.
      </IressText>
      <IressText {...args} element="h2" variant="h3">
        An H2 styled as an H3.
      </IressText>
    </IressStack>
  ),
};

export const Display: Story = {
  argTypes: {
    ...disableArgTypes(['children']),
  },
  render: (args) => (
    <IressStack gutter="md">
      <IressText {...args} variant="display1">
        Hello, we are a company that puts clients first.
      </IressText>
      <IressText {...args} variant="display2">
        Hello, we are a company that puts clients first.
      </IressText>
      <IressText {...args} variant="display3">
        Hello, we are a company that puts clients first.
      </IressText>
      <IressText {...args} variant="display4">
        Hello, we are a company that puts clients first.
      </IressText>
    </IressStack>
  ),
};

export const Lead: Story = {
  args: {
    children:
      'Nobis odit nesciunt in, harum provident deleniti molestiae dolorum aliquid tempora optio accusamus dolore porro voluptatibus. Dolorum, repellat expedita.',
    element: 'p',
    variant: 'lead',
  },
};

export const Caption: Story = {
  args: {
    children: 'Example caption',
    element: 'caption',
  },
};

export const Other: Story = {
  argTypes: {
    ...disableArgTypes(['children']),
  },
  render: (args) => (
    <IressStack gutter="md">
      <IressText {...args} variant="bold">
        Bold text
      </IressText>
      <IressText {...args} variant="italic">
        Italic text
      </IressText>
      <IressText {...args} variant="small">
        Small text
      </IressText>
      <IressText {...args} mode="muted">
        Muted text
      </IressText>
    </IressStack>
  ),
};
