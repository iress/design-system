import { ReactHookFormCompatibleRef } from '@/interfaces';
import { MutableRefObject, useCallback, useMemo, useState } from 'react';
import { ControllerRenderProps, FieldValues } from 'react-hook-form';

/**
 * This hook is used to create render props for a field in a form.
 * It enhances the field's onChange and ref handling to support additional props
 * that may be required by the field component, such as additional onChange properties (eg. `<IressInput clearable />`),
 * or a custom value prop (eg. `IressCheckbox`).
 */
export const useFieldRenderProps = <T extends FieldValues>(
  field: ControllerRenderProps<T>,
  fieldRef: MutableRefObject<ReactHookFormCompatibleRef | null>,
) => {
  const [extraString, setExtraString] = useState<string>('null');

  const handleChange = useCallback<ControllerRenderProps<T>['onChange']>(
    (...args) => {
      if (args[1] !== undefined) {
        // If value is provided, use it directly
        field.onChange(args[1]);
      } else {
        // Otherwise, use the default onChange behavior from react-hook-form
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        field.onChange(...args);
      }
    },
    [field],
  );

  const handleRef = useCallback<ControllerRenderProps<T>['ref']>(
    (instance: ReactHookFormCompatibleRef) => {
      fieldRef.current = instance;
      field.ref(instance);

      if (instance) {
        const newExtrasString = JSON.stringify(instance.extras ?? null);

        if (newExtrasString !== extraString) {
          setExtraString(newExtrasString);
        }
      }
    },
    [extraString, field, fieldRef],
  );

  const renderField = useMemo(() => {
    let newField: Partial<ControllerRenderProps<T>> = { ...field };

    // Always parse extraString, even if it's 'null'
    const extras = JSON.parse(extraString) as
      | ReactHookFormCompatibleRef['extras']
      | null;

    if (extras?.additionalOnChangeProps) {
      extras.additionalOnChangeProps.forEach((prop) => {
        newField = { ...newField, [prop]: field.onChange };
      });
    }

    if (extras?.valueProp) {
      newField = {
        ...field,
        [extras.valueProp]: field.value,
      };

      delete newField.value; // Remove the value prop to avoid conflicts
    }

    return newField as ControllerRenderProps<T>;
  }, [field, extraString]);

  return useMemo(
    () => ({
      ...renderField,
      onChange: handleChange,
      ref: handleRef,
    }),
    [handleChange, handleRef, renderField],
  );
};
