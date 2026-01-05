import { type Meta, type StoryObj } from '@storybook/react-vite';
import { IressStyled } from '.';
import { IressStack } from '../Stack';
import { IressText } from '../Text';
import { IressIcon } from '../Icon';
import { disableArgTypes } from '@iress-oss/ids-storybook-config';

type Story = StoryObj<typeof IressStyled>;

export default {
  title: 'Components/Styled',
  component: IressStyled,
  tags: ['updated'],
} as Meta<typeof IressStyled>;

export const Default: Story = {
  args: {
    children: 'This is styled content using Panda CSS',
    p: 'spacing.4',
    bg: 'colour.neutral.20',
    borderRadius: 'radius.050',
  },
};

export const Elements: Story = {
  render: (args) => (
    <IressStack gap="spacing.3">
      <IressStyled
        {...args}
        element="section"
        p="spacing.4"
        bg="colour.neutral.20"
        borderRadius="radius.050"
      >
        <IressText element="h3">Section Element</IressText>
        <IressText>This is rendered as a section element.</IressText>
      </IressStyled>

      <IressStyled
        {...args}
        element="article"
        p="spacing.4"
        bg="colour.neutral.20"
        borderRadius="radius.050"
      >
        <IressText element="h3">Article Element</IressText>
        <IressText>This is rendered as an article element.</IressText>
      </IressStyled>

      <IressStyled
        {...args}
        element="aside"
        p="spacing.4"
        bg="colour.neutral.20"
        borderRadius="radius.050"
      >
        <IressText element="h3">Aside Element</IressText>
        <IressText>This is rendered as an aside element.</IressText>
      </IressStyled>

      <IressStyled
        {...args}
        element="nav"
        p="spacing.4"
        bg="colour.neutral.20"
        borderRadius="radius.050"
      >
        <IressText element="h3">Nav Element</IressText>
        <IressText>This is rendered as a nav element.</IressText>
      </IressStyled>
    </IressStack>
  ),
  argTypes: {
    ...disableArgTypes(['element', 'children']),
  },
};

export const Spacing: Story = {
  render: (args) => (
    <IressStack gap="spacing.3">
      <IressStyled
        {...args}
        p="spacing.2"
        bg="colour.neutral.20"
        borderRadius="radius.050"
      >
        <IressText>Small padding (spacing.2)</IressText>
      </IressStyled>

      <IressStyled
        {...args}
        p="spacing.4"
        bg="colour.neutral.20"
        borderRadius="radius.050"
      >
        <IressText>Medium padding (spacing.4)</IressText>
      </IressStyled>

      <IressStyled
        {...args}
        p="spacing.6"
        bg="colour.neutral.20"
        borderRadius="radius.050"
      >
        <IressText>Large padding (spacing.6)</IressText>
      </IressStyled>

      <IressStyled
        {...args}
        m="spacing.4"
        p="spacing.4"
        bg="colour.system.info.surface"
        borderRadius="radius.050"
      >
        <IressText>With margin (spacing.4)</IressText>
      </IressStyled>
    </IressStack>
  ),
  argTypes: {
    ...disableArgTypes(['padding', 'margin', 'children']),
  },
};

export const Colors: Story = {
  render: (args) => (
    <IressStack gap="spacing.3">
      <IressStyled
        {...args}
        p="spacing.4"
        bg="colour.system.info.surface"
        color="colour.system.info.text"
        borderRadius="radius.050"
      >
        <IressText>Info color scheme</IressText>
      </IressStyled>

      <IressStyled
        {...args}
        p="spacing.4"
        bg="colour.system.success.surface"
        color="colour.system.success.text"
        borderRadius="radius.050"
      >
        <IressText>Success color scheme</IressText>
      </IressStyled>

      <IressStyled
        {...args}
        p="spacing.4"
        bg="colour.system.warning.surface"
        color="colour.system.warning.text"
        borderRadius="radius.050"
      >
        <IressText>Warning color scheme</IressText>
      </IressStyled>

      <IressStyled
        {...args}
        p="spacing.4"
        bg="colour.system.danger.surface"
        color="colour.system.danger.text"
        borderRadius="radius.050"
      >
        <IressText>Danger color scheme</IressText>
      </IressStyled>
    </IressStack>
  ),
  argTypes: {
    ...disableArgTypes(['backgroundColor', 'color', 'children']),
  },
};

export const Complex: Story = {
  render: (args) => (
    <IressStyled
      {...args}
      maxWidth="2/12"
      m="auto"
      p="spacing.5"
      bg="colour.neutral.10"
      borderRadius="radius.100"
      layerStyle="elevation.raised"
    >
      <IressStyled mb="spacing.4">
        <IressIcon
          name="info"
          color="colour.system.info.text"
          textStyle="typography.body.lg"
        />
        <IressText element="h2" textStyle="typography.heading.3">
          Complex Styled Component
        </IressText>
      </IressStyled>

      <IressText element="p" mb="spacing.3">
        The <code>IressStyled</code> component provides full access to Panda CSS
        styling props, allowing you to create complex layouts and designs
        without writing custom CSS.
      </IressText>

      <IressStyled
        p="spacing.4"
        bg="colour.neutral.20"
        borderRadius="radius.050"
      >
        <IressText>
          This example demonstrates combining multiple styling properties to
          create a rich, semantic HTML structure with custom styling.
        </IressText>
      </IressStyled>
    </IressStyled>
  ),
  argTypes: {
    ...disableArgTypes([
      'padding',
      'margin',
      'backgroundColor',
      'borderRadius',
      'children',
    ]),
  },
};
