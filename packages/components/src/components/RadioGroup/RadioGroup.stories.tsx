import { type Meta, type StoryObj } from '@storybook/react-vite';
import { IressRadioGroup } from '.';
import { IressRadio } from '../Radio';
import { IressField } from '../Field';
import {
  getFinancialReviewChildren,
  getFinancialReviewManyChildren,
} from './mocks/radioGroupChildren';
import {
  componentStoryMeta,
  disableArgTypes,
  withSource,
  reactNodeArgType,
} from '@iress-oss/ids-storybook-config';
import componentMeta from './meta';

import { RadioGroupLayout } from './mocks/RadioGroupLayout';
import RadioGroupLayoutSource from './mocks/RadioGroupLayout.tsx?raw';

type Story = StoryObj<typeof IressRadioGroup>;

export default {
  title: 'Components/RadioGroup',
  component: IressRadioGroup,
  ...componentStoryMeta(componentMeta, {
    argTypes: {
      ...disableArgTypes(['children', 'onChange']),
      children: reactNodeArgType,
    },
  }),
} as Meta<typeof IressRadioGroup>;

export const Default: Story = {
  args: {
    name: 'survey',
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
    defaultValue: 'newspaper',
  },
};

export const Layout: Story = {
  render: (args) => <RadioGroupLayout {...args} />,
  parameters: {
    controls: { disable: true },
    ...withSource(RadioGroupLayoutSource, { stripImports: true, stripExportFunction: true }),
  },
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
    defaultValue: 'newspaper',
    readOnly: true,
  },
};

export const Touch: Story = {
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
    defaultValue: 'newspaper',
    variant: 'touch',
  },
};
