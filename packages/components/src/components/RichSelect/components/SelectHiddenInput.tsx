import { propagateTestid } from '@helpers/utility/propagateTestid';
import {
  type IressRichSelectProps,
  type SelectHiddenInputRenderProps,
} from '../RichSelect.types';
import { type ForwardedRef, forwardRef } from 'react';

type SelectHiddenInputProps = Pick<
  IressRichSelectProps,
  'data-testid' | 'name' | 'renderHiddenInput' | 'value'
> &
  SelectHiddenInputRenderProps;

export const SelectHiddenInput = forwardRef(
  (
    {
      'data-testid': dataTestId,
      getValuesString,
      name,
      renderHiddenInput,
      value,
    }: SelectHiddenInputProps,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    if (renderHiddenInput)
      return renderHiddenInput({
        getValuesString,
        value,
        ref,
      });

    return (
      <input
        data-testid={propagateTestid(dataTestId, 'hidden-input')}
        name={name}
        type="hidden"
        value={getValuesString()}
        ref={ref}
      />
    );
  },
);

SelectHiddenInput.displayName = 'SelectHiddenInput';
