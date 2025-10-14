import { forwardRef, Ref, SyntheticEvent, useCallback, useState } from 'react';
import {
  InputBaseElement,
  InputRef,
  IressInput,
  IressInputProps,
} from '@/components/Input';
import { useControlledState } from '@/hooks/useControlledState';
import { getValueAsEvent } from '@/helpers/form/getValueAsEvent';
import { IressTag, IressTagProps } from '../Tag';
import { propagateTestid } from '@/helpers/utility/propagateTestid';
import { IressInline } from '@/components/Inline';
import { tagInput } from './TagInput.styles';

export interface IressTagInputProps
  extends Omit<
    IressInputProps<string>,
    'defaultValue' | 'onChange' | 'prepend' | 'value' | 'rows'
  > {
  /**
   * Tags to display (uncontrolled)
   */
  defaultValue?: string[];

  /**
   * Emitted when the value changes.
   */
  onChange?: (e?: SyntheticEvent<InputBaseElement>, value?: string[]) => void;

  /**
   * Emitted when the user attempts to add a tag that already exists.
   */
  onExistingTag?: (tag: string) => void;

  /**
   * Emitted when a tag is deleted
   */
  onTagDelete?: IressTagProps['onDelete'];

  /**
   * Emitted when the combined tag delete button is clicked
   */
  onTagDeleteAll?: IressTagProps['onDelete'];

  /**
   * Emitted when a tag's delete button is blurred
   */
  onTagDeleteButtonBlur?: IressTagProps['onDeleteButtonBlur'];

  /**
   * Text displayed next to tag count in tag when tag limit is exceeded
   * @default options selected
   */
  selectedOptionsTagText?: string;

  /**
   * Limit of tags to display before shortening to `selectedOptionsTagText`
   * @default 5
   */
  tagLimit?: number;

  /**
   * Tags to display (controlled)
   */
  value?: string[];
}

const Tags = ({
  'data-testid': dataTestId,
  onTagDelete,
  onTagDeleteAll,
  onTagDeleteButtonBlur,
  selectedOptionsTagText,
  tags = [],
  tagLimit = 5,
}: Pick<
  IressTagInputProps,
  | 'data-testid'
  | 'onTagDelete'
  | 'onTagDeleteAll'
  | 'onTagDeleteButtonBlur'
  | 'selectedOptionsTagText'
  | 'tagLimit'
  | 'value'
> & {
  tags: string[];
}) => {
  if (!tags.length) {
    return null;
  }

  if (tags.length <= tagLimit)
    return tags.map((tag: string) => (
      <IressTag
        key={tag}
        deleteButtonText={`Delete ${tag}`}
        onDelete={onTagDelete}
        onDeleteButtonBlur={onTagDeleteButtonBlur}
        data-testid={propagateTestid(dataTestId, 'tag')}
        ml="xs"
      >
        {tag}
      </IressTag>
    ));

  return (
    <IressTag
      onDelete={onTagDeleteAll}
      onDeleteButtonBlur={onTagDeleteButtonBlur}
      data-testid={propagateTestid(dataTestId, 'tag')}
      ml="xs"
      py="none"
    >
      {String(tags.length) || '0'} {selectedOptionsTagText}
    </IressTag>
  );
};

export const IressTagInput = forwardRef(
  (
    {
      className,
      defaultValue,
      name,
      onBlur,
      onChange,
      onExistingTag,
      onKeyDown,
      onTagDelete,
      onTagDeleteAll,
      onTagDeleteButtonBlur,
      selectedOptionsTagText = 'selected',
      style,
      tagLimit = 5,
      width = '100perc',
      value: valueProp,
      ...restProps
    }: IressTagInputProps,
    ref: Ref<InputRef>,
  ) => {
    const [query, setQuery] = useState('');
    const { value, setValue } = useControlledState<string, true>({
      component: 'IressTagInput',
      defaultValue,
      value: valueProp,
    });
    const classes = tagInput();

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
      setQuery('');
    };

    const handleKeyDown: IressTagInputProps['onKeyDown'] = (e) => {
      onKeyDown?.(e);

      if (e.key === 'Backspace' && !query) {
        const newValue = value?.slice(0, -1);
        onChange?.(getValueAsEvent(newValue), newValue);
        setValue(newValue);
      } else if (e.key === 'Enter') {
        const inputElement = e.currentTarget;

        if (inputElement.value) {
          e.preventDefault();
          updateTags(inputElement.value);
          setQuery('');
        }
      }
    };

    const handleTagDelete: IressTagInputProps['onTagDelete'] = (label, e) => {
      e.stopPropagation();
      onTagDelete?.(label, e);
      const newValue = value?.filter((item) => item !== label);
      onChange?.(getValueAsEvent(newValue), newValue);
      setValue(newValue);
    };

    const handleTagDeleteAll: IressTagInputProps['onTagDeleteAll'] = (
      label,
      e,
    ) => {
      e.stopPropagation();
      onTagDeleteAll?.(label, e);
      onChange?.(getValueAsEvent([]), []);
      setValue([]);
    };

    return (
      <IressInline gap="sm" className={className} style={style}>
        <IressInput
          {...restProps}
          className={classes.input}
          onBlur={handleBlur}
          onChange={(e) => setQuery(e.currentTarget.value)}
          onKeyDown={handleKeyDown}
          prepend={
            <Tags
              data-testid={restProps['data-testid']}
              onTagDelete={handleTagDelete}
              onTagDeleteAll={handleTagDeleteAll}
              onTagDeleteButtonBlur={onTagDeleteButtonBlur}
              selectedOptionsTagText={selectedOptionsTagText}
              tags={value ?? []}
              tagLimit={tagLimit}
            />
          }
          ref={ref}
          width={width}
          value={query}
        />
        {name && (
          <input
            type="hidden"
            value={(value ?? []).join(', ')}
            name={name}
            data-testid={propagateTestid(
              restProps['data-testid'],
              'hidden-input',
            )}
          />
        )}
      </IressInline>
    );
  },
);

IressTagInput.displayName = 'IressTagInput';
