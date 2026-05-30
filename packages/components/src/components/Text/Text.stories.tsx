import { type Meta, type StoryObj } from '@storybook/react-vite';
import { IressText, type IressTextProps, text } from '.';
import { IressStack } from '../Stack';
import { IressIcon } from '../Icon';
import {
  disableArgTypes,
  reactNodeArgType,
  stylingProps,
  withSource,
} from '@iress-oss/ids-storybook-config';
import componentMeta from './meta';

import { TextElement } from './mocks/TextElement';
import TextElementSource from './mocks/TextElement.tsx?raw';
import { TextVariant } from './mocks/TextVariant';
import TextVariantSource from './mocks/TextVariant.tsx?raw';
import { TextMode } from './mocks/TextMode';
import TextModeSource from './mocks/TextMode.tsx?raw';
import { TextAlign } from './mocks/TextAlign';
import TextAlignSource from './mocks/TextAlign.tsx?raw';

type Story = StoryObj<typeof IressText>;
type HeadingStory = StoryObj<
  IressTextProps<'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'>
>;

export default {
  title: 'Components/Text',
  component: IressText,
  argTypes: {
    children: reactNodeArgType,
    ...stylingProps,
  },
  parameters: {
    docs: {
      description: {
        component: componentMeta.description,
      },
    },
    controls: { include: ['children', text.variantKeys] },
  },
  tags: ['updated'],
} as Meta<typeof IressText>;

const children = 'The quick brown fox jumps over the lazy dog';

export const Default: Story = {
  args: {
    children,
  },
};

export const Element: Story = {
  render: (args) => <TextElement {...args} />,
  parameters: {
    controls: { disable: true },
    ...withSource(TextElementSource, { stripImports: true, stripExportFunction: true }),
  },
};

export const Variant: Story = {
  render: (args) => <TextVariant {...args} />,
  parameters: {
    controls: { disable: true },
    ...withSource(TextVariantSource, { stripImports: true, stripExportFunction: true }),
  },
};

export const Mode: Story = {
  render: (args) => <TextMode {...args} />,
  parameters: {
    controls: { disable: true },
    ...withSource(TextModeSource, { stripImports: true, stripExportFunction: true }),
  },
};

export const Align: Story = {
  render: (args) => <TextAlign {...args} />,
  parameters: {
    controls: { disable: true },
    ...withSource(TextAlignSource, { stripImports: true, stripExportFunction: true }),
  },
};

export const HeadingsWithIcons: HeadingStory = {
  render: (args) => (
    <IressStack>
      <IressText {...args} element="h1">
        <IressIcon name="sentiment_calm" />
        <span>H1 heading with icons</span>
        <IressIcon name="sentiment_calm" />
      </IressText>
      <IressText {...args} element="h2">
        <IressIcon name="sentiment_calm" />
        <span>H2 heading with icons</span>
        <IressIcon name="sentiment_calm" />
      </IressText>
      <IressText {...args} element="h3">
        <IressIcon name="sentiment_calm" />
        <span>H3 heading with icons</span>
        <IressIcon name="sentiment_calm" />
      </IressText>
    </IressStack>
  ),
  argTypes: {
    ...disableArgTypes(['element']),
  },
};

export const TypographicBlock: Story = {
  render: (args) => (
    <IressText {...args} maxWidth="container.md" mx="auto" px="spacing.2">
      <h2>History</h2>
      <h3>Founding and Early Years (1993 - 2000)</h3>
      <p>
        <a href="https://iress.com" target="_blank">
          Iress Limited (ASX: IRE)
        </a>{' '}
        was founded in 1993 in Melbourne, Australia, as a provider of financial
        market data and trading software.
      </p>
      <h3>Expansion and IPO (2001 - 2010)</h3>
      <p>
        In 2001, Iress went public, listing on the Australian Securities
        Exchange (ASX). This move provided the company with capital to expand
        its operations and invest in new technologies.
      </p>
      <pre>Some code in here</pre>
    </IressText>
  ),
};
