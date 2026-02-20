import type { ReactHookFormCompatibleRef } from '@/interfaces';
import { type RefObject, useCallback, useMemo, useRef, useState } from 'react';
import type { ControllerRenderProps, FieldValues } from 'react-hook-form';
import type { FormFieldRenderProps } from '../FormField';

/**
 * This hook is used to create render props for a field in a form.
 * It enhances the field's onChange and ref handling to support additional props
 * that may be required by the field component, such as additional onChange properties (eg. `<IressInput clearable />`),
 * or a custom value prop (eg. `IressCheckbox`).
 */
export const useFieldRenderProps = <T extends FieldValues>(
  field: ControllerRenderProps<T>,
  fieldRef: RefObject<ReactHookFormCompatibleRef | null>,
) => {
  const fieldRefCallback = useRef(field.ref);
  const extrasRef = useRef<ReactHookFormCompatibleRef['extras'] | null>(null);
  const extrasStringRef = useRef<string>('null');
  const [extrasVersion, setExtrasVersion] = useState(0);

  // Update the field ref callback on every render
  fieldRefCallback.current = field.ref;

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
      fieldRefCallback.current(instance);

      if (instance) {
        const newExtrasString = JSON.stringify(instance.extras ?? null);

        // Only trigger update if extras actually changed
        if (newExtrasString !== extrasStringRef.current) {
          extrasStringRef.current = newExtrasString;
          extrasRef.current = instance.extras ?? null;
          // Increment version to trigger renderField recalculation
          setExtrasVersion((v) => v + 1);
        }
      }
    },
    [fieldRef],
  );

  const renderField = useMemo(() => {
    let newField: Partial<ControllerRenderProps<T>> = { ...field };

    // Read extras from ref - extrasVersion ensures this updates when extras change
    const extras = extrasRef.current;

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [field, extrasVersion]);

  return useMemo<Omit<FormFieldRenderProps<T>, 'id'>>(
    () => ({
      ...renderField,
      onChange: handleChange,
      ref: handleRef,
    }),
    [handleChange, handleRef, renderField],
  );
};
