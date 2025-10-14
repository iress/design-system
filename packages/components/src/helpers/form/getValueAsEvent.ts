import { FormControlValue } from '@/types';

/**
 * This method wraps up a value in an event object, allowing it to work in React Hook Forms change handlers.
 * See: https://github.com/react-hook-form/react-hook-form/blob/6deae49068dc8ac056977d4def168a78968d9e61/src/types/form.ts#L96
 * @param value
 * @returns { target: { value } }
 */
export const getValueAsEvent = <
  T = FormControlValue,
  EventType = {
    currentTarget: {
      value: T;
    };
    target: {
      value: T;
    };
  },
>(
  value: T,
) => {
  return {
    currentTarget: { value },
    target: { value },
  } as EventType;
};
