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
import {
  useForm,
  useFieldArray,
  type Control,
  type UseFormGetValues,
} from 'react-hook-form';

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
    <IressFieldGroup label={<IressText element="h2">Client</IressText>}>
      <IressStack gutter="md">
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
      </IressStack>
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
    <IressPanel>
      <IressInline horizontalAlign="right">
        <IressCloseButton onClick={() => remove(index)} />
      </IressInline>
      <IressStack gutter="md">
        <IressFieldGroup
          label={<IressText element="h2">Dependant {index + 1}</IressText>}
        >
          <IressStack gutter="md">
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
          </IressStack>
        </IressFieldGroup>
      </IressStack>
    </IressPanel>
  );
};

export const FormGroups = () => {
  const form = useForm<FormValues>({
    defaultValues: defaultValues,
    mode: 'onBlur',
  });

  const { control, getValues } = form;

  const { fields, append, update, remove } = useFieldArray({
    name: 'dependants',
    control,
  });

  const onSubmit = (data: FormValues) => console.log(data);

  return (
    <IressStack gutter="md">
      <IressText element="h1">Form groups</IressText>
      <IressText element="p">
        This is one form with child sections (not nested forms). Play around to
        add/edit/delete child form sections:
      </IressText>
      <IressHookForm<FormValues>
        gutter="md"
        form={form}
        onSubmit={onSubmit}
        errorSummaryHeading="Please correct the following errors found for the form:"
      >
        <IressStack gutter="md">
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
        <IressDivider />
        <IressButton type="submit" mode="primary">
          Submit All
        </IressButton>
      </IressHookForm>
    </IressStack>
  );
};
