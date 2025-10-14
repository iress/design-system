import {
  IressButton,
  IressDivider,
  IressFieldGroup,
  IressFormField,
  IressInline,
  IressInput,
  IressPanel,
  IressStack,
  IressText,
  IressIcon,
  IressCloseButton,
  IressHookForm,
} from '@/main';
import { Control, UseFormGetValues } from 'react-hook-form';

interface Client {
  name: string | undefined;
  salary: number | undefined;
  goal: string | undefined;
}

interface Dependant {
  name: string | undefined;
  relationship: string | undefined;
  age: number | undefined;
}

interface FormValues {
  client: Client;
  dependants: Dependant[];
}

interface ClientProps {
  control: Control<FormValues> | undefined;
}

interface DependantProps {
  index: number;
  control: Control<FormValues> | undefined;
  update: (index: number, data: Dependant) => void;
  remove: (index: number) => void;
  getValues: UseFormGetValues<FormValues>;
}

const defaultValues = {
  client: {
    name: '',
    salary: undefined,
    goal: '',
  },
  dependants: [
    {
      name: '',
      relationship: '',
      age: undefined,
    },
  ],
};

const ClientSection: React.FC<ClientProps> = ({ control }) => {
  return (
    <IressFieldGroup label={<IressText element="h2">Client</IressText>} inline>
      <IressFormField
        name="client.name"
        label="Name"
        control={control}
        render={(controlledProps) => <IressInput {...controlledProps} />}
        rules={{ required: true }}
      />
      <IressFormField
        name="client.salary"
        label="Salary"
        control={control}
        render={(controlledProps) => <IressInput {...controlledProps} />}
        rules={{ required: true }}
      />
      <IressFormField
        name="client.goal"
        label="Goal"
        control={control}
        render={(controlledProps) => <IressInput {...controlledProps} />}
        rules={{ required: true }}
      />
    </IressFieldGroup>
  );
};

const DependantSection: React.FC<DependantProps> = ({
  index,
  update,
  remove,
  control,
  getValues,
}: DependantProps) => {
  return (
    <IressPanel bg="alt">
      <IressInline horizontalAlign="right">
        <IressCloseButton
          onClick={() => remove(index)}
          mb="-lg"
          style={{ zIndex: 1 }}
        />
      </IressInline>
      <IressStack gap="md">
        <IressFieldGroup
          label={<IressText element="h2">Dependant {index + 1}</IressText>}
          inline
        >
          <IressFormField
            name={`dependants.${index}.name`}
            label="Name"
            control={control}
            render={(controlledProps) => <IressInput {...controlledProps} />}
            rules={{ required: true }}
          />
          <IressFormField
            name={`dependants.${index}.relationship`}
            label="Relationship"
            control={control}
            render={(controlledProps) => <IressInput {...controlledProps} />}
            rules={{ required: true }}
          />
          <IressFormField
            name={`dependants.${index}.age`}
            label="Age"
            control={control}
            render={(controlledProps) => <IressInput {...controlledProps} />}
            rules={{ required: true }}
          />
          <IressButton
            type="button"
            prepend={<IressIcon name="check" />}
            onClick={() => {
              const data = getValues();
              const value = data?.dependants[index];
              update(index, value);
            }}
          >
            Save
          </IressButton>
        </IressFieldGroup>
      </IressStack>
    </IressPanel>
  );
};

export const FormGroups = () => {
  const form = IressHookForm.useForm<FormValues>({
    defaultValues: defaultValues,
    mode: 'onBlur',
  });

  const { control, getValues } = form;

  const { fields, append, update, remove } = IressHookForm.useFieldArray({
    name: 'dependants',
    control,
  });

  const onSubmit = (data: FormValues) => console.log(data);

  return (
    <IressText>
      <h1>Form groups</h1>
      <p>
        This is one form with child sections (not nested forms). Play around to
        add/edit/delete child form sections:
      </p>
      <IressHookForm<FormValues> id="mainForm" form={form} onSubmit={onSubmit}>
        <IressStack gap="md">
          <ClientSection control={control} />
          {fields.map((field, index) => (
            <DependantSection
              key={field.id}
              index={index}
              control={control}
              update={update}
              remove={remove}
              getValues={getValues}
            />
          ))}
          <IressButton
            type="button"
            prepend={<IressIcon name="plus" />}
            onClick={() => {
              append({ name: '', relationship: '', age: undefined });
            }}
          >
            Add Dependant
          </IressButton>
        </IressStack>
        <IressDivider my="md" />
        <IressButton type="submit" mode="primary">
          Submit All
        </IressButton>
      </IressHookForm>
    </IressText>
  );
};
