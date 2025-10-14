import { forwardRef, useMemo } from 'react';
import { propagateTestid } from '@helpers/utility/propagateTestid';
import { mapNodesToSelectOptions } from '../helpers/nodesToSelectOptions';
import { getFormControlValueAsStringIfDefined } from '@helpers/form/getFormControlValueAsStringIfDefined';
import { type SelectReadonlyProps } from '../Select.types';
import { IressReadonly } from '@/main';

export const SelectReadonly = forwardRef(
  (
    {
      children,
      className,
      'data-testid': dataTestId,
      name,
      required,
      width,
      value,
      ...restProps
    }: SelectReadonlyProps,
    ref: React.Ref<HTMLInputElement>,
  ) => {
    const label = useMemo(() => {
      return String(
        mapNodesToSelectOptions(children as never).find(
          (option) => option.value === value,
        )?.label ?? '',
      );
    }, [children, value]);

    return (
      <IressReadonly
        {...restProps}
        className={className}
        data-testid={propagateTestid(dataTestId, 'pseudo')}
        name={name}
        ref={ref}
        required={required}
        width={width}
        value={getFormControlValueAsStringIfDefined(value)}
      >
        {label}
      </IressReadonly>
    );
  },
);

SelectReadonly.displayName = 'SelectReadonly';
