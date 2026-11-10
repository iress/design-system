import { type Meta, type StoryObj } from '@storybook/react-vite';
import { IressCheckboxGroup } from '.';
import { CheckboxGroupUsingState } from './mocks/CheckboxGroupUsingState';
import CheckboxGroupUsingStateSource from './mocks/CheckboxGroupUsingState.tsx?raw';
import { CheckboxGroupLayout } from './mocks/CheckboxGroupLayout';
import CheckboxGroupLayoutSource from './mocks/CheckboxGroupLayout.tsx?raw';
import { CheckboxGroupTable } from './mocks/CheckboxGroupTable';
import CheckboxGroupTableSource from './mocks/CheckboxGroupTable.tsx?raw';
import { IressField } from '../Field';
import {
  getFinancialReviewCheckboxes,
  getFinancialReviewManyCheckboxes,
} from './mocks/checkboxGroupChildren';
import { IressCheckbox } from '../Checkbox/Checkbox';
import {
  componentStoryMeta,
  disableArgTypes,
  withSource,
  reactNodeArgType,
} from '@iress-oss/ids-storybook-config';
import componentMeta from './meta';

type Story = StoryObj<typeof IressCheckboxGroup>;

export default {
  title: 'Components/CheckboxGroup',
  component: IressCheckboxGroup,
  ...componentStoryMeta(componentMeta, {
    argTypes: {
      children: reactNodeArgType,
    },
  }),
} as Meta<typeof IressCheckboxGroup>;

export const Default: Story = {
  args: {
    name: 'preferences',
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
    defaultValue: ['lemon-drizzle', 'victoria-sponge'],
  },
};

export const Controlled: Story = {
  render: (args) => <CheckboxGroupUsingState {...args} />,
  parameters: {
    controls: { disable: true },
    ...withSource(CheckboxGroupUsingStateSource, { stripImports: true }),
  },
};

export const Layout: Story = {
  render: (args) => <CheckboxGroupLayout {...args} />,
  parameters: {
    controls: { disable: true },
    ...withSource(CheckboxGroupLayoutSource, {
      stripImports: true,
      stripExportFunction: true,
    }),
  },
};

export const HiddenCheckboxes: Story = {
  args: {
    defaultValue: ['home'],
    variant: 'card',
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
    variant: 'card',
    name: 'financial-review',
    layout: 'block',
    children: getFinancialReviewManyCheckboxes(),
  },
  render: ({ children, ...args }) => (
    <IressField
      label="I'd like to discuss the following with my financial adviser:"
      hint="Select all that apply"
    >
      <IressCheckboxGroup {...args}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gridAutoRows: '1fr',
            gridGap: '16px',
            width: '100%',
            padding: '0.5rem',
            border: '1px dashed hsl(43deg 100% 45%)',
            resize: 'horizontal',
            overflow: 'auto',
          }}
        >
          {children}
        </div>
      </IressCheckboxGroup>
    </IressField>
  ),
};

export const ReadOnly: Story = {
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
    defaultValue: ['lemon-drizzle', 'victoria-sponge'],
    readOnly: true,
  },
};

export const Touch: Story = {
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
    defaultValue: ['lemon-drizzle', 'victoria-sponge'],
    variant: 'touch',
  },
};

export const Table: Story = {
  tags: ['recipe'],
  argTypes: {
    ...disableArgTypes(['children', 'layout', 'name', 'onChange', 'value']),
  },
  render: (args) => <CheckboxGroupTable {...args} />,
  parameters: {
    controls: { disable: true },
    ...withSource(CheckboxGroupTableSource, {
      stripImports: true,
      stripExportFunction: true,
    }),
  },
};
