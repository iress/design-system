import { Meta, StoryObj } from '@storybook/react';
import { IressText } from '.';
import { IressStack } from '../Stack';
import { IressIcon } from '../Icon';
import { disableArgTypes } from '@iress-storybook/helpers';
import { TEXT_ALIGNS, TEXT_ELEMENTS, TEXT_MODES, TEXT_VARIANTS } from '@/main';

type Story = StoryObj<typeof IressText>;

export default {
  title: 'Components/Text',
  component: IressText,
} as Meta<typeof IressText>;

const text = 'The quick brown fox jumps over the lazy dog';

export const Default: Story = {
  args: {
    children: text,
  },
};

export const Element: Story = {
  render: (args) => (
    <IressStack gutter="md">
      {TEXT_ELEMENTS.map((element) => (
        <IressText {...args} key={element} element={element}>
          This is a {element} element.
        </IressText>
      ))}
    </IressStack>
  ),
  argTypes: {
    ...disableArgTypes(['element']),
  },
};

export const Variant: Story = {
  render: (args) => (
    <IressStack gutter="md">
      {TEXT_VARIANTS.map((variant) => (
        <IressText {...args} key={variant} variant={variant}>
          This is the {variant} variant.
        </IressText>
      ))}
    </IressStack>
  ),
  argTypes: {
    ...disableArgTypes(['variant']),
  },
};

export const Mode: Story = {
  render: (args) => (
    <IressStack gutter="md">
      {TEXT_MODES.map((mode) => (
        <IressText {...args} key={mode} mode={mode}>
          This is {mode} mode.
        </IressText>
      ))}
      <IressText {...args} mode="danger">
        Nested text mode demonstration:{' '}
        <IressText {...args}>
          I am nested, and return to the original colour
        </IressText>
      </IressText>
    </IressStack>
  ),
  argTypes: {
    ...disableArgTypes(['mode']),
  },
};

export const Align: Story = {
  render: (args) => (
    <IressStack gutter="md">
      {TEXT_ALIGNS.map((align) => (
        <IressText {...args} key={align} align={align}>
          {text}
        </IressText>
      ))}
    </IressStack>
  ),
  argTypes: {
    ...disableArgTypes(['align']),
  },
};

export const HeadingsWithIcons: Story = {
  render: (args) => (
    <IressStack>
      <IressText {...args} element={IressText.Element.H1}>
        <IressIcon name="smile-wink" />
        <span>H1 heading with icons</span>
        <IressIcon name="smile-wink" />
      </IressText>
      <IressText {...args} element={IressText.Element.H2}>
        <IressIcon name="smile-wink" />
        <span>H2 heading with icons</span>
        <IressIcon name="smile-wink" />
      </IressText>
      <IressText {...args} element={IressText.Element.H3}>
        <IressIcon name="smile-wink" />
        <span>H3 heading with icons</span>
        <IressIcon name="smile-wink" />
      </IressText>
      <IressText {...args} element={IressText.Element.H4}>
        <IressIcon name="smile-wink" />
        <span>H4 heading with icons</span>
        <IressIcon name="smile-wink" />
      </IressText>
      <IressText {...args} element={IressText.Element.H5}>
        <IressIcon name="smile-wink" />
        <span>H5 heading with icons</span>
        <IressIcon name="smile-wink" />
      </IressText>
      <IressText {...args} element={IressText.Element.H6}>
        <IressIcon name="smile-wink" />
        <span>H6 heading with icons</span>
        <IressIcon name="smile-wink" />
      </IressText>
    </IressStack>
  ),
  argTypes: {
    ...disableArgTypes(['element']),
  },
};

export const TypographicBlock: Story = {
  render: (args) => (
    <IressText {...args}>
      <h2>Heading text</h2>
      <p>
        This is just raw HTML inside the text component. This is just raw HTML
        inside the text component.
      </p>
      <blockquote>
        Nisi optio dolore debitis porro ex quis odio atque, ut obcaecati dolorem
        enim molestiae eum voluptatem excepturi quisquam.{' '}
        <cite>Someone in latin</cite>
      </blockquote>
      <p>You can also use dividers inside blocks to separate content.</p>
      <hr />
      <p>Just like the one above.</p>
    </IressText>
  ),
};
