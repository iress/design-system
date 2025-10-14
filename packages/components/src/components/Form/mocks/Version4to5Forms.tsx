import { DiffViewer } from '@iress-storybook/components';

export const StateManagementV4ToV5 = () => (
  <DiffViewer
    allowModeChange
    oldValue={`import { IressForm, IressField, IressInput, IressCheckboxGroup, IressCheckbox } from '@iress/components';

export const App = () => {
  // We need to create our own state to manage the visibility of the fields, 
  // which means we have two sources of truth potentially making our code harder to maintain
  const [show, setShow] = useState(['name']);

  return (
      <IressForm>
        <IressField label="Show fields">
          <IressCheckboxGroup value={show} onChange={(newValues) => setShow(newValues)}>
            <IressCheckbox value="name">Name</IressCheckbox>
            <IressCheckbox value="email">Email</IressCheckbox>
          </IressCheckboxGroup>
        </IressField>
        {show.includes('name') && (
          <IressField label="Name">
            <IressInput name="name" />
          </IressField>
        )}
        {show.includes('email') && (
          <IressField label="Email">
            <IressInput name="email" type="email" />
          </IressField>
        )}
      </IressForm>
  );
};`}
    newValue={`import { IressForm, IressFormField, IressInput, IressCheckboxGroup, IressCheckbox } from '@iress-oss/ids-components';

const ConditionalFields = () => {
  // Instead of creating our own state, we can now use the form state via the useWatch hook, 
  // meaning we still have a single source of truth
  const show = IressForm.useWatch({ name: 'show'});

  return (
    <>
      <IressFormField 
        label="Show fields" 
        name="show"
        render={(controlledProps) => (
          <IressCheckboxGroup {...controlledProps}>
            <IressCheckbox value="name">Name</IressCheckbox>
            <IressCheckbox value="email">Email</IressCheckbox>
          </IressCheckboxGroup>
        )}
      />
      {show?.includes('name') && (
        <IressFormField 
          label="Name" 
          name="name"
          render={(controlledProps) => <IressInput {...controlledProps} />}
        />
      )}
      {show?.includes('email') && (
        <IressFormField 
          label="Email" 
          name="email"
          render={(controlledProps) => <IressInput {...controlledProps} type="email" />}
        />
      )}
     </>
  );
};

export const App = () => (
  <IressForm defaultValues={{ show: ['name'] }}>
    <ConditionalFields /> 
  </IressForm>
);`}
  />
);

export const ValidationV4ToV5 = () => (
  <DiffViewer
    allowModeChange
    oldValue={`import { IressForm, IressField, IressInput, IressButton } from '@iress/components';

export const App = () => (
  <IressForm valueMissing="{{fieldName}} needs to be filled in!">
    <IressField label="Name">
      <IressInput name="name" required />
    </IressField>
    <IressField label="Email">
      <IressInput name="email" maxLength={10} />
    </IressField>
    <IressButton type="submit" mode="primary">
      Sign up
    </IressButton>
  </IressForm>
);`}
    newValue={`import { IressForm, IressFormField, IressInput, IressButton } from '@iress-oss/ids-components';

export const App = () => (
  <IressForm>
    <IressFormField 
      label="Name"
      name="name"
      render={(controlledProps) => <IressInput {...controlledProps} />}
      rules={{ required: 'Name needs to be filled in!' }}
    />
    <IressFormField 
      label="Email"
      name="email"
      render={(controlledProps) => <IressInput {...controlledProps} type="email" maxLength={10} />}
      rules={{ maxLength: 10 }}
    />
    <IressButton type="submit" mode="primary">
      Sign up
    </IressButton>
  </IressForm>
);`}
  />
);
