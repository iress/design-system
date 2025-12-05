import { type Meta, type StoryObj } from '@storybook/react-vite';
import { IressText, type IressTextProps, text, type TextElements } from '.';
import { IressStack } from '../Stack';
import { IressIcon } from '../Icon';
import { TEXT_STYLES } from '@theme-preset/tokens/textStyles';
import { disableArgTypes } from '@iress-oss/ids-storybook-config';
import { COLOR_TOKENS } from '@theme-preset/tokens/colors';

type Story = StoryObj<typeof IressText>;
type HeadingStory = StoryObj<
  IressTextProps<'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'>
>;

const TEXT_ELEMENTS: TextElements[] = [
  'p',
  'div',
  'span',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'code',
  'small',
  'cite',
  'caption',
  'strong',
  'em',
  'a',
  'blockquote',
  'pre',
];

export default {
  title: 'Components/Text',
  component: IressText,
  parameters: {
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
  render: (args) => (
    <IressStack gap="spacing.1">
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
    <IressStack gap="md">
      {TEXT_STYLES.map((variant) => (
        <IressText {...args} key={variant} textStyle={variant}>
          This is the {variant} text style.
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
    <IressStack gap="md">
      {COLOR_TOKENS.map((mode) => (
        <IressText {...args} key={mode} color={mode}>
          This is {mode} mode.
        </IressText>
      ))}
      <IressText {...args} color="colour.primary.text">
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
    <IressStack gap="md">
      <IressText {...args} textAlign="left">
        {children}
      </IressText>
      <IressText {...args} textAlign="center">
        {children}
      </IressText>
      <IressText {...args} textAlign="right">
        {children}
      </IressText>
      <IressText {...args} textAlign="justify">
        {children}
      </IressText>
      <IressText {...args} textAlign="inherit">
        {children}
      </IressText>
    </IressStack>
  ),
  argTypes: {
    ...disableArgTypes(['textAlign']),
  },
};

export const HeadingsWithIcons: HeadingStory = {
  render: (args) => (
    <IressStack>
      <IressText {...args} element="h1">
        <IressIcon name="smile-wink" />
        <span>H1 heading with icons</span>
        <IressIcon name="smile-wink" />
      </IressText>
      <IressText {...args} element="h2">
        <IressIcon name="smile-wink" />
        <span>H2 heading with icons</span>
        <IressIcon name="smile-wink" />
      </IressText>
      <IressText {...args} element="h3">
        <IressIcon name="smile-wink" />
        <span>H3 heading with icons</span>
        <IressIcon name="smile-wink" />
      </IressText>
      <IressText {...args} element="h4">
        <IressIcon name="smile-wink" />
        <span>H4 heading with icons</span>
        <IressIcon name="smile-wink" />
      </IressText>
      <IressText {...args} element="h5">
        <IressIcon name="smile-wink" />
        <span>H5 heading with icons</span>
        <IressIcon name="smile-wink" />
      </IressText>
      <IressText {...args} element="h6">
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
    <IressText {...args} maxWidth="container.md" mx="auto" px="spacing.2">
      <h2>History</h2>
      <h3>Founding and Early Years (1993 - 2000)</h3>
      <p>
        <a href="https://iress.com" target="_blank">
          Iress Limited (ASX: IRE)
        </a>{' '}
        was founded in 1993 in Melbourne, Australia, as a provider of financial
        market data and trading software. Initially, the company focused on
        delivering technology solutions for stockbrokers and traders, providing
        real-time market data, order management, and trading execution tools.
      </p>
      <h3>Expansion and IPO (2001 - 2010)</h3>
      <p>
        In 2001, Iress went public, listing on the Australian Securities
        Exchange (ASX). This move provided the company with capital to expand
        its operations and invest in new technologies. During this period, Iress
        expanded its services beyond trading platforms to include financial
        planning software, portfolio management, and wealth management
        solutions. The company also started expanding internationally, entering
        markets such as the UK, Canada, New Zealand, and South Africa, through
        organic growth and acquisitions.
      </p>
      <h3>Global Growth and Acquisitions (2011 - 2020)</h3>
      <p>
        Between 2011 and 2020, Iress continued its global expansion through
        acquisitions and product diversification. Key acquisitions included:
      </p>
      <ul>
        <li>
          Avelo (2013): Strengthened its presence in the UK financial services
          market.
        </li>
        <li>
          Pulse Software (2014): Added financial advice solutions to its
          portfolio.
        </li>
        <li>
          INET BFA (2016): Expanded its reach into South Africa’s financial
          market.
        </li>
        <li>
          OneVue (2020): Enhanced its superannuation and investment
          administration capabilities.
        </li>
      </ul>
      <p>
        During this period, Iress also expanded into mortgage lending technology
        and digital financial services, adapting to the increasing demand for
        automation and efficiency in financial markets.
      </p>
      <h3>Recent Developments (2021 - Present)</h3>
      <p>
        In 2021, Iress announced a strategic review of its business, focusing on
        streamlining operations and improving profitability. The company also
        experienced leadership changes, including new CEO appointments to drive
        digital transformation.{' '}
      </p>
      <p>
        Iress has continued to innovate with cloud-based solutions, artificial
        intelligence (AI), and data analytics, catering to financial
        institutions, brokers, and wealth management firms globally.
      </p>
      <pre>Some code in here</pre>
    </IressText>
  ),
};
