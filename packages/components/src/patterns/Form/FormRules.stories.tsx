import { type Meta, type StoryObj } from '@storybook/react-vite';
import { IressForm } from './Form';
import { cloneElement } from 'react';
import {
  IressButton,
  type IressFieldProps,
  type IressFormFieldProps,
} from '@/main';
import {
  SUPPORTED_CONTROLS,
  SUPPORTED_FORM_FIELDS,
  type SupportedControls,
  withRenderSnippet,
} from './mocks/supportedFormFields';
import { type FieldValues } from 'react-hook-form';
import { type ShortFormProps } from './components/ShortForm';
import {
  disableArgTypes,
  STORYBOOK_ONLY_CATEGORY,
} from '@iress-oss/ids-storybook-config';
import { formParameters } from './mocks/storybookFormHelpers';

type FormPropsAndCustomArgs = ShortFormProps<FieldValues> & {
  element: SupportedControls;
  field?: Pick<IressFieldProps, 'hint'>;
  rules: IressFormFieldProps['rules'];
  customRules: IressFormFieldProps['rules'];
};
type Story = StoryObj<FormPropsAndCustomArgs>;

export default {
  title: 'Patterns/Form/Rules',
  component: IressForm,
  args: {
    field: {
      hint: '',
    },
  },
  argTypes: {
    ...disableArgTypes(['children']),
    element: {
      description: 'The  element to render',
      control: {
        type: 'select',
      },
      options: SUPPORTED_CONTROLS,
      table: {
        category: STORYBOOK_ONLY_CATEGORY,
      },
    },
    field: {
      description: 'Props for the field element',
      control: {
        type: 'object',
      },
      table: {
        category: STORYBOOK_ONLY_CATEGORY,
      },
    },
    rules: {
      description: 'The rules to use',
      control: {
        type: 'object',
      },
      table: {
        category: STORYBOOK_ONLY_CATEGORY,
      },
    },
    customRules: {
      description: 'The rules to use when display custom messages',
      control: {
        type: 'object',
      },
      table: {
        category: STORYBOOK_ONLY_CATEGORY,
      },
    },
  },
  parameters: {
    ...formParameters,
  },
} as Meta<typeof IressForm>;

const Default: Story = {
  render: ({ element, field, rules, customRules, ...restProps }) => {
    const selectedElement = SUPPORTED_FORM_FIELDS[element].formField;

    return (
      <IressForm {...restProps}>
        {selectedElement &&
          cloneElement(selectedElement, {
            ...field,
            key: 'default',
            label: 'Default message',
            name: `${element}-default`,
            rules: rules,
          })}
        {selectedElement &&
          cloneElement(selectedElement, {
            ...field,
            key: 'custom',
            label: 'Custom message',
            name: `${element}-custom`,
            rules: customRules,
          })}
        <IressButton type="submit" mode="primary">
          Validate
        </IressButton>
      </IressForm>
    );
  },
  parameters: {
    ...withRenderSnippet(),
  },
};

export const Required: Story = {
  ...Default,
  args: {
    element: 'IressInput',
    rules: {
      required: true,
    },
    customRules: {
      required: 'Please check this field',
    },
  },
};

export const MaxLength: Story = {
  ...Default,
  args: {
    element: 'IressInput',
    field: {
      hint: 'Enter a maximum length of 5 characters',
    },
    rules: {
      maxLength: 5,
    },
    customRules: {
      maxLength: {
        value: 5,
        message: 'Please enter a max length of 5 characters!',
      },
    },
  },
};

export const MinLength: Story = {
  ...Default,
  args: {
    element: 'IressInput',
    field: {
      hint: 'Enter a minimum length of 7 characters',
    },
    rules: {
      minLength: 7,
    },
    customRules: {
      minLength: {
        value: 7,
        message: 'Please enter a min length of 7 characters!',
      },
    },
  },
};

export const Max: Story = {
  ...Default,
  args: {
    element: 'IressInput',
    field: {
      hint: 'Select a maximum of 2',
    },
    rules: {
      max: 2,
    },
    customRules: {
      max: {
        value: 2,
        message: 'Please enter a max of 2!',
      },
    },
  },
};

export const Min: Story = {
  ...Default,
  args: {
    element: 'IressInput',
    field: {
      hint: 'Select a minimum of 20',
    },
    rules: {
      min: 20,
    },
    customRules: {
      min: {
        value: 20,
        message: 'Please enter a min of 20!',
      },
    },
  },
};

export const Pattern: Story = {
  ...Default,
  args: {
    element: 'IressInput',
    field: {
      hint: 'Enter a valid email address',
    },
    rules: {
      pattern:
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
    },
    customRules: {
      pattern: {
        value:
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
        message: 'Please enter a valid email address!',
      },
    },
  },
};

export const MinDate: Story = {
  ...Default,
  args: {
    element: 'IressInputDate',
    field: {
      hint: 'Enter a date after today',
    },
    rules: {
      minDate: new Date(),
    },
    customRules: {
      minDate: {
        value: new Date(),
        message: 'Please enter a date after today!',
      },
    },
  },
};

export const MaxDate: Story = {
  ...Default,
  args: {
    element: 'IressInputDate',
    field: {
      hint: 'Enter a date before today',
    },
    rules: {
      maxDate: new Date(),
    },
    customRules: {
      maxDate: {
        value: new Date(),
        message: 'Please enter a date before today!',
      },
    },
  },
};

export const Email: Story = {
  ...Default,
  args: {
    element: 'IressInput',
    field: {
      hint: 'Enter an email address',
    },
    rules: {
      email: true,
    },
    customRules: {
      email: 'Please enter a valid email address!',
    },
  },
};

export const Validate: Story = {
  ...Default,
  args: {
    element: 'IressCheckboxGroup',
    field: {
      hint: 'If checkbox, click two items to pass. Anything else, make sure it is Google.',
    },
    rules: {
      validate: {
        atLeastTwoItems: (value: string[]) =>
          Array.isArray(value) ? value.length >= 2 : true,
        isGoogle: (value) => (Array.isArray(value) ? true : value === 'Google'),
      },
    },
    customRules: {
      validate: {
        atLeastTwoItems: (value: string[]) =>
          (Array.isArray(value) ? value.length >= 2 : true) ||
          'Please select at least two items!',
        isGoogle: (value) =>
          (Array.isArray(value) ? true : value === 'Google') ||
          'I guess you are not evil!',
      },
    },
  },
};
