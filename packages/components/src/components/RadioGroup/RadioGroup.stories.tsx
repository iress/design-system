import { Meta, StoryObj } from '@storybook/react';
import { IressRadioGroup, RADIO_GROUP_LAYOUTS } from '.';
import { IressRadio } from '../Radio';
import { disableArgTypes } from '@iress-storybook/helpers';
import { IressText } from '../Text';
import styles from '~storybook/styles.module.scss';
import { IressField } from '../Field';
import {
  getFinancialReviewChildren,
  getFinancialReviewManyChildren,
} from './mocks/radioGroupChildren';

type Story = StoryObj<typeof IressRadioGroup>;

export default {
  title: 'Components/RadioGroup',
  component: IressRadioGroup,
  subcomponents: { IressRadio },
  argTypes: {
    ...disableArgTypes(['children', 'onChange']),
  },
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
      <IressRadio value="google" key="google" className={styles.addBorder}>
        Google
      </IressRadio>,
      <IressRadio value="newspaper" key="google" className={styles.addBorder}>
        Newspaper
      </IressRadio>,
      <IressRadio value="friend" key="google" className={styles.addBorder}>
        Friend
      </IressRadio>,
      <IressRadio value="other" key="google" className={styles.addBorder}>
        Other
      </IressRadio>,
    ],
  },
  argTypes: {
    ...disableArgTypes(['layout']),
  },
  render: (args) => (
    <IressText className="iress-u-stack iress--gutter--lg">
      {RADIO_GROUP_LAYOUTS.map((layout) => (
        <div key={layout}>
          <h3>{layout}</h3>
          <IressRadioGroup {...args} layout={layout} />
        </div>
      ))}
    </IressText>
  ),
};

export const HiddenRadioButtons: Story = {
  args: {
    hiddenRadio: true,
    defaultValue: 'home',
    required: true,
    layout: 'inline',
    children: getFinancialReviewChildren(),
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
    hiddenRadio: true,
    name: 'financial-review',
    required: true,
    layout: 'block',
    children: getFinancialReviewManyChildren(),
  },
  render: ({ children, ...args }) => (
    <IressField
      label="I'd like to discuss the following in my financial review:"
      hint="Select one option"
    >
      <IressRadioGroup
        {...args}
        style={
          {
            '--iress-margin-bottom': 0,
            '--iress-inline-spacing-x': 0,
          } as never
        }
      >
        <div
          className={styles.resizable}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gridAutoRows: '1fr',
            gridGap: 'var(--iress-g-spacing-sm, 0.75rem)',
            width: '100%',
            padding: '0.5rem',
          }}
        >
          {children}
        </div>
      </IressRadioGroup>
    </IressField>
  ),
};

export const Readonly: Story = {
  ...RadioSelection,
  args: {
    ...RadioSelection.args,
    readonly: true,
  },
};

export const Touch: Story = {
  ...RadioSelection,
  args: {
    ...RadioSelection.args,
    touch: true,
  },
};
