import { type Meta, type StoryObj } from '@storybook/react';
import { CHECKBOX_GROUP_LAYOUTS, IressCheckboxGroup } from '.';
import { CheckboxGroupUsingState } from './mocks/CheckboxGroupUsingState';
import CheckboxGroupUsingStateSource from './mocks/CheckboxGroupUsingState.tsx?raw';
import { IressText } from '../Text';
import styles from '~storybook/styles.module.scss';
import { IressField } from '../Field';
import {
  getFinancialReviewCheckboxes,
  getFinancialReviewManyCheckboxes,
} from './mocks/checkboxGroupChildren';
import { IressCheckbox } from '../Checkbox/Checkbox';
import {
  disableArgTypes,
  withTransformedRawSource,
} from '@iress-oss/ids-storybook-config';

type Story = StoryObj<typeof IressCheckboxGroup>;

export default {
  title: 'Components/CheckboxGroup',
  component: IressCheckboxGroup,
  argTypes: {
    ...disableArgTypes(['children']),
  },
} as Meta<typeof IressCheckboxGroup>;

export const CheckboxChildren: Story = {
  args: {
    name: 'let-them-eat-cake',
    children: [
      <IressCheckbox key={1} value="lemon-drizzle">
        Lemon drizzle
      </IressCheckbox>,
      <IressCheckbox key={2} value="victoria-sponge">
        Victoria Sponge
      </IressCheckbox>,
      <IressCheckbox key={3} value="carrot-cake">
        Carrot Cake
      </IressCheckbox>,
    ],
  },
};

export const DefaultChecked: Story = {
  args: {
    ...CheckboxChildren.args,
    defaultValue: ['lemon-drizzle', 'victoria-sponge'],
  },
};

export const Controlled: Story = {
  args: {
    ...CheckboxChildren.args,
  },
  argTypes: {
    ...disableArgTypes(['children', 'value']),
  },
  render: (args) => <CheckboxGroupUsingState {...args} />,
  parameters: {
    ...withTransformedRawSource(
      CheckboxGroupUsingStateSource,
      'IressCheckboxGroupProps',
      ['children'],
    ),
  },
};

export const Layout: Story = {
  args: {
    children: [
      <IressCheckbox
        value="google"
        key="google"
        className={styles.addBorderToLabel}
      >
        Google
      </IressCheckbox>,
      <IressCheckbox
        value="newspaper"
        key="newspaper"
        className={styles.addBorderToLabel}
      >
        Newspaper
      </IressCheckbox>,
      <IressCheckbox
        value="friend"
        key="friend"
        className={styles.addBorderToLabel}
      >
        Friend
      </IressCheckbox>,
      <IressCheckbox
        value="other"
        key="other"
        className={styles.addBorderToLabel}
      >
        Other
      </IressCheckbox>,
    ],
  },
  argTypes: {
    ...disableArgTypes(['layout']),
  },
  render: (args) => (
    <IressText className="iress-u-stack iress--gutter--lg">
      {CHECKBOX_GROUP_LAYOUTS.map((layout) => (
        <div key={layout}>
          <h3>{layout}</h3>
          <IressCheckboxGroup {...args} layout={layout} />
        </div>
      ))}
    </IressText>
  ),
};

export const HiddenCheckboxes: Story = {
  args: {
    defaultValue: ['home'],
    hiddenCheckbox: true,
    name: 'financial-review',
    layout: 'inline',
    children: getFinancialReviewCheckboxes(),
  },
  render: ({ children, ...args }) => (
    <IressField
      label="I'd like to discuss the following with my financial adviser:"
      hint="Select all that apply"
    >
      <IressCheckboxGroup {...args}>{children}</IressCheckboxGroup>
    </IressField>
  ),
};

export const CustomCheckboxGroupLayout: Story = {
  args: {
    defaultValue: ['home'],
    hiddenCheckbox: true,
    name: 'financial-review',
    layout: 'block',
    children: getFinancialReviewManyCheckboxes(),
  },
  render: ({ children, ...args }) => (
    <IressField
      label="I'd like to discuss the following with my financial adviser:"
      hint="Select all that apply"
    >
      <IressCheckboxGroup
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
      </IressCheckboxGroup>
    </IressField>
  ),
};

export const Readonly: Story = {
  ...DefaultChecked,
  args: {
    ...DefaultChecked.args,
    readonly: true,
  },
};

export const Touch: Story = {
  ...DefaultChecked,
  args: {
    ...DefaultChecked.args,
    touch: true,
  },
};
