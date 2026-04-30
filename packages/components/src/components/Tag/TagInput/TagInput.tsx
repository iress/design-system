import { forwardRef, useCallback, useState } from 'react';
import { type IressTagInputProps } from './TagInput.types';
import { type InputBaseElement, type InputRef } from '@/components/Input';
import { useControlledState } from '@/hooks/useControlledState';
import { TagListInput } from '../components/TagListInput/TagListInput';
import { getValueAsEvent } from '@/helpers/form/getValueAsEvent';

export const IressTagInput = forwardRef(
  (
    {
      defaultValue,
      onBlur,
      onChange,
      onExistingTag,
      onKeyDown,
      onTagDelete,
      onTagDeleteAll,
      value: valueProp,
      ...restProps
    }: IressTagInputProps,
    ref: React.Ref<InputRef>,
  ) => {
    const [query, setQuery] = useState('');
    const { value, setValue } = useControlledState({
      component: 'IressTagInput',
      defaultValue,
      value: valueProp,
    });

    const updateTags = useCallback(
      (inputValue = '') => {
        if (!inputValue) {
          return;
        }

        if (value?.includes(inputValue)) {
          onExistingTag?.(inputValue);
          return;
        }

        const newValue = [...(value ?? []), inputValue];
        onChange?.(getValueAsEvent(newValue), newValue);
        setValue(newValue);
      },
      [onChange, onExistingTag, setValue, value],
    );

    const handleBlur: IressTagInputProps['onBlur'] = (e) => {
      onBlur?.(e);
      updateTags(e.currentTarget.value);
    };

    const handleKeyDown: IressTagInputProps['onKeyDown'] = (e) => {
      onKeyDown?.(e);

      if (e.key === 'Backspace' && !query) {
        const newValue = value?.slice(0, -1);
        onChange?.(getValueAsEvent(newValue), newValue);
        setValue(newValue);
      } else if (e.key === 'Enter') {
        const inputElement = e.currentTarget as InputBaseElement;
        updateTags(inputElement.value);
        setQuery('');
      }
    };

    const handleTagDelete: IressTagInputProps['onTagDelete'] = (label) => {
      onTagDelete?.(label);
      const newValue = value?.filter((item) => item !== label);
      onChange?.(getValueAsEvent(newValue), newValue);
      setValue(newValue);
    };

    const handleTagDeleteAll: IressTagInputProps['onTagDeleteAll'] = (
      label,
    ) => {
      onTagDeleteAll?.(label);
      onChange?.(getValueAsEvent([]), []);
      setValue([]);
    };

    return (
      <TagListInput
        {...restProps}
        onBlur={handleBlur}
        onChange={(e) => setQuery(e.currentTarget.value)}
        onKeyDown={handleKeyDown}
        onTagDelete={handleTagDelete}
        onTagDeleteAll={handleTagDeleteAll}
        ref={ref}
        tags={value}
        value={query}
      />
    );
  },
);

IressTagInput.displayName = 'IressTagInput';
