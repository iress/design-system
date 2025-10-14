import { forwardRef, ReactElement, ReactNode, Ref, useMemo } from 'react';
import { propagateTestid } from '@helpers/utility/propagateTestid';
import { mapNodesToSelectOptions } from '../helpers/nodesToSelectOptions';
import { FormControlValue } from '@/types';
import { IressReadonly, IressReadonlyProps } from '@/components/Readonly';

export interface SelectReadonlyProps<
  T extends FormControlValue = FormControlValue,
> extends Omit<IressReadonlyProps<T>, 'value'> {
  /**
   * The options of the select, used to locate the label of the selected value.
   */
  children?: ReactNode;

  /**
   * The value of the select.
   */
  value?: T;
}

const Component = <T extends FormControlValue = FormControlValue>(
  {
    children,
    className,
    'data-testid': dataTestId,
    name,
    required,
    width,
    value,
    ...restProps
  }: SelectReadonlyProps<T>,
  ref: Ref<HTMLInputElement>,
) => {
  const label = useMemo(() => {
    return String(
      mapNodesToSelectOptions<T>(children as never).find(
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
      value={value}
    >
      {label}
    </IressReadonly>
  );
};

export const SelectReadonly = forwardRef(Component) as <
  T extends FormControlValue = FormControlValue,
>(
  props: SelectReadonlyProps<T> & { ref?: Ref<HTMLInputElement> },
) => ReactElement;
