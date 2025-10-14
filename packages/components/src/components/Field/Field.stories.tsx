import { StoryObj, Meta } from '@storybook/react-vite';

import { disableArgTypes, withJsxTransformer } from '@iress-storybook/helpers';
import { IressInput, IressInputProps } from '../Input';
import { IressField } from './Field';
import { IressIcon } from '../Icon';
import { IressButton } from '../Button';
import { STORYBOOK_ONLY_CATEGORY } from '@iress-storybook/constants';
import { IressReadonly } from '../Readonly';
import { IressText } from '../Text';
import { IressStack } from '../Stack';
import { IressInline } from '../Inline';
import { IressRow } from '../Row';
import { IressCol } from '../Col';
import { ComponentProps, useState } from 'react';
import { IressToggle } from '../Toggle';

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
      <span>
        <IressIcon name="home" /> Find your address
      </span>
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
      append: (
        <IressButton
          data-testid="show-password-icon"
          mode="tertiary"
          prepend={<IressIcon name="eye" screenreaderText="Show" />}
        ></IressButton>
      ),
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
  render: ({ input, ...args }) => (
    <IressField {...args}>
      <IressReadonly {...input} />
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
  render: ({ input, ...args }) => {
    const [error, setError] = useState<string | undefined>();

    return (
      <IressStack gap="spacing.500">
        <IressToggle
          onChange={(checked) =>
            setError(checked ? 'This field is required' : undefined)
          }
          checked={error !== undefined}
        >
          Show error
        </IressToggle>
        <IressField {...args} error={error}>
          <IressInput {...input} />
        </IressField>
      </IressStack>
    );
  },
  parameters: {
    ...withJsxTransformer({
      showFunctions: true,
    }),
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
    <IressStack gap="spacing.500">
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
  render: ({ input, ...args }) => {
    const [removeErrorMargin, setRemoveErrorMargin] = useState(false);
    const [showError, setShowError] = useState(false);

    const fieldProps = {
      removeErrorMargin,
      ...(showError
        ? {
            errorMessages: [
              {
                message: 'This field is required',
              },
            ],
          }
        : {}),
    };

    const fieldPropsWithContent = {
      removeErrorMargin,
      ...(showError
        ? {
            errorMessages: [
              {
                message: 'This field is required',
              },
            ],
          }
        : {
            supplementary: 'This is always-displayed supplementary text',
          }),
    };

    return (
      <IressStack gap="spacing.500">
        <IressInline gap="spacing.400">
          <IressToggle
            onChange={(checked) => setRemoveErrorMargin(checked)}
            checked={removeErrorMargin}
          >
            Remove error margin (tighter field spacing)
          </IressToggle>

          <IressToggle
            onChange={(checked) => setShowError(checked)}
            checked={showError}
          >
            Show error message
          </IressToggle>
        </IressInline>

        <IressRow gutter="spacing.600">
          {/* Vertical Layout Column */}
          <IressCol span="6">
            <IressStack gap="spacing.200">
              <IressText element="h3" textStyle="typography.body.lg.strong">
                Vertical Label Layout
              </IressText>
              <IressStack gap="spacing.000">
                <IressField {...args} {...fieldProps} label="First Name">
                  <IressInput {...input} placeholder="Enter first name" />
                </IressField>
                <IressField
                  {...args}
                  {...fieldPropsWithContent}
                  label="Last Name"
                >
                  <IressInput {...input} placeholder="Enter last name" />
                </IressField>
                <IressField {...args} {...fieldProps} label="Email Address">
                  <IressInput
                    {...input}
                    type="email"
                    placeholder="Enter email"
                  />
                </IressField>
              </IressStack>
            </IressStack>
          </IressCol>

          {/* Horizontal Layout Column */}
          <IressCol span="6">
            <IressStack gap="spacing.200">
              <IressText element="h3" textStyle="typography.body.lg.strong">
                Horizontal Label Layout
              </IressText>
              <IressStack gap="spacing.000">
                <IressField
                  {...args}
                  {...fieldProps}
                  horizontal
                  labelWidth="120px"
                  label="First Name"
                >
                  <IressInput {...input} placeholder="Enter first name" />
                </IressField>
                <IressField
                  {...args}
                  {...fieldPropsWithContent}
                  horizontal
                  labelWidth="120px"
                  label="Last Name"
                >
                  <IressInput {...input} placeholder="Enter last name" />
                </IressField>
                <IressField
                  {...args}
                  {...fieldProps}
                  horizontal
                  labelWidth="120px"
                  label="Email Address"
                >
                  <IressInput
                    {...input}
                    type="email"
                    placeholder="Enter email"
                  />
                </IressField>
              </IressStack>
            </IressStack>
          </IressCol>
        </IressRow>
      </IressStack>
    );
  },
  parameters: {
    ...withJsxTransformer({
      showFunctions: true,
    }),
  },
};
