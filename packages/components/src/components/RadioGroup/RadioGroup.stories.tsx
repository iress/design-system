import { type Meta, type StoryObj } from '@storybook/react-vite';
import { IressRadioGroup } from '.';
import { IressRadio } from '../Radio';
import { IressText } from '../Text';
import { IressField } from '../Field';
import { IressStack } from '../Stack';
import {
  getFinancialReviewChildren,
  getFinancialReviewManyChildren,
} from './mocks/radioGroupChildren';
import { disableArgTypes } from '@iress-oss/ids-storybook-config';
import { reactNodeArgType, stylingProps } from '@theme-preset/storybookHelpers';
import { cssVars } from '@iress-oss/ids-tokens';

type Story = StoryObj<typeof IressRadioGroup>;

export default {
  title: 'Components/RadioGroup',
  component: IressRadioGroup,
  subcomponents: { IressRadio },
  argTypes: {
    ...disableArgTypes(['children', 'onChange']),
    children: reactNodeArgType,
    ...stylingProps,
  },
  tags: ['updated'],
} as Meta<typeof IressRadioGroup>;

export const RadioChildren: Story = {
  args: {
    children: [
      <IressRadio value="google" key="google">
        Google
      </IressRadio>,
      <IressRadio value="newspaper" key="newspaper">
        Newspaper
      </IressRadio>,
      <IressRadio value="friend" key="friend">
        Friend
      </IressRadio>,
      <IressRadio value="other" key="other">
        Other
      </IressRadio>,
    ],
  },
};

export const RadioSelection: Story = {
  args: {
    ...RadioChildren.args,
    defaultValue: 'newspaper',
  },
};

export const Layout: Story = {
  args: {
    children: [
      <IressRadio
        value="google"
        key="google"
        style={{ border: `1px solid ${cssVars.colour.neutral[30]}` }}
      >
        Google
      </IressRadio>,
      <IressRadio
        value="newspaper"
        key="google"
        style={{ border: `1px solid ${cssVars.colour.neutral[30]}` }}
      >
        Newspaper
      </IressRadio>,
      <IressRadio
        value="friend"
        key="google"
        style={{ border: `1px solid ${cssVars.colour.neutral[30]}` }}
      >
        Friend
      </IressRadio>,
      <IressRadio
        value="other"
        key="google"
        style={{ border: `1px solid ${cssVars.colour.neutral[30]}` }}
      >
        Other
      </IressRadio>,
    ],
  },
  argTypes: {
    ...disableArgTypes(['layout']),
  },
  render: (args) => (
    <IressStack gap="md">
      <IressText>
        <h3>block (default)</h3>
        <IressRadioGroup {...args} layout="block" />
      </IressText>
      <IressText>
        <h3>inline</h3>
        <IressRadioGroup {...args} layout="inline" />
      </IressText>
      <IressText>
        <h3>inlineEqualWidth</h3>
        <IressRadioGroup {...args} layout="inlineEqualWidth" />
      </IressText>
      <IressText>
        <h3>inlineFlex</h3>
        <IressRadioGroup {...args} layout="inlineFlex" />
      </IressText>
      <IressText>
        <h3>stack</h3>
        <IressRadioGroup {...args} layout="stack" />
      </IressText>
    </IressStack>
  ),
};

export const HiddenRadioButtons: Story = {
  args: {
    defaultValue: 'home',
    required: true,
    layout: 'inline',
    children: getFinancialReviewChildren(),
    variant: 'card',
  },
  render: (args) => (
    <IressField
      label="I'd like to discuss the following in my financial review:"
      hint="Select one option"
    >
      <IressRadioGroup {...args} />
    </IressField>
  ),
};

export const CustomRadioGroupLayout: Story = {
  args: {
    name: 'financial-review',
    required: true,
    layout: 'block',
    children: getFinancialReviewManyChildren(),
    variant: 'card',
  },
  render: ({ children, ...args }) => (
    <IressField
      label="I'd like to discuss the following in my financial review:"
      hint="Select one option"
    >
      <IressRadioGroup {...args}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gridAutoRows: '1fr',
            gridGap: '0.75rem',
            width: '100%',
            padding: '0.5rem',
            border: '1px dashed hsl(43deg 100% 45%)',
            resize: 'horizontal',
            overflow: 'auto',
          }}
        >
          {children}
        </div>
      </IressRadioGroup>
    </IressField>
  ),
};

export const ReadOnly: Story = {
  ...RadioSelection,
  args: {
    ...RadioSelection.args,
    readOnly: true,
  },
};

export const Touch: Story = {
  ...RadioSelection,
  args: {
    ...RadioSelection.args,
    variant: 'touch',
  },
};
