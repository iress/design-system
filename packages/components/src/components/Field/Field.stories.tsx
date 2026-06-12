import { type StoryObj, type Meta } from '@storybook/react-vite';

import { IressInput, type IressInputProps } from '../Input';
import { IressField } from './Field';
import { IressIcon } from '../Icon';
import { IressReadonly } from '../Readonly';
import { IressText } from '../Text';
import { IressStack } from '../Stack';
import { type ComponentProps } from 'react';
import {
  disableArgTypes,
  STORYBOOK_ONLY_CATEGORY,
  withJsxTransformer,
  withSource,
  reactNodeArgType,
  stylingProps,
} from '@iress-oss/ids-storybook-config';
import componentMeta from './meta';
import { FieldSupplementary } from './mocks/FieldSupplementary';
import FieldSupplementarySource from './mocks/FieldSupplementary.tsx?raw';
import { FieldRemoveErrorMargin } from './mocks/FieldRemoveErrorMargin';
import FieldRemoveErrorMarginSource from './mocks/FieldRemoveErrorMargin.tsx?raw';

type IressFieldPropsAndCustomArgs = ComponentProps<typeof IressField> & {
  input: Omit<IressInputProps, 'onChange'>;
};

type Story = StoryObj<IressFieldPropsAndCustomArgs>;

const defaultInput = {
  id: 'name',
  name: 'input1',
  required: true,
  type: 'text',
};

export default {
  title: 'Components/Field',
  component: IressField,
  argTypes: {
    ...disableArgTypes(['children']),
    error: reactNodeArgType,
    hint: reactNodeArgType,
    supplementary: reactNodeArgType,
    ...stylingProps,
    input: {
      name: 'Input settings',
      type: 'array',
      table: {
        category: STORYBOOK_ONLY_CATEGORY,
      },
      defaultValue: defaultInput,
    },
  },
  tags: ['updated'],
  parameters: {
    idsConfig: {
      testMeta: componentMeta.testMeta,
    },
    docs: {
      description: {
        component: componentMeta.description,
      },
    },
  },
} as Meta<typeof IressField>;

export const Default: Story = {
  args: {
    label: 'First name',
    input: defaultInput,
  },
  render: ({ input, ...args }) => (
    <IressField {...args}>
      <IressInput {...input} />
    </IressField>
  ),
};

export const Label: Story = {
  ...Default,
  args: {
    ...Default.args,
    label: (
      <>
        <IressIcon name="home" /> Find your address
      </>
    ),
  },
  argTypes: {
    ...disableArgTypes(['label']),
  },
};

export const Hint: Story = {
  ...Default,
  args: {
    ...Default.args,
    hint: 'For us to be able to contact you in the future',
    label: 'Email address',
    input: {
      id: 'email',
      name: 'email',
      required: true,
      type: 'email',
    },
  },
};

export const ErrorMessage: Story = {
  ...Default,
  args: {
    ...Default.args,
    label: 'Error message',
    errorMessages: [
      {
        message: 'This field is required',
      },
    ],
    input: {
      id: 'name',
      name: 'name',
      required: true,
      actions: [
        {
          icon: 'visibility',
          children: 'Show',
        },
      ],
    },
  },
};

export const CustomError: Story = {
  ...Default,
  args: {
    ...Default.args,
    label: 'Custom error',
    error: (
      <IressText element="small" color="colour.system.danger.text">
        This is a custom error message
      </IressText>
    ),
    input: {
      id: 'name',
      name: 'name',
      required: true,
    },
  },
};

export const HiddenLabel = {
  ...Default,
  args: {
    ...Default.args,
    label: 'This label is hidden',
    hint: 'This hint text is hidden',
    hiddenLabel: true,
  },
};

export const HiddenLabelWithError = {
  ...Default,
  args: {
    ...Default.args,
    label: 'This label is hidden',
    hint: 'This hint text is hidden',
    error: (
      <IressText element="small" color="colour.system.danger.text">
        Even fields with hidden labels will show their validation message
      </IressText>
    ),
    hiddenLabel: true,
  },
};

export const Required = {
  ...Default,
  args: {
    ...Default.args,
    label: 'This field is required',
    required: true,
  },
};

export const ReadonlyData: Story = {
  args: {
    label: 'First name',
    hint: 'This field is readonly',
    input: {
      ...defaultInput,
      value: 'Luke Skywalker',
    },
    readOnly: true,
    required: true,
  },
  render: ({ input: { variant: _variant, ...input }, ...args }) => (
    <IressField {...args}>
      <IressReadonly {...input} />
    </IressField>
  ),
};

export const LockedReadonlyData: Story = {
  args: {
    label: 'First name',
    hint: 'This field is locked',
    input: {
      ...defaultInput,
      value: 'Luke Skywalker',
      readOnly: 'locked',
    },
    readOnly: 'locked',
    required: true,
  },
  render: ({ input: { variant: _variant, ...input }, ...args }) => (
    <IressField {...args}>
      <IressInput {...input} />
    </IressField>
  ),
};

export const Supplementary: Story = {
  ...Default,
  args: {
    ...Default.args,
    supplementary: 'I only show if there is no error',
  },
  argTypes: {
    ...disableArgTypes(['error', 'errorMessages']),
  },
  render: (args) => <FieldSupplementary {...args} />,
  parameters: {
    controls: { disable: true },
    ...withSource(FieldSupplementarySource, { stripImports: true }),
  },
};

export const Horizontal: Story = {
  ...Default,
  args: {
    ...Default.args,
    horizontal: true,
    labelWidth: '250px',
    label: 'Email address',
    hint: 'Enter your email address for contact',
    input: {
      id: 'email',
      name: 'email',
      required: true,
      type: 'email',
      placeholder: 'john.doe@example.com',
    },
    supplementary:
      'We will not share your email with third parties (Supplementary text)',
  },
};

export const HorizontalWithError: Story = {
  ...Default,
  args: {
    ...Default.args,
    horizontal: true,
    labelWidth: '250px',
    label: 'Email address',
    hint: 'Enter your email address for contact',
    errorMessages: [
      {
        message: 'Please enter a valid email address',
      },
    ],
    input: {
      id: 'email',
      name: 'email',
      required: true,
      type: 'email',
      placeholder: 'john.doe@example.com',
    },
    supplementary:
      'We will not share your email with third parties (Supplementary text)',
  },
};

export const HorizontalLabelWidthExamples: Story = {
  ...Default,
  args: {
    ...Default.args,
    horizontal: true,
    label: 'Label Width',
  },
  render: ({ input, ...args }) => (
    <IressStack gap="spacing.5">
      <IressField {...args} labelWidth="100px" label="labelWidth: 100px">
        <IressInput {...input} placeholder="Label width: 100px" />
      </IressField>
      <IressField {...args} labelWidth="200px" label="labelWidth: 200px">
        <IressInput {...input} placeholder="Label width: 200px" />
      </IressField>
      <IressField {...args} labelWidth="25%" label="labelWidth: 25%">
        <IressInput {...input} placeholder="Label width: 25%" />
      </IressField>
      <IressField {...args} labelWidth="auto" label="labelWidth: auto">
        <IressInput {...input} placeholder="Label width: auto" />
      </IressField>
      <IressField {...args} label="Default (no labelWidth)">
        <IressInput {...input} placeholder="Default horizontal layout" />
      </IressField>
    </IressStack>
  ),
  parameters: {
    ...withJsxTransformer({
      showFunctions: true,
    }),
  },
};

export const RemoveErrorMargin: Story = {
  ...Default,
  args: {
    ...Default.args,
    label: 'Field Label',
  },
  render: (args) => <FieldRemoveErrorMargin {...args} />,
  parameters: {
    controls: { disable: true },
    ...withSource(FieldRemoveErrorMarginSource, { stripImports: true }),
  },
};
