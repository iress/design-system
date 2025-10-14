import {
  IressFormField,
  IressInput,
  IressSelect,
  IressRichSelect,
  IressIcon,
  IressCheckboxGroup,
  IressCheckbox,
  IressRadioGroup,
  IressRadio,
  IressAutocomplete,
  IressSlider,
  IressFormFieldset,
  IressTagInput,
} from '@/main';
import { searchStarWarsCharacters } from '@/mocks/starWars';
import { withJsxTransformer } from '@iress-storybook/helpers';

export const SUPPORTED_FORM_FIELDS = {
  IressInput: {
    formField: (
      <IressFormField
        key="IressInput"
        name="name"
        label="Name"
        rules={{ required: true }}
        render={(controlledProps) => (
          <IressInput {...controlledProps} data-component="IressInput" />
        )}
      />
    ),
    renderSnippet: `(controlledProps) => <IressInput {...controlledProps} />`,
  },
  IressInputDate: {
    formField: (
      <IressFormField
        key="IressInputDate"
        name="date"
        label="Date"
        rules={{ required: true }}
        render={(controlledProps) => (
          <IressInput
            {...controlledProps}
            type="date"
            data-component="IressInput"
          />
        )}
      />
    ),
    renderSnippet: `(controlledProps) => <IressInput {...controlledProps} type="date" />`,
  },
  IressSelect: {
    formField: (
      <IressFormField
        key="IressSelect"
        name="gender"
        label="Gender"
        rules={{ required: true }}
        render={(controlledProps) => (
          <IressSelect
            {...controlledProps}
            placeholder="Select"
            data-component="IressSelect"
          >
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </IressSelect>
        )}
      />
    ),
    renderSnippet: `(controlledProps) => (
          <IressSelect {...controlledProps} placeholder="Select">
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </IressSelect>
        )`,
  },
  IressRichSelect: {
    formField: (
      <IressFormField
        key="IressRichSelect"
        name="gender-with-icons"
        label="Gender with icons"
        rules={{
          required: true,
        }}
        render={(controlledProps) => (
          <IressRichSelect
            {...controlledProps}
            data-component="IressRichSelect"
            options={[
              {
                label: 'Male',
                value: 'male',
                prepend: <IressIcon name="mars" />,
              },
              {
                label: 'Female',
                value: 'female',
                prepend: <IressIcon name="venus" />,
              },
              {
                label: 'Other',
                value: 'other',
                prepend: <IressIcon name="otter" />,
              },
            ]}
          />
        )}
      />
    ),
    renderSnippet: `(controlledProps) => (
      <IressRichSelect
        {...controlledProps}
        options={[
          {
            label: 'Male',
            value: 'male',
            prepend: <IressIcon name="mars" />,
          },
          {
            label: 'Female',
            value: 'female',
            prepend: <IressIcon name="venus" />,
          },
          {
            label: 'Other',
            value: 'other',
            prepend: <IressIcon name="otter" />,
          },
        ]} />
      )`,
  },
  IressCheckboxGroup: {
    formField: (
      <IressFormFieldset
        key="IressCheckboxGroup"
        name="hobbies"
        label="Hobbies"
        rules={{
          required: 'Select at least one hobby',
        }}
        render={(controlledProps) => (
          <IressCheckboxGroup
            {...controlledProps}
            data-component="IressCheckboxGroup"
          >
            <IressCheckbox value="reading">Reading</IressCheckbox>
            <IressCheckbox value="writing">Writing</IressCheckbox>
          </IressCheckboxGroup>
        )}
      />
    ),
    renderSnippet: `(controlledProps) => (
      <IressCheckboxGroup {...controlledProps}>
        <IressCheckbox value="reading">Reading</IressCheckbox>
        <IressCheckbox value="writing">Writing</IressCheckbox>
      </IressCheckboxGroup>
    )`,
  },
  IressRadioGroup: {
    formField: (
      <IressFormFieldset
        key="IressRadioGroup"
        name="food"
        label="Food of preference"
        rules={{
          required: 'Select at least one food of preference',
        }}
        render={(controlledProps) => (
          <IressRadioGroup
            {...controlledProps}
            data-component="IressRadioGroup"
          >
            <IressRadio value="steak">Steak</IressRadio>
            <IressRadio value="fish">Fish</IressRadio>
            <IressRadio value="salad">Salad</IressRadio>
          </IressRadioGroup>
        )}
      />
    ),
    renderSnippet: `(controlledProps) => (
      <IressRadioGroup {...controlledProps}>
        <IressRadio value="steak">Steak</IressRadio>
        <IressRadio value="fish">Fish</IressRadio>
        <IressRadio value="salad">Salad</IressRadio>
      </IressRadioGroup>
    )`,
  },
  IressCheckbox: {
    formField: (
      <IressFormField<{ terms: boolean }>
        key="IressCheckbox"
        name="terms"
        label="Terms and privacy policy"
        rules={{
          required:
            'You need to agree to the terms and conditions before proceeding',
        }}
        render={(controlledProps) => (
          <IressCheckbox {...controlledProps} data-component="IressCheckbox">
            I agree to the terms and conditions
          </IressCheckbox>
        )}
      />
    ),
    renderSnippet: `({ value, ...controlledProps }) => (
      <IressCheckbox {...controlledProps}>I agree to the terms and conditions</IressCheckbox>
    )`,
  },
  IressAutocomplete: {
    formField: (
      <IressFormField
        key="IressAutocomplete"
        name="star_wars_name"
        label="Your star wars name"
        hint="Type to copy an existing character's name"
        rules={{
          required: true,
        }}
        render={(controlledProps) => (
          <IressAutocomplete
            {...controlledProps}
            data-component="IressAutocomplete"
            options={searchStarWarsCharacters}
          />
        )}
      />
    ),
    renderSnippet: `(controlledProps) => (
      <IressAutocomplete
        {...controlledProps}
        options={searchStarWarsCharacters}
      />
    )`,
  },
  IressSlider: {
    formField: (
      <IressFormField
        key="IressSlider"
        name="pain_level"
        label="What's your pain level?"
        rules={{
          required: true,
        }}
        render={(controlledProps) => (
          <IressSlider {...controlledProps} data-component="IressSlider" />
        )}
      />
    ),
    renderSnippet: `(controlledProps) => <IressSlider {...controlledProps} />`,
  },
  IressTagInput: {
    formField: (
      <IressFormField
        key="IressTagInput"
        name="email_domains"
        label="Favourite email domains"
        rules={{
          required: true,
        }}
        render={(controlledProps) => (
          <IressTagInput {...controlledProps} data-component="IressTagInput" />
        )}
      />
    ),
    renderSnippet: `(controlledProps) => <IressTagInput {...controlledProps} />`,
  },
};

export const SUPPORTED_CONTROLS = Object.keys(SUPPORTED_FORM_FIELDS);
export type SupportedControls = keyof typeof SUPPORTED_FORM_FIELDS;

export const withRenderSnippet = () =>
  withJsxTransformer({
    functionValue: (functionString: string) => {
      // Extract the component name from the jsxDEV function if available
      // In production builds, use the data-component attribute instead
      const displayName =
        /jsxDEV\(([^,]+)/.exec(functionString)?.[1].trim() ??
        /"data-component":"([^"]+)"/.exec(functionString)?.[1].trim();

      return displayName
        ? SUPPORTED_FORM_FIELDS[displayName as SupportedControls].renderSnippet
        : functionString;
    },
    showFunctions: true,
  });
