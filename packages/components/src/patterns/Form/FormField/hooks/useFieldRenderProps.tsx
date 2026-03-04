import { useCallback, useMemo } from 'react';
import type { ControllerRenderProps, FieldValues } from 'react-hook-form';
import type { FormFieldRenderProps } from '../FormField';

/**
 * Hook to create memoized render props for a field in a form.
 * Enhances the field's onChange handling to support the react-hook-form
 * contract where if a second argument is provided, it's used as the value directly.
 * This allows components like IressCheckbox that call onChange(event, value)
 * to work seamlessly with react-hook-form.
 */
export const useFieldRenderProps = <T extends FieldValues>(
  field: ControllerRenderProps<T>,
): Omit<FormFieldRenderProps<T>, 'id'> => {
  const { onChange } = field;

  const handleChange = useCallback<ControllerRenderProps<T>['onChange']>(
    (...args) => {
      if (args[1] !== undefined) {
        // If value is provided as second argument, use it directly
        onChange(args[1]);
      } else {
        // Otherwise, use the default onChange behavior
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        onChange(...args);
      }
    },
    [onChange],
  );

  return useMemo(
    () => ({
      ...field,
      onChange: handleChange,
    }),
    [field, handleChange],
  );
};
