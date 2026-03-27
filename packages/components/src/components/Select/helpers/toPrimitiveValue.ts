import type { ControlledValue } from '@/hooks';
import type { LabelValueMeta } from '@/interfaces';
import type { FormControlValue } from '@/types';

export const toPrimitiveValue = <TMultiple extends boolean = false>(
  value: ControlledValue<LabelValueMeta, TMultiple> | undefined,
): ControlledValue<FormControlValue, TMultiple> | undefined => {
  if (value === undefined) return undefined;
  if (Array.isArray(value))
    return value.map((v) => v.value ?? null) as ControlledValue<
      FormControlValue,
      TMultiple
    >;
  return (value.value ?? null) as ControlledValue<FormControlValue, TMultiple>;
};
